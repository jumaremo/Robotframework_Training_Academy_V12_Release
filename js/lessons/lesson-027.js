const LESSON_027 = {
    id: 27,
    title: "Buenas prácticas en nomenclatura",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    content: `
        <h2>📝 Nomenclatura Práctica</h2>
        <p>Convenciones de naming para tests, keywords y variables legibles y mantenibles.</p>
        
        <h3>💻 Ejemplos Nomenclatura Robot:</h3>
        <pre><code class="robot">
*** Variables ***
# ❌ MAL: Nombres confusos
\${usr}               john_doe
\${pwd123}            secret
\${btn1}              id=submit

# ✅ BIEN: Nombres descriptivos
\${LOGIN_USERNAME}    john_doe
\${LOGIN_PASSWORD}    SecurePass123
\${SUBMIT_BUTTON}     id=submit-form-btn
\${USER_EMAIL}        user@example.com
\${EXPECTED_MESSAGE}  Login successful
\${TIMEOUT_SECONDS}   10

*** Test Cases ***
# ❌ MAL: Nombres vagos
Test 1
    Log    Test

Test User Login
    Log    Login test

# ✅ BIEN: Nombres específicos y descriptivos
User Should Login Successfully With Valid Credentials
    [Documentation]    Verify successful login with correct username and password
    [Tags]    login    smoke    critical
    Input Text    id=username    \${LOGIN_USERNAME}
    Input Text    id=password    \${LOGIN_PASSWORD}
    Click Button    \${SUBMIT_BUTTON}
    Page Should Contain    \${EXPECTED_MESSAGE}

User Should See Error Message With Invalid Credentials
    [Documentation]    Verify error message appears with wrong credentials
    [Tags]    login    negative    validation
    Input Text    id=username    invalid_user
    Input Text    id=password    wrong_password
    Click Button    \${SUBMIT_BUTTON}
    Page Should Contain    Invalid credentials

System Should Validate Required Fields On Registration Form
    [Documentation]    Verify all required field validations work correctly
    [Tags]    registration    validation    form
    Click Button    id=register-btn
    Page Should Contain    Email is required
    Page Should Contain    Password is required
    Element Should Be Visible    class=error-message

*** Keywords ***
# ❌ MAL: Keywords confusos
Login
    Log    Login

Check Page
    Page Should Contain    Text

# ✅ BIEN: Keywords descriptivos con acción clara
Open Browser And Navigate To Login Page
    [Documentation]    Opens browser and navigates to the login page
    [Arguments]    \${browser_type}=Chrome
    Open Browser    \${BASE_URL}/login    \${browser_type}
    Maximize Browser Window
    Wait Until Page Contains    Sign In

Verify User Is Successfully Logged In
    [Documentation]    Confirms user login by checking dashboard elements
    Wait Until Page Contains    Dashboard    timeout=\${TIMEOUT_SECONDS}
    Page Should Contain    Welcome back
    Element Should Be Visible    id=user-menu
    Element Should Be Visible    id=logout-btn

Fill Login Form With Credentials
    [Documentation]    Fills username and password fields with provided credentials
    [Arguments]    \${username}    \${password}
    Clear Element Text    id=username
    Input Text    id=username    \${username}
    Clear Element Text    id=password
    Input Text    id=password    \${password}
    Log    Login form filled for user: \${username}

Submit Login Form And Wait For Response
    [Documentation]    Submits login form and waits for page response
    Click Button    \${SUBMIT_BUTTON}
    Wait Until Page Does Not Contain    Loading    timeout=\${TIMEOUT_SECONDS}
    Sleep    1 second

Verify Error Message Is Displayed For Invalid Login
    [Documentation]    Checks that appropriate error message appears
    [Arguments]    \${expected_error_message}
    Wait Until Page Contains    \${expected_error_message}    timeout=\${TIMEOUT_SECONDS}
    Element Should Be Visible    class=alert-error
    Log    Error message validated: \${expected_error_message}
        </code></pre>
        
        <h3>📋 Convenciones Recomendadas:</h3>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>🎯 Test Cases:</h4>
            <ul>
                <li><strong>Formato:</strong> "Actor Should Action Expected_Result With Context"</li>
                <li><strong>Ejemplos:</strong> "User Should Login Successfully With Valid Credentials"</li>
                <li><strong>Evitar:</strong> "Test 1", "Login Test", "Check Something"</li>
            </ul>
            
            <h4>🔧 Keywords:</h4>
            <ul>
                <li><strong>Formato:</strong> "Action Object With Context" o "Verify State Condition"</li>
                <li><strong>Ejemplos:</strong> "Open Browser And Navigate", "Verify User Is Logged In"</li>
                <li><strong>Evitar:</strong> "Login", "Check", "Do Something"</li>
            </ul>
            
            <h4>📊 Variables:</h4>
            <ul>
                <li><strong>Formato:</strong> "\${CONSTANT_DESCRIPTIVE_NAME}" para constantes</li>
                <li><strong>Ejemplos:</strong> "\${LOGIN_USERNAME}", "\${EXPECTED_ERROR_MESSAGE}"</li>
                <li><strong>Evitar:</strong> "\${usr}", "\${pwd}", "\${btn1}"</li>
            </ul>
        </div>
        
        <h3>🎯 Práctica Nomenclatura (4 min):</h3>
        <ol>
            <li><strong>Revisar test names:</strong> Identificar test cases con nombres vagos como "Test 1" o "Login Test"</li>
            <li><strong>Reescribir descriptivamente:</strong> Cambiar a formato "Actor Should Action Expected_Result"</li>
            <li><strong>Keywords específicos:</strong> Transformar "Login" en "Fill Login Form With Valid Credentials"</li>
            <li><strong>Variables constantes:</strong> Cambiar \${usr} por \${LOGIN_USERNAME} más descriptivo</li>
            <li><strong>Documentation obligatoria:</strong> Agregar [Documentation] a todos los keywords y test cases</li>
            <li><strong>Tags descriptivos:</strong> Usar tags como "smoke", "regression", "critical" en lugar de "test1"</li>
            <li><strong>Arguments descriptivos:</strong> Nombrar argumentos como \${username} vs \${u} o \${param1}</li>
            <li><strong>File naming:</strong> Usar nombres como "login_tests.robot" vs "test1.robot"</li>
            <li><strong>Resource naming:</strong> Llamar "login_keywords.resource" vs "keywords.resource"</li>
            <li><strong>Suite naming:</strong> Usar "User Authentication Tests" vs "Login Tests"</li>
            <li><strong>Locator variables:</strong> \${LOGIN_BUTTON} vs \${BTN1} para selectores</li>
            <li><strong>Error messages:</strong> \${INVALID_CREDENTIALS_ERROR} vs \${ERR_MSG}</li>
            <li><strong>Consistency check:</strong> Verificar que misma convención se usa en todo el proyecto</li>
            <li><strong>Refactoring practice:</strong> Tomar test existente y aplicar todas las convenciones</li>
            <li><strong>Team standards:</strong> Crear documento de convenciones para el equipo de QA</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Aplicar convenciones de nomenclatura claras para test cases y keywords</li>
                <li>Crear variables descriptivas que mejoren legibilidad del código</li>
                <li>Implementar documentation y tags sistemáticos para organización</li>
                <li>Establecer estándares de naming consistentes para todo el proyecto</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Un buen test case name debe explicar qué hace sin necesidad de leer el código. Usa "Actor Should Action Expected_Result With Context" como template guía.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 028 - Estructura de proyectos medianos</h3>
        <p>Con nomenclatura sólida establecida, aprenderemos a organizar proyectos Robot Framework de tamaño mediano con múltiples suites, resources y estructuras escalables.</p>
    `,
    topics: ["naming", "conventions", "best-practices"],
    hasCode: false,
    hasExercise: false,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-026"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_027 = LESSON_027;
}