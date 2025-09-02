/**
 * Robot Framework Academy - Lesson 158
 * Mobile Testing 158
 */

const LESSON_158 = {
    id: 158,
    title: "Mobile Testing 158",
    duration: "7 min",
    level: "intermediate",
    section: "section-12",
    content: `
        <h2>🎯 Localizadores Avanzados</h2>
        <p>Domina selectors móviles complejos, contextos web/native y apps híbridas.</p>
        
        <h3>💻 Tests Avanzados:</h3>
        <pre><code class="robot">*** Settings ***
Library    AppiumLibrary
Library    Collections
Library    String
Library    SeleniumLibrary

*** Variables ***
\${APPIUM_SERVER}     http://localhost:4723/wd/hub
\${ANDROID_CAPS}      \${EMPTY}
\${IOS_CAPS}          \${EMPTY}
\${TIMEOUT}           20s
\${IMPLICIT_WAIT}     10s
\${CONTEXT_NATIVE}    NATIVE_APP
\${CONTEXT_WEB}       WEBVIEW_com.example.hybridapp
\${HYBRID_APP}        com.example.hybridapp

*** Test Cases ***
Advanced Mobile Locators
    [Documentation]    Localizadores móviles complejos y estrategias
    [Tags]             locators    advanced    mobile    selectors
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=\${HYBRID_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    Set Appium Timeout  \${TIMEOUT}
    
    # Test ID locators
    Wait Until Page Contains Element    id=main_toolbar
    Element Should Be Visible           id=main_toolbar
    
    # Test XPath avanzado
    \${profile_btn}=    Set Variable    xpath=//android.widget.Button[@resource-id='profile_button' and @enabled='true']
    Element Should Be Visible    \${profile_btn}
    Click Element               \${profile_btn}
    
    # Test por texto
    \${settings_text}=  Set Variable    xpath=//android.widget.TextView[@text='Settings']
    Wait Until Page Contains Element    \${settings_text}
    Click Element                       \${settings_text}
    
    # Test por clase y atributos
    \${edit_text}=      Set Variable    xpath=//android.widget.EditText[@hint='Enter username']
    Element Should Be Visible    \${edit_text}
    Input Text                   \${edit_text}    advanced_user
    
    # Test contenido parcial
    \${partial_text}=   Set Variable    xpath=//android.widget.Button[contains(@text, 'Save')]
    Element Should Be Visible    \${partial_text}
    Click Element               \${partial_text}
    
    # Test índice específico
    \${third_item}=     Set Variable    xpath=(//android.widget.TextView[@resource-id='list_item_title'])[3]
    Element Should Be Visible    \${third_item}
    \${item_text}=      Get Text        \${third_item}
    Should Not Be Empty \${item_text}
    
    # Test UiSelector Android
    \${ui_selector}=    Set Variable    android=new UiSelector().className("android.widget.Button").textContains("Submit")
    Element Should Be Visible    \${ui_selector}
    Click Element               \${ui_selector}
    
    Take Screenshot     android_advanced_locators.png
    Close Application
    
    Log    ✓ Localizadores avanzados Android completados

Hybrid App Context Switching
    [Documentation]    Cambio entre contextos native y webview
    [Tags]             hybrid    context    webview    native
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=\${HYBRID_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Verificar contexto inicial (nativo)
    \${current_context}= Get Current Context
    Should Be Equal     \${current_context}    \${CONTEXT_NATIVE}
    
    # Navegar a webview
    Click Element       id=webview_button
    Wait Until Page Contains Element    id=webview_container    \${TIMEOUT}
    
    # Listar contextos disponibles
    \${contexts}=       Get Contexts
    Log List           \${contexts}
    Should Contain     \${contexts}    \${CONTEXT_NATIVE}
    
    # Buscar contexto webview
    \${webview_context}= Set Variable    \${EMPTY}
    FOR    \${context}    IN    @{contexts}
        \${is_webview}=  Run Keyword And Return Status
        ...             Should Contain    \${context}    WEBVIEW
        Run Keyword If  \${is_webview}
        ...             Set Variable     \${webview_context}    \${context}
    END
    
    Should Not Be Empty \${webview_context}    Webview context debe existir
    
    # Cambiar a contexto webview
    Switch To Context   \${webview_context}
    \${new_context}=    Get Current Context
    Should Be Equal     \${new_context}    \${webview_context}
    
    # Testing en webview (elementos web)
    Wait Until Page Contains Element    css=h1.page-title
    Element Text Should Be              css=h1.page-title    Hybrid Web Content
    
    Element Should Be Visible    css=input#web-username
    Input Text                   css=input#web-username    webuser
    
    Element Should Be Visible    css=button#web-submit
    Click Element               css=button#web-submit
    
    Wait Until Page Contains Element    css=.success-message
    Element Should Contain Text         css=.success-message    Success
    
    # Volver a contexto nativo
    Switch To Context   \${CONTEXT_NATIVE}
    \${final_context}=  Get Current Context
    Should Be Equal     \${final_context}    \${CONTEXT_NATIVE}
    
    # Verificar elementos nativos funcionan
    Element Should Be Visible    id=back_button
    Click Element               id=back_button
    
    Take Screenshot     hybrid_context_switching.png
    Close Application
    
    Log    ✓ Context switching hybrid completado

Mobile Web Testing
    [Documentation]    Testing de aplicaciones web móviles
    [Tags]             mobile-web    browser    responsive
    
    \${mobile_caps}=    Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    browserName=Chrome
    ...    automationName=UiAutomator2
    ...    chromedriverExecutable=/path/to/chromedriver
    
    Open Application    \${APPIUM_SERVER}    &{mobile_caps}
    
    # Navegar a sitio web responsive
    Go To               https://mobile-test-site.com
    
    # Verificar viewport móvil
    \${viewport_width}=  Execute Javascript    return window.innerWidth
    Should Be True      \${viewport_width} <= 768    Debe ser viewport móvil
    
    # Test elementos responsive
    Element Should Be Visible    css=.mobile-menu-toggle
    Element Should Not Be Visible css=.desktop-navigation
    
    # Test formulario móvil
    Click Element       css=.mobile-menu-toggle
    Wait Until Page Contains Element    css=.mobile-menu
    
    Click Element       css=a[href='/contact']
    Wait Until Page Contains Element    css=form.contact-form
    
    # Input con teclado móvil
    Input Text          css=input[name='name']        Mobile User
    Input Text          css=input[name='email']       mobile@test.com
    Input Text          css=textarea[name='message']  Testing mobile web
    
    # Scroll en mobile web
    Execute Javascript  window.scrollTo(0, document.body.scrollHeight)
    
    Element Should Be Visible    css=button[type='submit']
    Click Element               css=button[type='submit']
    
    Wait Until Page Contains    Thank you for your message
    
    # Test orientación (si soportado)
    TRY
        Rotate Device       LANDSCAPE
        Sleep               2s
        
        \${landscape_width}= Execute Javascript    return window.innerWidth
        Should Be True      \${landscape_width} > \${viewport_width}
        
        Rotate Device       PORTRAIT
        Sleep               2s
        
    EXCEPT
        Log    Rotación no soportada en este emulador
    END
    
    Take Screenshot     mobile_web_testing.png
    Close Application
    
    Log    ✓ Mobile web testing completado

Cross-Platform Element Handling
    [Documentation]    Manejo elementos cross-platform iOS/Android
    [Tags]             cross-platform    ios    android    elements
    
    # Test Android
    \${android_caps}=   Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=com.example.crossapp
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{android_caps}
    
    # Localizadores Android-específicos
    \${android_button}= Set Variable    id=android_button
    \${android_text}=   Set Variable    xpath=//android.widget.TextView[@text='Android Text']
    
    Element Should Be Visible    \${android_button}
    Element Should Be Visible    \${android_text}
    
    Click Element       \${android_button}
    Input Text          id=android_input    Android Test Data
    
    \${android_result}= Get Text    id=result_text
    Should Contain      \${android_result}    Android
    
    Take Screenshot     cross_platform_android.png
    Close Application
    
    # Test iOS (si disponible)
    TRY
        \${ios_caps}=       Create Dictionary
        ...    platformName=iOS
        ...    deviceName=iPhone Simulator
        ...    bundleId=com.example.crossapp
        ...    automationName=XCUITest
        
        Open Application    \${APPIUM_SERVER}    &{ios_caps}
        
        # Localizadores iOS-específicos
        \${ios_button}=     Set Variable    id=iosButton
        \${ios_text}=       Set Variable    xpath=//XCUIElementTypeStaticText[@name='iOS Text']
        
        Element Should Be Visible    \${ios_button}
        Element Should Be Visible    \${ios_text}
        
        Tap                 \${ios_button}
        Input Text          id=iosInput    iOS Test Data
        
        \${ios_result}=     Get Text    id=resultLabel
        Should Contain      \${ios_result}    iOS
        
        Take Screenshot     cross_platform_ios.png
        Close Application
        
        Log    ✓ Cross-platform iOS testing completado
        
    EXCEPT
        Log    iOS testing no disponible (requiere macOS)
    END
    
    Log    ✓ Cross-platform testing completado

Mobile Performance Testing
    [Documentation]    Testing performance específico mobile
    [Tags]             performance    mobile    metrics    timing
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=com.example.perfapp
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    \${start_time}=     Get Time    epoch
    Open Application    \${APPIUM_SERVER}    &{caps}
    \${launch_time}=    Get Time    epoch
    
    \${app_launch_duration}= Evaluate    \${launch_time} - \${start_time}
    Should Be True      \${app_launch_duration} < 10    App launch < 10s
    
    # Test tiempo de carga pantallas
    \${screen_start}=   Get Time    epoch
    Click Element       id=heavy_screen_button
    Wait Until Page Contains Element    id=heavy_content
    \${screen_end}=     Get Time    epoch
    
    \${screen_load_time}= Evaluate    \${screen_end} - \${screen_start}
    Should Be True      \${screen_load_time} < 5    Screen load < 5s
    
    # Test scroll performance
    \${scroll_start}=   Get Time    epoch
    FOR    \${i}    IN RANGE    10
        Scroll Down     id=long_list
        Sleep           0.1s
    END
    \${scroll_end}=     Get Time    epoch
    
    \${scroll_duration}= Evaluate    \${scroll_end} - \${scroll_start}
    Should Be True      \${scroll_duration} < 5    Scroll performance OK
    
    # Test memoria (Android específico)
    TRY
        \${memory_info}=    Execute Javascript    
        ...    mobile: getDeviceInfo
        
        Log    Memory info: \${memory_info}
        
    EXCEPT
        Log    Memory info no disponible
    END
    
    # Test battery (si soportado)
    TRY
        \${battery_info}=   Execute Javascript    
        ...    mobile: batteryInfo
        
        \${battery_level}=  Get From Dictionary    \${battery_info}    level
        Should Be True      \${battery_level} > 20    Battery level sufficient
        
    EXCEPT
        Log    Battery info no disponible
    END
    
    Take Screenshot     mobile_performance.png
    Close Application
    
    Log    ✓ Mobile performance testing: Launch=\${app_launch_duration}s, Screen=\${screen_load_time}s</code></pre>
        
        <h3>🎯 Práctica Avanzada (5 min):</h3>
        <p>1. Configura app híbrida con webview para testing de contextos</p>
        <p>2. Practica localizadores XPath complejos con múltiples condiciones</p>
        <p>3. Experimenta con "Advanced Mobile Locators" usando UiSelector</p>
        <p>4. Configura Chrome mobile para "Mobile Web Testing" responsive</p>
        <p>5. Prueba "Hybrid App Context Switching" cambiando entre native/web</p>
        <p>6. Implementa "Cross-Platform Element Handling" para Android e iOS</p>
        <p>7. Monitorea "Mobile Performance Testing" con métricas de timing</p>
        <p>8. Usa appium-inspector para identificar elementos complejos</p>
        <p>9. Practica debugging cuando contextos webview no aparecen</p>
        <p>10. Experimenta con orientación device rotation en tests</p>
        <p>11. Agrega validación de performance para apps lentas</p>
        <p>12. Documenta estrategias de localizadores para tu app específica</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar localizadores móviles avanzados (XPath, UiSelector)</li>
                <li>Manejar aplicaciones híbridas con context switching</li>
                <li>Implementar testing cross-platform iOS/Android</li>
                <li>Medir performance específica mobile (launch time, scroll)</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Get Contexts para identificar webviews disponibles. Los localizadores XPath son más lentos pero más flexibles que ID.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 159 - Mobile Testing 159</h3>
        <p>Aprenderás testing de notificaciones push, deep links, y integración con servicios nativos móviles.</p>
    `,
    topics: ["mobile", "appium", "android", "ios"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-157"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_158 = LESSON_158;
}