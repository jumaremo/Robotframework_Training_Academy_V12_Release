const LESSON_042 = {
    id: 42,
    title: "Proyecto: Sistema de configuración",
    duration: "10 min",
    level: "beginner",
    section: "section-03",
    content: `
        <h2>🏗️ Sistema Configuración</h2>
        <p>Proyecto integrador: sistema completo de configuración escalable usando todas las técnicas de variables y datos.</p>
        
        <h3>💻 Configuration System Project:</h3>
        <pre><code class="robot">
*** Variables ***
\${CONFIG_SYSTEM_VERSION}    v2.0
\${CONFIG_ROOT_DIR}         config_system
\${ENVIRONMENTS}            dev,staging,production
\${DEFAULT_ENV}             dev

*** Test Cases ***
Test Complete Configuration System Setup
    [Documentation]    Sets up complete configuration management system
    [Tags]    integration    configuration    system    setup
    [Setup]    Initialize Configuration System
    
    # Environment Detection and Loading
    \${detected_env}    Detect Current Environment
    \${base_config}     Load Base Configuration
    \${env_config}      Load Environment Configuration    \${detected_env}
    \${merged_config}   Merge Configurations    \${base_config}    \${env_config}
    
    # Secrets Integration
    \${secrets}         Load Secrets Safely    \${detected_env}
    \${final_config}    Integrate Secrets Into Config    \${merged_config}    \${secrets}
    
    # Validation and Storage
    Validate Complete Configuration    \${final_config}    \${detected_env}
    Store Configuration Globally    \${final_config}
    
    # Logging and Reporting
    Generate Configuration Report    \${final_config}    \${detected_env}
    
    [Teardown]    Cleanup Configuration System

Test Multi Environment Configuration Loading
    [Documentation]    Tests configuration loading across multiple environments
    [Tags]    integration    configuration    multi-environment
    @{test_environments}    Split String    \${ENVIRONMENTS}    ,
    &{environment_configs}    Create Dictionary
    
    FOR    \${env}    IN    @{test_environments}
        Log    Loading configuration for environment: \${env}
        \${env_config}    Load Complete Environment Config    \${env}
        Set To Dictionary    \${environment_configs}    \${env}=\${env_config}
        Validate Environment Configuration    \${env_config}    \${env}
        Log    \${env} configuration loaded and validated successfully
    END
    
    Set Global Variable    \${ALL_ENV_CONFIGS}    \${environment_configs}
    Compare Environment Configurations    \${environment_configs}

Test Dynamic Configuration Updates
    [Documentation]    Tests dynamic configuration updates and overrides
    [Tags]    integration    configuration    dynamic
    \${current_config}    Get Current Configuration
    \${original_timeout}    Set Variable    \${current_config}[app][timeout]
    
    # Test environment variable override
    Set Environment Variable    TIMEOUT_OVERRIDE    25
    \${updated_config}    Apply Configuration Overrides    \${current_config}
    \${new_timeout}    Set Variable    \${updated_config}[app][timeout]
    Should Be Equal As Numbers    \${new_timeout}    25
    
    # Test runtime configuration update
    Update Configuration Value    app.retry_count    5
    \${final_config}    Get Current Configuration
    Should Be Equal As Numbers    \${final_config}[app][retry_count]    5
    
    # Test configuration rollback
    Rollback Configuration Changes
    \${rolled_back_config}    Get Current Configuration
    Should Be Equal As Numbers    \${rolled_back_config}[app][timeout]    \${original_timeout}

Test Configuration Validation and Error Handling
    [Documentation]    Tests comprehensive configuration validation
    [Tags]    integration    configuration    validation
    # Test missing required fields
    &{invalid_config}    Create Dictionary    app=incomplete
    \${validation_result}    Validate Configuration Structure    \${invalid_config}
    Should Be Equal    \${validation_result}[status]    failed
    
    # Test invalid data types
    &{type_invalid_config}    Create Dictionary    
    ...    app=\${EMPTY}    
    ...    database=invalid_dict    
    ...    timeout=not_a_number
    \${type_validation}    Validate Configuration Types    \${type_invalid_config}
    Should Be Equal    \${type_validation}[status]    failed
    
    # Test valid configuration
    \${current_config}    Get Current Configuration
    \${valid_result}    Validate Configuration Structure    \${current_config}
    Should Be Equal    \${valid_result}[status]    passed

Test Configuration Security and Secrets Integration
    [Documentation]    Tests secure integration of secrets with configuration
    [Tags]    integration    configuration    security
    \${base_config}    Get Current Configuration
    \${test_secrets}    Create Test Secrets
    
    # Test secure secrets integration
    \${secure_config}    Integrate Secrets Securely    \${base_config}    \${test_secrets}
    Should Contain    \${secure_config}[database]    password
    
    # Verify secrets are not logged
    \${config_dump}    Generate Secure Config Dump    \${secure_config}
    Should Not Contain    \${config_dump}    actual_secret_password
    Should Contain       \${config_dump}    ****
    
    # Test secrets rotation
    \${rotated_secrets}    Rotate Test Secrets    \${test_secrets}
    \${updated_config}    Integrate Secrets Securely    \${base_config}    \${rotated_secrets}
    Should Not Be Equal    \${secure_config}[database][password]    \${updated_config}[database][password]

Test Configuration Performance and Caching
    [Documentation]    Tests configuration system performance and caching
    [Tags]    integration    configuration    performance
    \${start_time}    Get Current Date    result_format=epoch
    
    # Test configuration loading performance
    FOR    \${i}    IN RANGE    10
        \${config}    Load Complete Environment Config    \${DEFAULT_ENV}
        Should Not Be Empty    \${config}
    END
    
    \${end_time}    Get Current Date    result_format=epoch
    \${duration}    Evaluate    \${end_time} - \${start_time}
    Should Be True    \${duration} < 5
    Log    Configuration loading performance: \${duration} seconds for 10 loads
    
    # Test configuration caching
    Enable Configuration Caching
    \${cached_start}    Get Current Date    result_format=epoch
    FOR    \${i}    IN RANGE    10
        \${cached_config}    Get Cached Configuration    \${DEFAULT_ENV}
        Should Not Be Empty    \${cached_config}
    END
    \${cached_end}    Get Current Date    result_format=epoch
    \${cached_duration}    Evaluate    \${cached_end} - \${cached_start}
    Should Be True    \${cached_duration} < \${duration}

Test Configuration Monitoring and Alerts
    [Documentation]    Tests configuration monitoring and alert system
    [Tags]    integration    configuration    monitoring
    Enable Configuration Monitoring
    
    # Test configuration change detection
    \${original_config}    Get Current Configuration
    Update Configuration Value    app.version    \${CONFIG_SYSTEM_VERSION}
    \${change_detected}    Check Configuration Changes
    Should Be True    \${change_detected}
    
    # Test configuration drift detection
    Create Configuration Baseline    \${original_config}
    Simulate Configuration Drift
    \${drift_detected}    Detect Configuration Drift
    Should Be True    \${drift_detected}
    
    # Test alert generation
    \${alerts}    Generate Configuration Alerts
    Should Not Be Empty    \${alerts}
    Should Contain    \${alerts}[0]    drift_detected

*** Keywords ***
Initialize Configuration System
    [Documentation]    Initializes the complete configuration management system
    Log    === Initializing Configuration System \${CONFIG_SYSTEM_VERSION} ===
    Create Configuration Directory Structure
    Create Base Configuration Files
    Create Environment Configuration Files
    Create Secrets Files
    Set Global Variable    \${CONFIG_SYSTEM_INITIALIZED}    True
    Log    Configuration system initialized successfully

Create Configuration Directory Structure
    [Documentation]    Creates the directory structure for configuration system
    Create Directory    \${CONFIG_ROOT_DIR}
    Create Directory    \${CONFIG_ROOT_DIR}/base
    Create Directory    \${CONFIG_ROOT_DIR}/environments
    Create Directory    \${CONFIG_ROOT_DIR}/secrets
    Create Directory    \${CONFIG_ROOT_DIR}/cache
    Create Directory    \${CONFIG_ROOT_DIR}/backups
    Log    Configuration directory structure created

Create Base Configuration Files
    [Documentation]    Creates base configuration files
    \${base_config}    Set Variable    # Base Configuration v\${CONFIG_SYSTEM_VERSION}
app:
  name: "Test Application"
  version: "1.0.0"
  timeout: 30
  retry_count: 3
  debug_mode: false

database:
  pool_size: 10
  connection_timeout: 5
  query_timeout: 30

api:
  rate_limit: 1000
  version: "v1"
  
logging:
  level: "INFO"
  format: "json"
  
security:
  encryption_enabled: true
  session_timeout: 3600
    Create File    \${CONFIG_ROOT_DIR}/base/base.yaml    \${base_config}
    Log    Base configuration file created

Create Environment Configuration Files
    [Documentation]    Creates environment-specific configuration files
    @{environments}    Split String    \${ENVIRONMENTS}    ,
    FOR    \${env}    IN    @{environments}
        \${env_config}    Generate Environment Config    \${env}
        Create File    \${CONFIG_ROOT_DIR}/environments/\${env}.yaml    \${env_config}
        Log    \${env} environment configuration created
    END

Generate Environment Config
    [Arguments]    \${environment}
    \${config}    Run Keyword If    '\${environment}' == 'dev'
    ...    Set Variable    # Development Environment
app:
  debug_mode: true
  timeout: 5
database:
  host: "localhost"
  port: 5432
  name: "devdb"
api:
  base_url: "https://dev-api.example.com"
    ...    ELSE IF    '\${environment}' == 'staging'
    ...    Set Variable    # Staging Environment
app:
  debug_mode: false
  timeout: 15
database:
  host: "staging-db.internal"
  port: 5432
  name: "stagingdb"
api:
  base_url: "https://staging-api.example.com"
    ...    ELSE
    ...    Set Variable    # Production Environment
app:
  debug_mode: false
  timeout: 30
database:
  host: "prod-db.internal"
  port: 5432
  name: "proddb"
api:
  base_url: "https://api.example.com"
    RETURN    \${config}

Detect Current Environment
    [Documentation]    Detects current environment from multiple sources
    # Priority: Command line > Environment variable > CI detection > Default
    \${env_from_var}    Get Environment Variable    ENVIRONMENT    \${EMPTY}
    \${env_from_ci}     Get Environment Variable    CI_ENVIRONMENT    \${EMPTY}
    \${detected_env}    Run Keyword If    '\${env_from_var}' != '\${EMPTY}'
    ...    Set Variable    \${env_from_var}
    ...    ELSE IF    '\${env_from_ci}' != '\${EMPTY}'
    ...    Set Variable    \${env_from_ci}
    ...    ELSE    Set Variable    \${DEFAULT_ENV}
    Log    Environment detected: \${detected_env}
    Set Global Variable    \${CURRENT_ENVIRONMENT}    \${detected_env}
    RETURN    \${detected_env}

Load Base Configuration
    [Documentation]    Loads base configuration from file
    \${base_file}    Set Variable    \${CONFIG_ROOT_DIR}/base/base.yaml
    \${base_config}    Load YAML File    \${base_file}
    Log    Base configuration loaded
    RETURN    \${base_config}

Load Environment Configuration
    [Arguments]    \${environment}
    \${env_file}    Set Variable    \${CONFIG_ROOT_DIR}/environments/\${environment}.yaml
    \${env_config}    Load YAML File    \${env_file}
    Log    Environment configuration loaded: \${environment}
    RETURN    \${env_config}

Load YAML File
    [Arguments]    \${file_path}
    File Should Exist    \${file_path}
    \${content}    Get File    \${file_path}
    \${yaml_data}    Evaluate    yaml.safe_load('''\${content}''')    modules=yaml
    RETURN    \${yaml_data}

Merge Configurations
    [Arguments]    \${base_config}    \${override_config}
    \${merged}    Deep Merge Dictionaries    \${base_config}    \${override_config}
    Log    Configurations merged successfully
    RETURN    \${merged}

Deep Merge Dictionaries
    [Arguments]    \${dict1}    \${dict2}
    \${merged}    Evaluate    {**\${dict1}, **\${dict2}}
    RETURN    \${merged}

Store Configuration Globally
    [Arguments]    \${config}
    Set Global Variable    \${GLOBAL_CONFIG}    \${config}
    \${config_backup}    Create Configuration Backup    \${config}
    Set Global Variable    \${CONFIG_BACKUP}    \${config_backup}
    Log    Configuration stored globally with backup

Get Current Configuration
    \${current_config}    Get Variable Value    \${GLOBAL_CONFIG}    \${EMPTY}
    Run Keyword If    '\${current_config}' == '\${EMPTY}'
    ...    Fail    No configuration loaded. Run configuration system setup first.
    RETURN    \${current_config}

Generate Configuration Report
    [Arguments]    \${config}    \${environment}
    Log    === CONFIGURATION SYSTEM REPORT ===
    Log    System Version: \${CONFIG_SYSTEM_VERSION}
    Log    Environment: \${environment}
    Log    App Name: \${config}[app][name]
    Log    App Version: \${config}[app][version]
    Log    Database Host: \${config}[database][host]
    Log    API Base URL: \${config}[api][base_url]
    Log    Debug Mode: \${config}[app][debug_mode]
    Log    === END REPORT ===

Cleanup Configuration System
    [Documentation]    Cleans up configuration system resources
    Remove Directory    \${CONFIG_ROOT_DIR}    recursive=True
    Set Global Variable    \${CONFIG_SYSTEM_INITIALIZED}    False
    Log    Configuration system cleaned up successfully
        </code></pre>
        
        <h3>🎯 Práctica Sistema Configuración (8 min):</h3>
        <ol>
            <li><strong>Sistema completo:</strong> Implementar estructura completa con base, environments, secrets</li>
            <li><strong>Directory structure:</strong> Crear organización escalable de archivos de configuración</li>
            <li><strong>Environment detection:</strong> Detectar ambiente desde múltiples fuentes (vars, CI, default)</li>
            <li><strong>Configuration merging:</strong> Combinar configuración base con overrides específicos</li>
            <li><strong>Secrets integration:</strong> Integrar credenciales seguramente en configuración</li>
            <li><strong>Validation system:</strong> Validar estructura, tipos y valores de configuración</li>
            <li><strong>Dynamic updates:</strong> Permitir actualizaciones en runtime con rollback</li>
            <li><strong>Performance optimization:</strong> Implementar caching para mejorar velocidad</li>
            <li><strong>Monitoring system:</strong> Detectar cambios y drift de configuración</li>
            <li><strong>Alert generation:</strong> Generar alertas para cambios importantes</li>
            <li><strong>Multi-environment support:</strong> Soportar dev, staging, production</li>
            <li><strong>Backup and recovery:</strong> Crear backups automáticos de configuración</li>
            <li><strong>Security compliance:</strong> Implementar manejo seguro de datos sensibles</li>
            <li><strong>Report generation:</strong> Generar reportes comprehensivos de configuración</li>
            <li><strong>Integration testing:</strong> Probar sistema completo end-to-end</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar TODOS los conceptos de variables y datos en sistema real</li>
                <li>Crear arquitectura escalable de configuración multi-ambiente</li>
                <li>Implementar manejo seguro de secrets y credenciales</li>
                <li>Desarrollar sistema robusto con validación, caching y monitoring</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Este proyecto integra TODOS los conceptos de la sección Variables y Datos. Úsalo como template para sistemas de configuración reales en proyectos enterprise.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 043 - Conceptos de keywords personalizados</h3>
        <p>¡Felicitaciones por completar Variables y Datos! Ahora avanzaremos a Keywords Personalizados, comenzando con conceptos fundamentales para crear funciones reutilizables.</p>
    `,
    topics: ["project", "configuration", "system"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-041"],
    type: "integration"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_042 = LESSON_042;
}