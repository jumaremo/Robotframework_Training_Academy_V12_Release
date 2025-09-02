/**
 * Robot Framework Academy - Lesson 212
 * Security testing introduction
 */

const LESSON_212 = {
    id: 212,
    title: "Security testing introduction",
    duration: "15 min",
    level: "advanced",
    section: "section-17",
    content: `
        <h2>🔒 Security Testing</h2>
        <p>Detecta vulnerabilidades de seguridad usando automation y herramientas de penetration testing.</p>
        
        <h3>💻 Tests Seguridad:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    🔒 SECURITY TESTING FOUNDATION SUITE
Library          SeleniumLibrary
Library          RequestsLibrary
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          Process
Library          String
Suite Setup      Initialize Security Testing
Suite Teardown   Archive Security Results

*** Variables ***
\${TARGET_URL}         https://vulnerable-app.company.com
\${API_BASE}           \${TARGET_URL}/api/v1
\${SECURITY_REPORT}    security_test_results.json
\${VULN_SCANNER}       /opt/security/scanner
\${XSS_PAYLOADS}       xss_payloads.txt
\${SQL_PAYLOADS}       sql_injection_payloads.txt
\${PENTEST_RESULTS}    pentest_findings.log
\${OWASP_ZAP_API}      http://localhost:8080
&{SECURITY_FINDINGS}   sql_injection=0  xss=0  csrf=0  auth_bypass=0

*** Test Cases ***
Test SQL Injection Vulnerabilities
    [Documentation]    Detecta vulnerabilidades de SQL injection automáticamente
    [Tags]             sql_injection    owasp_top10    database
    
    Create Session        target_app    \${TARGET_URL}
    
    # Cargar payloads de SQL injection
    \${payload_content}=  Get File    \${SQL_PAYLOADS}
    @{sql_payloads}=      Split To Lines    \${payload_content}
    Should Not Be Empty   \${sql_payloads}
    
    # Test endpoints vulnerables comunes
    @{test_endpoints}=    Create List    /login    /search    /user    /admin    /api/users
    
    FOR    \${endpoint}    IN    @{test_endpoints}
        FOR    \${payload}    IN    @{sql_payloads}
            # Test via GET parameters
            \${get_params}=   Create Dictionary    q=\${payload}    id=\${payload}    search=\${payload}
            \${get_response}= GET On Session    target_app    \${endpoint}    
            ...               params=\${get_params}    timeout=10    expected_status=any
            
            # Detectar indicadores de SQL injection
            \${response_text}= Set Variable    \${get_response.text}
            \${sql_error_detected}= Run Keyword And Return Status
            ...                     Should Contain Any    \${response_text}    
            ...                     SQL syntax error    mysql_fetch    ORA-    sqlite_
            ...                     PostgreSQL    Microsoft JET
            
            Run Keyword If         \${sql_error_detected}
            ...                    Flag SQL Injection Vulnerability    \${endpoint}    GET    \${payload}
            
            # Test via POST data
            \${post_data}=    Create Dictionary    username=\${payload}    password=test    email=\${payload}
            \${post_response}= POST On Session    target_app    \${endpoint}    
            ...                json=\${post_data}    timeout=10    expected_status=any
            
            \${post_error_detected}= Run Keyword And Return Status
            ...                      Should Contain Any    \${post_response.text}    
            ...                      SQL syntax error    mysql_fetch    ORA-
            
            Run Keyword If           \${post_error_detected}
            ...                      Flag SQL Injection Vulnerability    \${endpoint}    POST    \${payload}
            
            # Log testing progress
            Log                      Tested \${endpoint} with payload: \${payload}
        END
    END
    
    \${sql_vulns}=        Get From Dictionary    \${SECURITY_FINDINGS}    sql_injection
    Log                   SQL injection vulnerabilities found: \${sql_vulns}

Test Cross-Site Scripting (XSS)
    [Documentation]    Detecta vulnerabilidades XSS en formularios y parámetros
    [Tags]             xss    owasp_top10    client_side
    
    # Cargar payloads XSS
    \${xss_content}=      Get File    \${XSS_PAYLOADS}
    @{xss_payloads}=      Split To Lines    \${xss_content}
    Should Not Be Empty   \${xss_payloads}
    
    Open Browser          \${TARGET_URL}    chrome    options=add_argument("--disable-web-security")
    
    # Buscar formularios en páginas principales
    @{test_pages}=        Create List    /    /contact    /search    /profile    /comments
    
    FOR    \${page}    IN    @{test_pages}
        Go To             \${TARGET_URL}\${page}
        \${page_loaded}=  Run Keyword And Return Status    Wait Until Page Contains Element    tag:body    timeout=5
        Continue For Loop If    not \${page_loaded}
        
        # Encontrar todos los campos input
        \${input_elements}= Get WebElements    //input[@type='text' or @type='search' or not(@type)]
        \${textarea_elements}= Get WebElements    //textarea
        
        FOR    \${element}    IN    @{input_elements}
            FOR    \${xss_payload}    IN    @{xss_payloads}
                # Limpiar campo e insertar payload
                Clear Element Text     \${element}
                Input Text             \${element}    \${xss_payload}
                
                # Submit form si existe
                \${form_element}=      Run Keyword And Return Status    
                ...                    Get WebElement    xpath=//form[.//input]
                Run Keyword If         \${form_element}    Click Button    xpath=//input[@type='submit'] | //button[@type='submit']
                
                # Detectar ejecución de script
                \${alert_present}=    Run Keyword And Return Status    Alert Should Be Present
                Run Keyword If        \${alert_present}
                ...                   Flag XSS Vulnerability    \${page}    input    \${xss_payload}
                ...                   ELSE    Handle Alert    action=DISMISS
                
                # Verificar payload en source code
                \${page_source}=      Get Source
                \${xss_in_source}=   Run Keyword And Return Status
                ...                  Should Contain    \${page_source}    \${xss_payload}
                Run Keyword If       \${xss_in_source}
                ...                  Flag XSS Vulnerability    \${page}    reflected    \${xss_payload}
                
                Sleep                0.5s
            END
        END
        
        # Test textareas
        FOR    \${textarea}    IN    @{textarea_elements}
            \${xss_payload}=      Get From List    \${xss_payloads}    0
            Clear Element Text    \${textarea}
            Input Text            \${textarea}    \${xss_payload}
            
            \${submit_exists}=    Run Keyword And Return Status
            ...                   Page Should Contain Element    xpath=//input[@type='submit']
            Run Keyword If        \${submit_exists}    Click Button    xpath=//input[@type='submit']
            
            \${alert_after_submit}= Run Keyword And Return Status    Alert Should Be Present
            Run Keyword If          \${alert_after_submit}
            ...                     Flag XSS Vulnerability    \${page}    textarea    \${xss_payload}
        END
    END
    
    Close Browser
    \${xss_vulns}=        Get From Dictionary    \${SECURITY_FINDINGS}    xss
    Log                   XSS vulnerabilities found: \${xss_vulns}

Test Authentication Bypass
    [Documentation]    Prueba bypass de autenticación y autorización
    [Tags]             auth_bypass    access_control    owasp_top10
    
    Create Session        auth_test     \${TARGET_URL}
    
    # Test 1: Direct URL access to protected resources
    @{protected_urls}=    Create List    /admin    /admin/users    /api/admin    /dashboard    /profile/edit
    
    FOR    \${protected_url}    IN    @{protected_urls}
        # Acceso sin autenticación
        \${unauth_response}=  GET On Session    auth_test    \${protected_url}    
        ...                   timeout=10    expected_status=any
        
        # Si no redirige a login, es vulnerable
        \${bypass_detected}=  Evaluate    \${unauth_response.status_code} == 200
        Run Keyword If        \${bypass_detected}
        ...                   Flag Auth Bypass Vulnerability    \${protected_url}    direct_access
        
        Should Not Be Equal   \${unauth_response.status_code}    200
        Log                   Protected URL \${protected_url}: \${unauth_response.status_code}
    END
    
    # Test 2: Parameter manipulation
    \${login_data}=       Create Dictionary    username=admin    password=wrongpass
    \${login_response}=   POST On Session    auth_test    /api/login    
    ...                   json=\${login_data}    timeout=10    expected_status=any
    
    # Test role manipulation in requests
    \${headers_with_role}= Create Dictionary    X-User-Role=admin    X-Admin=true    Authorization=Bearer fake_token
    
    FOR    \${protected_url}    IN    @{protected_urls}
        \${role_response}=  GET On Session    auth_test    \${protected_url}    
        ...                 headers=\${headers_with_role}    timeout=10    expected_status=any
        
        \${role_bypass}=    Evaluate    \${role_response.status_code} == 200
        Run Keyword If      \${role_bypass}
        ...                 Flag Auth Bypass Vulnerability    \${protected_url}    role_manipulation
        
        Log                 Role manipulation test \${protected_url}: \${role_response.status_code}
    END
    
    # Test 3: JWT token manipulation (si aplica)
    \${weak_jwt}=         Set Variable    eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ.
    \${jwt_headers}=      Create Dictionary    Authorization=Bearer \${weak_jwt}
    
    FOR    \${api_endpoint}    IN    @{protected_urls}
        \${jwt_response}=   GET On Session    auth_test    \${api_endpoint}    
        ...                 headers=\${jwt_headers}    timeout=10    expected_status=any
        
        \${jwt_bypass}=     Evaluate    \${jwt_response.status_code} == 200
        Run Keyword If      \${jwt_bypass}
        ...                 Flag Auth Bypass Vulnerability    \${api_endpoint}    weak_jwt
    END

Test CSRF Protection
    [Documentation]    Verifica protección contra Cross-Site Request Forgery
    [Tags]             csrf    owasp_top10    session_management
    
    Open Browser          \${TARGET_URL}    chrome
    
    # Login first para obtener sesión válida
    Go To                 \${TARGET_URL}/login
    \${login_form_exists}= Run Keyword And Return Status
    ...                   Wait Until Page Contains Element    name=username    timeout=5
    
    Run Keyword If        \${login_form_exists}
    ...                   Perform Valid Login
    
    # Test formularios críticos sin CSRF token
    @{critical_forms}=    Create List    /admin/delete-user    /api/transfer    /profile/update    /admin/settings
    
    FOR    \${form_endpoint}    IN    @{critical_forms}
        # Crear request externo simulando CSRF attack
        Create Session    external_attacker    \${TARGET_URL}
        
        # Obtener cookies de sesión actual del browser
        \${cookies}=      Get Cookies
        \${session_cookies}= Create Dictionary
        
        FOR    \${cookie}    IN    @{cookies}
            Set To Dictionary    \${session_cookies}    \${cookie['name']}=\${cookie['value']}
        END
        
        # Intentar POST sin CSRF token
        \${csrf_attack_data}= Create Dictionary    action=delete    user_id=1    amount=1000
        \${csrf_response}=    POST On Session    external_attacker    \${form_endpoint}    
        ...                   json=\${csrf_attack_data}    cookies=\${session_cookies}    
        ...                   timeout=10    expected_status=any
        
        # Si la acción se ejecuta sin CSRF token, es vulnerable
        \${csrf_vulnerable}=  Evaluate    \${csrf_response.status_code} == 200
        Run Keyword If        \${csrf_vulnerable}
        ...                   Flag CSRF Vulnerability    \${form_endpoint}
        
        Should Not Be Equal   \${csrf_response.status_code}    200
        Log                   CSRF test \${form_endpoint}: \${csrf_response.status_code}
    END
    
    Close Browser

Run Automated Vulnerability Scan
    [Documentation]    Ejecuta scanner automático de vulnerabilidades
    [Tags]             automated_scan    vulnerability_assessment
    
    # Usar OWASP ZAP como scanner
    Create Session        zap_api       \${OWASP_ZAP_API}
    
    # Iniciar spider scan
    \${spider_data}=      Create Dictionary    url=\${TARGET_URL}    maxChildren=10    recurse=true
    \${spider_response}=  POST On Session    zap_api    /JSON/spider/action/scan/    
    ...                   params=\${spider_data}    timeout=30
    Should Be Equal       \${spider_response.status_code}    200
    
    \${scan_id}=          Set Variable    \${spider_response.json()['scan']}
    Should Not Be Empty   \${scan_id}
    
    # Esperar completación del spider
    FOR    \${attempt}    IN RANGE    30
        \${status_response}= GET On Session    zap_api    /JSON/spider/view/status/    
        ...                  params=scanId=\${scan_id}    timeout=10
        \${scan_progress}=   Set Variable    \${status_response.json()['status']}
        
        Exit For Loop If     '\${scan_progress}' == '100'
        Sleep                10s
        Log                  Spider progress: \${scan_progress}%
    END
    
    # Ejecutar active scan
    \${active_scan_data}= Create Dictionary    url=\${TARGET_URL}    recurse=true    inScopeOnly=false
    \${active_response}=  POST On Session    zap_api    /JSON/ascan/action/scan/    
    ...                   params=\${active_scan_data}    timeout=30
    Should Be Equal       \${active_response.status_code}    200
    
    \${active_scan_id}=   Set Variable    \${active_response.json()['scan']}
    
    # Monitorear active scan (ejecutar por 5 minutos máximo)
    FOR    \${scan_attempt}    IN RANGE    15
        \${active_status}=   GET On Session    zap_api    /JSON/ascan/view/status/    
        ...                  params=scanId=\${active_scan_id}    timeout=10
        \${active_progress}= Set Variable    \${active_status.json()['status']}
        
        Break For Loop If    '\${active_progress}' == '100'
        Sleep                20s
        Log                  Active scan progress: \${active_progress}%
    END
    
    # Obtener resultados del scan
    \${alerts_response}=  GET On Session    zap_api    /JSON/core/view/alerts/    
    ...                   params=baseurl=\${TARGET_URL}    timeout=15
    Should Be Equal       \${alerts_response.status_code}    200
    
    \${scan_results}=     Set Variable    \${alerts_response.json()}
    \${total_alerts}=     Get Length    \${scan_results['alerts']}
    Should Be True        \${total_alerts} >= 0
    
    # Clasificar alertas por severidad
    \${high_risk_alerts}= Count Alerts By Risk    \${scan_results}    High
    \${medium_risk_alerts}= Count Alerts By Risk    \${scan_results}    Medium
    \${low_risk_alerts}=  Count Alerts By Risk    \${scan_results}    Low
    
    Set To Dictionary     \${SECURITY_FINDINGS}    high_risk=\${high_risk_alerts}
    Set To Dictionary     \${SECURITY_FINDINGS}    medium_risk=\${medium_risk_alerts}
    Set To Dictionary     \${SECURITY_FINDINGS}    low_risk=\${low_risk_alerts}
    
    Log                   Automated scan completed
    Log                   High risk alerts: \${high_risk_alerts}
    Log                   Medium risk alerts: \${medium_risk_alerts}
    Log                   Low risk alerts: \${low_risk_alerts}

Generate Security Test Report
    [Documentation]    Genera reporte comprehensivo de security testing
    [Tags]             reporting    security_assessment    documentation
    
    # Compilar todos los findings de seguridad
    \${report_data}=      Create Dictionary
    ...                   target_url=\${TARGET_URL}
    ...                   test_date=\${CURRENT_DATE}
    ...                   findings=\${SECURITY_FINDINGS}
    ...                   test_duration=15min
    
    # Calcular score de seguridad
    \${total_vulns}=      Evaluate    \${SECURITY_FINDINGS.sql_injection} + \${SECURITY_FINDINGS.xss} + \${SECURITY_FINDINGS.csrf} + \${SECURITY_FINDINGS.auth_bypass}
    \${security_score}=   Evaluate    max(0, 100 - (\${total_vulns} * 10))
    Set To Dictionary     \${report_data}    security_score=\${security_score}
    
    # Generar recomendaciones basadas en findings
    @{recommendations}=   Create List
    
    Run Keyword If        \${SECURITY_FINDINGS.sql_injection} > 0
    ...                   Append To List    \${recommendations}    Implement parameterized queries and input validation
    
    Run Keyword If        \${SECURITY_FINDINGS.xss} > 0
    ...                   Append To List    \${recommendations}    Add output encoding and Content Security Policy
    
    Run Keyword If        \${SECURITY_FINDINGS.csrf} > 0
    ...                   Append To List    \${recommendations}    Implement CSRF tokens in all forms
    
    Run Keyword If        \${SECURITY_FINDINGS.auth_bypass} > 0
    ...                   Append To List    \${recommendations}    Strengthen access controls and authentication
    
    Set To Dictionary     \${report_data}    recommendations=\${recommendations}
    
    # Generar reporte JSON
    \${report_json}=      Evaluate    json.dumps(\${report_data}, indent=2)
    Create File           \${SECURITY_REPORT}    \${report_json}
    
    # Generar reporte HTML ejecutivo
    \${html_content}=     Generate HTML Security Report    \${report_data}
    Create File           security_report.html    \${html_content}
    
    # Verificar archivos generados
    File Should Exist     \${SECURITY_REPORT}
    File Should Exist     security_report.html
    
    Log                   Security test report generated
    Log                   Overall security score: \${security_score}/100
    Log                   Total vulnerabilities found: \${total_vulns}
    Log                   Recommendations: \${recommendations}

*** Keywords ***
Initialize Security Testing
    Log                   🔒 Initializing security testing environment
    Set Global Variable   \${CURRENT_DATE}    2024-01-15
    
    # Crear archivos de payloads si no existen
    Create File           \${XSS_PAYLOADS}    <script>alert('XSS')</script>\n<img src=x onerror=alert('XSS')>\n
    Create File           \${SQL_PAYLOADS}    ' OR 1=1--\n' UNION SELECT NULL--\nadmin'--\n

Flag SQL Injection Vulnerability
    [Arguments]           \${endpoint}    \${method}    \${payload}
    \${current_count}=    Get From Dictionary    \${SECURITY_FINDINGS}    sql_injection
    \${new_count}=        Evaluate    \${current_count} + 1
    Set To Dictionary     \${SECURITY_FINDINGS}    sql_injection=\${new_count}
    Log                   SQL Injection found in \${endpoint} (\${method}): \${payload}
    Append To File        \${PENTEST_RESULTS}    SQL_INJECTION,\${endpoint},\${method},\${payload}\\n

Flag XSS Vulnerability
    [Arguments]           \${page}    \${type}    \${payload}
    \${current_count}=    Get From Dictionary    \${SECURITY_FINDINGS}    xss
    \${new_count}=        Evaluate    \${current_count} + 1
    Set To Dictionary     \${SECURITY_FINDINGS}    xss=\${new_count}
    Log                   XSS found in \${page} (\${type}): \${payload}
    Append To File        \${PENTEST_RESULTS}    XSS,\${page},\${type},\${payload}\\n

Flag Auth Bypass Vulnerability
    [Arguments]           \${url}    \${method}
    \${current_count}=    Get From Dictionary    \${SECURITY_FINDINGS}    auth_bypass
    \${new_count}=        Evaluate    \${current_count} + 1
    Set To Dictionary     \${SECURITY_FINDINGS}    auth_bypass=\${new_count}
    Log                   Auth bypass found: \${url} (\${method})
    Append To File        \${PENTEST_RESULTS}    AUTH_BYPASS,\${url},\${method}\\n

Flag CSRF Vulnerability
    [Arguments]           \${endpoint}
    \${current_count}=    Get From Dictionary    \${SECURITY_FINDINGS}    csrf
    \${new_count}=        Evaluate    \${current_count} + 1
    Set To Dictionary     \${SECURITY_FINDINGS}    csrf=\${new_count}
    Log                   CSRF vulnerability found: \${endpoint}
    Append To File        \${PENTEST_RESULTS}    CSRF,\${endpoint}\\n

Perform Valid Login
    Input Text            name=username    admin
    Input Password        name=password    admin123
    Click Button          xpath=//input[@type='submit']
    Sleep                 2s

Count Alerts By Risk
    [Arguments]           \${scan_results}    \${risk_level}
    \${count}=            Set Variable    0
    # Placeholder - en implementación real parsearía los resultados
    RETURN                \${count}

Generate HTML Security Report
    [Arguments]           \${report_data}
    \${html}=             Set Variable    <html><body><h1>Security Test Report</h1><p>Score: \${report_data['security_score']}/100</p></body></html>
    RETURN                \${html}

Archive Security Results
    Log                   📁 Archiving security test results and findings
    Log                   Security testing completed successfully</code></pre>
        
        <h3>🎯 Práctica Security (12 min):</h3>
        <p>1. Instala OWASP ZAP para automated vulnerability scanning</p>
        <p>2. Crea payloads personalizados para SQL injection y XSS testing</p>
        <p>3. Configura target application vulnerable para practice testing</p>
        <p>4. Ejecuta tests manuales de authentication bypass</p>
        <p>5. Implementa CSRF protection testing en formularios críticos</p>
        <p>6. Configura automated scanning con ZAP API integration</p>
        <p>7. Genera reportes de security findings con recomendaciones</p>
        <p>8. Integra security testing en CI/CD pipeline</p>
        <p>9. Crea alerts automáticos para vulnerabilidades críticas</p>
        <p>10. Documenta security testing procedures y playbooks</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Detectar vulnerabilidades OWASP Top 10 automáticamente</li>
                <li>Implementar tests de SQL injection, XSS y CSRF</li>
                <li>Configurar automated vulnerability scanning</li>
                <li>Generar reportes de security assessment comprehensivos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa OWASP ZAP API para automation: POST /JSON/spider/action/scan/ inicia spider, luego /JSON/ascan/action/scan/ para active scan.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 213 - Vulnerability assessment automatizado</h3>
        <p>Con fundamentos de security testing dominados, implementarás vulnerability assessment automatizado con herramientas enterprise y reporting avanzado.</p>
    `,
    topics: ["security", "vulnerabilities", "pentesting"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 15,
    difficulty: "advanced",
    prerequisites: ["lesson-211"],
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_212 = LESSON_212;
}