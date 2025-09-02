/**
 * Robot Framework Academy - Lesson 152
 * Data-Driven 152
 */

const LESSON_152 = {
    id: 152,
    title: "Data-Driven 152",
    duration: "7 min",
    level: "intermediate",
    section: "section-11",
    content: `
        <h2>📋 YAML JSON Avanzado</h2>
        <p>Parametrización compleja usando archivos YAML y JSON para tests enterprise.</p>
        
        <h3>💻 Tests YAML:</h3>
        <pre><code class="robot">*** Settings ***
Library    Collections
Library    OperatingSystem
Library    SeleniumLibrary
Library    yaml
Library    json

*** Variables ***
\${CONFIG_FILE}      \${CURDIR}/test_config.yaml
\${USERS_JSON}       \${CURDIR}/users_data.json
\${BROWSER}          chrome
\${BASE_URL}         https://test-app.com
\${TIMEOUT}          10s
\${RESULTS_DIR}      \${CURDIR}/results

*** Test Cases ***
Load Test Configuration YAML
    [Documentation]    Carga configuración desde YAML
    [Tags]             yaml    config    data-driven
    
    \${config_content}=    Get File    \${CONFIG_FILE}
    \${config}=           yaml.Safe Load    \${config_content}
    
    Set Global Variable    \${TEST_CONFIG}    \${config}
    
    \${environments}=      Get From Dictionary    \${config}    environments
    \${test_data}=        Get From Dictionary    \${config}    test_data
    \${browsers}=         Get From Dictionary    \${config}    browsers
    
    Should Contain        \${environments}    dev
    Should Contain        \${environments}    staging
    Should Contain        \${test_data}      users
    Should Contain        \${browsers}       chrome
    
    Log    ✓ Configuración YAML cargada: \${config.keys()}

Multi-Browser Testing YAML
    [Documentation]    Tests en múltiples browsers desde YAML
    [Tags]             yaml    multi-browser    parametric
    
    \${browsers_list}=    Get From Dictionary    \${TEST_CONFIG.browsers}    supported
    
    FOR    \${browser_config}    IN    @{browsers_list}
        \${browser_name}=     Get From Dictionary    \${browser_config}    name
        \${browser_options}=  Get From Dictionary    \${browser_config}    options
        \${window_size}=      Get From Dictionary    \${browser_config}    window_size
        
        Log    Testing en browser: \${browser_name}
        Open Browser          \${BASE_URL}    \${browser_name}
        Set Window Size       \${window_size.width}    \${window_size.height}
        
        Title Should Be       \${TEST_CONFIG.expected.page_title}
        Page Should Contain   \${TEST_CONFIG.expected.welcome_text}
        
        Take Screenshot       \${RESULTS_DIR}/\${browser_name}_homepage.png
        Close Browser
        
        Log    ✓ Browser \${browser_name} OK
    END

JSON Users Data-Driven
    [Documentation]    Login masivo con datos JSON complejos
    [Tags]             json    users    data-driven
    
    \${users_content}=    Get File    \${USERS_JSON}
    \${users_data}=      json.Loads    \${users_content}
    
    \${test_users}=      Get From Dictionary    \${users_data}    test_users
    
    Open Browser         \${BASE_URL}/login    \${BROWSER}
    
    FOR    \${user}    IN    @{test_users}
        \${username}=        Get From Dictionary    \${user}    username
        \${password}=        Get From Dictionary    \${user}    password
        \${role}=           Get From Dictionary    \${user}    role
        \${permissions}=    Get From Dictionary    \${user}    permissions
        \${expected_page}=  Get From Dictionary    \${user}    expected_landing
        
        Clear Element Text   id=username
        Clear Element Text   id=password
        
        Input Text          id=username    \${username}
        Input Password      id=password    \${password}
        Click Button        id=login-btn
        
        Wait Until Location Is    \${BASE_URL}\${expected_page}    \${TIMEOUT}
        Page Should Contain      \${role}
        
        FOR    \${permission}    IN    @{permissions}
            Page Should Contain Element    css=[data-permission="\${permission}"]
        END
        
        Click Link          Logout
        Wait Until Page Contains Element    id=username
        
        Log    ✓ Usuario \${username} (\${role}): OK
    END
    
    Close Browser

Environment Matrix Testing
    [Documentation]    Tests cross-environment usando YAML
    [Tags]             yaml    environments    matrix
    
    \${environments}=    Get From Dictionary    \${TEST_CONFIG}    environments
    \${test_scenarios}=  Get From Dictionary    \${TEST_CONFIG}    scenarios
    
    FOR    \${env_name}    IN    @{environments.keys()}
        \${env_config}=      Get From Dictionary    \${environments}    \${env_name}
        \${env_url}=        Get From Dictionary    \${env_config}    url
        \${env_database}=   Get From Dictionary    \${env_config}    database
        
        Log    Testing environment: \${env_name} (\${env_url})
        
        FOR    \${scenario}    IN    @{test_scenarios}
            \${scenario_name}=  Get From Dictionary    \${scenario}    name
            \${steps}=          Get From Dictionary    \${scenario}    steps
            
            Open Browser        \${env_url}    \${BROWSER}
            
            FOR    \${step}    IN    @{steps}
                \${action}=      Get From Dictionary    \${step}    action
                \${target}=      Get From Dictionary    \${step}    target
                \${value}=       Get From Dictionary    \${step}    value
                
                Run Keyword If    '\${action}' == 'click'
                ...              Click Element    \${target}
                ...    ELSE IF    '\${action}' == 'input'  
                ...              Input Text       \${target}    \${value}
                ...    ELSE IF    '\${action}' == 'verify'
                ...              Page Should Contain    \${value}
                
                Log    ✓ Step: \${action} \${target}
            END
            
            Take Screenshot     \${RESULTS_DIR}/\${env_name}_\${scenario_name}.png
            Close Browser
            
            Log    ✓ Scenario \${scenario_name} en \${env_name}: OK
        END
    END</code></pre>
        
        <h3>🎯 Práctica YAML JSON (5 min):</h3>
        <p>1. Instala PyYAML: <code>pip install PyYAML</code></p>
        <p>2. Crea test_config.yaml con environments (dev, staging, prod) y browsers</p>
        <p>3. Agrega sección scenarios con 3 escenarios diferentes de testing</p>
        <p>4. Crea users_data.json con 5 usuarios de diferentes roles y permisos</p>
        <p>5. Ejecuta "Load Test Configuration YAML" y verifica carga correcta</p>
        <p>6. Prueba "Multi-Browser Testing YAML" con Chrome y Firefox</p>
        <p>7. Ejecuta "JSON Users Data-Driven" con tus usuarios JSON</p>
        <p>8. Modifica el archivo YAML agregando nueva configuración de browser</p>
        <p>9. Experimenta con "Environment Matrix Testing" usando 2 ambientes</p>
        <p>10. Agrega validación de campos obligatorios en archivos de configuración</p>
        <p>11. Crea test que combine datos de YAML y JSON en una sola ejecución</p>
        <p>12. Practica manejo de errores cuando archivos YAML/JSON están malformados</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Cargar configuraciones complejas desde archivos YAML</li>
                <li>Parsear datos JSON estructurados para testing masivo</li>
                <li>Implementar matrix testing cross-environment y cross-browser</li>
                <li>Combinar múltiples fuentes de datos en tests parametrizados</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>YAML es perfecto para configuraciones complejas, JSON para datasets estructurados. Combínalos para máxima flexibilidad.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 153 - Data-Driven 153</h3>
        <p>Dominarás técnicas de templating y generación dinámica de test data para casos enterprise de alta complejidad.</p>
    `,
    topics: ["data-driven", "excel", "csv"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-151"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_152 = LESSON_152;
}