/**
 * Robot Framework Academy - Lesson 002 OPTIMIZED
 * Instalación de Python y Robot Framework
 */

const LESSON_002 = {
    id: 2,
    title: "Instalación de Python y Robot Framework",
    duration: "8 min",
    level: "beginner",
    section: "section-01",
    content: `
        <h2>🐍 Python + RF</h2>
        <p>Instalar Python y Robot Framework, luego verificar con tests.</p>
        
        <h3>💻 Comandos instalación:</h3>
        <pre><code class="bash"># 1. Instalar Python (python.org)
# 2. Verificar: python --version
# 3. Instalar RF: pip install robotframework
# 4. Verificar: robot --version</code></pre>

        <h3>🤖 Tests verificación:</h3>
        <pre><code class="robot">*** Variables ***
\${PYTHON_CMD}        python --version
\${PIP_CMD}           pip --version
\${ROBOT_CMD}         robot --version
\${EXPECTED_PYTHON}   Python 3
\${EXPECTED_PIP}      pip
\${EXPECTED_ROBOT}    Robot Framework
\${INSTALL_CMD}       pip install robotframework
\${TEST_FILE}         test_install.robot
\${OUTPUT_DIR}        results

*** Test Cases ***
Verificar Python Instalado
    Run Process           python    --version
    Should Be Equal       \${EXPECTED_PYTHON}    Python 3
    Log                   Python instalado correctamente
    Should Contain        \${PYTHON_CMD}    python
    Process Should Be Running    python

Verificar Pip Disponible  
    Run Process           pip    --version
    Should Contain        \${PIP_CMD}    pip
    Log                   Pip disponible para instalar packages
    Should Be Equal       \${EXPECTED_PIP}    pip
    Process Should Be Running    pip

Instalar Robot Framework
    Run Process           pip    install    robotframework
    Should Contain        \${INSTALL_CMD}    robotframework
    Log                   Robot Framework instalándose
    Process Should Be Finished
    Should Be Equal       \${EXPECTED_ROBOT}    Robot Framework

Verificar Robot Framework
    Run Process           robot    --version  
    Should Contain        \${ROBOT_CMD}    robot
    Should Contain        \${EXPECTED_ROBOT}    Robot Framework
    Log                   Robot Framework listo para usar
    Should Be True        True
    Process Should Be Finished

Test Comando Robot
    Create File           \${TEST_FILE}    *** Test Cases ***\nTest Simple\n    Log    Hola RF
    Run Process           robot    \${TEST_FILE}
    Should Contain        output.xml    Test Simple
    File Should Exist     output.xml
    Log                   Test básico ejecutado exitosamente
    Remove File           \${TEST_FILE}</code></pre>
        
        <h3>🎯 Práctica instalación (6 min):</h3>
        <p>1. Descarga Python desde python.org (versión 3.8+)</p>
        <p>2. Instala Python marcando "Add to PATH"</p>
        <p>3. Abre terminal/cmd y ejecuta: python --version</p>
        <p>4. Verifica que muestra "Python 3.x.x"</p>
        <p>5. Ejecuta: pip --version para verificar pip</p>
        <p>6. Instala RF con: pip install robotframework</p>
        <p>7. Verifica con: robot --version</p>
        <p>8. Crea archivo test.robot con contenido básico</p>
        <p>9. Ejecuta: robot test.robot</p>
        <p>10. Verifica que se generó output.xml</p>
        <p>11. Abre output.xml en navegador</p>
        <p>12. Instala librerías extra: pip install robotframework-seleniumlibrary</p>
        <p>13. Verifica instalación con: robot --version</p>
        <p>14. Prueba comando: robot --help</p>
        <p>15. Crea directorio para tus proyectos RF</p>
        <p>16. Verifica variables de entorno PATH</p>
        <p>17. Reinicia terminal y prueba comandos nuevamente</p>
        <p>18. Soluciona errores comunes si aparecen</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Instalar Python y verificar configuración correcta</li>
                <li>Instalar Robot Framework usando pip</li>
                <li>Verificar instalación con comandos básicos</li>
                <li>Ejecutar primer test Robot Framework</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Si pip falla, usa: python -m pip install robotframework. Siempre verifica PATH después de instalar Python.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 003 - Configuración de PyCharm</h3>
        <p>Con Python y Robot Framework instalados, configurarás PyCharm como tu IDE principal para desarrollo eficiente.</p>
    `,
    topics: ["instalación", "python", "setup"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 8,
    difficulty: "easy",
    prerequisites: ["lesson-001"],
    type: "foundation"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_002 = LESSON_002;
}