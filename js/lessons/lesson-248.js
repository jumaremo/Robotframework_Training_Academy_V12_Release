/**
 * Robot Framework Academy - Lesson 248
 * Mobile + Web integration
 */

const LESSON_248 = {
    id: 248,
    title: "Mobile + Web integration",
    duration: "20 min",
    level: "advanced",
    section: "section-21",
    content: `
        <h2>🔧 Mobile Web Integration</h2>
        <p>Testing integrado para aplicaciones móviles y web que comparten APIs y datos en tiempo real.</p>
        
        <h3>💻 Cross-platform integration suite:</h3>
        <pre><code class="robot">*** Settings ***
Library    SeleniumLibrary
Library    AppiumLibrary
Library    RequestsLibrary
Documentation    Mobile + Web Integration Testing Suite

*** Variables ***
\${WEB_URL}              https://webapp.integration.com
\${MOBILE_APP_PATH}      /path/to/mobile-app.apk
\${API_BASE_URL}         https://api.integration.com/v1
\${SHARED_USER_EMAIL}    integration@test.com
\${SHARED_PASSWORD}      SharedPass123
\${DEVICE_UDID}          emulator-5554
\${PLATFORM_NAME}        Android
\${SYNC_TOKEN}           sync_token_12345

*** Test Cases ***
Test User Authentication Sync
    Set Global Variable    \${AUTH_SYNC_STATUS}    pending
    Should Be Equal    \${AUTH_SYNC_STATUS}    pending
    Log    Cross-platform authentication sync testing    INFO
    # Web Login
    Open Browser    \${WEB_URL}/login    chrome
    Input Text    id=email    \${SHARED_USER_EMAIL}
    Input Text    id=password    \${SHARED_PASSWORD}
    Click Button    id=login_btn
    Wait Until Page Contains    Dashboard
    \${web_token}=    Execute Javascript    return localStorage.getItem('authToken')
    Should Not Be Empty    \${web_token}
    Close Browser
    # Mobile Login with same credentials
    Open Application    http://localhost:4723/wd/hub    platformName=\${PLATFORM_NAME}    deviceName=\${DEVICE_UDID}    app=\${MOBILE_APP_PATH}
    Input Text    id=mobile_email    \${SHARED_USER_EMAIL}
    Input Text    id=mobile_password    \${SHARED_PASSWORD}
    Click Element    id=mobile_login_btn
    Wait Until Page Contains Element    id=mobile_dashboard
    Set Suite Variable    \${CROSS_AUTH_VERIFIED}    True
    Should Be Equal    \${CROSS_AUTH_VERIFIED}    True
    Log    Cross-platform authentication verified    INFO
    Close Application

Test Data Synchronization
    Set Suite Variable    \${DATA_SYNC_ACTIVE}    True
    Should Be Equal    \${DATA_SYNC_ACTIVE}    True
    Log    Data synchronization testing initiated    INFO
    # Create data on web
    Open Browser    \${WEB_URL}/dashboard    chrome
    Input Text    id=email    \${SHARED_USER_EMAIL}
    Input Text    id=password    \${SHARED_PASSWORD}
    Click Button    id=login_btn
    Wait Until Page Contains    Dashboard
    Click Link    Add New Item
    Input Text    id=item_name    Cross Platform Item
    Input Text    id=item_description    Synced across platforms
    Click Button    id=save_item_btn
    Wait Until Page Contains    Item Saved
    \${web_item_id}=    Get Text    id=item_id_display
    Should Not Be Empty    \${web_item_id}
    Close Browser
    # Verify data appears on mobile
    Open Application    http://localhost:4723/wd/hub    platformName=\${PLATFORM_NAME}    deviceName=\${DEVICE_UDID}    app=\${MOBILE_APP_PATH}
    Input Text    id=mobile_email    \${SHARED_USER_EMAIL}
    Input Text    id=mobile_password    \${SHARED_PASSWORD}
    Click Element    id=mobile_login_btn
    Wait Until Page Contains Element    id=mobile_dashboard
    Click Element    id=mobile_items_list
    Wait Until Page Contains Element    xpath=//android.widget.TextView[@text='Cross Platform Item']
    Element Should Contain Text    id=mobile_item_desc    Synced across platforms
    Set Global Variable    \${DATA_SYNCED}    True
    Should Be Equal    \${DATA_SYNCED}    True
    Log    Data synchronization verified    INFO
    Close Application

Test Real Time Notifications
    Set Global Variable    \${NOTIFICATIONS_TESTING}    True
    Should Be Equal    \${NOTIFICATIONS_TESTING}    True
    Log    Real-time notifications testing    INFO
    # Setup API session for notifications
    Create Session    integration_api    \${API_BASE_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer \${SYNC_TOKEN}    Content-Type=application/json
    # Send notification via API
    \${notification_data}=    Create Dictionary    user_email=\${SHARED_USER_EMAIL}    message=Test Cross Platform Notification    type=info
    \${response}=    POST On Session    integration_api    /notifications/send    json=\${notification_data}    headers=\${headers}
    Should Be Equal As Numbers    \${response.status_code}    200
    Dictionary Should Contain Key    \${response.json()}    notification_id
    # Verify on web
    Open Browser    \${WEB_URL}/dashboard    chrome
    Input Text    id=email    \${SHARED_USER_EMAIL}
    Input Text    id=password    \${SHARED_PASSWORD}
    Click Button    id=login_btn
    Wait Until Page Contains    Dashboard
    Wait Until Page Contains Element    id=notification_bell    timeout=10s
    Click Element    id=notification_bell
    Wait Until Page Contains    Test Cross Platform Notification
    Should Not Be Empty    \${SYNC_TOKEN}
    Close Browser
    # Verify on mobile
    Open Application    http://localhost:4723/wd/hub    platformName=\${PLATFORM_NAME}    deviceName=\${DEVICE_UDID}    app=\${MOBILE_APP_PATH}
    Wait Until Page Contains Element    id=mobile_notification_icon    timeout=10s
    Click Element    id=mobile_notification_icon
    Wait Until Page Contains Element    xpath=//android.widget.TextView[@text='Test Cross Platform Notification']
    Set Suite Variable    \${NOTIFICATIONS_VERIFIED}    True
    Should Be Equal    \${NOTIFICATIONS_VERIFIED}    True
    Log    Real-time notifications verified    INFO
    Close Application

Test Offline Sync Capability
    Set Suite Variable    \${OFFLINE_SYNC_TESTING}    True
    Should Be Equal    \${OFFLINE_SYNC_TESTING}    True
    Log    Offline sync capability testing    INFO
    # Create data while mobile offline
    Open Application    http://localhost:4723/wd/hub    platformName=\${PLATFORM_NAME}    deviceName=\${DEVICE_UDID}    app=\${MOBILE_APP_PATH}
    # Simulate airplane mode
    \${network_connection}=    Get Network Connection
    Set Network Connection    0
    Click Element    id=mobile_add_item
    Input Text    id=mobile_item_name    Offline Created Item
    Input Text    id=mobile_item_desc    Created while offline
    Click Element    id=mobile_save_offline
    Wait Until Page Contains Element    id=offline_indicator
    Element Should Contain Text    id=offline_indicator    Saved Locally
    # Re-enable network
    Set Network Connection    \${network_connection}
    Click Element    id=mobile_sync_now
    Wait Until Page Contains Element    id=sync_success    timeout=15s
    Should Be Equal    \${PLATFORM_NAME}    Android
    Close Application
    # Verify sync on web
    Open Browser    \${WEB_URL}/dashboard    chrome
    Input Text    id=email    \${SHARED_USER_EMAIL}
    Input Text    id=password    \${SHARED_PASSWORD}
    Click Button    id=login_btn
    Wait Until Page Contains    Dashboard
    Click Link    Items List
    Wait Until Page Contains    Offline Created Item
    Page Should Contain    Created while offline
    Set Global Variable    \${OFFLINE_SYNC_VERIFIED}    True
    Should Be Equal    \${OFFLINE_SYNC_VERIFIED}    True
    Log    Offline sync capability verified    INFO
    Close Browser

Test API Consistency Validation
    Set Global Variable    \${API_CONSISTENCY_TESTING}    True
    Should Be Equal    \${API_CONSISTENCY_TESTING}    True
    Log    API consistency validation testing    INFO
    Create Session    integration_api    \${API_BASE_URL}
    \${headers}=    Create Dictionary    Authorization=Bearer \${SYNC_TOKEN}    Content-Type=application/json
    # Test same API endpoints used by both platforms
    \${web_response}=    GET On Session    integration_api    /user/profile    headers=\${headers}
    Should Be Equal As Numbers    \${web_response.status_code}    200
    Dictionary Should Contain Key    \${web_response.json()}    user_id
    Dictionary Should Contain Key    \${web_response.json()}    email
    Dictionary Should Contain Key    \${web_response.json()}    preferences
    # Test mobile-specific API endpoints
    \${mobile_headers}=    Create Dictionary    Authorization=Bearer \${SYNC_TOKEN}    User-Agent=Mobile-App-v2.0    Content-Type=application/json
    \${mobile_response}=    GET On Session    integration_api    /user/profile    headers=\${mobile_headers}
    Should Be Equal As Numbers    \${mobile_response.status_code}    200
    Dictionaries Should Be Equal    \${web_response.json()}    \${mobile_response.json()}
    Should Not Be Empty    \${API_BASE_URL}
    Set Suite Variable    \${API_CONSISTENCY_VERIFIED}    True
    Should Be Equal    \${API_CONSISTENCY_VERIFIED}    True
    Log    API consistency validated    INFO

Test Cross Platform Shopping Cart
    Set Suite Variable    \${CART_SYNC_TESTING}    True
    Should Be Equal    \${CART_SYNC_TESTING}    True
    Log    Cross-platform shopping cart testing    INFO
    # Add items to cart on web
    Open Browser    \${WEB_URL}/shop    chrome
    Input Text    id=email    \${SHARED_USER_EMAIL}
    Input Text    id=password    \${SHARED_PASSWORD}
    Click Button    id=login_btn
    Wait Until Page Contains    Shop
    Click Button    xpath=//button[@data-product-id='PROD001']
    Click Button    xpath=//button[@data-product-id='PROD002']
    Click Link    Cart
    Wait Until Page Contains    2 items in cart
    \${cart_total}=    Get Text    id=cart_total
    Should Not Be Empty    \${cart_total}
    Close Browser
    # Verify cart synced to mobile
    Open Application    http://localhost:4723/wd/hub    platformName=\${PLATFORM_NAME}    deviceName=\${DEVICE_UDID}    app=\${MOBILE_APP_PATH}
    Input Text    id=mobile_email    \${SHARED_USER_EMAIL}
    Input Text    id=mobile_password    \${SHARED_PASSWORD}
    Click Element    id=mobile_login_btn
    Wait Until Page Contains Element    id=mobile_dashboard
    Click Element    id=mobile_cart_icon
    Wait Until Page Contains Element    xpath=//android.widget.TextView[@text='2 items']
    Element Should Contain Text    id=mobile_cart_total    \${cart_total}
    Set Global Variable    \${CART_SYNCED}    True
    Should Be Equal    \${CART_SYNCED}    True
    Log    Cross-platform cart sync verified    INFO
    Close Application

Test User Preferences Sync
    Set Global Variable    \${PREFERENCES_SYNC}    active
    Should Be Equal    \${PREFERENCES_SYNC}    active
    Log    User preferences synchronization testing    INFO
    # Update preferences on mobile
    Open Application    http://localhost:4723/wd/hub    platformName=\${PLATFORM_NAME}    deviceName=\${DEVICE_UDID}    app=\${MOBILE_APP_PATH}
    Input Text    id=mobile_email    \${SHARED_USER_EMAIL}
    Input Text    id=mobile_password    \${SHARED_PASSWORD}
    Click Element    id=mobile_login_btn
    Wait Until Page Contains Element    id=mobile_dashboard
    Click Element    id=mobile_settings
    Click Element    id=mobile_preferences
    Click Element    id=dark_mode_toggle
    Click Element    id=notification_toggle
    Click Element    id=save_preferences
    Wait Until Page Contains Element    id=preferences_saved
    Should Be Equal    \${DEVICE_UDID}    emulator-5554
    Close Application
    # Verify preferences applied on web
    Open Browser    \${WEB_URL}/dashboard    chrome
    Input Text    id=email    \${SHARED_USER_EMAIL}
    Input Text    id=password    \${SHARED_PASSWORD}
    Click Button    id=login_btn
    Wait Until Page Contains    Dashboard
    \${theme_class}=    Get Element Attribute    css=body    class
    Should Contain    \${theme_class}    dark-mode
    Click Link    Settings
    Wait Until Page Contains    Preferences
    Checkbox Should Be Selected    id=notifications_enabled
    Set Suite Variable    \${PREFERENCES_SYNCED}    True
    Should Be Equal    \${PREFERENCES_SYNCED}    True
    Log    User preferences sync verified    INFO
    Close Browser

Test Performance Cross Platform
    Set Suite Variable    \${PERFORMANCE_TESTING}    active
    Should Be Equal    \${PERFORMANCE_TESTING}    active
    Log    Cross-platform performance testing    INFO
    # Measure web app performance
    Open Browser    \${WEB_URL}    chrome
    \${web_start_time}=    Get Time    epoch
    Input Text    id=email    \${SHARED_USER_EMAIL}
    Input Text    id=password    \${SHARED_PASSWORD}
    Click Button    id=login_btn
    Wait Until Page Contains    Dashboard
    \${web_end_time}=    Get Time    epoch
    \${web_load_time}=    Evaluate    \${web_end_time} - \${web_start_time}
    Should Be True    \${web_load_time} < 5
    Close Browser
    # Measure mobile app performance
    \${mobile_start_time}=    Get Time    epoch
    Open Application    http://localhost:4723/wd/hub    platformName=\${PLATFORM_NAME}    deviceName=\${DEVICE_UDID}    app=\${MOBILE_APP_PATH}
    Input Text    id=mobile_email    \${SHARED_USER_EMAIL}
    Input Text    id=mobile_password    \${SHARED_PASSWORD}
    Click Element    id=mobile_login_btn
    Wait Until Page Contains Element    id=mobile_dashboard
    \${mobile_end_time}=    Get Time    epoch
    \${mobile_load_time}=    Evaluate    \${mobile_end_time} - \${mobile_start_time}
    Should Be True    \${mobile_load_time} < 8
    Should Not Be Empty    \${SHARED_USER_EMAIL}
    Set Global Variable    \${PERFORMANCE_VERIFIED}    True
    Should Be Equal    \${PERFORMANCE_VERIFIED}    True
    Log    Cross-platform performance verified    INFO
    Close Application</code></pre>
        
        <h3>🎯 Desarrollo Integration Testing (15 min):</h3>
        <p>1. Configura entorno dual con web browser y mobile device</p>
        <p>2. Implementa authentication sync entre plataformas</p>
        <p>3. Desarrolla data synchronization bidireccional</p>
        <p>4. Agrega real-time notifications cross-platform</p>
        <p>5. Implementa offline sync capability testing</p>
        <p>6. Desarrolla API consistency validation</p>
        <p>7. Agrega cross-platform shopping cart sync</p>
        <p>8. Implementa user preferences synchronization</p>
        <p>9. Desarrolla performance testing comparativo</p>
        <p>10. Agrega responsive design validation</p>
        <p>11. Implementa deep linking testing</p>
        <p>12. Desarrolla push notifications integration</p>
        <p>13. Agrega biometric authentication sync</p>
        <p>14. Implementa location services testing</p>
        <p>15. Desarrolla camera integration validation</p>
        <p>16. Agrega file upload/download sync</p>
        <p>17. Implementa payment methods consistency</p>
        <p>18. Desarrolla accessibility testing cross-platform</p>
        <p>19. Agrega security validation integration</p>
        <p>20. Implementa analytics tracking consistency</p>
        <p>21. Desarrolla error handling synchronization</p>
        <p>22. Agrega version compatibility testing</p>
        <p>23. Implementa A/B testing cross-platform</p>
        <p>24. Testa suite completa con usuarios reales</p>
        <p>25. Valida user experience consistency</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Desarrollar testing integrado mobile + web completo</li>
                <li>Validar sincronización de datos en tiempo real</li>
                <li>Implementar testing de experiencia consistente</li>
                <li>Crear suite para aplicaciones omnichannel</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Integration exitosa: Authentication Sync + Data Sync + Real-time Notifications + Offline Capability = experiencia omnichannel seamless para usuarios.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 249 - Enterprise CI/CD pipeline</h3>
        <p>Con mobile + web integration dominada, construirás pipelines CI/CD enterprise completos con deployment automation y quality gates avanzados.</p>
    `,
    topics: ["capstone", "mobile", "web"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 20,
    difficulty: "easy",
    prerequisites: ["lesson-247"],
    type: "capstone"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_248 = LESSON_248;
}