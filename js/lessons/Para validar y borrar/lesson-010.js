/**
 * Robot Framework Academy - Lesson 010 (VERSIÓN SIMPLE)
 * Debugging y herramientas de desarrollo
 */

const LESSON_010 = {
    id: 10,
    title: "Debugging y herramientas de desarrollo",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#010 robot framework debugging development tools log screenshot troubleshooting",
    content: `
        <h2>🧠 Concepto: ¿Cómo debuggear cuando un test falla?</h2>
        <p>El debugging en Robot Framework es como ser detective: necesitas pistas para encontrar qué salió mal. Los logs, screenshots y mensajes te dan toda la información para solucionar cualquier problema.</p>
        <p>Un buen debugging te ahorra horas de frustración. En lugar de adivinar, tienes datos exactos de qué pasó y cuándo.</p>
        
        <h3>💻 Herramientas básicas de debugging:</h3>
        <pre><code class="robot">*** Test Cases ***
Test Con Debugging
    Open Browser    https://www.google.com    chrome
    
    # Logs para seguimiento
    Log    Navegador abierto correctamente
    Log To Console    Ejecutando búsqueda...
    
    # Screenshot para evidencia visual
    Capture Page Screenshot    google_home.png
    
    # Verificar elemento antes de interactuar
    Wait Until Element Is Visible    name=q    timeout=10s
    Input Text    name=q    Robot Framework
    
    # Debugging condicional
    \${title}=    Get Title
    Log    Título actual: \${title}
    Run Keyword If    '\${title}' != 'Google'    Capture Page Screenshot    error.png
    
    Close Browser</code></pre>
        
        <h3>🎯 Práctica (3 min):</h3>
        <p>1. Crea debug_test.robot con el código de arriba</p>
        <p>2. Ejecuta: <code>robot debug_test.robot</code></p>
        <p>3. Revisa el archivo log.html generado - ahí están todos los detalles</p>
        <p>4. Busca las imágenes .png en tu carpeta - screenshots automáticos</p>
        <p>5. Modifica la URL a una página que no existe y ve cómo falla</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Al final de esta lección sabrás:</h4>
            <ul>
                <li>Cómo usar Log y Log To Console para seguimiento</li>
                <li>Cómo capturar screenshots automáticamente</li>
                <li>Dónde encontrar información detallada de fallos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip importante:</h4>
            <p>El archivo log.html contiene TODA la información de ejecución. Es tu mejor amigo para debugging - timestamps, screenshots, valores de variables.</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>🔍 Keywords útiles para debugging:</h4>
            <ul>
                <li><strong>Log:</strong> Mensaje en el log HTML</li>
                <li><strong>Log To Console:</strong> Mensaje en la consola</li>
                <li><strong>Capture Page Screenshot:</strong> Imagen de la página</li>
                <li><strong>Get Location:</strong> URL actual</li>
                <li><strong>Get Title:</strong> Título de la página</li>
            </ul>
        </div>
        
        <div style="background: #ffe6e6; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>⚠️ Estrategias de debugging:</h4>
            <ul>
                <li><strong>Screenshot antes del fallo:</strong> Para ver estado visual</li>
                <li><strong>Log variables importantes:</strong> Para verificar valores</li>
                <li><strong>Wait Until visible:</strong> Para elementos dinámicos</li>
                <li><strong>Try/Except:</strong> Para manejar errores esperados</li>
            </ul>
        </div>
        
        <h3>🚀 Siguiente: Lección 011 - Control de versiones con Git</h3>
        <p>Con las herramientas de debugging listas, aprenderás a usar Git para versionar tu proyecto y colaborar con otros QAs.</p>
    `,
    topics: ["debugging", "development", "tools"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-009"],
    estimatedTime: 5,
    difficulty: "easy"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_010 = LESSON_010;
}