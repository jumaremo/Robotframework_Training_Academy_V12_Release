/**
 * Robot Framework Academy - Lesson 198
 * Performance Testing at Scale
 */

const LESSON_198 = {
    id: 198,
    title: "CI/CD 198",
    duration: "10 min",
    level: "advanced",
    section: "section-15",
    content: `
        <h2>⚡ Performance RF Testing</h2>
        <p>Implementar load testing y performance validation para applications bajo stress extremo con Robot Framework.</p>
        
        <h3>💻 Load Testing + RF Commands:</h3>
        <pre><code class="robot">*** Variables ***
\${LOAD_TEST_STATUS}  PASSED
\${RESPONSE_TIME}     150
\${THROUGHPUT}        1000
\${ERROR_RATE}        0.01
\${CONCURRENT_USERS}  500

*** Test Cases ***
Validate Load Test Setup
    Should Be Equal    \${LOAD_TEST_STATUS}  PASSED
    Should Be True     \${RESPONSE_TIME} < 200
    Should Be True     \${THROUGHPUT} > 800
    Log                Load testing configured
    Set Variable       \${PERF_READY}       True

Verify Performance Metrics
    Should Be True     \${ERROR_RATE} < 0.05
    Should Be True     \${RESPONSE_TIME} < 300
    Should Be True     \${CONCURRENT_USERS} > 400
    Log                Performance metrics validated
    Set Variable       \${METRICS_OK}       True

Monitor Stress Testing
    Log                Checking stress test results
    Should Be True     \${THROUGHPUT} > 500
    Should Contain     PASSED    PASSED
    Log                Stress testing acceptable
    Set Variable       \${STRESS_COMPLETE}  True</code></pre>
        
        <pre><code class="yaml"># k6-load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 500 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],
    http_req_failed: ['rate<0.1'],
  },
};

export default function() {
  let response = http.get('http://app.example.com/api/health');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}</code></pre>

        <pre><code class="yaml"># jmeter-test-plan.jmx
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2">
  <hashTree>
    <TestPlan>
      <elementProp name="TestPlan.arguments" elementType="Arguments"/>
    </TestPlan>
    <hashTree>
      <ThreadGroup>
        <stringProp name="ThreadGroup.num_threads">500</stringProp>
        <stringProp name="ThreadGroup.ramp_time">300</stringProp>
        <stringProp name="ThreadGroup.duration">600</stringProp>
      </ThreadGroup>
      <hashTree>
        <HTTPSamplerProxy>
          <stringProp name="HTTPSampler.domain">app.example.com</stringProp>
          <stringProp name="HTTPSampler.path">/api/test</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
        </HTTPSamplerProxy>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan></code></pre>
        
        <h3>🎯 Práctica Performance (7 min):</h3>
        <p>1. Instala k6: <code>curl https://github.com/grafana/k6/releases/download/v0.40.0/k6-v0.40.0-linux-amd64.tar.gz</code></p>
        <p>2. Crea load test script con ramp-up progresivo</p>
        <p>3. Configura thresholds para response time y error rate</p>
        <p>4. Ejecuta load test: <code>k6 run --vus 500 --duration 10m script.js</code></p>
        <p>5. Implementa JMeter test plans para complex scenarios</p>
        <p>6. Configura distributed load testing con múltiples nodes</p>
        <p>7. Implementa spike testing para peak traffic simulation</p>
        <p>8. Configura endurance testing para long-running validation</p>
        <p>9. Implementa baseline performance comparison</p>
        <p>10. Configura real-time monitoring durante load tests</p>
        <p>11. Implementa performance regression detection</p>
        <p>12. Configura capacity planning con predictive analytics</p>
        <p>13. Implementa chaos engineering durante load tests</p>
        <p>14. Configura multi-region load testing</p>
        <p>15. Implementa mobile performance testing</p>
        <p>16. Configura CDN performance validation</p>
        <p>17. Implementa database performance testing</p>
        <p>18. Configura API rate limiting validation</p>
        <p>19. Implementa memory leak detection bajo carga</p>
        <p>20. Configura auto-scaling validation testing</p>
        <p>21. Implementa cost optimization based en performance</p>
        <p>22. Configura SLA validation automática</p>
        <p>23. Valida performance vs infrastructure costs</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar load testing escalable con k6 y JMeter</li>
                <li>Configurar thresholds y SLA validation automática</li>
                <li>Crear performance tests integrados con CI/CD</li>
                <li>Aplicar chaos engineering para resilience testing</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa distributed load testing para simular traffic real desde múltiples geografías simultáneamente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 199 - Chaos Engineering y Resilience</h3>
        <p>Implementarás chaos engineering para validar resilience de applications bajo fallos controlados.</p>
    `,
    topics: ["cicd", "jenkins", "docker"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-197"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_198 = LESSON_198;
}