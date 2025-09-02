/**
 * Robot Framework Academy - Lesson 125
 * API Testing 125
 */

const LESSON_125 = {
    id: 125,
    title: "API Testing 125",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>🎭 Mock APIs Data</h2>
        <p>Creación de mock APIs para testing independiente y generación test data dinámico.</p>
        
        <h3>💻 Mock Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    DateTime
Library    String
Library    Random

*** Variables ***
\${MOCK_SERVER}     https://mockapi.io/api/v1
\${LOCAL_MOCK}      http://localhost:3000
\${FAKER_API}       https://jsonplaceholder.typicode.com
\${TEST_USER_ID}    \${EMPTY}
\${MOCK_DATA}       \${EMPTY}
\${RANDOM_EMAIL}    \${EMPTY}
\${TIMESTAMP}       \${EMPTY}

*** Test Cases ***
Generate Dynamic Test Data
    \${current_time}=     Get Current Date    result_format=%Y%m%d_%H%M%S
    Set Suite Variable    \${TIMESTAMP}    \${current_time}
    \${random_id}=        Evaluate    random.randint(1000, 9999)
    \${random_email}=     Set Variable    test_\${random_id}@mock.com
    Set Suite Variable    \${RANDOM_EMAIL}    \${random_email}
    \${user_data}=        Create Dictionary    
    ...                   name=Test User \${random_id}
    ...                   email=\${random_email}
    ...                   created=\${TIMESTAMP}
    Set Suite Variable    \${MOCK_DATA}    \${user_data}
    Log    Generated test data: \${user_data}

Create Mock User
    Create Session    mock    \${FAKER_API}
    \${response}=     POST On Session    mock    /users    json=\${MOCK_DATA}
    Status Should Be    201    \${response}
    \${created_user}=    Set Variable    \${response.json()}
    Should Have Key      \${created_user}    id
    Should Be Equal      \${created_user['name']}    \${MOCK_DATA['name']}
    Should Be Equal      \${created_user['email']}   \${MOCK_DATA['email']}
    Set Suite Variable   \${TEST_USER_ID}    \${created_user['id']}
    Log    Mock user created with ID: \${TEST_USER_ID}
    Delete All Sessions

Validate Mock Response
    Create Session    mock    \${FAKER_API}
    \${response}=     GET On Session    mock    /users/\${TEST_USER_ID}
    Status Should Be    200    \${response}
    \${user}=         Set Variable    \${response.json()}
    Should Be Equal    \${user['id']}    \${TEST_USER_ID}
    Should Contain     \${user['name']}    Test User
    Should Contain     \${user['email']}   @mock.com
    Delete All Sessions

Mock Data Variations
    Create Session    mock    \${FAKER_API}
    \${variations}=   Create List
    FOR    \${i}    IN RANGE    1    6
        \${var_data}=     Create Dictionary    
        ...               name=Variation \${i}    
        ...               email=var\${i}@test.com
        ...               active=\${i % 2 == 0}
        \${response}=     POST On Session    mock    /users    json=\${var_data}
        Status Should Be    201    \${response}
        \${created}=      Set Variable    \${response.json()}
        Append To List    \${variations}    \${created['id']}
    END
    Length Should Be    \${variations}    5
    Log    Created \${len(\${variations})} mock variations
    Delete All Sessions

Bulk Mock Data Creation
    Create Session    mock    \${FAKER_API}
    \${bulk_users}=   Create List
    FOR    \${count}    IN RANGE    1    11
        \${bulk_data}=    Create Dictionary    
        ...               name=Bulk User \${count}
        ...               email=bulk\${count}@company.com
        ...               department=Engineering
        \${response}=     POST On Session    mock    /users    json=\${bulk_data}
        Status Should Be    201    \${response}
        \${bulk_user}=   Set Variable    \${response.json()}
        Append To List   \${bulk_users}    \${bulk_user['id']}
    END
    Length Should Be    \${bulk_users}    10
    Log    Bulk created: \${bulk_users}
    Delete All Sessions

Mock Error Scenarios
    Create Session    mock    \${FAKER_API}
    \${invalid_data}=    Create Dictionary    invalid_field=test
    \${response}=        POST On Session    mock    /users    json=\${invalid_data}
    Status Should Be     201    \${response}
    \${error_user}=      Set Variable    \${response.json()}
    Should Have Key      \${error_user}    id
    Should Be Equal      \${error_user['invalid_field']}    test
    Should Not Have Key  \${error_user}    name
    Should Not Have Key  \${error_user}    email
    Delete All Sessions

Dynamic JSON Payloads
    Create Session    mock    \${FAKER_API}
    \${random_num}=      Evaluate    random.randint(1, 100)
    \${dynamic_json}=    Create Dictionary    timestamp=\${TIMESTAMP}    random=\${random_num}    test_type=automated
    \${response}=        POST On Session    mock    /posts    json=\${dynamic_json}
    Status Should Be     201    \${response}
    \${dynamic_post}=    Set Variable    \${response.json()}
    Should Contain       \${dynamic_post['timestamp']}    20
    Should Be True       \${dynamic_post['random']} >= 1
    Should Be True       \${dynamic_post['random']} <= 100
    Should Be Equal      \${dynamic_post['test_type']}    automated
    Delete All Sessions

Mock API Cleanup
    Create Session    mock    \${FAKER_API}
    IF    '\${TEST_USER_ID}' != '\${EMPTY}'
        \${response}=     DELETE On Session    mock    /users/\${TEST_USER_ID}    expected_status=200
        Status Should Be    200    \${response}
        Log    Cleaned up mock user: \${TEST_USER_ID}
    END
    Delete All Sessions</code></pre>
        
        <h3>🎯 Práctica Mock (5 min):</h3>
        <p>1. Ejecuta generación de test data dinámico</p>
        <p>2. Modifica random ranges y observa variaciones</p>
        <p>3. Crea mock users con diferentes templates</p>
        <p>4. Implementa bulk data creation con FOR loops</p>
        <p>5. Agrega timestamp único en cada request</p>
        <p>6. Testa invalid payloads para error handling</p>
        <p>7. Valida que mock responses son consistentes</p>
        <p>8. Experimenta con Evaluate para dynamic data</p>
        <p>9. Crea variations con boolean y numeric fields</p>
        <p>10. Implementa cleanup automático después tests</p>
        <p>11. Agrega Set Suite Variable para shared data</p>
        <p>12. Practica Should Contain con partial matches</p>
        <p>13. Valida ranges numéricos con Should Be True</p>
        <p>14. Crea templates reutilizables para payloads</p>
        <p>15. Log detailed information para debugging</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Generar test data dinámico con timestamps y randoms</li>
                <li>Crear mock APIs para testing independiente</li>
                <li>Implementar bulk data creation con loops</li>
                <li>Manejar cleanup automático de test data</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Mock APIs te permiten testear sin depender de servicios externos. Perfecto para CI/CD environments.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 126 - API Testing Automation Pipeline</h3>
        <p>Aprenderás a integrar API testing en pipelines CI/CD con parallel execution y reporting automático.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-124"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_125 = LESSON_125;
}