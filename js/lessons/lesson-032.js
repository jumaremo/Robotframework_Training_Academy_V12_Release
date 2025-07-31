const LESSON_032 = {
    id: 32,
    title: "Variables de lista y diccionario",
    duration: "5 min",
    level: "beginner",
    section: "section-03",
    content: `
        <h2>📋 Listas y Diccionarios</h2>
        <p>Manejo de estructuras de datos complejas: listas y diccionarios en Robot Framework.</p>
        
        <h3>💻 Variables Lista Diccionario:</h3>
        <pre><code class="robot">
*** Variables ***
@{BROWSERS}           Chrome    Firefox    Safari    Edge
@{USER_ROLES}         admin     user       guest     moderator
@{TEST_EMAILS}        user1@test.com    user2@test.com    admin@test.com
&{USER_DATA}          name=John Doe    email=john@test.com    role=admin    active=true
&{CONFIG_DEV}         url=https://dev.app.com    timeout=5    debug=true
&{CONFIG_PROD}        url=https://app.com    timeout=10    debug=false

*** Test Cases ***
Test List Variables Basic Operations
    [Documentation]    Demonstrates basic list variable operations and access
    [Tags]    variables    list    basic
    Log    All browsers: @{BROWSERS}
    Log    First browser: \${BROWSERS}[0]
    Log    Last browser: \${BROWSERS}[-1]
    \${browser_count}    Get Length    \${BROWSERS}
    Should Be Equal As Numbers    \${browser_count}    4
    Should Contain    \${BROWSERS}    Chrome
    Log Many    @{BROWSERS}

Test List Manipulation And Modification
    [Documentation]    Shows how to modify and manipulate list variables
    [Tags]    variables    list    manipulation
    @{test_list}    Create List    item1    item2    item3
    Append To List    \${test_list}    item4
    \${list_length}    Get Length    \${test_list}
    Should Be Equal As Numbers    \${list_length}    4
    \${first_item}    Get From List    \${test_list}    0
    Should Be Equal    \${first_item}    item1
    Remove From List    \${test_list}    1
    Log    Modified list: @{test_list}

Test Dictionary Variables Access And Usage
    [Documentation]    Demonstrates dictionary variable access and operations
    [Tags]    variables    dictionary    access
    Log    User name: \${USER_DATA}[name]
    Log    User email: \${USER_DATA}[email]
    Log    User role: \${USER_DATA}[role]
    Log    All user data: &{USER_DATA}
    \${user_name}    Set Variable    \${USER_DATA}[name]
    Should Be Equal    \${user_name}    John Doe
    Should Be True    \${USER_DATA}[active]

Test Dictionary Manipulation And Updates
    [Documentation]    Shows dictionary modification and dynamic updates
    [Tags]    variables    dictionary    modification
    &{temp_config}    Create Dictionary    env=test    version=1.0    enabled=true
    Set To Dictionary    \${temp_config}    new_key=new_value
    \${config_env}    Get From Dictionary    \${temp_config}    env
    Should Be Equal    \${config_env}    test
    Dictionary Should Contain Key    \${temp_config}    new_key
    Log Dictionary    \${temp_config}

Test List Iteration With FOR Loop
    [Documentation]    Demonstrates iterating through list variables
    [Tags]    variables    list    iteration
    FOR    \${browser}    IN    @{BROWSERS}
        Log    Testing with browser: \${browser}
        Should Not Be Empty    \${browser}
        Run Keyword If    '\${browser}' == 'Chrome'    Log    Chrome is default browser
    END
    FOR    \${email}    IN    @{TEST_EMAILS}
        Should Contain    \${email}    @
        Log    Valid email format: \${email}
    END

Test Dictionary Iteration And Processing
    [Documentation]    Shows how to iterate through dictionary key-value pairs
    [Tags]    variables    dictionary    iteration
    FOR    \${key}    \${value}    IN    &{USER_DATA}
        Log    Key: \${key}, Value: \${value}
        Should Not Be Empty    \${key}
        Should Not Be Empty    \${value}
    END
    \${keys}    Get Dictionary Keys    \${USER_DATA}
    \${values}    Get Dictionary Values    \${USER_DATA}
    Log    Keys: @{keys}
    Log    Values: @{values}

Test Environment Configuration Selection
    [Documentation]    Demonstrates environment-specific configuration using dictionaries
    [Tags]    variables    configuration    environment
    \${environment}    Set Variable    dev
    \${config}    Run Keyword If    '\${environment}' == 'dev'    Set Variable    \${CONFIG_DEV}
    ...    ELSE    Set Variable    \${CONFIG_PROD}
    Log    Selected config URL: \${config}[url]
    Log    Selected config timeout: \${config}[timeout]
    Should Contain    \${config}[url]    app.com

*** Keywords ***
Process User List
    [Documentation]    Processes a list of users and validates data
    [Arguments]    @{user_list}
    FOR    \${user}    IN    @{user_list}
        Log    Processing user: \${user}
        Should Contain    \${user}    @
        \${domain}    Evaluate    '\${user}'.split('@')[1]
        Log    User domain: \${domain}
    END
    \${total_users}    Get Length    \${user_list}
    Log    Total users processed: \${total_users}

Validate Configuration Dictionary
    [Documentation]    Validates configuration dictionary has required keys
    [Arguments]    &{config_dict}
    Dictionary Should Contain Key    \${config_dict}    url
    Dictionary Should Contain Key    \${config_dict}    timeout
    \${url}    Get From Dictionary    \${config_dict}    url
    Should Match Regexp    \${url}    https?://.*
    Log    Configuration validated successfully

Create Dynamic User Data
    [Documentation]    Creates user data dictionary dynamically
    [Arguments]    \${name}    \${email}    \${role}=user
    &{dynamic_user}    Create Dictionary    name=\${name}    email=\${email}    role=\${role}
    Set To Dictionary    \${dynamic_user}    created_at=\${CURTIME}
    Log Dictionary    \${dynamic_user}
    RETURN    \${dynamic_user}
        </code></pre>
        
        <h3>🎯 Práctica Listas Diccionarios (4 min):</h3>
        <ol>
            <li><strong>Crear listas:</strong> Definir @{LIST} con múltiples elementos y acceder por índice</li>
            <li><strong>Manipular listas:</strong> Usar Append To List, Remove From List, Get From List</li>
            <li><strong>Crear diccionarios:</strong> Definir &{DICT} con key=value pairs</li>
            <li><strong>Acceder diccionarios:</strong> Usar \${DICT}[key] para obtener valores específicos</li>
            <li><strong>Iterar listas:</strong> FOR loop con IN @{LIST} para procesar cada elemento</li>
            <li><strong>Iterar diccionarios:</strong> FOR con \${key} \${value} IN &{DICT}</li>
            <li><strong>List operations:</strong> Get Length, Should Contain para validaciones</li>
            <li><strong>Dictionary operations:</strong> Set To Dictionary, Dictionary Should Contain Key</li>
            <li><strong>Dynamic creation:</strong> Create List y Create Dictionary en runtime</li>
            <li><strong>Log complex data:</strong> Log Many para listas, Log Dictionary para diccionarios</li>
            <li><strong>Nested access:</strong> Acceder elementos anidados en estructuras complejas</li>
            <li><strong>Type validation:</strong> Validar que variables son del tipo correcto</li>
            <li><strong>Configuration patterns:</strong> Usar diccionarios para configuraciones por ambiente</li>
            <li><strong>Data processing:</strong> Crear keywords que procesen listas y diccionarios</li>
            <li><strong>Complex scenarios:</strong> Combinar listas y diccionarios en casos reales</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar creación y manipulación de variables de lista (@{LIST})</li>
                <li>Implementar manejo efectivo de diccionarios (&{DICT}) para datos estructurados</li>
                <li>Usar iteración FOR para procesar listas y diccionarios dinámicamente</li>
                <li>Aplicar estructuras de datos complejas en configuraciones y test data</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa @{LIST} para datos secuenciales y &{DICT} para datos con clave-valor. La sintaxis \${LIST}[0] y \${DICT}[key] permite acceso directo a elementos específicos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 033 - Variables de entorno</h3>
        <p>Expandiremos hacia variables de entorno para configuraciones dinámicas y manejo de secretos del sistema operativo.</p>
    `,
    topics: ["list", "dictionary", "collections"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-031"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_032 = LESSON_032;
}