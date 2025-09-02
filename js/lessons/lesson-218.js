/**
 * Robot Framework Academy - Lesson 218
 * Input Validation Testing
 */

const LESSON_218 = {
    id: 218,
    title: "Input Validation Testing",
    duration: "10 min",
    level: "advanced",
    section: "section-17",
    content: `
        <h2>🔒 Input Validation</h2>
        <p>Validación de inputs para prevenir vulnerabilidades críticas como SQL injection, XSS y buffer overflow.</p>
        
        <h3>💻 Tests Seguridad:</h3>
        <pre><code class="robot">*** Variables ***
\${APP_URL}           https://test-app.com
\${BROWSER}           chrome
\${LOGIN_FIELD}       id=username
\${PASSWORD_FIELD}    id=password
\${SEARCH_FIELD}      id=search
\${COMMENT_FIELD}     id=comment
\${SQL_PAYLOAD}       ' OR 1=1 --
\${XSS_PAYLOAD}       <script>alert('XSS')</script>
\${BUFFER_PAYLOAD}    ${'A' * 5000}
\${NORMAL_INPUT}      test_user
\${EMAIL_FIELD}       id=email
\${PHONE_FIELD}       id=phone
\${FILE_FIELD}        id=upload

*** Test Cases ***
Test SQL Injection Prevention
    Open Browser              \${APP_URL}    \${BROWSER}
    Input Text               \${LOGIN_FIELD}    \${SQL_PAYLOAD}
    Input Text               \${PASSWORD_FIELD}    password
    Click Button             Login
    Page Should Not Contain  Error occurred
    Page Should Not Contain  database
    Page Should Not Contain  SQL
    Element Should Be Visible    \${LOGIN_FIELD}
    Close Browser

Test XSS Attack Prevention
    Open Browser              \${APP_URL}    \${BROWSER}
    Input Text               \${LOGIN_FIELD}    \${NORMAL_INPUT}
    Input Text               \${PASSWORD_FIELD}    password
    Click Button             Login
    Input Text               \${COMMENT_FIELD}    \${XSS_PAYLOAD}
    Click Button             Submit
    Page Source Should Not Contain    <script>
    Page Source Should Not Contain    alert
    Element Text Should Not Be    \${COMMENT_FIELD}    \${XSS_PAYLOAD}
    Close Browser

Test Buffer Overflow Protection
    Open Browser              \${APP_URL}    \${BROWSER}
    Input Text               \${SEARCH_FIELD}    \${BUFFER_PAYLOAD}
    Press Keys               \${SEARCH_FIELD}    RETURN
    Page Should Not Contain  Internal Server Error
    Page Should Not Contain  500 Error
    Page Should Contain      Search results
    Element Should Be Visible    \${SEARCH_FIELD}
    Close Browser

Test Email Format Validation
    Open Browser              \${APP_URL}    \${BROWSER}
    Input Text               \${EMAIL_FIELD}    invalid-email
    Click Button             Validate
    Element Should Contain   error-message    Invalid email format
    Clear Element Text       \${EMAIL_FIELD}
    Input Text               \${EMAIL_FIELD}    valid@email.com
    Click Button             Validate
    Element Should Contain   success-message    Valid email
    Close Browser

Test Special Characters Handling
    Open Browser              \${APP_URL}    \${BROWSER}
    Input Text               \${LOGIN_FIELD}    <>&"'
    Input Text               \${PASSWORD_FIELD}    !@#\$%^&*()
    Click Button             Login
    Page Should Not Contain  Parse error
    Page Should Not Contain  Syntax error
    Element Should Be Visible    \${LOGIN_FIELD}
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Seguridad (7 min):</h3>
        <p>1. Configura entorno de testing con aplicación vulnerable</p>
        <p>2. Crea variables para payloads maliciosos SQL/XSS</p>
        <p>3. Implementa test que intenta SQL injection en login</p>
        <p>4. Verifica que aplicación rechaza payload correctamente</p>
        <p>5. Prueba XSS en campos de texto con script tags</p>
        <p>6. Valida que output está sanitizado sin ejecutar JavaScript</p>
        <p>7. Testa buffer overflow con strings extremadamente largos</p>
        <p>8. Confirma que aplicación maneja gracefully sin crash</p>
        <p>9. Valida formatos de email con regex patterns</p>
        <p>10. Prueba caracteres especiales en todos los campos</p>
        <p>11. Implementa verificaciones de encoding correcto</p>
        <p>12. Valida que errores no revelan información sensible</p>
        <p>13. Prueba límites de longitud en todos los inputs</p>
        <p>14. Verifica manejo de caracteres Unicode/UTF-8</p>
        <p>15. Documenta vulnerabilidades encontradas para remediation</p>
        <p>16. Crea reportes de security testing detallados</p>
        <p>17. Implementa regression tests para fixes aplicados</p>
        <p>18. Valida que headers de seguridad están presentes</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar tests automatizados de input validation</li>
                <li>Detectar vulnerabilidades SQL injection y XSS</li>
                <li>Validar manejo correcto de buffer overflow</li>
                <li>Establecer regression tests para security fixes</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa payloads del OWASP Top 10 y combina multiple attack vectors en un solo test para máxima cobertura.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 219 - Security Testing Project</h3>
        <p>Integrarás todos los conceptos de security testing en un proyecto completo de penetration testing automatizado.</p>
    `,
    topics: ["security", "vulnerabilities", "pentesting"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-217"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_218 = LESSON_218;
}