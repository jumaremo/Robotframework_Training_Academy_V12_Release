/**
 * Robot Framework Academy - Lesson 126
 * API Testing 126
 */

const LESSON_126 = {
    id: 126,
    title: "API Testing 126",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>🚀 CI/CD Pipeline APIs</h2>
        <p>Integración API testing en pipelines CI/CD con parallel execution y reporting automático.</p>
        
        <h3>💻 Pipeline Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    OperatingSystem
Library    DateTime
Library    String

*** Variables ***
\${API_BASE}        https://jsonplaceholder.typicode.com
\${PIPELINE_ENV}    CI
\${PARALLEL_TESTS}  5
\${REPORT_DIR}      \${CURDIR}/reports
\${TEST_SUITE}      api_pipeline
\${BUILD_NUMBER}    \${EMPTY}
\${BRANCH_NAME}     main
\${COMMIT_HASH}     abc123

*** Test Cases ***
Pipeline Environment Setup
    Set Environment Variable    ROBOT_ENV    \${PIPELINE_ENV}
    Create Directory    \${REPORT_DIR}
    \${timestamp}=      Get Current Date    result_format=%Y%m%d_%H%M%S
    Set Suite Variable    \${BUILD_NUMBER}    build_\${timestamp}
    Log    Pipeline setup for build: \${BUILD_NUMBER}
    Should Not Be Empty    \${BUILD_NUMBER}

Parallel API Health Checks
    Create Session    api    \${API_BASE}
    \${endpoints}=    Create List    /users    /posts    /albums    /todos    /comments
    FOR    \${endpoint}    IN    @{endpoints}
        \${response}=     GET On Session    api    \${endpoint}
        Status Should Be    200    \${response}
        \${data}=         Set Variable    \${response.json()}
        Should Not Be Empty    \${data}
        Log    Health check passed: \${endpoint}
    END
    Delete All Sessions

Smoke Test Suite
    Create Session    api    \${API_BASE}
    \${smoke_tests}=    Create Dictionary
    \${response1}=      GET On Session    api    /users/1
    Status Should Be    200    \${response1}
    Set To Dictionary    \${smoke_tests}    user_get    PASS
    \${response2}=      GET On Session    api    /posts
    Status Should Be    200    \${response2}
    Set To Dictionary    \${smoke_tests}    posts_list    PASS
    \${test_data}=      Create Dictionary    title=Pipeline Test    body=Automated test
    \${response3}=      POST On Session    api    /posts    json=\${test_data}
    Status Should Be    201    \${response3}
    Set To Dictionary    \${smoke_tests}    post_create    PASS
    Log    Smoke tests results: \${smoke_tests}
    Dictionary Should Contain Value    \${smoke_tests}    PASS
    Delete All Sessions

Pipeline Metrics Collection
    Create Session    api    \${API_BASE}
    \${metrics}=      Create Dictionary
    \${start_time}=   Get Current Date    result_format=epoch
    \${response}=     GET On Session    api    /users
    \${end_time}=     Get Current Date    result_format=epoch
    \${duration}=     Evaluate    \${end_time} - \${start_time}
    Set To Dictionary    \${metrics}    response_time    \${duration}
    Set To Dictionary    \${metrics}    status_code     \${response.status_code}
    Set To Dictionary    \${metrics}    data_count      \${len(\${response.json()})}
    Should Be True    \${metrics['response_time']} < 3
    Should Be Equal    \${metrics['status_code']}    200
    Should Be True     \${metrics['data_count']} > 0
    Log    Pipeline metrics: \${metrics}
    Delete All Sessions

Regression Test Execution
    Create Session    api    \${API_BASE}
    \${regression_results}=    Create List
    FOR    \${test_id}    IN RANGE    1    6
        \${user_response}=    GET On Session    api    /users/\${test_id}
        Status Should Be      200    \${user_response}
        \${post_response}=    GET On Session    api    /posts?userId=\${test_id}
        Status Should Be      200    \${post_response}
        Append To List        \${regression_results}    PASS
    END
    Length Should Be    \${regression_results}    5
    Log    Regression tests completed: \${len(\${regression_results})} passed
    Delete All Sessions

Performance Baseline Validation
    Create Session    api    \${API_BASE}
    \${performance_data}=    Create List
    FOR    \${iteration}    IN RANGE    1    11
        \${start}=        Get Current Date    result_format=epoch
        \${response}=     GET On Session    api    /posts
        \${end}=          Get Current Date    result_format=epoch
        \${time_taken}=   Evaluate    \${end} - \${start}
        Append To List    \${performance_data}    \${time_taken}
        Status Should Be    200    \${response}
    END
    \${avg_time}=     Evaluate    sum(\${performance_data}) / len(\${performance_data})
    Should Be True    \${avg_time} < 2
    Log    Average response time: \${avg_time}s
    Delete All Sessions

Pipeline Report Generation
    \${report_file}=    Set Variable    \${REPORT_DIR}/pipeline_\${BUILD_NUMBER}.txt
    \${report_content}=    Set Variable    Pipeline Test Report\\nBuild: \${BUILD_NUMBER}\\nBranch: \${BRANCH_NAME}\\nCommit: \${COMMIT_HASH}\\nStatus: PASSED
    Create File         \${report_file}    \${report_content}
    File Should Exist   \${report_file}
    \${file_content}=   Get File    \${report_file}
    Should Contain      \${file_content}    PASSED
    Should Contain      \${file_content}    \${BUILD_NUMBER}
    Log    Report generated: \${report_file}

Cleanup Pipeline Resources
    Remove Directory    \${REPORT_DIR}    recursive=True
    Directory Should Not Exist    \${REPORT_DIR}
    Log    Pipeline cleanup completed</code></pre>
        
        <h3>🎯 Práctica Pipeline (5 min):</h3>
        <p>1. Ejecuta setup completo de pipeline environment</p>
        <p>2. Modifica \${PARALLEL_TESTS} y observa escalabilidad</p>
        <p>3. Implementa health checks para múltiples endpoints</p>
        <p>4. Crea smoke test suite con validaciones críticas</p>
        <p>5. Agrega metrics collection con response times</p>
        <p>6. Ejecuta regression tests en paralelo</p>
        <p>7. Valida performance baselines automáticamente</p>
        <p>8. Genera reports detallados por build</p>
        <p>9. Implementa cleanup automático de recursos</p>
        <p>10. Testa pipeline con diferentes \${BRANCH_NAME}</p>
        <p>11. Agrega environment variables para configuración</p>
        <p>12. Valida que reports contienen build metadata</p>
        <p>13. Experimenta con timeout values para CI</p>
        <p>14. Crea baseline comparisons entre builds</p>
        <p>15. Log detailed execution metrics para monitoring</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Configurar API testing para pipelines CI/CD</li>
                <li>Implementar parallel execution y health checks</li>
                <li>Generar reports automáticos con métricas</li>
                <li>Crear smoke tests y regression suites</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>En CI/CD, smoke tests rápidos detectan problemas críticos antes que regression suite completa ejecute.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 127 - API Security Testing</h3>
        <p>Aprenderás a implementar security testing para APIs incluyendo authentication bypass, injection attacks y data validation.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-125"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_126 = LESSON_126;
}