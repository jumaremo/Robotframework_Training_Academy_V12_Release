/**
 * Robot Framework Academy - Lesson 067 (VERSIÓN SIMPLE)
 * Introducción a SeleniumLibrary
 */

const LESSON_067 = {
    id: 67,
    title: "Introducción a SeleniumLibrary",
    duration: "10 min",
    level: "intermediate",
    section: "section-06",
    searchTerms: "#067 robot framework selenium library web automation browser testing",
    content: `
        <h2>🧠 Concepto: ¿Qué es SeleniumLibrary?</h2>
        <p>SeleniumLibrary es la extensión más poderosa de Robot Framework para automatizar navegadores web. Te permite controlar Chrome, Firefox, Safari como si fueras un usuario real: hacer clic, escribir, navegar.</p>
        <p>Es como tener un robot que puede usar cualquier página web siguiendo tus instrucciones exactas, 24/7 sin cansarse.</p>
        
        <h3>💻 Primer ejemplo web:</h3>
        <pre><code class="robot">*** Settings ***
Library    SeleniumLibrary

*** Test Cases ***
Buscar en Google
    Open Browser    https://google.com    chrome
    Input Text    name=q    Robot Framework
    Press Keys    name=q    RETURN
    Wait Until Page Contains    resultados
    Close Browser</code></pre>
        
        <h3>🎯 Práctica (7 min):</h3>
        <p>1. Instala SeleniumLibrary: <code>pip install robotframework-seleniumlibrary</code></p>
        <p>2. Descarga ChromeDriver desde chromedriver.chromium.org</p>
        <p>3. Crea un archivo test_web.robot con el código de arriba</p>
        <p>4. Ejecuta: <code>robot test_web.robot</code></p>
        <p>5. ¡Observa cómo Chrome se abre y busca automáticamente!</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Qué es SeleniumLibrary y por qué es tan poderosa</li>
                <li>Cómo instalar y configurar SeleniumLibrary</li>
                <li>Cómo ejecutar tu primer test de automatización web</li>
                <li>Los keywords básicos: Open Browser, Input Text, Click</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Si aparece error "chromedriver not found", asegúrate de que ChromeDriver esté en tu PATH o en la misma carpeta del test.</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>🌐 Keywords más usados:</h4>
            <ul>
                <li><strong>Open Browser</strong> → Abre navegador</li>
                <li><strong>Input Text</strong> → Escribe en campos</li>
                <li><strong>Click Element</strong> → Hace clic en elementos</li>
                <li><strong>Wait Until</strong> → Espera condiciones</li>
                <li><strong>Close Browser</strong> → Cierra navegador</li>
            </ul>
        </div>
        
        <h3>🚀 Siguiente: Lección 068 - Localizadores web básicos</h3>
        <p>Ahora aprenderás cómo encontrar elementos específicos en páginas web usando selectores CSS y XPath.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-066"],
    estimatedTime: 10,
    difficulty: "intermediate",
    type: "foundation"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_067 = LESSON_067;
}