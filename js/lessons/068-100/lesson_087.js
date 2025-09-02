/**
 * Robot Framework Academy - Lesson 087
 * XPath expresiones básicas
 */

const LESSON_087 = {
    id: 87,
    title: "XPath expresiones básicas",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🎯 XPath Básico</h2>
        <p>Domina XPath desde fundamentos para localizar elementos por texto, posición y atributos cuando CSS no es suficiente.</p>
        
        <h3>💻 XPath fundamental:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://xpath-basics.com
\${BROWSER}             chrome
\${BUTTON_TEXT}         Enviar Formulario
\${LINK_TEXT}           Contactar Soporte
\${USER_NAME}           XPathUser
\${PRODUCT_NAME}        Smartphone Pro
\${ERROR_MESSAGE}       Campo requerido
\${TABLE_HEADER}        Nombre Producto

*** Test Cases ***
Test XPath By Element Name
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//div
    Element Should Be Visible       xpath=//span
    Element Should Be Visible       xpath=//button
    Element Should Be Visible       xpath=//input
    Element Should Be Visible       xpath=//form
    Element Should Be Visible       xpath=//table
    Element Should Be Visible       xpath=//tr
    Element Should Be Visible       xpath=//td
    Element Should Be Visible       xpath=//ul
    Element Should Be Visible       xpath=//li
    Element Should Be Visible       xpath=//a
    Element Should Contain          xpath=//h1                          título
    Element Should Contain          xpath=//p                           contenido
    Close Browser

Test XPath By Text Content
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//button[text()='\${BUTTON_TEXT}']
    Element Should Be Visible       xpath=//a[text()='\${LINK_TEXT}']
    Element Should Be Visible       xpath=//span[text()='Precio']
    Element Should Be Visible       xpath=//div[text()='Descripción']
    Element Should Be Visible       xpath=//h2[text()='Productos']
    Element Should Be Visible       xpath=//label[text()='Email']
    Click Element                   xpath=//button[text()='\${BUTTON_TEXT}']
    Element Should Be Visible       xpath=//div[text()='Formulario enviado']
    Click Element                   xpath=//a[text()='\${LINK_TEXT}']
    Element Should Be Visible       xpath=//h3[text()='Soporte Técnico']
    Element Should Contain          xpath=//span[text()='Estado']        Estado
    Element Should Contain          xpath=//td[text()='\${PRODUCT_NAME}'] \${PRODUCT_NAME}
    Close Browser

Test XPath By Attributes
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//input[@type='text']
    Element Should Be Visible       xpath=//input[@type='email']
    Element Should Be Visible       xpath=//input[@type='password']
    Element Should Be Visible       xpath=//button[@type='submit']
    Element Should Be Visible       xpath=//div[@class='container']
    Element Should Be Visible       xpath=//span[@id='status']
    Element Should Be Visible       xpath=//form[@name='login']
    Element Should Be Visible       xpath=//table[@id='products']
    Input Text                      xpath=//input[@name='username']     \${USER_NAME}
    Element Should Contain          xpath=//input[@name='username']     \${USER_NAME}
    Click Element                   xpath=//button[@id='submit-btn']
    Element Should Be Visible       xpath=//div[@class='success-message']
    Close Browser

Test XPath Position Selectors
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//li[1]
    Element Should Be Visible       xpath=//li[2]
    Element Should Be Visible       xpath=//li[last()]
    Element Should Be Visible       xpath=//tr[1]/td[1]
    Element Should Be Visible       xpath=//tr[2]/td[2]
    Element Should Be Visible       xpath=//div[position()=1]
    Element Should Be Visible       xpath=//span[position()=last()]
    Click Element                   xpath=//li[1]
    Element Should Be Visible       xpath=//div[@class='first-item-selected']
    Click Element                   xpath=//tr[3]/td[1]
    Element Should Be Visible       xpath=//div[@class='row-selected']
    Element Should Contain          xpath=//li[1]                       primer
    Element Should Contain          xpath=//td[last()]                  último
    Close Browser

Test XPath Contains Function
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//div[contains(@class,'product')]
    Element Should Be Visible       xpath=//span[contains(@id,'price')]
    Element Should Be Visible       xpath=//a[contains(@href,'contact')]
    Element Should Be Visible       xpath=//input[contains(@placeholder,'email')]
    Element Should Be Visible       xpath=//button[contains(text(),'Enviar')]
    Element Should Be Visible       xpath=//div[contains(text(),'Producto')]
    Click Element                   xpath=//button[contains(@class,'add-cart')]
    Element Should Be Visible       xpath=//div[contains(@class,'cart-updated')]
    Input Text                      xpath=//input[contains(@name,'search')]  \${PRODUCT_NAME}
    Element Should Contain          xpath=//input[contains(@name,'search')]  \${PRODUCT_NAME}
    Click Element                   xpath=//a[contains(text(),'Ver más')]
    Element Should Be Visible       xpath=//div[contains(@class,'expanded')]
    Close Browser

Test XPath Starts With Function
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//div[starts-with(@class,'btn-')]
    Element Should Be Visible       xpath=//input[starts-with(@id,'form-')]
    Element Should Be Visible       xpath=//a[starts-with(@href,'https://')]
    Element Should Be Visible       xpath=//span[starts-with(@data-id,'product-')]
    Element Should Be Visible       xpath=//button[starts-with(text(),'Agregar')]
    Element Should Be Visible       xpath=//div[starts-with(text(),'Total:')]
    Click Element                   xpath=//button[starts-with(@class,'primary-')]
    Element Should Be Visible       xpath=//div[starts-with(@class,'success-')]
    Input Text                      xpath=//input[starts-with(@placeholder,'Ingrese')]  \${USER_NAME}
    Element Should Contain          xpath=//input[starts-with(@placeholder,'Ingrese')]  \${USER_NAME}
    Click Element                   xpath=//a[starts-with(text(),'Descargar')]
    Element Should Be Visible       xpath=//div[starts-with(@class,'download-')]
    Close Browser

Test XPath Parent Child Navigation
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//div[@class='parent']/child::span
    Element Should Be Visible       xpath=//table/child::tbody/child::tr
    Element Should Be Visible       xpath=//ul/child::li[@class='active']
    Element Should Be Visible       xpath=//form/child::div/child::input
    Element Should Be Visible       xpath=//span[@id='price']/parent::div
    Element Should Be Visible       xpath=//input[@name='email']/parent::form
    Click Element                   xpath=//tr/child::td[1]
    Element Should Be Visible       xpath=//tr[@class='selected']/child::td
    Click Element                   xpath=//button/parent::div[@class='actions']
    Element Should Be Visible       xpath=//div[@class='action-executed']
    Element Should Contain          xpath=//td/parent::tr                fila
    Element Should Contain          xpath=//li/parent::ul                lista
    Close Browser

Test XPath Multiple Conditions
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//input[@type='text' and @required]
    Element Should Be Visible       xpath=//div[@class='product' and @data-available='true']
    Element Should Be Visible       xpath=//button[@type='submit' and not(@disabled)]
    Element Should Be Visible       xpath=//span[@class='price' or @class='discount']
    Element Should Be Visible       xpath=//a[@href='/contact' and contains(text(),'Contacto')]
    Element Should Be Visible       xpath=//tr[@class='row' and position()=1]
    Input Text                      xpath=//input[@name='search' and @type='text']  \${PRODUCT_NAME}
    Element Should Contain          xpath=//input[@name='search' and @type='text']  \${PRODUCT_NAME}
    Click Element                   xpath=//button[@class='submit' and contains(text(),'Buscar')]
    Element Should Be Visible       xpath=//div[@class='results' and not(@hidden)]
    Element Should Contain          xpath=//span[@class='count' or @class='total']  resultados
    Element Should Be Visible       xpath=//div[@data-status='active' and @data-type='premium']
    Close Browser</code></pre>
        
        <h3>🎯 Práctica XPath (5 min):</h3>
        <p>1. Usa xpath=//elemento para seleccionar por nombre de tag</p>
        <p>2. Practica xpath=//button[text()='Texto'] para contenido exacto</p>
        <p>3. Combina xpath=//input[@attribute='value'] para atributos</p>
        <p>4. Experimenta xpath=//li[1], xpath=//li[last()] para posiciones</p>
        <p>5. Usa xpath=//div[contains(@class,'partial')] para contenido parcial</p>
        <p>6. Practica xpath=//span[starts-with(@id,'prefix')] para inicios</p>
        <p>7. Combina xpath=//child::elemento para navegación descendiente</p>
        <p>8. Usa xpath=//parent::elemento para navegación ascendiente</p>
        <p>9. Practica xpath=//[@attr1 and @attr2] para múltiples condiciones</p>
        <p>10. Combina xpath=//[@class='a' or @class='b'] para alternativas</p>
        <p>11. Usa xpath=//[not(@disabled)] para negación</p>
        <p>12. Practica xpath=//tr[position()>1] para rangos posición</p>
        <p>13. Combina xpath=//[contains(text(),'partial')] para texto parcial</p>
        <p>14. Usa xpath=//td[1]/parent::tr para navegación compleja</p>
        <p>15. Crea XPaths robustos pero específicos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar sintaxis fundamental de XPath para localización</li>
                <li>Localizar elementos por texto, atributos y posición</li>
                <li>Navegar jerarquías DOM con parent/child axes</li>
                <li>Combinar múltiples condiciones para precisión máxima</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>XPath es más lento que CSS pero más potente. Usa text() para contenido exacto, contains() para parcial, position() para ubicación. and/or para múltiples condiciones.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 088 - XPath expresiones avanzadas</h3>
        <p>Ahora profundizarás en XPath avanzado: axes complejos, funciones de string, expresiones matemáticas y técnicas expertas.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-086"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_087 = LESSON_087;
}