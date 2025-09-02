/**
 * Robot Framework Academy - Lesson 195
 * GitOps y ArgoCD Integration
 */

const LESSON_195 = {
    id: 195,
    title: "CI/CD 195",
    duration: "10 min",
    level: "advanced",
    section: "section-15",
    content: `
        <h2>🔄 GitOps ArgoCD Testing</h2>
        <p>Implementar GitOps workflows para deployment automático de tests Robot Framework usando ArgoCD.</p>
        
        <h3>💻 ArgoCD Config + RF Commands:</h3>
        <pre><code class="robot">*** Variables ***
\${ARGOCD_APP}       robot-tests-app
\${GIT_REPO}         https://github.com/company/robot-tests
\${TARGET_NAMESPACE} robot-testing
\${SYNC_STATUS}      SYNCED
\${HEALTH_STATUS}    HEALTHY

*** Test Cases ***
Validate ArgoCD Setup
    Should Be Equal    \${ARGOCD_APP}       robot-tests-app
    Should Contain     \${GIT_REPO}         robot-tests
    Should Be Equal    \${SYNC_STATUS}      SYNCED
    Log                ArgoCD application configured
    Set Variable       \${GITOPS_READY}     True

Verify Sync Process
    Should Be Equal    \${SYNC_STATUS}      SYNCED
    Should Be Equal    \${HEALTH_STATUS}    HEALTHY
    Should Contain     \${TARGET_NAMESPACE} robot-testing
    Log                GitOps sync validated
    Set Variable       \${DEPLOYMENT_OK}    True

Monitor GitOps Metrics
    Log                Checking GitOps performance
    Should Be True     \${SYNC_STATUS} == SYNCED
    Should Contain     HEALTHY    HEALTHY
    Log                GitOps metrics acceptable
    Set Variable       \${MONITORING}       enabled</code></pre>
        
        <pre><code class="yaml"># argocd-application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: robot-tests-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/company/robot-tests
    targetRevision: HEAD
    path: k8s-manifests
  destination:
    server: https://kubernetes.default.svc
    namespace: robot-testing
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true</code></pre>

        <pre><code class="yaml"># gitops-workflow.yaml
name: GitOps Robot Tests
on:
  push:
    branches: [main]
jobs:
  update-manifests:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Update image tag
      run: |
        sed -i "s/robot-tests:.*/robot-tests:$GITHUB_SHA/" k8s-manifests/deployment.yaml
    - name: Commit changes
      run: |
        git config --local user.email "action@github.com"
        git commit -am "Update image to $GITHUB_SHA"
        git push</code></pre>
        
        <h3>🎯 Práctica GitOps (7 min):</h3>
        <p>1. Instala ArgoCD en cluster: <code>kubectl create namespace argocd</code></p>
        <p>2. Aplica manifests ArgoCD: <code>kubectl apply -n argocd -f argocd-install.yaml</code></p>
        <p>3. Accede a ArgoCD UI en puerto 8080</p>
        <p>4. Crea application manifest con repositorio Git</p>
        <p>5. Configura automated sync policy con prune y selfHeal</p>
        <p>6. Conecta repositorio Git con manifests Kubernetes</p>
        <p>7. Configura GitHub workflow para update automático</p>
        <p>8. Prueba push a repositorio y observa sync automático</p>
        <p>9. Configura notifications para Slack/Teams</p>
        <p>10. Implementa rollback automático en fallos</p>
        <p>11. Configura multi-environment sync (dev/staging/prod)</p>
        <p>12. Implementa approval gates para producción</p>
        <p>13. Configura secrets management con Sealed Secrets</p>
        <p>14. Implementa blue-green deployment via GitOps</p>
        <p>15. Configura monitoring de drift detection</p>
        <p>16. Implementa progressive delivery con Argo Rollouts</p>
        <p>17. Configura backup de configuraciones ArgoCD</p>
        <p>18. Implementa disaster recovery procedures</p>
        <p>19. Configura RBAC para teams diferentes</p>
        <p>20. Implementa audit logging completo</p>
        <p>21. Configura webhooks para external systems</p>
        <p>22. Implementa custom health checks</p>
        <p>23. Valida performance vs deployment tradicional</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar GitOps workflows con ArgoCD</li>
                <li>Automatizar deployment de tests usando Git como source of truth</li>
                <li>Configurar sync policies y rollback automático</li>
                <li>Aplicar progressive delivery y monitoring avanzado</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Habilita selfHeal en ArgoCD para corregir automáticamente drift entre Git y cluster state.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 196 - Monitoring y Observability</h3>
        <p>Implementarás stack completo de monitoring para tests Robot Framework con métricas y alertas.</p>
    `,
    topics: ["cicd", "jenkins", "docker"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-194"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_195 = LESSON_195;
}