/**
 * Robot Framework Academy - Lesson 114
 * Testing automation frameworks
 */

const LESSON_114 = {
    id: 114,
    title: "Interacciones Avanzadas 114",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>🔧 Testing automation frameworks</h2>
        <p>Integrar Robot Framework con otros frameworks de testing, Page Object Model avanzado y patrones de automation.</p>
        
        <h3>💻 Tests Framework Integration:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com
\${BROWSER}            chrome
\${PAGE_OBJECT_PATH}   ../pages/
\${TEST_DATA_FILE}     ../data/test_data.json
\${CONFIG_FILE}        ../config/test_config.yaml
\${REPORT_DIR}         ../reports/
\${SCREENSHOT_DIR}     ../screenshots/

*** Test Cases ***
Test Page Object Pattern
    Open Browser              \${URL}        \${BROWSER}
    \${login_page}=      Create Page Object    LoginPage
    \${home_page}=       Create Page Object    HomePage
    \${result}=         Call Method    \${login_page}    login    testuser    password123
    Should Be True            \${result}
    \${welcome_msg}=    Call Method    \${home_page}    get_welcome_message
    Should Contain            \${welcome_msg}    Bienvenido testuser
    Call Method               \${home_page}    navigate_to_profile
    Element Should Be Visible xpath=//h1[text()='Perfil de Usuario']
    Call Method               \${login_page}    logout
    Page Should Contain       sesión cerrada
    Close Browser

Test Data-Driven Framework
    Open Browser              \${URL}        \${BROWSER}
    \${test_data}=       Load JSON From File    \${TEST_DATA_FILE}
    FOR    \${user}    IN    @{test_data.users}
        Input Text            name=username    \${user.username}
        Input Password        name=password    \${user.password}
        Click Button          Login
        Run Keyword If        '\${user.expected}' == 'success'    Page Should Contain    dashboard
        Run Keyword If        '\${user.expected}' == 'failure'    Page Should Contain    error
        Click Link            Logout
    END
    \${test_count}=     Get Length    \${test_data.users}
    Should Be True            \${test_count} > 0
    Close Browser

Test Configuration Management
    \${config}=          Load YAML Config    \${CONFIG_FILE}
    Open Browser              \${config.base_url}    \${config.browser}
    Set Window Size           \${config.window_width}    \${config.window_height}
    Set Test Variable         \${TIMEOUT}    \${config.default_timeout}
    Wait Until Page Contains  página cargada    \${TIMEOUT}
    \${env_name}=        Get From Dictionary    \${config}    environment
    Should Be Equal           \${env_name}    testing
    \${api_url}=         Get From Dictionary    \${config}    api_base_url
    Should Start With         \${api_url}    https://
    Page Should Contain       configuración aplicada
    Close Browser

Test Report Generation
    Open Browser              \${URL}        \${BROWSER}
    \${start_time}=      Get Time    epoch
    Input Text                name=search    automation testing
    Click Button              Search
    Wait Until Page Contains  resultados
    \${end_time}=        Get Time    epoch
    \${execution_time}=  Evaluate    \${end_time} - \${start_time}
    Create Test Report        execution_time=\${execution_time}    status=PASS
    Capture Page Screenshot   \${SCREENSHOT_DIR}test_114.png
    \${screenshot_exists}=    File Should Exist    \${SCREENSHOT_DIR}test_114.png
    Log To Console            Test completed in \${execution_time}s
    Close Browser

Test Framework Utilities
    Open Browser              \${URL}        \${BROWSER}
    \${random_email}=    Generate Random Email
    Should Match Regexp       \${random_email}    .*@.*\\.com
    Input Text                name=email    \${random_email}
    \${timestamp}=       Get Current Timestamp
    Should Match Regexp       \${timestamp}    \\d{4}-\\d{2}-\\d{2}
    \${browser_info}=    Get Browser Info
    Should Contain            \${browser_info.name}    chrome
    Should Be True            \${browser_info.version} > 0
    \${test_id}=         Generate Test ID
    Should Not Be Empty       \${test_id}
    Set Test Documentation    Test ID: \${test_id}
    Close Browser

Test Framework Hooks
    [Setup]    Initialize Test Environment
    Open Browser              \${URL}        \${BROWSER}
    Execute Pre Test Actions
    Input Text                name=username    hooktest
    Click Button              Submit
    Page Should Contain       datos procesados
    Execute Post Test Actions
    Validate Test Results
    Close Browser
    [Teardown]    Cleanup Test Environment</code></pre>
        
        <h3>🎯 Práctica Framework Integration (5 min):</h3>
        <p>1. Crea clase Page Object con métodos específicos</p>
        <p>2. Usa Call Method para ejecutar acciones de página</p>
        <p>3. Implementa patrón data-driven con archivos JSON</p>
        <p>4. Usa FOR loop para iterar sobre datos de test</p>
        <p>5. Carga configuración desde archivos YAML</p>
        <p>6. Usa Get From Dictionary para extraer config values</p>
        <p>7. Implementa generación de reportes customizados</p>
        <p>8. Usa Get Time para medir execution time</p>
        <p>9. Crea utilities para email y timestamp generation</p>
        <p>10. Usa Generate Random Email para datos únicos</p>
        <p>11. Implementa Get Browser Info para metadata</p>
        <p>12. Usa Set Test Documentation para trazabilidad</p>
        <p>13. Configura Setup y Teardown hooks</p>
        <p>14. Implementa Initialize Test Environment</p>
        <p>15. Usa Execute Pre/Post Test Actions</p>
        <p>16. Valida resultados con Validate Test Results</p>
        <p>17. Usa Cleanup Test Environment para limpieza</p>
        <p>18. Combina múltiples patrones en framework cohesivo</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar Page Object Model avanzado</li>
                <li>Integrar data-driven testing con archivos externos</li>
                <li>Configurar framework utilities y reporting</li>
                <li>Usar hooks y setup/teardown patterns</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Page Objects encapsulan lógica de página, data-driven separa datos de lógica, y hooks garantizan setup/cleanup consistente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 115 - Integration testing patterns</h3>
        <p>Aprenderás patrones de integration testing, mocking de servicios externos y testing de APIs dependency chains.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-113"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_114 = LESSON_114;
}