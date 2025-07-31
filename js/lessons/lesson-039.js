const LESSON_039 = {
    id: 39,
    title: "Variables globales y de suite",
    duration: "5 min",
    level: "beginner",
    section: "section-03",
    content: `
        <h2>🌐 Variables Globales</h2>
        <p>Manejo avanzado de variables compartidas entre tests y suites para arquitecturas escalables.</p>
        
        <h3>💻 Global Suite Variables:</h3>
        <pre><code class="robot">
*** Variables ***
\${SUITE_COUNTER}      0
\${GLOBAL_CONFIG}      \${EMPTY}
\${SHARED_USER_DATA}   \${EMPTY}

*** Test Cases ***
Test Global Variable Initialization
    [Documentation]    Initializes global variables for cross-suite usage
    [Tags]    variables    global    initialization
    Set Global Variable    \${GLOBAL_TEST_RUNNER}    Robot Framework
    Set Global Variable    \${GLOBAL_START_TIME}     \${CURTIME}
    Set Global Variable    \${GLOBAL_ENVIRONMENT}    testing
    &{global_config}    Create Dictionary    
    ...    app_url=https://test-app.com    
    ...    timeout=30    
    ...    retry_count=3
    Set Global Variable    \${GLOBAL_CONFIG}    \${global_config}
    Log    Global variables initialized
    Log    Test runner: \${GLOBAL_TEST_RUNNER}
    Log    Start time: \${GLOBAL_START_TIME}
    Should Not Be Empty    \${GLOBAL_TEST_RUNNER}

Test Suite Variable Management
    [Documentation]    Demonstrates suite-level variable management
    [Tags]    variables    suite    management
    \${SUITE_COUNTER}    Evaluate    \${SUITE_COUNTER} + 1
    Set Suite Variable    \${SUITE_COUNTER}
    Set Suite Variable    \${SUITE_NAME}         \${SUITE NAME}
    Set Suite Variable    \${SUITE_START_TIME}   \${CURTIME}
    @{suite_tests}    Create List    test1    test2    test3
    Set Suite Variable    \${SUITE_TEST_LIST}    \${suite_tests}
    Log    Suite counter: \${SUITE_COUNTER}
    Log    Suite name: \${SUITE_NAME}
    Log    Suite tests: @{suite_tests}
    Should Be True    \${SUITE_COUNTER} >= 1

Test Shared Data Across Tests
    [Documentation]    Shares data between tests using suite variables
    [Tags]    variables    suite    sharing
    &{user_session}    Create Dictionary    
    ...    user_id=12345    
    ...    session_token=abc123    
    ...    login_time=\${CURTIME}    
    ...    permissions=read,write
    Set Suite Variable    \${SHARED_USER_DATA}    \${user_session}
    Log Dictionary    \${user_session}
    Should Contain    \${user_session}[permissions]    read

Test Accessing Shared Data
    [Documentation]    Accesses data shared from previous test
    [Tags]    variables    suite    access
    Should Not Be Empty    \${SHARED_USER_DATA}
    \${user_id}        Set Variable    \${SHARED_USER_DATA}[user_id]
    \${session_token}  Set Variable    \${SHARED_USER_DATA}[session_token]
    \${permissions}    Set Variable    \${SHARED_USER_DATA}[permissions]
    Log    Shared user ID: \${user_id}
    Log    Session token: \${session_token}
    Log    Permissions: \${permissions}
    Should Be Equal    \${user_id}    12345

Test Global Configuration Access
    [Documentation]    Accesses global configuration from different contexts
    [Tags]    variables    global    configuration
    Should Not Be Empty    \${GLOBAL_CONFIG}
    \${app_url}      Set Variable    \${GLOBAL_CONFIG}[app_url]
    \${timeout}      Set Variable    \${GLOBAL_CONFIG}[timeout]
    \${retry_count}  Set Variable    \${GLOBAL_CONFIG}[retry_count]
    Log    App URL: \${app_url}
    Log    Timeout: \${timeout}
    Log    Retry count: \${retry_count}
    Update Global Config    debug_mode    true
    Should Contain    \${GLOBAL_CONFIG}    debug_mode

Test Variable Persistence Across Keywords
    [Documentation]    Tests variable persistence in nested keyword calls
    [Tags]    variables    persistence    keywords
    Initialize Session Data
    Process Session Data
    Validate Session Data
    Cleanup Session Data
    Should Be Equal    \${SESSION_STATUS}    completed

Test Cross Suite Communication
    [Documentation]    Demonstrates communication between different suites
    [Tags]    variables    global    communication
    \${suite_communication}    Get Variable Value    \${GLOBAL_SUITE_MESSAGES}    \${EMPTY}
    Run Keyword If    '\${suite_communication}' == '\${EMPTY}'    Initialize Suite Communication
    Add Suite Message    \${SUITE NAME}    Test execution completed
    \${messages}    Get Variable Value    \${GLOBAL_SUITE_MESSAGES}
    Log    Suite messages: \${messages}
    Should Contain    \${messages}    Test execution completed

*** Keywords ***
Initialize Session Data
    [Documentation]    Initializes session data at global level
    &{session_data}    Create Dictionary    
    ...    session_id=session_\${CURTIME}    
    ...    status=initialized    
    ...    start_time=\${CURTIME}
    Set Global Variable    \${GLOBAL_SESSION_DATA}    \${session_data}
    Set Suite Variable     \${SESSION_STATUS}        initialized
    Log    Session data initialized globally

Process Session Data
    [Documentation]    Processes session data and updates status
    Should Not Be Empty    \${GLOBAL_SESSION_DATA}
    Set To Dictionary    \${GLOBAL_SESSION_DATA}    status=processing
    Set To Dictionary    \${GLOBAL_SESSION_DATA}    process_time=\${CURTIME}
    Set Suite Variable   \${SESSION_STATUS}    processing
    Log    Session data processed

Validate Session Data
    [Documentation]    Validates session data integrity
    Should Be Equal    \${GLOBAL_SESSION_DATA}[status]    processing
    Should Not Be Empty    \${GLOBAL_SESSION_DATA}[session_id]
    Set To Dictionary    \${GLOBAL_SESSION_DATA}    status=validated
    Set Suite Variable   \${SESSION_STATUS}    validated
    Log    Session data validated

Cleanup Session Data
    [Documentation]    Cleans up session data and marks as completed
    Set To Dictionary    \${GLOBAL_SESSION_DATA}    status=completed
    Set To Dictionary    \${GLOBAL_SESSION_DATA}    end_time=\${CURTIME}
    Set Suite Variable   \${SESSION_STATUS}    completed
    Log    Session data cleanup completed

Update Global Config
    [Documentation]    Updates global configuration with new key-value pair
    [Arguments]    \${key}    \${value}
    Set To Dictionary    \${GLOBAL_CONFIG}    \${key}=\${value}
    Set Global Variable    \${GLOBAL_CONFIG}
    Log    Global config updated: \${key}=\${value}

Initialize Suite Communication
    [Documentation]    Initializes global communication system
    @{message_list}    Create List
    Set Global Variable    \${GLOBAL_SUITE_MESSAGES}    \${message_list}
    Log    Suite communication system initialized

Add Suite Message
    [Documentation]    Adds message to global suite communication
    [Arguments]    \${sender}    \${message}
    \${timestamp}    Get Current Date    result_format=%H:%M:%S
    \${formatted_message}    Set Variable    [\${timestamp}] \${sender}: \${message}
    Append To List    \${GLOBAL_SUITE_MESSAGES}    \${formatted_message}
    Set Global Variable    \${GLOBAL_SUITE_MESSAGES}
    Log    Message added: \${formatted_message}

Get Suite Statistics
    [Documentation]    Returns statistics about suite execution
    \${current_counter}    Get Variable Value    \${SUITE_COUNTER}    0
    \${start_time}         Get Variable Value    \${SUITE_START_TIME}    unknown
    \${current_time}       Get Current Date
    &{stats}    Create Dictionary    
    ...    counter=\${current_counter}    
    ...    start_time=\${start_time}    
    ...    current_time=\${current_time}    
    ...    suite_name=\${SUITE NAME}
    Log Dictionary    \${stats}
    RETURN    \${stats}

Reset Global Variables
    [Documentation]    Resets global variables to initial state
    Set Global Variable    \${GLOBAL_TEST_RUNNER}    \${EMPTY}
    Set Global Variable    \${GLOBAL_START_TIME}     \${EMPTY}
    Set Global Variable    \${GLOBAL_ENVIRONMENT}    \${EMPTY}
    Set Global Variable    \${GLOBAL_CONFIG}         \${EMPTY}
    Set Global Variable    \${GLOBAL_SESSION_DATA}   \${EMPTY}
    @{empty_list}    Create List
    Set Global Variable    \${GLOBAL_SUITE_MESSAGES}    \${empty_list}
    Log    Global variables reset to initial state

Store Test Results Globally
    [Documentation]    Stores test results in global variable for reporting
    [Arguments]    \${test_name}    \${status}    \${duration}
    \${existing_results}    Get Variable Value    \${GLOBAL_TEST_RESULTS}    \${EMPTY}
    @{results_list}    Run Keyword If    '\${existing_results}' == '\${EMPTY}'
    ...    Create List
    ...    ELSE    Set Variable    \${existing_results}
    &{test_result}    Create Dictionary    
    ...    name=\${test_name}    
    ...    status=\${status}    
    ...    duration=\${duration}    
    ...    timestamp=\${CURTIME}
    Append To List    \${results_list}    \${test_result}
    Set Global Variable    \${GLOBAL_TEST_RESULTS}    \${results_list}
    Log    Test result stored globally: \${test_name} - \${status}

Generate Global Report
    [Documentation]    Generates report from global variables
    \${test_results}    Get Variable Value    \${GLOBAL_TEST_RESULTS}    \${EMPTY}
    \${suite_messages}  Get Variable Value    \${GLOBAL_SUITE_MESSAGES}    \${EMPTY}
    \${global_config}   Get Variable Value    \${GLOBAL_CONFIG}    \${EMPTY}
    Log    === GLOBAL EXECUTION REPORT ===
    Log    Test Runner: \${GLOBAL_TEST_RUNNER}
    Log    Environment: \${GLOBAL_ENVIRONMENT}
    Log    Start Time: \${GLOBAL_START_TIME}
    Run Keyword If    '\${test_results}' != '\${EMPTY}'    Log    Test Results Count: \${len(\${test_results})}
    Run Keyword If    '\${suite_messages}' != '\${EMPTY}'  Log    Suite Messages Count: \${len(\${suite_messages})}
    Log    === END REPORT ===
        </code></pre>
        
        <h3>🎯 Práctica Variables Globales (4 min):</h3>
        <ol>
            <li><strong>Global initialization:</strong> Usar Set Global Variable para configuración inicial</li>
            <li><strong>Suite variables:</strong> Usar Set Suite Variable para datos compartidos en suite</li>
            <li><strong>Variable persistence:</strong> Verificar que variables persisten entre tests</li>
            <li><strong>Shared data structures:</strong> Crear diccionarios y listas para datos complejos</li>
            <li><strong>Configuration management:</strong> Mantener configuración global accesible</li>
            <li><strong>Session data:</strong> Manejar datos de sesión a través de múltiples tests</li>
            <li><strong>Cross-suite communication:</strong> Usar variables globales para comunicación entre suites</li>
            <li><strong>Variable access safety:</strong> Usar Get Variable Value con defaults</li>
            <li><strong>Data updating:</strong> Modificar variables globales desde keywords</li>
            <li><strong>Statistics collection:</strong> Recopilar estadísticas de ejecución globalmente</li>
            <li><strong>Result storage:</strong> Almacenar resultados de tests en variables globales</li>
            <li><strong>Report generation:</strong> Generar reportes usando datos globales</li>
            <li><strong>Cleanup procedures:</strong> Implementar limpieza de variables globales</li>
            <li><strong>Variable scope debugging:</strong> Usar Log Variables para debug de scope</li>
            <li><strong>Best practices:</strong> Implementar patrones para uso responsable de variables globales</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar uso responsable de variables globales y de suite</li>
                <li>Implementar comunicación efectiva entre tests y suites</li>
                <li>Crear sistemas escalables de configuración y datos compartidos</li>
                <li>Manejar persistencia y lifecycle de variables en arquitecturas complejas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa variables globales con moderación para configuración y comunicación. Las variables de suite son ideales para datos compartidos dentro de un test suite específico.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 040 - Configuración por ambientes</h3>
        <p>Implementaremos sistemas robustos de configuración multi-ambiente usando variables y archivos externos.</p>
    `,
    topics: ["global", "suite", "shared"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-038"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_039 = LESSON_039;
}