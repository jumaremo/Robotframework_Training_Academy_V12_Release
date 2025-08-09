/**
 * Robot Framework Academy - Lesson 003 (VERSIÓN SIMPLE)
 * Configuración de PyCharm
 */

const LESSON_003 = {
    id: 3,
    title: "Configuración de PyCharm",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#003 robot framework pycharm ide configuración setup development",
    content: `
        <h2>🧠 PyCharm = Robot Framework Superpoderes</h2>
        <p>PyCharm = autocompletado inteligente + debugging visual + ejecución integrada + detección errores en tiempo real. Configurarlo = escribir tests 5x más rápido con 90% menos errores.</p>
        
        <h3>💻 Configuración con Robot Framework:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    Mi primer proyecto Robot Framework
Library          SeleniumLibrary
Library          OperatingSystem

*** Variables ***
\${PYTHON_PATH}     C:\\\\Python39\\\\python.exe
\${PROJECT_DIR}     \${CURDIR}\\\\robot-tests
\${BROWSER}         chrome
\${PYCHARM_CONFIG}  \${PROJECT_DIR}\\\\config

*** Test Cases ***
Verificar Configuración PyCharm
    [Documentation]    Test para validar que PyCharm está configurado correctamente
    Log    Iniciando verificación de PyCharm
    
    # Validar Python interpreter
    \${result}=    Run    \${PYTHON_PATH} --version
    Should Contain    \${result}    Python 3
    Log    Python configurado: \${result}
    
    # Verificar estructura de proyecto
    Directory Should Exist    \${PROJECT_DIR}
    Create File    \${PROJECT_DIR}\\test.robot    *** Test Cases ***\\nPrimer Test\\n    Log    Hola PyCharm
    File Should Exist    \${PROJECT_DIR}\\test.robot
    
    # Test básico de Browser
    Open Browser    about:blank    \${BROWSER}
    Title Should Be    about:blank
    Close Browser
    
    Log    ✅ PyCharm configurado correctamente para Robot Framework</code></pre>
        
        <h3>🎯 Práctica Hands-On (4 min):</h3>
        <p><strong>1. Descargar:</strong> jetbrains.com/pycharm → Download Community → Instalar</p>
        <p><strong>2. Configurar Python:</strong> File → Settings → Project → Python Interpreter → Add</p>
        <p><strong>3. Crear proyecto:</strong> File → New Project → Pure Python → "robot-academy"</p>
        <p><strong>4. Verificar terminal:</strong> View → Tool Windows → Terminal → <code>python --version</code></p>
        <p><strong>5. Instalar Robot:</strong> Terminal → <code>pip install robotframework</code></p>
        <p><strong>6. Instalar Selenium:</strong> Terminal → <code>pip install robotframework-seleniumlibrary</code></p>
        <p><strong>7. Crear test:</strong> New → File → "setup_test.robot" → Pegar código arriba</p>
        <p><strong>8. Ejecutar test:</strong> Terminal → <code>robot setup_test.robot</code></p>
        <p><strong>9. Abrir reporte:</strong> Double-click report.html → Verificar PASS verde</p>
        <p><strong>10. Configurar shortcuts:</strong> File → Settings → Keymap → "Run" → F5</p>
        <p><strong>11. Instalar plugin:</strong> Settings → Plugins → "Robot Framework" → Install</p>
        <p><strong>12. Verificar syntax:</strong> Abrir .robot → Ver colores syntax highlighting</p>
        <p><strong>13. Configurar templates:</strong> Settings → File Templates → Add .robot template</p>
        <p><strong>14. Test autocompletado:</strong> Nuevo .robot → Escribir "Open" → Ver sugerencias</p>
        <p><strong>15. Validar setup:</strong> Crear segundo test → Ejecutar → Verificar éxito</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Por qué PyCharm es ideal para Robot Framework</li>
                <li>Cómo instalar y configurar PyCharm Community</li>
                <li>Cómo crear tu primer proyecto de testing</li>
                <li>Cómo configurar el Python interpreter correctamente</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>PyCharm Community es gratuito y completo para Robot Framework. No necesitas Professional.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 004 - Plugins esenciales para PyCharm</h3>
        <p>Ahora instalaremos los plugins que harán que PyCharm reconozca archivos .robot y te dé superpoderes de productividad.</p>
    `,
    topics: ["pycharm", "ide", "configuración"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-002"],
    estimatedTime: 5,
    difficulty: "easy"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_003 = LESSON_003;
}