const LESSON_024 = {
    id: 24,
    title: "Timeouts y esperas",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    content: `
        <h2>⏱️ Timeouts y Esperas</h2>
        <p>Control preciso de tiempos y esperas en automatización web.</p>
        
        <h3>💻 Wait Keywords Esenciales:</h3>
        <pre><code class="robot">
*** Variables ***
\${SLOW_ELEMENT}      id=ajax-content
\${BUTTON_SUBMIT}     id=submit-btn
\${LOADING_SPINNER}   class=loading
\${DEFAULT_TIMEOUT}   10 seconds
\${FAST_TIMEOUT}      3 seconds

*** Test Cases ***
Test Wait Until Visible
    Open Browser    http://demo-site.com    Chrome
    Wait Until Element Is Visible    \${SLOW_ELEMENT}    timeout=\${DEFAULT_TIMEOUT}
    Element Should Be Visible    \${SLOW_ELEMENT}
    Click Element    \${SLOW_ELEMENT}
    Wait Until Page Contains    Content Loaded
    Page Should Contain    Success
    Close Browser

Test Wait Until Enabled
    Open Browser    http://form-site.com    Chrome
    Wait Until Element Is Enabled    \${BUTTON_SUBMIT}    timeout=\${FAST_TIMEOUT}
    Element Should Be Enabled    \${BUTTON_SUBMIT}
    Click Button    \${BUTTON_SUBMIT}
    Wait Until Page Contains    Form Submitted
    Close Browser

Test Wait Until Clickable
    Open Browser    http://interactive-site.com    Chrome
    Wait Until Element Is Clickable    \${BUTTON_SUBMIT}
    Click Element    \${BUTTON_SUBMIT}
    Wait Until Element Is Not Visible    \${LOADING_SPINNER}
    Page Should Not Contain Element    \${LOADING_SPINNER}
    Close Browser

Test Custom Timeout Handling
    Open Browser    http://slow-site.com    Chrome
    Set Selenium Timeout    \${DEFAULT_TIMEOUT}
    Wait Until Page Contains    Welcome    timeout=15 seconds
    Should Contain    \${CURRENT_URL}    slow-site
    Sleep    2 seconds
    Wait Until Element Contains    id=status    Ready
    Close Browser

Test Multiple Wait Conditions
    Open Browser    http://complex-site.com    Chrome
    Wait Until Page Contains    Dashboard
    Wait Until Element Is Visible    id=menu
    Wait Until Element Is Enabled    id=search
    Input Text    id=search    test query
    Wait Until Element Contains    id=results    Found
    Element Text Should Be    id=count    Results: 5
    Close Browser

Test Wait With Retry Logic
    Open Browser    http://unreliable-site.com    Chrome
    FOR    \${attempt}    IN RANGE    3
        TRY
            Wait Until Element Is Visible    id=dynamic-content    timeout=5s
            Click Element    id=dynamic-content
            BREAK
        EXCEPT
            Log    Attempt \${attempt + 1} failed, retrying
            Reload Page
            Sleep    1 second
        END
    END
    Close Browser

Test Selenium Speed Control
    Open Browser    http://test-site.com    Chrome
    Set Selenium Speed    0.5 seconds
    Click Link    Page 1
    Wait Until Page Contains    Page 1 Content
    Set Selenium Speed    1 second
    Click Link    Page 2
    Wait Until Page Contains    Page 2 Content
    Set Selenium Speed    0 seconds
    Close Browser

*** Keywords ***
Wait For Page Load Complete
    [Arguments]    \${expected_text}    \${timeout}=\${DEFAULT_TIMEOUT}
    Wait Until Page Contains    \${expected_text}    timeout=\${timeout}
    Wait Until Element Is Not Visible    \${LOADING_SPINNER}    timeout=\${timeout}
    Sleep    0.5 seconds

Smart Wait And Click
    [Arguments]    \${locator}    \${timeout}=\${DEFAULT_TIMEOUT}
    Wait Until Element Is Visible    \${locator}    timeout=\${timeout}
    Wait Until Element Is Enabled    \${locator}    timeout=\${timeout}
    Wait Until Element Is Clickable    \${locator}    timeout=\${timeout}
    Click Element    \${locator}

Wait Until Text Changes
    [Arguments]    \${locator}    \${old_text}    \${timeout}=\${DEFAULT_TIMEOUT}
    FOR    \${i}    IN RANGE    \${timeout}
        \${current_text}    Get Text    \${locator}
        Run Keyword If    '\${current_text}' != '\${old_text}'    BREAK
        Sleep    1 second
    END
        </code></pre>
        
        <h3>🎯 Práctica Timeouts Esperas (4 min):</h3>
        <ol>
            <li><strong>Wait Until Visible:</strong> Usar Wait Until Element Is Visible con timeout personalizado</li>
            <li><strong>Wait Until Enabled:</strong> Esperar que botón se habilite antes de hacer click</li>
            <li><strong>Wait Until Clickable:</strong> Combinar visible + enabled en una espera</li>
            <li><strong>Page Contains timeout:</strong> Usar Wait Until Page Contains con timeout específico</li>
            <li><strong>Set Selenium Timeout:</strong> Configurar timeout global para toda la sesión</li>
            <li><strong>Sleep estratégico:</strong> Usar Sleep para esperas fijas cuando sea necesario</li>
            <li><strong>Wait element text:</strong> Esperar que elemento contenga texto específico</li>
            <li><strong>Wait disappear:</strong> Usar Wait Until Element Is Not Visible para spinners</li>
            <li><strong>Multiple conditions:</strong> Combinar múltiples Wait Until en secuencia</li>
            <li><strong>Retry con timeouts:</strong> Implementar reintentos con FOR loop y timeouts</li>
            <li><strong>Set Selenium Speed:</strong> Controlar velocidad de ejecución entre comandos</li>
            <li><strong>Custom wait keyword:</strong> Crear keyword que combine múltiples condiciones de espera</li>
            <li><strong>Timeout variables:</strong> Usar variables para manejar diferentes timeouts por ambiente</li>
            <li><strong>Wait text changes:</strong> Crear keyword que espere cambio de texto en elemento</li>
            <li><strong>Test completo:</strong> Implementar test que use todas las técnicas de timeout aprendidas</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar Wait Until keywords para sincronización robusta de tests web</li>
                <li>Configurar timeouts personalizados según necesidades de cada test</li>
                <li>Implementar esperas inteligentes con retry logic y manejo de errores</li>
                <li>Optimizar velocidad de ejecución con Set Selenium Speed y Sleep estratégico</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Wait Until Element Is Clickable para elementos interactivos y evita Sleep fijo. Configura timeouts según la velocidad de tu aplicación bajo test.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 025 - Primer test completo</h3>
        <p>Con timeouts y esperas dominados, crearemos nuestro primer test end-to-end completo que integre todas las técnicas aprendidas: setup/teardown, manejo de errores, logging y sincronización perfecta.</p>
    `,
    topics: ["timeout", "wait", "timing"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-023"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_024 = LESSON_024;
}