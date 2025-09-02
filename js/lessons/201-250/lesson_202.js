/**
 * Robot Framework Academy - Lesson 202
 * Performance testing fundamentals
 */

const LESSON_202 = {
    id: 202,
    title: "Performance testing fundamentals",
    duration: "15 min",
    level: "advanced",
    section: "section-16",
    content: `
        <h2>⚡ Performance Testing</h2>
        <p>Mide tiempos de respuesta, throughput y detecta cuellos de botella en aplicaciones enterprise.</p>
        
        <h3>💻 Tests Performance:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    ⚡ PERFORMANCE TESTING ENTERPRISE SUITE
Library          SeleniumLibrary
Library          RequestsLibrary
Library          Collections
Library          DateTime
Library          OperatingSystem
Suite Setup      Initialize Performance Environment
Suite Teardown   Generate Performance Report

*** Variables ***
\${BASE_URL}           https://app.company.com
\${API_ENDPOINT}       \${BASE_URL}/api/v1
\${LOAD_USERS}         50
\${TEST_DURATION}      300
\${MAX_RESPONSE_TIME}  2000
\${MIN_THROUGHPUT}     100
\${PERFORMANCE_LOG}    performance_metrics.log
&{SLA_THRESHOLDS}      response_time=2000    throughput=100    error_rate=1.0    cpu_usage=80.0

*** Test Cases ***
Measure Page Load Times
    [Documentation]    Mide tiempos de carga de páginas críticas
    [Tags]             performance    load-time    web
    
    \${start_time}=        Get Current Date    result_format=epoch
    Open Browser           \${BASE_URL}    chrome    options=add_argument("--disable-cache")
    \${page_loaded}=       Get Current Date    result_format=epoch
    
    # Calcular tiempo de carga inicial
    \${load_time}=         Evaluate    (\${page_loaded} - \${start_time}) * 1000
    Should Be True         \${load_time} < \${MAX_RESPONSE_TIME}
    Log                    Page load time: \${load_time}ms
    
    # Medir navegación entre páginas
    \${nav_start}=         Get Current Date    result_format=epoch
    Click Link             Dashboard
    Wait Until Page Contains    Welcome    timeout=10s
    \${nav_end}=           Get Current Date    result_format=epoch
    \${nav_time}=          Evaluate    (\${nav_end} - \${nav_start}) * 1000
    
    Should Be True         \${nav_time} < \${MAX_RESPONSE_TIME}
    Log                    Navigation time: \${nav_time}ms
    Close Browser

API Response Time Testing
    [Documentation]    Valida tiempos de respuesta de APIs críticas
    [Tags]             performance    api    response-time
    
    Create Session         api    \${API_ENDPOINT}
    
    # Test endpoint crítico con múltiples requests
    FOR    \${request}    IN RANGE    10
        \${start}=         Get Current Date    result_format=epoch
        \${response}=      GET On Session    api    /users    timeout=5
        \${end}=           Get Current Date    result_format=epoch
        
        Should Be Equal    \${response.status_code}    200
        \${response_time}= Evaluate    (\${end} - \${start}) * 1000
        Should Be True     \${response_time} < \${SLA_THRESHOLDS.response_time}
        
        Log                Request \${request}: \${response_time}ms
        Append To File     \${PERFORMANCE_LOG}    API_RESPONSE,\${request},\${response_time}\\n
    END
    
    # Test endpoint con payload grande
    \${large_payload}=     Create Dictionary    data=\${LARGE_DATA}    size=10000
    \${start}=             Get Current Date    result_format=epoch
    \${post_response}=     POST On Session    api    /data    json=\${large_payload}
    \${end}=               Get Current Date    result_format=epoch
    
    Should Be Equal        \${post_response.status_code}    201
    \${post_time}=         Evaluate    (\${end} - \${start}) * 1000
    Should Be True         \${post_time} < 5000
    Log                    Large payload POST: \${post_time}ms

Load Testing Simulation
    [Documentation]    Simula carga concurrente de usuarios
    [Tags]             performance    load    concurrency
    
    # Inicializar contadores de performance
    \${successful_requests}=    Set Variable    0
    \${failed_requests}=        Set Variable    0
    \${total_response_time}=    Set Variable    0
    
    # Simular usuarios concurrentes
    FOR    \${user}    IN RANGE    \${LOAD_USERS}
        \${user_start}=        Get Current Date    result_format=epoch
        
        # Simular sesión de usuario típica
        Create Session         user_\${user}    \${BASE_URL}
        TRY
            \${login_response}=    GET On Session    user_\${user}    /login
            Should Be Equal        \${login_response.status_code}    200
            
            \${dashboard_response}=  GET On Session    user_\${user}    /dashboard  
            Should Be Equal          \${dashboard_response.status_code}    200
            
            \${data_response}=     GET On Session    user_\${user}    /api/data
            Should Be Equal        \${data_response.status_code}    200
            
            \${successful_requests}=  Evaluate    \${successful_requests} + 1
        EXCEPT
            \${failed_requests}=   Evaluate    \${failed_requests} + 1
            Log                    User \${user} failed
        END
        
        \${user_end}=          Get Current Date    result_format=epoch
        \${user_time}=         Evaluate    (\${user_end} - \${user_start}) * 1000
        \${total_response_time}=  Evaluate    \${total_response_time} + \${user_time}
        
        Append To File         \${PERFORMANCE_LOG}    LOAD_TEST,\${user},\${user_time}\\n
    END
    
    # Calcular métricas de rendimiento
    \${avg_response_time}=     Evaluate    \${total_response_time} / \${LOAD_USERS}
    \${throughput}=            Evaluate    \${successful_requests} / (\${TEST_DURATION} / 60)
    \${error_rate}=            Evaluate    (\${failed_requests} / \${LOAD_USERS}) * 100
    
    Should Be True             \${avg_response_time} < \${SLA_THRESHOLDS.response_time}
    Should Be True             \${throughput} > \${SLA_THRESHOLDS.throughput}
    Should Be True             \${error_rate} < \${SLA_THRESHOLDS.error_rate}
    
    Log                        Load Test Results:
    Log                        Average Response Time: \${avg_response_time}ms
    Log                        Throughput: \${throughput} req/min
    Log                        Error Rate: \${error_rate}%

Memory Usage Monitoring
    [Documentation]    Monitorea consumo de memoria durante tests
    [Tags]             performance    memory    monitoring
    
    # Medir uso de memoria baseline
    \${baseline_memory}=       Run Process    python    -c    import psutil; print(psutil.virtual_memory().percent)
    Log                        Baseline memory usage: \${baseline_memory.stdout}%
    
    # Ejecutar operación que consume memoria
    Open Browser               \${BASE_URL}    chrome
    
    FOR    \${page}    IN RANGE    20
        Go To                  \${BASE_URL}/page\${page}
        Wait Until Page Contains    Content    timeout=5s
        
        # Medir memoria cada 5 páginas
        Run Keyword If         \${page} % 5 == 0
        ...                    Check Memory Usage    \${page}
    END
    
    # Verificar que no hay memory leaks
    \${final_memory}=          Run Process    python    -c    import psutil; print(psutil.virtual_memory().percent)
    \${memory_increase}=       Evaluate    \${final_memory.stdout} - \${baseline_memory.stdout}
    Should Be True             \${memory_increase} < 10
    
    Log                        Memory increase: \${memory_increase}%
    Close Browser

Database Performance Testing
    [Documentation]    Mide performance de queries de base de datos
    [Tags]             performance    database    queries
    
    # Conectar a base de datos de testing
    Connect To Database        pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    
    # Test queries simples
    \${start_time}=            Get Current Date    result_format=epoch
    \${simple_result}=         Query    SELECT COUNT(*) FROM users WHERE active = 1
    \${end_time}=              Get Current Date    result_format=epoch
    \${simple_query_time}=     Evaluate    (\${end_time} - \${start_time}) * 1000
    
    Should Be True             \${simple_query_time} < 100
    Log                        Simple query time: \${simple_query_time}ms
    
    # Test queries complejas con JOINs
    \${complex_start}=         Get Current Date    result_format=epoch
    \${complex_result}=        Query    SELECT u.*, p.*, o.* FROM users u JOIN profiles p ON u.id = p.user_id JOIN orders o ON u.id = o.user_id WHERE u.created_date > '2024-01-01' LIMIT 1000
    \${complex_end}=           Get Current Date    result_format=epoch
    \${complex_query_time}=    Evaluate    (\${complex_end} - \${complex_start}) * 1000
    
    Should Be True             \${complex_query_time} < 1000
    Log                        Complex query time: \${complex_query_time}ms
    
    # Test operaciones de escritura
    FOR    \${insert}    IN RANGE    100
        \${insert_start}=      Get Current Date    result_format=epoch
        Execute Sql String     INSERT INTO test_performance (data, timestamp) VALUES ('test_\${insert}', NOW())
        \${insert_end}=        Get Current Date    result_format=epoch
        \${insert_time}=       Evaluate    (\${insert_end} - \${insert_start}) * 1000
        
        Should Be True         \${insert_time} < 50
        Append To File         \${PERFORMANCE_LOG}    DB_INSERT,\${insert},\${insert_time}\\n
    END
    
    Disconnect From Database

*** Keywords ***
Initialize Performance Environment
    Log                        🚀 Initializing performance testing environment
    Create File                \${PERFORMANCE_LOG}    TEST_TYPE,ITERATION,RESPONSE_TIME\\n
    Set Global Variable        \${LARGE_DATA}    \${'x' * 10000}

Check Memory Usage
    [Arguments]                \${iteration}
    \${current_memory}=        Run Process    python    -c    import psutil; print(psutil.virtual_memory().percent)
    Should Be True             \${current_memory.stdout} < \${SLA_THRESHOLDS.cpu_usage}
    Log                        Memory at iteration \${iteration}: \${current_memory.stdout}%
    Append To File             \${PERFORMANCE_LOG}    MEMORY_CHECK,\${iteration},\${current_memory.stdout}\\n

Generate Performance Report
    Log                        📊 Generating performance test report
    \${log_content}=           Get File    \${PERFORMANCE_LOG}
    Log                        Performance metrics logged to \${PERFORMANCE_LOG}
    Should Not Be Empty        \${log_content}</code></pre>
        
        <h3>🎯 Práctica Performance (12 min):</h3>
        <p>1. Instala herramientas: pip install psutil pymysql</p>
        <p>2. Configura variables de entorno para base de datos de testing</p>
        <p>3. Ejecuta test de carga básico con 10 usuarios concurrentes</p>
        <p>4. Mide tiempo de respuesta de API endpoint crítico</p>
        <p>5. Implementa monitoreo de memoria durante navegación web</p>
        <p>6. Crea test de stress aumentando usuarios hasta encontrar límite</p>
        <p>7. Configura alerts automáticos cuando SLA se excede</p>
        <p>8. Genera dashboard con métricas en tiempo real</p>
        <p>9. Implementa cleanup automático de datos de testing</p>
        <p>10. Documenta baseline performance para comparaciones futuras</p>
        <p>11. Crea test matrix con diferentes browsers y devices</p>
        <p>12. Integra performance testing con pipeline CI/CD</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Medir tiempos de respuesta y throughput enterprise</li>
                <li>Implementar load testing con usuarios concurrentes</li>
                <li>Monitorear memoria y recursos del sistema</li>
                <li>Establecer SLAs y thresholds de performance</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa epoch time para mediciones precisas: Get Current Date result_format=epoch da microsegundos exactos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 203 - Load testing con herramientas externas</h3>
        <p>Con fundamentos dominados, integrarás JMeter y Locust para testing de carga enterprise con miles de usuarios.</p>
    `,
    topics: ["performance", "load", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 15,
    difficulty: "advanced",
    prerequisites: ["lesson-201"],
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_202 = LESSON_202;
}