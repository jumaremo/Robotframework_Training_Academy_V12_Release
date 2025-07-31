const LESSON_021 = {
    id: 21,
    title: "Setup y Teardown",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    content: `
        <h2>🔧 Setup y Teardown</h2>
        <p>Configuración y limpieza automática antes y después de cada test.</p>
        
        <h3>💻 Test Setup/Teardown:</h3>
        <pre><code class="robot">
*** Variables ***
\${BROWSER}           Chrome
\${TEST_URL}          http://example.com
\${USERNAME}          testuser
\${PASSWORD}          testpass123
\${TEST_DATA}         sample_data.txt

*** Test Cases ***
Test Login With Setup
    [Setup]    Open Browser and Navigate
    Input Text    id=username    \${USERNAME}
    Input Text    id=password    \${PASSWORD}
    Click Button    id=login
    Wait Until Page Contains    Dashboard
    Page Should Contain    Welcome
    [Teardown]    Close Browser

Test Form Validation
    [Setup]    Open Browser and Navigate
    Click Button    id=submit
    Wait Until Page Contains    Required field
    Page Should Contain    Email is required
    Element Should Be Visible    class=error-message
    [Teardown]    Close Browser

Test Data Entry
    [Setup]    Open Browser and Navigate
    Input Text    id=name    Robot Test
    Input Text    id=email    test@robot.com
    Select From List By Value    id=country    US
    Click Button    id=save
    Wait Until Page Contains    Success
    [Teardown]    Close Browser

Test Navigation Menu
    [Setup]    Open Browser and Navigate
    Click Link    About
    Wait Until Page Contains    About Us
    Page Should Contain    Company
    Go Back
    Page Should Contain    Home
    [Teardown]    Close Browser

Test Search Functionality
    [Setup]    Open Browser and Navigate
    Input Text    id=search    robot framework
    Click Button    id=search-btn
    Wait Until Page Contains    Results
    Page Should Contain    Found
    Element Should Be Visible    class=results
    [Teardown]    Close Browser

Test Suite Setup Example
    [Setup]    Prepare Test Environment
    Log    Executing main test
    Should Be Equal    \${BROWSER}    Chrome
    Should Contain    \${TEST_URL}    example
    Set Test Variable    \${RESULT}    SUCCESS
    [Teardown]    Clean Test Environment

*** Keywords ***
Open Browser and Navigate
    Open Browser    \${TEST_URL}    \${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    0.5 seconds

Prepare Test Environment
    Log    Setting up test environment
    Set Global Variable    \${START_TIME}    \${CURTIME}
    Create File    \${TEST_DATA}    Test content

Clean Test Environment
    Log    Cleaning up test environment
    Remove File    \${TEST_DATA}
    Log    Test completed at \${CURTIME}
        </code></pre>
        
        <h3>🎯 Práctica Setup/Teardown (4 min):</h3>
        <ol>
            <li><strong>Crear test con setup:</strong> Agrega [Setup] que abra navegador y vaya a página de login</li>
            <li><strong>Implementar teardown:</strong> Agrega [Teardown] que cierre navegador después del test</li>
            <li><strong>Test validación formulario:</strong> Setup abre página, test valida campos requeridos, teardown limpia</li>
            <li><strong>Keywords reutilizables:</strong> Crea keyword "Open Browser and Navigate" para el setup común</li>
            <li><strong>Variables en setup:</strong> Define \${BROWSER} y \${TEST_URL} para usar en setup</li>
            <li><strong>Teardown con validación:</strong> Agregar Log en teardown para confirmar limpieza exitosa</li>
            <li><strong>Setup con preparación:</strong> Crear archivo de datos en setup, eliminarlo en teardown</li>
            <li><strong>Test suite completo:</strong> Implementa 3 tests que compartan el mismo setup/teardown</li>
            <li><strong>Manejo de errores:</strong> Agregar teardown que funcione incluso si test falla</li>
            <li><strong>Validar configuración:</strong> Verificar que setup configuró variables correctamente</li>
            <li><strong>Teardown condicional:</strong> Implementar teardown que solo ejecute si setup fue exitoso</li>
            <li><strong>Logging completo:</strong> Agregar logs en setup/teardown para debugging</li>
            <li><strong>Suite setup ejemplo:</strong> Crear setup que se ejecute una vez para toda la suite</li>
            <li><strong>Optimizar performance:</strong> Medir tiempo entre setup y teardown con variables</li>
            <li><strong>Ejecutar y validar:</strong> Correr tests y verificar que setup/teardown funcionen correctamente</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar setup automático para preparación de tests</li>
                <li>Configurar teardown para limpieza garantizada después de tests</li>
                <li>Crear keywords reutilizables para setup/teardown común</li>
                <li>Dominar el ciclo de vida completo de tests con Robot Framework</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Setup y teardown SIEMPRE se ejecutan, incluso si el test falla. Úsalos para garantizar estado limpio entre tests y evitar interferencias.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 022 - Manejo de fallos y excepciones</h3>
        <p>En la próxima lección aprenderemos a controlar errores y excepciones en Robot Framework, complementando perfectamente el manejo robusto de setup/teardown que acabamos de dominar.</p>
    `,
    topics: ["setup", "teardown", "lifecycle"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-020"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_021 = LESSON_021;
}