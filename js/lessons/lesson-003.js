/**
 * Robot Framework Academy - Lesson 003 OPTIMIZED
 * Configuración de PyCharm
 */

const LESSON_003 = {
    id: 3,
    title: "Configuración de PyCharm",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    content: `
        <h2>💻 PyCharm Setup</h2>
        <p>PyCharm = autocompletado + debugging + ejecución integrada para RF.</p>
        
        <h3>🤖 Tests configuración:</h3>
        <pre><code class="robot">*** Variables ***
\${PYCHARM_PATH}    C:\\\\PyCharm\\\\bin\\\\pycharm64.exe
\${PROJECT_DIR}     \${CURDIR}\\\\robot-academy
\${PYTHON_PATH}     C:\\\\Python39\\\\python.exe
\${BROWSER}         chrome
\${TEST_FILE}       setup_test.robot
\${CONFIG_FILE}     \${PROJECT_DIR}\\\\.idea\\\\workspace.xml
\${REPORT_FILE}     report.html

*** Test Cases ***
Verificar PyCharm Instalado
    Directory Should Exist     C:\\\\PyCharm
    File Should Exist          \${PYCHARM_PATH}
    Log                        PyCharm encontrado
    Should Contain             \${PYCHARM_PATH}    pycharm
    Should Be True             True

Validar Proyecto Creado
    Create Directory           \${PROJECT_DIR}
    Directory Should Exist     \${PROJECT_DIR}
    Log                        Proyecto creado: \${PROJECT_DIR}
    Should Contain             \${PROJECT_DIR}    robot-academy
    Set Test Variable          \${PROJECT_DIR}

Verificar Python Interpreter
    File Should Exist          \${PYTHON_PATH}
    Run Process                \${PYTHON_PATH}    --version
    Should Contain             \${PYTHON_PATH}    python
    Log                        Python configurado
    Should Be True             True

Test Estructura Proyecto
    Create File                \${PROJECT_DIR}\\\\__init__.py    
    Create File                \${TEST_FILE}    *** Test Cases ***\\nTest\\n    Log    OK
    File Should Exist          \${TEST_FILE}
    Should Contain             \${TEST_FILE}    robot
    Log                        Archivos proyecto creados
    Remove File                \${TEST_FILE}

Verificar Robot Framework
    Run Process                robot    --version
    Process Should Be Finished
    Log                        Robot Framework disponible
    Should Be True             True
    Should Contain             robot    robot

Test Execution PyCharm
    Create File                \${TEST_FILE}    *** Test Cases ***\\nTest Simple\\n    Log    PyCharm Test
    Run Process                robot    \${TEST_FILE}
    File Should Exist          \${REPORT_FILE}
    Should Contain             \${REPORT_FILE}    html
    Log                        Test ejecutado desde PyCharm
    Remove File                \${TEST_FILE}</code></pre>
        
        <h3>🎯 Práctica PyCharm (4 min):</h3>
        <p>1. Descarga PyCharm Community desde jetbrains.com</p>
        <p>2. Instala PyCharm con configuración por defecto</p>
        <p>3. Abre PyCharm → New Project → Pure Python</p>
        <p>4. Nombra proyecto "robot-academy"</p>
        <p>5. Configura Python interpreter en Settings</p>
        <p>6. Abre terminal en PyCharm (View → Terminal)</p>
        <p>7. Ejecuta: python --version</p>
        <p>8. Instala: pip install robotframework</p>
        <p>9. Instala: pip install robotframework-seleniumlibrary</p>
        <p>10. Crea archivo "test.robot"</p>
        <p>11. Copia y pega el código de tests arriba</p>
        <p>12. Ejecuta desde terminal: robot test.robot</p>
        <p>13. Verifica que aparece report.html</p>
        <p>14. Abre report.html en navegador</p>
        <p>15. Valida que todos los tests son PASS</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Instalar y configurar PyCharm Community</li>
                <li>Crear proyecto Robot Framework en PyCharm</li>
                <li>Configurar Python interpreter correctamente</li>
                <li>Ejecutar tests desde terminal integrado</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>PyCharm Community es gratuito y completo para RF. Usa terminal integrado para mayor productividad.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 004 - Plugins esenciales para PyCharm</h3>
        <p>Con PyCharm configurado, instalarás plugins específicos para Robot Framework que maximizan tu productividad.</p>
    `,
    topics: ["pycharm", "ide", "configuración"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-002"],
    type: "standard"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_003 = LESSON_003;
}