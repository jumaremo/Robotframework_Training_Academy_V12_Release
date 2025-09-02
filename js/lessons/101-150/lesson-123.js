/**
 * Robot Framework Academy - Lesson 123
 * API Testing 123
 */

const LESSON_123 = {
    id: 123,
    title: "API Testing 123",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>⚡ Rate Limiting Performance</h2>
        <p>Manejo de rate limits, timeouts y optimización performance en tests API de alta frecuencia.</p>
        
        <h3>💻 Performance Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    DateTime
Library    String

*** Variables ***
\${API_BASE}        https://jsonplaceholder.typicode.com
\${RATE_LIMIT}      10
\${TIMEOUT}         5s
\${MAX_RETRIES}     3
\${RETRY_DELAY}     1s
\${PERFORMANCE_URL} \${API_BASE}/posts
\${SLOW_ENDPOINT}   \${API_BASE}/photos
\${PARALLEL_USERS}  5

*** Test Cases ***
Basic Timeout Configuration
    Create Session    api    \${API_BASE}    timeout=\${TIMEOUT}
    \${start_time}=   Get Current Date    result_format=epoch
    \${response}=     GET On Session    api    /users    timeout=\${TIMEOUT}
    \${end_time}=     Get Current Date    result_format=epoch
    \${duration}=     Evaluate    \${end_time} - \${start_time}
    Status Should Be    200    \${response}
    Should Be True    \${duration} < 5
    Log    Request completed in \${duration} seconds
    Delete All Sessions

Rate Limit Testing
    Create Session    api    \${API_BASE}
    FOR    \${i}    IN RANGE    1    \${RATE_LIMIT}
        \${response}=     GET On Session    api    /posts/\${i}
        Status Should Be    200    \${response}
        Log    Request \${i} successful
        Sleep    0.1s
    END
    Delete All Sessions

Retry Logic Implementation
    Create Session    api    \${API_BASE}
    FOR    \${attempt}    IN RANGE    1    \${MAX_RETRIES}
        TRY
            \${response}=     GET On Session    api    /posts/999    expected_status=404
            Status Should Be    404    \${response}
            Log    Request failed as expected on attempt \${attempt}
            BREAK
        EXCEPT
            Log    Attempt \${attempt} failed, retrying...
            Sleep    \${RETRY_DELAY}
        END
    END
    Delete All Sessions

Performance Benchmarking
    Create Session    api    \${API_BASE}
    \${start_time}=   Get Current Date    result_format=epoch
    FOR    \${i}    IN RANGE    1    11
        \${response}=     GET On Session    api    /posts/\${i}
        Status Should Be    200    \${response}
    END
    \${end_time}=     Get Current Date    result_format=epoch
    \${total_time}=   Evaluate    \${end_time} - \${start_time}
    \${avg_time}=     Evaluate    \${total_time} / 10
    Should Be True    \${avg_time} < 1
    Log    Average response time: \${avg_time} seconds
    Delete All Sessions

Parallel Request Simulation
    Create Session    api    \${API_BASE}
    \${responses}=    Create List
    FOR    \${user_id}    IN RANGE    1    \${PARALLEL_USERS}
        \${response}=     GET On Session    api    /users/\${user_id}
        Status Should Be    200    \${response}
        Append To List    \${responses}    \${response}
    END
    Length Should Be    \${responses}    \${PARALLEL_USERS}
    Delete All Sessions

Large Response Handling
    Create Session    api    \${API_BASE}
    \${start_time}=   Get Current Date    result_format=epoch
    \${response}=     GET On Session    api    /photos
    \${end_time}=     Get Current Date    result_format=epoch
    \${duration}=     Evaluate    \${end_time} - \${start_time}
    Status Should Be    200    \${response}
    \${photos}=       Set Variable    \${response.json()}
    Length Should Be Greater Than    \${photos}    1000
    Should Be True    \${duration} < 10
    Log    Large response (\${len(\${photos})} items) in \${duration}s
    Delete All Sessions

Connection Pool Management
    Create Session    api    \${API_BASE}    max_retries=\${MAX_RETRIES}
    FOR    \${endpoint}    IN    @{['/users', '/posts', '/albums', '/todos']}
        \${response}=     GET On Session    api    \${endpoint}
        Status Should Be    200    \${response}
        \${data}=         Set Variable    \${response.json()}
        Should Not Be Empty    \${data}
        Log    \${endpoint}: \${len(\${data})} items
    END
    Delete All Sessions

Error Rate Monitoring
    Create Session    api    \${API_BASE}
    \${success_count}=    Set Variable    0
    \${error_count}=      Set Variable    0
    FOR    \${i}    IN RANGE    1    21
        TRY
            \${response}=     GET On Session    api    /posts/\${i}
            Status Should Be    200    \${response}
            \${success_count}=    Evaluate    \${success_count} + 1
        EXCEPT
            \${error_count}=      Evaluate    \${error_count} + 1
        END
    END
    \${error_rate}=   Evaluate    \${error_count} / 20 * 100
    Should Be True    \${error_rate} < 5
    Log    Error rate: \${error_rate}%
    Delete All Sessions</code></pre>
        
        <h3>🎯 Práctica Performance (5 min):</h3>
        <p>1. Ejecuta tests de timeout y mide response times</p>
        <p>2. Modifica \${RATE_LIMIT} y observa comportamiento</p>
        <p>3. Implementa retry logic con TRY/EXCEPT</p>
        <p>4. Mide performance de 20 requests consecutivos</p>
        <p>5. Simula 10 users paralelos con FOR loops</p>
        <p>6. Testa endpoint lento /photos con timeouts largos</p>
        <p>7. Calcula average response time por request</p>
        <p>8. Implementa error rate monitoring automático</p>
        <p>9. Agrega Sleep estratégico entre requests</p>
        <p>10. Valida que duration < threshold específico</p>
        <p>11. Maneja large responses (1000+ items)</p>
        <p>12. Experimenta con max_retries en sessions</p>
        <p>13. Log detailed performance metrics</p>
        <p>14. Crea benchmark baseline para comparación</p>
        <p>15. Implementa connection pool reutilización</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Configurar timeouts y retry logic robusto</li>
                <li>Medir y optimizar performance de requests</li>
                <li>Manejar rate limiting y throttling</li>
                <li>Implementar monitoring de error rates</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>APIs productivas tienen rate limits. Agrega Sleep entre requests para evitar 429 Too Many Requests.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 124 - Error Handling Avanzado APIs</h3>
        <p>Aprenderás a manejar todos los códigos de error HTTP (4xx, 5xx) y implementar estrategias de recovery robustas.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-122"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_123 = LESSON_123;
}