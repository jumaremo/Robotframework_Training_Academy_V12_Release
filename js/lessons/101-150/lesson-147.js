/**
 * Robot Framework Academy - Lesson 147
 * Data-Driven Testing concepts
 */

const LESSON_147 = {
    id: 147,
    title: "Data-Driven Testing concepts",
    duration: "10 min",
    level: "intermediate",
    section: "section-11",
    content: `
        <h2>📊 Tests con Datos</h2>
        <p>Ejecutar el mismo test con múltiples datasets desde Excel, CSV para validar diferentes escenarios automáticamente.</p>
        
        <h3>💻 Tests data-driven:</h3>
        <pre><code class="robot">*** Settings ***
Library    Collections
Library    OperatingSystem
Library    SeleniumLibrary

*** Variables ***
\${CSV_FILE}       \${CURDIR}/test_data.csv
\${EXCEL_FILE}     \${CURDIR}/users.xlsx
\${BASE_URL}       http://demo-app.com
@{TEST_USERS}      user1,pass1    user2,pass2    user3,pass3
&{LOGIN_DATA}      valid_user=admin    valid_pass=admin123    invalid_user=wrong    invalid_pass=wrong123

*** Test Cases ***
Login Con Datos CSV
    [Documentation]    Test login usando datos desde archivo CSV
    \${csv_content}=    Get File    \${CSV_FILE}
    \${lines}=    Split To Lines    \${csv_content}
    FOR    \${line}    IN    @{lines}[1:]  # Skip header
        \${data}=    Split String    \${line}    ,
        \${username}=    Set Variable    \${data}[0]
        \${password}=    Set Variable    \${data}[1]
        \${expected}=    Set Variable    \${data}[2]
        
        Open Browser    \${BASE_URL}    chrome
        Input Text      id=username    \${username}
        Input Text      id=password    \${password}
        Click Button    Login
        
        Run Keyword If    '\${expected}' == 'success'    Page Should Contain    Dashboard
        Run Keyword If    '\${expected}' == 'fail'       Page Should Contain    Invalid credentials
        Close Browser
    END

Test Parametrizado Con Lista
    [Template]    Validate User Registration
    John Doe       john@test.com      pass123    success
    Jane Smith     jane@test.com      pass456    success
    Invalid User   not-email          weak       fail
    Duplicate      john@test.com      pass789    fail

Validate User Registration
    [Arguments]    \${name}    \${email}    \${password}    \${expected}
    Open Browser            \${BASE_URL}/register    chrome
    Input Text             id=name        \${name}
    Input Text             id=email       \${email}
    Input Text             id=password    \${password}
    Click Button           Register
    
    Run Keyword If    '\${expected}' == 'success'    Page Should Contain    Welcome \${name}
    Run Keyword If    '\${expected}' == 'fail'       Page Should Contain    Registration failed
    Close Browser

Test Con Diccionario Datos
    [Documentation]    Usar diccionario para datos estructurados
    FOR    \${key}    \${value}    IN    &{LOGIN_DATA}
        Log    Testing with \${key}: \${value}
        Open Browser    \${BASE_URL}    chrome
        
        Run Keyword If    'valid' in '\${key}'    Test Valid Login    \${value}
        Run Keyword If    'invalid' in '\${key}'  Test Invalid Login  \${value}
        Close Browser
    END

Test Valid Login
    [Arguments]    \${credential}
    Input Text      id=username    \${credential}
    Input Text      id=password    admin123
    Click Button    Login
    Page Should Contain    Dashboard
    Element Should Be Visible    id=logout

Test Invalid Login  
    [Arguments]    \${credential}
    Input Text      id=username    \${credential}
    Input Text      id=password    wrongpass
    Click Button    Login
    Page Should Contain    Invalid
    Element Should Be Visible    id=username

Test Multiple Products
    [Documentation]    Validar múltiples productos desde lista
    @{products}=    Create List    Laptop    Mouse    Keyboard    Monitor    Headphones
    @{prices}=      Create List    999.99    29.99    79.99     299.99    149.99
    
    FOR    \${product}    \${price}    IN ZIP    \${products}    \${prices}
        Open Browser    \${BASE_URL}/shop    chrome
        Input Text     id=search    \${product}
        Click Button   Search
        Page Should Contain    \${product}
        Page Should Contain    \$\${price}
        Element Should Be Visible    xpath=//button[text()='Add to Cart']
        Close Browser
    END</code></pre>
        
        <h3>🎯 Práctica Data-Driven (8 min):</h3>
        <p>1. Crea archivo test_data.csv con: username,password,expected</p>
        <p>2. Agrega 5 filas con datos válidos e inválidos</p>
        <p>3. Ejecuta test que lee CSV línea por línea</p>
        <p>4. Implementa test con [Template] para parametrización</p>
        <p>5. Crea diccionario con 4 usuarios diferentes</p>
        <p>6. Usa FOR loop para iterar datos estructurados</p>
        <p>7. Valida que resultados esperados coinciden</p>
        <p>8. Agrega logging para cada iteración de datos</p>
        <p>9. Separa datos válidos vs inválidos con keywords</p>
        <p>10. Prueba con lista de 5+ productos diferentes</p>
        <p>11. Implementa validación con ZIP de dos listas</p>
        <p>12. Confirma que test falla con datos incorrectos</p>
        <p>13. Agrega manejo de errores para datos faltantes</p>
        <p>14. Crea segundo CSV con datos de productos</p>
        <p>15. Ejecuta suite completa y verifica todos pasan</p>
        <p>16. Modifica datos y confirma que tests detectan cambios</p>
        <p>17. Documenta formato requerido para cada dataset</p>
        <p>18. Optimiza performance leyendo archivos una vez</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Entender conceptos fundamentales de data-driven testing</li>
                <li>Leer y procesar datos desde archivos CSV</li>
                <li>Implementar tests parametrizados con [Template]</li>
                <li>Usar estructuras de datos para múltiples escenarios</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Data-driven = mismo test, múltiples datos. Usa [Template] para casos simples y FOR loops para casos complejos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 148 - Data-Driven 148</h3>
        <p>Aprenderás a trabajar con archivos Excel complejos y bibliotecas especializadas para manipular grandes datasets.</p>
    `,
    topics: ["data-driven", "excel", "csv"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-146"],
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_147 = LESSON_147;
}