/**
 * Robot Framework Academy - Lesson 097
 * Localizadores Avanzados 097
 */

const LESSON_097 = {
    id: 97,
    title: "Localizadores Avanzados 097",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🚀 Performance Localizadores</h2>
        <p>Optimización de velocidad y eficiencia en localización masiva.</p>
        
        <h3>💻 Localizadores optimizados:</h3>
        <pre><code class="robot">*** Variables ***
\${FAST_ID}            id=main-content
\${EFFICIENT_CLASS}    css=.primary-btn:first-child
\${OPTIMIZED_XPATH}    xpath=//div[@id='container']//button[1]
\${CACHED_ELEMENT}     css=[data-cache="user-menu"]
\${BULK_SELECTOR}      css=.item:nth-child(-n+10)
\${INDEXED_TABLE}      css=table tbody tr:nth-child(3) td:nth-child(2)
\${SCOPED_SEARCH}      css=#content .search-results .result-item
\${PERFORMANCE_TEST}   css=[data-perf]:visible:enabled

*** Test Cases ***
Test Localizadores ID Rápidos
    Open Browser    https://fast-app.com    chrome
    Element Should Be Visible    \${FAST_ID}
    Element Should Be Visible    id=header
    Element Should Be Visible    id=footer
    Click Element    id=search-btn
    Element Should Be Visible    id=results-container
    Element Count Should Be    css=#results-container .item    5
    Element Text Should Be    id=total-count    5 results
    Close Browser

Test CSS Selectores Eficientes
    Open Browser    https://fast-app.com    chrome
    Element Should Be Visible    \${EFFICIENT_CLASS}
    Element Should Be Enabled    \${EFFICIENT_CLASS}
    Click Element    \${EFFICIENT_CLASS}
    Element Should Be Visible    css=.modal:first-child
    Element Should Be Visible    css=.content > .title
    Element Text Should Be    css=h1.page-title    Expected Title
    Element Count Should Be    css=.nav > li    4
    Close Browser

Test XPath Optimizado
    Open Browser    https://fast-app.com    chrome
    Element Should Be Visible    \${OPTIMIZED_XPATH}
    Click Element    \${OPTIMIZED_XPATH}
    Element Should Be Visible    xpath=//div[@class='result'][1]
    Element Text Should Be    xpath=//span[@class='status']    Active
    Element Should Be Visible    xpath=//table//tr[2]//td[1]
    Element Count Should Be    xpath=//ul[@class='menu']//li    3
    Element Attribute Value Should Be    xpath=//input[@name='search']    type    text
    Close Browser

Test Búsqueda Masiva Eficiente
    Open Browser    https://fast-app.com    chrome
    Wait Until Element Is Visible    \${BULK_SELECTOR}
    Element Count Should Be    \${BULK_SELECTOR}    10
    Element Should Be Visible    css=.item:nth-child(1):visible
    Element Should Be Visible    css=.item:nth-child(5):visible
    Element Should Be Visible    css=.item:nth-child(10):visible
    Element Text Should Be    css=.item:first-child .title    First Item
    Element Text Should Be    css=.item:last-child .title    Tenth Item
    Close Browser

Test Tabla Indexada Performance
    Open Browser    https://fast-app.com    chrome
    Element Should Be Visible    \${INDEXED_TABLE}
    Element Text Should Be    css=table thead tr th:nth-child(1)    Name
    Element Text Should Be    css=table thead tr th:nth-child(2)    Email
    Element Should Be Visible    css=table tbody tr:nth-child(1) td:nth-child(1)
    Element Should Be Visible    css=table tbody tr:nth-child(2) td:nth-child(2)
    Element Count Should Be    css=table tbody tr    5
    Click Element    css=table tbody tr:nth-child(3) .action-btn
    Close Browser

Test Scope Limitado Rápido
    Open Browser    https://fast-app.com    chrome
    Element Should Be Visible    \${SCOPED_SEARCH}
    Element Count Should Be    css=#sidebar .menu-item    3
    Element Should Be Visible    css=.main-content .article:first-child
    Element Text Should Be    css=.breadcrumb .current    Current Page
    Element Should Be Visible    css=.footer .links a:nth-child(2)
    Element Count Should Be    css=.gallery .image:visible    8
    Element Should Be Enabled    css=.form .submit-btn:enabled
    Close Browser</code></pre>
        
        <h3>🎯 Práctica performance (5 min):</h3>
        <p>1. Usar selectores ID siempre que sea posible</p>
        <p>2. Preferir CSS sobre XPath para velocidad</p>
        <p>3. Crear XPath específico sin // al inicio</p>
        <p>4. Usar :nth-child() para posiciones específicas</p>
        <p>5. Limitar scope con contenedores padre</p>
        <p>6. Evitar selectores que escanean todo el DOM</p>
        <p>7. Usar :first-child/:last-child en lugar de índices</p>
        <p>8. Combinar múltiples selectores en uno eficiente</p>
        <p>9. Cache elementos reutilizados con variables</p>
        <p>10. Usar selectores de atributo únicos</p>
        <p>11. Evitar contains() en XPath cuando sea posible</p>
        <p>12. Optimizar selectores para elementos repetidos</p>
        <p>13. Usar descendant directo > en lugar de espacio</p>
        <p>14. Implementar timeouts cortos para elementos rápidos</p>
        <p>15. Agrupar validaciones del mismo elemento</p>
        <p>16. Medir tiempo de ejecución de localizadores</p>
        <p>17. Probar performance con datasets grandes</p>
        <p>18. Optimizar selectores para mobile/responsive</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear localizadores optimizados para máxima velocidad</li>
                <li>Aplicar técnicas de performance en búsquedas masivas</li>
                <li>Usar selectores eficientes para tablas y listas grandes</li>
                <li>Implementar estrategias de caching y scope limitado</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>ID > CSS class > CSS attribute > XPath simple > XPath complex. Evita // al inicio de XPath.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 098 - Localizadores Avanzados 098</h3>
        <p>Aprenderás técnicas de debugging y troubleshooting para localizadores que fallan o son inconsistentes.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-096"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_097 = LESSON_097;
}