/**
 * Robot Framework Academy - Lesson 120
 * Introducción a API Testing
 */

const LESSON_120 = {
    id: 120,
    title: "Introducción a API Testing",
    duration: "10 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>🔌 API Testing</h2>
        <p>API Testing automatiza verificación de servicios REST/JSON sin interfaz gráfica usando RequestsLibrary.</p>
        
        <h3>💻 Tests API:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String

*** Variables ***
\${BASE_URL}        https://jsonplaceholder.typicode.com
\${API_USERS}       \${BASE_URL}/users
\${API_POSTS}       \${BASE_URL}/posts
\${API_COMMENTS}    \${BASE_URL}/comments
\${CONTENT_TYPE}    application/json
\${USER_ID}         1
\${POST_ID}         1
\${EXPECTED_USERS}  10
\${TIMEOUT}         30s

*** Test Cases ***
GET Users List
    Create Session    api    \${BASE_URL}
    \${response}=     GET On Session    api    /users
    Status Should Be    200    \${response}
    Should Be Equal    \${response.headers['content-type']}    \${CONTENT_TYPE}; charset=utf-8
    \${users}=        Set Variable    \${response.json()}
    Length Should Be    \${users}    \${EXPECTED_USERS}
    Should Contain    \${response.text}    Leanne Graham
    Delete All Sessions

GET Single User
    Create Session    api    \${BASE_URL}
    \${response}=     GET On Session    api    /users/\${USER_ID}
    Status Should Be    200    \${response}
    \${user}=         Set Variable    \${response.json()}
    Should Be Equal    \${user['id']}    \${USER_ID}
    Should Not Be Empty    \${user['name']}
    Should Not Be Empty    \${user['email']}
    Should Contain    \${user['email']}    @
    Delete All Sessions

POST Create User
    Create Session    api    \${BASE_URL}
    \${new_user}=     Create Dictionary    name=Test User    email=test@example.com    username=testuser
    \${response}=     POST On Session    api    /users    json=\${new_user}
    Status Should Be    201    \${response}
    \${created}=      Set Variable    \${response.json()}
    Should Be Equal    \${created['name']}    Test User
    Should Be Equal    \${created['email']}    test@example.com
    Should Be Equal    \${created['username']}    testuser
    Delete All Sessions

PUT Update User
    Create Session    api    \${BASE_URL}
    \${update_data}=  Create Dictionary    id=\${USER_ID}    name=Updated User    email=updated@test.com
    \${response}=     PUT On Session    api    /users/\${USER_ID}    json=\${update_data}
    Status Should Be    200    \${response}
    \${updated}=      Set Variable    \${response.json()}
    Should Be Equal    \${updated['name']}    Updated User
    Should Be Equal    \${updated['email']}    updated@test.com
    Should Be Equal    \${updated['id']}    \${USER_ID}
    Delete All Sessions

DELETE User
    Create Session    api    \${BASE_URL}
    \${response}=     DELETE On Session    api    /users/\${USER_ID}
    Status Should Be    200    \${response}
    Should Be Equal    \${response.text}    {}
    Delete All Sessions

GET Posts Validation
    Create Session    api    \${BASE_URL}
    \${response}=     GET On Session    api    /posts
    Status Should Be    200    \${response}
    \${posts}=        Set Variable    \${response.json()}
    Length Should Be    \${posts}    100
    \${first_post}=   Set Variable    \${posts[0]}
    Should Be Equal    \${first_post['userId']}    \${USER_ID}
    Should Not Be Empty    \${first_post['title']}
    Should Not Be Empty    \${first_post['body']}
    Delete All Sessions

POST Comments Testing
    Create Session    api    \${BASE_URL}
    \${comment_data}=  Create Dictionary    postId=\${POST_ID}    name=Test Comment    email=test@example.com    body=Test comment body
    \${response}=      POST On Session    api    /comments    json=\${comment_data}
    Status Should Be    201    \${response}
    \${comment}=       Set Variable    \${response.json()}
    Should Be Equal     \${comment['postId']}    \${POST_ID}
    Should Be Equal     \${comment['name']}    Test Comment
    Should Contain      \${comment['email']}    @
    Should Not Be Empty \${comment['body']}
    Delete All Sessions</code></pre>
        
        <h3>🎯 Práctica API (8 min):</h3>
        <p>1. Instala RequestsLibrary: pip install robotframework-requests</p>
        <p>2. Copia el código de tests API completo</p>
        <p>3. Ejecuta: robot api_tests.robot</p>
        <p>4. Observa responses JSON en logs</p>
        <p>5. Modifica \${USER_ID} a 2 y ejecuta nuevamente</p>
        <p>6. Agrega validación de campo 'phone' en GET User</p>
        <p>7. Crea test GET /posts/1 para single post</p>
        <p>8. Valida que POST devuelve status 201</p>
        <p>9. Verifica headers content-type en todos los requests</p>
        <p>10. Agrega timeout a todas las requests</p>
        <p>11. Experimenta con datos incorrectos en POST</p>
        <p>12. Valida estructura JSON con Should Have Key</p>
        <p>13. Crea test que falle intencionalmente</p>
        <p>14. Revisa diferencia entre GET, POST, PUT, DELETE</p>
        <p>15. Analiza response.json() vs response.text</p>
        <p>16. Practica Create Dictionary para payloads</p>
        <p>17. Confirma que Delete All Sessions limpia conexiones</p>
        <p>18. Estudia structure de response object</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Entender conceptos fundamentales de API REST</li>
                <li>Dominar RequestsLibrary para automation</li>
                <li>Implementar CRUD completo (GET, POST, PUT, DELETE)</li>
                <li>Validar responses JSON y status codes</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>APIs son más rápidas que UI testing. Una suite API completa ejecuta en segundos vs minutos de web testing.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 121 - Autenticación en APIs</h3>
        <p>Aprenderás a manejar autenticación API Key, Basic Auth y Bearer tokens para acceder APIs protegidas.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "intermediate",
    prerequisites: ["lesson-119"],
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_120 = LESSON_120;
}