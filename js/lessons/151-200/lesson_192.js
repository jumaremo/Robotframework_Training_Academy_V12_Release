/**
 * Robot Framework Academy - Lesson 192
 * Jenkins Setup para Robot Framework
 */

const LESSON_192 = {
    id: 192,
    title: "CI/CD 192",
    duration: "10 min",
    level: "advanced",
    section: "section-15",
    content: `
        <h2>🔧 Jenkins Setup RF</h2>
        <p>Configuración Jenkins para ejecutar tests Robot Framework automáticamente.</p>
        
        <h3>💻 Pipeline + RF Commands:</h3>
        <pre><code class="robot">*** Variables ***
\${JENKINS_URL}      http://localhost:8080
\${BUILD_STATUS}     SUCCESS
\${BUILD_TIME}       250
\${TESTS_PASSED}     True
\${SUCCESS_RATE}     0.98

*** Test Cases ***
Validate Jenkins Setup
    Should Be Equal    \${JENKINS_URL}    http://localhost:8080
    Should Contain     \${BUILD_STATUS}   SUCCESS
    Should Be True     \${BUILD_TIME} < 300
    Log                Jenkins pipeline configured correctly
    Set Variable       \${TESTS_PASSED}   True

Verify Pipeline Stages
    Should Be Equal    \${BUILD_STATUS}     SUCCESS
    Should Be True     \${SUCCESS_RATE} > 0.95
    Should Be True     \${BUILD_TIME} < 600
    Log                All pipeline stages validated
    Set Variable       \${MONITORING}      enabled

Monitor Build Results
    Log                Checking build metrics
    Should Be True     \${SUCCESS_RATE} > 0.90
    Should Contain     SUCCESS    SUCCESS
    Log                Build metrics acceptable
    Set Variable       \${VALIDATED}    True</code></pre>
        
        <pre><code class="groovy">pipeline {
    agent any
    environment {
        RF_OPTIONS = '--outputdir results --loglevel INFO'
        TEST_SUITE = 'tests/web_tests.robot'
    }
    stages {
        stage('Setup') {
            steps {
                sh 'pip install robotframework robotframework-seleniumlibrary'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'robot --include smoke $RF_OPTIONS $TEST_SUITE'
            }
        }
        stage('Reports') {
            steps {
                publishHTML([
                    reportDir: 'results',
                    reportFiles: 'report.html'
                ])
            }
        }
    }
}</code></pre>
        
        <h3>🎯 Práctica Jenkins (7 min):</h3>
        <p>1. Instala Jenkins usando Docker: <code>docker run -p 8080:8080 jenkins/jenkins:lts</code></p>
        <p>2. Accede a http://localhost:8080 y completa el setup inicial</p>
        <p>3. Instala plugins necesarios: Pipeline, HTML Publisher, Email Extension</p>
        <p>4. Crea nuevo pipeline job llamado "Robot-Framework-Tests"</p>
        <p>5. Configura el pipeline script con el código de arriba</p>
        <p>6. Conecta Jenkins con tu repositorio Git</p>
        <p>7. Configura webhook para trigger automático en push</p>
        <p>8. Ejecuta el pipeline manualmente primera vez</p>
        <p>9. Verifica que los reportes se publican correctamente</p>
        <p>10. Configura notificaciones por email/Slack</p>
        <p>11. Prueba el pipeline con un test que falla</p>
        <p>12. Configura ejecución paralela usando matriz de browsers</p>
        <p>13. Establece schedule para ejecución nocturna</p>
        <p>14. Configura retención de builds (solo últimos 10)</p>
        <p>15. Agrega stage de deploy condicional</p>
        <p>16. Valida métricas de build time y success rate</p>
        <p>17. Configura backup automático de configuración Jenkins</p>
        <p>18. Prueba recuperación desde backup</p>
        <p>19. Documenta el pipeline para el equipo</p>
        <p>20. Entrena al equipo en uso de Jenkins</p>
        <p>21. Configura variables de environment por branch</p>
        <p>22. Implementa approval gates para producción</p>
        <p>23. Configura logs detallados y troubleshooting</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Instalar y configurar Jenkins para Robot Framework</li>
                <li>Crear pipelines robustos con stages bien definidos</li>
                <li>Configurar reportes automáticos y notificaciones</li>
                <li>Implementar estrategias de testing por environment</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Jenkins Blue Ocean para una interfaz más moderna y visual de tus pipelines Robot Framework.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 193 - Docker Containers para Testing</h3>
        <p>Containerizar tests Robot Framework para environments consistentes.</p>
    `,
    topics: ["cicd", "jenkins", "docker"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-191"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_192 = LESSON_192;
}