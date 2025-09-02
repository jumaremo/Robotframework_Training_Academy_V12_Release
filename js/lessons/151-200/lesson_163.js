/**
 * Robot Framework Academy - Lesson 163
 * Mobile Testing 163
 */

const LESSON_163 = {
    id: 163,
    title: "Mobile Testing 163",
    duration: "7 min",
    level: "intermediate",
    section: "section-12",
    content: `
        <h2>🔮 Tecnologías Emergentes</h2>
        <p>Testing de AR, machine learning, IoT integration y tecnologías móviles de vanguardia.</p>
        
        <h3>💻 Tests Emergentes:</h3>
        <pre><code class="robot">*** Settings ***
Library    AppiumLibrary
Library    Collections
Library    RequestsLibrary
Library    DateTime
Library    OperatingSystem
Library    Process

*** Variables ***
\${APPIUM_SERVER}     http://localhost:4723/wd/hub
\${AR_APP}            com.example.arapp
\${ML_APP}            com.example.mlapp
\${IOT_APP}           com.example.iotapp
\${BLOCKCHAIN_APP}    com.example.blockchainapp
\${DEVICE_NAME}       Android Emulator
\${TIMEOUT}           20s
\${AR_MODELS_DIR}     \${CURDIR}/ar_models
\${ML_DATASETS_DIR}   \${CURDIR}/ml_test_data
\${IOT_ENDPOINT}      https://iot-api.testserver.com

*** Test Cases ***
Augmented Reality Testing
    [Documentation]    Testing aplicaciones con realidad aumentada
    [Tags]             ar    augmented-reality    arcore    camera    3d
    
    \${ar_caps}=        Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${AR_APP}
    ...    appActivity=.ARMainActivity
    ...    automationName=UiAutomator2
    ...    autoGrantPermissions=true
    
    Open Application    \${APPIUM_SERVER}    &{ar_caps}
    
    # Verificar permisos cámara para AR
    Wait Until Page Contains Element    id=ar_camera_preview    \${TIMEOUT}
    Element Should Be Visible           id=ar_camera_preview
    
    # Testing inicialización ARCore
    Click Element       id=initialize_ar_button
    Wait Until Page Contains Element    id=ar_session_active    \${TIMEOUT}
    
    \${ar_status}=      Get Text    id=ar_session_status
    Should Be Equal     \${ar_status}    AR Session Active
    
    # Testing detección de superficies
    Click Element       id=detect_planes_button
    Wait Until Page Contains Element    id=planes_detected    15s
    
    \${planes_count}=   Get Text    id=detected_planes_count
    \${planes_num}=     Convert To Integer    \${planes_count}
    Should Be True      \${planes_num} >= 1    Debe detectar al menos 1 superficie
    
    # Testing colocación de objetos 3D
    Click Element       id=place_3d_object_button
    Wait Until Page Contains Element    id=object_placed_indicator
    
    Element Should Be Visible    id=placed_object_info
    \${object_position}= Get Text    id=object_coordinates
    Should Not Be Empty \${object_position}    Objeto debe tener coordenadas
    
    # Testing interacción con objetos AR
    \${object_location}= Get Element Location    id=ar_object_touchable
    \${x}=              Get From Dictionary    \${object_location}    x
    \${y}=              Get From Dictionary    \${object_location}    y
    
    Tap                 \${x}    \${y}
    Wait Until Page Contains Element    id=object_selected_indicator
    
    Element Text Should Be    id=selection_status    Object Selected
    
    # Testing manipulación 3D (rotate, scale)
    \${gesture_start_x}= Evaluate    \${x} - 50
    \${gesture_end_x}=   Evaluate    \${x} + 50
    
    Swipe              \${gesture_start_x}    \${y}    \${gesture_end_x}    \${y}    # Rotate
    Sleep              1s
    
    \${rotation_angle}= Get Text    id=object_rotation_angle
    Should Not Be Equal \${rotation_angle}    0    Objeto debe haber rotado
    
    # Testing oclusión y lighting
    Click Element       id=lighting_test_button
    Wait Until Page Contains Element    id=lighting_analysis
    
    \${lighting_quality}= Get Text    id=lighting_score
    \${quality_num}=    Convert To Number    \${lighting_quality}
    Should Be True      \${quality_num} > 0.5    Lighting quality > 50%
    
    # Testing performance AR
    \${fps_value}=      Get Text    id=ar_fps_counter
    \${fps_num}=        Convert To Integer    \${fps_value}
    Should Be True      \${fps_num} >= 20    AR FPS >= 20
    
    Take Screenshot     ar_testing_complete.png
    Close Application
    
    Log    ✓ AR testing completado: \${planes_num} superficies, FPS: \${fps_num}

Machine Learning Integration Testing
    [Documentation]    Testing aplicaciones con ML y AI features
    [Tags]             ml    machine-learning    ai    tensorflow    inference
    
    \${ml_caps}=        Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${ML_APP}
    ...    appActivity=.MLMainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{ml_caps}
    
    # Testing carga de modelos ML
    Click Element       id=load_model_button
    Wait Until Page Contains Element    id=model_loaded_indicator    \${TIMEOUT}
    
    \${model_status}=   Get Text    id=model_status_text
    Should Be Equal     \${model_status}    Model Loaded Successfully
    
    \${model_size}=     Get Text    id=model_size_mb
    \${size_num}=       Convert To Number    \${model_size}
    Should Be True      \${size_num} > 0    Model debe tener tamaño válido
    
    # Testing image classification
    Click Element       id=image_classification_test
    Wait Until Page Contains Element    id=classification_input
    
    Click Element       id=select_test_image_button
    Wait Until Page Contains Element    id=image_selected
    
    Click Element       id=run_inference_button
    Wait Until Page Contains Element    id=classification_results    10s
    
    \${prediction}=     Get Text    id=top_prediction
    \${confidence}=     Get Text    id=confidence_score
    
    Should Not Be Empty \${prediction}    Debe haber predicción
    \${conf_num}=       Convert To Number    \${confidence}
    Should Be True      \${conf_num} >= 0.0    Confidence >= 0%
    Should Be True      \${conf_num} <= 1.0    Confidence <= 100%
    
    # Testing real-time inference
    Click Element       id=realtime_inference_button
    Wait Until Page Contains Element    id=camera_inference_active
    
    Sleep               3s    # Tiempo para processing
    
    \${realtime_fps}=   Get Text    id=inference_fps
    \${rt_fps_num}=     Convert To Integer    \${realtime_fps}
    Should Be True      \${rt_fps_num} >= 5    Real-time FPS >= 5
    
    # Testing inference accuracy con dataset conocido
    Click Element       id=accuracy_test_button
    Wait Until Page Contains Element    id=test_dataset_loaded
    
    \${test_images}=    Get Text    id=test_images_count
    \${images_num}=     Convert To Integer    \${test_images}
    Should Be True      \${images_num} >= 10    Mínimo 10 test images
    
    Click Element       id=run_accuracy_test
    Wait Until Page Contains Element    id=accuracy_results    30s
    
    \${accuracy_score}= Get Text    id=overall_accuracy
    \${acc_num}=        Convert To Number    \${accuracy_score}
    Should Be True      \${acc_num} >= 0.7    Accuracy >= 70%
    
    # Testing memory usage durante inference
    \${memory_before}=  Execute Javascript    mobile: getDeviceInfo
    
    Click Element       id=memory_stress_test
    Wait Until Page Contains Element    id=stress_test_complete    15s
    
    \${memory_after}=   Execute Javascript    mobile: getDeviceInfo
    
    # Verificar no memory leaks significativos
    Log    Memory usage: Before=\${memory_before}, After=\${memory_after}
    
    Take Screenshot     ml_testing_complete.png
    Close Application
    
    Log    ✓ ML testing completado: Accuracy=\${acc_num}, RT-FPS=\${rt_fps_num}

IoT Device Integration Testing
    [Documentation]    Testing integración con dispositivos IoT
    [Tags]             iot    bluetooth    wifi    sensors    connectivity
    
    \${iot_caps}=       Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${IOT_APP}
    ...    appActivity=.IoTMainActivity
    ...    automationName=UiAutomator2
    ...    autoGrantPermissions=true
    
    Open Application    \${APPIUM_SERVER}    &{iot_caps}
    
    # Testing Bluetooth connectivity
    Click Element       id=bluetooth_scan_button
    Wait Until Page Contains Element    id=bluetooth_scanning    \${TIMEOUT}
    
    Sleep               5s    # Tiempo para scan
    
    \${devices_found}=  Get Element Count    xpath=//android.widget.TextView[contains(@resource-id, 'device_item')]
    Should Be True      \${devices_found} >= 1    Debe encontrar dispositivos BT
    
    # Testing conexión a device simulado
    Click Element       xpath=(//android.widget.TextView[contains(@resource-id, 'device_item')])[1]
    Wait Until Page Contains Element    id=device_connection_status
    
    \${connection_status}= Get Text    id=device_connection_status
    Should Be Equal     \${connection_status}    Connected
    
    # Testing envío de comandos IoT
    \${iot_commands}=   Create List
    ...    {"command": "turn_on", "device": "light_1"}
    ...    {"command": "set_temperature", "device": "thermostat", "value": 22}
    ...    {"command": "get_status", "device": "sensor_1"}
    
    FOR    \${command}    IN    @{iot_commands}
        \${cmd_json}=       Evaluate    json.loads('''\${command}''')    json
        \${cmd_type}=       Get From Dictionary    \${cmd_json}    command
        \${device_name}=    Get From Dictionary    \${cmd_json}    device
        
        Click Element       id=send_command_button
        Wait Until Page Contains Element    id=command_input_field
        
        Clear Text          id=command_input_field
        Input Text          id=command_input_field    \${command}
        Click Element       id=execute_command_button
        
        Wait Until Page Contains Element    id=command_response    5s
        \${response}=       Get Text    id=command_response
        Should Contain      \${response}    success    Comando debe ejecutarse
        
        Log    ✓ IoT command executed: \${cmd_type} on \${device_name}
    END
    
    # Testing sensor data streaming
    Click Element       id=start_sensor_stream
    Wait Until Page Contains Element    id=sensor_data_streaming
    
    Sleep               3s    # Tiempo para recibir datos
    
    \${sensor_readings}= Get Element Count    xpath=//android.widget.TextView[contains(@resource-id, 'sensor_reading')]
    Should Be True      \${sensor_readings} >= 3    Mínimo 3 readings
    
    FOR    \${i}    IN RANGE    3
        \${reading_element}= Set Variable    xpath=(//android.widget.TextView[contains(@resource-id, 'sensor_reading')])[\${i + 1}]
        \${reading_value}=  Get Text    \${reading_element}
        Should Match Regexp \${reading_value}    \\d+\\.\\d+    Valor numérico válido
    END
    
    # Testing disconnection y reconnection
    Click Element       id=disconnect_device_button
    Wait Until Page Contains Element    id=device_disconnected
    
    \${disc_status}=    Get Text    id=device_connection_status
    Should Be Equal     \${disc_status}    Disconnected
    
    Click Element       id=reconnect_device_button
    Wait Until Page Contains Element    id=device_connected    10s
    
    Take Screenshot     iot_testing_complete.png
    Close Application
    
    Log    ✓ IoT testing completado: \${devices_found} devices, \${sensor_readings} readings

Blockchain Integration Testing
    [Documentation]    Testing aplicaciones con blockchain y crypto features
    [Tags]             blockchain    crypto    wallet    transactions    web3
    
    \${blockchain_caps}= Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${BLOCKCHAIN_APP}
    ...    appActivity=.BlockchainMainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{blockchain_caps}
    
    # Testing wallet creation
    Click Element       id=create_wallet_button
    Wait Until Page Contains Element    id=wallet_setup_screen
    
    Input Text          id=wallet_name_field    Test Wallet
    Input Password      id=wallet_password_field    testpass123
    Input Password      id=confirm_password_field   testpass123
    
    Click Element       id=generate_wallet_button
    Wait Until Page Contains Element    id=wallet_created_success    \${TIMEOUT}
    
    # Verificar seed phrase generada
    \${seed_phrase}=    Get Text    id=seed_phrase_display
    \${seed_words}=     Split String    \${seed_phrase}    \${SPACE}
    \${word_count}=     Get Length    \${seed_words}
    Should Be Equal As Numbers    \${word_count}    12    Seed phrase debe tener 12 palabras
    
    Click Element       id=confirm_seed_saved
    
    # Testing wallet address generation
    Wait Until Page Contains Element    id=wallet_dashboard
    \${wallet_address}= Get Text    id=wallet_address_display
    Should Match Regexp \${wallet_address}    ^0x[a-fA-F0-9]{40}$    Dirección ETH válida
    
    # Testing balance checking
    Click Element       id=refresh_balance_button
    Wait Until Page Contains Element    id=balance_updated
    
    \${balance}=        Get Text    id=wallet_balance
    Should Match Regexp \${balance}    \\d+\\.\\d+    Balance numérico
    
    # Testing transaction simulation
    Click Element       id=send_transaction_button
    Wait Until Page Contains Element    id=transaction_form
    
    Input Text          id=recipient_address    0x742d35Cc6635C0532925a3b8D24d3b6a6a8c4e2e
    Input Text          id=amount_field         0.001
    Input Text          id=gas_price_field      20
    
    Click Element       id=estimate_gas_button
    Wait Until Page Contains Element    id=gas_estimate_result
    
    \${gas_estimate}=   Get Text    id=estimated_gas
    \${gas_num}=        Convert To Integer    \${gas_estimate}
    Should Be True      \${gas_num} >= 21000    Gas estimate >= 21000
    
    # Testing transaction signing (simulado)
    Click Element       id=sign_transaction_button
    Wait Until Page Contains Element    id=transaction_signed
    
    \${tx_hash}=        Get Text    id=transaction_hash
    Should Match Regexp \${tx_hash}    ^0x[a-fA-F0-9]{64}$    TX hash válido
    
    # Testing smart contract interaction
    Click Element       id=smart_contracts_tab
    Wait Until Page Contains Element    id=contracts_list
    
    Click Element       id=test_contract_item
    Wait Until Page Contains Element    id=contract_interface
    
    # Testing contract function call
    Click Element       id=contract_function_button
    Wait Until Page Contains Element    id=function_parameters
    
    Input Text          id=function_param_1    42
    Click Element       id=call_function_button
    
    Wait Until Page Contains Element    id=function_result    10s
    \${function_output}= Get Text    id=function_result
    Should Not Be Empty \${function_output}    Function debe retornar resultado
    
    # Testing transaction history
    Click Element       id=transaction_history_tab
    Wait Until Page Contains Element    id=history_list
    
    \${tx_count}=       Get Element Count    xpath=//android.widget.LinearLayout[contains(@resource-id, 'history_item')]
    Should Be True      \${tx_count} >= 1    Debe haber al menos 1 transacción
    
    Take Screenshot     blockchain_testing_complete.png
    Close Application
    
    Log    ✓ Blockchain testing completado: Wallet=\${wallet_address}, TX=\${tx_hash}

Edge Computing Performance Testing
    [Documentation]    Testing performance en edge computing y offline ML
    [Tags]             edge-computing    offline    performance    latency    bandwidth
    
    \${edge_caps}=      Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${ML_APP}
    ...    appActivity=.EdgeComputingActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{edge_caps}
    
    # Testing offline model performance
    Execute Adb Command shell svc wifi disable
    Execute Adb Command shell svc data disable
    Sleep               2s
    
    Click Element       id=offline_mode_test
    Wait Until Page Contains Element    id=offline_processing_active
    
    \${offline_start}=  Get Time    epoch
    Click Element       id=run_offline_inference
    Wait Until Page Contains Element    id=offline_result_ready    15s
    \${offline_end}=    Get Time    epoch
    
    \${offline_duration}= Evaluate    \${offline_end} - \${offline_start}
    Should Be True      \${offline_duration} < 10    Offline inference < 10s
    
    \${offline_result}= Get Text    id=offline_inference_result
    Should Not Be Empty \${offline_result}    Offline inference debe funcionar
    
    # Testing edge caching
    \${cache_size}=     Get Text    id=model_cache_size
    \${cache_num}=      Convert To Number    \${cache_size}
    Should Be True      \${cache_num} > 0    Cache debe tener contenido
    
    # Restaurar conectividad
    Execute Adb Command shell svc wifi enable
    Execute Adb Command shell svc data enable
    Sleep               3s
    
    # Testing hybrid edge/cloud processing
    Click Element       id=hybrid_processing_test
    Wait Until Page Contains Element    id=hybrid_mode_active
    
    \${hybrid_start}=   Get Time    epoch
    Click Element       id=run_hybrid_inference
    Wait Until Page Contains Element    id=hybrid_result_ready    20s
    \${hybrid_end}=     Get Time    epoch
    
    \${hybrid_duration}= Evaluate    \${hybrid_end} - \${hybrid_start}
    
    # Comparar performance offline vs hybrid
    \${performance_improvement}= Evaluate    (\${offline_duration} - \${hybrid_duration}) / \${offline_duration} * 100
    
    Log    Performance comparison: Offline=\${offline_duration}s, Hybrid=\${hybrid_duration}s, Improvement=\${performance_improvement}%
    
    # Testing bandwidth optimization
    Click Element       id=bandwidth_optimization_test
    Wait Until Page Contains Element    id=bandwidth_test_results
    
    \${data_usage}=     Get Text    id=data_usage_mb
    \${data_num}=       Convert To Number    \${data_usage}
    Should Be True      \${data_num} < 10    Data usage < 10MB
    
    # Testing latency measurements
    \${latency_measurements}= Get Elements    xpath=//android.widget.TextView[contains(@resource-id, 'latency_measurement')]
    
    FOR    \${measurement}    IN    @{latency_measurements}
        \${latency_value}=  Get Text    \${measurement}
        \${latency_num}=    Convert To Number    \${latency_value}
        Should Be True      \${latency_num} < 500    Latencia < 500ms
    END
    
    Take Screenshot     edge_computing_testing.png
    Close Application
    
    Log    ✓ Edge computing testing completado: Offline=\${offline_duration}s, Data=\${data_num}MB</code></pre>
        
        <h3>🎯 Práctica Emergentes (5 min):</h3>
        <p>1. Configura ARCore en emulador Android para testing de realidad aumentada</p>
        <p>2. Descarga modelo TensorFlow Lite para "Machine Learning Integration Testing"</p>
        <p>3. Ejecuta "Augmented Reality Testing" verificando detección de superficies</p>
        <p>4. Configura dispositivos Bluetooth simulados para "IoT Device Integration"</p>
        <p>5. Prueba "Machine Learning Integration Testing" con dataset de imágenes</p>
        <p>6. Implementa "Blockchain Integration Testing" con testnet Ethereum</p>
        <p>7. Experimenta con "Edge Computing Performance Testing" offline vs cloud</p>
        <p>8. Monitorea performance y memoria durante inference ML intensivo</p>
        <p>9. Valida accuracy de modelos ML bajo diferentes condiciones device</p>
        <p>10. Testa conectividad IoT con retry logic para connections intermitentes</p>
        <p>11. Implementa testing de smart contracts con Web3 integration</p>
        <p>12. Documenta best practices para testing de tecnologías emergentes</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar testing de aplicaciones con realidad aumentada (ARCore)</li>
                <li>Validar integración de machine learning e inference performance</li>
                <li>Testing de conectividad IoT y streaming de sensor data</li>
                <li>Verificar funcionalidad blockchain, wallets y smart contracts</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Tecnologías emergentes requieren setup específico y emuladores avanzados. Usa device farms con hardware especializado para testing AR/ML real.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 164 - Mobile Testing 164</h3>
        <p>Dominarás testing de seguridad móvil, penetration testing, y validación de vulnerabilidades específicas mobile.</p>
    `,
    topics: ["mobile", "appium", "android", "ios"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-162"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_163 = LESSON_163;
}