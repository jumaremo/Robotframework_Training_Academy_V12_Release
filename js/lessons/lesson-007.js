/**
 * Robot Framework Academy - Lesson 007 OPTIMIZED
 * Configuración del navegador web
 */

const LESSON_007 = {
    id: 7,
    title: "Configuración del navegador web",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    content: `
        <h2>🌐 Navegador Web</h2>
        <p>SeleniumLibrary controla navegadores automáticamente.</p>
        
        <h3>🤖 Tests navegador:</h3>
        <pre><code class="robot">*** Settings ***
Library    SeleniumLibrary

*** Variables ***
\${CHROME_BROWSER}     chrome
\${FIREFOX_BROWSER}    firefox
\${EDGE_BROWSER}       edge
\${GOOGLE_URL}         https://www.google.com
\${GITHUB_URL}         https://github.com
\${WIKIPEDIA_URL}      https://wikipedia.org
\${EXPECTED_TITLE}     Google
\${WINDOW_WIDTH}       1920
\${WINDOW_HEIGHT}      1080

*** Test Cases ***
Test Chrome Browser
    [Documentation]    Valida configuración Chrome
    Log    🌐 Testing Chrome browser
    Open Browser       \${GOOGLE_URL}    \${CHROME_BROWSER}
    Maximize Browser Window
    Title Should Be    \${EXPECTED_TITLE}
    Page Should Contain    Google Search
    Should Contain     \${GOOGLE_URL}    google
    Close Browser
    Log    ✅ Chrome funcionando correctamente

Test Firefox Browser
    [Documentation]    Valida configuración Firefox
    Log    🦊 Testing Firefox browser
    Open Browser       \${GOOGLE_URL}    \${FIREFOX_BROWSER}
    Set Window Size    \${WINDOW_WIDTH}    \${WINDOW_HEIGHT}
    Title Should Be    \${EXPECTED_TITLE}
    Page Should Contain    Google
    Location Should Be    \${GOOGLE_URL}
    Close Browser
    Log    ✅ Firefox funcionando correctamente

Test Edge Browser
    [Documentation]    Valida configuración Edge
    Log    🔷 Testing Edge browser
    Open Browser       \${GOOGLE_URL}    \${EDGE_BROWSER}
    Maximize Browser Window
    Title Should Be    \${EXPECTED_TITLE}
    Element Should Be Visible    name=q
    Page Should Contain Element    name=q
    Close Browser
    Log    ✅ Edge funcionando correctamente

Test Multiple URLs
    [Documentation]    Prueba navegación múltiples URLs
    Log    🔗 Testing multiple URLs
    Open Browser       \${GOOGLE_URL}    \${CHROME_BROWSER}
    Title Should Be    \${EXPECTED_TITLE}
    Go To             \${GITHUB_URL}
    Title Should Contain    GitHub
    Go To             \${WIKIPEDIA_URL}
    Title Should Contain    Wikipedia
    Go Back
    Title Should Contain    GitHub
    Go Back
    Title Should Be    \${EXPECTED_TITLE}
    Close Browser
    Log    ✅ Navegación múltiple URLs OK

Test Browser Properties
    [Documentation]    Verifica propiedades del navegador
    Log    🔍 Testing browser properties
    Open Browser       \${GOOGLE_URL}    \${CHROME_BROWSER}
    \${current_url}=    Get Location
    Should Be Equal    \${current_url}    \${GOOGLE_URL}
    \${title}=         Get Title
    Should Be Equal    \${title}    \${EXPECTED_TITLE}
    \${source}=        Get Source
    Should Contain     \${source}    Google
    Should Not Be Empty    \${source}
    Close Browser
    Log    ✅ Propiedades browser verificadas

Test Window Management
    [Documentation]    Prueba gestión de ventanas
    Log    🖼️ Testing window management
    Open Browser       \${GOOGLE_URL}    \${CHROME_BROWSER}
    Maximize Browser Window
    \${size}=          Get Window Size
    Should Not Be Empty    \${size}
    Set Window Size    1024    768
    \${new_size}=      Get Window Size
    Should Contain     \${new_size}    1024
    Should Contain     \${new_size}    768
    Maximize Browser Window
    Close Browser
    Log    ✅ Gestión ventanas OK</code></pre>
        
        <h3>🎯 Práctica navegador (4 min):</h3>
        <p>1. Instala SeleniumLibrary: pip install robotframework-seleniumlibrary</p>
        <p>2. Descarga ChromeDriver desde chromedriver.chromium.org</p>
        <p>3. Coloca chromedriver.exe en carpeta proyecto</p>
        <p>4. Crea archivo "browser_test.robot"</p>
        <p>5. Copia y pega código tests navegador</p>
        <p>6. Ejecuta: robot browser_test.robot</p>
        <p>7. Observa Chrome abrirse automáticamente</p>
        <p>8. Verifica todos tests PASS en report.html</p>
        <p>9. Prueba Firefox descargando geckodriver</p>
        <p>10. Modifica variables para diferentes URLs</p>
        <p>11. Experimenta con Set Window Size diferentes</p>
        <p>12. Agrega nuevos tests con otras páginas web</p>
        <p>13. Valida que Title Should Be funciona correctamente</p>
        <p>14. Prueba navegación Back y Forward</p>
        <p>15. Ejecuta todos los navegadores disponibles</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Configurar SeleniumLibrary para automation web</li>
                <li>Controlar múltiples navegadores (Chrome, Firefox, Edge)</li>
                <li>Gestionar ventanas y propiedades del navegador</li>
                <li>Implementar navegación básica entre páginas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Si "chromedriver not found": agregar chromedriver a PATH del sistema o carpeta proyecto.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 008 - WebDrivers y gestión de dependencias</h3>
        <p>Con navegadores funcionando, aprenderás gestión automática de WebDrivers y troubleshooting de dependencias.</p>
    `,
    topics: ["selenium", "browser", "webdriver"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-006"],
    type: "standard"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_007 = LESSON_007;
}