/**
 * Robot Framework Academy - Lesson 221
 * Microservices Testing Patterns
 */

const LESSON_221 = {
    id: 221,
    title: "Microservices Testing Patterns",
    duration: "10 min",
    level: "advanced",
    section: "section-18",
    content: `
        <h2>🔧 Patrones Microservicios</h2>
        <p>Estrategias específicas para testing de microservicios con service mesh, circuit breakers y distributed tracing.</p>
        
        <h3>💻 Testing Distribuido:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    Microservices Testing Patterns - Service Mesh Integration
Library          SeleniumLibrary
Library          RequestsLibrary
Library          Collections
Library          Process
Resource         ../resources/service_mesh/istio_keywords.robot
Resource         ../resources/monitoring/jaeger_keywords.robot
Variables        ../config/microservices.yaml
Suite Setup      Initialize Service Mesh Testing
Suite Teardown   Cleanup Service Mesh Resources

*** Variables ***
\${SERVICE_MESH_URL}      http://istio-gateway:80
\${JAEGER_URL}            http://jaeger:16686
\${PROMETHEUS_URL}        http://prometheus:9090
\${USER_SERVICE}          user-service.default.svc.cluster.local
\${ORDER_SERVICE}         order-service.default.svc.cluster.local
\${PAYMENT_SERVICE}       payment-service.default.svc.cluster.local
\${NOTIFICATION_SERVICE}  notification-service.default.svc.cluster.local
\${TRACE_ID}              generated_trace_id
\${CORRELATION_ID}        test_correlation_12345
\${CIRCUIT_BREAKER_THRESHOLD}    5
\${RETRY_ATTEMPTS}        3
\${TIMEOUT_SECONDS}       30

*** Test Cases ***
Test Service Discovery Pattern
    [Documentation]    Service discovery and registration testing
    [Tags]             service-discovery    microservices    enterprise
    
    # Service Registration Validation
    Check Service Registration    \${USER_SERVICE}      healthy
    Check Service Registration    \${ORDER_SERVICE}     healthy  
    Check Service Registration    \${PAYMENT_SERVICE}   healthy
    Validate Service Endpoints    \${USER_SERVICE}      /health,/metrics,/users
    Validate Load Balancing       \${USER_SERVICE}      round_robin
    
    # Service Discovery Testing
    Discover Service By Name      user-service
    \${endpoints}=  Get Service Endpoints    user-service
    Should Not Be Empty          \${endpoints}
    Validate Endpoint Health     \${endpoints[0]}
    Test Service Failover        \${USER_SERVICE}      \${endpoints}

Test Circuit Breaker Pattern
    [Documentation]    Circuit breaker resilience testing
    [Tags]             circuit-breaker    resilience    fault-tolerance
    
    # Normal Operation Testing
    Send Request To Service       \${ORDER_SERVICE}/orders    \${VALID_REQUEST}
    Response Status Should Be     200
    Validate Circuit Breaker      \${ORDER_SERVICE}    closed
    
    # Failure Simulation
    Simulate Service Failure      \${PAYMENT_SERVICE}
    FOR    \${i}    IN RANGE    \${CIRCUIT_BREAKER_THRESHOLD}
        Send Request To Service   \${ORDER_SERVICE}/process-payment    \${PAYMENT_REQUEST}
        Response Status Should Be    503
    END
    
    # Circuit Breaker Open Validation
    Validate Circuit Breaker      \${ORDER_SERVICE}    open
    Send Request To Service       \${ORDER_SERVICE}/process-payment    \${PAYMENT_REQUEST}
    Response Should Contain       Circuit breaker is open
    
    # Recovery Testing
    Restore Service Health        \${PAYMENT_SERVICE}
    Wait For Circuit Recovery     \${ORDER_SERVICE}    timeout=60s
    Validate Circuit Breaker      \${ORDER_SERVICE}    closed

Test Distributed Tracing
    [Documentation]    Distributed tracing validation across services
    [Tags]             tracing    observability    monitoring
    
    # Generate Traced Request
    \${trace_id}=  Generate Trace ID
    Set Test Variable    \${TRACE_ID}    \${trace_id}
    Send Traced Request          \${USER_SERVICE}/users    \${CREATE_USER_DATA}    \${trace_id}
    
    # Validate Trace Propagation
    Wait For Trace Completion    \${trace_id}    timeout=30s
    \${spans}=  Get Trace Spans  \${trace_id}
    Should Contain              \${spans}    user-service
    Should Contain              \${spans}    order-service
    Should Contain              \${spans}    payment-service
    
    # Trace Analysis
    Validate Span Duration       \${trace_id}    user-service    max=500ms
    Validate Span Status         \${trace_id}    user-service    success
    Check Span Dependencies      \${trace_id}    user-service -> order-service
    Validate Error Propagation   \${trace_id}    none

Test Service Mesh Security
    [Documentation]    mTLS and service mesh security patterns
    [Tags]             security    mtls    service-mesh
    
    # mTLS Validation
    Validate mTLS Enabled        \${USER_SERVICE}    \${ORDER_SERVICE}
    Check Certificate Rotation   \${USER_SERVICE}    valid
    Validate Secure Communication    \${ORDER_SERVICE}    \${PAYMENT_SERVICE}
    
    # Service-to-Service Authorization
    Test Service Authorization   \${USER_SERVICE}      allow    \${ORDER_SERVICE}
    Test Service Authorization   \${USER_SERVICE}      deny     \${NOTIFICATION_SERVICE}
    Validate Policy Enforcement  \${ORDER_SERVICE}     rbac_enabled
    Check Traffic Encryption     \${PAYMENT_SERVICE}   tls_v1.3

Test Bulkhead Pattern
    [Documentation]    Resource isolation and bulkhead testing
    [Tags]             bulkhead    isolation    resilience
    
    # Resource Pool Isolation
    Create Load On Service       \${USER_SERVICE}     high_priority_pool    requests=1000
    Create Load On Service       \${USER_SERVICE}     low_priority_pool     requests=2000
    
    # Validate Resource Isolation
    Check Response Times         high_priority_pool    max=200ms
    Check Response Times         low_priority_pool     max=2000ms
    Validate Pool Separation     high_priority_pool    low_priority_pool
    
    # Failure Isolation Testing
    Exhaust Resource Pool        low_priority_pool
    Validate Pool Still Healthy  high_priority_pool
    Check Service Degradation    graceful    low_priority_pool</code></pre>
        
        <h3>🎯 Práctica Microservicios (7 min):</h3>
        <p>1. Instala Istio service mesh en cluster Kubernetes local</p>
        <p>2. Despliega aplicación multi-microservicio con sidecars</p>
        <p>3. Configura distributed tracing con Jaeger integration</p>
        <p>4. Implementa circuit breaker pattern con Hystrix</p>
        <p>5. Testa service discovery automático con Consul/Eureka</p>
        <p>6. Configura load balancing con health checks</p>
        <p>7. Implementa bulkhead pattern para resource isolation</p>
        <p>8. Configura retry mechanisms con exponential backoff</p>
        <p>9. Testa mTLS communication entre microservicios</p>
        <p>10. Implementa chaos engineering con failure injection</p>
        <p>11. Configura rate limiting per-service con policies</p>
        <p>12. Testa service mesh traffic routing rules</p>
        <p>13. Implementa canary deployment testing patterns</p>
        <p>14. Configura distributed logging aggregation</p>
        <p>15. Testa API versioning compatibility cross-services</p>
        <p>16. Implementa contract testing con Pact framework</p>
        <p>17. Configura performance testing distribuido</p>
        <p>18. Testa data consistency eventual entre servicios</p>
        <p>19. Implementa saga pattern testing distributed</p>
        <p>20. Configura monitoring integration con Prometheus</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar patrones específicos testing microservicios</li>
                <li>Configurar service mesh testing con Istio integration</li>
                <li>Dominar circuit breaker y resilience patterns</li>
                <li>Establecer distributed tracing y observability</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa correlation IDs únicos en cada request para tracing completo across microservices - crítico para debugging distribuido.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 222 - Container Testing Patterns</h3>
        <p>Aprenderás patrones específicos para testing de aplicaciones containerizadas con Docker y Kubernetes orchestration.</p>
    `,
    topics: ["enterprise", "architecture", "scalability"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-220"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_221 = LESSON_221;
}