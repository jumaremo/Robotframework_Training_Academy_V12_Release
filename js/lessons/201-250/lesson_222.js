/**
 * Robot Framework Academy - Lesson 222
 * Container Testing Patterns
 */

const LESSON_222 = {
    id: 222,
    title: "Container Testing Patterns",
    duration: "10 min",
    level: "advanced",
    section: "section-18",
    content: `
        <h2>🐳 Containers Testing</h2>
        <p>Patrones específicos para testing de aplicaciones containerizadas con Docker, Kubernetes y orchestration testing.</p>
        
        <h3>💻 Testing Containers:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    Container Testing Patterns - Docker & Kubernetes
Library          SeleniumLibrary
Library          RequestsLibrary
Library          Process
Library          SSHLibrary
Library          Collections
Resource         ../resources/docker/container_keywords.robot
Resource         ../resources/k8s/kubernetes_keywords.robot
Variables        ../config/containers.yaml
Suite Setup      Initialize Container Test Environment
Suite Teardown   Cleanup Container Resources

*** Variables ***
\${DOCKER_HOST}           unix:///var/run/docker.sock
\${K8S_NAMESPACE}         testing
\${CONTAINER_IMAGE}       app:latest
\${SERVICE_NAME}          test-service
\${DEPLOYMENT_NAME}       test-deployment
\${CONFIGMAP_NAME}        test-config
\${SECRET_NAME}           test-secrets
\${PVC_NAME}              test-storage
\${INGRESS_NAME}          test-ingress
\${POD_SELECTOR}          app=test-service
\${REPLICA_COUNT}         3
\${CPU_LIMIT}             500m
\${MEMORY_LIMIT}          512Mi
\${HEALTH_CHECK_PATH}     /health

*** Test Cases ***
Test Docker Container Lifecycle
    [Documentation]    Docker container lifecycle testing
    [Tags]             docker    containers    lifecycle
    
    # Container Build Testing
    Build Docker Image           \${CONTAINER_IMAGE}    ./Dockerfile
    Validate Image Created       \${CONTAINER_IMAGE}
    Check Image Vulnerabilities  \${CONTAINER_IMAGE}
    Validate Image Size          \${CONTAINER_IMAGE}    max=500MB
    
    # Container Runtime Testing
    Run Container                \${CONTAINER_IMAGE}    \${SERVICE_NAME}
    Wait For Container Ready     \${SERVICE_NAME}       timeout=60s
    Check Container Health       \${SERVICE_NAME}       \${HEALTH_CHECK_PATH}
    Validate Container Logs      \${SERVICE_NAME}       Application started
    
    # Container Resource Testing
    Check CPU Usage             \${SERVICE_NAME}        max=\${CPU_LIMIT}
    Check Memory Usage          \${SERVICE_NAME}        max=\${MEMORY_LIMIT}
    Validate Port Mapping       \${SERVICE_NAME}        8080:8080
    Test Container Networking   \${SERVICE_NAME}        connectivity
    
    # Container Cleanup
    Stop Container              \${SERVICE_NAME}
    Remove Container            \${SERVICE_NAME}

Test Kubernetes Deployment Patterns
    [Documentation]    Kubernetes deployment and scaling testing
    [Tags]             kubernetes    deployment    scaling
    
    # Deployment Creation
    Create K8s Deployment       \${DEPLOYMENT_NAME}     \${CONTAINER_IMAGE}    \${REPLICA_COUNT}
    Wait For Deployment Ready   \${DEPLOYMENT_NAME}     timeout=300s
    Validate Pod Count          \${POD_SELECTOR}        \${REPLICA_COUNT}
    Check All Pods Healthy      \${POD_SELECTOR}
    
    # Service Discovery Testing
    Create K8s Service          \${SERVICE_NAME}        \${POD_SELECTOR}
    Validate Service Endpoints  \${SERVICE_NAME}        min=\${REPLICA_COUNT}
    Test Service Load Balancing \${SERVICE_NAME}        \${POD_SELECTOR}
    Check DNS Resolution        \${SERVICE_NAME}.\${K8S_NAMESPACE}.svc.cluster.local
    
    # ConfigMap and Secrets Testing
    Create ConfigMap            \${CONFIGMAP_NAME}      \${CONFIG_DATA}
    Create Secret               \${SECRET_NAME}         \${SECRET_DATA}
    Mount ConfigMap To Pods     \${DEPLOYMENT_NAME}     \${CONFIGMAP_NAME}
    Mount Secret To Pods        \${DEPLOYMENT_NAME}     \${SECRET_NAME}
    Validate Config Injection   \${POD_SELECTOR}        \${CONFIG_DATA}

Test Auto-Scaling Patterns
    [Documentation]    Horizontal Pod Autoscaling testing
    [Tags]             autoscaling    performance    load
    
    # HPA Configuration
    Create HPA                  \${DEPLOYMENT_NAME}     cpu=70%    min=2    max=10
    Validate HPA Created        \${DEPLOYMENT_NAME}
    Check Initial Pod Count     \${POD_SELECTOR}        \${REPLICA_COUNT}
    
    # Load Generation
    Generate CPU Load           \${SERVICE_NAME}        intensity=80%
    Wait For Scale Up           \${DEPLOYMENT_NAME}     target=6    timeout=300s
    Validate Pod Count          \${POD_SELECTOR}        min=6
    Check All Pods Healthy      \${POD_SELECTOR}
    
    # Scale Down Testing
    Stop Load Generation        \${SERVICE_NAME}
    Wait For Scale Down         \${DEPLOYMENT_NAME}     target=2    timeout=600s
    Validate Pod Count          \${POD_SELECTOR}        max=3
    Check HPA Metrics           \${DEPLOYMENT_NAME}     cpu<30%

Test Persistent Storage
    [Documentation]    Persistent volume and storage testing
    [Tags]             storage    persistence    volumes
    
    # PVC Creation
    Create Persistent Volume Claim    \${PVC_NAME}    size=1Gi    access=ReadWriteOnce
    Validate PVC Bound               \${PVC_NAME}
    Check Storage Class              \${PVC_NAME}    default
    
    # Volume Mount Testing
    Mount PVC To Deployment         \${DEPLOYMENT_NAME}    \${PVC_NAME}    /data
    Wait For Pods Ready             \${POD_SELECTOR}       timeout=120s
    Test Volume Write Access        \${POD_SELECTOR}       /data/test.txt
    Test Volume Read Access         \${POD_SELECTOR}       /data/test.txt
    
    # Data Persistence Testing
    Delete Pod                      \${POD_SELECTOR}       force=true
    Wait For Pod Recreation         \${POD_SELECTOR}       timeout=180s
    Validate Data Persisted         \${POD_SELECTOR}       /data/test.txt
    Check Volume Metrics            \${PVC_NAME}           usage<80%

Test Network Policies
    [Documentation]    Kubernetes network security testing
    [Tags]             network    security    policies
    
    # Default Allow Testing
    Create Test Pods               client-pod    server-pod
    Test Pod To Pod Communication  client-pod    server-pod    allowed
    
    # Network Policy Creation
    Create Network Policy          deny-all      \${K8S_NAMESPACE}
    Apply Network Policy           deny-all      \${K8S_NAMESPACE}
    Test Pod Communication Blocked client-pod    server-pod
    
    # Selective Allow Policy
    Create Allow Policy            allow-client  client-pod -> server-pod
    Apply Network Policy           allow-client  \${K8S_NAMESPACE}
    Test Selective Communication   client-pod    server-pod    allowed
    Test Other Communication       other-pod     server-pod    blocked</code></pre>
        
        <h3>🎯 Práctica Containers (7 min):</h3>
        <p>1. Instala Docker Desktop y Kubernetes local con kind/minikube</p>
        <p>2. Crea Dockerfile multi-stage optimizado para testing</p>
        <p>3. Implementa container health checks con custom endpoints</p>
        <p>4. Configura resource limits y requests para containers</p>
        <p>5. Crea Kubernetes deployment con rolling update strategy</p>
        <p>6. Implementa readiness y liveness probes testing</p>
        <p>7. Configura horizontal pod autoscaling con custom metrics</p>
        <p>8. Testa persistent volumes con data persistence validation</p>
        <p>9. Implementa network policies con micro-segmentation</p>
        <p>10. Configura ingress testing con SSL termination</p>
        <p>11. Testa service mesh integration con container sidecars</p>
        <p>12. Implementa init containers para setup validation</p>
        <p>13. Configura pod disruption budgets testing</p>
        <p>14. Testa rolling updates con zero-downtime validation</p>
        <p>15. Implementa blue-green deployment testing patterns</p>
        <p>16. Configura canary deployments con traffic splitting</p>
        <p>17. Testa resource quotas y limit ranges enforcement</p>
        <p>18. Implementa security contexts y pod security policies</p>
        <p>19. Configura monitoring containers con Prometheus scraping</p>
        <p>20. Testa backup y restore de persistent data</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar testing de containers Docker y Kubernetes orchestration</li>
                <li>Implementar auto-scaling testing con load simulation</li>
                <li>Configurar persistent storage testing con data validation</li>
                <li>Establecer network security testing con policies</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa labels consistentes en pods para selectores - facilita enormemente el testing automático de deployments complejos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 223 - Performance Testing Distribuido</h3>
        <p>Aprenderás técnicas avanzadas de performance testing en arquitecturas distribuidas con load balancing y auto-scaling.</p>
    `,
    topics: ["enterprise", "architecture", "scalability"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-221"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_222 = LESSON_222;
}