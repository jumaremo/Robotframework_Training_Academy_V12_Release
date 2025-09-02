/**
 * Robot Framework Academy - Lesson 074
 * Manejo de ventanas y frames
 */

const LESSON_074 = {
    id: 74,
    title: "Manejo de ventanas y frames",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Ventanas y Frames</h2>
        <p>Navega entre ventanas múltiples, iframes, pop-ups y contextos diferentes para automatizar aplicaciones web complejas con múltiples paneles.</p>
        
        <h3>💻 Navegación contextos:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}              https://multi-window-app.com
\${BROWSER}          chrome
\${POPUP_URL}        https://popup-demo.com
\${IFRAME_URL}       https://iframe-content.com
\${USER_EMAIL}       test@windows.com
\${DOCUMENT_NAME}    reporte-final.pdf
\${SEARCH_TERM}      automation testing
\${ALERT_MESSAGE}    Operación confirmada

*** Test Cases ***
Test Multiple Windows Navigation
    Open Browser                    \${URL}                              \${BROWSER}
    Click Link                      Abrir nueva ventana
    \${main_window}=                Get Window Handles
    Length Should Be                \${main_window}                      2
    Switch Window                   NEW
    Title Should Contain            Nueva Ventana
    Input Text                      id=search-box                       \${SEARCH_TERM}
    Click Button                    css=.search-btn
    Element Should Be Visible       css=.search-results
    Switch Window                   MAIN
    Page Should Contain             Ventana principal
    Close All Browsers

Test Window Handles Management
    Open Browser                    \${URL}                              \${BROWSER}
    \${original}=                   Get Window Handles
    Click Element                   css=.open-popup
    \${all_windows}=                Get Window Handles
    Length Should Be                \${all_windows}                      2
    \${popup}=                      Set Variable                        \${all_windows}[1]
    Switch Window                   \${popup}
    Element Should Be Visible       css=.popup-content
    Input Text                      id=popup-email                      \${USER_EMAIL}
    Click Button                    css=.popup-submit
    Element Should Contain          css=.popup-result                   enviado
    Switch Window                   \${original}[0]
    Close All Browsers

Test IFrame Content Interaction
    Open Browser                    \${URL}                              \${BROWSER}
    Wait Until Element Is Visible   css=iframe[name='content-frame']    10s
    Select Frame                    name=content-frame
    Element Should Be Visible       css=.iframe-content
    Input Text                      id=iframe-input                     \${DOCUMENT_NAME}
    Click Button                    css=.iframe-save
    Element Should Contain          css=.iframe-status                  guardado
    Unselect Frame
    Element Should Be Visible       css=.main-page-content
    Page Should Contain             frame principal
    Close Browser

Test Nested Frames Navigation
    Open Browser                    \${URL}                              \${BROWSER}
    Select Frame                    id=outer-frame
    Element Should Be Visible       css=.outer-frame-content
    Select Frame                    css=iframe.inner-frame
    Element Should Be Visible       css=.inner-frame-content
    Input Text                      id=nested-input                     datos anidados
    Click Element                   css=.nested-submit
    Element Should Contain          css=.nested-result                  procesado
    Unselect Frame
    Element Should Be Visible       css=.outer-frame-content
    Unselect Frame
    Element Should Be Visible       css=.main-content
    Close Browser

Test Alert Handling
    Open Browser                    \${URL}                              \${BROWSER}
    Click Button                    css=.trigger-alert
    \${alert_text}=                 Handle Alert                        ACCEPT
    Should Be Equal                 \${alert_text}                      \${ALERT_MESSAGE}
    Click Element                   css=.trigger-confirm
    Handle Alert                    DISMISS
    Element Should Contain          css=.confirm-result                 cancelado
    Click Button                    css=.trigger-prompt
    Handle Alert                    ACCEPT                              respuesta prompt
    Element Should Contain          css=.prompt-result                  respuesta prompt
    Close Browser

Test Tab Management
    Open Browser                    \${URL}                              \${BROWSER}
    \${tabs_before}=                Get Window Handles
    Execute JavaScript              window.open('\${POPUP_URL}','_blank')
    \${tabs_after}=                 Get Window Handles
    Length Should Be                \${tabs_after}                      2
    Switch Window                   locator=NEW
    Title Should Contain            Popup Demo
    Element Should Be Visible       css=.tab-content
    Switch Window                   locator=MAIN
    Element Should Be Visible       css=.main-tab-content
    Close Window
    \${tabs_final}=                 Get Window Handles
    Length Should Be                \${tabs_final}                      1
    Close Browser

Test Complex Window Scenarios
    Open Browser                    \${URL}                              \${BROWSER}
    Click Element                   css=.multi-action-btn
    Wait Until Element Is Visible   css=iframe.dynamic-frame            10s
    Select Frame                    css=iframe.dynamic-frame
    Click Link                      Abrir popup desde iframe
    Switch Window                   NEW
    Element Should Be Visible       css=.popup-from-iframe
    Input Text                      id=popup-data                       datos complejos
    Click Button                    css=.popup-process
    Element Should Contain          css=.popup-confirmation             procesado
    Close Window
    Switch Window                   MAIN
    Select Frame                    css=iframe.dynamic-frame
    Element Should Be Visible       css=.iframe-updated
    Unselect Frame
    Close Browser</code></pre>
        
        <h3>🎯 Práctica ventanas (5 min):</h3>
        <p>1. Usa Get Window Handles para obtener todas las ventanas</p>
        <p>2. Practica Switch Window con NEW, MAIN y handles específicos</p>
        <p>3. Combina Length Should Be para verificar número ventanas</p>
        <p>4. Experimenta Select Frame con name, id y css selector</p>
        <p>5. Usa Unselect Frame para regresar al contexto principal</p>
        <p>6. Practica Handle Alert con ACCEPT, DISMISS y texto</p>
        <p>7. Combina Execute JavaScript para abrir tabs programáticamente</p>
        <p>8. Usa Close Window vs Close All Browsers diferencias</p>
        <p>9. Experimenta con frames anidados usando Select Frame múltiple</p>
        <p>10. Practica Wait Until Element Is Visible para iframes dinámicos</p>
        <p>11. Combina navegación ventanas + frames en mismo test</p>
        <p>12. Usa Title Should Contain para verificar contexto correcto</p>
        <p>13. Practica manejo de pop-ups con interacciones complejas</p>
        <p>14. Experimenta con alerts, confirms y prompts</p>
        <p>15. Crea flujos que naveguen múltiples contextos secuencialmente</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar navegación entre ventanas múltiples y tabs</li>
                <li>Manejar iframes y frames anidados eficientemente</li>
                <li>Controlar alerts, confirms y prompts automáticamente</li>
                <li>Crear tests robustos para aplicaciones multi-contexto</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Siempre guarda window handles en variables. Usa Unselect Frame después de trabajar en iframes. Handle Alert debe usarse inmediatamente después del trigger.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 075 - Screenshots y evidencias</h3>
        <p>Ahora aprenderás a capturar evidencias automáticas: screenshots, videos, logs y reportes visuales para debugging y documentación.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-073"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_074 = LESSON_074;
}