/**
 * Robot Framework Academy - Lesson 143
 * Database Testing 143
 */

const LESSON_143 = {
    id: 143,
    title: "Database Testing 143",
    duration: "7 min",
    level: "intermediate",
    section: "section-10",
    content: `
        <h2>📊 Monitoring Testing</h2>
        <p>Automatización monitoring databases con metrics collection, alerting y performance dashboards.</p>
        
        <h3>💻 Monitoring Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    DatabaseLibrary
Library    Collections
Library    String
Library    DateTime
Library    Process
Library    OperatingSystem

*** Variables ***
\${DB_HOST}         localhost
\${DB_NAME}         testdb
\${DB_USER}         testuser
\${DB_PASSWORD}     testpass
\${DB_PORT}         3306
\${METRICS_TABLE}   db_metrics
\${ALERT_THRESHOLD} 80
\${MONITORING_INTERVAL}    5
\${METRICS_DATA}    \${EMPTY}
\${HEALTH_STATUS}   \${EMPTY}

*** Test Cases ***
Monitoring Setup Initialization
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    Execute SQL String     CREATE TABLE IF NOT EXISTS \${METRICS_TABLE} (id INT AUTO_INCREMENT PRIMARY KEY, metric_name VARCHAR(100), metric_value DECIMAL(10,2), metric_unit VARCHAR(20), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    \${table_check}=       Query    SHOW TABLES LIKE '\${METRICS_TABLE}'
    Should Not Be Empty    \${table_check}
    \${initial_metrics}=   Query    SELECT COUNT(*) FROM \${METRICS_TABLE}
    Should Not Be Empty    \${initial_metrics}
    \${metric_count}=      Get From List    \${initial_metrics}    0
    Should Be True         \${metric_count[0]} >= 0
    Execute SQL String     DELETE FROM \${METRICS_TABLE} WHERE timestamp < DATE_SUB(NOW(), INTERVAL 1 HOUR)
    Log    Monitoring setup initialized: \${METRICS_TABLE} ready
    Disconnect From Database

Database Health Checks
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${connection_test}=   Query    SELECT 1 as health_check
    Should Not Be Empty    \${connection_test}
    \${health_result}=     Get From List    \${connection_test}    0
    Should Be Equal        \${health_result[0]}    1
    \${uptime_query}=      Query    SHOW STATUS LIKE 'Uptime'
    Should Not Be Empty    \${uptime_query}
    \${uptime_info}=       Get From List    \${uptime_query}    0
    Should Be True         \${uptime_info[1]} > 0
    \${thread_count}=      Query    SHOW STATUS LIKE 'Threads_connected'
    Should Not Be Empty    \${thread_count}
    \${active_threads}=    Get From List    \${thread_count}    0
    Should Be True         \${active_threads[1]} > 0
    Should Be True         \${active_threads[1]} < 100
    \${health_data}=       Create Dictionary    connection=HEALTHY    uptime=\${uptime_info[1]}    threads=\${active_threads[1]}
    Set Suite Variable     \${HEALTH_STATUS}    \${health_data}
    Log    Database health check: \${health_data}
    Disconnect From Database

Performance Metrics Collection
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${cpu_usage}=         Query    SHOW STATUS LIKE 'Cpu_time'
    Should Not Be None     \${cpu_usage}
    \${memory_stats}=      Query    SHOW STATUS LIKE 'innodb_buffer_pool_bytes_data'
    Should Not Be Empty    \${memory_stats}
    \${memory_used}=       Get From List    \${memory_stats}    0
    Should Be True         \${memory_used[1]} > 0
    \${query_stats}=       Query    SHOW STATUS LIKE 'Questions'
    Should Not Be Empty    \${query_stats}
    \${total_queries}=     Get From List    \${query_stats}    0
    Should Be True         \${total_queries[1]} > 0
    \${slow_queries}=      Query    SHOW STATUS LIKE 'Slow_queries'
    Should Not Be Empty    \${slow_queries}
    \${slow_count}=        Get From List    \${slow_queries}    0
    \${slow_percentage}=   Evaluate    (\${slow_count[1]} / \${total_queries[1]}) * 100 if \${total_queries[1]} > 0 else 0
    Should Be True         \${slow_percentage} < 5
    Execute SQL String     INSERT INTO \${METRICS_TABLE} (metric_name, metric_value, metric_unit) VALUES ('memory_usage', \${memory_used[1]}, 'bytes')
    Execute SQL String     INSERT INTO \${METRICS_TABLE} (metric_name, metric_value, metric_unit) VALUES ('total_queries', \${total_queries[1]}, 'count')
    Execute SQL String     INSERT INTO \${METRICS_TABLE} (metric_name, metric_value, metric_unit) VALUES ('slow_query_percentage', \${slow_percentage}, 'percent')
    Log    Performance metrics collected: memory=\${memory_used[1]}, queries=\${total_queries[1]}, slow=\${slow_percentage}%
    Disconnect From Database

Connection Pool Monitoring
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${max_connections}=   Query    SHOW VARIABLES LIKE 'max_connections'
    Should Not Be Empty    \${max_connections}
    \${max_conn_value}=    Get From List    \${max_connections}    0
    Should Be True         \${max_conn_value[1]} > 0
    \${current_connections}=    Query    SHOW STATUS LIKE 'Threads_connected'
    Should Not Be Empty    \${current_connections}
    \${current_conn_value}=    Get From List    \${current_connections}    0
    \${connection_usage}=  Evaluate    (\${current_conn_value[1]} / \${max_conn_value[1]}) * 100
    Should Be True         \${connection_usage} < \${ALERT_THRESHOLD}
    \${connection_history}=    Query    SHOW STATUS LIKE 'Connections'
    Should Not Be Empty    \${connection_history}
    \${total_connections}=     Get From List    \${connection_history}    0
    \${aborted_connections}=   Query    SHOW STATUS LIKE 'Aborted_connects'
    Should Not Be Empty    \${aborted_connections}
    \${aborted_count}=         Get From List    \${aborted_connections}    0
    \${abort_rate}=        Evaluate    (\${aborted_count[1]} / \${total_connections[1]}) * 100 if \${total_connections[1]} > 0 else 0
    Should Be True         \${abort_rate} < 1
    Execute SQL String     INSERT INTO \${METRICS_TABLE} (metric_name, metric_value, metric_unit) VALUES ('connection_usage', \${connection_usage}, 'percent')
    Execute SQL String     INSERT INTO \${METRICS_TABLE} (metric_name, metric_value, metric_unit) VALUES ('abort_rate', \${abort_rate}, 'percent')
    Log    Connection monitoring: usage=\${connection_usage}%, abort_rate=\${abort_rate}%
    Disconnect From Database

Query Performance Monitoring
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${query_start_time}=  Get Current Date    result_format=epoch
    \${sample_query}=      Query    SELECT COUNT(*) FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 DAY)
    \${query_end_time}=    Get Current Date    result_format=epoch
    \${query_duration}=    Evaluate    \${query_end_time} - \${query_start_time}
    Should Be True         \${query_duration} < 2
    Should Not Be Empty    \${sample_query}
    \${recent_users}=      Get From List    \${sample_query}    0
    Should Be True         \${recent_users[0]} >= 0
    \${table_scan_check}=  Query    SHOW STATUS LIKE 'Select_scan'
    Should Not Be Empty    \${table_scan_check}
    \${scan_count}=        Get From List    \${table_scan_check}    0
    \${index_usage}=       Query    SHOW STATUS LIKE 'Select_range'
    Should Not Be Empty    \${index_usage}
    \${index_count}=       Get From List    \${index_usage}    0
    \${scan_ratio}=        Evaluate    \${scan_count[1]} / (\${scan_count[1]} + \${index_count[1]}) * 100 if (\${scan_count[1]} + \${index_count[1]}) > 0 else 0
    Should Be True         \${scan_ratio} < 20
    Execute SQL String     INSERT INTO \${METRICS_TABLE} (metric_name, metric_value, metric_unit) VALUES ('avg_query_time', \${query_duration}, 'seconds')
    Execute SQL String     INSERT INTO \${METRICS_TABLE} (metric_name, metric_value, metric_unit) VALUES ('table_scan_ratio', \${scan_ratio}, 'percent')
    Log    Query performance: duration=\${query_duration}s, scan_ratio=\${scan_ratio}%
    Disconnect From Database

Storage Space Monitoring
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${table_sizes}=       Query    SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'DB Size in MB' FROM information_schema.tables WHERE table_schema = '\${DB_NAME}' ORDER BY (data_length + index_length) DESC
    Should Not Be Empty    \${table_sizes}
    \${total_size}=        Set Variable    0
    FOR    \${table}    IN    @{table_sizes}
        \${table_size}=    Set Variable    \${table[1]}
        \${total_size}=    Evaluate    \${total_size} + \${table_size}
        Should Be True     \${table_size} >= 0
    END
    Should Be True         \${total_size} > 0
    \${data_dir_query}=    Query    SHOW VARIABLES LIKE 'datadir'
    Should Not Be Empty    \${data_dir_query}
    \${data_directory}=    Get From List    \${data_dir_query}    0
    Should Not Be Empty    \${data_directory[1]}
    \${disk_usage_cmd}=    Set Variable    df -h \${data_directory[1]}
    \${disk_result}=       Run Process    \${disk_usage_cmd}    shell=True
    Should Be Equal        \${disk_result.rc}    0
    Should Contain         \${disk_result.stdout}    %
    Execute SQL String     INSERT INTO \${METRICS_TABLE} (metric_name, metric_value, metric_unit) VALUES ('database_size', \${total_size}, 'MB')
    Log    Storage monitoring: database_size=\${total_size}MB
    Disconnect From Database

Alert Threshold Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${recent_metrics}=    Query    SELECT metric_name, metric_value, metric_unit FROM \${METRICS_TABLE} WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 10 MINUTE) ORDER BY timestamp DESC
    Should Not Be Empty    \${recent_metrics}
    \${alert_triggered}=   Set Variable    False
    \${alert_messages}=    Create List
    FOR    \${metric}    IN    @{recent_metrics}
        IF    '\${metric[0]}' == 'connection_usage' and \${metric[1]} > \${ALERT_THRESHOLD}
            \${alert_triggered}=    Set Variable    True
            Append To List    \${alert_messages}    High connection usage: \${metric[1]}%
        ELSE IF    '\${metric[0]}' == 'slow_query_percentage' and \${metric[1]} > 5
            \${alert_triggered}=    Set Variable    True
            Append To List    \${alert_messages}    High slow query percentage: \${metric[1]}%
        ELSE IF    '\${metric[0]}' == 'table_scan_ratio' and \${metric[1]} > 20
            \${alert_triggered}=    Set Variable    True
            Append To List    \${alert_messages}    High table scan ratio: \${metric[1]}%
        END
    END
    \${alert_count}=       Get Length    \${alert_messages}
    Should Be True         \${alert_count} >= 0
    IF    \${alert_triggered}
        Log    ALERT TRIGGERED: \${alert_messages}
    ELSE
        Log    All metrics within normal thresholds
    END
    Execute SQL String     INSERT INTO \${METRICS_TABLE} (metric_name, metric_value, metric_unit) VALUES ('alerts_triggered', \${alert_count}, 'count')
    Log    Alert monitoring: \${alert_count} alerts triggered
    Disconnect From Database

Monitoring Report Generation
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${monitoring_summary}=    Create Dictionary
    \${latest_metrics}=    Query    SELECT metric_name, AVG(metric_value) as avg_value FROM \${METRICS_TABLE} WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 1 HOUR) GROUP BY metric_name
    Should Not Be Empty    \${latest_metrics}
    FOR    \${metric}    IN    @{latest_metrics}
        Set To Dictionary    \${monitoring_summary}    \${metric[0]}    \${metric[1]}
    END
    \${health_score}=      Set Variable    100
    IF    'connection_usage' in \${monitoring_summary} and \${monitoring_summary['connection_usage']} > 80
        \${health_score}=  Evaluate    \${health_score} - 20
    END
    IF    'slow_query_percentage' in \${monitoring_summary} and \${monitoring_summary['slow_query_percentage']} > 5
        \${health_score}=  Evaluate    \${health_score} - 15
    END
    IF    'table_scan_ratio' in \${monitoring_summary} and \${monitoring_summary['table_scan_ratio']} > 20
        \${health_score}=  Evaluate    \${health_score} - 10
    END
    Should Be True         \${health_score} >= 70
    Set To Dictionary      \${monitoring_summary}    overall_health_score    \${health_score}
    Set To Dictionary      \${monitoring_summary}    health_status    \${HEALTH_STATUS}
    Set To Dictionary      \${monitoring_summary}    monitoring_timestamp    \${EMPTY}
    \${current_timestamp}=    Get Current Date    result_format=%Y-%m-%d %H:%M:%S
    Set To Dictionary      \${monitoring_summary}    monitoring_timestamp    \${current_timestamp}
    Should Be True         \${len(\${monitoring_summary})} > 5
    Log    Monitoring report: \${monitoring_summary}
    Disconnect From Database</code></pre>
        
        <h3>🎯 Práctica Monitoring (5 min):</h3>
        <p>1. Ejecuta monitoring setup initialization completo</p>
        <p>2. Implementa database health checks automáticos</p>
        <p>3. Colecta performance metrics en tiempo real</p>
        <p>4. Monitorea connection pool usage y limits</p>
        <p>5. Valida query performance y execution times</p>
        <p>6. Implementa storage space monitoring</p>
        <p>7. Configura alert threshold testing</p>
        <p>8. Genera monitoring report comprehensivo</p>
        <p>9. Agrega Should Be True para threshold validation</p>
        <p>10. Testa different performance scenarios</p>
        <p>11. Implementa metrics historical tracking</p>
        <p>12. Valida alert trigger conditions</p>
        <p>13. Agrega storage space utilization checks</p>
        <p>14. Testa health score calculation</p>
        <p>15. Log detailed monitoring metrics para dashboards</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar database health checks automáticos</li>
                <li>Colectar performance metrics y connection monitoring</li>
                <li>Configurar alert thresholds y notification systems</li>
                <li>Generar monitoring reports y health scoring</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Database monitoring previene outages antes que ocurran. Configura alerts proactivos y mantén métricas históricas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 144 - Database Scaling Testing</h3>
        <p>Aprenderás a automatizar testing de horizontal/vertical scaling, load balancing y distributed database scenarios.</p>
    `,
    topics: ["database", "sql", "nosql"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-142"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_143 = LESSON_143;
}