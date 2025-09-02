/**
 * Robot Framework Academy - Lesson 088
 * XPath expresiones avanzadas
 */

const LESSON_088 = {
    id: 88,
    title: "XPath expresiones avanzadas",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🎯 XPath Avanzado</h2>
        <p>Domina XPath experto con axes complejos, funciones de string, expresiones matemáticas y técnicas avanzadas para casos sofisticados.</p>
        
        <h3>💻 XPath expert:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://xpath-advanced.com
\${BROWSER}             chrome
\${SEARCH_TEXT}         Robot Framework
\${USER_COUNT}          5
\${PRICE_THRESHOLD}     100
\${TABLE_COLUMN}        3
\${ROW_COUNT}           10
\${AUTHOR_NAME}         Expert Author

*** Test Cases ***
Test XPath Axes Complex Navigation
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//div[@class='content']/ancestor::section
    Element Should Be Visible       xpath=//span[@id='price']/ancestor::div[@class='product']
    Element Should Be Visible       xpath=//input[@name='email']/ancestor::form
    Element Should Be Visible       xpath=//td[1]/ancestor::table
    Element Should Be Visible       xpath=//button[@type='submit']/descendant::span
    Element Should Be Visible       xpath=//form/descendant::input[@required]
    Element Should Be Visible       xpath=//table/descendant::td[contains(text(),'Total')]
    Click Element                   xpath=//h2[text()='Productos']/following::button[1]
    Element Should Be Visible       xpath=//h2[text()='Productos']/following::div[@class='product-list']
    Element Should Be Visible       xpath=//label[text()='Email']/following-sibling::input
    Element Should Contain          xpath=//span[@class='title']/ancestor::div[@class='header']  encabezado
    Element Should Contain          xpath=//button/descendant::text()   texto
    Close Browser

Test XPath String Functions Advanced
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//div[string-length(@class)>10]
    Element Should Be Visible       xpath=//span[string-length(text())>5]
    Element Should Be Visible       xpath=//input[string-length(@placeholder)>20]
    Element Should Be Visible       xpath=//a[substring(@href,1,4)='http']
    Element Should Be Visible       xpath=//div[substring(@class,1,4)='prod']
    Element Should Be Visible       xpath=//span[normalize-space(text())='Precio Total']
    Element Should Be Visible       xpath=//button[normalize-space(text())='Enviar Formulario']
    Click Element                   xpath=//a[substring-after(@href,'/')='contact']
    Element Should Be Visible       xpath=//h1[normalize-space(text())='Contacto']
    Input Text                      xpath=//input[string-length(@name)>8]  \${SEARCH_TEXT}
    Element Should Contain          xpath=//input[string-length(@name)>8]  \${SEARCH_TEXT}
    Element Should Contain          xpath=//div[substring(@id,1,5)='form-']  formulario
    Close Browser

Test XPath Mathematical Expressions
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//tr[position()>2 and position()<8]
    Element Should Be Visible       xpath=//li[position() mod 2 = 0]
    Element Should Be Visible       xpath=//div[count(./span)>3]
    Element Should Be Visible       xpath=//table[count(.//tr)>\${ROW_COUNT}]
    Element Should Be Visible       xpath=//ul[count(./li)=\${USER_COUNT}]
    Element Should Be Visible       xpath=//span[@data-price>'\${PRICE_THRESHOLD}']
    Element Should Be Visible       xpath=//tr[position()=ceiling(last() div 2)]
    Click Element                   xpath=//button[position()=floor(last() div 2)]
    Element Should Be Visible       xpath=//div[@class='middle-button-clicked']
    Element Should Be Visible       xpath=//td[position()=\${TABLE_COLUMN}]
    Element Should Contain          xpath=//span[number(@data-value)>50]     alto
    Element Should Contain          xpath=//div[sum(.//span/@data-price)>500]  caro
    Close Browser

Test XPath Preceding Following Advanced
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//h2[text()='Sección B']/preceding::h2[text()='Sección A']
    Element Should Be Visible       xpath=//input[@name='password']/preceding::input[@name='email']
    Element Should Be Visible       xpath=//button[text()='Cancelar']/preceding-sibling::button[text()='Aceptar']
    Element Should Be Visible       xpath=//td[3]/preceding-sibling::td[1]
    Element Should Be Visible       xpath=//h2[text()='Inicio']/following::h2[text()='Fin']
    Element Should Be Visible       xpath=//label[text()='Nombre']/following::label[text()='Email']
    Element Should Be Visible       xpath=//tr[1]/following-sibling::tr[2]
    Click Element                   xpath=//span[text()='Producto A']/following-sibling::button[text()='Comprar']
    Element Should Be Visible       xpath=//div[@class='purchase-confirmed']
    Click Element                   xpath=//h3[text()='Categoría']/following::select[1]
    Element Should Be Visible       xpath=//option[@selected]
    Element Should Contain          xpath=//td[2]/preceding-sibling::td[1]  primera
    Close Browser

Test XPath Complex Predicates
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//div[@class='product'][.//span[contains(text(),'Oferta')]]
    Element Should Be Visible       xpath=//tr[td[1][text()='\${AUTHOR_NAME}']]
    Element Should Be Visible       xpath=//form[.//input[@required] and .//button[@type='submit']]
    Element Should Be Visible       xpath=//ul[li[position()=1][text()='Primero']]
    Element Should Be Visible       xpath=//table[thead[tr[th[text()='Nombre']]]]
    Element Should Be Visible       xpath=//div[@class='card'][.//h3 and .//button]
    Click Element                   xpath=//tr[td[2][contains(text(),'Activo')]]/td[1]
    Element Should Be Visible       xpath=//tr[@class='selected']
    Click Element                   xpath=//div[@class='item'][.//span[@class='price']][1]
    Element Should Be Visible       xpath=//div[@class='item-selected']
    Element Should Contain          xpath=//form[.//label[text()='Email']]  formulario
    Element Should Contain          xpath=//section[.//h2[text()='Título']]  contenido
    Close Browser

Test XPath Union And Intersect
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//input[@type='text'] | //input[@type='email']
    Element Should Be Visible       xpath=//button[@class='primary'] | //button[@class='secondary']
    Element Should Be Visible       xpath=//div[@class='product'] | //div[@class='service']
    Element Should Be Visible       xpath=//h1 | //h2 | //h3
    Element Should Be Visible       xpath=//table//td[1] | //table//th[1]
    Element Should Be Visible       xpath=//span[@class='price'] | //span[@class='discount']
    Click Element                   xpath=(//button[@class='action'] | //a[@class='action'])[1]
    Element Should Be Visible       xpath=//div[@class='action-result']
    Input Text                      xpath=(//input[@name='search'] | //input[@id='search'])[1]  \${SEARCH_TEXT}
    Element Should Contain          xpath=(//input[@name='search'] | //input[@id='search'])[1]  \${SEARCH_TEXT}
    Element Should Contain          xpath=//span[@class='total'] | //span[@class='sum']  cantidad
    Element Should Be Visible       xpath=(//div[@class='result'] | //div[@class='output'])[last()]
    Close Browser

Test XPath Variables And Functions
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//div[local-name()='div']
    Element Should Be Visible       xpath=//span[name()='span']
    Element Should Be Visible       xpath=//*[local-name()='button' and @type='submit']
    Element Should Be Visible       xpath=//input[boolean(@required)]
    Element Should Be Visible       xpath=//div[not(boolean(@hidden))]
    Element Should Be Visible       xpath=//span[translate(@class,'ABCD','abcd')='product']
    Element Should Be Visible       xpath=//a[concat(@href, '?param=value')]
    Click Element                   xpath=//button[boolean(@enabled) or not(@disabled)]
    Element Should Be Visible       xpath=//div[@class='enabled-clicked']
    Element Should Be Visible       xpath=//input[translate(text(),'ABC','abc')='converted']
    Element Should Contain          xpath=//span[concat('Precio: ', text())]  Precio:
    Element Should Contain          xpath=//*[local-name()='div'][@class='content']  información
    Close Browser

Test XPath Performance Optimized
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=(//*[@class='fast-selector'])[1]
    Element Should Be Visible       xpath=(//div[@id][@class])[1]
    Element Should Be Visible       xpath=//table[1]//tr[position()<=5]
    Element Should Be Visible       xpath=(//button | //input)[position()<=3]
    Element Should Be Visible       xpath=//form[1]//*[@required][1]
    Element Should Be Visible       xpath=(//div[contains(@class,'product')])[position()<=\${USER_COUNT}]
    Click Element                   xpath=(//a[starts-with(@href,'http')])[1]
    Element Should Be Visible       xpath=//div[@class='external-link-opened']
    Element Should Be Visible       xpath=(//span[@data-price])[position()=1]
    Element Should Contain          xpath=(//h2 | //h3)[1]               encabezado
    Element Should Contain          xpath=//table[1]//td[1]               primera
    Element Should Be Visible       xpath=(//*[text()])[position()<=10]
    Close Browser</code></pre>
        
        <h3>🎯 Práctica avanzado (5 min):</h3>
        <p>1. Usa xpath=//ancestor:: para navegar hacia elementos padre</p>
        <p>2. Practica xpath=//descendant:: para navegar hacia elementos hijo</p>
        <p>3. Combina xpath=//following:: y //preceding:: para hermanos</p>
        <p>4. Experimenta string-length(), substring(), normalize-space()</p>
        <p>5. Usa xpath=//[position()>2 and position()<8] para rangos</p>
        <p>6. Practica xpath=//[count(./elemento)>N] para conteos</p>
        <p>7. Combina xpath=//[.//subelemento] para predicados anidados</p>
        <p>8. Usa xpath=//elemento1 | //elemento2 para unión</p>
        <p>9. Practica xpath=//[boolean(@attribute)] para validación</p>
        <p>10. Combina xpath=//[local-name()='elemento'] para nombres dinámicos</p>
        <p>11. Usa xpath=(//elementos)[position()<=N] para límites</p>
        <p>12. Practica xpath=//[translate(text(),'ABC','abc')] para conversión</p>
        <p>13. Combina xpath=//[concat('prefix', text())] para concatenación</p>
        <p>14. Usa xpath=//[sum(.//span/@value)>threshold] para cálculos</p>
        <p>15. Crea XPaths optimizados para performance y precisión</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar axes complejos para navegación DOM avanzada</li>
                <li>Aplicar funciones de string y matemáticas en XPath</li>
                <li>Crear predicados complejos con múltiples condiciones</li>
                <li>Optimizar expresiones XPath para performance y precisión</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>ancestor:: navega hacia arriba, descendant:: hacia abajo. string-length() y count() para validaciones. Use (//elements)[1] para performance. Predicados [.//] para condiciones anidadas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 089 - Estrategias de localización robusta</h3>
        <p>Ahora aprenderás a combinar CSS y XPath inteligentemente, crear localizadores a prueba de cambios y strategies de fallback automático.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-087"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_088 = LESSON_088;
}