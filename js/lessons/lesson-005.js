/**
 * Robot Framework Academy - Lesson 005 OPTIMIZED
 * Creación del primer proyecto
 */

const LESSON_005 = {
    id: 5,
    title: "Creación del primer proyecto",
    duration: "8 min",
    level: "beginner",
    section: "section-01",
    content: `
        <h2>🚀 Primer Proyecto</h2>
        <p>Estructura correcta = tests organizados + fácil mantenimiento.</p>
        
        <h3>🤖 Proyecto completo:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    Mi primer proyecto Robot Framework profesional
Library          SeleniumLibrary
Library          OperatingSystem
Library          Collections
Library          String
Resource         ../resources/common_keywords.robot
Variables        ../config/environments.yaml

*** Variables ***
\${PROJECT_NAME}      robot-academy-project
\${BASE_DIR}         \${CURDIR}
\${TESTS_DIR}        \${BASE_DIR}/tests
\${RESOURCES_DIR}    \${BASE_DIR}/resources
\${CONFIG_DIR}       \${BASE_DIR}/config
\${REPORTS_DIR}      \${BASE_DIR}/reports
\${DATA_DIR}         \${BASE_DIR}/data
\${README_FILE}      \${BASE_DIR}/README.md
\${REQUIREMENTS}     \${BASE_DIR}/requirements.txt

*** Test Cases ***
Crear Estructura Proyecto
    [Documentation]    Crea la estructura básica del proyecto
    Log    🚀 Creando proyecto: \${PROJECT_NAME}
    
    # Crear directorios principales
    Create Directory    \${TESTS_DIR}
    Create Directory    \${RESOURCES_DIR}
    Create Directory    \${CONFIG_DIR}
    Create Directory    \${REPORTS_DIR}
    Create Directory    \${DATA_DIR}
    
    # Verificar directorios creados
    Directory Should Exist    \${TESTS_DIR}
    Directory Should Exist    \${RESOURCES_DIR}
    Directory Should Exist    \${CONFIG_DIR}
    Directory Should Exist    \${REPORTS_DIR}
    Directory Should Exist    \${DATA_DIR}
    
    # Contar directorios
    \${dir_count}=    Count Files In Directory    \${BASE_DIR}    *
    Should Be True    \${dir_count} >= 5
    Log    ✅ Estructura creada: \${dir_count} directorios

Crear Archivos Base
    [Documentation]    Crea archivos fundamentales del proyecto
    Log    📁 Creando archivos base del proyecto
    
    # Crear README
    \${readme_content}=    Set Variable    # \${PROJECT_NAME}\\n\\nProyecto Robot Framework\\n\\n## Estructura\\n- tests/: Test suites\\n- resources/: Keywords reutilizables\\n- config/: Configuraciones\\n- data/: Datos de prueba\\n- reports/: Reportes HTML
    Create File    \${README_FILE}    \${readme_content}
    File Should Exist    \${README_FILE}
    
    # Crear requirements.txt
    \${requirements}=    Set Variable    robotframework>=6.0\\nrobotframework-seleniumlibrary>=6.0\\nwebdriver-manager>=3.8\\nrobot-framework-requests>=0.9
    Create File    \${REQUIREMENTS}    \${requirements}
    File Should Exist    \${REQUIREMENTS}
    
    # Crear primer test
    \${first_test}=    Set Variable    *** Test Cases ***\\nPrimer Test\\n    Log    ¡Hola mundo Robot Framework!\\n    Should Be True    True\\n    \${timestamp}=    Get Time\\n    Log    Ejecutado en: \${timestamp}
    Create File    \${TESTS_DIR}/primer_test.robot    \${first_test}
    File Should Exist    \${TESTS_DIR}/primer_test.robot
    
    # Crear keywords comunes
    \${common_keywords}=    Set Variable    *** Keywords ***\\nSetup Test Environment\\n    Log    Configurando ambiente de pruebas\\n    Set Global Variable    \${TEST_ENV}    development\\n\\nCleanup Test Environment\\n    Log    Limpiando ambiente de pruebas\\n    Remove Files    \${TEMPDIR}/*test*
    Create File    \${RESOURCES_DIR}/common_keywords.robot    \${common_keywords}
    File Should Exist    \${RESOURCES_DIR}/common_keywords.robot
    
    # Crear configuración YAML
    \${yaml_config}=    Set Variable    environments:\\n  dev:\\n    url: http://localhost:8080\\n    browser: chrome\\n  qa:\\n    url: https://qa.example.com\\n    browser: firefox\\n  prod:\\n    url: https://prod.example.com\\n    browser: chrome
    Create File    \${CONFIG_DIR}/environments.yaml    \${yaml_config}
    File Should Exist    \${CONFIG_DIR}/environments.yaml
    
    # Verificar todos los archivos
    \${file_count}=    Count Files In Directory    \${BASE_DIR}    *.md *.txt
    Should Be Equal As Numbers    \${file_count}    2
    Log    ✅ Archivos base creados correctamente

Validar Proyecto Completo
    [Documentation]    Valida que el proyecto está completo y funcional
    Log    🔍 Validando proyecto completo
    
    # Validar estructura completa
    Directory Should Exist    \${TESTS_DIR}
    Directory Should Exist    \${RESOURCES_DIR}
    Directory Should Exist    \${CONFIG_DIR}
    File Should Exist    \${README_FILE}
    File Should Exist    \${REQUIREMENTS}
    
    # Contar archivos totales
    \${total_files}=    Count Files In Directory    \${BASE_DIR}    *.robot *.md *.txt *.yaml    recursive=True
    Should Be True    \${total_files} >= 5
    
    # Verificar contenido de archivos
    \${readme_size}=    Get File Size    \${README_FILE}
    Should Be True    \${readme_size} > 100
    
    \${req_size}=    Get File Size    \${REQUIREMENTS}
    Should Be True    \${req_size} > 50
    
    Log    ✅ Proyecto validado: \${total_files} archivos creados</code></pre>
        
        <h3>🎯 Práctica proyecto (6 min):</h3>
        <p>1. Crear directorio Desktop → "robot-academy-project"</p>
        <p>2. Abrir PyCharm → File → Open → Seleccionar carpeta</p>
        <p>3. Crear estructura: New → Directory → "tests", "resources", "config", "data", "reports"</p>
        <p>4. Crear README.md → New → File → Documentar proyecto</p>
        <p>5. Crear requirements.txt → Listar dependencias RF</p>
        <p>6. Instalar dependencias: Terminal → pip install -r requirements.txt</p>
        <p>7. Crear primer test: tests/ → primer_test.robot → Código básico</p>
        <p>8. Crear keywords: resources/ → common_keywords.robot → Keywords</p>
        <p>9. Crear configuración: config/ → environments.yaml → URLs ambiente</p>
        <p>10. Crear datos: data/ → test_data.csv → Datos tests</p>
        <p>11. Ejecutar test: Terminal → robot tests/primer_test.robot</p>
        <p>12. Ver reporte: Abrir report.html → Verificar verde</p>
        <p>13. Crear .gitignore → Excluir reports/, *.pyc</p>
        <p>14. Inicializar Git: git init → add → commit</p>
        <p>15. Ejecutar completo: robot --outputdir reports tests/</p>
        <p>16. Actualizar README → Instrucciones uso</p>
        <p>17. Verificar estructura: Project view → Validar organización</p>
        <p>18. Crear segundo test: tests/ → login_test.robot → Test complejo</p>
        <p>19. Probar keywords: Ejecutar → Verificar reutilización</p>
        <p>20. Validar proyecto: robot tests/ → Todo verde</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear estructura profesional de proyecto Robot Framework</li>
                <li>Configurar directorios y archivos base organizados</li>
                <li>Implementar sistema de configuración por ambientes</li>
                <li>Ejecutar y validar proyecto completo funcional</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Estructura correcta desde inicio = 80% menos mantenimiento. Organiza tests, resources y config desde día uno.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 006 - Estructura de directorios y buenas prácticas</h3>
        <p>Con proyecto base creado, aprenderás las mejores prácticas para organizar proyectos grandes y mantener código limpio.</p>
    `,
    topics: ["proyecto", "estructura", "pycharm"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 8,
    difficulty: "easy",
    prerequisites: ["lesson-004"],
    type: "foundation"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_005 = LESSON_005;
}