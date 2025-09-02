/**
 * Robot Framework Academy - Lesson 069
 * CSS Selectors avanzados
 */

const LESSON_069 = {
    id: 69,
    title: "CSS Selectors avanzados",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 CSS Avanzado</h2>
        <p>CSS Selectors te permiten localizar elementos con precisión quirúrgica usando atributos, posición, estado y relaciones padre-hijo.</p>
        
        <h3>💻 Selectores potentes:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}           https://tienda.com
\${BROWSER}       chrome
\${PRODUCT_NAME}  Laptop Gaming
\${PRICE_MIN}     500
\${PRICE_MAX}     1500
\${EMAIL}         test@email.com
\${CATEGORY}      Electrónicos
\${QUANTITY}      2

*** Test Cases ***
Test Attribute Selectors
    Open Browser                    \${URL}                        \${BROWSER}
    Click Element                  css=input[type="search"]
    Input Text                     css=input[placeholder="Buscar productos"] \${PRODUCT_NAME}
    Click Button                   css=button[class*="search"]
    Element Should Be Visible      css=div[data-testid="results"]
    Click Element                  css=a[href*="laptop"]
    Page Should Contain            \${PRODUCT_NAME}
    Close Browser

Test Child Selectors
    Open Browser                    \${URL}                        \${BROWSER}
    Click Element                  css=nav > ul > li:first-child
    Element Should Be Visible      css=.category-menu > .submenu
    Click Element                  css=.product-grid > .product-card:nth-child(3)
    Element Should Contain         css=.product-info > .price      \$
    Click Element                  css=.actions > button:last-child
    Page Should Contain            Añadido al carrito
    Close Browser

Test Pseudo Selectors
    Open Browser                    \${URL}                        \${BROWSER}
    Element Should Be Visible      css=input:required
    Click Element                  css=button:enabled
    Element Should Not Be Visible  css=.loading:hidden
    Click Element                  css=.menu-item:hover
    Element Should Be Visible      css=.dropdown:not(.hidden)
    Input Text                     css=input:focus               \${EMAIL}
    Element Should Contain         css=.validation:valid         ✓
    Close Browser

Test Complex Combinations
    Open Browser                    \${URL}                        \${BROWSER}
    Click Element                  css=div.filter-section input[name="category"]
    Select From List By Label      css=select.category-dropdown   \${CATEGORY}
    Input Text                     css=input.price-min[type="number"] \${PRICE_MIN}
    Input Text                     css=input.price-max[type="number"] \${PRICE_MAX}
    Click Button                   css=form.filters button.apply-btn
    Element Should Be Visible      css=.results-container .product-grid
    Element Should Contain         css=.results-count span        productos encontrados
    Close Browser

Test Sibling Selectors
    Open Browser                    \${URL}                        \${BROWSER}
    Click Element                  css=.product-title + .product-price
    Element Should Be Visible      css=.price-label ~ .discount-badge
    Click Element                  css=.quantity-input + .quantity-buttons .increase
    Element Should Contain         css=.quantity-display          \${QUANTITY}
    Click Element                  css=.add-to-cart ~ .wishlist-btn
    Element Should Be Visible      css=.success-message + .continue-shopping
    Close Browser

Test Descendant Selectors
    Open Browser                    \${URL}                        \${BROWSER}
    Element Should Be Visible      css=header .logo img
    Click Element                  css=.main-nav .categories .electronics
    Element Should Be Visible      css=.breadcrumb .current-category
    Click Element                  css=.product-list .featured .product-card
    Element Should Contain         css=.product-details .specifications .memory 16GB
    Click Element                  css=.checkout-form .payment-methods .credit-card
    Close Browser

Test Multiple Attributes
    Open Browser                    \${URL}                        \${BROWSER}
    Click Element                  css=input[type="email"][required][placeholder*="correo"]
    Input Text                     css=input[name="email"][class*="form-control"] \${EMAIL}
    Click Element                  css=button[type="submit"][class="btn btn-primary"][disabled="false"]
    Element Should Be Visible      css=div[class*="success"][data-status="completed"]
    Element Should Contain         css=span[class*="message"][role="alert"] Enviado correctamente
    Page Should Contain Element    css=a[href*="dashboard"][class*="next-step"]
    Close Browser</code></pre>
        
        <h3>🎯 Práctica CSS (5 min):</h3>
        <p>1. Usa css=input[type="password"] para campo contraseña</p>
        <p>2. Prueba css=.menu > li:first-child para primer menú</p>
        <p>3. Experimenta css=button:enabled vs button:disabled</p>
        <p>4. Combina css=div.card[data-id="123"]</p>
        <p>5. Usa css=.product + .price para elementos hermanos</p>
        <p>6. Prueba css=form input:required para campos obligatorios</p>
        <p>7. Experimenta css=.container .row:nth-child(even)</p>
        <p>8. Usa css=a[href*="contact"] para links de contacto</p>
        <p>9. Combina css=.form-group input:not([readonly])</p>
        <p>10. Prueba css=.table tr:last-child td para última fila</p>
        <p>11. Usa css=img[alt*="logo"] para imágenes con alt</p>
        <p>12. Experimenta css=.sidebar ~ .content para hermanos</p>
        <p>13. Combina multiple atributos en un selector</p>
        <p>14. Practica pseudo-clases :hover, :focus, :valid</p>
        <p>15. Crea selectores específicos pero robustos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar selectores CSS avanzados con atributos múltiples</li>
                <li>Usar pseudo-clases y pseudo-elementos eficientemente</li>
                <li>Navegar jerarquías DOM con child/descendant selectors</li>
                <li>Crear localizadores robustos y específicos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>CSS Selectors son más rápidos que XPath y más legibles. Usa [attribute*="value"] para coincidencias parciales.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 070 - XPath expresiones potentes</h3>
        <p>Ahora aprenderás XPath avanzado para casos donde CSS no es suficiente, como buscar por texto o navegación compleja.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-068"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_069 = LESSON_069;
}