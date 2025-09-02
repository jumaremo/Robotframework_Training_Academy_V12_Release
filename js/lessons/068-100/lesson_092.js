/**
 * Robot Framework Academy - Lesson 092
 * Localizadores Avanzados 092
 */

const LESSON_092 = {
    id: 92,
    title: "Localizadores Avanzados 092",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🎯 Shadow DOM</h2>
        <p>Domina técnicas especializadas para localizar elementos dentro de Shadow DOM, Web Components y contenido encapsulado usando JavaScript execution.</p>
        
        <h3>💻 Shadow DOM automation:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://shadowdom-demo.com
\${BROWSER}             chrome
\${COMPONENT_VALUE}     Shadow Content Test
\${SLOT_TEXT}           Slotted Content
\${CUSTOM_ATTRIBUTE}    data-shadow-id
\${SHADOW_INPUT}        shadow-input-field
\${NESTED_COMPONENT}    nested-web-component
\${LIGHT_DOM_TEXT}      Light DOM Content

*** Test Cases ***
Test Shadow Root Access
    Open Browser                    \${URL}                              \${BROWSER}
    \${shadow_exists}=  Execute JavaScript  return document.querySelector('my-component').shadowRoot !== null
    Should Be True                  \${shadow_exists}
    \${shadow_element}=  Execute JavaScript  return document.querySelector('my-component').shadowRoot.querySelector('.shadow-content')
    Should Not Be Equal             \${shadow_element}                   None
    Execute JavaScript              document.querySelector('my-component').shadowRoot.querySelector('.shadow-button').click()
    \${shadow_clicked}=  Execute JavaScript  return document.querySelector('my-component').shadowRoot.querySelector('.shadow-result').textContent
    Should Contain                  \${shadow_clicked}                   clicked
    \${shadow_input}=  Execute JavaScript  return document.querySelector('my-component').shadowRoot.querySelector('input')
    Execute JavaScript              arguments[0].value = '\${COMPONENT_VALUE}'  ARGUMENTS  \${shadow_input}
    \${input_value}=  Execute JavaScript  return document.querySelector('my-component').shadowRoot.querySelector('input').value
    Should Be Equal                 \${input_value}                      \${COMPONENT_VALUE}
    Close Browser

Test Multiple Shadow Components
    Open Browser                    \${URL}                              \${BROWSER}
    \${component_count}=  Execute JavaScript  return document.querySelectorAll('*').length
    Should Be Greater Than          \${component_count}                  0
    \${shadow_components}=  Execute JavaScript  
    ...  var components = []; 
    ...  document.querySelectorAll('*').forEach(el => {
    ...    if(el.shadowRoot) components.push(el.tagName);
    ...  }); 
    ...  return components.length
    Should Be Greater Than          \${shadow_components}                0
    Execute JavaScript              
    ...  document.querySelectorAll('custom-card').forEach((card, index) => {
    ...    var shadowBtn = card.shadowRoot.querySelector('.card-action');
    ...    if(shadowBtn) shadowBtn.click();
    ...  })
    \${cards_activated}=  Execute JavaScript  
    ...  return Array.from(document.querySelectorAll('custom-card')).filter(card => 
    ...    card.shadowRoot.querySelector('.activated')).length
    Should Be Greater Than          \${cards_activated}                  0
    Close Browser

Test Shadow DOM Events
    Open Browser                    \${URL}                              \${BROWSER}
    Execute JavaScript              
    ...  var component = document.querySelector('event-component');
    ...  var shadowButton = component.shadowRoot.querySelector('.event-trigger');
    ...  var event = new CustomEvent('shadowClick', {detail: {source: 'automation'}});
    ...  shadowButton.dispatchEvent(event)
    \${event_handled}=  Execute JavaScript  
    ...  return document.querySelector('event-component').shadowRoot.querySelector('.event-result').textContent
    Should Contain                  \${event_handled}                    automation
    Execute JavaScript              
    ...  var input = document.querySelector('form-component').shadowRoot.querySelector('.shadow-input');
    ...  input.value = '\${COMPONENT_VALUE}';
    ...  input.dispatchEvent(new Event('input', {bubbles: true}))
    \${input_validated}=  Execute JavaScript  
    ...  return document.querySelector('form-component').shadowRoot.querySelector('.validation-result').textContent
    Should Contain                  \${input_validated}                  valid
    Close Browser

Test Nested Shadow DOM
    Open Browser                    \${URL}                              \${BROWSER}
    \${nested_access}=  Execute JavaScript  
    ...  var outer = document.querySelector('outer-component').shadowRoot;
    ...  var inner = outer.querySelector('inner-component').shadowRoot;
    ...  return inner.querySelector('.nested-content') !== null
    Should Be True                  \${nested_access}
    Execute JavaScript              
    ...  var outer = document.querySelector('outer-component').shadowRoot;
    ...  var inner = outer.querySelector('inner-component').shadowRoot;
    ...  inner.querySelector('.nested-button').click()
    \${nested_result}=  Execute JavaScript  
    ...  var outer = document.querySelector('outer-component').shadowRoot;
    ...  var inner = outer.querySelector('inner-component').shadowRoot;
    ...  return inner.querySelector('.nested-output').textContent
    Should Contain                  \${nested_result}                    nested
    Execute JavaScript              
    ...  var getNestedElement = (outerSel, innerSel, targetSel) => {
    ...    return document.querySelector(outerSel).shadowRoot
    ...      .querySelector(innerSel).shadowRoot.querySelector(targetSel);
    ...  };
    ...  getNestedElement('container-component', 'child-component', '.deep-input').value = '\${NESTED_COMPONENT}'
    \${deep_value}=  Execute JavaScript  
    ...  var outer = document.querySelector('container-component').shadowRoot;
    ...  var inner = outer.querySelector('child-component').shadowRoot;
    ...  return inner.querySelector('.deep-input').value
    Should Be Equal                 \${deep_value}                       \${NESTED_COMPONENT}
    Close Browser

Test Shadow DOM Slots
    Open Browser                    \${URL}                              \${BROWSER}
    \${slot_content}=  Execute JavaScript  
    ...  return document.querySelector('slotted-component').shadowRoot
    ...    .querySelector('slot').assignedNodes()[0].textContent
    Should Contain                  \${slot_content}                     \${SLOT_TEXT}
    Execute JavaScript              
    ...  var slottedEl = document.querySelector('slotted-component');
    ...  slottedEl.innerHTML = '<span slot="content">\${SLOT_TEXT} Updated</span>';
    ...  slottedEl.shadowRoot.querySelector('.slot-trigger').click()
    \${slot_updated}=  Execute JavaScript  
    ...  return document.querySelector('slotted-component').shadowRoot
    ...    .querySelector('slot').assignedNodes()[0].textContent
    Should Contain                  \${slot_updated}                     Updated
    Execute JavaScript              
    ...  var namedSlot = document.querySelector('multi-slot-component').shadowRoot
    ...    .querySelector('slot[name="header"]');
    ...  var headerContent = namedSlot.assignedNodes()[0];
    ...  headerContent.style.backgroundColor = 'yellow'
    \${header_styled}=  Execute JavaScript  
    ...  var namedSlot = document.querySelector('multi-slot-component').shadowRoot
    ...    .querySelector('slot[name="header"]');
    ...  return namedSlot.assignedNodes()[0].style.backgroundColor
    Should Be Equal                 \${header_styled}                    yellow
    Close Browser

Test Shadow DOM Attributes
    Open Browser                    \${URL}                              \${BROWSER}
    Execute JavaScript              
    ...  document.querySelector('attr-component').setAttribute('\${CUSTOM_ATTRIBUTE}', 'test-value')
    \${attr_reflected}=  Execute JavaScript  
    ...  return document.querySelector('attr-component').shadowRoot
    ...    .querySelector('.attr-display').textContent
    Should Contain                  \${attr_reflected}                   test-value
    Execute JavaScript              
    ...  var component = document.querySelector('reactive-component');
    ...  component.setAttribute('data-state', 'active');
    ...  component.shadowRoot.querySelector('.state-button').click()
    \${state_changed}=  Execute JavaScript  
    ...  return document.querySelector('reactive-component').shadowRoot
    ...    .querySelector('.state-indicator').classList.contains('active')
    Should Be True                  \${state_changed}
    Execute JavaScript              
    ...  var components = document.querySelectorAll('[data-shadow-enabled]');
    ...  components.forEach(comp => {
    ...    comp.shadowRoot.querySelector('.batch-action').click();
    ...  })
    \${batch_processed}=  Execute JavaScript  
    ...  return Array.from(document.querySelectorAll('[data-shadow-enabled]'))
    ...    .filter(comp => comp.shadowRoot.querySelector('.processed')).length
    Should Be Greater Than          \${batch_processed}                  0
    Close Browser

Test Shadow DOM CSS Isolation
    Open Browser                    \${URL}                              \${BROWSER}
    \${light_dom_styles}=  Execute JavaScript  
    ...  return getComputedStyle(document.querySelector('.light-content')).color
    \${shadow_dom_styles}=  Execute JavaScript  
    ...  var shadowEl = document.querySelector('styled-component').shadowRoot.querySelector('.shadow-content');
    ...  return getComputedStyle(shadowEl).color
    Should Not Be Equal             \${light_dom_styles}                 \${shadow_dom_styles}
    Execute JavaScript              
    ...  document.querySelector('theme-component').shadowRoot
    ...    .querySelector('.theme-toggle').click()
    \${theme_changed}=  Execute JavaScript  
    ...  return document.querySelector('theme-component').shadowRoot
    ...    .querySelector('.themed-content').classList.contains('dark-theme')
    Should Be True                  \${theme_changed}
    Execute JavaScript              
    ...  var customCSS = document.querySelector('css-component').shadowRoot;
    ...  var style = document.createElement('style');
    ...  style.textContent = '.dynamic { background: red; }';
    ...  customCSS.appendChild(style);
    ...  customCSS.querySelector('.target').classList.add('dynamic')
    \${css_applied}=  Execute JavaScript  
    ...  var shadowEl = document.querySelector('css-component').shadowRoot.querySelector('.target.dynamic');
    ...  return getComputedStyle(shadowEl).backgroundColor
    Should Contain                  \${css_applied}                      rgb(255, 0, 0)
    Close Browser

Test Light DOM Shadow DOM Interaction
    Open Browser                    \${URL}                              \${BROWSER}
    Click Element                   css=.light-trigger
    \${shadow_updated}=  Execute JavaScript  
    ...  return document.querySelector('interactive-component').shadowRoot
    ...    .querySelector('.shadow-status').textContent
    Should Contain                  \${shadow_updated}                   triggered
    Execute JavaScript              
    ...  document.querySelector('bridge-component').shadowRoot
    ...    .querySelector('.shadow-to-light-btn').click()
    Element Should Contain          css=.light-receiver                  \${LIGHT_DOM_TEXT}
    Execute JavaScript              
    ...  var lightData = document.querySelector('.data-source').textContent;
    ...  document.querySelector('data-component').shadowRoot
    ...    .querySelector('.data-display').textContent = lightData
    \${data_transferred}=  Execute JavaScript  
    ...  return document.querySelector('data-component').shadowRoot
    ...    .querySelector('.data-display').textContent
    Should Not Be Empty             \${data_transferred}
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Shadow DOM (5 min):</h3>
        <p>1. Usa Execute JavaScript para acceder shadowRoot properties</p>
        <p>2. Practica .shadowRoot.querySelector() para elementos encapsulados</p>
        <p>3. Combina dispatchEvent() para triggers en Shadow DOM</p>
        <p>4. Experimenta con nested shadow roots multi-nivel</p>
        <p>5. Usa slot.assignedNodes() para contenido slotted</p>
        <p>6. Practica setAttribute() + shadowRoot reactions</p>
        <p>7. Combina getComputedStyle() para verificar CSS isolation</p>
        <p>8. Usa forEach() para batch operations en components</p>
        <p>9. Practica custom events entre Light y Shadow DOM</p>
        <p>10. Combina classList operations en shadow elements</p>
        <p>11. Usa Should Not Be Equal para verificar encapsulation</p>
        <p>12. Practica createElement() + appendChild() en shadowRoot</p>
        <p>13. Combina Array.from() + filter() para shadow collections</p>
        <p>14. Usa arguments[0] pattern para element manipulation</p>
        <p>15. Crea automation robusta para Web Components modernos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar Web Components con Shadow DOM encapsulation</li>
                <li>Navegar shadow roots anidados y contenido slotted</li>
                <li>Manejar eventos y atributos en elementos shadow</li>
                <li>Verificar CSS isolation y interacción Light/Shadow DOM</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Shadow DOM requiere JavaScript execution siempre. .shadowRoot.querySelector() es la base. slots usan assignedNodes(). CSS está aislado por design.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 093 - Optimización de performance</h3>
        <p>Ahora aprenderás a optimizar localizadores para máxima velocidad, técnicas de caching y estrategias de performance para suites grandes.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-091"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_092 = LESSON_092;
}