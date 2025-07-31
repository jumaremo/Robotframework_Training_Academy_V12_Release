/**
 * Robot Framework Academy - Lesson 005 (VERSIÓN SIMPLE)
 * Creación del primer proyecto
 */

const LESSON_005 = {
    id: 5,
    title: "Creación del primer proyecto",
    duration: "8 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#005 robot framework proyecto estructura pycharm setup organization",
    content: `
        <h2>🧠 Primer Proyecto RF</h2>
        <p>Estructura correcta = tests organizados + fácil mantenimiento. Hazlo bien desde el inicio.</p>
        
        <h3>💻 Código proyecto:</h3>
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
        
        <h3>🎯 Práctica (6 min):</h3>
        <p><strong>1. Crear directorio:</strong> Desktop → New Folder → "robot-academy-project"</p>
        <p><strong>2. Abrir PyCharm:</strong> File → Open → Seleccionar carpeta proyecto</p>
        <p><strong>3. Crear estructura:</strong> New → Directory → "tests", "resources", "config", "data", "reports"</p>
        <p><strong>4. Crear README.md:</strong> New → File → README.md → Documentar proyecto</p>
        <p><strong>5. Crear requirements.txt:</strong> New → File → requirements.txt → Listar dependencias</p>
        <p><strong>6. Instalar dependencias:</strong> Terminal → pip install -r requirements.txt</p>
        <p><strong>7. Crear primer test:</strong> tests/ → New → primer_test.robot → Código básico</p>
        <p><strong>8. Crear keywords:</strong> resources/ → common_keywords.robot → Keywords comunes</p>
        <p><strong>9. Crear configuración:</strong> config/ → environments.yaml → URLs por ambiente</p>
        <p><strong>10. Crear datos:</strong> data/ → test_data.csv → Datos para tests</p>
        <p><strong>11. Ejecutar test:</strong> Terminal → robot tests/primer_test.robot</p>
        <p><strong>12. Ver reporte:</strong> Abrir report.html → Verificar resultados verdes</p>
        <p><strong>13. Crear .gitignore:</strong> New → .gitignore → Excluir reports/, *.pyc</p>
        <p><strong>14. Inicializar Git:</strong> Terminal → git init → git add . → git commit</p>
        <p><strong>15. Ejecutar completo:</strong> Terminal → robot --outputdir reports tests/</p>
        <p><strong>16. Actualizar README:</strong> README.md → Agregar instrucciones de uso</p>
        <p><strong>17. Verificar estructura:</strong> Project view → Validar organización</p>
        <p><strong>18. Crear segundo test:</strong> tests/ → login_test.robot → Test complejo</p>
        <p><strong>19. Probar keywords:</strong> Ejecutar → Verificar keywords reutilizables</p>
        <p><strong>20. Validar proyecto:</strong> Terminal → robot tests/ → Todo verde</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear estructura proyecto Robot Framework profesional</li>
                <li>Organizar tests, resources, config y data</li>
                <li>Configurar PyCharm para máxima productividad</li>
                <li>Usar Git para control de versiones</li>
                <li>Ejecutar tests y generar reportes</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Estructura correcta desde inicio = 80% menos mantenimiento después.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 006 - Estructura de directorios y buenas prácticas</h3>
        <p>Profundizaremos en naming conventions y organización escalable.</p>
    `,
    topics: ["proyecto", "estructura", "pycharm"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-004"],
    estimatedTime: 8,
    difficulty: "easy",
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_005 = LESSON_005;
}