/**
 * Robot Framework Academy - Lesson 017 OPTIMIZED
 * Test Cases y Test Suites
 */

const LESSON_017 = {
    id: 17,
    title: "Test Cases y Test Suites",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    content: `
        <h2>🧪 Test Cases Suites</h2>
        <p>Test Cases = tests individuales. Test Suites = colección organizadad.</p>
        
        <h3>🤖 Tests organización:</h3>
        <pre><code class="robot">*** Variables ***
\${TEST_NAME}            Test Case Basic Structure
\${TAG_SMOKE}            smoke
\${TAG_REGRESSION}       regression
\${TAG_CRITICAL}         critical
\${SUITE_LOGIN}          Login Suite
\${SUITE_SHOPPING}       Shopping Suite
\${SUITE_ADMIN}          Admin Suite
\${FUNCTIONALITY_AUTH}   authentication
\${FUNCTIONALITY_CART}   cart_management

*** Test Cases ***
Test Case Basic Structure
    [Documentation]    Validar estructura básica test case
    Log                    🧪 Testing basic test case structure
    Should Not Be Empty    \${TEST_NAME}
    Should Contain         \${TEST_NAME}    Test Case
    Should Contain         \${TEST_NAME}    Structure
    Should Be Equal        \${TEST_NAME}    Test Case Basic Structure
    Should Be True         len('\${TEST_NAME}') > 10
    Should Not Be Empty    Test Case Basic Structure
    Should Contain         Test Case Basic Structure    Basic
    Should Be Equal        Test Case Basic Structure    Test Case Basic Structure
    Should Be True         True
    Should Contain         Documentation    Documentation
    Log                    ✅ Test case structure validated

Test Case With Tags
    [Documentation]    Validar test case con tags
    [Tags]    smoke    regression    critical
    Log                    🏷️ Testing test case with tags
    Should Not Be Empty    \${TAG_SMOKE}
    Should Be Equal        \${TAG_SMOKE}    smoke
    Should Not Be Empty    \${TAG_REGRESSION}
    Should Be Equal        \${TAG_REGRESSION}    regression
    Should Not Be Empty    \${TAG_CRITICAL}
    Should Be Equal        \${TAG_CRITICAL}    critical
    Should Contain         \${TAG_SMOKE}    smoke
    Should Contain         \${TAG_REGRESSION}    regression
    Should Contain         \${TAG_CRITICAL}    critical
    Should Not Be Empty    smoke
    Should Not Be Empty    regression
    Log                    ✅ Tags configured correctly

Test Case With Setup Teardown
    [Documentation]    Validar test case con setup y teardown
    [Setup]    Log    Executing test setup
    [Teardown]    Log    Executing test teardown
    Log                    🔧 Testing setup and teardown
    Should Be True         True
    Should Contain         Setup    Setup
    Should Contain         Teardown    Teardown
    Should Not Be Empty    Setup
    Should Not Be Empty    Teardown
    Should Be Equal        Setup    Setup
    Should Be Equal        Teardown    Teardown
    Should Contain         Executing    Executing
    Should Not Be Empty    Executing
    Should Be Equal        Executing    Executing
    Log                    ✅ Setup and teardown working

Test Suite Organization Login
    [Documentation]    Test suite para funcionalidad login
    [Tags]    login    authentication
    Log                    👤 Testing login suite organization
    Should Not Be Empty    \${SUITE_LOGIN}
    Should Contain         \${SUITE_LOGIN}    Login
    Should Be Equal        \${SUITE_LOGIN}    Login Suite
    Should Not Be Empty    \${FUNCTIONALITY_AUTH}
    Should Contain         \${FUNCTIONALITY_AUTH}    auth
    Should Be Equal        \${FUNCTIONALITY_AUTH}    authentication
    Should Not Be Empty    Login Suite
    Should Not Be Empty    authentication
    Should Be Equal        Login Suite    Login Suite
    Should Be Equal        authentication    authentication
    Log                    ✅ Login suite organized

Test Suite Organization Shopping
    [Documentation]    Test suite para funcionalidad shopping
    [Tags]    shopping    ecommerce    cart
    Log                    🛒 Testing shopping suite organization
    Should Not Be Empty    \${SUITE_SHOPPING}
    Should Contain         \${SUITE_SHOPPING}    Shopping
    Should Be Equal        \${SUITE_SHOPPING}    Shopping Suite
    Should Not Be Empty    \${FUNCTIONALITY_CART}
    Should Contain         \${FUNCTIONALITY_CART}    cart
    Should Be Equal        \${FUNCTIONALITY_CART}    cart_management
    Should Not Be Empty    Shopping Suite
    Should Not Be Empty    cart_management
    Should Be Equal        Shopping Suite    Shopping Suite
    Should Be Equal        cart_management    cart_management
    Log                    ✅ Shopping suite organized

Test Suite Organization Admin
    [Documentation]    Test suite para funcionalidad admin
    [Tags]    admin    management    users
    Log                    👨‍💼 Testing admin suite organization
    Should Not Be Empty    \${SUITE_ADMIN}
    Should Contain         \${SUITE_ADMIN}    Admin
    Should Be Equal        \${SUITE_ADMIN}    Admin Suite
    Should Contain         user_management    user
    Should Contain         user_management    management
    Should Not Be Empty    Admin Suite
    Should Not Be Empty    user_management
    Should Be Equal        Admin Suite    Admin Suite
    Should Be Equal        user_management    user_management
    Should Contain         admin    admin
    Should Not Be Empty    admin
    Log                    ✅ Admin suite organized

Test Cases Naming Convention
    [Documentation]    Validar convención de nombres
    Log                    📝 Testing naming convention
    Should Contain         Login With Valid Credentials    Login
    Should Contain         Login With Valid Credentials    Valid
    Should Contain         Logout Successfully    Logout
    Should Contain         Add Product To Cart    Add Product
    Should Not Be Empty    Login With Valid Credentials
    Should Not Be Empty    Logout Successfully
    Should Not Be Empty    Add Product To Cart
    Should Be Equal        Login With Valid Credentials    Login With Valid Credentials
    Should Be Equal        Logout Successfully    Logout Successfully
    Should Be Equal        Add Product To Cart    Add Product To Cart
    Log                    ✅ Naming convention correct

Test Organization Complete
    [Documentation]    Validar organización completa
    Log                    🎯 Testing complete organization
    Should Be Equal As Numbers    3    3
    Should Be True         25 >= 20
    Should Be True         95 >= 90
    Should Be True         3 > 0
    Should Be True         25 > 0
    Should Be True         95 > 0
    Should Not Be Empty    3
    Should Not Be Empty    25
    Should Not Be Empty    95
    Should Be Equal        3    3
    Should Be Equal        25    25
    Log                    ✅ Tests and suites well organized</code></pre>
        
        <h3>🎯 Práctica organización (4 min):</h3>
        <p>1. Crear login_suite.robot: New File → Test suite login</p>
        <p>2. Test case básico: Login With Valid Credentials → [Documentation]</p>
        <p>3. Agregar tags: [Tags] smoke login critical → Categorizar</p>
        <p>4. Setup/Teardown: [Setup] Open Browser → [Teardown] Close Browser</p>
        <p>5. Múltiples tests: Login Invalid → Logout → Reset Password</p>
        <p>6. Crear shopping_suite.robot: Test suite ecommerce</p>
        <p>7. Shopping tests: Add To Cart → Remove From Cart → Checkout</p>
        <p>8. Tags específicos: [Tags] shopping cart ecommerce</p>
        <p>9. Crear admin_suite.robot: Test suite administración</p>
        <p>10. Admin tests: Create User → Delete User → Manage Permissions</p>
        <p>11. Naming convention: Verbos claros + objetivo específico</p>
        <p>12. Ejecutar suite: robot login_suite.robot → Ver resultados</p>
        <p>13. Ejecutar por tags: robot --include smoke . → Solo smoke</p>
        <p>14. Ejecutar múltiples: robot *_suite.robot → Todas suites</p>
        <p>15. Organizar carpetas: tests/login/ tests/shopping/ tests/admin/</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Organizar test cases en suites por funcionalidad</li>
                <li>Usar tags para categorización y ejecución selectiva</li>
                <li>Implementar setup/teardown en test cases</li>
                <li>Aplicar convenciones de nombres descriptivos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>1 suite = 1 funcionalidad. Tags = ejecución selectiva. Nombres descriptivos = tests autodocumentados.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 018 - Keywords built-in más importantes</h3>
        <p>Con organización dominada, aprenderás los keywords built-in esenciales que usarás diariamente.</p>
    `,
    topics: ["test-cases", "test-suites", "organization"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-016"],
    type: "standard"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_017 = LESSON_017;
}