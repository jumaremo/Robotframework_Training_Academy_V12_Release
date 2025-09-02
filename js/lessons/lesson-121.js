/**
 * Robot Framework Academy - Lesson 121
 * API Testing 121
 */

const LESSON_121 = {
    id: 121,
    title: "API Testing 121",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>🔐 Autenticación APIs</h2>
        <p>Manejo de API Key, Basic Auth y Bearer tokens para acceder APIs protegidas.</p>
        
        <h3>💻 Tests Autenticación:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String
Library    BuiltIn

*** Variables ***
\${API_BASE}        https://reqres.in/api
\${API_KEY}         sk-test-1234567890abcdef
\${USERNAME}        admin@test.com
\${PASSWORD}        secret123
\${BEARER_TOKEN}    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
\${AUTH_ENDPOINT}   \${API_BASE}/login
\${USERS_ENDPOINT}  \${API_BASE}/users
\${PROTECTED_URL}   \${API_BASE}/users/me

*** Test Cases ***
API Key Authentication
    Create Session    api    \${API_BASE}
    \${headers}=      Create Dictionary    X-API-Key=\${API_KEY}    Content-Type=application/json
    \${response}=     GET On Session    api    /users    headers=\${headers}
    Status Should Be    200    \${response}
    Should Contain    \${response.headers['content-type']}    application/json
    \${users}=        Set Variable    \${response.json()}
    Should Not Be Empty    \${users}
    Delete All Sessions

Basic Authentication
    Create Session    api    \${API_BASE}
    \${auth}=         Create List    \${USERNAME}    \${PASSWORD}
    \${response}=     GET On Session    api    /users    auth=\${auth}
    Status Should Be    200    \${response}
    \${data}=         Set Variable    \${response.json()}
    Should Have Key    \${data}    data
    Length Should Be Greater Than    \${data['data']}    0
    Delete All Sessions

Bearer Token Auth
    Create Session    api    \${API_BASE}
    \${headers}=      Create Dictionary    Authorization=Bearer \${BEARER_TOKEN}
    \${response}=     GET On Session    api    /users    headers=\${headers}
    Status Should Be    200    \${response}
    Should Contain    \${response.text}    data
    Delete All Sessions

Login and Token Extraction
    Create Session    api    \${API_BASE}
    \${login_data}=   Create Dictionary    email=eve.holt@reqres.in    password=cityslicka
    \${response}=     POST On Session    api    /login    json=\${login_data}
    Status Should Be    200    \${response}
    \${auth_data}=    Set Variable    \${response.json()}
    Should Have Key    \${auth_data}    token
    \${token}=        Set Variable    \${auth_data['token']}
    Should Not Be Empty    \${token}
    Set Suite Variable    \${EXTRACTED_TOKEN}    \${token}
    Delete All Sessions

Protected Endpoint Access
    Create Session    api    \${API_BASE}
    \${headers}=      Create Dictionary    Authorization=Bearer \${EXTRACTED_TOKEN}
    \${response}=     GET On Session    api    /users/2    headers=\${headers}
    Status Should Be    200    \${response}
    \${user}=         Set Variable    \${response.json()}
    Should Have Key    \${user}    data
    Should Not Be Empty    \${user['data']['email']}
    Delete All Sessions

Invalid Authentication Test
    Create Session    api    \${API_BASE}
    \${headers}=      Create Dictionary    Authorization=Bearer invalid-token
    \${response}=     GET On Session    api    /users    headers=\${headers}    expected_status=401
    Status Should Be    401    \${response}
    Delete All Sessions

Multiple Auth Methods
    Create Session    api    \${API_BASE}
    \${headers_key}=     Create Dictionary    X-API-Key=\${API_KEY}
    \${headers_bearer}=  Create Dictionary    Authorization=Bearer \${BEARER_TOKEN}
    \${response1}=       GET On Session    api    /users    headers=\${headers_key}
    \${response2}=       GET On Session    api    /users    headers=\${headers_bearer}
    Status Should Be     200    \${response1}
    Status Should Be     200    \${response2}
    Should Be Equal      \${response1.status_code}    \${response2.status_code}
    Delete All Sessions</code></pre>
        
        <h3>🎯 Práctica Auth (5 min):</h3>
        <p>1. Ejecuta tests con diferentes tipos de autenticación</p>
        <p>2. Modifica \${API_KEY} con valor inválido y observa error</p>
        <p>3. Cambia \${USERNAME}/\${PASSWORD} y verifica Basic Auth</p>
        <p>4. Experimenta con Bearer token malformado</p>
        <p>5. Agrega header Custom-Auth con valor personalizado</p>
        <p>6. Crea test con múltiples headers de autenticación</p>
        <p>7. Valida que login devuelve token válido</p>
        <p>8. Usa token extraído en endpoint protegido</p>
        <p>9. Implementa manejo de expected_status=401</p>
        <p>10. Verifica que headers se envían correctamente</p>
        <p>11. Agrega validación Should Have Key para responses</p>
        <p>12. Testa timeout en requests con auth lenta</p>
        <p>13. Compara performance entre auth methods</p>
        <p>14. Crea variables de session para tokens</p>
        <p>15. Practica Set Suite Variable para datos globales</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar API Key authentication en headers</li>
                <li>Implementar Basic Auth con credenciales</li>
                <li>Manejar Bearer tokens para JWT authentication</li>
                <li>Extraer y reutilizar tokens dinámicamente</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Bearer tokens expiran. Siempre valida que el token es válido antes de usarlo en requests críticos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 122 - Validación JSON Schema</h3>
        <p>Aprenderás a validar estructura y tipos de datos JSON usando schemas para garantizar contracts API consistentes.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-120"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_121 = LESSON_121;
}