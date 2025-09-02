/**
 * Robot Framework Academy - Lesson 084
 * Proyecto web automation completo
 */

const LESSON_084 = {
    id: 84,
    title: "Proyecto web automation completo",
    duration: "15 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Proyecto E-Commerce Completo</h2>
        <p>Integra todo lo aprendido en SeleniumLibrary creando un sistema de automation completo para e-commerce: login, búsquedas, carrito, checkout y administración.</p>
        
        <h3>💻 Suite automation enterprise:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    🏆 PROYECTO E-COMMERCE AUTOMATION COMPLETO
Library          SeleniumLibrary
Library          Collections
Library          OperatingSystem
Resource         ../resources/common_keywords.robot
Variables        ../data/test_data.yaml
Suite Setup      Initialize Test Environment
Suite Teardown   Cleanup Test Environment

*** Variables ***
\${URL}                 https://ecommerce-demo.com
\${BROWSER}             chrome
\${ADMIN_EMAIL}         admin@ecommerce.com
\${ADMIN_PASSWORD}      admin123secure
\${CUSTOMER_EMAIL}      customer@test.com
\${CUSTOMER_PASSWORD}   customer123
\${SEARCH_PRODUCT}      Laptop Gaming Pro
\${CREDIT_CARD}         4532015112830366
\${CVV}                 123
\${EXPIRY_DATE}         12/25

*** Test Cases ***
Test Complete User Registration Flow
    Open Browser                        \${URL}                              \${BROWSER}
    Maximize Browser Window
    Set Selenium Timeout                10s
    Navigate To Registration Page
    Fill Registration Form              Juan                                 Pérez    \${CUSTOMER_EMAIL}    \${CUSTOMER_PASSWORD}
    Verify Email Validation Success
    Submit Registration Form
    Verify Registration Confirmation
    Check Welcome Email Received
    Activate Account Via Email
    Verify Account Activation Success
    Login With New Credentials          \${CUSTOMER_EMAIL}                   \${CUSTOMER_PASSWORD}
    Verify User Dashboard Access
    Update User Profile Information
    Verify Profile Update Success
    Close Browser

Test Product Search And Filtering
    Open Browser                        \${URL}                              \${BROWSER}
    Navigate To Product Catalog
    Execute Search Query                \${SEARCH_PRODUCT}
    Verify Search Results Display       \${SEARCH_PRODUCT}
    Apply Category Filter               Electronics
    Verify Category Filter Applied     Electronics
    Apply Price Range Filter           500                                  2000
    Verify Price Range Applied         500                                  2000
    Apply Brand Filter                  Dell
    Verify Brand Filter Applied        Dell
    Apply Rating Filter                 4
    Verify Rating Filter Applied       4
    Sort Results By Price              ascending
    Verify Sort Order Applied          price ascending
    Sort Results By Popularity         descending
    Verify Sort Order Applied          popularity descending
    Clear All Filters
    Verify Filters Cleared Successfully
    Close Browser

Test Shopping Cart Operations
    Open Browser                        \${URL}                              \${BROWSER}
    Login As Customer                   \${CUSTOMER_EMAIL}                   \${CUSTOMER_PASSWORD}
    Search For Product                  \${SEARCH_PRODUCT}
    Select First Product From Results
    Verify Product Details Page
    Select Product Specifications      16GB RAM                             1TB SSD
    Verify Specifications Selected
    Add Product To Cart                2
    Verify Cart Icon Updated           2
    Navigate To Shopping Cart
    Verify Cart Contents Display       \${SEARCH_PRODUCT}                   2
    Update Product Quantity            3
    Verify Quantity Updated            3
    Apply Discount Coupon              SAVE10
    Verify Discount Applied            10%
    Add Related Product To Cart
    Verify Multiple Products In Cart
    Remove One Product From Cart
    Verify Product Removed Successfully
    Calculate Cart Total Amount
    Verify Cart Total Calculation
    Save Cart For Later
    Verify Cart Saved Successfully
    Close Browser

Test Complete Checkout Process
    Open Browser                        \${URL}                              \${BROWSER}
    Login As Customer                   \${CUSTOMER_EMAIL}                   \${CUSTOMER_PASSWORD}
    Add Test Product To Cart           \${SEARCH_PRODUCT}                   1
    Navigate To Checkout
    Verify Checkout Page Display
    Fill Shipping Information          Calle Principal 123                  Madrid                               28001
    Select Shipping Method             Express Delivery
    Verify Shipping Cost Calculated
    Fill Billing Information           Same As Shipping
    Verify Billing Information Applied
    Select Payment Method              Credit Card
    Fill Credit Card Information       \${CREDIT_CARD}                      \${CVV}                              \${EXPIRY_DATE}
    Verify Payment Information Valid
    Apply Final Discount Code          CHECKOUT5
    Verify Final Discount Applied
    Review Order Summary
    Verify Order Total Accurate
    Accept Terms And Conditions
    Submit Order Payment
    Verify Payment Processing
    Verify Order Confirmation Page
    Capture Order Number
    Verify Order Email Sent
    Check Order Status In Account
    Verify Order Tracking Available
    Close Browser

Test Admin Product Management
    Open Browser                        \${URL}/admin                        \${BROWSER}
    Login As Admin                      \${ADMIN_EMAIL}                      \${ADMIN_PASSWORD}
    Navigate To Product Management
    Create New Product                  Robot Framework Book                 Programming                          49.99
    Upload Product Images               book_cover.jpg                       book_back.jpg
    Set Product Specifications         Author: Expert                       Pages: 300                           Language: Spanish
    Configure Product Categories       Books                                Programming                           Technology
    Set Inventory Levels               100                                  10
    Configure Shipping Options         Standard                             Express                               Free
    Set Product Visibility             Published
    Verify Product Created Successfully
    Search Created Product             Robot Framework Book
    Edit Product Information           Updated Description
    Update Product Price               44.99
    Modify Product Categories
    Update Inventory Levels            150
    Change Product Status              Featured
    Verify Product Updates Applied
    Duplicate Product For Variants
    Create Product Bundle              Bundle: RF Books                     2                                     79.99
    Set Bundle Discount Rules
    Verify Bundle Created Successfully
    Generate Product Report
    Export Product Data               CSV
    Verify Export Successful
    Close Browser

Test Order Management System
    Open Browser                        \${URL}/admin                        \${BROWSER}
    Login As Admin                      \${ADMIN_EMAIL}                      \${ADMIN_PASSWORD}
    Navigate To Order Management
    Filter Orders By Status            Pending
    Verify Pending Orders Display
    Select First Pending Order
    Review Order Details
    Verify Customer Information
    Verify Product Information
    Verify Payment Status              Paid
    Update Order Status                Processing
    Add Order Notes                    Order being prepared
    Verify Status Update Applied
    Generate Shipping Label
    Verify Shipping Label Created
    Update Order Status                Shipped
    Add Tracking Information           TRACK123456789
    Verify Tracking Added Successfully
    Send Customer Notification
    Verify Notification Sent
    Generate Order Invoice
    Verify Invoice Generated
    Update Inventory After Shipment
    Verify Inventory Updated
    Generate Daily Order Report
    Verify Report Generated
    Close Browser

Test Cross Browser Compatibility Suite
    \${browsers}=  Create List          chrome                              firefox                               edge
    FOR  \${browser}  IN  @{browsers}
        Log  Testing compatibility with \${browser}
        Open Browser                    \${URL}                              \${browser}
        Maximize Browser Window
        Execute Core User Journey       \${browser}
        Verify Browser Specific Features \${browser}
        Test Responsive Design          \${browser}
        Validate Performance Metrics    \${browser}
        Capture Browser Evidence        \${browser}
        Close Browser
    END
    Generate Cross Browser Report

Test Complete Performance Suite
    Open Browser                        \${URL}                              \${BROWSER}
    \${start_time}=  Get Current Date   epoch
    Measure Page Load Performance
    Verify Load Time Under Threshold   3
    Execute Performance Test Actions
    Monitor Memory Usage During Test
    Measure JavaScript Execution Time
    Test AJAX Response Times
    Validate Image Loading Speed
    Check CSS Rendering Performance
    Test Database Query Performance
    Measure Network Request Times
    Validate Caching Effectiveness
    Test Concurrent User Simulation
    Monitor Server Response Times
    Validate CDN Performance
    Generate Performance Report
    \${end_time}=  Get Current Date     epoch
    \${total_time}=  Evaluate          \${end_time} - \${start_time}
    Log  Performance suite completed in \${total_time} seconds
    Close Browser

*** Keywords ***
Initialize Test Environment
    Set Screenshot Directory           \${CURDIR}/screenshots
    Set Selenium Speed                 0.5s
    Log  Test environment initialized successfully

Navigate To Registration Page
    Click Element                      css=.register-link
    Wait Until Element Is Visible      css=.registration-form             10s
    Element Should Contain             css=.page-title                    Registro

Fill Registration Form
    [Arguments]  \${first_name}  \${last_name}  \${email}  \${password}
    Input Text                         id=first-name                       \${first_name}
    Input Text                         id=last-name                        \${last_name}
    Input Text                         id=email-register                   \${email}
    Input Password                     id=password-register                \${password}
    Input Password                     id=confirm-password                 \${password}

Login As Customer
    [Arguments]  \${email}  \${password}
    Click Element                      css=.login-link
    Wait Until Element Is Visible      id=email-login                      10s
    Input Text                         id=email-login                      \${email}
    Input Password                     id=password-login                   \${password}
    Click Button                       css=.login-submit
    Wait Until Element Is Visible      css=.user-dashboard                 10s

Execute Core User Journey
    [Arguments]  \${browser}
    Login As Customer                  \${CUSTOMER_EMAIL}                   \${CUSTOMER_PASSWORD}
    Search For Product                 \${SEARCH_PRODUCT}
    Add Product To Cart               1
    Navigate To Checkout
    Fill Basic Checkout Information
    Verify Checkout Process Works     \${browser}

Generate Cross Browser Report
    Log  Cross browser testing completed for all browsers
    Execute JavaScript                 console.log('Cross browser report generated')</code></pre>
        
        <h3>🎯 Proyecto integrador (12 min):</h3>
        <p>1. Implementa flujo completo de registro con validación email</p>
        <p>2. Crea sistema de búsqueda con filtros múltiples avanzados</p>
        <p>3. Desarrolla carrito de compras con operaciones CRUD completas</p>
        <p>4. Automatiza checkout con pagos y métodos de envío</p>
        <p>5. Construye panel admin con gestión de productos</p>
        <p>6. Implementa sistema de órdenes con tracking completo</p>
        <p>7. Ejecuta suite cross-browser en múltiples navegadores</p>
        <p>8. Mide performance con métricas empresariales</p>
        <p>9. Integra Page Object Model con keywords reutilizables</p>
        <p>10. Aplica data-driven testing con test data externos</p>
        <p>11. Implementa error handling robusto en todos los flujos</p>
        <p>12. Genera reportes automáticos con evidencias visuales</p>
        <p>13. Configura timeouts optimizados por tipo de operación</p>
        <p>14. Valida responsive design en múltiples resoluciones</p>
        <p>15. Crea arquitectura escalable para maintenance largo plazo</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar todo lo aprendido en SeleniumLibrary en proyecto real</li>
                <li>Crear automation enterprise-grade con arquitectura robusta</li>
                <li>Implementar testing completo de e-commerce con todos los flujos</li>
                <li>Desarrollar suite escalable con patterns de la industria</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Resource files para keywords comunes. Variables externos para test data. Suite Setup/Teardown para environment. Keywords custom para reusabilidad.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 085 - Fundamentos de CSS Selectors</h3>
        <p>¡Felicitaciones! Has completado SeleniumLibrary Fundamentos. Ahora profundizarás en CSS Selectors avanzados para localización experta de elementos.</p>
    `,
    topics: ["selenium", "project", "integration"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 15,
    difficulty: "easy",
    prerequisites: ["lesson-083"],
    type: "integration"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_084 = LESSON_084;
}