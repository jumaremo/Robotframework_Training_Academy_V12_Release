/**
 * Robot Framework Academy - Lesson 008 OPTIMIZED
 * WebDrivers y gestión de dependencias
 */

const LESSON_008 = {
    id: 8,
    title: "WebDrivers y gestión de dependencias",
    duration: "8 min",
    level: "beginner",
    section: "section-01",
    content: `
        <h2>🔧 WebDrivers</h2>
        
        <h3>🤖 Tests WebDrivers:</h3>
        <pre><code class="robot">*** Variables ***
\${CHROME_DRIVER}      chromedriver
\${FIREFOX_DRIVER}     geckodriver
\${EDGE_DRIVER}        edgedriver
\${GOOGLE_URL}         https://www.google.com
\${GITHUB_URL}         https://github.com
\${REQUIREMENTS_FILE}  requirements.txt

*** Test Cases ***
Test Chrome Driver
    Log                   Testing Chrome driver
    Should Be Equal       \${CHROME_DRIVER}    chromedriver
    Should Contain        \${CHROME_DRIVER}    driver
    Should Not Be Empty   \${CHROME_DRIVER}
    Open Browser          \${GOOGLE_URL}    chrome
    Title Should Be       Google
    Page Should Contain   Google
    Should Contain        \${GOOGLE_URL}    google
    Should Not Be Empty   \${GOOGLE_URL}
    Close Browser
    Log                   Chrome test completed

Test Firefox Driver
    Log                   Testing Firefox driver
    Should Be Equal       \${FIREFOX_DRIVER}    geckodriver
    Should Contain        \${FIREFOX_DRIVER}    driver
    Should Not Be Empty   \${FIREFOX_DRIVER}
    Should Contain        \${FIREFOX_DRIVER}    gecko
    Should Be Equal       geckodriver    geckodriver
    Should Not Be Empty   geckodriver
    Should Contain        firefox    firefox
    Should Be Equal       firefox    firefox
    Should Not Be Empty   firefox
    Log                   Firefox test completed

Test Edge Driver
    Log                   Testing Edge driver
    Should Be Equal       \${EDGE_DRIVER}    edgedriver
    Should Contain        \${EDGE_DRIVER}    driver
    Should Not Be Empty   \${EDGE_DRIVER}
    Should Contain        \${EDGE_DRIVER}    edge
    Should Be Equal       edgedriver    edgedriver
    Should Not Be Empty   edgedriver
    Should Contain        edge    edge
    Should Be Equal       edge    edge
    Should Not Be Empty   edge
    Log                   Edge test completed

Test Requirements File
    Log                   Testing requirements file
    Should Contain        \${REQUIREMENTS_FILE}    requirements
    Should Contain        \${REQUIREMENTS_FILE}    .txt
    Should Not Be Empty   \${REQUIREMENTS_FILE}
    Should Be Equal       \${REQUIREMENTS_FILE}    requirements.txt
    Should Contain        robotframework    robot
    Should Contain        seleniumlibrary    selenium
    Should Contain        webdriver-manager    webdriver
    Should Not Be Empty   robotframework
    Should Not Be Empty   seleniumlibrary
    Log                   Requirements test completed

Test URL Variables
    Log                   Testing URL variables
    Should Contain        \${GOOGLE_URL}    google
    Should Contain        \${GOOGLE_URL}    https
    Should Not Be Empty   \${GOOGLE_URL}
    Should Be Equal       \${GOOGLE_URL}    https://www.google.com
    Should Contain        \${GITHUB_URL}    github
    Should Contain        \${GITHUB_URL}    https
    Should Not Be Empty   \${GITHUB_URL}
    Should Be Equal       \${GITHUB_URL}    https://github.com
    Should Contain        google.com    google
    Log                   URL test completed

Test Browser Operations
    Log                   Testing browser operations
    Open Browser          \${GOOGLE_URL}    chrome
    Title Should Be       Google
    Page Should Contain   Google
    Should Contain        \${GOOGLE_URL}    google
    Location Should Be    \${GOOGLE_URL}
    Page Should Contain Element    name=q
    Element Should Be Visible    name=q
    Should Not Be Empty   \${GOOGLE_URL}
    Should Be Equal       \${GOOGLE_URL}    https://www.google.com
    Close Browser
    Log                   Browser test completed</code></pre>
        
        <h3>🎯 Práctica WebDrivers (6 min):</h3>
        <p>1. Crea requirements.txt: robotframework>=6.0</p>
        <p>2. Agrega robotframework-seleniumlibrary>=6.0</p>
        <p>3. Agrega webdriver-manager>=3.8</p>
        <p>4. Instala: pip install -r requirements.txt</p>
        <p>5. Crea "webdriver_test.robot"</p>
        <p>6. Copia código tests WebDrivers</p>
        <p>7. Ejecuta: robot webdriver_test.robot</p>
        <p>8. Verifica Chrome abre automáticamente</p>
        <p>9. Borra chromedriver.exe manual</p>
        <p>10. Ejecuta test - sigue funcionando</p>
        <p>11. Prueba Firefox con geckodriver</p>
        <p>12. Test headless Chrome sin ventana</p>
        <p>13. Valida tests PASS en report.html</p>
        <p>14. Experimenta diferentes URLs</p>
        <p>15. Prueba detección automática versiones</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Configurar gestión automática de WebDrivers</li>
                <li>Usar webdriver-manager para dependencias automáticas</li>
                <li>Troubleshooting de problemas de compatibilidad</li>
                <li>Validar operaciones básicas de navegador</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>webdriver-manager descarga driver correcto automáticamente. Elimina problemas de versiones manualmente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 009 - Variables de entorno y configuración</h3>
        <p>Con WebDrivers configurados, aprenderás gestión de variables de entorno para diferentes ambientes de testing.</p>
    `,
    topics: ["webdriver", "dependencies", "troubleshooting"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 8,
    difficulty: "easy",
    prerequisites: ["lesson-007"],
    type: "foundation"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_008 = LESSON_008;
}