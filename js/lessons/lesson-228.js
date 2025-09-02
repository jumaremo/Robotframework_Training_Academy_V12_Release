/**
 * Robot Framework Academy - Lesson 228
 * DevSecOps Integration Testing
 */

const LESSON_228 = {
    id: 228,
    title: "DevSecOps Integration Testing",
    duration: "10 min",
    level: "advanced",
    section: "section-18",
    content: `
        <h2>🔐 DevSecOps Integration</h2>
        <p>Testing de seguridad integrado en pipelines DevOps con shift-left security, compliance automation y security scanning.</p>
        
        <h3>💻 Security Pipeline:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    DevSecOps Integration Testing - Security in CI/CD Pipelines
Library          SeleniumLibrary
Library          RequestsLibrary
Library          Collections
Library          Process
Library          OperatingSystem
Resource         ../resources/security/sast_keywords.robot
Resource         ../resources/security/dast_keywords.robot
Resource         ../resources/compliance/policy_keywords.robot
Variables        ../config/devsecops.yaml
Suite Setup      Initialize DevSecOps Testing
Suite Teardown   Generate Security Report

*** Variables ***
\${SONARQUBE_URL}         http://sonarqube:9000
\${OWASP_ZAP_URL}         http://zap:8080
\${VAULT_URL}             http://vault:8200
\${HARBOR_REGISTRY}       https://harbor.registry.com
\${TWISTLOCK_URL}         http://twistlock:8083
\${FALCO_ENDPOINT}        http://falco:8765
\${POLICY_ENGINE}         http://opa:8181
\${CI_PIPELINE_ID}        pipeline-12345
\${SECURITY_THRESHOLD}    HIGH
\${COMPLIANCE_STANDARD}   PCI-DSS
\${IMAGE_NAME}            test-app:latest
\${SECRET_PATH}           /secret/test-app
\${POLICY_BUNDLE}         security-policies.tar.gz
\${SCAN_REPORT_PATH}      /reports/security-scan.json

*** Test Cases ***
Test Static Code Security Analysis
    [Documentation]    SAST integration in CI/CD pipeline testing
    [Tags]             sast    static-analysis    security-scanning
    
    # Code Quality Gate
    Trigger SAST Scan            \${SONARQUBE_URL}    project=test-app    branch=main
    Wait For Scan Completion     \${SONARQUBE_URL}    \${CI_PIPELINE_ID}    timeout=600s
    \${scan_results}=            Get SAST Results     \${SONARQUBE_URL}    test-app
    
    Validate Security Hotspots   \${scan_results}     blocker=0    critical<=2
    Check Code Coverage          \${scan_results}     min_coverage=80%
    Validate Vulnerability Rules \${scan_results}     owasp_top10=compliant
    
    # Security Quality Gate
    \${gate_status}=             Get Quality Gate Status    \${SONARQUBE_URL}    test-app
    Should Be Equal             \${gate_status}    PASSED
    Generate SAST Report        \${scan_results}    format=json    path=\${SCAN_REPORT_PATH}
    
    # Pipeline Security Decision
    Evaluate Pipeline Continue   \${scan_results}    threshold=\${SECURITY_THRESHOLD}
    Block Pipeline If Critical   \${scan_results}    critical_vulnerabilities>0

Test Container Image Security
    [Documentation]    Container image vulnerability scanning and policy enforcement
    [Tags]             container-security    image-scanning    harbor
    
    # Image Build Security
    Build Secure Container       \${IMAGE_NAME}    dockerfile=Dockerfile.security
    Scan Container Vulnerabilities    \${HARBOR_REGISTRY}    \${IMAGE_NAME}
    Wait For Scan Results        \${HARBOR_REGISTRY}    \${IMAGE_NAME}    timeout=300s
    
    \${scan_report}=             Get Image Scan Report    \${HARBOR_REGISTRY}    \${IMAGE_NAME}
    Validate CVE Severity        \${scan_report}    critical=0    high<=3
    Check Base Image Security    \${scan_report}    base_image_approved=true
    
    # Image Policy Enforcement
    Apply Image Policy           \${HARBOR_REGISTRY}    policy=production-ready
    Test Image Deployment        \${IMAGE_NAME}    namespace=production    should_succeed=true
    Test Vulnerable Image        vulnerable-image:latest    should_fail=true
    
    # Runtime Security Scanning
    Deploy Container Runtime     \${IMAGE_NAME}    runtime_security=enabled
    Monitor Runtime Behavior     \${IMAGE_NAME}    anomaly_detection=active
    Validate Security Compliance \${IMAGE_NAME}    cis_benchmarks=passed

Test Dynamic Security Testing
    [Documentation]    DAST integration and runtime security testing
    [Tags]             dast    dynamic-testing    penetration-testing
    
    # Application DAST Scan
    Deploy Test Application      test-app    environment=staging
    Wait For Application Ready   test-app    timeout=300s
    Configure DAST Scanner       \${OWASP_ZAP_URL}    target=https://test-app.staging.com
    
    Start Active DAST Scan       \${OWASP_ZAP_URL}    scan_policy=full-scan
    Wait For DAST Completion     \${OWASP_ZAP_URL}    timeout=1800s
    \${dast_results}=            Get DAST Results    \${OWASP_ZAP_URL}
    
    Validate OWASP Top 10        \${dast_results}    all_categories=tested
    Check Authentication Bypass  \${dast_results}    bypass_attempts=0
    Validate XSS Protection      \${dast_results}    xss_vulnerabilities=0
    Check SQL Injection          \${dast_results}    sql_injection=protected
    
    # API Security Testing
    Test API Endpoints Security  \${dast_results}    api_endpoints>0
    Validate API Authentication  \${dast_results}    auth_required=true
    Check Rate Limiting          \${dast_results}    rate_limits=enforced

Test Secrets Management
    [Documentation]    Secrets management and secure configuration testing
    [Tags]             secrets    vault    configuration-security
    
    # Vault Integration Testing
    Initialize Vault Connection  \${VAULT_URL}    auth_method=kubernetes
    Validate Vault Policies      \${VAULT_URL}    policy=test-app-policy
    Store Test Secret           \${VAULT_URL}    path=\${SECRET_PATH}    secret=\${TEST_SECRET}
    
    # Application Secret Injection
    Deploy App With Secrets      test-app    vault_integration=enabled
    Validate Secret Mount        test-app    secret_path=\${SECRET_PATH}
    Check Secret Rotation        test-app    rotation_enabled=true
    
    # Secret Security Validation
    Test Secret Access Control   \${VAULT_URL}    unauthorized_access=denied
    Validate Secret Encryption   \${VAULT_URL}    encryption=AES256
    Check Audit Logging         \${VAULT_URL}    secret_access_logged=true
    
    # Configuration Security
    Scan Configuration Files     test-app    hardcoded_secrets=0
    Validate Environment Config  test-app    secure_defaults=applied
    Check TLS Configuration      test-app    tls_version>=1.2

Test Compliance Automation
    [Documentation]    Automated compliance testing and policy enforcement
    [Tags]             compliance    policy    automation
    
    # Policy as Code Testing
    Load Policy Bundle          \${POLICY_ENGINE}    bundle=\${POLICY_BUNDLE}
    Validate Policy Syntax      \${POLICY_ENGINE}    syntax_errors=0
    Test Policy Logic           \${POLICY_ENGINE}    test_cases_passed=100%
    
    # Compliance Validation
    Run Compliance Scan         \${POLICY_ENGINE}    standard=\${COMPLIANCE_STANDARD}
    \${compliance_results}=     Get Compliance Report    \${POLICY_ENGINE}
    Validate Control Implementation    \${compliance_results}    controls_met>=90%
    
    # Runtime Policy Enforcement
    Deploy Policy Agent         test-app    opa_sidecar=enabled
    Test Policy Decision        test-app    request=valid    decision=allow
    Test Policy Violation       test-app    request=malicious    decision=deny
    
    # Audit and Reporting
    Generate Compliance Report  \${compliance_results}    format=pdf
    Store Audit Evidence       \${compliance_results}    retention=7_years
    Schedule Compliance Review  \${compliance_results}    frequency=quarterly</code></pre>
        
        <h3>🎯 Práctica DevSecOps (7 min):</h3>
        <p>1. Integra SonarQube en pipeline CI/CD para SAST scanning</p>
        <p>2. Configura quality gates con security thresholds</p>
        <p>3. Implementa container image scanning con Harbor/Twistlock</p>
        <p>4. Configura policy enforcement para vulnerable images</p>
        <p>5. Integra OWASP ZAP para DAST en staging environment</p>
        <p>6. Implementa API security testing automatizado</p>
        <p>7. Configura HashiCorp Vault para secrets management</p>
        <p>8. Testa secret rotation y access control policies</p>
        <p>9. Implementa policy as code con Open Policy Agent</p>
        <p>10. Configura compliance automation con frameworks estándar</p>
        <p>11. Testa runtime security monitoring con Falco</p>
        <p>12. Implementa security incident response automation</p>
        <p>13. Configura security metrics dashboards</p>
        <p>14. Testa infrastructure as code security scanning</p>
        <p>15. Implementa dependency scanning para librerías</p>
        <p>16. Configura license compliance checking</p>
        <p>17. Testa security regression testing en deployments</p>
        <p>18. Implementa security chaos engineering</p>
        <p>19. Configura threat modeling automatizado</p>
        <p>20. Testa security training pipeline validation</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar security testing integrado en pipelines CI/CD</li>
                <li>Configurar SAST/DAST scanning con quality gates</li>
                <li>Dominar container security y policy enforcement</li>
                <li>Establecer compliance automation y audit trails</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Implementa "fail fast" security gates early en pipeline - cheaper fix vulnerabilities en development que en production.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 229 - Enterprise Architecture Project</h3>
        <p>Completarás la sección con un proyecto capstone integrando todos los patrones enterprise: microservicios, containers, performance, security y DevSecOps.</p>
    `,
    topics: ["enterprise", "architecture", "scalability"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-227"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_228 = LESSON_228;
}