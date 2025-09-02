/**
 * Robot Framework Academy - Lesson 073
 * Waits y sincronización
 */

const LESSON_073 = {
    id: 73,
    title: "Waits y sincronización",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Sincronización Web</h2>
        <p>Maneja elementos dinámicos, cargas asíncronas y aplicaciones SPA con waits inteligentes que garantizan tests estables y confiables.</p>
        
        <h3>💻 Waits estratégicos:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}               https://app-dinamica.com
\${BROWSER}           chrome
\${TIMEOUT_SHORT}     5s
\${TIMEOUT_MEDIUM}    10s
\${TIMEOUT_LONG}      20s
\${SEARCH_TERM}       Robot Framework
\${SUCCESS_MESSAGE}   Operación completada
\${USER_DATA}         test@automation.com
\${PRODUCT_ID}        12345

*** Test Cases ***
Test Element Visibility Waits
    Open Browser                        \${URL}                              \${BROWSER}
    Set Selenium Timeout                \${TIMEOUT_MEDIUM}
    Wait Until Element Is Visible       css=.loading-spinner                \${TIMEOUT_SHORT}
    Wait Until Element Is Not Visible   css=.loading-spinner                \${TIMEOUT_MEDIUM}
    Element Should Be Visible           css=.main-content
    Wait Until Element Is Visible       id=dynamic-menu                     \${TIMEOUT_SHORT}
    Click Element                       css=.menu-toggle
    Wait Until Element Is Visible       css=.submenu-items                  \${TIMEOUT_SHORT}
    Element Should Contain              css=.menu-status                    expandido
    Close Browser

Test Element State Waits
    Open Browser                        \${URL}                              \${BROWSER}
    Wait Until Element Is Enabled       css=.submit-button                  \${TIMEOUT_MEDIUM}
    Element Should Be Enabled           css=.submit-button
    Click Element                       css=.disable-form
    Wait Until Element Is Disabled      css=.submit-button                  \${TIMEOUT_SHORT}
    Element Should Be Disabled          css=.submit-button
    Click Element                       css=.enable-form
    Wait Until Element Is Clickable     css=.submit-button                  \${TIMEOUT_SHORT}
    Element Should Be Enabled           css=.submit-button
    Close Browser

Test Page Content Waits
    Open Browser                        \${URL}                              \${BROWSER}
    Input Text                          id=search-box                       \${SEARCH_TERM}
    Click Button                        css=.search-btn
    Wait Until Page Contains            resultados                          \${TIMEOUT_MEDIUM}
    Page Should Contain                 \${SEARCH_TERM}
    Wait Until Page Contains Element    css=.search-results                 \${TIMEOUT_SHORT}
    Element Should Be Visible           css=.results-count
    Wait Until Page Does Not Contain    Cargando                           \${TIMEOUT_SHORT}
    Element Should Contain              css=.status                         completado
    Close Browser

Test Text Content Waits
    Open Browser                        \${URL}                              \${BROWSER}
    Click Button                        css=.load-data
    Wait Until Element Contains         css=.data-container                 información    \${TIMEOUT_MEDIUM}
    Element Should Contain              css=.data-container                 información
    Click Element                       css=.refresh-data
    Wait Until Element Does Not Contain css=.data-container                antigua        \${TIMEOUT_SHORT}
    Wait Until Element Contains         css=.timestamp                     actualizado    \${TIMEOUT_SHORT}
    Element Should Be Visible           css=.fresh-data-indicator
    Close Browser

Test AJAX Response Waits
    Open Browser                        \${URL}                              \${BROWSER}
    Click Element                       css=.ajax-trigger
    Wait Until Element Is Visible       css=.ajax-loading                   \${TIMEOUT_SHORT}
    Element Should Contain              css=.ajax-status                    procesando
    Wait Until Element Is Not Visible   css=.ajax-loading                   \${TIMEOUT_LONG}
    Wait Until Element Contains         css=.ajax-result                   \${SUCCESS_MESSAGE} \${TIMEOUT_MEDIUM}
    Element Should Be Visible           css=.success-icon
    Element Should Contain              css=.response-data                  datos
    Close Browser

Test Form Submission Waits
    Open Browser                        \${URL}                              \${BROWSER}
    Input Text                          id=email                            \${USER_DATA}
    Input Text                          id=product-id                       \${PRODUCT_ID}
    Click Button                        css=.submit-form
    Wait Until Element Is Visible       css=.form-processing                \${TIMEOUT_SHORT}
    Element Should Contain              css=.form-status                    enviando
    Wait Until Element Is Not Visible   css=.form-processing                \${TIMEOUT_LONG}
    Wait Until Page Contains            formulario enviado                  \${TIMEOUT_MEDIUM}
    Element Should Be Visible           css=.confirmation-message
    Element Should Contain              css=.reference-number               REF-
    Close Browser

Test Custom Wait Conditions
    Open Browser                        \${URL}                              \${BROWSER}
    Click Element                       css=.start-process
    Wait Until Keyword Succeeds         \${TIMEOUT_LONG}    2s    Element Should Contain    css=.progress-bar    100%
    Element Should Be Visible           css=.process-complete
    Wait Until Keyword Succeeds         \${TIMEOUT_SHORT}   1s    Page Should Contain       finalizado
    Element Should Contain              css=.final-status                   éxito
    Wait Until Keyword Succeeds         \${TIMEOUT_MEDIUM}  3s    Element Should Be Visible css=.download-link
    Element Should Be Enabled           css=.download-button
    Close Browser</code></pre>
        
        <h3>🎯 Práctica waits (5 min):</h3>
        <p>1. Usa Wait Until Element Is Visible con timeout custom</p>
        <p>2. Combina Wait Until Element Is Not Visible para loading</p>
        <p>3. Practica Wait Until Element Is Enabled/Disabled</p>
        <p>4. Experimenta Wait Until Page Contains texto específico</p>
        <p>5. Usa Wait Until Element Contains con verificación</p>
        <p>6. Combina Wait Until Element Is Clickable antes de click</p>
        <p>7. Practica Wait Until Page Does Not Contain</p>
        <p>8. Usa Set Selenium Timeout para ajuste global</p>
        <p>9. Experimenta Wait Until Keyword Succeeds para reintentos</p>
        <p>10. Combina múltiples waits en secuencia lógica</p>
        <p>11. Practica timeouts cortos vs largos según contexto</p>
        <p>12. Usa Wait Until Element Does Not Contain</p>
        <p>13. Combina waits con Element Should Be verificaciones</p>
        <p>14. Practica esperas para AJAX y contenido dinámico</p>
        <p>15. Crea estrategias de wait robustas para SPA</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar todos los tipos de waits de SeleniumLibrary</li>
                <li>Sincronizar tests con aplicaciones dinámicas y SPA</li>
                <li>Optimizar timeouts para velocidad vs estabilidad</li>
                <li>Manejar cargas asíncronas y contenido dinámico</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa timeouts cortos (5s) para elementos rápidos, medianos (10s) para AJAX, largos (20s) para procesos complejos. Siempre espera antes de verificar.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 074 - Manejo de ventanas y frames</h3>
        <p>Ahora aprenderás a navegar entre ventanas múltiples, iframes, pop-ups y contextos de browser para tests complejos.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-072"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_073 = LESSON_073;
}