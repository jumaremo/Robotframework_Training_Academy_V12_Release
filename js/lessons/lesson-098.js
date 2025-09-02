/**
 * Robot Framework Academy - Lesson 098
 * Localizadores Avanzados 098
 */

const LESSON_098 = {
    id: 98,
    title: "Localizadores Avanzados 098",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🔍 Debug Localizadores</h2>
        <p>Técnicas para identificar y resolver problemas de localización.</p>
        
        <h3>💻 Debugging sistemático:</h3>
        <pre><code class="robot">*** Variables ***
\${DEBUG_ELEMENT}      css=[data-debug="target"]
\${FAILING_SELECTOR}   css=.non-existent-class
\${BACKUP_SELECTOR}    css=[data-testid="fallback"]
\${TIMING_ELEMENT}     css=[data-timing="slow"]
\${BROWSER_CONSOLE}    console.log arguments
\${SCREENSHOT_PATH}    \${CURDIR}/debug_screenshots
\${LOG_LEVEL}          DEBUG
\${RETRY_ELEMENT}      css=[data-retry="needed"]

*** Test Cases ***
Test Debug Elemento No Encontrado
    Open Browser    https://debug-app.com    chrome
    Run Keyword And Return Status    Element Should Be Visible    \${FAILING_SELECTOR}
    Run Keyword If Test Failed    Log    Element not found: \${FAILING_SELECTOR}    WARN
    Run Keyword If Test Failed    Capture Page Screenshot    \${SCREENSHOT_PATH}/missing_element.png
    Run Keyword If Test Failed    Get Source    
    Element Should Be Visible    \${BACKUP_SELECTOR}
    Log Element Count    css=*    INFO
    Close Browser

Test Debug Timing Issues
    Open Browser    https://debug-app.com    chrome
    Set Selenium Timeout    2s
    Run Keyword And Ignore Error    Element Should Be Visible    \${TIMING_ELEMENT}
    Set Selenium Timeout    10s
    Wait Until Element Is Visible    \${TIMING_ELEMENT}    timeout=15s
    Element Should Be Visible    \${TIMING_ELEMENT}
    Log    Element found after extended wait    INFO
    Capture Page Screenshot    \${SCREENSHOT_PATH}/timing_resolved.png
    Close Browser

Test Debug Selectores Múltiples
    Open Browser    https://debug-app.com    chrome
    \${status1}=    Run Keyword And Return Status    Element Should Be Visible    css=#primary-btn
    \${status2}=    Run Keyword And Return Status    Element Should Be Visible    css=.primary-button
    \${status3}=    Run Keyword And Return Status    Element Should Be Visible    css=[data-action="primary"]
    Log    Selector results: \${status1}, \${status2}, \${status3}    INFO
    Run Keyword If    \${status1}    Click Element    css=#primary-btn
    Run Keyword Unless    \${status1}    Run Keyword If    \${status2}    Click Element    css=.primary-button
    Run Keyword Unless    \${status1} or \${status2}    Click Element    css=[data-action="primary"]
    Close Browser

Test Debug Atributos Dinámicos
    Open Browser    https://debug-app.com    chrome
    \${element_id}=    Get Element Attribute    css=.dynamic-element    id
    Log    Dynamic ID found: \${element_id}    INFO
    \${element_class}=    Get Element Attribute    css=.dynamic-element    class
    Log    Dynamic classes: \${element_class}    INFO
    Element Should Be Visible    css=[id="\${element_id}"]
    \${element_count}=    Get Element Count    css=.\${element_class}
    Log    Elements with class: \${element_count}    INFO
    Close Browser

Test Debug JavaScript Errors
    Open Browser    https://debug-app.com    chrome
    Execute JavaScript    window.debugInfo = {errors: [], warnings: []}
    Execute JavaScript    console.log('Debug mode activated')
    Click Element    css=.trigger-js-error
    \${console_logs}=    Get Browser Console Log
    Log    Console logs: \${console_logs}    INFO
    Execute JavaScript    return window.debugInfo
    Element Should Be Visible    css=.error-message:visible
    Capture Page Screenshot    \${SCREENSHOT_PATH}/js_error.png
    Close Browser

Test Debug Estado Elementos
    Open Browser    https://debug-app.com    chrome
    \${is_visible}=    Run Keyword And Return Status    Element Should Be Visible    \${DEBUG_ELEMENT}
    \${is_enabled}=    Run Keyword And Return Status    Element Should Be Enabled    \${DEBUG_ELEMENT}
    \${element_text}=    Get Text    \${DEBUG_ELEMENT}
    Log    Element state - Visible: \${is_visible}, Enabled: \${is_enabled}, Text: \${element_text}    INFO
    \${element_location}=    Get Element Location    \${DEBUG_ELEMENT}
    \${element_size}=    Get Element Size    \${DEBUG_ELEMENT}
    Log    Element position: \${element_location}, Size: \${element_size}    INFO
    Close Browser</code></pre>
        
        <h3>🎯 Práctica debugging (5 min):</h3>
        <p>1. Usar Run Keyword And Return Status para detectar fallos</p>
        <p>2. Capturar screenshots automáticos cuando elementos fallan</p>
        <p>3. Implementar selectores fallback con Run Keyword If</p>
        <p>4. Ajustar timeouts dinámicamente para elementos lentos</p>
        <p>5. Usar Get Source para analizar HTML actual</p>
        <p>6. Log de información de debugging con niveles apropiados</p>
        <p>7. Validar atributos dinámicos antes de usar en selectores</p>
        <p>8. Probar múltiples variantes de selector sistemáticamente</p>
        <p>9. Usar JavaScript para acceder a información debug</p>
        <p>10. Capturar console logs para detectar errores JS</p>
        <p>11. Verificar estado de elementos antes de interactuar</p>
        <p>12. Obtener posición y tamaño para validar rendering</p>
        <p>13. Implementar retry logic con Run Keyword And Ignore Error</p>
        <p>14. Usar Get Element Count para validar existencia múltiple</p>
        <p>15. Crear logs detallados de proceso de localización</p>
        <p>16. Validar visibilidad vs existencia de elementos</p>
        <p>17. Probar selectores en diferentes estados de página</p>
        <p>18. Documentar problemas encontrados para futuras referencias</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Diagnosticar problemas de localizadores sistemáticamente</li>
                <li>Implementar estrategias de fallback robustas</li>
                <li>Usar herramientas de debugging para análisis profundo</li>
                <li>Crear logs informativos para troubleshooting futuro</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Siempre captura screenshot + HTML source al fallar. Usa Run Keyword And Return Status para control de flujo.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 099 - Proyecto: Localizadores robustos</h3>
        <p>Aplicarás todo el conocimiento de localizadores en un proyecto integrador que combina robustez, performance y debugging.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-097"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_098 = LESSON_098;
}