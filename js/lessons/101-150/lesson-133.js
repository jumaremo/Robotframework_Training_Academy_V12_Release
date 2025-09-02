/**
 * Robot Framework Academy - Lesson 133
 * API Testing 133
 */

const LESSON_133 = {
    id: 133,
    title: "API Testing 133",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>⚡ gRPC Testing</h2>
        <p>Automatización testing gRPC APIs con Protocol Buffers, streaming y microservices communication.</p>
        
        <h3>💻 gRPC Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String
Library    Process
Library    OperatingSystem

*** Variables ***
\${GRPC_SERVER}     localhost:50051
\${GRPC_CLIENT}     grpcurl
\${PROTO_FILE}      \${CURDIR}/protos/service.proto
\${SERVICE_NAME}    UserService
\${METHOD_NAME}     GetUser
\${STREAMING_METHOD}    StreamUsers
\${REQUEST_DATA}    {"id": 1, "name": "Test User"}
\${RESPONSE_DATA}   \${EMPTY}

*** Test Cases ***
gRPC Service Discovery
    \${discovery_cmd}=    Set Variable    \${GRPC_CLIENT} -plaintext \${GRPC_SERVER} list
    \${result}=           Run Process    \${discovery_cmd}    shell=True
    Should Be Equal       \${result.rc}    0
    Should Not Be Empty   \${result.stdout}
    Should Contain        \${result.stdout}    \${SERVICE_NAME}
    Should Not Contain    \${result.stderr}    error
    Should Not Contain    \${result.stderr}    failed
    \${services_count}=   Get Line Count    \${result.stdout}
    Should Be True        \${services_count} >= 1
    Log    gRPC services discovered: \${result.stdout}

Unary RPC Call Test
    \${unary_cmd}=        Set Variable    \${GRPC_CLIENT} -plaintext -d '\${REQUEST_DATA}' \${GRPC_SERVER} \${SERVICE_NAME}/\${METHOD_NAME}
    \${result}=           Run Process    \${unary_cmd}    shell=True
    Should Be Equal       \${result.rc}    0
    Should Not Be Empty   \${result.stdout}
    Should Contain        \${result.stdout}    {
    Should Contain        \${result.stdout}    }
    Should Not Contain    \${result.stderr}    error
    Set Suite Variable    \${RESPONSE_DATA}    \${result.stdout}
    \${response_length}=  Get Length    \${RESPONSE_DATA}
    Should Be True        \${response_length} > 10
    Log    Unary RPC response: \${RESPONSE_DATA}

Protocol Buffer Validation
    Should Not Be Empty   \${RESPONSE_DATA}
    Should Contain        \${RESPONSE_DATA}    id
    Should Contain        \${RESPONSE_DATA}    name
    Should Match Regexp   \${RESPONSE_DATA}    "id":\\s*\\d+
    Should Match Regexp   \${RESPONSE_DATA}    "name":\\s*"[^"]+"
    Should Be True        '\${RESPONSE_DATA}'.count('{') == '\${RESPONSE_DATA}'.count('}')
    Should Be True        '\${RESPONSE_DATA}'.count('[') == '\${RESPONSE_DATA}'.count(']')
    \${json_valid}=       Evaluate    json.loads('''\${RESPONSE_DATA}''')
    Should Not Be None    \${json_valid}
    Log    Protocol Buffer validation passed

Server Streaming Test
    \${stream_cmd}=       Set Variable    \${GRPC_CLIENT} -plaintext -d '{"limit": 5}' \${GRPC_SERVER} \${SERVICE_NAME}/\${STREAMING_METHOD}
    \${result}=           Run Process    \${stream_cmd}    shell=True    timeout=30s
    Should Be Equal       \${result.rc}    0
    Should Not Be Empty   \${result.stdout}
    \${stream_lines}=     Split To Lines    \${result.stdout}
    Length Should Be Greater Than    \${stream_lines}    1
    FOR    \${line}    IN    @{stream_lines}
        Should Contain    \${line}    {
        Should Contain    \${line}    id
    END
    \${stream_count}=     Get Length    \${stream_lines}
    Should Be True        \${stream_count} <= 5
    Log    Server streaming: \${stream_count} messages received

gRPC Error Handling
    \${error_cmd}=        Set Variable    \${GRPC_CLIENT} -plaintext -d '{"id": -1}' \${GRPC_SERVER} \${SERVICE_NAME}/\${METHOD_NAME}
    \${result}=           Run Process    \${error_cmd}    shell=True
    Should Not Be Equal   \${result.rc}    0
    Should Not Be Empty   \${result.stderr}
    Should Contain        \${result.stderr}    error
    Should Contain        \${result.stderr}    code
    Should Match Regexp   \${result.stderr}    code\\s*[=:]\\s*\\d+
    \${error_details}=    Get Line Count    \${result.stderr}
    Should Be True        \${error_details} >= 1
    Log    gRPC error handled: \${result.stderr}

Health Check Testing
    \${health_cmd}=       Set Variable    \${GRPC_CLIENT} -plaintext \${GRPC_SERVER} grpc.health.v1.Health/Check
    \${result}=           Run Process    \${health_cmd}    shell=True
    Should Be Equal       \${result.rc}    0
    Should Not Be Empty   \${result.stdout}
    Should Contain        \${result.stdout}    status
    Should Contain        \${result.stdout}    SERVING
    Should Not Contain    \${result.stdout}    NOT_SERVING
    Should Not Contain    \${result.stdout}    UNKNOWN
    \${health_status}=    Get Lines Containing String    \${result.stdout}    SERVING
    Should Not Be Empty   \${health_status}
    Log    Health check passed: \${result.stdout}

Performance Load Testing
    \${performance_results}=    Create List
    FOR    \${i}    IN RANGE    1    11
        \${perf_cmd}=     Set Variable    \${GRPC_CLIENT} -plaintext -d '\${REQUEST_DATA}' \${GRPC_SERVER} \${SERVICE_NAME}/\${METHOD_NAME}
        \${start_time}=   Get Current Date    result_format=epoch
        \${result}=       Run Process    \${perf_cmd}    shell=True
        \${end_time}=     Get Current Date    result_format=epoch
        \${duration}=     Evaluate    \${end_time} - \${start_time}
        Should Be Equal   \${result.rc}    0
        Append To List    \${performance_results}    \${duration}
        Should Be True    \${duration} < 2
    END
    \${avg_time}=         Evaluate    sum(\${performance_results}) / len(\${performance_results})
    \${max_time}=         Evaluate    max(\${performance_results})
    Should Be True        \${avg_time} < 1
    Should Be True        \${max_time} < 2
    Log    gRPC performance: avg=\${avg_time}s, max=\${max_time}s

Metadata Headers Testing
    \${metadata_cmd}=     Set Variable    \${GRPC_CLIENT} -plaintext -H "authorization: Bearer token123" -H "x-request-id: test-123" -d '\${REQUEST_DATA}' \${GRPC_SERVER} \${SERVICE_NAME}/\${METHOD_NAME}
    \${result}=           Run Process    \${metadata_cmd}    shell=True
    Should Be Equal       \${result.rc}    0
    Should Not Be Empty   \${result.stdout}
    Should Contain        \${result.stdout}    {
    Should Not Contain    \${result.stderr}    unauthorized
    Should Not Contain    \${result.stderr}    forbidden
    \${metadata_response}=    Get Length    \${result.stdout}
    Should Be True        \${metadata_response} > 0
    Log    Metadata headers processed successfully

Connection Management Test
    \${connection_results}=    Create Dictionary    success=0    failures=0
    FOR    \${attempt}    IN RANGE    1    6
        TRY
            \${conn_cmd}=     Set Variable    \${GRPC_CLIENT} -plaintext -connect-timeout 5s \${GRPC_SERVER} list
            \${result}=       Run Process    \${conn_cmd}    shell=True
            Should Be Equal   \${result.rc}    0
            \${success}=      Evaluate    \${connection_results['success']} + 1
            Set To Dictionary    \${connection_results}    success    \${success}
        EXCEPT
            \${failures}=     Evaluate    \${connection_results['failures']} + 1
            Set To Dictionary    \${connection_results}    failures    \${failures}
        END
        Sleep    0.5s
    END
    Should Be True        \${connection_results['success']} >= 4
    Should Be True        \${connection_results['failures']} <= 1
    Log    Connection management: \${connection_results}</code></pre>
        
        <h3>🎯 Práctica gRPC (5 min):</h3>
        <p>1. Ejecuta service discovery para explorar APIs</p>
        <p>2. Modifica \${REQUEST_DATA} y observa responses</p>
        <p>3. Implementa unary RPC call testing</p>
        <p>4. Valida Protocol Buffer structure correcta</p>
        <p>5. Testa server streaming con múltiples messages</p>
        <p>6. Maneja gRPC errors y status codes</p>
        <p>7. Ejecuta health checks automáticos</p>
        <p>8. Mide performance con load testing</p>
        <p>9. Agrega metadata headers en requests</p>
        <p>10. Testa connection management y timeouts</p>
        <p>11. Valida JSON response structure</p>
        <p>12. Implementa Should Match Regexp para validation</p>
        <p>13. Agrega Run Process timeout handling</p>
        <p>14. Testa different service methods</p>
        <p>15. Log detailed gRPC metrics para monitoring</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar gRPC service discovery y unary calls</li>
                <li>Implementar Protocol Buffer validation</li>
                <li>Manejar server streaming y error handling</li>
                <li>Ejecutar performance testing y metadata headers</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>gRPC usa HTTP/2 y Protocol Buffers. Instala grpcurl para testing desde línea de comandos fácilmente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 134 - API testing project</h3>
        <p>Crearás un proyecto completo de API testing integrando REST, GraphQL, WebSocket, SOAP y gRPC en una suite unificada.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-132"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_133 = LESSON_133;
}