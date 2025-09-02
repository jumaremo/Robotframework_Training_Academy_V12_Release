/**
 * Robot Framework Academy - Lesson 173
 * Python Libraries 173
 */

const LESSON_173 = {
    id: 173,
    title: "Python Libraries 173",
    duration: "7 min",
    level: "intermediate",
    section: "section-13",
    content: `
        <h2>⚙️ Decorators y Metaclasses</h2>
        <p>Crea decorators avanzados y metaclasses para funcionalidades automáticas en librerías Robot Framework.</p>
        
        <h3>💻 Decorators y metaclasses avanzados:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/AdvancedPythonLibrary.py

*** Variables ***
\${FUNCTION_NAME}   complex_calculation
\${TIMEOUT_SEC}     10
\${RETRY_COUNT}     3
\${CACHE_SIZE}      100
\${LOG_LEVEL}       DEBUG
\${API_ENDPOINT}    /api/v1/users
\${PERFORMANCE_LOG} performance.log

*** Test Cases ***
Test Timing Decorator
    \${result}=    Timed Function Execution    \${FUNCTION_NAME}    iterations=50
    Should Be True    \${result}[completed]
    Should Be True    \${result}[execution_time] > 0
    Should Be True    \${result}[average_time] > 0
    Should Contain    \${result}[function_name]    \${FUNCTION_NAME}
    Log    Timing decorator result: \${result}

Test Retry Decorator
    \${retry_result}=    Retry Decorated Function    flaky_operation    max_attempts=\${RETRY_COUNT}
    Should Be True    \${retry_result}[success]
    Should Be Equal As Numbers    \${retry_result}[attempts]    1
    \${fail_result}=   Retry Decorated Function    always_fail_operation    max_attempts=2
    Should Be False    \${fail_result}[success]
    Should Be Equal As Numbers    \${fail_result}[attempts]    2
    Log    Retry decorator working: \${retry_result}

Test Cache Decorator
    \${cache_result1}=    Cached Function Call    expensive_computation    param1=100    param2=200
    Should Be True    \${cache_result1}[computed]
    Should Be Equal As Numbers    \${cache_result1}[result]    300
    \${cache_result2}=    Cached Function Call    expensive_computation    param1=100    param2=200
    Should Be False    \${cache_result2}[computed]
    Should Be Equal As Numbers    \${cache_result2}[result]    300
    Clear Function Cache    expensive_computation
    Log    Cache decorator working: \${cache_result1}

Test Validation Decorator
    \${valid_result}=    Validated Function Call    user_registration    email=test@example.com    age=25
    Should Be True    \${valid_result}[valid]
    Should Be Equal    \${valid_result}[email]    test@example.com
    \${invalid_result}=   Validated Function Call    user_registration    email=invalid-email    age=-5
    Should Be False    \${invalid_result}[valid]
    Should Contain     \${invalid_result}[errors]    Invalid email format
    Log    Validation decorator working: \${valid_result}

Test Metaclass Registry
    \${registry}=    Get Class Registry
    Should Contain    \${registry}    DatabaseConnection
    Should Contain    \${registry}    APIClient
    Should Contain    \${registry}    FileProcessor
    \${instance}=    Create Instance From Registry    DatabaseConnection    host=localhost
    Should Be Equal    \${instance}[type]    DatabaseConnection
    Should Be Equal    \${instance}[host]    localhost
    Log    Metaclass registry working: \${registry}</code></pre>
        
        <h3>🎯 Práctica decorators avanzados (5 min):</h3>
        <p>1. Crea AdvancedPythonLibrary.py con decorator @timing para medir tiempos</p>
        <p>2. Implementa @retry decorator con intentos configurables y backoff</p>
        <p>3. Agrega @cache decorator para almacenar resultados de funciones</p>
        <p>4. Crea @validate decorator que valide parámetros antes de ejecución</p>
        <p>5. Implementa @log_calls decorator para logging automático</p>
        <p>6. Agrega metaclass RegistryMeta que registre clases automáticamente</p>
        <p>7. Crea timed_function_execution() usando functools.wraps</p>
        <p>8. Implementa retry_decorated_function() con exponential backoff</p>
        <p>9. Agrega cached_function_call() usando dict como cache</p>
        <p>10. Crea validated_function_call() con regex validation</p>
        <p>11. Implementa get_class_registry() para acceder a clases registradas</p>
        <p>12. Agrega create_instance_from_registry() para factory dinámico</p>
        <p>13. Usa @keyword decorator en todos los métodos expuestos</p>
        <p>14. Combina múltiples decorators en una función</p>
        <p>15. Prueba metaclasses creando clases que se registren automáticamente</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear decorators para timing, retry, cache y validation</li>
                <li>Implementar metaclasses para registro automático de clases</li>
                <li>Usar functools.wraps para preservar metadata de funciones</li>
                <li>Combinar decorators para funcionalidades complejas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los decorators ejecutan antes de la función original. Usa functools.wraps(@wraps(func)) para preservar el nombre y docstring de la función decorada.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 174 - Python Libraries 174</h3>
        <p>Aprenderás a crear librerías Python con threading, multiprocessing y async/await para operaciones concurrentes en Robot Framework.</p>
    `,
    topics: ["python", "libraries", "custom"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-172"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_173 = LESSON_173;
}