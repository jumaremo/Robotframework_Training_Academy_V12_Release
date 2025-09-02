/**
 * Robot Framework Academy - Lesson 150
 * Data-Driven 150
 */

const LESSON_150 = {
    id: 150,
    title: "Data-Driven 150",
    duration: "7 min",
    level: "intermediate",
    section: "section-11",
    content: `
        <h2>🌐 APIs Datos Dinámicos</h2>
        <p>Generar datasets desde APIs en tiempo real para testing dinámico y validación de datos actualizados.</p>
        
        <h3>💻 Tests API dinámicos:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    SeleniumLibrary
Library    DateTime

*** Variables ***
\${API_BASE}         https://jsonplaceholder.typicode.com
\${TEST_API}         https://reqres.in/api
\${LOCAL_API}        http://localhost:3000/api
\${USERS_ENDPOINT}   /users
\${POSTS_ENDPOINT}   /posts

*** Test Cases ***
Generate Dynamic User Data
    [Documentation]    Obtener usuarios desde API para testing
    Create Session    jsonapi    \${API_BASE}
    \${response}=    GET On Session    jsonapi    \${USERS_ENDPOINT}
    Should Be Equal As Numbers    \${response.status_code}    200
    
    \${users}=    Set Variable    \${response.json()}
    Length Should Be    \${users}    10
    
    FOR    \${user}    IN    @{users}
        \${user_id}=     Get From Dictionary    \${user}    id
        \${username}=    Get From Dictionary    \${user}    username
        \${email}=       Get From Dictionary    \${user}    email
        \${name}=        Get From Dictionary    \${user}    name
        
        Should Not Be Empty    \${username}
        Should Contain    \${email}    @
        Should Be True    \${user_id} > 0
        
        Test User Login With API Data    \${username}    \${email}    \${name}
    END

Test User Login With API Data
    [Arguments]    \${username}    \${email}    \${name}
    Open Browser    http://demo-app.com/login    chrome
    Input Text     id=username    \${username}
    Input Text     id=email       \${email}
    Click Button   Login
    
    # Simular validación con datos API
    Run Keyword And Continue On Failure    Page Should Contain    \${name}
    Capture Page Screenshot    login_\${username}.png
    Close Browser

Dynamic Post Validation
    [Documentation]    Validar posts desde API dinámicamente
    Create Session    jsonapi    \${API_BASE}
    \${posts_response}=    GET On Session    jsonapi    \${POSTS_ENDPOINT}
    Should Be Equal As Numbers    \${posts_response.status_code}    200
    
    \${posts}=    Set Variable    \${posts_response.json()}
    \${sample_posts}=    Get Slice From List    \${posts}    0    5
    
    FOR    \${post}    IN    @{sample_posts}
        \${post_id}=    Get From Dictionary    \${post}    id
        \${title}=      Get From Dictionary    \${post}    title
        \${body}=       Get From Dictionary    \${post}    body
        \${user_id}=    Get From Dictionary    \${post}    userId
        
        Should Be True    \${post_id} > 0
        Should Not Be Empty    \${title}
        Should Not Be Empty    \${body}
        Length Should Be At Least    \${title}    5
        
        Validate Post In UI    \${post_id}    \${title}    \${body}
    END

Validate Post In UI
    [Arguments]    \${post_id}    \${title}    \${body}
    Open Browser    http://demo-app.com/posts    chrome
    Input Text     id=search    \${post_id}
    Click Button   Search
    Page Should Contain    \${title}
    Page Should Contain    \${body}
    Close Browser

Real Time Data Testing
    [Documentation]    Testing con datos generados en tiempo real
    Create Session    reqres    \${TEST_API}
    
    # Crear usuario dinámicamente
    \${timestamp}=    Get Current Date    result_format=%Y%m%d%H%M%S
    \${dynamic_user}=    Create Dictionary
    ...    name=TestUser_\${timestamp}
    ...    job=QA Engineer
    ...    email=test_\${timestamp}@example.com
    
    \${create_response}=    POST On Session    reqres    /users    json=\${dynamic_user}
    Should Be Equal As Numbers    \${create_response.status_code}    201
    
    \${created_user}=    Set Variable    \${create_response.json()}
    \${new_user_id}=     Get From Dictionary    \${created_user}    id
    \${new_name}=        Get From Dictionary    \${created_user}    name
    
    Should Not Be Empty    \${new_user_id}
    Should Be Equal    \${new_name}    TestUser_\${timestamp}
    
    # Usar datos creados para testing UI
    Test Created User In UI    \${new_user_id}    \${new_name}    \${created_user}[email]

Test Created User In UI
    [Arguments]    \${user_id}    \${name}    \${email}
    Open Browser    http://demo-app.com/admin    chrome
    Input Text     id=admin_user    admin
    Input Text     id=admin_pass    admin123
    Click Button   Login
    
    Click Link     Users
    Input Text     id=search_user    \${user_id}
    Click Button   Search
    Page Should Contain    \${name}
    Page Should Contain    \${email}
    Close Browser

Data Synchronization Test
    [Documentation]    Sincronizar datos entre API y UI
    Create Session    local    \${LOCAL_API}
    
    # Obtener estado actual
    \${current_data}=    GET On Session    local    /users/1
    Should Be Equal As Numbers    \${current_data.status_code}    200
    \${user_data}=    Set Variable    \${current_data.json()}
    
    \${original_name}=    Get From Dictionary    \${user_data}    name
    \${original_email}=   Get From Dictionary    \${user_data}    email
    
    # Actualizar via API
    \${updated_data}=    Create Dictionary
    ...    name=Updated_\${original_name}
    ...    email=updated_\${original_email}
    
    \${update_response}=    PUT On Session    local    /users/1    json=\${updated_data}
    Should Be Equal As Numbers    \${update_response.status_code}    200
    
    # Verificar cambios en UI
    Open Browser    http://localhost:3000/profile    chrome
    Reload Page
    Page Should Contain    Updated_\${original_name}
    Page Should Contain    updated_\${original_email}
    
    # Restaurar estado original
    \${restore_response}=    PUT On Session    local    /users/1    json=\${user_data}
    Should Be Equal As Numbers    \${restore_response.status_code}    200
    Close Browser

Bulk API Data Testing
    [Documentation]    Procesar datos masivos desde múltiples APIs
    @{api_endpoints}=    Create List    \${API_BASE}/users    \${API_BASE}/posts    \${API_BASE}/albums
    @{data_types}=       Create List    users                 posts                 albums
    
    FOR    \${endpoint}    \${data_type}    IN ZIP    \${api_endpoints}    \${data_types}
        Create Session    bulk_session    \${endpoint}
        \${bulk_response}=    GET On Session    bulk_session    ""
        Should Be Equal As Numbers    \${bulk_response.status_code}    200
        
        \${bulk_data}=    Set Variable    \${bulk_response.json()}
        \${data_count}=   Get Length    \${bulk_data}
        Should Be True    \${data_count} > 0
        
        Log    \${data_type}: \${data_count} records
        
        # Procesar sample de datos
        \${sample_size}=    Set Variable If    \${data_count} > 3    3    \${data_count}
        \${sample_data}=    Get Slice From List    \${bulk_data}    0    \${sample_size}
        
        FOR    \${item}    IN    @{sample_data}
            \${item_id}=    Get From Dictionary    \${item}    id
            Should Be True    \${item_id} > 0
            Log    Processing \${data_type} ID: \${item_id}
        END
    END</code></pre>
        
        <h3>🎯 Práctica API Dinámico (5 min):</h3>
        <p>1. Configura RequestsLibrary: pip install robotframework-requests</p>
        <p>2. Crea sesión con JSONPlaceholder API</p>
        <p>3. Obtén lista de usuarios desde /users endpoint</p>
        <p>4. Itera cada usuario y valida campos requeridos</p>
        <p>5. Usa datos API para login en aplicación demo</p>
        <p>6. Obtén posts desde /posts y valida estructura</p>
        <p>7. Crea usuario dinámico con timestamp único</p>
        <p>8. POST nuevo usuario a API y verifica respuesta</p>
        <p>9. Usa datos creados para testing en UI</p>
        <p>10. Implementa sincronización API-UI bidireccional</p>
        <p>11. Actualiza datos via PUT y verifica cambios</p>
        <p>12. Procesa múltiples endpoints en paralelo</p>
        <p>13. Maneja diferentes tipos de datos: users, posts, albums</p>
        <p>14. Optimiza con sample de datos grandes</p>
        <p>15. Ejecuta suite completa con APIs reales</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar APIs para generar datasets dinámicos</li>
                <li>Sincronizar datos entre API y UI automáticamente</li>
                <li>Crear y usar datos en tiempo real para testing</li>
                <li>Procesar múltiples endpoints eficientemente</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>APIs dinámicas generan datos más realistas que archivos estáticos. SIEMPRE verifica que cambios API se reflejen en UI.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 151 - Data-Driven 151</h3>
        <p>Aprenderás técnicas de mocking y datos sintéticos para testing independiente de APIs externas.</p>
    `,
    topics: ["data-driven", "excel", "csv"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-149"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_150 = LESSON_150;
}