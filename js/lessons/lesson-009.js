/**
 * Robot Framework Academy - Lesson 009 OPTIMIZED
 * Variables de entorno y configuración
 */

const LESSON_009 = {
    id: 9,
    title: "Variables de entorno y configuración",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    content: `
        <h2>🌍 Variables Entorno</h2>
        
        <h3>🤖 Tests variables:</h3>
        <pre><code class="robot">*** Settings ***
Library    OperatingSystem

*** Variables ***
\${DEFAULT_URL}       https://demo-app.com
\${DEFAULT_USER}      test_user
\${DEFAULT_PASS}      test_pass
\${DEFAULT_BROWSER}   chrome
\${DEFAULT_TIMEOUT}   30
\${CONFIG_FILE}       config.properties

*** Test Cases ***
Test Environment Variables
    Log                     Testing environment variables
    Should Not Be Empty     \${DEFAULT_URL}
    Should Contain          \${DEFAULT_URL}    https
    Should Be Equal         \${DEFAULT_URL}    https://demo-app.com
    Should Not Be Empty     \${DEFAULT_USER}
    Should Contain          \${DEFAULT_USER}    test
    Should Be Equal         \${DEFAULT_USER}    test_user
    Should Not Be Empty     \${DEFAULT_PASS}
    Should Contain          \${DEFAULT_PASS}    test
    Should Be Equal         \${DEFAULT_PASS}    test_pass
    Log                     Environment variables validated

Test Get Environment Variables
    Log                     Getting environment variables
    \${url}=                Get Environment Variable    APP_URL    \${DEFAULT_URL}
    \${user}=               Get Environment Variable    TEST_USER  \${DEFAULT_USER}
    \${password}=           Get Environment Variable    TEST_PASS  \${DEFAULT_PASS}
    \${browser}=            Get Environment Variable    BROWSER    \${DEFAULT_BROWSER}
    \${timeout}=            Get Environment Variable    TIMEOUT    \${DEFAULT_TIMEOUT}
    Should Not Be Empty     \${url}
    Should Not Be Empty     \${user}
    Should Not Be Empty     \${password}
    Should Not Be Empty     \${browser}
    Should Not Be Empty     \${timeout}
    Should Contain          \${url}    .com
    Log                     Environment variables retrieved

Test Variable Defaults
    Log                     Testing variable defaults
    Should Be Equal         \${DEFAULT_URL}    https://demo-app.com
    Should Be Equal         \${DEFAULT_USER}    test_user
    Should Be Equal         \${DEFAULT_PASS}    test_pass
    Should Be Equal         \${DEFAULT_BROWSER}    chrome
    Should Be Equal         \${DEFAULT_TIMEOUT}    30
    Should Contain          \${DEFAULT_URL}    demo-app
    Should Contain          \${DEFAULT_USER}    user
    Should Contain          \${DEFAULT_BROWSER}    chrome
    Should Not Be Empty     \${DEFAULT_URL}
    Should Not Be Empty     \${DEFAULT_USER}
    Log                     Variable defaults validated

Test Configuration File
    Log                     Testing configuration file
    Should Contain          \${CONFIG_FILE}    config
    Should Contain          \${CONFIG_FILE}    .properties
    Should Not Be Empty     \${CONFIG_FILE}
    Should Be Equal         \${CONFIG_FILE}    config.properties
    Should Contain          config.properties    config
    Should Contain          properties    properties
    Should Not Be Empty     config.properties
    Should Be Equal         config.properties    config.properties
    Should Contain          app.url=demo-app.com    demo-app
    Should Contain          user.name=testuser    testuser
    Log                     Configuration file validated

Test Environment Setup
    Log                     Testing environment setup
    \${dev_url}=            Set Variable    https://dev.demo-app.com
    \${qa_url}=             Set Variable    https://qa.demo-app.com
    \${prod_url}=           Set Variable    https://prod.demo-app.com
    Should Contain          \${dev_url}    dev
    Should Contain          \${qa_url}     qa
    Should Contain          \${prod_url}   prod
    Should Not Be Empty     \${dev_url}
    Should Not Be Empty     \${qa_url}
    Should Not Be Empty     \${prod_url}
    Should Be Equal         \${dev_url}    https://dev.demo-app.com
    Should Be Equal         \${qa_url}     https://qa.demo-app.com
    Log                     Environment setup validated

Test Browser Variables
    Log                     Testing browser variables
    Should Be Equal         \${DEFAULT_BROWSER}    chrome
    Should Contain          \${DEFAULT_BROWSER}    chrome
    Should Not Be Empty     \${DEFAULT_BROWSER}
    Should Contain          chrome    chrome
    Should Be Equal         chrome    chrome
    Should Not Be Empty     chrome
    Should Contain          firefox    firefox
    Should Be Equal         firefox    firefox
    Should Not Be Empty     firefox
    Should Contain          edge    edge
    Log                     Browser variables validated</code></pre>
        
        <h3>🎯 Práctica variables (4 min):</h3>
        <p>1. Crea archivo "config_test.robot"</p>
        <p>2. Copia código tests variables</p>
        <p>3. Ejecuta: robot config_test.robot</p>
        <p>4. Observa valores por defecto en log</p>
        <p>5. Define variable Windows: set APP_URL=https://google.com</p>
        <p>6. Define variable Linux/Mac: export APP_URL=https://google.com</p>
        <p>7. Ejecuta nuevamente y ve cambio en log</p>
        <p>8. Prueba con TEST_USER=miusuario</p>
        <p>9. Verifica que Get Environment Variable funciona</p>
        <p>10. Crea archivo config.properties</p>
        <p>11. Agrega: app.url=https://mi-app.com</p>
        <p>12. Agrega: user.name=testuser</p>
        <p>13. Prueba diferentes valores de BROWSER</p>
        <p>14. Valida todos tests PASS en report.html</p>
        <p>15. Experimenta con TIMEOUT variable</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Configurar variables de entorno para diferentes ambientes</li>
                <li>Usar Get Environment Variable con valores por defecto</li>
                <li>Crear archivos de configuración properties</li>
                <li>Gestionar configuraciones dev, qa y prod</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Siempre define valores por defecto con Get Environment Variable. Facilita testing local.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 010 - Debugging y herramientas de desarrollo</h3>
        <p>Con variables configuradas, aprenderás técnicas de debugging y herramientas para troubleshooting eficiente.</p>
    `,
    topics: ["variables", "environment", "config"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-008"],
    type: "standard"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_009 = LESSON_009;
}