/**
 * Robot Framework Academy - Lesson 160
 * Mobile Testing 160
 */

const LESSON_160 = {
    id: 160,
    title: "Mobile Testing 160",
    duration: "7 min",
    level: "intermediate",
    section: "section-12",
    content: `
        <h2>📲 Apps Nativas vs Híbridas</h2>
        <p>Testing estratégico para apps nativas, híbridas, PWA y cross-platform frameworks.</p>
        
        <h3>💻 Tests Multi-Platform:</h3>
        <pre><code class="robot">*** Settings ***
Library    AppiumLibrary
Library    SeleniumLibrary
Library    Collections
Library    String

*** Variables ***
\${APPIUM_SERVER}     http://localhost:4723/wd/hub
\${NATIVE_APP}        com.example.nativeapp
\${HYBRID_APP}        com.example.hybridapp
\${REACT_NATIVE_APP}  com.example.reactnativeapp
\${FLUTTER_APP}       com.example.flutterapp
\${PWA_URL}           https://pwa-test-app.com
\${TIMEOUT}           15s
\${CHROME_MOBILE}     Chrome

*** Test Cases ***
Native Android App Testing
    [Documentation]    Testing específico para aplicaciones nativas Android
    [Tags]             native    android    performance    ui
    
    \${native_caps}=    Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=\${NATIVE_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{native_caps}
    Set Appium Timeout  \${TIMEOUT}
    
    # Ventajas nativas: UI responsiva inmediata
    \${start_time}=     Get Time    epoch
    Click Element       id=heavy_animation_button
    Wait Until Page Contains Element    id=animation_complete
    \${animation_time}= Get Time    epoch
    
    \${duration}=       Evaluate    \${animation_time} - \${start_time}
    Should Be True      \${duration} < 2    Native animation < 2s
    
    # Testing elementos nativos específicos
    Element Should Be Visible    android=new UiSelector().className("android.widget.RecyclerView")
    Element Should Be Visible    android=new UiSelector().className("android.widget.Toolbar")
    Element Should Be Visible    android=new UiSelector().className("com.google.android.material.floatingactionbutton.FloatingActionButton")
    
    # Native gestures optimizados
    \${recycler_view}=  Set Variable    android=new UiSelector().className("android.widget.RecyclerView")
    Scroll Down         \${recycler_view}
    Fling               \${recycler_view}    UP
    
    # Testing memoria nativa (más eficiente)
    \${memory_usage}=   Execute Javascript    mobile: getDeviceInfo
    Log    Native app memory: \${memory_usage}
    
    # Integración directa con Android APIs
    Click Element       id=native_camera_button
    Wait Until Page Contains Element    android=new UiSelector().packageName("com.android.camera")
    
    \${camera_package}= Get Current Package
    Should Be Equal     \${camera_package}    com.android.camera
    
    Press Back
    Wait Until Page Contains Element    id=photo_captured
    
    Take Screenshot     native_android_testing.png
    Close Application
    
    Log    ✓ Native Android app testing completado

Hybrid App Multi-Context Testing
    [Documentation]    Testing completo para aplicaciones híbridas
    [Tags]             hybrid    webview    contexts    cordova
    
    \${hybrid_caps}=    Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=\${HYBRID_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{hybrid_caps}
    
    # Testing parte nativa inicial
    Wait Until Page Contains Element    id=native_header
    Element Should Be Visible           id=native_navigation
    Element Should Be Visible           id=webview_container
    
    # Identificar y cambiar a webview
    \${contexts}=       Get Contexts
    \${webview_context}= Set Variable    \${EMPTY}
    
    FOR    \${context}    IN    @{contexts}
        \${is_webview}=  Run Keyword And Return Status
        ...             Should Contain    \${context}    WEBVIEW
        Run Keyword If  \${is_webview}
        ...             Set Variable     \${webview_context}    \${context}
    END
    
    Switch To Context   \${webview_context}
    
    # Testing elementos web dentro de webview
    Wait Until Page Contains Element    css=.web-content
    Element Should Be Visible           css=input[type="text"]
    Element Should Be Visible           css=button.submit-btn
    
    Input Text          css=input[type="text"]    Hybrid Test Data
    Click Element       css=button.submit-btn
    
    Wait Until Page Contains Element    css=.success-message
    Element Should Contain Text         css=.success-message    Data submitted
    
    # Testing JavaScript bridge
    \${js_result}=      Execute Javascript    
    ...    return window.nativeBridge ? window.nativeBridge.getDeviceInfo() : 'No bridge'
    
    Should Not Be Equal \${js_result}    No bridge    JavaScript bridge funcional
    
    # Volver a contexto nativo
    Switch To Context   NATIVE_APP
    
    # Verificar datos llegaron a parte nativa
    Element Should Be Visible    id=data_received_indicator
    Element Text Should Contain  id=received_data_text    Hybrid Test Data
    
    # Testing navegación híbrida
    Click Element       id=native_settings_button
    Wait Until Page Contains Element    id=native_settings_screen
    
    Click Element       id=web_settings_button
    Switch To Context   \${webview_context}
    
    Wait Until Page Contains Element    css=.settings-web-panel
    Element Should Be Visible           css=select.language-selector
    Element Should Be Visible           css=input[type="checkbox"]
    
    Take Screenshot     hybrid_app_testing.png
    Switch To Context   NATIVE_APP
    Close Application
    
    Log    ✓ Hybrid app multi-context testing completado

React Native App Testing
    [Documentation]    Testing específico para React Native apps
    [Tags]             react-native    cross-platform    javascript
    
    \${rn_caps}=        Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=\${REACT_NATIVE_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{rn_caps}
    
    # Testing elementos React Native específicos
    Wait Until Page Contains Element    accessibility_id=welcome-screen
    Element Should Be Visible           accessibility_id=header-title
    Element Should Be Visible           accessibility_id=main-list
    
    # React Native usa testID como accessibility_id
    \${title_text}=     Get Text    accessibility_id=header-title
    Should Be Equal     \${title_text}    React Native App
    
    # Testing navegación React Navigation
    Click Element       accessibility_id=navigate-profile-btn
    Wait Until Page Contains Element    accessibility_id=profile-screen
    
    Element Should Be Visible    accessibility_id=profile-avatar
    Element Should Be Visible    accessibility_id=edit-profile-btn
    
    # Testing formularios React Native
    Click Element       accessibility_id=edit-profile-btn
    Wait Until Page Contains Element    accessibility_id=edit-form
    
    Clear Text          accessibility_id=name-input
    Input Text          accessibility_id=name-input       RN Test User
    Clear Text          accessibility_id=email-input
    Input Text          accessibility_id=email-input      rn@test.com
    
    Hide Keyboard
    Click Element       accessibility_id=save-btn
    
    Wait Until Page Contains Element    accessibility_id=success-alert
    Element Should Contain Text         accessibility_id=alert-message    Profile updated
    
    # Testing listas FlatList
    Click Element       accessibility_id=items-tab
    Wait Until Page Contains Element    accessibility_id=items-list
    
    \${list_items}=     Get Elements    accessibility_id=list-item
    \${items_count}=    Get Length      \${list_items}
    Should Be True      \${items_count} > 0    Lista debe tener elementos
    
    # Testing pull to refresh (React Native específico)
    \${list_location}=  Get Element Location    accessibility_id=items-list
    \${x}=             Set Variable    \${list_location}[x]
    \${y}=             Set Variable    \${list_location}[y]
    
    Swipe              \${x}    \${y}    \${x}    \${y + 300}
    Wait Until Page Contains Element    accessibility_id=loading-indicator
    Sleep              2s
    
    Element Should Not Be Visible    accessibility_id=loading-indicator
    
    Take Screenshot     react_native_testing.png
    Close Application
    
    Log    ✓ React Native app testing completado

PWA Mobile Testing
    [Documentation]    Testing Progressive Web Apps en mobile
    [Tags]             pwa    web-mobile    service-worker    offline
    
    \${pwa_caps}=       Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    browserName=Chrome
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{pwa_caps}
    
    # Navegar a PWA
    Go To               \${PWA_URL}
    
    # Verificar PWA characteristics
    \${manifest_link}=  Get Element Count    css=link[rel="manifest"]
    Should Be Equal As Numbers    \${manifest_link}    1    PWA manifest presente
    
    \${service_worker}= Execute Javascript    
    ...    return 'serviceWorker' in navigator ? 'supported' : 'not supported'
    Should Be Equal     \${service_worker}    supported    Service Worker soportado
    
    # Testing PWA install prompt
    \${install_available}= Execute Javascript
    ...    return window.deferredPrompt ? 'available' : 'not available'
    
    Run Keyword If      '\${install_available}' == 'available'
    ...                Click Element    css=.install-pwa-btn
    
    # Testing offline functionality
    \${network_status}= Execute Javascript    return navigator.onLine
    Should Be True      \${network_status}    Debe estar online inicialmente
    
    # Simular offline mode
    Execute Javascript  window.dispatchEvent(new Event('offline'))
    
    # Verificar PWA funciona offline
    Click Element       css=.offline-test-btn
    Wait Until Page Contains Element    css=.offline-message
    Element Should Contain Text         css=.offline-message    Working offline
    
    # Testing cache API
    \${cache_available}= Execute Javascript
    ...    return 'caches' in window ? 'available' : 'not available'
    Should Be Equal     \${cache_available}    available    Cache API disponible
    
    # Restaurar online
    Execute Javascript  window.dispatchEvent(new Event('online'))
    
    # Testing PWA features
    Element Should Be Visible    css=.add-to-homescreen
    Element Should Be Visible    css=.push-notification-btn
    Element Should Be Visible    css=.background-sync-btn
    
    # Testing responsive design
    \${viewport_width}=  Execute Javascript    return window.innerWidth
    Should Be True      \${viewport_width} <= 768    PWA responsive en mobile
    
    Take Screenshot     pwa_mobile_testing.png
    Close Application
    
    Log    ✓ PWA mobile testing completado

Flutter App Testing
    [Documentation]    Testing específico para Flutter applications
    [Tags]             flutter    dart    widgets    cross-platform
    
    \${flutter_caps}=   Create Dictionary
    ...    platformName=Android
    ...    deviceName=Android Emulator
    ...    appPackage=\${FLUTTER_APP}
    ...    appActivity=.MainActivity
    ...    automationName=Flutter
    
    TRY
        Open Application    \${APPIUM_SERVER}    &{flutter_caps}
        
        # Flutter usa keys específicos para testing
        Wait Until Page Contains Element    key=welcome_screen
        Element Should Be Visible           key=app_bar_title
        Element Should Be Visible           key=main_content
        
        # Testing widgets Flutter
        \${title_widget}=   Get Text    key=app_bar_title
        Should Be Equal     \${title_widget}    Flutter Test App
        
        # Testing navegación Flutter
        Click Element       key=navigate_button
        Wait Until Page Contains Element    key=second_screen
        
        Element Should Be Visible    key=back_button
        Element Should Be Visible    key=content_text
        
        # Testing formularios Flutter
        Click Element       key=form_button
        Wait Until Page Contains Element    key=form_screen
        
        Input Text          key=text_field        Flutter Test Input
        Click Element       key=dropdown_button
        Click Element       key=dropdown_option_1
        
        Click Element       key=checkbox
        Element Should Be Selected    key=checkbox
        
        Click Element       key=submit_button
        Wait Until Page Contains Element    key=success_snackbar
        
        # Testing listas Flutter (ListView)
        Click Element       key=list_tab
        Wait Until Page Contains Element    key=list_view
        
        \${list_items}=     Get Elements    key=list_item
        Should Not Be Empty \${list_items}    Flutter list debe tener items
        
        # Testing scroll en Flutter
        Scroll              key=list_view    DOWN
        
        # Testing animations Flutter
        Click Element       key=animation_button
        Wait Until Page Contains Element    key=animated_container
        
        # Verificar animation completada
        Sleep               2s
        \${animation_done}= Get Element Attribute    key=animated_container    displayed
        Should Be Equal     \${animation_done}    true
        
        Take Screenshot     flutter_app_testing.png
        Close Application
        
        Log    ✓ Flutter app testing completado
        
    EXCEPT
        Log    Flutter testing requiere Flutter driver configurado
        Log    Usa: appium driver install flutter
    END</code></pre>
        
        <h3>🎯 Práctica Multi-Platform (5 min):</h3>
        <p>1. Configura apps de ejemplo: nativa Android, híbrida Cordova, React Native</p>
        <p>2. Instala Flutter driver: <code>appium driver install flutter</code></p>
        <p>3. Ejecuta "Native Android App Testing" con app nativa optimizada</p>
        <p>4. Prueba "Hybrid App Multi-Context Testing" con Cordova/PhoneGap</p>
        <p>5. Configura React Native app para "React Native App Testing"</p>
        <p>6. Testea "PWA Mobile Testing" con manifest.json configurado</p>
        <p>7. Experimenta con "Flutter App Testing" usando keys específicos</p>
        <p>8. Compara performance entre tipos de apps con mismas funcionalidades</p>
        <p>9. Documenta diferencias en localizadores entre frameworks</p>
        <p>10. Practica debugging específico para cada tipo de aplicación</p>
        <p>11. Crea strategy guide para elegir approach según app type</p>
        <p>12. Implementa test suite universal que funcione across platforms</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar testing de aplicaciones nativas Android con UI optimizada</li>
                <li>Manejar aplicaciones híbridas con context switching avanzado</li>
                <li>Automatizar React Native apps usando accessibility_id patterns</li>
                <li>Validar PWAs con service workers y funcionalidad offline</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Cada tipo de app requiere estrategia diferente: nativas usan UiSelector, híbridas context switching, React Native accessibility_id, Flutter keys.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 161 - Mobile Testing 161</h3>
        <p>Profundizarás en mobile testing automation CI/CD, device farms, y estrategias de testing en múltiples devices simultáneamente.</p>
    `,
    topics: ["mobile", "appium", "android", "ios"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-159"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_160 = LESSON_160;
}