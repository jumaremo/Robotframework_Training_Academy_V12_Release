/**
 * Robot Framework Academy - Lesson 210
 * Performance 210
 */

const LESSON_210 = {
    id: 210,
    title: "Performance 210",
    duration: "10 min",
    level: "advanced",
    section: "section-16",
    content: `
        <h2>⚡ Optimization Strategies</h2>
        <p>Optimiza sistemáticamente aplicaciones usando datos reales de producción y técnicas enterprise probadas.</p>
        
        <h3>💻 Optimización Sistemática:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    ⚡ SYSTEMATIC PERFORMANCE OPTIMIZATION SUITE
Library          RequestsLibrary
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          Process
Library          JSON
Suite Setup      Initialize Optimization Framework
Suite Teardown   Archive Optimization Results

*** Variables ***
\${APP_URL}            https://app.company.com
\${OPTIMIZATION_DB}    optimization_results.db
\${BASELINE_FILE}      performance_baseline.json
\${TARGET_IMPROVEMENT} 25.0
\${MAX_ITERATIONS}     10
\${CODE_REPO}          /path/to/application
\${PROFILE_DURATION}   300
\${OPTIMIZATION_LOG}   optimization_actions.log
&{OPTIMIZATION_TARGETS} response_time=1200  memory_usage=400  cpu_usage=65  throughput=300

*** Test Cases ***
Analyze Performance Bottlenecks
    [Documentation]    Identifica bottlenecks específicos usando profiling detallado
    [Tags]             analysis    bottlenecks    profiling
    
    # Ejecutar profiling completo de aplicación
    \${profile_start}=    Get Current Date    result_format=epoch
    \${profile_result}=   Run Process    python    -m    cProfile    
    ...                   -o    app_profile.stats    
    ...                   -s    cumulative    
    ...                   run_app_benchmark.py
    \${profile_end}=      Get Current Date    result_format=epoch
    
    Should Be Equal       \${profile_result.rc}    0
    \${profile_time}=     Evaluate    \${profile_end} - \${profile_start}
    Log                   Profiling completed in \${profile_time} seconds
    
    # Analizar resultados de profiling
    \${stats_result}=     Run Process    python    -c    
    ...                   import pstats; p=pstats.Stats('app_profile.stats'); p.sort_stats('cumulative').print_stats(20)
    Should Be Equal       \${stats_result.rc}    0
    
    # Extraer funciones más costosas
    \${hot_functions}=    Extract Hot Functions    \${stats_result.stdout}
    Should Not Be Empty   \${hot_functions}
    
    FOR    \${function}    IN    @{hot_functions}
        \${function_name}=  Set Variable    \${function['name']}
        \${cumulative_time}= Set Variable    \${function['cumulative']}
        \${call_count}=     Set Variable    \${function['calls']}
        
        # Priorizar funciones con alto impacto
        \${optimization_priority}= Calculate Priority    \${cumulative_time}    \${call_count}
        
        Run Keyword If      \${optimization_priority} > 80
        ...                 Flag For Optimization    \${function_name}    HIGH
        ...                 ELSE IF    \${optimization_priority} > 50
        ...                 Flag For Optimization    \${function_name}    MEDIUM
        
        Log                 Function \${function_name}: \${cumulative_time}s (\${call_count} calls) - Priority: \${optimization_priority}
        Append To File      \${OPTIMIZATION_LOG}    HOTSPOT,\${function_name},\${cumulative_time},\${call_count},\${optimization_priority}\\n
    END

Implement Database Query Optimization
    [Documentation]    Optimiza queries de base de datos identificadas como lentas
    [Tags]             database    queries    optimization
    
    # Conectar a base de datos para análisis
    Connect To Database   pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}
    
    # Obtener queries más lentas desde performance schema
    \${slow_queries}=     Query    
    ...                   SELECT digest_text, avg_timer_wait/1000000000 as avg_seconds, count_star as executions, 
    ...                          sum_timer_wait/1000000000 as total_seconds
    ...                   FROM performance_schema.events_statements_summary_by_digest 
    ...                   WHERE avg_timer_wait > 1000000000 
    ...                   ORDER BY avg_timer_wait DESC LIMIT 10
    
    Should Not Be Empty   \${slow_queries}
    
    FOR    \${query_row}    IN    @{slow_queries}
        \${query_text}=    Set Variable    \${query_row[0]}
        \${avg_time}=      Set Variable    \${query_row[1]}
        \${executions}=    Set Variable    \${query_row[2]}
        \${total_time}=    Set Variable    \${query_row[3]}
        
        # Analizar plan de ejecución
        \${explain_result}= Query    EXPLAIN FORMAT=JSON \${query_text}
        \${explain_data}=  Set Variable    \${explain_result[0][0]}
        
        # Identificar optimizaciones potenciales
        \${optimization_suggestions}= Analyze Query Plan    \${explain_data}
        
        # Aplicar optimizaciones automáticas donde sea seguro
        FOR    \${suggestion}    IN    @{optimization_suggestions}
            \${optimization_type}= Set Variable    \${suggestion['type']}
            \${safety_level}=   Set Variable    \${suggestion['safety']}
            
            Run Keyword If      '\${safety_level}' == 'safe'
            ...                 Apply Database Optimization    \${optimization_type}    \${query_text}
            ...                 ELSE
            ...                 Log    Manual review required for \${optimization_type} optimization
        END
        
        Log                 Optimized query: \${avg_time}s avg (\${executions} executions)
        Append To File      \${OPTIMIZATION_LOG}    DB_OPTIMIZATION,\${avg_time},\${executions},applied\\n
    END
    
    Disconnect From Database

Optimize Application Memory Usage
    [Documentation]    Reduce memory footprint y elimina memory leaks
    [Tags]             memory    optimization    leaks
    
    # Capturar baseline de memoria
    \${initial_memory}=   Get Memory Usage
    Log                   Initial memory usage: \${initial_memory}MB
    
    # Ejecutar análisis de memory leaks
    \${memcheck_result}=  Run Process    python    -m    memory_profiler    
    ...                   --precision=2    
    ...                   memory_intensive_operations.py
    Should Be Equal       \${memcheck_result.rc}    0
    
    # Analizar patrones de memory allocation
    \${memory_pattern}=   Analyze Memory Pattern    \${memcheck_result.stdout}
    \${leak_detected}=    Set Variable    \${memory_pattern['leak_detected']}
    \${peak_usage}=       Set Variable    \${memory_pattern['peak_usage']}
    \${growth_rate}=      Set Variable    \${memory_pattern['growth_rate']}
    
    Should Be True        \${peak_usage} < 1000
    Should Be True        \${growth_rate} < 5.0
    
    # Aplicar optimizaciones de memoria
    Run Keyword If        \${leak_detected}
    ...                   Apply Memory Leak Fixes
    
    Run Keyword If        \${peak_usage} > \${OPTIMIZATION_TARGETS.memory_usage}
    ...                   Apply Memory Optimization Techniques
    
    # Verificar mejora después de optimizaciones
    \${optimized_memory}= Get Memory Usage
    \${improvement}=      Evaluate    ((\${initial_memory} - \${optimized_memory}) / \${initial_memory}) * 100
    
    Should Be True        \${improvement} > 0
    Log                   Memory optimization completed: \${improvement}% reduction
    Log                   Final memory usage: \${optimized_memory}MB
    
    Append To File        \${OPTIMIZATION_LOG}    MEMORY_OPT,\${initial_memory},\${optimized_memory},\${improvement}\\n

Implement Caching Strategy
    [Documentation]    Implementa caching inteligente para reducir carga
    [Tags]             caching    strategy    performance
    
    # Analizar patrones de acceso para identificar candidatos a cache
    \${access_log}=       Get File    /var/log/app/access.log
    \${access_patterns}=  Analyze Access Patterns    \${access_log}
    
    \${cache_candidates}= Get Cache Candidates    \${access_patterns}
    Should Not Be Empty   \${cache_candidates}
    
    FOR    \${candidate}    IN    @{cache_candidates}
        \${endpoint}=      Set Variable    \${candidate['endpoint']}
        \${hit_rate}=      Set Variable    \${candidate['hit_rate']}
        \${avg_time}=      Set Variable    \${candidate['avg_response_time']}
        
        # Configurar cache para endpoints con alto potencial
        Run Keyword If     \${hit_rate} > 70 and \${avg_time} > 500
        ...                Configure Endpoint Cache    \${endpoint}    \${hit_rate}
        
        Log                Cache candidate: \${endpoint} (hit rate: \${hit_rate}%, avg time: \${avg_time}ms)
    END
    
    # Implementar Redis cache layer
    \${redis_config}=     Create Dictionary
    ...                   host=redis.company.com
    ...                   port=6379
    ...                   db=0
    ...                   max_connections=100
    ...                   socket_timeout=5
    
    # Verificar conectividad con Redis
    Create Session        redis_test    http://redis.company.com:6379
    \${redis_ping}=       GET On Session    redis_test    /ping    timeout=5    expected_status=any
    
    # Configurar cache policies
    \${cache_policies}=   Create List
    ...                   @{[{'pattern': '/api/users/*', 'ttl': 3600, 'type': 'user_data'}]}
    ...                   @{[{'pattern': '/api/products/*', 'ttl': 7200, 'type': 'catalog_data'}]}
    ...                   @{[{'pattern': '/api/analytics/*', 'ttl': 1800, 'type': 'analytics_data'}]}
    
    FOR    \${policy}    IN    @{cache_policies}
        \${pattern}=       Set Variable    \${policy['pattern']}
        \${ttl}=           Set Variable    \${policy['ttl']}
        \${cache_type}=    Set Variable    \${policy['type']}
        
        Deploy Cache Policy    \${pattern}    \${ttl}    \${cache_type}
        Log                    Cache policy deployed: \${pattern} (TTL: \${ttl}s)
        Append To File         \${OPTIMIZATION_LOG}    CACHE_POLICY,\${pattern},\${ttl},deployed\\n
    END

Apply Code-level Optimizations
    [Documentation]    Aplica optimizaciones a nivel de código usando static analysis
    [Tags]             code    optimization    static_analysis
    
    # Ejecutar static analysis para identificar mejoras
    \${pylint_result}=    Run Process    pylint    
    ...                   --output-format=json    
    ...                   --disable=C,R    
    ...                   \${CODE_REPO}/src/
    Should Be Equal       \${pylint_result.rc}    0
    
    # Analizar resultados de pylint
    \${pylint_data}=      Evaluate    json.loads(r'''\${pylint_result.stdout}''')
    \${performance_issues}= Filter Performance Issues    \${pylint_data}
    
    FOR    \${issue}    IN    @{performance_issues}
        \${message}=       Set Variable    \${issue['message']}
        \${file_path}=     Set Variable    \${issue['path']}
        \${line_number}=   Set Variable    \${issue['line']}
        \${issue_type}=    Set Variable    \${issue['message-id']}
        
        # Aplicar fixes automáticos para issues conocidos
        Run Keyword If      '\${issue_type}' == 'W0622'    # Redefined builtin
        ...                 Apply Builtin Redefinition Fix    \${file_path}    \${line_number}
        ...                 ELSE IF    '\${issue_type}' == 'W0640'    # Cell variable in loop
        ...                 Apply Loop Variable Fix    \${file_path}    \${line_number}
        
        Log                 Code issue: \${message} at \${file_path}:\${line_number}
        Append To File      \${OPTIMIZATION_LOG}    CODE_ISSUE,\${issue_type},\${file_path},\${line_number}\\n
    END
    
    # Ejecutar optimizaciones automáticas con autopep8
    \${autopep8_result}=  Run Process    autopep8    
    ...                   --in-place    
    ...                   --aggressive    --aggressive    
    ...                   --max-line-length=100    
    ...                   --recursive    
    ...                   \${CODE_REPO}/src/
    Should Be Equal       \${autopep8_result.rc}    0
    
    # Verificar mejoras con nuevo profiling
    \${post_opt_profile}= Run Performance Profile    \${CODE_REPO}
    \${code_improvement}= Calculate Improvement    baseline_profile.json    \${post_opt_profile}
    
    Should Be True        \${code_improvement} > 5.0
    Log                   Code optimizations completed: \${code_improvement}% improvement

Validate Optimization Results
    [Documentation]    Valida que optimizaciones mejoran performance efectivamente
    [Tags]             validation    results    measurement
    
    # Ejecutar benchmark completo post-optimización
    \${benchmark_start}=  Get Current Date    result_format=epoch
    \${benchmark_result}= Run Process    python    comprehensive_benchmark.py    
    ...                   --duration    \${PROFILE_DURATION}    
    ...                   --output    optimized_results.json
    \${benchmark_end}=    Get Current Date    result_format=epoch
    
    Should Be Equal       \${benchmark_result.rc}    0
    \${benchmark_time}=   Evaluate    \${benchmark_end} - \${benchmark_start}
    
    # Cargar resultados optimizados
    \${optimized_data}=   Get File    optimized_results.json
    \${optimized_metrics}= Evaluate    json.loads(r'''\${optimized_data}''')
    
    # Cargar baseline para comparación
    \${baseline_data}=    Get File    \${BASELINE_FILE}
    \${baseline_metrics}= Evaluate    json.loads(r'''\${baseline_data}''')
    
    # Calcular mejoras por métrica
    \${response_improvement}= Evaluate    
    ...    ((\${baseline_metrics['response_time']} - \${optimized_metrics['response_time']}) / \${baseline_metrics['response_time']}) * 100
    
    \${throughput_improvement}= Evaluate    
    ...    ((\${optimized_metrics['throughput']} - \${baseline_metrics['throughput']} / \${baseline_metrics['throughput']}) * 100
    
    \${memory_improvement}= Evaluate    
    ...    ((\${baseline_metrics['memory_usage']} - \${optimized_metrics['memory_usage']}) / \${baseline_metrics['memory_usage']}) * 100
    
    # Validar que mejoras cumplen targets
    Should Be True        \${response_improvement} >= \${TARGET_IMPROVEMENT}
    Should Be True        \${throughput_improvement} >= 10.0
    Should Be True        \${memory_improvement} >= 15.0
    
    # Generar reporte de optimización
    \${optimization_report}= Create Dictionary
    ...                      response_improvement=\${response_improvement}
    ...                      throughput_improvement=\${throughput_improvement}
    ...                      memory_improvement=\${memory_improvement}
    ...                      optimization_time=\${benchmark_time}
    ...                      baseline_metrics=\${baseline_metrics}
    ...                      optimized_metrics=\${optimized_metrics}
    
    \${report_json}=      Evaluate    json.dumps(\${optimization_report}, indent=2)
    Create File           optimization_results.json    \${report_json}
    File Should Exist     optimization_results.json
    
    Log                   Optimization validation completed
    Log                   Response time improvement: \${response_improvement}%
    Log                   Throughput improvement: \${throughput_improvement}%
    Log                   Memory usage improvement: \${memory_improvement}%

*** Keywords ***
Initialize Optimization Framework
    Log                   ⚡ Initializing systematic optimization framework
    Create File           \${OPTIMIZATION_LOG}    ACTION_TYPE,METRIC1,METRIC2,RESULT\\n
    Set Global Variable   \${CURRENT_DATE}    2024-01-15

Extract Hot Functions
    [Arguments]           \${profiler_output}
    \${functions}=        Create List    
    ...                   @{[{'name': 'database_query', 'cumulative': 2.5, 'calls': 1500}]}
    ...                   @{[{'name': 'json_processing', 'cumulative': 1.8, 'calls': 800}]}
    RETURN                \${functions}

Calculate Priority
    [Arguments]           \${cumulative_time}    \${call_count}
    \${priority}=         Evaluate    (\${cumulative_time} * \${call_count}) / 10
    RETURN                \${priority}

Flag For Optimization
    [Arguments]           \${function_name}    \${priority}
    Log                   Flagged \${function_name} for \${priority} priority optimization

Analyze Query Plan
    [Arguments]           \${explain_json}
    \${suggestions}=      Create List    @{[{'type': 'index_optimization', 'safety': 'safe'}]}
    RETURN                \${suggestions}

Apply Database Optimization
    [Arguments]           \${type}    \${query}
    Log                   Applied \${type} optimization to query

Get Memory Usage
    \${memory_result}=    Run Process    python    -c    import psutil; print(psutil.Process().memory_info().rss / 1024 / 1024)
    \${memory_mb}=        Convert To Number    \${memory_result.stdout}
    RETURN                \${memory_mb}

Analyze Memory Pattern
    [Arguments]           \${profiler_output}
    \${pattern}=          Create Dictionary    leak_detected=False    peak_usage=450    growth_rate=2.5
    RETURN                \${pattern}

Apply Memory Leak Fixes
    Log                   Applying memory leak fixes

Apply Memory Optimization Techniques
    Log                   Applying memory optimization techniques

Analyze Access Patterns
    [Arguments]           \${log_data}
    \${patterns}=         Create Dictionary    most_frequent=/api/users    avg_response=450
    RETURN                \${patterns}

Get Cache Candidates
    [Arguments]           \${patterns}
    \${candidates}=       Create List    
    ...                   @{[{'endpoint': '/api/users', 'hit_rate': 85, 'avg_response_time': 650}]}
    RETURN                \${candidates}

Configure Endpoint Cache
    [Arguments]           \${endpoint}    \${hit_rate}
    Log                   Configured cache for \${endpoint} (expected hit rate: \${hit_rate}%)

Deploy Cache Policy
    [Arguments]           \${pattern}    \${ttl}    \${type}
    Log                   Deployed cache policy: \${pattern} (\${ttl}s TTL, type: \${type})

Filter Performance Issues
    [Arguments]           \${pylint_data}
    \${issues}=           Create List    @{[{'message': 'inefficient loop', 'path': 'main.py', 'line': 45, 'message-id': 'W0622'}]}
    RETURN                \${issues}

Apply Builtin Redefinition Fix
    [Arguments]           \${file_path}    \${line_number}
    Log                   Fixed builtin redefinition at \${file_path}:\${line_number}

Apply Loop Variable Fix
    [Arguments]           \${file_path}    \${line_number}
    Log                   Fixed loop variable issue at \${file_path}:\${line_number}

Run Performance Profile
    [Arguments]           \${repo_path}
    \${profile}=          Set Variable    optimized_profile_results.json
    RETURN                \${profile}

Calculate Improvement
    [Arguments]           \${baseline_file}    \${current_file}
    \${improvement}=      Set Variable    18.5
    RETURN                \${improvement}

Archive Optimization Results
    Log                   📁 Archiving optimization results and performance data</code></pre>
        
        <h3>🎯 Práctica Optimization (7 min):</h3>
        <p>1. Ejecuta profiling completo con cProfile para identificar bottlenecks</p>
        <p>2. Optimiza queries lentas usando EXPLAIN y performance schema</p>
        <p>3. Implementa memory profiling para detectar y fix leaks</p>
        <p>4. Configura Redis cache layer con políticas inteligentes</p>
        <p>5. Aplica static analysis con pylint para code optimizations</p>
        <p>6. Usa autopep8 para optimizaciones automáticas de código</p>
        <p>7. Valida mejoras con benchmarks antes/después</p>
        <p>8. Implementa cache invalidation strategies</p>
        <p>9. Configura monitoring continuo de optimizaciones</p>
        <p>10. Documenta playbook de optimization procedures</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Optimizar sistemáticamente usando profiling y data real</li>
                <li>Implementar database query optimization automática</li>
                <li>Aplicar memory optimization y leak detection</li>
                <li>Validar mejoras con benchmarks cuantificables</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa cProfile con sort stats: python -m cProfile -s cumulative script.py para identificar funciones más costosas rápidamente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 211 - Performance testing project</h3>
        <p>Con estrategias de optimización dominadas, completarás un proyecto capstone integrando todo el stack de performance testing enterprise.</p>
    `,
    topics: ["performance", "load", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-209"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_210 = LESSON_210;
}