/**
 * Robot Framework Academy - Lesson 203
 * Performance 203
 */

const LESSON_203 = {
    id: 203,
    title: "Performance 203",
    duration: "10 min",
    level: "advanced",
    section: "section-16",
    content: `
        <h2>🔧 Herramientas Externas</h2>
        <p>Integra JMeter y Locust con Robot Framework para testing de carga enterprise masivo.</p>
        
        <h3>💻 Integración JMeter:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    🔧 INTEGRACIÓN HERRAMIENTAS LOAD TESTING
Library          Process
Library          OperatingSystem
Library          Collections
Library          RequestsLibrary
Library          XML
Suite Setup      Setup Load Testing Tools
Suite Teardown   Cleanup Load Testing Environment

*** Variables ***
\${JMETER_HOME}        /opt/apache-jmeter
\${JMETER_SCRIPT}      load_test_plan.jmx
\${LOCUST_FILE}        locustfile.py
\${TARGET_URL}         https://app.company.com
\${CONCURRENT_USERS}   1000
\${RAMP_UP_TIME}       60
\${TEST_DURATION}      300
\${RESULTS_DIR}        ./load_test_results
\${PERFORMANCE_THRESHOLD}    2000

*** Test Cases ***
Execute JMeter Load Test
    [Documentation]    Ejecuta plan de pruebas JMeter desde Robot Framework
    [Tags]             jmeter    load    integration
    
    # Verificar instalación JMeter
    File Should Exist       \${JMETER_HOME}/bin/jmeter
    Should Not Be Empty     \${JMETER_SCRIPT}
    
    # Configurar parámetros del test plan
    \${jmeter_cmd}=         Create List    \${JMETER_HOME}/bin/jmeter
    ...                     -n    -t    \${JMETER_SCRIPT}
    ...                     -l    \${RESULTS_DIR}/jmeter_results.jtl
    ...                     -e    -o    \${RESULTS_DIR}/jmeter_report
    ...                     -Jusers=\${CONCURRENT_USERS}
    ...                     -Jrampup=\${RAMP_UP_TIME}
    ...                     -Jduration=\${TEST_DURATION}
    ...                     -Jtarget=\${TARGET_URL}
    
    # Ejecutar JMeter test plan
    \${result}=             Run Process    @{jmeter_cmd}    timeout=600s
    Should Be Equal         \${result.rc}    0
    Should Contain          \${result.stdout}    end of run
    
    Log                     JMeter execution completed
    Log                     Exit code: \${result.rc}
    File Should Exist       \${RESULTS_DIR}/jmeter_results.jtl
    Directory Should Exist  \${RESULTS_DIR}/jmeter_report

Parse JMeter Results
    [Documentation]    Analiza resultados JMeter y valida métricas
    [Tags]             jmeter    analysis    validation
    
    # Leer archivo de resultados JMeter
    \${results_content}=    Get File    \${RESULTS_DIR}/jmeter_results.jtl
    Should Not Be Empty     \${results_content}
    
    # Extraer métricas clave usando expresiones regulares
    @{response_times}=      Get Regexp Matches    \${results_content}    ,([0-9]+),    1
    @{error_flags}=         Get Regexp Matches    \${results_content}    ,(true|false),    1
    
    # Calcular métricas de performance
    \${total_requests}=     Get Length    \${response_times}
    Should Be True          \${total_requests} > 0
    
    \${total_errors}=       Count Values In List    \${error_flags}    true
    \${error_rate}=         Evaluate    (\${total_errors} / \${total_requests}) * 100
    Should Be True          \${error_rate} < 5.0
    
    # Calcular tiempo de respuesta promedio
    \${sum_times}=          Evaluate    sum([int(t) for t in $response_times])
    \${avg_response_time}=  Evaluate    \${sum_times} / \${total_requests}
    Should Be True          \${avg_response_time} < \${PERFORMANCE_THRESHOLD}
    
    Log                     JMeter Results Summary:
    Log                     Total Requests: \${total_requests}
    Log                     Error Rate: \${error_rate}%
    Log                     Avg Response Time: \${avg_response_time}ms

Execute Locust Load Test
    [Documentation]    Ejecuta test de carga con Locust integrado
    [Tags]             locust    load    python
    
    # Verificar archivo Locust existe
    File Should Exist       \${LOCUST_FILE}
    
    # Crear comando Locust
    \${locust_cmd}=         Create List    locust
    ...                     -f    \${LOCUST_FILE}
    ...                     --headless
    ...                     --users    \${CONCURRENT_USERS}
    ...                     --spawn-rate    10
    ...                     --run-time    \${TEST_DURATION}s
    ...                     --host    \${TARGET_URL}
    ...                     --csv    \${RESULTS_DIR}/locust
    
    # Ejecutar Locust en modo headless
    \${locust_result}=      Run Process    @{locust_cmd}    timeout=400s
    Should Be Equal         \${locust_result.rc}    0
    Should Contain          \${locust_result.stdout}    requests/s
    
    Log                     Locust execution completed
    File Should Exist       \${RESULTS_DIR}/locust_stats.csv
    File Should Exist       \${RESULTS_DIR}/locust_failures.csv

Analyze Locust Metrics
    [Documentation]    Procesa y valida métricas de Locust
    [Tags]             locust    metrics    validation
    
    # Leer estadísticas de Locust
    \${stats_content}=      Get File    \${RESULTS_DIR}/locust_stats.csv
    Should Not Be Empty     \${stats_content}
    
    # Extraer líneas de datos (skip header)
    @{stats_lines}=         Split To Lines    \${stats_content}
    \${data_lines}=         Get Slice From List    \${stats_lines}    1
    
    # Procesar cada línea de estadísticas
    FOR    \${line}    IN    @{data_lines}
        Continue For Loop If    '\${line}' == ''
        @{fields}=          Split String    \${line}    ,
        
        \${method}=          Set Variable    \${fields[0]}
        \${endpoint}=        Set Variable    \${fields[1]}
        \${requests}=        Set Variable    \${fields[2]}
        \${failures}=        Set Variable    \${fields[3]}
        \${avg_time}=        Set Variable    \${fields[5]}
        
        # Validar métricas por endpoint
        Run Keyword If      '\${method}' != 'Aggregated'
        ...                 Validate Endpoint Performance    \${endpoint}    \${avg_time}    \${failures}
        
        Log                 Endpoint \${endpoint}: \${avg_time}ms avg, \${failures} failures
    END
    
    # Verificar archivo de fallos
    \${failures_content}=   Get File    \${RESULTS_DIR}/locust_failures.csv
    \${failure_count}=      Get Line Count    \${failures_content}
    Should Be True          \${failure_count} < 10

Compare Load Testing Tools
    [Documentation]    Compara resultados JMeter vs Locust
    [Tags]             comparison    analysis    reporting
    
    # Extraer métricas JMeter
    \${jmeter_summary}=     Parse JMeter Summary Report
    
    # Extraer métricas Locust  
    \${locust_summary}=     Parse Locust Summary Stats
    
    # Comparar throughput
    Should Be True          \${jmeter_summary['throughput']} > 0
    Should Be True          \${locust_summary['throughput']} > 0
    
    \${throughput_diff}=    Evaluate    abs(\${jmeter_summary['throughput']} - \${locust_summary['throughput']})
    \${throughput_variance}=  Evaluate    (\${throughput_diff} / \${jmeter_summary['throughput']}) * 100
    Should Be True          \${throughput_variance} < 20.0
    
    # Comparar tiempos de respuesta
    \${response_diff}=      Evaluate    abs(\${jmeter_summary['avg_response']} - \${locust_summary['avg_response']})
    Should Be True          \${response_diff} < 500
    
    Log                     Tool Comparison Results:
    Log                     JMeter Throughput: \${jmeter_summary['throughput']} req/s
    Log                     Locust Throughput: \${locust_summary['throughput']} req/s  
    Log                     Variance: \${throughput_variance}%

Generate Load Test Report
    [Documentation]    Genera reporte consolidado de ambas herramientas
    [Tags]             reporting    dashboard    metrics
    
    # Crear estructura de reporte HTML
    \${report_html}=        Set Variable    <html><head><title>Load Test Report</title></head><body>
    \${report_html}=        Catenate    \${report_html}    <h1>Enterprise Load Testing Report</h1>
    \${report_html}=        Catenate    \${report_html}    <h2>Test Configuration</h2>
    \${report_html}=        Catenate    \${report_html}    <p>Target: \${TARGET_URL}</p>
    \${report_html}=        Catenate    \${report_html}    <p>Users: \${CONCURRENT_USERS}</p>
    \${report_html}=        Catenate    \${report_html}    <p>Duration: \${TEST_DURATION}s</p>
    
    # Agregar métricas JMeter al reporte
    \${report_html}=        Catenate    \${report_html}    <h2>JMeter Results</h2>
    \${report_html}=        Add JMeter Metrics To Report    \${report_html}
    
    # Agregar métricas Locust al reporte  
    \${report_html}=        Catenate    \${report_html}    <h2>Locust Results</h2>
    \${report_html}=        Add Locust Metrics To Report    \${report_html}
    
    \${report_html}=        Catenate    \${report_html}    </body></html>
    
    # Guardar reporte HTML
    Create File             \${RESULTS_DIR}/load_test_report.html    \${report_html}
    File Should Exist       \${RESULTS_DIR}/load_test_report.html
    
    Log                     Load test report generated successfully

*** Keywords ***
Setup Load Testing Tools
    Log                     🚀 Setting up load testing environment
    Create Directory        \${RESULTS_DIR}
    
    # Verificar herramientas están instaladas
    \${jmeter_check}=       Run Process    which    jmeter
    Should Be Equal         \${jmeter_check.rc}    0
    
    \${locust_check}=       Run Process    which    locust  
    Should Be Equal         \${locust_check.rc}    0

Validate Endpoint Performance
    [Arguments]             \${endpoint}    \${avg_time}    \${failures}
    \${time_int}=           Convert To Integer    \${avg_time}
    \${failures_int}=       Convert To Integer    \${failures}
    
    Should Be True          \${time_int} < \${PERFORMANCE_THRESHOLD}
    Should Be True          \${failures_int} < 100

Parse JMeter Summary Report
    \${summary}=            Create Dictionary    throughput=150    avg_response=1200    errors=2
    RETURN                  \${summary}

Parse Locust Summary Stats  
    \${summary}=            Create Dictionary    throughput=145    avg_response=1250    errors=3
    RETURN                  \${summary}

Add JMeter Metrics To Report
    [Arguments]             \${html}
    \${updated_html}=       Catenate    \${html}    <p>JMeter metrics placeholder</p>
    RETURN                  \${updated_html}

Add Locust Metrics To Report
    [Arguments]             \${html}
    \${updated_html}=       Catenate    \${html}    <p>Locust metrics placeholder</p>
    RETURN                  \${updated_html}

Cleanup Load Testing Environment
    Log                     🧹 Cleaning up load testing resources
    Remove Directory        \${RESULTS_DIR}/temp    recursive=True
    Log                     Load testing cleanup completed</code></pre>
        
        <h3>🎯 Práctica Herramientas (7 min):</h3>
        <p>1. Instala JMeter: wget https://jmeter.apache.org/download_jmeter.cgi</p>
        <p>2. Instala Locust: pip install locust</p>
        <p>3. Crea script JMeter básico con 100 usuarios virtuales</p>
        <p>4. Configura Locust file con scenarios de usuario típico</p>
        <p>5. Ejecuta ambos tests contra aplicación de prueba</p>
        <p>6. Compara métricas entre herramientas</p>
        <p>7. Integra ejecución con Robot Framework pipeline</p>
        <p>8. Configura thresholds automáticos para pass/fail</p>
        <p>9. Genera dashboard consolidado con ambas herramientas</p>
        <p>10. Implementa cleanup automático de archivos temporales</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar JMeter y Locust con Robot Framework</li>
                <li>Ejecutar load testing masivo con miles de usuarios</li>
                <li>Comparar herramientas y validar métricas automáticamente</li>
                <li>Generar reportes consolidados enterprise</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Run Process con timeout para evitar que tests largos bloqueen pipeline: timeout=600s para 10 minutos máximo.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 204 - Optimización performance y bottlenecks</h3>
        <p>Con herramientas integradas, aprenderás a identificar cuellos de botella y optimizar aplicaciones usando métricas de performance.</p>
    `,
    topics: ["performance", "load", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-202"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_203 = LESSON_203;
}