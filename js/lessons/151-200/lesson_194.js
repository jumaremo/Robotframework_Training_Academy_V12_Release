/**
 * Robot Framework Academy - Lesson 194
 * Kubernetes Testing Orchestration
 */

const LESSON_194 = {
    id: 194,
    title: "CI/CD 194",
    duration: "10 min",
    level: "advanced",
    section: "section-15",
    content: `
        <h2>☸️ Kubernetes RF Testing</h2>
        <p>Orquestar tests Robot Framework en clusters Kubernetes para máxima escalabilidad y disponibilidad.</p>
        
        <h3>💻 K8s Manifests + RF Commands:</h3>
        <pre><code class="robot">*** Variables ***
\${K8S_NAMESPACE}    robot-testing
\${POD_NAME}         rf-test-pod
\${SERVICE_NAME}     robot-service
\${DEPLOYMENT}       robot-deployment
\${CLUSTER_STATUS}   READY

*** Test Cases ***
Validate K8s Setup
    Should Be Equal    \${K8S_NAMESPACE}    robot-testing
    Should Contain     \${POD_NAME}         rf-test
    Should Be Equal    \${CLUSTER_STATUS}   READY
    Log                Kubernetes cluster configured
    Set Variable       \${K8S_READY}       True

Verify Pod Execution
    Should Be Equal    \${DEPLOYMENT}       robot-deployment
    Should Contain     \${SERVICE_NAME}     robot-service
    Should Be Equal    \${CLUSTER_STATUS}   READY
    Log                Pod execution validated
    Set Variable       \${PODS_RUNNING}     True

Monitor Cluster Metrics
    Log                Checking cluster performance
    Should Be True     \${CLUSTER_STATUS} == READY
    Should Contain     READY    READY
    Log                Cluster metrics acceptable
    Set Variable       \${MONITORING}       enabled</code></pre>
        
        <pre><code class="yaml"># robot-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: robot-tests
  namespace: robot-testing
spec:
  replicas: 3
  selector:
    matchLabels:
      app: robot-tests
  template:
    metadata:
      labels:
        app: robot-tests
    spec:
      containers:
      - name: robot-container
        image: robot-tests:latest
        command: ["robot"]
        args: ["--outputdir", "/results", "tests/"]
        volumeMounts:
        - name: test-results
          mountPath: /results
      volumes:
      - name: test-results
        emptyDir: {}</code></pre>

        <pre><code class="yaml"># robot-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: robot-service
  namespace: robot-testing
spec:
  selector:
    app: robot-tests
  ports:
  - port: 8080
    targetPort: 8080</code></pre>
        
        <h3>🎯 Práctica Kubernetes (7 min):</h3>
        <p>1. Crea namespace: <code>kubectl create namespace robot-testing</code></p>
        <p>2. Aplica deployment manifest con 3 replicas</p>
        <p>3. Configura service para exponer pods</p>
        <p>4. Verifica pods running: <code>kubectl get pods -n robot-testing</code></p>
        <p>5. Escala deployment a 5 replicas para mayor throughput</p>
        <p>6. Configura ConfigMap para variables de environment</p>
        <p>7. Implementa Secret para credenciales seguras</p>
        <p>8. Configura PersistentVolume para resultados</p>
        <p>9. Implementa HorizontalPodAutoscaler basado en CPU</p>
        <p>10. Configura NetworkPolicy para seguridad</p>
        <p>11. Implementa Job para execución one-time</p>
        <p>12. Configura CronJob para tests programados</p>
        <p>13. Implementa Ingress para acceso externo</p>
        <p>14. Configura monitoring con Prometheus</p>
        <p>15. Implementa logging centralizado con ELK</p>
        <p>16. Configura rollout strategy para deployments</p>
        <p>17. Implementa blue-green deployment strategy</p>
        <p>18. Configura resource limits y requests</p>
        <p>19. Implementa health checks y readiness probes</p>
        <p>20. Configura backup automático de resultados</p>
        <p>21. Implementa multi-cluster testing</p>
        <p>22. Configura disaster recovery procedures</p>
        <p>23. Valida performance vs deployments tradicionales</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Orquestar tests Robot Framework en Kubernetes</li>
                <li>Implementar escalabilidad automática y alta disponibilidad</li>
                <li>Configurar monitoring y logging centralizados</li>
                <li>Aplicar estrategias de deployment enterprise</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa HorizontalPodAutoscaler para escalar automáticamente based en carga de CPU y memoria.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 195 - GitOps y ArgoCD Integration</h3>
        <p>Implementarás GitOps workflows para deployment automático de tests usando ArgoCD.</p>
    `,
    topics: ["cicd", "jenkins", "docker"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-193"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_194 = LESSON_194;
}