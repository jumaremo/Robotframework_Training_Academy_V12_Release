/**
 * Robot Framework Academy - Lesson 177
 * Python Libraries 177
 */

const LESSON_177 = {
    id: 177,
    title: "Python Libraries 177",
    duration: "7 min",
    level: "intermediate",
    section: "section-13",
    content: `
        <h2>⚡ Performance y Load Testing</h2>
        <p>Implementa testing de carga, stress testing y monitoreo de performance usando locust, psutil y librerías especializadas.</p>
        
        <h3>💻 Load testing avanzado:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/PerformanceLibrary.py

*** Variables ***
\${TARGET_URL}      https://httpbin.org
\${USERS_COUNT}     100
\${SPAWN_RATE}      10
\${TEST_DURATION}   60
\${CPU_THRESHOLD}   80.0
\${MEMORY_THRESHOLD} 85.0
\${RESPONSE_TIME_MAX} 2000
\${ERROR_RATE_MAX}  5.0

*** Test Cases ***
Test Load Testing Setup
    \${load_test}=    Create Load Test    \${TARGET_URL}    users=\${USERS_COUNT}    spawn_rate=\${SPAWN_RATE}
    Should Be True    \${load_test}[configured]
    Should Be Equal As Numbers    \${load_test}[users]    \${USERS_COUNT}
    Should Be Equal As Numbers    \${load_test}[spawn_rate]    \${SPAWN_RATE}
    Should Contain    \${load_test}[target_url]    httpbin
    Log    Load test setup: \${load_test}

Test Performance Monitoring
    Start Performance Monitor    interval=1    duration=\${TEST_DURATION}
    \${baseline}=    Get System Baseline    cpu=true    memory=true    disk=true
    Should Be True    \${baseline}[cpu_usage] < \${CPU_THRESHOLD}
    Should Be True    \${baseline}[memory_usage] < \${MEMORY_THRESHOLD}
    Should Be True    \${baseline}[disk_usage] < 90.0
    \${network_stats}=    Monitor Network Traffic    interface=eth0    duration=5
    Should Be True    \${network_stats}[bytes_sent] > 0
    Log    Performance monitoring: \${baseline}

Test Stress Testing Execution
    \${stress_result}=    Execute Stress Test    \${TARGET_URL}    duration=\${TEST_DURATION}    ramp_up=30
    Should Be True    \${stress_result}[completed]
    Should Be True    \${stress_result}[avg_response_time] < \${RESPONSE_TIME_MAX}
    Should Be True    \${stress_result}[error_rate] < \${ERROR_RATE_MAX}
    Should Be True    \${stress_result}[requests_per_second] > 10
    \${bottlenecks}=    Analyze Performance Bottlenecks    \${stress_result}
    Should Contain    \${bottlenecks}    analysis_complete
    Log    Stress test result: \${stress_result}

Test Response Time Analysis
    \${response_analysis}=    Analyze Response Times    \${TARGET_URL}    requests=50    threads=5
    Should Be True    \${response_analysis}[completed]
    Should Be True    \${response_analysis}[min_time] > 0
    Should Be True    \${response_analysis}[max_time] > \${response_analysis}[min_time]
    Should Be True    \${response_analysis}[avg_time] > 0
    Should Contain    \${response_analysis}[percentiles]    p95
    Should Contain    \${response_analysis}[percentiles]    p99
    Log    Response time analysis: \${response_analysis}

Test Resource Usage Tracking
    \${resource_tracker}=    Start Resource Tracking    process_name=python    interval=0.5
    Should Be True    \${resource_tracker}[started]
    Execute Heavy Operation    iterations=1000    complexity=high
    \${resource_usage}=    Stop Resource Tracking    \${resource_tracker}
    Should Be True    \${resource_usage}[peak_cpu] > 0
    Should Be True    \${resource_usage}[peak_memory] > 0
    Should Be True    \${resource_usage}[duration] > 0
    \${performance_report}=    Generate Performance Report    \${resource_usage}
    Should Contain    \${performance_report}    peak_cpu
    Log    Resource usage tracking: \${resource_usage}</code></pre>
        
        <h3>🎯 Práctica performance testing (5 min):</h3>
        <p>1. Crea PerformanceLibrary.py con create_load_test() usando locust programmatically</p>
        <p>2. Implementa start_performance_monitor() con psutil para system metrics</p>
        <p>3. Agrega get_system_baseline() para CPU, memory, disk usage</p>
        <p>4. Crea execute_stress_test() con requests concurrentes y timeouts</p>
        <p>5. Implementa analyze_response_times() con estadísticas detalladas</p>
        <p>6. Agrega monitor_network_traffic() usando psutil.net_io_counters()</p>
        <p>7. Crea analyze_performance_bottlenecks() con detection automático</p>
        <p>8. Implementa start_resource_tracking() para monitoreo proceso específico</p>
        <p>9. Agrega execute_heavy_operation() para simular carga CPU/memory</p>
        <p>10. Crea generate_performance_report() con métricas y gráficos</p>
        <p>11. Usa threading para requests concurrentes en load testing</p>
        <p>12. Implementa percentile calculation (p50, p95, p99) para response times</p>
        <p>13. Agrega alerting cuando métricas excedan thresholds configurados</p>
        <p>14. Crea CSV export de métricas para análisis posterior</p>
        <p>15. Implementa graceful shutdown de tests con cleanup automático</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar load testing programático con usuarios concurrentes</li>
                <li>Monitorear métricas del sistema (CPU, memoria, red) en tiempo real</li>
                <li>Analizar response times con percentiles y detección de bottlenecks</li>
                <li>Generar reportes automatizados de performance con alerting</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa psutil para métricas del sistema, requests con threading para load testing, y siempre establece thresholds realistas basados en SLAs del negocio.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 178 - Python Libraries 178</h3>
        <p>Aprenderás a crear librerías Python para testing de seguridad, análisis de vulnerabilidades y penetration testing automatizado.</p>
    `,
    topics: ["python", "libraries", "custom"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-176"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_177 = LESSON_177;
}