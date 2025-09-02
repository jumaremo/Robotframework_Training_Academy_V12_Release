/**
 * Robot Framework Academy - Lesson 162
 * Mobile Testing 162
 */

const LESSON_162 = {
    id: 162,
    title: "Mobile Testing 162",
    duration: "7 min",
    level: "intermediate",
    section: "section-12",
    content: `
        <h2>♿ Accessibility e i18n</h2>
        <p>Testing de accesibilidad, internacionalización y aplicaciones con tecnologías emergentes.</p>
        
        <h3>💻 Tests Accessibility:</h3>
        <pre><code class="robot">*** Settings ***
Library    AppiumLibrary
Library    Collections
Library    String
Library    DateTime

*** Variables ***
\${APPIUM_SERVER}     http://localhost:4723/wd/hub
\${ACCESSIBILITY_APP} com.example.accessibilityapp
\${I18N_APP}          com.example.internationapp
\${DEVICE_NAME}       Android Emulator
\${TIMEOUT}           15s
\${LOCALES_LIST}      ["en-US", "es-ES", "fr-FR", "de-DE", "zh-CN"]
\${A11Y_SERVICES}     ["TalkBack", "Voice Assistant", "Select to Speak"]

*** Test Cases ***
Accessibility Features Testing
    [Documentation]    Testing completo de características de accesibilidad
    [Tags]             accessibility    a11y    screen-reader    talkback
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${ACCESSIBILITY_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Verificar elementos tienen content descriptions
    \${accessibility_elements}= Get Elements    xpath=//*[@content-desc]
    \${elements_count}= Get Length    \${accessibility_elements}
    Should Be True      \${elements_count} > 5    Mínimo 5 elementos con content-desc
    
    FOR    \${element}    IN    @{accessibility_elements}
        \${content_desc}=   Get Element Attribute    \${element}    content-desc
        Should Not Be Empty \${content_desc}    Content description no debe estar vacía
        Should Not Equal    \${content_desc}    null    Content description debe ser descriptiva
        
        \${desc_length}=    Get Length    \${content_desc}
        Should Be True      \${desc_length} >= 3    Description mínimo 3 caracteres
        
        Log    ✓ Element accessibility: \${content_desc}
    END
    
    # Testing navegación con TalkBack simulado
    Click Element       id=enable_accessibility_button
    Wait Until Page Contains Element    id=accessibility_enabled_indicator
    
    # Verificar elementos son focusables
    \${focusable_elements}= Get Elements    xpath=//*[@focusable='true']
    Should Not Be Empty \${focusable_elements}    Debe haber elementos focusables
    
    FOR    \${element}    IN    @{focusable_elements}
        \${is_clickable}=   Get Element Attribute    \${element}    clickable
        \${is_enabled}=     Get Element Attribute    \${element}    enabled
        
        Should Be Equal     \${is_enabled}    true    Elemento focusable debe estar enabled
        
        # Test navegación secuencial
        Click Element       \${element}
        Sleep               0.5s
        
        \${focused}=        Get Element Attribute    \${element}    focused
        Should Be Equal     \${focused}    true    Elemento debe recibir focus
    END
    
    # Testing contraste y tamaños mínimos
    Click Element       id=contrast_test_button
    Wait Until Page Contains Element    id=contrast_results
    
    \${contrast_ratio}= Get Text    id=contrast_ratio_value
    \${ratio_numeric}=  Convert To Number    \${contrast_ratio}
    Should Be True      \${ratio_numeric} >= 4.5    Contraste mínimo 4.5:1
    
    # Testing tamaños touch targets
    \${touch_targets}=  Get Elements    xpath=//android.widget.Button
    FOR    \${target}    IN    @{touch_targets}
        \${size}=           Get Element Size    \${target}
        \${width}=          Get From Dictionary    \${size}    width
        \${height}=         Get From Dictionary    \${size}    height
        
        Should Be True      \${width} >= 48    Touch target width >= 48dp
        Should Be True      \${height} >= 48    Touch target height >= 48dp
    END
    
    Take Screenshot     accessibility_testing.png
    Close Application
    
    Log    ✓ Accessibility testing completado

Internationalization Testing
    [Documentation]    Testing de múltiples idiomas y locales
    [Tags]             i18n    localization    languages    rtl
    
    FOR    \${locale}    IN    @{LOCALES_LIST}
        \${language}=       Set Variable    \${locale.split('-')[0]}
        \${country}=        Set Variable    \${locale.split('-')[1]}
        
        Log    Testing locale: \${locale} (\${language}-\${country})
        
        \${i18n_caps}=      Create Dictionary
        ...    platformName=Android
        ...    deviceName=\${DEVICE_NAME}
        ...    appPackage=\${I18N_APP}
        ...    appActivity=.MainActivity
        ...    automationName=UiAutomator2
        ...    locale=\${locale}
        ...    language=\${language}
        ...    country=\${country}
        
        Open Application    \${APPIUM_SERVER}    &{i18n_caps}
        
        # Verificar textos están traducidos (no en inglés default)
        \${welcome_text}=   Get Text    id=welcome_message
        Should Not Be Empty \${welcome_text}    Welcome text debe existir
        
        Run Keyword If      '\${language}' != 'en'
        ...                Should Not Contain    \${welcome_text}    Welcome    Debe estar traducido
        
        # Testing elementos UI específicos del locale
        \${date_format}=    Get Text    id=date_display
        Should Not Be Empty \${date_format}    Fecha debe mostrarse
        
        Run Keyword If      '\${locale}' == 'en-US'
        ...                Should Match Regexp    \${date_format}    \\d{1,2}/\\d{1,2}/\\d{4}    Formato US
        ...    ELSE IF      '\${locale}' == 'es-ES'  
        ...                Should Match Regexp    \${date_format}    \\d{1,2}/\\d{1,2}/\\d{4}    Formato ES
        ...    ELSE IF      '\${locale}' == 'de-DE'
        ...                Should Match Regexp    \${date_format}    \\d{1,2}\\.\\d{1,2}\\.\\d{4}    Formato DE
        
        # Testing currency formatting
        \${price_display}=  Get Text    id=price_text
        Run Keyword If      '\${locale}' == 'en-US'
        ...                Should Contain    \${price_display}    $    USD currency
        ...    ELSE IF      '\${locale}' == 'es-ES'
        ...                Should Contain    \${price_display}    €    EUR currency
        
        # Testing RTL layouts (Arabic, Hebrew)
        Run Keyword If      '\${language}' in ['ar', 'he']
        ...                Verify RTL Layout
        
        # Testing text expansion/contraction
        \${button_text}=    Get Text    id=action_button
        \${text_length}=    Get Length    \${button_text}
        
        # German typically expands, Chinese contracts
        Run Keyword If      '\${language}' == 'de'
        ...                Should Be True    \${text_length} > 10    German text expansion
        ...    ELSE IF      '\${language}' == 'zh'
        ...                Should Be True    \${text_length} < 15    Chinese text contraction
        
        Take Screenshot     i18n_\${locale}_testing.png
        Close Application
        
        Log    ✓ Locale \${locale} testing completado
    END

Screen Reader Integration Testing
    [Documentation]    Testing integración con lectores de pantalla
    [Tags]             screen-reader    talkback    voice-over    accessibility
    
    \${sr_caps}=        Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${ACCESSIBILITY_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{sr_caps}
    
    # Simular activación TalkBack
    Execute Adb Command shell settings put secure enabled_accessibility_services com.google.android.marvin.talkback/com.google.android.marvin.talkback.TalkBackService
    Execute Adb Command shell settings put secure accessibility_enabled 1
    
    Sleep               3s    # Tiempo para TalkBack initialize
    
    # Testing anuncios de TalkBack
    Click Element       id=main_heading
    Sleep               1s
    
    # Verificar que elementos se anuncian correctamente
    \${announced_elements}= Create List
    ...    id=navigation_button    Navigation button
    ...    id=content_text        Main content text
    ...    id=submit_form         Submit form button
    ...    id=settings_link       Settings link
    
    FOR    \${element_id}    \${expected_announcement}    IN    &{announced_elements}
        Click Element       \${element_id}
        Sleep               1s
        
        # En testing real, aquí interceptarías audio TalkBack
        # Para simulation, verificamos content-desc matches
        \${content_desc}=   Get Element Attribute    \${element_id}    content-desc
        Should Contain      \${content_desc}    \${expected_announcement}    Announcement matches
        
        Log    ✓ TalkBack announcement: \${element_id} → \${content_desc}
    END
    
    # Testing navegación por gestos accessibility
    \${navigation_elements}= Get Elements    xpath=//*[@clickable='true']
    
    FOR    \${element}    IN    @{navigation_elements}
        # Simular gesture navegación
        \${location}=       Get Element Location    \${element}
        \${x}=             Get From Dictionary    \${location}    x
        \${y}=             Get From Dictionary    \${location}    y
        
        # Swipe right para siguiente elemento (TalkBack gesture)
        Swipe              \${x}    \${y}    \${x + 100}    \${y}
        Sleep              0.5s
        
        \${is_focused}=     Get Element Attribute    \${element}    focused
        Run Keyword If      '\${is_focused}' == 'true'
        ...                Log    ✓ Element focused via gesture navigation
    END
    
    # Desactivar TalkBack
    Execute Adb Command shell settings put secure enabled_accessibility_services ""
    Execute Adb Command shell settings put secure accessibility_enabled 0
    
    Take Screenshot     screen_reader_testing.png
    Close Application
    
    Log    ✓ Screen reader integration testing completado

Font Scaling and Display Testing
    [Documentation]    Testing escalado de fuentes y adaptación display
    [Tags]             font-scaling    display    zoom    visual-accessibility
    
    \${scale_factors}=  Create List    0.85    1.0    1.15    1.3    1.45
    
    FOR    \${scale}    IN    @{scale_factors}
        Log    Testing font scale: \${scale}x
        
        \${font_caps}=      Create Dictionary
        ...    platformName=Android
        ...    deviceName=\${DEVICE_NAME}
        ...    appPackage=\${ACCESSIBILITY_APP}
        ...    appActivity=.MainActivity
        ...    automationName=UiAutomator2
        ...    fontScale=\${scale}
        
        Open Application    \${APPIUM_SERVER}    &{font_caps}
        
        # Verificar textos se escalan correctamente
        \${text_elements}=  Get Elements    xpath=//android.widget.TextView
        
        FOR    \${text_element}    IN    @{text_elements}
            \${text_size}=      Get Element Attribute    \${text_element}    textSize
            \${text_content}=   Get Text    \${text_element}
            
            Should Not Be Empty \${text_content}    Texto debe ser visible
            
            # Verificar texto no se corta con scaling
            \${element_size}=   Get Element Size    \${text_element}
            \${element_width}=  Get From Dictionary    \${element_size}    width
            \${element_height}= Get From Dictionary    \${element_size}    height
            
            Should Be True      \${element_width} > 0    Element debe tener ancho
            Should Be True      \${element_height} > 0    Element debe tener altura
            
            # Verificar texto no overflow
            Element Should Be Visible    \${text_element}
        END
        
        # Testing botones con texto escalado
        \${buttons}=        Get Elements    xpath=//android.widget.Button
        FOR    \${button}    IN    @{buttons}
            \${button_text}=    Get Text    \${button}
            Should Not Be Empty \${button_text}    Button text visible
            
            # Verificar button touch target mantiene tamaño mínimo
            \${btn_size}=       Get Element Size    \${button}
            \${btn_width}=      Get From Dictionary    \${btn_size}    width
            \${btn_height}=     Get From Dictionary    \${btn_size}    height
            
            Should Be True      \${btn_width} >= 48    Button width >= 48dp
            Should Be True      \${btn_height} >= 48    Button height >= 48dp
        END
        
        # Testing formularios con texto escalado
        Click Element       id=form_test_button
        Wait Until Page Contains Element    id=test_form
        
        \${form_fields}=    Get Elements    xpath=//android.widget.EditText
        FOR    \${field}    IN    @{form_fields}
            Element Should Be Visible    \${field}
            
            Input Text          \${field}    Scale test \${scale}x
            \${input_text}=     Get Text    \${field}
            Should Contain      \${input_text}    Scale test    Input visible
        END
        
        Take Screenshot     font_scale_\${scale}x_testing.png
        Close Application
        
        Log    ✓ Font scale \${scale}x testing completado
    END

Color Blindness and High Contrast Testing
    [Documentation]    Testing para daltonismo y alto contraste
    [Tags]             color-blindness    high-contrast    visual    accessibility
    
    \${contrast_caps}=  Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${ACCESSIBILITY_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{contrast_caps}
    
    # Testing modo alto contraste
    Execute Adb Command shell settings put secure high_text_contrast_enabled 1
    Sleep               2s
    
    # Verificar elementos críticos siguen siendo distinguibles
    \${critical_elements}= Create List
    ...    id=primary_button
    ...    id=secondary_button
    ...    id=error_message
    ...    id=success_message
    ...    id=warning_text
    
    FOR    \${element_id}    IN    @{critical_elements}
        Element Should Be Visible    \${element_id}
        
        # En testing real, aquí analizarías colores RGB
        # Para simulation, verificamos que elementos mantienen contrast
        \${is_enabled}=     Get Element Attribute    \${element_id}    enabled
        Should Be Equal     \${is_enabled}    true    Element debe permanecer usable
        
        Click Element       \${element_id}
        Sleep               0.5s
        
        Log    ✓ High contrast element usable: \${element_id}
    END
    
    # Testing sin dependencia de color únicamente
    Click Element       id=status_indicators_test
    Wait Until Page Contains Element    id=status_grid
    
    # Verificar estados usan más que solo color (iconos, texto, patrones)
    \${status_items}=   Get Elements    xpath=//android.widget.LinearLayout[contains(@resource-id, 'status_item')]
    
    FOR    \${status_item}    IN    @{status_items}
        # Verificar tiene icono además de color
        \${has_icon}=       Get Element Count    xpath=.//android.widget.ImageView
        Should Be True      \${has_icon} >= 1    Status debe tener icono no solo color
        
        # Verificar tiene texto descriptivo
        \${has_text}=       Get Element Count    xpath=.//android.widget.TextView
        Should Be True      \${has_text} >= 1    Status debe tener texto descriptivo
    END
    
    # Testing formularios error states
    Click Element       id=form_validation_test
    Wait Until Page Contains Element    id=validation_form
    
    # Intentar enviar formulario vacío
    Click Element       id=submit_validation_form
    
    # Verificar errores son claros sin dependencia de color
    \${error_fields}=   Get Elements    xpath=//android.widget.EditText[@error]
    FOR    \${error_field}    IN    @{error_fields}
        \${error_message}=  Get Element Attribute    \${error_field}    error
        Should Not Be Empty \${error_message}    Error message debe existir
        
        # Verificar field tiene indicador visual además de color
        \${has_error_icon}= Get Element Count    xpath=.//preceding-sibling::android.widget.ImageView
        Should Be True      \${has_error_icon} >= 1    Error debe tener icono
    END
    
    # Restaurar contraste normal
    Execute Adb Command shell settings put secure high_text_contrast_enabled 0
    
    Take Screenshot     color_accessibility_testing.png
    Close Application
    
    Log    ✓ Color blindness and high contrast testing completado</code></pre>
        
        <h3>🎯 Práctica Accessibility (5 min):</h3>
        <p>1. Configura app con elementos accessibility (content-desc, focusable)</p>
        <p>2. Instala TalkBack en emulador para screen reader testing</p>
        <p>3. Ejecuta "Accessibility Features Testing" verificando content descriptions</p>
        <p>4. Configura múltiples locales en "Internationalization Testing"</p>
        <p>5. Prueba "Screen Reader Integration Testing" con TalkBack activado</p>
        <p>6. Experimenta con "Font Scaling Testing" usando diferentes escalas</p>
        <p>7. Valida "Color Blindness Testing" con modo alto contraste</p>
        <p>8. Usa accessibility scanner para detectar issues automáticamente</p>
        <p>9. Testa navegación completa usando solo teclado/gestos</p>
        <p>10. Verifica touch targets cumplen tamaños mínimos (48dp)</p>
        <p>11. Implementa automated contrast ratio checking</p>
        <p>12. Documenta accessibility guidelines para tu aplicación</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar testing completo de características accessibility</li>
                <li>Validar aplicaciones en múltiples idiomas y locales</li>
                <li>Automatizar testing de screen readers y asistive technologies</li>
                <li>Verificar adaptación visual (font scaling, contrast, color blindness)</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa accessibility scanner automático y siempre testa con usuarios reales con discapacidades. Accessibility es requirement legal en muchas jurisdicciones.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 163 - Mobile Testing 163</h3>
        <p>Explorarás testing de aplicaciones con tecnologías emergentes: realidad aumentada, machine learning, y IoT mobile integration.</p>
    `,
    topics: ["mobile", "appium", "android", "ios"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-161"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_162 = LESSON_162;
}