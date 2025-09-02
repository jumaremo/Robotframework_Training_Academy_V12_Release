/**
 * Robot Framework Academy - Lesson 161
 * Mobile Testing 161
 */

const LESSON_161 = {
    id: 161,
    title: "Mobile Testing 161",
    duration: "7 min",
    level: "intermediate",
    section: "section-12",
    content: `
        <h2>🏭 CI/CD Mobile Automation</h2>
        <p>Device farms, testing paralelo en múltiples devices y pipelines CI/CD móviles.</p>
        
        <h3>💻 Tests CI/CD:</h3>
        <pre><code class="robot">*** Settings ***
Library    AppiumLibrary
Library    Collections
Library    Process
Library    RequestsLibrary
Library    DateTime
Library    OperatingSystem

*** Variables ***
\${DEVICE_FARM_URL}   https://api.saucelabs.com/rest/v1
\${BROWSERSTACK_URL}  https://hub-cloud.browserstack.com/wd/hub
\${APPIUM_GRID_URL}   http://selenium-grid:4444/wd/hub
\${APP_APK}           \${CURDIR}/builds/mobile-app.apk
\${TEST_RESULTS_DIR}  \${CURDIR}/mobile_results
\${PARALLEL_DEVICES}  4
\${BUILD_NUMBER}      \${EMPTY}
\${DEVICE_MATRIX}     \${EMPTY}

*** Test Cases ***
Multi-Device Parallel Setup
    [Documentation]    Configuración para testing paralelo en múltiples devices
    [Tags]             parallel    multi-device    setup    grid
    
    \${build_id}=       Get Current Date    result_format=%Y%m%d_%H%M%S
    Set Global Variable \${BUILD_NUMBER}    build_\${build_id}
    
    # Configurar matriz de devices
    \${device_list}=    Create List
    ...    {"platformName": "Android", "platformVersion": "11.0", "deviceName": "Samsung Galaxy S21"}
    ...    {"platformName": "Android", "platformVersion": "12.0", "deviceName": "Google Pixel 6"}
    ...    {"platformName": "Android", "platformVersion": "10.0", "deviceName": "OnePlus 8"}
    ...    {"platformName": "iOS", "platformVersion": "15.0", "deviceName": "iPhone 13"}
    
    Set Global Variable \${DEVICE_MATRIX}    \${device_list}
    
    # Crear directorios para resultados
    Create Directory    \${TEST_RESULTS_DIR}/\${BUILD_NUMBER}
    
    FOR    \${index}    \${device}    IN ENUMERATE    @{device_list}
        \${device_dir}=  Set Variable    \${TEST_RESULTS_DIR}/\${BUILD_NUMBER}/device_\${index}
        Create Directory \${device_dir}
        
        \${device_info}=  Evaluate    json.loads('''\${device}''')    json
        \${platform}=     Get From Dictionary    \${device_info}    platformName
        \${version}=      Get From Dictionary    \${device_info}    platformVersion
        \${device_name}=  Get From Dictionary    \${device_info}    deviceName
        
        Log    ✓ Device \${index}: \${platform} \${version} - \${device_name}
    END
    
    # Verificar conectividad grid
    Create Session      appium_grid    \${APPIUM_GRID_URL}
    TRY
        \${grid_status}=    GET On Session    appium_grid    /status
        Status Should Be    200    \${grid_status}
        Log    ✓ Appium Grid conectado
    EXCEPT
        Log    ⚠️ Appium Grid no disponible, usando devices locales
    END
    
    Log    ✓ Multi-device setup completado: \${BUILD_NUMBER}

Device Farm Integration Testing
    [Documentation]    Integración con device farms cloud (SauceLabs, BrowserStack)
    [Tags]             device-farm    cloud    sauce-labs    browserstack
    
    # SauceLabs configuration
    \${sauce_caps}=     Create Dictionary
    ...    platformName=Android
    ...    platformVersion=11.0
    ...    deviceName=Samsung Galaxy S21 FE 5G
    ...    automationName=UiAutomator2
    ...    app=sauce-storage:mobile-app.apk
    ...    build=\${BUILD_NUMBER}
    ...    name=Mobile CI/CD Test
    ...    tags=["ci", "mobile", "automated"]
    
    TRY
        Open Application    \${DEVICE_FARM_URL}    &{sauce_caps}
        
        # Test básico en device farm
        Wait Until Page Contains Element    id=welcome_screen    20s
        Element Should Be Visible           id=app_logo
        
        Click Element       id=login_button
        Wait Until Page Contains Element    id=login_form
        
        Input Text          id=username_field    sauce_user
        Input Password      id=password_field    sauce_pass
        Click Element       id=submit_login
        
        Wait Until Page Contains Element    id=dashboard
        Element Should Be Visible           id=user_profile
        
        # Capturar info del device farm
        \${session_id}=     Get Current Context
        \${device_info}=    Execute Javascript    mobile: deviceInfo
        
        Log    ✓ SauceLabs device info: \${device_info}
        
        Take Screenshot     \${TEST_RESULTS_DIR}/\${BUILD_NUMBER}/saucelabs_test.png
        Close Application
        
        Log    ✓ SauceLabs testing completado
        
    EXCEPT
        Log    SauceLabs no disponible o credenciales incorrectas
    END
    
    # BrowserStack configuration
    \${bs_caps}=        Create Dictionary
    ...    platformName=Android
    ...    platformVersion=12.0
    ...    deviceName=Google Pixel 6
    ...    automationName=UiAutomator2
    ...    app=bs://mobile-app-id
    ...    build=\${BUILD_NUMBER}
    ...    project=Mobile Testing CI/CD
    
    TRY
        Open Application    \${BROWSERSTACK_URL}    &{bs_caps}
        
        # Test rápido BrowserStack
        Wait Until Page Contains Element    id=main_screen
        Element Should Be Visible           id=navigation_menu
        
        Click Element       id=features_button
        Wait Until Page Contains Element    id=features_list
        
        \${features_count}= Get Element Count    xpath=//android.widget.TextView[contains(@resource-id, 'feature_item')]
        Should Be True      \${features_count} > 0
        
        Take Screenshot     \${TEST_RESULTS_DIR}/\${BUILD_NUMBER}/browserstack_test.png
        Close Application
        
        Log    ✓ BrowserStack testing completado
        
    EXCEPT
        Log    BrowserStack no disponible o configuración incorrecta
    END

Parallel Test Execution
    [Documentation]    Ejecución paralela en múltiples devices simultáneamente
    [Tags]             parallel    execution    performance    scaling
    
    \${process_handles}= Create List
    \${device_results}= Create List
    
    FOR    \${index}    \${device}    IN ENUMERATE    @{DEVICE_MATRIX}
        \${device_config}=  Evaluate    json.loads('''\${device}''')    json
        \${platform}=       Get From Dictionary    \${device_config}    platformName
        \${version}=        Get From Dictionary    \${device_config}    platformVersion
        \${device_name}=    Get From Dictionary    \${device_config}    deviceName
        
        # Configurar capabilities específicas por device
        \${caps}=           Create Dictionary
        ...    platformName=\${platform}
        ...    platformVersion=\${version}
        ...    deviceName=\${device_name}
        ...    automationName=UiAutomator2
        ...    app=\${APP_APK}
        ...    newCommandTimeout=300
        ...    deviceReadyTimeout=60
        
        # Ejecutar test en proceso separado
        \${device_process}= Start Process    robot
        ...    --variable    DEVICE_INDEX:\${index}
        ...    --variable    DEVICE_CAPS:\${caps}
        ...    --variable    BUILD_ID:\${BUILD_NUMBER}
        ...    --outputdir   \${TEST_RESULTS_DIR}/\${BUILD_NUMBER}/device_\${index}
        ...    --test        Device Specific Test Suite
        ...    \${CURDIR}/device_tests.robot
        
        Append To List      \${process_handles}    \${device_process}
        
        Log    ✓ Device \${index} proceso iniciado: \${platform} \${version}
    END
    
    # Esperar todos los procesos paralelos
    \${start_time}=     Get Time    epoch
    
    FOR    \${index}    \${handle}    IN ENUMERATE    @{process_handles}
        \${result}=         Wait For Process    \${handle}    timeout=300s
        
        \${device_result}=  Create Dictionary
        ...    device_index=\${index}
        ...    return_code=\${result.rc}
        ...    stdout=\${result.stdout}
        ...    stderr=\${result.stderr}
        
        Append To List      \${device_results}    \${device_result}
        
        \${status}=         Set Variable If    \${result.rc} == 0    PASS    FAIL
        Log    ✓ Device \${index}: \${status} (RC: \${result.rc})
    END
    
    \${end_time}=       Get Time    epoch
    \${total_duration}= Evaluate    \${end_time} - \${start_time}
    
    # Análisis de resultados paralelos
    \${passed_devices}= Set Variable    0
    \${failed_devices}= Set Variable    0
    
    FOR    \${result}    IN    @{device_results}
        \${rc}=             Get From Dictionary    \${result}    return_code
        Run Keyword If      \${rc} == 0
        ...                Evaluate    \${passed_devices} + 1
        ...    ELSE         Evaluate    \${failed_devices} + 1
    END
    
    \${success_rate}=   Evaluate    (\${passed_devices} / len(\${device_results})) * 100
    
    Should Be True      \${success_rate} >= 75    Success rate >= 75%
    Log    ✓ Parallel execution: \${total_duration}s, Success: \${success_rate}%

CI/CD Pipeline Integration
    [Documentation]    Integración completa con pipeline CI/CD
    [Tags]             cicd    jenkins    github-actions    pipeline
    
    # Configurar build metadata
    \${build_metadata}= Create Dictionary
    ...    build_number=\${BUILD_NUMBER}
    ...    commit_hash=\${GITHUB_SHA}
    ...    branch=\${GITHUB_REF}
    ...    trigger=automated
    ...    timestamp=\${datetime.now().isoformat()}
    
    # Pre-build validation
    File Should Exist   \${APP_APK}    APK debe existir para testing
    
    \${apk_size}=       Get File Size    \${APP_APK}
    Should Be True      \${apk_size} > 1000000    APK size > 1MB
    Should Be True      \${apk_size} < 100000000    APK size < 100MB
    
    # Upload APK a storage para device farm
    Create Session      artifact_storage    https://api.storage.com
    
    TRY
        \${upload_data}=    Create Dictionary
        ...    file_path=\${APP_APK}
        ...    build_id=\${BUILD_NUMBER}
        ...    platform=android
        
        \${upload_response}= POST On Session    artifact_storage    /upload
        ...    json=\${upload_data}    expected_status=200
        
        \${app_url}=        Get From Dictionary    \${upload_response.json()}    download_url
        Set Global Variable \${UPLOADED_APP_URL}    \${app_url}
        
        Log    ✓ APK uploaded: \${app_url}
        
    EXCEPT
        Log    Upload falló, usando APK local
        Set Global Variable \${UPLOADED_APP_URL}    \${APP_APK}
    END
    
    # Ejecutar test suite principal
    \${test_start}=     Get Time    epoch
    
    \${main_caps}=      Create Dictionary
    ...    platformName=Android
    ...    platformVersion=11.0
    ...    deviceName=Android Emulator
    ...    automationName=UiAutomator2
    ...    app=\${UPLOADED_APP_URL}
    
    Open Application    \${APPIUM_GRID_URL}    &{main_caps}
    
    # Smoke tests críticos para CI/CD
    Wait Until Page Contains Element    id=app_launch_screen    30s
    Element Should Be Visible           id=main_navigation
    
    Click Element       id=core_features_tab
    Wait Until Page Contains Element    id=features_loaded
    
    \${core_features}=  Get Element Count    xpath=//android.widget.Button[contains(@resource-id, 'feature_btn')]
    Should Be True      \${core_features} >= 3    Mínimo 3 features core
    
    # Test flujo crítico para deployment
    Click Element       id=critical_flow_button
    Wait Until Page Contains Element    id=flow_step_1
    
    Input Text          id=required_input    CI/CD Test Data
    Click Element       id=next_step_button
    
    Wait Until Page Contains Element    id=flow_step_2
    Click Element                       id=confirm_action
    
    Wait Until Page Contains Element    id=success_confirmation
    Element Should Contain Text         id=success_message    Action completed
    
    \${test_end}=       Get Time    epoch
    \${test_duration}=  Evaluate    \${test_end} - \${test_start}
    
    Take Screenshot     \${TEST_RESULTS_DIR}/\${BUILD_NUMBER}/cicd_smoke_test.png
    Close Application
    
    # Generar reporte CI/CD
    \${test_report}=    Create Dictionary
    ...    build_metadata=\${build_metadata}
    ...    test_duration=\${test_duration}
    ...    smoke_tests_passed=true
    ...    critical_flow_validated=true
    ...    deployment_ready=true
    
    \${report_json}=    Convert To JSON    \${test_report}
    Create File         \${TEST_RESULTS_DIR}/\${BUILD_NUMBER}/cicd_report.json    \${report_json}
    
    Should Be True      \${test_duration} < 180    CI/CD tests < 3 min
    Log    ✓ CI/CD pipeline tests completados: \${test_duration}s

Performance Monitoring CI/CD
    [Documentation]    Monitoreo de performance en pipeline CI/CD
    [Tags]             performance    monitoring    metrics    alerts
    
    \${perf_caps}=      Create Dictionary
    ...    platformName=Android
    ...    platformVersion=11.0
    ...    deviceName=Android Emulator
    ...    automationName=UiAutomator2
    ...    app=\${UPLOADED_APP_URL}
    
    \${perf_start}=     Get Time    epoch
    Open Application    \${APPIUM_GRID_URL}    &{perf_caps}
    \${launch_time}=    Get Time    epoch
    
    \${app_launch_duration}= Evaluate    \${launch_time} - \${perf_start}
    Should Be True      \${app_launch_duration} < 15    App launch < 15s
    
    # Performance benchmarks
    \${screen_start}=   Get Time    epoch
    Click Element       id=heavy_screen_button
    Wait Until Page Contains Element    id=heavy_content_loaded
    \${screen_end}=     Get Time    epoch
    
    \${screen_load_time}= Evaluate    \${screen_end} - \${screen_start}
    Should Be True      \${screen_load_time} < 8    Heavy screen < 8s
    
    # Memory usage tracking
    TRY
        \${memory_info}=    Execute Javascript    mobile: getDeviceInfo
        \${memory_usage}=   Get From Dictionary    \${memory_info}    memoryUsage
        Should Be True      \${memory_usage} < 500    Memory < 500MB
        
    EXCEPT
        Log    Memory info no disponible en este device
    END
    
    # Network performance
    \${network_start}=  Get Time    epoch
    Click Element       id=api_test_button
    Wait Until Page Contains Element    id=api_response_received
    \${network_end}=    Get Time    epoch
    
    \${api_response_time}= Evaluate    \${network_end} - \${network_start}
    Should Be True      \${api_response_time} < 5    API response < 5s
    
    # Generar métricas performance
    \${performance_metrics}= Create Dictionary
    ...    app_launch_time=\${app_launch_duration}
    ...    screen_load_time=\${screen_load_time}
    ...    api_response_time=\${api_response_time}
    ...    build_number=\${BUILD_NUMBER}
    ...    device_type=emulator
    
    \${metrics_json}=   Convert To JSON    \${performance_metrics}
    Create File         \${TEST_RESULTS_DIR}/\${BUILD_NUMBER}/performance_metrics.json    \${metrics_json}
    
    # Alertas de regresión
    Run Keyword If      \${app_launch_duration} > 12
    ...                Log    ⚠️ ALERT: App launch time regression detected
    
    Run Keyword If      \${screen_load_time} > 6
    ...                Log    ⚠️ ALERT: Screen load time regression detected
    
    Take Screenshot     \${TEST_RESULTS_DIR}/\${BUILD_NUMBER}/performance_final.png
    Close Application
    
    Log    ✓ Performance monitoring: Launch=\${app_launch_duration}s, Screen=\${screen_load_time}s, API=\${api_response_time}s</code></pre>
        
        <h3>🎯 Práctica CI/CD (5 min):</h3>
        <p>1. Configura Appium Grid con Docker para testing distribuido</p>
        <p>2. Crea device_tests.robot con test suite para ejecución paralela</p>
        <p>3. Ejecuta "Multi-Device Parallel Setup" con 4 devices configurados</p>
        <p>4. Configura SauceLabs o BrowserStack account para device farm testing</p>
        <p>5. Prueba "Device Farm Integration Testing" con credenciales válidas</p>
        <p>6. Implementa "Parallel Test Execution" monitoreando resource usage</p>
        <p>7. Integra "CI/CD Pipeline Integration" con GitHub Actions/Jenkins</p>
        <p>8. Configura "Performance Monitoring CI/CD" con alertas automáticas</p>
        <p>9. Crea dashboard para visualizar resultados de múltiples devices</p>
        <p>10. Implementa retry logic para tests que fallan por issues de red</p>
        <p>11. Configura notificaciones automáticas para build failures</p>
        <p>12. Documenta best practices para mobile CI/CD en tu organización</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Configurar testing paralelo en múltiples devices simultáneamente</li>
                <li>Integrar device farms cloud (SauceLabs, BrowserStack) en CI/CD</li>
                <li>Implementar pipelines móviles con performance monitoring</li>
                <li>Generar reportes automáticos y alertas de regresión</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Appium Grid para scaling local y device farms para testing cross-platform. Siempre incluye smoke tests críticos en CI/CD.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 162 - Mobile Testing 162</h3>
        <p>Aprenderás técnicas avanzadas de mobile testing: accessibility, internationalization, y testing de aplicaciones con realidad aumentada.</p>
    `,
    topics: ["mobile", "appium", "android", "ios"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-160"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_161 = LESSON_161;
}