/**
 * Robot Framework Academy - Lesson 107
 * Drag and drop avanzado
 */

const LESSON_107 = {
    id: 107,
    title: "Interacciones Avanzadas 107",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>🖱️ Drag drop avanzado</h2>
        <p>Implementar drag and drop complejo, sortable lists y interacciones de arrastrar y soltar.</p>
        
        <h3>💻 Tests Drag Drop:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com/dragdrop
\${BROWSER}            chrome
\${SOURCE_ITEM}        id=item1
\${TARGET_ZONE}        id=dropzone
\${SORTABLE_LIST}      css=.sortable-list
\${FIRST_ITEM}         xpath=//li[@data-position='1']
\${LAST_ITEM}          xpath=//li[@data-position='5']
\${TRASH_ZONE}         id=trash

*** Test Cases ***
Test Drag Drop Básico
    Open Browser              \${URL}        \${BROWSER}
    Element Should Be Visible \${SOURCE_ITEM}
    Element Should Be Visible \${TARGET_ZONE}
    Drag And Drop             \${SOURCE_ITEM}    \${TARGET_ZONE}
    Page Should Contain       elemento movido
    Element Should Be Visible xpath=//\#dropzone//*[@id='item1']
    \${items}=    Get Element Count    \${TARGET_ZONE}//*
    Should Be Equal As Numbers    \${items}    1
    Page Should Contain       drop exitoso
    Close Browser

Test Sortable List
    Open Browser              \${URL}        \${BROWSER}
    \${original_order}=    Get Text    \${SORTABLE_LIST}
    Should Contain            \${original_order}    Item 1
    Drag And Drop             \${FIRST_ITEM}    \${LAST_ITEM}
    Sleep                     1s
    \${new_order}=    Get Text    \${SORTABLE_LIST}
    Should Not Be Equal       \${original_order}    \${new_order}
    Page Should Contain       orden actualizado
    \${position}=    Get Element Attribute    \${FIRST_ITEM}    data-position
    Should Be Equal           \${position}    5
    Close Browser

Test Drag Drop JavaScript
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        
    ...    var source = document.querySelector('\${SOURCE_ITEM}');
    ...    var target = document.querySelector('\${TARGET_ZONE}');
    ...    var dragEvent = new DragEvent('dragstart', {dataTransfer: new DataTransfer()});
    ...    source.dispatchEvent(dragEvent);
    ...    var dropEvent = new DragEvent('drop', {dataTransfer: dragEvent.dataTransfer});
    ...    target.dispatchEvent(dropEvent);
    Wait Until Page Contains  JavaScript drag completado
    Element Should Be Visible \${TARGET_ZONE}//*[@id='item1']
    Page Should Contain       evento drop manejado
    \${result}=    Get Text    id=drop-result
    Should Contain            \${result}    item1
    Close Browser

Test Multiple Drag Drop
    Open Browser              \${URL}        \${BROWSER}
    Drag And Drop             id=item1    \${TARGET_ZONE}
    Drag And Drop             id=item2    \${TARGET_ZONE}
    Drag And Drop             id=item3    \${TARGET_ZONE}
    \${items}=    Get Element Count    \${TARGET_ZONE}//*
    Should Be Equal As Numbers    \${items}    3
    Page Should Contain       3 elementos
    Element Should Be Visible id=item1
    Element Should Be Visible id=item2
    Element Should Be Visible id=item3
    Page Should Contain       múltiple drop exitoso
    Close Browser

Test Drag To Trash
    Open Browser              \${URL}        \${BROWSER}
    \${initial_count}=    Get Element Count    css=.draggable-item
    Should Be True            \${initial_count} > 0
    Drag And Drop             id=item1    \${TRASH_ZONE}
    Page Should Contain       elemento eliminado
    \${final_count}=    Get Element Count    css=.draggable-item
    Should Be True            \${final_count} < \${initial_count}
    Element Should Not Be Visible    id=item1
    Page Should Contain       trash funcionando
    \${trash_count}=    Get Text    id=trash-counter
    Should Be Equal           \${trash_count}    1
    Close Browser

Test Drag Drop Validation
    Open Browser              \${URL}        \${BROWSER}
    Drag And Drop             id=invalid-item    \${TARGET_ZONE}
    Page Should Contain       drop no permitido
    Element Should Not Be Visible    \${TARGET_ZONE}//*[@id='invalid-item']
    Drag And Drop             id=valid-item    \${TARGET_ZONE}
    Page Should Contain       drop válido
    Element Should Be Visible \${TARGET_ZONE}//*[@id='valid-item']
    \${valid_items}=    Get Element Count    \${TARGET_ZONE}//*[@class='valid']
    Should Be Equal As Numbers    \${valid_items}    1
    Page Should Contain       validación correcta
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Drag Drop (5 min):</h3>
        <p>1. Verifica que elementos source y target están visibles</p>
        <p>2. Usa Drag And Drop para mover elemento básico</p>
        <p>3. Valida que elemento aparece en zona de destino</p>
        <p>4. Cuenta elementos con Get Element Count</p>
        <p>5. Implementa reordenamiento de lista sortable</p>
        <p>6. Verifica que orden cambió comparando textos</p>
        <p>7. Usa Execute JavaScript para drag drop programático</p>
        <p>8. Maneja múltiples elementos en misma sesión</p>
        <p>9. Implementa drag to trash para eliminar elementos</p>
        <p>10. Valida que elementos se eliminan correctamente</p>
        <p>11. Usa Get Element Attribute para verificar posiciones</p>
        <p>12. Implementa validación de drops permitidos vs no permitidos</p>
        <p>13. Verifica que elementos inválidos no se mueven</p>
        <p>14. Usa Sleep para esperar animaciones de drag</p>
        <p>15. Combina drag drop con contadores dinámicos</p>
        <p>16. Valida que clases CSS cambian después del drop</p>
        <p>17. Implementa drag entre múltiples zonas de drop</p>
        <p>18. Usa Wait Until para confirmar que operación terminó</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar drag and drop básico y avanzado</li>
                <li>Manejar listas sortables y reordenamiento</li>
                <li>Validar operaciones de drag drop con contadores</li>
                <li>Usar JavaScript para drag drop programático</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Para drag drop complejos, usa JavaScript events cuando Drag And Drop nativo no funciona. Siempre valida que el elemento llegó al destino.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 108 - Responsive testing</h3>
        <p>Aprenderás a probar aplicaciones web en diferentes resoluciones, dispositivos móviles y orientaciones de pantalla.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-106"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_107 = LESSON_107;
}