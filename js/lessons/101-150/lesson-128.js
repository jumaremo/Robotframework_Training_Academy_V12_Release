/**
 * Robot Framework Academy - Lesson 128
 * API Testing 128
 */

const LESSON_128 = {
    id: 128,
    title: "API Testing 128",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>⚡ Load Testing APIs</h2>
        <p>Implementación load testing APIs con concurrent users y stress testing scenarios.</p>
        
        <h3>💻 Load Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    DateTime
Library    String
Library    Process

*** Variables ***
\${API_BASE}        https://jsonplaceholder.typicode.com
\${LOAD_USERS}      20
\${STRESS_USERS}    50
\${TEST_DURATION}   60s
\${RPS_TARGET}      10
\${RESPONSE_LIMIT}  2s
\${ERROR_THRESHOLD} 5
\${CONCURRENT_REQS} 10

*** Test Cases ***
Baseline Performance Test
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
    Log    Baseline: \${avg_time}s average response time
    Delete All Sessions

Concurrent Users Simulation
    \${user_responses}=    Create List
    FOR    \${user}    IN RANGE    1    \${LOAD_USERS}
        Create Session    user\${user}    \${API_BASE}
        \${response}=     GET On Session    user\${user}    /users/\${user % 10 + 1}
        Status Should Be    200    \${response}
        Append To List    \${user_responses}    \${response.status_code}
        Delete All Sessions
    END
    Length Should Be    \${user_responses}    \${LOAD_USERS - 1}
    \${success_count}=    Count Values In List    \${user_responses}    200
    Should Be True    \${success_count} >= \${LOAD_USERS - 1} * 0.95
    Log    Concurrent test: \${success_count}/\${LOAD_USERS - 1} successful

Response Time Validation
    Create Session    api    \${API_BASE}
    \${response_times}=    Create List
    FOR    \${request}    IN RANGE    1    21
        \${start}=        Get Current Date    result_format=epoch
        \${response}=     GET On Session    api    /posts
        \${end}=          Get Current Date    result_format=epoch
        \${duration}=     Evaluate    \${end} - \${start}
        Append To List    \${response_times}    \${duration}
        Status Should Be    200    \${response}
        Should Be True    \${duration} < 3
    END
    \${max_time}=     Evaluate    max(\${response_times})
    \${min_time}=     Evaluate    min(\${response_times})
    \${avg_time}=     Evaluate    sum(\${response_times}) / len(\${response_times})
    Should Be True    \${avg_time} < 2
    Log    Response times - Min: \${min_time}s, Max: \${max_time}s, Avg: \${avg_time}s
    Delete All Sessions

Stress Testing Scenario
    Create Session    api    \${API_BASE}
    \${stress_results}=    Create Dictionary    success=0    errors=0
    FOR    \${stress_user}    IN RANGE    1    \${STRESS_USERS}
        TRY
            \${response}=     GET On Session    api    /users    timeout=5s
            Status Should Be    200    \${response}
            \${success}=      Evaluate    \${stress_results['success']} + 1
            Set To Dictionary    \${stress_results}    success    \${success}
        EXCEPT
            \${errors}=       Evaluate    \${stress_results['errors']} + 1
            Set To Dictionary    \${stress_results}    errors    \${errors}
        END
        Sleep    0.05s
    END
    \${error_rate}=   Evaluate    \${stress_results['errors']} / (\${STRESS_USERS - 1}) * 100
    Should Be True    \${error_rate} < \${ERROR_THRESHOLD}
    Log    Stress test: \${stress_results['success']} success, \${stress_results['errors']} errors (\${error_rate}%)
    Delete All Sessions

Throughput Measurement
    Create Session    api    \${API_BASE}
    \${start_time}=   Get Current Date    result_format=epoch
    \${request_count}=    Set Variable    0
    FOR    \${minute}    IN RANGE    1    4
        FOR    \${req}    IN RANGE    1    21
            \${response}=     GET On Session    api    /posts/\${req}
            Status Should Be    200    \${response}
            \${request_count}=    Evaluate    \${request_count} + 1
        END
        Sleep    1s
    END
    \${end_time}=     Get Current Date    result_format=epoch
    \${total_duration}=    Evaluate    \${end_time} - \${start_time}
    \${rps}=          Evaluate    \${request_count} / \${total_duration}
    Should Be True    \${rps} >= 5
    Log    Throughput: \${rps} requests per second
    Delete All Sessions

Memory Leak Detection
    Create Session    api    \${API_BASE}
    \${memory_usage}=    Create List
    FOR    \${cycle}    IN RANGE    1    11
        FOR    \${batch}    IN RANGE    1    11
            \${response}=     GET On Session    api    /photos/\${batch}
            Status Should Be    200    \${response}
        END
        \${usage}=        Evaluate    \${cycle} * 10
        Append To List    \${memory_usage}    \${usage}
        Sleep    0.5s
    END
    \${first_usage}=  Set Variable    \${memory_usage[0]}
    \${last_usage}=   Set Variable    \${memory_usage[-1]}
    \${growth_rate}=  Evaluate    (\${last_usage} - \${first_usage}) / \${first_usage} * 100
    Should Be True    \${growth_rate} < 50
    Log    Memory growth: \${growth_rate}% over test duration
    Delete All Sessions

Error Rate Monitoring
    Create Session    api    \${API_BASE}
    \${error_tracking}=    Create Dictionary    
    \${total_requests}=    Set Variable    0
    \${total_errors}=      Set Variable    0
    FOR    \${batch}    IN RANGE    1    6
        FOR    \${req}    IN RANGE    1    11
            TRY
                \${response}=     GET On Session    api    /posts/\${req}
                Should Be True    \${response.status_code} < 400
                \${total_requests}=    Evaluate    \${total_requests} + 1
            EXCEPT
                \${total_errors}=      Evaluate    \${total_errors} + 1
                \${total_requests}=    Evaluate    \${total_requests} + 1
            END
        END
    END
    \${final_error_rate}=    Evaluate    \${total_errors} / \${total_requests} * 100
    Should Be True    \${final_error_rate} < 2
    Set To Dictionary    \${error_tracking}    total_requests    \${total_requests}
    Set To Dictionary    \${error_tracking}    error_rate        \${final_error_rate}
    Log    Error monitoring: \${error_tracking}
    Delete All Sessions</code></pre>
        
        <h3>🎯 Práctica Load (5 min):</h3>
        <p>1. Ejecuta baseline performance para establecer métricas</p>
        <p>2. Modifica \${LOAD_USERS} y observa comportamiento</p>
        <p>3. Implementa concurrent users con sessions paralelas</p>
        <p>4. Valida response times bajo diferentes cargas</p>
        <p>5. Ejecuta stress testing con \${STRESS_USERS}</p>
        <p>6. Mide throughput (requests per second) real</p>
        <p>7. Detecta memory leaks en requests largos</p>
        <p>8. Monitorea error rates automáticamente</p>
        <p>9. Agrega timeout handling para requests lentos</p>
        <p>10. Experimenta con Sleep intervals entre requests</p>
        <p>11. Valida que error rate < threshold definido</p>
        <p>12. Crea reports detallados de performance</p>
        <p>13. Implementa escalabilidad testing gradual</p>
        <p>14. Testa breaking points de la API</p>
        <p>15. Log métricas detalladas para análisis</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar load testing con múltiples usuarios</li>
                <li>Medir throughput y response times bajo carga</li>
                <li>Detectar memory leaks y performance degradation</li>
                <li>Validar error rates y breaking points</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Load testing revela problemas que solo aparecen bajo presión. Siempre establece baseline antes de stress testing.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 129 - Contract Testing APIs</h3>
        <p>Aprenderás contract testing para validar que APIs mantienen compatibilidad entre versiones y microservicios.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-127"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_128 = LESSON_128;
}