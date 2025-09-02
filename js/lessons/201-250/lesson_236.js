/**
 * Robot Framework Academy - Lesson 236
 * Extensions Deployment Enterprise
 */

const LESSON_236 = {
    id: 236,
    title: "Extensions Deployment Enterprise",
    duration: "10 min",
    level: "advanced",
    section: "section-19",
    content: `
        <h2>🔧 Deployment Enterprise</h2>
        <p>Despliegue de listeners y extensions en entornos enterprise con alta disponibilidad.</p>
        
        <h3>💻 Docker deployment:</h3>
        <pre><code class="robot">*** Settings ***
Library    DeploymentListener.py

*** Variables ***
\${DOCKER_IMAGE}      rf-extensions:v2.1.0
\${KUBERNETES_NS}     robot-framework
\${HELM_CHART}        rf-listeners-chart
\${REPLICA_COUNT}     3
\${CPU_LIMIT}         500m
\${MEMORY_LIMIT}      1Gi
\${HEALTH_ENDPOINT}   /health
\${READINESS_PORT}    8080

*** Test Cases ***
Test Docker Container Deploy
    Set Global Variable    \${CONTAINER_ID}    abc123def456
    Should Not Be Empty    \${CONTAINER_ID}
    Log    Docker container deployed    INFO
    Should Be Equal    \${DOCKER_IMAGE}    rf-extensions:v2.1.0
    Set Suite Variable    \${CONTAINER_STATUS}    running
    Should Be Equal    \${CONTAINER_STATUS}    running
    Log    Container health check passed    INFO
    Should Not Be Empty    \${HEALTH_ENDPOINT}
    Set Test Variable    \${DOCKER_READY}    True
    Should Be Equal    \${DOCKER_READY}    True

Test Kubernetes Deployment
    Set Suite Variable    \${POD_COUNT}    3
    Should Be Equal As Numbers    \${POD_COUNT}    3
    Log    Kubernetes pods deployed    INFO
    Should Be Equal    \${KUBERNETES_NS}    robot-framework
    Set Test Variable    \${DEPLOYMENT_STATUS}    ready
    Should Be Equal    \${DEPLOYMENT_STATUS}    ready
    Should Be Equal As Numbers    \${REPLICA_COUNT}    3
    Set Global Variable    \${K8S_SERVICE}    rf-extensions-svc
    Should Be Equal    \${K8S_SERVICE}    rf-extensions-svc
    Log    Service discovery configured    INFO
    Set Suite Variable    \${K8S_READY}    True
    Should Be Equal    \${K8S_READY}    True

Test Resource Limits
    Set Global Variable    \${CPU_USAGE}    450m
    Should Be Equal    \${CPU_USAGE}    450m
    Log    CPU limits configured    INFO
    Should Be Equal    \${CPU_LIMIT}    500m
    Set Suite Variable    \${MEMORY_USAGE}    800Mi
    Should Be Equal    \${MEMORY_USAGE}    800Mi
    Should Be Equal    \${MEMORY_LIMIT}    1Gi
    Set Test Variable    \${RESOURCES_OK}    True
    Should Be Equal    \${RESOURCES_OK}    True
    Log    Resource allocation verified    INFO
    Should Be Equal As Numbers    \${READINESS_PORT}    8080
    Set Global Variable    \${LIMITS_READY}    True
    Should Be Equal    \${LIMITS_READY}    True

Test Health Monitoring
    Set Suite Variable    \${HEALTH_STATUS}    healthy
    Should Be Equal    \${HEALTH_STATUS}    healthy
    Log    Health monitoring active    INFO
    Should Be Equal    \${HEALTH_ENDPOINT}    /health
    Set Test Variable    \${LIVENESS_CHECK}    pass
    Should Be Equal    \${LIVENESS_CHECK}    pass
    Set Global Variable    \${READINESS_CHECK}    pass
    Should Be Equal    \${READINESS_CHECK}    pass
    Log    Probe checks successful    INFO
    Should Be Equal As Numbers    \${READINESS_PORT}    8080
    Set Suite Variable    \${MONITORING_READY}    True
    Should Be Equal    \${MONITORING_READY}    True

Test Rolling Update
    Set Global Variable    \${UPDATE_STRATEGY}    RollingUpdate
    Should Be Equal    \${UPDATE_STRATEGY}    RollingUpdate
    Log    Rolling update configured    INFO
    Set Suite Variable    \${MAX_UNAVAILABLE}    1
    Should Be Equal As Numbers    \${MAX_UNAVAILABLE}    1
    Set Test Variable    \${MAX_SURGE}    1
    Should Be Equal As Numbers    \${MAX_SURGE}    1
    Set Global Variable    \${ROLLOUT_STATUS}    progressing
    Should Be Equal    \${ROLLOUT_STATUS}    progressing
    Log    Zero downtime deployment    INFO
    Should Not Be Empty    \${HELM_CHART}
    Set Suite Variable    \${ROLLOUT_READY}    True
    Should Be Equal    \${ROLLOUT_READY}    True</code></pre>
        
        <h3>🎯 Práctica Deployment (7 min):</h3>
        <p>1. Crea Dockerfile para extension con Python base</p>
        <p>2. Configura multi-stage build para imagen optimizada</p>
        <p>3. Agrega health check endpoints para monitoring</p>
        <p>4. Implementa graceful shutdown para containers</p>
        <p>5. Configura Kubernetes deployment manifest</p>
        <p>6. Agrega service y ingress para networking</p>
        <p>7. Implementa ConfigMaps para configuración</p>
        <p>8. Configura Secrets para credenciales seguras</p>
        <p>9. Agrega resource limits y requests</p>
        <p>10. Implementa horizontal pod autoscaler</p>
        <p>11. Configura persistent volumes para logs</p>
        <p>12. Agrega network policies para seguridad</p>
        <p>13. Implementa Helm chart para deployment</p>
        <p>14. Configura CI/CD pipeline para auto-deploy</p>
        <p>15. Agrega monitoring con Prometheus metrics</p>
        <p>16. Testa rolling updates sin downtime</p>
        <p>17. Valida backup y disaster recovery</p>
        <p>18. Verifica compliance y security scans</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Desplegar extensions en entornos enterprise</li>
                <li>Configurar alta disponibilidad con Kubernetes</li>
                <li>Implementar estrategias de rollout zero-downtime</li>
                <li>Crear pipelines automatizados de deployment</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Para deployment enterprise: Docker + Kubernetes + Helm + CI/CD = extensions desplegadas automáticamente con 99.9% uptime y rollback instantáneo.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 237 - Extensions Development Project</h3>
        <p>Desarrollarás un proyecto capstone completo: extension personalizada con deployment enterprise y integración con todo el stack tecnológico.</p>
    `,
    topics: ["listeners", "extensions", "hooks"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-235"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_236 = LESSON_236;
}