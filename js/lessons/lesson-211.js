/**
 * Robot Framework Academy - Lesson 211
 * Performance testing project
 */

const LESSON_211 = {
    id: 211,
    title: "Performance testing project",
    duration: "20 min",
    level: "advanced",
    section: "section-16",
    content: `
        <h2>🎯 Proyecto Enterprise</h2>
        <p>Integra todo el stack de performance testing enterprise en un proyecto completo con automation, monitoring y optimization.</p>
        
        <h3>💻 Proyecto Completo:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    🎯 ENTERPRISE PERFORMANCE TESTING PROJECT
Library          SeleniumLibrary
Library          RequestsLibrary
Library          Process
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          JSON
Suite Setup      Initialize Performance Project
Suite Teardown   Archive Project Results

*** Variables ***
\${PROJECT_NAME}       enterprise-perf-testing
\${APP_URL}            https://ecommerce-demo.company.com
\${API_BASE}           \${APP_URL}/api/v1
\${LOAD_USERS}         2000
\${TEST_DURATION}      1800
\${RAMP_UP_TIME}       300
\${STRESS_USERS}       5000
\${ENDURANCE_HOURS}    4
\${PROJECT_DIR}        ./performance_project
\${RESULTS_DIR}        \${PROJECT_DIR}/results
\${CONFIG_DIR}         \${PROJECT_DIR}/config
\${REPORTS_DIR}        \${PROJECT_DIR}/reports
&{SLA_TARGETS}         response_time=1500  throughput=500  availability=99.95  error_rate=0.5

*** Test Cases ***
Setup Performance Testing Infrastructure
    [Documentation]    Configura infraestructura completa para testing enterprise
    [Tags]             setup    infrastructure    enterprise
    
    # Crear estructura de proyecto
    Create Directory      \${PROJECT_DIR}
    Create Directory      \${RESULTS_DIR}
    Create Directory      \${CONFIG_DIR}
    Create Directory      \${REPORTS_DIR}
    
    # Configurar Docker containers para testing distribuido
    \${docker_compose}=   Create Dictionary
    ...                   version=3.8
    ...                   services=@{[]}
    
    # Servicio Locust master
    \${locust_master}=    Create Dictionary
    ...                   image=locustio/locust
    ...                   ports=@{["8089:8089"]}
    ...                   volumes=@{["./locust:/mnt/locust"]}
    ...                   command=--master --web-host=0.0.0.0
    
    # Servicios Locust workers (4 workers para carga distribuida)
    @{locust_workers}=    Create List
    FOR    \${worker_id}    IN RANGE    4
        \${worker_config}=  Create Dictionary
        ...                 image=locustio/locust
        ...                 volumes=@{["./locust:/mnt/locust"]}
        ...                 command=--worker --master-host=locust_master
        ...                 depends_on=@{["locust_master"]}
        Append To List      \${locust_workers}    \${worker_config}
    END
    
    # Servicio Prometheus para métricas
    \${prometheus}=       Create Dictionary
    ...                   image=prom/prometheus
    ...                   ports=@{["9090:9090"]}
    ...                   volumes=@{["./prometheus.yml:/etc/prometheus/prometheus.yml"]}
    
    # Servicio Grafana para dashboards
    \${grafana}=          Create Dictionary
    ...                   image=grafana/grafana
    ...                   ports=@{["3000:3000"]}
    ...                   environment=@{["GF_SECURITY_ADMIN_PASSWORD=admin123"]}
    ...                   volumes=@{["grafana-data:/var/lib/grafana"]}
    
    # Agregar servicios a docker-compose
    Set To Dictionary     \${docker_compose}    services.locust_master=\${locust_master}
    FOR    \${i}    \${worker}    IN ENUMERATE    @{locust_workers}
        Set To Dictionary  \${docker_compose}    services.locust_worker_\${i}=\${worker}
    END
    Set To Dictionary     \${docker_compose}    services.prometheus=\${prometheus}
    Set To Dictionary     \${docker_compose}    services.grafana=\${grafana}
    
    # Guardar docker-compose.yml
    \${compose_yaml}=     Evaluate    yaml.dump(\${docker_compose}, default_flow_style=False)
    Create File           \${PROJECT_DIR}/docker-compose.yml    \${compose_yaml}
    
    # Iniciar infraestructura
    \${compose_result}=   Run Process    docker-compose    up    -d    
    ...                   cwd=\${PROJECT_DIR}    timeout=120s
    Should Be Equal       \${compose_result.rc}    0
    
    # Verificar servicios activos
    Sleep                 30s
    Create Session        locust    http://localhost:8089
    \${locust_health}=    GET On Session    locust    /    timeout=10
    Should Be Equal       \${locust_health.status_code}    200
    
    Create Session        prometheus    http://localhost:9090
    \${prom_health}=      GET On Session    prometheus    /-/healthy    timeout=10
    Should Be Equal       \${prom_health.status_code}    200
    
    Log                   Performance testing infrastructure ready

Create Comprehensive Test Scenarios
    [Documentation]    Desarrolla scenarios de testing para e-commerce enterprise
    [Tags]             scenarios    test_design    comprehensive
    
    # Scenario 1: User Journey Completo
    \${user_journey}=     Create Dictionary
    ...                   name=complete_user_journey
    ...                   weight=60
    ...                   tasks=@{[]}
    
    @{journey_tasks}=     Create List
    ...                   browse_homepage
    ...                   search_products
    ...                   view_product_details
    ...                   add_to_cart
    ...                   checkout_process
    ...                   payment_completion
    
    Set To Dictionary     \${user_journey}    tasks=\${journey_tasks}
    
    # Scenario 2: API Heavy Operations
    \${api_scenario}=     Create Dictionary
    ...                   name=api_intensive_operations
    ...                   weight=25
    ...                   tasks=@{["bulk_product_import", "analytics_queries", "user_data_export"]}
    
    # Scenario 3: Admin Operations
    \${admin_scenario}=   Create Dictionary
    ...                   name=admin_operations
    ...                   weight=15
    ...                   tasks=@{["inventory_management", "order_processing", "report_generation"]}
    
    @{test_scenarios}=    Create List    \${user_journey}    \${api_scenario}    \${admin_scenario}
    
    # Generar archivo Locustfile completo
    \${locustfile_content}= Generate Locustfile    \${test_scenarios}
    Create File           \${PROJECT_DIR}/locust/locustfile.py    \${locustfile_content}
    
    # Crear configuraciones de carga por tipo de test
    \${load_configs}=     Create Dictionary
    ...                   load_test=@{[{'users': \${LOAD_USERS}, 'duration': \${TEST_DURATION}, 'ramp_up': \${RAMP_UP_TIME}}]}
    ...                   stress_test=@{[{'users': \${STRESS_USERS}, 'duration': 900, 'ramp_up': 180}]}
    ...                   endurance_test=@{[{'users': 1000, 'duration': \${ENDURANCE_HOURS}*3600, 'ramp_up': 600}]}
    ...                   spike_test=@{[{'users': 3000, 'duration': 300, 'ramp_up': 60}]}
    
    \${configs_json}=     Evaluate    json.dumps(\${load_configs}, indent=2)
    Create File           \${CONFIG_DIR}/load_configurations.json    \${configs_json}
    
    Log                   Comprehensive test scenarios created
    Log                   User journey weight: 60%
    Log                   API operations weight: 25%
    Log                   Admin operations weight: 15%

Execute Multi-Phase Load Testing
    [Documentation]    Ejecuta testing de carga en múltiples fases
    [Tags]             load_testing    multi_phase    execution
    
    # Fase 1: Baseline Performance Testing
    Log                   PHASE 1: Baseline Performance Testing
    \${baseline_start}=   Get Current Date    result_format=epoch
    
    \${baseline_result}=  Run Process    locust    
    ...                   -f    \${PROJECT_DIR}/locust/locustfile.py    
    ...                   --headless    
    ...                   --users    100    
    ...                   --spawn-rate    10    
    ...                   --run-time    300s    
    ...                   --host    \${APP_URL}    
    ...                   --csv    \${RESULTS_DIR}/baseline
    
    \${baseline_end}=     Get Current Date    result_format=epoch
    Should Be Equal       \${baseline_result.rc}    0
    \${baseline_duration}= Evaluate    \${baseline_end} - \${baseline_start}
    
    # Fase 2: Load Testing (objetivo principal)
    Log                   PHASE 2: Full Load Testing
    \${load_start}=       Get Current Date    result_format=epoch
    
    \${load_result}=      Run Process    locust    
    ...                   -f    \${PROJECT_DIR}/locust/locustfile.py    
    ...                   --headless    
    ...                   --users    \${LOAD_USERS}    
    ...                   --spawn-rate    \${LOAD_USERS}/\${RAMP_UP_TIME}    
    ...                   --run-time    \${TEST_DURATION}s    
    ...                   --host    \${APP_URL}    
    ...                   --csv    \${RESULTS_DIR}/load_test
    
    \${load_end}=         Get Current Date    result_format=epoch
    Should Be Equal       \${load_result.rc}    0
    \${load_duration}=    Evaluate    \${load_end} - \${load_start}
    
    # Fase 3: Stress Testing (encontrar límites)
    Log                   PHASE 3: Stress Testing
    \${stress_start}=     Get Current Date    result_format=epoch
    
    \${stress_result}=    Run Process    locust    
    ...                   -f    \${PROJECT_DIR}/locust/locustfile.py    
    ...                   --headless    
    ...                   --users    \${STRESS_USERS}    
    ...                   --spawn-rate    50    
    ...                   --run-time    900s    
    ...                   --host    \${APP_URL}    
    ...                   --csv    \${RESULTS_DIR}/stress_test
    
    \${stress_end}=       Get Current Date    result_format=epoch
    Should Be Equal       \${stress_result.rc}    0
    \${stress_duration}=  Evaluate    \${stress_end} - \${stress_start}
    
    # Verificar archivos de resultados
    File Should Exist     \${RESULTS_DIR}/baseline_stats.csv
    File Should Exist     \${RESULTS_DIR}/load_test_stats.csv
    File Should Exist     \${RESULTS_DIR}/stress_test_stats.csv
    
    Log                   Multi-phase load testing completed
    Log                   Baseline phase: \${baseline_duration}s
    Log                   Load phase: \${load_duration}s
    Log                   Stress phase: \${stress_duration}s

Implement Real-time Performance Monitoring
    [Documentation]    Configura monitoreo en tiempo real durante tests
    [Tags]             monitoring    realtime    observability
    
    # Configurar Prometheus targets
    \${prometheus_config}= Create Dictionary
    ...                    global=@{[{'scrape_interval': '15s'}]}
    ...                    scrape_configs=@{[]}
    
    # Target para métricas de aplicación
    \${app_target}=       Create Dictionary
    ...                   job_name=ecommerce-app
    ...                   static_configs=@{[{'targets': ['\${APP_URL}:8080']}]}
    ...                   metrics_path=/metrics
    ...                   scrape_interval=10s
    
    # Target para métricas de Locust
    \${locust_target}=    Create Dictionary
    ...                   job_name=locust-metrics
    ...                   static_configs=@{[{'targets': ['localhost:8089']}]}
    ...                   metrics_path=/stats/requests
    
    @{scrape_configs}=    Create List    \${app_target}    \${locust_target}
    Set To Dictionary     \${prometheus_config}    scrape_configs=\${scrape_configs}
    
    \${prom_yaml}=        Evaluate    yaml.dump(\${prometheus_config})
    Create File           \${PROJECT_DIR}/prometheus.yml    \${prom_yaml}
    
    # Recargar configuración Prometheus
    \${reload_result}=    POST On Session    prometheus    /-/reload    timeout=10
    Should Be Equal       \${reload_result.status_code}    200
    
    # Configurar dashboard Grafana automáticamente
    Create Session        grafana    http://localhost:3000
    \${grafana_auth}=     Create List    admin    admin123
    
    # Crear datasource Prometheus
    \${datasource_config}= Create Dictionary
    ...                    name=Prometheus
    ...                    type=prometheus
    ...                    url=http://prometheus:9090
    ...                    access=proxy
    ...                    isDefault=true
    
    \${ds_response}=      POST On Session    grafana    /api/datasources    
    ...                   json=\${datasource_config}    auth=\${grafana_auth}    timeout=10
    Should Be Equal       \${ds_response.status_code}    200
    
    # Importar dashboard pre-configurado
    \${dashboard_json}=   Get File    \${CONFIG_DIR}/performance_dashboard.json
    \${dashboard_config}= Evaluate    json.loads(r'''\${dashboard_json}''')
    
    \${import_payload}=   Create Dictionary
    ...                   dashboard=\${dashboard_config}
    ...                   overwrite=true
    
    \${dashboard_response}= POST On Session    grafana    /api/dashboards/db    
    ...                     json=\${import_payload}    auth=\${grafana_auth}    timeout=15
    Should Be Equal        \${dashboard_response.status_code}    200
    
    \${dashboard_url}=     Set Variable    http://localhost:3000\${dashboard_response.json()['url']}
    Set Global Variable    \${DASHBOARD_URL}    \${dashboard_url}
    
    Log                    Real-time monitoring configured
    Log                    Prometheus: http://localhost:9090
    Log                    Grafana Dashboard: \${dashboard_url}

Execute Performance Analysis and Optimization
    [Documentation]    Analiza resultados y aplica optimizaciones
    [Tags]             analysis    optimization    improvement
    
    # Analizar resultados de load testing
    \${load_stats}=       Get File    \${RESULTS_DIR}/load_test_stats.csv
    \${load_metrics}=     Parse Load Test Results    \${load_stats}
    
    # Extraer métricas clave
    \${avg_response}=     Set Variable    \${load_metrics['avg_response_time']}
    \${p95_response}=     Set Variable    \${load_metrics['p95_response_time']}
    \${throughput}=       Set Variable    \${load_metrics['requests_per_second']}
    \${error_rate}=       Set Variable    \${load_metrics['error_rate']}
    
    # Validar contra SLAs enterprise
    \${sla_compliance}=   Create Dictionary
    Run Keyword If        \${avg_response} <= \${SLA_TARGETS.response_time}
    ...                   Set To Dictionary    \${sla_compliance}    response_time=PASS
    ...                   ELSE    Set To Dictionary    \${sla_compliance}    response_time=FAIL
    
    Run Keyword If        \${throughput} >= \${SLA_TARGETS.throughput}
    ...                   Set To Dictionary    \${sla_compliance}    throughput=PASS
    ...                   ELSE    Set To Dictionary    \${sla_compliance}    throughput=FAIL
    
    Run Keyword If        \${error_rate} <= \${SLA_TARGETS.error_rate}
    ...                   Set To Dictionary    \${sla_compliance}    error_rate=PASS
    ...                   ELSE    Set To Dictionary    \${sla_compliance}    error_rate=FAIL
    
    # Identificar areas de optimización
    @{optimization_areas}= Create List
    Run Keyword If        \${avg_response} > \${SLA_TARGETS.response_time}
    ...                   Append To List    \${optimization_areas}    response_time_optimization
    
    Run Keyword If        \${throughput} < \${SLA_TARGETS.throughput}
    ...                   Append To List    \${optimization_areas}    throughput_optimization
    
    Run Keyword If        \${error_rate} > \${SLA_TARGETS.error_rate}
    ...                   Append To List    \${optimization_areas}    error_rate_optimization
    
    # Aplicar optimizaciones automáticas
    FOR    \${area}    IN    @{optimization_areas}
        Execute Optimization Strategy    \${area}
        Log    Applied optimization: \${area}
    END
    
    # Re-ejecutar subset de tests para validar mejoras
    \${validation_result}= Run Process    locust    
    ...                    -f    \${PROJECT_DIR}/locust/locustfile.py    
    ...                    --headless    
    ...                    --users    500    
    ...                    --spawn-rate    25    
    ...                    --run-time    600s    
    ...                    --host    \${APP_URL}    
    ...                    --csv    \${RESULTS_DIR}/post_optimization
    
    Should Be Equal        \${validation_result.rc}    0
    
    Log                    Performance analysis completed
    Log                    Response time SLA: \${sla_compliance['response_time']}
    Log                    Throughput SLA: \${sla_compliance['throughput']}
    Log                    Error rate SLA: \${sla_compliance['error_rate']}

Generate Enterprise Performance Report
    [Documentation]    Genera reporte ejecutivo comprehensivo
    [Tags]             reporting    enterprise    executive
    
    # Compilar datos de todas las fases de testing
    \${project_data}=     Create Dictionary
    ...                   project_name=\${PROJECT_NAME}
    ...                   test_date=\${CURRENT_DATE}
    ...                   app_url=\${APP_URL}
    ...                   total_users_tested=\${STRESS_USERS}
    ...                   test_duration_hours=\${ENDURANCE_HOURS}
    
    # Métricas de performance consolidadas
    \${baseline_metrics}= Parse Test Results    \${RESULTS_DIR}/baseline_stats.csv
    \${load_metrics}=     Parse Test Results    \${RESULTS_DIR}/load_test_stats.csv
    \${stress_metrics}=   Parse Test Results    \${RESULTS_DIR}/stress_test_stats.csv
    \${optimized_metrics}= Parse Test Results    \${RESULTS_DIR}/post_optimization_stats.csv
    
    Set To Dictionary     \${project_data}    baseline_metrics=\${baseline_metrics}
    Set To Dictionary     \${project_data}    load_metrics=\${load_metrics}
    Set To Dictionary     \${project_data}    stress_metrics=\${stress_metrics}
    Set To Dictionary     \${project_data}    optimized_metrics=\${optimized_metrics}
    
    # Calcular mejoras y ROI
    \${performance_improvement}= Calculate Improvement Percentage    \${load_metrics}    \${optimized_metrics}
    \${capacity_recommendation}= Calculate Capacity Needs    \${stress_metrics}
    \${cost_analysis}=    Calculate Infrastructure Costs    \${capacity_recommendation}
    
    Set To Dictionary     \${project_data}    performance_improvement=\${performance_improvement}
    Set To Dictionary     \${project_data}    capacity_recommendation=\${capacity_recommendation}
    Set To Dictionary     \${project_data}    cost_analysis=\${cost_analysis}
    
    # Generar reporte ejecutivo HTML
    \${executive_template}= Get File    templates/executive_report.html
    \${executive_report}=   Render Template    \${executive_template}    \${project_data}
    Create File            \${REPORTS_DIR}/executive_performance_report.html    \${executive_report}
    
    # Generar reporte técnico detallado
    \${technical_template}= Get File    templates/technical_report.html
    \${technical_report}=   Render Template    \${technical_template}    \${project_data}
    Create File            \${REPORTS_DIR}/technical_performance_report.html    \${technical_report}
    
    # Generar datos para APIs y integrations
    \${json_report}=       Evaluate    json.dumps(\${project_data}, indent=2)
    Create File            \${REPORTS_DIR}/performance_data.json    \${json_report}
    
    # Generar CSV para análisis de datos
    \${csv_report}=        Generate CSV Report    \${project_data}
    Create File            \${REPORTS_DIR}/performance_metrics.csv    \${csv_report}
    
    # Generar presentación ejecutiva (PowerPoint data)
    \${presentation_data}= Create Presentation Data    \${project_data}
    \${ppt_json}=          Evaluate    json.dumps(\${presentation_data}, indent=2)
    Create File            \${REPORTS_DIR}/presentation_data.json    \${ppt_json}
    
    # Verificar todos los reportes generados
    File Should Exist      \${REPORTS_DIR}/executive_performance_report.html
    File Should Exist      \${REPORTS_DIR}/technical_performance_report.html
    File Should Exist      \${REPORTS_DIR}/performance_data.json
    File Should Exist      \${REPORTS_DIR}/performance_metrics.csv
    File Should Exist      \${REPORTS_DIR}/presentation_data.json
    
    Log                    Enterprise performance report generated
    Log                    Executive Report: \${REPORTS_DIR}/executive_performance_report.html
    Log                    Technical Report: \${REPORTS_DIR}/technical_performance_report.html
    Log                    Performance improvement: \${performance_improvement}%

*** Keywords ***
Initialize Performance Project
    Log                    🎯 Initializing enterprise performance testing project
    Set Global Variable    \${CURRENT_DATE}    2024-01-15
    
    # Crear templates de configuración
    Create File            templates/executive_report.html    <html><body><h1>Executive Performance Report</h1></body></html>
    Create File            templates/technical_report.html    <html><body><h1>Technical Performance Analysis</h1></body></html>
    Create File            \${CONFIG_DIR}/performance_dashboard.json    {"dashboard": {"title": "Performance Monitoring"}}

Generate Locustfile
    [Arguments]           \${scenarios}
    \${content}=          Set Variable    from locust import HttpUser, task, between\n\nclass PerformanceUser(HttpUser):\n    wait_time = between(1, 3)
    RETURN                \${content}

Parse Load Test Results
    [Arguments]           \${csv_data}
    \${metrics}=          Create Dictionary    avg_response_time=850    p95_response_time=1200    requests_per_second=245    error_rate=0.3
    RETURN                \${metrics}

Parse Test Results
    [Arguments]           \${results_file}
    \${metrics}=          Create Dictionary    response_time=920    throughput=185    error_rate=0.4
    RETURN                \${metrics}

Execute Optimization Strategy
    [Arguments]           \${strategy}
    Log                   Executing optimization strategy: \${strategy}

Calculate Improvement Percentage
    [Arguments]           \${before}    \${after}
    \${improvement}=      Set Variable    18.5
    RETURN                \${improvement}

Calculate Capacity Needs
    [Arguments]           \${stress_metrics}
    \${capacity}=         Create Dictionary    recommended_instances=8    peak_capacity_users=4500
    RETURN                \${capacity}

Calculate Infrastructure Costs
    [Arguments]           \${capacity_data}
    \${costs}=            Create Dictionary    monthly_cost=2800    annual_cost=33600    savings_potential=15000
    RETURN                \${costs}

Render Template
    [Arguments]           \${template}    \${data}
    \${rendered}=         Set Variable    <html><body><h1>Performance Report Generated</h1></body></html>
    RETURN                \${rendered}

Generate CSV Report
    [Arguments]           \${data}
    \${csv}=              Set Variable    phase,response_time,throughput,error_rate\nbaseline,850,185,0.3\nload,920,245,0.4
    RETURN                \${csv}

Create Presentation Data
    [Arguments]           \${project_data}
    \${presentation}=     Create Dictionary    title=Enterprise Performance Testing Results    slides=5    key_findings=@{["18.5% improvement", "99.95% availability achieved"]}
    RETURN                \${presentation}

Archive Project Results
    Log                   📁 Archiving enterprise performance testing project
    Log                   Project artifacts saved to: \${PROJECT_DIR}
    Run Process           docker-compose    down    cwd=\${PROJECT_DIR}</code></pre>
        
        <h3>🎯 Proyecto Enterprise (15 min):</h3>
        <p>1. Configura infraestructura Docker con Locust distribuido + Prometheus + Grafana</p>
        <p>2. Diseña scenarios comprehensivos: user journey, API operations, admin tasks</p>
        <p>3. Ejecuta testing multi-fase: baseline, load, stress, endurance</p>
        <p>4. Implementa monitoreo en tiempo real con dashboards automáticos</p>
        <p>5. Aplica análisis de performance y optimizaciones automáticas</p>
        <p>6. Genera reportes ejecutivos y técnicos multi-formato</p>
        <p>7. Calcula ROI y recomendaciones de capacity planning</p>
        <p>8. Integra con CI/CD para testing continuo</p>
        <p>9. Implementa alertas y escalamiento automático</p>
        <p>10. Documenta runbooks de performance testing enterprise</p>
        <p>11. Crea presentation data para stakeholders ejecutivos</p>
        <p>12. Configura archiving automático de resultados históricos</p>
        <p>13. Valida compliance con SLAs enterprise establecidos</p>
        <p>14. Implementa post-optimization validation testing</p>
        <p>15. Establece baseline para futuras comparaciones</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar stack completo de performance testing enterprise</li>
                <li>Ejecutar testing comprehensivo multi-fase con automation</li>
                <li>Implementar monitoreo y optimization automática</li>
                <li>Generar reportes ejecutivos con ROI y recomendaciones</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa docker-compose para infraestructura: permite scaling horizontal de workers Locust fácilmente con --scale locust_worker=8.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 212 - Security testing introduction</h3>
        <p>Con performance testing enterprise dominado, iniciarás security testing para proteger aplicaciones contra vulnerabilidades y ataques.</p>
    `,
    topics: ["performance", "project"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 20,
    difficulty: "advanced",
    prerequisites: ["lesson-210"],
    type: "capstone"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_211 = LESSON_211;
}