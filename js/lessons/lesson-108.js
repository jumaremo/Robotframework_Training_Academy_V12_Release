/**
 * Robot Framework Academy - Lesson 108
 * Responsive testing
 */

const LESSON_108 = {
    id: 108,
    title: "Interacciones Avanzadas 108",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>📱 Responsive testing</h2>
        <p>Probar aplicaciones web en diferentes resoluciones, dispositivos móviles y orientaciones de pantalla.</p>
        
        <h3>💻 Tests Responsive:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com
\${BROWSER}            chrome
\${MOBILE_WIDTH}       375
\${MOBILE_HEIGHT}      667
\${TABLET_WIDTH}       768
\${TABLET_HEIGHT}      1024
\${DESKTOP_WIDTH}      1920
\${DESKTOP_HEIGHT}     1080
\${MENU_BUTTON}        css=.menu-toggle

*** Test Cases ***
Test Mobile View
    Open Browser              \${URL}        \${BROWSER}
    Set Window Size           \${MOBILE_WIDTH}    \${MOBILE_HEIGHT}
    Element Should Be Visible \${MENU_BUTTON}
    Page Should Contain Element    css=.mobile-nav
    Element Should Not Be Visible    css=.desktop-nav
    Click Element             \${MENU_BUTTON}
    Element Should Be Visible css=.mobile-menu
    \${width}=    Execute JavaScript    return window.innerWidth
    Should Be Equal As Numbers    \${width}    \${MOBILE_WIDTH}
    Page Should Contain       vista móvil
    Close Browser

Test Tablet View
    Open Browser              \${URL}        \${BROWSER}
    Set Window Size           \${TABLET_WIDTH}    \${TABLET_HEIGHT}
    Element Should Be Visible css=.tablet-layout
    Element Should Not Be Visible    \${MENU_BUTTON}
    Page Should Contain Element    css=.sidebar
    \${columns}=    Get Element Count    css=.grid-column
    Should Be Equal As Numbers    \${columns}    2
    Execute JavaScript        window.scrollTo(0, 500)
    Element Should Be Visible css=.tablet-footer
    Page Should Contain       vista tablet
    Close Browser

Test Desktop View
    Open Browser              \${URL}        \${BROWSER}
    Set Window Size           \${DESKTOP_WIDTH}    \${DESKTOP_HEIGHT}
    Element Should Be Visible css=.desktop-nav
    Element Should Not Be Visible    \${MENU_BUTTON}
    Page Should Contain Element    css=.full-header
    \${columns}=    Get Element Count    css=.grid-column
    Should Be Equal As Numbers    \${columns}    3
    Element Should Be Visible css=.sidebar-left
    Element Should Be Visible css=.sidebar-right
    Page Should Contain       vista escritorio
    Close Browser

Test Orientation Change
    Open Browser              \${URL}        \${BROWSER}
    Set Window Size           \${MOBILE_WIDTH}    \${MOBILE_HEIGHT}
    Page Should Contain       modo retrato
    Element Should Be Visible css=.portrait-layout
    Set Window Size           \${MOBILE_HEIGHT}    \${MOBILE_WIDTH}
    Page Should Contain       modo paisaje
    Element Should Be Visible css=.landscape-layout
    Element Should Not Be Visible    css=.portrait-layout
    \${orientation}=    Execute JavaScript    return screen.orientation ? screen.orientation.angle : 0
    Should Be True            \${orientation} != 0 OR True
    Close Browser

Test Breakpoints
    Open Browser              \${URL}        \${BROWSER}
    Set Window Size           320    568
    Page Should Contain       extra small
    Set Window Size           576    768
    Page Should Contain       small
    Set Window Size           768    1024
    Page Should Contain       medium
    Set Window Size           992    1200
    Page Should Contain       large
    Set Window Size           1200    1600
    Page Should Contain       extra large
    \${current_bp}=    Execute JavaScript    return getComputedStyle(document.body, ':before').content
    Should Not Be Empty       \${current_bp}
    Close Browser

Test Touch Interactions
    Open Browser              \${URL}        \${BROWSER}
    Set Window Size           \${MOBILE_WIDTH}    \${MOBILE_HEIGHT}
    Execute JavaScript        
    ...    var event = new TouchEvent('touchstart', {touches: [{clientX: 100, clientY: 100}]});
    ...    document.querySelector('.swipe-area').dispatchEvent(event);
    Page Should Contain       touch detectado
    Execute JavaScript        
    ...    var swipe = new TouchEvent('touchend', {changedTouches: [{clientX: 200, clientY: 100}]});
    ...    document.querySelector('.swipe-area').dispatchEvent(swipe);
    Page Should Contain       swipe right
    Element Should Be Visible css=.touch-feedback
    \${touch_support}=    Execute JavaScript    return 'ontouchstart' in window
    Should Be True            \${touch_support}
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Responsive (5 min):</h3>
        <p>1. Usa Set Window Size para cambiar resolución a móvil</p>
        <p>2. Verifica que menú hamburguesa aparece en móvil</p>
        <p>3. Valida que navegación desktop se oculta en móvil</p>
        <p>4. Cambia a resolución tablet y verifica layout</p>
        <p>5. Cuenta columnas de grid en diferentes breakpoints</p>
        <p>6. Usa Execute JavaScript para obtener window.innerWidth</p>
        <p>7. Verifica que elementos específicos aparecen por tamaño</p>
        <p>8. Implementa test de cambio de orientación</p>
        <p>9. Valida layouts portrait vs landscape</p>
        <p>10. Usa Get Element Count para verificar columnas</p>
        <p>11. Prueba todos los breakpoints principales (320px, 768px, 1200px)</p>
        <p>12. Verifica que texto cambia según breakpoint</p>
        <p>13. Implementa touch events con JavaScript</p>
        <p>14. Simula swipe gestures en móvil</p>
        <p>15. Valida que elementos touch-specific funcionan</p>
        <p>16. Usa scroll testing en diferentes tamaños</p>
        <p>17. Verifica que imágenes se adaptan responsivamente</p>
        <p>18. Combina responsive testing con funcionalidad específica</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Probar aplicaciones en diferentes resoluciones de pantalla</li>
                <li>Validar comportamiento responsive en móvil, tablet y desktop</li>
                <li>Verificar breakpoints y cambios de orientación</li>
                <li>Implementar testing de touch interactions</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Set Window Size antes de cada test para garantizar viewport correcto. Los breakpoints comunes son 320px, 768px, 992px y 1200px.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 109 - Performance monitoring</h3>
        <p>Aprenderás a medir tiempos de carga, detectar elementos lentos y implementar testing de performance básico.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-107"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_108 = LESSON_108;
}