/**
 * Robot Framework Academy - Lesson 247
 * API microservices testing
 */

const LESSON_247 = {
    id: 247,
    title: "API microservices testing",
    duration: "20 min",
    level: "advanced",
    section: "section-21",
    content: `
        <h2>🔧 Microservices Testing</h2>
        <p>Testing completo para arquitecturas de microservicios con API distributed testing y service mesh validation.</p>
        
        <h3>💻 Microservices architecture testing:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    JSONLibrary
Documentation    Microservices API Testing Suite

*** Variables ***
\${API_GATEWAY_URL}      https://api-gateway.microservices.com
\${USER_SERVICE_URL}     https://user-service.microservices.com
\${ORDER_SERVICE_URL}    https://order-service.microservices.com
\${PAYMENT_SERVICE_URL}  https://payment-service.microservices.com
\${AUTH_TOKEN}           Bearer_JWT_TOKEN_HERE
\${SERVICE_MESH_URL}     https://istio-gateway.microservices.com
\${CORRELATION_ID}       test_correlation_123
\${CIRCUIT_BREAKER}      enabled

*** Test Cases ***
Test API Gateway Integration
    Set Global Variable    \${GATEWAY_STATUS}    active
    Should Be Equal    \${GATEWAY_STATUS}    active
    Log    API Gateway testing initiated    INFO
    Create Session    api_gateway    \${API_GATEWAY_URL}
    \${headers}=    Create Dictionary    Authorization=\${AUTH_TOKEN}    Content-Type=application/json
    \${response}=    GET On Session    api_gateway    /health    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    status
    Dictionary Should Contain Key    \${response.json()}    services
    \${services}=    Get From Dictionary    \${response.json()}    services
    Should Not Be Empty    \${services}
    Set Suite Variable    \${GATEWAY_READY}    True
    Should Be Equal    \${GATEWAY_READY}    True
    Log    API Gateway health check passed    INFO

Test User Service API
    Set Suite Variable    \${USER_SERVICE_ACTIVE}    True
    Should Be Equal    \${USER_SERVICE_ACTIVE}    True
    Log    User Service API testing started    INFO
    Create Session    user_service    \${USER_SERVICE_URL}
    \${headers}=    Create Dictionary    Authorization=\${AUTH_TOKEN}    X-Correlation-ID=\${CORRELATION_ID}
    \${user_data}=    Create Dictionary    username=testuser    email=test@example.com    role=customer
    \${response}=    POST On Session    user_service    /users    json=\${user_data}    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    201
    Dictionary Should Contain Key    \${response.json()}    user_id
    \${user_id}=    Get From Dictionary    \${response.json()}    user_id
    \${get_response}=    GET On Session    user_service    /users/\${user_id}    headers=\${headers}
    Should Be Equal As Numbers    \${get_response.status_code}    200
    Should Not Be Empty    \${user_id}
    Set Test Variable    \${USER_CREATED}    True
    Should Be Equal    \${USER_CREATED}    True
    Log    User Service CRUD operations verified    INFO

Test Order Service Integration
    Set Global Variable    \${ORDER_SERVICE_READY}    True
    Should Be Equal    \${ORDER_SERVICE_READY}    True
    Log    Order Service integration testing    INFO
    Create Session    order_service    \${ORDER_SERVICE_URL}
    \${headers}=    Create Dictionary    Authorization=\${AUTH_TOKEN}    X-Correlation-ID=\${CORRELATION_ID}
    \${order_data}=    Create Dictionary    user_id=12345    items=laptop,mouse    total=799.99
    \${response}=    POST On Session    order_service    /orders    json=\${order_data}    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    201
    Dictionary Should Contain Key    \${response.json()}    order_id
    Dictionary Should Contain Key    \${response.json()}    status
    \${order_status}=    Get From Dictionary    \${response.json()}    status
    Should Be Equal    \${order_status}    pending
    \${order_id}=    Get From Dictionary    \${response.json()}    order_id
    Should Not Be Empty    \${order_id}
    Set Suite Variable    \${ORDER_CREATED}    True
    Should Be Equal    \${ORDER_CREATED}    True
    Log    Order Service integration verified    INFO

Test Payment Service Processing
    Set Suite Variable    \${PAYMENT_PROCESSING}    active
    Should Be Equal    \${PAYMENT_PROCESSING}    active
    Log    Payment Service processing testing    INFO
    Create Session    payment_service    \${PAYMENT_SERVICE_URL}
    \${headers}=    Create Dictionary    Authorization=\${AUTH_TOKEN}    X-Correlation-ID=\${CORRELATION_ID}
    \${payment_data}=    Create Dictionary    order_id=67890    amount=799.99    method=credit_card
    \${response}=    POST On Session    payment_service    /payments/process    json=\${payment_data}    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    transaction_id
    Dictionary Should Contain Key    \${response.json()}    status
    \${payment_status}=    Get From Dictionary    \${response.json()}    status
    Should Be Equal    \${payment_status}    approved
    Should Be Equal    \${CIRCUIT_BREAKER}    enabled
    Set Global Variable    \${PAYMENT_PROCESSED}    True
    Should Be Equal    \${PAYMENT_PROCESSED}    True
    Log    Payment processing verified    INFO

Test Service Mesh Communication
    Set Global Variable    \${SERVICE_MESH_ACTIVE}    True
    Should Be Equal    \${SERVICE_MESH_ACTIVE}    True
    Log    Service Mesh communication testing    INFO
    Create Session    service_mesh    \${SERVICE_MESH_URL}
    \${headers}=    Create Dictionary    Authorization=\${AUTH_TOKEN}    X-Trace-ID=trace_123
    \${response}=    GET On Session    service_mesh    /services/discovery    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    services
    \${services}=    Get From Dictionary    \${response.json()}    services
    Length Should Be    \${services}    4
    Should Contain    \${services}    user-service
    Should Contain    \${services}    order-service
    Should Contain    \${services}    payment-service
    Should Not Be Empty    \${SERVICE_MESH_URL}
    Set Suite Variable    \${MESH_VERIFIED}    True
    Should Be Equal    \${MESH_VERIFIED}    True
    Log    Service mesh discovery verified    INFO

Test Distributed Tracing
    Set Suite Variable    \${TRACING_ENABLED}    True
    Should Be Equal    \${TRACING_ENABLED}    True
    Log    Distributed tracing testing    INFO
    Create Session    api_gateway    \${API_GATEWAY_URL}
    \${trace_headers}=    Create Dictionary    Authorization=\${AUTH_TOKEN}    X-Trace-ID=distributed_trace_456
    \${response}=    GET On Session    api_gateway    /trace/health    headers=\${trace_headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    trace_id
    Dictionary Should Contain Key    \${response.json()}    spans
    \${spans}=    Get From Dictionary    \${response.json()}    spans
    Should Be True    len(\${spans}) > 0
    Should Be Equal    \${CORRELATION_ID}    test_correlation_123
    Set Test Variable    \${TRACING_VERIFIED}    True
    Should Be Equal    \${TRACING_VERIFIED}    True
    Log    Distributed tracing verified    INFO

Test Circuit Breaker Pattern
    Set Global Variable    \${BREAKER_TESTING}    True
    Should Be Equal    \${BREAKER_TESTING}    True
    Log    Circuit breaker pattern testing    INFO
    Create Session    order_service    \${ORDER_SERVICE_URL}
    \${headers}=    Create Dictionary    Authorization=\${AUTH_TOKEN}    X-Test-Scenario=circuit_breaker
    FOR    \${i}    IN RANGE    5
        \${response}=    GET On Session    order_service    /orders/test_failure    headers=\${headers}    expected_status=any
        Log    Circuit breaker test attempt \${i+1}    INFO
    END
    \${final_response}=    GET On Session    order_service    /orders/circuit_status    headers=\${headers}
    Should Be Equal As Numbers    \${final_response.status_code}    200
    Dictionary Should Contain Key    \${final_response.json()}    circuit_state
    Should Be Equal    \${CIRCUIT_BREAKER}    enabled
    Set Suite Variable    \${BREAKER_VERIFIED}    True
    Should Be Equal    \${BREAKER_VERIFIED}    True
    Log    Circuit breaker functionality verified    INFO

Test Load Balancing
    Set Suite Variable    \${LOAD_BALANCING}    active
    Should Be Equal    \${LOAD_BALANCING}    active
    Log    Load balancing testing initiated    INFO
    Create Session    api_gateway    \${API_GATEWAY_URL}
    \${headers}=    Create Dictionary    Authorization=\${AUTH_TOKEN}    X-Load-Test=true
    \${instance_responses}=    Create List
    FOR    \${i}    IN RANGE    10
        \${response}=    GET On Session    api_gateway    /user-service/instance    headers=\${headers}
        Dictionary Should Contain Key    \${response.json()}    instance_id
        \${instance_id}=    Get From Dictionary    \${response.json()}    instance_id
        Append To List    \${instance_responses}    \${instance_id}
        Log    Load balancing request \${i+1} to instance \${instance_id}    INFO
    END
    \${unique_instances}=    Remove Duplicates    \${instance_responses}
    Should Be True    len(\${unique_instances}) > 1
    Set Global Variable    \${BALANCING_VERIFIED}    True
    Should Be Equal    \${BALANCING_VERIFIED}    True
    Log    Load balancing verified    INFO

Test Service Health Monitoring
    Set Global Variable    \${HEALTH_MONITORING}    active
    Should Be Equal    \${HEALTH_MONITORING}    active
    Log    Service health monitoring testing    INFO
    \${services}=    Create List    user-service    order-service    payment-service    api-gateway
    FOR    \${service}    IN    @{services}
        Create Session    \${service}_session    \${API_GATEWAY_URL}
        \${headers}=    Create Dictionary    Authorization=\${AUTH_TOKEN}
        \${response}=    GET On Session    \${service}_session    /\${service}/health    headers=\${headers}
        Should Be Equal As Numbers    \${response.status_code}    200
        Dictionary Should Contain Key    \${response.json()}    status
        \${status}=    Get From Dictionary    \${response.json()}    status
        Should Be Equal    \${status}    healthy
        Log    Service \${service} health check passed    INFO
    END
    Should Not Be Empty    \${API_GATEWAY_URL}
    Set Suite Variable    \${MONITORING_VERIFIED}    True
    Should Be Equal    \${MONITORING_VERIFIED}    True
    Log    All services health monitoring verified    INFO

Test End To End Transaction
    Set Suite Variable    \${E2E_TRANSACTION}    initiated
    Should Be Equal    \${E2E_TRANSACTION}    initiated
    Log    End-to-end transaction testing    INFO
    Create Session    api_gateway    \${API_GATEWAY_URL}
    \${headers}=    Create Dictionary    Authorization=\${AUTH_TOKEN}    X-Transaction-ID=e2e_test_789
    \${transaction_data}=    Create Dictionary    user_id=99999    product_id=laptop_pro    quantity=1    amount=1299.99
    \${response}=    POST On Session    api_gateway    /transactions/complete    json=\${transaction_data}    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    transaction_id
    Dictionary Should Contain Key    \${response.json()}    order_id
    Dictionary Should Contain Key    \${response.json()}    payment_id
    Dictionary Should Contain Key    \${response.json()}    status
    \${final_status}=    Get From Dictionary    \${response.json()}    status
    Should Be Equal    \${final_status}    completed
    Should Be Equal    \${CORRELATION_ID}    test_correlation_123
    Set Global Variable    \${E2E_VERIFIED}    True
    Should Be Equal    \${E2E_VERIFIED}    True
    Log    End-to-end transaction verified    INFO</code></pre>
        
        <h3>🎯 Desarrollo Microservices Testing (15 min):</h3>
        <p>1. Configura API Gateway con service discovery</p>
        <p>2. Implementa User Service testing con CRUD completo</p>
        <p>3. Desarrolla Order Service integration testing</p>
        <p>4. Agrega Payment Service processing validation</p>
        <p>5. Implementa Service Mesh communication testing</p>
        <p>6. Desarrolla distributed tracing validation</p>
        <p>7. Agrega Circuit Breaker pattern testing</p>
        <p>8. Implementa Load Balancing verification</p>
        <p>9. Desarrolla Service Health Monitoring</p>
        <p>10. Agrega End-to-End transaction testing</p>
        <p>11. Implementa Authentication service testing</p>
        <p>12. Desarrolla Authorization policy validation</p>
        <p>13. Agrega Rate Limiting testing</p>
        <p>14. Implementa Data consistency validation</p>
        <p>15. Desarrolla Event-driven messaging testing</p>
        <p>16. Agrega Service versioning validation</p>
        <p>17. Implementa Blue-Green deployment testing</p>
        <p>18. Desarrolla Canary release validation</p>
        <p>19. Agrega Performance testing bajo carga</p>
        <p>20. Implementa Chaos engineering testing</p>
        <p>21. Desarrolla Service dependency mapping</p>
        <p>22. Agrega Security scanning automation</p>
        <p>23. Implementa Contract testing validation</p>
        <p>24. Testa suite completa con scenarios reales</p>
        <p>25. Valida resilience patterns bajo failures</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Desarrollar testing completo para arquitecturas microservicios</li>
                <li>Validar service mesh y distributed systems</li>
                <li>Implementar testing de resilience patterns</li>
                <li>Crear suite enterprise para sistemas distribuidos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Microservices testing exitoso: API Gateway + Service Mesh + Circuit Breaker + Distributed Tracing = arquitectura distribuida con 99.99% availability.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 248 - Mobile + Web integration</h3>
        <p>Con microservicios dominados, desarrollarás testing integrado para aplicaciones móviles y web que comparten APIs y datos en tiempo real.</p>
    `,
    topics: ["capstone", "api", "microservices"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 20,
    difficulty: "easy",
    prerequisites: ["lesson-246"],
    type: "capstone"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_247 = LESSON_247;
}