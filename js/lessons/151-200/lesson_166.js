/**
 * Robot Framework Academy - Lesson 166
 * Mobile Testing 166
 */

const LESSON_166 = {
    id: 166,
    title: "Mobile Testing 166",
    duration: "7 min",
    level: "intermediate",
    section: "section-12",
    content: `
        <h2>⚡ Casos Edge Complejos</h2>
        <p>Testing de scenarios edge, interrupciones del sistema y casos complejos enterprise.</p>
        
        <h3>💻 Tests Edge Cases:</h3>
        <pre><code class="robot">*** Settings ***
Library    AppiumLibrary
Library    Collections
Library    DateTime
Library    Process
Library    OperatingSystem

*** Variables ***
\${APPIUM_SERVER}     http://localhost:4723/wd/hub
\${EDGE_APP}          com.example.edgeapp
\${DEVICE_NAME}       Android Emulator
\${TIMEOUT}           20s
\${INTERRUPTION_DELAY} 3s
\${RECOVERY_TIMEOUT}  15s
\${LOW_MEMORY_THRESHOLD} 100
\${NETWORK_LATENCY}   5000
\${BATTERY_THRESHOLD} 15

*** Test Cases ***
System Interruption Testing
    [Documentation]    Testing comportamiento con interrupciones del sistema
    [Tags]             interruptions    system    calls    notifications    edge-cases
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${EDGE_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Testing llamada telefónica entrante
    Click Element       id=start_long_operation_button
    Wait Until Page Contains Element    id=operation_in_progress
    
    Sleep               \${INTERRUPTION_DELAY}s
    
    # Simular llamada entrante
    Execute Adb Command shell am start -a android.intent.action.CALL -d tel:555-1234
    Sleep               2s
    
    # Verificar app maneja la interrupción
    \${app_state}=      Get App State    \${EDGE_APP}
    Should Be Equal As Numbers    \${app_state}    1    App debe estar en background
    
    # Rechazar llamada y volver a app
    Press Back
    Activate Application    \${EDGE_APP}
    
    # Verificar app recupera estado correctamente
    Wait Until Page Contains Element    id=operation_resumed    \${RECOVERY_TIMEOUT}
    Element Should Be Visible           id=recovery_indicator
    
    \${recovery_message}= Get Text    id=recovery_status
    Should Contain      \${recovery_message}    Resumed successfully
    
    # Testing notificación push durante operación crítica
    Click Element       id=critical_transaction_button
    Wait Until Page Contains Element    id=transaction_in_progress
    
    Sleep               \${INTERRUPTION_DELAY}s
    
    # Simular notificación push
    Execute Adb Command shell am broadcast -a com.android.test.notification --es title "Test Notification" --es text "Interrupt test"
    
    # Verificar transacción continúa sin interrupción
    Element Should Be Visible    id=transaction_in_progress
    
    Wait Until Page Contains Element    id=transaction_complete    10s
    \${transaction_result}= Get Text    id=transaction_status
    Should Be Equal     \${transaction_result}    Transaction Successful
    
    # Testing SMS entrante
    Click Element       id=sms_sensitive_operation
    Wait Until Page Contains Element    id=sms_operation_active
    
    Sleep               \${INTERRUPTION_DELAY}s
    
    # Simular SMS entrante
    Execute Adb Command shell am broadcast -a android.provider.Telephony.SMS_RECEIVED --es pdus "test_sms_data"
    
    # Verificar operación SMS-sensitive maneja interrupción
    Element Should Be Visible    id=sms_operation_paused
    Element Should Be Visible    id=resume_operation_button
    
    Click Element       id=resume_operation_button
    Wait Until Page Contains Element    id=sms_operation_completed
    
    Take Screenshot     system_interruption_testing.png
    Close Application
    
    Log    ✓ System interruption testing completado

Low Resource Conditions
    [Documentation]    Testing bajo condiciones de recursos limitados
    [Tags]             low-memory    low-battery    performance    resource-constraints
    
    \${resource_caps}=  Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${EDGE_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{resource_caps}
    
    # Testing bajo memoria disponible
    Click Element       id=memory_stress_test
    Wait Until Page Contains Element    id=memory_test_controls
    
    # Simular condición de memoria baja
    Execute Adb Command shell am send-trim-memory \${EDGE_APP} MODERATE
    Sleep               2s
    
    # Verificar app responde a trim memory
    Element Should Be Visible    id=memory_optimized_indicator
    \${memory_status}=  Get Text    id=memory_status_display
    Should Contain      \${memory_status}    Memory optimized
    
    # Testing operación intensiva con memoria limitada
    Click Element       id=memory_intensive_button
    Wait Until Page Contains Element    id=intensive_operation_started
    
    # Monitorear progreso bajo restricción de memoria
    \${memory_operation_timeout}= Set Variable    20
    FOR    \${i}    IN RANGE    \${memory_operation_timeout}
        TRY
            Element Should Be Visible    id=operation_completed
            BREAK
        EXCEPT
            \${current_memory}= Execute Javascript    mobile: getDeviceInfo
            Log    Memory status check \${i + 1}: \${current_memory}
            Sleep    1s
            
            Run Keyword If    \${i} == \${memory_operation_timeout} - 1
            ...              Fail    Memory intensive operation timed out
        END
    END
    
    # Testing batería baja
    Click Element       id=battery_dependent_feature
    Wait Until Page Contains Element    id=battery_feature_active
    
    # Simular batería baja (< 15%)
    Execute Adb Command shell dumpsys battery set level 10
    Execute Adb Command shell dumpsys battery set status 3
    
    Sleep               3s
    
    # Verificar app adapta comportamiento con batería baja
    Element Should Be Visible    id=battery_save_mode_active
    Element Should Be Visible    id=reduced_functionality_notice
    
    \${battery_message}= Get Text    id=battery_status_message
    Should Contain      \${battery_message}    Battery saver mode
    
    # Verificar funciones no esenciales están deshabilitadas
    Element Should Not Be Enabled    id=background_sync_button
    Element Should Not Be Enabled    id=location_tracking_button
    Element Should Be Enabled        id=core_functionality_button
    
    # Restaurar condiciones normales
    Execute Adb Command shell dumpsys battery reset
    Sleep               2s
    
    # Verificar app restaura funcionalidad completa
    Element Should Be Enabled    id=background_sync_button
    Element Should Be Enabled    id=location_tracking_button
    
    Take Screenshot     low_resource_conditions.png
    Close Application
    
    Log    ✓ Low resource conditions testing completado

Network Edge Cases
    [Documentation]    Testing casos edge de conectividad de red
    [Tags]             network    connectivity    offline    latency    edge-cases
    
    \${network_caps}=   Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${EDGE_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{network_caps}
    
    # Testing transición online → offline durante operación
    Click Element       id=online_operation_button
    Wait Until Page Contains Element    id=online_operation_started
    
    Sleep               2s
    
    # Deshabilitar conectividad
    Execute Adb Command shell svc wifi disable
    Execute Adb Command shell svc data disable
    
    # Verificar app detecta pérdida de conectividad
    Wait Until Page Contains Element    id=offline_mode_detected    10s
    Element Should Be Visible           id=offline_queue_indicator
    
    \${offline_message}= Get Text    id=connectivity_status
    Should Contain      \${offline_message}    Offline mode active
    
    # Testing operaciones en cola offline
    Click Element       id=queue_offline_operation
    Element Should Be Visible    id=operation_queued
    
    \${queued_count}=   Get Text    id=queued_operations_count
    \${queue_num}=      Convert To Integer    \${queued_count}
    Should Be True      \${queue_num} >= 1    Al menos 1 operación en cola
    
    # Restaurar conectividad
    Execute Adb Command shell svc wifi enable
    Execute Adb Command shell svc data enable
    
    # Verificar sincronización automática
    Wait Until Page Contains Element    id=sync_in_progress    15s
    Wait Until Page Contains Element    id=sync_completed      20s
    
    \${sync_result}=    Get Text    id=sync_status
    Should Contain      \${sync_result}    Sync successful
    
    # Testing latencia alta de red
    Click Element       id=latency_test_button
    Wait Until Page Contains Element    id=latency_test_active
    
    # Simular latencia alta (> 5 segundos)
    \${latency_start}=  Get Time    epoch
    Click Element       id=high_latency_request
    
    # Verificar app maneja timeout apropiadamente
    Wait Until Page Contains Element    id=request_timeout    15s
    \${latency_end}=    Get Time    epoch
    
    \${actual_latency}= Evaluate    \${latency_end} - \${latency_start}
    Should Be True      \${actual_latency} >= 5    Request debe timeout después de latencia alta
    
    \${timeout_message}= Get Text    id=timeout_message
    Should Contain      \${timeout_message}    Request timed out
    
    # Testing reconexión automática
    \${reconnection_attempts}= Set Variable    0
    \${max_reconnection_attempts}= Set Variable    3
    
    FOR    \${attempt}    IN RANGE    \${max_reconnection_attempts}
        \${reconnection_attempts}= Evaluate    \${reconnection_attempts} + 1
        
        Click Element       id=retry_connection_button
        
        TRY
            Wait Until Page Contains Element    id=connection_restored    8s
            Log    ✓ Reconnection successful on attempt \${attempt + 1}
            BREAK
            
        EXCEPT
            Log    Reconnection attempt \${attempt + 1} failed
            
            Run Keyword If    \${attempt} == \${max_reconnection_attempts} - 1
            ...              Log    All reconnection attempts exhausted
        END
    END
    
    Take Screenshot     network_edge_cases.png
    Close Application
    
    Log    ✓ Network edge cases completado: Latency=\${actual_latency}s, Reconnect=\${reconnection_attempts} attempts

Device Capability Edge Cases
    [Documentation]    Testing casos edge específicos del dispositivo
    [Tags]             device-capabilities    sensors    hardware    limitations
    
    \${device_caps}=    Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${EDGE_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{device_caps}
    
    # Testing sensor no disponible
    Click Element       id=sensor_dependent_feature
    Wait Until Page Contains Element    id=sensor_check_screen
    
    Click Element       id=gyroscope_test_button
    
    TRY
        Wait Until Page Contains Element    id=gyroscope_active    5s
        Log    ✓ Gyroscope available
        
    EXCEPT
        Element Should Be Visible    id=sensor_unavailable_message
        \${sensor_message}= Get Text    id=sensor_fallback_text
        Should Contain      \${sensor_message}    Gyroscope not available
        
        # Verificar app ofrece funcionalidad alternativa
        Element Should Be Visible    id=alternative_input_method
        Log    ✓ App provides fallback for missing sensor
    END
    
    # Testing cámara ocupada por otra app
    Click Element       id=camera_feature_button
    Wait Until Page Contains Element    id=camera_access_screen
    
    # Simular cámara en uso
    Start Process       am start -n com.android.camera/.Camera    shell=true
    Sleep               2s
    
    Click Element       id=access_camera_button
    
    TRY
        Wait Until Page Contains Element    id=camera_active    5s
        Log    Camera access successful
        
    EXCEPT
        Element Should Be Visible    id=camera_busy_message
        \${camera_message}= Get Text    id=camera_status_text
        Should Contain      \${camera_message}    Camera unavailable
        
        # Verificar retry mechanism
        Element Should Be Visible    id=retry_camera_button
        
        # Cerrar app de cámara y retry
        Execute Adb Command shell am force-stop com.android.camera
        Sleep               1s
        
        Click Element       id=retry_camera_button
        Wait Until Page Contains Element    id=camera_active    5s
        Log    ✓ Camera retry successful
    END
    
    # Testing storage insuficiente
    Click Element       id=storage_intensive_feature
    Wait Until Page Contains Element    id=storage_operation_screen
    
    # Verificar espacio disponible
    \${storage_info}=   Execute Adb Command shell df /data
    Log    Storage info: \${storage_info}
    
    Click Element       id=large_file_operation
    
    TRY
        Wait Until Page Contains Element    id=file_operation_complete    15s
        Log    ✓ Large file operation successful
        
    EXCEPT
        Element Should Be Visible    id=insufficient_storage_message
        \${storage_message}= Get Text    id=storage_error_text
        Should Contain      \${storage_message}    Insufficient storage
        
        # Verificar cleanup options
        Element Should Be Visible    id=cleanup_storage_button
        Element Should Be Visible    id=reduce_quality_option
    END
    
    # Testing permission revocado dinámicamente
    Click Element       id=location_feature_button
    Wait Until Page Contains Element    id=location_active
    
    Sleep               2s
    
    # Revocar permiso dinámicamente
    Execute Adb Command shell pm revoke \${EDGE_APP} android.permission.ACCESS_FINE_LOCATION
    
    # Trigger location request
    Click Element       id=get_location_button
    
    # Verificar app maneja permission revocado
    Wait Until Page Contains Element    id=permission_denied_dialog    5s
    Element Should Be Visible           id=request_permission_again_button
    
    \${permission_message}= Get Text    id=permission_error_message
    Should Contain      \${permission_message}    Location permission required
    
    Take Screenshot     device_capability_edge_cases.png
    Close Application
    
    Log    ✓ Device capability edge cases completado

Multi-App Interaction Edge Cases
    [Documentation]    Testing interacciones complejas entre múltiples apps
    [Tags]             multi-app    intents    sharing    deep-links    interactions
    
    \${multiapp_caps}=  Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${EDGE_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{multiapp_caps}
    
    # Testing sharing a app externa que no existe
    Click Element       id=share_content_button
    Wait Until Page Contains Element    id=share_dialog
    
    Click Element       id=share_to_nonexistent_app
    
    TRY
        Wait Until Page Contains Element    id=share_successful    5s
        Log    Share to external app successful
        
    EXCEPT
        Element Should Be Visible    id=share_failed_message
        \${share_error}=    Get Text    id=share_error_text
        Should Contain      \${share_error}    App not available
        
        # Verificar opciones alternativas
        Element Should Be Visible    id=alternative_share_options
        Element Should Be Visible    id=save_locally_option
    END
    
    # Testing deep link desde app externa
    Background App      5
    
    # Simular deep link desde otra app
    Execute Adb Command shell am start -W -a android.intent.action.VIEW -d "myapp://deep/link/test?param=value" \${EDGE_APP}
    
    # Verificar app maneja deep link correctamente
    Wait Until Page Contains Element    id=deep_link_handled    10s
    Element Should Be Visible           id=deep_link_parameters
    
    \${deep_link_data}= Get Text    id=deep_link_params_display
    Should Contain      \${deep_link_data}    param=value
    
    # Testing intent malformado
    Background App      2
    
    # Enviar intent con datos malformados
    Execute Adb Command shell am start -W -a android.intent.action.SEND --es android.intent.extra.TEXT "malformed\\ndata\\x00" \${EDGE_APP}
    
    # Verificar app maneja datos malformados gracefully
    Wait Until Page Contains Element    id=intent_processed    8s
    
    TRY
        Element Should Be Visible    id=malformed_data_error
        \${error_handling}= Get Text    id=error_message_display
        Should Contain      \${error_handling}    Invalid data received
        Log    ✓ App handles malformed intent data correctly
        
    EXCEPT
        Element Should Be Visible    id=data_processed_successfully
        Log    App processed malformed data without error
    END
    
    # Testing app switching rápido (task switching)
    \${switch_count}=   Set Variable    5
    
    FOR    \${i}    IN RANGE    \${switch_count}
        Background App      1
        Activate Application    \${EDGE_APP}
        Sleep               0.5s
        
        # Verificar app mantiene estado
        Element Should Be Visible    id=main_screen
        \${app_state}=      Get App State    \${EDGE_APP}
        Should Be Equal As Numbers    \${app_state}    4    App debe estar en foreground
    END
    
    # Testing memory pressure durante multi-app
    \${background_apps}= Create List
    ...    com.android.calculator2
    ...    com.android.calendar
    ...    com.android.contacts
    
    FOR    \${bg_app}    IN    @{background_apps}
        TRY
            Execute Adb Command shell am start \${bg_app}
            Sleep    1s
        EXCEPT
            Log    Background app \${bg_app} not available
        END
    END
    
    # Verificar nuestra app sigue funcionando bajo memory pressure
    Activate Application    \${EDGE_APP}
    Element Should Be Visible    id=main_screen
    
    Click Element       id=memory_test_under_pressure
    Wait Until Page Contains Element    id=pressure_test_complete    15s
    
    \${pressure_result}= Get Text    id=pressure_test_result
    Should Contain      \${pressure_result}    Test completed
    
    Take Screenshot     multi_app_interaction_edge_cases.png
    Close Application
    
    Log    ✓ Multi-app interaction edge cases completado</code></pre>
        
        <h3>🎯 Práctica Edge Cases (5 min):</h3>
        <p>1. Configura app con funcionalidades dependientes de sistema y sensores</p>
        <p>2. Prepara scenarios de interrupción (llamadas, SMS, notificaciones)</p>
        <p>3. Ejecuta "System Interruption Testing" simulando llamadas entrantes</p>
        <p>4. Prueba "Low Resource Conditions" con memoria y batería limitadas</p>
        <p>5. Implementa "Network Edge Cases" desconectando WiFi/datos dinámicamente</p>
        <p>6. Testa "Device Capability Edge Cases" con sensores no disponibles</p>
        <p>7. Valida "Multi-App Interaction" con múltiples apps ejecutándose</p>
        <p>8. Simula condiciones de memory pressure con múltiples apps background</p>
        <p>9. Practica recovery patterns cuando permisos son revocados dinámicamente</p>
        <p>10. Implementa monitoring de resource usage durante edge scenarios</p>
        <p>11. Crea test matrix para diferentes device capabilities</p>
        <p>12. Documenta edge cases específicos de tu aplicación y industry</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Testing robusto con interrupciones del sistema (llamadas, SMS)</li>
                <li>Validar comportamiento bajo condiciones de recursos limitados</li>
                <li>Manejar casos edge de conectividad y latencia de red</li>
                <li>Testing interacciones complejas multi-app y recovery patterns</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Edge cases revelan la verdadera robustez de las apps. Siempre testa recovery patterns y fallback mechanisms para scenarios reales.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 167 - Mobile Testing 167</h3>
        <p>Explorarás testing de aplicaciones móviles enterprise con compliance requirements y validation frameworks específicos.</p>
    `,
    topics: ["mobile", "appium", "android", "ios"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-165"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_166 = LESSON_166;
}