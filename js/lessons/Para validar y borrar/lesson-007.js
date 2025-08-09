/**
 * Robot Framework Academy - Lesson 007 (VERSIÓN SIMPLE)
 * Configuración del navegador web
 */

const LESSON_007 = {
    id: 7,
    title: "Configuración del navegador web",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#007 robot framework selenium browser webdriver configuracion chrome firefox",
    content: `
        <h2>🧠 Concepto: ¿Cómo controla Robot Framework un navegador?</h2>
        <p>Robot Framework usa SeleniumLibrary para "manejar" navegadores como Chrome o Firefox. Es como tener un robot que puede hacer clic, escribir y navegar por páginas web exactamente como lo harías tú, pero automáticamente.</p>
        <p>Para que esto funcione, necesitas instalar el "driver" específico de cada navegador - es el traductor entre Robot Framework y el navegador.</p>
        
        <h3>💻 Configuración básica de Chrome:</h3>
        <pre><code class="robot">*** Settings ***
Library    SeleniumLibrary

*** Test Cases ***
Abrir Navegador Chrome
    Open Browser    https://www.google.com    chrome
    Maximize Browser Window
    Title Should Be    Google
    Close Browser</code></pre>
        
        <h3>🎯 Práctica (3 min):</h3>
        <p>1. Instala SeleniumLibrary: <code>pip install robotframework-seleniumlibrary</code></p>
        <p>2. Descarga ChromeDriver desde chromium.org/getting-started/download-chromium</p>
        <p>3. Copia chromedriver.exe a la carpeta de tu proyecto</p>
        <p>4. Crea archivo "browser_test.robot" con el código de arriba</p>
        <p>5. Ejecuta: <code>robot browser_test.robot</code> y ve Chrome abrirse solo</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Al final de esta lección sabrás:</h4>
            <ul>
                <li>Cómo instalar y configurar SeleniumLibrary</li>
                <li>Qué es un WebDriver y por qué lo necesitas</li>
                <li>Cómo abrir y controlar Chrome desde Robot Framework</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip importante:</h4>
            <p>Si aparece "chromedriver not found", asegúrate de que chromedriver.exe esté en tu PATH o en la misma carpeta donde ejecutas el test.</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>🌐 Otros navegadores soportados:</h4>
            <ul>
                <li><strong>Firefox:</strong> Descargar geckodriver, usar "firefox" en Open Browser</li>
                <li><strong>Edge:</strong> Descargar edgedriver, usar "edge" en Open Browser</li>
                <li><strong>Safari:</strong> Solo Mac, usar "safari" en Open Browser</li>
                <li><strong>Headless:</strong> Chrome sin ventana, usar "headlesschrome"</li>
            </ul>
        </div>
        
        <div style="background: #ffe6e6; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>⚠️ Errores comunes:</h4>
            <ul>
                <li><strong>"WebDriver not found":</strong> Driver no está en PATH</li>
                <li><strong>"Browser failed to start":</strong> Versión incompatible de driver</li>
                <li><strong>"Timeout":</strong> Internet lento o página no carga</li>
                <li><strong>"Permission denied":</strong> Driver sin permisos de ejecución</li>
            </ul>
        </div>
        
        <h3>🚀 Siguiente: Lección 008 - WebDrivers y gestión de dependencias</h3>
        <p>Ahora aprenderás a manejar múltiples versiones de drivers, actualizaciones automáticas y troubleshooting avanzado de configuraciones.</p>
    `,
    topics: ["selenium", "browser", "webdriver"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-006"],
    estimatedTime: 5,
    difficulty: "easy"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_007 = LESSON_007;
}