const LESSON_029 = {
    id: 29,
    title: "Patrones comunes de testing",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    content: `
        <h2>🔄 Patrones Testing</h2>
        <p>Templates y patrones reutilizables para tests consistentes y eficientes.</p>
        
        <h3>💻 Patrones Fundamentales:</h3>
        <pre><code class="robot">
*** Variables ***
\${PATTERN_LOGIN}     login_flow
\${PATTERN_CRUD}      create_read_update_delete
\${PATTERN_SEARCH}    search_and_validate
\${BASE_URL}          https://demo-app.com
\${DEFAULT_TIMEOUT}   10 seconds

*** Test Cases ***
# Patrón 1: Arrange-Act-Assert (AAA)
User Login Should Follow AAA Pattern
    [Documentation]    Demonstrates Arrange-Act-Assert testing pattern
    [Tags]    pattern    aaa    login
    # ARRANGE: Setup test data and environment
    \${test_user}    Set Variable    testuser@example.com
    \${test_password}    Set Variable    SecurePass123
    Open Browser And Navigate To Login
    
    # ACT: Perform the action under test
    Fill Login Form    \${test_user}    \${test_password}
    Submit Login Form
    
    # ASSERT: Verify expected outcome
    User Should Be Successfully Logged In
    Page Should Display Welcome Message

# Patrón 2: Given-When-Then (BDD)
Product Search Should Follow BDD Pattern
    [Documentation]    Demonstrates Given-When-Then testing pattern
    [Tags]    pattern    bdd    search
    # GIVEN: Initial state
    Given User Is On Home Page
    And Search Functionality Is Available
    
    # WHEN: Action performed
    When User Searches For Product    "Robot Framework Course"
    
    # THEN: Expected outcome
    Then Search Results Should Be Displayed
    And Results Should Contain Product    "Robot Framework Course"

# Patrón 3: Page Object Model
User Profile Should Use Page Object Pattern
    [Documentation]    Demonstrates Page Object Model pattern
    [Tags]    pattern    pom    profile
    Login Page.Navigate To Page
    Login Page.Fill Username    admin@test.com
    Login Page.Fill Password    password123
    Login Page.Click Submit Button
    Dashboard Page.Verify User Is Logged In
    Dashboard Page.Navigate To Profile
    Profile Page.Update First Name    Updated Name
    Profile Page.Save Changes
    Profile Page.Verify Success Message

# Patrón 4: Data-Driven Template
User Registration Should Use Data Template
    [Documentation]    Demonstrates data-driven testing pattern
    [Tags]    pattern    data-driven    registration
    [Template]    Register User With Data
    valid_user@test.com    ValidPass123    John    Doe    PASS
    invalid@email         ValidPass123    Jane    Doe    FAIL
    valid_user2@test.com  weak           Bob     Smith   FAIL
    existing@test.com     ValidPass123    Alice   Brown   FAIL

# Patrón 5: Fluent Interface
Order Process Should Use Fluent Pattern
    [Documentation]    Demonstrates fluent interface testing pattern
    [Tags]    pattern    fluent    order
    Order Builder
    ...    .Add Product    "Laptop"    1
    ...    .Add Product    "Mouse"     2
    ...    .Set Shipping Address    "123 Test St"
    ...    .Set Payment Method    "Credit Card"
    ...    .Apply Discount Code    "SAVE10"
    ...    .Submit Order
    ...    .Verify Order Confirmation

*** Keywords ***
# AAA Pattern Keywords
Open Browser And Navigate To Login
    Open Browser    \${BASE_URL}/login    Chrome
    Wait Until Page Contains    Sign In    timeout=\${DEFAULT_TIMEOUT}

Fill Login Form
    [Arguments]    \${username}    \${password}
    Input Text    id=username    \${username}
    Input Text    id=password    \${password}

User Should Be Successfully Logged In
    Wait Until Page Contains    Dashboard    timeout=\${DEFAULT_TIMEOUT}
    Element Should Be Visible    id=user-menu

# BDD Pattern Keywords
Given User Is On Home Page
    Go To    \${BASE_URL}
    Wait Until Page Contains    Welcome    timeout=\${DEFAULT_TIMEOUT}

When User Searches For Product
    [Arguments]    \${product_name}
    Input Text    id=search-box    \${product_name}
    Click Button    id=search-button

Then Search Results Should Be Displayed
    Wait Until Page Contains    Search Results    timeout=\${DEFAULT_TIMEOUT}
    Element Should Be Visible    class=results-container

# Data-Driven Template
Register User With Data
    [Arguments]    \${email}    \${password}    \${first_name}    \${last_name}    \${expected_result}
    Go To    \${BASE_URL}/register
    Input Text    id=email        \${email}
    Input Text    id=password     \${password}
    Input Text    id=first_name   \${first_name}
    Input Text    id=last_name    \${last_name}
    Click Button    id=register-btn
    Run Keyword If    '\${expected_result}' == 'PASS'    Registration Should Succeed
    Run Keyword If    '\${expected_result}' == 'FAIL'    Registration Should Fail
        </code></pre>
        
        <h3>🎯 Práctica Patrones Testing (4 min):</h3>
        <ol>
            <li><strong>AAA Pattern:</strong> Implementar test con secciones Arrange-Act-Assert claramente separadas</li>
            <li><strong>BDD Given-When-Then:</strong> Crear test usando keywords que siguen formato BDD</li>
            <li><strong>Page Object Model:</strong> Organizar keywords por página para reutilización</li>
            <li><strong>Data-Driven Template:</strong> Usar [Template] para ejecutar mismo test con diferentes datos</li>
            <li><strong>Fluent Interface:</strong> Crear keywords que permitan chaining de acciones</li>
            <li><strong>Builder Pattern:</strong> Implementar construcción step-by-step de objetos complejos</li>
            <li><strong>Factory Pattern:</strong> Crear keywords que generen data de test dinámicamente</li>
            <li><strong>Setup/Teardown Pattern:</strong> Usar consistently en todos los test suites</li>
            <li><strong>Error Recovery Pattern:</strong> Implementar manejo de errores con recuperación automática</li>
            <li><strong>Retry Pattern:</strong> Crear keywords con logic de reintentos para elementos flaky</li>
            <li><strong>Validation Pattern:</strong> Agrupar validaciones relacionadas en keywords específicos</li>
            <li><strong>Configuration Pattern:</strong> Externalizar configuraciones en variables o archivos</li>
            <li><strong>Documentation Pattern:</strong> Usar tags y documentation consistently</li>
            <li><strong>Naming Pattern:</strong> Aplicar convenciones de nomenclatura en todos los patterns</li>
            <li><strong>Mixed Patterns:</strong> Combinar múltiples patrones en test real complejo</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar patrones de testing estándar (AAA, BDD, Page Object Model)</li>
                <li>Crear templates reutilizables para diferentes tipos de tests</li>
                <li>Organizar keywords siguiendo patrones de diseño establecidos</li>
                <li>Combinar patrones para crear tests robustos y mantenibles</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Combina AAA pattern con Page Object Model para máxima claridad. Usa BDD keywords para tests de negocio y data-driven templates para validaciones masivas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 030 - Ejercicio integrador básico</h3>
        <p>Aplicaremos todos los patrones aprendidos en un ejercicio integrador que combine estructura de proyecto, nomenclatura y patrones de testing en un proyecto real.</p>
    `,
    topics: ["patterns", "common-practices", "templates"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-028"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_029 = LESSON_029;
}