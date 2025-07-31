const LESSON_048 = {
    id: 48,
    title: "Documentación de keywords",
    duration: "5 min",
    level: "beginner",
    section: "section-04",
    content: `
        <h2>📝 Documentation Keywords</h2>
        <p>Documenta tus keywords para mejor mantenimiento y comprensión del código.</p>
        
        <h3>💻 Keywords Documentados:</h3>
        <pre><code class="robot">
*** Keywords ***
Inicializar Navegador Web
    [Documentation]    Abre navegador web con configuración estándar.
    ...                Maximiza ventana y establece timeout implícito.
    ...                Argumentos: url (requerido), browser (opcional)
    [Arguments]    \${url}    \${browser}=chrome
    Open Browser    \${url}    \${browser}
    Maximize Browser Window
    Set Browser Implicit Wait    10s
    Should Contain    \${url}    http
    Log    Navegador iniciado: \${browser} en \${url}
    
Validar Formulario Completo
    [Documentation]    Valida todos los campos requeridos de un formulario.
    ...                Verifica que campos estén presentes y contengan datos.
    ...                Retorna: True si válido, False si inválido
    [Arguments]    \${form_selector}
    \${username}=    Get Value    \${form_selector} input[name='username']
    \${password}=    Get Value    \${form_selector} input[name='password']
    Should Not Be Empty    \${username}
    Should Not Be Empty    \${password}
    Log    Formulario validado correctamente
    \${valido}=    Set Variable    True
    [Return]    \${valido}
    
Procesar Datos Usuario
    [Documentation]    Procesa y valida datos de usuario del sistema.
    ...                Limpia espacios, valida formato email, verifica longitud.
    ...                Ejemplo: Procesar Datos Usuario    john@test.com    John Doe
    [Arguments]    \${email}    \${nombre}
    \${email_limpio}=    Strip String    \${email}
    Should Match Regexp    \${email_limpio}    ^[\\w\\._%+-]+@[\\w\\.-]+\\.[A-Za-z]{2,}$
    \${nombre_limpio}=    Strip String    \${nombre}
    Should Be True    len('\${nombre_limpio}') >= 2
    Log    Datos procesados: \${email_limpio}, \${nombre_limpio}
    Should Not Be Empty    \${nombre_limpio}
    
Generar Reporte Detallado
    [Documentation]    Genera reporte de testing con información detallada.
    ...                Incluye timestamp, resultados, estadísticas.
    ...                Tags: reporting, statistics, logging
    [Tags]    reporting    statistics
    \${timestamp}=    Get Time
    \${info}=    Set Variable    Reporte generado el \${timestamp}
    Log    \${info}
    Should Contain    \${info}    Reporte
    Should Not Be Empty    \${timestamp}
    [Return]    \${info}
    
Limpiar Datos Sistema
    [Documentation]    Limpia datos temporales del sistema de testing.
    ...                PRECAUCIÓN: Esta acción no se puede deshacer.
    ...                Usar solo en ambiente de testing.
    Log    ADVERTENCIA: Iniciando limpieza de datos
    \${confirmacion}=    Set Variable    datos_limpios
    Should Be Equal    \${confirmacion}    datos_limpios
    Log    Limpieza completada exitosamente
    Should Be True    \${True}

*** Test Cases ***
Test Keywords Documentados
    [Documentation]    Test que verifica funcionamiento de keywords documentados
    Inicializar Navegador Web    https://example.com
    \${valido}=    Validar Formulario Completo    #login-form
    Should Be True    \${valido}
    Procesar Datos Usuario    test@email.com    Usuario Test
    \${reporte}=    Generar Reporte Detallado
    Should Contain    \${reporte}    Reporte generado
    Limpiar Datos Sistema
    Close Browser
        </code></pre>
        
        <h3>🎯 Práctica Documentación (4 min):</h3>
        <ol>
            <li>Agrega [Documentation] a keyword "Inicializar Navegador Web"</li>
            <li>Usa ... para continuar documentación en múltiples líneas</li>
            <li>Documenta argumentos y propósito del keyword</li>
            <li>Crea keyword "Validar Formulario Completo" con docs</li>
            <li>Incluye información sobre valor de retorno</li>
            <li>Define keyword "Procesar Datos Usuario" documentado</li>
            <li>Agrega ejemplo de uso en la documentación</li>
            <li>Crea keyword "Generar Reporte Detallado" con [Tags]</li>
            <li>Usa tags para categorizar keyword</li>
            <li>Define keyword "Limpiar Datos Sistema" con advertencias</li>
            <li>Incluye precauciones en la documentación</li>
            <li>Ejecuta tests verificando que documentación no afecte</li>
            <li>Verifica que keywords funcionen normalmente</li>
            <li>Revisa que documentación sea clara y útil</li>
            <li>Confirma buenas prácticas de documentación</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Documentar keywords con [Documentation]</li>
                <li>Usar tags para categorizar keywords</li>
                <li>Escribir documentación clara y útil</li>
                <li>Incluir ejemplos y precauciones</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>La buena documentación es esencial para mantener código de testing - documenta propósito, argumentos y comportamiento especial.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 049 - Keywords embebidos (embedded)</h3>
        <p>Descubriremos cómo crear keywords con sintaxis de lenguaje natural para mayor legibilidad.</p>
    `,
    topics: ["documentation", "help", "usage"],
    hasCode: true,
    hasExercise: false,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-047"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_048 = LESSON_048;
}