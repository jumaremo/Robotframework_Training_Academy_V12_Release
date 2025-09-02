/**
 * Robot Framework Academy - Lesson 170
 * Python Libraries 170
 */

const LESSON_170 = {
    id: 170,
    title: "Python Libraries 170",
    duration: "7 min",
    level: "intermediate",
    section: "section-13",
    content: `
        <h2>🔧 Parámetros Avanzados Python</h2>
        <p>Domina argumentos opcionales, *args, **kwargs para librerías Python flexibles y reutilizables.</p>
        
        <h3>💻 Keywords parámetros avanzados:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/AdvancedLibrary.py

*** Variables ***
\${BASE_URL}        https://api.example.com
\${DEFAULT_TIMEOUT} 30
\${API_KEY}         abc123def456
\${USER_AGENT}      Robot Framework Bot
\${RETRY_COUNT}     3
\${LOG_LEVEL}       INFO
\${CONFIG_DATA}     {"env": "test", "debug": true}

*** Test Cases ***
Test Optional Parameters
    \${result}=    Process Data    required_param
    Should Contain    \${result}    required_param
    \${result2}=   Process Data    required_param    optional_value
    Should Contain    \${result2}    optional_value
    \${result3}=   Process Data    required_param    timeout=\${DEFAULT_TIMEOUT}
    Should Contain    \${result3}    30
    Log    Optional parameters working: \${result}

Test Variable Arguments
    \${list}=      Create List From Args    item1    item2    item3
    Should Contain    \${list}    item1
    Should Contain    \${list}    item2
    Should Contain    \${list}    item3
    \${sum}=       Sum Multiple Numbers    10    20    30    40
    Should Be Equal As Numbers    \${sum}    100
    Log    Variable arguments result: \${sum}

Test Keyword Arguments
    \${config}=    Setup API Client    url=\${BASE_URL}    api_key=\${API_KEY}    timeout=\${DEFAULT_TIMEOUT}
    Should Be Equal    \${config}[url]    \${BASE_URL}
    Should Be Equal    \${config}[api_key]    \${API_KEY}
    Should Be Equal As Numbers    \${config}[timeout]    \${DEFAULT_TIMEOUT}
    \${response}=  Make API Request    endpoint=/users    method=GET    headers={"User-Agent": "\${USER_AGENT}"}
    Should Be Equal    \${response}[method]    GET
    Log    Keyword arguments working: \${config}

Test Mixed Parameters
    \${result}=    Complex Function    required    optional1    optional2    key1=value1    key2=value2
    Should Contain    \${result}    required
    Should Contain    \${result}    optional1
    Should Contain    \${result}    key1:value1
    \${retry_result}=    Retry Operation    operation_name    max_retries=\${RETRY_COUNT}    delay=2
    Should Be True    \${retry_result}
    Log    Mixed parameters successful: \${result}

Test Advanced Configurations
    \${logger}=    Setup Logger    level=\${LOG_LEVEL}    format=json    output_file=test.log
    Should Be Equal    \${logger}[level]    \${LOG_LEVEL}
    Should Be True     \${logger}[configured]
    \${parsed}=    Parse Configuration    \${CONFIG_DATA}    validate=true    strict_mode=false
    Should Be Equal    \${parsed}[env]    test
    Should Be True     \${parsed}[debug]
    Log    Advanced configurations working: \${logger}</code></pre>
        
        <h3>🎯 Práctica parámetros avanzados (5 min):</h3>
        <p>1. Crea AdvancedLibrary.py con método process_data(required, optional=None)</p>
        <p>2. Implementa create_list_from_args(*args) que acepte múltiples argumentos</p>
        <p>3. Agrega sum_multiple_numbers(*numbers) para sumar N números</p>
        <p>4. Crea setup_api_client(**kwargs) con url, api_key, timeout opcionales</p>
        <p>5. Implementa make_api_request(endpoint, **options) con método y headers</p>
        <p>6. Agrega complex_function(required, *args, **kwargs) combinado</p>
        <p>7. Crea retry_operation(name, max_retries=3, delay=1) con defaults</p>
        <p>8. Implementa setup_logger(level='INFO', **config) configurable</p>
        <p>9. Agrega parse_configuration(data, validate=False, **options)</p>
        <p>10. Usa @keyword decorator en todos los métodos Python</p>
        <p>11. Ejecuta tests y verifica manejo correcto de parámetros</p>
        <p>12. Prueba combinaciones diferentes de argumentos opcionales</p>
        <p>13. Valida que defaults funcionen cuando no se proveen valores</p>
        <p>14. Verifica que **kwargs capture argumentos extra correctamente</p>
        <p>15. Documenta cada parámetro en docstrings de métodos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar argumentos opcionales con valores por defecto</li>
                <li>Usar *args para aceptar múltiples argumentos posicionales</li>
                <li>Implementar **kwargs para argumentos de palabra clave flexibles</li>
                <li>Combinar tipos de parámetros en keywords complejos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>*args captura argumentos extra como tupla, **kwargs como diccionario. Úsalos para crear keywords flexibles que acepten configuraciones variables.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 171 - Python Libraries 171</h3>
        <p>Continuarás expandiendo tus librerías Python con manejo de excepciones, logging avanzado y patrones de diseño para código más robusto.</p>
    `,
    topics: ["python", "libraries", "custom"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-169"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_170 = LESSON_170;
}