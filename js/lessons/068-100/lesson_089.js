/**
 * Robot Framework Academy - Lesson 089
 * Estrategias de localización robusta
 */

const LESSON_089 = {
    id: 89,
    title: "Estrategias de localización robusta",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🎯 Localización Robusta</h2>
        <p>Combina CSS y XPath inteligentemente, crea localizadores a prueba de cambios y implementa strategies de fallback automático para automation estable.</p>
        
        <h3>💻 Estrategias híbridas:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://robust-locators.com
\${BROWSER}             chrome
\${PRODUCT_NAME}        Smartphone Pro Max
\${USER_EMAIL}          robust@locators.com
\${DYNAMIC_ID}          element-12345
\${ERROR_TIMEOUT}       5s
\${FALLBACK_TIMEOUT}    3s
\${RETRY_COUNT}         3

*** Test Cases ***
Test CSS XPath Fallback Strategy
    Open Browser                    \${URL}                              \${BROWSER}
    \${css_success}=  Run Keyword And Return Status  Element Should Be Visible  css=#primary-button
    Run Keyword If  \${css_success}  Click Element  css=#primary-button
    Run Keyword If  not \${css_success}  Click Element  xpath=//button[@class='primary']
    \${form_visible}=  Run Keyword And Return Status  Element Should Be Visible  css=.login-form
    Run Keyword If  \${form_visible}  Input Text  css=input[name='email']  \${USER_EMAIL}
    Run Keyword If  not \${form_visible}  Input Text  xpath=//input[contains(@placeholder,'email')]  \${USER_EMAIL}
    \${submit_found}=  Run Keyword And Return Status  Element Should Be Visible  css=[type='submit']
    Run Keyword If  \${submit_found}  Click Element  css=[type='submit']
    Run Keyword If  not \${submit_found}  Click Element  xpath=//button[contains(text(),'Submit')]
    Element Should Be Visible       css=.success-message, xpath=//div[contains(text(),'Success')]
    Close Browser

Test Multiple Locator Attempts
    Open Browser                    \${URL}                              \${BROWSER}
    \${locators}=  Create List      css=#search-box    css=.search-input    xpath=//input[@placeholder*='search']    xpath=//input[@name='query']
    FOR  \${locator}  IN  @{locators}
        \${success}=  Run Keyword And Return Status  Element Should Be Visible  \${locator}  \${FALLBACK_TIMEOUT}
        Run Keyword If  \${success}  Input Text  \${locator}  \${PRODUCT_NAME}
        Run Keyword If  \${success}  Exit For Loop
        Run Keyword If  not \${success}  Log  Locator failed: \${locator}
    END
    \${search_buttons}=  Create List  css=.search-btn    css=[type='submit']    xpath=//button[text()='Search']    xpath=//input[@value='Search']
    FOR  \${button}  IN  @{search_buttons}
        \${found}=  Run Keyword And Return Status  Element Should Be Visible  \${button}  \${FALLBACK_TIMEOUT}
        Run Keyword If  \${found}  Click Element  \${button}
        Run Keyword If  \${found}  Exit For Loop
    END
    Element Should Be Visible       css=.search-results, xpath=//div[@class='results']
    Close Browser

Test Dynamic Element Handling
    Open Browser                    \${URL}                              \${BROWSER}
    Wait Until Keyword Succeeds     10s  1s  Element Should Be Visible  css=.dynamic-content, xpath=//div[@data-loaded='true']
    \${dynamic_success}=  Run Keyword And Return Status  Element Should Be Visible  css=#\${DYNAMIC_ID}
    Run Keyword If  not \${dynamic_success}  Element Should Be Visible  xpath=//div[starts-with(@id,'element-')]
    \${product_card}=  Run Keyword And Return Status  Element Should Be Visible  css=.product-card[data-id]
    Run Keyword If  \${product_card}  Click Element  css=.product-card[data-id]:first-child
    Run Keyword If  not \${product_card}  Click Element  xpath=//div[contains(@class,'product')][1]
    Wait Until Keyword Succeeds     \${ERROR_TIMEOUT}  1s  Element Should Be Visible  css=.product-detail, xpath=//div[@class='detail-view']
    Element Should Be Visible       css=.product-title, xpath=//h1 | //h2 | //h3
    Close Browser

Test Attribute Resilient Selectors
    Open Browser                    \${URL}                              \${BROWSER}
    \${stable_button}=  Run Keyword And Return Status  Element Should Be Visible  css=[data-testid='add-cart']
    Run Keyword If  \${stable_button}  Click Element  css=[data-testid='add-cart']
    Run Keyword If  not \${stable_button}  Click Element  css=[aria-label*='Add to cart'], xpath=//button[contains(text(),'Add')]
    \${form_field}=  Run Keyword And Return Status  Element Should Be Visible  css=[data-cy='email-input']
    Run Keyword If  \${form_field}  Input Text  css=[data-cy='email-input']  \${USER_EMAIL}
    Run Keyword If  not \${form_field}  Input Text  css=[name='email'], xpath=//input[@type='email']  \${USER_EMAIL}
    \${submit_stable}=  Run Keyword And Return Status  Element Should Be Visible  css=[data-action='submit']
    Run Keyword If  \${submit_stable}  Click Element  css=[data-action='submit']
    Run Keyword If  not \${submit_stable}  Click Element  css=[type='submit'], xpath=//button[contains(@class,'submit')]
    Element Should Be Visible       css=[data-status='success'], xpath=//div[contains(text(),'Success')]
    Close Browser

Test Text Content Fallback
    Open Browser                    \${URL}                              \${BROWSER}
    \${exact_text}=  Run Keyword And Return Status  Element Should Be Visible  xpath=//button[text()='Add to Cart']
    Run Keyword If  \${exact_text}  Click Element  xpath=//button[text()='Add to Cart']
    Run Keyword If  not \${exact_text}  Click Element  xpath=//button[contains(text(),'Add')], css=[aria-label*='Add']
    \${link_exact}=  Run Keyword And Return Status  Element Should Be Visible  xpath=//a[text()='Contact Us']
    Run Keyword If  \${link_exact}  Click Element  xpath=//a[text()='Contact Us']
    Run Keyword If  not \${link_exact}  Click Element  xpath=//a[contains(text(),'Contact')], css=a[href*='contact']
    \${heading_found}=  Run Keyword And Return Status  Element Should Be Visible  xpath=//h1[text()='Welcome']
    Run Keyword If  not \${heading_found}  Element Should Be Visible  xpath=//h1[contains(text(),'Welcome')], css=h1
    Element Should Contain          xpath=//h1 | css=h1                 Welcome
    Close Browser

Test Position Based Fallback
    Open Browser                    \${URL}                              \${BROWSER}
    \${first_product}=  Run Keyword And Return Status  Element Should Be Visible  css=.product:first-of-type
    Run Keyword If  \${first_product}  Click Element  css=.product:first-of-type
    Run Keyword If  not \${first_product}  Click Element  xpath=//div[contains(@class,'product')][1]
    \${last_item}=  Run Keyword And Return Status  Element Should Be Visible  css=.menu-item:last-child
    Run Keyword If  \${last_item}  Click Element  css=.menu-item:last-child
    Run Keyword If  not \${last_item}  Click Element  xpath=//li[contains(@class,'menu')][last()]
    \${table_cell}=  Run Keyword And Return Status  Element Should Be Visible  css=table tr:nth-child(2) td:nth-child(3)
    Run Keyword If  \${table_cell}  Click Element  css=table tr:nth-child(2) td:nth-child(3)
    Run Keyword If  not \${table_cell}  Click Element  xpath=//table//tr[2]/td[3]
    Element Should Be Visible       css=.selection-confirmed, xpath=//div[contains(@class,'confirmed')]
    Close Browser

Test Retry With Different Strategies
    Open Browser                    \${URL}                              \${BROWSER}
    FOR  \${attempt}  IN RANGE  \${RETRY_COUNT}
        \${strategy_1}=  Run Keyword And Return Status  Element Should Be Visible  css=#reliable-id  \${FALLBACK_TIMEOUT}
        Run Keyword If  \${strategy_1}  Click Element  css=#reliable-id
        Run Keyword If  \${strategy_1}  Exit For Loop
        \${strategy_2}=  Run Keyword And Return Status  Element Should Be Visible  css=.stable-class  \${FALLBACK_TIMEOUT}
        Run Keyword If  \${strategy_2}  Click Element  css=.stable-class
        Run Keyword If  \${strategy_2}  Exit For Loop
        \${strategy_3}=  Run Keyword And Return Status  Element Should Be Visible  xpath=//button[contains(text(),'Click')]  \${FALLBACK_TIMEOUT}
        Run Keyword If  \${strategy_3}  Click Element  xpath=//button[contains(text(),'Click')]
        Run Keyword If  \${strategy_3}  Exit For Loop
        Log  Retry attempt \${attempt + 1} failed, trying next strategy
        Sleep  1s
    END
    Element Should Be Visible       css=.click-confirmed, xpath=//div[@class='success']
    Close Browser

Test Smart Waiting Strategies
    Open Browser                    \${URL}                              \${BROWSER}
    Wait Until Keyword Succeeds     10s  0.5s  Run Keywords
    ...  Element Should Be Visible  css=.loading-complete
    ...  AND  Element Should Not Be Visible  css=.spinner
    \${fast_element}=  Run Keyword And Return Status  Wait Until Element Is Visible  css=.instant-load  \${FALLBACK_TIMEOUT}
    Run Keyword If  not \${fast_element}  Wait Until Element Is Visible  xpath=//div[@data-loaded]  10s
    \${content_ready}=  Run Keyword And Return Status  Element Should Contain  css=.content  \${PRODUCT_NAME}
    Run Keyword If  not \${content_ready}  Wait Until Element Contains  xpath=//div[contains(@class,'content')]  \${PRODUCT_NAME}  10s
    \${form_enabled}=  Run Keyword And Return Status  Element Should Be Enabled  css=.submit-button
    Run Keyword If  not \${form_enabled}  Wait Until Element Is Enabled  xpath=//button[@type='submit']  10s
    Element Should Be Visible       css=.page-ready, xpath=//div[@data-status='ready']
    Close Browser</code></pre>
        
        <h3>🎯 Práctica robusta (5 min):</h3>
        <p>1. Usa Run Keyword And Return Status para verificar localizadores</p>
        <p>2. Practica Run Keyword If para lógica condicional de fallback</p>
        <p>3. Combina Create List con FOR loops para múltiples localizadores</p>
        <p>4. Experimenta Wait Until Keyword Succeeds para elementos dinámicos</p>
        <p>5. Usa css=selector, xpath=//path en Element Should Be Visible</p>
        <p>6. Practica Exit For Loop cuando localizador funciona</p>
        <p>7. Combina [data-testid] y [data-cy] para selectores estables</p>
        <p>8. Usa contains(text(),'partial') para texto flexible</p>
        <p>9. Practica :first-of-type, :last-child para posiciones CSS</p>
        <p>10. Combina xpath=//[position()=1] para posiciones XPath</p>
        <p>11. Usa Sleep estratégico entre reintentos</p>
        <p>12. Practica AND en Run Keywords para múltiples condiciones</p>
        <p>13. Combina timeouts diferentes según velocidad esperada</p>
        <p>14. Usa Log para documentar fallos de localizadores</p>
        <p>15. Crea strategies resilientes a cambios de UI</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Combinar CSS y XPath en estrategias de fallback inteligentes</li>
                <li>Crear localizadores resilientes a cambios de UI dinámicos</li>
                <li>Implementar retry logic con múltiples strategies de localización</li>
                <li>Desarrollar automation robusta con waits y timeouts optimizados</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>data-testid y data-cy son más estables que classes. Run Keyword And Return Status + Run Keyword If = fallback perfecto. FOR loops con Exit For Loop = estrategias múltiples eficientes.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 090 - Selectores CSS responsivos</h3>
        <p>Ahora aprenderás selectores específicos para responsive design, media queries y elementos que cambian según breakpoints.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-088"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_089 = LESSON_089;
}