/**
 * Robot Framework Academy - Lesson 085
 * Fundamentos de CSS Selectors
 */

const LESSON_085 = {
    id: 85,
    title: "Fundamentos de CSS Selectors",
    duration: "10 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🎯 CSS Selectors</h2>
        <p>Domina CSS Selectors desde fundamentos hasta técnicas avanzadas para localización precisa y eficiente de elementos web.</p>
        
        <h3>💻 Selectores fundamentales:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://css-selectors-demo.com
\${BROWSER}             chrome
\${PRODUCT_NAME}        Laptop Gaming
\${USER_EMAIL}          css@selectors.com
\${SEARCH_TERM}         automation testing
\${CATEGORY}            Electronics
\${PRICE_MIN}           100
\${PRICE_MAX}           500

*** Test Cases ***
Test Basic Element Selectors
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=h1
    Element Should Be Visible       css=div
    Element Should Be Visible       css=span
    Element Should Be Visible       css=p
    Element Should Be Visible       css=a
    Element Should Be Visible       css=button
    Element Should Be Visible       css=input
    Element Should Be Visible       css=form
    Element Should Be Visible       css=table
    Element Should Be Visible       css=ul
    Element Should Be Visible       css=li
    Element Should Contain          css=h1                              título
    Element Should Contain          css=p                               texto
    Close Browser

Test ID And Class Selectors
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=#header
    Element Should Be Visible       css=#navigation
    Element Should Be Visible       css=#main-content
    Element Should Be Visible       css=#footer
    Element Should Be Visible       css=.container
    Element Should Be Visible       css=.product-card
    Element Should Be Visible       css=.price-tag
    Element Should Be Visible       css=.btn-primary
    Click Element                   css=#search-button
    Element Should Be Visible       css=.search-results
    Input Text                      css=#search-input                   \${SEARCH_TERM}
    Element Should Contain          css=#search-input                   \${SEARCH_TERM}
    Click Element                   css=.filter-toggle
    Element Should Be Visible       css=.filter-panel
    Close Browser

Test Attribute Selectors Basic
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=[type="text"]
    Element Should Be Visible       css=[type="email"]
    Element Should Be Visible       css=[type="password"]
    Element Should Be Visible       css=[type="submit"]
    Element Should Be Visible       css=[name="username"]
    Element Should Be Visible       css=[name="email"]
    Element Should Be Visible       css=[class="form-control"]
    Element Should Be Visible       css=[id="login-form"]
    Input Text                      css=[name="email"]                  \${USER_EMAIL}
    Element Should Contain          css=[name="email"]                  \${USER_EMAIL}
    Click Element                   css=[type="submit"]
    Element Should Be Visible       css=[class="success-message"]
    Close Browser

Test Descendant Selectors
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.header .logo
    Element Should Be Visible       css=.navigation .menu-item
    Element Should Be Visible       css=.main-content .product-grid
    Element Should Be Visible       css=.product-card .product-title
    Element Should Be Visible       css=.product-card .price-display
    Element Should Be Visible       css=.footer .social-links
    Click Element                   css=.navigation .search-link
    Element Should Be Visible       css=.search-section .search-box
    Input Text                      css=.search-section .search-input  \${PRODUCT_NAME}
    Element Should Contain          css=.search-section .search-input  \${PRODUCT_NAME}
    Click Element                   css=.search-section .search-button
    Element Should Be Visible       css=.results-section .product-list
    Element Should Be Visible       css=.results-section .product-item
    Close Browser

Test Child Selectors Direct
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.menu > li
    Element Should Be Visible       css=.product-grid > .product-card
    Element Should Be Visible       css=.form-group > label
    Element Should Be Visible       css=.form-group > input
    Element Should Be Visible       css=.price-section > .currency
    Element Should Be Visible       css=.price-section > .amount
    Click Element                   css=.menu > li:first-child
    Element Should Be Visible       css=.submenu > .submenu-item
    Click Element                   css=.product-grid > .product-card:first-child
    Element Should Be Visible       css=.product-details > .specification
    Element Should Be Visible       css=.product-details > .description
    Element Should Contain          css=.product-details > .title       producto
    Close Browser

Test Pseudo Class Selectors
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=li:first-child
    Element Should Be Visible       css=li:last-child
    Element Should Be Visible       css=li:nth-child(2)
    Element Should Be Visible       css=li:nth-child(odd)
    Element Should Be Visible       css=li:nth-child(even)
    Element Should Be Visible       css=input:required
    Element Should Be Visible       css=input:enabled
    Element Should Be Visible       css=button:not(.disabled)
    Click Element                   css=li:first-child
    Element Should Be Visible       css=.first-item-content
    Click Element                   css=li:nth-child(3)
    Element Should Be Visible       css=.third-item-content
    Input Text                      css=input:required                  valor requerido
    Element Should Contain          css=input:required                  valor requerido
    Close Browser

Test Multiple Class Selectors
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.product.featured
    Element Should Be Visible       css=.button.primary.large
    Element Should Be Visible       css=.card.product.highlighted
    Element Should Be Visible       css=.form.login.modal
    Element Should Be Visible       css=.menu.navigation.horizontal
    Click Element                   css=.product.featured
    Element Should Be Visible       css=.product-detail.modal.active
    Click Element                   css=.button.primary.large
    Element Should Be Visible       css=.action.completed.success
    Input Text                      css=.input.search.main             \${SEARCH_TERM}
    Element Should Contain          css=.input.search.main             \${SEARCH_TERM}
    Click Element                   css=.filter.category.dropdown
    Element Should Be Visible       css=.options.category.expanded
    Close Browser

Test Attribute Contains Selectors
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=[class*="product"]
    Element Should Be Visible       css=[id*="search"]
    Element Should Be Visible       css=[href*="contact"]
    Element Should Be Visible       css=[src*="image"]
    Element Should Be Visible       css=[data-category*="electronics"]
    Element Should Be Visible       css=[placeholder*="email"]
    Click Element                   css=[class*="add-to-cart"]
    Element Should Be Visible       css=[class*="cart-updated"]
    Input Text                      css=[placeholder*="search"]        \${PRODUCT_NAME}
    Element Should Contain          css=[placeholder*="search"]        \${PRODUCT_NAME}
    Click Element                   css=[href*="category"]
    Element Should Be Visible       css=[class*="category-page"]
    Select From List By Label       css=[data-filter*="price"]         \${CATEGORY}
    Element Should Be Visible       css=[class*="filter-applied"]
    Close Browser</code></pre>
        
        <h3>🎯 Práctica CSS (8 min):</h3>
        <p>1. Usa css=h1, css=div, css=p para elementos básicos</p>
        <p>2. Practica css=#id para identificadores únicos</p>
        <p>3. Combina css=.class para clases CSS</p>
        <p>4. Experimenta css=[attribute="value"] para atributos</p>
        <p>5. Usa css=.parent .child para descendientes</p>
        <p>6. Practica css=.parent > .child para hijos directos</p>
        <p>7. Combina css=:first-child, :last-child, :nth-child()</p>
        <p>8. Usa css=.class1.class2 para múltiples clases</p>
        <p>9. Practica css=[class*="partial"] para contenido parcial</p>
        <p>10. Combina css=input:required para pseudo-clases</p>
        <p>11. Usa css=button:not(.disabled) para exclusiones</p>
        <p>12. Practica css=[href*="link"] para enlaces específicos</p>
        <p>13. Combina Element Should Be Visible + css selectors</p>
        <p>14. Usa Element Should Contain para verificar contenido</p>
        <p>15. Crea selectores específicos pero mantenibles</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar la sintaxis fundamental de CSS Selectors</li>
                <li>Aplicar selectores por elemento, ID, clase y atributos</li>
                <li>Navegar jerarquías DOM con descendant y child selectors</li>
                <li>Utilizar pseudo-clases y selectores múltiples eficientemente</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>CSS Selectors son más rápidos que XPath. Usa #id para únicos, .class para grupos, [attribute] para propiedades específicas. Combina selectores para precisión.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 086 - CSS Selectors intermedios</h3>
        <p>Ahora profundizarás en selectores CSS intermedios: combinadores avanzados, pseudo-elementos y técnicas de localización más sofisticadas.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-084"],
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_085 = LESSON_085;
}