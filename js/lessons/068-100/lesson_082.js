/**
 * Robot Framework Academy - Lesson 082
 * Debugging y troubleshooting
 */

const LESSON_082 = {
    id: 82,
    title: "Debugging y troubleshooting",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Debugging Sistemático</h2>
        <p>Domina técnicas avanzadas de debugging, análisis de fallos y troubleshooting sistemático para resolver problemas complejos en automation.</p>
        
        <h3>💻 Herramientas debugging:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://debugging-demo.com
\${BROWSER}             chrome
\${DEBUG_MODE}          True
\${LOG_LEVEL}           DEBUG
\${SCREENSHOT_ON_FAIL}  True
\${WAIT_TIMEOUT}        10s
\${RETRY_COUNT}         3
\${ERROR_SELECTOR}      css=.error-message

*** Test Cases ***
Test Debug Information Capture
    Set Log Level                   \${LOG_LEVEL}
    Open Browser                    \${URL}                              \${BROWSER}
    Log                            Test iniciado - Capturando información debug
    \${page_source}=  Get Source
    Log                            Page source length: \${page_source.__len__()}
    \${current_url}=  Get Location
    Log                            Current URL: \${current_url}
    \${window_handles}=  Get Window Handles
    Log                            Window handles: \${window_handles}
    \${browser_logs}=  Get Browser Logs
    Log                            Browser logs captured: \${browser_logs.__len__()} entries
    Capture Page Screenshot         debug-initial-state.png
    Element Should Be Visible       css=.debug-container
    Close Browser

Test Element Investigation Deep
    Open Browser                    \${URL}                              \${BROWSER}
    Log                            Investigando elementos problemáticos
    \${elements}=  Get WebElements  css=.problematic-element
    Length Should Be Greater Than   \${elements}                        0
    FOR  \${element}  IN  @{elements}
        \${is_visible}=  Run Keyword And Return Status  Element Should Be Visible  \${element}
        \${is_enabled}=  Run Keyword And Return Status  Element Should Be Enabled  \${element}
        \${element_text}=  Get Text  \${element}
        Log  Element visible: \${is_visible}, enabled: \${is_enabled}, text: \${element_text}
        Run Keyword If  not \${is_visible}  Log  Hidden element found - investigating
        Run Keyword If  not \${is_enabled}  Log  Disabled element found - investigating
    END
    Capture Element Screenshot      css=.problematic-element           problematic-elements.png
    Close Browser

Test Error Handling Robust
    Open Browser                    \${URL}                              \${BROWSER}
    \${error_occurred}=  Run Keyword And Return Status  Click Element  css=.non-existent-element
    Run Keyword If  not \${error_occurred}  Log  Expected error occurred - element not found
    Run Keyword If  not \${error_occurred}  Capture Page Screenshot  error-element-not-found.png
    \${status}=  Run Keyword And Return Status  Element Should Be Visible  \${ERROR_SELECTOR}
    Run Keyword If  \${status}  Log  Error message visible on page
    Run Keyword If  \${status}  \${error_text}=  Get Text  \${ERROR_SELECTOR}
    Run Keyword If  \${status}  Log  Error text: \${error_text}
    Run Keyword If  \${status}  Capture Element Screenshot  \${ERROR_SELECTOR}  error-message.png
    Element Should Be Visible       css=.main-content
    Close Browser

Test Retry Mechanisms Advanced
    Open Browser                    \${URL}                              \${BROWSER}
    Log                            Implementando estrategias de retry
    Wait Until Keyword Succeeds     \${WAIT_TIMEOUT}  2s  Element Should Be Visible  css=.eventually-visible
    Element Should Be Visible       css=.eventually-visible
    Log                            Elemento apareció después de retry
    FOR  \${i}  IN RANGE  \${RETRY_COUNT}
        \${success}=  Run Keyword And Return Status  Click Element  css=.intermittent-element
        Run Keyword If  \${success}  Log  Click successful on attempt \${i + 1}
        Run Keyword If  \${success}  Exit For Loop
        Run Keyword If  not \${success}  Log  Click failed on attempt \${i + 1} - retrying
        Run Keyword If  not \${success}  Sleep  1s
    END
    Element Should Be Visible       css=.retry-success
    Close Browser

Test Network Issues Detection
    Open Browser                    \${URL}                              \${BROWSER}
    Log                            Detectando problemas de red
    Execute JavaScript              console.log('Network debugging started')
    \${start_time}=  Get Current Date  epoch
    Click Element                   css=.slow-loading-trigger
    Wait Until Element Is Visible   css=.slow-content                   15s
    \${end_time}=  Get Current Date  epoch
    \${load_time}=  Evaluate        \${end_time} - \${start_time}
    Log                            Content load time: \${load_time} seconds
    Run Keyword If  \${load_time} > 10  Log  Slow loading detected - network issue possible
    Run Keyword If  \${load_time} > 10  Capture Page Screenshot  slow-loading-issue.png
    \${performance_logs}=  Get Browser Logs  performance
    Log                            Performance logs: \${performance_logs}
    Element Should Be Visible       css=.network-test-complete
    Close Browser

Test JavaScript Errors Detection
    Open Browser                    \${URL}                              \${BROWSER}
    Log                            Detectando errores JavaScript
    Execute JavaScript              window.testErrors = []
    Execute JavaScript              window.addEventListener('error', function(e) { window.testErrors.push(e.message) })
    Click Element                   css=.js-error-trigger
    Sleep                          2s
    \${js_errors}=  Execute JavaScript  return window.testErrors
    \${error_count}=  Get Length    \${js_errors}
    Log                            JavaScript errors detected: \${error_count}
    Run Keyword If  \${error_count} > 0  Log  JS Errors: \${js_errors}
    Run Keyword If  \${error_count} > 0  Capture Page Screenshot  js-errors-detected.png
    \${console_logs}=  Get Browser Logs  browser
    Log                            Console logs: \${console_logs}
    Element Should Be Visible       css=.js-test-complete
    Close Browser

Test Conditional Debugging Flow
    Open Browser                    \${URL}                              \${BROWSER}
    Log                            Iniciando flujo de debugging condicional
    \${debug_mode}=  Convert To Boolean  \${DEBUG_MODE}
    Run Keyword If  \${debug_mode}  Set Screenshot Directory  \${CURDIR}/debug_screenshots
    Run Keyword If  \${debug_mode}  Log  Debug mode enabled - extra logging active
    Element Should Be Visible       css=.conditional-test-area
    \${test_data}=  Get Text        css=.test-data-display
    Run Keyword If  \${debug_mode}  Log  Test data found: \${test_data}
    Run Keyword If  \${debug_mode}  Capture Element Screenshot  css=.test-data-display  test-data-debug.png
    \${validation_result}=  Run Keyword And Return Status  Should Contain  \${test_data}  expected
    Run Keyword If  not \${validation_result} and \${debug_mode}  Log  Validation failed - debugging needed
    Run Keyword If  not \${validation_result} and \${debug_mode}  \${page_source}=  Get Source
    Run Keyword If  not \${validation_result} and \${debug_mode}  Log  Page source for analysis: \${page_source[:500]}
    Element Should Be Visible       css=.conditional-debug-complete
    Close Browser

Test Comprehensive Error Analysis
    Open Browser                    \${URL}                              \${BROWSER}
    Log                            Análisis comprehensivo de errores
    \${initial_element_count}=  Get Element Count  css=.dynamic-element
    Log                            Initial element count: \${initial_element_count}
    Click Element                   css=.trigger-dynamic-changes
    Sleep                          3s
    \${final_element_count}=  Get Element Count  css=.dynamic-element
    Log                            Final element count: \${final_element_count}
    \${elements_added}=  Evaluate  \${final_element_count} - \${initial_element_count}
    Log                            Elements added: \${elements_added}
    Run Keyword If  \${elements_added} == 0  Log  No elements added - potential issue
    Run Keyword If  \${elements_added} == 0  Capture Page Screenshot  no-elements-added.png
    Run Keyword If  \${elements_added} > 0  Log  Dynamic elements added successfully
    \${all_elements}=  Get WebElements  css=.dynamic-element
    FOR  \${element}  IN  @{all_elements}
        \${element_id}=  Get Element Attribute  \${element}  id
        Log  Dynamic element found with ID: \${element_id}
    END
    Close Browser</code></pre>
        
        <h3>🎯 Práctica debugging (5 min):</h3>
        <p>1. Usa Set Log Level DEBUG para máxima información de diagnóstico</p>
        <p>2. Practica Get Source para analizar HTML completo cuando falla</p>
        <p>3. Combina Get Browser Logs para detectar errores JavaScript</p>
        <p>4. Experimenta Run Keyword And Return Status para manejo errores</p>
        <p>5. Usa Wait Until Keyword Succeeds para elementos intermitentes</p>
        <p>6. Practica Capture Page Screenshot en puntos críticos de fallo</p>
        <p>7. Combina Get Current Date epoch para medir performance</p>
        <p>8. Usa Execute JavaScript para detectar errores del browser</p>
        <p>9. Practica Get Element Count antes/después para verificar cambios</p>
        <p>10. Combina FOR loops con logging detallado para investigación</p>
        <p>11. Usa Run Keyword If para debugging condicional inteligente</p>
        <p>12. Practica Get Element Attribute para inspección profunda</p>
        <p>13. Combina Sleep estratégico con verificaciones de estado</p>
        <p>14. Usa Convert To Boolean para flags de debugging dinámicos</p>
        <p>15. Crea flujos comprehensivos de análisis de problemas</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar debugging sistemático con captura de evidencias</li>
                <li>Detectar y analizar errores JavaScript y de red automáticamente</li>
                <li>Crear estrategias robustas de retry para elementos intermitentes</li>
                <li>Desarrollar flujos de troubleshooting condicional e inteligente</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Set Log Level DEBUG da máxima información. Get Browser Logs detecta errores JS. Run Keyword And Return Status maneja fallos gracefully. Screenshot + logging = debugging eficiente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 083 - Best practices SeleniumLibrary</h3>
        <p>Ahora aprenderás las mejores prácticas consolidadas para SeleniumLibrary: patrones probados, arquitecturas robustas y estándares de la industria.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-081"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_082 = LESSON_082;
}