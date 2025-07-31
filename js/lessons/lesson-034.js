const LESSON_034 = {
    id: 34,
    title: "Archivos de variables YAML/JSON",
    duration: "5 min",
    level: "beginner",
    section: "section-03",
    content: `
        <h2>📄 YAML/JSON Variables</h2>
        <p>Carga y uso de archivos de variables externos en formato YAML y JSON.</p>
        
        <h3>💻 External Variable Files:</h3>
        <pre><code class="robot">
*** Variables ***
\${CONFIG_FILE}       config/app_config.yaml
\${DATA_FILE}         test_data/users.json
\${ENV_CONFIG}        config/\${ENVIRONMENT}.yaml

*** Test Cases ***
Test YAML Configuration File Loading
    [Documentation]    Demonstrates loading configuration from YAML file
    [Tags]    variables    yaml    configuration
    \${config}    Load YAML    \${CONFIG_FILE}
    Log    App name: \${config}[app][name]
    Log    App version: \${config}[app][version]
    Log    Database host: \${config}[database][host]
    Should Be Equal    \${config}[app][name]    MyTestApp
    Should Not Be Empty    \${config}[database][host]

Test JSON Test Data Loading
    [Documentation]    Shows loading test data from JSON file
    [Tags]    variables    json    testdata
    \${users}    Load JSON    \${DATA_FILE}
    \${first_user}    Set Variable    \${users}[0]
    Log    First user name: \${first_user}[name]
    Log    First user email: \${first_user}[email]
    Should Contain    \${first_user}[email]    @
    \${user_count}    Get Length    \${users}
    Should Be True    \${user_count} > 0

Test Environment Specific Configuration
    [Documentation]    Loads configuration based on environment variable
    [Tags]    variables    environment    yaml
    \${environment}    Get Environment Variable    ENVIRONMENT    dev
    \${env_config_file}    Set Variable    config/\${environment}.yaml
    File Should Exist    \${env_config_file}
    \${env_config}    Load YAML    \${env_config_file}
    Log    Environment: \${environment}
    Log    Base URL: \${env_config}[base_url]
    Should Contain    \${env_config}[base_url]    http

Test Nested Data Structure Access
    [Documentation]    Demonstrates accessing nested data in YAML/JSON
    [Tags]    variables    nested    data
    \${config}    Load YAML    \${CONFIG_FILE}
    \${db_config}    Set Variable    \${config}[database]
    \${api_config}    Set Variable    \${config}[api]
    Log    Database host: \${db_config}[host]
    Log    Database port: \${db_config}[port]
    Log    API endpoint: \${api_config}[endpoint]
    Log    API timeout: \${api_config}[timeout]
    Should Be True    \${db_config}[port] > 0

Test Dynamic Variable File Selection
    [Documentation]    Selects variable file based on runtime conditions
    [Tags]    variables    dynamic    selection
    \${test_type}    Get Environment Variable    TEST_TYPE    integration
    \${var_file}    Run Keyword If    '\${test_type}' == 'unit'
    ...    Set Variable    test_data/unit_data.json
    ...    ELSE IF    '\${test_type}' == 'integration'
    ...    Set Variable    test_data/integration_data.json
    ...    ELSE    Set Variable    test_data/default_data.json
    File Should Exist    \${var_file}
    Log    Using data file: \${var_file}

Test JSON Schema Validation
    [Documentation]    Validates JSON data structure and required fields
    [Tags]    variables    json    validation
    \${data}    Load JSON    \${DATA_FILE}
    FOR    \${user}    IN    @{data}
        Dictionary Should Contain Key    \${user}    name
        Dictionary Should Contain Key    \${user}    email
        Dictionary Should Contain Key    \${user}    role
        Should Match Regexp    \${user}[email]    ^[^@]+@[^@]+\\.[^@]+$
        Log    Validated user: \${user}[name]
    END

Test Configuration Merging
    [Documentation]    Merges multiple configuration files
    [Tags]    variables    configuration    merging
    \${base_config}    Load YAML    config/base.yaml
    \${env_config}     Load YAML    config/dev.yaml
    \${merged_config}  Merge Configurations    \${base_config}    \${env_config}
    Log Dictionary    \${merged_config}
    Should Contain    \${merged_config}    base_settings
    Should Contain    \${merged_config}    env_settings

*** Keywords ***
Load YAML
    [Documentation]    Loads and parses YAML file
    [Arguments]    \${file_path}
    File Should Exist    \${file_path}
    \${content}    Get File    \${file_path}
    \${yaml_data}    Evaluate    yaml.safe_load('''
\${content}''')    modules=yaml
    Log    Loaded YAML from: \${file_path}
    RETURN    \${yaml_data}

Load JSON
    [Documentation]    Loads and parses JSON file
    [Arguments]    \${file_path}
    File Should Exist    \${file_path}
    \${content}    Get File    \${file_path}
    \${json_data}    Evaluate    json.loads('''
\${content}''')    modules=json
    Log    Loaded JSON from: \${file_path}
    RETURN    \${json_data}

Validate Configuration Structure
    [Documentation]    Validates configuration has required sections
    [Arguments]    \${config}    @{required_sections}
    FOR    \${section}    IN    @{required_sections}
        Dictionary Should Contain Key    \${config}    \${section}
        Log    Section '\${section}' found in configuration
    END
    Log    Configuration structure validated

Create Sample YAML File
    [Documentation]    Creates sample YAML configuration file
    [Arguments]    \${file_path}
    \${yaml_content}    Set Variable    app:
  name: MyTestApp
  version: 1.0.0
database:
  host: localhost
  port: 5432
  name: testdb
api:
  endpoint: /api/v1
  timeout: 30
    Create File    \${file_path}    \${yaml_content}
    Log    Sample YAML file created: \${file_path}

Create Sample JSON File
    [Documentation]    Creates sample JSON test data file
    [Arguments]    \${file_path}
    \${json_content}    Set Variable    [
  {
    "name": "John Doe",
    "email": "john@test.com",
    "role": "admin"
  },
  {
    "name": "Jane Smith", 
    "email": "jane@test.com",
    "role": "user"
  }
]
    Create File    \${file_path}    \${json_content}
    Log    Sample JSON file created: \${file_path}

Merge Configurations
    [Documentation]    Merges two configuration dictionaries
    [Arguments]    \${base_config}    \${override_config}
    \${merged}    Copy Dictionary    \${base_config}
    FOR    \${key}    \${value}    IN    &{override_config}
        Set To Dictionary    \${merged}    \${key}=\${value}
    END
    Log    Configurations merged successfully
    RETURN    \${merged}
        </code></pre>
        
        <h3>🎯 Práctica YAML/JSON Variables (4 min):</h3>
        <ol>
            <li><strong>Load YAML files:</strong> Crear keyword para cargar archivos YAML con yaml.safe_load</li>
            <li><strong>Load JSON files:</strong> Usar json.loads para parsear archivos JSON</li>
            <li><strong>File validation:</strong> Verificar que archivos existan antes de cargar</li>
            <li><strong>Nested access:</strong> Acceder datos anidados con \${config}[section][key]</li>
            <li><strong>Environment configs:</strong> Cargar configuración específica por ambiente</li>
            <li><strong>Test data files:</strong> Organizar datos de prueba en archivos JSON separados</li>
            <li><strong>Schema validation:</strong> Validar estructura y campos requeridos</li>
            <li><strong>Dynamic file selection:</strong> Elegir archivo basado en variables de entorno</li>
            <li><strong>Configuration merging:</strong> Combinar configuración base con overrides</li>
            <li><strong>Sample file creation:</strong> Crear archivos de ejemplo para testing</li>
            <li><strong>Error handling:</strong> Manejar errores de parsing y archivos faltantes</li>
            <li><strong>Data iteration:</strong> Iterar sobre arrays en JSON con FOR loops</li>
            <li><strong>Dictionary operations:</strong> Usar Dictionary Should Contain Key para validar</li>
            <li><strong>File organization:</strong> Organizar archivos en directorios config/ y test_data/</li>
            <li><strong>Complete workflow:</strong> Implementar flujo completo de carga y validación</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar carga de archivos YAML y JSON externos para configuración</li>
                <li>Implementar organización escalable de datos de prueba en archivos</li>
                <li>Crear configuraciones por ambiente usando archivos externos</li>
                <li>Validar estructura y contenido de datos cargados desde archivos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Organiza archivos en directorios config/ y test_data/. Usa YAML para configuración (más legible) y JSON para datos de prueba (más compacto).</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 035 - Variables dinámicas con Python</h3>
        <p>Aprenderemos a generar variables dinámicamente usando código Python embebido para casos complejos y cálculos avanzados.</p>
    `,
    topics: ["yaml", "json", "data-files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-033"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_034 = LESSON_034;
}