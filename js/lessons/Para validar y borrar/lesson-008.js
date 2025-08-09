/**
 * Robot Framework Academy - Lesson 008 (VERSIÓN SIMPLE)
 * WebDrivers y gestión de dependencias
 */

const LESSON_008 = {
    id: 8,
    title: "WebDrivers y gestión de dependencias",
    duration: "8 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#008 robot framework webdriver dependencies troubleshooting chromedriver geckodriver selenium",
    content: `
        <h2>🧠 Concepto: ¿Por qué fallan los WebDrivers?</h2>
        <p>Los WebDrivers son el enlace entre Robot Framework y el navegador. Chrome se actualiza automáticamente, pero el ChromeDriver no. Cuando las versiones no coinciden, tus tests fallan.</p>
        <p>Gestionar dependencias correctamente evita el 90% de problemas en automatización web. Es la diferencia entre tests estables y horas perdidas debuggeando.</p>
        
        <h3>💻 Gestión simple de dependencias:</h3>
        <pre><code class="text"># requirements.txt
robotframework==6.1.1
robotframework-seleniumlibrary==6.1.0
webdriver-manager==4.0.1

# Instalación automática
pip install -r requirements.txt</code></pre>

        <pre><code class="robot">*** Settings ***
Library    SeleniumLibrary

*** Test Cases ***
Test Con WebDriver Automático
    # Webdriver-manager descarga versión correcta automáticamente
    Open Browser    https://www.google.com    chrome
    Maximize Browser Window
    Title Should Be    Google
    Close Browser</code></pre>
        
        <h3>🎯 Práctica (6 min):</h3>
        <p>1. Crea archivo requirements.txt con las dependencias de arriba</p>
        <p>2. Instala: <code>pip install -r requirements.txt</code></p>
        <p>3. Instala webdriver-manager: <code>pip install webdriver-manager</code></p>
        <p>4. Ejecuta tu test anterior - ahora funciona sin descargar drivers manualmente</p>
        <p>5. Borra tu chromedriver.exe - el test sigue funcionando</p>
        <p>6. Cambia "chrome" por "firefox" y prueba</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Al final de esta lección sabrás:</h4>
            <ul>
                <li>Por qué fallan los WebDrivers y cómo prevenirlo</li>
                <li>Cómo crear un requirements.txt profesional</li>
                <li>Qué es webdriver-manager y por qué lo necesitas</li>
                <li>Troubleshooting básico de problemas de drivers</li>
                <li>Cómo hacer tests más estables y confiables</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip importante:</h4>
            <p>webdriver-manager descarga automáticamente el driver correcto para tu versión de Chrome. Se acabaron los errores de "version mismatch".</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>🔧 Navegadores soportados:</h4>
            <ul>
                <li><strong>Chrome:</strong> ChromeDriverManager (más común)</li>
                <li><strong>Firefox:</strong> GeckoDriverManager</li>
                <li><strong>Edge:</strong> EdgeChromiumDriverManager</li>
                <li><strong>Headless:</strong> Chrome sin ventana visible</li>
            </ul>
        </div>
        
        <div style="background: #ffe6e6; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>⚠️ Errores más comunes:</h4>
            <ul>
                <li><strong>"ChromeDriver version X only supports Chrome Y":</strong> Versiones incompatibles</li>
                <li><strong>"WebDriver not found":</strong> Driver no instalado o PATH incorrecto</li>
                <li><strong>"Permission denied":</strong> En Mac/Linux usar chmod +x en el driver</li>
                <li><strong>"Browser failed to start":</strong> Navegador corrupto o no instalado</li>
            </ul>
        </div>
        
        <h3>🚀 Siguiente: Lección 009 - Variables de entorno y configuración</h3>
        <p>Con los drivers estables, configuraremos variables para manejar diferentes ambientes (DEV/QA/PROD) sin cambiar código.</p>
    `,
    topics: ["webdriver", "dependencies", "troubleshooting"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-007"],
    estimatedTime: 8,
    difficulty: "easy",
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_008 = LESSON_008;
}