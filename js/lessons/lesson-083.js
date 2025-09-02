/**
 * Robot Framework Academy - Lesson 083
 * Best practices SeleniumLibrary
 */

const LESSON_083 = {
    id: 83,
    title: "Best practices SeleniumLibrary",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Mejores Prácticas</h2>
        <p>Implementa patrones probados, arquitecturas robustas y estándares de la industria para crear automation de calidad empresarial con SeleniumLibrary.</p>
        
        <h3>💻 Patrones enterprise:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://bestpractices-demo.com
\${BROWSER}             chrome
\${BASE_TIMEOUT}        10s
\${FAST_TIMEOUT}        3s
\${SLOW_TIMEOUT}        30s
\${TEST_DATA_FILE}      \${CURDIR}/data/test_data.yaml
\${PAGE_LOAD_TIMEOUT}   20s
\${ELEMENT_TIMEOUT}     5s

*** Test Cases ***
Test Page Object Model Implementation
    Open Browser                    \${URL}                              \${BROWSER}
    Set Selenium Timeout            \${BASE_TIMEOUT}
    Set Selenium Implicit Wait      \${ELEMENT_TIMEOUT}
    Login To Application            admin@test.com                       secure123
    Navigate To Dashboard
    Verify Dashboard Elements Visible
    Navigate To Products Section
    Search For Product              Robot Framework Guide
    Verify Product Search Results   Robot Framework Guide
    Add Product To Cart             Robot Framework Guide
    Verify Cart Updated Successfully
    Navigate To Checkout
    Complete Purchase Process       Test Purchase
    Verify Order Confirmation
    Logout From Application
    Close Browser

Test Robust Wait Strategies
    Open Browser                    \${URL}                              \${BROWSER}
    Wait Until Page Is Ready
    Element Should Be Visible       css=.main-content
    Wait For Ajax To Complete
    Element Should Be Visible       css=.ajax-content
    Wait For Page Load Complete
    Element Should Contain          css=.page-status                    loaded
    Wait For Element Clickable      css=.action-button                 \${ELEMENT_TIMEOUT}
    Click Element                   css=.action-button
    Wait For Loading To Disappear   css=.loading-spinner               \${BASE_TIMEOUT}
    Element Should Be Visible       css=.action-result
    Wait For Animation Complete     css=.animated-element
    Element Should Be Visible       css=.animation-finished
    Close Browser

Test Data Driven Architecture
    Open Browser                    \${URL}                              \${BROWSER}
    \${test_users}=  Load Test Data  users
    FOR  \${user}  IN  @{test_users}
        Login With User Data        \${user}[email]                     \${user}[password]
        Verify User Role Access     \${user}[role]
        Perform User Specific Actions  \${user}[actions]
        Verify Expected Results     \${user}[expected_results]
        Logout And Reset Session
    END
    \${test_products}=  Load Test Data  products
    FOR  \${product}  IN  @{test_products}
        Search For Product          \${product}[name]
        Verify Product Details      \${product}[details]
        Verify Product Price        \${product}[price]
        Verify Product Availability \${product}[stock_status]
    END
    Close Browser

Test Error Recovery Patterns
    Open Browser                    \${URL}                              \${BROWSER}
    \${login_success}=  Run Keyword And Return Status  Login To Application  invalid@test.com  wrongpass
    Run Keyword If  not \${login_success}  Handle Login Failure
    \${navigation_success}=  Run Keyword And Return Status  Navigate To Protected Area
    Run Keyword If  not \${navigation_success}  Handle Navigation Failure
    \${form_success}=  Run Keyword And Return Status  Submit Critical Form  test data
    Run Keyword If  not \${form_success}  Handle Form Submission Failure
    \${data_success}=  Run Keyword And Return Status  Verify Critical Data Present
    Run Keyword If  not \${data_success}  Handle Data Verification Failure
    Element Should Be Visible       css=.error-recovery-complete
    Close Browser

Test Performance Optimized Execution
    \${start_time}=  Get Current Date  epoch
    Open Browser                    \${URL}                              \${BROWSER}
    Set Window Size                 1920                                1080
    Execute JavaScript              document.readyState
    \${page_load_time}=  Measure Page Load Time
    Should Be True                  \${page_load_time} < \${PAGE_LOAD_TIMEOUT}
    \${elements}=  Get WebElements Efficiently  css=.batch-process-element
    Process Elements In Batch       \${elements}
    \${batch_time}=  Measure Batch Processing Time
    Log                            Batch processing completed in \${batch_time}ms
    Execute Parallel Operations
    \${end_time}=  Get Current Date  epoch
    \${total_time}=  Evaluate       \${end_time} - \${start_time}
    Log                            Total test execution time: \${total_time}s
    Close Browser

Test Cross Browser Compatibility
    \${browsers}=  Create List      chrome                              firefox    edge
    FOR  \${browser}  IN  @{browsers}
        Open Browser                \${URL}                              \${browser}
        Set Browser Specific Options  \${browser}
        Execute Cross Browser Test Suite
        Verify Browser Specific Features  \${browser}
        Capture Browser Evidence    \${browser}
        Validate Responsive Behavior \${browser}
        Close Browser
    END
    Generate Compatibility Report

Test Maintenance Best Practices
    Open Browser                    \${URL}                              \${BROWSER}
    Verify Page Elements Structure
    Check For Deprecated Selectors
    Validate Accessibility Standards
    Test Keyboard Navigation
    Verify Screen Reader Compatibility
    Check Color Contrast Compliance
    Validate Form Labels And ARIA
    Test Mobile Responsiveness
    Verify Performance Metrics
    Check Security Headers
    Validate SSL Certificate
    Test Error Page Handling
    Verify Analytics Integration
    Check SEO Optimization
    Generate Maintenance Report
    Close Browser

Test Comprehensive Suite Pattern
    Setup Test Environment
    \${test_suite_data}=  Load Complete Test Suite Data
    Execute Smoke Tests
    Element Should Be Visible       css=.smoke-tests-passed
    Execute Regression Test Suite   \${test_suite_data}[regression]
    Element Should Be Visible       css=.regression-tests-passed
    Execute Integration Tests       \${test_suite_data}[integration]
    Element Should Be Visible       css=.integration-tests-passed
    Execute Performance Tests       \${test_suite_data}[performance]
    Element Should Be Visible       css=.performance-tests-passed
    Execute Security Tests          \${test_suite_data}[security]
    Element Should Be Visible       css=.security-tests-passed
    Generate Comprehensive Report
    Cleanup Test Environment

*** Keywords ***
Login To Application
    [Arguments]    \${email}    \${password}
    Wait Until Element Is Visible   id=email-field                     \${ELEMENT_TIMEOUT}
    Input Text                      id=email-field                     \${email}
    Input Password                  id=password-field                   \${password}
    Click Button                    css=.login-submit
    Wait For Page Load Complete

Navigate To Dashboard
    Wait Until Element Is Clickable  css=.dashboard-link                \${ELEMENT_TIMEOUT}
    Click Element                   css=.dashboard-link
    Wait Until Page Contains        Dashboard                           \${BASE_TIMEOUT}

Wait Until Page Is Ready
    Wait Until Keyword Succeeds     \${BASE_TIMEOUT}  1s  Execute JavaScript  return document.readyState === 'complete'
    
Wait For Ajax To Complete
    Wait Until Keyword Succeeds     \${BASE_TIMEOUT}  1s  Execute JavaScript  return jQuery.active === 0

Load Test Data
    [Arguments]    \${data_type}
    \${data}=  Execute JavaScript   return fetch('/api/test-data/\${data_type}').then(r => r.json())
    [Return]  \${data}</code></pre>
        
        <h3>🎯 Práctica best practices (5 min):</h3>
        <p>1. Implementa Page Object Model con keywords reutilizables</p>
        <p>2. Usa Set Selenium Timeout + Set Selenium Implicit Wait apropiados</p>
        <p>3. Practica Wait Until Keyword Succeeds para robustez</p>
        <p>4. Combina Load Test Data con data-driven testing</p>
        <p>5. Usa Run Keyword And Return Status para error handling</p>
        <p>6. Practica FOR loops con múltiples browsers para compatibility</p>
        <p>7. Combina Get Current Date epoch para performance measurement</p>
        <p>8. Usa Execute JavaScript para validaciones avanzadas</p>
        <p>9. Practica Get WebElements con processing batch eficiente</p>
        <p>10. Combina keywords custom con [Arguments] para reutilización</p>
        <p>11. Usa Should Be True para validaciones de performance</p>
        <p>12. Practica Create List para test data estructurado</p>
        <p>13. Combina Generate Report patterns para documentación</p>
        <p>14. Usa Wait Until Element Is Clickable antes de interactions</p>
        <p>15. Crea architecture completa con separation of concerns</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar Page Object Model y arquitecturas enterprise</li>
                <li>Aplicar estrategias robustas de waits y error handling</li>
                <li>Crear automation data-driven y cross-browser compatible</li>
                <li>Establecer patrones de mantenimiento y performance optimization</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Page Object Model mejora mantenimiento. Wait strategies robustas previenen flakiness. Data-driven testing aumenta cobertura. Keywords custom promueven reutilización.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 084 - Proyecto web automation completo</h3>
        <p>Ahora aplicarás todo lo aprendido en un proyecto integrador completo que demuestra dominio total de SeleniumLibrary para automation empresarial.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-082"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_083 = LESSON_083;
}