/**
 * Robot Framework Academy - Lesson 124
 * API Testing 124
 */

const LESSON_124 = {
    id: 124,
    title: "API Testing 124",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>🚨 Error Handling APIs</h2>
        <p>Manejo completo de códigos HTTP (4xx, 5xx) y estrategias recovery robustas.</p>
        
        <h3>💻 Error Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String
Library    BuiltIn

*** Variables ***
\${API_BASE}        https://httpbin.org
\${INVALID_URL}     https://nonexistent-api.com
\${STATUS_400}      400
\${STATUS_401}      401
\${STATUS_404}      404
\${STATUS_500}      500
\${RETRY_COUNT}     3
\${ERROR_MESSAGE}   Request failed

*** Test Cases ***
Handle 400 Bad Request
    Create Session    api    \${API_BASE}
    \${invalid_data}=    Create Dictionary    invalid=data
    \${response}=        POST On Session    api    /post    json=\${invalid_data}    expected_status=200
    Status Should Be     200    \${response}
    \${json_data}=       Set Variable    \${response.json()}
    Should Have Key      \${json_data}    json
    Should Be Equal      \${json_data['json']['invalid']}    data
    Log    Bad request handled successfully
    Delete All Sessions

Handle 401 Unauthorized
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /status/\${STATUS_401}    expected_status=401
    Status Should Be    401    \${response}
    Should Be Equal    \${response.status_code}    \${STATUS_401}
    Log    Unauthorized access detected: \${response.status_code}
    Delete All Sessions

Handle 404 Not Found
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /status/\${STATUS_404}    expected_status=404
    Status Should Be    404    \${response}
    Should Be Equal    \${response.status_code}    \${STATUS_404}
    Should Be Empty    \${response.text}
    Log    Resource not found: \${response.status_code}
    Delete All Sessions

Handle 500 Server Error
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /status/\${STATUS_500}    expected_status=500
    Status Should Be    500    \${response}
    Should Be Equal    \${response.status_code}    \${STATUS_500}
    Log    Server error encountered: \${response.status_code}
    Delete All Sessions

Retry Strategy Implementation
    FOR    \${attempt}    IN RANGE    1    \${RETRY_COUNT}
        TRY
            Create Session    api    \${API_BASE}
            \${response}=     GET On Session    api    /delay/1
            Status Should Be    200    \${response}
            Log    Request successful on attempt \${attempt}
            Delete All Sessions
            BREAK
        EXCEPT    AS    \${error}
            Log    Attempt \${attempt} failed: \${error}
            Delete All Sessions
            Sleep    1s
        END
    END

Multiple Error Codes Testing
    Create Session    api    \${API_BASE}
    \${error_codes}=    Create List    400    401    403    404    500    502
    FOR    \${code}    IN    @{error_codes}
        \${response}=     GET On Session    api    /status/\${code}    expected_status=\${code}
        Status Should Be    \${code}    \${response}
        Should Be Equal    \${response.status_code}    \${code}
        Log    Error code \${code} handled correctly
    END
    Delete All Sessions

Connection Error Handling
    TRY
        Create Session    api    \${INVALID_URL}    timeout=2s
        \${response}=     GET On Session    api    /test
        Log    This should not execute
    EXCEPT    AS    \${connection_error}
        Log    Connection error caught: \${connection_error}
        Should Contain    \${connection_error}    Connection
    END

Error Response Validation
    Create Session    api    \${API_BASE}
    \${response}=     GET On Session    api    /status/422    expected_status=422
    Status Should Be    422    \${response}
    Should Be Equal    \${response.status_code}    422
    Should Be True     \${response.status_code} >= 400
    Should Be True     \${response.status_code} < 500
    Log    Client error validated: \${response.status_code}
    Delete All Sessions

Graceful Degradation Pattern
    \${fallback_used}=    Set Variable    False
    TRY
        Create Session    api    \${API_BASE}
        \${response}=     GET On Session    api    /status/503    expected_status=503
        Status Should Be    503    \${response}
    EXCEPT
        Log    Primary service unavailable, using fallback
        \${fallback_used}=    Set Variable    True
        Create Session    fallback    https://httpbin.org
        \${response}=         GET On Session    fallback    /get
        Status Should Be      200    \${response}
        Delete All Sessions
    END
    Should Be True    \${fallback_used} or \${response.status_code} == 503</code></pre>
        
        <h3>🎯 Práctica Errors (5 min):</h3>
        <p>1. Ejecuta tests con diferentes códigos de error</p>
        <p>2. Modifica expected_status y observa fallos</p>
        <p>3. Implementa retry logic con TRY/EXCEPT/BREAK</p>
        <p>4. Agrega manejo para timeout errors específicos</p>
        <p>5. Crea lista de códigos 4xx y valida todos</p>
        <p>6. Testa connection errors con URL inválida</p>
        <p>7. Implementa fallback strategy para 503 errors</p>
        <p>8. Valida que error messages contienen keywords</p>
        <p>9. Agrega logging detallado para debugging</p>
        <p>10. Experimenta con diferentes timeout values</p>
        <p>11. Maneja 429 Too Many Requests con Sleep</p>
        <p>12. Crea pattern graceful degradation completo</p>
        <p>13. Valida ranges de códigos (4xx vs 5xx)</p>
        <p>14. Implementa error counting y reporting</p>
        <p>15. Practica Should Contain para error messages</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Manejar todos los códigos HTTP (4xx, 5xx)</li>
                <li>Implementar retry logic con TRY/EXCEPT</li>
                <li>Crear estrategias de fallback robustas</li>
                <li>Validar error responses y connection failures</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa expected_status en requests que sabes van a fallar. Te permite testear error handling sin que el test falle.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 125 - Mock APIs y Test Data</h3>
        <p>Aprenderás a crear mock APIs para testing independiente y generar test data dinámico para casos complejos.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-123"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_124 = LESSON_124;
}