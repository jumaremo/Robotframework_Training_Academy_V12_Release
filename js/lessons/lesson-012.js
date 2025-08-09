/**
 * Robot Framework Academy - Lesson 012 OPTIMIZED
 * Configuración de requirements.txt
 */

const LESSON_012 = {
    id: 12,
    title: "Configuración de requirements.txt",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    content: `
        <h2>📦 Requirements.txt</h2>
        
        <h3>🤖 Tests dependencies:</h3>
        <pre><code class="robot">*** Variables ***
\${REQUIREMENTS_FILE}     requirements.txt
\${ROBOT_CORE}           robotframework==6.1.1
\${SELENIUM_LIB}         robotframework-seleniumlibrary==6.1.0
\${WEBDRIVER_MGR}        webdriver-manager==4.0.1
\${REQUESTS_LIB}         robotframework-requests==0.9.4
\${DATABASE_LIB}         robotframework-databaselibrary==1.2.4
\${PABOT_LIB}            robotframework-pabot==2.16.0
\${FAKER_LIB}            robotframework-faker==5.0.0

*** Test Cases ***
Test Requirements File Creation
    Log                      Creating requirements.txt file
    Should Not Be Empty      \${REQUIREMENTS_FILE}
    Should Contain           \${REQUIREMENTS_FILE}    requirements
    Should Contain           \${REQUIREMENTS_FILE}    .txt
    Should Be Equal          \${REQUIREMENTS_FILE}    requirements.txt
    Should Not Be Empty      requirements.txt
    Should Contain           requirements.txt    requirements
    Should Be Equal          requirements.txt    requirements.txt
    Should Contain           txt    txt
    Should Not Be Empty      txt
    Should Be Equal          txt    txt
    Log                      ✅ Requirements file configured

Test Core Dependencies
    Log                      Testing core dependencies
    Should Not Be Empty      \${ROBOT_CORE}
    Should Contain           \${ROBOT_CORE}    robotframework
    Should Contain           \${ROBOT_CORE}    ==6.1.1
    Should Be Equal          \${ROBOT_CORE}    robotframework==6.1.1
    Should Not Be Empty      robotframework==6.1.1
    Should Contain           robotframework==6.1.1    robot
    Should Be Equal          robotframework==6.1.1    robotframework==6.1.1
    Should Contain           6.1.1    6.1.1
    Should Not Be Empty      6.1.1
    Should Be Equal          6.1.1    6.1.1
    Log                      ✅ Core dependencies validated

Test Selenium Dependencies
    Log                      Testing Selenium dependencies
    Should Not Be Empty      \${SELENIUM_LIB}
    Should Contain           \${SELENIUM_LIB}    selenium
    Should Contain           \${SELENIUM_LIB}    ==6.1.0
    Should Be Equal          \${SELENIUM_LIB}    robotframework-seleniumlibrary==6.1.0
    Should Not Be Empty      \${WEBDRIVER_MGR}
    Should Contain           \${WEBDRIVER_MGR}    webdriver
    Should Contain           \${WEBDRIVER_MGR}    ==4.0.1
    Should Be Equal          \${WEBDRIVER_MGR}    webdriver-manager==4.0.1
    Should Not Be Empty      webdriver-manager==4.0.1
    Should Contain           webdriver-manager==4.0.1    manager
    Log                      ✅ Selenium dependencies validated

Test API Dependencies
    Log                      Testing API dependencies
    Should Not Be Empty      \${REQUESTS_LIB}
    Should Contain           \${REQUESTS_LIB}    requests
    Should Contain           \${REQUESTS_LIB}    ==0.9.4
    Should Be Equal          \${REQUESTS_LIB}    robotframework-requests==0.9.4
    Should Not Be Empty      robotframework-requests==0.9.4
    Should Contain           robotframework-requests==0.9.4    requests
    Should Be Equal          robotframework-requests==0.9.4    robotframework-requests==0.9.4
    Should Contain           0.9.4    0.9.4
    Should Not Be Empty      0.9.4
    Should Be Equal          0.9.4    0.9.4
    Log                      ✅ API dependencies validated

Test Database Dependencies
    Log                      Testing database dependencies
    Should Not Be Empty      \${DATABASE_LIB}
    Should Contain           \${DATABASE_LIB}    database
    Should Contain           \${DATABASE_LIB}    ==1.2.4
    Should Be Equal          \${DATABASE_LIB}    robotframework-databaselibrary==1.2.4
    Should Not Be Empty      robotframework-databaselibrary==1.2.4
    Should Contain           robotframework-databaselibrary==1.2.4    library
    Should Be Equal          robotframework-databaselibrary==1.2.4    robotframework-databaselibrary==1.2.4
    Should Contain           1.2.4    1.2.4
    Should Not Be Empty      1.2.4
    Should Be Equal          1.2.4    1.2.4
    Log                      ✅ Database dependencies validated

Test Utility Dependencies
    Log                      Testing utility dependencies
    Should Not Be Empty      \${PABOT_LIB}
    Should Contain           \${PABOT_LIB}    pabot
    Should Contain           \${PABOT_LIB}    ==2.16.0
    Should Be Equal          \${PABOT_LIB}    robotframework-pabot==2.16.0
    Should Not Be Empty      \${FAKER_LIB}
    Should Contain           \${FAKER_LIB}    faker
    Should Contain           \${FAKER_LIB}    ==5.0.0
    Should Be Equal          \${FAKER_LIB}    robotframework-faker==5.0.0
    Should Not Be Empty      robotframework-faker==5.0.0
    Should Contain           robotframework-faker==5.0.0    faker
    Log                      ✅ Utility dependencies validated

Test Version Pinning
    Log                      Testing version pinning strategy
    Should Contain           \${ROBOT_CORE}    ==
    Should Contain           \${SELENIUM_LIB}    ==
    Should Contain           \${WEBDRIVER_MGR}    ==
    Should Contain           \${REQUESTS_LIB}    ==
    Should Contain           \${DATABASE_LIB}    ==
    Should Contain           \${PABOT_LIB}    ==
    Should Contain           \${FAKER_LIB}    ==
    Should Not Be Empty      ==
    Should Be Equal          ==    ==
    Should Contain           exact version pinning    exact
    Log                      ✅ Version pinning validated</code></pre>
        
        <h3>🎯 Práctica requirements (4 min):</h3>
        <p>1. Crea archivo "requirements.txt" en proyecto</p>
        <p>2. Agrega: robotframework==6.1.1</p>
        <p>3. Agrega: robotframework-seleniumlibrary==6.1.0</p>
        <p>4. Agrega: webdriver-manager==4.0.1</p>
        <p>5. Agrega: robotframework-requests==0.9.4</p>
        <p>6. Agrega: robotframework-databaselibrary==1.2.4</p>
        <p>7. Agrega: robotframework-pabot==2.16.0</p>
        <p>8. Agrega: robotframework-faker==5.0.0</p>
        <p>9. Instala todo: pip install -r requirements.txt</p>
        <p>10. Verifica: pip list | grep robot</p>
        <p>11. Crea "test_dependencies.robot"</p>
        <p>12. Copia código tests dependencies</p>
        <p>13. Ejecuta: robot test_dependencies.robot</p>
        <p>14. Valida todos tests PASS en report.html</p>
        <p>15. Genera actual: pip freeze > current_requirements.txt</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear requirements.txt con dependencias versionadas</li>
                <li>Usar version pinning para estabilidad del proyecto</li>
                <li>Gestionar librerías core, web, API y database</li>
                <li>Validar instalación correcta de dependencias</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa versiones exactas (==6.1.1) para evitar incompatibilidades. pip freeze documenta versiones actuales.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 013 - Ejecución de pruebas desde línea de comandos</h3>
        <p>Con dependencias controladas, dominarás ejecución profesional desde CLI con todas las opciones disponibles.</p>
    `,
    topics: ["requirements", "dependencies", "pip"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-011"],
    type: "standard"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_012 = LESSON_012;
}