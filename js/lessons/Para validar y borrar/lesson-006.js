/**
 * Robot Framework Academy - Lesson 006 (VERSIÓN SIMPLE)
 * Estructura de directorios y buenas prácticas
 */

const LESSON_006 = {
    id: 6,
    title: "Estructura de directorios y buenas prácticas",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#006 robot framework estructura directorios buenas practicas organizacion nomenclatura",
    content: `
        <h2>🧠 Concepto: ¿Por qué las buenas prácticas importan tanto?</h2>
        <p>Las buenas prácticas en Robot Framework no son reglas opcionales, son la diferencia entre un proyecto que crece ordenadamente durante años y uno que colapsa después de 3 meses por ser imposible de mantener.</p>
        <p>Un directorio bien organizado con nombres consistentes permite que cualquier persona (incluso tú mismo 6 meses después) entienda el proyecto en 2 minutos.</p>
        
        <h3>💻 Buenas prácticas esenciales:</h3>
        <pre><code class="text">📏 REGLAS DE NOMENCLATURA:

✅ CORRECTO:
├── tests/
│   ├── login/
│   │   ├── valid_login_tests.robot
│   │   └── invalid_login_tests.robot
│   └── checkout/
│       ├── cart_management_tests.robot
│       └── payment_process_tests.robot
├── resources/
│   ├── page_objects/
│   │   ├── login_page.robot
│   │   └── checkout_page.robot
│   └── common/
│       └── browser_management.robot

❌ INCORRECTO:
├── test1.robot
├── Test_LOGIN.robot  
├── checkout-test.robot
├── MyKeywords.robot</code></pre>
        
        <h3>🎯 Práctica (3 min):</h3>
        <p>1. Revisa tu proyecto de la lección anterior</p>
        <p>2. Renombra archivos siguiendo el patrón: funcionalidad_tipo.robot</p>
        <p>3. Agrupa tests relacionados en subcarpetas por módulo</p>
        <p>4. Crea una carpeta "page_objects" dentro de resources</p>
        <p>5. Documenta tu estructura en un archivo README.md</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Al final de esta lección sabrás:</h4>
            <ul>
                <li>Reglas de nomenclatura consistentes para archivos y carpetas</li>
                <li>Cómo agrupar tests por funcionalidad y tipo</li>
                <li>Por qué la consistencia es más importante que la perfección</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Regla de oro:</h4>
            <p>Si no puedes entender qué hace un archivo solo leyendo su nombre y ubicación, el nombre está mal. Los nombres deben ser autoexplicativos.</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>📋 Convenciones de nomenclatura:</h4>
            <ul>
                <li><strong>Tests:</strong> funcionalidad_tests.robot (ej: login_tests.robot)</li>
                <li><strong>Keywords:</strong> funcionalidad_keywords.robot (ej: login_keywords.robot)</li>
                <li><strong>Page Objects:</strong> pagina_page.robot (ej: login_page.robot)</li>
                <li><strong>Variables:</strong> ambiente_variables.robot (ej: dev_variables.robot)</li>
            </ul>
        </div>
        
        <div style="background: #ffe6e6; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>⚠️ Antipatrones comunes:</h4>
            <ul>
                <li><strong>Espacios en nombres:</strong> "mi test.robot" → "mi_test.robot"</li>
                <li><strong>Caracteres especiales:</strong> "test@login.robot" → "login_test.robot"</li>
                <li><strong>CamelCase mezclado:</strong> "LoginTest.robot" → "login_test.robot"</li>
                <li><strong>Nombres genéricos:</strong> "test.robot" → "login_validation_test.robot"</li>
            </ul>
        </div>
        
        <div style="background: #e7f3ff; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>🏢 Estructura para equipos grandes:</h4>
            <ul>
                <li><strong>Por módulo:</strong> Cada feature en su carpeta</li>
                <li><strong>Por responsable:</strong> Cada QA tiene su área</li>
                <li><strong>Por ambiente:</strong> Tests específicos de DEV/QA/PROD</li>
                <li><strong>Por prioridad:</strong> Smoke tests separados de regression</li>
            </ul>
        </div>
        
        <h3>🚀 Siguiente: Lección 007 - Configuración del navegador web</h3>
        <p>Con la estructura perfecta, ahora configuraremos Selenium para controlar navegadores web y escribir nuestros primeros tests de automatización.</p>
    `,
    topics: ["estructura", "buenas-prácticas"],
    hasCode: false,
    hasExercise: false,
    prerequisites: ["lesson-005"],
    estimatedTime: 5,
    difficulty: "easy"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_006 = LESSON_006;
}