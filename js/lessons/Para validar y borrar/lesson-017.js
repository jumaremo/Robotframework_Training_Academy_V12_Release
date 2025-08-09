/**
 * Robot Framework Academy - Lesson 017 (VERSIÓN SIMPLE)
 * Test Cases y Test Suites
 */

const LESSON_017 = {
    id: 17,
    title: "Test Cases y Test Suites",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    searchTerms: "#017 robot framework test cases test suites organization structure automation",
    content: `
        <h2>🧠 Test Cases + Suites = Organización</h2>
        <p>Test Cases = tests individuales. Test Suites = colección de tests. Organización correcta = proyecto escalable y mantenible.</p>
        
        <h3>💻 Tests organización RF:</h3>
        <pre><code class="robot">*** Test Cases ***
Test Case Basic Structure
    [Documentation]    Validar estructura básica test case
    Log    🧪 Validando test case básico
    \${test_name}=    Set Variable    Test Case Basic Structure
    Should Contain    \${test_name}    Test Case
    Should Contain    \${test_name}    Structure
    Should Be True    len('\${test_name}') > 10
    Log    Test name: \${test_name}
    \${has_doc}=    Set Variable    True
    Should Be True    \${has_doc}
    Log    ✅ Test case estructura OK

Test Case With Tags
    [Documentation]    Validar test case con tags
    [Tags]    smoke    regression    critical
    Log    🏷️ Validando test case con tags
    \${tag_smoke}=    Set Variable    smoke
    \${tag_regression}=    Set Variable    regression
    \${tag_critical}=    Set Variable    critical
    Should Be Equal    \${tag_smoke}    smoke
    Should Be Equal    \${tag_regression}    regression
    Should Be Equal    \${tag_critical}    critical
    Log    Tags: \${tag_smoke}, \${tag_regression}, \${tag_critical}
    \${tags_count}=    Set Variable    3
    Should Be Equal As Numbers    \${tags_count}    3
    Log    ✅ Tags configurados correctamente

Test Case With Setup Teardown
    [Documentation]    Validar test case con setup y teardown
    [Setup]    Log    Ejecutando setup del test
    [Teardown]    Log    Ejecutando teardown del test
    Log    🔧 Validando setup y teardown
    \${setup_executed}=    Set Variable    True
    \${teardown_configured}=    Set Variable    True
    Should Be True    \${setup_executed}
    Should Be True    \${teardown_configured}
    Log    Setup: \${setup_executed}
    Log    Teardown: \${teardown_configured}
    \${lifecycle_ok}=    Set Variable    True
    Should Be True    \${lifecycle_ok}
    Log    ✅ Setup y teardown funcionando

Test Suite Organization Login
    [Documentation]    Test suite para funcionalidad login
    [Tags]    login    authentication
    Log    👤 Validando organización suite login
    \${suite_name}=    Set Variable    Login Suite
    \${functionality}=    Set Variable    authentication
    Should Contain    \${suite_name}    Login
    Should Contain    \${functionality}    auth
    Should Be Equal    \${functionality}    authentication
    Log    Suite: \${suite_name}
    Log    Functionality: \${functionality}
    \${login_tests}=    Set Variable    5
    Should Be True    \${login_tests} >= 3
    Log    Tests en suite: \${login_tests}
    Log    ✅ Login suite organizado

Test Suite Organization Shopping
    [Documentation]    Test suite para funcionalidad shopping
    [Tags]    shopping    ecommerce    cart
    Log    🛒 Validando organización suite shopping
    \${suite_shopping}=    Set Variable    Shopping Suite
    \${ecommerce_feature}=    Set Variable    cart_management
    Should Contain    \${suite_shopping}    Shopping
    Should Contain    \${ecommerce_feature}    cart
    Should Be Equal    \${ecommerce_feature}    cart_management
    Log    Suite: \${suite_shopping}
    Log    Feature: \${ecommerce_feature}
    \${shopping_tests}=    Set Variable    8
    Should Be True    \${shopping_tests} >= 5
    Log    Tests en suite: \${shopping_tests}
    Log    ✅ Shopping suite organizado

Test Suite Organization Admin
    [Documentation]    Test suite para funcionalidad admin
    [Tags]    admin    management    users
    Log    👨‍💼 Validando organización suite admin
    \${suite_admin}=    Set Variable    Admin Suite
    \${admin_feature}=    Set Variable    user_management
    Should Contain    \${suite_admin}    Admin
    Should Contain    \${admin_feature}    user
    Should Contain    \${admin_feature}    management
    Log    Suite: \${suite_admin}
    Log    Feature: \${admin_feature}
    \${admin_tests}=    Set Variable    12
    Should Be True    \${admin_tests} >= 10
    Log    Tests en suite: \${admin_tests}
    Log    ✅ Admin suite organizado

Test Cases Naming Convention
    [Documentation]    Validar convención de nombres
    Log    📝 Validando naming convention
    \${test_login}=    Set Variable    Login With Valid Credentials
    \${test_logout}=    Set Variable    Logout Successfully
    \${test_cart}=    Set Variable    Add Product To Cart
    Should Contain    \${test_login}    Login
    Should Contain    \${test_login}    Valid
    Should Contain    \${test_logout}    Logout
    Should Contain    \${test_cart}    Add Product
    Log    Login test: \${test_login}
    Log    Logout test: \${test_logout}
    Log    Cart test: \${test_cart}
    \${naming_ok}=    Set Variable    True
    Should Be True    \${naming_ok}
    Log    ✅ Naming convention correcta

Test Organization Complete
    [Documentation]    Validar organización completa
    Log    🎯 Validando organización completa
    \${total_suites}=    Set Variable    3
    \${total_tests}=    Set Variable    25
    \${organization_score}=    Set Variable    95
    Should Be Equal As Numbers    \${total_suites}    3
    Should Be True    \${total_tests} >= 20
    Should Be True    \${organization_score} >= 90
    Log    Total suites: \${total_suites}
    Log    Total tests: \${total_tests}
    Log    Organization score: \${organization_score}%
    \${well_organized}=    Set Variable    True
    Should Be True    \${well_organized}
    Log    ✅ Tests y suites bien organizados</code></pre>
        
        <h3>🎯 Práctica organización (4 min):</h3>
        <p><strong>1. Crear login_suite.robot:</strong> New File → Test suite para login</p>
        <p><strong>2. Test case básico:</strong> Login With Valid Credentials → [Documentation]</p>
        <p><strong>3. Agregar tags:</strong> [Tags] smoke login critical → Categorizar test</p>
        <p><strong>4. Setup/Teardown:</strong> [Setup] Open Browser → [Teardown] Close Browser</p>
        <p><strong>5. Múltiples tests:</strong> Login Invalid → Logout → Reset Password</p>
        <p><strong>6. Crear shopping_suite.robot:</strong> Test suite para ecommerce</p>
        <p><strong>7. Shopping tests:</strong> Add To Cart → Remove From Cart → Checkout</p>
        <p><strong>8. Tags específicos:</strong> [Tags] shopping cart ecommerce</p>
        <p><strong>9. Crear admin_suite.robot:</strong> Test suite para administración</p>
        <p><strong>10. Admin tests:</strong> Create User → Delete User → Manage Permissions</p>
        <p><strong>11. Naming convention:</strong> Verbos claros + objetivo específico</p>
        <p><strong>12. Ejecutar suite:</strong> robot login_suite.robot → Ver resultados</p>
        <p><strong>13. Ejecutar por tags:</strong> robot --include smoke . → Solo smoke tests</p>
        <p><strong>14. Ejecutar múltiples:</strong> robot *_suite.robot → Todas las suites</p>
        <p><strong>15. Organizar carpetas:</strong> tests/login/ tests/shopping/ tests/admin/</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear test cases con estructura correcta</li>
                <li>Organizar tests en suites por funcionalidad</li>
                <li>Usar tags para categorización y ejecución</li>
                <li>Aplicar naming conventions descriptivas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>1 suite = 1 funcionalidad. Tags = ejecución selectiva. Nombres descriptivos = mantenimiento fácil.</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>📋 Organización recomendada:</h4>
            <ul>
                <li><strong>Suite por feature:</strong> login_suite.robot, shopping_suite.robot</li>
                <li><strong>Tags por tipo:</strong> smoke, regression, critical</li>
                <li><strong>Naming:</strong> "Action With Context" format</li>
                <li><strong>Setup/Teardown:</strong> Browser lifecycle management</li>
            </ul>
        </div>
        
        <h3>🚀 Siguiente: Lección 018 - Keywords built-in más importantes</h3>
        <p>Con organización dominada, aprenderás los keywords esenciales de Robot Framework.</p>
    `,
    topics: ["test-cases", "test-suites", "organization"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-016"],
    estimatedTime: 5,
    difficulty: "easy"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_017 = LESSON_017;
}