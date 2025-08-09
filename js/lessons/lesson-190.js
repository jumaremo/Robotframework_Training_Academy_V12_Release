/**
 * Robot Framework Academy - Lesson 190
 * CI/CD Concepts
 */

const LESSON_190 = {
    id: 190,
    title: "CI/CD Concepts",
    duration: "15 min",
    level: "advanced",
    section: "section-15",
    searchTerms: "#190 robot framework cicd jenkins docker automation pipeline devops",
    content: `
        <h2>🧠 Concepto: ¿Qué es CI/CD para Robot Framework?</h2>
        <p>CI/CD (Continuous Integration/Continuous Delivery) automatiza la ejecución de tus tests Robot Framework cada vez que hay cambios en el código. Es como tener un QA robot que trabaja 24/7 validando tu aplicación sin intervención humana.</p>
        <p>En nivel enterprise, CI/CD es obligatorio: ejecuta tests automáticamente, genera reportes, notifica fallos, y despliega solo si todos los tests pasan.</p>
        
        <h3>💻 Pipeline CI/CD básico:</h3>
        <pre><code class="yaml"># .github/workflows/robot-tests.yml
name: Robot Framework Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      
      - name: Install dependencies
        run: |
          pip install robotframework
          pip install robotframework-seleniumlibrary
      
      - name: Run Robot Tests
        run: robot --outputdir results tests/
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        with:
          name: robot-results
          path: results/</code></pre>
        
        <h3>🎯 Práctica (10 min):</h3>
        <p>1. Crea un repositorio Git con tus tests Robot Framework</p>
        <p>2. Agrega el archivo \`.github/workflows/robot-tests.yml\` con el pipeline de arriba</p>
        <p>3. Haz push de los cambios y observa cómo se ejecutan automáticamente</p>
        <p>4. Simula un test que falla y ve cómo el pipeline se rompe</p>
        <p>5. Explora los reportes generados en GitHub Actions</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Al final de esta lección sabrás:</h4>
            <ul>
                <li>Qué es CI/CD y por qué es crítico en enterprise</li>
                <li>Cómo configurar GitHub Actions para Robot Framework</li>
                <li>Cómo automatizar la ejecución de tests en cada commit</li>
                <li>Cómo interpretar resultados de pipelines automatizados</li>
                <li>Conceptos básicos de Jenkins y Docker para testing</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>🏢 Enterprise Patterns:</h4>
            <ul>
                <li><strong>Parallel execution:</strong> Ejecuta tests en paralelo para velocidad</li>
                <li><strong>Environment promotion:</strong> DEV → QA → STAGING → PROD</li>
                <li><strong>Smoke tests:</strong> Tests críticos que siempre deben pasar</li>
                <li><strong>Regression tests:</strong> Suite completa para releases</li>
            </ul>
        </div>
        
        <div style="background: #d1ecf1; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>🔧 Herramientas CI/CD populares:</h4>
            <ul>
                <li><strong>GitHub Actions:</strong> Integrado con GitHub, fácil setup</li>
                <li><strong>Jenkins:</strong> Potente, flexible, muchos plugins</li>
                <li><strong>GitLab CI:</strong> Integrado con GitLab, YAML config</li>
                <li><strong>Azure DevOps:</strong> Microsoft ecosystem, robust</li>
                <li><strong>Docker:</strong> Containerización para environments consistentes</li>
            </ul>
        </div>
        
        <div style="background: #ffe6e6; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>⚠️ Consideraciones Enterprise:</h4>
            <ul>
                <li><strong>Security:</strong> Secrets management, credenciales seguras</li>
                <li><strong>Scalability:</strong> Tests paralelos, workers distribuidos</li>
                <li><strong>Reporting:</strong> Dashboards centralizados, métricas</li>
                <li><strong>Notifications:</strong> Slack, Teams, email automático</li>
                <li><strong>Rollback:</strong> Estrategias de vuelta atrás automática</li>
            </ul>
        </div>
        
        <h3>📊 Métricas CI/CD importantes:</h3>
        <ul>
            <li><strong>Build time:</strong> Tiempo de ejecución del pipeline</li>
            <li><strong>Test success rate:</strong> % de tests que pasan</li>
            <li><strong>Deployment frequency:</strong> Frecuencia de releases</li>
            <li><strong>Mean time to recovery:</strong> Tiempo para arreglar fallos</li>
        </ul>
        
        <h3>🚀 Siguiente: Lección 191 - Jenkins Setup para Robot Framework</h3>
        <p>Ahora configuraremos Jenkins específicamente para ejecutar tests Robot Framework con pipelines avanzados y reporting empresarial.</p>
    `,
    topics: ["cicd", "jenkins", "docker"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-189"],
    estimatedTime: 15,
    difficulty: "advanced",
    type: "foundation"
};

// ✅ REGISTRO GLOBAL CRÍTICO
if (typeof window !== 'undefined') {
    window.LESSON_190 = LESSON_190;
    console.log('🎯 LESSON_190 registrada correctamente:', LESSON_190.title);
}