const LESSON_054 = {
    id: 54,
    title: "Biblioteca de keywords del proyecto",
    duration: "10 min",
    level: "beginner",
    section: "section-04",
    content: `
        <h2>📚 Project Library</h2>
        <p>Crea una biblioteca completa de keywords organizados para todo el proyecto.</p>
        
        <h3>💻 Biblioteca Completa:</h3>
        <pre><code class="robot">
# Archivo: project_library/browser_keywords.resource
*** Settings ***
Library    SeleniumLibrary

*** Variables ***
\${BROWSER_TIMEOUT}    15s
\${DEFAULT_BROWSER}    chrome

*** Keywords ***
Inicializar Navegador Proyecto
    [Arguments]    \${url}    \${browser}=\${DEFAULT_BROWSER}
    [Documentation]    Inicializa navegador con configuración estándar del proyecto
    Open Browser    \${url}    \${browser}
    Maximize Browser Window
    Set Browser Implicit Wait    \${BROWSER_TIMEOUT}
    Should Contain    \${url}    http
    Log    Navegador \${browser} inicializado en \${url}
    
Finalizar Navegador Proyecto
    [Documentation]    Cierra navegador y limpia recursos
    Close All Browsers
    Log    Todos los navegadores cerrados
    Should Be True    \${True}

# Archivo: project_library/authentication_keywords.resource
*** Keywords ***
Realizar Login Sistema
    [Arguments]    \${usuario}    \${password}    \${validar}=True
    [Documentation]    Login estándar del sistema con validación opcional
    Input Text    id=username-input    \${usuario}
    Input Text    id=password-input    \${password}
    Click Button    id=login-submit
    Run Keyword If    \${validar}    Verificar Login Exitoso
    Should Not Be Empty    \${usuario}
    Log    Login realizado para usuario: \${usuario}
    
Verificar Login Exitoso
    [Documentation]    Verifica que login fue exitoso
    Wait Until Element Is Visible    id=user-dashboard    \${BROWSER_TIMEOUT}
    Element Should Contain    id=welcome-message    Welcome
    \${usuario_actual}=    Get Text    id=current-user
    Should Not Be Empty    \${usuario_actual}
    Log    Login verificado para: \${usuario_actual}
    
Realizar Logout Sistema
    [Documentation]    Logout seguro del sistema
    Click Element    id=user-menu
    Click Element    id=logout-option
    Wait Until Element Is Visible    id=login-form    \${BROWSER_TIMEOUT}
    Log    Logout realizado exitosamente
    Should Be True    \${True}

# Archivo: project_library/form_keywords.resource
*** Keywords ***
Llenar Formulario Completo
    [Arguments]    \${datos_formulario}
    [Documentation]    Llena formulario usando diccionario de datos
    FOR    \${campo}    IN    @{datos_formulario.keys()}
        \${valor}=    Get From Dictionary    \${datos_formulario}    \${campo}
        Input Text    id=\${campo}    \${valor}
        Should Not Be Empty    \${valor}
    END
    Log    Formulario llenado con \${datos_formulario}
    
Validar Campos Requeridos
    [Arguments]    @{campos_requeridos}
    [Documentation]    Valida que campos requeridos no estén vacíos
    FOR    \${campo}    IN    @{campos_requeridos}
        \${valor}=    Get Value    id=\${campo}
        Should Not Be Empty    \${valor}    Campo \${campo} es requerido
        Log    Campo \${campo} validado: \${valor}
    END
    Should Be True    len(@{campos_requeridos}) > 0

# Archivo: project_library/validation_keywords.resource
*** Keywords ***
Validar Elemento Visible Y Habilitado
    [Arguments]    \${elemento}    \${timeout}=\${BROWSER_TIMEOUT}
    [Documentation]    Valida elemento visible y habilitado
    Wait Until Element Is Visible    \${elemento}    \${timeout}
    Wait Until Element Is Enabled    \${elemento}    \${timeout}
    Element Should Be Visible    \${elemento}
    Element Should Be Enabled    \${elemento}
    Log    Elemento \${elemento} visible y habilitado
    
Validar Mensaje Sistema
    [Arguments]    \${tipo_mensaje}    \${texto_esperado}
    [Documentation]    Valida mensajes del sistema (success, error, warning)
    \${selector}=    Set Variable    id=message-\${tipo_mensaje}
    Wait Until Element Is Visible    \${selector}    \${BROWSER_TIMEOUT}
    Element Should Contain    \${selector}    \${texto_esperado}
    \${mensaje_completo}=    Get Text    \${selector}
    Should Not Be Empty    \${mensaje_completo}
    Log    Mensaje \${tipo_mensaje} validado: \${mensaje_completo}

# Archivo: test_suite_integration.robot
*** Settings ***
Resource    project_library/browser_keywords.resource
Resource    project_library/authentication_keywords.resource
Resource    project_library/form_keywords.resource
Resource    project_library/validation_keywords.resource

*** Test Cases ***
Test Biblioteca Proyecto Completa
    [Documentation]    Test integral usando toda la biblioteca del proyecto
    # Inicialización
    Inicializar Navegador Proyecto    https://demo-app.com
    
    # Autenticación
    Realizar Login Sistema    admin_user    admin_pass
    Verificar Login Exitoso
    
    # Trabajo con formularios
    \${datos}=    Create Dictionary    nombre=Test User    email=test@example.com
    Llenar Formulario Completo    \${datos}
    Validar Campos Requeridos    nombre    email
    
    # Validaciones del sistema
    Validar Elemento Visible Y Habilitado    id=submit-button
    Click Button    id=submit-button
    Validar Mensaje Sistema    success    saved successfully
    
    # Finalización
    Realizar Logout Sistema
    Finalizar Navegador Proyecto
    Log    Test biblioteca proyecto completado exitosamente
        </code></pre>
        
        <h3>🎯 Práctica Biblioteca (8 min):</h3>
        <ol>
            <li>Crea directorio "project_library" para organización</li>
            <li>Define "browser_keywords.resource" con navegador estándar</li>
            <li>Implementa variables globales BROWSER_TIMEOUT, DEFAULT_BROWSER</li>
            <li>Crea "Inicializar Navegador Proyecto" documentado</li>
            <li>Define "authentication_keywords.resource" para login</li>
            <li>Implementa "Realizar Login Sistema" con validación opcional</li>
            <li>Crea "Verificar Login Exitoso" y "Realizar Logout Sistema"</li>
            <li>Define "form_keywords.resource" para formularios</li>
            <li>Implementa "Llenar Formulario Completo" con diccionarios</li>
            <li>Crea "Validar Campos Requeridos" con listas</li>
            <li>Define "validation_keywords.resource" para validaciones</li>
            <li>Implementa "Validar Elemento Visible Y Habilitado"</li>
            <li>Crea "Validar Mensaje Sistema" con tipos dinámicos</li>
            <li>Define test suite integrando toda la biblioteca</li>
            <li>Ejecuta test completo usando keywords de todos los resources</li>
            <li>Verifica modularidad y reutilización entre archivos</li>
            <li>Confirma documentación clara en todos los keywords</li>
            <li>Observa estructura escalable del proyecto</li>
            <li>Analiza ventajas de biblioteca organizada</li>
            <li>Valida que biblioteca sea reutilizable en otros tests</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear biblioteca completa de keywords del proyecto</li>
                <li>Organizar keywords por funcionalidad en resources</li>
                <li>Documentar biblioteca para uso del equipo</li>
                <li>Integrar múltiples resources en tests complejos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Una biblioteca de keywords bien organizada es la base de un proyecto de automatización exitoso - invierte tiempo en estructurarla correctamente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 055 - Condicionales IF/ELSE</h3>
        <p>Comenzaremos la Sección 5 de Control de Flujo aprendiendo estructuras condicionales para lógica dinámica.</p>
    `,
    topics: ["library", "project", "collection"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-053"],
    type: "integration"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_054 = LESSON_054;
}