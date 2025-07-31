const LESSON_030 = {
    id: 30,
    title: "Ejercicio integrador básico",
    duration: "10 min",
    level: "beginner",
    section: "section-02",
    content: `
        <h2>🎓 Integrador Básico</h2>
        <p>Proyecto completo integrando estructura, nomenclatura, patrones y fundamentos de Robot Framework.</p>
        
        <h3>💻 Proyecto E-commerce Testing:</h3>
        <pre><code class="robot">
*** Variables ***
\${ECOMMERCE_URL}     https://demo-ecommerce.com
\${ADMIN_EMAIL}       admin@ecommerce.com
\${ADMIN_PASSWORD}    AdminPass123
\${CUSTOMER_EMAIL}    customer@test.com
\${CUSTOMER_PASSWORD} CustomerPass123
\${PRODUCT_NAME}      "Laptop Gaming"
\${TIMEOUT_DEFAULT}   15 seconds

*** Test Cases ***
Complete Customer Journey Should Pass End To End
    [Documentation]    Full customer journey from registration to order completion
    [Tags]    integration    e2e    customer-journey    critical
    [Setup]    Initialize E-commerce Test Environment
    
    # Customer Registration Flow
    Navigate To Registration Page
    Complete Customer Registration    \${CUSTOMER_EMAIL}    \${CUSTOMER_PASSWORD}
    Verify Registration Success Message
    
    # Login and Profile Setup
    Navigate To Login Page
    Perform Customer Login    \${CUSTOMER_EMAIL}    \${CUSTOMER_PASSWORD}
    Verify Customer Dashboard Access
    Complete Profile Information
    
    # Product Search and Selection
    Search For Product    \${PRODUCT_NAME}
    Verify Product Search Results
    Select Product From Results    \${PRODUCT_NAME}
    Verify Product Details Page
    
    # Shopping Cart Operations
    Add Product To Shopping Cart
    Verify Product Added To Cart
    Navigate To Shopping Cart
    Verify Cart Contents    \${PRODUCT_NAME}
    
    # Checkout Process
    Proceed To Checkout
    Fill Shipping Information
    Select Payment Method    "Credit Card"
    Enter Payment Details
    Review Order Summary
    
    # Order Completion
    Submit Order
    Verify Order Confirmation
    Capture Order Number
    
    [Teardown]    Cleanup E-commerce Test Environment

Admin Product Management Should Function Correctly
    [Documentation]    Admin workflow for product management operations
    [Tags]    integration    admin    product-management    regression
    [Setup]    Initialize Admin Test Environment
    
    # Admin Login
    Navigate To Admin Login
    Perform Admin Login    \${ADMIN_EMAIL}    \${ADMIN_PASSWORD}
    Verify Admin Dashboard Access
    
    # Product Creation
    Navigate To Product Management
    Create New Product    "Test Product"    "Category A"    "99.99"
    Verify Product Creation Success
    
    # Product Update
    Search Admin Product    "Test Product"
    Edit Product Details    "Updated Test Product"    "199.99"
    Verify Product Update Success
    
    # Product Deletion
    Delete Product    "Updated Test Product"
    Verify Product Deletion Success
    
    [Teardown]    Cleanup Admin Test Environment

*** Keywords ***
# Setup and Teardown Keywords
Initialize E-commerce Test Environment
    [Documentation]    Sets up browser and navigates to e-commerce site
    Log    === Starting E-commerce Integration Test ===    INFO
    Set Test Variable    \${TEST_START_TIME}    \${CURTIME}
    Open Browser    \${ECOMMERCE_URL}    Chrome
    Maximize Browser Window
    Set Selenium Speed    0.5 seconds
    Set Selenium Timeout    \${TIMEOUT_DEFAULT}
    Wait Until Page Contains    Welcome    timeout=\${TIMEOUT_DEFAULT}

Cleanup E-commerce Test Environment
    [Documentation]    Cleans up test environment and logs results
    \${test_end_time}    Get Current Date    result_format=%H:%M:%S
    Log    Test completed at: \${test_end_time}    INFO
    Capture Page Screenshot    final_state.png
    Close Browser
    Log    === E-commerce Integration Test Completed ===    INFO

# Registration Flow Keywords
Navigate To Registration Page
    [Documentation]    Navigates to customer registration page
    Click Link    Register
    Wait Until Page Contains    Create Account    timeout=\${TIMEOUT_DEFAULT}
    Page Should Contain    Registration Form

Complete Customer Registration
    [Documentation]    Fills and submits customer registration form
    [Arguments]    \${email}    \${password}
    Input Text    id=reg-email       \${email}
    Input Text    id=reg-password    \${password}
    Input Text    id=reg-confirm     \${password}
    Input Text    id=reg-firstname   Test
    Input Text    id=reg-lastname    Customer
    Select From List By Value    id=reg-country    US
    Click Button    id=register-submit
    Log    Registration completed for: \${email}

# Login Flow Keywords
Navigate To Login Page
    [Documentation]    Navigates to customer login page
    Go To    \${ECOMMERCE_URL}/login
    Wait Until Page Contains    Sign In    timeout=\${TIMEOUT_DEFAULT}
    Page Should Contain    Email Address

Perform Customer Login
    [Documentation]    Executes customer login with credentials
    [Arguments]    \${email}    \${password}
    Input Text    id=login-email    \${email}
    Input Text    id=login-pass     \${password}
    Click Button    id=login-submit
    Wait Until Page Contains    My Account    timeout=\${TIMEOUT_DEFAULT}

# Product Search Keywords
Search For Product
    [Documentation]    Searches for specific product in catalog
    [Arguments]    \${product_name}
    Input Text    id=search-input    \${product_name}
    Click Button    id=search-button
    Wait Until Page Contains    Search Results    timeout=\${TIMEOUT_DEFAULT}

Verify Product Search Results
    [Documentation]    Validates search results are displayed correctly
    Page Should Contain    Search Results
    Element Should Be Visible    class=product-grid
    Page Should Not Contain    No products found

# Shopping Cart Keywords
Add Product To Shopping Cart
    [Documentation]    Adds selected product to shopping cart
    Click Button    id=add-to-cart
    Wait Until Page Contains    Added to Cart    timeout=\${TIMEOUT_DEFAULT}
    Element Should Be Visible    class=cart-notification

Navigate To Shopping Cart
    [Documentation]    Navigates to shopping cart page
    Click Link    Cart
    Wait Until Page Contains    Shopping Cart    timeout=\${TIMEOUT_DEFAULT}
    Page Should Contain    Items in Cart

# Checkout Keywords
Proceed To Checkout
    [Documentation]    Initiates checkout process from cart
    Click Button    id=checkout-button
    Wait Until Page Contains    Checkout    timeout=\${TIMEOUT_DEFAULT}
    Page Should Contain    Shipping Information

Fill Shipping Information
    [Documentation]    Completes shipping address form
    Input Text    id=ship-address    123 Test Street
    Input Text    id=ship-city       Test City
    Input Text    id=ship-zip        12345
    Select From List By Value    id=ship-state    CA

Submit Order
    [Documentation]    Submits final order for processing
    Click Button    id=place-order
    Wait Until Page Contains    Order Confirmation    timeout=\${TIMEOUT_DEFAULT}
    Element Should Be Visible    id=order-number

Capture Order Number
    [Documentation]    Captures order number for tracking
    \${order_number}    Get Text    id=order-number
    Set Global Variable    \${FINAL_ORDER_NUMBER}    \${order_number}
    Log    Order completed with number: \${order_number}    INFO
        </code></pre>
        
        <h3>🎯 Práctica Integrador Básico (8 min):</h3>
        <ol>
            <li><strong>Proyecto setup:</strong> Crear estructura completa con tests/, resources/, config/ directories</li>
            <li><strong>Multiple test suites:</strong> Separar customer_journey.robot y admin_management.robot</li>
            <li><strong>Resource files:</strong> Crear common_keywords.resource, login_keywords.resource modulares</li>
            <li><strong>Variables configuration:</strong> Externalizar URLs, credentials y timeouts</li>
            <li><strong>Integration patterns:</strong> Aplicar AAA pattern en cada test case</li>
            <li><strong>BDD keywords:</strong> Implementar Given-When-Then en flujos de negocio</li>
            <li><strong>Setup/Teardown:</strong> Usar consistently en todos los test cases</li>
            <li><strong>Error handling:</strong> Agregar TRY/EXCEPT en operaciones críticas</li>
            <li><strong>Logging completo:</strong> Implementar logging detallado en cada step</li>
            <li><strong>Tags organization:</strong> Usar tags para filtering (integration, e2e, critical)</li>
            <li><strong>Documentation:</strong> Agregar [Documentation] a todos tests y keywords</li>
            <li><strong>Variables globales:</strong> Capturar order numbers y datos importantes</li>
            <li><strong>Screenshots:</strong> Capture screenshots en puntos críticos</li>
            <li><strong>CLI execution:</strong> Ejecutar con diferentes tags y generar reportes</li>
            <li><strong>Final validation:</strong> Verificar que proyecto integra todos los fundamentos aprendidos</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar todos los fundamentos de Robot Framework en proyecto real completo</li>
                <li>Aplicar estructura escalable, nomenclatura y patrones de testing</li>
                <li>Crear flujos end-to-end que simulen scenarios de negocio reales</li>
                <li>Demostrar dominio completo de nivel básico de Robot Framework</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Este proyecto integra TODOS los conceptos básicos. Úsalo como template para proyectos reales y base para avanzar al nivel intermedio.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 031 - Variables escalares básicas</h3>
        <p>¡Felicitaciones por completar los fundamentos! Ahora avanzaremos al manejo profundo de variables y datos, comenzando con variables escalares y su uso efectivo.</p>
    `,
    topics: ["integration", "exercise", "practice"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-029"],
    type: "integration"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_030 = LESSON_030;
}