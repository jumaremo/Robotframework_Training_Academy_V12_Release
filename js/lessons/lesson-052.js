const LESSON_052 = {
    id: 52,
    title: "Keywords de alto nivel vs bajo nivel",
    duration: "5 min",
    level: "beginner",
    section: "section-04",
    content: `
        <h2>🏗️ Abstraction Levels</h2>
        <p>Diseña arquitecturas de keywords con diferentes niveles de abstracción.</p>
        
        <h3>💻 Niveles Keywords:</h3>
        <pre><code class="robot">
*** Keywords ***
# KEYWORDS BAJO NIVEL - Acciones específicas
Abrir Campo Usuario
    Click Element    id=username-field
    Element Should Be Visible    id=username-field
    Should Be True    \${True}
    Log    Campo usuario abierto
    
Escribir En Campo Usuario
    [Arguments]    \${texto}
    Input Text    id=username-field    \${texto}
    Should Not Be Empty    \${texto}
    Log    Texto ingresado: \${texto}
    
Hacer Click Boton Login
    Click Button    id=login-button
    Element Should Be Enabled    id=login-button
    Log    Click en botón login realizado
    Should Be True    \${True}
    
Verificar Mensaje Bienvenida
    Element Should Contain    id=welcome    Welcome
    \${mensaje}=    Get Text    id=welcome
    Should Not Be Empty    \${mensaje}
    Log    Mensaje verificado: \${mensaje}
    
# KEYWORDS NIVEL MEDIO - Combinan acciones
Ingresar Credenciales Usuario
    [Arguments]    \${usuario}    \${password}
    Abrir Campo Usuario
    Escribir En Campo Usuario    \${usuario}
    Click Element    id=password-field
    Input Text    id=password-field    \${password}
    Should Not Be Empty    \${password}
    Log    Credenciales ingresadas para \${usuario}
    
Ejecutar Proceso Login
    Hacer Click Boton Login
    Sleep    2s
    Verificar Mensaje Bienvenida
    Log    Proceso login ejecutado correctamente
    Should Be True    \${True}

# KEYWORDS ALTO NIVEL - Flujos completos
Usuario Inicia Sesion Exitosamente
    [Arguments]    \${usuario}    \${password}
    Ingresar Credenciales Usuario    \${usuario}    \${password}
    Ejecutar Proceso Login
    Log    Usuario \${usuario} logueado exitosamente
    Should Contain    \${usuario}    test
    
Sistema Debe Mostrar Dashboard Completo
    Element Should Be Visible    id=dashboard
    Element Should Be Visible    id=menu-navigation  
    Element Should Be Visible    id=user-profile
    \${elementos}=    Get WebElements    class=dashboard-widget
    Should Not Be Empty    \${elementos}
    Log    Dashboard completo mostrado correctamente

*** Test Cases ***
Test Niveles Abstraccion
    Open Browser    https://example.com    chrome
    Usuario Inicia Sesion Exitosamente    test_user    test_pass
    Sistema Debe Mostrar Dashboard Completo
    Close Browser
    Log    Test usando diferentes niveles de abstracción
        </code></pre>
        
        <h3>🎯 Práctica Niveles (4 min):</h3>
        <ol>
            <li>Define keywords bajo nivel con acciones específicas</li>
            <li>Crea "Abrir Campo Usuario" con Click Element</li>
            <li>Implementa "Escribir En Campo Usuario" con Input Text</li>
            <li>Define "Hacer Click Boton Login" simple y específico</li>
            <li>Crea keywords nivel medio combinando acciones</li>
            <li>Implementa "Ingresar Credenciales Usuario" usando bajo nivel</li>
            <li>Define "Ejecutar Proceso Login" combinando pasos</li>
            <li>Crea keywords alto nivel para flujos completos</li>
            <li>Implementa "Usuario Inicia Sesion Exitosamente"</li>
            <li>Define "Sistema Debe Mostrar Dashboard Completo"</li>
            <li>Ejecuta test usando solo keywords alto nivel</li>
            <li>Observa cómo alto nivel usa medio y bajo nivel</li>
            <li>Verifica mantenibilidad de cada nivel</li>
            <li>Confirma reutilización entre niveles</li>
            <li>Analiza ventajas de arquitectura por capas</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Diseñar keywords con diferentes niveles de abstracción</li>
                <li>Crear arquitectura por capas de keywords</li>
                <li>Combinar keywords de bajo nivel en alto nivel</li>
                <li>Mejorar mantenibilidad y reutilización</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los keywords de alto nivel hacen tests más legibles, mientras que los de bajo nivel facilitan el mantenimiento.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 053 - Refactoring de keywords</h3>
        <p>Aprenderemos técnicas para mejorar y optimizar keywords existentes sin romper funcionalidad.</p>
    `,
    topics: ["abstraction", "levels", "design"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-051"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_052 = LESSON_052;
}