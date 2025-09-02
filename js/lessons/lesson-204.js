/**
 * Robot Framework Academy - Lesson 204
 * Performance 204
 */

const LESSON_204 = {
    id: 204,
    title: "Performance 204",
    duration: "10 min",
    level: "advanced",
    section: "section-16",
    content: `
        <h2>🔍 Bottlenecks Detection</h2>
        <p>Identifica cuellos de botella y optimiza performance usando métricas avanzadas y profiling.</p>
        
        <h3>💻 Analysis Performance:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    🔍 BOTTLENECK DETECTION & OPTIMIZATION SUITE
Library          SeleniumLibrary
Library          RequestsLibrary
Library          Process
Library          Collections
Library          DateTime
Library          OperatingSystem
Suite Setup      Initialize Performance Analysis
Suite Teardown   Generate Optimization Report

*** Variables ***
\${APP_URL}            https://app.company.com
\${API_BASE}           \${APP_URL}/api/v1
\${PROFILE_DURATION}   60
\${CPU_THRESHOLD}      80.0
\${MEMORY_THRESHOLD}   85.0
\${RESPONSE_SLA}       1500
\${DB_QUERY_LIMIT}     100
\${OPTIMIZATION_LOG}   bottleneck_analysis.log
&{PERFORMANCE_METRICS}    cpu=0    memory=0    disk_io=0    network=0

*** Test Cases ***
Profile Application Performance
    [Documentation]    Analiza performance de aplicación bajo carga normal
    [Tags]             profiling    analysis    baseline
    
    # Establecer baseline de performance
    \${baseline_start}=    Get Current Date    result_format=epoch
    Open Browser           \${APP_URL}    chrome    options=add_argument("--enable-precise-memory-info")
    
    # Medir carga inicial de página
    \${page_start}=        Get Current Date    result_format=epoch
    Wait Until Page Contains    Dashboard    timeout=10s
    \${page_end}=          Get Current Date    result_format=epoch
    \${page_load_time}=    Evaluate    (\${page_end} - \${page_start}) * 1000
    
    Should Be True         \${page_load_time} < \${RESPONSE_SLA}
    Log                    Initial page load: \${page_load_time}ms
    Append To File         \${OPTIMIZATION_LOG}    PAGE_LOAD,initial,\${page_load_time}\\n
    
    # Navegar por funcionalidades críticas
    FOR    \${feature}    IN    @{CRITICAL_FEATURES}
        \${nav_start}=     Get Current Date    result_format=epoch
        Click Link         \${feature}
        Wait Until Page Contains Element    id=content    timeout=10s
        \${nav_end}=       Get Current Date    result_format=epoch
        \${nav_time}=      Evaluate    (\${nav_end} - \${nav_start}) * 1000
        
        Should Be True     \${nav_time} < \${RESPONSE_SLA}
        Log                Navigation to \${feature}: \${nav_time}ms
        Append To File     \${OPTIMIZATION_LOG}    NAVIGATION,\${feature},\${nav_time}\\n
    END
    
    Close Browser

Monitor System Resources
    [Documentation]    Monitorea recursos del sistema durante tests
    [Tags]             monitoring    resources    system
    
    # Inicializar monitoreo de recursos
    \${monitor_start}=     Get Current Date    result_format=epoch
    
    FOR    \${iteration}    IN RANGE    \${PROFILE_DURATION}
        # Capturar métricas CPU
        \${cpu_result}=    Run Process    python    -c    
        ...                import psutil; print(f"{psutil.cpu_percent(interval=1)}")
        \${cpu_usage}=     Convert To Number    \${cpu_result.stdout}
        Should Be True     \${cpu_usage} < \${CPU_THRESHOLD}
        
        # Capturar métricas memoria
        \${mem_result}=    Run Process    python    -c    
        ...                import psutil; print(f"{psutil.virtual_memory().percent}")
        \${memory_usage}=  Convert To Number    \${mem_result.stdout}
        Should Be True     \${memory_usage} < \${MEMORY_THRESHOLD}
        
        # Capturar I/O disk
        \${io_result}=     Run Process    python    -c    
        ...                import psutil; print(f"{psutil.disk_io_counters().read_bytes}")
        \${disk_io}=       Convert To Number    \${io_result.stdout}
        
        # Registrar métricas
        Set To Dictionary  \${PERFORMANCE_METRICS}    cpu=\${cpu_usage}
        Set To Dictionary  \${PERFORMANCE_METRICS}    memory=\${memory_usage}
        Set To Dictionary  \${PERFORMANCE_METRICS}    disk_io=\${disk_io}
        
        Log                Iteration \${iteration}: CPU \${cpu_usage}%, Memory \${memory_usage}%
        Append To File     \${OPTIMIZATION_LOG}    RESOURCES,\${iteration},\${cpu_usage},\${memory_usage},\${disk_io}\\n
        
        Sleep              1s
    END

Identify Database Bottlenecks
    [Documentation]    Detecta queries lentas y optimizaciones DB
    [Tags]             database    bottlenecks    optimization
    
    # Conectar a base de datos para análisis
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}
    
    # Analizar queries más lentas
    \${slow_queries}=      Query    
    ...                    SELECT sql_text, avg_timer_wait/1000000000 as avg_time_seconds, count_star as executions 
    ...                    FROM performance_schema.events_statements_summary_by_digest 
    ...                    WHERE avg_timer_wait > 1000000000 
    ...                    ORDER BY avg_timer_wait DESC LIMIT \${DB_QUERY_LIMIT}
    
    Should Not Be Empty    \${slow_queries}
    
    FOR    \${query_row}    IN    @{slow_queries}
        \${sql_text}=      Set Variable    \${query_row[0]}
        \${avg_time}=      Set Variable    \${query_row[1]}
        \${executions}=    Set Variable    \${query_row[2]}
        
        # Validar que queries no excedan SLA
        Should Be True     \${avg_time} < 5.0
        
        # Analizar query específica para optimización
        Run Keyword If     \${avg_time} > 2.0
        ...                Analyze Query For Optimization    \${sql_text}    \${avg_time}
        
        Log                Slow query: \${avg_time}s avg (\${executions} executions)
        Append To File     \${OPTIMIZATION_LOG}    SLOW_QUERY,\${avg_time},\${executions}\\n
    END
    
    Disconnect From Database

API Performance Bottlenecks
    [Documentation]    Identifica endpoints lentos y patrones de uso
    [Tags]             api    bottlenecks    endpoints
    
    Create Session         api    \${API_BASE}
    
    # Lista de endpoints críticos para análisis
    @{critical_endpoints}=  Create List    /users    /orders    /products    /analytics    /reports
    
    FOR    \${endpoint}    IN    @{critical_endpoints}
        # Medir múltiples requests para promedio confiable
        @{response_times}=  Create List
        
        FOR    \${request}    IN RANGE    20
            \${start_time}=    Get Current Date    result_format=epoch
            \${response}=      GET On Session    api    \${endpoint}    timeout=10
            \${end_time}=      Get Current Date    result_format=epoch
            
            Should Be Equal    \${response.status_code}    200
            \${request_time}=  Evaluate    (\${end_time} - \${start_time}) * 1000
            Append To List     \${response_times}    \${request_time}
        END
        
        # Calcular estadísticas de performance
        \${avg_time}=        Evaluate    sum(\${response_times}) / len(\${response_times})
        \${max_time}=        Evaluate    max(\${response_times})
        \${min_time}=        Evaluate    min(\${response_times})
        
        Should Be True       \${avg_time} < \${RESPONSE_SLA}
        Should Be True       \${max_time} < (\${RESPONSE_SLA} * 2)
        
        # Detectar variabilidad alta (posible bottleneck)
        \${time_variance}=   Evaluate    \${max_time} - \${min_time}
        Run Keyword If       \${time_variance} > 1000
        ...                  Flag Endpoint For Investigation    \${endpoint}    \${time_variance}
        
        Log                  Endpoint \${endpoint}: \${avg_time}ms avg, \${max_time}ms max
        Append To File       \${OPTIMIZATION_LOG}    API_ENDPOINT,\${endpoint},\${avg_time},\${max_time}\\n
    END

Memory Leak Detection
    [Documentation]    Detecta memory leaks durante sesiones largas
    [Tags]             memory    leaks    monitoring
    
    # Establecer baseline de memoria
    \${initial_memory}=    Get Process Memory Usage
    Log                    Initial memory: \${initial_memory}MB
    
    Open Browser           \${APP_URL}    chrome
    
    # Simular sesión larga con múltiples operaciones
    FOR    \${cycle}    IN RANGE    50
        # Operaciones que potencialmente causan leaks
        Go To              \${APP_URL}/dashboard
        Wait Until Page Contains    Dashboard
        
        Go To              \${APP_URL}/reports?data=large
        Wait Until Page Contains    Report
        
        Execute JavaScript window.history.back()
        Wait Until Page Contains    Dashboard
        
        # Medir memoria cada 10 ciclos
        Run Keyword If     \${cycle} % 10 == 0
        ...                Check Memory Trend    \${cycle}    \${initial_memory}
        
        Sleep              0.5s
    END
    
    # Verificar memoria final vs inicial
    \${final_memory}=      Get Process Memory Usage
    \${memory_increase}=   Evaluate    \${final_memory} - \${initial_memory}
    Should Be True         \${memory_increase} < 100
    
    Log                    Memory increase: \${memory_increase}MB over session
    Close Browser

Network Latency Analysis
    [Documentation]    Analiza latencia de red y puntos de optimización
    [Tags]             network    latency    optimization
    
    # Analizar latencia a diferentes endpoints
    @{test_urls}=          Create List    \${APP_URL}    \${API_BASE}    https://cdn.company.com
    
    FOR    \${url}    IN    @{test_urls}
        # Múltiples mediciones para promedio confiable
        @{latencies}=      Create List
        
        FOR    \${ping}    IN RANGE    10
            \${ping_start}=    Get Current Date    result_format=epoch
            Create Session     ping_session    \${url}    timeout=5
            \${health_response}=  GET On Session    ping_session    /    expected_status=any
            \${ping_end}=      Get Current Date    result_format=epoch
            
            \${latency}=       Evaluate    (\${ping_end} - \${ping_start}) * 1000
            Append To List     \${latencies}    \${latency}
        END
        
        # Calcular métricas de latencia
        \${avg_latency}=     Evaluate    sum(\${latencies}) / len(\${latencies})
        \${max_latency}=     Evaluate    max(\${latencies})
        
        Should Be True       \${avg_latency} < 500
        Should Be True       \${max_latency} < 2000
        
        Log                  URL \${url}: \${avg_latency}ms avg latency
        Append To File       \${OPTIMIZATION_LOG}    NETWORK_LATENCY,\${url},\${avg_latency},\${max_latency}\\n
    END

Generate Optimization Recommendations
    [Documentation]    Genera recomendaciones basadas en análisis
    [Tags]             optimization    recommendations    reporting
    
    # Leer todos los datos de análisis
    \${analysis_data}=     Get File    \${OPTIMIZATION_LOG}
    @{analysis_lines}=     Split To Lines    \${analysis_data}
    
    # Clasificar problemas por severidad
    @{critical_issues}=    Create List
    @{warning_issues}=     Create List
    @{optimization_tips}=  Create List
    
    FOR    \${line}    IN    @{analysis_lines}
        Continue For Loop If    '\${line}' == ''
        @{fields}=         Split String    \${line}    ,
        
        \${test_type}=     Set Variable    \${fields[0]}
        Run Keyword        Classify Performance Issue    \${test_type}    \${fields}
    END
    
    # Generar reporte de optimización
    \${report_content}=    Set Variable    PERFORMANCE OPTIMIZATION REPORT\\n
    \${report_content}=    Catenate    \${report_content}    =====================================\\n\\n
    
    \${report_content}=    Catenate    \${report_content}    CRITICAL ISSUES (Immediate Action Required):\\n
    FOR    \${issue}    IN    @{critical_issues}
        \${report_content}=    Catenate    \${report_content}    - \${issue}\\n
    END
    
    \${report_content}=    Catenate    \${report_content}    \\nWARNING ISSUES (Monitor Closely):\\n
    FOR    \${warning}    IN    @{warning_issues}
        \${report_content}=    Catenate    \${report_content}    - \${warning}\\n
    END
    
    \${report_content}=    Catenate    \${report_content}    \\nOPTIMIZATION OPPORTUNITIES:\\n
    FOR    \${tip}    IN    @{optimization_tips}
        \${report_content}=    Catenate    \${report_content}    - \${tip}\\n
    END
    
    Create File            optimization_report.txt    \${report_content}
    File Should Exist      optimization_report.txt
    Log                    Optimization report generated successfully

*** Keywords ***
Initialize Performance Analysis
    Log                    🚀 Initializing performance analysis environment
    Create File            \${OPTIMIZATION_LOG}    TEST_TYPE,METRIC1,METRIC2,METRIC3\\n
    Set Global Variable    @{CRITICAL_FEATURES}    Dashboard    Reports    Analytics    Settings

Analyze Query For Optimization
    [Arguments]            \${sql_text}    \${avg_time}
    Log                    Analyzing slow query: \${avg_time}s
    # Placeholder para análisis específico de queries

Flag Endpoint For Investigation
    [Arguments]            \${endpoint}    \${variance}
    Log                    High variance endpoint \${endpoint}: \${variance}ms

Check Memory Trend
    [Arguments]            \${cycle}    \${baseline}
    \${current_memory}=    Get Process Memory Usage
    \${increase}=          Evaluate    \${current_memory} - \${baseline}
    Log                    Memory at cycle \${cycle}: +\${increase}MB

Get Process Memory Usage
    \${memory_result}=     Run Process    python    -c    import psutil; print(psutil.Process().memory_info().rss / 1024 / 1024)
    \${memory_mb}=         Convert To Number    \${memory_result.stdout}
    RETURN                 \${memory_mb}

Classify Performance Issue
    [Arguments]            \${test_type}    \${fields}
    Log                    Classifying issue type: \${test_type}

Generate Optimization Report
    Log                    📊 Generating comprehensive optimization report
    Log                    Analysis complete - check optimization_report.txt</code></pre>
        
        <h3>🎯 Práctica Optimización (7 min):</h3>
        <p>1. Instala herramientas: pip install psutil pymysql</p>
        <p>2. Configura monitoreo de recursos del sistema en tiempo real</p>
        <p>3. Ejecuta profiling completo de aplicación bajo carga</p>
        <p>4. Identifica queries de base de datos más lentas</p>
        <p>5. Analiza endpoints API con mayor latencia</p>
        <p>6. Detecta memory leaks en sesiones largas</p>
        <p>7. Mide latencia de red a diferentes servicios</p>
        <p>8. Genera reporte automático con recomendaciones</p>
        <p>9. Implementa alertas automáticas para thresholds críticos</p>
        <p>10. Documenta plan de optimización priorizado</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Identificar cuellos de botella en aplicaciones enterprise</li>
                <li>Monitorear recursos del sistema automáticamente</li>
                <li>Detectar memory leaks y problemas de latencia</li>
                <li>Generar recomendaciones de optimización priorizadas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa performance_schema en MySQL para análisis profundo: SELECT * FROM events_statements_summary_by_digest ORDER BY avg_timer_wait DESC.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 205 - Métricas enterprise y dashboards</h3>
        <p>Con bottlenecks identificados, crearás dashboards ejecutivos con métricas de performance en tiempo real para stakeholders.</p>
    `,
    topics: ["performance", "load", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-203"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_204 = LESSON_204;
}