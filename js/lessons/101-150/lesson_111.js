/**
 * Robot Framework Academy - Lesson 111
 * Headless browser testing
 */

const LESSON_111 = {
    id: 111,
    title: "Interacciones Avanzadas 111",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>👻 Headless browser testing</h2>
        <p>Ejecutar tests en modo headless para CI/CD, optimizar velocidad de ejecución y debugging headless.</p>
        
        <h3>💻 Tests Headless:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com
\${HEADLESS_CHROME}    headlesschrome
\${HEADLESS_FIREFOX}   headlessfirefox
\${CHROME_OPTIONS}     add_argument("--headless");add_argument("--no-sandbox");add_argument("--disable-dev-shm-usage")
\${FIREFOX_OPTIONS}    add_argument("--headless")
\${SCREENSHOT_PATH}    \${CURDIR}/screenshots/
\${TEST_DATA}          usuario_headless

*** Test Cases ***
Test Headless Chrome
    Open Browser              \${URL}        \${HEADLESS_CHROME}
    Title Should Be           Mi Aplicación Web
    Page Should Contain       bienvenido
    Input Text                name=username    \${TEST_DATA}
    Click Button              id=login-btn
    Wait Until Page Contains  dashboard
    Element Should Be Visible id=user-menu
    Capture Page Screenshot   \${SCREENSHOT_PATH}headless_chrome.png
    \${is_headless}=     Execute JavaScript    return navigator.webdriver
    Should Be True            \${is_headless}
    Close Browser

Test Headless Firefox
    Open Browser              \${URL}        \${HEADLESS_FIREFOX}
    Title Should Be           Mi Aplicación Web
    Page Should Contain       bienvenido
    Input Text                name=username    \${TEST_DATA}
    Click Button              id=login-btn
    Wait Until Page Contains  dashboard
    Element Should Be Visible id=user-menu
    Capture Page Screenshot   \${SCREENSHOT_PATH}headless_firefox.png
    \${browser_info}=    Execute JavaScript    return navigator.userAgent
    Should Contain            \${browser_info}    Firefox
    Close Browser

Test Headless Performance
    \${start_time}=      Get Time    epoch
    Open Browser              \${URL}        \${HEADLESS_CHROME}
    Wait Until Page Contains  página cargada
    \${end_time}=        Get Time    epoch
    \${load_time}=       Evaluate    \${end_time} - \${start_time}
    Should Be True            \${load_time} < 3
    Log                       Headless load time: \${load_time}s
    Execute JavaScript        console.log('Headless test running')
    Page Should Contain       contenido principal
    Capture Element Screenshot    css=.main-content    \${SCREENSHOT_PATH}element.png
    Close Browser

Test Headless Downloads
    Create Directory          \${CURDIR}/downloads
    Open Browser              \${URL}        \${HEADLESS_CHROME}
    Click Link                Descargar Archivo
    Sleep                     3s
    File Should Exist         \${CURDIR}/downloads/archivo.pdf
    \${file_size}=       Get File Size    \${CURDIR}/downloads/archivo.pdf
    Should Be True            \${file_size} > 0
    Remove File               \${CURDIR}/downloads/archivo.pdf
    Page Should Contain       descarga completada
    Close Browser

Test Headless JavaScript
    Open Browser              \${URL}        \${HEADLESS_CHROME}
    Execute JavaScript        window.headlessTest = true
    \${headless_flag}=    Execute JavaScript    return window.headlessTest
    Should Be True            \${headless_flag}
    Execute JavaScript        document.getElementById('test-div').textContent = 'Headless OK'
    Element Text Should Be    id=test-div    Headless OK
    \${console_logs}=    Execute JavaScript    
    ...    console.log('Test message'); return 'logged';
    Should Be Equal           \${console_logs}    logged
    Page Should Contain       JavaScript funcionando
    Close Browser

Test Headless CI Mode
    Open Browser              \${URL}        \${HEADLESS_CHROME}    options=\${CHROME_OPTIONS}
    \${window_size}=     Execute JavaScript    return [window.innerWidth, window.innerHeight]
    Log                       Window size: \${window_size}
    Set Window Size           1920    1080
    \${new_size}=        Execute JavaScript    return [window.innerWidth, window.innerHeight]
    Should Be Equal           \${new_size}[0]    \${1920}
    Input Text                css=input[type='search']    headless search
    Click Button              Buscar
    Wait Until Page Contains  resultados
    Capture Page Screenshot   \${SCREENSHOT_PATH}ci_test.png
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Headless (5 min):</h3>
        <p>1. Usa headlesschrome en lugar de chrome para Open Browser</p>
        <p>2. Verifica que tests funcionan sin ventana visible</p>
        <p>3. Usa Capture Page Screenshot para debugging visual</p>
        <p>4. Mide performance mejorada con Get Time</p>
        <p>5. Verifica que JavaScript execution funciona en headless</p>
        <p>6. Usa Execute JavaScript para detectar modo headless</p>
        <p>7. Implementa downloads en modo headless</p>
        <p>8. Valida que archivos se descargan correctamente</p>
        <p>9. Usa Create Directory para preparar carpetas</p>
        <p>10. Configura window size con Set Window Size</p>
        <p>11. Usa Capture Element Screenshot para elementos específicos</p>
        <p>12. Verifica que console.log funciona en headless</p>
        <p>13. Implementa opciones específicas para CI/CD</p>
        <p>14. Usa Log para documentar métricas de performance</p>
        <p>15. Valida que formularios funcionan sin interfaz visual</p>
        <p>16. Combina headless con timeouts optimizados</p>
        <p>17. Usa File Should Exist para validar outputs</p>
        <p>18. Implementa cleanup de archivos con Remove File</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Ejecutar tests en modo headless para CI/CD</li>
                <li>Optimizar velocidad de ejecución sin GUI</li>
                <li>Implementar debugging visual con screenshots</li>
                <li>Configurar opciones específicas para headless</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Headless mode es 2-3x más rápido que GUI mode. Usa screenshots para debugging y verifica que downloads funcionan correctamente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 112 - Browser automation avanzado</h3>
        <p>Aprenderás técnicas avanzadas de automatización, manipulación de cookies, session storage y browser developer tools.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-110"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_111 = LESSON_111;
}