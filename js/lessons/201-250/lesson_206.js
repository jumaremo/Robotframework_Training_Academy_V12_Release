/**
 * Robot Framework Academy - Lesson 206
 * Performance 206
 */

const LESSON_206 = {
    id: 206,
    title: "Performance 206",
    duration: "10 min",
    level: "advanced",
    section: "section-16",
    content: `
        <h2>🤖 Automation Completa</h2>
        <p>Automatiza completamente el ciclo de performance testing integrado con CI/CD pipelines.</p>
        
        <h3>💻 Pipeline Automatizado:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    🤖 AUTOMATED PERFORMANCE TESTING PIPELINE
Library          Process
Library          RequestsLibrary
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          JSON
Suite Setup      Initialize Automated Pipeline
Suite Teardown   Cleanup Pipeline Resources

*** Variables ***
\${PIPELINE_CONFIG}    performance_pipeline.json
\${JENKINS_URL}        http://jenkins.company.com:8080
\${PERFORMANCE_BRANCH} performance-testing
\${TEST_RESULTS_DIR}   ./performance_results
\${BASELINE_FILE}      performance_baseline.json
\${THRESHOLD_DEGRADATION} 10.0
\${AUTO_ROLLBACK}      True
\${NOTIFICATION_WEBHOOK} https://hooks.slack.com/webhook
&{PIPELINE_STAGES}     build=True    test=True    deploy=True    monitor=True

*** Test Cases ***
Trigger Automated Performance Pipeline
    [Documentation]    Inicia pipeline automatizado desde commit
    [Tags]             automation    pipeline    trigger
    
    # Detectar cambios en repositorio
    \${git_result}=       Run Process    git    log    --oneline    -1
    Should Be Equal       \${git_result.rc}    0
    \${latest_commit}=    Set Variable    \${git_result.stdout}
    
    # Verificar si es commit que requiere performance testing
    \${requires_perf_test}= Run Keyword If    'perf' in '\${latest_commit}' or 'performance' in '\${latest_commit}'
    ...                     Set Variable    True
    ...                     ELSE    Set Variable    False
    
    Run Keyword If        \${requires_perf_test}
    ...                   Execute Full Performance Pipeline    \${latest_commit}
    ...                   ELSE    Log    Skipping performance tests - no performance changes detected
    
    Should Be True        \${requires_perf_test}
    Log                   Performance pipeline triggered for commit: \${latest_commit}

Execute Full Performance Pipeline
    [Arguments]           \${commit_hash}
    [Documentation]       Ejecuta pipeline completo con validación automática
    [Tags]                execution    validation    automated
    
    # Stage 1: Build y preparación
    Run Keyword If        \${PIPELINE_STAGES.build}
    ...                   Execute Build Stage    \${commit_hash}
    
    # Stage 2: Performance testing
    Run Keyword If        \${PIPELINE_STAGES.test}
    ...                   Execute Performance Testing Stage
    
    # Stage 3: Análisis y validación
    \${performance_results}= Analyze Performance Results
    \${baseline_comparison}= Compare Against Baseline    \${performance_results}
    
    # Stage 4: Decisión automática deploy/rollback  
    Run Keyword If        \${baseline_comparison.passed}
    ...                   Execute Deploy Stage    \${commit_hash}
    ...                   ELSE    Execute Rollback Stage    \${baseline_comparison.degradation}
    
    # Stage 5: Monitoreo post-deploy
    Run Keyword If        \${PIPELINE_STAGES.monitor} and \${baseline_comparison.passed}
    ...                   Execute Monitoring Stage
    
    Log                   Full pipeline executed for commit: \${commit_hash}

Execute Build Stage
    [Arguments]           \${commit}
    [Documentation]       Construye aplicación con optimizaciones de performance
    [Tags]                build    optimization    preparation
    
    # Checkout del commit específico
    \${checkout_result}=   Run Process    git    checkout    \${commit}
    Should Be Equal       \${checkout_result.rc}    0
    
    # Build optimizado para performance
    \${build_result}=     Run Process    docker    build    
    ...                   -t    app:perf-\${commit}    
    ...                   --build-arg    OPTIMIZE=true    
    ...                   --build-arg    PROFILE=performance    
    ...                   .
    Should Be Equal       \${build_result.rc}    0
    
    # Verificar imagen construida
    \${image_check}=      Run Process    docker    images    app:perf-\${commit}
    Should Contain        \${image_check.stdout}    app:perf-\${commit}
    
    # Iniciar contenedor para testing
    \${container_result}= Run Process    docker    run    -d    
    ...                   --name    perf-test-app    
    ...                   -p    8080:8080    
    ...                   app:perf-\${commit}
    Should Be Equal       \${container_result.rc}    0
    
    # Verificar que aplicación responde
    Sleep                 10s
    Create Session        app    http://localhost:8080
    \${health_response}=  GET On Session    app    /health    timeout=30
    Should Be Equal       \${health_response.status_code}    200
    
    Log                   Build stage completed successfully

Execute Performance Testing Stage
    [Documentation]       Ejecuta batería completa de performance tests
    [Tags]                testing    performance    automated
    
    Create Directory      \${TEST_RESULTS_DIR}
    
    # Test 1: Load testing con usuarios graduales
    \${load_start}=       Get Current Date    result_format=epoch
    \${load_result}=      Run Process    
    ...                   locust    -f    loadtest.py    
    ...                   --headless    --users    1000    
    ...                   --spawn-rate    50    
    ...                   --run-time    300s    
    ...                   --host    http://localhost:8080    
    ...                   --csv    \${TEST_RESULTS_DIR}/load_test
    \${load_end}=         Get Current Date    result_format=epoch
    
    Should Be Equal       \${load_result.rc}    0
    \${load_duration}=    Evaluate    \${load_end} - \${load_start}
    Log                   Load testing completed in \${load_duration} seconds
    
    # Test 2: Stress testing para encontrar límites
    \${stress_result}=    Run Process    
    ...                   artillery    run    
    ...                   --target    http://localhost:8080    
    ...                   --output    \${TEST_RESULTS_DIR}/stress_test.json    
    ...                   stress_test_config.yml
    Should Be Equal       \${stress_result.rc}    0
    
    # Test 3: Endurance testing para memory leaks
    \${endurance_result}= Run Process    
    ...                   python    endurance_test.py    
    ...                   --duration    1800    
    ...                   --target    http://localhost:8080    
    ...                   --output    \${TEST_RESULTS_DIR}/endurance.json
    Should Be Equal       \${endurance_result.rc}    0
    
    # Verificar archivos de resultados
    File Should Exist     \${TEST_RESULTS_DIR}/load_test_stats.csv
    File Should Exist     \${TEST_RESULTS_DIR}/stress_test.json  
    File Should Exist     \${TEST_RESULTS_DIR}/endurance.json
    
    Log                   Performance testing stage completed

Analyze Performance Results
    [Documentation]       Analiza y consolida resultados de performance
    [Tags]                analysis    metrics    consolidation
    
    # Parsear resultados de load test
    \${load_stats}=       Get File    \${TEST_RESULTS_DIR}/load_test_stats.csv
    \${load_metrics}=     Parse Load Test Results    \${load_stats}
    
    # Parsear resultados de stress test
    \${stress_data}=      Get File    \${TEST_RESULTS_DIR}/stress_test.json
    \${stress_json}=      Evaluate    json.loads(r'''\${stress_data}''')
    \${stress_metrics}=   Parse Stress Test Results    \${stress_json}
    
    # Parsear resultados de endurance test
    \${endurance_data}=   Get File    \${TEST_RESULTS_DIR}/endurance.json
    \${endurance_json}=   Evaluate    json.loads(r'''\${endurance_data}''')
    \${endurance_metrics}= Parse Endurance Test Results    \${endurance_json}
    
    # Consolidar métricas principales
    \${consolidated_results}= Create Dictionary
    ...                       avg_response_time=\${load_metrics.avg_response_time}
    ...                       max_rps=\${stress_metrics.max_rps}
    ...                       error_rate=\${load_metrics.error_rate}
    ...                       memory_stable=\${endurance_metrics.memory_stable}
    ...                       cpu_average=\${endurance_metrics.cpu_average}
    
    # Validar métricas contra criterios de aceptación
    Should Be True        \${consolidated_results.avg_response_time} < 1500
    Should Be True        \${consolidated_results.max_rps} > 500
    Should Be True        \${consolidated_results.error_rate} < 1.0
    Should Be True        \${consolidated_results.memory_stable}
    Should Be True        \${consolidated_results.cpu_average} < 80.0
    
    Log                   Performance analysis completed
    Log                   Avg Response Time: \${consolidated_results.avg_response_time}ms
    Log                   Max RPS: \${consolidated_results.max_rps}
    Log                   Error Rate: \${consolidated_results.error_rate}%
    
    RETURN                \${consolidated_results}

Compare Against Baseline
    [Arguments]           \${current_results}
    [Documentation]       Compara resultados actuales con baseline histórico
    [Tags]                comparison    baseline    validation
    
    # Cargar baseline histórico
    \${baseline_exists}=   Run Keyword And Return Status    File Should Exist    \${BASELINE_FILE}
    
    Run Keyword If        not \${baseline_exists}
    ...                   Create Initial Baseline    \${current_results}
    ...                   ELSE    Compare With Historical Baseline    \${current_results}
    
    # Si no hay baseline, crear uno nuevo
    Return From Keyword If    not \${baseline_exists}    &{passed=True, degradation=0.0}
    
    # Cargar baseline existente
    \${baseline_data}=    Get File    \${BASELINE_FILE}
    \${baseline_results}= Evaluate    json.loads(r'''\${baseline_data}''')
    
    # Calcular degradación porcentual
    \${response_time_change}= Evaluate    
    ...    ((\${current_results.avg_response_time} - \${baseline_results.avg_response_time}) / \${baseline_results.avg_response_time}) * 100
    \${rps_change}=       Evaluate    
    ...    ((\${baseline_results.max_rps} - \${current_results.max_rps}) / \${baseline_results.max_rps}) * 100
    \${error_rate_change}= Evaluate    
    ...    \${current_results.error_rate} - \${baseline_results.error_rate}
    
    # Determinar si hay degradación significativa
    \${has_degradation}=  Evaluate    
    ...    \${response_time_change} > \${THRESHOLD_DEGRADATION} or \${rps_change} > \${THRESHOLD_DEGRADATION} or \${error_rate_change} > 0.5
    
    \${comparison_result}= Create Dictionary
    ...                    passed=\${not has_degradation}
    ...                    degradation=\${response_time_change}
    ...                    rps_degradation=\${rps_change}
    ...                    error_increase=\${error_rate_change}
    
    Log                   Baseline comparison completed
    Log                   Response time change: \${response_time_change}%
    Log                   RPS change: \${rps_change}%
    Log                   Performance acceptable: \${comparison_result.passed}
    
    RETURN                \${comparison_result}

Execute Deploy Stage
    [Arguments]           \${commit}
    [Documentation]       Despliega nueva versión si performance es aceptable
    [Tags]                deploy    automation    conditional
    
    Log                   Performance tests passed - proceeding with deployment
    
    # Deploy a staging primero
    \${staging_deploy}=   Run Process    
    ...                   kubectl    set    image    
    ...                   deployment/app    app=app:perf-\${commit}    
    ...                   --namespace=staging
    Should Be Equal       \${staging_deploy.rc}    0
    
    # Verificar deployment en staging
    Sleep                 30s
    Create Session        staging    https://staging.company.com
    \${staging_health}=   GET On Session    staging    /health    timeout=60
    Should Be Equal       \${staging_health.status_code}    200
    
    # Smoke tests en staging
    \${smoke_result}=     Run Process    
    ...                   robot    --variable    ENV:staging    
    ...                   --outputdir    \${TEST_RESULTS_DIR}/staging_smoke    
    ...                   smoke_tests.robot
    Should Be Equal       \${smoke_result.rc}    0
    
    # Deploy a producción si staging OK
    \${prod_deploy}=      Run Process    
    ...                   kubectl    set    image    
    ...                   deployment/app    app=app:perf-\${commit}    
    ...                   --namespace=production
    Should Be Equal       \${prod_deploy.rc}    0
    
    Log                   Deployment to production completed successfully
    Send Notification     SUCCESS    Deployment completed with performance validation

Execute Rollback Stage
    [Arguments]           \${degradation_percent}
    [Documentation]       Ejecuta rollback automático por degradación performance
    [Tags]                rollback    automation    safety
    
    Log                   Performance degradation detected: \${degradation_percent}%
    Log                   Executing automatic rollback
    
    # Obtener última versión estable
    \${last_stable}=      Run Process    
    ...                   kubectl    rollout    history    
    ...                   deployment/app    --namespace=production
    Should Be Equal       \${last_stable.rc}    0
    
    # Ejecutar rollback
    \${rollback_result}=  Run Process    
    ...                   kubectl    rollout    undo    
    ...                   deployment/app    --namespace=production
    Should Be Equal       \${rollback_result.rc}    0
    
    # Verificar rollback exitoso
    Sleep                 30s
    Create Session        prod    https://app.company.com
    \${prod_health}=      GET On Session    prod    /health    timeout=60
    Should Be Equal       \${prod_health.status_code}    200
    
    Log                   Automatic rollback completed successfully
    Send Notification     ROLLBACK    Performance degradation triggered automatic rollback

Execute Monitoring Stage
    [Documentation]       Activa monitoreo intensivo post-deployment
    [Tags]                monitoring    post-deploy    tracking
    
    # Configurar alertas específicas para nuevo deployment
    \${alert_config}=     Create Dictionary
    ...                   name=Post-Deploy Performance Monitor
    ...                   duration=3600
    ...                   thresholds=@{[{'metric': 'response_time', 'value': 1500}, {'metric': 'error_rate', 'value': 0.5}]}
    
    # Activar monitoreo intensivo por 1 hora
    Create Session        monitoring    http://prometheus.company.com:9090
    \${monitoring_result}= POST On Session    monitoring    /api/v1/rules    json=\${alert_config}
    Should Be Equal       \${monitoring_result.status_code}    200
    
    # Programar validación en 1 hora
    \${validation_job}=   Run Process    
    ...                   at    now + 1 hour    
    ...                   input=robot --variable ENV:production post_deploy_validation.robot
    Should Be Equal       \${validation_job.rc}    0
    
    Log                   Intensive monitoring activated for 1 hour
    Set Global Variable   \${MONITORING_ACTIVE}    True

*** Keywords ***
Initialize Automated Pipeline
    Log                   🚀 Initializing automated performance pipeline
    Create Directory      \${TEST_RESULTS_DIR}
    Set Global Variable   \${CURRENT_DATE}    2024-01-15

Parse Load Test Results
    [Arguments]           \${csv_data}
    \${metrics}=          Create Dictionary    avg_response_time=850    error_rate=0.2
    RETURN                \${metrics}

Parse Stress Test Results
    [Arguments]           \${json_data}
    \${metrics}=          Create Dictionary    max_rps=750
    RETURN                \${metrics}

Parse Endurance Test Results
    [Arguments]           \${json_data}
    \${metrics}=          Create Dictionary    memory_stable=True    cpu_average=65.0
    RETURN                \${metrics}

Create Initial Baseline
    [Arguments]           \${results}
    \${baseline_json}=    Evaluate    json.dumps(\${results}, indent=2)
    Create File           \${BASELINE_FILE}    \${baseline_json}
    Log                   Created initial performance baseline

Compare With Historical Baseline
    [Arguments]           \${current_results}
    Log                   Comparing with historical baseline

Send Notification
    [Arguments]           \${status}    \${message}
    Log                   Notification sent: \${status} - \${message}

Cleanup Pipeline Resources
    Log                   🧹 Cleaning up automated pipeline resources
    Run Process           docker    stop    perf-test-app
    Run Process           docker    rm    perf-test-app</code></pre>
        
        <h3>🎯 Práctica Automation (7 min):</h3>
        <p>1. Configura webhook de GitHub para trigger automático</p>
        <p>2. Crea pipeline Jenkins con stages de performance</p>
        <p>3. Implementa comparación automática con baseline</p>
        <p>4. Configura rollback automático por degradación</p>
        <p>5. Integra notificaciones Slack para resultados</p>
        <p>6. Crea smoke tests post-deployment automatizados</p>
        <p>7. Implementa monitoreo intensivo temporal</p>
        <p>8. Configura alertas específicas por deployment</p>
        <p>9. Automatiza generación de reportes ejecutivos</p>
        <p>10. Documenta runbook completo del pipeline automatizado</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar completamente el ciclo de performance testing</li>
                <li>Implementar validación automática contra baselines</li>
                <li>Configurar deploy/rollback condicional basado en métricas</li>
                <li>Establecer monitoreo post-deploy automático</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa "at" command para programar validaciones futuras: at now + 1 hour < script.sh programa ejecución diferida.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 207 - Performance regression testing</h3>
        <p>Con automation completa, implementarás regression testing automatizado para detectar degradaciones de performance entre releases.</p>
    `,
    topics: ["performance", "load", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-205"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_206 = LESSON_206;
}