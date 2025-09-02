/**
 * Robot Framework Academy - Lesson 078
 * Drag & Drop avanzado
 */

const LESSON_078 = {
    id: 78,
    title: "Drag & Drop avanzado",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Drag & Drop</h2>
        <p>Automatiza interacciones complejas de arrastrar y soltar: reordenamiento, transferencia entre contenedores y manipulación avanzada de UI.</p>
        
        <h3>💻 Arrastrar elementos:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://dragdrop-demo.com
\${BROWSER}             chrome
\${ITEM_SOURCE}         Elemento A
\${ITEM_TARGET}         Elemento B
\${CONTAINER_SOURCE}    Lista Pendientes
\${CONTAINER_TARGET}    Lista Completadas
\${OFFSET_X}            100
\${OFFSET_Y}            50
\${DRAG_ELEMENT}        Widget Dashboard

*** Test Cases ***
Test Basic Drag And Drop
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.drag-source
    Element Should Be Visible       css=.drop-target
    Drag And Drop                   css=.draggable-item                 css=.drop-zone
    Element Should Be Visible       css=.drop-success
    Element Should Contain          css=.drop-zone                      elemento transferido
    Element Should Be Visible       css=.transfer-confirmation
    Element Should Not Be Visible   css=.drag-source .draggable-item
    Element Should Be Visible       css=.drop-target .dropped-item
    Element Should Contain          css=.status-message                 transferencia exitosa
    Close Browser

Test Drag With Coordinates
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.precise-drag-area
    \${element}=  Get WebElement    css=.movable-widget
    \${location}=  Get Element Location  css=.movable-widget
    Drag And Drop By Offset         css=.movable-widget                 \${OFFSET_X}    \${OFFSET_Y}
    Element Should Be Visible       css=.widget-moved
    \${new_location}=  Get Element Location  css=.movable-widget
    Should Not Be Equal             \${location}                        \${new_location}
    Element Should Contain          css=.coordinates-display            nuevas coordenadas
    Element Should Be Visible       css=.position-updated
    Close Browser

Test List Reordering
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.sortable-list
    \${original_order}=  Get WebElements  css=.sortable-list .list-item
    Drag And Drop                   css=.list-item:first-child         css=.list-item:last-child
    Element Should Be Visible       css=.reorder-animation
    Wait Until Element Is Not Visible  css=.reorder-animation          5s
    \${new_order}=  Get WebElements css=.sortable-list .list-item
    Should Not Be Equal             \${original_order}                  \${new_order}
    Element Should Contain          css=.order-status                   orden actualizado
    Element Should Be Visible       css=.save-order-btn
    Click Button                    css=.save-order-btn
    Element Should Contain          css=.save-confirmation             orden guardado
    Close Browser

Test Container Transfer
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.source-container
    Element Should Be Visible       css=.target-container
    \${source_count}=  Get Element Count  css=.source-container .item
    \${target_count}=  Get Element Count  css=.target-container .item
    Drag And Drop                   css=.source-container .item:first-child  css=.target-container
    Element Should Be Visible       css=.transfer-animation
    Wait Until Element Is Not Visible  css=.transfer-animation          5s
    \${new_source_count}=  Get Element Count  css=.source-container .item
    \${new_target_count}=  Get Element Count  css=.target-container .item
    Should Be Equal As Integers     \${new_source_count}                \${source_count - 1}
    Should Be Equal As Integers     \${new_target_count}                \${target_count + 1}
    Element Should Contain          css=.transfer-log                   elemento transferido
    Close Browser

Test Multiple Item Selection
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.multi-select-area
    Press Keys                      None                                CTRL
    Click Element                   css=.selectable-item:nth-child(1)
    Click Element                   css=.selectable-item:nth-child(3)
    Click Element                   css=.selectable-item:nth-child(5)
    Press Keys                      None                                NULL
    \${selected}=  Get WebElements  css=.selectable-item.selected
    Length Should Be                \${selected}                        3
    Drag And Drop                   css=.selectable-item.selected:first-child  css=.multi-drop-zone
    Element Should Be Visible       css=.multi-drop-success
    Element Should Contain          css=.drop-count                     3 elementos
    \${dropped}=  Get WebElements   css=.multi-drop-zone .dropped-item
    Length Should Be                \${dropped}                         3
    Close Browser

Test Drag Validation Rules
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.validation-area
    Drag And Drop                   css=.invalid-source                css=.restricted-zone
    Element Should Be Visible       css=.drop-denied
    Element Should Contain          css=.error-message                  movimiento no permitido
    Element Should Be Visible       css=.validation-error
    Drag And Drop                   css=.valid-source                  css=.allowed-zone
    Element Should Be Visible       css=.drop-accepted
    Element Should Contain          css=.success-message                movimiento válido
    Element Should Be Visible       css=.validation-success
    Element Should Contain          css=.rules-status                   reglas respetadas
    Close Browser

Test Advanced Drag Interactions
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.advanced-drag-area
    Mouse Down                      css=.complex-draggable
    Element Should Be Visible       css=.drag-started
    Mouse Move To Element           css=.intermediate-zone
    Element Should Be Visible       css=.drag-over-intermediate
    Element Should Contain          css=.hover-feedback                 zona intermedia
    Mouse Move To Element           css=.final-destination
    Element Should Be Visible       css=.drag-over-final
    Element Should Contain          css=.drop-preview                   soltar aquí
    Mouse Up                        css=.final-destination
    Element Should Be Visible       css=.complex-drop-complete
    Element Should Contain          css=.interaction-log                secuencia completada
    Close Browser</code></pre>
        
        <h3>🎯 Práctica drag&drop (5 min):</h3>
        <p>1. Usa Drag And Drop para transferencias básicas elemento a zona</p>
        <p>2. Practica Drag And Drop By Offset con coordenadas específicas</p>
        <p>3. Combina Get Element Location para verificar movimientos</p>
        <p>4. Experimenta Get Element Count antes y después transfers</p>
        <p>5. Usa Should Not Be Equal para verificar cambios posición</p>
        <p>6. Practica Press Keys con CTRL para selecciones múltiples</p>
        <p>7. Combina Wait Until Element Is Not Visible para animaciones</p>
        <p>8. Usa Mouse Down + Mouse Move + Mouse Up para control manual</p>
        <p>9. Practica Get WebElements + Length Should Be para conteos</p>
        <p>10. Combina Element Should Contain para verificar feedbacks</p>
        <p>11. Usa Should Be Equal As Integers para comparar números</p>
        <p>12. Practica validaciones con reglas de drop permitido/negado</p>
        <p>13. Combina css=.item:first-child y :last-child para reordering</p>
        <p>14. Experimenta con elementos seleccionables múltiples</p>
        <p>15. Crea secuencias complejas de drag con validaciones</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar drag & drop básico y avanzado con validaciones</li>
                <li>Automatizar reordenamiento de listas y elementos UI</li>
                <li>Manejar transferencias entre contenedores múltiples</li>
                <li>Implementar interacciones complejas con mouse manual</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Drag And Drop para casos simples, Drag And Drop By Offset para precisión. Mouse Down/Move/Up para control total. Verifica conteos antes/después.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 079 - Eventos JavaScript avanzados</h3>
        <p>Ahora aprenderás a ejecutar JavaScript desde Robot Framework, manejar eventos complejos y automatizar funcionalidades que requieren scripting.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-077"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_078 = LESSON_078;
}