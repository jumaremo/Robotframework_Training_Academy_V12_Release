/**
 * Robot Framework Academy - Lesson 134
 * API testing project
 */

const LESSON_134 = {
    id: 134,
    title: "API testing project",
    duration: "15 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>🚀 Proyecto API Completo</h2>
        <p>Proyecto integrador combinando REST, GraphQL, WebSocket, SOAP y gRPC en suite unificada.</p>
        
        <h3>💻 Suite Integrada:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String
Library    DateTime
Library    Process
Library    OperatingSystem
Library    XML

*** Variables ***
\${REST_BASE}       https://jsonplaceholder.typicode.com
\${GRAPHQL_URL}     http://localhost:4000/graphql
\${WS_URL}          ws://localhost:8080/websocket
\${SOAP_URL}        http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso
\${GRPC_SERVER}     localhost:50051
\${PROJECT_DIR}     \${CURDIR}/api_project
\${RESULTS_DIR}     \${PROJECT_DIR}/results
\${TEST_DATA_FILE}  \${PROJECT_DIR}/data/test_data.json
\${API_RESULTS}     \${EMPTY}
\${TOTAL_APIS}      5
\${SUCCESS_COUNT}   0

*** Test Cases ***
Project Setup and Initialization
    Create Directory       \${PROJECT_DIR}
    Create Directory       \${RESULTS_DIR}
    \${setup_time}=        Get Current Date    result_format=%Y%m%d_%H%M%S
    \${test_session}=      Set Variable    api_integration_\${setup_time}
    Set Suite Variable     \${TEST_SESSION}    \${test_session}
    \${project_config}=    Create Dictionary    
    ...                    session=\${test_session}
    ...                    start_time=\${setup_time}
    ...                    apis_tested=0
    ...                    total_requests=0
    Set Suite Variable     \${PROJECT_CONFIG}    \${project_config}
    Log    Project initialized: \${test_session}

REST API Integration Test
    Create Session    rest    \${REST_BASE}
    \${rest_results}=    Create Dictionary    api_type=REST    status=TESTING
    \${users_response}=    GET On Session    rest    /users
    Status Should Be       200    \${users_response}
    \${users}=            Set Variable    \${users_response.json()}
    Length Should Be       \${users}    10
    \${posts_response}=    GET On Session    rest    /posts
    Status Should Be       200    \${posts_response}
    \${posts}=            Set Variable    \${posts_response.json()}
    Length Should Be       \${posts}    100
    \${test_user}=        Create Dictionary    name=Integration User    email=integration@test.com
    \${create_response}=   POST On Session    rest    /users    json=\${test_user}
    Status Should Be       201    \${create_response}
    Set To Dictionary      \${rest_results}    status    SUCCESS    users_count=\${len(\${users})}    posts_count=\${len(\${posts})}
    \${success_count}=     Evaluate    \${SUCCESS_COUNT} + 1
    Set Suite Variable     \${SUCCESS_COUNT}    \${success_count}
    Delete All Sessions
    Log    REST API integration: \${rest_results}

GraphQL API Integration Test
    Create Session    graphql    \${GRAPHQL_URL}
    \${graphql_results}=    Create Dictionary    api_type=GraphQL    status=TESTING
    \${schema_query}=       Create Dictionary    query={ __schema { types { name } } }
    \${schema_response}=    POST On Session    graphql    /    json=\${schema_query}
    Status Should Be        200    \${schema_response}
    \${schema_data}=        Set Variable    \${schema_response.json()}
    Should Have Key         \${schema_data}    data
    \${users_query}=        Create Dictionary    query={ users { id name email } }
    \${users_response}=     POST On Session    graphql    /    json=\${users_query}
    Status Should Be        200    \${users_response}
    \${users_data}=         Set Variable    \${users_response.json()}
    Should Have Key         \${users_data}    data
    Should Have Key         \${users_data['data']}    users
    \${mutation_data}=      Create Dictionary    
    ...                     query=mutation { createUser(input: {name: "GraphQL User", email: "graphql@test.com"}) { id name } }
    \${mutation_response}=  POST On Session    graphql    /    json=\${mutation_data}
    Status Should Be        200    \${mutation_response}
    Set To Dictionary       \${graphql_results}    status    SUCCESS    schema_validated=True
    \${success_count}=      Evaluate    \${SUCCESS_COUNT} + 1
    Set Suite Variable      \${SUCCESS_COUNT}    \${success_count}
    Delete All Sessions
    Log    GraphQL API integration: \${graphql_results}

WebSocket API Integration Test
    \${ws_results}=         Create Dictionary    api_type=WebSocket    status=TESTING
    \${connection_id}=      Set Variable    ws_integration_001
    \${ping_message}=       Create Dictionary    type=ping    connectionId=\${connection_id}    timestamp=\${EMPTY}
    \${current_time}=       Get Current Date    result_format=epoch
    Set To Dictionary       \${ping_message}    timestamp    \${current_time}
    \${pong_response}=      Create Dictionary    type=pong    connectionId=\${connection_id}    latency=0.08
    Should Be Equal         \${ping_message['type']}    ping
    Should Be Equal         \${pong_response['type']}    pong
    Should Be True          \${pong_response['latency']} < 1
    \${broadcast_test}=     Create Dictionary    type=broadcast    message=Integration test message    clients=5
    Should Be Equal         \${broadcast_test['type']}    broadcast
    Should Be True          \${broadcast_test['clients']} > 0
    Set To Dictionary       \${ws_results}    status    SUCCESS    latency=\${pong_response['latency']}
    \${success_count}=      Evaluate    \${SUCCESS_COUNT} + 1
    Set Suite Variable      \${SUCCESS_COUNT}    \${success_count}
    Log    WebSocket API integration: \${ws_results}

SOAP API Integration Test
    Create Session    soap    \${SOAP_URL}
    \${soap_results}=       Create Dictionary    api_type=SOAP    status=TESTING
    \${wsdl_response}=      GET On Session    soap    /?WSDL
    Status Should Be        200    \${wsdl_response}
    Should Contain          \${wsdl_response.text}    <definitions
    \${soap_envelope}=      Set Variable    <?xml version="1.0"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.oorsprong.org/websamples.countryinfo"><soap:Body><web:CapitalCity><web:sCountryISOCode>US</web:sCountryISOCode></web:CapitalCity></soap:Body></soap:Envelope>
    \${headers}=            Create Dictionary    Content-Type=text/xml; charset=utf-8    SOAPAction=http://www.oorsprong.org/websamples.countryinfo/CapitalCity
    \${soap_response}=      POST On Session    soap    /    data=\${soap_envelope}    headers=\${headers}
    Status Should Be        200    \${soap_response}
    Should Contain          \${soap_response.text}    soap:Envelope
    Should Not Contain      \${soap_response.text}    soap:Fault
    \${xml_root}=           Parse XML    \${soap_response.text}
    Should Not Be None      \${xml_root}
    Set To Dictionary       \${soap_results}    status    SUCCESS    wsdl_validated=True
    \${success_count}=      Evaluate    \${SUCCESS_COUNT} + 1
    Set Suite Variable      \${SUCCESS_COUNT}    \${success_count}
    Delete All Sessions
    Log    SOAP API integration: \${soap_results}

gRPC API Integration Test
    \${grpc_results}=       Create Dictionary    api_type=gRPC    status=TESTING
    \${discovery_cmd}=      Set Variable    grpcurl -plaintext \${GRPC_SERVER} list
    \${discovery_result}=   Run Process    \${discovery_cmd}    shell=True
    Should Be Equal         \${discovery_result.rc}    0
    Should Not Be Empty     \${discovery_result.stdout}
    \${health_cmd}=         Set Variable    grpcurl -plaintext \${GRPC_SERVER} grpc.health.v1.Health/Check
    \${health_result}=      Run Process    \${health_cmd}    shell=True
    Should Be Equal         \${health_result.rc}    0
    Should Contain          \${health_result.stdout}    SERVING
    \${rpc_cmd}=            Set Variable    grpcurl -plaintext -d '{"id": 1}' \${GRPC_SERVER} UserService/GetUser
    \${rpc_result}=         Run Process    \${rpc_cmd}    shell=True
    Should Be Equal         \${rpc_result.rc}    0
    Should Not Be Empty     \${rpc_result.stdout}
    Set To Dictionary       \${grpc_results}    status    SUCCESS    health_check=SERVING
    \${success_count}=      Evaluate    \${SUCCESS_COUNT} + 1
    Set Suite Variable      \${SUCCESS_COUNT}    \${success_count}
    Log    gRPC API integration: \${grpc_results}

Integration Results Analysis
    \${final_results}=      Create Dictionary
    ...                     session=\${TEST_SESSION}
    ...                     total_apis_tested=\${TOTAL_APIS}
    ...                     successful_apis=\${SUCCESS_COUNT}
    ...                     success_rate=\${SUCCESS_COUNT / TOTAL_APIS * 100}
    ...                     test_completion=\${SUCCESS_COUNT == TOTAL_APIS}
    Should Be Equal         \${final_results['total_apis_tested']}    \${TOTAL_APIS}
    Should Be True          \${final_results['success_rate']} >= 80
    Should Be True          \${final_results['test_completion']}
    \${results_file}=       Set Variable    \${RESULTS_DIR}/integration_results_\${TEST_SESSION}.json
    \${results_json}=       Evaluate    json.dumps(\${final_results}, indent=2)
    Create File             \${results_file}    \${results_json}
    File Should Exist       \${results_file}
    Log    Integration analysis: \${final_results}

Project Performance Benchmarks
    \${performance_data}=   Create Dictionary
    \${benchmark_apis}=     Create List    REST    GraphQL    SOAP
    FOR    \${api_type}    IN    @{benchmark_apis}
        \${start_time}=     Get Current Date    result_format=epoch
        IF    '\${api_type}' == 'REST'
            Create Session    perf    \${REST_BASE}
            \${response}=   GET On Session    perf    /users/1
            Delete All Sessions
        ELSE IF    '\${api_type}' == 'GraphQL'
            Create Session    perf    \${GRAPHQL_URL}
            \${query}=      Create Dictionary    query={ users(first: 1) { id } }
            \${response}=   POST On Session    perf    /    json=\${query}
            Delete All Sessions
        ELSE IF    '\${api_type}' == 'SOAP'
            Create Session    perf    \${SOAP_URL}
            \${envelope}=   Set Variable    <?xml version="1.0"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><web:CapitalCity xmlns:web="http://www.oorsprong.org/websamples.countryinfo"><web:sCountryISOCode>US</web:sCountryISOCode></web:CapitalCity></soap:Body></soap:Envelope>
            \${headers}=    Create Dictionary    Content-Type=text/xml; charset=utf-8
            \${response}=   POST On Session    perf    /    data=\${envelope}    headers=\${headers}
            Delete All Sessions
        END
        \${end_time}=       Get Current Date    result_format=epoch
        \${duration}=       Evaluate    \${end_time} - \${start_time}
        Set To Dictionary   \${performance_data}    \${api_type}    \${duration}
        Should Be True      \${duration} < 5
    END
    Log    Performance benchmarks: \${performance_data}

Project Cleanup and Reporting
    \${cleanup_summary}=    Create Dictionary    
    ...                     project_dir=\${PROJECT_DIR}
    ...                     results_generated=True
    ...                     apis_tested=\${SUCCESS_COUNT}
    ...                     cleanup_status=COMPLETE
    Should Be True          \${cleanup_summary['results_generated']}
    Should Be Equal         \${cleanup_summary['apis_tested']}    \${TOTAL_APIS}
    Should Be Equal         \${cleanup_summary['cleanup_status']}    COMPLETE
    Directory Should Exist  \${RESULTS_DIR}
    Log    Project cleanup completed: \${cleanup_summary}</code></pre>
        
        <h3>🎯 Proyecto Integrador (12 min):</h3>
        <p>1. Ejecuta setup completo del proyecto API</p>
        <p>2. Implementa REST API testing con CRUD operations</p>
        <p>3. Integra GraphQL queries, mutations y schema validation</p>
        <p>4. Simula WebSocket connections y message exchange</p>
        <p>5. Testa SOAP services con WSDL y XML parsing</p>
        <p>6. Valida gRPC services con health checks</p>
        <p>7. Analiza integration results automáticamente</p>
        <p>8. Ejecuta performance benchmarks comparativos</p>
        <p>9. Genera reports detallados en JSON format</p>
        <p>10. Valida que success rate >= 80% global</p>
        <p>11. Implementa error handling robusto</p>
        <p>12. Crea project structure escalable</p>
        <p>13. Agrega logging comprehensivo</p>
        <p>14. Valida file creation y directory structure</p>
        <p>15. Ejecuta cleanup automático al final</p>
        <p>16. Confirma que todos los APIs responden</p>
        <p>17. Mide performance cross-technology</p>
        <p>18. Documenta results para future reference</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar 5 tecnologías API en proyecto unificado</li>
                <li>Automatizar testing cross-platform completo</li>
                <li>Generar performance benchmarks comparativos</li>
                <li>Crear reporting y analytics automáticos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Este proyecto demuestra competencia enterprise en API testing. Úsalo como portfolio para entrevistas técnicas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 135 - Fundamentos Database Testing</h3>
        <p>Con APIs dominadas, aprenderás a automatizar testing de bases de datos SQL y NoSQL para validación end-to-end completa.</p>
    `,
    topics: ["api", "project"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 15,
    difficulty: "intermediate",
    prerequisites: ["lesson-133"],
    type: "integration"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_134 = LESSON_134;
}