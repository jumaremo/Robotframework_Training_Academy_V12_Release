const LESSON_040 = {
    id: 40,
    title: "Configuración por ambientes",
    duration: "5 min",
    level: "beginner",
    section: "section-03",
    content: `
        <h2>🏗️ Config Ambientes</h2>
        <p>Sistemas robustos de configuración multi-ambiente usando variables y archivos externos.</p>
        
        <h3>💻 Environment Configuration:</h3>
        <pre><code class="robot">
*** Variables ***
\${DEFAULT_ENVIRONMENT}    dev
\${CONFIG_DIR}            config
\${CURRENT_ENV}           \${EMPTY}
\${ENV_CONFIG}            \${EMPTY}

*** Test Cases ***
Test Environment Detection And Loading
    [Documentation]    Detects current environment and loads appropriate configuration
    [Tags]    configuration    environment    detection
    \${environment}    Get Environment Variable    ENVIRONMENT    \${DEFAULT_ENVIRONMENT}
    Set Global Variable    \${CURRENT_ENV}    \${environment}
    \${config_file}    Set Variable    \${CONFIG_DIR}/\${environment}.yaml
    \${env_config}     Load Environment Config    \${environment}
    Set Global Variable    \${ENV_CONFIG}    \${env_config}
    Log    Current environment: \${environment}
    Log    Config file: \${config_file}
    Log    App URL: \${env_config}[app_url]
    Log    Database host: \${env_config}[database][host]
    Should Not Be Empty    \${env_config}[app_url]

Test Development Environment Configuration
    [Documentation]    Validates development environment specific settings
    [Tags]    configuration    environment    development
    \${dev_config}    Load Environment Config    dev
    Should Be Equal    \${dev_config}[environment]    development
    Should Be True     \${dev_config}[debug_mode]
    Should Be Equal As Numbers    \${dev_config}[timeout]    5
    Should Contain     \${dev_config}[app_url]    dev
    Should Be Equal    \${dev_config}[database][host]    localhost
    Log    Dev config validation passed

Test Staging Environment Configuration
    [Documentation]    Validates staging environment specific settings
    [Tags]    configuration    environment    staging
    \${staging_config}    Load Environment Config    staging
    Should Be Equal    \${staging_config}[environment]    staging
    Should Be False    \${staging_config}[debug_mode]
    Should Be Equal As Numbers    \${staging_config}[timeout]    10
    Should Contain     \${staging_config}[app_url]    staging
    Should Not Be Equal    \${staging_config}[database][host]    localhost
    Log    Staging config validation passed

Test Production Environment Configuration
    [Documentation]    Validates production environment specific settings
    [Tags]    configuration    environment    production
    \${prod_config}    Load Environment Config    production
    Should Be Equal    \${prod_config}[environment]    production
    Should Be False    \${prod_config}[debug_mode]
    Should Be Equal As Numbers    \${prod_config}[timeout]    15
    Should Match Regexp    \${prod_config}[app_url]    ^https://(?!dev|staging).*
    Should Not Contain    \${prod_config}[database][host]    localhost
    Log    Production config validation passed

Test Configuration Override With Environment Variables
    [Documentation]    Shows how environment variables can override config file values
    [Tags]    configuration    environment    override
    Set Environment Variable    APP_URL_OVERRIDE    https://custom-url.com
    Set Environment Variable    TIMEOUT_OVERRIDE     20
    \${base_config}    Load Environment Config    \${CURRENT_ENV}
    \${final_config}   Apply Environment Overrides    \${base_config}
    \${app_url}        Set Variable    \${final_config}[app_url]
    \${timeout}        Set Variable    \${final_config}[timeout]
    Should Be Equal    \${app_url}    https://custom-url.com
    Should Be Equal As Numbers    \${timeout}    20
    Log    Configuration overrides applied successfully

Test Dynamic Environment Selection
    [Documentation]    Demonstrates dynamic environment selection based on conditions
    [Tags]    configuration    environment    dynamic
    \${time_hour}      Get Current Date    result_format=%H
    \${hour_int}       Convert To Integer    \${time_hour}
    \${selected_env}   Run Keyword If    \${hour_int} < 8 or \${hour_int} > 18
    ...    Set Variable    staging
    ...    ELSE    Set Variable    dev
    \${dynamic_config}    Load Environment Config    \${selected_env}
    Log    Time-based environment: \${selected_env}
    Log    Dynamic config URL: \${dynamic_config}[app_url]
    Should Contain    \${dynamic_config}[app_url]    \${selected_env}

Test Multi Environment Test Execution
    [Documentation]    Executes same test logic across multiple environments
    [Tags]    configuration    environment    multi
    @{environments}    Create List    dev    staging
    FOR    \${env}    IN    @{environments}
        Log    Testing in environment: \${env}
        \${env_config}    Load Environment Config    \${env}
        Validate Environment Config    \${env_config}    \${env}
        Execute Environment Specific Tests    \${env_config}
    END
    Log    Multi-environment testing completed

*** Keywords ***
Load Environment Config
    [Documentation]    Loads configuration for specified environment
    [Arguments]    \${environment}
    \${config_file}    Set Variable    \${CONFIG_DIR}/\${environment}.yaml
    File Should Exist    \${config_file}
    \${config_content}    Get File    \${config_file}
    \${parsed_config}    Evaluate    yaml.safe_load('''
\${config_content}''')    modules=yaml
    Log    Loaded config for environment: \${environment}
    RETURN    \${parsed_config}

Create Sample Environment Configs
    [Documentation]    Creates sample configuration files for different environments
    Create Directory    \${CONFIG_DIR}
    
    # Development config
    \${dev_config}    Set Variable    environment: development
app_url: https://dev-app.com
debug_mode: true
timeout: 5
database:
  host: localhost
  port: 5432
  name: devdb
api:
  endpoint: /api/v1
  rate_limit: 1000
    Create File    \${CONFIG_DIR}/dev.yaml    \${dev_config}
    
    # Staging config
    \${staging_config}    Set Variable    environment: staging
app_url: https://staging-app.com
debug_mode: false
timeout: 10
database:
  host: staging-db.internal
  port: 5432
  name: stagingdb
api:
  endpoint: /api/v1
  rate_limit: 500
    Create File    \${CONFIG_DIR}/staging.yaml    \${staging_config}
    
    # Production config
    \${prod_config}    Set Variable    environment: production
app_url: https://app.com
debug_mode: false
timeout: 15
database:
  host: prod-db.internal
  port: 5432
  name: proddb
api:
  endpoint: /api/v1
  rate_limit: 100
    Create File    \${CONFIG_DIR}/production.yaml    \${prod_config}
    
    Log    Sample environment configs created

Validate Environment Config
    [Documentation]    Validates environment configuration structure and values
    [Arguments]    \${config}    \${expected_env}
    Dictionary Should Contain Key    \${config}    environment
    Dictionary Should Contain Key    \${config}    app_url
    Dictionary Should Contain Key    \${config}    timeout
    Dictionary Should Contain Key    \${config}    database
    Should Contain    \${config}[environment]    \${expected_env}
    Should Match Regexp    \${config}[app_url]    ^https?://.*
    Should Be True    \${config}[timeout] > 0
    Log    Environment config validation passed for: \${expected_env}

Apply Environment Overrides
    [Documentation]    Applies environment variable overrides to base configuration
    [Arguments]    \${base_config}
    \${overridden_config}    Copy Dictionary    \${base_config}
    
    # Check for URL override
    \${url_override}    Get Environment Variable    APP_URL_OVERRIDE    \${EMPTY}
    Run Keyword If    '\${url_override}' != '\${EMPTY}'
    ...    Set To Dictionary    \${overridden_config}    app_url=\${url_override}
    
    # Check for timeout override
    \${timeout_override}    Get Environment Variable    TIMEOUT_OVERRIDE    \${EMPTY}
    Run Keyword If    '\${timeout_override}' != '\${EMPTY}'
    ...    Set To Dictionary    \${overridden_config}    timeout=\${timeout_override}
    
    # Check for debug mode override
    \${debug_override}    Get Environment Variable    DEBUG_MODE_OVERRIDE    \${EMPTY}
    Run Keyword If    '\${debug_override}' != '\${EMPTY}'
    ...    Set To Dictionary    \${overridden_config}    debug_mode=\${debug_override}
    
    Log    Environment overrides applied
    RETURN    \${overridden_config}

Execute Environment Specific Tests
    [Documentation]    Executes tests specific to the environment configuration
    [Arguments]    \${config}
    \${app_url}    Set Variable    \${config}[app_url]
    \${timeout}    Set Variable    \${config}[timeout]
    \${debug}      Set Variable    \${config}[debug_mode]
    
    Log    Testing against: \${app_url}
    Should Match Regexp    \${app_url}    ^https?://.*
    
    Run Keyword If    \${debug}    Log    Debug mode enabled for testing
    Run Keyword Unless    \${debug}    Log    Production mode - debug disabled
    
    Should Be True    \${timeout} >= 5
    Log    Environment specific tests completed

Get Current Environment Config
    [Documentation]    Returns the currently loaded environment configuration
    \${current_config}    Get Variable Value    \${ENV_CONFIG}    \${EMPTY}
    Run Keyword If    '\${current_config}' == '\${EMPTY}'    
    ...    Fail    No environment configuration loaded
    RETURN    \${current_config}

Switch To Environment
    [Documentation]    Switches to different environment configuration
    [Arguments]    \${new_environment}
    Log    Switching from \${CURRENT_ENV} to \${new_environment}
    \${new_config}    Load Environment Config    \${new_environment}
    Set Global Variable    \${CURRENT_ENV}    \${new_environment}
    Set Global Variable    \${ENV_CONFIG}     \${new_config}
    Log    Environment switched successfully

Merge Configurations
    [Documentation]    Merges base config with environment specific overrides
    [Arguments]    \${base_config}    \${env_config}
    \${merged_config}    Copy Dictionary    \${base_config}
    FOR    \${key}    \${value}    IN    &{env_config}
        Set To Dictionary    \${merged_config}    \${key}=\${value}
    END
    Log    Configurations merged successfully
    RETURN    \${merged_config}

Generate Environment Report
    [Documentation]    Generates report of current environment configuration
    \${current_config}    Get Current Environment Config
    Log    === ENVIRONMENT CONFIGURATION REPORT ===
    Log    Environment: \${CURRENT_ENV}
    Log    App URL: \${current_config}[app_url]
    Log    Timeout: \${current_config}[timeout]
    Log    Debug Mode: \${current_config}[debug_mode]
    Log    Database Host: \${current_config}[database][host]
    Log    === END REPORT ===
        </code></pre>
        
        <h3>🎯 Práctica Config Ambientes (4 min):</h3>
        <ol>
            <li><strong>Environment detection:</strong> Usar Get Environment Variable para detectar ambiente actual</li>
            <li><strong>Config file loading:</strong> Cargar archivos YAML específicos por ambiente</li>
            <li><strong>Default environments:</strong> Implementar ambiente por defecto cuando no se especifica</li>
            <li><strong>Config validation:</strong> Validar estructura y valores de configuración por ambiente</li>
            <li><strong>Environment variables override:</strong> Permitir override con variables de entorno</li>
            <li><strong>Dynamic environment selection:</strong> Seleccionar ambiente basado en condiciones</li>
            <li><strong>Multi-environment testing:</strong> Ejecutar mismo test en múltiples ambientes</li>
            <li><strong>Configuration merging:</strong> Combinar configuración base con overrides específicos</li>
            <li><strong>Environment switching:</strong> Cambiar dinámicamente entre configuraciones</li>
            <li><strong>Sample config creation:</strong> Crear archivos de configuración de ejemplo</li>
            <li><strong>Config structure validation:</strong> Verificar que configuración tiene campos requeridos</li>
            <li><strong>Environment reporting:</strong> Generar reportes de configuración actual</li>
            <li><strong>File organization:</strong> Organizar archivos de configuración por directorio</li>
            <li><strong>Error handling:</strong> Manejar errores de archivos faltantes o malformados</li>
            <li><strong>Best practices:</strong> Implementar patrones escalables de configuración</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar sistema robusto de configuración multi-ambiente</li>
                <li>Manejar configuraciones específicas para dev, staging y production</li>
                <li>Crear overrides dinámicos usando variables de entorno</li>
                <li>Desarrollar patrones escalables para gestión de configuraciones</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Organiza configs en archivos separados por ambiente y usa variables de entorno para overrides. Siempre valida estructura de configuración antes de usar.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 041 - Secrets y datos sensibles</h3>
        <p>Aprenderemos manejo seguro de credenciales, API keys y datos sensibles en automatización de tests.</p>
    `,
    topics: ["environments", "config", "deployment"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-039"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_040 = LESSON_040;
}