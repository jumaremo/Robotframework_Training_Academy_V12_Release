/**
 * Robot Framework Academy - Lesson 070
 * XPath expresiones potentes
 */

const LESSON_070 = {
    id: 70,
    title: "XPath expresiones potentes",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 XPath Potente</h2>
        <p>XPath es el localizador más poderoso: encuentra elementos por texto, posición, atributos complejos y relaciones familiares que CSS no puede manejar.</p>
        
        <h3>💻 XPath avanzado:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}           https://biblioteca.com
\${BROWSER}       chrome
\${LIBRO_TITULO}  Robot Framework Guide
\${AUTOR_NOMBRE}  John Smith
\${CATEGORIA}     Tecnología
\${USUARIO}       bibliotecario@test.com
\${BUSQUEDA}      automation testing
\${PRECIO_MAX}    50

*** Test Cases ***
Test XPath By Text
    Open Browser                    \${URL}                                    \${BROWSER}
    Click Element                  xpath=//button[text()='Buscar']
    Input Text                     xpath=//input[@placeholder='Título del libro'] \${LIBRO_TITULO}
    Click Element                  xpath=//a[contains(text(),'Búsqueda avanzada')]
    Element Should Be Visible      xpath=//h2[text()='Filtros de búsqueda']
    Click Element                  xpath=//span[contains(text(),'\${CATEGORIA}')]
    Element Should Contain         xpath=//div[text()='Resultados encontrados'] \${LIBRO_TITULO}
    Close Browser

Test XPath Ancestors Descendants
    Open Browser                    \${URL}                                    \${BROWSER}
    Click Element                  xpath=//table//tr[td[text()='\${AUTOR_NOMBRE}']]//button
    Element Should Be Visible      xpath=//div[@class='modal']//h3[text()='Detalles del autor']
    Click Element                  xpath=//ul[@class='books-list']//li[contains(.,'Guide')]
    Element Should Be Visible      xpath=//div[ancestor::section[@id='book-details']]//span[@class='price']
    Click Element                  xpath=//form[descendant::input[@name='quantity']]//button[@type='submit']
    Element Should Contain         xpath=//div[child::span[text()='Añadido']]  carrito
    Close Browser

Test XPath Siblings Following
    Open Browser                    \${URL}                                    \${BROWSER}
    Click Element                  xpath=//label[text()='Categoría']/following-sibling::select
    Select From List By Label      xpath=//select[preceding-sibling::label[text()='Categoría']] \${CATEGORIA}
    Input Text                     xpath=//input[following-sibling::button[text()='Buscar']] \${BUSQUEDA}
    Click Element                  xpath=//button[preceding-sibling::input[@type='search']]
    Element Should Be Visible      xpath=//div[following::div[@class='pagination']]
    Element Should Contain         xpath=//span[following-sibling::strong] resultados
    Close Browser

Test XPath Conditions Multiple
    Open Browser                    \${URL}                                    \${BROWSER}
    Click Element                  xpath=//div[@class='product' and @data-available='true']
    Element Should Be Visible      xpath=//input[@type='number' and @min='1' and @max='10']
    Input Text                     xpath=//input[@name='email' and @required] \${USUARIO}
    Click Element                  xpath=//button[@type='submit' and not(@disabled)]
    Element Should Be Visible      xpath=//div[@class='success' or @class='confirmation']
    Element Should Contain         xpath=//span[@class='total' and @data-currency='USD'] \$
    Close Browser

Test XPath Position Functions
    Open Browser                    \${URL}                                    \${BROWSER}
    Click Element                  xpath=//ul[@class='menu']/li[1]
    Element Should Be Visible      xpath=//tr[position()=last()]/td[2]
    Click Element                  xpath=//div[@class='products']/div[position()>2 and position()<6]
    Element Should Contain         xpath=//option[position()=1]              Seleccionar
    Click Element                  xpath=//button[position()=last()]
    Element Should Be Visible      xpath=//li[last()-1]/span
    Close Browser

Test XPath String Functions
    Open Browser                    \${URL}                                    \${BROWSER}
    Click Element                  xpath=//a[starts-with(@href,'https://')]
    Element Should Be Visible      xpath=//input[starts-with(@placeholder,'Ingrese')]
    Click Element                  xpath=//div[contains(@class,'card-') and contains(@class,'product')]
    Input Text                     xpath=//input[substring(@name,1,4)='user'] \${USUARIO}
    Element Should Contain         xpath=//span[string-length(text())>10]    información
    Click Element                  xpath=//button[normalize-space(text())='Comprar Ahora']
    Close Browser

Test XPath Count Calculations
    Open Browser                    \${URL}                                    \${BROWSER}
    Element Should Be Visible      xpath=//div[count(./div[@class='item'])>3]
    Click Element                  xpath=//select[count(option)>5]/option[3]
    Element Should Contain         xpath=//span[count(../span)=2]            total
    Click Element                  xpath=//table[count(.//tr)>10]//button
    Element Should Be Visible      xpath=//ul[count(li[@class='active'])=1]
    Element Should Contain         xpath=//div[sum(.//span[@class='price'])>\${PRECIO_MAX}] productos
    Close Browser</code></pre>
        
        <h3>🎯 Práctica XPath (5 min):</h3>
        <p>1. Usa xpath=//button[text()='Guardar'] para botón específico</p>
        <p>2. Prueba xpath=//div[contains(@class,'error')] para errores</p>
        <p>3. Experimenta xpath=//input[@type='email']/following-sibling::span</p>
        <p>4. Combina xpath=//tr[td[text()='Total']]/td[2] para tablas</p>
        <p>5. Usa xpath=//li[position()=1] para primer elemento</p>
        <p>6. Prueba xpath=//a[starts-with(@href,'mailto:')] para emails</p>
        <p>7. Experimenta xpath=//div[ancestor::form[@id='login']]</p>
        <p>8. Usa xpath=//span[contains(text(),'$')] para precios</p>
        <p>9. Combina xpath=//button[@type='submit' and not(@disabled)]</p>
        <p>10. Prueba xpath=//select[count(option)>3] para selectores</p>
        <p>11. Usa xpath=//div[child::input[@required]] para obligatorios</p>
        <p>12. Experimenta xpath=//table//tr[last()]/td[1]</p>
        <p>13. Combina xpath=//a[normalize-space(text())='Ver más']</p>
        <p>14. Practica xpath=//div[@data-id and @data-type] atributos</p>
        <p>15. Crea XPaths robustos pero específicos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar XPath para casos donde CSS no es suficiente</li>
                <li>Navegar relaciones familiares: ancestor, descendant, sibling</li>
                <li>Usar funciones XPath: text(), position(), count(), contains()</li>
                <li>Crear localizadores robustos con condiciones múltiples</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>XPath es más lento que CSS pero más potente. Úsalo cuando necesites buscar por texto o relaciones complejas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 071 - Estrategias de localización robusta</h3>
        <p>Ahora aprenderás a combinar CSS y XPath inteligentemente, crear localizadores a prueba de cambios y debugging de elementos.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-069"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_070 = LESSON_070;
}