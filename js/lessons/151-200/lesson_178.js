/**
 * Robot Framework Academy - Lesson 178
 * Python Libraries 178
 */

const LESSON_178 = {
    id: 178,
    title: "Python Libraries 178",
    duration: "7 min",
    level: "intermediate",
    section: "section-13",
    content: `
        <h2>🔒 Security Testing Automatizado</h2>
        <p>Implementa testing de seguridad, análisis de vulnerabilidades y penetration testing usando librerías especializadas.</p>
        
        <h3>💻 Security testing avanzado:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/SecurityLibrary.py

*** Variables ***
\${TARGET_URL}      https://httpbin.org
\${SCAN_TIMEOUT}    30
\${SQL_PAYLOADS}    ["'; DROP TABLE users; --", "' OR '1'='1", "1' UNION SELECT NULL--"]
\${XSS_PAYLOADS}    ["<script>alert('xss')</script>", "javascript:alert(1)", "<img src=x onerror=alert(1)>"]
\${WEAK_PASSWORDS}  ["123456", "password", "admin", "guest"]
\${SSL_CIPHERS}     ["TLS_AES_256_GCM_SHA384", "TLS_CHACHA20_POLY1305_SHA256"]

*** Test Cases ***
Test SQL Injection Scanning
    \${sql_scan}=    Scan SQL Injection    \${TARGET_URL}/get    payloads=\${SQL_PAYLOADS}
    Should Be True    \${sql_scan}[completed]
    Should Be Equal As Numbers    \${sql_scan}[payloads_tested]    3
    Should Be True    \${sql_scan}[vulnerabilities_found] >= 0
    Should Contain    \${sql_scan}[scan_type]    sql_injection
    \${sql_report}=    Generate SQL Scan Report    \${sql_scan}
    Should Contain    \${sql_report}    scan_results
    Log    SQL injection scan: \${sql_scan}

Test XSS Vulnerability Detection
    \${xss_scan}=    Scan XSS Vulnerabilities    \${TARGET_URL}/html    payloads=\${XSS_PAYLOADS}
    Should Be True    \${xss_scan}[completed]
    Should Be Equal As Numbers    \${xss_scan}[payloads_tested]    3
    Should Be True    \${xss_scan}[response_analyzed]
    Should Contain    \${xss_scan}[scan_type]    xss
    \${xss_severity}=    Analyze XSS Severity    \${xss_scan}
    Should Contain    \${xss_severity}    risk_level
    Log    XSS vulnerability scan: \${xss_scan}

Test SSL Certificate Analysis
    \${ssl_scan}=    Analyze SSL Certificate    \${TARGET_URL}    check_expiry=true    check_ciphers=true
    Should Be True    \${ssl_scan}[analyzed]
    Should Contain    \${ssl_scan}    certificate_valid
    Should Contain    \${ssl_scan}    expiry_date
    Should Be True    \${ssl_scan}[cipher_strength] > 0
    \${ssl_vulnerabilities}=    Check SSL Vulnerabilities    \${ssl_scan}
    Should Contain    \${ssl_vulnerabilities}    heartbleed_safe
    Log    SSL certificate analysis: \${ssl_scan}

Test Authentication Security
    \${auth_scan}=    Test Authentication Security    \${TARGET_URL}/basic-auth/user/pass
    Should Be True    \${auth_scan}[tested]
    \${brute_force}=    Test Brute Force Protection    \${TARGET_URL}/basic-auth/user/pass    passwords=\${WEAK_PASSWORDS}
    Should Be True    \${brute_force}[protection_tested]
    Should Be True    \${brute_force}[attempts_made] > 0
    \${session_security}=    Test Session Security    \${TARGET_URL}
    Should Contain    \${session_security}    cookie_security
    Log    Authentication security: \${auth_scan}

Test Security Headers Validation
    \${headers_scan}=    Scan Security Headers    \${TARGET_URL}
    Should Be True    \${headers_scan}[scanned]
    Should Contain    \${headers_scan}[headers]    content-security-policy
    Should Contain    \${headers_scan}[headers]    x-frame-options
    Should Contain    \${headers_scan}[headers]    x-content-type-options
    \${headers_score}=    Calculate Security Score    \${headers_scan}
    Should Be True    \${headers_score}[score] >= 0
    Should Be True    \${headers_score}[score] <= 100
    \${security_report}=    Generate Security Report    \${headers_scan}    \${sql_scan}    \${xss_scan}
    Should Contain    \${security_report}    executive_summary
    Log    Security headers validation: \${headers_scan}</code></pre>
        
        <h3>🎯 Práctica security testing (5 min):</h3>
        <p>1. Crea SecurityLibrary.py con scan_sql_injection() usando payloads automáticos</p>
        <p>2. Implementa scan_xss_vulnerabilities() con detection de scripts ejecutados</p>
        <p>3. Agrega analyze_ssl_certificate() usando ssl module para certificate info</p>
        <p>4. Crea test_authentication_security() para validar mecanismos auth</p>
        <p>5. Implementa test_brute_force_protection() con rate limiting detection</p>
        <p>6. Agrega scan_security_headers() para validar headers de seguridad</p>
        <p>7. Crea check_ssl_vulnerabilities() para Heartbleed, POODLE, BEAST</p>
        <p>8. Implementa test_session_security() para cookie flags y timeouts</p>
        <p>9. Agrega calculate_security_score() basado en OWASP guidelines</p>
        <p>10. Crea generate_security_report() con executive summary</p>
        <p>11. Usa requests con custom headers para bypass básico</p>
        <p>12. Implementa payloads dinámicos para diferentes tipos de inyección</p>
        <p>13. Agrega detection de false positives en vulnerability scanning</p>
        <p>14. Crea alerting automático para vulnerabilidades críticas</p>
        <p>15. Implementa compliance checking contra OWASP Top 10</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar scanning de vulnerabilidades SQL injection y XSS</li>
                <li>Analizar certificados SSL y configuraciones de seguridad</li>
                <li>Validar autenticación, autorización y protección brute force</li>
                <li>Generar reportes de seguridad con scoring OWASP</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Security testing debe ser ético y autorizado. Siempre usa entornos de testing controlados y payloads que no causen daño real.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 179 - Python Libraries 179</h3>
        <p>Explorarás librerías Python para testing de compliance, auditoría automatizada y integración con frameworks de gobernanza empresarial.</p>
    `,
    topics: ["python", "libraries", "custom"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-177"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_178 = LESSON_178;
}