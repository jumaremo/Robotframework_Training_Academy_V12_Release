const LESSON_023 = {
    id: 23,
    title: "Logging y mensajes de debug",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    content: `
        <h2>📝 Logging y Debug</h2>
        <p>Mensajes informativos y debugging efectivo en Robot Framework.</p>
        
        <h3>💻 Log Levels y Output:</h3>
        <pre><code class="robot">
*** Variables ***
\${USER_DATA}         {"name": "Test User", "email": "test@example.com"}
\${TEST_COUNTER}      0
\${DEBUG_MODE}        True
\${LOG_FILE}          test_results.log
\${ERROR_COUNT}       0

*** Test Cases ***
Test Basic Logging
    Log    Starting basic logging test
    Log    Current time: \${CURTIME}    INFO
    Log    Debug information    DEBUG
    Log    Warning message    WARN
    Log    Error occurred    ERROR
    Set Variable    \${TEST_COUNTER}    \${TEST_COUNTER + 1}
    Log    Test counter: \${TEST_COUNTER}

Test Conditional Logging
    Run Keyword If    \${DEBUG_MODE}    Log    Debug mode is enabled    DEBUG
    \${status}    Run Keyword And Return Status    Should Be True    \${DEBUG_MODE}
    Run Keyword If    \${status}    Log    Validation successful
    Run Keyword Unless    \${status}    Log    Validation failed    ERROR
    Log Many    Status: \${status}    Mode: \${DEBUG_MODE}

Test Log To Console
    Log To Console    This appears in console
    Log To Console    User data: \${USER_DATA}
    Log To Console    Starting test execution...
    Should Contain    \${USER_DATA}    Test User
    Log To Console    Validation completed successfully

Test Variable Logging
    Log Variables
    Set Test Variable    \${CURRENT_TEST}    Variable Logging
    Log    Current test: \${CURRENT_TEST}
    \${random_num}    Evaluate    random.randint(1, 100)
    Log    Generated number: \${random_num}
    Should Be True    \${random_num} >= 1

Test Comment And Documentation
    Comment    This is a comment for documentation
    Log    Processing user registration
    \${email_valid}    Run Keyword And Return Status    Should Match Regexp    \${USER_DATA}    .*@.*
    Comment    Email validation completed
    Log    Email validation result: \${email_valid}

Test Detailed Debug Info
    Log    \=== Debug Session Start \===
    Log    Current directory: \${CURDIR}
    Log    Output directory: \${OUTPUTDIR}
    Log    Suite name: \${SUITE NAME}
    Log    Test name: \${TEST NAME}
    Log    \=== Debug Session End \===

Test Error Tracking
    TRY
        \${result}    Evaluate    10 / 0
    EXCEPT
        \${ERROR_COUNT}    Evaluate    \${ERROR_COUNT} + 1
        Log    Error #\${ERROR_COUNT}: Division by zero    ERROR
        Set Global Variable    \${ERROR_COUNT}
    END
    Should Be True    \${ERROR_COUNT} > 0

*** Keywords ***
Debug Log With Timestamp
    [Arguments]    \${message}    \${level}=INFO
    \${timestamp}    Get Current Date    result_format=%Y-%m-%d %H:%M:%S
    Log    [\${timestamp}] \${message}    \${level}

Log Test Progress
    [Arguments]    \${step_name}    \${step_number}
    Log    Step \${step_number}: \${step_name}    INFO
    Log To Console    Executing: \${step_name}
    Comment    Progress logged for step \${step_number}

Conditional Debug Log
    [Arguments]    \${condition}    \${message}
    Run Keyword If    \${condition}    Log    DEBUG: \${message}    DEBUG
    Run Keyword Unless    \${condition}    Log    SKIP: \${message}    WARN
        </code></pre>
        
        <h3>🎯 Práctica Logging Debug (4 min):</h3>
        <ol>
            <li><strong>Log básico:</strong> Crear test que use Log con diferentes niveles (INFO, DEBUG, WARN, ERROR)</li>
            <li><strong>Log con variables:</strong> Mostrar valores de variables usando \${VAR} en mensajes de log</li>
            <li><strong>Log To Console:</strong> Usar Log To Console para mostrar información en terminal</li>
            <li><strong>Log Variables:</strong> Ejecutar Log Variables para ver todas las variables activas</li>
            <li><strong>Log condicional:</strong> Combinar Run Keyword If con Log para logging condicional</li>
            <li><strong>Log Many:</strong> Usar Log Many para mostrar múltiples valores en una línea</li>
            <li><strong>Comment keyword:</strong> Agregar Comment para documentación sin afectar ejecución</li>
            <li><strong>Debug con timestamp:</strong> Crear keyword que agregue timestamp a mensajes de log</li>
            <li><strong>Variables built-in:</strong> Mostrar \${CURTIME}, \${CURDIR}, \${SUITE NAME} en logs</li>
            <li><strong>Log en excepciones:</strong> Agregar logging detallado en bloques TRY/EXCEPT</li>
            <li><strong>Progreso de test:</strong> Crear keyword para log de progreso con numeración</li>
            <li><strong>Debug mode variable:</strong> Usar variable \${DEBUG_MODE} para controlar nivel de logging</li>
            <li><strong>Log de validaciones:</strong> Mostrar resultados de Should keywords en logs</li>
            <li><strong>Contador de errores:</strong> Implementar logging de conteo de errores con variables globales</li>
            <li><strong>Test completo:</strong> Crear test que combine todas las técnicas de logging aprendidas</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar los niveles de logging (INFO, DEBUG, WARN, ERROR) en Robot Framework</li>
                <li>Implementar logging condicional y debug efectivo con variables</li>
                <li>Usar Log Variables, Log To Console y Comment para debugging completo</li>
                <li>Crear keywords personalizados para logging estructurado con timestamps</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Log To Console para información inmediata durante ejecución y Log Variables antes de validaciones complejas. El nivel DEBUG solo se muestra con --loglevel DEBUG.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 024 - Timeouts y esperas</h3>
        <p>Con el logging dominado para diagnosticar problemas, ahora aprenderemos a manejar timeouts y esperas efectivamente, herramientas esenciales para tests web robustos y confiables.</p>
    `,
    topics: ["logging", "debug", "output"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-022"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_023 = LESSON_023;
}