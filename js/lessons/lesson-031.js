const LESSON_031 = {
    id: 31,
    title: "Variables escalares básicas",
    duration: "5 min",
    level: "beginner",
    section: "section-03",
    content: `
        <h2>📝 Variables Escalares</h2>
        <p>Definición, uso y manipulación de variables escalares en Robot Framework.</p>
        
        <h3>💻 Variables Escalares Básicas:</h3>
        <pre><code class="robot">
*** Variables ***
\${USERNAME}          admin@test.com
\${PASSWORD}          SecurePass123
\${BASE_URL}          https://demo-app.com
\${TIMEOUT}           10
\${BROWSER_TYPE}      Chrome
\${SEARCH_TERM}       Robot Framework

*** Test Cases ***
Test Basic Scalar Variables Usage
    [Documentation]    Demonstrates basic scalar variable definition and usage
    [Tags]    variables    scalar    basic
    Log    Username: \${USERNAME}
    Log    Password: \${PASSWORD}
    Log    Base URL: \${BASE_URL}
    Should Not Be Empty    \${USERNAME}
    Should Not Be Empty    \${PASSWORD}
    Should Contain    \${BASE_URL}    https

Test Variable Assignment During Runtime
    [Documentation]    Shows how to assign values to variables during test execution
    [Tags]    variables    runtime    assignment
    \${current_time}    Get Current Date    result_format=%Y-%m-%d %H:%M:%S
    \${random_number}    Evaluate    random.randint(1000, 9999)
    \${user_id}    Set Variable    user_\${random_number}
    Log    Current time: \${current_time}
    Log    Random number: \${random_number}
    Log    Generated user ID: \${user_id}
    Should Match Regexp    \${user_id}    user_\\d{4}

Test Variable Concatenation And Manipulation
    [Documentation]    Demonstrates string concatenation and manipulation with variables
    [Tags]    variables    concatenation    strings
    \${first_name}    Set Variable    John
    \${last_name}     Set Variable    Doe
    \${full_name}     Set Variable    \${first_name} \${last_name}
    \${email}         Set Variable    \${first_name.lower()}.\${last_name.lower()}@test.com
    \${url_path}      Set Variable    \${BASE_URL}/users/\${user_id}
    Log    Full name: \${full_name}
    Log    Email: \${email}
    Log    URL path: \${url_path}
    Should Be Equal    \${full_name}    John Doe

Test Conditional Variable Assignment
    [Documentation]    Shows conditional variable assignment based on conditions
    [Tags]    variables    conditional    logic
    \${environment}    Set Variable    dev
    \${base_url}    Run Keyword If    '\${environment}' == 'dev'    Set Variable    https://dev-app.com
    ...    ELSE IF    '\${environment}' == 'staging'    Set Variable    https://staging-app.com
    ...    ELSE    Set Variable    https://prod-app.com
    \${timeout_value}    Run Keyword If    '\${environment}' == 'dev'    Set Variable    ${5}
    ...    ELSE    Set Variable    ${10}
    Log    Environment: \${environment}
    Log    Base URL: \${base_url}
    Log    Timeout: \${timeout_value}
    Should Contain    \${base_url}    \${environment}

Test Variable Scoping And Persistence
    [Documentation]    Demonstrates variable scope and persistence across keywords
    [Tags]    variables    scope    persistence
    Set Test Variable    \${TEST_SPECIFIC_VAR}    test_value
    Set Suite Variable   \${SUITE_SPECIFIC_VAR}   suite_value
    Set Global Variable  \${GLOBAL_VAR}          global_value
    Log    Test variable: \${TEST_SPECIFIC_VAR}
    Log    Suite variable: \${SUITE_SPECIFIC_VAR}
    Log    Global variable: \${GLOBAL_VAR}
    Verify Variable Scopes
    Should Be Equal    \${TEST_SPECIFIC_VAR}    test_value

Test Numeric Variables And Operations
    [Documentation]    Shows numeric variable operations and calculations
    [Tags]    variables    numeric    calculations
    \${price}         Set Variable    ${99.99}
    \${quantity}      Set Variable    ${3}
    \${tax_rate}      Set Variable    ${0.08}
    \${subtotal}      Evaluate    \${price} * \${quantity}
    \${tax_amount}    Evaluate    \${subtotal} * \${tax_rate}
    \${total}         Evaluate    \${subtotal} + \${tax_amount}
    Log    Price: $\${price}
    Log    Quantity: \${quantity}
    Log    Subtotal: $\${subtotal}
    Log    Tax: $\${tax_amount}
    Log    Total: $\${total}
    Should Be True    \${total} > \${subtotal}

*** Keywords ***
Verify Variable Scopes
    [Documentation]    Verifies that variables are accessible within keyword scope
    Log    Accessing test variable in keyword: \${TEST_SPECIFIC_VAR}
    Log    Accessing suite variable in keyword: \${SUITE_SPECIFIC_VAR}
    Log    Accessing global variable in keyword: \${GLOBAL_VAR}
    Should Not Be Empty    \${TEST_SPECIFIC_VAR}
    Should Not Be Empty    \${SUITE_SPECIFIC_VAR}

Generate Dynamic Variables
    [Documentation]    Creates variables dynamically based on input parameters
    [Arguments]    \${prefix}    \${suffix}
    \${dynamic_var}    Set Variable    \${prefix}_generated_\${suffix}
    \${timestamp}      Get Current Date    result_format=epoch
    \${unique_id}      Set Variable    \${dynamic_var}_\${timestamp}
    Log    Generated dynamic variable: \${unique_id}
    RETURN    \${unique_id}

Convert And Validate Variable Types
    [Arguments]    \${input_value}    \${expected_type}
    \${converted_value}    Run Keyword If    '\${expected_type}' == 'int'    Convert To Integer    \${input_value}
    ...    ELSE IF    '\${expected_type}' == 'float'    Convert To Number    \${input_value}
    ...    ELSE IF    '\${expected_type}' == 'string'    Convert To String    \${input_value}
    ...    ELSE    Set Variable    \${input_value}
    Log    Original: \${input_value}, Converted: \${converted_value}, Type: \${expected_type}
    RETURN    \${converted_value}
        </code></pre>
        
        <h3>🎯 Práctica Variables Escalares (4 min):</h3>
        <ol>
            <li><strong>Variables básicas:</strong> Definir variables de diferentes tipos (string, number, URL)</li>
            <li><strong>Set Variable:</strong> Usar Set Variable para asignar valores durante ejecución</li>
            <li><strong>Concatenación strings:</strong> Combinar variables para crear nuevos valores</li>
            <li><strong>Variables dinámicas:</strong> Generar valores con Get Current Date y Evaluate</li>
            <li><strong>Conditional assignment:</strong> Usar Run Keyword If para asignación condicional</li>
            <li><strong>Variable scoping:</strong> Probar Set Test Variable, Set Suite Variable, Set Global Variable</li>
            <li><strong>Numeric operations:</strong> Realizar cálculos con Evaluate y variables numéricas</li>
            <li><strong>String manipulation:</strong> Usar .lower(), .upper() y otros métodos de string</li>
            <li><strong>Variable validation:</strong> Validar contenido con Should Be Equal, Should Contain</li>
            <li><strong>Type conversion:</strong> Convertir entre string, integer y float</li>
            <li><strong>Return values:</strong> Capturar returns de keywords en variables</li>
            <li><strong>Random generation:</strong> Generar valores aleatorios para test data</li>
            <li><strong>Variable logging:</strong> Usar Log Variables para debugging</li>
            <li><strong>Keyword arguments:</strong> Pasar variables como argumentos entre keywords</li>
            <li><strong>Complex scenarios:</strong> Combinar multiple técnicas en test realista</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar definición y uso de variables escalares en Robot Framework</li>
                <li>Implementar asignación dinámica y manipulación de variables</li>
                <li>Controlar scope de variables (test, suite, global) efectivamente</li>
                <li>Realizar operaciones y validaciones con diferentes tipos de datos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Set Variable para valores dinámicos y Evaluate para cálculos. El scope de variables afecta dónde pueden ser accedidas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 032 - Variables de lista y diccionario</h3>
        <p>Expandiremos nuestro conocimiento de variables hacia estructuras de datos más complejas como listas y diccionarios para manejo de datos estructurados.</p>
    `,
    topics: ["variables", "scalar", "basics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-030"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_031 = LESSON_031;
}