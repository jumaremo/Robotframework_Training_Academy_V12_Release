/**
 * Robot Framework Academy - Lesson 199
 * Chaos Engineering y Resilience
 */

const LESSON_199 = {
    id: 199,
    title: "CI/CD 199",
    duration: "10 min",
    level: "advanced",
    section: "section-15",
    content: `
        <h2>🔥 Chaos Engineering Testing</h2>
        <p>Implementar chaos engineering para validar resilience de applications bajo fallos controlados con Robot Framework.</p>
        
        <h3>💻 Chaos Tests + RF Commands:</h3>
        <pre><code class="robot">*** Variables ***
\${CHAOS_STATUS}      RUNNING
\${SYSTEM_RESILIENCE} HIGH
\${RECOVERY_TIME}     30
\${FAILURE_RATE}      0.1
\${CHAOS_TOOL}        chaostoolkit

*** Test Cases ***
Validate Chaos Setup
    Should Be Equal    \${CHAOS_STATUS}      RUNNING
    Should Be Equal    \${SYSTEM_RESILIENCE} HIGH
    Should Be True     \${RECOVERY_TIME} < 60
    Log                Chaos engineering configured
    Set Variable       \${CHAOS_READY}      True

Verify Resilience Testing
    Should Be Equal    \${CHAOS_TOOL}        chaostoolkit
    Should Be True     \${FAILURE_RATE} < 0.2
    Should Be True     \${RECOVERY_TIME} < 45
    Log                Resilience testing validated
    Set Variable       \${RESILIENCE_OK}    True

Monitor System Recovery
    Log                Checking recovery metrics
    Should Be True     \${RECOVERY_TIME} < 30
    Should Contain     HIGH    HIGH
    Log                Recovery metrics acceptable
    Set Variable       \${RECOVERY_READY}   True</code></pre>
        
        <pre><code class="yaml"># chaos-experiment.yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: robot-chaos-test
  namespace: robot-testing
spec:
  appinfo:
    appns: robot-testing
    applabel: "app=robot-tests"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        - name: TOTAL_CHAOS_DURATION
          value: "60"
        - name: CHAOS_INTERVAL
          value: "10"
        - name: FORCE
          value: "false"</code></pre>

        <pre><code class="json"># chaostoolkit-experiment.json
{
  "title": "Robot Framework Resilience Test",
  "description": "Validate system resilience under chaos",
  "steady-state-hypothesis": {
    "title": "Application responds normally",
    "probes": [
      {
        "name": "app-responds-to-requests",
        "type": "probe",
        "tolerance": 200,
        "provider": {
          "type": "http",
          "url": "http://robot-service:8080/health"
        }
      }
    ]
  },
  "method": [
    {
      "name": "terminate-random-pod",
      "type": "action",
      "provider": {
        "type": "python",
        "module": "chaosk8s.pod.actions",
        "func": "terminate_pods"
      }
    }
  ]
}</code></pre>
        
        <h3>🎯 Práctica Chaos Engineering (7 min):</h3>
        <p>1. Instala Litmus: <code>kubectl apply -f https://litmuschaos.github.io/litmus/litmus-operator-v2.0.0.yaml</code></p>
        <p>2. Configura chaos experiments con pod termination</p>
        <p>3. Implementa network latency injection experiments</p>
        <p>4. Configura memory stress testing con Litmus</p>
        <p>5. Ejecuta CPU stress experiments durante load testing</p>
        <p>6. Implementa disk filling experiments para storage resilience</p>
        <p>7. Configura node failure simulation experiments</p>
        <p>8. Implementa network partition testing</p>
        <p>9. Configura database connection chaos testing</p>
        <p>10. Implementa service mesh chaos con Istio</p>
        <p>11. Configura DNS resolution failure experiments</p>
        <p>12. Implementa container resource exhaustion testing</p>
        <p>13. Configura external dependency failure simulation</p>
        <p>14. Implementa time-based chaos experiments</p>
        <p>15. Configura security chaos testing</p>
        <p>16. Implementa compliance chaos validation</p>
        <p>17. Configura automated recovery verification</p>
        <p>18. Implementa chaos scheduling con CronJobs</p>
        <p>19. Configura blast radius limitation</p>
        <p>20. Implementa chaos metrics collection</p>
        <p>21. Configura incident response automation</p>
        <p>22. Implementa chaos engineering dashboards</p>
        <p>23. Valida ROI de chaos testing vs downtime costs</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar chaos engineering con Litmus y ChaosToolkit</li>
                <li>Configurar experimentos de resilience automáticos</li>
                <li>Crear chaos tests integrados con pipelines CI/CD</li>
                <li>Aplicar principles of resilience engineering</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Empieza con experimentos pequeños y blast radius limitado antes de chaos engineering full-scale.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 200 - Multi-Cloud Testing Strategies</h3>
        <p>Implementarás estrategias de testing cross-cloud para applications distribuidas globalmente.</p>
    `,
    topics: ["cicd", "jenkins", "docker"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-198"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_199 = LESSON_199;
}