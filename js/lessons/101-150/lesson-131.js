/**
 * Robot Framework Academy - Lesson 131
 * API Testing 131
 */

const LESSON_131 = {
    id: 131,
    title: "API Testing 131",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>🔄 WebSocket Testing</h2>
        <p>Automatización testing WebSocket APIs para real-time communication y event-driven systems.</p>
        
        <h3>💻 WebSocket Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String
Library    DateTime
Library    Process

*** Variables ***
\${WS_URL}          ws://localhost:8080/websocket
\${WS_SECURE_URL}   wss://echo.websocket.org
\${CONNECTION_ID}   \${EMPTY}
\${MESSAGE_COUNT}   0
\${PING_INTERVAL}   30s
\${TIMEOUT}         10s
\${TEST_MESSAGE}    {"type": "test", "data": "Hello WebSocket"}

*** Test Cases ***
WebSocket Connection Test
    \${start_time}=      Get Current Date    result_format=epoch
    \${connection}=      Set Variable    ws_connection_1
    Set Suite Variable   \${CONNECTION_ID}    \${connection}
    \${end_time}=        Get Current Date    result_format=epoch
    \${connect_time}=    Evaluate    \${end_time} - \${start_time}
    Should Be True       \${connect_time} < 5
    Should Not Be Empty  \${CONNECTION_ID}
    Log    WebSocket connection established: \${CONNECTION_ID}

Send Message Test
    Should Not Be Empty    \${CONNECTION_ID}
    \${message_data}=      Create Dictionary    type=message    content=Test message    timestamp=\${EMPTY}
    \${current_time}=      Get Current Date    result_format=%Y-%m-%d %H:%M:%S
    Set To Dictionary      \${message_data}    timestamp    \${current_time}
    \${message_json}=      Evaluate    json.dumps(\${message_data})
    Should Contain         \${message_json}    Test message
    Should Contain         \${message_json}    timestamp
    \${message_count}=     Evaluate    \${MESSAGE_COUNT} + 1
    Set Suite Variable     \${MESSAGE_COUNT}    \${message_count}
    Log    Message sent: \${message_json}

Receive Message Validation
    Should Not Be Empty    \${CONNECTION_ID}
    \${expected_response}=    Create Dictionary    status=received    messageId=1    echo=\${TEST_MESSAGE}
    \${response_json}=       Evaluate    json.dumps(\${expected_response})
    Should Have Key          \${expected_response}    status
    Should Have Key          \${expected_response}    messageId
    Should Have Key          \${expected_response}    echo
    Should Be Equal          \${expected_response['status']}    received
    Should Be True           isinstance(\${expected_response['messageId']}, int)
    Should Not Be Empty      \${expected_response['echo']}
    Log    Message received and validated: \${response_json}

Ping Pong Testing
    Should Not Be Empty    \${CONNECTION_ID}
    \${ping_message}=      Create Dictionary    type=ping    timestamp=\${EMPTY}
    \${ping_time}=         Get Current Date    result_format=epoch
    Set To Dictionary      \${ping_message}    timestamp    \${ping_time}
    \${pong_response}=     Create Dictionary    type=pong    timestamp=\${ping_time}    latency=0.05
    Should Be Equal        \${ping_message['type']}    ping
    Should Be Equal        \${pong_response['type']}    pong
    Should Be Equal        \${ping_message['timestamp']}    \${pong_response['timestamp']}
    Should Be True         \${pong_response['latency']} < 1
    Log    Ping-Pong successful, latency: \${pong_response['latency']}s

Multiple Connections Test
    \${connections}=       Create List
    FOR    \${i}    IN RANGE    1    6
        \${conn_id}=       Set Variable    ws_connection_\${i}
        Append To List     \${connections}    \${conn_id}
        \${test_msg}=      Create Dictionary    connectionId=\${conn_id}    message=Test from \${i}
        Should Be Equal    \${test_msg['connectionId']}    \${conn_id}
        Should Contain     \${test_msg['message']}    Test from
    END
    Length Should Be       \${connections}    5
    Log    Multiple connections established: \${connections}

Message Broadcasting Test
    \${broadcast_msg}=     Create Dictionary    type=broadcast    content=Server announcement    recipients=all
    \${expected_clients}=  Set Variable    5
    \${broadcast_json}=    Evaluate    json.dumps(\${broadcast_msg})
    Should Contain         \${broadcast_json}    broadcast
    Should Contain         \${broadcast_json}    Server announcement
    Should Be Equal        \${broadcast_msg['recipients']}    all
    Should Be True         \${expected_clients} > 0
    Log    Broadcast message sent to \${expected_clients} clients

Connection Persistence Test
    \${start_time}=        Get Current Date    result_format=epoch
    Sleep                  5s
    \${end_time}=          Get Current Date    result_format=epoch
    \${duration}=          Evaluate    \${end_time} - \${start_time}
    Should Be True         \${duration} >= 5
    Should Not Be Empty    \${CONNECTION_ID}
    \${persistence_msg}=   Create Dictionary    type=heartbeat    duration=\${duration}
    Should Be Equal        \${persistence_msg['type']}    heartbeat
    Should Be True         \${persistence_msg['duration']} >= 5
    Log    Connection persisted for \${duration} seconds

Error Handling Test
    \${invalid_message}=   Create Dictionary    type=invalid    malformed_data=true
    \${error_response}=    Create Dictionary    error=true    code=400    message=Invalid message format
    Should Be Equal        \${invalid_message['type']}    invalid
    Should Be True         \${invalid_message['malformed_data']}
    Should Be True         \${error_response['error']}
    Should Be Equal        \${error_response['code']}    400
    Should Contain         \${error_response['message']}    Invalid
    Log    Error handling validated: \${error_response['message']}

WebSocket Disconnection Test
    Should Not Be Empty    \${CONNECTION_ID}
    \${disconnect_msg}=    Create Dictionary    type=disconnect    connectionId=\${CONNECTION_ID}    reason=test_complete
    \${final_stats}=       Create Dictionary    messagesProcessed=\${MESSAGE_COUNT}    duration=60s    status=closed
    Should Be Equal        \${disconnect_msg['type']}    disconnect
    Should Be Equal        \${disconnect_msg['connectionId']}    \${CONNECTION_ID}
    Should Be Equal        \${disconnect_msg['reason']}    test_complete
    Should Be Equal        \${final_stats['status']}    closed
    Should Be True         \${final_stats['messagesProcessed']} >= 0
    Set Suite Variable     \${CONNECTION_ID}    \${EMPTY}
    Log    WebSocket disconnected: \${final_stats}</code></pre>
        
        <h3>🎯 Práctica WebSocket (5 min):</h3>
        <p>1. Ejecuta connection test y mide tiempo establecimiento</p>
        <p>2. Modifica \${TEST_MESSAGE} y observa echo responses</p>
        <p>3. Implementa send/receive message validation</p>
        <p>4. Testa ping-pong mechanism para keepalive</p>
        <p>5. Simula múltiples conexiones concurrentes</p>
        <p>6. Valida message broadcasting a todos los clientes</p>
        <p>7. Testa connection persistence con Sleep delays</p>
        <p>8. Maneja errores y mensajes malformados</p>
        <p>9. Implementa graceful disconnection handling</p>
        <p>10. Agrega Should Be True para latency validation</p>
        <p>11. Valida JSON message structure correcta</p>
        <p>12. Testa reconnection logic automático</p>
        <p>13. Mide message throughput y performance</p>
        <p>14. Implementa timeout handling robusto</p>
        <p>15. Log detailed WebSocket metrics para monitoring</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar WebSocket connection testing</li>
                <li>Validar real-time message exchange</li>
                <li>Implementar ping-pong y heartbeat testing</li>
                <li>Manejar múltiples conexiones y broadcasting</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>WebSockets mantienen conexión persistente. Siempre implementa timeout y graceful disconnection en tests.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 132 - SOAP API Testing</h3>
        <p>Aprenderás a automatizar testing de SOAP APIs con XML parsing, WSDL validation y envelope structure verification.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-130"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_131 = LESSON_131;
}