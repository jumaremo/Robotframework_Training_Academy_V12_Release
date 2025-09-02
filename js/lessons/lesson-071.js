/**
 * Robot Framework Academy - Lesson 071
 * Estrategias de localización robusta
 */

const LESSON_071 = {
    id: 71,
    title: "Estrategias de localización robusta",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Localización Robusta</h2>
        <p>Crea localizadores que sobrevivan a cambios de diseño, elementos dinámicos y diferentes browsers usando estrategias inteligentes de fallback.</p>
        
        <h3>💻 Estrategias probadas:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}            https://app-dinamica.com
\${BROWSER}        chrome
\${TIMEOUT}        10s
\${USER_EMAIL}     test@robust.com
\${PRODUCT_NAME}   Laptop Premium
\${FALLBACK_WAIT}  5s
\${ERROR_MESSAGE}  Elemento no encontrado
\${SUCCESS_TEXT}   Operación exitosa

*** Test Cases ***
Test Multiple Locator Strategy
    Open Browser                     \${URL}                              \${BROWSER}
    Set Selenium Timeout             \${TIMEOUT}
    Run Keyword And Ignore Error     Click Element                       id=login-btn
    Run Keyword And Ignore Error     Click Element                       css=.login-button
    Run Keyword And Ignore Error     Click Element                       xpath=//button[contains(text(),'Login')]
    Element Should Be Visible        css=.login-form, xpath=//form[@class='auth']
    Page Should Contain              formulario OR acceso
    Close Browser

Test Dynamic Element Handling
    Open Browser                     \${URL}                              \${BROWSER}
    Wait Until Element Is Visible    css=.dynamic-content                \${FALLBACK_WAIT}
    Element Should Be Visible        xpath=//div[@data-loaded='true']
    Click Element                    css=button[data-action='load-more']
    Wait Until Page Contains         \${PRODUCT_NAME}                     \${TIMEOUT}
    Element Should Be Visible        xpath=//div[contains(@class,'product') and @data-id]
    Element Should Contain           css=.product-count                  productos
    Close Browser

Test Flexible Input Handling
    Open Browser                     \${URL}                              \${BROWSER}
    Wait Until Element Is Enabled    css=input[name='email'], id=email-field \${TIMEOUT}
    Input Text                       css=input[type='email']             \${USER_EMAIL}
    Element Should Contain           css=.validation-message             válido
    Clear Element Text               css=input[name='email']
    Input Text                       xpath=//input[@placeholder*='email'] \${USER_EMAIL}
    Element Should Be Visible        css=.success-icon, xpath=//span[@class='check']
    Close Browser

Test Robust Table Navigation
    Open Browser                     \${URL}                              \${BROWSER}
    Wait Until Element Is Visible    css=table, xpath=//table            \${TIMEOUT}
    Element Should Be Visible        xpath=//table//th[contains(text(),'Nombre')]
    Click Element                    xpath=//tr[td[contains(text(),'\${PRODUCT_NAME}')]]/td[last()]//button
    Element Should Be Visible        css=.modal-dialog, xpath=//div[@role='dialog']
    Element Should Contain           css=.modal-title, xpath=//h2[@class='title'] \${PRODUCT_NAME}
    Click Element                    css=.modal-close, xpath=//button[@aria-label='Close']
    Close Browser

Test Error Recovery Patterns
    Open Browser                     \${URL}                              \${BROWSER}
    \${status}=  Run Keyword And Return Status  Click Element            id=primary-action
    Run Keyword If  not \${status}   Click Element                       css=.primary-btn
    \${visible}=  Run Keyword And Return Status  Element Should Be Visible css=.success-message
    Run Keyword If  not \${visible}  Wait Until Page Contains            \${SUCCESS_TEXT}
    Element Should Be Visible        css=.confirmation, xpath=//div[@class='confirm']
    Page Should Contain              exitoso OR completado OR finalizado
    Close Browser

Test Responsive Design Handling
    Open Browser                     \${URL}                              \${BROWSER}
    Set Window Size                  1920                                 1080
    Element Should Be Visible        css=.desktop-menu
    Set Window Size                  768                                  1024
    Element Should Be Visible        css=.mobile-menu, css=.hamburger-menu
    Click Element                    css=.menu-toggle, xpath=//button[@aria-label='Menu']
    Element Should Be Visible        css=.nav-mobile, xpath=//nav[@class='mobile']
    Set Window Size                  1920                                 1080
    Close Browser

Test Smart Wait Strategies
    Open Browser                     \${URL}                              \${BROWSER}
    Wait Until Element Is Visible    css=.loading-spinner                \${FALLBACK_WAIT}
    Wait Until Element Is Not Visible css=.loading-spinner               \${TIMEOUT}
    Wait Until Element Is Clickable  css=.action-button, id=submit-btn   \${TIMEOUT}
    Click Element                    css=.action-button
    Wait Until Page Contains Element css=.result-container               \${TIMEOUT}
    Element Should Contain           css=.status-message                 \${SUCCESS_TEXT}
    Wait Until Element Is Enabled    css=.next-action                    \${FALLBACK_WAIT}
    Close Browser</code></pre>
        
        <h3>🎯 Práctica robusta (5 min):</h3>
        <p>1. Crea fallback con Run Keyword And Ignore Error</p>
        <p>2. Usa Element Should Be Visible con múltiples selectores</p>
        <p>3. Combina Wait Until con timeout personalizado</p>
        <p>4. Practica Run Keyword And Return Status para verificar</p>
        <p>5. Usa Set Selenium Timeout para ajustar esperas</p>
        <p>6. Combina css y xpath en mismo keyword</p>
        <p>7. Practica Wait Until Element Is Clickable</p>
        <p>8. Usa Page Should Contain con múltiples opciones</p>
        <p>9. Combina Element Should Contain con selectores alternativos</p>
        <p>10. Practica Clear Element Text antes de Input Text</p>
        <p>11. Usa Wait Until Page Contains Element para dinámicos</p>
        <p>12. Combina Set Window Size con responsive testing</p>
        <p>13. Practica Run Keyword If para conditional logic</p>
        <p>14. Usa Wait Until Element Is Not Visible para loading</p>
        <p>15. Crea estrategias de recovery para elementos cambiantes</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear localizadores resistentes a cambios de UI</li>
                <li>Manejar elementos dinámicos y contenido asíncrono</li>
                <li>Implementar estrategias de fallback automático</li>
                <li>Optimizar esperas y timeouts para estabilidad</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Combina CSS rápido con XPath potente. Usa Wait Until para elementos dinámicos y siempre ten un plan B.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 072 - Interacciones básicas con elementos</h3>
        <p>Ahora aprenderás las interacciones fundamentales: clicks, input, selecciones, keyboard actions y mouse movements.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-070"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_071 = LESSON_071;
}