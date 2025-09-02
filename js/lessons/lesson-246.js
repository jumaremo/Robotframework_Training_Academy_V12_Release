/**
 * Robot Framework Academy - Lesson 246
 * E-commerce testing suite
 */

const LESSON_246 = {
    id: 246,
    title: "E-commerce testing suite",
    duration: "20 min",
    level: "advanced",
    section: "section-21",
    content: `
        <h2>🔧 E-commerce Suite</h2>
        <p>Suite completa de testing para e-commerce enterprise con todos los flujos críticos integrados.</p>
        
        <h3>💻 Suite e-commerce completa:</h3>
        <pre><code class="robot">*** Settings ***
Library    SeleniumLibrary
Library    RequestsLibrary
Library    DatabaseLibrary
Documentation    E-commerce Testing Suite Enterprise

*** Variables ***
\${ECOMMERCE_URL}        https://shop.enterprise.com
\${API_BASE_URL}         https://api.shop.enterprise.com/v1
\${ADMIN_USER}           admin@enterprise.com
\${ADMIN_PASSWORD}       SecurePass123
\${TEST_USER_EMAIL}      testuser@example.com
\${TEST_USER_PASSWORD}   TestPass123
\${PRODUCT_ID}           PRD001
\${PAYMENT_GATEWAY}      stripe_sandbox

*** Test Cases ***
Test User Registration Flow
    Set Global Variable    \${REGISTRATION_STATUS}    pending
    Should Be Equal    \${REGISTRATION_STATUS}    pending
    Log    E-commerce user registration started    INFO
    Open Browser    \${ECOMMERCE_URL}/register    chrome
    Input Text    id=email    \${TEST_USER_EMAIL}
    Input Text    id=password    \${TEST_USER_PASSWORD}
    Input Text    id=confirm_password    \${TEST_USER_PASSWORD}
    Click Button    id=register_btn
    Wait Until Page Contains    Welcome
    Page Should Contain    Account Created Successfully
    Should Not Be Empty    \${TEST_USER_EMAIL}
    Set Suite Variable    \${USER_REGISTERED}    True
    Should Be Equal    \${USER_REGISTERED}    True
    Log    User registration completed    INFO
    Close Browser

Test Product Search And Filter
    Set Suite Variable    \${SEARCH_QUERY}    laptop
    Should Be Equal    \${SEARCH_QUERY}    laptop
    Log    Product search functionality testing    INFO
    Open Browser    \${ECOMMERCE_URL}    chrome
    Input Text    id=search_box    \${SEARCH_QUERY}
    Click Button    id=search_btn
    Wait Until Page Contains    Search Results
    Page Should Contain    \${SEARCH_QUERY}
    Select From List By Label    id=sort_dropdown    Price Low to High
    Wait Until Page Contains    Sorted by Price
    Click Element    xpath=//input[@name='brand'][1]
    Wait Until Page Contains    Filter Applied
    Should Not Be Empty    \${ECOMMERCE_URL}
    Set Test Variable    \${SEARCH_RESULTS}    found
    Should Be Equal    \${SEARCH_RESULTS}    found
    Log    Search and filter functionality verified    INFO
    Close Browser

Test Product Details And Reviews
    Set Global Variable    \${PRODUCT_SELECTED}    True
    Should Be Equal    \${PRODUCT_SELECTED}    True
    Log    Product details testing initiated    INFO
    Open Browser    \${ECOMMERCE_URL}/product/\${PRODUCT_ID}    chrome
    Wait Until Page Contains    Product Details
    Page Should Contain    Add to Cart
    Page Should Contain    Product Reviews
    Element Should Be Visible    id=product_image
    Element Should Be Visible    id=product_price
    Element Should Be Visible    id=add_to_cart_btn
    Scroll Element Into View    id=reviews_section
    Page Should Contain    Customer Reviews
    Should Be Equal    \${PRODUCT_ID}    PRD001
    Set Suite Variable    \${PRODUCT_LOADED}    True
    Should Be Equal    \${PRODUCT_LOADED}    True
    Log    Product details verification complete    INFO
    Close Browser

Test Shopping Cart Operations
    Set Suite Variable    \${CART_ITEMS}    0
    Should Be Equal As Numbers    \${CART_ITEMS}    0
    Log    Shopping cart testing started    INFO
    Open Browser    \${ECOMMERCE_URL}    chrome
    Go To    \${ECOMMERCE_URL}/product/\${PRODUCT_ID}
    Click Button    id=add_to_cart_btn
    Wait Until Page Contains    Added to Cart
    Click Link    Cart
    Wait Until Page Contains    Shopping Cart
    Page Should Contain    \${PRODUCT_ID}
    Select From List By Value    name=quantity    2
    Wait Until Page Contains    Cart Updated
    Click Button    id=update_cart_btn
    Page Should Contain    Total
    Should Not Be Empty    \${PRODUCT_ID}
    Set Global Variable    \${CART_UPDATED}    True
    Should Be Equal    \${CART_UPDATED}    True
    Log    Cart operations verified    INFO
    Close Browser

Test Checkout Process
    Set Global Variable    \${CHECKOUT_STARTED}    True
    Should Be Equal    \${CHECKOUT_STARTED}    True
    Log    Checkout process testing initiated    INFO
    Open Browser    \${ECOMMERCE_URL}/login    chrome
    Input Text    id=email    \${TEST_USER_EMAIL}
    Input Text    id=password    \${TEST_USER_PASSWORD}
    Click Button    id=login_btn
    Wait Until Page Contains    Dashboard
    Go To    \${ECOMMERCE_URL}/checkout
    Wait Until Page Contains    Checkout
    Input Text    id=shipping_address    123 Test Street
    Input Text    id=city    Test City
    Input Text    id=zipcode    12345
    Select From List By Label    id=shipping_method    Standard Shipping
    Click Button    id=continue_payment_btn
    Wait Until Page Contains    Payment Information
    Should Be Equal    \${PAYMENT_GATEWAY}    stripe_sandbox
    Set Suite Variable    \${CHECKOUT_READY}    True
    Should Be Equal    \${CHECKOUT_READY}    True
    Log    Checkout process verification complete    INFO
    Close Browser

Test Payment Integration
    Set Suite Variable    \${PAYMENT_METHOD}    credit_card
    Should Be Equal    \${PAYMENT_METHOD}    credit_card
    Log    Payment integration testing    INFO
    Create Session    ecommerce_api    \${API_BASE_URL}
    \${payment_data}=    Create Dictionary    amount=99.99    currency=USD    method=credit_card
    \${response}=    POST On Session    ecommerce_api    /payments/validate    json=\${payment_data}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    transaction_id
    \${transaction_id}=    Get From Dictionary    \${response.json()}    transaction_id
    Should Not Be Empty    \${transaction_id}
    Set Global Variable    \${PAYMENT_VALIDATED}    True
    Should Be Equal    \${PAYMENT_VALIDATED}    True
    Log    Payment validation successful    INFO

Test Order Management API
    Set Global Variable    \${ORDER_CREATED}    True
    Should Be Equal    \${ORDER_CREATED}    True
    Log    Order management API testing    INFO
    Create Session    ecommerce_api    \${API_BASE_URL}
    \${order_data}=    Create Dictionary    product_id=\${PRODUCT_ID}    quantity=2    user_email=\${TEST_USER_EMAIL}
    \${response}=    POST On Session    ecommerce_api    /orders    json=\${order_data}
    Should Be Equal As Numbers    \${response.status_code}    201
    Dictionary Should Contain Key    \${response.json()}    order_id
    \${order_id}=    Get From Dictionary    \${response.json()}    order_id
    \${get_response}=    GET On Session    ecommerce_api    /orders/\${order_id}
    Should Be Equal As Numbers    \${get_response.status_code}    200
    Should Be Equal    \${PRODUCT_ID}    PRD001
    Set Suite Variable    \${ORDER_VERIFIED}    True
    Should Be Equal    \${ORDER_VERIFIED}    True
    Log    Order API verification complete    INFO

Test Inventory Management
    Set Suite Variable    \${INVENTORY_CHECK}    active
    Should Be Equal    \${INVENTORY_CHECK}    active
    Log    Inventory management testing    INFO
    Create Session    ecommerce_api    \${API_BASE_URL}
    \${response}=    GET On Session    ecommerce_api    /inventory/\${PRODUCT_ID}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    stock_quantity
    \${stock}=    Get From Dictionary    \${response.json()}    stock_quantity
    Should Be True    \${stock} > 0
    \${update_data}=    Create Dictionary    quantity=50
    \${update_response}=    PUT On Session    ecommerce_api    /inventory/\${PRODUCT_ID}    json=\${update_data}
    Should Be Equal As Numbers    \${update_response.status_code}    200
    Should Not Be Empty    \${PRODUCT_ID}
    Set Global Variable    \${INVENTORY_UPDATED}    True
    Should Be Equal    \${INVENTORY_UPDATED}    True
    Log    Inventory management verified    INFO

Test Admin Dashboard
    Set Global Variable    \${ADMIN_ACCESS}    granted
    Should Be Equal    \${ADMIN_ACCESS}    granted
    Log    Admin dashboard testing started    INFO
    Open Browser    \${ECOMMERCE_URL}/admin    chrome
    Input Text    id=admin_email    \${ADMIN_USER}
    Input Text    id=admin_password    \${ADMIN_PASSWORD}
    Click Button    id=admin_login_btn
    Wait Until Page Contains    Admin Dashboard
    Page Should Contain    Total Orders
    Page Should Contain    Revenue
    Page Should Contain    Active Users
    Click Link    Product Management
    Wait Until Page Contains    Product List
    Page Should Contain    \${PRODUCT_ID}
    Should Not Be Empty    \${ADMIN_USER}
    Set Suite Variable    \${ADMIN_VERIFIED}    True
    Should Be Equal    \${ADMIN_VERIFIED}    True
    Log    Admin dashboard verification complete    INFO
    Close Browser</code></pre>
        
        <h3>🎯 Desarrollo E-commerce Suite (15 min):</h3>
        <p>1. Configura entorno e-commerce con URLs y credenciales</p>
        <p>2. Implementa user registration con validaciones completas</p>
        <p>3. Desarrolla product search con filtros avanzados</p>
        <p>4. Agrega product details con reviews integration</p>
        <p>5. Implementa shopping cart con operaciones CRUD</p>
        <p>6. Desarrolla checkout process multi-step</p>
        <p>7. Integra payment gateway con validaciones</p>
        <p>8. Implementa order management API testing</p>
        <p>9. Agrega inventory management con stock control</p>
        <p>10. Desarrolla admin dashboard testing completo</p>
        <p>11. Implementa user authentication y authorization</p>
        <p>12. Agrega shipping calculation y tax management</p>
        <p>13. Desarrolla coupon y discount code testing</p>
        <p>14. Implementa wishlist functionality testing</p>
        <p>15. Agrega email notifications verification</p>
        <p>16. Desarrolla mobile responsive testing</p>
        <p>17. Implementa performance testing bajo carga</p>
        <p>18. Agrega security testing con penetration</p>
        <p>19. Desarrolla analytics y reporting validation</p>
        <p>20. Implementa backup y disaster recovery testing</p>
        <p>21. Agrega integration con third-party services</p>
        <p>22. Desarrolla multi-language support testing</p>
        <p>23. Implementa accessibility compliance validation</p>
        <p>24. Testa suite completa con datos reales</p>
        <p>25. Valida performance metrics end-to-end</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Desarrollar suite completa de testing e-commerce</li>
                <li>Integrar web testing, API testing y database validation</li>
                <li>Cubrir todos los flujos críticos del negocio</li>
                <li>Crear solución enterprise-ready escalable</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>E-commerce exitoso: User Flows + API Integration + Payment Testing + Admin Management = suite que garantiza 99.9% uptime y customer satisfaction.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 247 - API microservices testing</h3>
        <p>Con e-commerce dominado, desarrollarás testing completo para arquitecturas de microservicios con API distributed testing y service mesh validation.</p>
    `,
    topics: ["capstone", "integration", "final-project"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 20,
    difficulty: "easy",
    prerequisites: ["lesson-245"],
    type: "capstone"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_246 = LESSON_246;
}