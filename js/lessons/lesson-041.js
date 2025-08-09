const LESSON_041 = {
    id: 41,
    title: "Secrets y datos sensibles",
    duration: "5 min",
    level: "beginner",
    section: "section-03",
    content: `
        <h2>🔐 Secrets Management</h2>
        <p>Manejo seguro de credenciales, API keys y datos sensibles en automatización de tests.</p>
        
        <h3>💻 Secure Data Handling:</h3>
        <pre><code class="robot">
*** Variables ***
\${SECRETS_FILE}       secrets/test_secrets.yaml
\${ENCRYPTED_FILE}     secrets/encrypted_data.txt
\${VAULT_PATH}         secrets/vault

*** Test Cases ***
Test Environment Variable Secrets
    [Documentation]    Demonstrates secure handling of secrets via environment variables
    [Tags]    security    secrets    environment
    \${api_key}        Get Environment Variable    API_KEY           default_test_key
    \${db_password}    Get Environment Variable    DB_PASSWORD       test_password
    \${oauth_secret}   Get Environment Variable    OAUTH_CLIENT_SECRET    test_secret
    # Never log actual secret values
    \${masked_api_key}    Mask Sensitive Data    \${api_key}
    \${masked_db_pass}    Mask Sensitive Data    \${db_password}
    Log    API Key: \${masked_api_key}
    Log    DB Password: \${masked_db_pass}
    Log    OAuth Secret: \${masked_db_pass}
    Should Not Be Empty    \${api_key}
    Should Not Contain     \${masked_api_key}    \${api_key}

Test Secrets File Loading
    [Documentation]    Shows secure loading of secrets from encrypted files
    [Tags]    security    secrets    files
    Create Sample Secrets File
    \${secrets}        Load Secrets From File    \${SECRETS_FILE}
    \${username}       Set Variable    \${secrets}[database][username]
    \${password}       Set Variable    \${secrets}[database][password]
    \${api_endpoint}   Set Variable    \${secrets}[api][endpoint]
    \${access_token}   Set Variable    \${secrets}[api][access_token]
    Log    Database user: \${username}
    Log    API endpoint: \${api_endpoint}
    # Passwords and tokens should never be logged directly
    \${masked_password}    Mask Sensitive Data    \${password}
    \${masked_token}       Mask Sensitive Data    \${access_token}
    Log    Database password: \${masked_password}
    Log    Access token: \${masked_token}

Test Credential Validation
    [Documentation]    Validates credentials without exposing them in logs
    [Tags]    security    validation    credentials
    \${test_username}    Get Environment Variable    TEST_USERNAME    testuser
    \${test_password}    Get Environment Variable    TEST_PASSWORD    testpass
    \${is_valid_user}    Validate Credential Format    \${test_username}    username
    \${is_valid_pass}    Validate Credential Format    \${test_password}    password
    Log    Username format valid: \${is_valid_user}
    Log    Password format valid: \${is_valid_pass}
    Should Be True    \${is_valid_user}
    Should Be True    \${is_valid_pass}

Test Secure API Authentication
    [Documentation]    Demonstrates secure API authentication handling
    [Tags]    security    api    authentication
    \${api_key}      Get Environment Variable    API_KEY         test_api_key_123
    \${base_url}     Get Environment Variable    API_BASE_URL    https://api.test.com
    \${auth_header}  Create Secure Auth Header    \${api_key}
    \${request_id}   Generate Request ID
    Log    API Base URL: \${base_url}
    Log    Request ID: \${request_id}
    Log    Auth header created (value masked for security)
    Should Contain    \${auth_header}    Bearer
    Should Not Be Empty    \${request_id}

Test Database Connection Secrets
    [Documentation]    Shows secure database connection handling
    [Tags]    security    database    connection
    \${db_host}      Get Environment Variable    DB_HOST         localhost
    \${db_port}      Get Environment Variable    DB_PORT         5432
    \${db_name}      Get Environment Variable    DB_NAME         testdb
    \${db_user}      Get Environment Variable    DB_USER         testuser
    \${db_password}  Get Environment Variable    DB_PASSWORD     testpass
    \${connection_string}    Create Secure Connection String    
    ...    \${db_host}    \${db_port}    \${db_name}    \${db_user}    \${db_password}
    Log    Database host: \${db_host}
    Log    Database port: \${db_port}
    Log    Database name: \${db_name}
    Log    Database user: \${db_user}
    Log    Connection string created (password masked)
    Should Contain    \${connection_string}    \${db_host}
    Should Not Contain    \${connection_string}    \${db_password}

Test Secret Rotation Simulation
    [Documentation]    Simulates secret rotation and validation
    [Tags]    security    rotation    secrets
    \${old_token}    Set Variable    old_token_12345
    \${new_token}    Generate New Token
    \${rotation_time}    Get Current Date
    \${rotation_record}    Create Secret Rotation Record    
    ...    \${old_token}    \${new_token}    \${rotation_time}
    Log    Secret rotation performed at: \${rotation_time}
    Log    Rotation record created (tokens masked)
    Should Not Be Equal    \${old_token}    \${new_token}
    Should Contain    \${rotation_record}    rotation_time

Test Secure Test Data Generation
    [Documentation]    Generates secure test data without exposing real secrets
    [Tags]    security    testdata    generation
    \${fake_email}     Generate Fake Credential    email
    \${fake_password}  Generate Fake Credential    password
    \${fake_api_key}   Generate Fake Credential    api_key
    \${fake_token}     Generate Fake Credential    token
    Log    Fake email: \${fake_email}
    Log    Fake password: \${fake_password}
    Log    Fake API key: \${fake_api_key}
    Log    Fake token: \${fake_token}
    Should Contain    \${fake_email}    @
    Should Be True    len('\${fake_password}') >= 8

*** Keywords ***
Mask Sensitive Data
    [Documentation]    Masks sensitive data for safe logging
    [Arguments]    \${sensitive_data}
    \${data_length}    Get Length    \${sensitive_data}
    \${masked_data}    Run Keyword If    \${data_length} <= 4
    ...    Set Variable    ****
    ...    ELSE IF    \${data_length} <= 8
    ...    Set Variable    \${sensitive_data[:2]}****
    ...    ELSE    Set Variable    \${sensitive_data[:3]}****\${sensitive_data[-2:]}
    RETURN    \${masked_data}

Load Secrets From File
    [Documentation]    Loads secrets from encrypted file safely
    [Arguments]    \${file_path}
    File Should Exist    \${file_path}
    \${file_content}    Get File    \${file_path}
    \${secrets_data}    Evaluate    yaml.safe_load('''\${file_content}''')    modules=yaml
    Log    Secrets loaded from file (values will be masked)
    RETURN    \${secrets_data}

Validate Credential Format
    [Documentation]    Validates credential format without logging actual values
    [Arguments]    \${credential}    \${credential_type}
    \${is_valid}    Run Keyword If    '\${credential_type}' == 'username'
    ...    Evaluate    len('\${credential}') >= 3 and '\${credential}'.isalnum()
    ...    ELSE IF    '\${credential_type}' == 'password'
    ...    Evaluate    len('\${credential}') >= 8
    ...    ELSE IF    '\${credential_type}' == 'email'
    ...    Evaluate    '@' in '\${credential}' and '.' in '\${credential}'
    ...    ELSE    Set Variable    False
    Log    Credential format validation: \${credential_type} = \${is_valid}
    RETURN    \${is_valid}

Create Secure Auth Header
    [Documentation]    Creates authentication header without logging sensitive data
    [Arguments]    \${api_key}
    \${auth_header}    Set Variable    Bearer \${api_key}
    Log    Authentication header created (API key masked for security)
    RETURN    \${auth_header}

Generate Request ID
    [Documentation]    Generates unique request ID for API calls
    \${timestamp}    Get Current Date    result_format=epoch
    \${random_part}    Evaluate    random.randint(1000, 9999)    modules=random
    \${request_id}    Set Variable    req_\${timestamp}_\${random_part}
    RETURN    \${request_id}

Create Secure Connection String
    [Documentation]    Creates database connection string with masked password
    [Arguments]    \${host}    \${port}    \${database}    \${username}    \${password}
    \${masked_password}    Mask Sensitive Data    \${password}
    \${connection_string}    Set Variable    postgresql://\${username}:\${masked_password}@\${host}:\${port}/\${database}
    Log    Connection string created with masked password
    RETURN    \${connection_string}

Generate New Token
    [Documentation]    Generates new secure token for rotation
    \${timestamp}    Get Current Date    result_format=epoch
    \${random_string}    Evaluate    ''.join(random.choices(string.ascii_letters + string.digits, k=32))    modules=random,string
    \${new_token}    Set Variable    token_\${timestamp}_\${random_string}
    RETURN    \${new_token}

Create Secret Rotation Record
    [Documentation]    Creates record of secret rotation for audit
    [Arguments]    \${old_secret}    \${new_secret}    \${rotation_time}
    \${masked_old}    Mask Sensitive Data    \${old_secret}
    \${masked_new}    Mask Sensitive Data    \${new_secret}
    &{rotation_record}    Create Dictionary
    ...    old_secret=\${masked_old}
    ...    new_secret=\${masked_new}
    ...    rotation_time=\${rotation_time}
    ...    rotated_by=automated_test
    Log    Secret rotation record created with masked values
    RETURN    \${rotation_record}

Generate Fake Credential
    [Documentation]    Generates fake credentials for testing
    [Arguments]    \${credential_type}
    \${fake_credential}    Run Keyword If    '\${credential_type}' == 'email'
    ...    Evaluate    f'test{random.randint(100,999)}@example.com'    modules=random
    ...    ELSE IF    '\${credential_type}' == 'password'
    ...    Evaluate    f'TestPass{random.randint(1000,9999)}!'    modules=random
    ...    ELSE IF    '\${credential_type}' == 'api_key'
    ...    Evaluate    f'test_api_key_{random.randint(100000,999999)}'    modules=random
    ...    ELSE IF    '\${credential_type}' == 'token'
    ...    Evaluate    f'test_token_{"".join(random.choices(string.ascii_letters + string.digits, k=16))}'    modules=random,string
    ...    ELSE    Set Variable    test_credential
    Log    Fake \${credential_type} generated for testing
    RETURN    \${fake_credential}

Create Sample Secrets File
    [Documentation]    Creates sample secrets file for testing
    Create Directory    secrets
    \${secrets_content}    Set Variable    database:
  username: test_db_user
  password: secure_test_password_123
  host: localhost
  port: 5432
api:
  endpoint: https://api.test.com
  access_token: test_access_token_abc123
  refresh_token: test_refresh_token_xyz789
oauth:
  client_id: test_client_id
  client_secret: test_client_secret_456
encryption:
  key: test_encryption_key_789
  algorithm: AES256
    Create File    \${SECRETS_FILE}    \${secrets_content}
    Log    Sample secrets file created for testing

Validate Secrets File Security
    [Documentation]    Validates that secrets file has proper security settings
    [Arguments]    \${file_path}
    File Should Exist    \${file_path}
    \${file_content}    Get File    \${file_path}
    Should Not Contain    \${file_content}    password123
    Should Not Contain    \${file_content}    admin
    Should Not Contain    \${file_content}    root
    Log    Secrets file security validation passed

Secure Cleanup
    [Documentation]    Securely cleans up sensitive data after tests
    Remove File    \${SECRETS_FILE}
    \${temp_files}    List Files In Directory    secrets    *.tmp
    FOR    \${temp_file}    IN    @{temp_files}
        Remove File    secrets/\${temp_file}
    END
    Log    Secure cleanup completed - sensitive files removed
        </code></pre>
        
        <h3>🎯 Práctica Secrets Management (4 min):</h3>
        <ol>
            <li><strong>Environment secrets:</strong> Usar Get Environment Variable para credenciales seguras</li>
            <li><strong>Data masking:</strong> Crear keywords para enmascarar datos sensibles en logs</li>
            <li><strong>Secrets files:</strong> Cargar credenciales desde archivos YAML/JSON externos</li>
            <li><strong>Credential validation:</strong> Validar formato sin exponer valores reales</li>
            <li><strong>Secure auth headers:</strong> Crear headers de autenticación sin logging directo</li>
            <li><strong>Connection strings:</strong> Crear strings de conexión con passwords enmascarados</li>
            <li><strong>Token generation:</strong> Generar tokens únicos para testing</li>
            <li><strong>Secret rotation:</strong> Simular rotación de credenciales con audit trail</li>
            <li><strong>Fake credentials:</strong> Generar credenciales falsas para test data</li>
            <li><strong>File security:</strong> Validar que archivos de secrets no contienen datos obvios</li>
            <li><strong>Secure cleanup:</strong> Limpiar archivos temporales con datos sensibles</li>
            <li><strong>Audit logging:</strong> Crear registros de uso de credenciales sin exponer valores</li>
            <li><strong>Format validation:</strong> Validar formato de emails, passwords sin logging</li>
            <li><strong>Request tracking:</strong> Generar IDs únicos para rastreo sin exposición</li>
            <li><strong>Security best practices:</strong> Implementar patrones seguros para manejo de secrets</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar manejo seguro de credenciales y datos sensibles</li>
                <li>Crear sistemas de masking para prevenir exposición en logs</li>
                <li>Usar variables de entorno y archivos externos para secrets</li>
                <li>Desarrollar patrones de seguridad para automatización de tests</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>NUNCA logues credenciales directamente. Usa masking, variables de entorno y archivos externos. Implementa cleanup automático de datos sensibles.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 042 - Proyecto: Sistema de configuración</h3>
        <p>Integraremos todos los conceptos de variables y datos en un proyecto completo de sistema de configuración escalable.</p>
    `,
    topics: ["secrets", "security", "credentials"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-040"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_041 = LESSON_041;
}