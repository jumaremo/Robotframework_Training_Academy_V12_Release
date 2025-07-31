const LESSON_026 = {
    id: 26,
    title: "Ejecución y análisis de resultados",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    content: `
        <h2>🚀 Ejecución y Análisis</h2>
        <p>Comandos de ejecución, interpretación de reportes y optimización de resultados.</p>
        
        <h3>💻 Comandos Ejecución CLI:</h3>
        <pre><code class="robot">
*** Variables ***
\${REPORT_DIR}        results
\${LOG_LEVEL}         INFO
\${TAG_SMOKE}         smoke
\${TAG_REGRESSION}    regression
\${BROWSER_VAR}       Chrome

*** Test Cases ***
Test With Execution Tags
    [Tags]    \${TAG_SMOKE}    login    critical
    Log    Executing smoke test for login    \${LOG_LEVEL}
    Should Be Equal    \${TAG_SMOKE}    smoke
    Set Test Variable    \${EXECUTION_TIME}    \${CURTIME}
    Log    Test tagged as: \${TAG_SMOKE}

Test With Multiple Tags
    [Tags]    \${TAG_REGRESSION}    api    medium
    Log    Executing regression test    \${LOG_LEVEL}
    Should Contain    \${TAG_REGRESSION}    regression
    Log Variables
    Set Test Variable    \${TEST_TYPE}    regression

Test Browser From CLI
    [Tags]    ui    \${TAG_SMOKE}
    Log    Browser variable from CLI: \${BROWSER_VAR}
    Should Not Be Empty    \${BROWSER_VAR}
    Run Keyword If    '\${BROWSER_VAR}' == 'Chrome'    Log    Using Chrome browser
    Run Keyword If    '\${BROWSER_VAR}' == 'Firefox'   Log    Using Firefox browser
    Log    Browser configuration validated

Test Suite Documentation
    [Documentation]    Test para validar documentación y metadata
    [Tags]    documentation    metadata
    Log    Suite: \${SUITE NAME}
    Log    Test: \${TEST NAME}
    Should Not Be Empty    \${SUITE NAME}
    Should Not Be Empty    \${TEST NAME}
    Log    Documentation validated successfully

Test Output Directory
    [Tags]    setup    configuration
    Log    Output directory: \${OUTPUTDIR}
    Log    Current directory: \${CURDIR}
    Should Contain    \${OUTPUTDIR}    \${REPORT_DIR}
    Create File    \${OUTPUTDIR}/test_marker.txt    Execution marker
    File Should Exist    \${OUTPUTDIR}/test_marker.txt

Test Log Level Control
    [Tags]    logging    debug
    Log    Info level message    INFO
    Log    Debug level message    DEBUG
    Log    Warning level message    WARN
    Log    Error level message    ERROR
    Should Be Equal    \${LOG_LEVEL}    INFO
    Log    Log level validated: \${LOG_LEVEL}

Test Statistics Collection
    [Tags]    statistics    metrics
    Set Test Variable    \${PASS_COUNT}    0
    Set Test Variable    \${FAIL_COUNT}    0
    \${status}    Run Keyword And Return Status    Should Be True    True
    Run Keyword If    \${status}    Set Test Variable    \${PASS_COUNT}    \${PASS_COUNT + 1}
    Run Keyword Unless    \${status}    Set Test Variable    \${FAIL_COUNT}    \${FAIL_COUNT + 1}
    Log    Pass count: \${PASS_COUNT}, Fail count: \${FAIL_COUNT}

*** Keywords ***
Validate Test Results
    [Arguments]    \${expected_status}    \${actual_status}
    Should Be Equal    \${expected_status}    \${actual_status}
    Log    Test result validation: \${actual_status}
    Run Keyword If    '\${actual_status}' == 'PASS'    Log    Test passed successfully
    Run Keyword If    '\${actual_status}' == 'FAIL'    Log    Test failed - review required

Generate Execution Report
    [Arguments]    \${test_name}    \${execution_time}
    Log    === Execution Report ===
    Log    Test Name: \${test_name}
    Log    Execution Time: \${execution_time}
    Log    Output Dir: \${OUTPUTDIR}
    Log    === End Report ===
    
Analyze Test Performance
    \${start_time}    Get Current Date    result_format=epoch
    Sleep    1 second
    \${end_time}    Get Current Date    result_format=epoch
    \${duration}    Evaluate    \${end_time} - \${start_time}
    Log    Test duration: \${duration} seconds
    Should Be True    \${duration} >= 1
        </code></pre>
        
        <h3>📊 Comandos CLI Ejecución:</h3>
        <pre><code class="bash">
# Ejecución básica
robot tests/

# Con directorio de resultados personalizado
robot --outputdir results tests/

# Filtrado por tags
robot --include smoke tests/
robot --exclude slow tests/
robot --include critical --exclude broken tests/

# Variables desde línea de comandos
robot --variable BROWSER:Firefox tests/
robot --variable ENVIRONMENT:staging tests/

# Nivel de logging
robot --loglevel DEBUG tests/
robot --loglevel INFO tests/

# Reportes personalizados
robot --report custom_report.html tests/
robot --log custom_log.html tests/

# Ejecución con timeout
robot --timeout 30s tests/

# Múltiples opciones combinadas
robot --outputdir results --include smoke --variable BROWSER:Chrome --loglevel INFO tests/
        </code></pre>
        
        <h3>🎯 Práctica Ejecución Análisis (4 min):</h3>
        <ol>
            <li><strong>Tags en tests:</strong> Agregar [Tags] a tests para permitir filtrado por --include/--exclude</li>
            <li><strong>Variables CLI:</strong> Usar \${BROWSER_VAR} y validar que se recibe correctamente desde --variable</li>
            <li><strong>Log levels:</strong> Probar diferentes niveles de log (INFO, DEBUG, WARN, ERROR) en tests</li>
            <li><strong>Output directory:</strong> Usar \${OUTPUTDIR} para crear archivos en directorio de resultados</li>
            <li><strong>Documentation tags:</strong> Agregar [Documentation] a tests para reporte HTML mejorado</li>
            <li><strong>Built-in variables:</strong> Mostrar \${SUITE NAME}, \${TEST NAME}, \${CURDIR} en logs</li>
            <li><strong>Ejecutar con tags:</strong> robot --include smoke --outputdir results tests/</li>
            <li><strong>Variables desde CLI:</strong> robot --variable BROWSER:Firefox --variable LOG_LEVEL:DEBUG tests/</li>
            <li><strong>Análisis de report.html:</strong> Abrir report.html y revisar Test Statistics, Tag Statistics</li>
            <li><strong>Análisis de log.html:</strong> Revisar log.html para ver detalles de ejecución y variables</li>
            <li><strong>Filtrado combinado:</strong> robot --include critical --exclude broken --loglevel INFO tests/</li>
            <li><strong>Keywords de análisis:</strong> Crear keywords para validar resultados y generar reportes</li>
            <li><strong>Performance tracking:</strong> Medir tiempos de ejecución con Get Current Date</li>
            <li><strong>Statistics collection:</strong> Implementar conteo de pass/fail en variables</li>
            <li><strong>Ejecución completa:</strong> Ejecutar suite con múltiples parámetros y analizar resultados completos</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar comandos CLI para ejecución flexible con tags, variables y parámetros</li>
                <li>Interpretar reportes HTML y logs para análisis efectivo de resultados</li>
                <li>Implementar tags y documentación para organización y filtrado de tests</li>
                <li>Usar variables built-in y CLI para configuración dinámica de ejecución</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa tags descriptivos como "smoke", "regression", "critical" para filtrado eficiente. El report.html muestra estadísticas por tags automáticamente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 027 - Buenas prácticas en nomenclatura</h3>
        <p>Con la ejecución y análisis dominados, aprenderemos convenciones de nomenclatura y estructuración que harán nuestros tests más legibles, mantenibles y profesionales.</p>
    `,
    topics: ["execution", "results", "analysis"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-025"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_026 = LESSON_026;
}