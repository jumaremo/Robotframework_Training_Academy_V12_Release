/**
 * Robot Framework Academy - Lesson 201
 * CI/CD pipeline project
 */

const LESSON_201 = {
    id: 201,
    title: "CI/CD pipeline project",
    duration: "20 min",
    level: "advanced",
    section: "section-15",
    content: `
        <h2>🔧 Pipeline Completo</h2>
        <p>Construye un pipeline CI/CD enterprise con Robot Framework, Docker y Jenkins.</p>
        
        <h3>💻 Pipeline Avanzado:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    🚀 PIPELINE CI/CD ENTERPRISE PROJECT
Library          SeleniumLibrary
Library          RequestsLibrary
Library          Process
Library          OperatingSystem
Library          Collections
Suite Setup      Initialize Pipeline Environment
Suite Teardown   Cleanup Pipeline Resources

*** Variables ***
\${DOCKER_IMAGE}       rf-tests:latest
\${JENKINS_URL}        http://jenkins.company.com:8080
\${PIPELINE_NAME}      robot-framework-pipeline
\${BUILD_NUMBER}       \${EMPTY}
\${TEST_ENV}           staging
\${PARALLEL_WORKERS}   4
\${SLACK_WEBHOOK}      https://hooks.slack.com/webhook
\${RESULTS_PATH}       /opt/robot/results
&{ENVIRONMENTS}        dev=https://dev.app.com    staging=https://staging.app.com    prod=https://app.com

*** Test Cases ***
Setup Docker Environment
    [Documentation]    Configura contenedores para testing paralelo
    [Tags]             setup    docker    environment
    
    Log                Setting up Docker environment for pipeline
    Run Process        docker    build    -t    \${DOCKER_IMAGE}    .
    Should Be Equal    \${RESULT.rc}    0
    Run Process        docker    network    create    rf-network
    Should Be Equal    \${RESULT.rc}    0
    
    # Crear containers paralelos para testing
    FOR    \${worker}    IN RANGE    \${PARALLEL_WORKERS}
        Run Process        docker    run    -d    --name    rf-worker-\${worker}    --network    rf-network    \${DOCKER_IMAGE}
        Should Be Equal    \${RESULT.rc}    0
    END
    
    Log                Docker environment ready with \${PARALLEL_WORKERS} workers

Execute Smoke Tests Pipeline
    [Documentation]    Tests críticos que deben pasar siempre
    [Tags]             smoke    critical    pipeline
    
    # Health check del sistema
    Create Session     api    \${ENVIRONMENTS.staging}
    \${response}=      GET On Session    api    /health
    Should Be Equal    \${response.status_code}    200
    Should Contain     \${response.text}    healthy
    
    # Verificar servicios críticos
    Open Browser       \${ENVIRONMENTS.staging}    chrome    options=add_argument("--headless")
    Title Should Be    Application Dashboard
    Page Should Contain    Welcome
    Element Should Be Visible    id=main-navigation
    Element Should Be Enabled    id=login-button
    Close Browser
    
    Log                Smoke tests passed - system healthy

Run Parallel Test Execution
    [Documentation]    Ejecuta suites en paralelo para velocidad máxima
    [Tags]             parallel    performance    scalability
    
    # Distribuir tests entre workers
    @{test_suites}=    Create List    web_tests.robot    api_tests.robot    db_tests.robot    mobile_tests.robot
    \${workers_used}=  Set Variable    0
    
    FOR    \${suite}    IN    @{test_suites}
        \${worker_id}=     Evaluate    \${workers_used} % \${PARALLEL_WORKERS}
        Run Process        docker    exec    rf-worker-\${worker_id}    robot    --outputdir    \${RESULTS_PATH}/worker-\${worker_id}    \${suite}    background=True
        \${workers_used}=  Evaluate    \${workers_used} + 1
    END
    
    # Esperar completación de todos los workers
    Sleep              30s
    Log                Parallel execution completed across \${PARALLEL_WORKERS} workers

Collect Test Results
    [Documentation]    Consolida resultados de ejecución paralela
    [Tags]             results    reporting    consolidation
    
    # Recopilar outputs de todos los workers
    FOR    \${worker}    IN RANGE    \${PARALLEL_WORKERS}
        Run Process        docker    cp    rf-worker-\${worker}:\${RESULTS_PATH}/worker-\${worker}    ./results/
        Should Be Equal    \${RESULT.rc}    0
        
        # Verificar que los tests se ejecutaron
        File Should Exist    ./results/worker-\${worker}/output.xml
        File Should Exist    ./results/worker-\${worker}/log.html
        File Should Exist    ./results/worker-\${worker}/report.html
    END
    
    # Merge de resultados usando rebot
    Run Process        rebot    --outputdir    ./results/consolidated    ./results/worker-*/output.xml
    Should Be Equal    \${RESULT.rc}    0
    
    Log                Results consolidated successfully

Generate Pipeline Reports
    [Documentation]    Genera reportes ejecutivos para stakeholders
    [Tags]             reporting    metrics    dashboard
    
    # Extraer métricas clave de los resultados
    \${output_content}=    Get File    ./results/consolidated/output.xml
    \${total_tests}=       Get Regexp Matches    \${output_content}    <total>(\\d+)</total>
    \${passed_tests}=      Get Regexp Matches    \${output_content}    <passed>(\\d+)</passed>
    \${failed_tests}=      Get Regexp Matches    \${output_content}    <failed>(\\d+)</failed>
    
    # Calcular métricas de calidad
    \${success_rate}=      Evaluate    (\${passed_tests[0]} / \${total_tests[0]}) * 100
    Should Be True         \${success_rate} >= 95.0
    
    Log                Pipeline Quality Metrics:
    Log                Total Tests: \${total_tests[0]}
    Log                Passed: \${passed_tests[0]}
    Log                Failed: \${failed_tests[0]}
    Log                Success Rate: \${success_rate}%

Deploy To Staging Environment
    [Documentation]    Despliega solo si todos los tests pasan
    [Tags]             deployment    staging    conditional
    
    # Verificar que success rate cumple criterio
    Run Keyword If     \${success_rate} >= 95.0    Deploy Application    staging
    ...    ELSE        Fail    Deployment blocked - success rate below 95%
    
    # Smoke test post-deployment
    Sleep              10s
    Create Session     staging    \${ENVIRONMENTS.staging}
    \${health}=        GET On Session    staging    /health
    Should Be Equal    \${health.status_code}    200
    Should Contain     \${health.text}    version
    
    Log                Deployment to staging successful

Send Pipeline Notifications
    [Documentation]    Notifica resultados a equipos via Slack/Teams
    [Tags]             notifications    communication    alerts
    
    # Preparar mensaje de notificación
    \${message}=        Set Variable    🚀 Pipeline Completed\\nSuccess Rate: \${success_rate}%\\nTotal Tests: \${total_tests[0]}\\nEnvironment: \${TEST_ENV}
    
    # Enviar a Slack
    \${headers}=        Create Dictionary    Content-Type=application/json
    \${payload}=        Create Dictionary    text=\${message}    channel=#qa-automation
    POST               \${SLACK_WEBHOOK}    json=\${payload}    headers=\${headers}
    
    # Enviar email ejecutivo si hay fallos críticos
    Run Keyword If     \${failed_tests[0]} > 0    Send Executive Alert    \${failed_tests[0]} tests failed in pipeline
    
    Log                Notifications sent to stakeholders

*** Keywords ***
Initialize Pipeline Environment
    Log                🏗️ Initializing CI/CD pipeline environment
    Set Global Variable    \${BUILD_NUMBER}    \${EMPTY}
    Create Directory       ./results
    Create Directory       ./results/consolidated
    
Deploy Application
    [Arguments]        \${environment}
    Log                Deploying application to \${environment}
    Run Process        kubectl    apply    -f    k8s-\${environment}.yaml
    Should Be Equal    \${RESULT.rc}    0

Send Executive Alert
    [Arguments]        \${alert_message}
    Log                🚨 ALERT: \${alert_message}
    # Implementar lógica de alertas críticas

Cleanup Pipeline Resources
    Log                🧹 Cleaning up pipeline resources
    FOR    \${worker}    IN RANGE    \${PARALLEL_WORKERS}
        Run Process        docker    stop    rf-worker-\${worker}
        Run Process        docker    rm    rf-worker-\${worker}
    END
    Run Process        docker    network    rm    rf-network</code></pre>
        
        <h3>🎯 Proyecto Pipeline (15 min):</h3>
        <p>1. Crea Dockerfile para Robot Framework con todas las dependencias</p>
        <p>2. Configura docker-compose.yml para servicios de testing</p>
        <p>3. Implementa pipeline.jenkinsfile con stages paralelos</p>
        <p>4. Configura webhook de GitHub para triggers automáticos</p>
        <p>5. Crea script de deploy condicional basado en success rate</p>
        <p>6. Configura Slack notifications para resultados</p>
        <p>7. Implementa rollback automático en caso de fallos</p>
        <p>8. Genera dashboard con métricas de calidad en tiempo real</p>
        <p>9. Configura environments matrix (dev/staging/prod)</p>
        <p>10. Implementa tests de smoke post-deployment</p>
        <p>11. Crea archivos de configuración Kubernetes</p>
        <p>12. Configura secrets management para credenciales</p>
        <p>13. Implementa test data management automatizado</p>
        <p>14. Configura backup automático de test results</p>
        <p>15. Documenta runbook completo del pipeline</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Construir pipeline CI/CD enterprise completo</li>
                <li>Implementar ejecución paralela con Docker</li>
                <li>Configurar deployment condicional automático</li>
                <li>Generar reportes y alertas ejecutivas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa rebot para consolidar resultados paralelos: "rebot --merge ./results/*/output.xml" genera reporte unificado.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 202 - Performance testing fundamentals</h3>
        <p>Con pipeline CI/CD dominado, aprenderás performance testing para validar aplicaciones bajo carga con métricas enterprise.</p>
    `,
    topics: ["cicd", "project"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 20,
    difficulty: "advanced",
    prerequisites: ["lesson-200"],
    type: "capstone"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_201 = LESSON_201;
}