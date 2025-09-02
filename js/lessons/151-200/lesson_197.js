/**
 * Robot Framework Academy - Lesson 197
 * Security y Compliance Testing
 */

const LESSON_197 = {
    id: 197,
    title: "CI/CD 197",
    duration: "10 min",
    level: "advanced",
    section: "section-15",
    content: `
        <h2>🔒 Security RF Testing</h2>
        <p>Implementar security scanning y compliance validation en pipelines Robot Framework para aplicaciones enterprise.</p>
        
        <h3>💻 Security Scans + RF Commands:</h3>
        <pre><code class="robot">*** Variables ***
\${SECURITY_SCAN}    PASSED
\${VULNERABILITY_COUNT}  0
\${COMPLIANCE_STATUS}    COMPLIANT
\${SCAN_TOOL}        trivy
\${SEVERITY_LEVEL}   HIGH

*** Test Cases ***
Validate Security Setup
    Should Be Equal    \${SECURITY_SCAN}    PASSED
    Should Be True     \${VULNERABILITY_COUNT} == 0
    Should Be Equal    \${COMPLIANCE_STATUS}    COMPLIANT
    Log                Security scanning configured
    Set Variable       \${SECURITY_OK}       True

Verify Vulnerability Scan
    Should Be Equal    \${SCAN_TOOL}         trivy
    Should Be True     \${VULNERABILITY_COUNT} < 5
    Should Be Equal    \${SEVERITY_LEVEL}    HIGH
    Log                Vulnerability scan validated
    Set Variable       \${SCAN_COMPLETE}     True

Monitor Compliance Status
    Log                Checking compliance metrics
    Should Be True     \${COMPLIANCE_STATUS} == COMPLIANT
    Should Contain     COMPLIANT    COMPLIANT
    Log                Compliance status acceptable
    Set Variable       \${AUDIT_READY}       True</code></pre>
        
        <pre><code class="yaml"># security-pipeline.yaml
name: Security Testing
on: [push, pull_request]
jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Trivy Vulnerability Scanner
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: robot-tests:latest
        format: 'sarif'
        output: 'trivy-results.sarif'
    - name: OWASP ZAP Baseline Scan
      uses: zaproxy/action-baseline@v0.7.0
      with:
        target: 'http://app.example.com'
    - name: Run Robot Security Tests
      run: robot --include security tests/security/</code></pre>

        <pre><code class="yaml"># compliance-check.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: compliance-rules
data:
  security-policy.rego: |
    package kubernetes.security
    deny[msg] {
      input.kind == "Pod"
      not input.spec.securityContext.runAsNonRoot
      msg := "Containers must not run as root"
    }
    deny[msg] {
      input.kind == "Pod"
      not input.spec.containers[_].securityContext.readOnlyRootFilesystem
      msg := "Root filesystem must be read-only"
    }</code></pre>
        
        <h3>🎯 Práctica Security (7 min):</h3>
        <p>1. Instala Trivy scanner: <code>curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh</code></p>
        <p>2. Ejecuta vulnerability scan en imagen Docker</p>
        <p>3. Configura OWASP ZAP para web application scanning</p>
        <p>4. Implementa SAST scanning con SonarQube</p>
        <p>5. Configura dependency scanning para librerías Python</p>
        <p>6. Implementa secret detection con GitLeaks</p>
        <p>7. Configura infrastructure as code scanning con Checkov</p>
        <p>8. Implementa container image signing con Cosign</p>
        <p>9. Configura policy enforcement con Open Policy Agent</p>
        <p>10. Implementa network security testing con Nmap</p>
        <p>11. Configura API security testing con OWASP ZAP</p>
        <p>12. Implementa compliance validation con InSpec</p>
        <p>13. Configura security chaos engineering</p>
        <p>14. Implementa threat modeling automation</p>
        <p>15. Configura penetration testing automation</p>
        <p>16. Implementa security metrics collection</p>
        <p>17. Configura incident response automation</p>
        <p>18. Implementa vulnerability management workflow</p>
        <p>19. Configura security training validation</p>
        <p>20. Implementa zero-trust architecture testing</p>
        <p>21. Configura compliance reporting automation</p>
        <p>22. Implementa security performance benchmarking</p>
        <p>23. Valida ROI de security testing vs risk mitigation</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar security scanning en pipelines Robot Framework</li>
                <li>Configurar compliance validation automática</li>
                <li>Crear security tests integrados con CI/CD</li>
                <li>Aplicar security shift-left principles</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Integra security scanning early en el pipeline para detectar vulnerabilidades antes de deployment.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 198 - Performance Testing at Scale</h3>
        <p>Implementarás load testing y performance validation para applications bajo stress extremo.</p>
    `,
    topics: ["cicd", "jenkins", "docker"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-196"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_197 = LESSON_197;
}