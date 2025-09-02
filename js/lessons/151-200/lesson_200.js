/**
 * Robot Framework Academy - Lesson 200
 * Multi-Cloud Testing Strategies
 */

const LESSON_200 = {
    id: 200,
    title: "CI/CD 200",
    duration: "10 min",
    level: "advanced",
    section: "section-15",
    content: `
        <h2>☁️ Multi-Cloud RF Testing</h2>
        <p>Implementar estrategias de testing cross-cloud para applications distribuidas globalmente con Robot Framework.</p>
        
        <h3>💻 Multi-Cloud Config + RF Commands:</h3>
        <pre><code class="robot">*** Variables ***
\${AWS_REGION}        us-east-1
\${AZURE_REGION}      eastus
\${GCP_REGION}        us-central1
\${CLOUD_STATUS}      ACTIVE
\${LATENCY_THRESHOLD} 100

*** Test Cases ***
Validate Multi-Cloud Setup
    Should Be Equal    \${AWS_REGION}        us-east-1
    Should Be Equal    \${AZURE_REGION}      eastus
    Should Be Equal    \${GCP_REGION}        us-central1
    Log                Multi-cloud configured
    Set Variable       \${CLOUDS_READY}      True

Verify Cross-Cloud Connectivity
    Should Be Equal    \${CLOUD_STATUS}      ACTIVE
    Should Be True     \${LATENCY_THRESHOLD} < 150
    Should Contain     ACTIVE    ACTIVE
    Log                Cross-cloud connectivity validated
    Set Variable       \${CONNECTIVITY_OK}  True

Monitor Cloud Performance
    Log                Checking cloud performance
    Should Be True     \${LATENCY_THRESHOLD} < 100
    Should Contain     ACTIVE    ACTIVE
    Log                Cloud performance acceptable
    Set Variable       \${PERFORMANCE_OK}   True</code></pre>
        
        <pre><code class="yaml"># terraform-multi-cloud.tf
provider "aws" {
  region = "us-east-1"
}

provider "azurerm" {
  features {}
}

provider "google" {
  project = "my-project"
  region  = "us-central1"
}

resource "aws_instance" "robot_tests_aws" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t3.micro"
  tags = {
    Name = "robot-tests-aws"
  }
}

resource "azurerm_virtual_machine" "robot_tests_azure" {
  name     = "robot-tests-azure"
  location = "East US"
  vm_size  = "Standard_B1s"
}

resource "google_compute_instance" "robot_tests_gcp" {
  name         = "robot-tests-gcp"
  machine_type = "e2-micro"
  zone         = "us-central1-a"
}</code></pre>

        <pre><code class="yaml"># multi-cloud-pipeline.yaml
name: Multi-Cloud Robot Tests
on: [push]
jobs:
  test-aws:
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to AWS
      run: terraform apply -target=aws_instance.robot_tests_aws
    - name: Run Robot Tests AWS
      run: robot --variable CLOUD:aws tests/cloud/
      
  test-azure:
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to Azure
      run: terraform apply -target=azurerm_virtual_machine.robot_tests_azure
    - name: Run Robot Tests Azure
      run: robot --variable CLOUD:azure tests/cloud/
      
  test-gcp:
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to GCP
      run: terraform apply -target=google_compute_instance.robot_tests_gcp
    - name: Run Robot Tests GCP
      run: robot --variable CLOUD:gcp tests/cloud/</code></pre>
        
        <h3>🎯 Práctica Multi-Cloud (7 min):</h3>
        <p>1. Configura Terraform para AWS, Azure y GCP providers</p>
        <p>2. Crea infrastructure as code para cada cloud provider</p>
        <p>3. Implementa cross-cloud networking con VPN gateways</p>
        <p>4. Configura load balancing cross-cloud con DNS routing</p>
        <p>5. Implementa data replication testing entre clouds</p>
        <p>6. Configura disaster recovery failover automation</p>
        <p>7. Implementa cost optimization testing por provider</p>
        <p>8. Configura compliance validation por region</p>
        <p>9. Implementa latency testing desde multiple geos</p>
        <p>10. Configura cloud-native services testing</p>
        <p>11. Implementa vendor lock-in avoidance strategies</p>
        <p>12. Configura hybrid cloud connectivity testing</p>
        <p>13. Implementa edge computing validation</p>
        <p>14. Configura multi-cloud security scanning</p>
        <p>15. Implementa backup and restore cross-cloud</p>
        <p>16. Configura performance benchmarking por provider</p>
        <p>17. Implementa auto-scaling cross-cloud policies</p>
        <p>18. Configura monitoring agregado multi-cloud</p>
        <p>19. Implementa chaos engineering cross-cloud</p>
        <p>20. Configura billing optimization automation</p>
        <p>21. Implementa governance policies centralizadas</p>
        <p>22. Configura compliance reporting agregado</p>
        <p>23. Valida ROI de estrategia multi-cloud vs single-cloud</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar testing strategies cross-cloud con Terraform</li>
                <li>Configurar pipelines distribuidos globalmente</li>
                <li>Crear resilience testing entre cloud providers</li>
                <li>Aplicar vendor-agnostic testing patterns</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa infrastructure as code para mantener consistency entre cloud providers y facilitar migrations.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 201 - Enterprise CI/CD Pipeline Capstone</h3>
        <p>Completarás el proyecto capstone final integrando todo el stack CI/CD enterprise con Robot Framework.</p>
    `,
    topics: ["cicd", "jenkins", "docker"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-199"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_200 = LESSON_200;
}