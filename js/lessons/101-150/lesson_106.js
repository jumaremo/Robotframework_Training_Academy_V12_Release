/**
 * Robot Framework Academy - Lesson 106
 * Alerts y confirmaciones
 */

const LESSON_106 = {
    id: 106,
    title: "Interacciones Avanzadas 106",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>⚠️ Alerts confirmaciones</h2>
        <p>Manejar diferentes tipos de alerts JavaScript, confirmaciones y prompts del navegador.</p>
        
        <h3>💻 Tests Alerts:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com/alerts
\${BROWSER}            chrome
\${ALERT_TEXT}         ¡Operación exitosa!
\${CONFIRM_TEXT}       ¿Está seguro de continuar?
\${PROMPT_TEXT}        Ingrese su nombre:
\${USER_INPUT}         TestUser
\${ERROR_ALERT}        Error en el proceso

*** Test Cases ***
Test Alert Simple
    Open Browser              \${URL}        \${BROWSER}
    Click Button              id=show-alert
    Alert Should Be Present   \${ALERT_TEXT}
    Handle Alert              ACCEPT
    Page Should Contain       alert aceptado
    Click Button              id=show-error
    Alert Should Be Present   \${ERROR_ALERT}
    Handle Alert              ACCEPT
    Page Should Contain       error manejado
    Close Browser

Test Confirmación
    Open Browser              \${URL}        \${BROWSER}
    Click Button              id=show-confirm
    Alert Should Be Present   \${CONFIRM_TEXT}
    Handle Alert              ACCEPT
    Page Should Contain       confirmado aceptado
    Click Button              id=show-confirm
    Alert Should Be Present   \${CONFIRM_TEXT}
    Handle Alert              DISMISS
    Page Should Contain       confirmado cancelado
    Page Should Not Contain   operación completada
    Close Browser

Test Prompt Input
    Open Browser              \${URL}        \${BROWSER}
    Click Button              id=show-prompt
    Alert Should Be Present   \${PROMPT_TEXT}
    Input Text Into Alert     \${USER_INPUT}
    Handle Alert              ACCEPT
    Page Should Contain       Hola \${USER_INPUT}
    Element Text Should Be    id=user-name    \${USER_INPUT}
    Click Button              id=show-prompt
    Alert Should Be Present   \${PROMPT_TEXT}
    Handle Alert              DISMISS
    Page Should Contain       prompt cancelado
    Close Browser

Test Alert Timeout
    Open Browser              \${URL}        \${BROWSER}
    Click Button              id=delayed-alert
    Wait Until Alert Is Present    timeout=10s
    \${alert_text}=    Get Alert Message
    Should Contain            \${alert_text}    carga completada
    Handle Alert              ACCEPT
    Page Should Contain       procesado correctamente
    Click Button              id=quick-alert
    Wait Until Alert Is Present    timeout=2s
    Handle Alert              ACCEPT
    Page Should Contain       alert rápido manejado
    Close Browser

Test Multiple Alerts
    Open Browser              \${URL}        \${BROWSER}
    Click Button              id=multiple-alerts
    Alert Should Be Present   Primera alerta
    Handle Alert              ACCEPT
    Alert Should Be Present   Segunda alerta
    Handle Alert              ACCEPT
    Alert Should Be Present   Tercera alerta
    Handle Alert              ACCEPT
    Page Should Contain       todas las alertas manejadas
    \${result}=    Get Text    id=alert-counter
    Should Be Equal           \${result}    3
    Close Browser

Test Alert JavaScript
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        alert('Alert desde JS')
    Alert Should Be Present   Alert desde JS
    Handle Alert              ACCEPT
    Execute JavaScript        var result = confirm('¿Continuar?'); document.getElementById('js-result').textContent = result;
    Alert Should Be Present   ¿Continuar?
    Handle Alert              ACCEPT
    \${result}=    Get Text    id=js-result
    Should Be Equal           \${result}    true
    Execute JavaScript        var name = prompt('Nombre:', 'Default'); document.getElementById('prompt-result').textContent = name;
    Alert Should Be Present   Nombre:
    Input Text Into Alert     JSUser
    Handle Alert              ACCEPT
    \${name}=    Get Text     id=prompt-result
    Should Be Equal           \${name}    JSUser
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Alerts (5 min):</h3>
        <p>1. Usa Click Button para disparar alert simple</p>
        <p>2. Verifica texto de alert con Alert Should Be Present</p>
        <p>3. Acepta alert con Handle Alert ACCEPT</p>
        <p>4. Valida que página reacciona después del alert</p>
        <p>5. Usa Handle Alert DISMISS para cancelar confirmación</p>
        <p>6. Maneja prompt con Input Text Into Alert</p>
        <p>7. Verifica que texto ingresado aparece en página</p>
        <p>8. Usa Wait Until Alert Is Present para alerts que tardan</p>
        <p>9. Extrae texto de alert con Get Alert Message</p>
        <p>10. Maneja secuencia de múltiples alerts consecutivos</p>
        <p>11. Combina Execute JavaScript con manejo de alerts</p>
        <p>12. Verifica que confirmación retorna true/false</p>
        <p>13. Usa timeout en Wait Until Alert Is Present</p>
        <p>14. Valida que prompt funciona con texto por defecto</p>
        <p>15. Implementa manejo de alerts de error</p>
        <p>16. Usa Get Text para verificar resultados post-alert</p>
        <p>17. Maneja alerts que aparecen automáticamente</p>
        <p>18. Combina alerts con validación de elementos en página</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Manejar alerts, confirmaciones y prompts JavaScript</li>
                <li>Validar contenido de alerts antes de manejarlos</li>
                <li>Implementar timeouts para alerts que aparecen con delay</li>
                <li>Combinar manejo de alerts con JavaScript execution</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Siempre usa Alert Should Be Present antes de Handle Alert para verificar el contenido. Los prompts requieren Input Text Into Alert antes del ACCEPT.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 107 - Drag and drop avanzado</h3>
        <p>Aprenderás a implementar drag and drop complejo, sortable lists y interacciones de arrastrar y soltar.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-105"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_106 = LESSON_106;
}