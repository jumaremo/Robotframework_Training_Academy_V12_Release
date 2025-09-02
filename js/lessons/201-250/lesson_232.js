/**
 * Robot Framework Academy - Lesson 232
 * Robot Listener API Avanzado
 */

const LESSON_232 = {
    id: 232,
    title: "Robot Listener API Avanzado",
    duration: "10 min",
    level: "advanced",
    section: "section-19",
    content: `
        <h2>🔧 Listener API Completo</h2>
        <p>API completo con todos los métodos de interceptación para extensiones empresariales.</p>
        
        <h3>💻 API métodos avanzados:</h3>
        <pre><code class="robot">*** Settings ***
Library    AdvancedListener.py

*** Variables ***
\${API_VERSION}     v2.1
\${LISTENER_MODE}   production
\${EVENT_BUFFER}    1000
\${TIMEOUT_SEC}     30
\${MAX_RETRIES}     3
\${LOG_FORMAT}      json
\${METRICS_PORT}    8080
\${WEBHOOK_TOKEN}   abc123xyz789

*** Test Cases ***
Test Start Suite Hook
    Set Global Variable    \${SUITE_START_TIME}    123456789
    Should Not Be Empty    \${SUITE_START_TIME}
    Log    Suite started with advanced listener    INFO
    Should Be Equal    \${API_VERSION}    v2.1
    Set Suite Variable    \${SUITE_STATUS}    RUNNING
    Should Be Equal    \${SUITE_STATUS}    RUNNING
    Log    Suite initialization completed    INFO
    Should Be Equal    \${LISTENER_MODE}    production
    Set Test Variable    \${HOOK_ACTIVE}    True
    Should Be Equal    \${HOOK_ACTIVE}    True

Test End Suite Analytics
    Set Global Variable    \${SUITE_END_TIME}    987654321
    Should Not Be Empty    \${SUITE_END_TIME}
    Log    Suite analytics processing    INFO
    Set Suite Variable    \${TOTAL_TESTS}    25
    Should Be Equal As Numbers    \${TOTAL_TESTS}    25
    Set Test Variable    \${PASSED_TESTS}    23
    Should Be Equal As Numbers    \${PASSED_TESTS}    23
    Log    Suite metrics calculated    INFO
    Should Be Equal    \${API_VERSION}    v2.1
    Set Global Variable    \${ANALYTICS_READY}    True
    Should Be Equal    \${ANALYTICS_READY}    True

Test Keyword Timing Hooks
    Set Suite Variable    \${KEYWORD_START}    555444333
    Should Not Be Empty    \${KEYWORD_START}
    Log    Keyword timing initiated    INFO
    Set Test Variable    \${KEYWORD_NAME}    Login User
    Should Be Equal    \${KEYWORD_NAME}    Login User
    Set Global Variable    \${TIMING_ENABLED}    True
    Should Be Equal    \${TIMING_ENABLED}    True
    Log    Performance monitoring active    INFO
    Should Be Equal    \${MAX_RETRIES}    3
    Set Suite Variable    \${EXECUTION_TIME}    1500
    Should Be Equal As Numbers    \${EXECUTION_TIME}    1500

Test Message Filtering
    Set Global Variable    \${MESSAGE_LEVEL}    ERROR
    Should Be Equal    \${MESSAGE_LEVEL}    ERROR
    Log    Message filtering configured    INFO
    Set Suite Variable    \${FILTER_ACTIVE}    True
    Should Be Equal    \${FILTER_ACTIVE}    True
    Should Be Equal    \${LOG_FORMAT}    json
    Set Test Variable    \${ERROR_COUNT}    2
    Should Be Equal As Numbers    \${ERROR_COUNT}    2
    Log    Error tracking enabled    INFO
    Should Be Equal    \${EVENT_BUFFER}    1000
    Set Global Variable    \${FILTER_READY}    True
    Should Be Equal    \${FILTER_READY}    True

Test Library Import Hooks
    Set Suite Variable    \${LIBRARY_NAME}    SeleniumLibrary
    Should Be Equal    \${LIBRARY_NAME}    SeleniumLibrary
    Log    Library import detected    INFO
    Set Test Variable    \${IMPORT_SUCCESS}    True
    Should Be Equal    \${IMPORT_SUCCESS}    True
    Should Be Equal    \${TIMEOUT_SEC}    30
    Set Global Variable    \${LIBRARY_COUNT}    5
    Should Be Equal As Numbers    \${LIBRARY_COUNT}    5
    Log    Library tracking active    INFO
    Should Not Be Empty    \${WEBHOOK_TOKEN}
    Set Suite Variable    \${IMPORTS_TRACKED}    True
    Should Be Equal    \${IMPORTS_TRACKED}    True</code></pre>
        
        <h3>🎯 Práctica API Avanzado (7 min):</h3>
        <p>1. Implementa start_suite con inicialización de métricas</p>
        <p>2. Configura end_suite con cálculo de estadísticas</p>
        <p>3. Agrega start_test con timestamp y metadata</p>
        <p>4. Implementa end_test con duración y resultado</p>
        <p>5. Configura start_keyword para profiling detallado</p>
        <p>6. Agrega end_keyword con métricas de performance</p>
        <p>7. Implementa log_message con filtros personalizados</p>
        <p>8. Configura message para captura de warnings</p>
        <p>9. Agrega library_import para tracking de dependencias</p>
        <p>10. Implementa resource_import para recursos externos</p>
        <p>11. Configura variables_import para configuraciones</p>
        <p>12. Agrega output_file para reportes personalizados</p>
        <p>13. Implementa log_file para logging estructurado</p>
        <p>14. Configura report_file para métricas HTML</p>
        <p>15. Agrega debug_file para troubleshooting</p>
        <p>16. Testa listener con --listener AdvancedListener</p>
        <p>17. Valida que todos los hooks se ejecuten</p>
        <p>18. Verifica métricas de performance generadas</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar la API completa de Robot Framework Listeners</li>
                <li>Implementar hooks avanzados para métricas empresariales</li>
                <li>Crear sistemas de monitoring y alertas automáticas</li>
                <li>Desarrollar extensiones robustas para producción</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>La API v2 de listeners es más potente: usa start_keyword/end_keyword para profiling detallado y log_message para filtros inteligentes de logs.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 233 - Listener Patterns Enterprise</h3>
        <p>Aprenderás patrones avanzados para implementar listeners en arquitecturas enterprise con alta disponibilidad y escalabilidad.</p>
    `,
    topics: ["listeners", "extensions", "hooks"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-231"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_232 = LESSON_232;
}