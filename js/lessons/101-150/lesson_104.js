/**
 * Robot Framework Academy - Lesson 104
 * Frames e iframes
 */

const LESSON_104 = {
    id: 104,
    title: "Interacciones Avanzadas 104",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>🖼️ Frames iframes</h2>
        <p>Navegar entre frames, manejar iframes anidados y automatizar contenido dentro de frames.</p>
        
        <h3>💻 Tests Frames:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com/frames
\${BROWSER}            chrome
\${MAIN_FRAME}         name=mainFrame
\${SIDE_FRAME}         id=sideFrame
\${NESTED_FRAME}       xpath=//iframe[@class='nested']
\${FORM_FRAME}         index=0
\${UPLOAD_FRAME}       css=iframe[src*='upload']
\${BUTTON_TEXT}        Enviar Formulario

*** Test Cases ***
Test Frame Básico
    Open Browser              \${URL}        \${BROWSER}
    Select Frame              \${MAIN_FRAME}
    Page Should Contain       contenido principal
    Input Text                id=username    testuser
    Input Text                id=password    test123
    Click Button              \${BUTTON_TEXT}
    Page Should Contain       login exitoso
    Unselect Frame
    Page Should Contain       página principal
    Close Browser

Test Multiple Frames
    Open Browser              \${URL}        \${BROWSER}
    Select Frame              \${MAIN_FRAME}
    Page Should Contain       frame principal
    Click Link                navegación
    Unselect Frame
    Select Frame              \${SIDE_FRAME}
    Page Should Contain       menú lateral
    Click Element             id=menu-item-1
    Page Should Contain       opción seleccionada
    Unselect Frame
    Page Should Contain       frames cargados
    Close Browser

Test Iframe Anidado
    Open Browser              \${URL}        \${BROWSER}
    Select Frame              \${MAIN_FRAME}
    Select Frame              \${NESTED_FRAME}
    Page Should Contain       frame anidado
    Input Text                name=data      valor test
    Click Button              id=submit-nested
    Wait Until Page Contains  datos guardados
    Page Should Contain       confirmación anidada
    Unselect Frame
    Unselect Frame
    Page Should Contain       nivel principal
    Close Browser

Test Frame Por Index
    Open Browser              \${URL}        \${BROWSER}
    Select Frame              \${FORM_FRAME}
    Element Should Be Visible id=form-container
    Input Text                css=input[type='text']    usuario123
    Input Password            css=input[type='password']    clave456
    Select From List By Label select[name='role']    Administrador
    Click Button              css=button[type='submit']
    Wait Until Page Contains  formulario enviado
    Unselect Frame
    Page Should Contain       proceso completado
    Close Browser

Test Frame JavaScript
    Open Browser              \${URL}        \${BROWSER}
    Select Frame              \${MAIN_FRAME}
    Execute JavaScript        document.getElementById('dynamic-btn').click()
    Wait Until Element Is Visible    id=result
    \${result}=    Get Text    id=result
    Should Contain            \${result}    acción ejecutada
    Execute JavaScript        window.parent.postMessage('test', '*')
    Unselect Frame
    Wait Until Page Contains  mensaje recibido
    Page Should Contain       comunicación frame
    Close Browser

Test Frame Upload
    Open Browser              \${URL}        \${BROWSER}
    Select Frame              \${UPLOAD_FRAME}
    Page Should Contain       área de upload
    Choose File               input[type='file']    \${CURDIR}/test.txt
    Click Button              id=upload-btn
    Wait Until Page Contains  archivo subido
    \${filename}=    Get Text    id=uploaded-file
    Should Be Equal           \${filename}    test.txt
    Unselect Frame
    Page Should Contain       upload completado
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Frames (5 min):</h3>
        <p>1. Usa Select Frame para entrar a frame principal</p>
        <p>2. Verifica contenido dentro del frame con Page Should Contain</p>
        <p>3. Ejecuta acciones dentro del frame (click, input)</p>
        <p>4. Usa Unselect Frame para volver al contexto principal</p>
        <p>5. Navega entre múltiples frames en la misma página</p>
        <p>6. Maneja frames anidados con Select Frame doble</p>
        <p>7. Usa frame por index cuando no tiene name/id</p>
        <p>8. Verifica que elementos solo existen dentro del frame</p>
        <p>9. Usa Execute JavaScript dentro de frames</p>
        <p>10. Implementa comunicación entre frames con postMessage</p>
        <p>11. Maneja uploads dentro de iframes</p>
        <p>12. Usa Wait Until para elementos que cargan en frames</p>
        <p>13. Verifica que cambios de frame afectan contexto</p>
        <p>14. Combina frames con formularios complejos</p>
        <p>15. Usa Get Text para extraer datos de frames</p>
        <p>16. Implementa validación de contenido específico de frame</p>
        <p>17. Maneja frames que cargan dinámicamente</p>
        <p>18. Practica secuencia completa: Select → Action → Unselect</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Navegar eficientemente entre frames e iframes</li>
                <li>Manejar frames anidados y contextos múltiples</li>
                <li>Ejecutar acciones específicas dentro de frames</li>
                <li>Implementar comunicación entre frames con JavaScript</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Siempre usa Unselect Frame para volver al contexto principal. Los frames anidados requieren múltiples Select Frame para navegar profundo.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 105 - Windows y tabs</h3>
        <p>Aprenderás a manejar múltiples ventanas del navegador, cambiar entre tabs y automatizar aplicaciones multi-window.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-103"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_104 = LESSON_104;
}