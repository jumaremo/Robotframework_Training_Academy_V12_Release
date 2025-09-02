/**
 * Robot Framework Academy - Lesson 112
 * Browser automation avanzado
 */

const LESSON_112 = {
    id: 112,
    title: "Interacciones Avanzadas 112",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>🔧 Browser automation avanzado</h2>
        <p>Técnicas avanzadas de automatización, manipulación de cookies, session storage y browser developer tools.</p>
        
        <h3>💻 Tests Automation Avanzado:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com
\${BROWSER}            chrome
\${COOKIE_NAME}        session_token
\${COOKIE_VALUE}       abc123xyz
\${STORAGE_KEY}        user_preferences
\${STORAGE_VALUE}      {"theme":"dark","lang":"es"}
\${CACHE_URL}          https://ejemplo.com/api/cache
\${GEOLOCATION_LAT}    40.7128
\${GEOLOCATION_LON}    -74.0060

*** Test Cases ***
Test Cookie Management
    Open Browser              \${URL}        \${BROWSER}
    Add Cookie                \${COOKIE_NAME}    \${COOKIE_VALUE}
    \${cookie}=          Get Cookie    \${COOKIE_NAME}
    Should Be Equal           \${cookie.value}    \${COOKIE_VALUE}
    Delete Cookie             \${COOKIE_NAME}
    \${deleted_cookie}=  Get Cookie    \${COOKIE_NAME}
    Should Be Equal           \${deleted_cookie}    \${None}
    Execute JavaScript        document.cookie = 'test_cookie=value123; path=/'
    \${js_cookie}=       Get Cookie    test_cookie
    Should Be Equal           \${js_cookie.value}    value123
    Delete All Cookies
    \${all_cookies}=     Get Cookies
    Should Be Empty           \${all_cookies}
    Close Browser

Test Session Storage
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        sessionStorage.setItem('\${STORAGE_KEY}', '\${STORAGE_VALUE}')
    \${stored_value}=    Execute JavaScript    return sessionStorage.getItem('\${STORAGE_KEY}')
    Should Be Equal           \${stored_value}    \${STORAGE_VALUE}
    Execute JavaScript        sessionStorage.setItem('temp_data', 'test123')
    \${temp_data}=       Execute JavaScript    return sessionStorage.getItem('temp_data')
    Should Be Equal           \${temp_data}    test123
    Execute JavaScript        sessionStorage.removeItem('temp_data')
    \${removed_data}=    Execute JavaScript    return sessionStorage.getItem('temp_data')
    Should Be Equal           \${removed_data}    \${None}
    Execute JavaScript        sessionStorage.clear()
    \${storage_length}=  Execute JavaScript    return sessionStorage.length
    Should Be Equal As Numbers    \${storage_length}    0
    Close Browser

Test Local Storage Advanced
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        localStorage.setItem('app_config', '{"version":"1.0","enabled":true}')
    \${config}=          Execute JavaScript    return JSON.parse(localStorage.getItem('app_config'))
    Should Be Equal           \${config}[version]    1.0
    Should Be True            \${config}[enabled]
    Execute JavaScript        localStorage.setItem('user_data', JSON.stringify({name: 'TestUser', id: 123}))
    \${user_name}=       Execute JavaScript    return JSON.parse(localStorage.getItem('user_data')).name
    Should Be Equal           \${user_name}    TestUser
    \${storage_keys}=    Execute JavaScript    return Object.keys(localStorage)
    Should Contain            \${storage_keys}    app_config
    Should Contain            \${storage_keys}    user_data
    Close Browser

Test Cache Management
    Open Browser              \${URL}        \${BROWSER}
    Go To                     \${CACHE_URL}
    \${cache_status}=    Execute JavaScript    return caches !== undefined
    Should Be True            \${cache_status}
    Execute JavaScript        
    ...    caches.open('test-cache').then(cache => {
    ...        cache.add('/api/data');
    ...        window.cacheAdded = true;
    ...    });
    Sleep                     2s
    \${cache_added}=     Execute JavaScript    return window.cacheAdded || false
    Should Be True            \${cache_added}
    Execute JavaScript        
    ...    caches.delete('test-cache').then(result => {
    ...        window.cacheDeleted = result;
    ...    });
    Sleep                     1s
    \${cache_deleted}=   Execute JavaScript    return window.cacheDeleted || false
    Should Be True            \${cache_deleted}
    Close Browser

Test Geolocation Mocking
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        
    ...    navigator.geolocation.getCurrentPosition = function(success) {
    ...        success({coords: {latitude: \${GEOLOCATION_LAT}, longitude: \${GEOLOCATION_LON}}});
    ...    };
    Click Button              id=get-location
    Wait Until Page Contains  ubicación obtenida
    \${latitude}=        Execute JavaScript    return window.currentLocation ? window.currentLocation.latitude : null
    Should Be Equal As Numbers    \${latitude}    \${GEOLOCATION_LAT}
    \${longitude}=       Execute JavaScript    return window.currentLocation ? window.currentLocation.longitude : null
    Should Be Equal As Numbers    \${longitude}    \${GEOLOCATION_LON}
    Page Should Contain       Nueva York
    Close Browser

Test Browser Preferences
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        
    ...    Object.defineProperty(navigator, 'language', {value: 'es-ES', configurable: true});
    \${browser_lang}=    Execute JavaScript    return navigator.language
    Should Be Equal           \${browser_lang}    es-ES
    Execute JavaScript        
    ...    Object.defineProperty(screen, 'width', {value: 1920, configurable: true});
    \${screen_width}=    Execute JavaScript    return screen.width
    Should Be Equal As Numbers    \${screen_width}    1920
    Execute JavaScript        window.devicePixelRatio = 2
    \${pixel_ratio}=     Execute JavaScript    return window.devicePixelRatio
    Should Be Equal As Numbers    \${pixel_ratio}    2
    Page Should Contain       configuración aplicada
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Automation Avanzado (5 min):</h3>
        <p>1. Usa Add Cookie para crear cookie de sesión</p>
        <p>2. Verifica cookie con Get Cookie y valida valor</p>
        <p>3. Elimina cookie específica con Delete Cookie</p>
        <p>4. Usa Delete All Cookies para limpiar todas</p>
        <p>5. Manipula sessionStorage con Execute JavaScript</p>
        <p>6. Almacena y recupera objetos JSON en sessionStorage</p>
        <p>7. Usa localStorage para datos persistentes</p>
        <p>8. Parsea JSON desde localStorage con JSON.parse</p>
        <p>9. Obtén todas las keys de localStorage</p>
        <p>10. Implementa cache management con caches API</p>
        <p>11. Agrega y elimina entradas de cache</p>
        <p>12. Mockea geolocation con coordenadas específicas</p>
        <p>13. Verifica que ubicación mockeada funciona</p>
        <p>14. Modifica navigator.language para testing i18n</p>
        <p>15. Cambia screen properties para responsive testing</p>
        <p>16. Ajusta devicePixelRatio para high-DPI testing</p>
        <p>17. Combina storage con validación de página</p>
        <p>18. Usa Sleep para esperar operaciones asíncronas</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Manipular cookies avanzadas y session management</li>
                <li>Manejar localStorage y sessionStorage complejos</li>
                <li>Implementar cache management y mocking APIs</li>
                <li>Controlar browser preferences y device properties</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa JSON.stringify/parse para objetos complejos en storage. Mockea APIs del browser para testing consistente sin dependencias externas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 113 - Browser security testing</h3>
        <p>Aprenderás a probar aspectos de seguridad del navegador, CSP headers, XSS protection y vulnerabilidades comunes.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-111"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_112 = LESSON_112;
}