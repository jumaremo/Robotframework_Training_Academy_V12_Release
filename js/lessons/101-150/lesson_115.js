/**
 * Robot Framework Academy - Lesson 115
 * Integration testing patterns
 */

const LESSON_115 = {
    id: 115,
    title: "Interacciones Avanzadas 115",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>🔗 Integration testing patterns</h2>
        <p>Patrones de integration testing, mocking de servicios externos y testing de APIs dependency chains.</p>
        
        <h3>💻 Tests Integration Patterns:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com
\${BROWSER}            chrome
\${API_BASE}           https://api.ejemplo.com
\${MOCK_SERVER}        http://localhost:3001
\${USER_API}           /api/users
\${ORDER_API}          /api/orders
\${PAYMENT_API}        /api/payments
\${AUTH_TOKEN}         Bearer abc123xyz
\${TEST_USER_ID}       12345

*** Test Cases ***
Test API Chain Integration
    Open Browser              \${URL}        \${BROWSER}
    Create Session            api    \${API_BASE}
    \${headers}=         Create Dictionary    Authorization=\${AUTH_TOKEN}
    \${user_response}=   GET On Session    api    \${USER_API}/\${TEST_USER_ID}    headers=\${headers}
    Should Be Equal As Numbers    \${user_response.status_code}    200
    \${user_data}=       Set Variable    \${user_response.json()}
    Should Be Equal           \${user_data.id}    \${TEST_USER_ID}
    \${order_payload}=   Create Dictionary    user_id=\${user_data.id}    amount=100.50
    \${order_response}=  POST On Session    api    \${ORDER_API}    json=\${order_payload}    headers=\${headers}
    Should Be Equal As Numbers    \${order_response.status_code}    201
    \${order_id}=        Set Variable    \${order_response.json().order_id}
    Page Should Contain       pedido creado
    Close Browser

Test Service Mocking
    Create Session            mock    \${MOCK_SERVER}
    \${mock_payload}=    Create Dictionary    endpoint=/external-service    response={"status":"success","data":"mocked"}
    POST On Session           mock    /mock/setup    json=\${mock_payload}
    Open Browser              \${URL}        \${BROWSER}
    Click Button              id=call-external-service
    Wait Until Page Contains  servicio llamado
    \${mock_calls}=      GET On Session    mock    /mock/calls
    Should Be Equal As Numbers    \${mock_calls.status_code}    200
    \${call_count}=      Set Variable    \${mock_calls.json().count}
    Should Be Equal As Numbers    \${call_count}    1
    Page Should Contain       respuesta recibida
    Close Browser

Test Database Integration
    Open Browser              \${URL}        \${BROWSER}
    Connect To Database       pymysql    testdb    testuser    testpass    localhost    3306
    \${initial_count}=   Query    SELECT COUNT(*) FROM orders
    Input Text                name=product    Test Product
    Input Text                name=quantity    5
    Click Button              Add to Cart
    Click Button              Checkout
    Wait Until Page Contains  pedido confirmado
    \${final_count}=     Query    SELECT COUNT(*) FROM orders
    Should Be True            \${final_count}[0][0] > \${initial_count}[0][0]
    \${last_order}=      Query    SELECT * FROM orders ORDER BY id DESC LIMIT 1
    Should Be Equal           \${last_order}[0][1]    Test Product
    Disconnect From Database
    Close Browser

Test Cross-Service Workflow
    Create Session            user_api    \${API_BASE}
    Create Session            payment_api  \${API_BASE}
    Open Browser              \${URL}        \${BROWSER}
    \${headers}=         Create Dictionary    Authorization=\${AUTH_TOKEN}
    Input Text                name=username    integration_test
    Input Password            name=password    test123
    Click Button              Login
    Wait Until Page Contains  dashboard
    \${session_token}=   Get Element Attribute    name=session_token    value
    \${updated_headers}= Create Dictionary    Authorization=Bearer \${session_token}
    Click Button              id=make-purchase
    Input Text                name=amount    99.99
    Click Button              Process Payment
    \${payment_response}= GET On Session    payment_api    \${PAYMENT_API}/status    headers=\${updated_headers}
    Should Be Equal As Numbers    \${payment_response.status_code}    200
    Should Be Equal           \${payment_response.json().status}    completed
    Page Should Contain       pago procesado
    Close Browser

Test Error Handling Integration
    Create Session            api    \${API_BASE}
    Open Browser              \${URL}        \${BROWSER}
    \${invalid_headers}=  Create Dictionary    Authorization=Bearer invalid_token
    Run Keyword And Expect Error    HTTPError: 401*    
    ...    GET On Session    api    \${USER_API}/\${TEST_USER_ID}    headers=\${invalid_headers}
    Click Button              id=trigger-error-flow
    Wait Until Page Contains  error manejado
    Element Should Be Visible css=.error-message
    \${error_text}=      Get Text    css=.error-message
    Should Contain            \${error_text}    servicio no disponible
    Click Button              Retry
    Wait Until Page Contains  operación exitosa
    Page Should Contain       recuperación automática
    Close Browser

Test Load Balancer Integration
    Open Browser              \${URL}        \${BROWSER}
    FOR    \${i}    IN RANGE    5
        Click Button          id=api-call-\${i}
        Wait Until Page Contains    respuesta \${i}
        \${response_server}=  Get Text    id=server-id
        Should Match Regexp   \${response_server}    server-[1-3]
        Log                   Request \${i} handled by \${response_server}
    END
    \${unique_servers}=  Execute JavaScript    
    ...    var servers = Array.from(document.querySelectorAll('.server-response')).map(el => el.textContent);
    ...    return new Set(servers).size;
    Should Be True            \${unique_servers} > 1
    Page Should Contain       load balancing activo
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Integration Patterns (5 min):</h3>
        <p>1. Configura Create Session para múltiples APIs</p>
        <p>2. Implementa API chain con GET/POST sequences</p>
        <p>3. Usa Should Be Equal As Numbers para status codes</p>
        <p>4. Pasa datos entre API calls usando variables</p>
        <p>5. Configura mock server para servicios externos</p>
        <p>6. Usa POST On Session para setup de mocks</p>
        <p>7. Verifica que mocks son llamados correctamente</p>
        <p>8. Integra database testing con Connect To Database</p>
        <p>9. Usa Query para verificar cambios en BD</p>
        <p>10. Compara counts antes y después de operaciones</p>
        <p>11. Implementa cross-service workflows complejos</p>
        <p>12. Usa tokens de sesión entre diferentes APIs</p>
        <p>13. Verifica status de operaciones distribuidas</p>
        <p>14. Implementa error handling con Run Keyword And Expect Error</p>
        <p>15. Testa recovery flows después de errores</p>
        <p>16. Usa FOR loops para testing de load balancers</p>
        <p>17. Verifica distribución de requests entre servers</p>
        <p>18. Combina web UI testing con API verification</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar testing de API chains y workflows</li>
                <li>Configurar mocking de servicios externos</li>
                <li>Integrar database testing con web automation</li>
                <li>Validar error handling y recovery patterns</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Integration testing verifica que servicios funcionan juntos. Usa mocks para dependencias externas y valida tanto happy path como error scenarios.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 116 - Advanced web components</h3>
        <p>Aprenderás a automatizar web components modernos, Shadow DOM, custom elements y frameworks como React/Vue.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-114"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_115 = LESSON_115;
}