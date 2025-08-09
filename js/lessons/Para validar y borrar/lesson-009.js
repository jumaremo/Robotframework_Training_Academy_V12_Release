/**
 * Robot Framework Academy - Lesson 009 (VERSIÓN SIMPLE)
 * Variables de entorno y configuración
 */

const LESSON_009 = {
    id: 9,
    title: "Variables de entorno y configuración",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#009 robot framework variables entorno environment config configuracion ambientes",
    content: `
        <h2>🧠 Concepto: ¿Por qué necesitas variables de entorno?</h2>
        <p>Las variables de entorno te permiten cambiar configuraciones sin tocar el código. Por ejemplo: usar una URL diferente para desarrollo vs producción, o credenciales distintas para cada ambiente.</p>
        <p>Sin variables de entorno, tendrías que modificar el código cada vez que cambies de ambiente. Con ellas, el mismo test funciona en DEV, QA y PROD automáticamente.</p>
        
        <h3>💻 Configuración básica:</h3>
        <pre><code class="robot">*** Settings ***
Library    OperatingSystem

*** Variables ***
\${DEFAULT_URL}    https://demo-app.com
\${DEFAULT_USER}   test_user

*** Test Cases ***
Test Con Variables de Entorno
    \${url}=    Get Environment Variable    APP_URL    \${DEFAULT_URL}
    \${user}=   Get Environment Variable    TEST_USER  \${DEFAULT_USER}
    
    Log    Usando URL: \${url}
    Log    Usando usuario: \${user}
    
    Open Browser    \${url}    chrome
    Close Browser</code></pre>
        
        <h3>🎯 Práctica (3 min):</h3>
        <p>1. Crea archivo config_test.robot con el código de arriba</p>
        <p>2. Ejecuta normal: <code>robot config_test.robot</code> (usa valores por defecto)</p>
        <p>3. Define variable: <code>set APP_URL=https://google.com</code> (Windows)</p>
        <p>4. O en Linux/Mac: <code>export APP_URL=https://google.com</code></p>
        <p>5. Ejecuta de nuevo y observa que usa la nueva URL</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Al final de esta lección sabrás:</h4>
            <ul>
                <li>Qué son las variables de entorno y por qué son útiles</li>
                <li>Cómo leer variables de entorno en Robot Framework</li>
                <li>Cómo configurar valores por defecto como fallback</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip importante:</h4>
            <p>Siempre define valores por defecto con Get Environment Variable. Si la variable no existe, usará el valor de respaldo en lugar de fallar.</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>🌍 Variables comunes por ambiente:</h4>
            <ul>
                <li><strong>APP_URL:</strong> URL base de la aplicación</li>
                <li><strong>TEST_USER/TEST_PASS:</strong> Credenciales de prueba</li>
                <li><strong>BROWSER:</strong> Navegador a usar (chrome, firefox)</li>
                <li><strong>TIMEOUT:</strong> Tiempo máximo de espera</li>
            </ul>
        </div>
        
        <div style="background: #ffe6e6; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>⚠️ Buenas prácticas:</h4>
            <ul>
                <li><strong>Nunca hardcodees:</strong> URLs, passwords, paths en el código</li>
                <li><strong>Usa nombres descriptivos:</strong> APP_URL mejor que URL</li>
                <li><strong>Documenta variables:</strong> Qué hace cada una</li>
                <li><strong>Valores seguros:</strong> Por defecto apuntando a DEV, no PROD</li>
            </ul>
        </div>
        
        <h3>🚀 Siguiente: Lección 010 - Debugging y herramientas de desarrollo</h3>
        <p>Con la configuración lista, aprenderás técnicas de debugging para encontrar y solucionar problemas en tus tests rápidamente.</p>
    `,
    topics: ["variables", "environment", "config"],
    hasCode: true,
    hasExercise: false,
    prerequisites: ["lesson-008"],
    estimatedTime: 5,
    difficulty: "easy"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_009 = LESSON_009;
}