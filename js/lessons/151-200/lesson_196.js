/**
 * Robot Framework Academy - Lesson 196
 * Monitoring y Observability
 */

const LESSON_196 = {
    id: 196,
    title: "CI/CD 196",
    duration: "10 min",
    level: "advanced",
    section: "section-15",
    content: `
        <h2>📊 Monitoring RF Testing</h2>
        <p>Implementar stack completo de monitoring para tests Robot Framework con métricas, alertas y observability.</p>
        
        <h3>💻 Prometheus Config + RF Commands:</h3>
        <pre><code class="robot">*** Variables ***
\${PROMETHEUS_URL}   http://prometheus:9090
\${GRAFANA_URL}      http://grafana:3000
\${ALERT_MANAGER}    http://alertmanager:9093
\${METRIC_ENDPOINT}  /metrics
\${HEALTH_STATUS}    UP

*** Test Cases ***
Validate Monitoring Setup
    Should Be Equal    \${PROMETHEUS_URL}   http://prometheus:9090
    Should Contain     \${GRAFANA_URL}      grafana:3000
    Should Be Equal    \${HEALTH_STATUS}    UP
    Log                Monitoring stack configured
    Set Variable       \${MONITORING_OK}    True

Verify Metrics Collection
    Should Be Equal    \${HEALTH_STATUS}    UP
    Should Contain     \${METRIC_ENDPOINT}  /metrics
    Should Contain     \${ALERT_MANAGER}    alertmanager
    Log                Metrics collection validated
    Set Variable       \${METRICS_ACTIVE}   True

Monitor Alert System
    Log                Checking alert system
    Should Be True     \${HEALTH_STATUS} == UP
    Should Contain     UP    UP
    Log                Alert system operational
    Set Variable       \${ALERTS_ENABLED}   True</code></pre>
        
        <pre><code class="yaml"># prometheus.yml
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'robot-tests'
    static_configs:
      - targets: ['robot-service:8080']
    metrics_path: /metrics
    scrape_interval: 30s
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true</code></pre>

        <pre><code class="yaml"># grafana-dashboard.json
{
  "dashboard": {
    "title": "Robot Framework Tests",
    "panels": [
      {
        "title": "Test Success Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "robot_tests_passed / robot_tests_total * 100"
          }
        ]
      },
      {
        "title": "Execution Time",
        "type": "graph", 
        "targets": [
          {
            "expr": "robot_execution_duration_seconds"
          }
        ]
      }
    ]
  }
}</code></pre>
        
        <h3>🎯 Práctica Monitoring (7 min):</h3>
        <p>1. Deploy Prometheus: <code>kubectl apply -f prometheus-deployment.yaml</code></p>
        <p>2. Configura scrape configs para Robot Framework metrics</p>
        <p>3. Deploy Grafana con dashboards predefinidos</p>
        <p>4. Configura AlertManager para notificaciones</p>
        <p>5. Crea custom metrics en tests Robot Framework</p>
        <p>6. Configura service discovery para pods dinámicos</p>
        <p>7. Implementa retention policies para métricas</p>
        <p>8. Configura alertas por test failure rate > 5%</p>
        <p>9. Implementa SLA monitoring con uptime checks</p>
        <p>10. Configura log aggregation con ELK stack</p>
        <p>11. Implementa distributed tracing con Jaeger</p>
        <p>12. Configura anomaly detection automático</p>
        <p>13. Implementa capacity planning metrics</p>
        <p>14. Configura multi-cluster monitoring</p>
        <p>15. Implementa cost monitoring y optimization</p>
        <p>16. Configura compliance reporting automático</p>
        <p>17. Implementa synthetic monitoring con Blackbox</p>
        <p>18. Configura chaos engineering metrics</p>
        <p>19. Implementa performance regression detection</p>
        <p>20. Configura executive dashboards con KPIs</p>
        <p>21. Implementa incident response automation</p>
        <p>22. Configura predictive alerting con ML</p>
        <p>23. Valida ROI de monitoring vs costos infraestructura</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar monitoring completo para Robot Framework</li>
                <li>Configurar alertas proactivas y SLA tracking</li>
                <li>Crear dashboards ejecutivos con métricas clave</li>
                <li>Aplicar observability patterns para troubleshooting</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa recording rules en Prometheus para pre-calcular métricas complejas y optimizar performance de dashboards.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 197 - Security y Compliance Testing</h3>
        <p>Implementarás security scanning y compliance validation en pipelines Robot Framework.</p>
    `,
    topics: ["cicd", "jenkins", "docker"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-195"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_196 = LESSON_196;
}