/**
 * Robot Framework Academy - Lesson 223
 * Performance Testing Distribuido
 */

const LESSON_223 = {
    id: 223,
    title: "Performance Testing Distribuido",
    duration: "10 min",
    level: "advanced",
    section: "section-18",
    content: `
        <h2>🚀 Performance Distribuido</h2>
        <p>Testing de performance en arquitecturas distribuidas con load balancing, auto-scaling y múltiples regiones.</p>
        
        <h3>💻 Load Testing:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    Distributed Performance Testing - Multi-Region Load
Library          SeleniumLibrary
Library          RequestsLibrary  
Library          Process
Library          Collections
Library          DateTime
Resource         ../resources/performance/load_generators.robot
Resource         ../resources/monitoring/metrics_collector.robot
Variables        ../config/performance.yaml
Suite Setup      Initialize Performance Test Environment
Suite Teardown   Generate Performance Report

*** Variables ***
\${LOAD_BALANCER_URL}     https://lb.prod-app.com
\${API_GATEWAY_URL}       https://api.prod-app.com
\${CDN_URL}               https://cdn.prod-app.com
\${REGION_US_EAST}        https://us-east.prod-app.com
\${REGION_US_WEST}        https://us-west.prod-app.com
\${REGION_EU_WEST}        https://eu-west.prod-app.com
\${PROMETHEUS_URL}        http://prometheus:9090
\${GRAFANA_URL}           http://grafana:3000
\${TARGET_RPS}            1000
\${MAX_RESPONSE_TIME}     500
\${CONCURRENT_USERS}      500
\${TEST_DURATION}         300
\${RAMP_UP_TIME}          60
\${ACCEPTABLE_ERROR_RATE} 0.1

*** Test Cases ***
Test Load Balancer Performance
    [Documentation]    Load balancer performance and failover testing
    [Tags]             load-balancer    performance    distributed
    
    # Baseline Performance
    Create Load Test Session      lb_session    \${LOAD_BALANCER_URL}
    Generate Steady Load          lb_session    rps=\${TARGET_RPS}    duration=60s
    \${baseline_metrics}=         Collect Performance Metrics    lb_session
    Validate Response Time        \${baseline_metrics}    max=\${MAX_RESPONSE_TIME}ms
    Validate Error Rate           \${baseline_metrics}    max=\${ACCEPTABLE_ERROR_RATE}%
    
    # Spike Testing
    Generate Spike Load           lb_session    rps=5000    duration=30s
    \${spike_metrics}=            Collect Performance Metrics    lb_session
    Validate System Stability     \${spike_metrics}    error_rate<5%
    Check Auto Scaling Triggered  \${LOAD_BALANCER_URL}    scale_up=true
    
    # Failover Testing
    Simulate Backend Failure      region=us-east
    Generate Load During Failover lb_session    rps=\${TARGET_RPS}    duration=120s
    \${failover_metrics}=         Collect Performance Metrics    lb_session
    Validate Graceful Degradation \${failover_metrics}    availability>99%
    Restore Backend Health        region=us-east

Test Multi-Region Performance
    [Documentation]    Cross-region performance and latency testing
    [Tags]             multi-region    latency    global
    
    # Regional Performance Testing
    Create Load Test Sessions     us_east    \${REGION_US_EAST}
    Create Load Test Sessions     us_west    \${REGION_US_WEST}
    Create Load Test Sessions     eu_west    \${REGION_EU_WEST}
    
    Generate Parallel Load        us_east    rps=300    duration=\${TEST_DURATION}s
    Generate Parallel Load        us_west    rps=300    duration=\${TEST_DURATION}s  
    Generate Parallel Load        eu_west    rps=400    duration=\${TEST_DURATION}s
    
    # Cross-Region Metrics
    \${us_east_metrics}=          Collect Regional Metrics    us_east
    \${us_west_metrics}=          Collect Regional Metrics    us_west
    \${eu_west_metrics}=          Collect Regional Metrics    eu_west
    
    Validate Regional Latency     us_east    max=100ms
    Validate Regional Latency     us_west    max=120ms
    Validate Regional Latency     eu_west    max=80ms
    
    Compare Regional Performance  \${us_east_metrics}    \${us_west_metrics}    \${eu_west_metrics}

Test Auto-Scaling Performance
    [Documentation]    Auto-scaling performance validation under load
    [Tags]             auto-scaling    elasticity    performance
    
    # Gradual Load Increase
    Create Performance Session    scaling_test    \${API_GATEWAY_URL}
    \${initial_instances}=        Get Current Instance Count    api-service
    
    Generate Ramping Load         scaling_test    start_rps=100    end_rps=2000    ramp_time=\${RAMP_UP_TIME}s
    Wait For Scale Up Event       api-service    timeout=180s
    \${scaled_instances}=         Get Current Instance Count    api-service
    
    Should Be True               \${scaled_instances} > \${initial_instances}
    Validate Scale Up Response    scaling_test    performance_maintained=true
    
    # Sustained Load Testing
    Generate Sustained Load       scaling_test    rps=1500    duration=600s
    Monitor Auto Scaling Events   api-service    scale_up_events>=2
    Validate Performance SLA      scaling_test    p95_latency<\${MAX_RESPONSE_TIME}ms
    
    # Scale Down Testing
    Reduce Load Gradually         scaling_test    end_rps=200    ramp_time=120s
    Wait For Scale Down Event     api-service    timeout=300s
    \${final_instances}=          Get Current Instance Count    api-service
    Should Be True               \${final_instances} < \${scaled_instances}

Test Database Performance Distributed
    [Documentation]    Distributed database performance testing
    [Tags]             database    performance    distributed
    
    # Read Replica Performance
    Create DB Load Session        read_session     read_replica_endpoint
    Create DB Load Session        write_session    primary_db_endpoint
    
    Generate Read Load            read_session     queries_per_sec=500    duration=300s
    Generate Write Load           write_session    queries_per_sec=100    duration=300s
    
    \${read_metrics}=             Collect DB Metrics    read_session
    \${write_metrics}=            Collect DB Metrics    write_session
    
    Validate Query Performance    \${read_metrics}     max_latency=50ms
    Validate Query Performance    \${write_metrics}    max_latency=100ms
    Check Replication Lag         read_replica    max=2s
    
    # Connection Pool Testing
    Test Connection Pool Limits   primary_db    max_connections=1000
    Generate Connection Spike     primary_db    connections=800    duration=60s
    Validate Connection Handling  primary_db    no_connection_errors=true
    Monitor Connection Pool       primary_db    utilization<80%

Test CDN Performance
    [Documentation]    CDN performance and cache effectiveness testing
    [Tags]             cdn    caching    performance
    
    # Cache Hit Rate Testing
    Clear CDN Cache               \${CDN_URL}    /static/*
    Generate Asset Requests       \${CDN_URL}    requests=1000    assets=static_files
    \${cache_metrics}=            Collect CDN Metrics    \${CDN_URL}
    
    Validate Cache Hit Rate       \${cache_metrics}    min=95%
    Validate CDN Response Time    \${cache_metrics}    max=50ms
    Check Global Distribution     \${CDN_URL}    edge_locations>10
    
    # Cache Invalidation Testing
    Update Origin Assets          origin_server    /static/app.js
    Trigger Cache Invalidation    \${CDN_URL}    /static/app.js
    Wait For Cache Propagation    \${CDN_URL}    timeout=60s
    Validate Fresh Content        \${CDN_URL}    /static/app.js    updated=true</code></pre>
        
        <h3>🎯 Práctica Performance (7 min):</h3>
        <p>1. Configura JMeter o Artillery para load testing distribuido</p>
        <p>2. Implementa multiple load generators en diferentes regiones</p>
        <p>3. Configura monitoreo con Prometheus y Grafana dashboards</p>
        <p>4. Crea scripts de performance testing con ramp-up gradual</p>
        <p>5. Implementa spike testing para validar system resilience</p>
        <p>6. Configura database performance testing con query analysis</p>
        <p>7. Testa CDN performance con cache hit rate validation</p>
        <p>8. Implementa auto-scaling testing con load simulation</p>
        <p>9. Configura cross-region latency testing automatizado</p>
        <p>10. Crea performance regression testing en CI/CD</p>
        <p>11. Implementa chaos engineering durante load testing</p>
        <p>12. Configura alerting automático para performance degradation</p>
        <p>13. Testa connection pool limits con concurrent connections</p>
        <p>14. Implementa memory leak detection durante sustained load</p>
        <p>15. Configura performance profiling con flame graphs</p>
        <p>16. Testa network partitioning effects en distributed systems</p>
        <p>17. Implementa capacity planning con growth simulation</p>
        <p>18. Configura load balancer failover testing automatizado</p>
        <p>19. Crea performance budgets con SLA enforcement</p>
        <p>20. Implementa real user monitoring comparison con synthetic tests</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar performance testing en arquitecturas distribuidas</li>
                <li>Configurar load testing multi-region con auto-scaling validation</li>
                <li>Dominar testing de load balancers y CDN performance</li>
                <li>Establecer monitoring y alerting de performance enterprise</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Combina synthetic load testing con real user monitoring - correlation entre ambos detecta performance issues antes que afecten usuarios.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 224 - Data Pipeline Testing</h3>
        <p>Aprenderás testing especializado de data pipelines, ETL processes y big data architectures con validation distribuida.</p>
    `,
    topics: ["enterprise", "architecture", "scalability"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-222"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_223 = LESSON_223;
}