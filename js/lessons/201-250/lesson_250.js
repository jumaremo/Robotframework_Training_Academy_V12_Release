/**
 * Robot Framework Academy - Lesson 250
 * Performance + Security testing
 */

const LESSON_250 = {
    id: 250,
    title: "Performance + Security testing",
    duration: "20 min",
    level: "advanced",
    section: "section-21",
    content: `
        <h2>🔧 Performance Security Testing</h2>
        <p>Testing avanzado de performance y security integrado en pipelines enterprise para aplicaciones robustas y seguras.</p>
        
        <h3>💻 Performance security suite:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    DateTime
Documentation    Performance + Security Testing Integration Suite

*** Variables ***
\${TARGET_URL}           https://app.enterprise.com
\${LOAD_TEST_URL}        https://loadtest.enterprise.com/api
\${SECURITY_SCAN_URL}    https://security-scanner.enterprise.com/api
\${PERFORMANCE_THRESHOLD}    2000
\${CONCURRENT_USERS}     100
\${TEST_DURATION}        300
\${VULNERABILITY_LIMIT}  0
\${API_TOKEN}            perf_sec_token_123
\${SCAN_ID}              security_scan_456

*** Test Cases ***
Test Load Performance Baseline
    Set Global Variable    \${LOAD_TESTING}    active
    Should Be Equal    \${LOAD_TESTING}    active
    Log    Load performance baseline testing    INFO
    Create Session    performance_api    \${LOAD_TEST_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer \${API_TOKEN}    Content-Type=application/json
    \${load_config}=    Create Dictionary    target_url=\${TARGET_URL}    users=\${CONCURRENT_USERS}    duration=\${TEST_DURATION}    ramp_up=30
    \${response}=    POST On Session    performance_api    /load-tests    json=\${load_config}    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    201
    Dictionary Should Contain Key    \${response.json()}    test_id
    \${test_id}=    Get From Dictionary    \${response.json()}    test_id
    Should Not Be Empty    \${test_id}
    Set Suite Variable    \${LOAD_TEST_ID}    \${test_id}
    # Wait for test completion
    FOR    \${i}    IN RANGE    20
        \${status_response}=    GET On Session    performance_api    /load-tests/\${test_id}/status    headers=\${headers}
        Dictionary Should Contain Key    \${status_response.json()}    status
        \${status}=    Get From Dictionary    \${status_response.json()}    status
        Exit For Loop If    '\${status}' == 'completed'
        Sleep    15s
    END
    Should Be Equal    \${status}    completed
    Set Global Variable    \${BASELINE_ESTABLISHED}    True
    Should Be Equal    \${BASELINE_ESTABLISHED}    True
    Log    Load performance baseline established    INFO

Test Response Time Analysis
    Set Suite Variable    \${RESPONSE_ANALYSIS}    running
    Should Be Equal    \${RESPONSE_ANALYSIS}    running
    Log    Response time analysis testing    INFO
    Create Session    performance_api    \${LOAD_TEST_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer \${API_TOKEN}    Content-Type=application/json
    \${response}=    GET On Session    performance_api    /load-tests/\${LOAD_TEST_ID}/results    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    metrics
    \${metrics}=    Get From Dictionary    \${response.json()}    metrics
    Dictionary Should Contain Key    \${metrics}    avg_response_time
    Dictionary Should Contain Key    \${metrics}    p95_response_time
    Dictionary Should Contain Key    \${metrics}    p99_response_time
    \${avg_response}=    Get From Dictionary    \${metrics}    avg_response_time
    \${p95_response}=    Get From Dictionary    \${metrics}    p95_response_time
    \${p99_response}=    Get From Dictionary    \${metrics}    p99_response_time
    Should Be True    \${avg_response} < \${PERFORMANCE_THRESHOLD}
    Should Be True    \${p95_response} < \${PERFORMANCE_THRESHOLD * 1.5}
    Should Be True    \${p99_response} < \${PERFORMANCE_THRESHOLD * 2}
    Should Be Equal As Numbers    \${CONCURRENT_USERS}    100
    Set Global Variable    \${RESPONSE_VALIDATED}    True
    Should Be Equal    \${RESPONSE_VALIDATED}    True
    Log    Response time analysis validated    INFO

Test Throughput Capacity
    Set Global Variable    \${THROUGHPUT_TESTING}    active
    Should Be Equal    \${THROUGHPUT_TESTING}    active
    Log    Throughput capacity testing    INFO
    Create Session    performance_api    \${LOAD_TEST_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer \${API_TOKEN}    Content-Type=application/json
    \${response}=    GET On Session    performance_api    /load-tests/\${LOAD_TEST_ID}/results    headers=\${headers}
    Dictionary Should Contain Key    \${response.json()}    metrics
    \${metrics}=    Get From Dictionary    \${response.json()}    metrics
    Dictionary Should Contain Key    \${metrics}    requests_per_second
    Dictionary Should Contain Key    \${metrics}    total_requests
    Dictionary Should Contain Key    \${metrics}    failed_requests
    \${rps}=    Get From Dictionary    \${metrics}    requests_per_second
    \${total_requests}=    Get From Dictionary    \${metrics}    total_requests
    \${failed_requests}=    Get From Dictionary    \${metrics}    failed_requests
    Should Be True    \${rps} >= 50
    Should Be True    \${total_requests} > 1000
    \${error_rate}=    Evaluate    (\${failed_requests} * 100) / \${total_requests}
    Should Be True    \${error_rate} < 1
    Should Not Be Empty    \${TARGET_URL}
    Set Suite Variable    \${THROUGHPUT_VALIDATED}    True
    Should Be Equal    \${THROUGHPUT_VALIDATED}    True
    Log    Throughput capacity validated    INFO

Test Security Vulnerability Scan
    Set Suite Variable    \${SECURITY_SCANNING}    initiated
    Should Be Equal    \${SECURITY_SCANNING}    initiated
    Log    Security vulnerability scan testing    INFO
    Create Session    security_api    \${SECURITY_SCAN_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer \${API_TOKEN}    Content-Type=application/json
    \${scan_config}=    Create Dictionary    target_url=\${TARGET_URL}    scan_type=full    include_apis=True    depth=deep
    \${response}=    POST On Session    security_api    /scans    json=\${scan_config}    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    201
    Dictionary Should Contain Key    \${response.json()}    scan_id
    \${scan_id}=    Get From Dictionary    \${response.json()}    scan_id
    Should Not Be Empty    \${scan_id}
    Set Global Variable    \${SECURITY_SCAN_ID}    \${scan_id}
    # Wait for scan completion
    FOR    \${i}    IN RANGE    30
        \${status_response}=    GET On Session    security_api    /scans/\${scan_id}/status    headers=\${headers}
        Dictionary Should Contain Key    \${status_response.json()}    status
        \${scan_status}=    Get From Dictionary    \${status_response.json()}    status
        Exit For Loop If    '\${scan_status}' == 'completed'
        Sleep    10s
    END
    Should Be Equal    \${scan_status}    completed
    Set Suite Variable    \${SCAN_COMPLETED}    True
    Should Be Equal    \${SCAN_COMPLETED}    True
    Log    Security vulnerability scan completed    INFO

Test SQL Injection Detection
    Set Global Variable    \${SQL_INJECTION_TESTING}    active
    Should Be Equal    \${SQL_INJECTION_TESTING}    active
    Log    SQL injection detection testing    INFO
    Create Session    security_api    \${SECURITY_SCAN_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer \${API_TOKEN}    Content-Type=application/json
    \${response}=    GET On Session    security_api    /scans/\${SECURITY_SCAN_ID}/vulnerabilities?type=sql_injection    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    vulnerabilities
    \${sql_vulnerabilities}=    Get From Dictionary    \${response.json()}    vulnerabilities
    Should Be True    len(\${sql_vulnerabilities}) == \${VULNERABILITY_LIMIT}
    FOR    \${vuln}    IN    @{sql_vulnerabilities}
        Dictionary Should Contain Key    \${vuln}    severity
        Dictionary Should Contain Key    \${vuln}    location
        Dictionary Should Contain Key    \${vuln}    description
        \${severity}=    Get From Dictionary    \${vuln}    severity
        Should Not Be Equal    \${severity}    critical
        Should Not Be Equal    \${severity}    high
        Log    SQL injection check: \${vuln}    INFO
    END
    Should Be Equal    \${SCAN_ID}    security_scan_456
    Set Suite Variable    \${SQL_INJECTION_VERIFIED}    True
    Should Be Equal    \${SQL_INJECTION_VERIFIED}    True
    Log    SQL injection detection verified    INFO

Test XSS Vulnerability Assessment
    Set Suite Variable    \${XSS_TESTING}    active
    Should Be Equal    \${XSS_TESTING}    active
    Log    XSS vulnerability assessment testing    INFO
    Create Session    security_api    \${SECURITY_SCAN_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer \${API_TOKEN}    Content-Type=application/json
    \${response}=    GET On Session    security_api    /scans/\${SECURITY_SCAN_ID}/vulnerabilities?type=xss    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    vulnerabilities
    \${xss_vulnerabilities}=    Get From Dictionary    \${response.json()}    vulnerabilities
    Should Be True    len(\${xss_vulnerabilities}) == \${VULNERABILITY_LIMIT}
    \${xss_payload_response}=    GET On Session    security_api    /scans/\${SECURITY_SCAN_ID}/payloads?type=xss    headers=\${headers}
    Should Be Equal As Numbers    \${xss_payload_response.status_code}    200
    Dictionary Should Contain Key    \${xss_payload_response.json()}    payloads_tested
    \${payloads_tested}=    Get From Dictionary    \${xss_payload_response.json()}    payloads_tested
    Should Be True    \${payloads_tested} > 50
    Should Not Be Empty    \${SECURITY_SCAN_URL}
    Set Global Variable    \${XSS_VERIFIED}    True
    Should Be Equal    \${XSS_VERIFIED}    True
    Log    XSS vulnerability assessment verified    INFO

Test Authentication Security
    Set Global Variable    \${AUTH_SECURITY_TESTING}    active
    Should Be Equal    \${AUTH_SECURITY_TESTING}    active
    Log    Authentication security testing    INFO
    Create Session    security_api    \${SECURITY_SCAN_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer \${API_TOKEN}    Content-Type=application/json
    \${response}=    GET On Session    security_api    /scans/\${SECURITY_SCAN_ID}/vulnerabilities?category=authentication    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    vulnerabilities
    Dictionary Should Contain Key    \${response.json()}    summary
    \${auth_summary}=    Get From Dictionary    \${response.json()}    summary
    Dictionary Should Contain Key    \${auth_summary}    weak_passwords
    Dictionary Should Contain Key    \${auth_summary}    session_management
    Dictionary Should Contain Key    \${auth_summary}    token_validation
    \${weak_passwords}=    Get From Dictionary    \${auth_summary}    weak_passwords
    \${session_issues}=    Get From Dictionary    \${auth_summary}    session_management
    \${token_issues}=    Get From Dictionary    \${auth_summary}    token_validation
    Should Be Equal As Numbers    \${weak_passwords}    0
    Should Be Equal As Numbers    \${session_issues}    0
    Should Be Equal As Numbers    \${token_issues}    0
    Should Be Equal As Numbers    \${TEST_DURATION}    300
    Set Suite Variable    \${AUTH_SECURITY_VERIFIED}    True
    Should Be Equal    \${AUTH_SECURITY_VERIFIED}    True
    Log    Authentication security verified    INFO

Test Performance Under Load
    Set Suite Variable    \${PERFORMANCE_UNDER_LOAD}    testing
    Should Be Equal    \${PERFORMANCE_UNDER_LOAD}    testing
    Log    Performance under load testing    INFO
    Create Session    target_app    \${TARGET_URL}
    \${headers}=    Create Dictionary    Content-Type=application/json    User-Agent=LoadTester-v1.0
    # Simulate high load scenario
    \${response_times}=    Create List
    FOR    \${i}    IN RANGE    20
        \${start_time}=    Get Time    epoch
        \${response}=    GET On Session    target_app    /api/health    headers=\${headers}    expected_status=any
        \${end_time}=    Get Time    epoch
        \${response_time}=    Evaluate    (\${end_time} - \${start_time}) * 1000
        Append To List    \${response_times}    \${response_time}
        Should Be True    \${response.status_code} in [200, 429, 503]
        Sleep    0.1s
    END
    \${avg_response_time}=    Evaluate    sum(\${response_times}) / len(\${response_times})
    Should Be True    \${avg_response_time} < \${PERFORMANCE_THRESHOLD * 2}
    \${max_response_time}=    Evaluate    max(\${response_times})
    Should Be True    \${max_response_time} < \${PERFORMANCE_THRESHOLD * 3}
    Should Be Equal    \${TARGET_URL}    https://app.enterprise.com
    Set Global Variable    \${LOAD_PERFORMANCE_VERIFIED}    True
    Should Be Equal    \${LOAD_PERFORMANCE_VERIFIED}    True
    Log    Performance under load verified    INFO

Test Security Headers Validation
    Set Global Variable    \${SECURITY_HEADERS_TESTING}    active
    Should Be Equal    \${SECURITY_HEADERS_TESTING}    active
    Log    Security headers validation testing    INFO
    Create Session    target_app    \${TARGET_URL}
    \${headers}=    Create Dictionary    User-Agent=SecurityTester-v1.0
    \${response}=    GET On Session    target_app    /    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    \${response_headers}=    Set Variable    \${response.headers}
    Dictionary Should Contain Key    \${response_headers}    X-Content-Type-Options
    Dictionary Should Contain Key    \${response_headers}    X-Frame-Options
    Dictionary Should Contain Key    \${response_headers}    X-XSS-Protection
    Dictionary Should Contain Key    \${response_headers}    Strict-Transport-Security
    \${content_type_options}=    Get From Dictionary    \${response_headers}    X-Content-Type-Options
    \${frame_options}=    Get From Dictionary    \${response_headers}    X-Frame-Options
    \${xss_protection}=    Get From Dictionary    \${response_headers}    X-XSS-Protection
    Should Be Equal    \${content_type_options}    nosniff
    Should Be Equal    \${frame_options}    DENY
    Should Contain    \${xss_protection}    1
    Should Not Be Empty    \${API_TOKEN}
    Set Suite Variable    \${SECURITY_HEADERS_VERIFIED}    True
    Should Be Equal    \${SECURITY_HEADERS_VERIFIED}    True
    Log    Security headers validation verified    INFO

Test Stress Testing Limits
    Set Suite Variable    \${STRESS_TESTING}    initiated
    Should Be Equal    \${STRESS_TESTING}    initiated
    Log    Stress testing limits validation    INFO
    Create Session    performance_api    \${LOAD_TEST_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer \${API_TOKEN}    Content-Type=application/json
    \${stress_config}=    Create Dictionary    target_url=\${TARGET_URL}    users=500    duration=180    ramp_up=60    test_type=stress
    \${response}=    POST On Session    performance_api    /stress-tests    json=\${stress_config}    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    201
    Dictionary Should Contain Key    \${response.json()}    test_id
    \${stress_test_id}=    Get From Dictionary    \${response.json()}    test_id
    # Wait for stress test completion
    FOR    \${i}    IN RANGE    15
        \${status_response}=    GET On Session    performance_api    /stress-tests/\${stress_test_id}/status    headers=\${headers}
        Dictionary Should Contain Key    \${status_response.json()}    status
        \${stress_status}=    Get From Dictionary    \${status_response.json()}    status
        Exit For Loop If    '\${stress_status}' == 'completed'
        Sleep    15s
    END
    Should Be Equal    \${stress_status}    completed
    \${results_response}=    GET On Session    performance_api    /stress-tests/\${stress_test_id}/results    headers=\${headers}
    Dictionary Should Contain Key    \${results_response.json()}    breaking_point
    \${breaking_point}=    Get From Dictionary    \${results_response.json()}    breaking_point
    Should Be True    \${breaking_point} >= 400
    Set Global Variable    \${STRESS_LIMITS_VERIFIED}    True
    Should Be Equal    \${STRESS_LIMITS_VERIFIED}    True
    Log    Stress testing limits verified    INFO

Test Integrated Security Performance
    Set Global Variable    \${INTEGRATED_TESTING}    final
    Should Be Equal    \${INTEGRATED_TESTING}    final
    Log    Integrated security performance testing    INFO
    # Validate that security measures don't impact performance significantly
    Create Session    performance_api    \${LOAD_TEST_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer \${API_TOKEN}    Content-Type=application/json
    \${secure_config}=    Create Dictionary    target_url=\${TARGET_URL}    users=100    duration=120    security_headers=True    ssl_validation=True
    \${response}=    POST On Session    performance_api    /secure-load-tests    json=\${secure_config}    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    201
    Dictionary Should Contain Key    \${response.json()}    test_id
    \${secure_test_id}=    Get From Dictionary    \${response.json()}    test_id
    # Wait for secure test completion
    FOR    \${i}    IN RANGE    10
        \${status_response}=    GET On Session    performance_api    /secure-load-tests/\${secure_test_id}/status    headers=\${headers}
        Dictionary Should Contain Key    \${status_response.json()}    status
        \${secure_status}=    Get From Dictionary    \${status_response.json()}    status
        Exit For Loop If    '\${secure_status}' == 'completed'
        Sleep    15s
    END
    Should Be Equal    \${secure_status}    completed
    \${secure_results}=    GET On Session    performance_api    /secure-load-tests/\${secure_test_id}/results    headers=\${headers}
    Dictionary Should Contain Key    \${secure_results.json()}    performance_impact
    \${performance_impact}=    Get From Dictionary    \${secure_results.json()}    performance_impact
    Should Be True    \${performance_impact} < 15
    Should Not Be Empty    \${SECURITY_SCAN_URL}
    Set Suite Variable    \${INTEGRATION_VERIFIED}    True
    Should Be Equal    \${INTEGRATION_VERIFIED}    True
    Log    Integrated security performance verified    INFO</code></pre>
        
        <h3>🎯 Desarrollo Performance Security (15 min):</h3>
        <p>1. Configura load testing baseline con métricas objetivo</p>
        <p>2. Implementa response time analysis con percentiles</p>
        <p>3. Establece throughput capacity validation</p>
        <p>4. Configura security vulnerability scanning automatizado</p>
        <p>5. Implementa SQL injection detection comprehensive</p>
        <p>6. Desarrolla XSS vulnerability assessment</p>
        <p>7. Agrega authentication security validation</p>
        <p>8. Implementa performance testing under high load</p>
        <p>9. Establece security headers validation</p>
        <p>10. Configura stress testing con breaking points</p>
        <p>11. Implementa integrated security performance testing</p>
        <p>12. Desarrolla OWASP Top 10 vulnerability scanning</p>
        <p>13. Agrega API security testing automation</p>
        <p>14. Implementa penetration testing simulation</p>
        <p>15. Establece compliance validation (PCI DSS, SOC2)</p>
        <p>16. Configura real-time security monitoring</p>
        <p>17. Implementa performance regression testing</p>
        <p>18. Desarrolla security incident response testing</p>
        <p>19. Agrega data encryption validation</p>
        <p>20. Implementa session security testing</p>
        <p>21. Establece network security validation</p>
        <p>22. Configura container security scanning</p>
        <p>23. Implementa infrastructure security testing</p>
        <p>24. Testa suite integrada en pipeline CI/CD</p>
        <p>25. Valida enterprise security posture completa</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar performance y security testing enterprise</li>
                <li>Validar aplicaciones bajo carga con security habilitado</li>
                <li>Implementar vulnerability scanning automatizado</li>
                <li>Crear suite robusta para aplicaciones production-ready</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Performance + Security exitoso: Load Testing + Vulnerability Scanning + Security Headers + Stress Testing = aplicaciones que escalan securely bajo cualquier carga.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 251 - QA Automation Certification Project</h3>
        <p>Con performance y security dominados, completarás tu proyecto final de certificación que integra todo el conocimiento adquirido en un sistema QA world-class.</p>
    `,
    topics: ["capstone", "performance", "security"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 20,
    difficulty: "easy",
    prerequisites: ["lesson-249"],
    type: "capstone"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_250 = LESSON_250;
}