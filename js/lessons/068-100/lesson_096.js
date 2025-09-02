/**
 * Robot Framework Academy - Lesson 096
 * Localizadores Avanzados 096
 */

const LESSON_096 = {
    id: 96,
    title: "Localizadores Avanzados 096",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>⚡ SPA y Shadow DOM</h2>
        <p>Localizadores para aplicaciones modernas con contenido dinámico.</p>
        
        <h3>💻 Elementos SPA dinámicos:</h3>
        <pre><code class="robot">*** Variables ***
\${SPA_COMPONENT}       css=[data-component="user-profile"]
\${REACT_ELEMENT}       css=[data-reactid]:not([data-reactid=""])
\${VUE_DIRECTIVE}       css=[v-if]:visible, [v-show]:not([style*="none"])
\${ANGULAR_BINDING}     css=[ng-if]:visible, [*ngIf]:not(.ng-hide)
\${SHADOW_HOST}         css=custom-element::shadow
\${IFRAME_CONTENT}      css=iframe[src*="widget"]
\${LAZY_LOADED}         css=[data-lazy="loaded"]:visible
\${ASYNC_CONTENT}       css=[data-state="ready"]:not([aria-busy])

*** Test Cases ***
Test Componentes React SPA
    Open Browser    https://react-app.com    chrome
    Wait Until Element Is Visible    \${REACT_ELEMENT}
    Element Should Be Visible    css=[data-testid="react-component"]:visible
    Click Element    css=button[data-action="load-more"]:enabled
    Wait Until Element Is Visible    css=[data-loading="false"]
    Element Count Should Be    css=[data-item]:visible    10
    Element Should Contain    css=[data-total-count]    10 items
    Element Should Be Visible    css=[data-pagination="true"]
    Close Browser

Test Contenido Lazy Loading
    Open Browser    https://spa-app.com    chrome
    Scroll Element Into View    css=[data-lazy-trigger]
    Wait Until Element Is Visible    \${LAZY_LOADED}
    Element Should Be Visible    css=img[data-src][src]:not([src=""])
    Element Count Should Be    css=[data-lazy="loaded"]:visible    5
    Element Should Not Be Visible    css=[data-lazy="loading"]
    Element Text Should Be    css=[data-status]    All content loaded
    Close Browser

Test Shadow DOM Elements
    Open Browser    https://web-components.com    chrome
    Wait Until Element Is Visible    css=my-component
    Execute JavaScript    return document.querySelector('my-component').shadowRoot.querySelector('button')
    Click Element    css=my-component >>> button[slot="action"]
    Wait Until Element Is Visible    css=my-component >>> .result:visible
    Element Should Contain    css=my-component >>> .message    Success
    Element Should Be Visible    css=my-component >>> [part="status"]
    Close Browser

Test Aplicaciones Vue.js
    Open Browser    https://vue-app.com    chrome
    Wait Until Element Is Visible    \${VUE_DIRECTIVE}
    Element Should Be Visible    css=[v-model]:not([disabled])
    Input Text    css=input[v-model="searchTerm"]    test query
    Click Element    css=button[@click="search"]:enabled
    Wait Until Element Is Visible    css=[v-for]:visible
    Element Count Should Be    css=.search-result[v-for]:visible    3
    Element Text Should Be    css=[v-text="resultCount"]    3
    Close Browser

Test Frameworks Angular
    Open Browser    https://angular-app.com    chrome
    Wait Until Element Is Visible    \${ANGULAR_BINDING}
    Element Should Be Visible    css=[*ngFor]:visible:not(.ng-hide)
    Click Element    css=button[ng-click="loadData()"]:enabled
    Wait Until Element Is Not Visible    css=[*ngIf="loading"]
    Element Should Be Visible    css=[*ngIf="dataLoaded"]:visible
    Element Count Should Be    css=.data-item[*ngFor]:visible    5
    Element Text Should Be    css=[ng-bind="totalItems"]    5
    Close Browser

Test Contenido Asíncrono
    Open Browser    https://async-app.com    chrome
    Click Element    css=button[data-async="trigger"]:enabled
    Wait Until Element Is Visible    css=[data-state="loading"]
    Wait Until Element Is Not Visible    css=[data-state="loading"]
    Wait Until Element Is Visible    \${ASYNC_CONTENT}
    Element Should Be Visible    css=[data-loaded="true"]:visible
    Element Should Not Have Attribute    css=[data-container]    aria-busy
    Element Text Should Be    css=[data-message]    Content loaded successfully
    Close Browser</code></pre>
        
        <h3>🎯 Práctica SPA (5 min):</h3>
        <p>1. Localizar componente React usando data-testid</p>
        <p>2. Esperar hasta que elemento lazy-loading esté visible</p>
        <p>3. Usar JavaScript para acceder a Shadow DOM</p>
        <p>4. Localizar elementos Vue con directivas v-if/v-show</p>
        <p>5. Crear selector Angular que excluya clases .ng-hide</p>
        <p>6. Manejar contenido que se carga asíncronamente</p>
        <p>7. Usar >>> selector para penetrar Shadow DOM</p>
        <p>8. Validar estados de carga con data-attributes</p>
        <p>9. Localizar por atributos framework-específicos</p>
        <p>10. Esperar condiciones múltiples antes de interactuar</p>
        <p>11. Usar scroll para activar lazy loading</p>
        <p>12. Validar count de elementos generados dinámicamente</p>
        <p>13. Manejar iframes con contenido dinámico</p>
        <p>14. Localizar elementos con binding de datos</p>
        <p>15. Usar selectores que ignoren estados transitorios</p>
        <p>16. Validar atributos ARIA en componentes SPA</p>
        <p>17. Probar robustez con re-renders frecuentes</p>
        <p>18. Verificar que localizadores funcionan post-navegación SPA</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Localizar elementos en aplicaciones React, Vue y Angular</li>
                <li>Manejar Shadow DOM y Web Components efectivamente</li>
                <li>Trabajar con contenido lazy-loaded y asíncrono</li>
                <li>Crear estrategias robustas para SPAs dinámicas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Para SPAs usa Wait Until + data-state attributes. Shadow DOM requiere JavaScript o >>> CSS selector.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 097 - Localizadores Avanzados 097</h3>
        <p>Explorarás técnicas avanzadas de performance y optimización de localizadores para aplicaciones enterprise complejas.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-095"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_096 = LESSON_096;
}