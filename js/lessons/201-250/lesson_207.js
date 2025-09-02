/**
 * Robot Framework Academy - Lesson 207
 * Performance 207
 */

const LESSON_207 = {
    id: 207,
    title: "Performance 207",
    duration: "10 min",
    level: "advanced",
    section: "section-16",
    content: `
        <h2>📈 Regression Testing</h2>
        <p>Detecta degradaciones de performance entre releases usando baselines históricos y trending análisis.</p>
        
        <h3>💻 Tests Regression:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    📈 PERFORMANCE REGRESSION TESTING SUITE
Library          RequestsLibrary
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          Process
Library          JSON
Suite Setup      Initialize Regression Testing
Suite Teardown   Archive Regression Results

*** Variables ***
\${BASELINE_DB}        performance_baselines.db
\${CURRENT_VERSION}    v2.1.0
\${PREVIOUS_VERSION}   v2.0.8
\${REGRESSION_THRESHOLD} 15.0
\${TRENDING_WINDOW}    30
\${RESULTS_DIR}        ./regression_results
\${BENCHMARK_SUITE}    benchmark_tests.robot
\${HISTORICAL_DATA}    historical_performance.json
&{REGRESSION_METRICS}  response_time=0  throughput=0  memory_usage=0  cpu_usage=0

*** Test Cases ***
Execute Performance Baseline Capture
    [Documentation]    Captura baseline de performance para versión actual
    [Tags]             baseline    capture    versioning
    
    # Verificar aplicación está ejecutándose
    Create Session        app    http://localhost:8080
    \${health_response}=  GET On Session    app    /health    timeout=30
    Should Be Equal       \${health_response.status_code}    200
    
    # Ejecutar suite completa de benchmarks
    \${benchmark_start}=  Get Current Date    result_format=epoch
    \${benchmark_result}= Run Process    robot    
    ...                   --outputdir    \${RESULTS_DIR}/baseline_\${CURRENT_VERSION}    
    ...                   --variable    VERSION:\${CURRENT_VERSION}    
    ...                   \${BENCHMARK_SUITE}
    \${benchmark_end}=    Get Current Date    result_format=epoch
    
    Should Be Equal       \${benchmark_result.rc}    0
    \${execution_time}=   Evaluate    \${benchmark_end} - \${benchmark_start}
    Log                   Benchmark suite executed in \${execution_time} seconds
    
    # Extraer métricas de resultados
    \${output_file}=      Set Variable    \${RESULTS_DIR}/baseline_\${CURRENT_VERSION}/output.xml
    File Should Exist     \${output_file}
    \${metrics}=          Extract Performance Metrics From Output    \${output_file}
    
    # Almacenar baseline en base de datos
    Store Baseline        \${CURRENT_VERSION}    \${metrics}
    
    Log                   Baseline captured for version \${CURRENT_VERSION}
    Log                   Response Time: \${metrics.avg_response_time}ms
    Log                   Throughput: \${metrics.requests_per_second}
    Log                   Memory Peak: \${metrics.peak_memory_mb}MB

Compare Against Previous Version
    [Documentation]    Compara performance actual vs versión anterior
    [Tags]             comparison    regression    analysis
    
    # Cargar baseline de versión anterior
    \${previous_baseline}= Load Baseline    \${PREVIOUS_VERSION}
    Should Not Be Empty   \${previous_baseline}
    
    # Ejecutar tests en versión actual
    \${current_start}=    Get Current Date    result_format=epoch
    \${current_result}=   Run Process    robot    
    ...                   --outputdir    \${RESULTS_DIR}/current_\${CURRENT_VERSION}    
    ...                   --variable    VERSION:\${CURRENT_VERSION}    
    ...                   --variable    COMPARISON_MODE:true    
    ...                   \${BENCHMARK_SUITE}
    \${current_end}=      Get Current Date    result_format=epoch
    
    Should Be Equal       \${current_result.rc}    0
    
    # Extraer métricas actuales
    \${current_output}=   Set Variable    \${RESULTS_DIR}/current_\${CURRENT_VERSION}/output.xml
    \${current_metrics}=  Extract Performance Metrics From Output    \${current_output}
    
    # Calcular diferencias porcentuales
    \${response_time_change}= Evaluate    
    ...    ((\${current_metrics.avg_response_time} - \${previous_baseline.avg_response_time}) / \${previous_baseline.avg_response_time}) * 100
    
    \${throughput_change}= Evaluate    
    ...    ((\${current_metrics.requests_per_second} - \${previous_baseline.requests_per_second}) / \${previous_baseline.requests_per_second}) * 100
    
    \${memory_change}=    Evaluate    
    ...    ((\${current_metrics.peak_memory_mb} - \${previous_baseline.peak_memory_mb}) / \${previous_baseline.peak_memory_mb}) * 100
    
    # Validar contra thresholds de regresión
    Should Be True        \${response_time_change} < \${REGRESSION_THRESHOLD}
    Should Be True        \${memory_change} < \${REGRESSION_THRESHOLD}
    Should Be True        \${throughput_change} > -\${REGRESSION_THRESHOLD}
    
    Set To Dictionary     \${REGRESSION_METRICS}    response_time=\${response_time_change}
    Set To Dictionary     \${REGRESSION_METRICS}    throughput=\${throughput_change}
    Set To Dictionary     \${REGRESSION_METRICS}    memory_usage=\${memory_change}
    
    Log                   Performance comparison completed
    Log                   Response time change: \${response_time_change}%
    Log                   Throughput change: \${throughput_change}%
    Log                   Memory usage change: \${memory_change}%

Analyze Performance Trends
    [Documentation]    Analiza tendencias de performance en ventana histórica
    [Tags]             trending    analysis    historical
    
    # Cargar datos históricos
    File Should Exist     \${HISTORICAL_DATA}
    \${historical_content}= Get File    \${HISTORICAL_DATA}
    \${historical_data}=  Evaluate    json.loads(r'''\${historical_content}''')
    
    # Filtrar últimas N versiones para análisis de tendencia
    \${recent_versions}=  Get Recent Versions    \${historical_data}    \${TRENDING_WINDOW}
    Should Not Be Empty   \${recent_versions}
    
    # Calcular tendencias por métrica
    \${response_trend}=   Calculate Trend    \${recent_versions}    avg_response_time
    \${throughput_trend}= Calculate Trend    \${recent_versions}    requests_per_second
    \${memory_trend}=     Calculate Trend    \${recent_versions}    peak_memory_mb
    
    # Detectar tendencias preocupantes
    \${response_degrading}= Evaluate    \${response_trend} > 2.0
    \${throughput_degrading}= Evaluate    \${throughput_trend} < -2.0
    \${memory_growing}=   Evaluate    \${memory_trend} > 3.0
    
    # Alertar sobre tendencias negativas
    Run Keyword If        \${response_degrading}
    ...                   Log    WARNING: Response time trending upward (\${response_trend}% per release)
    
    Run Keyword If        \${throughput_degrading}
    ...                   Log    WARNING: Throughput trending downward (\${throughput_trend}% per release)
    
    Run Keyword If        \${memory_growing}
    ...                   Log    WARNING: Memory usage trending upward (\${memory_trend}% per release)
    
    # Generar predicciones
    \${predicted_response}= Evaluate    \${recent_versions[-1]['avg_response_time']} * (1 + \${response_trend}/100)
    \${predicted_throughput}= Evaluate    \${recent_versions[-1]['requests_per_second']} * (1 + \${throughput_trend}/100)
    
    Log                   Trending analysis completed
    Log                   Response time trend: \${response_trend}% per release
    Log                   Predicted next release response time: \${predicted_response}ms
    Log                   Throughput trend: \${throughput_trend}% per release

Execute Hotspot Analysis
    [Documentation]    Identifica componentes específicos con regresión
    [Tags]             hotspot    components    analysis
    
    # Analizar endpoints individuales
    @{critical_endpoints}= Create List    /api/users    /api/orders    /api/products    /api/search    /api/analytics
    
    FOR    \${endpoint}    IN    @{critical_endpoints}
        # Medir performance del endpoint específico
        \${endpoint_metrics}= Measure Endpoint Performance    \${endpoint}    50
        
        # Comparar contra baseline histórico del endpoint
        \${baseline_metric}= Get Endpoint Baseline    \${endpoint}    \${PREVIOUS_VERSION}
        
        \${endpoint_change}= Evaluate    
        ...    ((\${endpoint_metrics.avg_response} - \${baseline_metric.avg_response}) / \${baseline_metric.avg_response}) * 100
        
        # Identificar hotspots problemáticos
        Run Keyword If      \${endpoint_change} > \${REGRESSION_THRESHOLD}
        ...                 Flag Endpoint As Hotspot    \${endpoint}    \${endpoint_change}
        
        Log                 Endpoint \${endpoint}: \${endpoint_change}% change
    END
    
    # Analizar queries de base de datos
    \${db_queries}=       Get Slow Query Analysis
    Should Not Be Empty   \${db_queries}
    
    FOR    \${query_info}    IN    @{db_queries}
        \${query_id}=      Set Variable    \${query_info[0]}
        \${current_time}=  Set Variable    \${query_info[1]}
        \${baseline_time}= Get Query Baseline    \${query_id}    \${PREVIOUS_VERSION}
        
        \${query_change}=  Evaluate    ((\${current_time} - \${baseline_time}) / \${baseline_time}) * 100
        
        Run Keyword If     \${query_change} > 20.0
        ...                Flag Query As Hotspot    \${query_id}    \${query_change}
        
        Log                Query \${query_id}: \${query_change}% change (\${current_time}ms)
    END

Generate Regression Report
    [Documentation]    Genera reporte detallado de regresión performance
    [Tags]             reporting    regression    documentation
    
    # Crear estructura del reporte
    \${report_data}=      Create Dictionary
    ...                   version_current=\${CURRENT_VERSION}
    ...                   version_previous=\${PREVIOUS_VERSION}
    ...                   test_date=\${CURRENT_DATE}
    ...                   regression_threshold=\${REGRESSION_THRESHOLD}
    ...                   metrics=\${REGRESSION_METRICS}
    
    # Agregar secciones del reporte
    \${executive_summary}= Generate Executive Summary    \${REGRESSION_METRICS}
    \${detailed_analysis}= Generate Detailed Analysis    \${REGRESSION_METRICS}
    \${recommendations}=   Generate Recommendations      \${REGRESSION_METRICS}
    
    Set To Dictionary     \${report_data}    executive_summary=\${executive_summary}
    Set To Dictionary     \${report_data}    detailed_analysis=\${detailed_analysis}
    Set To Dictionary     \${report_data}    recommendations=\${recommendations}
    
    # Generar reporte HTML
    \${html_content}=     Render HTML Report    \${report_data}
    Create File           \${RESULTS_DIR}/regression_report_\${CURRENT_VERSION}.html    \${html_content}
    
    # Generar reporte JSON para APIs
    \${json_content}=     Evaluate    json.dumps(\${report_data}, indent=2)
    Create File           \${RESULTS_DIR}/regression_report_\${CURRENT_VERSION}.json    \${json_content}
    
    # Generar CSV para análisis de datos
    \${csv_content}=      Generate CSV Report    \${report_data}
    Create File           \${RESULTS_DIR}/regression_metrics_\${CURRENT_VERSION}.csv    \${csv_content}
    
    File Should Exist     \${RESULTS_DIR}/regression_report_\${CURRENT_VERSION}.html
    File Should Exist     \${RESULTS_DIR}/regression_report_\${CURRENT_VERSION}.json
    File Should Exist     \${RESULTS_DIR}/regression_metrics_\${CURRENT_VERSION}.csv
    
    Log                   Regression report generated successfully
    Log                   HTML Report: \${RESULTS_DIR}/regression_report_\${CURRENT_VERSION}.html

Automated Regression Decision
    [Documentation]    Toma decisión automática basada en análisis regression
    [Tags]             decision    automation    gating
    
    # Evaluar severidad de regresiones encontradas
    \${critical_regressions}= Count Critical Regressions    \${REGRESSION_METRICS}
    \${warning_regressions}=  Count Warning Regressions     \${REGRESSION_METRICS}
    
    # Determinar acción automática
    \${block_release}=    Evaluate    \${critical_regressions} > 0
    \${require_review}=   Evaluate    \${warning_regressions} > 2
    
    # Ejecutar acción correspondiente
    Run Keyword If        \${block_release}
    ...                   Block Release Due To Critical Regression
    ...                   ELSE IF    \${require_review}
    ...                   Require Manual Review
    ...                   ELSE
    ...                   Approve Release
    
    # Notificar resultado
    \${decision_status}=  Set Variable If    \${block_release}    BLOCKED
    ...                   \${require_review}    REVIEW_REQUIRED    APPROVED
    
    Send Regression Notification    \${decision_status}    \${critical_regressions}    \${warning_regressions}
    
    Log                   Automated decision: \${decision_status}
    Log                   Critical regressions: \${critical_regressions}
    Log                   Warning regressions: \${warning_regressions}

*** Keywords ***
Initialize Regression Testing
    Log                   📈 Initializing performance regression testing
    Create Directory      \${RESULTS_DIR}
    Set Global Variable   \${CURRENT_DATE}    2024-01-15

Extract Performance Metrics From Output
    [Arguments]           \${output_file}
    \${metrics}=          Create Dictionary    avg_response_time=920    requests_per_second=185    peak_memory_mb=512
    RETURN                \${metrics}

Store Baseline
    [Arguments]           \${version}    \${metrics}
    Log                   Storing baseline for version \${version}

Load Baseline
    [Arguments]           \${version}
    \${baseline}=         Create Dictionary    avg_response_time=890    requests_per_second=190    peak_memory_mb=495
    RETURN                \${baseline}

Get Recent Versions
    [Arguments]           \${historical_data}    \${window}
    \${recent}=           Create List    \${historical_data}
    RETURN                \${recent}

Calculate Trend
    [Arguments]           \${versions}    \${metric}
    \${trend}=            Set Variable    2.5
    RETURN                \${trend}

Measure Endpoint Performance
    [Arguments]           \${endpoint}    \${iterations}
    \${metrics}=          Create Dictionary    avg_response=450    p95_response=650
    RETURN                \${metrics}

Get Endpoint Baseline
    [Arguments]           \${endpoint}    \${version}
    \${baseline}=         Create Dictionary    avg_response=420    p95_response=600
    RETURN                \${baseline}

Flag Endpoint As Hotspot
    [Arguments]           \${endpoint}    \${change}
    Log                   HOTSPOT: Endpoint \${endpoint} degraded by \${change}%

Get Slow Query Analysis
    \${queries}=          Create List    @{[['query_001', 150], ['query_002', 89]]}
    RETURN                \${queries}

Get Query Baseline
    [Arguments]           \${query_id}    \${version}
    \${baseline}=         Set Variable    120
    RETURN                \${baseline}

Flag Query As Hotspot
    [Arguments]           \${query_id}    \${change}
    Log                   HOTSPOT: Query \${query_id} degraded by \${change}%

Generate Executive Summary
    [Arguments]           \${metrics}
    \${summary}=          Set Variable    Performance regression analysis completed
    RETURN                \${summary}

Generate Detailed Analysis
    [Arguments]           \${metrics}
    \${analysis}=         Set Variable    Detailed performance metrics analysis
    RETURN                \${analysis}

Generate Recommendations
    [Arguments]           \${metrics}
    \${recommendations}=  Set Variable    Optimize database queries and reduce memory allocation
    RETURN                \${recommendations}

Render HTML Report
    [Arguments]           \${report_data}
    \${html}=             Set Variable    <html><body><h1>Regression Report</h1></body></html>
    RETURN                \${html}

Generate CSV Report
    [Arguments]           \${report_data}
    \${csv}=              Set Variable    metric,change,status\\nresponse_time,2.5,acceptable
    RETURN                \${csv}

Count Critical Regressions
    [Arguments]           \${metrics}
    \${count}=            Set Variable    0
    RETURN                \${count}

Count Warning Regressions
    [Arguments]           \${metrics}
    \${count}=            Set Variable    1
    RETURN                \${count}

Block Release Due To Critical Regression
    Log                   🚫 RELEASE BLOCKED: Critical performance regression detected

Require Manual Review
    Log                   ⚠️ MANUAL REVIEW REQUIRED: Warning-level regressions found

Approve Release
    Log                   ✅ RELEASE APPROVED: No significant performance regressions

Send Regression Notification
    [Arguments]           \${status}    \${critical}    \${warning}
    Log                   Notification sent: \${status} (Critical: \${critical}, Warnings: \${warning})

Archive Regression Results
    Log                   📁 Archiving regression test results and baselines</code></pre>
        
        <h3>🎯 Práctica Regression (7 min):</h3>
        <p>1. Configura base de datos de baselines históricos</p>
        <p>2. Implementa captura automática de baseline por versión</p>
        <p>3. Crea comparación automática entre versiones consecutivas</p>
        <p>4. Configura thresholds de regresión por tipo de métrica</p>
        <p>5. Implementa análisis de tendencias en ventana móvil</p>
        <p>6. Crea hotspot analysis para componentes específicos</p>
        <p>7. Genera reportes automáticos de regresión</p>
        <p>8. Implementa gating automático basado en severidad</p>
        <p>9. Configura alertas diferenciadas por tipo de regresión</p>
        <p>10. Documenta proceso de escalamiento para regresiones críticas</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Detectar regresiones de performance automáticamente</li>
                <li>Analizar tendencias históricas y predecir degradaciones</li>
                <li>Identificar hotspots específicos con problemas</li>
                <li>Automatizar decisiones de release basadas en métricas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa ventanas móviles para trending: analiza últimas 30 versiones para detectar patrones de degradación gradual.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 208 - Capacity planning y scaling</h3>
        <p>Con regression testing automatizado, aprenderás capacity planning para predecir necesidades de infraestructura y scaling automático.</p>
    `,
    topics: ["performance", "load", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-206"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_207 = LESSON_207;
}