/**
 * Robot Framework Academy - Lesson 086
 * CSS Selectors intermedios
 */

const LESSON_086 = {
    id: 86,
    title: "CSS Selectors intermedios",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🎯 CSS Intermedios</h2>
        <p>Avanza en CSS Selectors con combinadores sofisticados, pseudo-elementos y técnicas de localización para casos complejos de automation.</p>
        
        <h3>💻 Selectores avanzados:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://css-intermediate.com
\${BROWSER}             chrome
\${SEARCH_TERM}         automation tools
\${USER_NAME}           TestUser
\${PRODUCT_CATEGORY}    Software
\${FILTER_VALUE}        premium
\${TABLE_ROW}           3
\${FORM_SECTION}        billing

*** Test Cases ***
Test Sibling Selectors Advanced
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.label + .input
    Element Should Be Visible       css=.title + .description
    Element Should Be Visible       css=.price + .currency
    Element Should Be Visible       css=.button + .tooltip
    Click Element                   css=.tab-button + .tab-content
    Element Should Be Visible       css=.active-tab + .tab-panel
    Element Should Be Visible       css=.error-icon + .error-message
    Element Should Contain          css=.label + .value                 información
    Input Text                      css=.search-label + .search-input  \${SEARCH_TERM}
    Element Should Contain          css=.search-label + .search-input  \${SEARCH_TERM}
    Click Element                   css=.submit-button + .loading-icon
    Element Should Be Visible       css=.success-icon + .success-text
    Close Browser

Test General Sibling Selectors
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.header ~ .navigation
    Element Should Be Visible       css=.title ~ .content
    Element Should Be Visible       css=.form-group ~ .form-actions
    Element Should Be Visible       css=.product-image ~ .product-info
    Click Element                   css=.toggle-button ~ .collapsible-content
    Element Should Be Visible       css=.toggle-button ~ .expanded-panel
    Element Should Be Visible       css=.required-field ~ .validation-message
    Input Text                      css=.username-field ~ .password-field  \${USER_NAME}
    Element Should Contain          css=.username-field ~ .password-field  \${USER_NAME}
    Click Element                   css=.category-filter ~ .apply-filter
    Element Should Be Visible       css=.category-filter ~ .filtered-results
    Element Should Contain          css=.filter-label ~ .filter-count      resultados
    Close Browser

Test Attribute Starts With Ends With
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=[class^="btn-"]
    Element Should Be Visible       css=[id^="form-"]
    Element Should Be Visible       css=[href^="https://"]
    Element Should Be Visible       css=[src^="/images/"]
    Element Should Be Visible       css=[class$="-primary"]
    Element Should Be Visible       css=[id$="-container"]
    Element Should Be Visible       css=[href$=".pdf"]
    Element Should Be Visible       css=[src$=".jpg"]
    Click Element                   css=[class^="add-to-cart"]
    Element Should Be Visible       css=[class$="-success"]
    Input Text                      css=[name^="contact"]               \${USER_NAME}
    Element Should Contain          css=[name^="contact"]               \${USER_NAME}
    Click Element                   css=[href$="/download"]
    Element Should Be Visible       css=[class^="download-"]
    Close Browser

Test Pseudo Elements Selectors
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.tooltip::before
    Element Should Be Visible       css=.quote::after
    Element Should Be Visible       css=.dropdown::before
    Element Should Be Visible       css=.badge::after
    Element Should Be Visible       css=.arrow::before
    Element Should Be Visible       css=.counter::after
    Click Element                   css=.expandable::before
    Element Should Be Visible       css=.expanded::after
    Element Should Be Visible       css=.notification::before
    Element Should Contain          css=.content::after                 adicional
    Input Text                      css=.search-box                    \${SEARCH_TERM}
    Element Should Be Visible       css=.search-icon::before
    Click Element                   css=.submit::after
    Element Should Be Visible       css=.success::before
    Close Browser

Test Nth Child Advanced Patterns
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=tr:nth-child(2n)
    Element Should Be Visible       css=tr:nth-child(2n+1)
    Element Should Be Visible       css=li:nth-child(3n)
    Element Should Be Visible       css=div:nth-child(4n+2)
    Element Should Be Visible       css=.item:nth-child(-n+3)
    Element Should Be Visible       css=.product:nth-child(n+4)
    Click Element                   css=tr:nth-child(\${TABLE_ROW})
    Element Should Be Visible       css=.selected-row
    Click Element                   css=li:nth-child(odd)
    Element Should Be Visible       css=.odd-item-selected
    Element Should Contain          css=td:nth-child(2)                 datos
    Click Element                   css=.button:nth-child(even)
    Element Should Be Visible       css=.even-button-activated
    Element Should Contain          css=.list-item:nth-child(1)         primer
    Close Browser

Test Complex Combinators
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.container > .row > .column
    Element Should Be Visible       css=.menu .item + .submenu
    Element Should Be Visible       css=.form .group ~ .actions
    Element Should Be Visible       css=.card > .header + .body
    Element Should Be Visible       css=.table > tbody > tr:first-child
    Element Should Be Visible       css=.navigation .link:not(.disabled)
    Click Element                   css=.sidebar > .widget:last-child
    Element Should Be Visible       css=.widget-expanded
    Click Element                   css=.form > .section[\${FORM_SECTION}] .input
    Element Should Be Visible       css=.input-focused
    Input Text                      css=.search > .input:not([readonly])  \${SEARCH_TERM}
    Element Should Contain          css=.search > .input:not([readonly])  \${SEARCH_TERM}
    Click Element                   css=.filters > .option:nth-child(2)
    Element Should Be Visible       css=.filter-applied
    Close Browser

Test Multiple Attribute Selectors
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=[type="text"][required]
    Element Should Be Visible       css=[class*="button"][disabled="false"]
    Element Should Be Visible       css=[data-category="\${PRODUCT_CATEGORY}"][data-status="active"]
    Element Should Be Visible       css=[name^="user"][type$="email"]
    Element Should Be Visible       css=[id*="form"][class^="validate"]
    Input Text                      css=[type="text"][required]        \${USER_NAME}
    Element Should Contain          css=[type="text"][required]        \${USER_NAME}
    Click Element                   css=[class*="submit"][type="button"]
    Element Should Be Visible       css=[class*="success"][data-status="completed"]
    Select From List By Label       css=[name="category"][multiple]    \${PRODUCT_CATEGORY}
    Element Should Be Visible       css=[class*="selected"][data-value="\${PRODUCT_CATEGORY}"]
    Click Element                   css=[role="button"][aria-expanded="false"]
    Element Should Be Visible       css=[role="menu"][aria-hidden="false"]
    Close Browser

Test Negation Selectors Advanced
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=button:not(.disabled)
    Element Should Be Visible       css=input:not([readonly])
    Element Should Be Visible       css=.item:not(.hidden)
    Element Should Be Visible       css=tr:not(:first-child)
    Element Should Be Visible       css=.link:not([href="#"])
    Element Should Be Visible       css=.form-field:not(.optional)
    Click Element                   css=.tab:not(.active)
    Element Should Be Visible       css=.tab-content:not(.hidden)
    Input Text                      css=.input:not(.disabled)          \${FILTER_VALUE}
    Element Should Contain          css=.input:not(.disabled)          \${FILTER_VALUE}
    Click Element                   css=.option:not(.selected)
    Element Should Be Visible       css=.option.selected:not(.disabled)
    Element Should Be Visible       css=.result:not(.empty)
    Element Should Contain          css=.status:not(.error)             activo
    Close Browser</code></pre>
        
        <h3>🎯 Práctica intermedios (5 min):</h3>
        <p>1. Usa css=.label + .input para elementos hermanos adyacentes</p>
        <p>2. Practica css=.header ~ .content para hermanos generales</p>
        <p>3. Combina css=[class^="btn-"] para atributos que inician</p>
        <p>4. Experimenta css=[id$="-container"] para atributos que terminan</p>
        <p>5. Usa css=.tooltip::before para pseudo-elementos</p>
        <p>6. Practica css=tr:nth-child(2n) para patrones pares</p>
        <p>7. Combina css=.container > .row > .column para anidación</p>
        <p>8. Usa css=[type="text"][required] para múltiples atributos</p>
        <p>9. Practica css=button:not(.disabled) para negación</p>
        <p>10. Combina css=.item:nth-child(-n+3) para primeros N elementos</p>
        <p>11. Usa css=.link:not([href="#"]) para exclusiones específicas</p>
        <p>12. Practica css=.form .group ~ .actions para combinadores</p>
        <p>13. Combina css=[data-status="active"][data-type="premium"]</p>
        <p>14. Usa css=tr:nth-child(odd):not(:first-child) compuestos</p>
        <p>15. Crea selectores robustos con combinadores múltiples</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar combinadores de hermanos adyacentes y generales</li>
                <li>Aplicar selectores de atributos con starts-with y ends-with</li>
                <li>Utilizar pseudo-elementos y nth-child con patrones complejos</li>
                <li>Crear selectores sofisticados con negación y múltiples atributos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>+ selecciona hermano inmediato, ~ hermanos generales. ^= inicia con, $= termina con, *= contiene. :not() excluye elementos. Combina selectores para precisión máxima.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 087 - XPath expresiones básicas</h3>
        <p>Ahora aprenderás XPath desde fundamentos, el localizador más potente para casos donde CSS no es suficiente.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-085"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_086 = LESSON_086;
}