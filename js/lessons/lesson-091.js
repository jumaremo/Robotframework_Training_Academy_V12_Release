/**
 * Robot Framework Academy - Lesson 091
 * XPath para elementos dinámicos
 */

const LESSON_091 = {
    id: 91,
    title: "XPath para elementos dinámicos",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🎯 XPath Dinámico</h2>
        <p>Domina XPath especializado para elementos que cambian dinámicamente: IDs generados, contenido AJAX, elementos que aparecen/desaparecen y automation resiliente.</p>
        
        <h3>💻 Elementos cambiantes:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://dynamic-elements.com
\${BROWSER}             chrome
\${DYNAMIC_TEXT}        Content loaded dynamically
\${USER_ID}             user-12345
\${TIMESTAMP}           1640995200
\${AJAX_DATA}           API response data
\${NOTIFICATION_MSG}    Operation successful
\${PRODUCT_COUNT}       15

*** Test Cases ***
Test Dynamic ID Patterns
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//div[starts-with(@id,'dynamic-')]
    Element Should Be Visible       xpath=//span[contains(@id,'generated')]
    Element Should Be Visible       xpath=//input[starts-with(@id,'form-') and contains(@id,'-field')]
    Element Should Be Visible       xpath=//button[contains(@id,'btn-') and contains(@id,'-action')]
    Click Element                   xpath=//button[starts-with(@id,'submit-')]
    Element Should Be Visible       xpath=//div[starts-with(@id,'result-')]
    Element Should Be Visible       xpath=//span[contains(@id,'timestamp-')]
    Input Text                      xpath=//input[contains(@id,'user-') and @type='text']  \${USER_ID}
    Element Should Contain          xpath=//input[contains(@id,'user-') and @type='text']  \${USER_ID}
    Element Should Be Visible       xpath=//div[starts-with(@id,'container-') and contains(@class,'active')]
    Click Element                   xpath=//a[contains(@id,'link-') and contains(@href,'dynamic')]
    Element Should Be Visible       xpath=//div[starts-with(@id,'page-')]
    Close Browser

Test AJAX Content Detection
    Open Browser                    \${URL}                              \${BROWSER}
    Click Element                   xpath=//button[contains(text(),'Load Content')]
    Wait Until Element Is Visible   xpath=//div[@data-loaded='true']    10s
    Element Should Be Visible       xpath=//div[contains(@class,'ajax-content')]
    Element Should Contain          xpath=//div[@data-status='loaded']  \${DYNAMIC_TEXT}
    Element Should Be Visible       xpath=//span[@data-source='ajax']
    Click Element                   xpath=//button[contains(text(),'Refresh Data')]
    Wait Until Element Is Visible   xpath=//div[@data-updated='true']   10s
    Element Should Be Visible       xpath=//div[contains(@class,'refreshed')]
    Element Should Contain          xpath=//span[@data-timestamp]       \${TIMESTAMP}
    Element Should Be Visible       xpath=//ul[@data-dynamic='true']/li
    \${ajax_items}=  Get Element Count  xpath=//ul[@data-dynamic='true']/li
    Should Be Greater Than          \${ajax_items}                      0
    Close Browser

Test Generated Element Attributes
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//div[@data-uuid]
    Element Should Be Visible       xpath=//span[@data-hash]
    Element Should Be Visible       xpath=//input[@data-token]
    Element Should Be Visible       xpath=//button[@data-csrf]
    Click Element                   xpath=//button[@data-action='generate']
    Wait Until Element Is Visible   xpath=//div[@data-generated='true'] 5s
    Element Should Be Visible       xpath=//span[string-length(@data-id)>10]
    Element Should Be Visible       xpath=//div[string-length(@data-key)=32]
    Element Should Be Visible       xpath=//input[@data-session and string-length(@data-session)>0]
    Click Element                   xpath=//a[@data-dynamic-url]
    Element Should Be Visible       xpath=//div[@data-redirect='true']
    Element Should Contain          xpath=//span[@data-result]          generated
    Element Should Be Visible       xpath=//div[@data-created and @data-valid='true']
    Close Browser

Test Conditional Dynamic Elements
    Open Browser                    \${URL}                              \${BROWSER}
    \${user_logged}=  Run Keyword And Return Status  Element Should Be Visible  xpath=//div[@data-user='authenticated']
    Run Keyword If  \${user_logged}  Element Should Be Visible  xpath=//nav[@data-role='user']
    Run Keyword If  not \${user_logged}  Element Should Be Visible  xpath=//nav[@data-role='guest']
    \${premium_user}=  Run Keyword And Return Status  Element Should Be Visible  xpath=//span[@data-plan='premium']
    Run Keyword If  \${premium_user}  Element Should Be Visible  xpath=//div[@data-features='premium']
    Run Keyword If  not \${premium_user}  Element Should Be Visible  xpath=//div[@data-features='basic']
    Click Element                   xpath=//button[@data-toggle='visibility']
    \${content_visible}=  Run Keyword And Return Status  Element Should Be Visible  xpath=//div[@data-state='visible']
    Run Keyword If  \${content_visible}  Element Should Contain  xpath=//div[@data-state='visible']  content
    Element Should Be Visible       xpath=//div[@data-responsive='true' and @data-device]
    Close Browser

Test Time Based Dynamic Elements
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       xpath=//div[@data-time-sensitive]
    Element Should Be Visible       xpath=//span[number(@data-expires) > number(@data-current)]
    Element Should Be Visible       xpath=//div[@data-valid-until]
    Click Element                   xpath=//button[@data-action='check-time']
    Wait Until Element Is Visible   xpath=//div[@data-time-checked='true'] 5s
    Element Should Be Visible       xpath=//span[@data-countdown]
    Element Should Be Visible       xpath=//div[contains(@data-status,'active') and @data-expires]
    \${countdown_elements}=  Get Element Count  xpath=//span[number(@data-remaining) > 0]
    Should Be Greater Than          \${countdown_elements}              0
    Element Should Be Visible       xpath=//div[@data-timezone and @data-locale]
    Click Element                   xpath=//button[@data-refresh='timestamp']
    Element Should Be Visible       xpath=//span[@data-updated='just-now']
    Close Browser

Test List And Table Dynamic Content
    Open Browser                    \${URL}                              \${BROWSER}
    Click Element                   xpath=//button[contains(text(),'Load Products')]
    Wait Until Element Is Visible   xpath=//table[@data-populated='true'] 10s
    Element Should Be Visible       xpath=//tbody/tr[@data-product-id]
    \${product_rows}=  Get Element Count  xpath=//tbody/tr[@data-product-id]
    Should Be Equal As Numbers      \${product_rows}                    \${PRODUCT_COUNT}
    Element Should Be Visible       xpath=//tr[td[contains(text(),'Dynamic Product')]]
    Click Element                   xpath=//tr[@data-product-id][1]/td[last()]//button
    Element Should Be Visible       xpath=//div[@data-action='product-selected']
    Element Should Be Visible       xpath=//ul[@data-category='dynamic']/li
    Click Element                   xpath=//button[@data-sort='name']
    Wait Until Element Is Visible   xpath=//table[@data-sorted='true']  5s
    Element Should Be Visible       xpath=//thead/tr/th[@data-sorted-by='name']
    Element Should Contain          xpath=//tbody/tr[1]/td[1]           first
    Close Browser

Test Form Dynamic Validation
    Open Browser                    \${URL}                              \${BROWSER}
    Input Text                      xpath=//input[@data-validate='email']  invalid-email
    Element Should Be Visible       xpath=//span[@data-error='email-format']
    Clear Element Text              xpath=//input[@data-validate='email']
    Input Text                      xpath=//input[@data-validate='email']  valid@email.com
    Element Should Be Visible       xpath=//span[@data-valid='email-ok']
    Input Text                      xpath=//input[@data-validate='password']  weak
    Element Should Be Visible       xpath=//div[@data-strength='weak']
    Clear Element Text              xpath=//input[@data-validate='password']
    Input Text                      xpath=//input[@data-validate='password']  StrongPass123!
    Element Should Be Visible       xpath=//div[@data-strength='strong']
    Click Element                   xpath=//button[@data-action='validate-form']
    Element Should Be Visible       xpath=//div[@data-form-state='valid']
    Element Should Be Visible       xpath=//button[@data-submit='enabled']
    Close Browser

Test Notification Dynamic Elements
    Open Browser                    \${URL}                              \${BROWSER}
    Click Element                   xpath=//button[@data-trigger='notification']
    Wait Until Element Is Visible   xpath=//div[@data-notification='active'] 5s
    Element Should Be Visible       xpath=//div[@data-type='success' and @data-auto-hide]
    Element Should Contain          xpath=//div[@data-notification='active']  \${NOTIFICATION_MSG}
    Element Should Be Visible       xpath=//span[@data-countdown-hide]
    Wait Until Element Is Not Visible  xpath=//div[@data-notification='active'] 10s
    Click Element                   xpath=//button[@data-trigger='error']
    Element Should Be Visible       xpath=//div[@data-type='error' and @data-persistent]
    Click Element                   xpath=//button[@data-action='dismiss']
    Element Should Not Be Visible   xpath=//div[@data-type='error']
    Element Should Be Visible       xpath=//div[@data-notifications-container and not(*)]
    Click Element                   xpath=//button[@data-trigger='info']
    Element Should Be Visible       xpath=//div[@data-type='info' and @data-icon]
    Close Browser</code></pre>
        
        <h3>🎯 Práctica dinámicos (5 min):</h3>
        <p>1. Usa xpath=//[starts-with(@id,'prefix-')] para IDs generados</p>
        <p>2. Practica xpath=//[contains(@id,'partial')] para IDs variables</p>
        <p>3. Combina xpath=//[@data-loaded='true'] para contenido AJAX</p>
        <p>4. Experimenta xpath=//[string-length(@attribute)>N] para validación</p>
        <p>5. Usa Wait Until Element Is Visible para elementos que aparecen</p>
        <p>6. Practica xpath=//[number(@data-value) > threshold] para comparaciones</p>
        <p>7. Combina Run Keyword And Return Status para elementos condicionales</p>
        <p>8. Usa xpath=//[@data-state and @data-valid='true'] múltiples atributos</p>
        <p>9. Practica Get Element Count para listas dinámicas</p>
        <p>10. Combina xpath=//tr[td[contains(text(),'value')]] para tablas</p>
        <p>11. Usa xpath=//[@data-timestamp] para elementos con tiempo</p>
        <p>12. Practica Wait Until Element Is Not Visible para elementos que desaparecen</p>
        <p>13. Combina xpath=//[@data-type='success' and @data-auto-hide] condiciones</p>
        <p>14. Usa xpath=//[not(*)] para contenedores vacíos</p>
        <p>15. Crea XPaths resilientes a contenido que cambia dinámicamente</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Localizar elementos con IDs y atributos generados dinámicamente</li>
                <li>Manejar contenido AJAX y elementos que aparecen/desaparecen</li>
                <li>Crear XPath resilientes para elementos condicionales y temporales</li>
                <li>Automatizar validación de formularios y notificaciones dinámicas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>starts-with() y contains() son clave para IDs dinámicos. @data- attributes son más estables. Wait Until para elementos AJAX. string-length() y number() para validaciones.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 092 - Selectores para Shadow DOM</h3>
        <p>Ahora aprenderás técnicas especializadas para localizar elementos dentro de Shadow DOM, Web Components y encapsulated content.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-090"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_091 = LESSON_091;
}