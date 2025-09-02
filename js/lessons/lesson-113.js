/**
 * Robot Framework Academy - Lesson 113
 * Browser security testing
 */

const LESSON_113 = {
    id: 113,
    title: "Interacciones Avanzadas 113",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>🔒 Browser security testing</h2>
        <p>Probar aspectos de seguridad del navegador, CSP headers, XSS protection y vulnerabilidades comunes.</p>
        
        <h3>💻 Tests Security:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com
\${BROWSER}            chrome
\${XSS_PAYLOAD}        <script>alert('XSS')</script>
\${SQL_PAYLOAD}        ' OR 1=1 --
\${SECURE_URL}         https://ejemplo.com/secure
\${INSECURE_URL}       http://ejemplo.com/insecure
\${CSP_HEADER}         Content-Security-Policy
\${CSRF_TOKEN}         csrf_token_123

*** Test Cases ***
Test XSS Protection
    Open Browser              \${URL}        \${BROWSER}
    Input Text                name=search    \${XSS_PAYLOAD}
    Click Button              Buscar
    Page Should Not Contain   <script>
    \${page_source}=     Get Source
    Should Not Contain        \${page_source}    alert('XSS')
    Element Should Not Be Visible    xpath=//script[contains(text(),'XSS')]
    \${console_errors}=  Execute JavaScript    
    ...    var errors = []; 
    ...    window.addEventListener('error', function(e) { errors.push(e.message); }); 
    ...    return errors.length;
    Should Be Equal As Numbers    \${console_errors}    0
    Page Should Contain       búsqueda segura
    Close Browser

Test HTTPS Enforcement
    Open Browser              \${INSECURE_URL}    \${BROWSER}
    \${current_url}=     Get Location
    Should Start With         \${current_url}    https://
    \${security_state}=  Execute JavaScript    return document.location.protocol
    Should Be Equal           \${security_state}    https:
    \${mixed_content}=   Execute JavaScript    
    ...    return document.querySelectorAll('img[src^="http:"], script[src^="http:"]').length
    Should Be Equal As Numbers    \${mixed_content}    0
    Page Should Contain       conexión segura
    Close Browser

Test CSP Headers
    Open Browser              \${SECURE_URL}    \${BROWSER}
    \${csp_header}=      Execute JavaScript    
    ...    var meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    ...    return meta ? meta.content : '';
    Should Not Be Empty       \${csp_header}
    Should Contain            \${csp_header}    script-src
    Should Contain            \${csp_header}    object-src 'none'
    Execute JavaScript        
    ...    try { eval('console.log("test")'); window.evalBlocked = false; } 
    ...    catch(e) { window.evalBlocked = true; }
    \${eval_blocked}=    Execute JavaScript    return window.evalBlocked
    Should Be True            \${eval_blocked}
    Page Should Contain       política de seguridad
    Close Browser

Test CSRF Protection
    Open Browser              \${URL}        \${BROWSER}
    \${csrf_token}=      Get Element Attribute    name=csrf_token    value
    Should Not Be Empty       \${csrf_token}
    Should Not Be Equal       \${csrf_token}    \${CSRF_TOKEN}
    Input Text                name=amount    1000
    Input Text                name=csrf_token    invalid_token
    Click Button              Transfer
    Page Should Contain       token inválido
    Page Should Not Contain   transferencia exitosa
    Input Text                name=csrf_token    \${csrf_token}
    Click Button              Transfer
    Page Should Contain       transferencia procesada
    Close Browser

Test SQL Injection Protection
    Open Browser              \${URL}        \${BROWSER}
    Input Text                name=username    \${SQL_PAYLOAD}
    Input Password            name=password    test123
    Click Button              Login
    Page Should Not Contain   database error
    Page Should Not Contain   mysql_error
    Page Should Not Contain   syntax error
    Page Should Contain       credenciales inválidas
    \${error_messages}=  Execute JavaScript    
    ...    return document.querySelectorAll('.error, .alert-danger').length
    Should Be True            \${error_messages} >= 1
    Page Should Not Contain   Welcome admin
    Close Browser

Test Secure Cookies
    Open Browser              \${SECURE_URL}    \${BROWSER}
    Add Cookie                test_cookie    test_value    secure=True    httpOnly=True
    \${secure_cookie}=   Get Cookie    test_cookie
    Should Be Equal           \${secure_cookie.secure}    \${True}
    Should Be Equal           \${secure_cookie.httpOnly}    \${True}
    \${cookie_access}=   Execute JavaScript    
    ...    try { var value = document.cookie.match(/test_cookie=([^;]+)/); return value ? value[1] : null; } 
    ...    catch(e) { return null; }
    Should Be Equal           \${cookie_access}    \${None}
    Page Should Contain       cookies seguros
    Delete Cookie             test_cookie
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Security (5 min):</h3>
        <p>1. Usa Input Text con payloads XSS para probar filtrado</p>
        <p>2. Verifica que scripts maliciosos no se ejecutan</p>
        <p>3. Usa Get Source para verificar que HTML está escapado</p>
        <p>4. Testa que URLs HTTP redirigen a HTTPS</p>
        <p>5. Usa Get Location para verificar protocolo seguro</p>
        <p>6. Verifica ausencia de mixed content con Execute JavaScript</p>
        <p>7. Extrae CSP headers desde meta tags</p>
        <p>8. Valida que eval() está bloqueado por CSP</p>
        <p>9. Verifica que tokens CSRF están presentes</p>
        <p>10. Usa Get Element Attribute para extraer tokens</p>
        <p>11. Testa que tokens inválidos rechazan requests</p>
        <p>12. Implementa SQL injection testing básico</p>
        <p>13. Verifica que errores de DB no se exponen</p>
        <p>14. Usa Should Not Contain para buscar error patterns</p>
        <p>15. Configura cookies seguras con flags correctos</p>
        <p>16. Verifica que httpOnly cookies no son accesibles por JS</p>
        <p>17. Valida que secure cookies solo van por HTTPS</p>
        <p>18. Combina múltiples tests de seguridad en flows completos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Probar protección contra XSS y SQL injection</li>
                <li>Validar enforcement de HTTPS y CSP headers</li>
                <li>Verificar protección CSRF y tokens válidos</li>
                <li>Implementar testing de cookies seguras</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Security testing busca que protecciones funcionen, NO que vulnerabilidades existan. Usa Should Not Contain para validar que ataques fallan.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 114 - Testing automation frameworks</h3>
        <p>Aprenderás a integrar Robot Framework con otros frameworks de testing, Page Object Model avanzado y patrones de automation.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-112"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_113 = LESSON_113;
}