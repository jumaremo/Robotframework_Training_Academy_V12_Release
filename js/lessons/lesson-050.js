const LESSON_050 = {
    id: 50,
    title: "Organización en archivos Resource",
    duration: "5 min",
    level: "beginner",
    section: "section-04",
    content: `
        <h2>📁 Resource Files</h2>
        <p>Organiza keywords en archivos Resource para mejor estructura y reutilización.</p>
        
        <h3>💻 Archivos Resource:</h3>
        <pre><code class="robot">
# Archivo: common_keywords.resource
*** Settings ***
Library    SeleniumLibrary

*** Variables ***
\${BASE_URL}    https://example.com
\${TIMEOUT}     10s
\${BROWSER}     chrome

*** Keywords ***
Inicializar Navegador
    Open Browser    \${BASE_URL}    \${BROWSER}
    Maximize Browser Window
    Set Browser Implicit Wait    \${TIMEOUT}
    Should Contain    \${BASE_URL}    http
    Log    Navegador inicializado correctamente
    
Finalizar Navegador
    Close Browser
    Log    Navegador cerrado correctamente
    Should Be True    \${True}
    
# Archivo: login_keywords.resource
*** Keywords ***
Realizar Login Completo
    [Arguments]    \${usuario}    \${password}
    Input Text    id=username    \${usuario}
    Input Text    id=password    \${password}
    Click Button    id=login-btn
    Should Not Be Empty    \${usuario}
    Should Not Be Empty    \${password}
    Log    Login realizado para usuario: \${usuario}
    
Verificar Login Exitoso
    Element Should Be Visible    id=welcome-msg
    \${mensaje}=    Get Text    id=welcome-msg
    Should Contain    \${mensaje}    Welcome
    Log    Login verificado exitosamente
    Should Not Be Empty    \${mensaje}
    
# Archivo: test_suite.robot
*** Settings ***
Resource    common_keywords.resource
Resource    login_keywords.resource

*** Test Cases ***
Test Usando Resources
    Inicializar Navegador
    Realizar Login Completo    test_user    test_pass
    Verificar Login Exitoso
    Finalizar Navegador
    Log    Test completado usando archivos resource
        </code></pre>
        
        <h3>🎯 Práctica Resources (4 min):</h3>
        <ol>
            <li>Crea archivo "common_keywords.resource" con Settings</li>
            <li>Define variables globales BASE_URL, TIMEOUT, BROWSER</li>
            <li>Agrega keyword "Inicializar Navegador" usando variables</li>
            <li>Implementa keyword "Finalizar Navegador" simple</li>
            <li>Crea archivo "login_keywords.resource" especializado</li>
            <li>Define keyword "Realizar Login Completo" con argumentos</li>
            <li>Implementa keyword "Verificar Login Exitoso" con validaciones</li>
            <li>Crea archivo test principal con Settings Resource</li>
            <li>Importa ambos archivos resource en test suite</li>
            <li>Ejecuta test case usando keywords de diferentes resources</li>
            <li>Verifica que keywords se encuentren correctamente</li>
            <li>Prueba modificar keywords en resource sin cambiar tests</li>
            <li>Confirma que variables resource estén disponibles</li>
            <li>Observa organización mejorada del proyecto</li>
            <li>Analiza ventajas de separación por funcionalidad</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear archivos Resource para organizar keywords</li>
                <li>Separar keywords por funcionalidad</li>
                <li>Importar resources en test suites</li>
                <li>Reutilizar keywords entre múltiples tests</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los archivos Resource mantienen tu proyecto organizado - agrupa keywords relacionados por funcionalidad o módulo.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 051 - Importación y namespace</h3>
        <p>Exploraremos cómo manejar namespaces y resolver conflictos entre keywords de diferentes sources.</p>
    `,
    topics: ["resource", "organization", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-049"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_050 = LESSON_050;
}