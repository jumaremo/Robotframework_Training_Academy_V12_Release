/**
 * Robot Framework Academy - Lesson 105
 * Windows y tabs
 */

const LESSON_105 = {
    id: 105,
    title: "Interacciones Avanzadas 105",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>🪟 Windows tabs</h2>
        <p>Manejar múltiples ventanas del navegador, cambiar entre tabs y automatizar aplicaciones multi-window.</p>
        
        <h3>💻 Tests Windows:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com
\${BROWSER}            chrome
\${NEW_WINDOW_URL}     https://ejemplo.com/nuevo
\${POPUP_URL}          https://ejemplo.com/popup
\${TARGET_BLANK}       _blank
\${MAIN_TITLE}         Página Principal
\${NEW_TITLE}          Nueva Ventana

*** Test Cases ***
Test Nueva Ventana
    Open Browser              \${URL}        \${BROWSER}
    Click Link                target=\${TARGET_BLANK}    Abrir Nueva Ventana
    \${windows}=    Get Window Handles
    Length Should Be          \${windows}    2
    Switch Window             NEW
    Title Should Be           \${NEW_TITLE}
    Page Should Contain       ventana nueva
    Input Text                id=search      test query
    Click Button              Buscar
    Page Should Contain       resultados
    Switch Window             MAIN
    Title Should Be           \${MAIN_TITLE}
    Close Browser

Test Múltiples Tabs
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        window.open('\${NEW_WINDOW_URL}', '_blank')
    Execute JavaScript        window.open('\${POPUP_URL}', '_blank')
    \${handles}=    Get Window Handles
    Length Should Be          \${handles}    3
    Switch Window             \${handles}[1]
    Page Should Contain       segunda pestaña
    Input Text                name=username  user2
    Switch Window             \${handles}[2]
    Page Should Contain       tercera pestaña
    Click Element             id=action-btn
    Switch Window             \${handles}[0]
    Page Should Contain       pestaña original
    Close Browser

Test Window Titles
    Open Browser              \${URL}        \${BROWSER}
    Click Link                Abrir Popup
    \${titles}=    Get Window Titles
    Should Contain            \${titles}    \${MAIN_TITLE}
    Should Contain            \${titles}    Popup Window
    Switch Window             title=Popup Window
    Page Should Contain       contenido popup
    Close Window
    \${remaining}=    Get Window Titles
    Length Should Be          \${remaining}    1
    Should Contain            \${remaining}    \${MAIN_TITLE}
    Close Browser

Test Window JavaScript
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        var newWin = window.open('', '_blank'); newWin.document.write('<h1>JS Window</h1>');
    \${windows}=    Get Window Handles
    Switch Window             NEW
    Page Should Contain       JS Window
    Execute JavaScript        window.resizeTo(800, 600)
    Execute JavaScript        window.moveTo(100, 100)
    \${size}=    Execute JavaScript    return [window.outerWidth, window.outerHeight]
    Should Be True            \${size}[0] <= 800
    Close Window
    Switch Window             MAIN
    Page Should Contain       ventana principal
    Close Browser

Test Popup Handling
    Open Browser              \${URL}        \${BROWSER}
    Click Button              id=open-popup
    \${handles}=    Get Window Handles
    Switch Window             \${handles}[1]
    Wait Until Page Contains  popup cargado
    Input Text                id=popup-input    datos popup
    Click Button              Confirmar
    Page Should Contain       confirmado
    \${result}=    Get Text    id=popup-result
    Should Not Be Empty       \${result}
    Close Window
    Switch Window             MAIN
    Wait Until Page Contains  popup cerrado
    Close Browser

Test Window Focus
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        window.open('\${NEW_WINDOW_URL}', 'ventana1')
    Execute JavaScript        window.open('\${POPUP_URL}', 'ventana2')
    Switch Window             ventana1
    Execute JavaScript        window.focus()
    Page Should Contain       ventana enfocada
    Input Text                css=input[type='text']    texto1
    Switch Window             ventana2
    Execute JavaScript        window.focus()
    Page Should Contain       segunda ventana
    Input Text                css=input[type='email']    test@test.com
    Switch Window             MAIN
    Page Should Contain       ventana original
    Close All Windows
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Windows (5 min):</h3>
        <p>1. Abre nueva ventana con Click Link target="_blank"</p>
        <p>2. Usa Get Window Handles para obtener lista de ventanas</p>
        <p>3. Cambia entre ventanas con Switch Window NEW/MAIN</p>
        <p>4. Verifica títulos de ventanas con Get Window Titles</p>
        <p>5. Ejecuta acciones en ventana específica</p>
        <p>6. Usa Execute JavaScript para abrir múltiples tabs</p>
        <p>7. Navega entre tabs usando handles por index</p>
        <p>8. Cierra ventanas específicas con Close Window</p>
        <p>9. Maneja popups y ventanas emergentes</p>
        <p>10. Usa Switch Window con títulos específicos</p>
        <p>11. Controla tamaño y posición de ventanas con JavaScript</p>
        <p>12. Verifica que ventanas se abren correctamente</p>
        <p>13. Implementa comunicación entre ventanas</p>
        <p>14. Usa Wait Until para contenido que carga en nuevas ventanas</p>
        <p>15. Maneja focus de ventanas con JavaScript</p>
        <p>16. Valida que datos se mantienen entre cambios de ventana</p>
        <p>17. Usa Close All Windows para limpieza</p>
        <p>18. Combina manejo de ventanas con formularios complejos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Manejar múltiples ventanas y tabs del navegador</li>
                <li>Cambiar eficientemente entre contextos de ventana</li>
                <li>Controlar popups y ventanas emergentes</li>
                <li>Usar JavaScript para manipular propiedades de ventana</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Get Window Handles y guarda en variable para navegar por index. Switch Window NEW/MAIN es más simple que usar handles específicos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 106 - Alerts y confirmaciones</h3>
        <p>Aprenderás a manejar diferentes tipos de alerts JavaScript, confirmaciones y prompts del navegador.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-104"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_105 = LESSON_105;
}