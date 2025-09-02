/**
 * Robot Framework Academy - Lesson 117
 * PWA testing
 */

const LESSON_117 = {
    id: 117,
    title: "Interacciones Avanzadas 117",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>📱 PWA testing</h2>
        <p>Probar Progressive Web Apps, service workers, offline functionality y app manifest testing.</p>
        
        <h3>💻 Tests PWA:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://pwa.ejemplo.com
\${BROWSER}            chrome
\${MANIFEST_URL}       /manifest.json
\${SW_URL}             /service-worker.js
\${OFFLINE_PAGE}       /offline.html
\${CACHE_NAME}         pwa-cache-v1
\${APP_NAME}           Mi PWA App
\${INSTALL_PROMPT}     css=.install-prompt

*** Test Cases ***
Test PWA Manifest
    Open Browser              \${URL}        \${BROWSER}
    \${manifest_link}=   Execute JavaScript    return document.querySelector('link[rel="manifest"]').href
    Should Contain            \${manifest_link}    \${MANIFEST_URL}
    Go To                     \${manifest_link}
    \${manifest_content}= Get Source
    Should Contain            \${manifest_content}    "name"
    Should Contain            \${manifest_content}    "icons"
    Should Contain            \${manifest_content}    "start_url"
    \${manifest_json}=   Execute JavaScript    return fetch('\${MANIFEST_URL}').then(r => r.json())
    Sleep                     2s
    \${app_name}=        Execute JavaScript    return window.manifestData ? window.manifestData.name : null
    Should Not Be Empty       \${app_name}
    Go Back
    Close Browser

Test Service Worker
    Open Browser              \${URL}        \${BROWSER}
    \${sw_support}=      Execute JavaScript    return 'serviceWorker' in navigator
    Should Be True            \${sw_support}
    \${sw_registration}= Execute JavaScript    
    ...    return navigator.serviceWorker.getRegistration().then(reg => reg ? reg.scope : null)
    Sleep                     3s
    \${sw_scope}=        Execute JavaScript    return window.swScope || null
    Should Not Be Empty       \${sw_scope}
    \${sw_state}=        Execute JavaScript    
    ...    return navigator.serviceWorker.controller ? navigator.serviceWorker.controller.state : null
    Should Be Equal           \${sw_state}    activated
    Page Should Contain       service worker activo
    Close Browser

Test Offline Functionality
    Open Browser              \${URL}        \${BROWSER}
    Wait Until Page Contains  aplicación cargada
    Click Link                Ir a Sección 2
    Page Should Contain       sección 2 cargada
    Execute JavaScript        
    ...    if (navigator.serviceWorker.controller) {
    ...        navigator.serviceWorker.controller.postMessage({type: 'SIMULATE_OFFLINE'});
    ...    }
    Sleep                     2s
    Click Link                Ir a Sección 3
    Wait Until Page Contains  contenido offline    timeout=10s
    Page Should Contain       funcionando sin conexión
    \${cache_status}=    Execute JavaScript    
    ...    return caches.has('\${CACHE_NAME}').then(exists => exists)
    Sleep                     1s
    \${cache_exists}=    Execute JavaScript    return window.cacheExists || false
    Should Be True            \${cache_exists}
    Close Browser

Test Install Prompt
    Open Browser              \${URL}        \${BROWSER}
    \${install_event}=   Execute JavaScript    
    ...    window.installPromptEvent = null;
    ...    window.addEventListener('beforeinstallprompt', (e) => {
    ...        e.preventDefault();
    ...        window.installPromptEvent = e;
    ...        return false;
    ...    });
    ...    return true;
    Sleep                     3s
    \${prompt_available}= Execute JavaScript    return window.installPromptEvent !== null
    Run Keyword If            \${prompt_available}    Element Should Be Visible    \${INSTALL_PROMPT}
    Run Keyword If            \${prompt_available}    Click Element    \${INSTALL_PROMPT}
    Run Keyword If            \${prompt_available}    Wait Until Page Contains    instalación iniciada
    \${install_supported}= Execute JavaScript    return window.installPromptEvent ? true : false
    Log                       Install prompt supported: \${install_supported}
    Close Browser

Test Push Notifications
    Open Browser              \${URL}        \${BROWSER}
    \${notification_support}= Execute JavaScript    return 'Notification' in window
    Should Be True            \${notification_support}
    Execute JavaScript        
    ...    Notification.requestPermission().then(permission => {
    ...        window.notificationPermission = permission;
    ...    });
    Sleep                     2s
    Click Button              id=enable-notifications
    \${permission}=      Execute JavaScript    return Notification.permission
    Should Be Equal           \${permission}    granted
    Click Button              id=send-test-notification
    Sleep                     1s
    \${notification_sent}= Execute JavaScript    return window.testNotificationSent || false
    Should Be True            \${notification_sent}
    Page Should Contain       notificación enviada
    Close Browser

Test PWA Performance
    \${start_time}=      Get Time    epoch
    Open Browser              \${URL}        \${BROWSER}
    Wait Until Page Contains  app cargada
    \${end_time}=        Get Time    epoch
    \${load_time}=       Evaluate    \${end_time} - \${start_time}
    Should Be True            \${load_time} < 3
    \${performance_data}= Execute JavaScript    
    ...    return {
    ...        fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
    ...        lcp: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime
    ...    };
    Sleep                     1s
    \${fcp_time}=        Execute JavaScript    return window.performanceData ? window.performanceData.fcp : null
    Run Keyword If            \${fcp_time}    Should Be True    \${fcp_time} < 2000
    \${pwa_score}=       Execute JavaScript    
    ...    return navigator.serviceWorker.controller && 
    ...           document.querySelector('link[rel="manifest"]') ? 100 : 50
    Should Be True            \${pwa_score} >= 50
    Close Browser</code></pre>
        
        <h3>🎯 Práctica PWA (5 min):</h3>
        <p>1. Verifica que manifest.json está linkeado correctamente</p>
        <p>2. Usa Execute JavaScript para verificar service worker support</p>
        <p>3. Valida que service worker está registrado y activo</p>
        <p>4. Testa funcionalidad offline simulando desconexión</p>
        <p>5. Verifica que cache existe con caches.has()</p>
        <p>6. Implementa testing de install prompt</p>
        <p>7. Usa beforeinstallprompt event listener</p>
        <p>8. Valida que app se puede instalar</p>
        <p>9. Testa push notifications support</p>
        <p>10. Usa Notification.requestPermission() para permisos</p>
        <p>11. Verifica que notificaciones se envían correctamente</p>
        <p>12. Mide performance específica de PWA</p>
        <p>13. Usa performance API para First Contentful Paint</p>
        <p>14. Valida Largest Contentful Paint timing</p>
        <p>15. Verifica que app cumple criterios PWA básicos</p>
        <p>16. Testa que manifest contiene campos requeridos</p>
        <p>17. Valida que service worker maneja rutas offline</p>
        <p>18. Combina PWA testing con performance benchmarks</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Validar manifest.json y criterios PWA</li>
                <li>Probar service workers y funcionalidad offline</li>
                <li>Implementar testing de install prompts</li>
                <li>Verificar push notifications y performance</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>PWAs requieren HTTPS, manifest válido y service worker activo. Usa beforeinstallprompt para detectar installability.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 118 - WebRTC testing</h3>
        <p>Aprenderás a probar aplicaciones WebRTC, video calls, screen sharing y peer-to-peer connections.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-116"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_117 = LESSON_117;
}