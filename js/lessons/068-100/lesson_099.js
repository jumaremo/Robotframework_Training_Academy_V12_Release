/**
 * Robot Framework Academy - Lesson 099
 * Proyecto: Localizadores robustos
 */

const LESSON_099 = {
    id: 99,
    title: "Proyecto: Localizadores robustos",
    duration: "15 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🏗️ Proyecto Localizadores Enterprise</h2>
        <p>Sistema completo de localización robusto para aplicación enterprise.</p>
        
        <h3>💻 Arquitectura proyecto robusta:</h3>
        <pre><code class="robot">*** Settings ***
Library    SeleniumLibrary
Library    Collections
Resource   locators_library.robot

*** Variables ***
# Localizadores primarios enterprise
\${USER_MENU}           css=[data-testid="user-menu"]:visible
\${SEARCH_BOX}          css=[data-cy="search-input"]:enabled
\${RESULTS_CONTAINER}   css=[data-component="search-results"]
\${PAGINATION}          css=[data-pagination]:not([aria-hidden])
\${MODAL_DIALOG}        css=[role="dialog"]:visible
\${ERROR_ALERT}         css=[role="alert"]:visible, .error-message:visible
\${SUCCESS_TOAST}       css=[data-toast="success"]:visible
\${LOADING_SPINNER}     css=[aria-busy="true"]:visible, .spinner:visible

# Fallback localizadores robustos
\${BACKUP_USER_MENU}    css=.user-dropdown:visible, #userMenu:visible
\${BACKUP_SEARCH}       css=input[placeholder*="Search"]:enabled, .search-field:enabled
\${BACKUP_RESULTS}      css=.search-results:visible, #searchResults:visible
\${BACKUP_MODAL}        css=.modal:visible:not(.hidden), .overlay:visible

*** Test Cases ***
Test Suite Búsqueda Enterprise Robusta
    [Documentation]    Suite completa de búsqueda con localizadores enterprise
    [Tags]             integration    robustez    enterprise
    
    Open Browser    https://enterprise-app.com    chrome
    Maximize Browser Window
    
    # Fase 1: Autenticación robusta
    Wait Until Element Is Visible    css=[data-testid="login-form"]    timeout=10s
    Input Text    css=input[data-field="username"]:enabled    enterprise.user
    Input Text    css=input[data-field="password"]:enabled    secure.pass123
    Click Element    css=button[data-action="login"]:enabled
    
    # Verificación post-login con fallbacks
    Wait Until Element Is Visible    \${USER_MENU}    timeout=15s
    Element Should Be Visible    \${USER_MENU}
    Element Text Should Contain    \${USER_MENU}    Welcome
    Element Should Not Be Visible    \${ERROR_ALERT}
    
    # Fase 2: Búsqueda principal con múltiples validaciones
    Element Should Be Visible    \${SEARCH_BOX}
    Element Should Be Enabled    \${SEARCH_BOX}
    Clear Element Text    \${SEARCH_BOX}
    Input Text    \${SEARCH_BOX}    Robot Framework Enterprise
    Press Keys    \${SEARCH_BOX}    RETURN
    
    # Espera inteligente resultados
    Wait Until Element Is Not Visible    \${LOADING_SPINNER}    timeout=20s
    Wait Until Element Is Visible    \${RESULTS_CONTAINER}    timeout=15s
    Element Should Be Visible    \${RESULTS_CONTAINER}
    
    # Validación resultados robusta
    \${result_count}=    Get Element Count    css=[data-component="search-results"] .result-item:visible
    Should Be True    \${result_count} > 0
    Element Should Be Visible    css=.result-item:first-child [data-field="title"]
    Element Should Be Visible    css=.result-item:first-child [data-field="description"]
    
    Close Browser

Test Suite Navegación SPA Robusta
    [Documentation]    Navegación completa en Single Page Application
    [Tags]             spa    navegacion    robustez
    
    Open Browser    https://spa-enterprise.com    chrome
    
    # Navegación principal con esperas inteligentes
    Wait Until Element Is Visible    css=[data-nav="main"]:visible    timeout=10s
    Click Element    css=[data-nav="products"]:enabled
    Wait Until Page Contains Element    css=[data-page="products"]:visible    timeout=15s
    
    # Validación carga de página SPA
    Element Should Be Visible    css=[data-page="products"] h1:visible
    Element Text Should Be    css=[data-page="products"] h1    Products Catalog
    Element Should Not Be Visible    \${LOADING_SPINNER}
    
    # Filtros dinámicos robustos
    Element Should Be Visible    css=[data-filter-container]:visible
    Click Element    css=[data-filter="category"]:enabled
    Wait Until Element Is Visible    css=[data-dropdown="category"]:visible    timeout=5s
    Click Element    css=[data-option="electronics"]:visible:enabled
    
    # Validación filtros aplicados
    Wait Until Element Is Not Visible    \${LOADING_SPINNER}    timeout=10s
    \${filtered_count}=    Get Element Count    css=[data-product-card]:visible
    Should Be True    \${filtered_count} >= 1
    Element Should Contain    css=[data-active-filters]    Electronics
    
    Close Browser

Test Suite Formularios Dinámicos Enterprise
    [Documentation]    Formularios complejos con validación enterprise
    [Tags]             formularios    validacion    enterprise
    
    Open Browser    https://enterprise-forms.com    chrome
    
    # Formulario multi-step robusto
    Wait Until Element Is Visible    css=[data-form="registration"]:visible    timeout=10s
    
    # Step 1: Información personal
    Element Should Be Visible    css=[data-step="1"][data-active="true"]
    Input Text    css=input[data-field="firstName"]:enabled    John
    Input Text    css=input[data-field="lastName"]:enabled    Enterprise
    Input Text    css=input[data-field="email"]:enabled    john@enterprise.com
    Click Element    css=button[data-action="next-step"]:enabled
    
    # Step 2: Información empresa con validaciones
    Wait Until Element Is Visible    css=[data-step="2"][data-active="true"]    timeout=5s
    Element Should Not Be Visible    css=[data-step="1"][data-active="true"]
    Select From List By Label    css=select[data-field="company-size"]:enabled    51-200 employees
    Input Text    css=input[data-field="company"]:enabled    Enterprise Corp
    Input Text    css=textarea[data-field="description"]:enabled    QA Automation Company
    
    # Validación en tiempo real
    Element Should Be Visible    css=[data-validation="email"][data-status="valid"]
    Element Should Not Be Visible    css=[data-error]:visible
    Click Element    css=button[data-action="submit"]:enabled
    
    # Confirmación envío
    Wait Until Element Is Visible    \${SUCCESS_TOAST}    timeout=10s
    Element Should Contain    \${SUCCESS_TOAST}    Registration successful
    Element Should Be Visible    css=[data-confirmation]:visible
    
    Close Browser

Test Suite Tabla Datos Enterprise Robusta
    [Documentation]    Manipulación robusta de tablas con paginación
    [Tags]             tablas    paginacion    datos
    
    Open Browser    https://enterprise-data.com    chrome
    
    # Carga inicial tabla enterprise
    Wait Until Element Is Visible    css=[data-table="users"]:visible    timeout=10s
    Element Should Be Visible    css=table[data-table="users"] thead
    Element Should Be Visible    css=table[data-table="users"] tbody
    
    # Verificación estructura tabla
    \${header_count}=    Get Element Count    css=table thead th:visible
    Should Be Equal As Integers    \${header_count}    5
    Element Text Should Be    css=table thead th:nth-child(1)    Name
    Element Text Should Be    css=table thead th:nth-child(2)    Email
    Element Text Should Be    css=table thead th:nth-child(3)    Role
    
    # Ordenamiento columnas
    Click Element    css=table thead th:nth-child(1) [data-sort]:enabled
    Wait Until Element Is Not Visible    \${LOADING_SPINNER}    timeout=5s
    Element Should Have Attribute    css=table thead th:nth-child(1)    data-sort-direction    asc
    
    # Paginación robusta
    Element Should Be Visible    \${PAGINATION}
    \${current_page}=    Get Text    css=[data-pagination] .current-page
    Should Be Equal    \${current_page}    1
    Click Element    css=[data-pagination] button[data-page="next"]:enabled
    Wait Until Element Is Not Visible    \${LOADING_SPINNER}    timeout=5s
    \${new_page}=    Get Text    css=[data-pagination] .current-page
    Should Be Equal    \${new_page}    2
    
    # Acciones sobre filas
    Click Element    css=table tbody tr:first-child [data-action="edit"]:enabled
    Wait Until Element Is Visible    \${MODAL_DIALOG}    timeout=5s
    Element Should Be Visible    css=[data-modal="edit-user"] [data-field="name"]:enabled
    Click Element    css=[data-modal="edit-user"] button[data-action="cancel"]:enabled
    Wait Until Element Is Not Visible    \${MODAL_DIALOG}    timeout=5s
    
    Close Browser</code></pre>
        
        <h3>🎯 Proyecto integrador (12 min):</h3>
        <p>1. Crear Resource file con localizadores enterprise organizados</p>
        <p>2. Implementar estrategia fallback para cada localizador crítico</p>
        <p>3. Diseñar suite de autenticación con múltiples métodos</p>
        <p>4. Crear tests de búsqueda con validación de estados</p>
        <p>5. Implementar navegación SPA con waits inteligentes</p>
        <p>6. Diseñar formularios multi-step con validación robusta</p>
        <p>7. Crear manipulación de tablas con paginación dinámica</p>
        <p>8. Implementar manejo de modales y overlays</p>
        <p>9. Usar data-attributes como estrategia principal</p>
        <p>10. Crear sistema de logging para debugging automático</p>
        <p>11. Implementar timeouts dinámicos según tipo de elemento</p>
        <p>12. Validar estados de elementos antes de interactuar</p>
        <p>13. Crear tests cross-browser compatibles</p>
        <p>14. Implementar screenshots automáticos en fallos</p>
        <p>15. Usar variables para localizadores reutilizables</p>
        <p>16. Crear documentación de estrategias de localización</p>
        <p>17. Implementar retry logic para elementos inestables</p>
        <p>18. Validar performance de localizadores con métricas</p>
        <p>19. Crear casos edge para elementos dinámicos</p>
        <p>20. Documentar troubleshooting guide para el equipo</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar todas las técnicas de localización avanzada</li>
                <li>Crear arquitectura robusta para aplicaciones enterprise</li>
                <li>Implementar estrategias de fallback y error handling</li>
                <li>Diseñar suite completa de tests con localizadores optimizados</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Organiza localizadores en Resource files por funcionalidad. Usa data-testid como estándar y CSS fallbacks robustos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 100 - JavaScript execution</h3>
        <p>Comenzarás la sección de Interacciones Web Avanzadas aprendiendo a ejecutar JavaScript desde Robot Framework para casos complejos.</p>
    `,
    topics: ["locators", "project"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 15,
    difficulty: "intermediate",
    prerequisites: ["lesson-098"],
    type: "integration"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_099 = LESSON_099;
}