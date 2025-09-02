/**
 * Robot Framework Academy - Lesson 122
 * API Testing 122
 */

const LESSON_122 = {
    id: 122,
    title: "API Testing 122",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>🔍 Validación JSON Schema</h2>
        <p>Validación automática de estructura JSON usando schemas para garantizar contracts API consistentes.</p>
        
        <h3>💻 Schema Validation:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    JSONLibrary
Library    String

*** Variables ***
\${API_BASE}        https://jsonplaceholder.typicode.com
\${USERS_API}       \${API_BASE}/users
\${POSTS_API}       \${API_BASE}/posts
\${USER_SCHEMA}     {"type": "object", "required": ["id", "name", "email"]}
\${POST_SCHEMA}     {"type": "object", "required": ["userId", "id", "title", "body"]}
\${ARRAY_SCHEMA}    {"type": "array", "minItems": 1}
\${EMAIL_PATTERN}   ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$
\${ID_TYPE}         integer

*** Test Cases ***
Validate User Object Structure
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /users/1
    Status Should Be    200    \${response}
    \${user}=         Set Variable    \${response.json()}
    Should Have Key    \${user}    id
    Should Have Key    \${user}    name  
    Should Have Key    \${user}    email
    Should Have Key    \${user}    phone
    Should Have Key    \${user}    website
    Should Be Equal As Integers    \${user['id']}    1
    Should Not Be Empty    \${user['name']}
    Should Match Regexp    \${user['email']}    \${EMAIL_PATTERN}
    Delete All Sessions

Validate Posts Array Schema
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /posts
    Status Should Be    200    \${response}
    \${posts}=        Set Variable    \${response.json()}
    Should Be True    isinstance(\${posts}, list)
    Length Should Be Greater Than    \${posts}    0
    \${first_post}=   Set Variable    \${posts[0]}
    Should Have Key    \${first_post}    userId
    Should Have Key    \${first_post}    id
    Should Have Key    \${first_post}    title
    Should Have Key    \${first_post}    body
    Should Be True    isinstance(\${first_post['userId']}, int)
    Should Be True    isinstance(\${first_post['id']}, int)
    Delete All Sessions

Data Type Validation
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /users/2
    Status Should Be    200    \${response}
    \${user}=         Set Variable    \${response.json()}
    Should Be True    isinstance(\${user['id']}, int)
    Should Be True    isinstance(\${user['name']}, str)
    Should Be True    isinstance(\${user['email']}, str)
    Should Be True    isinstance(\${user['address']}, dict)
    Should Be True    isinstance(\${user['company']}, dict)
    Should Not Be Equal    \${user['id']}    \${EMPTY}
    Should Not Be Equal    \${user['name']}    \${EMPTY}
    Delete All Sessions

Required Fields Validation
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /posts/1
    Status Should Be    200    \${response}
    \${post}=         Set Variable    \${response.json()}
    Dictionary Should Contain Key    \${post}    userId
    Dictionary Should Contain Key    \${post}    id
    Dictionary Should Contain Key    \${post}    title
    Dictionary Should Contain Key    \${post}    body
    Should Not Be Empty    \${post['title']}
    Should Not Be Empty    \${post['body']}
    Should Be True    \${post['userId']} > 0
    Should Be True    \${post['id']} > 0
    Delete All Sessions

Nested Object Validation
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /users/3
    Status Should Be    200    \${response}
    \${user}=         Set Variable    \${response.json()}
    \${address}=      Set Variable    \${user['address']}
    Should Have Key    \${address}    street
    Should Have Key    \${address}    city
    Should Have Key    \${address}    zipcode
    \${geo}=          Set Variable    \${address['geo']}
    Should Have Key    \${geo}    lat
    Should Have Key    \${geo}    lng
    Should Not Be Empty    \${address['city']}
    Should Match Regexp    \${address['zipcode']}    ^\\d{5}-\\d{4}$
    Delete All Sessions

Array Elements Validation
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /users
    Status Should Be    200    \${response}
    \${users}=        Set Variable    \${response.json()}
    Length Should Be    \${users}    10
    FOR    \${user}    IN    @{users}
        Should Have Key    \${user}    id
        Should Have Key    \${user}    email
        Should Match Regexp    \${user['email']}    \${EMAIL_PATTERN}
        Should Be True    \${user['id']} > 0
    END
    Delete All Sessions

Invalid Data Detection
    Create Session    api    \${API_BASE}
    \${invalid_user}=    Create Dictionary    name=Test    phone=123
    \${response}=        POST On Session    api    /users    json=\${invalid_user}    expected_status=201
    Status Should Be     201    \${response}
    \${created}=         Set Variable    \${response.json()}
    Should Have Key      \${created}    id
    Should Be Equal      \${created['name']}    Test
    Should Be Equal      \${created['phone']}    123
    Should Not Have Key  \${created}    email
    Delete All Sessions</code></pre>
        
        <h3>🎯 Práctica Schema (5 min):</h3>
        <p>1. Ejecuta validaciones de estructura JSON completas</p>
        <p>2. Modifica email pattern regex y observa fallos</p>
        <p>3. Agrega validación Should Have Key para nuevos campos</p>
        <p>4. Experimenta con isinstance() para tipos de datos</p>
        <p>5. Crea test que valide array vacío vs populated</p>
        <p>6. Implementa validación de nested objects profundos</p>
        <p>7. Agrega validación de rangos numéricos (id > 0)</p>
        <p>8. Testa responses con campos faltantes</p>
        <p>9. Valida formato de zipcode con regex específico</p>
        <p>10. Implementa FOR loop para validar arrays</p>
        <p>11. Agrega Dictionary Should Contain Key checks</p>
        <p>12. Experimenta con Should Not Have Key</p>
        <p>13. Valida que strings no estén vacíos</p>
        <p>14. Crea schema validation para POST responses</p>
        <p>15. Practica validación de geo coordinates</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Validar estructura JSON con Should Have Key</li>
                <li>Verificar tipos de datos con isinstance()</li>
                <li>Implementar validación de campos requeridos</li>
                <li>Manejar objetos anidados y arrays complejos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Schema validation detecta cambios breaking en APIs antes que lleguen a producción. Es tu red de seguridad.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 123 - Rate Limiting y Performance API</h3>
        <p>Aprenderás a manejar rate limits, timeouts y optimizar performance en tests API de alta frecuencia.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-121"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_122 = LESSON_122;
}