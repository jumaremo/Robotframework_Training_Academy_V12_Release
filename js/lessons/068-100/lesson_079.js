/**
 * Robot Framework Academy - Lesson 079
 * Eventos JavaScript avanzados
 */

const LESSON_079 = {
    id: 79,
    title: "Eventos JavaScript avanzados",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 JavaScript Automation</h2>
        <p>Ejecuta JavaScript desde Robot Framework para automatizar funcionalidades complejas, eventos avanzados y manipulación directa del DOM.</p>
        
        <h3>💻 JavaScript poder:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://jsevents-demo.com
\${BROWSER}             chrome
\${SCROLL_POSITION}     500
\${LOCAL_STORAGE_KEY}   testData
\${LOCAL_STORAGE_VALUE} automation_test_value
\${CUSTOM_EVENT}        customTestEvent
\${ELEMENT_TEXT}        Texto dinámico generado
\${AJAX_ENDPOINT}       /api/test-data
\${WINDOW_WIDTH}        1200

*** Test Cases ***
Test JavaScript Execution Basic
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.js-target
    Execute JavaScript              document.querySelector('.js-target').style.backgroundColor = 'red'
    Element Should Be Visible       css=.js-target[style*="background-color: red"]
    \${result}=  Execute JavaScript  return document.title
    Should Contain                  \${result}                          Demo
    Execute JavaScript              document.querySelector('.js-target').innerHTML = '\${ELEMENT_TEXT}'
    Element Should Contain          css=.js-target                     \${ELEMENT_TEXT}
    \${text}=  Execute JavaScript   return document.querySelector('.js-target').textContent
    Should Be Equal                 \${text}                            \${ELEMENT_TEXT}
    Close Browser

Test DOM Manipulation Advanced
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.dom-container
    Execute JavaScript              var newDiv = document.createElement('div'); newDiv.id = 'dynamic-element'; newDiv.textContent = 'Elemento creado'; document.querySelector('.dom-container').appendChild(newDiv)
    Element Should Be Visible       id=dynamic-element
    Element Should Contain          id=dynamic-element                  Elemento creado
    Execute JavaScript              document.getElementById('dynamic-element').classList.add('highlight')
    Element Should Be Visible       css=#dynamic-element.highlight
    Execute JavaScript              document.getElementById('dynamic-element').setAttribute('data-test', 'automation')
    Element Should Be Visible       css=[data-test="automation"]
    Execute JavaScript              document.getElementById('dynamic-element').remove()
    Element Should Not Be Visible   id=dynamic-element
    Close Browser

Test Scroll And Window Control
    Open Browser                    \${URL}                              \${BROWSER}
    Execute JavaScript              window.scrollTo(0, \${SCROLL_POSITION})
    \${scroll_y}=  Execute JavaScript  return window.pageYOffset
    Should Be Equal As Numbers      \${scroll_y}                        \${SCROLL_POSITION}
    Element Should Be Visible       css=.scroll-target
    Execute JavaScript              document.querySelector('.scroll-target').scrollIntoView()
    Element Should Be Visible       css=.scroll-target
    Execute JavaScript              window.resizeTo(\${WINDOW_WIDTH}, 800)
    \${width}=  Execute JavaScript  return window.innerWidth
    Should Be Equal As Numbers      \${width}                           \${WINDOW_WIDTH}
    Execute JavaScript              window.history.pushState({}, '', '/new-path')
    Location Should Contain         /new-path
    Close Browser

Test Local Storage Operations
    Open Browser                    \${URL}                              \${BROWSER}
    Execute JavaScript              localStorage.setItem('\${LOCAL_STORAGE_KEY}', '\${LOCAL_STORAGE_VALUE}')
    \${stored_value}=  Execute JavaScript  return localStorage.getItem('\${LOCAL_STORAGE_KEY}')
    Should Be Equal                 \${stored_value}                    \${LOCAL_STORAGE_VALUE}
    Execute JavaScript              localStorage.setItem('testCounter', '0')
    Execute JavaScript              var counter = parseInt(localStorage.getItem('testCounter')); localStorage.setItem('testCounter', (counter + 1).toString())
    \${counter}=  Execute JavaScript  return localStorage.getItem('testCounter')
    Should Be Equal                 \${counter}                         1
    Execute JavaScript              localStorage.removeItem('\${LOCAL_STORAGE_KEY}')
    \${removed}=  Execute JavaScript  return localStorage.getItem('\${LOCAL_STORAGE_KEY}')
    Should Be Equal                 \${removed}                         None
    Close Browser

Test Event Triggering Custom
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.event-listener
    Execute JavaScript              var event = new CustomEvent('\${CUSTOM_EVENT}', {detail: {message: 'test event'}}); document.querySelector('.event-listener').dispatchEvent(event)
    Element Should Be Visible       css=.custom-event-triggered
    Element Should Contain          css=.event-message                  test event
    Execute JavaScript              var clickEvent = new MouseEvent('click', {bubbles: true}); document.querySelector('.click-target').dispatchEvent(clickEvent)
    Element Should Be Visible       css=.programmatic-click-result
    Execute JavaScript              var inputEvent = new Event('input', {bubbles: true}); var input = document.querySelector('.input-target'); input.value = 'JS Input'; input.dispatchEvent(inputEvent)
    Element Should Contain          css=.input-target                   JS Input
    Element Should Be Visible       css=.input-event-handled
    Close Browser

Test AJAX And Async Operations
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.ajax-container
    Execute JavaScript              fetch('\${AJAX_ENDPOINT}').then(response => response.json()).then(data => document.querySelector('.ajax-result').textContent = JSON.stringify(data))
    Wait Until Element Contains     css=.ajax-result                   data                                10s
    Element Should Be Visible       css=.ajax-success
    Execute JavaScript              setTimeout(() => document.querySelector('.timeout-target').textContent = 'Timeout executed', 1000)
    Wait Until Element Contains     css=.timeout-target                Timeout executed                    5s
    Execute JavaScript              Promise.resolve('Promise result').then(result => document.querySelector('.promise-target').textContent = result)
    Element Should Contain          css=.promise-target                 Promise result
    Close Browser

Test Complex JS Interactions
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.complex-interaction
    Execute JavaScript              var elements = document.querySelectorAll('.batch-item'); elements.forEach((el, index) => el.textContent = 'Item ' + (index + 1))
    \${items}=  Get WebElements     css=.batch-item
    Length Should Be Greater Than   \${items}                           0
    \${first_text}=  Execute JavaScript  return document.querySelector('.batch-item').textContent
    Should Contain                  \${first_text}                      Item 1
    Execute JavaScript              document.querySelectorAll('.toggle-item').forEach(item => item.classList.toggle('active'))
    \${active_items}=  Get WebElements  css=.toggle-item.active
    Length Should Be Greater Than   \${active_items}                    0
    Execute JavaScript              var total = Array.from(document.querySelectorAll('.calc-item')).reduce((sum, el) => sum + parseInt(el.dataset.value || 0), 0); document.querySelector('.calc-result').textContent = total
    Element Should Be Visible       css=.calc-result
    Close Browser</code></pre>
        
        <h3>🎯 Práctica JavaScript (5 min):</h3>
        <p>1. Usa Execute JavaScript para manipular estilos CSS directamente</p>
        <p>2. Practica Execute JavaScript con return para obtener valores</p>
        <p>3. Combina DOM createElement + appendChild para elementos dinámicos</p>
        <p>4. Experimenta window.scrollTo con verificación pageYOffset</p>
        <p>5. Usa localStorage.setItem + getItem para persistencia datos</p>
        <p>6. Practica new CustomEvent para disparar eventos personalizados</p>
        <p>7. Combina fetch() + then() para llamadas AJAX asíncronas</p>
        <p>8. Usa setTimeout + Promise.resolve para operaciones async</p>
        <p>9. Practica querySelectorAll + forEach para operaciones batch</p>
        <p>10. Combina classList.add/remove/toggle para clases dinámicas</p>
        <p>11. Usa Should Be Equal As Numbers para comparar valores numéricos</p>
        <p>12. Practica Wait Until Element Contains para contenido asíncrono</p>
        <p>13. Combina Array.from + reduce para cálculos complejos</p>
        <p>14. Experimenta dispatchEvent para simular interacciones</p>
        <p>15. Crea scripts complejos que combinen múltiples operaciones JS</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Ejecutar JavaScript desde Robot Framework para casos complejos</li>
                <li>Manipular DOM dinámicamente y manejar eventos personalizados</li>
                <li>Controlar scroll, ventanas y local storage para casos avanzados</li>
                <li>Automatizar operaciones asíncronas y AJAX con JavaScript</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Execute JavaScript es poderoso para casos que SeleniumLibrary no cubre. Usa return para obtener valores. Wait Until para operaciones asíncronas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 080 - Performance y optimización</h3>
        <p>Ahora aprenderás a optimizar tests para velocidad, medir performance de aplicaciones y técnicas de testing eficiente.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-078"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_079 = LESSON_079;
}