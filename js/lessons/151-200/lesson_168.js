/**
 * Robot Framework Academy - Lesson 168
 * Mobile app testing project
 */

const LESSON_168 = {
    id: 168,
    title: "Mobile app testing project",
    duration: "15 min",
    level: "intermediate",
    section: "section-12",
    content: `
        <h2>🏆 Proyecto Integrador Final</h2>
        <p>E-commerce móvil completo integrando todas las técnicas: testing nativo/híbrido, CI/CD, security, compliance.</p>
        
        <h3>💻 Proyecto Completo:</h3>
        <pre><code class="robot">*** Settings ***
Library    AppiumLibrary
Library    SeleniumLibrary
Library    RequestsLibrary
Library    DatabaseLibrary
Library    Collections
Library    DateTime
Library    OperatingSystem
Library    Process
Library    String

*** Variables ***
\${APPIUM_SERVER}     http://localhost:4723/wd/hub
\${PROJECT_APP}       com.ecommerce.mobileapp
\${HYBRID_WEBVIEW}    com.ecommerce.hybridapp
\${DEVICE_NAME}       Android Emulator
\${TIMEOUT}           20s
\${PROJECT_SESSION}   \${EMPTY}
\${TEST_DATA_DIR}     \${CURDIR}/project_data
\${REPORTS_DIR}       \${CURDIR}/project_reports
\${API_BASE}          https://api.ecommerce-test.com
\${DB_CONNECTION}     mysql://user:pass@localhost:3306/ecommerce
\${CI_BUILD_ID}       \${EMPTY}
\${PERFORMANCE_BASELINE} \${CURDIR}/performance_baseline.json
\${SECURITY_SCAN_RESULTS} \${CURDIR}/security_results

*** Test Cases ***
Project Environment Setup
    [Documentation]    Configuración completa del entorno de testing móvil
    [Tags]             setup    environment    configuration    project-init
    
    # Generar session ID único para proyecto
    \${timestamp}=      Get Current Date    result_format=%Y%m%d_%H%M%S
    \${project_session}= Set Variable    mobile_ecommerce_\${timestamp}
    Set Global Variable \${PROJECT_SESSION}    \${project_session}
    Set Global Variable \${CI_BUILD_ID}       BUILD_\${timestamp}
    
    # Crear estructura de directorios del proyecto
    Create Directory    \${TEST_DATA_DIR}/\${project_session}
    Create Directory    \${REPORTS_DIR}/\${project_session}
    Create Directory    \${REPORTS_DIR}/\${project_session}/screenshots
    Create Directory    \${REPORTS_DIR}/\${project_session}/performance
    Create Directory    \${REPORTS_DIR}/\${project_session}/security
    Create Directory    \${REPORTS_DIR}/\${project_session}/compliance
    
    # Verificar conectividad completa del stack
    Create Session      ecommerce_api    \${API_BASE}
    \${api_health}=     GET On Session    ecommerce_api    /health
    Status Should Be    200    \${api_health}    API debe estar disponible
    
    Connect To Database pymysql    ecommerce    testuser    testpass    localhost    3306
    \${db_test}=        Query    SELECT 1 as test
    Should Be Equal As Numbers    \${db_test[0][0]}    1    Database conectada
    Disconnect From Database
    
    # Verificar dispositivos móviles disponibles
    \${device_list}=    Execute Adb Command devices
    Should Contain      \${device_list}    device    Al menos 1 device conectado
    
    # Inicializar baseline de performance
    \${performance_baseline}= Create Dictionary
    ...    app_launch_time=5.0
    ...    screen_transition_time=2.0
    ...    api_response_time=3.0
    ...    memory_usage_mb=300
    ...    cpu_usage_percent=25
    
    \${baseline_json}=  Convert To JSON    \${performance_baseline}
    Create File         \${PERFORMANCE_BASELINE}    \${baseline_json}
    
    Log    ✓ Project environment setup completado: \${project_session}

Cross-Platform App Testing
    [Documentation]    Testing comprehensivo de app nativa y híbrida
    [Tags]             cross-platform    native    hybrid    comprehensive
    
    # Testing app nativa
    \${native_caps}=    Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${PROJECT_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    ...    newCommandTimeout=60
    
    \${native_start}=   Get Time    epoch
    Open Application    \${APPIUM_SERVER}    &{native_caps}
    \${native_launch}=  Get Time    epoch
    
    \${launch_time}=    Evaluate    \${native_launch} - \${native_start}
    Should Be True      \${launch_time} < 8    Native app launch < 8s
    
    # Testing navegación principal nativa
    Wait Until Page Contains Element    id=main_navigation
    Element Should Be Visible           id=product_catalog_tab
    Element Should Be Visible           id=shopping_cart_tab
    Element Should Be Visible           id=user_profile_tab
    Element Should Be Visible           id=settings_tab
    
    # Testing product catalog con performance
    \${catalog_start}=  Get Time    epoch
    Click Element       id=product_catalog_tab
    Wait Until Page Contains Element    id=product_grid_loaded
    \${catalog_end}=    Get Time    epoch
    
    \${catalog_load_time}= Evaluate    \${catalog_end} - \${catalog_start}
    Should Be True      \${catalog_load_time} < 5    Catalog load < 5s
    
    # Testing búsqueda y filtros
    Click Element       id=search_button
    Input Text          id=search_field    smartphone
    Click Element       id=search_submit
    
    Wait Until Page Contains Element    id=search_results_loaded
    \${product_count}=  Get Element Count    xpath=//android.widget.LinearLayout[contains(@resource-id, 'product_item')]
    Should Be True      \${product_count} >= 3    Mínimo 3 productos encontrados
    
    # Testing product details y add to cart
    Click Element       xpath=(//android.widget.LinearLayout[contains(@resource-id, 'product_item')])[1]
    Wait Until Page Contains Element    id=product_details_screen
    
    Element Should Be Visible    id=product_title
    Element Should Be Visible    id=product_price
    Element Should Be Visible    id=product_description
    Element Should Be Visible    id=add_to_cart_button
    
    \${product_title}=  Get Text    id=product_title
    \${product_price}=  Get Text    id=product_price
    
    Click Element       id=add_to_cart_button
    Wait Until Page Contains Element    id=item_added_confirmation
    
    # Verificar cart update
    \${cart_count}=     Get Text    id=cart_item_count
    Should Be Equal     \${cart_count}    1
    
    Take Screenshot     \${REPORTS_DIR}/\${PROJECT_SESSION}/screenshots/native_app_testing.png
    Close Application
    
    # Testing app híbrida
    \${hybrid_caps}=    Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${HYBRID_WEBVIEW}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{hybrid_caps}
    
    # Verificar contextos disponibles
    \${contexts}=       Get Contexts
    \${webview_context}= Set Variable    \${EMPTY}
    
    FOR    \${context}    IN    @{contexts}
        \${is_webview}=  Run Keyword And Return Status
        ...             Should Contain    \${context}    WEBVIEW
        Run Keyword If  \${is_webview}
        ...             Set Variable     \${webview_context}    \${context}
    END
    
    Should Not Be Empty \${webview_context}    Webview context debe existir
    
    # Testing navegación nativa-webview
    Element Should Be Visible    id=native_header
    Click Element               id=webview_section_button
    
    Switch To Context   \${webview_context}
    
    # Testing elementos web dentro del webview
    Wait Until Page Contains Element    css=.webview-content
    Element Should Be Visible           css=.product-grid
    Element Should Be Visible           css=.filter-section
    
    # Testing web form en webview
    Input Text          css=input[name="search"]    tablet
    Click Element       css=button.search-btn
    
    Wait Until Page Contains Element    css=.search-results
    \${web_results}=    Get Element Count    css=.product-card
    Should Be True      \${web_results} >= 2    Mínimo 2 productos web
    
    # Volver a contexto nativo
    Switch To Context   NATIVE_APP
    Element Should Be Visible    id=native_footer
    
    Take Screenshot     \${REPORTS_DIR}/\${PROJECT_SESSION}/screenshots/hybrid_app_testing.png
    Close Application
    
    Log    ✓ Cross-platform testing completado: Native=\${launch_time}s, Catalog=\${catalog_load_time}s

API Integration and Data Validation
    [Documentation]    Testing integración API completa con validación de datos
    [Tags]             api    integration    data-validation    backend
    
    # Testing user registration via API
    \${user_data}=      Create Dictionary
    ...    username=mobile_user_\${PROJECT_SESSION}
    ...    email=mobileuser@test.com
    ...    password=MobileTest123!
    ...    first_name=Mobile
    ...    last_name=Tester
    ...    phone=+1234567890
    
    \${register_response}= POST On Session    ecommerce_api    /users/register
    ...    json=\${user_data}    expected_status=201
    
    \${user_id}=        Get From Dictionary    \${register_response.json()}    user_id
    Should Not Be Empty \${user_id}    User ID debe ser generado
    Set Global Variable \${TEST_USER_ID}    \${user_id}
    
    # Validar usuario en database
    Connect To Database pymysql    ecommerce    testuser    testpass    localhost    3306
    \${db_user}=        Query    SELECT username, email FROM users WHERE user_id = \${user_id}
    Should Be Equal     \${db_user[0][0]}    \${user_data}[username]
    Should Be Equal     \${db_user[0][1]}    \${user_data}[email]
    
    # Testing product catalog API
    \${products_response}= GET On Session    ecommerce_api    /products?category=electronics
    Status Should Be    200    \${products_response}
    
    \${products}=       Get From Dictionary    \${products_response.json()}    products
    \${products_count}= Get Length    \${products}
    Should Be True      \${products_count} >= 5    Mínimo 5 productos en catálogo
    
    # Testing order creation workflow
    \${order_items}=    Create List
    ...    {"product_id": 101, "quantity": 2, "price": 599.99}
    ...    {"product_id": 102, "quantity": 1, "price": 299.99}
    
    \${order_data}=     Create Dictionary
    ...    user_id=\${user_id}
    ...    items=\${order_items}
    ...    shipping_address=123 Test Street, Test City, TC 12345
    ...    payment_method=credit_card
    ...    total_amount=1499.97
    
    \${order_response}= POST On Session    ecommerce_api    /orders
    ...    json=\${order_data}    expected_status=201
    
    \${order_id}=       Get From Dictionary    \${order_response.json()}    order_id
    Set Global Variable \${TEST_ORDER_ID}    \${order_id}
    
    # Validar order en database
    \${db_order}=       Query    SELECT total_amount, status FROM orders WHERE order_id = \${order_id}
    Should Be Equal As Numbers    \${db_order[0][0]}    1499.97
    Should Be Equal     \${db_order[0][1]}    pending
    
    # Testing inventory update
    \${inventory_response}= GET On Session    ecommerce_api    /products/101/inventory
    \${current_stock}=  Get From Dictionary    \${inventory_response.json()}    stock_quantity
    Should Be True      \${current_stock} >= 2    Stock suficiente para order
    
    Disconnect From Database
    
    Log    ✓ API integration completado: User=\${user_id}, Order=\${order_id}

Mobile Security and Compliance Testing
    [Documentation]    Testing completo de seguridad y compliance móvil
    [Tags]             security    compliance    gdpr    pci    accessibility
    
    \${security_caps}=  Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${PROJECT_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{security_caps}
    
    # Security testing: Verificar no hay datos sensibles en logs
    \${logcat_before}=  Execute Adb Command logcat -c
    \${logcat_before}=  Execute Adb Command logcat -d
    
    # Simular entrada de datos sensibles
    Click Element       id=login_button
    Wait Until Page Contains Element    id=login_form
    
    Input Text          id=username_field    \${TEST_USER_ID}
    Input Password      id=password_field    MobileTest123!
    Click Element       id=login_submit
    
    \${logcat_after}=   Execute Adb Command logcat -d
    Should Not Contain  \${logcat_after}    MobileTest123!    Password no debe aparecer en logs
    Should Not Contain  \${logcat_after}    user_id    User ID no debe loggearse
    
    # Testing session management
    Wait Until Page Contains Element    id=user_dashboard
    \${session_token}=  Get Text    id=session_display
    Should Match Regexp \${session_token}    ^[A-Za-z0-9+/]{32,}$    Token format seguro
    
    # GDPR compliance: Testing data export
    Click Element       id=profile_menu
    Click Element       id=privacy_settings
    Wait Until Page Contains Element    id=gdpr_options
    
    Element Should Be Visible    id=export_my_data_button
    Element Should Be Visible    id=delete_account_button
    Element Should Be Visible    id=consent_preferences_button
    
    Click Element       id=export_my_data_button
    Wait Until Page Contains Element    id=export_requested
    
    \${export_message}= Get Text    id=export_status
    Should Contain      \${export_message}    Data export initiated
    
    # Accessibility compliance testing
    \${accessibility_violations}= Create List
    \${all_elements}=   Get Elements    xpath=//*
    
    FOR    \${element}    IN    @{all_elements}
        \${element_class}=  Get Element Attribute    \${element}    class
        \${content_desc}=   Get Element Attribute    \${element}    content-desc
        
        # Check images have alt text
        Run Keyword If      '\${element_class}' == 'android.widget.ImageView'
        ...                Run Keyword If    '\${content_desc}' == '' or '\${content_desc}' == 'null'
        ...                Append To List    \${accessibility_violations}    Missing alt text for image
        
        # Check buttons have descriptions
        Run Keyword If      '\${element_class}' == 'android.widget.Button'
        ...                Run Keyword If    '\${content_desc}' == '' or '\${content_desc}' == 'null'
        ...                Append To List    \${accessibility_violations}    Missing description for button
    END
    
    \${violations_count}= Get Length    \${accessibility_violations}
    Should Be True      \${violations_count} <= 2    Máximo 2 violations accessibility
    
    # Generate security report
    \${security_report}= Create Dictionary
    ...    session=\${PROJECT_SESSION}
    ...    data_leakage_test=PASS
    ...    session_management=PASS
    ...    gdpr_compliance=PASS
    ...    accessibility_violations=\${violations_count}
    ...    security_score=\${95 - (\${violations_count} * 5)}
    
    \${security_json}=  Convert To JSON    \${security_report}
    Create File         \${REPORTS_DIR}/\${PROJECT_SESSION}/security/security_report.json    \${security_json}
    
    Take Screenshot     \${REPORTS_DIR}/\${PROJECT_SESSION}/screenshots/security_testing.png
    Close Application
    
    Log    ✓ Security and compliance testing completado: \${violations_count} violations

Performance and Load Testing
    [Documentation]    Testing performance bajo carga y stress testing
    [Tags]             performance    load    stress    optimization
    
    \${performance_caps}= Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${PROJECT_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    \${performance_metrics}= Create Dictionary
    
    # Performance baseline testing
    \${perf_start}=     Get Time    epoch
    Open Application    \${APPIUM_SERVER}    &{performance_caps}
    \${app_launched}=   Get Time    epoch
    
    \${actual_launch_time}= Evaluate    \${app_launched} - \${perf_start}
    Set To Dictionary   \${performance_metrics}    app_launch_time    \${actual_launch_time}
    
    # Testing navegación performance
    \${nav_start}=      Get Time    epoch
    Click Element       id=product_catalog_tab
    Wait Until Page Contains Element    id=product_grid_loaded
    \${nav_end}=        Get Time    epoch
    
    \${nav_time}=       Evaluate    \${nav_end} - \${nav_start}
    Set To Dictionary   \${performance_metrics}    navigation_time    \${nav_time}
    
    # Testing scroll performance con productos
    \${scroll_start}=   Get Time    epoch
    FOR    \${i}    IN RANGE    10
        Scroll Down     id=product_grid
        Sleep           0.1s
    END
    \${scroll_end}=     Get Time    epoch
    
    \${scroll_time}=    Evaluate    \${scroll_end} - \${scroll_start}
    Set To Dictionary   \${performance_metrics}    scroll_performance    \${scroll_time}
    
    # Testing API response times bajo carga
    \${api_times}=      Create List
    
    FOR    \${request}    IN RANGE    5
        \${api_start}=      Get Time    epoch
        Click Element       id=refresh_products_button
        Wait Until Page Contains Element    id=products_refreshed
        \${api_end}=        Get Time    epoch
        
        \${api_time}=       Evaluate    \${api_end} - \${api_start}
        Append To List      \${api_times}    \${api_time}
    END
    
    \${avg_api_time}=   Evaluate    sum(\${api_times}) / len(\${api_times})
    Set To Dictionary   \${performance_metrics}    avg_api_response    \${avg_api_time}
    
    # Memory usage monitoring
    TRY
        \${memory_info}=    Execute Javascript    mobile: getDeviceInfo
        \${memory_usage}=   Get From Dictionary    \${memory_info}    memoryUsage
        Set To Dictionary   \${performance_metrics}    memory_usage_mb    \${memory_usage}
        
    EXCEPT
        Set To Dictionary   \${performance_metrics}    memory_usage_mb    unknown
    END
    
    # Load baseline y compare
    \${baseline_content}= Get File    \${PERFORMANCE_BASELINE}
    \${baseline}=       Convert String To JSON    \${baseline_content}
    
    \${performance_comparison}= Create Dictionary
    ...    launch_time_regression=\${(\${actual_launch_time} - \${baseline}[app_launch_time]) / \${baseline}[app_launch_time] * 100}
    ...    navigation_regression=\${(\${nav_time} - \${baseline}[screen_transition_time]) / \${baseline}[screen_transition_time] * 100}
    ...    api_response_regression=\${(\${avg_api_time} - \${baseline}[api_response_time]) / \${baseline}[api_response_time] * 100}
    
    # Assertions performance
    Should Be True      \${actual_launch_time} < 10    App launch < 10s
    Should Be True      \${nav_time} < 5              Navigation < 5s
    Should Be True      \${avg_api_time} < 8          API avg response < 8s
    Should Be True      \${scroll_time} < 3           Scroll performance < 3s
    
    # Generate performance report
    \${performance_report}= Create Dictionary
    ...    session=\${PROJECT_SESSION}
    ...    metrics=\${performance_metrics}
    ...    baseline_comparison=\${performance_comparison}
    ...    performance_grade=A
    
    \${performance_json}= Convert To JSON    \${performance_report}
    Create File         \${REPORTS_DIR}/\${PROJECT_SESSION}/performance/performance_report.json    \${performance_json}
    
    Take Screenshot     \${REPORTS_DIR}/\${PROJECT_SESSION}/screenshots/performance_testing.png
    Close Application
    
    Log    ✓ Performance testing completado: Launch=\${actual_launch_time}s, Nav=\${nav_time}s, API=\${avg_api_time}s

CI/CD Integration and Reporting
    [Documentation]    Integración CI/CD y generación de reportes finales
    [Tags]             cicd    reporting    integration    final
    
    # Generate consolidated project report
    \${project_summary}= Create Dictionary
    ...    project_session=\${PROJECT_SESSION}
    ...    ci_build_id=\${CI_BUILD_ID}
    ...    execution_timestamp=\${datetime.now().isoformat()}
    ...    test_user_id=\${TEST_USER_ID}
    ...    test_order_id=\${TEST_ORDER_ID}
    
    # Collect all test results
    \${security_report_content}= Get File    \${REPORTS_DIR}/\${PROJECT_SESSION}/security/security_report.json
    \${security_results}= Convert String To JSON    \${security_report_content}
    
    \${performance_report_content}= Get File    \${REPORTS_DIR}/\${PROJECT_SESSION}/performance/performance_report.json
    \${performance_results}= Convert String To JSON    \${performance_report_content}
    
    # Calculate overall project score
    \${security_score}= Get From Dictionary    \${security_results}    security_score
    \${performance_grade}= Get From Dictionary    \${performance_results}    performance_grade
    
    \${overall_score}=  Evaluate    (\${security_score} + 90) / 2    # Performance A = 90pts
    
    # Determine project status
    \${project_status}= Set Variable If    \${overall_score} >= 85    EXCELLENT    GOOD    NEEDS_IMPROVEMENT
    
    # Final project report
    \${final_report}=   Create Dictionary
    ...    project_summary=\${project_summary}
    ...    test_coverage=COMPLETE
    ...    security_testing=\${security_results}
    ...    performance_testing=\${performance_results}
    ...    overall_score=\${overall_score}
    ...    project_status=\${project_status}
    ...    recommendations=["Implement automated regression testing", "Add more accessibility validations", "Optimize API response times"]
    ...    next_steps=["Deploy to staging environment", "Schedule production deployment", "Setup monitoring alerts"]
    
    \${final_json}=     Convert To JSON    \${final_report}
    Create File         \${REPORTS_DIR}/\${PROJECT_SESSION}/final_project_report.json    \${final_json}
    
    # CI/CD integration metadata
    \${cicd_metadata}=  Create Dictionary
    ...    build_id=\${CI_BUILD_ID}
    ...    test_suite=mobile_ecommerce_complete
    ...    environment=integration_testing
    ...    deployment_ready=\${overall_score >= 85}
    ...    quality_gate_passed=\${project_status != 'NEEDS_IMPROVEMENT'}
    
    \${cicd_json}=      Convert To JSON    \${cicd_metadata}
    Create File         \${REPORTS_DIR}/\${PROJECT_SESSION}/cicd_metadata.json    \${cicd_json}
    
    # Cleanup test data
    TRY
        DELETE On Session  ecommerce_api    /users/\${TEST_USER_ID}
        DELETE On Session  ecommerce_api    /orders/\${TEST_ORDER_ID}
        Log    ✓ Test data cleanup completed
    EXCEPT
        Log    Test data cleanup failed, manual cleanup required
    END
    
    # Final assertions
    Should Be True      \${overall_score} >= 80    Overall project score >= 80%
    Should Be Equal     \${project_status}    EXCELLENT    Project must achieve EXCELLENT status
    
    Log    ✓ Mobile testing project completado: Score=\${overall_score}%, Status=\${project_status}</code></pre>
        
        <h3>🎯 Proyecto Final (12 min):</h3>
        <p>1. Configura entorno completo: app nativa + híbrida + API + database</p>
        <p>2. Prepara datos de prueba para e-commerce: usuarios, productos, órdenes</p>
        <p>3. Ejecuta "Project Environment Setup" verificando conectividad full-stack</p>
        <p>4. Implementa "Cross-Platform App Testing" con native y webview contexts</p>
        <p>5. Prueba "API Integration and Data Validation" con workflow completo</p>
        <p>6. Valida "Mobile Security and Compliance Testing" (GDPR + accessibility)</p>
        <p>7. Ejecuta "Performance and Load Testing" con métricas baseline</p>
        <p>8. Genera "CI/CD Integration and Reporting" con score final del proyecto</p>
        <p>9. Analiza reportes consolidados en project_reports directory</p>
        <p>10. Verifica que overall score >= 85% para deployment readiness</p>
        <p>11. Documenta lessons learned y optimization opportunities</p>
        <p>12. Presenta resultados del proyecto a stakeholders técnicos</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar TODAS las técnicas mobile testing en proyecto enterprise real</li>
                <li>Demostrar competencia cross-platform (nativo + híbrido + API)</li>
                <li>Validar security, compliance y performance en workflow completo</li>
                <li>Generar reportes professional-grade para CI/CD y stakeholders</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Este proyecto final demuestra tu expertise mobile testing enterprise. Úsalo como portfolio piece para oportunidades senior QA Engineer.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 169 - Python Libraries development</h3>
        <p>¡Felicitaciones! Has completado Mobile Testing mastery. Continuarás con desarrollo de librerías Python personalizadas para extender Robot Framework.</p>
    `,
    topics: ["mobile", "project"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 15,
    difficulty: "easy",
    prerequisites: ["lesson-167"],
    type: "integration"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_168 = LESSON_168;
}