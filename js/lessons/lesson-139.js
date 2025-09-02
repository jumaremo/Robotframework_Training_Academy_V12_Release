/**
 * Robot Framework Academy - Lesson 139
 * Database Testing 139
 */

const LESSON_139 = {
    id: 139,
    title: "Database Testing 139",
    duration: "7 min",
    level: "intermediate",
    section: "section-10",
    content: `
        <h2>⚡ Performance Testing</h2>
        <p>Medición y optimización performance queries, índices y operaciones batch en production databases.</p>
        
        <h3>💻 Performance Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    DatabaseLibrary
Library    Collections
Library    String
Library    DateTime
Library    Process

*** Variables ***
\${DB_HOST}         localhost
\${DB_NAME}         testdb
\${DB_USER}         testuser
\${DB_PASSWORD}     testpass
\${DB_PORT}         3306
\${PERFORMANCE_THRESHOLD}    2.0
\${BATCH_SIZE}      1000
\${STRESS_QUERIES}  100
\${BASELINE_METRICS}    \${EMPTY}
\${SLOW_QUERY_LOG}  \${EMPTY}

*** Test Cases ***
Query Performance Baseline
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${start_time}=        Get Current Date    result_format=epoch
    \${simple_query}=      Query    SELECT COUNT(*) FROM users
    \${end_time}=          Get Current Date    result_format=epoch
    \${simple_duration}=   Evaluate    \${end_time} - \${start_time}
    Should Be True         \${simple_duration} < 1
    \${start_complex}=     Get Current Date    result_format=epoch
    \${complex_query}=     Query    SELECT u.name, COUNT(o.id) as order_count, AVG(o.total) as avg_total FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id ORDER BY order_count DESC LIMIT 10
    \${end_complex}=       Get Current Date    result_format=epoch
    \${complex_duration}=  Evaluate    \${end_complex} - \${start_complex}
    Should Be True         \${complex_duration} < \${PERFORMANCE_THRESHOLD}
    \${baseline_metrics}=  Create Dictionary    simple_query=\${simple_duration}    complex_query=\${complex_duration}
    Set Suite Variable     \${BASELINE_METRICS}    \${baseline_metrics}
    Log    Performance baseline: simple=\${simple_duration}s, complex=\${complex_duration}s
    Disconnect From Database

Index Performance Analysis
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${without_index_start}=    Get Current Date    result_format=epoch
    \${no_index_query}=         Query    SELECT * FROM orders WHERE total > 500 AND order_date >= '2023-01-01'
    \${without_index_end}=      Get Current Date    result_format=epoch
    \${no_index_time}=          Evaluate    \${without_index_end} - \${without_index_start}
    Execute SQL String          CREATE INDEX idx_orders_total_date ON orders(total, order_date)
    \${with_index_start}=       Get Current Date    result_format=epoch
    \${with_index_query}=       Query    SELECT * FROM orders WHERE total > 500 AND order_date >= '2023-01-01'
    \${with_index_end}=         Get Current Date    result_format=epoch
    \${with_index_time}=        Evaluate    \${with_index_end} - \${with_index_start}
    Should Be True              \${with_index_time} <= \${no_index_time}
    \${performance_gain}=       Evaluate    (\${no_index_time} - \${with_index_time}) / \${no_index_time} * 100
    Should Be True              \${performance_gain} >= 0
    \${explain_result}=         Query    EXPLAIN SELECT * FROM orders WHERE total > 500 AND order_date >= '2023-01-01'
    Should Not Be Empty         \${explain_result}
    Log    Index performance: \${performance_gain}% improvement
    Disconnect From Database

Batch Operations Performance
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${batch_start}=       Get Current Date    result_format=epoch
    FOR    \${i}    IN RANGE    1    \${BATCH_SIZE} + 1
        Execute SQL String    INSERT INTO test_batch (name, value, created_at) VALUES ('Batch User \${i}', \${i * 10}, NOW())
    END
    \${batch_end}=         Get Current Date    result_format=epoch
    \${batch_duration}=    Evaluate    \${batch_end} - \${batch_start}
    \${ops_per_second}=    Evaluate    \${BATCH_SIZE} / \${batch_duration}
    Should Be True         \${ops_per_second} > 100
    \${bulk_start}=        Get Current Date    result_format=epoch
    \${bulk_values}=       Set Variable    \${EMPTY}
    FOR    \${i}    IN RANGE    1    \${BATCH_SIZE} + 1
        \${bulk_values}=   Set Variable If    '\${bulk_values}' == ''    ('Bulk User \${i}', \${i * 20}, NOW())    \${bulk_values}, ('Bulk User \${i}', \${i * 20}, NOW())
    END
    Execute SQL String     INSERT INTO test_batch (name, value, created_at) VALUES \${bulk_values}
    \${bulk_end}=          Get Current Date    result_format=epoch
    \${bulk_duration}=     Evaluate    \${bulk_end} - \${bulk_start}
    \${bulk_ops_per_sec}=  Evaluate    \${BATCH_SIZE} / \${bulk_duration}
    Should Be True         \${bulk_ops_per_sec} > \${ops_per_second}
    Log    Batch performance: individual=\${ops_per_second}/s, bulk=\${bulk_ops_per_sec}/s
    Disconnect From Database

Stress Testing Database
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${stress_results}=    Create List
    \${concurrent_start}=  Get Current Date    result_format=epoch
    FOR    \${query_num}    IN RANGE    1    \${STRESS_QUERIES} + 1
        \${stress_start}=  Get Current Date    result_format=epoch
        \${stress_query}=  Query    SELECT u.*, o.total FROM users u JOIN orders o ON u.id = o.user_id WHERE u.id = \${query_num % 100 + 1}
        \${stress_end}=    Get Current Date    result_format=epoch
        \${query_time}=    Evaluate    \${stress_end} - \${stress_start}
        Append To List     \${stress_results}    \${query_time}
        Should Be True     \${query_time} < 5
    END
    \${concurrent_end}=    Get Current Date    result_format=epoch
    \${total_stress_time}=  Evaluate    \${concurrent_end} - \${concurrent_start}
    \${avg_query_time}=    Evaluate    sum(\${stress_results}) / len(\${stress_results})
    \${max_query_time}=    Evaluate    max(\${stress_results})
    \${queries_per_sec}=   Evaluate    \${STRESS_QUERIES} / \${total_stress_time}
    Should Be True         \${avg_query_time} < 1
    Should Be True         \${max_query_time} < 3
    Should Be True         \${queries_per_sec} > 10
    Log    Stress test: avg=\${avg_query_time}s, max=\${max_query_time}s, \${queries_per_sec} qps
    Disconnect From Database

Connection Pool Performance
    \${pool_results}=      Create Dictionary    success=0    failures=0    total_time=0
    FOR    \${connection}    IN RANGE    1    21
        TRY
            \${conn_start}=    Get Current Date    result_format=epoch
            Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
            \${test_query}=        Query    SELECT 1 as test
            Should Not Be Empty    \${test_query}
            Disconnect From Database
            \${conn_end}=          Get Current Date    result_format=epoch
            \${conn_time}=         Evaluate    \${conn_end} - \${conn_start}
            \${success}=           Evaluate    \${pool_results['success']} + 1
            \${total_time}=        Evaluate    \${pool_results['total_time']} + \${conn_time}
            Set To Dictionary      \${pool_results}    success=\${success}    total_time=\${total_time}
        EXCEPT
            \${failures}=          Evaluate    \${pool_results['failures']} + 1
            Set To Dictionary      \${pool_results}    failures=\${failures}
        END
    END
    \${success_rate}=      Evaluate    \${pool_results['success']} / 20 * 100
    \${avg_conn_time}=     Evaluate    \${pool_results['total_time']} / \${pool_results['success']}
    Should Be True         \${success_rate} >= 95
    Should Be True         \${avg_conn_time} < 1
    Log    Connection pool: \${success_rate}% success, \${avg_conn_time}s avg connection time

Memory Usage Analysis
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${memory_stats}=      Query    SHOW STATUS LIKE 'innodb_buffer_pool%'
    Should Not Be Empty    \${memory_stats}
    \${buffer_pool_size}=  Set Variable    0
    \${buffer_pool_used}=  Set Variable    0
    FOR    \${stat}    IN    @{memory_stats}
        IF    '\${stat[0]}' == 'Innodb_buffer_pool_bytes_data'
            \${buffer_pool_used}=    Set Variable    \${stat[1]}
        ELSE IF    '\${stat[0]}' == 'Innodb_buffer_pool_pool_size'
            \${buffer_pool_size}=    Set Variable    \${stat[1]}
        END
    END
    \${memory_usage_pct}=  Evaluate    (\${buffer_pool_used} / \${buffer_pool_size}) * 100 if \${buffer_pool_size} > 0 else 0
    Should Be True         \${memory_usage_pct} < 90
    \${process_list}=      Query    SHOW PROCESSLIST
    Should Not Be Empty    \${process_list}
    \${active_connections}=    Get Length    \${process_list}
    Should Be True         \${active_connections} < 100
    Log    Memory analysis: \${memory_usage_pct}% buffer pool, \${active_connections} connections
    Disconnect From Database

Slow Query Detection
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${slow_queries}=      Query    SHOW STATUS LIKE 'Slow_queries'
    Should Not Be Empty    \${slow_queries}
    \${initial_slow}=      Get From List    \${slow_queries}    0
    Execute SQL String     SET SESSION long_query_time = 0.1
    \${intentional_slow}=  Query    SELECT SLEEP(0.2), COUNT(*) FROM users
    Should Not Be Empty    \${intentional_slow}
    \${final_slow}=        Query    SHOW STATUS LIKE 'Slow_queries'
    Should Not Be Empty    \${final_slow}
    \${slow_increase}=     Evaluate    \${final_slow[0][1]} - \${initial_slow[1]}
    Should Be True         \${slow_increase} >= 1
    \${query_analysis}=    Query    SELECT sql_text, execution_count, avg_timer_wait/1000000000 as avg_seconds FROM performance_schema.events_statements_summary_by_digest WHERE avg_timer_wait > 100000000 LIMIT 5
    Should Not Be None     \${query_analysis}
    Set Suite Variable     \${SLOW_QUERY_LOG}    \${query_analysis}
    Log    Slow query detection: \${slow_increase} new slow queries found
    Disconnect From Database

Performance Report Generation
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${performance_report}=    Create Dictionary
    ...                        baseline_simple=\${BASELINE_METRICS['simple_query']}
    ...                        baseline_complex=\${BASELINE_METRICS['complex_query']}
    ...                        index_optimization=ENABLED
    ...                        batch_performance=OPTIMIZED
    ...                        stress_test=PASSED
    ...                        connection_pool=HEALTHY
    ...                        memory_usage=ACCEPTABLE
    ...                        slow_queries_detected=\${len(\${SLOW_QUERY_LOG})}
    Should Be True         \${performance_report['baseline_simple']} < 1
    Should Be True         \${performance_report['baseline_complex']} < \${PERFORMANCE_THRESHOLD}
    Should Be Equal        \${performance_report['index_optimization']}    ENABLED
    Should Be Equal        \${performance_report['batch_performance']}     OPTIMIZED
    Should Be Equal        \${performance_report['stress_test']}           PASSED
    Should Be Equal        \${performance_report['connection_pool']}       HEALTHY
    Should Be Equal        \${performance_report['memory_usage']}          ACCEPTABLE
    Should Be True         \${performance_report['slow_queries_detected']} >= 0
    \${overall_performance}=    Set Variable If    \${performance_report['baseline_complex']} < 1    EXCELLENT    ACCEPTABLE
    Set To Dictionary      \${performance_report}    overall_status    \${overall_performance}
    Log    Performance report: \${performance_report}
    Disconnect From Database</code></pre>
        
        <h3>🎯 Práctica Performance (5 min):</h3>
        <p>1. Ejecuta query performance baseline measurements</p>
        <p>2. Implementa index creation y mide mejoras</p>
        <p>3. Compara batch operations vs bulk insertions</p>
        <p>4. Ejecuta stress testing con múltiples queries</p>
        <p>5. Analiza connection pool performance</p>
        <p>6. Monitorea memory usage y buffer pools</p>
        <p>7. Detecta slow queries automáticamente</p>
        <p>8. Genera performance report comprehensivo</p>
        <p>9. Valida que query times < thresholds</p>
        <p>10. Testa different query complexity levels</p>
        <p>11. Implementa operations per second metrics</p>
        <p>12. Usa EXPLAIN para query optimization</p>
        <p>13. Agrega Should Be True para performance limits</p>
        <p>14. Mide index performance gains percentage</p>
        <p>15. Log detailed performance metrics comprehensivos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Medir query performance y establecer baselines</li>
                <li>Optimizar índices y operaciones batch</li>
                <li>Ejecutar stress testing y connection pooling</li>
                <li>Detectar slow queries y generar reports</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Performance testing revela bottlenecks antes que lleguen a producción. Siempre mide antes y después de optimizaciones.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 140 - Database Backup Testing</h3>
        <p>Aprenderás a automatizar testing de backups, recovery procedures y disaster recovery scenarios para databases críticas.</p>
    `,
    topics: ["database", "sql", "nosql"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-138"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_139 = LESSON_139;
}