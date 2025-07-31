const LESSON_022 = {
    id: 22,
    title: "Manejo de fallos y excepciones",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    content: `
        <h2>⚠️ Manejo de Fallos</h2>
        <p>Control de errores y excepciones para tests robustos.</p>
        
        <h3>💻 TRY/EXCEPT y Control:</h3>
        <pre><code class="robot">
*** Variables ***
\${VALID_EMAIL}       test@example.com
\${INVALID_EMAIL}     invalid-email
\${TEST_URL}          http://test-site.com
\${TIMEOUT}           5 seconds
\${ERROR_MESSAGE}     Operation failed

*** Test Cases ***
Test Try Except Basic
    TRY
        Click Element    id=missing-button
        Log    This should not execute
    EXCEPT
        Log    Caught expected error
        Set Variable    \${ERROR_HANDLED}    True
        Should Be Equal    \${ERROR_HANDLED}    True
    END

Test Multiple Exception Types
    TRY
        Input Text    id=email    \${INVALID_EMAIL}
        Click Button    id=submit
        Fail    Should have failed
    EXCEPT    ElementNotFound
        Log    Element not found handled
        Set Variable    \${ERROR_TYPE}    element
    EXCEPT    TimeoutException
        Log    Timeout handled
        Set Variable    \${ERROR_TYPE}    timeout
    ELSE
        Log    No exception occurred
    END

Test Run Keyword And Ignore Error
    \${status}    \${error}    Run Keyword And Ignore Error    Click Element    id=nonexistent
    Should Be Equal    \${status}    FAIL
    Should Contain    \${error}    Element with locator
    Log    Error ignored: \${error}
    
Test Run Keyword And Return Status
    \${success}    Run Keyword And Return Status    Page Should Contain    Welcome
    Run Keyword If    \${success}    Log    Page contains Welcome
    Run Keyword Unless    \${success}    Log    Welcome text not found
    Should Be True    \${success} or not \${success}

Test Conditional Failure
    \${email_valid}    Run Keyword And Return Status    Should Match Regexp    \${VALID_EMAIL}    .*@.*\\..*
    Run Keyword If    not \${email_valid}    Fail    Invalid email format detected
    Should Be True    \${email_valid}
    Log    Email validation passed

Test Timeout Handling
    TRY
        Wait Until Element Is Visible    id=slow-element    timeout=\${TIMEOUT}
        Log    Element appeared in time
    EXCEPT
        Log    Element timeout handled gracefully
        Capture Page Screenshot    timeout_error.png
        Set Test Variable    \${TIMEOUT_OCCURRED}    True
    END

Test Continue On Failure
    FOR    \${i}    IN RANGE    3
        TRY
            Click Element    id=button-\${i}
            Log    Button \${i} clicked successfully
        EXCEPT
            Log    Button \${i} failed, continuing
            Continue For Loop
        END
    END

*** Keywords ***
Safe Click Element
    [Arguments]    \${locator}
    TRY
        Click Element    \${locator}
        Log    Element clicked: \${locator}
        RETURN    True
    EXCEPT
        Log    Failed to click: \${locator}
        RETURN    False
    END

Validate With Retry
    [Arguments]    \${condition}    \${max_attempts}=3
    FOR    \${attempt}    IN RANGE    \${max_attempts}
        TRY
            Should Be True    \${condition}
            Log    Validation passed on attempt \${attempt + 1}
            BREAK
        EXCEPT
            Log    Attempt \${attempt + 1} failed
            Sleep    1s
        END
    END
        </code></pre>
        
        <h3>🎯 Práctica Manejo Errores (4 min):</h3>
        <ol>
            <li><strong>TRY básico:</strong> Crear test que use TRY/EXCEPT para capturar error de elemento inexistente</li>
            <li><strong>EXCEPT específico:</strong> Manejar diferentes tipos de excepciones con múltiples bloques EXCEPT</li>
            <li><strong>Run Keyword And Ignore Error:</strong> Ejecutar keyword que puede fallar sin interrumpir test</li>
            <li><strong>Return Status:</strong> Usar Run Keyword And Return Status para validaciones condicionales</li>
            <li><strong>Fail controlado:</strong> Usar Fail keyword para terminar test con mensaje específico</li>
            <li><strong>Variables de error:</strong> Capturar y almacenar mensajes de error en variables para análisis</li>
            <li><strong>Timeout handling:</strong> Manejar timeouts de elementos web con TRY/EXCEPT</li>
            <li><strong>Screenshot en error:</strong> Capturar pantalla automáticamente cuando ocurre excepción</li>
            <li><strong>Loop con errores:</strong> Usar Continue For Loop para manejar errores en iteraciones</li>
            <li><strong>Keyword seguro:</strong> Crear keyword que retorne True/False en lugar de fallar</li>
            <li><strong>Retry logic:</strong> Implementar lógica de reintentos con FOR loop y excepciones</li>
            <li><strong>Log niveles:</strong> Usar diferentes niveles de log para errores esperados vs inesperados</li>
            <li><strong>Validación condicional:</strong> Combinar Run Keyword If con manejo de errores</li>
            <li><strong>Error recovery:</strong> Implementar recuperación automática después de errores</li>
            <li><strong>Test completo:</strong> Crear test que combine múltiples técnicas de manejo de errores</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar TRY/EXCEPT para control de excepciones en Robot Framework</li>
                <li>Implementar manejo robusto de errores con keywords especializados</li>
                <li>Crear lógica de reintentos y recuperación automática de fallos</li>
                <li>Desarrollar tests resilientes que manejen errores graciosamente</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa TRY/EXCEPT para errores esperados y Run Keyword And Ignore Error para errores opcionales. Siempre captura screenshots en excepciones para debugging eficiente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 023 - Logging y mensajes de debug</h3>
        <p>Ahora que manejamos errores eficientemente, aprenderemos técnicas avanzadas de logging y debugging que nos ayudarán a diagnosticar problemas y monitorear la ejecución de nuestros tests.</p>
    `,
    topics: ["exceptions", "error-handling", "failure"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-021"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_022 = LESSON_022;
}