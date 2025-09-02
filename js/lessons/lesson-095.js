/**
 * Robot Framework Academy - Lesson 095
 * Localizadores Avanzados 095
 */

const LESSON_095 = {
    id: 95,
    title: "Localizadores Avanzados 095",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🛡️ Localizadores Robustos</h2>
        <p>Estrategias para elementos dinámicos que no rompen tests.</p>
        
        <h3>💻 Estrategias robustas:</h3>
        <pre><code class="robot">*** Variables ***
\${STABLE_BUTTON}       css=[data-testid="submit-btn"]
\${DYNAMIC_TABLE}       css=table[aria-label*="Data"]
\${FLEXIBLE_INPUT}      css=input[name]:not([readonly])
\${ROBUST_LINK}         css=a[href$="/dashboard"]:visible
\${MODAL_CONTENT}       css=.modal[role="dialog"]:not([aria-hidden])
\${LOADING_INDICATOR}   css=[aria-busy="true"], .spinner:visible
\${ERROR_MESSAGE}       css=[role="alert"], .error:contains("Error")
\${SEARCH_RESULTS}      css=[data-cy="search-result"]:visible

*** Test Cases ***
Test Localizadores Data Attributes
    Open Browser    https://app.example.com    chrome
    Wait Until Element Is Visible    \${STABLE_BUTTON}
    Element Should Be Enabled    \${STABLE_BUTTON}
    Click Element    \${STABLE_BUTTON}
    Wait Until Element Is Not Visible    \${LOADING_INDICATOR}
    Element Should Be Visible    css=[data-success="true"]
    Element Text Should Be    css=[data-message]    Operation completed
    Close Browser

Test Manejo Elementos Dinámicos
    Open Browser    https://app.example.com    chrome
    Wait Until Element Is Visible    \${DYNAMIC_TABLE}
    Element Count Should Be    css=tr[data-row]:visible    3
    Click Element    css=tr[data-row="1"] button[data-action="edit"]
    Wait Until Element Is Visible    css=form[data-editing="true"]
    Input Text    css=input[data-field="name"]:enabled    New Name
    Click Element    css=button[data-action="save"]:not([disabled])
    Wait Until Element Contains    css=[data-status]    Saved
    Close Browser

Test Localizadores Aria Semánticos
    Open Browser    https://app.example.com    chrome
    Element Should Be Visible    css=[role="navigation"]
    Click Element    css=[role="button"][aria-expanded="false"]
    Wait Until Element Is Visible    css=[role="menu"]:not([aria-hidden])
    Element Count Should Be    css=[role="menuitem"]:visible    5
    Click Element    css=[role="menuitem"][aria-selected="false"]:first-child
    Element Should Have Attribute    css=[role="menuitem"]:first-child    aria-selected    true
    Close Browser

Test Selectores Estado Visible
    Open Browser    https://app.example.com    chrome
    Wait Until Element Is Visible    \${FLEXIBLE_INPUT}
    Element Should Be Enabled    \${FLEXIBLE_INPUT}
    Input Text    \${FLEXIBLE_INPUT}    test value
    Element Attribute Value Should Be    \${FLEXIBLE_INPUT}    value    test value
    Click Element    css=button:visible:enabled:contains("Submit")
    Wait Until Element Is Visible    css=.success:visible:not(.hidden)
    Element Text Should Be    css=.message:visible    Success message
    Close Browser

Test XPath Posición Relativa
    Open Browser    https://app.example.com    chrome
    Element Should Be Visible    xpath=//label[text()='Username']/following-sibling::input
    Input Text    xpath=//label[text()='Username']/following-sibling::input    testuser
    Element Should Be Visible    xpath=//input[@value='testuser']/parent::div/following-sibling::div//button
    Click Element    xpath=//span[contains(text(),'Next')]/ancestor::button[@type='submit']
    Element Should Be Visible    xpath=//h2[normalize-space()='Step 2']/parent::div[@class='step-container']
    Element Text Should Be    xpath=//div[@class='progress']//span[@class='current']    2
    Close Browser

Test Fallback Localizadores
    Open Browser    https://app.example.com    chrome
    Run Keyword And Return Status    Element Should Be Visible    css=[data-testid="primary-btn"]
    Run Keyword If Test Failed    Element Should Be Visible    css=.primary-button:visible
    Run Keyword If Test Failed    Element Should Be Visible    css=button[type="submit"]:enabled
    Click Element    css=[data-testid="primary-btn"], .primary-button:visible, button[type="submit"]:enabled
    Wait Until Element Is Visible    css=[data-result="success"], .success-message:visible, .result:contains("Success")
    Close Browser</code></pre>
        
        <h3>🎯 Práctica robustez (5 min):</h3>
        <p>1. Crear localizador con data-testid como primera opción</p>
        <p>2. Usar aria-label para elementos sin data attributes</p>
        <p>3. Combinar :visible con :enabled para estado válido</p>
        <p>4. Crear selector que excluya elementos hidden/disabled</p>
        <p>5. Usar contains() para texto parcial en elementos dinámicos</p>
        <p>6. Implementar estrategia fallback con múltiples selectores</p>
        <p>7. Crear XPath usando relación hermano para contexto</p>
        <p>8. Localizar por posición relativa con ancestor/descendant</p>
        <p>9. Usar atributos semánticos role/aria para accesibilidad</p>
        <p>10. Crear selector que maneje contenido que cambia</p>
        <p>11. Implementar wait hasta que elemento esté en estado correcto</p>
        <p>12. Validar atributos dinámicos como data-status</p>
        <p>13. Usar selectores que ignoren orden de elementos</p>
        <p>14. Crear localizador para modal/overlay dinámico</p>
        <p>15. Implementar búsqueda por texto normalizado</p>
        <p>16. Usar selectores CSS con múltiples condiciones</p>
        <p>17. Probar robustez con diferentes estados de página</p>
        <p>18. Validar que localizadores funcionan con data cambiante</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear localizadores que no fallan con cambios dinámicos</li>
                <li>Implementar estrategias fallback para máxima robustez</li>
                <li>Usar atributos semánticos y data attributes estables</li>
                <li>Manejar elementos con estados variables efectivamente</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Siempre prioriza data-testid > aria-label > class/id estables > XPath relativo. Evita índices numéricos fijos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 096 - Localizadores Avanzados 096</h3>
        <p>Profundizarás en técnicas de localización para aplicaciones SPA y frameworks modernos con shadow DOM.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-094"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_095 = LESSON_095;
}