/**
 * Robot Framework Academy - Lesson 116
 * Advanced web components
 */

const LESSON_116 = {
    id: 116,
    title: "Interacciones Avanzadas 116",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>⚛️ Advanced web components</h2>
        <p>Automatizar web components modernos, Shadow DOM, custom elements y frameworks como React/Vue.</p>
        
        <h3>💻 Tests Web Components:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com/components
\${BROWSER}            chrome
\${CUSTOM_ELEMENT}     my-custom-button
\${SHADOW_HOST}        css=custom-component
\${REACT_COMPONENT}    css=[data-testid="react-button"]
\${VUE_COMPONENT}      css=.vue-component
\${SLOT_CONTENT}       Hello Shadow DOM
\${PROP_VALUE}         test-prop-value

*** Test Cases ***
Test Custom Elements
    Open Browser              \${URL}        \${BROWSER}
    Element Should Be Visible css=\${CUSTOM_ELEMENT}
    \${tag_name}=        Execute JavaScript    return document.querySelector('\${CUSTOM_ELEMENT}').tagName.toLowerCase()
    Should Be Equal           \${tag_name}    \${CUSTOM_ELEMENT}
    Click Element             css=\${CUSTOM_ELEMENT}
    Wait Until Page Contains  custom element clicked
    \${custom_prop}=     Execute JavaScript    return document.querySelector('\${CUSTOM_ELEMENT}').customProperty
    Should Not Be Empty       \${custom_prop}
    Execute JavaScript        document.querySelector('\${CUSTOM_ELEMENT}').setAttribute('data-test', 'automated')
    Element Should Have Attribute    css=\${CUSTOM_ELEMENT}    data-test
    Close Browser

Test Shadow DOM
    Open Browser              \${URL}        \${BROWSER}
    Element Should Be Visible \${SHADOW_HOST}
    \${shadow_root}=     Execute JavaScript    return document.querySelector('\${SHADOW_HOST}').shadowRoot
    Should Not Be Empty       \${shadow_root}
    \${shadow_button}=   Execute JavaScript    
    ...    return document.querySelector('\${SHADOW_HOST}').shadowRoot.querySelector('button')
    Should Not Be Empty       \${shadow_button}
    Execute JavaScript        
    ...    document.querySelector('\${SHADOW_HOST}').shadowRoot.querySelector('button').click()
    Wait Until Page Contains  shadow dom action
    \${shadow_text}=     Execute JavaScript    
    ...    return document.querySelector('\${SHADOW_HOST}').shadowRoot.querySelector('.content').textContent
    Should Contain            \${shadow_text}    \${SLOT_CONTENT}
    Close Browser

Test React Components
    Open Browser              \${URL}        \${BROWSER}
    Element Should Be Visible \${REACT_COMPONENT}
    \${react_props}=     Execute JavaScript    
    ...    return document.querySelector('\${REACT_COMPONENT}')._reactInternalFiber ? 
    ...    document.querySelector('\${REACT_COMPONENT}')._reactInternalFiber.memoizedProps : null
    Should Not Be Empty       \${react_props}
    Click Element             \${REACT_COMPONENT}
    Wait Until Page Contains  react state updated
    \${component_state}=  Execute JavaScript    
    ...    var comp = document.querySelector('\${REACT_COMPONENT}'); 
    ...    return comp._reactInternalFiber ? comp._reactInternalFiber.memoizedState : null
    Should Not Be Empty       \${component_state}
    Execute JavaScript        
    ...    var event = new CustomEvent('testEvent', {detail: {value: '\${PROP_VALUE}'}});
    ...    document.querySelector('\${REACT_COMPONENT}').dispatchEvent(event);
    Page Should Contain       evento procesado
    Close Browser

Test Vue Components
    Open Browser              \${URL}        \${BROWSER}
    Element Should Be Visible \${VUE_COMPONENT}
    \${vue_data}=        Execute JavaScript    
    ...    return document.querySelector('\${VUE_COMPONENT}').__vue__ ? 
    ...    document.querySelector('\${VUE_COMPONENT}').__vue__.$data : null
    Should Not Be Empty       \${vue_data}
    Click Element             css=\${VUE_COMPONENT} button
    Wait Until Page Contains  vue method called
    \${computed_value}=  Execute JavaScript    
    ...    return document.querySelector('\${VUE_COMPONENT}').__vue__ ? 
    ...    document.querySelector('\${VUE_COMPONENT}').__vue__.computedProperty : null
    Should Not Be Empty       \${computed_value}
    Execute JavaScript        
    ...    document.querySelector('\${VUE_COMPONENT}').__vue__.testMethod('\${PROP_VALUE}')
    Page Should Contain       método ejecutado
    Close Browser

Test Slot Components
    Open Browser              \${URL}        \${BROWSER}
    \${slot_content}=    Execute JavaScript    
    ...    return document.querySelector('slot-component').shadowRoot.querySelector('slot').assignedNodes()[0].textContent
    Should Be Equal           \${slot_content}    \${SLOT_CONTENT}
    Execute JavaScript        
    ...    var newContent = document.createElement('span');
    ...    newContent.textContent = 'Dynamic Slot Content';
    ...    document.querySelector('slot-component').appendChild(newContent);
    \${updated_slots}=   Execute JavaScript    
    ...    return document.querySelector('slot-component').shadowRoot.querySelector('slot').assignedNodes().length
    Should Be True            \${updated_slots} > 1
    Element Should Contain    css=slot-component    Dynamic Slot Content
    Page Should Contain       slots actualizados
    Close Browser

Test Component Events
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        
    ...    window.componentEvents = [];
    ...    document.addEventListener('customComponentEvent', function(e) {
    ...        window.componentEvents.push(e.detail);
    ...    });
    Click Element             css=.event-trigger
    Sleep                     1s
    \${event_count}=     Execute JavaScript    return window.componentEvents.length
    Should Be Equal As Numbers    \${event_count}    1
    \${event_data}=      Execute JavaScript    return window.componentEvents[0]
    Should Contain            \${event_data.type}    custom
    Should Be Equal           \${event_data.source}    component
    Execute JavaScript        
    ...    document.querySelector('.multi-event').dispatchEvent(
    ...        new CustomEvent('multiEvent', {detail: {id: 1, action: 'test'}})
    ...    );
    Page Should Contain       eventos manejados
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Web Components (5 min):</h3>
        <p>1. Verifica que custom elements están registrados</p>
        <p>2. Usa Execute JavaScript para acceder propiedades custom</p>
        <p>3. Interactúa con elementos dentro de Shadow DOM</p>
        <p>4. Usa shadowRoot.querySelector para elementos shadow</p>
        <p>5. Accede a React props via _reactInternalFiber</p>
        <p>6. Verifica state changes en componentes React</p>
        <p>7. Dispatch custom events a componentes React</p>
        <p>8. Accede a Vue data usando __vue__ property</p>
        <p>9. Ejecuta métodos Vue desde JavaScript</p>
        <p>10. Verifica computed properties en Vue</p>
        <p>11. Maneja slots en web components</p>
        <p>12. Usa assignedNodes() para contenido de slots</p>
        <p>13. Agrega contenido dinámico a slots</p>
        <p>14. Implementa event listeners para custom events</p>
        <p>15. Verifica que eventos custom se disparan correctamente</p>
        <p>16. Usa event.detail para data de eventos</p>
        <p>17. Valida que componentes mantienen estado interno</p>
        <p>18. Combina testing de múltiples frameworks en misma página</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar custom elements y Shadow DOM</li>
                <li>Interactuar con componentes React y Vue</li>
                <li>Manejar slots y contenido dinámico</li>
                <li>Validar eventos custom y estado de componentes</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Shadow DOM requiere shadowRoot.querySelector. React usa _reactInternalFiber, Vue usa __vue__. Custom events permiten comunicación entre componentes.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 117 - PWA testing</h3>
        <p>Aprenderás a probar Progressive Web Apps, service workers, offline functionality y app manifest testing.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-115"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_116 = LESSON_116;
}