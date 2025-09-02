/**
 * Robot Framework Academy - Lesson 075
 * Screenshots y evidencias
 */

const LESSON_075 = {
    id: 75,
    title: "Screenshots y evidencias",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Evidencias Automáticas</h2>
        <p>Captura screenshots automáticos, logs detallados y evidencias visuales para debugging, reportes y documentación de tests.</p>
        
        <h3>💻 Captura evidencias:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}               https://demo-evidencias.com
\${BROWSER}           chrome
\${SCREENSHOT_DIR}    \${CURDIR}/screenshots
\${TEST_USER}         evidencia@test.com
\${PRODUCT_NAME}      Laptop Gaming Pro
\${ERROR_EXPECTED}    Campo requerido
\${SUCCESS_MESSAGE}   Operación exitosa
\${LOG_LEVEL}         DEBUG

*** Test Cases ***
Test Screenshot On Actions
    Open Browser                     \${URL}                              \${BROWSER}
    Set Screenshot Directory         \${SCREENSHOT_DIR}
    Capture Page Screenshot          01-homepage-loaded.png
    Element Should Be Visible        css=.main-content
    Click Element                    css=.login-btn
    Capture Page Screenshot          02-login-form-opened.png
    Element Should Be Visible        css=.login-form
    Input Text                       id=username                         \${TEST_USER}
    Capture Page Screenshot          03-username-entered.png
    Element Should Contain           id=username                         \${TEST_USER}
    Click Button                     css=.submit-btn
    Capture Page Screenshot          04-form-submitted.png
    Close Browser

Test Screenshot On Failures
    Open Browser                     \${URL}                              \${BROWSER}
    Set Screenshot Directory         \${SCREENSHOT_DIR}
    Run Keyword And Ignore Error     Click Element                       id=nonexistent-element
    Capture Page Screenshot          error-element-not-found.png
    Element Should Be Visible        css=.error-message
    Run Keyword And Ignore Error     Input Text                          id=invalid-field    texto
    Capture Page Screenshot          error-invalid-input.png
    Element Should Contain           css=.validation-error               \${ERROR_EXPECTED}
    Capture Page Screenshot          final-error-state.png
    Close Browser

Test Element Screenshots
    Open Browser                     \${URL}                              \${BROWSER}
    Set Screenshot Directory         \${SCREENSHOT_DIR}
    Wait Until Element Is Visible    css=.product-card                   10s
    Capture Element Screenshot       css=.product-card                   product-card-detail.png
    Element Should Be Visible        css=.product-title
    Capture Element Screenshot       css=.product-gallery                product-gallery.png
    Element Should Contain           css=.product-name                   \${PRODUCT_NAME}
    Capture Element Screenshot       css=.price-section                  price-section.png
    Element Should Be Visible        css=.price-value
    Capture Page Screenshot          complete-product-page.png
    Close Browser

Test Log Evidence Collection
    Open Browser                     \${URL}                              \${BROWSER}
    Set Log Level                    \${LOG_LEVEL}
    Log                             Test iniciado: Evidencias automáticas
    Element Should Be Visible        css=.main-header
    Log                             Header principal verificado correctamente
    Click Element                    css=.search-box
    Log                             Campo de búsqueda activado
    Input Text                       css=.search-input                   \${PRODUCT_NAME}
    Log                             Término de búsqueda ingresado: \${PRODUCT_NAME}
    Press Keys                       css=.search-input                   RETURN
    Log                             Búsqueda ejecutada
    Element Should Be Visible        css=.search-results
    Log                             Resultados de búsqueda mostrados
    Close Browser

Test Failure Documentation
    Open Browser                     \${URL}                              \${BROWSER}
    Set Screenshot Directory         \${SCREENSHOT_DIR}
    \${status}=  Run Keyword And Return Status  Element Should Be Visible  css=.optional-element
    Run Keyword If  not \${status}   Log                                  Elemento opcional no encontrado
    Run Keyword If  not \${status}   Capture Page Screenshot             optional-element-missing.png
    Element Should Be Visible        css=.main-content
    \${form_visible}=  Run Keyword And Return Status  Element Should Be Visible  css=.contact-form
    Run Keyword If  \${form_visible}  Log                                 Formulario de contacto disponible
    Run Keyword If  \${form_visible}  Capture Element Screenshot         css=.contact-form  contact-form.png
    Run Keyword If  not \${form_visible}  Log                            Formulario de contacto no disponible
    Close Browser

Test Success Evidence Chain
    Open Browser                     \${URL}                              \${BROWSER}
    Set Screenshot Directory         \${SCREENSHOT_DIR}
    Log                             Iniciando cadena de evidencias exitosas
    Capture Page Screenshot          success-01-initial-state.png
    Click Element                    css=.product-catalog
    Element Should Be Visible        css=.catalog-grid
    Log                             Catálogo de productos cargado correctamente
    Capture Page Screenshot          success-02-catalog-loaded.png
    Click Element                    css=.product-item:first-child
    Element Should Be Visible        css=.product-details
    Log                             Detalles de producto mostrados
    Capture Element Screenshot       css=.product-details                success-03-product-details.png
    Click Button                     css=.add-to-cart
    Element Should Contain           css=.cart-notification             añadido
    Log                             Producto agregado al carrito exitosamente
    Capture Page Screenshot          success-04-cart-updated.png
    Close Browser

Test Custom Evidence Keywords
    Open Browser                     \${URL}                              \${BROWSER}
    Take Evidence Screenshot         Página inicial cargada
    Element Should Be Visible        css=.navigation-menu
    Take Evidence Screenshot         Menú de navegación visible
    Click Element                    css=.user-profile
    Take Evidence Screenshot         Perfil de usuario abierto
    Element Should Be Visible        css=.profile-form
    Input Text                       id=profile-email                    \${TEST_USER}
    Take Evidence Screenshot         Email actualizado en perfil
    Element Should Contain           css=.save-status                    \${SUCCESS_MESSAGE}
    Take Evidence Screenshot         Perfil guardado exitosamente
    Close Browser

*** Keywords ***
Take Evidence Screenshot
    [Arguments]    \${description}
    \${timestamp}=  Get Current Date  result_format=%Y%m%d_%H%M%S
    \${filename}=   Set Variable      evidence_\${timestamp}_\${description}.png
    Log            Capturando evidencia: \${description}
    Capture Page Screenshot          \${filename}
    Log            Screenshot guardado: \${filename}</code></pre>
        
        <h3>🎯 Práctica evidencias (5 min):</h3>
        <p>1. Usa Capture Page Screenshot con nombres descriptivos</p>
        <p>2. Experimenta Set Screenshot Directory para organizar capturas</p>
        <p>3. Practica Capture Element Screenshot para elementos específicos</p>
        <p>4. Combina Log con descripciones detalladas de acciones</p>
        <p>5. Usa Set Log Level para controlar verbosidad</p>
        <p>6. Practica Run Keyword And Return Status para decisiones</p>
        <p>7. Combina screenshots con Run Keyword If condicionales</p>
        <p>8. Usa Get Current Date para timestamps únicos</p>
        <p>9. Crea keywords personalizados para evidencias automáticas</p>
        <p>10. Combina Element Should Be Visible + screenshots</p>
        <p>11. Practica documentar tanto éxitos como fallos</p>
        <p>12. Usa variables para nombres de archivos dinámicos</p>
        <p>13. Combina Log + Capture en secuencias de evidencia</p>
        <p>14. Experimenta con screenshots antes y después de acciones</p>
        <p>15. Crea cadenas de evidencias para flujos complejos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar captura de evidencias visuales y logs</li>
                <li>Documentar éxitos y fallos para debugging eficiente</li>
                <li>Crear reportes visuales comprensibles para stakeholders</li>
                <li>Implementar estrategias de evidencia para compliance</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa nombres descriptivos con timestamp para screenshots. Combina Capture + Log para evidencia completa. Set Screenshot Directory organiza mejor las capturas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 076 - Formularios complejos</h3>
        <p>Ahora aprenderás a automatizar formularios multi-step, validaciones en tiempo real, uploads múltiples y workflows complejos de datos.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-074"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_075 = LESSON_075;
}