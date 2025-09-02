/**
 * Robot Framework Academy - Lesson 153
 * Data-Driven 153
 */

const LESSON_153 = {
    id: 153,
    title: "Data-Driven 153",
    duration: "7 min",
    level: "intermediate",
    section: "section-11",
    content: `
        <h2>🏭 Generación Dinámica</h2>
        <p>Crea test data automáticamente usando templates y factories para testing masivo.</p>
        
        <h3>💻 Tests Dinámicos:</h3>
        <pre><code class="robot">*** Settings ***
Library    Collections
Library    DateTime
Library    String
Library    RequestsLibrary
Library    DatabaseLibrary
Library    SeleniumLibrary

*** Variables ***
\${API_URL}          https://api.testdata.com/v1
\${DB_CONNECTION}    mysql://user:pass@localhost:3306/testdb
\${BROWSER}          chrome
\${BASE_URL}         https://app-test.com
\${GENERATED_USERS}  \${EMPTY}
\${TIMESTAMP}        \${EMPTY}
\${TEST_SESSION}     \${EMPTY}

*** Test Cases ***
Generate Dynamic Test Users
    [Documentation]    Genera usuarios únicos para cada ejecución
    [Tags]             dynamic    generation    data-factory
    
    \${timestamp}=       Get Current Date    result_format=%Y%m%d_%H%M%S
    Set Global Variable  \${TIMESTAMP}       \${timestamp}
    Set Global Variable  \${TEST_SESSION}    session_\${timestamp}
    
    \${users_list}=      Create List
    
    FOR    \${index}    IN RANGE    1    6
        \${username}=        Evaluate    f"user_\${TIMESTAMP}_{\${index}:03d}"
        \${email}=          Evaluate    f"\${username}@testdata.com"
        \${password}=       Generate Random String    12    [LETTERS][NUMBERS]
        \${first_name}=     Generate Random String    8     [LETTERS]
        \${last_name}=      Generate Random String    10    [LETTERS]
        \${phone}=          Evaluate    f"+1555{random.randint(1000000, 9999999)}"    modules=random
        
        \${user_data}=      Create Dictionary
        ...    username=\${username}
        ...    email=\${email}
        ...    password=\${password}
        ...    first_name=\${first_name}
        ...    last_name=\${last_name}
        ...    phone=\${phone}
        ...    role=standard_user
        
        Append To List      \${users_list}    \${user_data}
        Log    ✓ Usuario generado: \${username}
    END
    
    Set Global Variable  \${GENERATED_USERS}    \${users_list}
    
    Length Should Be     \${GENERATED_USERS}    5
    Log    ✓ Total usuarios dinámicos: \${len(\${GENERATED_USERS})}

API-Driven Test Data Creation
    [Documentation]    Crea datos via API para testing
    [Tags]             api-driven    rest    data-creation
    
    Create Session      testapi    \${API_URL}
    
    FOR    \${user}    IN    @{GENERATED_USERS}
        \${payload}=        Create Dictionary
        ...    username=\${user.username}
        ...    email=\${user.email}
        ...    firstName=\${user.first_name}
        ...    lastName=\${user.last_name}
        ...    phone=\${user.phone}
        ...    session=\${TEST_SESSION}
        
        \${response}=       POST On Session    testapi    /users    json=\${payload}
        Status Should Be    201    \${response}
        
        \${user_id}=        Get From Dictionary    \${response.json()}    id
        Set To Dictionary   \${user}    api_id    \${user_id}
        
        Log    ✓ Usuario API creado: \${user.username} (ID: \${user_id})
    END
    
    Log    ✓ Todos los usuarios creados via API

Database-Driven Validation
    [Documentation]    Valida datos generados contra database
    [Tags]             database    validation    sql
    
    Connect To Database    pymysql    testdb    testuser    testpass    localhost    3306
    
    FOR    \${user}    IN    @{GENERATED_USERS}
        \${query}=          Set Variable
        ...    SELECT COUNT(*) FROM users WHERE username='\${user.username}' AND session_id='\${TEST_SESSION}'
        
        \${count}=          Query    \${query}
        Should Be Equal As Numbers    \${count[0][0]}    1
        
        \${user_query}=     Set Variable
        ...    SELECT id, email, first_name, last_name FROM users WHERE username='\${user.username}'
        
        \${db_user}=        Query    \${user_query}
        Should Be Equal     \${db_user[0][1]}    \${user.email}
        Should Be Equal     \${db_user[0][2]}    \${user.first_name}
        Should Be Equal     \${db_user[0][3]}    \${user.last_name}
        
        Log    ✓ Usuario validado en DB: \${user.username}
    END
    
    Disconnect From Database
    Log    ✓ Validación database completada

End-to-End Dynamic Testing
    [Documentation]    Test completo con datos generados dinámicamente
    [Tags]             e2e    dynamic    integration
    
    Open Browser        \${BASE_URL}/register    \${BROWSER}
    
    FOR    \${user}    IN    @{GENERATED_USERS}
        Go To               \${BASE_URL}/register
        
        Input Text          id=reg-username     \${user.username}
        Input Text          id=reg-email        \${user.email}
        Input Password      id=reg-password     \${user.password}
        Input Text          id=reg-firstname    \${user.first_name}
        Input Text          id=reg-lastname     \${user.last_name}
        Input Text          id=reg-phone        \${user.phone}
        
        Click Button        id=register-btn
        Wait Until Page Contains    Registration successful
        
        Page Should Contain \${user.username}
        Page Should Contain \${user.email}
        
        # Test login inmediatamente
        Go To               \${BASE_URL}/login
        Input Text          id=username         \${user.username}
        Input Password      id=password         \${user.password}
        Click Button        id=login-btn
        
        Wait Until Page Contains    Welcome \${user.first_name}
        Page Should Contain         Dashboard
        Location Should Be          \${BASE_URL}/dashboard
        
        Click Link          Logout
        Wait Until Page Contains Element    id=username
        
        Log    ✓ E2E completo: \${user.username}
    END
    
    Close Browser
    Log    ✓ Testing E2E dinámico completado

Cleanup Generated Data
    [Documentation]    Limpia datos de prueba generados
    [Tags]             cleanup    teardown    data-management
    
    # Cleanup via API
    Create Session      testapi    \${API_URL}
    
    FOR    \${user}    IN    @{GENERATED_USERS}
        \${response}=       DELETE On Session    testapi    /users/\${user.api_id}
        Status Should Be    204    \${response}
        Log    ✓ Usuario API eliminado: \${user.username}
    END
    
    # Cleanup via Database
    Connect To Database    pymysql    testdb    testuser    testpass    localhost    3306
    \${cleanup_query}=     Set Variable    DELETE FROM users WHERE session_id='\${TEST_SESSION}'
    Execute Sql String     \${cleanup_query}
    Disconnect From Database
    
    Log    ✓ Cleanup completado para sesión: \${TEST_SESSION}</code></pre>
        
        <h3>🎯 Práctica Dinámica (5 min):</h3>
        <p>1. Instala librerías: <code>pip install pymysql requests faker</code></p>
        <p>2. Ejecuta "Generate Dynamic Test Users" y observa usuarios únicos generados</p>
        <p>3. Configura conexión a base de datos de prueba local</p>
        <p>4. Modifica generación para incluir roles diferentes (admin, user, guest)</p>
        <p>5. Agrega validación de formato de email y teléfono generados</p>
        <p>6. Crea test que genere productos dinámicos con precios aleatorios</p>
        <p>7. Experimenta con "API-Driven Test Data Creation" usando API mock</p>
        <p>8. Implementa generación de datos de tarjetas de crédito válidas</p>
        <p>9. Crea factory para generar direcciones completas con coordenadas</p>
        <p>10. Agrega timestamp unique para evitar conflictos en ejecuciones paralelas</p>
        <p>11. Implementa cleanup automático que se ejecute siempre</p>
        <p>12. Practica error handling cuando generación de datos falla</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Generar test data únicos automáticamente en cada ejecución</li>
                <li>Implementar factories de datos usando templates dinámicos</li>
                <li>Crear datos via API y validar contra base de datos</li>
                <li>Gestionar lifecycle completo de test data (crear, usar, limpiar)</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa timestamps en datos generados para garantizar unicidad y facilitar cleanup automático.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 154 - Data-Driven 154</h3>
        <p>Aprenderás técnicas de performance testing con datasets masivos y optimización de test data para ejecución en paralelo.</p>
    `,
    topics: ["data-driven", "excel", "csv"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-152"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_153 = LESSON_153;
}