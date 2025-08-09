const LESSON_036 = {
    id: 36,
    title: "Scoping y visibilidad de variables",
    duration: "5 min",
    level: "beginner",
    section: "section-03",
    content: `
        <h2>🔍 Variable Scoping</h2>
        <p>Control de scope y visibilidad de variables entre tests, keywords y suites.</p>
        
        <h3>💻 Variable Scope Control:</h3>
        <pre><code class="robot">
*** Variables ***
\${SUITE_LEVEL_VAR}      Suite Level Value
\${GLOBAL_COUNTER}       0

*** Test Cases ***
Test Variable Scope Hierarchy
    [Documentation]    Demonstrates different variable scope levels
    [Tags]    variables    scope    hierarchy
    Log    Suite variable: \${SUITE_LEVEL_VAR}
    Set Test Variable    \${TEST_SPECIFIC_VAR}    Test Level Value
    Set Suite Variable   \${SUITE_DYNAMIC_VAR}   Dynamic Suite Value
    Set Global Variable  \${GLOBAL_DYNAMIC_VAR}  Global Value
    Log    Test variable: \${TEST_SPECIFIC_VAR}
    Log    Suite dynamic: \${SUITE_DYNAMIC_VAR}
    Log    Global dynamic: \${GLOBAL_DYNAMIC_VAR}
    Should Be Equal    \${TEST_SPECIFIC_VAR}    Test Level Value

Test Variable Inheritance And Access
    [Documentation]    Shows how variables are inherited from different scopes
    [Tags]    variables    scope    inheritance
    Log    Accessing suite variable: \${SUITE_LEVEL_VAR}
    Log    Accessing global dynamic: \${GLOBAL_DYNAMIC_VAR}
    Run Keyword If    '\${SUITE_DYNAMIC_VAR}' != '\${EMPTY}'    
    ...    Log    Suite dynamic still accessible: \${SUITE_DYNAMIC_VAR}
    TRY
        Log    Trying to access test variable from previous test: \${TEST_SPECIFIC_VAR}
    EXCEPT
        Log    Test variable not accessible (expected behavior)
    END

Test Local Variable Scope Within Keywords
    [Documentation]    Demonstrates local variable scope within keywords
    [Tags]    variables    scope    local
    \${local_var}    Set Variable    Local Test Value
    Test Keyword With Local Variables    \${local_var}
    Log    Original local variable: \${local_var}
    Should Be Equal    \${local_var}    Local Test Value

Test Variable Modification Across Scopes
    [Documentation]    Shows how to modify variables across different scopes
    [Tags]    variables    scope    modification
    \${GLOBAL_COUNTER}    Evaluate    \${GLOBAL_COUNTER} + 1
    Set Global Variable    \${GLOBAL_COUNTER}
    Increment Suite Counter
    Log    Global counter after increment: \${GLOBAL_COUNTER}
    Log    Suite counter: \${SUITE_COUNTER}
    Should Be True    \${GLOBAL_COUNTER} >= 1

Test Return Values And Variable Assignment
    [Documentation]    Demonstrates returning values from keywords to variables
    [Tags]    variables    scope    return
    \${returned_value}    Create And Return Value    Test Data
    \${calculated_result}    Calculate Sum    10    20
    \${user_data}    Generate User Information    John Doe    john@test.com
    Log    Returned value: \${returned_value}
    Log    Calculated result: \${calculated_result}
    Log    User data: \${user_data}
    Should Be Equal    \${returned_value}    Test Data_processed

Test Variable Scope In Nested Keywords
    [Documentation]    Shows variable scope behavior in nested keyword calls
    [Tags]    variables    scope    nested
    \${test_input}    Set Variable    Input Value
    \${nested_result}    Call Nested Keywords    \${test_input}
    Log    Result from nested keywords: \${nested_result}
    Should Contain    \${nested_result}    processed

Test Suite Variable Persistence
    [Documentation]    Validates that suite variables persist across tests
    [Tags]    variables    scope    persistence
    Should Not Be Empty    \${SUITE_DYNAMIC_VAR}
    Log    Suite variable persisted: \${SUITE_DYNAMIC_VAR}
    Set Suite Variable    \${SUITE_TEST_COUNT}    \${SUITE_TEST_COUNT + 1}
    Log    Suite test count: \${SUITE_TEST_COUNT}

*** Keywords ***
Test Keyword With Local Variables
    [Documentation]    Demonstrates local variable behavior within keywords
    [Arguments]    \${input_value}
    \${keyword_local}    Set Variable    Keyword Local Value
    Log    Input parameter: \${input_value}
    Log    Keyword local variable: \${keyword_local}
    \${modified_input}    Set Variable    \${input_value}_modified
    Log    Modified input: \${modified_input}
    # keyword_local is not accessible outside this keyword

Create And Return Value
    [Documentation]    Creates and returns a processed value
    [Arguments]    \${input_data}
    \${processed_data}    Set Variable    \${input_data}_processed
    Log    Processing data: \${input_data}
    RETURN    \${processed_data}

Calculate Sum
    [Documentation]    Calculates sum and returns result
    [Arguments]    \${num1}    \${num2}
    \${result}    Evaluate    \${num1} + \${num2}
    Log    Calculating: \${num1} + \${num2} = \${result}
    RETURN    \${result}

Generate User Information
    [Documentation]    Generates user data dictionary
    [Arguments]    \${name}    \${email}
    &{user_info}    Create Dictionary    
    ...    name=\${name}    
    ...    email=\${email}    
    ...    id=\${random.randint(1000, 9999)}    
    ...    created=\${CURTIME}
    Set To Dictionary    \${user_info}    status=active
    Log Dictionary    \${user_info}
    RETURN    \${user_info}

Call Nested Keywords
    [Documentation]    Calls nested keywords to demonstrate scope behavior
    [Arguments]    \${input_value}
    \${intermediate_result}    Process At Level One    \${input_value}
    \${final_result}    Process At Level Two    \${intermediate_result}
    RETURN    \${final_result}

Process At Level One
    [Arguments]    \${data}
    \${level_one_result}    Set Variable    \${data}_level1
    Log    Level 1 processing: \${level_one_result}
    RETURN    \${level_one_result}

Process At Level Two
    [Arguments]    \${data}
    \${level_two_result}    Set Variable    \${data}_level2_processed
    Log    Level 2 processing: \${level_two_result}
    RETURN    \${level_two_result}

Increment Suite Counter
    [Documentation]    Increments suite-level counter
    \${current_count}    Get Variable Value    \${SUITE_COUNTER}    0
    \${new_count}    Evaluate    \${current_count} + 1
    Set Suite Variable    \${SUITE_COUNTER}    \${new_count}
    Log    Suite counter incremented to: \${new_count}

Demonstrate Variable Shadowing
    [Documentation]    Shows how local variables can shadow global ones
    [Arguments]    \${SUITE_LEVEL_VAR}=Local Override
    Log    Shadowed suite variable: \${SUITE_LEVEL_VAR}
    \${GLOBAL_COUNTER}    Set Variable    999
    Log    Local GLOBAL_COUNTER: \${GLOBAL_COUNTER}
    # These are local to this keyword and don't affect global values

Access Global Variables From Keyword
    [Documentation]    Accesses and logs global scope variables
    Log    Global counter from keyword: \${GLOBAL_COUNTER}
    Log    Global dynamic from keyword: \${GLOBAL_DYNAMIC_VAR}
    Run Keyword If    '\${SUITE_DYNAMIC_VAR}' != '\${EMPTY}'
    ...    Log    Suite dynamic from keyword: \${SUITE_DYNAMIC_VAR}
        </code></pre>
        
        <h3>🎯 Práctica Variable Scoping (4 min):</h3>
        <ol>
            <li><strong>Test variables:</strong> Usar Set Test Variable para variables específicas de test</li>
            <li><strong>Suite variables:</strong> Usar Set Suite Variable para variables compartidas en suite</li>
            <li><strong>Global variables:</strong> Usar Set Global Variable para variables accesibles globalmente</li>
            <li><strong>Variable inheritance:</strong> Probar acceso a variables desde diferentes scopes</li>
            <li><strong>Local scope:</strong> Crear variables locales dentro de keywords</li>
            <li><strong>Return values:</strong> Usar RETURN para pasar valores de keywords a variables</li>
            <li><strong>Variable shadowing:</strong> Crear variables locales que sobrescriban globales</li>
            <li><strong>Nested keyword scope:</strong> Probar comportamiento en keywords anidados</li>
            <li><strong>Variable persistence:</strong> Validar que variables persisten entre tests</li>
            <li><strong>Scope validation:</strong> Usar TRY/EXCEPT para validar accesibilidad</li>
            <li><strong>Parameter passing:</strong> Pasar variables como argumentos entre keywords</li>
            <li><strong>Modification patterns:</strong> Modificar variables de diferentes scopes</li>
            <li><strong>Get Variable Value:</strong> Usar para acceso seguro con defaults</li>
            <li><strong>Scope debugging:</strong> Usar Log Variables para debug de scope</li>
            <li><strong>Best practices:</strong> Implementar patrones de scope para mantenibilidad</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar los diferentes niveles de scope (test, suite, global) en Robot Framework</li>
                <li>Controlar visibilidad y acceso de variables entre tests y keywords</li>
                <li>Implementar patrones efectivos de paso de variables y valores de retorno</li>
                <li>Entender shadowing y herencia de variables en contextos anidados</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Test Variable para datos específicos del test, Suite Variable para datos compartidos en la suite, y Global Variable solo cuando sea absolutamente necesario.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 037 - Manipulación de strings</h3>
        <p>Nos enfocaremos en técnicas avanzadas de manipulación de strings y texto para validaciones y procesamiento de datos.</p>
    `,
    topics: ["scope", "visibility", "context"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-035"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_036 = LESSON_036;
}