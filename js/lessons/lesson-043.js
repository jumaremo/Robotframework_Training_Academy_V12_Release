const LESSON_043 = {
    id: 43,
    title: "Conceptos de keywords personalizados",
    duration: "5 min",
    level: "beginner",
    section: "section-04",
    content: `
        <h2>🔑 Keywords Personalizados</h2>
        <p>Crea tus propias funciones reutilizables en Robot Framework.</p>
        
        <h3>💻 Keywords Básicos:</h3>
        <pre><code class="robot">
*** Keywords ***
Mi Primer Keyword
    Log    Ejecutando mi primer keyword personalizado
    Should Be True    \${True}
    Set Variable    \${mensaje}    Keyword ejecutado
    
Saludar Usuario
    Log    Hola desde keyword personalizado
    Should Contain    \${USER}    test
    Set Variable    \${saludo}    Hola Usuario
    
Verificar Condicion
    Should Be Equal    \${status}    OK
    Log    Condición verificada correctamente
    Should Be True    \${resultado}
    
Ejecutar Proceso Simple
    Log    Iniciando proceso personalizado
    Should Not Be Empty    \${proceso}
    Set Variable    \${estado}    ejecutando
    Should Be Equal    \${estado}    ejecutando
    
Validar Resultado
    Should Be Equal As Numbers    \${numero}    42
    Log    Número validado: \${numero}
    Should Be True    \${numero} > 0
    Set Variable    \${validado}    True

*** Test Cases ***
Test Keywords Personalizados
    Mi Primer Keyword
    Saludar Usuario
    Verificar Condicion
    Ejecutar Proceso Simple
    Validar Resultado
    Log    Todos los keywords ejecutados correctamente
    Should Be True    \${True}
        </code></pre>
        
        <h3>🎯 Práctica Keywords (4 min):</h3>
        <ol>
            <li>Crea keyword "Mi Primer Keyword" con Log</li>
            <li>Agrega Should Be True dentro del keyword</li>
            <li>Crea keyword "Saludar Usuario" con mensaje</li>
            <li>Define keyword "Verificar Condicion" con validaciones</li>
            <li>Implementa keyword "Ejecutar Proceso Simple"</li>
            <li>Crea keyword "Validar Resultado" con números</li>
            <li>Ejecuta test case llamando todos los keywords</li>
            <li>Verifica que cada keyword se ejecute independientemente</li>
            <li>Observa cómo se organizan en el reporte</li>
            <li>Prueba modificar los mensajes dentro de keywords</li>
            <li>Verifica reutilización ejecutando múltiples veces</li>
            <li>Analiza la estructura del código resultante</li>
            <li>Confirma que cada keyword aparece en el log</li>
            <li>Experimenta con diferentes combinaciones</li>
            <li>Documenta las ventajas observadas</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Comprender qué son los keywords personalizados</li>
                <li>Crear keywords básicos con comandos simples</li>
                <li>Ejecutar keywords desde test cases</li>
                <li>Observar la reutilización de código</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los keywords personalizados son como funciones: encapsulan lógica reutilizable y mejoran la legibilidad del código.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 044 - Creación de keywords simples</h3>
        <p>Profundizaremos en la creación práctica de keywords simples con diferentes tipos de comandos y validaciones.</p>
    `,
    topics: ["keywords", "custom", "concepts"],
    hasCode: true,
    hasExercise: false,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-042"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_043 = LESSON_043;
}