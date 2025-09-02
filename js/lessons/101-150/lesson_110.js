/**
 * Robot Framework Academy - Lesson 110
 * Testing cross-browser
 */

const LESSON_110 = {
    id: 110,
    title: "Interacciones Avanzadas 110",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>🌐 Testing cross-browser</h2>
        <p>Ejecutar tests en múltiples navegadores, manejar diferencias entre browsers y automatizar testing multi-browser.</p>
        
        <h3>💻 Tests Multi-Browser:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com
\${CHROME_BROWSER}     chrome
\${FIREFOX_BROWSER}    firefox
\${EDGE_BROWSER}       edge
\${SAFARI_BROWSER}     safari
\${TEST_TEXT}          cross browser test
\${LOGIN_BUTTON}       id=login-btn
\${USERNAME_FIELD}     name=username

*** Test Cases ***
Test Chrome Browser
    Open Browser              \${URL}        \${CHROME_BROWSER}
    Title Should Be           Mi Aplicación Web
    Page Should Contain       bienvenido
    Input Text                \${USERNAME_FIELD}    testuser
    Click Button              \${LOGIN_BUTTON}
    Wait Until Page Contains  dashboard
    \${browser_name}=    Execute JavaScript    return navigator.userAgent
    Should Contain            \${browser_name}    Chrome
    Element Should Be Visible id=user-menu
    Page Should Contain       sesión iniciada
    Close Browser

Test Firefox Browser
    Open Browser              \${URL}        \${FIREFOX_BROWSER}
    Title Should Be           Mi Aplicación Web
    Page Should Contain       bienvenido
    Input Text                \${USERNAME_FIELD}    testuser
    Click Button              \${LOGIN_BUTTON}
    Wait Until Page Contains  dashboard
    \${browser_name}=    Execute JavaScript    return navigator.userAgent
    Should Contain            \${browser_name}    Firefox
    Element Should Be Visible id=user-menu
    Page Should Contain       sesión iniciada
    Close Browser

Test Edge Browser
    Open Browser              \${URL}        \${EDGE_BROWSER}
    Title Should Be           Mi Aplicación Web
    Page Should Contain       bienvenido
    Input Text                \${USERNAME_FIELD}    testuser
    Click Button              \${LOGIN_BUTTON}
    Wait Until Page Contains  dashboard
    \${browser_name}=    Execute JavaScript    return navigator.userAgent
    Should Contain            \${browser_name}    Edg
    Element Should Be Visible id=user-menu
    Page Should Contain       sesión iniciada
    Close Browser

Test Browser Capabilities
    Open Browser              \${URL}        \${CHROME_BROWSER}
    \${supports_css_grid}=    Execute JavaScript    return CSS.supports('display', 'grid')
    Should Be True            \${supports_css_grid}
    \${supports_flexbox}=     Execute JavaScript    return CSS.supports('display', 'flex')
    Should Be True            \${supports_flexbox}
    \${screen_width}=    Execute JavaScript    return screen.width
    Should Be True            \${screen_width} > 0
    \${local_storage}=   Execute JavaScript    return typeof(Storage) !== 'undefined'
    Should Be True            \${local_storage}
    Page Should Contain       funcionalidades soportadas
    Close Browser

Test Browser Differences
    Open Browser              \${URL}        \${CHROME_BROWSER}
    \${chrome_version}=  Execute JavaScript    return navigator.appVersion
    Log                       Chrome: \${chrome_version}
    Close Browser
    Open Browser              \${URL}        \${FIREFOX_BROWSER}
    \${firefox_version}= Execute JavaScript    return navigator.appVersion
    Log                       Firefox: \${firefox_version}
    Should Not Be Equal       \${chrome_version}    \${firefox_version}
    Close Browser

Test Responsive Cross-Browser
    Open Browser              \${URL}        \${CHROME_BROWSER}
    Set Window Size           375    667
    Element Should Be Visible css=.mobile-nav
    Close Browser
    Open Browser              \${URL}        \${FIREFOX_BROWSER}
    Set Window Size           375    667
    Element Should Be Visible css=.mobile-nav
    \${mobile_view}=     Execute JavaScript    return window.innerWidth <= 768
    Should Be True            \${mobile_view}
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Cross-Browser (5 min):</h3>
        <p>1. Configura tests para ejecutar en Chrome primero</p>
        <p>2. Verifica que funcionalidad básica funciona en Chrome</p>
        <p>3. Ejecuta mismo test en Firefox cambiando variable browser</p>
        <p>4. Compara user agent strings entre navegadores</p>
        <p>5. Usa Execute JavaScript para detectar capabilities</p>
        <p>6. Verifica que CSS.supports funciona en cada browser</p>
        <p>7. Testa localStorage support en múltiples browsers</p>
        <p>8. Implementa test en Edge/Safari si están disponibles</p>
        <p>9. Compara versiones de navegador con Log</p>
        <p>10. Valida que elementos se renderizan igual</p>
        <p>11. Usa Set Window Size para testing responsive</p>
        <p>12. Verifica que mobile view funciona cross-browser</p>
        <p>13. Implementa timeouts diferentes por browser si necesario</p>
        <p>14. Usa Should Not Be Equal para comparar diferencias</p>
        <p>15. Verifica que formularios funcionan en todos los browsers</p>
        <p>16. Testa JavaScript API support con Execute JavaScript</p>
        <p>17. Implementa fallbacks para browsers más antiguos</p>
        <p>18. Documenta diferencias encontradas con Log keywords</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Ejecutar tests en múltiples navegadores principales</li>
                <li>Detectar y manejar diferencias entre browsers</li>
                <li>Validar capabilities y support de features</li>
                <li>Implementar testing responsive cross-browser</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa variables para browser type y cambia fácilmente entre Chrome, Firefox, Edge. Verifica user agent para confirmar el browser correcto.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 111 - Headless browser testing</h3>
        <p>Aprenderás a ejecutar tests en modo headless para CI/CD, optimizar velocidad de ejecución y debugging headless.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-109"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_110 = LESSON_110;
}