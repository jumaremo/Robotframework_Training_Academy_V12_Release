/**
 * Robot Framework Academy - Lesson 072
 * Interacciones básicas con elementos
 */

const LESSON_072 = {
    id: 72,
    title: "Interacciones básicas con elementos",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Interacciones Web</h2>
        <p>Domina las interacciones fundamentales: clicks, escritura, selecciones, teclas especiales y verificaciones de estado de elementos.</p>
        
        <h3>💻 Interacciones esenciales:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}             https://formulario-demo.com
\${BROWSER}         chrome
\${NOMBRE}          Juan Pérez
\${EMAIL}           juan@test.com
\${TELEFONO}        555-0123
\${MENSAJE}         Mensaje de prueba automatizada
\${PAIS}            España
\${CIUDAD}          Madrid
\${ARCHIVO}         C:/test/documento.pdf

*** Test Cases ***
Test Click Interactions
    Open Browser                    \${URL}                              \${BROWSER}
    Click Element                   id=menu-toggle
    Element Should Be Visible       css=.navigation-menu
    Click Button                    css=.primary-btn
    Element Should Contain          css=.status-message                 activado
    Click Link                      Contacto
    Page Should Contain             formulario
    Double Click Element            css=.double-click-area
    Element Should Be Visible       css=.double-click-result
    Click Element At Coordinates    css=.clickable-map                  100    50
    Close Browser

Test Input Text Interactions
    Open Browser                    \${URL}                              \${BROWSER}
    Input Text                      id=nombre                           \${NOMBRE}
    Element Should Contain          id=nombre                           \${NOMBRE}
    Input Text                      css=input[name='email']             \${EMAIL}
    Element Should Be Visible       css=.email-validation
    Input Password                  id=password                         secreto123
    Element Should Contain          css=.password-strength              fuerte
    Clear Element Text              id=nombre
    Element Should Not Contain      id=nombre                           \${NOMBRE}
    Input Text                      id=nombre                           \${NOMBRE}
    Close Browser

Test Selection Interactions
    Open Browser                    \${URL}                              \${BROWSER}
    Select From List By Label       id=pais                             \${PAIS}
    Element Should Contain          id=pais                             \${PAIS}
    Select From List By Value       css=select[name='ciudad']           madrid
    Element Should Be Visible       css=.ciudad-selected
    Select From List By Index       id=categoria                        2
    Element Should Contain          css=.categoria-display              seleccionada
    Select Checkbox                 id=newsletter
    Checkbox Should Be Selected     id=newsletter
    Unselect Checkbox              id=promociones
    Checkbox Should Not Be Selected id=promociones
    Close Browser

Test Radio Button Interactions
    Open Browser                    \${URL}                              \${BROWSER}
    Select Radio Button             genero                              masculino
    Element Should Be Visible       css=.genero-masculino
    Select Radio Button             edad                                25-35
    Element Should Contain          css=.edad-display                   25-35
    Radio Button Should Be Set To   genero                              masculino
    Radio Button Should Not Be Set To edad                             18-25
    Select Radio Button             preferencia                         email
    Element Should Be Visible       css=.contacto-email
    Close Browser

Test Keyboard Interactions
    Open Browser                    \${URL}                              \${BROWSER}
    Input Text                      id=busqueda                         Robot Framework
    Press Keys                      id=busqueda                         CTRL+a
    Press Keys                      id=busqueda                         DELETE
    Element Should Not Contain      id=busqueda                         Robot
    Press Keys                      id=busqueda                         Testing Automation
    Press Keys                      id=busqueda                         RETURN
    Element Should Be Visible       css=.search-results
    Press Keys                      css=.textarea-comentarios           \${MENSAJE}
    Element Should Contain          css=.textarea-comentarios           \${MENSAJE}
    Close Browser

Test Mouse Actions
    Open Browser                    \${URL}                              \${BROWSER}
    Mouse Over                      css=.hover-menu
    Element Should Be Visible       css=.submenu-items
    Mouse Down                      css=.draggable-item
    Element Should Contain          css=.drag-status                    arrastrando
    Mouse Up                        css=.drop-zone
    Element Should Be Visible       css=.drop-success
    Mouse Over                      id=tooltip-trigger
    Element Should Be Visible       css=.tooltip-content
    Mouse Out                       id=tooltip-trigger
    Element Should Not Be Visible   css=.tooltip-content
    Close Browser

Test File Upload Interactions
    Open Browser                    \${URL}                              \${BROWSER}
    Choose File                     id=archivo-upload                   \${ARCHIVO}
    Element Should Contain          css=.file-name                     documento.pdf
    Element Should Be Visible       css=.upload-preview
    Click Button                    css=.upload-btn
    Element Should Contain          css=.upload-status                  exitoso
    Element Should Be Visible       css=.file-uploaded
    Choose File                     css=input[type='file'][multiple]   \${ARCHIVO}
    Element Should Contain          css=.files-count                   1 archivo
    Close Browser</code></pre>
        
        <h3>🎯 Práctica interacciones (5 min):</h3>
        <p>1. Practica Click Element vs Click Button diferencias</p>
        <p>2. Usa Input Text con verificación Element Should Contain</p>
        <p>3. Combina Clear Element Text + Input Text secuencia</p>
        <p>4. Experimenta Select From List By Label/Value/Index</p>
        <p>5. Practica Select Checkbox + Checkbox Should Be Selected</p>
        <p>6. Usa Select Radio Button + Radio Button Should Be Set To</p>
        <p>7. Combina Press Keys con CTRL+a, DELETE, RETURN</p>
        <p>8. Experimenta Mouse Over + Element Should Be Visible</p>
        <p>9. Practica Double Click Element en áreas específicas</p>
        <p>10. Usa Click Element At Coordinates para mapas</p>
        <p>11. Combina Mouse Down + Mouse Up para drag & drop</p>
        <p>12. Practica Choose File con validación de nombre</p>
        <p>13. Usa Input Password con verificaciones seguridad</p>
        <p>14. Combina múltiples interacciones en flujo completo</p>
        <p>15. Verifica estados antes y después de interacciones</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar todas las interacciones básicas de SeleniumLibrary</li>
                <li>Combinar acciones con verificaciones de estado inmediatas</li>
                <li>Manejar formularios complejos con múltiples tipos de input</li>
                <li>Implementar interacciones de mouse y teclado avanzadas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Siempre verifica el resultado de cada interacción inmediatamente. Usa Clear Element Text antes de Input Text para inputs limpios.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 073 - Waits y sincronización</h3>
        <p>Ahora aprenderás a manejar elementos que aparecen dinámicamente, cargas asíncronas y sincronización perfecta con la aplicación.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-071"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_072 = LESSON_072;
}