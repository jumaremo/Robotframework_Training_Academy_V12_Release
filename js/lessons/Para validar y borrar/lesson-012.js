/**
 * Robot Framework Academy - Lesson 012 (VERSIÓN SIMPLE)
 * Configuración de requirements.txt
 */

const LESSON_012 = {
    id: 12,
    title: "Configuración de requirements.txt",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#012 robot framework requirements dependencies pip instalacion automatica",
    content: `
        <h2>🧠 Concepto: ¿Por qué requirements.txt es esencial?</h2>
        <p>requirements.txt es la lista de compras de tu proyecto Robot Framework. Con un solo comando, cualquier persona puede instalar exactamente las mismas versiones que tú usas, evitando el famoso "en mi máquina funciona".</p>
        <p>Sin requirements.txt, cada persona instala versiones diferentes y los tests fallan por incompatibilidades. Con él, todo el equipo trabaja con las mismas dependencias.</p>
        
        <h3>💻 requirements.txt profesional:</h3>
        <pre><code class="text"># Robot Framework Core
robotframework==6.1.1

# Web Testing
robotframework-seleniumlibrary==6.1.0
webdriver-manager==4.0.1

# API Testing  
robotframework-requests==0.9.4
requests==2.31.0

# Database Testing
robotframework-databaselibrary==1.2.4

# Utilities
robotframework-pabot==2.16.0
robotframework-faker==5.0.0

# Development
robotframework-lint==1.1</code></pre>

        <pre><code class="robot">*** Settings ***
Documentation    Test que valida dependencias del proyecto
Library          OperatingSystem
Library          Process

*** Variables ***
\${REQUIREMENTS_FILE}    \${CURDIR}/requirements.txt
\${VENV_PATH}           \${CURDIR}/venv

*** Test Cases ***
Validar Requirements.txt
    [Documentation]    Verifica que requirements.txt existe y es válido
    File Should Exist    \${REQUIREMENTS_FILE}
    
    \${content}=    Get File    \${REQUIREMENTS_FILE}
    Should Contain    \${content}    robotframework
    Should Contain    \${content}    seleniumlibrary
    Log    ✅ requirements.txt configurado correctamente

Instalar Dependencias
    [Documentation]    Instala automáticamente todas las dependencias
    \${result}=    Run Process    pip    install    -r    \${REQUIREMENTS_FILE}
    Should Be Equal As Integers    \${result.rc}    0
    Log    ✅ Dependencias instaladas: \${result.stdout}

Verificar Instalación
    [Documentation]    Confirma que las librerías están disponibles
    \${result}=    Run Process    pip    list    |    grep    robotframework
    Should Contain    \${result.stdout}    robotframework
    Log    ✅ Robot Framework instalado correctamente</code></pre>
        
        <h3>🎯 Práctica (3 min):</h3>
        <p>1. Crea archivo requirements.txt en tu proyecto con el contenido de arriba</p>
        <p>2. Instala todo: <code>pip install -r requirements.txt</code></p>
        <p>3. Verifica: <code>pip list | grep robot</code></p>
        <p>4. Crea test_dependencies.robot con el código Robot Framework de arriba</p>
        <p>5. Ejecuta para validar que todo funciona: <code>robot test_dependencies.robot</code></p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Al final de esta lección sabrás:</h4>
            <ul>
                <li>Por qué requirements.txt evita problemas de dependencias</li>
                <li>Cómo crear un requirements.txt profesional</li>
                <li>Cómo instalar dependencias automáticamente</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip importante:</h4>
            <p>Siempre especifica versiones exactas (==6.1.1) en lugar de versiones flexibles (>=6.0). Esto garantiza que todos usen exactamente las mismas versiones.</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>📦 Librerías esenciales Robot Framework:</h4>
            <ul>
                <li><strong>robotframework:</strong> Core del framework</li>
                <li><strong>seleniumlibrary:</strong> Automatización web</li>
                <li><strong>requests:</strong> Testing de APIs REST</li>
                <li><strong>databaselibrary:</strong> Conexión a bases de datos</li>
                <li><strong>pabot:</strong> Ejecución paralela de tests</li>
            </ul>
        </div>
        
        <div style="background: #ffe6e6; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>⚠️ Comandos útiles pip:</h4>
            <ul>
                <li><strong>pip freeze > requirements.txt:</strong> Generar desde instalación actual</li>
                <li><strong>pip install -r requirements.txt:</strong> Instalar desde archivo</li>
                <li><strong>pip list:</strong> Ver paquetes instalados</li>
                <li><strong>pip show robotframework:</strong> Detalles de un paquete</li>
            </ul>
        </div>
        
        <h3>🚀 Siguiente: Lección 013 - Ejecución desde línea de comandos</h3>
        <p>Con las dependencias configuradas, aprenderás todos los comandos para ejecutar tests desde terminal con diferentes opciones.</p>
    `,
    topics: ["requirements", "dependencies", "pip"],
    hasCode: true,
    hasExercise: false,
    prerequisites: ["lesson-011"],
    estimatedTime: 5,
    difficulty: "easy"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_012 = LESSON_012;
}