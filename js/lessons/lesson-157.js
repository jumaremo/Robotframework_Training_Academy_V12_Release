/**
 * Robot Framework Academy - Lesson 157
 * Mobile Testing introduction
 */

const LESSON_157 = {
    id: 157,
    title: "Mobile Testing introduction",
    duration: "10 min",
    level: "intermediate",
    section: "section-12",
    content: `
        <h2>📱 Appium Setup</h2>
        <p>Automatiza apps móviles Android e iOS usando Appium con Robot Framework.</p>
        
        <h3>💻 Tests Mobile:</h3>
        <pre><code class="robot">*** Settings ***
Library    AppiumLibrary
Library    Collections
Library    OperatingSystem
Library    DateTime

*** Variables ***
\${APPIUM_SERVER}     http://localhost:4723/wd/hub
\${PLATFORM_NAME}     Android
\${DEVICE_NAME}       Android Emulator
\${APP_PACKAGE}       com.example.testapp
\${APP_ACTIVITY}      .MainActivity
\${AUTOMATION_NAME}   UiAutomator2
\${PLATFORM_VERSION}  11.0
\${APP_PATH}          \${CURDIR}/apps/test-app.apk
\${TIMEOUT}           30s
\${IMPLICIT_WAIT}     10s
\${TEST_DATA_DIR}     \${CURDIR}/mobile_data

*** Test Cases ***
Android Basic App Launch
    [Documentation]    Lanza app Android y verifica elementos básicos
    [Tags]             android    launch    basic    appium
    
    \${desired_caps}=    Create Dictionary
    ...    platformName=\${PLATFORM_NAME}
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${APP_PACKAGE}
    ...    appActivity=\${APP_ACTIVITY}
    ...    automationName=\${AUTOMATION_NAME}
    ...    platformVersion=\${PLATFORM_VERSION}
    ...    app=\${APP_PATH}
    ...    noReset=true
    
    Open Application    \${APPIUM_SERVER}    &{desired_caps}
    Set Appium Timeout  \${TIMEOUT}
    
    Wait Until Page Contains Element    id=welcome_text
    Element Should Be Visible           id=welcome_text
    Element Text Should Be              id=welcome_text    Welcome to Test App
    
    Element Should Be Visible           id=login_button
    Element Should Be Enabled           id=login_button
    Element Should Be Visible           id=register_button
    
    \${app_title}=      Get Text    id=app_title
    Should Be Equal     \${app_title}    Test Mobile App
    
    Take Screenshot     \${TEST_DATA_DIR}/android_launch.png
    Close Application
    
    Log    ✓ Android app lanzada correctamente

Mobile Login Flow Testing
    [Documentation]    Test completo de login en mobile
    [Tags]             mobile    login    flow    authentication
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${APP_PACKAGE}
    ...    appActivity=\${APP_ACTIVITY}
    ...    automationName=\${AUTOMATION_NAME}
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Test login válido
    Click Element       id=login_button
    Wait Until Page Contains Element    id=username_field
    
    Input Text          id=username_field    testuser
    Input Password      id=password_field    testpass123
    Hide Keyboard
    
    Click Element       id=login_submit
    Wait Until Page Contains Element    id=dashboard_title    \${TIMEOUT}
    
    Element Text Should Be    id=dashboard_title    Dashboard
    Element Should Be Visible id=user_profile
    Element Should Be Visible id=menu_button
    
    # Verifica elementos dashboard
    \${username_display}= Get Text    id=username_display
    Should Be Equal       \${username_display}    testuser
    
    Page Should Contain Element    id=logout_button
    Page Should Contain Element    id=settings_button
    
    # Test logout
    Click Element         id=logout_button
    Wait Until Page Contains Element    id=login_button
    Element Should Be Visible           id=welcome_text
    
    Take Screenshot       \${TEST_DATA_DIR}/login_flow_complete.png
    Close Application
    
    Log    ✓ Login flow mobile completado

Mobile Navigation Testing
    [Documentation]    Test navegación entre pantallas mobile
    [Tags]             navigation    screens    mobile    ui
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${APP_PACKAGE}
    ...    appActivity=\${APP_ACTIVITY}
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Login rápido
    Click Element       id=login_button
    Input Text          id=username_field    testuser
    Input Password      id=password_field    testpass123
    Click Element       id=login_submit
    Wait Until Page Contains Element    id=dashboard_title
    
    # Test navegación menu
    Click Element       id=menu_button
    Wait Until Page Contains Element    id=menu_drawer
    
    Element Should Be Visible    id=menu_home
    Element Should Be Visible    id=menu_profile
    Element Should Be Visible    id=menu_settings
    Element Should Be Visible    id=menu_about
    
    # Navegar a profile
    Click Element       id=menu_profile
    Wait Until Page Contains Element    id=profile_title
    Element Text Should Be              id=profile_title    User Profile
    
    Element Should Be Visible    id=edit_profile_button
    Element Should Be Visible    id=profile_photo
    Element Should Be Visible    id=profile_email
    
    # Navegar a settings
    Click Element       id=menu_button
    Click Element       id=menu_settings
    Wait Until Page Contains Element    id=settings_title
    
    Element Should Be Visible    id=notifications_toggle
    Element Should Be Visible    id=privacy_settings
    Element Should Be Visible    id=app_version
    
    # Verificar versión app
    \${app_version}=    Get Text    id=app_version
    Should Match Regexp \${app_version}    ^v\\d+\\.\\d+\\.\\d+$
    
    # Volver a home
    Click Element       id=menu_button
    Click Element       id=menu_home
    Wait Until Page Contains Element    id=dashboard_title
    
    Take Screenshot     \${TEST_DATA_DIR}/navigation_complete.png
    Close Application
    
    Log    ✓ Navegación mobile completada

Mobile Form Input Testing
    [Documentation]    Test inputs y formularios mobile
    [Tags]             forms    input    mobile    data-entry
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${APP_PACKAGE}
    ...    appActivity=\${APP_ACTIVITY}
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Navegar a formulario
    Click Element       id=register_button
    Wait Until Page Contains Element    id=register_form
    
    # Test campos requeridos
    \${form_fields}=    Create List
    ...    first_name    John
    ...    last_name     Doe
    ...    email         john.doe@test.com
    ...    phone         +1234567890
    ...    password      securepass123
    ...    confirm_pass  securepass123
    
    FOR    \${field}    \${value}    IN    &{form_fields}
        Element Should Be Visible    id=\${field}_field
        Clear Text                   id=\${field}_field
        Input Text                   id=\${field}_field    \${value}
        Hide Keyboard
        
        \${entered_text}=    Get Text    id=\${field}_field
        Should Contain       \${entered_text}    \${value}
        
        Log    ✓ Campo \${field} completado: \${value}
    END
    
    # Test dropdown
    Click Element       id=country_dropdown
    Wait Until Page Contains Element    id=dropdown_options
    Click Element       xpath=//android.widget.TextView[@text='United States']
    
    \${selected_country}= Get Text    id=country_dropdown
    Should Be Equal      \${selected_country}    United States
    
    # Test checkbox
    Element Should Not Be Selected    id=terms_checkbox
    Click Element                     id=terms_checkbox
    Element Should Be Selected        id=terms_checkbox
    
    # Test date picker
    Click Element       id=birth_date_field
    Wait Until Page Contains Element    id=date_picker
    Click Element       id=date_ok_button
    
    Element Should Not Be Empty    id=birth_date_field
    
    # Submit form
    Scroll Down         id=register_form
    Click Element       id=submit_register
    
    Wait Until Page Contains Element    id=success_message    \${TIMEOUT}
    Element Text Should Be              id=success_message    Registration successful
    
    Take Screenshot     \${TEST_DATA_DIR}/form_submission.png
    Close Application
    
    Log    ✓ Formulario mobile completado

Mobile Gestures Testing
    [Documentation]    Test gestos móviles: swipe, scroll, pinch
    [Tags]             gestures    swipe    scroll    mobile
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${APP_PACKAGE}
    ...    appActivity=\${APP_ACTIVITY}
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Login y navegar a lista
    Click Element       id=login_button
    Input Text          id=username_field    testuser
    Input Password      id=password_field    testpass123
    Click Element       id=login_submit
    Wait Until Page Contains Element    id=dashboard_title
    
    Click Element       id=items_list_button
    Wait Until Page Contains Element    id=items_recycler_view
    
    # Test scroll vertical
    \${initial_items}=  Get Elements    xpath=//android.widget.TextView[contains(@resource-id,'item_title')]
    \${initial_count}=  Get Length      \${initial_items}
    
    Scroll Down         id=items_recycler_view
    Sleep               2s
    
    \${after_scroll}=   Get Elements    xpath=//android.widget.TextView[contains(@resource-id,'item_title')]
    \${after_count}=    Get Length      \${after_scroll}
    
    Should Be True      \${after_count} >= \${initial_count}    Nuevos items cargados
    
    # Test swipe horizontal en carrusel
    Click Element       id=featured_carousel
    Wait Until Page Contains Element    id=carousel_container
    
    \${first_item}=     Get Text    id=carousel_current_item
    
    Swipe               200    300    600    300    # Swipe right to left
    Sleep               1s
    
    \${second_item}=    Get Text    id=carousel_current_item
    Should Not Be Equal \${first_item}    \${second_item}
    
    # Test pull to refresh
    \${location}=       Get Element Location    id=items_recycler_view
    \${x}=             Set Variable    \${location}[x]
    \${y}=             Set Variable    \${location}[y]
    
    Swipe              \${x}    \${y}    \${x}    \${y + 300}    # Pull down
    Wait Until Page Contains Element    id=refresh_indicator
    Sleep              3s
    
    Element Should Not Be Visible    id=refresh_indicator
    
    # Test long press
    Long Press         id=first_list_item
    Wait Until Page Contains Element    id=context_menu
    
    Element Should Be Visible    id=menu_edit
    Element Should Be Visible    id=menu_delete
    Element Should Be Visible    id=menu_share
    
    Click Element      id=menu_edit
    Wait Until Page Contains Element    id=edit_dialog
    
    Take Screenshot    \${TEST_DATA_DIR}/gestures_complete.png
    Close Application
    
    Log    ✓ Gestos mobile completados

Cross-Platform Basic Testing
    [Documentation]    Setup básico para iOS testing
    [Tags]             ios    cross-platform    setup    basic
    
    # Configuración iOS (requiere macOS y Xcode)
    \${ios_caps}=       Create Dictionary
    ...    platformName=iOS
    ...    deviceName=iPhone 13 Simulator
    ...    platformVersion=15.0
    ...    bundleId=com.example.testapp
    ...    automationName=XCUITest
    ...    app=\${CURDIR}/apps/TestApp.app
    
    TRY
        Open Application    \${APPIUM_SERVER}    &{ios_caps}
        
        Wait Until Page Contains Element    id=welcomeLabel    \${TIMEOUT}
        Element Should Be Visible           id=welcomeLabel
        
        \${welcome_text}=   Get Text    id=welcomeLabel
        Should Be Equal     \${welcome_text}    Welcome to iOS App
        
        Element Should Be Visible    id=loginButton
        Element Should Be Visible    id=signupButton
        
        # Test tap iOS
        Tap                 id=loginButton
        Wait Until Page Contains Element    id=usernameField
        
        Input Text          id=usernameField      iosuser
        Input Text          id=passwordField      iospass123
        Tap                 id=submitButton
        
        Wait Until Page Contains Element    id=dashboardView
        Element Should Be Visible           id=navigationBar
        
        Take Screenshot     \${TEST_DATA_DIR}/ios_basic.png
        Close Application
        
        Log    ✓ iOS testing básico completado
        
    EXCEPT
        Log    ⚠️ iOS testing requiere macOS y simulador configurado
    END</code></pre>
        
        <h3>🎯 Práctica Mobile (8 min):</h3>
        <p>1. Instala Appium: <code>npm install -g appium</code></p>
        <p>2. Instala driver Android: <code>appium driver install uiautomator2</code></p>
        <p>3. Configura Android SDK y crea emulador Android con API 28+</p>
        <p>4. Inicia Appium server: <code>appium --address 127.0.0.1 --port 4723</code></p>
        <p>5. Instala Robot Framework Appium: <code>pip install robotframework-appiumlibrary</code></p>
        <p>6. Descarga APK de prueba o usa app demo existente</p>
        <p>7. Ejecuta "Android Basic App Launch" y verifica que app se abre</p>
        <p>8. Modifica desired capabilities según tu emulador y app</p>
        <p>9. Prueba "Mobile Login Flow Testing" con credenciales válidas</p>
        <p>10. Experimenta con "Mobile Gestures Testing" (swipe, scroll, long press)</p>
        <p>11. Usa appium-inspector para identificar elementos de tu app</p>
        <p>12. Practica debugging cuando elementos no se encuentran</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Configurar entorno Appium para testing Android e iOS</li>
                <li>Dominar elementos móviles básicos: tap, input, scroll</li>
                <li>Implementar flows de testing mobile (login, navegación)</li>
                <li>Manejar gestos específicos móviles (swipe, long press)</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa appium-inspector para identificar elementos fácilmente. Siempre configura timeouts apropiados para elementos móviles.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 158 - Mobile Testing 158</h3>
        <p>Profundizarás en localizadores móviles avanzados, manejo de contextos web/native y testing de aplicaciones híbridas.</p>
    `,
    topics: ["mobile", "appium", "android", "ios"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-156"],
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_157 = LESSON_157;
}