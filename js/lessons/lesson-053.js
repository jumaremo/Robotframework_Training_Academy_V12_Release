const LESSON_053 = {
    id: 53,
    title: "Refactoring de keywords",
    duration: "5 min",
    level: "beginner",
    section: "section-04",
    content: `
        <h2>🔧 Refactoring Keywords</h2>
        <p>Mejora y optimiza keywords existentes manteniendo funcionalidad.</p>
        
        <h3>💻 Keywords Refactoring:</h3>
        <pre><code class="robot">
*** Keywords ***
# ANTES - Keyword con problemas
Login Usuario Problematico
    [Arguments]    \${usuario}    \${password}
    Open Browser    https://example.com    chrome
    Input Text    id=username    \${usuario}
    Input Text    id=password    \${password}
    Click Button    login
    Sleep    5s
    Log    Login realizado
    Should Be True    \${True}
    
# DESPUÉS - Keyword refactorizado
Login Usuario Mejorado
    [Arguments]    \${usuario}    \${password}
    \${usuario_limpio}=    Strip String    \${usuario}
    \${password_limpio}=    Strip String    \${password}
    Should Not Be Empty    \${usuario_limpio}
    Should Not Be Empty    \${password_limpio}
    Input Text    id=username-field    \${usuario_limpio}
    Input Text    id=password-field    \${password_limpio}
    Click Button    id=login-button
    Wait Until Element Is Visible    id=dashboard    10s
    Log    Login exitoso para usuario: \${usuario_limpio}
    
# ANTES - Validacion repetitiva
Validar Campo Email Malo
    \${email}=    Get Value    id=email
    Should Not Be Empty    \${email}
    Should Contain    \${email}    @
    Should Contain    \${email}    .
    Log    Email validado
    Should Be True    \${True}
    
# DESPUÉS - Validacion optimizada
Validar Campo Email Optimizado
    \${email}=    Get Value    id=email-field
    Should Match Regexp    \${email}    ^[\\w\\._%+-]+@[\\w\\.-]+\\.[A-Za-z]{2,}$
    Should Not Be Empty    \${email}
    Log    Email \${email} validado con expresión regular
    Should Be True    len('\${email}') > 5
    
# ANTES - Keyword monolitico
Proceso Completo Monolitico
    Open Browser    https://example.com    chrome
    Input Text    id=user    admin
    Input Text    id=pass    secret
    Click Button    login
    Click Element    id=menu
    Click Element    id=reports
    Click Element    id=generate
    Sleep    3s
    Close Browser
    Log    Proceso completado
    Should Be True    \${True}
    
# DESPUÉS - Keyword modularizado
Proceso Completo Modular
    Inicializar Sesion Admin
    Navegar A Reportes
    Generar Reporte Sistema
    Finalizar Sesion
    Log    Proceso modular completado exitosamente
    
Inicializar Sesion Admin
    Input Text    id=username-field    admin
    Input Text    id=password-field    secret
    Click Button    id=login-button
    Wait Until Element Is Visible    id=main-menu    10s
    Should Be True    \${True}
    
Navegar A Reportes
    Click Element    id=main-menu
    Click Element    id=reports-option
    Element Should Be Visible    id=reports-section
    Log    Navegación a reportes exitosa
    
Generar Reporte Sistema
    Click Element    id=generate-report
    Wait Until Element Is Visible    id=report-ready    30s
    Element Should Contain    id=report-status    completed
    Log    Reporte generado correctamente

*** Test Cases ***
Test Refactoring Comparacion
    Open Browser    https://example.com    chrome
    Login Usuario Mejorado    test_user    test_pass
    Validar Campo Email Optimizado
    Proceso Completo Modular
    Close Browser
        </code></pre>
        
        <h3>🎯 Práctica Refactoring (4 min):</h3>
        <ol>
            <li>Identifica problemas en "Login Usuario Problematico"</li>
            <li>Refactoriza agregando validaciones de entrada</li>
            <li>Mejora locators usando IDs específicos</li>
            <li>Reemplaza Sleep con Wait Until Element</li>
            <li>Optimiza "Validar Campo Email Malo" con regex</li>
            <li>Usa Should Match Regexp para validación robusta</li>
            <li>Refactoriza keyword monolítico dividiéndolo</li>
            <li>Crea keywords específicos para cada paso</li>
            <li>Implementa "Inicializar Sesion Admin" separado</li>
            <li>Define "Navegar A Reportes" independiente</li>
            <li>Crea "Generar Reporte Sistema" con esperas</li>
            <li>Ejecuta test comparando versiones refactorizadas</li>
            <li>Verifica que funcionalidad se mantiene</li>
            <li>Observa mejoras en mantenibilidad</li>
            <li>Confirma ventajas de modularización</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Identificar problemas en keywords existentes</li>
                <li>Aplicar técnicas de refactoring efectivas</li>
                <li>Modularizar keywords monolíticos</li>
                <li>Mejorar robustez y mantenibilidad</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>El refactoring regular mantiene tu código limpio y fácil de mantener - refactoriza cuando notes repetición o complejidad.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 054 - Biblioteca de keywords del proyecto</h3>
        <p>Crearemos una biblioteca completa de keywords organizados para uso en todo el proyecto.</p>
    `,
    topics: ["refactoring", "maintenance", "improvement"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-052"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_053 = LESSON_053;
}