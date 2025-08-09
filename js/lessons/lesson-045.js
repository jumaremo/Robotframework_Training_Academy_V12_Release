const LESSON_045 = {
    id: 45,
    title: "Keywords con argumentos",
    duration: "5 min",
    level: "beginner",
    section: "section-04",
    content: `
        <h2>📝 Arguments Keywords</h2>
        <p>Crea keywords flexibles que reciben parámetros para diferentes situaciones.</p>
        
        <h3>💻 Keywords Parametrizados:</h3>
        <pre><code class="robot">
*** Keywords ***
Abrir Pagina Web
    [Arguments]    \${url}    \${browser}
    Open Browser    \${url}    \${browser}
    Maximize Browser Window
    Should Contain    \${url}    http
    Log    Navegador \${browser} abierto en \${url}
    
Llenar Campo Por ID
    [Arguments]    \${campo_id}    \${valor}
    Input Text    id=\${campo_id}    \${valor}
    \${valor_actual}=    Get Value    id=\${campo_id}
    Should Be Equal    \${valor_actual}    \${valor}
    Log    Campo \${campo_id} llenado con: \${valor}
    
Hacer Click Por Selector
    [Arguments]    \${selector}    \${tipo}
    Run Keyword If    '\${tipo}' == 'id'    Click Element    id=\${selector}
    Run Keyword If    '\${tipo}' == 'class'    Click Element    class=\${selector}
    Log    Click realizado en \${tipo}=\${selector}
    Should Be True    \${True}
    
Verificar Texto En Elemento
    [Arguments]    \${elemento}    \${texto_esperado}
    \${texto_actual}=    Get Text    \${elemento}
    Should Contain    \${texto_actual}    \${texto_esperado}
    Log    Texto verificado: \${texto_actual}
    Should Not Be Empty    \${texto_actual}
    
Esperar Y Verificar
    [Arguments]    \${elemento}    \${tiempo}
    Wait Until Element Is Visible    \${elemento}    \${tiempo}
    Element Should Be Visible    \${elemento}
    Log    Elemento \${elemento} visible después de \${tiempo}
    Should Be True    \${True}

*** Test Cases ***
Test Keywords Con Argumentos
    Abrir Pagina Web    https://example.com    chrome
    Llenar Campo Por ID    username    test_user
    Llenar Campo Por ID    password    test_pass
    Hacer Click Por Selector    submit-btn    id
    Verificar Texto En Elemento    id=message    success
    Esperar Y Verificar    id=result    10s
    Close Browser
        </code></pre>
        
        <h3>🎯 Práctica Argumentos (4 min):</h3>
        <ol>
            <li>Define keyword "Abrir Pagina Web" con argumentos [url] [browser]</li>
            <li>Implementa Open Browser usando los argumentos</li>
            <li>Crea keyword "Llenar Campo Por ID" con [campo_id] [valor]</li>
            <li>Agrega validación Should Be Equal con argumentos</li>
            <li>Define keyword "Hacer Click Por Selector" con [selector] [tipo]</li>
            <li>Implementa Run Keyword If para diferentes tipos</li>
            <li>Crea keyword "Verificar Texto En Elemento" con argumentos</li>
            <li>Usa Get Text y Should Contain con parámetros</li>
            <li>Define keyword "Esperar Y Verificar" con tiempo variable</li>
            <li>Ejecuta test case pasando diferentes argumentos</li>
            <li>Prueba mismo keyword con valores diferentes</li>
            <li>Verifica flexibilidad cambiando parámetros</li>
            <li>Observa reutilización con datos distintos</li>
            <li>Confirma que argumentos se usan correctamente</li>
            <li>Analiza ventajas de keywords parametrizados</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear keywords que reciben argumentos</li>
                <li>Usar argumentos dentro de keywords</li>
                <li>Implementar keywords flexibles y reutilizables</li>
                <li>Validar el uso correcto de parámetros</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los argumentos hacen que tus keywords sean más flexibles - un mismo keyword puede usarse en múltiples escenarios.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 046 - Valores de retorno</h3>
        <p>Aprenderemos cómo los keywords pueden devolver valores para ser usados en otros keywords o test cases.</p>
    `,
    topics: ["arguments", "parameters", "input"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_045 = LESSON_045;
}