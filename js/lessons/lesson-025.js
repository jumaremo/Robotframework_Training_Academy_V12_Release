const LESSON_025 = {
    id: 25,
    title: "Primer test completo",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    content: `
        <h2>🎯 Test Completo</h2>
        <p>Integración de todas las técnicas: setup, teardown, logging, timeouts y validaciones.</p>
        
        <h3>💻 Test End-to-End Completo:</h3>
        <pre><code class="robot">
*** Variables ***
\${BASE_URL}          http://demo.testsite.com
\${BROWSER_TYPE}      Chrome
\${LOGIN_USER}        testuser@example.com
\${LOGIN_PASS}        SecurePass123
\${WAIT_TIMEOUT}      10 seconds
\${PRODUCT_NAME}      Robot Framework Course

*** Test Cases ***
Complete User Journey Test
    [Documentation]    Test completo de registro, login y compra
    [Setup]    Initialize Test Environment
    
    # Registro de usuario
    Navigate To Registration Page
    Fill Registration Form
    Submit Registration
    Verify Registration Success
    
    # Login del usuario
    Navigate To Login Page  
    Perform User Login
    Verify Dashboard Access
    
    # Búsqueda y compra
    Search For Product
    Add Product To Cart
    Complete Purchase Flow
    Verify Order Confirmation
    
    [Teardown]    Cleanup Test Environment

*** Keywords ***
Initialize Test Environment
    Log    === Starting Complete Test ===    INFO
    Set Global Variable    \${TEST_START_TIME}    \${CURTIME}
    Open Browser    \${BASE_URL}    \${BROWSER_TYPE}
    Maximize Browser Window
    Set Selenium Speed    0.5 seconds
    Set Selenium Timeout    \${WAIT_TIMEOUT}

Navigate To Registration Page
    Log    Navigating to registration page    INFO
    Click Link    Register
    Wait Until Page Contains    Create Account    timeout=\${WAIT_TIMEOUT}
    Page Should Contain    Registration Form
    Log To Console    Registration page loaded successfully

Fill Registration Form
    Log    Filling registration form with user data    INFO
    Input Text    id=firstName    Test
    Input Text    id=lastName     User
    Input Text    id=email        \${LOGIN_USER}
    Input Text    id=password     \${LOGIN_PASS}
    Input Text    id=confirmPass  \${LOGIN_PASS}
    Select From List By Value    id=country    US
    Log    Form filled with user: \${LOGIN_USER}

Submit Registration
    Log    Submitting registration form    INFO
    TRY
        Click Button    id=registerBtn
        Wait Until Page Contains    Registration Successful    timeout=\${WAIT_TIMEOUT}
        Log    Registration submitted successfully    INFO
    EXCEPT
        Log    Registration submission failed    ERROR
        Capture Page Screenshot    registration_error.png
        Fail    Registration process failed
    END

Verify Registration Success
    Log    Verifying registration was successful    INFO
    Page Should Contain    Welcome Test User
    Page Should Contain    Account Created
    Element Should Be Visible    id=welcomeMessage
    Log To Console    Registration verification completed

Navigate To Login Page
    Log    Navigating to login page    INFO
    Go To    \${BASE_URL}/login
    Wait Until Page Contains    Sign In    timeout=\${WAIT_TIMEOUT}
    Page Should Contain    Email Address
    Page Should Contain    Password

Perform User Login
    Log    Performing user login    INFO
    Input Text    id=loginEmail    \${LOGIN_USER}
    Input Text    id=loginPass     \${LOGIN_PASS}
    Click Button    id=loginBtn
    Wait Until Page Contains    Dashboard    timeout=\${WAIT_TIMEOUT}
    Log    User logged in successfully: \${LOGIN_USER}

Verify Dashboard Access
    Log    Verifying dashboard access    INFO
    Page Should Contain    Welcome back
    Element Should Be Visible    id=userMenu
    Element Should Be Visible    id=searchBox
    Page Should Not Contain    Sign In
    Log To Console    Dashboard access verified

Search For Product
    Log    Searching for product: \${PRODUCT_NAME}    INFO
    Input Text    id=searchBox    \${PRODUCT_NAME}
    Click Button    id=searchBtn
    Wait Until Page Contains    Search Results    timeout=\${WAIT_TIMEOUT}
    Page Should Contain    \${PRODUCT_NAME}
    Element Should Be Visible    class=product-item

Add Product To Cart
    Log    Adding product to shopping cart    INFO
    Click Element    xpath=//h3[contains(text(), '\${PRODUCT_NAME}')]
    Wait Until Page Contains    Product Details    timeout=\${WAIT_TIMEOUT}
    Click Button    id=addToCartBtn
    Wait Until Page Contains    Added to Cart    timeout=\${WAIT_TIMEOUT}
    Log    Product added to cart: \${PRODUCT_NAME}

Complete Purchase Flow
    Log    Completing purchase flow    INFO
    Click Link    Cart
    Wait Until Page Contains    Shopping Cart    timeout=\${WAIT_TIMEOUT}
    Click Button    id=checkoutBtn
    Wait Until Page Contains    Checkout    timeout=\${WAIT_TIMEOUT}
    Click Button    id=confirmOrderBtn
    Wait Until Page Contains    Order Confirmation    timeout=\${WAIT_TIMEOUT}

Verify Order Confirmation
    Log    Verifying order confirmation    INFO
    Page Should Contain    Order Placed Successfully
    Page Should Contain    \${PRODUCT_NAME}
    Element Should Be Visible    id=orderNumber
    \${order_id}    Get Text    id=orderNumber
    Log    Order confirmed with ID: \${order_id}    INFO
    Set Global Variable    \${FINAL_ORDER_ID}    \${order_id}

Cleanup Test Environment
    Log    === Cleaning Up Test Environment ===    INFO
    \${test_end_time}    Get Current Date    result_format=%H:%M:%S
    Log    Test completed at: \${test_end_time}    INFO
    Log    Final order ID: \${FINAL_ORDER_ID}    INFO
    Close Browser
    Log    Test cleanup completed successfully    INFO
        </code></pre>
        
        <h3>🎯 Práctica Test Completo (4 min):</h3>
        <ol>
            <li><strong>Setup completo:</strong> Crear keyword Initialize que configure browser, timeouts y variables globales</li>
            <li><strong>Navegación robusta:</strong> Implementar navegación con Wait Until y validaciones de página</li>
            <li><strong>Formularios completos:</strong> Llenar formulario de registro con validación de cada campo</li>
            <li><strong>Manejo de errores:</strong> Usar TRY/EXCEPT en submit con screenshot automático en fallo</li>
            <li><strong>Logging detallado:</strong> Agregar Log e INFO en cada paso importante del test</li>
            <li><strong>Timeouts estratégicos:</strong> Usar Wait Until con timeout personalizado en cada transición</li>
            <li><strong>Validaciones múltiples:</strong> Combinar Page Should Contain y Element Should Be Visible</li>
            <li><strong>Variables dinámicas:</strong> Capturar y usar order ID en variables globales</li>
            <li><strong>Log To Console:</strong> Mostrar progreso en tiempo real durante ejecución</li>
            <li><strong>Keywords modulares:</strong> Separar funcionalidad en keywords reutilizables y específicos</li>
            <li><strong>Documentation tag:</strong> Agregar [Documentation] para describir propósito del test</li>
            <li><strong>Teardown robusto:</strong> Cleanup que funcione incluso si test falla parcialmente</li>
            <li><strong>Flujo end-to-end:</strong> Conectar registro → login → búsqueda → compra en secuencia lógica</li>
            <li><strong>Variables globales:</strong> Usar Set Global Variable para datos que persisten entre keywords</li>
            <li><strong>Test completo:</strong> Ejecutar todo el flujo y verificar que funciona de inicio a fin</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar setup/teardown, logging, timeouts y manejo de errores en un test completo</li>
                <li>Crear flujo end-to-end realista que simule journey de usuario completo</li>
                <li>Implementar keywords modulares y reutilizables para funcionalidades específicas</li>
                <li>Dominar técnicas de validación y verificación en tests de integración complejos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Organiza tests complejos en keywords modulares con responsabilidad única. Usa variables globales para datos que necesitas entre diferentes keywords del mismo test.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 026 - Ejecución y análisis de resultados</h3>
        <p>Con nuestro primer test completo funcionando, aprenderemos a ejecutar tests desde línea de comandos, analizar reportes y interpretar resultados para optimizar nuestros tests.</p>
    `,
    topics: ["complete-test", "integration", "practice"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-024"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_025 = LESSON_025;
}