const LESSON_044 = {
    id: 44,
    title: "Creación de keywords simples",
    duration: "5 min",
    level: "beginner",
    section: "section-04",
    content: `
        <h2>🛠️ Keywords Simples</h2>
        <p>Aprende a crear keywords básicos con estructura clara y funcional.</p>
        
        <h3>💻 Creación Práctica:</h3>
        <pre><code class="robot">
*** Keywords ***
Abrir Navegador Simple
    Open Browser    https://example.com    chrome
    Maximize Browser Window
    Set Variable    \${browser_status}    abierto
    Should Be Equal    \${browser_status}    abierto
    
Verificar Titulo Pagina
    \${titulo}=    Get Title
    Should Not Be Empty    \${titulo}
    Log    Título obtenido: \${titulo}
    Should Contain    \${titulo}    Example
    
Hacer Click En Elemento
    Click Element    id=submit-button
    Sleep    1s
    Log    Click realizado correctamente
    Should Be True    \${True}
    
Llenar Campo Texto
    Input Text    id=username    usuario_test
    \${valor}=    Get Value    id=username
    Should Be Equal    \${valor}    usuario_test
    Log    Campo llenado: \${valor}
    
Cerrar Navegador Simple
    Close Browser
    Log    Navegador cerrado correctamente
    Set Variable    \${browser_status}    cerrado
    Should Be Equal    \${browser_status}    cerrado

*** Test Cases ***
Test Creacion Keywords
    Abrir Navegador Simple
    Verificar Titulo Pagina
    Hacer Click En Elemento
    Llenar Campo Texto
    Cerrar Navegador Simple
    Log    Keywords simples ejecutados exitosamente
        </code></pre>
        
        <h3>🎯 Práctica Creación (4 min):</h3>
        <ol>
            <li>Define keyword "Abrir Navegador Simple" con Open Browser</li>
            <li>Agrega Maximize Browser Window al keyword</li>
            <li>Crea keyword "Verificar Titulo Pagina" con Get Title</li>
            <li>Implementa validación Should Not Be Empty</li>
            <li>Define keyword "Hacer Click En Elemento" con Click Element</li>
            <li>Agrega Sleep y Log al keyword de click</li>
            <li>Crea keyword "Llenar Campo Texto" con Input Text</li>
            <li>Implementa verificación con Get Value</li>
            <li>Define keyword "Cerrar Navegador Simple" con Close Browser</li>
            <li>Ejecuta test case usando todos los keywords</li>
            <li>Verifica que cada keyword funcione independientemente</li>
            <li>Observa la estructura limpia del test case</li>
            <li>Modifica contenido de keywords sin cambiar test</li>
            <li>Prueba reutilizar keywords en múltiples tests</li>
            <li>Analiza las ventajas de modularización</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear keywords simples con comandos Selenium</li>
                <li>Estructurar keywords con lógica clara</li>
                <li>Combinar múltiples comandos en un keyword</li>
                <li>Validar funcionamiento de keywords creados</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Mantén los keywords simples enfocados en una tarea específica para mejor reutilización y mantenimiento.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 045 - Keywords con argumentos</h3>
        <p>Aprenderemos a hacer keywords más flexibles pasándoles parámetros para diferentes situaciones.</p>
    `,
    topics: ["creation", "simple", "basic"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_044 = LESSON_044;
}