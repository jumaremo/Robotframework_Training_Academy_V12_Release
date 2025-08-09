// ===== LECCIÓN 046 - Valores de retorno =====
const LESSON_046 = {
    id: 46,
    title: "Valores de retorno",
    duration: "5 min",
    level: "beginner",
    section: "section-04",
    content: `
        <h2>🔄 Return Values</h2>
        <p>Keywords que devuelven valores para usar en otros keywords o tests.</p>
        
        <h3>💻 Keywords Retorno:</h3>
        <pre><code class="robot">
*** Keywords ***
Obtener Titulo Pagina
    \${titulo}=    Get Title
    Should Not Be Empty    \${titulo}
    Log    Título obtenido: \${titulo}
    [Return]    \${titulo}
    
Calcular Suma
    [Arguments]    \${num1}    \${num2}
    \${resultado}=    Evaluate    \${num1} + \${num2}
    Should Be True    \${resultado} > 0
    Log    Suma calculada: \${resultado}
    [Return]    \${resultado}
    
Obtener Texto Elemento
    [Arguments]    \${locator}
    \${texto}=    Get Text    \${locator}
    Should Not Be Empty    \${texto}
    Log    Texto extraído: \${texto}
    Should Contain    \${texto}    text
    [Return]    \${texto}
    
Generar Usuario Aleatorio
    \${timestamp}=    Get Time    epoch
    \${usuario}=    Set Variable    user_\${timestamp}
    Should Contain    \${usuario}    user_
    Log    Usuario generado: \${usuario}
    [Return]    \${usuario}
    
Validar Y Retornar Estado
    [Arguments]    \${elemento}
    \${visible}=    Run Keyword And Return Status    Element Should Be Visible    \${elemento}
    Log    Estado elemento: \${visible}
    Should Be True    \${visible} in [True, False]
    [Return]    \${visible}

*** Test Cases ***
Test Valores Retorno
    \${titulo}=    Obtener Titulo Pagina
    Should Be Equal    \${titulo}    Example Domain
    \${suma}=    Calcular Suma    10    20
    Should Be Equal As Numbers    \${suma}    30
    \${texto}=    Obtener Texto Elemento    id=content
    Should Not Be Empty    \${texto}
    \${usuario}=    Generar Usuario Aleatorio
    Should Match Regexp    \${usuario}    user_\\d+
    \${estado}=    Validar Y Retornar Estado    id=submit
    Log    Todos los valores retornados correctamente
        </code></pre>
        
        <h3>🎯 Práctica Retorno (4 min):</h3>
        <ol>
            <li>Define keyword "Obtener Titulo Pagina" con [Return]</li>
            <li>Usa Get Title y retorna el valor obtenido</li>
            <li>Crea keyword "Calcular Suma" con argumentos y retorno</li>
            <li>Implementa Evaluate y retorna resultado</li>
            <li>Define keyword "Obtener Texto Elemento" con locator</li>
            <li>Usa Get Text y retorna texto extraído</li>
            <li>Crea keyword "Generar Usuario Aleatorio" sin argumentos</li>
            <li>Usa Get Time y retorna usuario generado</li>
            <li>Define keyword "Validar Y Retornar Estado" con elemento</li>
            <li>Ejecuta test asignando valores retornados a variables</li>
            <li>Verifica que cada variable contenga valor correcto</li>
            <li>Usa valores retornados en validaciones adicionales</li>
            <li>Prueba combinando múltiples keywords con retorno</li>
            <li>Confirma que [Return] funciona correctamente</li>
            <li>Analiza flujo de datos entre keywords</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear keywords que retornan valores</li>
                <li>Usar [Return] para devolver datos</li>
                <li>Asignar valores retornados a variables</li>
                <li>Combinar keywords con valores de retorno</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los valores de retorno permiten que tus keywords sean más útiles al proporcionar datos para otros keywords.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 047 - Keywords con argumentos opcionales</h3>
        <p>Aprenderemos a crear keywords más flexibles con argumentos opcionales y valores por defecto.</p>
    `,
    topics: ["return", "output", "values"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-045"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_046 = LESSON_046;
}