/**
 * Robot Framework Academy - Lesson 001 (VERSIÓN SIMPLE)
 * Introducción a Robot Framework
 */

const LESSON_001 = {
    id: 1,
    title: "Introducción a Robot Framework",
    duration: "8 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#001 robot framework introducción testing automatización qa fundamentos",
    content: `
        <h2>🧠 Concepto: ¿Qué es Robot Framework?</h2>
        <p>Robot Framework es una herramienta que permite escribir pruebas automatizadas usando palabras en español (o inglés) que cualquier persona puede entender, no solo programadores.</p>
        <p>Es como dar instrucciones paso a paso a una computadora para que pruebe tu aplicación web automáticamente.</p>
        
        <h3>💻 Ejemplo básico:</h3>
        <pre><code class="robot">*** Test Cases ***
Verificar Página Principal
    Open Browser    http://mi-app.com    chrome
    Title Should Be    Mi Aplicación Web
    Page Should Contain    Bienvenido
    Click Link    Iniciar Sesión
    Close Browser</code></pre>
        
        <h3>🎯 Práctica (5 min):</h3>
        <p>1. Lee cada línea del código de arriba y escribe qué crees que hace</p>
        <p>2. ¿Qué pasaría si cambias "chrome" por "firefox"?</p>
        <p>3. Piensa en tu aplicación web favorita: ¿qué pasos automátizarías?</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Al final de esta lección sabrás:</h4>
            <ul>
                <li>Qué es Robot Framework y para qué sirve</li>
                <li>Cómo se ve un test automatizado simple</li>
                <li>Por qué RF es diferente a otras herramientas</li>
            </ul>
        </div>
        
        <h3>🚀 Siguiente: Lección 002 - Instalación de Python y Robot Framework</h3>
        <p>En la próxima lección instalaremos Python y Robot Framework para que puedas ejecutar tu primer test.</p>
    `,
    topics: ["introducción", "fundamentos", "conceptos"],
    hasCode: true,
    hasExercise: true,
    prerequisites: [],
    estimatedTime: 8,
    difficulty: "easy"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_001 = LESSON_001;
}