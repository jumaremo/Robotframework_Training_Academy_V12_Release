/**
 * Robot Framework Academy - Lesson 171
 * Python Libraries 171
 */

const LESSON_171 = {
    id: 171,
    title: "Python Libraries 171",
    duration: "7 min",
    level: "intermediate",
    section: "section-13",
    content: `
        <h2>⚡ Excepciones y Logging</h2>
        <p>Implementa manejo robusto de errores y logging avanzado en tus librerías Python para debugging eficiente.</p>
        
        <h3>💻 Manejo excepciones avanzado:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/RobustLibrary.py

*** Variables ***
\${INVALID_URL}     not-a-valid-url
\${VALID_URL}       https://httpbin.org/get
\${TIMEOUT_SEC}     5
\${MAX_RETRIES}     3
\${LOG_LEVEL}       DEBUG
\${ERROR_MESSAGE}   Connection failed
\${SUCCESS_DATA}    {"status": "ok", "code": 200}

*** Test Cases ***
Test Exception Handling
    \${result}=    Safe HTTP Request    \${VALID_URL}
    Should Be Equal    \${result}[status]    success
    Should Contain     \${result}[data]    httpbin
    \${error_result}=  Safe HTTP Request    \${INVALID_URL}
    Should Be Equal    \${error_result}[status]    error
    Should Contain     \${error_result}[message]    Invalid URL
    Log    Exception handling working: \${result}

Test Retry Mechanism
    \${retry_result}=  Retry With Backoff    Flaky Operation    max_attempts=\${MAX_RETRIES}
    Should Be True     \${retry_result}[success]
    Should Be Equal As Numbers    \${retry_result}[attempts]    1
    \${fail_result}=   Retry With Backoff    Always Fail Operation    max_attempts=2
    Should Be False    \${fail_result}[success]
    Should Be Equal As Numbers    \${fail_result}[attempts]    2
    Log    Retry mechanism result: \${retry_result}

Test Custom Logging
    Setup Custom Logger    level=\${LOG_LEVEL}    output_file=test.log
    Log With Level    INFO    Starting test execution
    Log With Level    DEBUG   Debug information for troubleshooting
    Log With Level    WARNING Warning message for attention
    Log With Level    ERROR   Error occurred during processing
    \${logs}=    Get Log Contents
    Should Contain    \${logs}    Starting test execution
    Should Contain    \${logs}    Debug information
    Log    Custom logging working: \${logs}

Test Validation Framework
    Validate Required Fields    {"name": "test", "email": "test@example.com"}    name    email
    \${validation}=    Validate Data Format    test@example.com    email
    Should Be True     \${validation}[valid]
    Should Be Equal    \${validation}[format]    email
    \${phone_check}=   Validate Data Format    +1-555-123-4567    phone
    Should Be True     \${phone_check}[valid]
    Should Be Equal    \${phone_check}[format]    phone
    Log    Validation framework working: \${validation}

Test Performance Monitor
    Start Performance Monitor
    \${perf_result}=   Monitor Function Performance    Complex Calculation    iterations=100
    Should Be True     \${perf_result}[completed]
    Should Be True     \${perf_result}[avg_time] > 0
    Should Be True     \${perf_result}[total_time] > 0
    Stop Performance Monitor
    \${report}=        Get Performance Report
    Should Contain     \${report}    Complex Calculation
    Log    Performance monitoring: \${perf_result}</code></pre>
        
        <h3>🎯 Práctica excepciones y logging (5 min):</h3>
        <p>1. Crea RobustLibrary.py con safe_http_request() usando try/except</p>
        <p>2. Implementa retry_with_backoff() con intentos múltiples y delays</p>
        <p>3. Agrega setup_custom_logger() con diferentes niveles (DEBUG, INFO, WARNING, ERROR)</p>
        <p>4. Crea log_with_level() que escriba a archivo y consola</p>
        <p>5. Implementa get_log_contents() para leer logs generados</p>
        <p>6. Agrega validate_required_fields() que lance excepciones descriptivas</p>
        <p>7. Crea validate_data_format() para email, phone, URL con regex</p>
        <p>8. Implementa start_performance_monitor() para medir tiempos</p>
        <p>9. Agrega monitor_function_performance() con estadísticas detalladas</p>
        <p>10. Crea get_performance_report() que genere resumen ejecutivo</p>
        <p>11. Usa logging.getLogger() en lugar de prints directos</p>
        <p>12. Implementa custom exceptions con mensajes informativos</p>
        <p>13. Agrega decorators @timing para medir performance automáticamente</p>
        <p>14. Prueba fallos simulados y verifica manejo correcto</p>
        <p>15. Valida que logs contengan información suficiente para debugging</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar try/except robusto para manejo de errores</li>
                <li>Configurar logging avanzado con niveles y archivos</li>
                <li>Crear mecanismos de retry con backoff exponencial</li>
                <li>Desarrollar frameworks de validación y performance monitoring</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Siempre captura excepciones específicas (ValueError, ConnectionError) en lugar de Exception genérica. Esto facilita debugging y manejo granular de errores.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 172 - Python Libraries 172</h3>
        <p>Aprenderás patrones de diseño avanzados como Singleton, Factory y Observer para crear librerías Python más escalables y mantenibles.</p>
    `,
    topics: ["python", "libraries", "custom"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-170"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_171 = LESSON_171;
}