/**
 * Robot Framework Academy - Lesson 164
 * Mobile Testing 164
 */

const LESSON_164 = {
    id: 164,
    title: "Mobile Testing 164",
    duration: "7 min",
    level: "intermediate",
    section: "section-12",
    content: `
        <h2>🔒 Security Testing Móvil</h2>
        <p>Penetration testing, vulnerabilidades específicas móviles y validación de seguridad enterprise.</p>
        
        <h3>💻 Tests Security:</h3>
        <pre><code class="robot">*** Settings ***
Library    AppiumLibrary
Library    RequestsLibrary
Library    Collections
Library    Process
Library    OperatingSystem
Library    String

*** Variables ***
\${APPIUM_SERVER}     http://localhost:4723/wd/hub
\${SECURITY_APP}      com.example.securityapp
\${VULNERABLE_APP}    com.example.vulnerableapp
\${DEVICE_NAME}       Android Emulator
\${TIMEOUT}           15s
\${PENTEST_TOOLS}     \${CURDIR}/pentest_tools
\${SECURITY_REPORTS}  \${CURDIR}/security_reports
\${ADB_COMMAND}       adb
\${PROXY_PORT}        8080
\${BURP_PROXY}        127.0.0.1:8080

*** Test Cases ***
Application Permission Analysis
    [Documentation]    Análisis completo de permisos de aplicación
    [Tags]             permissions    security    privacy    analysis
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${SECURITY_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Analizar permisos declarados vs usados
    \${declared_permissions}= Execute Adb Command dumpsys package \${SECURITY_APP} | grep permission
    Log    Declared permissions: \${declared_permissions}
    
    # Testing solicitación de permisos dinámicos
    Click Element       id=request_camera_permission
    Wait Until Page Contains Element    xpath=//android.widget.Button[@text='Allow' or @text='Permitir']    5s
    
    \${permission_dialog}= Get Element Count    xpath=//android.widget.TextView[contains(@text, 'camera') or contains(@text, 'cámara')]
    Should Be True      \${permission_dialog} > 0    Dialog de permiso debe aparecer
    
    Click Element       xpath=//android.widget.Button[@text='Allow' or @text='Permitir']
    
    # Verificar app funciona con permiso concedido
    Wait Until Page Contains Element    id=camera_permission_granted
    Element Should Be Visible           id=camera_preview
    
    # Testing denegación de permisos
    Click Element       id=request_location_permission
    Wait Until Page Contains Element    xpath=//android.widget.Button[@text='Deny' or @text='Denegar']
    
    Click Element       xpath=//android.widget.Button[@text='Deny' or @text='Denegar']
    
    # Verificar app maneja gracefully la denegación
    Wait Until Page Contains Element    id=location_permission_denied
    Element Should Contain Text         id=location_error_message    Permission denied
    Element Should Be Visible           id=retry_permission_button
    
    # Testing permisos sensibles excesivos
    \${sensitive_permissions}= Create List
    ...    android.permission.READ_CONTACTS
    ...    android.permission.ACCESS_FINE_LOCATION
    ...    android.permission.RECORD_AUDIO
    ...    android.permission.READ_SMS
    ...    android.permission.CAMERA
    
    FOR    \${permission}    IN    @{sensitive_permissions}
        \${permission_check}= Execute Adb Command shell pm list permissions -g | grep \${permission}
        Run Keyword If      '\${permission_check}' != ''
        ...                Log    ⚠️ Sensitive permission found: \${permission}
    END
    
    Take Screenshot     permission_analysis.png
    Close Application
    
    Log    ✓ Permission analysis completado

Data Storage Security Testing
    [Documentation]    Testing seguridad de almacenamiento de datos
    [Tags]             data-storage    encryption    security    privacy
    
    \${storage_caps}=   Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${SECURITY_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{storage_caps}
    
    # Testing datos sensibles en storage
    Click Element       id=save_user_data_button
    Wait Until Page Contains Element    id=data_input_form
    
    Input Text          id=username_field       testuser
    Input Password      id=password_field       supersecret123
    Input Text          id=credit_card_field    4532-1234-5678-9012
    Input Text          id=ssn_field           123-45-6789
    
    Click Element       id=save_data_button
    Wait Until Page Contains Element    id=data_saved_confirmation
    
    # Analizar almacenamiento local
    \${app_data_dir}=   Set Variable    /data/data/\${SECURITY_APP}
    
    # Verificar SharedPreferences no contiene datos en claro
    \${shared_prefs}=   Execute Adb Command shell su -c "ls \${app_data_dir}/shared_prefs/"
    Run Keyword If      '\${shared_prefs}' != ''
    ...                Analyze SharedPreferences Security    \${shared_prefs}
    
    # Testing database encryption
    \${databases}=      Execute Adb Command shell su -c "ls \${app_data_dir}/databases/"
    Run Keyword If      '\${databases}' != ''
    ...                Analyze Database Security    \${databases}
    
    # Testing file encryption
    Click Element       id=save_document_button
    Wait Until Page Contains Element    id=document_upload
    
    Click Element       id=select_file_button
    Wait Until Page Contains Element    id=file_selected
    
    Click Element       id=encrypt_and_save
    Wait Until Page Contains Element    id=file_encrypted_saved
    
    # Verificar archivo encriptado en filesystem
    \${files_dir}=      Execute Adb Command shell su -c "ls \${app_data_dir}/files/"
    Should Contain      \${files_dir}    .enc    Archivo debe estar encriptado
    
    # Testing key management
    \${keystore_usage}= Execute Adb Command shell su -c "ls /data/misc/keystore/user_0/"
    Should Not Be Empty \${keystore_usage}    App debe usar Android Keystore
    
    Take Screenshot     data_storage_security.png
    Close Application
    
    Log    ✓ Data storage security testing completado

Network Security Testing
    [Documentation]    Testing seguridad de comunicaciones de red
    [Tags]             network    tls    certificate    pinning    mitm
    
    # Configurar proxy para interceptar tráfico
    Execute Adb Command shell settings put global http_proxy \${BURP_PROXY}
    
    \${network_caps}=   Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${SECURITY_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{network_caps}
    
    # Testing HTTPS enforcement
    Click Element       id=network_test_button
    Wait Until Page Contains Element    id=network_operations
    
    Click Element       id=api_call_button
    Wait Until Page Contains Element    id=api_response_received    10s
    
    # Verificar conexión usa HTTPS
    \${network_logs}=   Execute Adb Command logcat -d | grep -i "http"
    Should Not Contain  \${network_logs}    http://    No debe usar HTTP inseguro
    Should Contain      \${network_logs}    https://   Debe usar HTTPS
    
    # Testing certificate pinning
    Click Element       id=certificate_pinning_test
    Wait Until Page Contains Element    id=pinning_test_result
    
    \${pinning_result}= Get Text    id=pinning_test_result
    Should Be Equal     \${pinning_result}    Certificate Pinning Active
    
    # Testing con certificado inválido (simulado)
    Click Element       id=invalid_cert_test
    Wait Until Page Contains Element    id=cert_validation_result
    
    \${cert_error}=     Get Text    id=cert_validation_result
    Should Contain      \${cert_error}    Certificate validation failed
    
    # Testing data leakage en requests
    Click Element       id=send_sensitive_data
    Wait Until Page Contains Element    id=sensitive_data_form
    
    Input Text          id=api_username_field    sensitiveuser
    Input Password      id=api_password_field    topsecret
    Click Element       id=submit_api_data
    
    Wait Until Page Contains Element    id=api_data_sent
    
    # Verificar datos no se logean en claro
    \${api_logs}=       Execute Adb Command logcat -d | grep -i "password\\|secret"
    Should Not Contain  \${api_logs}    topsecret    Password no debe aparecer en logs
    
    # Testing session management
    Click Element       id=login_session_test
    Wait Until Page Contains Element    id=session_active
    
    \${session_token}=  Get Text    id=session_token_display
    Should Match Regexp \${session_token}    ^[A-Za-z0-9+/]{40,}$    Token debe ser strong
    
    # Testing logout y invalidación
    Click Element       id=logout_button
    Wait Until Page Contains Element    id=session_terminated
    
    \${session_status}= Get Text    id=session_status
    Should Be Equal     \${session_status}    Session Invalidated
    
    # Limpiar proxy
    Execute Adb Command shell settings put global http_proxy :0
    
    Take Screenshot     network_security.png
    Close Application
    
    Log    ✓ Network security testing completado

Reverse Engineering Protection
    [Documentation]    Testing protecciones contra reverse engineering
    [Tags]             reverse-engineering    obfuscation    tamper    protection
    
    \${protection_caps}= Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${SECURITY_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{protection_caps}
    
    # Testing root detection
    Click Element       id=security_checks_button
    Wait Until Page Contains Element    id=security_status_display
    
    \${root_detection}= Get Text    id=root_detection_result
    Should Be Equal     \${root_detection}    Device Not Rooted
    
    # Testing debugger detection
    \${debug_detection}= Get Text    id=debug_detection_result
    Should Be Equal     \${debug_detection}    No Debugger Detected
    
    # Testing emulator detection
    \${emulator_detection}= Get Text    id=emulator_detection_result
    Run Keyword If      '\${emulator_detection}' == 'Emulator Detected'
    ...                Log    ⚠️ App detectó emulador correctamente
    
    # Testing tamper detection
    Click Element       id=tamper_detection_test
    Wait Until Page Contains Element    id=tamper_check_result
    
    \${tamper_status}=  Get Text    id=tamper_check_result
    Should Be Equal     \${tamper_status}    App Integrity Valid
    
    # Testing code obfuscation (análisis estático simulado)
    \${app_analysis}=   Execute Adb Command shell pm dump \${SECURITY_APP} | grep -i "class\\|method"
    Should Not Contain  \${app_analysis}    com.example.securityapp.secret    Clases sensibles deben estar ofuscadas
    
    # Testing anti-hooking
    Click Element       id=anti_hooking_test
    Wait Until Page Contains Element    id=hooking_detection_result
    
    \${hooking_result}= Get Text    id=hooking_detection_result
    Should Be Equal     \${hooking_result}    No Hooking Detected
    
    # Testing runtime protection
    Click Element       id=runtime_protection_test
    Wait Until Page Contains Element    id=runtime_check_complete
    
    \${runtime_checks}= Get Elements    xpath=//android.widget.TextView[contains(@resource-id, 'protection_check')]
    \${checks_count}=   Get Length    \${runtime_checks}
    Should Be True      \${checks_count} >= 3    Mínimo 3 runtime checks
    
    FOR    \${check}    IN    @{runtime_checks}
        \${check_result}=   Get Text    \${check}
        Should Contain      \${check_result}    PASSED    Runtime check debe pasar
    END
    
    Take Screenshot     reverse_engineering_protection.png
    Close Application
    
    Log    ✓ Reverse engineering protection testing completado

Vulnerability Assessment
    [Documentation]    Assessment completo de vulnerabilidades móviles
    [Tags]             vulnerability    assessment    owasp    mobile    security
    
    \${vuln_caps}=      Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${VULNERABLE_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{vuln_caps}
    
    # OWASP Mobile Top 10 Testing
    
    # M1: Improper Platform Usage
    Click Element       id=platform_usage_test
    Wait Until Page Contains Element    id=platform_test_results
    
    # Testing unsafe API usage
    Click Element       id=unsafe_api_button
    Wait Until Page Contains Element    id=api_usage_warning
    
    \${api_warning}=    Get Text    id=api_usage_warning
    Should Contain      \${api_warning}    Deprecated API    App debe avisar sobre APIs deprecadas
    
    # M2: Insecure Data Storage
    Click Element       id=data_storage_vuln_test
    Wait Until Page Contains Element    id=storage_test_form
    
    Input Text          id=sensitive_input    CreditCard:4532123456789012
    Click Element       id=store_insecurely_button
    
    # Verificar datos no se almacenan en claro
    \${stored_data}=    Execute Adb Command shell su -c "cat /data/data/\${VULNERABLE_APP}/shared_prefs/*.xml"
    Should Not Contain  \${stored_data}    4532123456789012    Datos sensibles no deben estar en claro
    
    # M3: Insecure Communication
    Click Element       id=communication_vuln_test
    Wait Until Page Contains Element    id=network_request_form
    
    Input Text          id=server_url_field    http://insecure-api.test.com
    Click Element       id=send_request_button
    
    Wait Until Page Contains Element    id=communication_result
    \${comm_result}=    Get Text    id=communication_result
    Should Contain      \${comm_result}    Insecure Protocol    App debe detectar HTTP inseguro
    
    # M4: Insecure Authentication
    Click Element       id=auth_vuln_test
    Wait Until Page Contains Element    id=auth_test_form
    
    # Testing weak password policy
    Input Text          id=weak_password_field    123
    Click Element       id=validate_password_button
    
    Wait Until Page Contains Element    id=password_validation_result
    \${pwd_result}=     Get Text    id=password_validation_result
    Should Contain      \${pwd_result}    Weak Password    App debe rechazar passwords débiles
    
    # M5: Insufficient Cryptography
    Click Element       id=crypto_vuln_test
    Wait Until Page Contains Element    id=encryption_test_area
    
    Input Text          id=plaintext_input    Secret Message
    Click Element       id=weak_encrypt_button
    
    Wait Until Page Contains Element    id=encryption_result
    \${encrypted_text}= Get Text    id=encryption_result
    Should Not Be Equal \${encrypted_text}    Secret Message    Texto debe estar encriptado
    
    # Verificar algoritmo de encriptación
    \${crypto_algorithm}= Get Text    id=crypto_algorithm_used
    Should Not Contain  \${crypto_algorithm}    MD5    No debe usar algoritmos débiles
    Should Not Contain  \${crypto_algorithm}    DES    No debe usar DES
    
    # M6: Insecure Authorization
    Click Element       id=authorization_test
    Wait Until Page Contains Element    id=user_role_test
    
    # Testing privilege escalation
    Click Element       id=escalate_privileges_button
    Wait Until Page Contains Element    id=privilege_test_result
    
    \${privilege_result}= Get Text    id=privilege_test_result
    Should Contain      \${privilege_result}    Access Denied    App debe prevenir escalación
    
    # M7: Client Code Quality
    \${code_quality_issues}= Execute Adb Command logcat -d | grep -i "error\\|exception\\|null"
    \${error_count}=    Get Line Count    \${code_quality_issues}
    Should Be True      \${error_count} < 5    Pocos errores en logs (< 5)
    
    # M8: Code Tampering
    Click Element       id=tampering_test_button
    Wait Until Page Contains Element    id=integrity_check_result
    
    \${integrity_result}= Get Text    id=integrity_check_result
    Should Be Equal     \${integrity_result}    Integrity Check Passed
    
    # M9: Reverse Engineering
    # (Ya cubierto en test anterior)
    
    # M10: Extraneous Functionality
    Click Element       id=hidden_features_test
    Wait Until Page Contains Element    id=features_scan_result
    
    \${hidden_features}= Get Text    id=hidden_features_count
    \${features_num}=   Convert To Integer    \${hidden_features}
    Should Be Equal As Numbers    \${features_num}    0    No debe haber funcionalidad oculta
    
    # Generar reporte de vulnerabilidades
    \${vuln_report}=    Create Dictionary
    ...    app_package=\${VULNERABLE_APP}
    ...    scan_timestamp=\${datetime.now().isoformat()}
    ...    owasp_m1_status=tested
    ...    owasp_m2_status=tested
    ...    owasp_m3_status=tested
    ...    total_issues_found=\${error_count}
    
    \${report_json}=    Convert To JSON    \${vuln_report}
    Create File         \${SECURITY_REPORTS}/vulnerability_assessment.json    \${report_json}
    
    Take Screenshot     vulnerability_assessment.png
    Close Application
    
    Log    ✓ Vulnerability assessment completado: \${error_count} issues encontrados</code></pre>
        
        <h3>🎯 Práctica Security (5 min):</h3>
        <p>1. Configura app vulnerable para testing (DIVA, InsecureBankv2)</p>
        <p>2. Instala Burp Suite para proxy de interceptación de tráfico</p>
        <p>3. Ejecuta "Application Permission Analysis" verificando permisos excesivos</p>
        <p>4. Configura rooted device/emulador para "Data Storage Security Testing"</p>
        <p>5. Prueba "Network Security Testing" con Burp proxy configurado</p>
        <p>6. Implementa "Reverse Engineering Protection" testing con obfuscation</p>
        <p>7. Realiza "Vulnerability Assessment" completo siguiendo OWASP Mobile Top 10</p>
        <p>8. Analiza logs del sistema para detectar data leakage</p>
        <p>9. Testa certificate pinning bypass con Frida/Objection</p>
        <p>10. Verifica encryption strength de datos almacenados</p>
        <p>11. Implementa automated security scanning en CI/CD pipeline</p>
        <p>12. Documenta security findings y remediation recommendations</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar testing de permisos y almacenamiento seguro de datos</li>
                <li>Validar seguridad de comunicaciones de red y certificate pinning</li>
                <li>Testing de protecciones contra reverse engineering y tampering</li>
                <li>Realizar assessment completo siguiendo OWASP Mobile Top 10</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa device rooteado para análisis profundo de seguridad. Siempre testea en entorno controlado y nunca en production apps.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 165 - Mobile Testing 165</h3>
        <p>Concluirás mobile testing con técnicas avanzadas de debugging, troubleshooting y optimización de test suites móviles.</p>
    `,
    topics: ["mobile", "appium", "android", "ios"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-163"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_164 = LESSON_164;
}