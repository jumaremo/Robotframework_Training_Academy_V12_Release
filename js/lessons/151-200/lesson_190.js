/**
 * Robot Framework Academy - Lesson 190
 * CI/CD Concepts
 */

const LESSON_190 = {
    id: 190,
    title: "CI/CD Concepts",
    duration: "15 min",
    level: "advanced",
    section: "section-15",
    content: `
        <h2>🚀 CI/CD Foundation</h2>
        <p>Automatiza ejecución de tests Robot Framework en pipelines empresariales con Jenkins, GitHub Actions y Docker.</p>
        
        <h3>💻 Pipeline básico:</h3>
        <pre><code class="robot">*** Settings ***
Library    Process
Library    OperatingSystem
Library    Collections
Library    DateTime

*** Variables ***
\${WORKSPACE}          \${CURDIR}/ci_workspace
\${TESTS_DIR}          \${WORKSPACE}/tests
\${REPORTS_DIR}        \${WORKSPACE}/reports
\${PIPELINE_LOG}       \${WORKSPACE}/pipeline.log
\${BUILD_NUMBER}       \${EMPTY}
\${GIT_BRANCH}         main
\${DOCKER_IMAGE}       robotframework/rfdocker
\${JENKINS_URL}        http://localhost:8080
\${GITHUB_REPO}        https://github.com/company/qa-tests
\${BUILD_STATUS}       \${EMPTY}
\${NOTIFICATION_URL}   https://hooks.slack.com/webhook
\${TEST_RESULTS}       \${WORKSPACE}/output.xml

*** Test Cases ***
Initialize CI Pipeline
    Log                    🚀 Starting CI/CD Pipeline Initialization
    Create Directory       \${WORKSPACE}
    Create Directory       \${TESTS_DIR}
    Create Directory       \${REPORTS_DIR}
    Should Exist           \${WORKSPACE}
    Should Exist           \${TESTS_DIR}
    Should Exist           \${REPORTS_DIR}
    \${timestamp}=          Get Current Date    result_format=%Y%m%d_%H%M%S
    Set Global Variable    \${BUILD_NUMBER}    build_\${timestamp}
    Log                    Build number assigned: \${BUILD_NUMBER}
    Create File            \${PIPELINE_LOG}    Pipeline started: \${BUILD_NUMBER}\\n
    File Should Exist      \${PIPELINE_LOG}
    Set Global Variable    \${PIPELINE_INITIALIZED}    True

Clone Repository Simulation
    Log                    📂 Cloning repository: \${GITHUB_REPO}
    \${git_status}=        Set Variable    SUCCESS
    Should Be Equal        \${git_status}    SUCCESS
    \${commit_hash}=       Set Variable    abc123def456
    Set Global Variable    \${CURRENT_COMMIT}    \${commit_hash}
    Log                    Repository cloned successfully: \${CURRENT_COMMIT}
    Append To File         \${PIPELINE_LOG}    Git clone completed: \${CURRENT_COMMIT}\\n
    \${log_content}=       Get File    \${PIPELINE_LOG}
    Should Contain         \${log_content}    Git clone completed
    Should Contain         \${log_content}    \${CURRENT_COMMIT}

Setup Test Environment
    Log                    🔧 Setting up test environment
    \${env_vars}=          Create Dictionary
    Set To Dictionary      \${env_vars}    BROWSER=chrome
    Set To Dictionary      \${env_vars}    HEADLESS=true
    Set To Dictionary      \${env_vars}    TIMEOUT=30
    Set To Dictionary      \${env_vars}    ENV=ci
    Set To Dictionary      \${env_vars}    PARALLEL=4
    Set Global Variable    \${CI_ENV_VARS}    \${env_vars}
    Log                    Environment variables configured: \${CI_ENV_VARS}
    Should Contain         \${env_vars}    BROWSER
    Should Contain         \${env_vars}    HEADLESS
    Should Contain         \${env_vars}    PARALLEL
    Append To File         \${PIPELINE_LOG}    Environment setup completed\\n

Execute Robot Framework Tests
    Log                    ⚡ Executing Robot Framework test suite
    \${robot_cmd}=         Set Variable    robot --outputdir \${REPORTS_DIR} --variable BROWSER:chrome --variable HEADLESS:true \${TESTS_DIR}
    Log                    Command: \${robot_cmd}
    \${execution_start}=   Get Current Date    result_format=%H:%M:%S
    Set Global Variable    \${TEST_START_TIME}    \${execution_start}
    \${mock_result}=       Set Variable    PASS
    Should Be Equal        \${mock_result}    PASS
    \${execution_end}=     Get Current Date    result_format=%H:%M:%S
    Set Global Variable    \${TEST_END_TIME}    \${execution_end}
    Log                    Tests executed from \${TEST_START_TIME} to \${TEST_END_TIME}
    Create File            \${TEST_RESULTS}    <?xml version="1.0"?><robot><suite name="CI Tests"><test name="Sample Test"><status status="PASS"/></test></suite></robot>
    File Should Exist      \${TEST_RESULTS}
    Append To File         \${PIPELINE_LOG}    Robot tests executed: \${mock_result}\\n

Generate Test Reports
    Log                    📊 Generating test reports and artifacts
    \${report_html}=       Set Variable    \${REPORTS_DIR}/report.html
    \${log_html}=          Set Variable    \${REPORTS_DIR}/log.html
    \${output_xml}=        Set Variable    \${REPORTS_DIR}/output.xml
    Create File            \${report_html}    <html><body><h1>CI Test Report</h1><p>Build: \${BUILD_NUMBER}</p></body></html>
    Create File            \${log_html}      <html><body><h1>CI Test Log</h1><p>Execution completed</p></body></html>
    Create File            \${output_xml}    <?xml version="1.0"?><robot><statistics><total><stat pass="25" fail="2">27</stat></total></statistics></robot>
    File Should Exist      \${report_html}
    File Should Exist      \${log_html}
    File Should Exist      \${output_xml}
    \${report_content}=    Get File    \${report_html}
    Should Contain         \${report_content}    CI Test Report
    Should Contain         \${report_content}    \${BUILD_NUMBER}
    Log                    Reports generated: HTML, XML artifacts ready
    Append To File         \${PIPELINE_LOG}    Reports generated successfully\\n

Analyze Test Results
    Log                    🔍 Analyzing test execution results
    \${results_data}=      Create Dictionary
    Set To Dictionary      \${results_data}    total_tests=27
    Set To Dictionary      \${results_data}    passed_tests=25
    Set To Dictionary      \${results_data}    failed_tests=2
    Set To Dictionary      \${results_data}    pass_rate=92.59
    Set To Dictionary      \${results_data}    execution_time=180
    Set Global Variable    \${TEST_METRICS}    \${results_data}
    Log                    Test metrics: \${TEST_METRICS}
    Should Be True         \${results_data.pass_rate} > 90
    Should Be True         \${results_data.total_tests} > 0
    Should Be True         \${results_data.execution_time} < 300
    \${pass_threshold}=    Set Variable    90
    \${current_pass_rate}= Set Variable    \${results_data.pass_rate}
    Run Keyword If         \${current_pass_rate} >= \${pass_threshold}    Set Global Variable    \${BUILD_STATUS}    SUCCESS
    Run Keyword If         \${current_pass_rate} < \${pass_threshold}     Set Global Variable    \${BUILD_STATUS}    FAILURE
    Log                    Build status determined: \${BUILD_STATUS}

Send Pipeline Notifications
    Log                    📧 Sending pipeline completion notifications
    \${notification_msg}=  Set Variable    CI Pipeline \${BUILD_NUMBER} completed with status: \${BUILD_STATUS}
    Log                    Notification message: \${notification_msg}
    \${slack_payload}=     Create Dictionary
    Set To Dictionary      \${slack_payload}    text=\${notification_msg}
    Set To Dictionary      \${slack_payload}    channel=#qa-automation
    Set To Dictionary      \${slack_payload}    username=CI-Bot
    Log                    Slack payload prepared: \${slack_payload}
    Should Contain         \${slack_payload}    text
    Should Contain         \${slack_payload}    channel
    \${email_subject}=     Set Variable    QA Pipeline \${BUILD_STATUS}: \${BUILD_NUMBER}
    \${email_body}=        Set Variable    Pipeline completed\\nPass rate: \${TEST_METRICS.pass_rate}%\\nTotal tests: \${TEST_METRICS.total_tests}
    Log                    Email notification: \${email_subject}
    Append To File         \${PIPELINE_LOG}    Notifications sent: \${BUILD_STATUS}\\n

Archive Pipeline Artifacts
    Log                    📦 Archiving pipeline artifacts and logs
    \${artifact_list}=     Create List    \${TEST_RESULTS}    \${PIPELINE_LOG}
    Append To List         \${artifact_list}    \${REPORTS_DIR}/report.html
    Append To List         \${artifact_list}    \${REPORTS_DIR}/log.html
    Append To List         \${artifact_list}    \${REPORTS_DIR}/output.xml
    Set Global Variable    \${PIPELINE_ARTIFACTS}    \${artifact_list}
    Log                    Artifacts to archive: \${PIPELINE_ARTIFACTS}
    FOR    \${artifact}    IN    @{PIPELINE_ARTIFACTS}
        File Should Exist    \${artifact}
        Log                 Verified artifact: \${artifact}
    END
    \${final_status}=      Set Variable    Pipeline \${BUILD_NUMBER} archived with status \${BUILD_STATUS}
    Append To File         \${PIPELINE_LOG}    \${final_status}\\n
    \${final_log}=         Get File    \${PIPELINE_LOG}
    Should Contain         \${final_log}    Pipeline started
    Should Contain         \${final_log}    archived with status
    Log                    ✅ CI/CD Pipeline completed successfully</code></pre>
        
        <h3>🎯 Práctica CI/CD (12 min):</h3>
        <p>1. Ejecuta Initialize CI Pipeline y valida workspace</p>
        <p>2. Simula Clone Repository con commit hash</p>
        <p>3. Configura Setup Test Environment con variables CI</p>
        <p>4. Ejecuta Robot Framework Tests con mock results</p>
        <p>5. Genera HTML/XML reports automáticamente</p>
        <p>6. Analiza results y determina BUILD_STATUS</p>
        <p>7. Configura notificaciones Slack y email</p>
        <p>8. Archiva artifacts para historical tracking</p>
        <p>9. Valida pass_rate > 90% para pipeline SUCCESS</p>
        <p>10. Verifica que pipeline.log contiene todas las fases</p>
        <p>11. Testa que artifacts se crean correctamente</p>
        <p>12. Implementa threshold logic para fail/pass</p>
        <p>13. Configura parallel execution con PARALLEL=4</p>
        <p>14. Valida execution_time < 300 segundos</p>
        <p>15. Documenta pipeline steps para el equipo</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Entender conceptos fundamentales de CI/CD para testing</li>
                <li>Implementar pipeline básico con Robot Framework</li>
                <li>Configurar notificaciones automáticas y thresholds</li>
                <li>Establecer fundamentos para Jenkins y Docker</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Pipeline CI/CD = Automatización total. Cada commit debe trigger tests automáticamente sin intervención manual.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 191 - Jenkins Setup para Robot Framework</h3>
        <p>Con conceptos CI/CD dominados, configurarás Jenkins específicamente para ejecutar tests Robot Framework con pipelines enterprise avanzados.</p>
    `,
    topics: ["cicd", "jenkins", "docker"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 15,
    difficulty: "easy",
    prerequisites: ["lesson-189"],
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_190 = LESSON_190;
}