/**
 * Robot Framework Academy - Lesson 231
 * Custom Listeners Robot Framework
 */

const LESSON_231 = {
    id: 231,
    title: "Custom Listeners Robot Framework",
    duration: "10 min",
    level: "advanced",
    section: "section-19",
    content: `
        <h2>🔧 Custom Listeners</h2>
        <p>Los listeners interceptan eventos de ejecución para crear extensiones personalizadas.</p>
        
        <h3>💻 Listener básico:</h3>
        <pre><code class="robot">*** Settings ***
Library    CustomListener.py

*** Variables ***
\${SUITE_NAME}     Test Suite Demo
\${TEST_USER}      admin
\${TEST_PASS}      secret123
\${LOG_LEVEL}      INFO
\${REPORT_PATH}    /reports/execution.json
\${EMAIL_CONFIG}   smtp.company.com:587
\${WEBHOOK_URL}    https://hooks.slack.com/services/test
\${DB_CONNECTION}  postgresql://localhost:5432/testdb

*** Test Cases ***
Test Con Listener Personalizado
    Set Suite Variable    \${SUITE_NAME}    Custom Test Suite
    Log    Starting test with custom listener    \${LOG_LEVEL}
    Should Be Equal    \${SUITE_NAME}    Custom Test Suite
    Set Test Variable    \${TEST_RESULT}    PASS
    Log    Test completed successfully    \${LOG_LEVEL}
    Should Not Be Empty    \${TEST_USER}
    Should Be Equal    \${TEST_USER}    admin
    Should Not Be Empty    \${TEST_PASS}
    Should Be Equal    \${TEST_PASS}    secret123
    Log    Test finished with listener hooks

Test Validación Hooks
    Set Global Variable    \${GLOBAL_COUNTER}    1
    Should Be Equal As Numbers    \${GLOBAL_COUNTER}    1
    Log    Global counter initialized    \${LOG_LEVEL}
    Set Suite Variable    \${EXECUTION_TIME}    0
    Should Be Equal As Numbers    \${EXECUTION_TIME}    0
    Log    Execution time will be calculated    \${LOG_LEVEL}
    Should Be Equal    \${TEST_USER}    admin
    Set Test Variable    \${HOOK_STATUS}    ACTIVE
    Should Be Equal    \${HOOK_STATUS}    ACTIVE
    Log    Hooks are functioning correctly    \${LOG_LEVEL}

Test Database Listener
    Set Suite Variable    \${DB_QUERY}    SELECT * FROM test_results
    Should Not Be Empty    \${DB_CONNECTION}
    Should Contain    \${DB_CONNECTION}    postgresql
    Log    Database connection configured    \${LOG_LEVEL}
    Set Test Variable    \${RECORD_COUNT}    0
    Should Be Equal As Numbers    \${RECORD_COUNT}    0
    Log    Recording test results to database    \${LOG_LEVEL}
    Should Contain    \${DB_CONNECTION}    localhost
    Set Global Variable    \${DB_LISTENER_ACTIVE}    True
    Should Be Equal    \${DB_LISTENER_ACTIVE}    True

Test Notification Hooks
    Set Suite Variable    \${NOTIFICATION_TYPE}    slack
    Should Be Equal    \${NOTIFICATION_TYPE}    slack
    Log    Notification system configured    \${LOG_LEVEL}
    Should Not Be Empty    \${WEBHOOK_URL}
    Should Contain    \${WEBHOOK_URL}    hooks.slack.com
    Set Test Variable    \${MESSAGE_SENT}    False
    Should Be Equal    \${MESSAGE_SENT}    False
    Log    Preparing notification hooks    \${LOG_LEVEL}
    Set Global Variable    \${ALERT_ENABLED}    True
    Should Be Equal    \${ALERT_ENABLED}    True</code></pre>
        
        <h3>🎯 Práctica Listeners (7 min):</h3>
        <p>1. Crea CustomListener.py con métodos start_suite y end_suite</p>
        <p>2. Implementa start_test que registre timestamp de inicio</p>
        <p>3. Agrega end_test que calcule duración de ejecución</p>
        <p>4. Crea log_message para capturar todos los logs</p>
        <p>5. Implementa start_keyword para hooks de keywords</p>
        <p>6. Agrega end_keyword con métricas de performance</p>
        <p>7. Configura output_file para reportes personalizados</p>
        <p>8. Implementa close() para cleanup de recursos</p>
        <p>9. Testa el listener con --listener CustomListener.py</p>
        <p>10. Verifica que se generen logs personalizados</p>
        <p>11. Configura notificaciones automáticas en fallos</p>
        <p>12. Integra con base de datos para métricas</p>
        <p>13. Implementa filtros de severidad de logs</p>
        <p>14. Agrega screenshots automáticos en errores</p>
        <p>15. Configura webhooks para integraciones</p>
        <p>16. Testa listener con múltiples test suites</p>
        <p>17. Valida performance del listener</p>
        <p>18. Implementa rollback en caso de errores</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear listeners personalizados para Robot Framework</li>
                <li>Implementar hooks en eventos de ejecución</li>
                <li>Integrar logging y notificaciones automáticas</li>
                <li>Desarrollar extensiones empresariales robustas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los listeners son perfectos para integraciones enterprise: enviar métricas a Grafana, notificar fallos a Slack, o almacenar resultados en bases de datos centralizadas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 232 - Robot Listener API Avanzado</h3>
        <p>Aprenderás la API completa de listeners con todos los métodos disponibles y patrones avanzados para extensiones empresariales.</p>
    `,
    topics: ["listeners", "extensions", "hooks"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-230"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_231 = LESSON_231;
}