/**
 * Robot Framework Academy - Lesson 129
 * API Testing 129
 */

const LESSON_129 = {
    id: 129,
    title: "API Testing 129",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>📋 Contract Testing APIs</h2>
        <p>Validación contracts APIs para mantener compatibilidad entre versiones y microservicios.</p>
        
        <h3>💻 Contract Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String
Library    OperatingSystem

*** Variables ***
\${API_BASE}        https://jsonplaceholder.typicode.com
\${CONTRACT_FILE}   \${CURDIR}/contracts/api_contract.json
\${VERSION_V1}      /api/v1
\${VERSION_V2}      /api/v2
\${SCHEMA_DIR}      \${CURDIR}/schemas
\${USER_SCHEMA}     user_schema.json
\${POST_SCHEMA}     post_schema.json

*** Test Cases ***
Validate User Contract Schema
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /users/1
    Status Should Be    200    \${response}
    \${user}=         Set Variable    \${response.json()}
    Should Have Key    \${user}    id
    Should Have Key    \${user}    name
    Should Have Key    \${user}    email
    Should Have Key    \${user}    phone
    Should Have Key    \${user}    website
    Should Have Key    \${user}    address
    Should Have Key    \${user}    company
    Should Be True     isinstance(\${user['id']}, int)
    Should Be True     isinstance(\${user['name']}, str)
    Should Match Regexp    \${user['email']}    ^[^@]+@[^@]+\\.[^@]+$
    Log    User contract validation passed
    Delete All Sessions

Post Contract Validation
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /posts/1
    Status Should Be    200    \${response}
    \${post}=         Set Variable    \${response.json()}
    Should Have Key    \${post}    userId
    Should Have Key    \${post}    id
    Should Have Key    \${post}    title
    Should Have Key    \${post}    body
    Should Be True     isinstance(\${post['userId']}, int)
    Should Be True     isinstance(\${post['id']}, int)
    Should Be True     isinstance(\${post['title']}, str)
    Should Be True     isinstance(\${post['body']}, str)
    Should Be True     \${post['userId']} > 0
    Should Be True     \${post['id']} > 0
    Should Not Be Empty    \${post['title']}
    Should Not Be Empty    \${post['body']}
    Log    Post contract validation passed
    Delete All Sessions

Backwards Compatibility Test
    Create Session    api    \${API_BASE}
    \${v1_response}=  GET On Session    api    /users
    \${v2_response}=  GET On Session    api    /users
    Status Should Be    200    \${v1_response}
    Status Should Be    200    \${v2_response}
    \${v1_users}=     Set Variable    \${v1_response.json()}
    \${v2_users}=     Set Variable    \${v2_response.json()}
    Length Should Be    \${v1_users}    \${len(\${v2_users})}
    \${v1_first}=     Set Variable    \${v1_users[0]}
    \${v2_first}=     Set Variable    \${v2_users[0]}
    Should Be Equal    \${v1_first['id']}      \${v2_first['id']}
    Should Be Equal    \${v1_first['name']}    \${v2_first['name']}
    Should Be Equal    \${v1_first['email']}   \${v2_first['email']}
    Log    Backwards compatibility validated
    Delete All Sessions

Response Structure Consistency
    Create Session    api    \${API_BASE}
    \${endpoints}=    Create List    /users    /posts    /albums    /todos
    \${structures}=   Create Dictionary
    FOR    \${endpoint}    IN    @{endpoints}
        \${response}=     GET On Session    api    \${endpoint}
        Status Should Be    200    \${response}
        \${data}=         Set Variable    \${response.json()}
        Should Be True    isinstance(\${data}, list)
        Should Not Be Empty    \${data}
        \${first_item}=   Set Variable    \${data[0]}
        Should Have Key    \${first_item}    id
        Should Be True     isinstance(\${first_item['id']}, int)
        Set To Dictionary    \${structures}    \${endpoint}    \${len(\${data})}
    END
    Log    Structure consistency: \${structures}
    Delete All Sessions

Field Type Contracts
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /users/2
    Status Should Be    200    \${response}
    \${user}=         Set Variable    \${response.json()}
    \${address}=      Set Variable    \${user['address']}
    \${company}=      Set Variable    \${user['company']}
    \${geo}=          Set Variable    \${address['geo']}
    Should Be True     isinstance(\${address['street']}, str)
    Should Be True     isinstance(\${address['suite']}, str)
    Should Be True     isinstance(\${address['city']}, str)
    Should Be True     isinstance(\${address['zipcode']}, str)
    Should Be True     isinstance(\${geo['lat']}, str)
    Should Be True     isinstance(\${geo['lng']}, str)
    Should Be True     isinstance(\${company['name']}, str)
    Should Be True     isinstance(\${company['catchPhrase']}, str)
    Should Be True     isinstance(\${company['bs']}, str)
    Log    Field type contracts validated
    Delete All Sessions

Required Fields Contract
    Create Session    api    \${API_BASE}
    \${test_data}=    Create Dictionary    title=Test Contract    body=Contract validation test
    \${response}=     POST On Session    api    /posts    json=\${test_data}
    Status Should Be    201    \${response}
    \${created_post}=    Set Variable    \${response.json()}
    Should Have Key      \${created_post}    id
    Should Have Key      \${created_post}    title
    Should Have Key      \${created_post}    body
    Should Be Equal      \${created_post['title']}    Test Contract
    Should Be Equal      \${created_post['body']}     Contract validation test
    Should Be True       isinstance(\${created_post['id']}, int)
    Should Be True       \${created_post['id']} > 0
    Log    Required fields contract validated
    Delete All Sessions

API Version Compatibility
    Create Session    api    \${API_BASE}
    \${users_response}=    GET On Session    api    /users
    \${posts_response}=    GET On Session    api    /posts
    Status Should Be       200    \${users_response}
    Status Should Be       200    \${posts_response}
    \${users}=            Set Variable    \${users_response.json()}
    \${posts}=            Set Variable    \${posts_response.json()}
    Length Should Be       \${users}    10
    Length Should Be       \${posts}    100
    FOR    \${user}    IN    @{users}
        Should Have Key    \${user}    id
        Should Have Key    \${user}    name
        Should Have Key    \${user}    username
        Should Have Key    \${user}    email
    END
    FOR    \${post}    IN    @{posts[:5]}
        Should Have Key    \${post}    userId
        Should Have Key    \${post}    id
        Should Have Key    \${post}    title
        Should Have Key    \${post}    body
    END
    Log    API version compatibility confirmed
    Delete All Sessions

Contract Violation Detection
    Create Session    api    \${API_BASE}
    \${invalid_post}=    Create Dictionary    invalid_field=test
    \${response}=        POST On Session    api    /posts    json=\${invalid_post}
    Status Should Be     201    \${response}
    \${result}=          Set Variable    \${response.json()}
    Should Have Key      \${result}    id
    Should Have Key      \${result}    invalid_field
    Should Be Equal      \${result['invalid_field']}    test
    Should Not Have Key  \${result}    title
    Should Not Have Key  \${result}    body
    Should Not Have Key  \${result}    userId
    Log    Contract violation handled: missing required fields
    Delete All Sessions</code></pre>
        
        <h3>🎯 Práctica Contract (5 min):</h3>
        <p>1. Ejecuta validación completa de user contract schema</p>
        <p>2. Modifica campos requeridos y observa fallos</p>
        <p>3. Implementa backwards compatibility testing</p>
        <p>4. Valida response structure consistency</p>
        <p>5. Testa field type contracts con isinstance()</p>
        <p>6. Agrega required fields validation en POST</p>
        <p>7. Compara API versions para breaking changes</p>
        <p>8. Detecta contract violations automáticamente</p>
        <p>9. Experimenta con Should Match Regexp patterns</p>
        <p>10. Valida nested objects contract compliance</p>
        <p>11. Agrega Should Not Have Key para deprecated fields</p>
        <p>12. Implementa array structure validation</p>
        <p>13. Testa optional vs required field contracts</p>
        <p>14. Crea contract regression test suite</p>
        <p>15. Log contract validation results detallados</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Validar schemas y contracts de APIs</li>
                <li>Implementar backwards compatibility testing</li>
                <li>Detectar breaking changes automáticamente</li>
                <li>Verificar field types y required fields</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Contract testing previene breaking changes entre microservicios. Valida siempre backwards compatibility antes de releases.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 130 - GraphQL API Testing</h3>
        <p>Aprenderás a automatizar testing de GraphQL APIs con queries, mutations y schema introspection validation.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-128"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_129 = LESSON_129;
}