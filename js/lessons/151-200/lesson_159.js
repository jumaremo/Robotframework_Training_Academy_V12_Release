/**
 * Robot Framework Academy - Lesson 159
 * Mobile Testing 159
 */

const LESSON_159 = {
    id: 159,
    title: "Mobile Testing 159",
    duration: "7 min",
    level: "intermediate",
    section: "section-12",
    content: `
        <h2>🔔 Notificaciones y Servicios</h2>
        <p>Testing de push notifications, deep links, y servicios nativos móviles.</p>
        
        <h3>💻 Tests Servicios:</h3>
        <pre><code class="robot">*** Settings ***
Library    AppiumLibrary
Library    Collections
Library    DateTime
Library    RequestsLibrary
Library    Process

*** Variables ***
\${APPIUM_SERVER}     http://localhost:4723/wd/hub
\${NOTIFICATION_APP}  com.example.notificationapp
\${DEEP_LINK_SCHEME}  myapp://
\${PUSH_API}          https://api.pushservice.com
\${DEVICE_TOKEN}      \${EMPTY}
\${NOTIFICATION_ID}   \${EMPTY}
\${TIMEOUT}           15s
\${ADB_COMMAND}       adb

*** Test Cases ***
Push Notification Testing
    [Documentation]    Testing de notificaciones push end-to-end
    [Tags]             notifications    push    mobile    messaging
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=\${NOTIFICATION_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    ...    autoGrantPermissions=true
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Configurar notificaciones
    Click Element       id=settings_button
    Wait Until Page Contains Element    id=notifications_toggle
    
    \${notifications_enabled}= Get Element Attribute    id=notifications_toggle    checked
    Run Keyword If      '\${notifications_enabled}' != 'true'
    ...                Click Element    id=notifications_toggle
    
    # Obtener device token
    Click Element       id=get_token_button
    Wait Until Page Contains Element    id=device_token_text
    \${device_token}=   Get Text    id=device_token_text
    Set Global Variable \${DEVICE_TOKEN}    \${device_token}
    
    Should Not Be Empty \${device_token}    Device token debe estar disponible
    Should Match Regexp \${device_token}    ^[a-fA-F0-9]{64}$    Token format válido
    
    # Enviar notificación via API
    Create Session      push_api    \${PUSH_API}
    \${notification_payload}= Create Dictionary
    ...    to=\${device_token}
    ...    title=Test Notification
    ...    body=This is a test push notification
    ...    data={"test_id": "notify_001", "action": "open_screen"}
    
    \${response}=       POST On Session    push_api    /send
    ...    json=\${notification_payload}    expected_status=200
    
    \${notification_id}= Get From Dictionary    \${response.json()}    notification_id
    Set Global Variable \${NOTIFICATION_ID}    \${notification_id}
    
    # Minimizar app para recibir notificación
    Background App      5
    
    # Verificar notificación en panel
    Open Notifications
    Wait Until Page Contains Element    xpath=//android.widget.TextView[@text='Test Notification']
    Element Should Be Visible           xpath=//android.widget.TextView[@text='This is a test push notification']
    
    # Tap en notificación
    Click Element       xpath=//android.widget.TextView[@text='Test Notification']
    
    # Verificar app se abre con deep link
    Wait Until Page Contains Element    id=notification_data_screen
    Element Text Should Be              id=notification_title    Test Notification
    Element Should Contain Text         id=notification_body     test push notification
    
    Take Screenshot     push_notification_received.png
    Close Application
    
    Log    ✓ Push notification testing completado: \${notification_id}

Deep Link Navigation Testing
    [Documentation]    Testing de deep links y navegación específica
    [Tags]             deep-links    navigation    url-schemes    intents
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=\${NOTIFICATION_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    # Test deep link directo
    \${deep_link_url}=  Set Variable    \${DEEP_LINK_SCHEME}profile/user123
    
    Execute Adb Command shell am start -W -a android.intent.action.VIEW -d "\${deep_link_url}" \${NOTIFICATION_APP}
    
    # Verificar app abre en pantalla correcta
    Open Application    \${APPIUM_SERVER}    &{caps}
    Wait Until Page Contains Element    id=profile_screen
    
    Element Should Be Visible    id=user_profile_title
    Element Text Should Be       id=user_id_display    user123
    Element Should Be Visible    id=profile_avatar
    Element Should Be Visible    id=profile_details
    
    # Test deep link con parámetros
    \${product_link}=   Set Variable    \${DEEP_LINK_SCHEME}product/456?category=electronics&promo=sale
    
    Background App      1
    Execute Adb Command shell am start -W -a android.intent.action.VIEW -d "\${product_link}" \${NOTIFICATION_APP}
    
    Wait Until Page Contains Element    id=product_screen
    Element Text Should Be              id=product_id_display      456
    Element Text Should Be              id=product_category_display electronics
    Element Should Be Visible           id=promo_banner
    
    # Test deep link inválido
    \${invalid_link}=   Set Variable    \${DEEP_LINK_SCHEME}invalid/nonexistent
    
    Background App      1
    Execute Adb Command shell am start -W -a android.intent.action.VIEW -d "\${invalid_link}" \${NOTIFICATION_APP}
    
    Wait Until Page Contains Element    id=error_screen
    Element Should Contain Text         id=error_message    Page not found
    Element Should Be Visible           id=home_button
    
    Click Element       id=home_button
    Wait Until Page Contains Element    id=main_screen
    
    Take Screenshot     deep_link_navigation.png
    Close Application
    
    Log    ✓ Deep link navigation testing completado

Native Services Integration
    [Documentation]    Testing integración con servicios nativos
    [Tags]             native-services    camera    location    contacts
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=\${NOTIFICATION_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    ...    autoGrantPermissions=true
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Test cámara integration
    Click Element       id=camera_button
    Wait Until Page Contains Element    id=camera_preview
    
    Element Should Be Visible    id=capture_button
    Element Should Be Visible    id=camera_switch_button
    Element Should Be Visible    id=flash_toggle
    
    Click Element       id=capture_button
    Wait Until Page Contains Element    id=photo_preview
    
    Element Should Be Visible    id=photo_image
    Element Should Be Visible    id=save_photo_button
    Element Should Be Visible    id=retake_button
    
    Click Element       id=save_photo_button
    Wait Until Page Contains Element    id=photo_saved_message
    
    # Test location services
    Click Element       id=location_button
    Wait Until Page Contains Element    id=location_screen
    
    Click Element       id=get_location_button
    Wait Until Page Contains Element    id=location_data    \${TIMEOUT}
    
    \${latitude}=       Get Text    id=latitude_value
    \${longitude}=      Get Text    id=longitude_value
    
    Should Match Regexp \${latitude}     ^-?\\d+\\.\\d+$    Latitude válida
    Should Match Regexp \${longitude}    ^-?\\d+\\.\\d+$    Longitude válida
    
    Element Should Be Visible    id=address_display
    \${address}=        Get Text    id=address_display
    Should Not Be Empty \${address}    Address debe estar disponible
    
    # Test contacts access
    Click Element       id=contacts_button
    Wait Until Page Contains Element    id=contacts_list
    
    Click Element       id=load_contacts_button
    Wait Until Page Contains Element    id=contacts_loaded    \${TIMEOUT}
    
    \${contacts_count}= Get Element Count    xpath=//android.widget.TextView[contains(@resource-id, 'contact_name')]
    Should Be True      \${contacts_count} >= 0    Contacts cargados
    
    # Test contact selection
    Run Keyword If      \${contacts_count} > 0
    ...                Click Element    xpath=(//android.widget.TextView[contains(@resource-id, 'contact_name')])[1]
    
    Run Keyword If      \${contacts_count} > 0
    ...                Wait Until Page Contains Element    id=contact_details
    
    Take Screenshot     native_services_integration.png
    Close Application
    
    Log    ✓ Native services integration completado

App State Management Testing
    [Documentation]    Testing estados de app: background, foreground, kill
    [Tags]             app-state    lifecycle    background    foreground
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=\${NOTIFICATION_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Estado inicial - foreground
    \${initial_state}=  Get App State    \${NOTIFICATION_APP}
    Should Be Equal As Numbers    \${initial_state}    4    App debe estar en foreground
    
    # Llenar formulario antes de background
    Click Element       id=form_button
    Wait Until Page Contains Element    id=user_form
    
    Input Text          id=name_field      Test User
    Input Text          id=email_field     test@example.com
    Input Text          id=notes_field     Important test data
    
    # Enviar app a background
    Background App      10
    
    \${background_state}= Get App State    \${NOTIFICATION_APP}
    Should Be Equal As Numbers    \${background_state}    1    App debe estar en background
    
    # Activar app nuevamente
    Activate Application    \${NOTIFICATION_APP}
    
    \${foreground_state}= Get App State    \${NOTIFICATION_APP}
    Should Be Equal As Numbers    \${foreground_state}    4    App debe volver a foreground
    
    # Verificar datos persistieron
    \${name_value}=     Get Text    id=name_field
    \${email_value}=    Get Text    id=email_field
    \${notes_value}=    Get Text    id=notes_field
    
    Should Be Equal     \${name_value}     Test User
    Should Be Equal     \${email_value}    test@example.com
    Should Be Equal     \${notes_value}    Important test data
    
    # Test terminate y restart
    Terminate Application    \${NOTIFICATION_APP}
    
    \${terminated_state}= Get App State    \${NOTIFICATION_APP}
    Should Be Equal As Numbers    \${terminated_state}    0    App debe estar terminada
    
    # Restart app
    Activate Application    \${NOTIFICATION_APP}
    Wait Until Page Contains Element    id=main_screen
    
    # Verificar estado inicial después de restart
    Element Should Be Visible    id=welcome_text
    Element Text Should Be       id=welcome_text    Welcome to Test App
    
    Take Screenshot     app_state_management.png
    Close Application
    
    Log    ✓ App state management testing completado

Device Features Testing
    [Documentation]    Testing features específicos del device
    [Tags]             device-features    sensors    hardware    capabilities
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=\${NOTIFICATION_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Test device info
    Click Element       id=device_info_button
    Wait Until Page Contains Element    id=device_info_screen
    
    \${device_model}=   Get Text    id=device_model_text
    \${android_version}= Get Text    id=android_version_text
    \${screen_size}=    Get Text    id=screen_size_text
    
    Should Not Be Empty \${device_model}    Device model disponible
    Should Not Be Empty \${android_version} Android version disponible
    Should Match Regexp \${screen_size}    \\d+x\\d+    Screen size format válido
    
    # Test network status
    Click Element       id=network_test_button
    Wait Until Page Contains Element    id=network_status
    
    \${network_type}=   Get Text    id=network_type_text
    \${connection_status}= Get Text    id=connection_status_text
    
    Should Be Equal     \${connection_status}    Connected
    Should Contain Any  \${network_type}    WiFi    Cellular    Ethernet
    
    # Test battery info
    Click Element       id=battery_info_button
    Wait Until Page Contains Element    id=battery_screen
    
    \${battery_level}=  Get Text    id=battery_level_text
    \${charging_status}= Get Text    id=charging_status_text
    
    Should Match Regexp \${battery_level}    \\d+%    Battery level format válido
    Should Contain Any  \${charging_status}  Charging    Not charging    Full
    
    # Test orientation
    \${initial_orientation}= Get Orientation
    
    TRY
        Rotate Device       LANDSCAPE
        Sleep               2s
        
        \${landscape_orientation}= Get Orientation
        Should Be Equal     \${landscape_orientation}    LANDSCAPE
        
        # Verificar UI adapta a landscape
        Element Should Be Visible    id=landscape_layout
        
        Rotate Device       PORTRAIT
        Sleep               2s
        
        \${portrait_orientation}= Get Orientation
        Should Be Equal     \${portrait_orientation}    PORTRAIT
        
    EXCEPT
        Log    Rotation no soportada en este device/emulador
    END
    
    # Test screenshot y sharing
    Click Element       id=screenshot_button
    Wait Until Page Contains Element    id=screenshot_taken_message
    
    Element Should Be Visible    id=share_screenshot_button
    Click Element               id=share_screenshot_button
    
    Wait Until Page Contains Element    id=share_dialog
    Element Should Be Visible           id=share_options
    
    Take Screenshot     device_features_testing.png
    Close Application
    
    Log    ✓ Device features testing completado</code></pre>
        
        <h3>🎯 Práctica Servicios (5 min):</h3>
        <p>1. Configura app con notificaciones push usando Firebase/FCM</p>
        <p>2. Registra custom URL scheme para deep links en AndroidManifest</p>
        <p>3. Ejecuta "Push Notification Testing" con servicio push real</p>
        <p>4. Configura ADB para comandos shell en "Deep Link Navigation"</p>
        <p>5. Prueba "Native Services Integration" con permisos cámara/ubicación</p>
        <p>6. Experimenta con "App State Management" background/foreground</p>
        <p>7. Monitorea "Device Features Testing" en dispositivo real vs emulador</p>
        <p>8. Implementa retry logic para servicios de red intermitentes</p>
        <p>9. Agrega validación de permisos antes de acceder servicios nativos</p>
        <p>10. Practica debugging cuando notificaciones no aparecen</p>
        <p>11. Documenta diferencias de comportamiento entre devices</p>
        <p>12. Crea test data cleanup para notificaciones y archivos generados</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar testing de push notifications end-to-end</li>
                <li>Validar deep links y navigation schemes personalizados</li>
                <li>Integrar testing con servicios nativos (cámara, location, contacts)</li>
                <li>Manejar estados de aplicación (background, foreground, terminate)</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa autoGrantPermissions=true para evitar dialogs de permisos. Siempre verifica app state antes de interactuar con elementos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 160 - Mobile Testing 160</h3>
        <p>Aprenderás testing de diferentes tipos de aplicaciones móviles: nativas, híbridas, PWA y cross-platform frameworks.</p>
    `,
    topics: ["mobile", "appium", "android", "ios"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-158"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_159 = LESSON_159;
}