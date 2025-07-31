const LESSON_047 = {
    id: 47,
    title: "Keywords con argumentos opcionales",
    duration: "5 min",
    level: "beginner",
    section: "section-04",
    content: `
        <h2>🔧 Optional Arguments</h2>
        <p>Crea keywords flexibles con argumentos opcionales y valores por defecto.</p>
        
        <h3>💻 Arguments Opcionales:</h3>
        <pre><code class="robot">
*** Keywords ***
Abrir Navegador Flexible
    [Arguments]    \${url}=https://example.com    \${browser}=chrome    \${timeout}=10s
    Open Browser    \${url}    \${browser}
    Set Browser Implicit Wait    \${timeout}
    Should Contain    \${url}    http
    Log    Navegador \${browser} abierto en \${url} con timeout \${timeout}
    
Llenar Campo Opcional
    [Arguments]    \${campo}    \${valor}    \${validar}=True
    Input Text    \${campo}    \${valor}
    Run Keyword If    \${validar}    Element Should Contain    \${campo}    \${valor}
    Log    Campo \${campo} llenado con \${valor}, validación: \${validar}
    Should Not Be Empty    \${valor}
    
Esperar Elemento Configurable
    [Arguments]    \${locator}    \${timeout}=5s    \${error_msg}=Elemento no encontrado
    Wait Until Element Is Visible    \${locator}    \${timeout}    \${error_msg}
    Element Should Be Visible    \${locator}
    Log    Elemento \${locator} visible en \${timeout}
    Should Be True    \${True}
    
Hacer Click Avanzado
    [Arguments]    \${elemento}    \${double_click}=False    \${sleep_after}=0s
    Run Keyword If    \${double_click}    Double Click Element    \${elemento}
    Run Keyword Unless    \${double_click}    Click Element    \${elemento}
    Sleep    \${sleep_after}
    Log    Click en \${elemento}, doble: \${double_click}, sleep: \${sleep_after}
    
Generar Reporte Customizable
    [Arguments]    \${titulo}    \${incluir_fecha}=True    \${formato}=html
    \${fecha}=    Run Keyword If    \${incluir_fecha}    Get Time
    Log    Generando reporte: \${titulo}
    Should Not Be Empty    \${titulo}
    Should Be True    '\${formato}' in ['html', 'txt', 'json']
    [Return]    Reporte \${titulo} generado

*** Test Cases ***
Test Arguments Opcionales
    Abrir Navegador Flexible
    Abrir Navegador Flexible    https://google.com
    Abrir Navegador Flexible    https://github.com    firefox    15s
    Llenar Campo Opcional    id=input1    valor1
    Llenar Campo Opcional    id=input2    valor2    False
    Esperar Elemento Configurable    id=button
    Esperar Elemento Configurable    id=link    10s    Error personalizado
    Hacer Click Avanzado    id=submit
    Hacer Click Avanzado    id=menu    True    2s
    \${reporte}=    Generar Reporte Customizable    Test Report
    Should Contain    \${reporte}    Test Report
        </code></pre>
        
        <h3>🎯 Práctica Opcionales (4 min):</h3>
        <ol>
            <li>Define keyword "Abrir Navegador Flexible" con argumentos por defecto</li>
            <li>Usa sintaxis \${param}=valor_defecto para opcionales</li>
            <li>Crea keyword "Llenar Campo Opcional" con validación opcional</li>
            <li>Implementa Run Keyword If con argumento booleano</li>
            <li>Define keyword "Esperar Elemento Configurable" con timeout</li>
            <li>Agrega mensaje de error personalizable</li>
            <li>Crea keyword "Hacer Click Avanzado" con múltiples opciones</li>
            <li>Usa Run Keyword Unless para lógica alternativa</li>
            <li>Define keyword "Generar Reporte Customizable" complejo</li>
            <li>Ejecuta test cases con diferentes combinaciones argumentos</li>
            <li>Prueba keywords solo con argumentos requeridos</li>
            <li>Usa keywords con algunos argumentos opcionales</li>
            <li>Verifica que valores por defecto funcionen</li>
            <li>Confirma flexibilidad en diferentes escenarios</li>
            <li>Analiza ventajas de argumentos opcionales</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear keywords con argumentos opcionales</li>
                <li>Definir valores por defecto para parámetros</li>
                <li>Usar keywords con flexibilidad de argumentos</li>
                <li>Implementar lógica condicional con argumentos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los argumentos opcionales hacen tus keywords más versátiles - pueden usarse en casos simples y complejos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 048 - Documentación de keywords</h3>
        <p>Aprenderemos a documentar keywords para mejorar la mantenibilidad y comprensión del código.</p>
    `,
    topics: ["optional", "default", "flexibility"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-046"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_047 = LESSON_047;
}