/**
 * Robot Framework Academy - Lesson 167
 * Mobile Testing 167
 */

const LESSON_167 = {
    id: 167,
    title: "Mobile Testing 167",
    duration: "7 min",
    level: "intermediate",
    section: "section-12",
    content: `
        <h2>🏢 Enterprise Compliance</h2>
        <p>Testing frameworks regulatorios, compliance validation y standards enterprise móviles.</p>
        
        <h3>💻 Tests Compliance:</h3>
        <pre><code class="robot">*** Settings ***
Library    AppiumLibrary
Library    RequestsLibrary
Library    Collections
Library    DateTime
Library    OperatingSystem
Library    Process

*** Variables ***
\${APPIUM_SERVER}     http://localhost:4723/wd/hub
\${COMPLIANCE_APP}    com.example.complianceapp
\${DEVICE_NAME}       Android Emulator
\${TIMEOUT}           15s
\${COMPLIANCE_REPORTS} \${CURDIR}/compliance_reports
\${AUDIT_LOGS}        \${CURDIR}/audit_logs
\${GDPR_ENDPOINT}     https://api.gdpr-compliance.test
\${HIPAA_ENDPOINT}    https://api.hipaa-compliance.test
\${PCI_ENDPOINT}      https://api.pci-compliance.test

*** Test Cases ***
GDPR Compliance Testing
    [Documentation]    Testing completo de compliance GDPR para apps móviles
    [Tags]             gdpr    privacy    compliance    data-protection    regulation
    
    \${gdpr_caps}=      Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${COMPLIANCE_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{gdpr_caps}
    
    # Testing consent management
    Wait Until Page Contains Element    id=privacy_banner
    Element Should Be Visible           id=consent_required_notice
    Element Should Be Visible           id=accept_all_button
    Element Should Be Visible           id=reject_all_button
    Element Should Be Visible           id=manage_preferences_button
    
    # Verificar granular consent options
    Click Element       id=manage_preferences_button
    Wait Until Page Contains Element    id=consent_preferences_screen
    
    \${consent_categories}= Get Elements    xpath=//android.widget.CheckBox[contains(@resource-id, 'consent_category')]
    \${categories_count}= Get Length    \${consent_categories}
    Should Be True      \${categories_count} >= 3    Mínimo 3 categorías de consent
    
    # Testing essential vs non-essential consent
    \${essential_consent}= Get Element Attribute    id=essential_consent_checkbox    checked
    Should Be Equal     \${essential_consent}    true    Essential consent debe estar pre-checked
    Element Should Not Be Enabled    id=essential_consent_checkbox    Essential no debe ser deshabitable
    
    \${marketing_consent}= Get Element Attribute    id=marketing_consent_checkbox    checked
    Should Be Equal     \${marketing_consent}    false    Marketing consent debe estar unchecked por defecto
    Element Should Be Enabled        id=marketing_consent_checkbox    Marketing debe ser opcional
    
    # Testing right to access data
    Click Element       id=save_preferences_button
    Wait Until Page Contains Element    id=main_app_screen
    
    Click Element       id=profile_menu_button
    Click Element       id=privacy_settings_option
    Wait Until Page Contains Element    id=privacy_dashboard
    
    Click Element       id=download_my_data_button
    Wait Until Page Contains Element    id=data_export_initiated
    
    \${export_status}=  Get Text    id=export_status_message
    Should Contain      \${export_status}    Data export request submitted
    
    # Testing right to erasure (right to be forgotten)
    Click Element       id=delete_account_option
    Wait Until Page Contains Element    id=account_deletion_confirmation
    
    Element Should Be Visible    id=deletion_consequences_warning
    Element Should Be Visible    id=confirm_deletion_button
    Element Should Be Visible    id=cancel_deletion_button
    
    \${warning_text}=   Get Text    id=deletion_consequences_warning
    Should Contain      \${warning_text}    permanently delete
    Should Contain      \${warning_text}    30 days
    
    # Testing data portability
    Click Element       id=cancel_deletion_button
    Click Element       id=data_portability_option
    Wait Until Page Contains Element    id=export_format_selection
    
    Element Should Be Visible    id=json_format_option
    Element Should Be Visible    id=csv_format_option
    Element Should Be Visible    id=xml_format_option
    
    Click Element       id=json_format_option
    Click Element       id=request_export_button
    
    Wait Until Page Contains Element    id=portability_request_confirmed
    \${portability_message}= Get Text    id=portability_status
    Should Contain      \${portability_message}    Export will be available within 30 days
    
    # GDPR compliance audit log
    \${gdpr_audit}=     Create Dictionary
    ...    test_timestamp=\${datetime.now().isoformat()}
    ...    consent_management=PASS
    ...    right_to_access=PASS
    ...    right_to_erasure=PASS
    ...    data_portability=PASS
    ...    gdpr_compliance_status=COMPLIANT
    
    \${audit_json}=     Convert To JSON    \${gdpr_audit}
    Create File         \${COMPLIANCE_REPORTS}/gdpr_audit.json    \${audit_json}
    
    Take Screenshot     gdpr_compliance_testing.png
    Close Application
    
    Log    ✓ GDPR compliance testing completado

HIPAA Healthcare Compliance
    [Documentation]    Testing compliance HIPAA para apps de healthcare
    [Tags]             hipaa    healthcare    phi    compliance    security
    
    \${hipaa_caps}=     Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${COMPLIANCE_APP}
    ...    appActivity=.HealthcareActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{hipaa_caps}
    
    # Testing PHI (Protected Health Information) handling
    Click Element       id=healthcare_module_button
    Wait Until Page Contains Element    id=hipaa_notice_screen
    
    Element Should Be Visible    id=hipaa_authorization_form
    Element Should Be Visible    id=phi_usage_disclosure_text
    Element Should Be Visible    id=patient_rights_notice
    
    # Verificar minimum necessary standard
    \${phi_fields}=     Get Elements    xpath=//android.widget.EditText[contains(@hint, 'patient') or contains(@hint, 'medical')]
    
    FOR    \${field}    IN    @{phi_fields}
        \${field_hint}=     Get Element Attribute    \${field}    hint
        Log    PHI field detected: \${field_hint}
        
        # Verificar encryption indicators
        \${is_encrypted}=   Get Element Attribute    \${field}    inputType
        Should Contain      \${is_encrypted}    password    PHI fields deben estar encriptados
    END
    
    # Testing patient authorization
    Input Text          id=patient_id_field         12345
    Input Text          id=patient_name_field       Test Patient
    Input Text          id=date_of_birth_field      1990-01-01
    Input Text          id=ssn_field               123-45-6789
    
    Click Element       id=authorize_phi_access
    Wait Until Page Contains Element    id=authorization_granted
    
    \${auth_timestamp}= Get Text    id=authorization_timestamp
    Should Not Be Empty \${auth_timestamp}    Authorization debe tener timestamp
    
    # Testing audit trail requirements
    Click Element       id=view_medical_records
    Wait Until Page Contains Element    id=medical_records_accessed
    
    \${access_log}=     Get Text    id=access_log_entry
    Should Contain      \${access_log}    User accessed PHI
    Should Contain      \${access_log}    \${auth_timestamp}
    
    # Testing minimum necessary access
    Element Should Not Be Visible    id=all_patient_records_button
    Element Should Be Visible        id=specific_record_button
    Element Should Be Visible        id=limited_access_indicator
    
    # Testing transmission security
    Click Element       id=send_phi_data_button
    Wait Until Page Contains Element    id=transmission_security_check
    
    \${transmission_method}= Get Text    id=transmission_method_display
    Should Contain      \${transmission_method}    Encrypted transmission
    Should Contain      \${transmission_method}    TLS 1.3
    
    # Testing data integrity
    Click Element       id=verify_data_integrity
    Wait Until Page Contains Element    id=integrity_check_complete
    
    \${integrity_result}= Get Text    id=integrity_check_result
    Should Be Equal     \${integrity_result}    Data integrity verified
    
    # HIPAA compliance audit
    \${hipaa_audit}=    Create Dictionary
    ...    test_timestamp=\${datetime.now().isoformat()}
    ...    phi_encryption=PASS
    ...    patient_authorization=PASS
    ...    audit_trail=PASS
    ...    minimum_necessary=PASS
    ...    transmission_security=PASS
    ...    data_integrity=PASS
    ...    hipaa_compliance_status=COMPLIANT
    
    \${hipaa_audit_json}= Convert To JSON    \${hipaa_audit}
    Create File         \${COMPLIANCE_REPORTS}/hipaa_audit.json    \${hipaa_audit_json}
    
    Take Screenshot     hipaa_compliance_testing.png
    Close Application
    
    Log    ✓ HIPAA compliance testing completado

PCI DSS Payment Compliance
    [Documentation]    Testing compliance PCI DSS para apps con pagos
    [Tags]             pci-dss    payment    security    compliance    fintech
    
    \${pci_caps}=       Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${COMPLIANCE_APP}
    ...    appActivity=.PaymentActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{pci_caps}
    
    # Testing secure payment form
    Click Element       id=payment_module_button
    Wait Until Page Contains Element    id=secure_payment_form
    
    # Verificar no hay card data logging
    \${logcat_before}=  Execute Adb Command logcat -d
    
    Input Text          id=card_number_field        4532123456789012
    Input Text          id=expiry_date_field        12/25
    Input Text          id=cvv_field               123
    Input Text          id=cardholder_name_field    Test Cardholder
    
    \${logcat_after}=   Execute Adb Command logcat -d
    
    Should Not Contain  \${logcat_after}    4532123456789012    Card number no debe aparecer en logs
    Should Not Contain  \${logcat_after}    123                CVV no debe aparecer en logs
    
    # Testing field masking
    \${card_field_text}= Get Text    id=card_number_field
    Should Match Regexp \${card_field_text}    \\*{12}\\d{4}    Card number debe estar enmascarado
    
    \${cvv_field_text}= Get Text    id=cvv_field
    Should Match Regexp \${cvv_field_text}    \\*{3}    CVV debe estar enmascarado
    
    # Testing secure transmission
    Click Element       id=process_payment_button
    Wait Until Page Contains Element    id=payment_processing
    
    # Verificar comunicación encriptada
    \${network_logs}=   Execute Adb Command logcat -d | grep -i "http"
    Should Not Contain  \${network_logs}    http://    Solo HTTPS permitido
    Should Contain      \${network_logs}    https://   Debe usar HTTPS
    
    # Testing tokenization
    Wait Until Page Contains Element    id=payment_processed    15s
    \${payment_token}=  Get Text    id=payment_token_display
    
    Should Not Contain  \${payment_token}    4532123456789012    Token no debe contener card data
    Should Match Regexp \${payment_token}    ^tok_[a-zA-Z0-9]{24}$    Token format válido
    
    # Testing cardholder data handling
    Click Element       id=view_transaction_history
    Wait Until Page Contains Element    id=transaction_list
    
    \${transaction_entries}= Get Elements    xpath=//android.widget.LinearLayout[contains(@resource-id, 'transaction_item')]
    
    FOR    \${transaction}    IN    @{transaction_entries}
        \${card_display}=   Get Text    xpath=.//android.widget.TextView[contains(@resource-id, 'card_info')]
        Should Match Regexp \${card_display}    \\*{4}\\d{4}|\\*{12}\\d{4}    PAN debe estar truncado
        
        \${amount_display}= Get Text    xpath=.//android.widget.TextView[contains(@resource-id, 'amount')]
        Should Match Regexp \${amount_display}    ^\\$\\d+\\.\\d{2}$    Amount format válido
    END
    
    # Testing data retention policy
    Click Element       id=data_retention_settings
    Wait Until Page Contains Element    id=retention_policy_display
    
    \${retention_period}= Get Text    id=card_data_retention_period
    \${retention_days}= Convert To Integer    \${retention_period.split()[0]}
    Should Be True      \${retention_days} <= 90    Card data retention <= 90 días
    
    # Testing access controls
    Click Element       id=payment_admin_panel
    Wait Until Page Contains Element    id=admin_authentication_required
    
    Element Should Be Visible    id=admin_username_field
    Element Should Be Visible    id=admin_password_field
    Element Should Be Visible    id=two_factor_authentication_required
    
    # PCI DSS compliance audit
    \${pci_audit}=      Create Dictionary
    ...    test_timestamp=\${datetime.now().isoformat()}
    ...    secure_payment_form=PASS
    ...    field_masking=PASS
    ...    secure_transmission=PASS
    ...    tokenization=PASS
    ...    data_retention=PASS
    ...    access_controls=PASS
    ...    no_card_data_logging=PASS
    ...    pci_dss_compliance_status=COMPLIANT
    
    \${pci_audit_json}= Convert To JSON    \${pci_audit}
    Create File         \${COMPLIANCE_REPORTS}/pci_dss_audit.json    \${pci_audit_json}
    
    Take Screenshot     pci_dss_compliance_testing.png
    Close Application
    
    Log    ✓ PCI DSS compliance testing completado

SOX Financial Compliance
    [Documentation]    Testing compliance SOX para apps financieras
    [Tags]             sox    financial    audit    compliance    controls
    
    \${sox_caps}=       Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${COMPLIANCE_APP}
    ...    appActivity=.FinancialActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{sox_caps}
    
    # Testing financial data controls
    Click Element       id=financial_module_button
    Wait Until Page Contains Element    id=financial_controls_screen
    
    # Verificar segregation of duties
    Element Should Be Visible    id=role_based_access_indicator
    Element Should Be Visible    id=approval_workflow_required
    Element Should Not Be Visible id=single_user_approval_option
    
    # Testing audit trail for financial transactions
    Click Element       id=initiate_financial_transaction
    Wait Until Page Contains Element    id=transaction_form
    
    Input Text          id=transaction_amount       10000.00
    Input Text          id=transaction_description  SOX compliance test
    Input Text          id=account_number          ACC123456
    
    Click Element       id=submit_for_approval
    Wait Until Page Contains Element    id=approval_required_notice
    
    \${approval_notice}= Get Text    id=approval_notice_text
    Should Contain      \${approval_notice}    Requires manager approval
    Should Contain      \${approval_notice}    Amount > \$5,000
    
    # Testing immutable audit records
    \${audit_record_id}= Get Text    id=audit_record_id_display
    Should Not Be Empty \${audit_record_id}    Audit record debe tener ID único
    
    Click Element       id=view_audit_trail
    Wait Until Page Contains Element    id=audit_trail_screen
    
    \${audit_entries}=  Get Elements    xpath=//android.widget.LinearLayout[contains(@resource-id, 'audit_entry')]
    \${entries_count}=  Get Length    \${audit_entries}
    Should Be True      \${entries_count} >= 3    Mínimo 3 audit entries
    
    FOR    \${entry}    IN    @{audit_entries}
        \${timestamp}=      Get Text    xpath=.//android.widget.TextView[contains(@resource-id, 'timestamp')]
        \${user_id}=        Get Text    xpath=.//android.widget.TextView[contains(@resource-id, 'user_id')]
        \${action}=         Get Text    xpath=.//android.widget.TextView[contains(@resource-id, 'action')]
        
        Should Not Be Empty \${timestamp}    Audit entry debe tener timestamp
        Should Not Be Empty \${user_id}      Audit entry debe tener user ID
        Should Not Be Empty \${action}       Audit entry debe describir acción
        
        Log    Audit entry: \${timestamp} - \${user_id} - \${action}
    END
    
    # Testing financial reporting controls
    Click Element       id=financial_reports_section
    Wait Until Page Contains Element    id=reports_dashboard
    
    Click Element       id=generate_sox_report
    Wait Until Page Contains Element    id=report_generation_form
    
    \${reporting_period}= Get Text    id=current_reporting_period
    Should Match Regexp \${reporting_period}    ^Q\\d{1} \\d{4}$    Reporting period format válido
    
    Element Should Be Visible    id=report_review_required
    Element Should Be Visible    id=cfo_approval_required
    Element Should Be Visible    id=external_auditor_access
    
    # Testing data integrity controls
    Click Element       id=data_integrity_check
    Wait Until Page Contains Element    id=integrity_verification_running
    
    Wait Until Page Contains Element    id=integrity_check_complete    20s
    \${integrity_status}= Get Text    id=data_integrity_status
    Should Be Equal     \${integrity_status}    All data integrity checks passed
    
    # Testing change management controls
    Click Element       id=system_change_log
    Wait Until Page Contains Element    id=change_log_display
    
    \${recent_changes}= Get Elements    xpath=//android.widget.LinearLayout[contains(@resource-id, 'change_entry')]
    
    FOR    \${change}    IN    @{recent_changes}
        \${change_type}=    Get Text    xpath=.//android.widget.TextView[contains(@resource-id, 'change_type')]
        \${approver}=       Get Text    xpath=.//android.widget.TextView[contains(@resource-id, 'approver')]
        \${change_date}=    Get Text    xpath=.//android.widget.TextView[contains(@resource-id, 'change_date')]
        
        Should Not Be Empty \${change_type}    Change debe tener tipo
        Should Not Be Empty \${approver}       Change debe tener approver
        Should Not Be Empty \${change_date}    Change debe tener fecha
    END
    
    # SOX compliance audit
    \${sox_audit}=      Create Dictionary
    ...    test_timestamp=\${datetime.now().isoformat()}
    ...    segregation_of_duties=PASS
    ...    audit_trail=PASS
    ...    financial_controls=PASS
    ...    reporting_controls=PASS
    ...    data_integrity=PASS
    ...    change_management=PASS
    ...    sox_compliance_status=COMPLIANT
    
    \${sox_audit_json}= Convert To JSON    \${sox_audit}
    Create File         \${COMPLIANCE_REPORTS}/sox_audit.json    \${sox_audit_json}
    
    Take Screenshot     sox_compliance_testing.png
    Close Application
    
    Log    ✓ SOX financial compliance testing completado

Accessibility Compliance Validation
    [Documentation]    Validación compliance de accessibility standards
    [Tags]             accessibility    ada    wcag    compliance    a11y
    
    \${a11y_caps}=      Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${COMPLIANCE_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{a11y_caps}
    
    # WCAG 2.1 AA compliance testing
    \${accessibility_elements}= Get Elements    xpath=//*[@content-desc or @text]
    \${a11y_violations}= Create List
    
    FOR    \${element}    IN    @{accessibility_elements}
        # Test 1.1.1 Non-text Content
        \${content_desc}=   Get Element Attribute    \${element}    content-desc
        \${element_text}=   Get Element Attribute    \${element}    text
        \${element_class}=  Get Element Attribute    \${element}    class
        
        Run Keyword If      '\${element_class}' == 'android.widget.ImageView'
        ...                Run Keyword If    '\${content_desc}' == '' or '\${content_desc}' == 'null'
        ...                Append To List    \${a11y_violations}    Missing alt text for image
        
        # Test 1.4.3 Contrast (Minimum)
        Run Keyword If      '\${element_class}' == 'android.widget.TextView'
        ...                Validate Text Contrast    \${element}
        
        # Test 2.4.6 Headings and Labels
        Run Keyword If      'heading' in '\${content_desc}'.lower() or 'title' in '\${content_desc}'.lower()
        ...                Validate Heading Structure    \${element}
    END
    
    # Test 2.1.1 Keyboard accessibility
    \${focusable_elements}= Get Elements    xpath=//*[@focusable='true']
    \${focusable_count}= Get Length    \${focusable_elements}
    Should Be True      \${focusable_count} >= 5    Elementos focusables para navegación
    
    FOR    \${focusable}    IN    @{focusable_elements}
        # Simular navegación por tab
        Click Element       \${focusable}
        \${is_focused}=     Get Element Attribute    \${focusable}    focused
        Should Be Equal     \${is_focused}    true    Elemento debe recibir focus
    END
    
    # Test 2.5.5 Target Size
    \${touch_targets}=  Get Elements    xpath=//android.widget.Button
    
    FOR    \${target}    IN    @{touch_targets}
        \${size}=           Get Element Size    \${target}
        \${width}=          Get From Dictionary    \${size}    width
        \${height}=         Get From Dictionary    \${size}    height
        
        Run Keyword If      \${width} < 48 or \${height} < 48
        ...                Append To List    \${a11y_violations}    Touch target too small: \${width}x\${height}
    END
    
    # Test 3.2.1 On Focus
    Click Element       id=form_test_button
    Wait Until Page Contains Element    id=test_form
    
    \${form_fields}=    Get Elements    xpath=//android.widget.EditText
    FOR    \${field}    IN    @{form_fields}
        Click Element       \${field}
        Sleep               0.5s
        # Verificar no hay cambios automáticos de contexto
        \${current_activity}= Get Current Activity
        Should Contain      \${current_activity}    MainActivity    No debe cambiar actividad al hacer focus
    END
    
    # Generate WCAG compliance report
    \${violations_count}= Get Length    \${a11y_violations}
    \${compliance_level}= Set Variable If    \${violations_count} == 0    AAA    AA    A
    
    \${wcag_audit}=     Create Dictionary
    ...    test_timestamp=\${datetime.now().isoformat()}
    ...    wcag_version=2.1
    ...    compliance_level=\${compliance_level}
    ...    violations_count=\${violations_count}
    ...    violations=\${a11y_violations}
    ...    accessibility_compliance_status=\${compliance_level}
    
    \${wcag_audit_json}= Convert To JSON    \${wcag_audit}
    Create File         \${COMPLIANCE_REPORTS}/wcag_audit.json    \${wcag_audit_json}
    
    Take Screenshot     accessibility_compliance_testing.png
    Close Application
    
    Log    ✓ Accessibility compliance testing completado: \${compliance_level} level</code></pre>
        
        <h3>🎯 Práctica Compliance (5 min):</h3>
        <p>1. Configura app con múltiples módulos compliance (GDPR, HIPAA, PCI)</p>
        <p>2. Crea directorios compliance_reports y audit_logs para documentación</p>
        <p>3. Ejecuta "GDPR Compliance Testing" verificando consent management</p>
        <p>4. Prueba "HIPAA Healthcare Compliance" con PHI data handling</p>
        <p>5. Implementa "PCI DSS Payment Compliance" validando card data security</p>
        <p>6. Valida "SOX Financial Compliance" con audit trails y controls</p>
        <p>7. Ejecuta "Accessibility Compliance Validation" contra WCAG 2.1</p>
        <p>8. Analiza reportes de audit generados automáticamente</p>
        <p>9. Documenta violations encontradas y remediation plans</p>
        <p>10. Implementa automated compliance checking en CI/CD pipeline</p>
        <p>11. Crea dashboard de compliance status para stakeholders</p>
        <p>12. Establece alertas para compliance violations críticas</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar testing completo de GDPR, HIPAA, PCI DSS y SOX compliance</li>
                <li>Validar accessibility compliance contra standards WCAG 2.1</li>
                <li>Generar audit trails y reportes automáticos de compliance</li>
                <li>Establecer frameworks de testing regulatorio enterprise</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Compliance no es opcional en enterprise. Automatiza testing regulatorio para prevenir multas costosas y legal issues.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 168 - Mobile app testing project</h3>
        <p>Culminarás mobile testing con un proyecto integrador final que combina todas las técnicas aprendidas en un caso enterprise real.</p>
    `,
    topics: ["mobile", "appium", "android", "ios"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-166"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_167 = LESSON_167;
}