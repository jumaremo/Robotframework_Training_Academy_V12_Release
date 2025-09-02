/**
 * Robot Framework Academy - Lesson 249
 * Enterprise CI/CD pipeline
 */

const LESSON_249 = {
    id: 249,
    title: "Enterprise CI/CD pipeline",
    duration: "20 min",
    level: "advanced",
    section: "section-21",
    content: `
        <h2>🔧 Enterprise CI/CD</h2>
        <p>Pipelines CI/CD enterprise completos con deployment automation y quality gates avanzados.</p>
        
        <h3>💻 Pipeline enterprise completo:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    OperatingSystem
Documentation    Enterprise CI/CD Pipeline Testing Suite

*** Variables ***
\${JENKINS_URL}          https://jenkins.enterprise.com
\${GITLAB_URL}           https://gitlab.enterprise.com/api/v4
\${DOCKER_REGISTRY}      registry.enterprise.com
\${KUBERNETES_URL}       https://k8s-api.enterprise.com
\${SONAR_URL}            https://sonar.enterprise.com/api
\${NEXUS_URL}            https://nexus.enterprise.com/service/rest
\${JENKINS_TOKEN}        jenkins_api_token_123
\${GITLAB_TOKEN}         glpat-xxxxxxxxxxxxxxxxxxxx

*** Test Cases ***
Test Source Code Management
    Set Global Variable    \${SCM_INTEGRATION}    active
    Should Be Equal    \${SCM_INTEGRATION}    active
    Log    Source code management testing    INFO
    Create Session    gitlab_api    \${GITLAB_URL}
    \${headers}=    Create Dictionary    PRIVATE-TOKEN=\${GITLAB_TOKEN}    Content-Type=application/json
    \${response}=    GET On Session    gitlab_api    /projects    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Should Be True    len(\${response.json()}) > 0
    \${project}=    Set Variable    \${response.json()[0]}
    Dictionary Should Contain Key    \${project}    id
    Dictionary Should Contain Key    \${project}    name
    Dictionary Should Contain Key    \${project}    web_url
    Should Not Be Empty    \${GITLAB_TOKEN}
    Set Suite Variable    \${SCM_VERIFIED}    True
    Should Be Equal    \${SCM_VERIFIED}    True
    Log    Source code management verified    INFO

Test Build Pipeline Trigger
    Set Suite Variable    \${BUILD_TRIGGERED}    pending
    Should Be Equal    \${BUILD_TRIGGERED}    pending
    Log    Build pipeline trigger testing    INFO
    Create Session    jenkins_api    \${JENKINS_URL}
    \${auth}=    Create List    admin    \${JENKINS_TOKEN}
    \${headers}=    Create Dictionary    Content-Type=application/json
    \${build_params}=    Create Dictionary    BRANCH=main    ENVIRONMENT=staging    TESTS_ENABLED=true
    \${response}=    POST On Session    jenkins_api    /job/enterprise-pipeline/buildWithParameters    data=\${build_params}    headers=\${headers}    auth=\${auth}
    Should Be Equal As Numbers    \${response.status_code}    201
    \${location}=    Get From Dictionary    \${response.headers}    Location
    Should Contain    \${location}    queue
    \${queue_id}=    Get Regexp Matches    \${location}    queue/item/(\\d+)    1
    Should Not Be Empty    \${queue_id}
    Set Global Variable    \${BUILD_QUEUED}    True
    Should Be Equal    \${BUILD_QUEUED}    True
    Log    Build pipeline triggered successfully    INFO

Test Quality Gates Validation
    Set Global Variable    \${QUALITY_GATES}    enforcing
    Should Be Equal    \${QUALITY_GATES}    enforcing
    Log    Quality gates validation testing    INFO
    Create Session    sonar_api    \${SONAR_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer sonar_token_456    Content-Type=application/json
    \${response}=    GET On Session    sonar_api    /qualitygates/project_status?projectKey=enterprise-app    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    projectStatus
    \${project_status}=    Get From Dictionary    \${response.json()}    projectStatus
    Dictionary Should Contain Key    \${project_status}    status
    \${gate_status}=    Get From Dictionary    \${project_status}    status
    Should Be Equal    \${gate_status}    OK
    Dictionary Should Contain Key    \${project_status}    conditions
    \${conditions}=    Get From Dictionary    \${project_status}    conditions
    Should Be True    len(\${conditions}) >= 5
    Should Be Equal    \${SONAR_URL}    https://sonar.enterprise.com/api
    Set Suite Variable    \${GATES_PASSED}    True
    Should Be Equal    \${GATES_PASSED}    True
    Log    Quality gates validation passed    INFO

Test Automated Testing Execution
    Set Suite Variable    \${TEST_EXECUTION}    running
    Should Be Equal    \${TEST_EXECUTION}    running
    Log    Automated testing execution    INFO
    Create Session    jenkins_api    \${JENKINS_URL}
    \${auth}=    Create List    admin    \${JENKINS_TOKEN}
    \${headers}=    Create Dictionary    Content-Type=application/json
    \${response}=    GET On Session    jenkins_api    /job/enterprise-pipeline/lastBuild/api/json    headers=\${headers}    auth=\${auth}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    result
    Dictionary Should Contain Key    \${response.json()}    actions
    \${actions}=    Get From Dictionary    \${response.json()}    actions
    \${test_results}=    Set Variable    None
    FOR    \${action}    IN    @{actions}
        \${class_name}=    Get From Dictionary    \${action}    _class    default=
        Run Keyword If    '\${class_name}' == 'hudson.tasks.junit.TestResultAction'    Set Variable    \${action}    test_results
    END
    Should Not Be Equal    \${test_results}    None
    Dictionary Should Contain Key    \${test_results}    totalCount
    \${total_tests}=    Get From Dictionary    \${test_results}    totalCount
    Should Be True    \${total_tests} > 100
    Set Global Variable    \${TESTS_EXECUTED}    True
    Should Be Equal    \${TESTS_EXECUTED}    True
    Log    Automated testing execution verified    INFO

Test Artifact Management
    Set Global Variable    \${ARTIFACT_MANAGEMENT}    active
    Should Be Equal    \${ARTIFACT_MANAGEMENT}    active
    Log    Artifact management testing    INFO
    Create Session    nexus_api    \${NEXUS_URL}
    \${headers}=    Create Dictionary    Authorization=Basic bmV4dXM6cGFzc3dvcmQ=    Content-Type=application/json
    \${response}=    GET On Session    nexus_api    /v1/repositories    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Should Be True    len(\${response.json()}) > 0
    \${repositories}=    Set Variable    \${response.json()}
    \${docker_repo_found}=    Set Variable    False
    FOR    \${repo}    IN    @{repositories}
        \${repo_name}=    Get From Dictionary    \${repo}    name
        \${repo_format}=    Get From Dictionary    \${repo}    format
        Run Keyword If    '\${repo_format}' == 'docker'    Set Variable    True    docker_repo_found
    END
    Should Be True    \${docker_repo_found}
    Should Not Be Empty    \${NEXUS_URL}
    Set Suite Variable    \${ARTIFACTS_MANAGED}    True
    Should Be Equal    \${ARTIFACTS_MANAGED}    True
    Log    Artifact management verified    INFO

Test Container Registry Integration
    Set Suite Variable    \${CONTAINER_REGISTRY}    operational
    Should Be Equal    \${CONTAINER_REGISTRY}    operational
    Log    Container registry integration testing    INFO
    Create Session    registry_api    \${DOCKER_REGISTRY}
    \${headers}=    Create Dictionary    Authorization=Bearer registry_token_789    Content-Type=application/json
    \${response}=    GET On Session    registry_api    /v2/_catalog    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    repositories
    \${repositories}=    Get From Dictionary    \${response.json()}    repositories
    Should Be True    len(\${repositories}) > 0
    Should Contain    \${repositories}    enterprise-app
    \${tags_response}=    GET On Session    registry_api    /v2/enterprise-app/tags/list    headers=\${headers}
    Should Be Equal As Numbers    \${tags_response.status_code}    200
    Dictionary Should Contain Key    \${tags_response.json()}    tags
    \${tags}=    Get From Dictionary    \${tags_response.json()}    tags
    Should Contain    \${tags}    latest
    Set Global Variable    \${REGISTRY_VERIFIED}    True
    Should Be Equal    \${REGISTRY_VERIFIED}    True
    Log    Container registry integration verified    INFO

Test Kubernetes Deployment
    Set Global Variable    \${K8S_DEPLOYMENT}    active
    Should Be Equal    \${K8S_DEPLOYMENT}    active
    Log    Kubernetes deployment testing    INFO
    Create Session    k8s_api    \${KUBERNETES_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer k8s_token_xyz    Content-Type=application/json
    \${response}=    GET On Session    k8s_api    /api/v1/namespaces/production/deployments    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    items
    \${deployments}=    Get From Dictionary    \${response.json()}    items
    Should Be True    len(\${deployments}) > 0
    \${enterprise_deployment}=    Set Variable    None
    FOR    \${deployment}    IN    @{deployments}
        \${metadata}=    Get From Dictionary    \${deployment}    metadata
        \${name}=    Get From Dictionary    \${metadata}    name
        Run Keyword If    '\${name}' == 'enterprise-app'    Set Variable    \${deployment}    enterprise_deployment
    END
    Should Not Be Equal    \${enterprise_deployment}    None
    \${status}=    Get From Dictionary    \${enterprise_deployment}    status
    Dictionary Should Contain Key    \${status}    readyReplicas
    \${ready_replicas}=    Get From Dictionary    \${status}    readyReplicas
    Should Be True    \${ready_replicas} >= 3
    Set Suite Variable    \${K8S_VERIFIED}    True
    Should Be Equal    \${K8S_VERIFIED}    True
    Log    Kubernetes deployment verified    INFO

Test Rolling Deployment Strategy
    Set Suite Variable    \${ROLLING_DEPLOYMENT}    configured
    Should Be Equal    \${ROLLING_DEPLOYMENT}    configured
    Log    Rolling deployment strategy testing    INFO
    Create Session    k8s_api    \${KUBERNETES_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer k8s_token_xyz    Content-Type=application/json
    \${deployment_patch}=    Create Dictionary    spec={"template": {"spec": {"containers": [{"name": "enterprise-app", "image": "registry.enterprise.com/enterprise-app:v2.1.0"}]}}}
    \${response}=    PATCH On Session    k8s_api    /apis/apps/v1/namespaces/production/deployments/enterprise-app    json=\${deployment_patch}    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    # Monitor rollout status
    FOR    \${i}    IN RANGE    30
        \${status_response}=    GET On Session    k8s_api    /apis/apps/v1/namespaces/production/deployments/enterprise-app/status    headers=\${headers}
        Dictionary Should Contain Key    \${status_response.json()}    status
        \${deployment_status}=    Get From Dictionary    \${status_response.json()}    status
        \${updated_replicas}=    Get From Dictionary    \${deployment_status}    updatedReplicas    default=0
        \${ready_replicas}=    Get From Dictionary    \${deployment_status}    readyReplicas    default=0
        Exit For Loop If    \${updated_replicas} == 3 and \${ready_replicas} == 3
        Sleep    2s
    END
    Should Be Equal As Numbers    \${updated_replicas}    3
    Should Be Equal As Numbers    \${ready_replicas}    3
    Set Global Variable    \${ROLLING_VERIFIED}    True
    Should Be Equal    \${ROLLING_VERIFIED}    True
    Log    Rolling deployment strategy verified    INFO

Test Health Check Monitoring
    Set Global Variable    \${HEALTH_MONITORING}    active
    Should Be Equal    \${HEALTH_MONITORING}    active
    Log    Health check monitoring testing    INFO
    Create Session    k8s_api    \${KUBERNETES_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer k8s_token_xyz    Content-Type=application/json
    \${response}=    GET On Session    k8s_api    /api/v1/namespaces/production/pods?labelSelector=app=enterprise-app    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    items
    \${pods}=    Get From Dictionary    \${response.json()}    items
    Should Be True    len(\${pods}) >= 3
    FOR    \${pod}    IN    @{pods}
        \${status}=    Get From Dictionary    \${pod}    status
        Dictionary Should Contain Key    \${status}    phase
        \${phase}=    Get From Dictionary    \${status}    phase
        Should Be Equal    \${phase}    Running
        Dictionary Should Contain Key    \${status}    conditions
        \${conditions}=    Get From Dictionary    \${status}    conditions
        \${ready_condition}=    Set Variable    None
        FOR    \${condition}    IN    @{conditions}
            \${condition_type}=    Get From Dictionary    \${condition}    type
            Run Keyword If    '\${condition_type}' == 'Ready'    Set Variable    \${condition}    ready_condition
        END
        Should Not Be Equal    \${ready_condition}    None
        \${ready_status}=    Get From Dictionary    \${ready_condition}    status
        Should Be Equal    \${ready_status}    True
    END
    Should Not Be Empty    \${KUBERNETES_URL}
    Set Suite Variable    \${HEALTH_VERIFIED}    True
    Should Be Equal    \${HEALTH_VERIFIED}    True
    Log    Health check monitoring verified    INFO

Test Rollback Capability
    Set Suite Variable    \${ROLLBACK_TESTING}    initiated
    Should Be Equal    \${ROLLBACK_TESTING}    initiated
    Log    Rollback capability testing    INFO
    Create Session    k8s_api    \${KUBERNETES_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer k8s_token_xyz    Content-Type=application/json
    # Get current revision
    \${response}=    GET On Session    k8s_api    /apis/apps/v1/namespaces/production/deployments/enterprise-app    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    \${metadata}=    Get From Dictionary    \${response.json()}    metadata
    \${current_revision}=    Get From Dictionary    \${metadata.annotations}    deployment.kubernetes.io/revision
    # Trigger rollback to previous revision
    \${rollback_data}=    Create Dictionary    kind=DeploymentRollback    apiVersion=extensions/v1beta1    name=enterprise-app    rollbackTo={"revision": \${current_revision - 1}}
    \${rollback_response}=    POST On Session    k8s_api    /apis/apps/v1/namespaces/production/deployments/enterprise-app/rollback    json=\${rollback_data}    headers=\${headers}
    Should Be Equal As Numbers    \${rollback_response.status_code}    200
    # Verify rollback completion
    Sleep    10s
    \${status_response}=    GET On Session    k8s_api    /apis/apps/v1/namespaces/production/deployments/enterprise-app    headers=\${headers}
    \${new_metadata}=    Get From Dictionary    \${status_response.json()}    metadata
    \${new_revision}=    Get From Dictionary    \${new_metadata.annotations}    deployment.kubernetes.io/revision
    Should Be True    \${new_revision} > \${current_revision}
    Set Global Variable    \${ROLLBACK_VERIFIED}    True
    Should Be Equal    \${ROLLBACK_VERIFIED}    True
    Log    Rollback capability verified    INFO

Test Pipeline Metrics Collection
    Set Global Variable    \${METRICS_COLLECTION}    active
    Should Be Equal    \${METRICS_COLLECTION}    active
    Log    Pipeline metrics collection testing    INFO
    Create Session    jenkins_api    \${JENKINS_URL}
    \${auth}=    Create List    admin    \${JENKINS_TOKEN}
    \${headers}=    Create Dictionary    Content-Type=application/json
    \${response}=    GET On Session    jenkins_api    /job/enterprise-pipeline/api/json?tree=builds[number,duration,result,timestamp]    headers=\${headers}    auth=\${auth}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    builds
    \${builds}=    Get From Dictionary    \${response.json()}    builds
    Should Be True    len(\${builds}) > 5
    \${successful_builds}=    Set Variable    0
    \${total_duration}=    Set Variable    0
    FOR    \${build}    IN    @{builds}
        \${result}=    Get From Dictionary    \${build}    result
        \${duration}=    Get From Dictionary    \${build}    duration
        \${successful_builds}=    Run Keyword If    '\${result}' == 'SUCCESS'    Evaluate    \${successful_builds} + 1    ELSE    Set Variable    \${successful_builds}
        \${total_duration}=    Evaluate    \${total_duration} + \${duration}
    END
    \${success_rate}=    Evaluate    (\${successful_builds} * 100) / len(\${builds})
    Should Be True    \${success_rate} >= 85
    \${average_duration}=    Evaluate    \${total_duration} / len(\${builds}) / 1000 / 60
    Should Be True    \${average_duration} <= 15
    Set Suite Variable    \${METRICS_VERIFIED}    True
    Should Be Equal    \${METRICS_VERIFIED}    True
    Log    Pipeline metrics collection verified    INFO</code></pre>
        
        <h3>🎯 Desarrollo CI/CD Pipeline (15 min):</h3>
        <p>1. Configura Jenkins con pipeline as code</p>
        <p>2. Implementa GitLab integration con webhooks</p>
        <p>3. Establece quality gates con SonarQube</p>
        <p>4. Configura automated testing execution</p>
        <p>5. Implementa artifact management con Nexus</p>
        <p>6. Establece container registry integration</p>
        <p>7. Configura Kubernetes deployment automation</p>
        <p>8. Implementa rolling deployment strategy</p>
        <p>9. Establece health check monitoring</p>
        <p>10. Configura rollback capability automático</p>
        <p>11. Implementa pipeline metrics collection</p>
        <p>12. Establece notification system integration</p>
        <p>13. Configura security scanning automation</p>
        <p>14. Implementa performance testing integration</p>
        <p>15. Establece database migration automation</p>
        <p>16. Configura environment promotion pipeline</p>
        <p>17. Implementa blue-green deployment strategy</p>
        <p>18. Establece canary release automation</p>
        <p>19. Configura compliance validation gates</p>
        <p>20. Implementa disaster recovery testing</p>
        <p>21. Establece cost optimization monitoring</p>
        <p>22. Configura multi-region deployment</p>
        <p>23. Implementa A/B testing integration</p>
        <p>24. Testa pipeline completo end-to-end</p>
        <p>25. Valida enterprise readiness y scalability</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Construir pipeline CI/CD enterprise completo</li>
                <li>Automatizar deployment con quality gates</li>
                <li>Implementar estrategias de rollback y recovery</li>
                <li>Crear sistema DevOps world-class</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>CI/CD enterprise exitoso: Jenkins + GitLab + Quality Gates + Kubernetes + Monitoring = deployment automatizado con 99.9% success rate y rollback instantáneo.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 250 - Performance + Security testing</h3>
        <p>Con CI/CD enterprise establecido, integrarás testing avanzado de performance y security en tus pipelines para garantizar aplicaciones robustas y seguras.</p>
    `,
    topics: ["capstone", "cicd", "enterprise"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 20,
    difficulty: "easy",
    prerequisites: ["lesson-248"],
    type: "capstone"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_249 = LESSON_249;
}