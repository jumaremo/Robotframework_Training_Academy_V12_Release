/**
 * Robot Framework Academy - Lesson 193
 * Docker Containers para Testing
 */

const LESSON_193 = {
    id: 193,
    title: "CI/CD 193",
    duration: "10 min",
    level: "advanced",
    section: "section-15",
    content: `
        <h2>🐳 Docker RF Testing</h2>
        <p>Containerizar tests Robot Framework para environments consistentes y deployment escalable.</p>
        
        <h3>💻 Dockerfile + RF Commands:</h3>
        <pre><code class="robot">*** Variables ***
\${DOCKER_IMAGE}     robot-tests:latest
\${CONTAINER_NAME}   rf-test-container
\${TEST_RESULTS}     /app/results
\${BUILD_STATUS}     SUCCESS
\${EXECUTION_TIME}   120

*** Test Cases ***
Validate Docker Setup
    Should Be Equal    \${DOCKER_IMAGE}    robot-tests:latest
    Should Contain     \${CONTAINER_NAME}  rf-test
    Should Be True     \${EXECUTION_TIME} < 300
    Log                Docker container configured
    Set Variable       \${DOCKER_READY}   True

Verify Container Execution
    Should Be Equal    \${BUILD_STATUS}     SUCCESS
    Should Contain     \${TEST_RESULTS}     /app/results
    Should Be True     \${EXECUTION_TIME} < 180
    Log                Container execution validated
    Set Variable       \${TESTS_RUNNING}   True

Monitor Container Metrics
    Log                Checking container performance
    Should Be True     \${EXECUTION_TIME} < 200
    Should Contain     SUCCESS    SUCCESS
    Log                Container metrics acceptable
    Set Variable       \${MONITORING}    enabled</code></pre>
        
        <pre><code class="dockerfile">FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY tests/ ./tests/
COPY resources/ ./resources/

CMD ["robot", "--outputdir", "results", "tests/"]</code></pre>

        <pre><code class="yaml"># docker-compose.yml
version: '3.8'
services:
  robot-tests:
    build: .
    volumes:
      - ./results:/app/results
    environment:
      - BROWSER=headlesschrome
      - TEST_ENV=docker</code></pre>
        
        <h3>🎯 Práctica Docker (7 min):</h3>
        <p>1. Crea Dockerfile con imagen Python 3.9 base</p>
        <p>2. Instala Robot Framework y SeleniumLibrary en container</p>
        <p>3. Copia tests y resources al container</p>
        <p>4. Configura ChromeDriver para headless execution</p>
        <p>5. Construye imagen: <code>docker build -t robot-tests .</code></p>
        <p>6. Ejecuta container: <code>docker run --rm robot-tests</code></p>
        <p>7. Monta volumen para resultados persistentes</p>
        <p>8. Configura docker-compose.yml para orquestación</p>
        <p>9. Ejecuta tests con docker-compose up</p>
        <p>10. Configura variables de environment específicas</p>
        <p>11. Implementa multi-stage build para optimización</p>
        <p>12. Configura network para tests de integración</p>
        <p>13. Agrega healthcheck para monitoring container</p>
        <p>14. Implementa parallel execution con múltiples containers</p>
        <p>15. Configura logs centralizados con Docker logging</p>
        <p>16. Optimiza imagen reduciendo tamaño final</p>
        <p>17. Configura registry para distribución de imágenes</p>
        <p>18. Implementa rollback automático en fallos</p>
        <p>19. Configura secrets management seguros</p>
        <p>20. Documenta proceso de containerización</p>
        <p>21. Integra Docker con Jenkins pipeline</p>
        <p>22. Configura auto-scaling basado en carga</p>
        <p>23. Valida performance de containers vs local</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Containerizar tests Robot Framework con Docker</li>
                <li>Configurar environments reproducibles y escalables</li>
                <li>Integrar containers con pipelines CI/CD</li>
                <li>Optimizar performance y recursos de containers</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa multi-stage builds para crear imágenes Docker más pequeñas y optimizadas para production.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 194 - Kubernetes Testing Orchestration</h3>
        <p>Aprenderás a orquestar tests Robot Framework en clusters Kubernetes para máxima escalabilidad.</p>
    `,
    topics: ["cicd", "jenkins", "docker"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-192"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_193 = LESSON_193;
}