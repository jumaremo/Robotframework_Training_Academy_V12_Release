/**
 * Robot Framework Academy - Lesson 094
 * Localizadores Avanzados 094
 */

const LESSON_094 = {
    id: 94,
    title: "Localizadores Avanzados 094",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🎯 Localizadores CSS Complejos</h2>
        <p>Selectores avanzados para elementos web dinámicos y difíciles.</p>
        
        <h3>💻 Selectores avanzados:</h3>
        <pre><code class="robot">*** Variables ***
\${FORM_SELECTOR}     form[data-testid="login"]
\${INPUT_EMAIL}       input[type="email"]:not([disabled])
\${BUTTON_SUBMIT}     button[aria-label*="Submit"]
\${DROPDOWN_ITEM}     li[role="option"]:nth-child(3)
\${DYNAMIC_CONTENT}   div[class^="content-"]:contains("Welcome")
\${SIBLING_ELEMENT}   .header + .navigation
\${PARENT_CONTAINER}  .item:has(> .selected)
\${VISIBLE_LINK}      a:visible:not([aria-hidden="true"])

*** Test Cases ***
Test Selectores CSS Complejos
    Open Browser    https://example.com    chrome
    Wait Until Element Is Visible    \${FORM_SELECTOR}
    Element Should Be Visible    \${INPUT_EMAIL}
    Input Text    \${INPUT_EMAIL}    test@example.com
    Click Element    \${BUTTON_SUBMIT}
    Wait Until Element Is Visible    \${DYNAMIC_CONTENT}
    Element Should Contain    \${DYNAMIC_CONTENT}    Welcome
    Element Should Be Visible    \${SIBLING_ELEMENT}
    Close Browser

Test Selectores Atributos Dinámicos
    Open Browser    https://example.com    chrome
    Element Should Be Visible    css=input[placeholder*="Enter"]
    Element Should Be Visible    css=div[class$="-active"]
    Element Should Be Visible    css=span[data-value~="option"]
    Click Element    css=button[type="button"]:enabled
    Wait Until Element Is Visible    css=.modal[style*="block"]
    Element Text Should Be    css=h1:first-of-type    Expected Title
    Close Browser

Test Selectores Pseudoclases
    Open Browser    https://example.com    chrome
    Element Should Be Visible    css=input:focus
    Element Should Be Visible    css=.item:hover
    Element Should Be Visible    css=option:checked
    Click Element    css=.tab:not(.disabled)
    Element Should Be Visible    css=.content:empty
    Element Count Should Be    css=li:nth-child(odd)    5
    Close Browser

Test Selectores Combinadores
    Open Browser    https://example.com    chrome
    Element Should Be Visible    css=.parent > .child
    Element Should Be Visible    css=.header ~ .footer
    Element Should Be Visible    css=.form .required
    Click Element    css=.nav li + li a
    Element Should Be Visible    css=.container div:last-child
    Element Text Should Be    css=.breadcrumb > span:first-child    Home
    Close Browser

Test XPath Avanzado
    Open Browser    https://example.com    chrome
    Element Should Be Visible    xpath=//div[@class and contains(@id, 'main')]
    Click Element    xpath=//button[normalize-space()='Click Me']
    Element Should Be Visible    xpath=//input[following-sibling::label[text()='Email']]
    Element Text Should Be    xpath=//span[ancestor::div[@class='container']]    Expected
    Element Should Be Visible    xpath=//a[starts-with(@href, 'https://')]
    Element Count Should Be    xpath=//li[position() > 2]    3
    Close Browser</code></pre>
        
        <h3>🎯 Práctica localizadores (5 min):</h3>
        <p>1. Crear selectores CSS para input email requerido y visible</p>
        <p>2. Localizar botón submit usando aria-label parcial</p>
        <p>3. Crear selector para dropdown tercer elemento</p>
        <p>4. Usar pseudoclase :not() para excluir elementos deshabilitados</p>
        <p>5. Crear selector que combine clase y atributo data</p>
        <p>6. Localizar elemento hermano usando combinador +</p>
        <p>7. Crear XPath para texto normalizado en botón</p>
        <p>8. Usar XPath con ancestor para contexto padre</p>
        <p>9. Crear selector para elementos que contienen texto específico</p>
        <p>10. Localizar elemento visible y no oculto con aria</p>
        <p>11. Usar selector de atributo que empiece con cadena</p>
        <p>12. Crear XPath para siguiente hermano con condición</p>
        <p>13. Combinar múltiples pseudoclases en un selector</p>
        <p>14. Usar contains() en XPath para texto parcial</p>
        <p>15. Crear selector para posición específica en lista</p>
        <p>16. Validar count de elementos usando selector avanzado</p>
        <p>17. Probar selectores en diferentes estados de página</p>
        <p>18. Verificar robustez con contenido dinámico</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar selectores CSS complejos con atributos dinámicos</li>
                <li>Usar pseudoclases y combinadores efectivamente</li>
                <li>Crear XPath robusto para elementos difíciles</li>
                <li>Aplicar estrategias de localización para contenido dinámico</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Para elementos dinámicos, usa atributos estables como data-testid o aria-label en lugar de clases que cambian.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 095 - Localizadores Avanzados 095</h3>
        <p>Continuarás perfeccionando técnicas de localización para casos edge y elementos complejos en aplicaciones enterprise.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-093"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_094 = LESSON_094;
}