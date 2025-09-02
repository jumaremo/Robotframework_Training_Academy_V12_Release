/**
 * Robot Framework Academy - Lesson 081
 * Testing cross-browser
 */

const LESSON_081 = {
    id: 81,
    title: "Testing cross-browser",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Cross-Browser Testing</h2>
        <p>Ejecuta tests en múltiples navegadores, maneja diferencias entre browsers y crea suites compatibles para máxima cobertura.</p>
        
        <h3>💻 Multi-browser automation:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://crossbrowser-demo.com
\${CHROME_BROWSER}      chrome
\${FIREFOX_BROWSER}     firefox
\${EDGE_BROWSER}        edge
\${SAFARI_BROWSER}      safari
\${TEST_EMAIL}          crossbrowser@test.com
\${TEST_PASSWORD}       secure123
\${MOBILE_USER_AGENT}   Mozilla/5.0 iPhone
\${DESKTOP_RESOLUTION}  1920x1080

*** Test Cases ***
Test Chrome Browser Compatibility
    Open Browser                    \${URL}                              \${CHROME_BROWSER}
    Maximize Browser Window
    Element Should Be Visible       css=.browser-info
    \${browser_info}=  Get Text     css=.browser-name
    Should Contain                  \${browser_info}                     Chrome
    Input Text                      id=email-chrome                     \${TEST_EMAIL}
    Element Should Be Visible       css=.chrome-validation
    Click Element                   css=.chrome-specific-feature
    Element Should Be Visible       css=.chrome-feature-result
    Capture Page Screenshot         chrome-compatibility-test.png
    Element Should Contain          css=.browser-support                 compatible
    Close Browser

Test Firefox Browser Compatibility
    Open Browser                    \${URL}                              \${FIREFOX_BROWSER}
    Maximize Browser Window
    Element Should Be Visible       css=.browser-info
    \${browser_info}=  Get Text     css=.browser-name
    Should Contain                  \${browser_info}                     Firefox
    Input Text                      id=email-firefox                    \${TEST_EMAIL}
    Element Should Be Visible       css=.firefox-validation
    Click Element                   css=.firefox-specific-feature
    Element Should Be Visible       css=.firefox-feature-result
    Capture Page Screenshot         firefox-compatibility-test.png
    Element Should Contain          css=.browser-support                 compatible
    Close Browser

Test Edge Browser Compatibility
    Open Browser                    \${URL}                              \${EDGE_BROWSER}
    Maximize Browser Window
    Element Should Be Visible       css=.browser-info
    \${browser_info}=  Get Text     css=.browser-name
    Should Contain                  \${browser_info}                     Edge
    Input Text                      id=email-edge                       \${TEST_EMAIL}
    Element Should Be Visible       css=.edge-validation
    Click Element                   css=.edge-specific-feature
    Element Should Be Visible       css=.edge-feature-result
    Capture Page Screenshot         edge-compatibility-test.png
    Element Should Contain          css=.browser-support                 compatible
    Close Browser

Test Cross Browser Form Behavior
    FOR  \${browser}  IN  \${CHROME_BROWSER}  \${FIREFOX_BROWSER}  \${EDGE_BROWSER}
        Open Browser                \${URL}                              \${browser}
        Element Should Be Visible   css=.universal-form
        Input Text                  id=universal-email                  \${TEST_EMAIL}
        Input Password              id=universal-password               \${TEST_PASSWORD}
        Select From List By Label   id=browser-select                   \${browser}
        Element Should Be Visible   css=.form-validation-success
        Click Button                css=.submit-universal-form
        Element Should Be Visible   css=.submission-success
        Element Should Contain      css=.success-message                enviado correctamente
        Capture Page Screenshot     \${browser}-form-submission.png
        Close Browser
    END

Test Responsive Design Validation
    Open Browser                    \${URL}                              \${CHROME_BROWSER}
    Set Window Size                 1920                                1080
    Element Should Be Visible       css=.desktop-layout
    Element Should Not Be Visible   css=.mobile-layout
    Capture Page Screenshot         desktop-1920x1080.png
    Set Window Size                 768                                 1024
    Element Should Be Visible       css=.tablet-layout
    Element Should Not Be Visible   css=.desktop-layout
    Capture Page Screenshot         tablet-768x1024.png
    Set Window Size                 375                                 667
    Element Should Be Visible       css=.mobile-layout
    Element Should Not Be Visible   css=.tablet-layout
    Capture Page Screenshot         mobile-375x667.png
    Close Browser

Test Browser Feature Detection
    Open Browser                    \${URL}                              \${CHROME_BROWSER}
    \${supports_canvas}=  Execute JavaScript  return !!document.createElement('canvas').getContext
    Should Be True                  \${supports_canvas}
    \${supports_localstorage}=  Execute JavaScript  return typeof(Storage) !== 'undefined'
    Should Be True                  \${supports_localstorage}
    \${supports_geolocation}=  Execute JavaScript  return 'geolocation' in navigator
    Should Be True                  \${supports_geolocation}
    \${user_agent}=  Execute JavaScript  return navigator.userAgent
    Should Contain                  \${user_agent}                       Chrome
    Log                            Browser capabilities verified
    Element Should Be Visible       css=.feature-detection-complete
    Close Browser

Test Browser Specific Workarounds
    Open Browser                    \${URL}                              \${FIREFOX_BROWSER}
    Element Should Be Visible       css=.workaround-container
    Run Keyword And Ignore Error    Click Element                       css=.firefox-problematic-element
    Wait Until Element Is Visible   css=.firefox-fallback              5s
    Element Should Be Visible       css=.firefox-fallback
    Execute JavaScript              document.querySelector('.firefox-js-fix').click()
    Element Should Be Visible       css=.firefox-workaround-success
    Open Browser                    \${URL}                              \${CHROME_BROWSER}
    Element Should Be Visible       css=.workaround-container
    Click Element                   css=.chrome-standard-behavior
    Element Should Be Visible       css=.chrome-success
    Close All Browsers

Test Parallel Browser Execution
    Open Browser                    \${URL}                              \${CHROME_BROWSER}
    Open Browser                    \${URL}                              \${FIREFOX_BROWSER}
    Switch Browser                  1
    Element Should Be Visible       css=.browser-session-1
    Input Text                      id=session-1-input                  Chrome Session
    Element Should Contain          css=.session-info                   Session 1
    Switch Browser                  2
    Element Should Be Visible       css=.browser-session-2
    Input Text                      id=session-2-input                  Firefox Session
    Element Should Contain          css=.session-info                   Session 2
    Switch Browser                  1
    Element Should Contain          id=session-1-input                  Chrome Session
    Switch Browser                  2
    Element Should Contain          id=session-2-input                  Firefox Session
    Close All Browsers</code></pre>
        
        <h3>🎯 Práctica cross-browser (5 min):</h3>
        <p>1. Prueba mismo test en chrome, firefox y edge secuencialmente</p>
        <p>2. Usa FOR loops para ejecutar en múltiples browsers automáticamente</p>
        <p>3. Combina Set Window Size para testing responsive diferente</p>
        <p>4. Practica Execute JavaScript para feature detection</p>
        <p>5. Usa Should Contain con user agent para verificar browser</p>
        <p>6. Combina Capture Page Screenshot por browser para evidencia</p>
        <p>7. Practica Run Keyword And Ignore Error para workarounds</p>
        <p>8. Usa Switch Browser para sesiones paralelas múltiples</p>
        <p>9. Combina Close All Browsers para cleanup eficiente</p>
        <p>10. Experimenta Maximize Browser Window vs Set Window Size</p>
        <p>11. Practica Element Should/Not Be Visible para layouts responsive</p>
        <p>12. Usa variables para browser names reutilizables</p>
        <p>13. Combina Get Text para verificar browser-specific info</p>
        <p>14. Practica Wait Until para elementos que cargan diferente</p>
        <p>15. Crea matrices de compatibilidad completas por browser</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Ejecutar tests en múltiples navegadores automáticamente</li>
                <li>Manejar diferencias de comportamiento entre browsers</li>
                <li>Validar responsive design en diferentes resoluciones</li>
                <li>Implementar workarounds para incompatibilidades específicas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa FOR loops para múltiples browsers. Set Window Size para responsive testing. Execute JavaScript para feature detection. Switch Browser para sesiones paralelas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 082 - Debugging y troubleshooting</h3>
        <p>Ahora aprenderás técnicas avanzadas de debugging, análisis de fallos y troubleshooting sistemático para resolver problemas complejos.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-080"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_081 = LESSON_081;
}