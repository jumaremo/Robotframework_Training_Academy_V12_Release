/**
 * Robot Framework Academy - Lesson 100
 * JavaScript execution
 */

const LESSON_100 = {
    id: 100,
    title: "JavaScript execution",
    duration: "10 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>⚡ JavaScript en RF</h2>
        <p>Ejecutar código JavaScript para interacciones imposibles con Selenium puro.</p>
        
        <h3>💻 JavaScript básico:</h3>
        <pre><code class="robot">*** Variables ***
\${JS_SCROLL_TOP}       window.scrollTo(0, 0)
\${JS_SCROLL_BOTTOM}    window.scrollTo(0, document.body.scrollHeight)
\${JS_CLICK_HIDDEN}     arguments[0].click()
\${JS_GET_VALUE}        return arguments[0].value
\${JS_SET_VALUE}        arguments[0].value = arguments[1]
\${JS_REMOVE_ATTR}      arguments[0].removeAttribute(arguments[1])
\${JS_TRIGGER_EVENT}    arguments[0].dispatchEvent(new Event('change'))
\${JS_GET_COMPUTED}     return getComputedStyle(arguments[0]).display

*** Test Cases ***
Test JavaScript Scroll Control
    Open Browser    https://long-page.com    chrome
    Execute JavaScript    \${JS_SCROLL_TOP}
    Sleep    1s
    Execute JavaScript    \${JS_SCROLL_BOTTOM}
    Sleep    1s
    Execute JavaScript    window.scrollTo(0, 500)
    \${scroll_pos}=    Execute JavaScript    return window.pageYOffset
    Should Be True    \${scroll_pos} > 400
    Execute JavaScript    document.querySelector('.footer').scrollIntoView()
    Close Browser

Test JavaScript Element Manipulation
    Open Browser    https://dynamic-app.com    chrome
    \${element}=    Get WebElement    css=#hidden-input
    Execute JavaScript    \${JS_CLICK_HIDDEN}    ARGUMENTS    \${element}
    \${current_value}=    Execute JavaScript    \${JS_GET_VALUE}    ARGUMENTS    \${element}
    Log    Current value: \${current_value}
    Execute JavaScript    \${JS_SET_VALUE}    ARGUMENTS    \${element}    new test value
    \${new_value}=    Execute JavaScript    \${JS_GET_VALUE}    ARGUMENTS    \${element}
    Should Be Equal    \${new_value}    new test value
    Close Browser

Test JavaScript Event Triggering
    Open Browser    https://events-app.com    chrome
    \${input_element}=    Get WebElement    css=input[type="text"]
    Execute JavaScript    \${JS_SET_VALUE}    ARGUMENTS    \${input_element}    trigger test
    Execute JavaScript    \${JS_TRIGGER_EVENT}    ARGUMENTS    \${input_element}
    Wait Until Element Is Visible    css=.validation-message
    Element Should Contain    css=.validation-message    Field updated
    Execute JavaScript    arguments[0].focus()    ARGUMENTS    \${input_element}
    Execute JavaScript    arguments[0].blur()    ARGUMENTS    \${input_element}
    Close Browser

Test JavaScript DOM Queries
    Open Browser    https://complex-dom.com    chrome
    \${element_count}=    Execute JavaScript    return document.querySelectorAll('.item').length
    Should Be True    \${element_count} > 0
    \${first_text}=    Execute JavaScript    return document.querySelector('.item').textContent
    Log    First item text: \${first_text}
    \${all_texts}=    Execute JavaScript    return Array.from(document.querySelectorAll('.item')).map(el => el.textContent)
    Log    All item texts: \${all_texts}
    Execute JavaScript    document.querySelectorAll('.item').forEach(el => el.style.border = '2px solid red')
    Close Browser

Test JavaScript Style Manipulation
    Open Browser    https://styling-app.com    chrome
    \${element}=    Get WebElement    css=.target-element
    \${display_value}=    Execute JavaScript    \${JS_GET_COMPUTED}    ARGUMENTS    \${element}
    Log    Element display: \${display_value}
    Execute JavaScript    arguments[0].style.backgroundColor = 'yellow'    ARGUMENTS    \${element}
    Execute JavaScript    arguments[0].style.display = 'block'    ARGUMENTS    \${element}
    Execute JavaScript    arguments[0].classList.add('highlighted')    ARGUMENTS    \${element}
    \${has_class}=    Execute JavaScript    return arguments[0].classList.contains('highlighted')    ARGUMENTS    \${element}
    Should Be True    \${has_class}
    Close Browser

Test JavaScript Local Storage
    Open Browser    https://storage-app.com    chrome
    Execute JavaScript    localStorage.setItem('testKey', 'testValue')
    \${stored_value}=    Execute JavaScript    return localStorage.getItem('testKey')
    Should Be Equal    \${stored_value}    testValue
    Execute JavaScript    sessionStorage.setItem('sessionKey', 'sessionValue')
    \${session_value}=    Execute JavaScript    return sessionStorage.getItem('sessionKey')
    Should Be Equal    \${session_value}    sessionValue
    Execute JavaScript    localStorage.clear()
    \${cleared_value}=    Execute JavaScript    return localStorage.getItem('testKey')
    Should Be Equal    \${cleared_value}    None
    Close Browser</code></pre>
        
        <h3>🎯 Práctica JavaScript (8 min):</h3>
        <p>1. Ejecutar scroll automático hasta elemento específico</p>
        <p>2. Hacer clic en elemento oculto usando JavaScript</p>
        <p>3. Obtener valor actual de campo con Execute JavaScript</p>
        <p>4. Modificar valor de input usando arguments[0].value</p>
        <p>5. Triggear evento change manualmente en elemento</p>
        <p>6. Consultar DOM con document.querySelectorAll</p>
        <p>7. Obtener todos los textos de elementos similares</p>
        <p>8. Modificar estilos CSS usando JavaScript</p>
        <p>9. Agregar/remover clases CSS dinámicamente</p>
        <p>10. Validar propiedades computadas de elementos</p>
        <p>11. Manejar localStorage para persistir datos</p>
        <p>12. Usar sessionStorage para datos temporales</p>
        <p>13. Ejecutar JavaScript que retorne valores a RF</p>
        <p>14. Pasar elementos WebElement como arguments</p>
        <p>15. Usar focus() y blur() para control de foco</p>
        <p>16. Remover atributos con removeAttribute()</p>
        <p>17. Crear eventos personalizados con dispatchEvent</p>
        <p>18. Validar resultados JavaScript en Robot Framework</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Ejecutar JavaScript desde Robot Framework efectivamente</li>
                <li>Manejar casos que SeleniumLibrary no puede resolver</li>
                <li>Manipular DOM, eventos y storage usando JavaScript</li>
                <li>Integrar resultados JavaScript con lógica Robot Framework</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa ARGUMENTS para pasar WebElements a JavaScript. Siempre valida return values en Robot Framework.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 101 - Interacciones Avanzadas 101</h3>
        <p>Continuarás explorando interacciones web complejas combinando JavaScript con SeleniumLibrary para casos enterprise avanzados.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "intermediate",
    prerequisites: ["lesson-099"],
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_100 = LESSON_100;
}