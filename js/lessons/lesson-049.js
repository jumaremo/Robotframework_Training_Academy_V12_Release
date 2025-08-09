// ===== LECCIÓN 049 - Keywords embebidos (embedded) =====
const LESSON_049 = {
    id: 49,
    title: "Keywords embebidos (embedded)",
    duration: "5 min",
    level: "beginner",
    section: "section-04",
    content: `
        <h2>🗣️ Embedded Keywords</h2>
        <p>Crea keywords con sintaxis natural que mejoran la legibilidad del código.</p>
        
        <h3>💻 Keywords Embebidos:</h3>
        <pre><code class="robot">
*** Keywords ***
Usuario "\${usuario}" debe iniciar sesion con "\${password}"
    Input Text    id=username    \${usuario}
    Input Text    id=password    \${password}
    Click Button    id=login-btn
    Should Be Equal    \${usuario}    test_user
    Log    Usuario \${usuario} intentando login
    
El elemento "\${elemento}" debe contener texto "\${texto}"
    \${contenido}=    Get Text    \${elemento}
    Should Contain    \${contenido}    \${texto}
    Should Not Be Empty    \${contenido}
    Log    Elemento \${elemento} contiene: \${texto}
    
Esperar \${segundos} segundos y verificar "\${locator}"
    \${tiempo}=    Convert To Number    \${segundos}
    Sleep    \${tiempo}s
    Element Should Be Visible    \${locator}
    Should Be True    \${tiempo} > 0
    Log    Esperados \${segundos}s, elemento \${locator} visible
    
Navegar a pagina "\${url}" en navegador "\${browser}"
    Open Browser    \${url}    \${browser}
    Should Contain    \${url}    http
    Maximize Browser Window
    Set Browser Implicit Wait    10s
    Log    Navegando a \${url} con \${browser}
    
Formulario con campo "\${campo}" y valor "\${valor}" debe ser valido
    Input Text    \${campo}    \${valor}
    \${valor_actual}=    Get Value    \${campo}
    Should Be Equal    \${valor_actual}    \${valor}
    Should Not Be Empty    \${valor}
    Element Should Be Enabled    \${campo}
    Log    Campo \${campo} llenado con \${valor} válido

*** Test Cases ***
Test Keywords Embebidos
    Navegar a pagina "https://example.com" en navegador "chrome"
    Usuario "test_user" debe iniciar sesion con "test_pass"
    Esperar 2 segundos y verificar "id=welcome"
    El elemento "id=welcome" debe contener texto "Welcome"
    Formulario con campo "id=email" y valor "test@email.com" debe ser valido
    Close Browser
    Log    Test con keywords embebidos completado
        </code></pre>
        
        <h3>🎯 Práctica Embebidos (4 min):</h3>
        <ol>
            <li>Crea keyword embebido con sintaxis natural para login</li>
            <li>Usa variables \${var} dentro del nombre del keyword</li>
            <li>Define keyword "El elemento debe contener texto"</li>
            <li>Implementa Get Text y Should Contain con variables</li>
            <li>Crea keyword "Esperar X segundos y verificar"</li>
            <li>Usa Convert To Number para manejar tiempo</li>
            <li>Define keyword "Navegar a pagina en navegador"</li>
            <li>Combina Open Browser con variables embebidas</li>
            <li>Crea keyword "Formulario con campo y valor"</li>
            <li>Ejecuta test usando keywords con sintaxis natural</li>
            <li>Verifica que variables se extraen correctamente</li>
            <li>Prueba diferentes valores en mismos keywords</li>
            <li>Observa legibilidad mejorada en test cases</li>
            <li>Confirma que funcionan como keywords normales</li>
            <li>Analiza ventajas de sintaxis natural</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear keywords con sintaxis de lenguaje natural</li>
                <li>Usar variables embebidas en nombres de keywords</li>
                <li>Mejorar legibilidad de test cases</li>
                <li>Combinar funcionalidad con expresividad</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los keywords embebidos hacen que tus tests lean como oraciones en lenguaje natural, mejorando la comprensión.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 050 - Organización en archivos Resource</h3>
        <p>Aprenderemos a organizar keywords en archivos separados para mejor estructura del proyecto.</p>
    `,
    topics: ["embedded", "natural", "language"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-048"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_049 = LESSON_049;
}