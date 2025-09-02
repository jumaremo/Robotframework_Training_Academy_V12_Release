/**
 * Robot Framework Academy - Lesson 226
 * Service Mesh Testing
 */

const LESSON_226 = {
    id: 226,
    title: "Service Mesh Testing",
    duration: "10 min",
    level: "advanced",
    section: "section-18",
    content: `
        <h2>🕸️ Service Mesh</h2>
        <p>Testing avanzado de service mesh con Istio, traffic management, security policies y observability patterns.</p>
        
        <h3>💻 Testing Istio:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    Service Mesh Testing - Istio Traffic Management & Security
Library          SeleniumLibrary
Library          RequestsLibrary
Library          Collections
Library          Process
Library          SSHLibrary
Resource         ../resources/istio/gateway_keywords.robot
Resource         ../resources/istio/virtual_service_keywords.robot
Resource         ../resources/observability/jaeger_keywords.robot
Variables        ../config/service_mesh.yaml
Suite Setup      Initialize Service Mesh Testing
Suite Teardown   Cleanup Service Mesh Resources

*** Variables ***
\${ISTIO_GATEWAY_URL}     https://istio-gateway.cluster.local
\${ISTIO_PROXY_URL}       http://istio-proxy:15000
\${JAEGER_URL}            http://jaeger:16686
\${GRAFANA_URL}           http://grafana:3000  
\${KIALI_URL}             http://kiali:20001
\${PROMETHEUS_URL}        http://prometheus:9090
\${SERVICE_A}             service-a.default.svc.cluster.local:8080
\${SERVICE_B}             service-b.default.svc.cluster.local:8080
\${SERVICE_C}             service-c.default.svc.cluster.local:8080
\${NAMESPACE}             testing
\${VIRTUAL_SERVICE_NAME}  test-virtual-service
\${DESTINATION_RULE}      test-destination-rule
\${GATEWAY_NAME}          test-gateway
\${POLICY_NAME}           test-auth-policy
\${CERT_NAME}             test-tls-cert

*** Test Cases ***
Test Traffic Routing Rules
    [Documentation]    Service mesh traffic routing and load balancing testing
    [Tags]             traffic-routing    virtual-service    istio
    
    # Virtual Service Configuration
    Create Virtual Service    \${VIRTUAL_SERVICE_NAME}    \${SERVICE_A}
    Configure Route Rules     \${VIRTUAL_SERVICE_NAME}    weight_v1=80    weight_v2=20
    Apply Virtual Service     \${VIRTUAL_SERVICE_NAME}    \${NAMESPACE}
    Wait For Config Applied   \${VIRTUAL_SERVICE_NAME}    timeout=60s
    
    # Traffic Distribution Testing
    Generate Test Traffic     \${ISTIO_GATEWAY_URL}/api    requests=1000
    \${v1_traffic}=           Get Version Traffic    v1    \${SERVICE_A}
    \${v2_traffic}=           Get Version Traffic    v2    \${SERVICE_A}
    
    Should Be True           \${v1_traffic} >= 750    # 80% ± tolerance
    Should Be True           \${v1_traffic} <= 850
    Should Be True           \${v2_traffic} >= 150    # 20% ± tolerance  
    Should Be True           \${v2_traffic} <= 250
    
    # Header-Based Routing
    Configure Header Routing  \${VIRTUAL_SERVICE_NAME}    header=user-type    value=premium
    Send Request With Header  \${ISTIO_GATEWAY_URL}/api    user-type=premium
    Validate Request Routed   premium_service    \${SERVICE_A}

Test Circuit Breaker Configuration
    [Documentation]    Service mesh circuit breaker and resilience testing
    [Tags]             circuit-breaker    destination-rule    resilience
    
    # Destination Rule Setup
    Create Destination Rule   \${DESTINATION_RULE}    \${SERVICE_B}
    Configure Circuit Breaker \${DESTINATION_RULE}    consecutive_errors=3    interval=30s    base_ejection_time=30s
    Apply Destination Rule    \${DESTINATION_RULE}    \${NAMESPACE}
    Wait For Rule Applied     \${DESTINATION_RULE}    timeout=60s
    
    # Normal Operation Testing
    Send Requests To Service  \${SERVICE_B}    count=100    success_rate=100%
    Check Circuit Breaker     \${SERVICE_B}    state=CLOSED
    
    # Failure Simulation
    Inject Service Failures   \${SERVICE_B}    failure_rate=100%    duration=60s
    Send Requests To Service  \${SERVICE_B}    count=10    expect_failures=true
    Check Circuit Breaker     \${SERVICE_B}    state=OPEN
    
    # Recovery Testing
    Stop Failure Injection    \${SERVICE_B}
    Wait For Circuit Recovery \${SERVICE_B}    timeout=120s
    Check Circuit Breaker     \${SERVICE_B}    state=CLOSED
    Send Requests To Service  \${SERVICE_B}    count=50    success_rate=100%

Test mTLS Security Policies
    [Documentation]    Service mesh mutual TLS and security policy testing
    [Tags]             mtls    security    authentication
    
    # mTLS Configuration
    Enable mTLS For Service   \${SERVICE_C}    mode=STRICT
    Wait For mTLS Enabled     \${SERVICE_C}    timeout=90s
    Validate mTLS Status      \${SERVICE_C}    enabled=true
    
    # Service-to-Service Authentication
    Test Service Communication    \${SERVICE_A}    \${SERVICE_C}    should_succeed=true
    Check TLS Certificate         \${SERVICE_C}    valid=true    issuer=cluster.local
    
    # Authorization Policy Testing
    Create Authorization Policy   \${POLICY_NAME}    allow_service=\${SERVICE_A}    deny_others=true
    Apply Authorization Policy    \${POLICY_NAME}    \${SERVICE_C}    \${NAMESPACE}
    Wait For Policy Applied       \${POLICY_NAME}    timeout=60s
    
    Test Service Communication    \${SERVICE_A}    \${SERVICE_C}    should_succeed=true
    Test Service Communication    \${SERVICE_B}    \${SERVICE_C}    should_fail=true
    Validate Authorization Logs   \${SERVICE_C}    denied_requests>0

Test Gateway Configuration
    [Documentation]    Istio gateway and ingress testing
    [Tags]             gateway    ingress    external-traffic
    
    # Gateway Setup
    Create Istio Gateway      \${GATEWAY_NAME}    hosts=test.example.com    port=443
    Configure TLS Certificate \${GATEWAY_NAME}    \${CERT_NAME}    tls_mode=SIMPLE
    Apply Gateway Config      \${GATEWAY_NAME}    \${NAMESPACE}
    Wait For Gateway Ready    \${GATEWAY_NAME}    timeout=120s
    
    # External Traffic Testing
    Send HTTPS Request        https://test.example.com/api    headers=\${TEST_HEADERS}
    Validate TLS Termination  \${GATEWAY_NAME}    certificate_valid=true
    Check Request Routing     \${GATEWAY_NAME}    routed_to=\${SERVICE_A}
    
    # SNI and Host Header Testing
    Test Multiple Hosts       \${GATEWAY_NAME}    hosts=test1.com,test2.com
    Validate Host Routing     test1.com    service=\${SERVICE_A}
    Validate Host Routing     test2.com    service=\${SERVICE_B}
    Check SNI Configuration   \${GATEWAY_NAME}    sni_enabled=true

Test Observability Integration
    [Documentation]    Service mesh observability and monitoring testing
    [Tags]             observability    tracing    metrics
    
    # Distributed Tracing Testing
    Generate Traced Requests  \${ISTIO_GATEWAY_URL}    service_chain=A->B->C    count=100
    Wait For Traces Available \${JAEGER_URL}    timeout=60s
    
    \${trace_data}=            Get Service Traces    service-chain    \${JAEGER_URL}
    Should Not Be Empty       \${trace_data}
    Validate Trace Spans      \${trace_data}    services=service-a,service-b,service-c
    Check Trace Latency       \${trace_data}    max_latency=1000ms
    
    # Metrics Collection Testing
    \${istio_metrics}=         Get Istio Metrics    \${PROMETHEUS_URL}
    Validate Request Metrics   \${istio_metrics}    total_requests>100
    Validate Success Rate      \${istio_metrics}    success_rate>95%
    Check Response Times       \${istio_metrics}    p95_latency<500ms
    
    # Service Graph Validation
    Get Service Graph         \${KIALI_URL}    namespace=\${NAMESPACE}
    Validate Service Topology service-graph    expected_services=3
    Check Traffic Flow        service-graph    A->B->C=true
    Validate Health Status    service-graph    all_services_healthy=true</code></pre>
        
        <h3>🎯 Práctica Service Mesh (7 min):</h3>
        <p>1. Instala Istio service mesh en cluster Kubernetes</p>
        <p>2. Configura automatic sidecar injection para namespaces</p>
        <p>3. Implementa virtual services con traffic splitting</p>
        <p>4. Configura destination rules con circuit breakers</p>
        <p>5. Testa canary deployments con weighted routing</p>
        <p>6. Implementa header-based routing para A/B testing</p>
        <p>7. Configura mTLS strict mode entre servicios</p>
        <p>8. Crea authorization policies granulares</p>
        <p>9. Testa Istio gateways con TLS termination</p>
        <p>10. Implementa rate limiting policies per-service</p>
        <p>11. Configura distributed tracing con Jaeger</p>
        <p>12. Testa service mesh observability con Kiali</p>
        <p>13. Implementa fault injection testing automatizado</p>
        <p>14. Configura timeout y retry policies</p>
        <p>15. Testa traffic mirroring para testing en producción</p>
        <p>16. Implementa egress gateway testing para external calls</p>
        <p>17. Configura service mesh upgrades sin downtime</p>
        <p>18. Testa multi-cluster service mesh federation</p>
        <p>19. Implementa security scanning de service mesh config</p>
        <p>20. Configura alerting para service mesh health</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar testing completo de service mesh con Istio</li>
                <li>Configurar traffic management con virtual services y gateways</li>
                <li>Dominar mTLS testing y authorization policies</li>
                <li>Establecer observability testing con tracing y metrics</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Istio proxy admin endpoints (:15000) para debugging - proporcionan información detallada de configuración y estado del sidecar.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 227 - Cloud Native Testing</h3>
        <p>Aprenderás testing especializado de aplicaciones cloud-native con Kubernetes operators, serverless y multi-cloud patterns.</p>
    `,
    topics: ["enterprise", "architecture", "scalability"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-225"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_226 = LESSON_226;
}