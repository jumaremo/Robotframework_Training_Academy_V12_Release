const LESSON_033 = {
    id: 33,
    title: "Variables de entorno",
    duration: "5 min",
    level: "beginner",
    section: "section-03",
    content: `
        <h2>🌍 Variables Entorno</h2>
        <p>Uso de variables de entorno del sistema para configuraciones dinámicas y secretos.</p>
        
        <h3>💻 Environment Variables:</h3>
        <pre><code class="robot">
*** Variables ***
\${ENV_APP_URL}       %{APP_URL=http://localhost:3000}
\${ENV_DB_HOST}       %{DB_HOST=localhost}
\${ENV_API_KEY}       %{API_KEY=default_key}
\${ENV_DEBUG_MODE}    %{DEBUG_MODE=false}
\${ENV_TIMEOUT}       %{TIMEOUT=10}
\${ENV_BROWSER}       %{BROWSER=Chrome}

*** Test Cases ***
Test Environment Variables Basic Usage
    [Documentation]    Demonstrates basic environment variable access and usage
    [Tags]    variables    environment    basic
    Log    App URL from environment: \${ENV_APP_URL}
    Log    Database host: \${ENV_DB_HOST}
    Log    Debug mode: \${ENV_DEBUG_MODE}
    Should Not Be Empty    \${ENV_APP_URL}
    Should Contain    \${ENV_APP_URL}    http
    Log Environment Variables

Test Environment Variable Default Values
    [Documentation]    Shows how default values work when env vars are not set
    [Tags]    variables    environment    defaults
    \${custom_env}    Get Environment Variable    CUSTOM_VAR    default_value
    Should Be Equal    \${custom_env}    default_value
    \${timeout_value}    Get Environment Variable    TIMEOUT    5
    Log    Timeout from environment: \${timeout_value}
    Should Be True    \${timeout_value} >= 5

Test Dynamic Environment Configuration
    [Documentation]    Demonstrates dynamic configuration based on environment
    [Tags]    variables    environment    configuration
    \${environment}    Get Environment Variable    ENVIRONMENT    development
    \${base_url}    Run Keyword If    '\${environment}' == 'production'    
    ...    Set Variable    https://prod-api.com
    ...    ELSE IF    '\${environment}' == 'staging'
    ...    Set Variable    https://staging-api.com
    ...    ELSE    Set Variable    https://dev-api.com
    Log    Selected base URL: \${base_url}
    Should Contain    \${base_url}    api.com

Test Environment Variables For Database Connection
    [Documentation]    Uses environment variables for database configuration
    [Tags]    variables    environment    database
    \${db_host}      Get Environment Variable    DB_HOST        localhost
    \${db_port}      Get Environment Variable    DB_PORT        5432
    \${db_name}      Get Environment Variable    DB_NAME        testdb
    \${db_user}      Get Environment Variable    DB_USER        testuser
    \${connection}   Set Variable    \${db_host}:\${db_port}/\${db_name}
    Log    Database connection: \${connection}
    Should Match Regexp    \${connection}    .*:\\\\d+/.*

Test API Configuration From Environment
    [Documentation]    Configures API settings using environment variables
    [Tags]    variables    environment    api
    \${api_key}      Get Environment Variable    API_KEY         test_key_123
    \${api_version}  Get Environment Variable    API_VERSION     v1
    \${api_timeout}  Get Environment Variable    API_TIMEOUT     30
    \${api_url}      Set Variable    \${ENV_APP_URL}/api/\${api_version}
    Log    API URL: \${api_url}
    Log    API Key: \${api_key}
    Log    API Timeout: \${api_timeout}
    Should Not Be Empty    \${api_key}

Test Browser Selection From Environment
    [Documentation]    Selects browser based on environment variable
    [Tags]    variables    environment    browser
    \${browser_choice}    Get Environment Variable    TEST_BROWSER    Chrome
    \${headless_mode}     Get Environment Variable    HEADLESS        false
    Log    Selected browser: \${browser_choice}
    Log    Headless mode: \${headless_mode}
    Run Keyword If    '\${browser_choice}' == 'Chrome'    Log    Chrome selected for testing
    Run Keyword If    '\${headless_mode}' == 'true'      Log    Running in headless mode

Test CI Environment Detection
    [Documentation]    Detects CI/CD environment and adjusts configuration
    [Tags]    variables    environment    ci
    \${ci_environment}    Get Environment Variable    CI              false
    \${build_number}      Get Environment Variable    BUILD_NUMBER    local
    \${git_branch}        Get Environment Variable    GIT_BRANCH      main
    Run Keyword If    '\${ci_environment}' == 'true'    Log    Running in CI environment
    Log    Build number: \${build_number}
    Log    Git branch: \${git_branch}
    Should Not Be Empty    \${git_branch}

*** Keywords ***
Setup Test Environment From Variables
    [Documentation]    Configures test environment using environment variables
    \${app_url}     Get Environment Variable    APP_URL         http://localhost:3000
    \${timeout}     Get Environment Variable    TIMEOUT         10
    \${browser}     Get Environment Variable    BROWSER         Chrome
    \${debug}       Get Environment Variable    DEBUG           false
    
    Set Global Variable    \${GLOBAL_APP_URL}    \${app_url}
    Set Global Variable    \${GLOBAL_TIMEOUT}    \${timeout}
    Set Global Variable    \${GLOBAL_BROWSER}    \${browser}
    Set Global Variable    \${GLOBAL_DEBUG}      \${debug}
    
    Log    Environment configured - URL: \${app_url}, Browser: \${browser}

Validate Required Environment Variables
    [Documentation]    Validates that required environment variables are set
    \${required_vars}    Create List    APP_URL    DB_HOST    API_KEY
    FOR    \${var_name}    IN    @{required_vars}
        \${var_value}    Get Environment Variable    \${var_name}    NOT_SET
        Run Keyword If    '\${var_value}' == 'NOT_SET'    
        ...    Fail    Required environment variable \${var_name} is not set
        Log    \${var_name}: \${var_value}
    END

Load Configuration From Environment
    [Documentation]    Loads complete configuration from environment variables
    &{config}    Create Dictionary
    Set To Dictionary    \${config}    app_url=%{APP_URL=http://localhost:3000}
    Set To Dictionary    \${config}    db_host=%{DB_HOST=localhost}
    Set To Dictionary    \${config}    api_key=%{API_KEY=test_key}
    Set To Dictionary    \${config}    timeout=%{TIMEOUT=10}
    Set To Dictionary    \${config}    debug=%{DEBUG=false}
    Log Dictionary    \${config}
    RETURN    \${config}

Set Environment Variable For Test
    [Documentation]    Sets environment variable for test session
    [Arguments]    \${var_name}    \${var_value}
    Set Environment Variable    \${var_name}    \${var_value}
    \${retrieved_value}    Get Environment Variable    \${var_name}
    Should Be Equal    \${retrieved_value}    \${var_value}
    Log    Environment variable \${var_name} set to: \${var_value}
        </code></pre>
        
        <h3>🎯 Práctica Variables Entorno (4 min):</h3>
        <ol>
            <li><strong>Syntax básica:</strong> Usar %{VAR_NAME=default} para variables de entorno</li>
            <li><strong>Get Environment Variable:</strong> Obtener variables con valores por defecto</li>
            <li><strong>Default values:</strong> Configurar fallbacks cuando variables no están definidas</li>
            <li><strong>Configuration patterns:</strong> Usar env vars para URLs, hosts, credenciales</li>
            <li><strong>Environment detection:</strong> Detectar ambiente (dev, staging, prod) dinámicamente</li>
            <li><strong>Database config:</strong> Configurar conexión DB usando variables de entorno</li>
            <li><strong>API configuration:</strong> Configurar keys, URLs y timeouts desde entorno</li>
            <li><strong>Browser selection:</strong> Permitir selección de browser via env vars</li>
            <li><strong>CI/CD integration:</strong> Detectar BUILD_NUMBER, CI flags automáticamente</li>
            <li><strong>Set Environment Variable:</strong> Establecer variables durante ejecución</li>
            <li><strong>Validation keywords:</strong> Crear keywords para validar variables requeridas</li>
            <li><strong>Global configuration:</strong> Usar env vars para configuración global de suite</li>
            <li><strong>Secrets management:</strong> Manejar API keys y passwords via entorno</li>
            <li><strong>Debug mode:</strong> Controlar nivel de logging via DEBUG env var</li>
            <li><strong>Complete setup:</strong> Crear keyword que configure entorno completo</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar uso de variables de entorno (%{VAR=default}) en Robot Framework</li>
                <li>Implementar configuración dinámica basada en variables del sistema</li>
                <li>Crear configuraciones flexibles para diferentes ambientes de ejecución</li>
                <li>Manejar secretos y credenciales de forma segura usando entorno</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa %{VAR=default} para variables con fallback y Get Environment Variable para acceso dinámico. Las env vars son ideales para configuraciones que cambian entre ambientes.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 034 - Archivos de variables YAML/JSON</h3>
        <p>Expandiremos hacia archivos externos de configuración usando YAML y JSON para manejo de datos complejos y estructurados.</p>
    `,
    topics: ["environment", "env-vars", "configuration"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-032"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_033 = LESSON_033;
}