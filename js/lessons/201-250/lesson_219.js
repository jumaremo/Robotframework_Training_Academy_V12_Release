/**
 * Robot Framework Academy - Lesson 219
 * Security Testing Project
 */

const LESSON_219 = {
    id: 219,
    title: "Security Testing Project",
    duration: "20 min",
    level: "advanced",
    section: "section-17",
    content: `
        <h2>🛡️ Proyecto Seguridad</h2>
        <p>Proyecto integrador de security testing completo con todas las vulnerabilidades OWASP Top 10.</p>
        
        <h3>💻 Suite Seguridad:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    Security Testing Suite - OWASP Top 10 Coverage
Library          SeleniumLibrary
Library          RequestsLibrary
Library          Collections
Library          OperatingSystem
Resource         ../resources/security_keywords.robot
Variables        ../config/security_payloads.yaml
Suite Setup      Initialize Security Test Environment
Suite Teardown   Generate Security Report

*** Variables ***
\${TARGET_URL}        https://vulnerable-app.com
\${BROWSER}           chrome
\${API_BASE}          https://api.vulnerable-app.com
\${SQL_PAYLOAD}       ' UNION SELECT username,password FROM users--
\${XSS_PAYLOAD}       <script>document.cookie='xss=true'</script>
\${XXE_PAYLOAD}       <?xml version="1.0"?><!DOCTYPE root [<!ENTITY test SYSTEM 'file:///etc/passwd'>]><root>&test;</root>
\${CSRF_TOKEN}        invalid_token_12345
\${BUFFER_PAYLOAD}    ${'A' * 10000}
\${BLIND_SQL}         1' AND (SELECT SUBSTRING(@@version,1,1))='5'--
\${LFI_PAYLOAD}       ../../../etc/passwd
\${RCE_PAYLOAD}       ;cat /etc/passwd;
\${UPLOAD_SHELL}      shell.php.jpg
\${SESSION_ID}        admin_session_hijacked

*** Test Cases ***
Test SQL Injection Vulnerabilities
    [Documentation]    Comprehensive SQL injection testing
    [Tags]             sql-injection    owasp-a01    critical
    Open Browser                    \${TARGET_URL}/login    \${BROWSER}
    Input Text                     id=username    admin\${SQL_PAYLOAD}
    Input Text                     id=password    password
    Click Button                   Login
    Page Should Not Contain        Welcome admin
    Page Should Not Contain        users table
    Page Should Not Contain        database error
    Element Should Be Visible      id=error-message
    Element Should Contain         id=error-message    Invalid credentials
    Close Browser

Test Cross Site Scripting Prevention
    [Documentation]    XSS testing across multiple input points
    [Tags]             xss    owasp-a03    critical
    Open Browser                    \${TARGET_URL}/profile    \${BROWSER}
    Input Text                     id=name    Test\${XSS_PAYLOAD}
    Input Text                     id=bio     User bio\${XSS_PAYLOAD}
    Click Button                   Save Profile
    Page Source Should Not Contain    <script>
    Page Source Should Not Contain    document.cookie
    Element Text Should Not Be      id=name    Test\${XSS_PAYLOAD}
    Element Should Contain          id=success    Profile updated
    Go To                          \${TARGET_URL}/comments
    Input Text                     id=comment    \${XSS_PAYLOAD}
    Click Button                   Post Comment
    Page Source Should Not Contain    <script>
    Close Browser

Test Broken Authentication Flows
    [Documentation]    Authentication bypass and session management
    [Tags]             auth    owasp-a02    high
    Create Session                 api    \${API_BASE}
    \${headers}=                   Create Dictionary    Content-Type=application/json
    \${login_data}=               Create Dictionary    username=admin    password=admin
    \${response}=                 POST On Session    api    /login    json=\${login_data}    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    401
    Dictionary Should Not Contain Key    \${response.json()}    token
    Page Should Not Contain       \${response.text}    success
    \${weak_data}=               Create Dictionary    username=    password=
    \${weak_response}=           POST On Session    api    /login    json=\${weak_data}    headers=\${headers}
    Should Be Equal As Numbers    \${weak_response.status_code}    400
    Delete All Sessions

Test Sensitive Data Exposure
    [Documentation]    Data exposure and encryption validation  
    [Tags]             data-exposure    owasp-a02    high
    Create Session                 api    \${API_BASE}
    \${headers}=                   Create Dictionary    Authorization=Bearer invalid_token
    \${response}=                 GET On Session    api    /users    headers=\${headers}    expected_status=401
    Response Should Not Contain    \${response}    password
    Response Should Not Contain    \${response}    ssn
    Response Should Not Contain    \${response}    credit_card
    Should Be Equal As Numbers    \${response.status_code}    401
    Dictionary Should Contain Key    \${response.json()}    error
    Delete All Sessions

Test XML External Entities Injection
    [Documentation]    XXE injection prevention testing
    [Tags]             xxe    owasp-a04    medium
    Create Session                 api    \${API_BASE}
    \${headers}=                   Create Dictionary    Content-Type=application/xml
    \${response}=                 POST On Session    api    /xml-upload    data=\${XXE_PAYLOAD}    headers=\${headers}    expected_status=400
    Response Should Not Contain    \${response}    root:x:0:0
    Response Should Not Contain    \${response}    /etc/passwd
    Should Be Equal As Numbers    \${response.status_code}    400
    Dictionary Should Contain Key    \${response.json()}    error
    Delete All Sessions

Test Insecure File Uploads
    [Documentation]    File upload security validation
    [Tags]             file-upload    owasp-a04    high  
    Open Browser                    \${TARGET_URL}/upload    \${BROWSER}
    Choose File                    id=file-input    \${CURDIR}/payloads/\${UPLOAD_SHELL}
    Click Button                   Upload File
    Page Should Not Contain        File uploaded successfully
    Page Should Contain           Invalid file type
    Element Should Be Visible      id=error-message
    Element Should Contain         id=error-message    Only images allowed
    Close Browser

Test Security Misconfiguration
    [Documentation]    Server and application misconfiguration
    [Tags]             misconfiguration    owasp-a05    medium
    Create Session                 api    \${API_BASE}
    \${response}=                 GET On Session    api    /admin    expected_status=403
    Response Should Not Contain    \${response}    server version
    Response Should Not Contain    \${response}    debug information
    Should Be Equal As Numbers    \${response.status_code}    403
    \${headers_check}=            GET On Session    api    /    expected_status=200
    Response Should Not Contain    \${headers_check.headers}    X-Powered-By
    Delete All Sessions</code></pre>
        
        <h3>🎯 Proyecto Completo (15 min):</h3>
        <p>1. Configura entorno con aplicación vulnerable DVWA o WebGoat</p>
        <p>2. Crea suite de tests cubriendo OWASP Top 10 completo</p>
        <p>3. Implementa SQL injection tests con múltiples payloads</p>
        <p>4. Desarrolla XSS testing en campos input y comentarios</p>
        <p>5. Valida autenticación broken con bypass attempts</p>
        <p>6. Prueba sensitive data exposure en APIs endpoints</p>
        <p>7. Implementa XXE injection con XML maliciosos</p>
        <p>8. Testa file uploads con shells y scripts maliciosos</p>
        <p>9. Valida security misconfiguration en headers HTTP</p>
        <p>10. Crea Cross-Site Request Forgery (CSRF) tests</p>
        <p>11. Implementa tests de components con vulnerabilidades conocidas</p>
        <p>12. Desarrolla insufficient logging detection tests</p>
        <p>13. Configura reporting automático con vulnerabilidades encontradas</p>
        <p>14. Implementa severity classification (Critical/High/Medium/Low)</p>
        <p>15. Crea remediation suggestions para cada vulnerabilidad</p>
        <p>16. Integra con CI/CD pipeline para security regression</p>
        <p>17. Genera PDF reports con executive summary</p>
        <p>18. Implementa false positive filtering inteligente</p>
        <p>19. Configura alertas automáticas para critical findings</p>
        <p>20. Crea dashboard de security metrics en tiempo real</p>
        <p>21. Desarrolla threat modeling automatizado</p>
        <p>22. Implementa compliance checks (PCI-DSS, GDPR, etc.)</p>
        <p>23. Configura penetration testing automatizado básico</p>
        <p>24. Valida encryption implementations en forms críticos</p>
        <p>25. Crea security test data management seguro</p>
        <p>26. Implementa API security testing comprehensivo</p>
        <p>27. Desarrolla mobile app security validation</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Desarrollar suite completa de security testing enterprise</li>
                <li>Implementar cobertura total OWASP Top 10 vulnerabilidades</li>
                <li>Crear sistema automatizado de penetration testing</li>
                <li>Establecer reporting profesional con remediation guidance</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Combina security testing con performance monitoring - vulnerabilidades pueden causar degradación de performance significativa.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 220 - Enterprise Architecture Patterns</h3>
        <p>Con security testing dominado, aprenderás arquitecturas enterprise escalables para proyectos de testing masivos.</p>
    `,
    topics: ["security", "project"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 20,
    difficulty: "easy",
    prerequisites: ["lesson-218"],
    type: "capstone"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_219 = LESSON_219;
}