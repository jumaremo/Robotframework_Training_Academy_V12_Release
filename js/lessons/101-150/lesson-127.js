/**
 * Robot Framework Academy - Lesson 127
 * API Testing 127
 */

const LESSON_127 = {
    id: 127,
    title: "API Testing 127",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>🔐 Security Testing APIs</h2>
        <p>Testing seguridad APIs: authentication bypass, injection attacks y data validation.</p>
        
        <h3>💻 Security Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String
Library    BuiltIn

*** Variables ***
\${API_BASE}        https://httpbin.org
\${SECURE_API}      https://reqres.in/api
\${INVALID_TOKEN}   invalid-token-12345
\${SQL_INJECTION}   ' OR '1'='1
\${XSS_PAYLOAD}     <script>alert('xss')</script>
\${LONG_STRING}     \${'A' * 1000}
\${ADMIN_TOKEN}     admin-secret-key
\${USER_TOKEN}      user-normal-key

*** Test Cases ***
Authentication Bypass Testing
    Create Session    api    \${SECURE_API}
    \${response}=     GET On Session    api    /users    expected_status=200
    Status Should Be    200    \${response}
    \${headers}=      Create Dictionary    Authorization=Bearer \${INVALID_TOKEN}
    \${response2}=    GET On Session    api    /users    headers=\${headers}    expected_status=200
    Status Should Be    200    \${response2}
    Should Be Equal    \${response.status_code}    \${response2.status_code}
    Log    Authentication bypass test completed
    Delete All Sessions

SQL Injection Protection
    Create Session    api    \${API_BASE}
    \${malicious_data}=    Create Dictionary    username=\${SQL_INJECTION}    password=test123
    \${response}=          POST On Session    api    /post    json=\${malicious_data}
    Status Should Be       200    \${response}
    \${response_data}=     Set Variable    \${response.json()}
    Should Have Key        \${response_data}    json
    Should Be Equal        \${response_data['json']['username']}    \${SQL_INJECTION}
    Should Not Contain     \${response.text}    error
    Should Not Contain     \${response.text}    exception
    Log    SQL injection test: payload handled safely
    Delete All Sessions

XSS Vulnerability Testing
    Create Session    api    \${API_BASE}
    \${xss_data}=     Create Dictionary    comment=\${XSS_PAYLOAD}    user=testuser
    \${response}=     POST On Session    api    /post    json=\${xss_data}
    Status Should Be    200    \${response}
    \${json_response}=    Set Variable    \${response.json()}
    Should Have Key       \${json_response}    json
    Should Be Equal       \${json_response['json']['comment']}    \${XSS_PAYLOAD}
    Should Not Contain    \${response.text}    <script>
    Should Not Contain    \${response.text}    javascript:
    Log    XSS protection validated
    Delete All Sessions

Buffer Overflow Testing
    Create Session    api    \${API_BASE}
    \${overflow_data}=    Create Dictionary    name=\${LONG_STRING}    description=test
    \${response}=         POST On Session    api    /post    json=\${overflow_data}
    Status Should Be      200    \${response}
    \${response_json}=    Set Variable    \${response.json()}
    Should Have Key       \${response_json}    json
    \${name_length}=      Get Length    \${response_json['json']['name']}
    Should Be Equal       \${name_length}    1000
    Should Be Equal       \${response_json['json']['name']}    \${LONG_STRING}
    Log    Buffer overflow test: \${name_length} characters handled
    Delete All Sessions

Authorization Level Testing
    Create Session    api    \${API_BASE}
    \${admin_headers}=    Create Dictionary    Authorization=Bearer \${ADMIN_TOKEN}    X-Role=admin
    \${user_headers}=     Create Dictionary    Authorization=Bearer \${USER_TOKEN}     X-Role=user
    \${response1}=        GET On Session    api    /get    headers=\${admin_headers}
    \${response2}=        GET On Session    api    /get    headers=\${user_headers}
    Status Should Be      200    \${response1}
    Status Should Be      200    \${response2}
    Should Be Equal       \${response1.status_code}    \${response2.status_code}
    Should Contain        \${response1.text}    admin
    Should Contain        \${response2.text}    user
    Log    Authorization levels validated
    Delete All Sessions

Input Validation Testing
    Create Session    api    \${API_BASE}
    \${invalid_inputs}=    Create List    null    \${EMPTY}    \${SPACE}    123abc    !@#\$%
    FOR    \${invalid_input}    IN    @{invalid_inputs}
        \${test_data}=    Create Dictionary    email=\${invalid_input}    age=25
        \${response}=     POST On Session    api    /post    json=\${test_data}
        Status Should Be    200    \${response}
        \${json_data}=    Set Variable    \${response.json()}
        Should Have Key    \${json_data}    json
        Should Be Equal    \${json_data['json']['email']}    \${invalid_input}
        Log    Input validation test: \${invalid_input}
    END
    Delete All Sessions

Rate Limiting Security
    Create Session    api    \${API_BASE}
    \${rate_responses}=    Create List
    FOR    \${request_num}    IN RANGE    1    21
        \${response}=     GET On Session    api    /get
        Append To List    \${rate_responses}    \${response.status_code}
        Sleep    0.1s
    END
    Length Should Be    \${rate_responses}    20
    FOR    \${status}    IN    @{rate_responses}
        Should Be True    \${status} == 200 or \${status} == 429
    END
    Log    Rate limiting test completed: \${len(\${rate_responses})} requests
    Delete All Sessions

Headers Security Validation
    Create Session    api    \${API_BASE}
    \${security_headers}=    Create Dictionary    
    ...                      X-Frame-Options=DENY    
    ...                      X-XSS-Protection=1    
    ...                      X-Content-Type-Options=nosniff
    \${response}=            GET On Session    api    /response-headers    params=\${security_headers}
    Status Should Be         200    \${response}
    Should Have Key          \${response.headers}    content-type
    Should Contain           \${response.headers['content-type']}    application/json
    \${json_response}=       Set Variable    \${response.json()}
    Should Have Key          \${json_response}    X-Frame-Options
    Should Be Equal          \${json_response['X-Frame-Options']}    DENY
    Log    Security headers validated
    Delete All Sessions</code></pre>
        
        <h3>🎯 Práctica Security (5 min):</h3>
        <p>1. Ejecuta tests de authentication bypass completos</p>
        <p>2. Modifica \${SQL_INJECTION} con diferentes payloads</p>
        <p>3. Testa XSS protection con múltiples scripts</p>
        <p>4. Implementa buffer overflow con strings largos</p>
        <p>5. Valida authorization levels admin vs user</p>
        <p>6. Agrega input validation para emails malformados</p>
        <p>7. Testa rate limiting con 50+ requests</p>
        <p>8. Valida security headers en responses</p>
        <p>9. Experimenta con tokens JWT malformados</p>
        <p>10. Implementa tests para CORS validation</p>
        <p>11. Agrega Should Not Contain para error leaks</p>
        <p>12. Testa privilege escalation scenarios</p>
        <p>13. Valida que sensitive data no se expone</p>
        <p>14. Crea payloads maliciosos personalizados</p>
        <p>15. Log security test results para auditing</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar authentication bypass testing</li>
                <li>Detectar vulnerabilidades SQL injection y XSS</li>
                <li>Validar authorization levels y input sanitization</li>
                <li>Verificar rate limiting y security headers</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Security testing debe ejecutarse en ambientes seguros. Nunca testes payloads maliciosos en APIs productivas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 128 - API Load Testing</h3>
        <p>Aprenderás a implementar load testing para APIs con múltiples concurrent users y stress testing scenarios.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-126"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_127 = LESSON_127;
}