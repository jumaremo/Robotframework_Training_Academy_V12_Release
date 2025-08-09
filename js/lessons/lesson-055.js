// ===== LECCIÓN 055 - Condicionales IF/ELSE =====
const LESSON_055 = {
    id: 55,
    title: "Condicionales IF/ELSE",
    duration: "5 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>🔀 IF ELSE</h2>
        <p>Implementa lógica condicional para ejecutar acciones según condiciones.</p>
        
        <h3>💻 Condicionales Básicos:</h3>
        <pre><code class="robot">
*** Variables ***
\${USUARIO_ACTIVO}    True
\${NIVEL_USUARIO}     admin
\${EDAD_USUARIO}      25
\${EMAIL_VALIDO}      test@example.com

*** Keywords ***
Verificar Acceso Usuario
    IF    \${USUARIO_ACTIVO}
        Log    Usuario activo - acceso permitido
        Should Be True    \${USUARIO_ACTIVO}
        Set Variable    \${status}    permitido
    ELSE
        Log    Usuario inactivo - acceso denegado
        Should Be True    not \${USUARIO_ACTIVO}
        Set Variable    \${status}    denegado
    END
    Should Not Be Empty    \${status}
    
Validar Nivel Permisos
    IF    '\${NIVEL_USUARIO}' == 'admin'
        Log    Permisos administrativos otorgados
        Should Be Equal    \${NIVEL_USUARIO}    admin
        Click Element    id=admin-panel
    ELSE IF    '\${NIVEL_USUARIO}' == 'user'
        Log    Permisos usuario estándar
        Should Be Equal    \${NIVEL_USUARIO}    user
        Click Element    id=user-dashboard
    ELSE
        Log    Nivel no reconocido - acceso básico
        Should Not Be Equal    \${NIVEL_USUARIO}    admin
        Click Element    id=guest-area
    END
    Should Be True    \${True}
    
Procesar Segun Edad
    IF    \${EDAD_USUARIO} >= 18
        Log    Usuario mayor de edad - acceso completo
        Should Be True    \${EDAD_USUARIO} >= 18
        Element Should Be Visible    id=content-mature
        Set Variable    \${categoria}    adulto
    ELSE
        Log    Usuario menor de edad - contenido restringido
        Should Be True    \${EDAD_USUARIO} < 18
        Element Should Not Be Visible    id=content-mature
        Set Variable    \${categoria}    menor
    END
    Should Not Be Empty    \${categoria}
    
Validar Email Formato
    IF    '@' in '\${EMAIL_VALIDO}' and '.' in '\${EMAIL_VALIDO}'
        Log    Email con formato válido
        Should Contain    \${EMAIL_VALIDO}    @
        Should Contain    \${EMAIL_VALIDO}    .
        Input Text    id=email-field    \${EMAIL_VALIDO}
    ELSE
        Log    Formato email inválido
        Should Not Contain    \${EMAIL_VALIDO}    @@ 
        Set Variable    \${email_status}    invalido
    END
    Should Be True    \${True}

*** Test Cases ***
Test Condicionales IF ELSE
    Open Browser    https://example.com    chrome
    Verificar Acceso Usuario
    Validar Nivel Permisos
    Procesar Segun Edad
    Validar Email Formato
    Close Browser
    Log    Condicionales IF/ELSE ejecutados correctamente
        </code></pre>
        
        <h3>🎯 Práctica Condicionales (4 min):</h3>
        <ol>
            <li>Define variables para diferentes condiciones</li>
            <li>Crea keyword "Verificar Acceso Usuario" con IF simple</li>
            <li>Usa ELSE para manejar condición alternativa</li>
            <li>Implementa keyword "Validar Nivel Permisos" con ELSE IF</li>
            <li>Agrega múltiples condiciones con diferentes niveles</li>
            <li>Crea keyword "Procesar Segun Edad" con comparación numérica</li>
            <li>Usa operadores >= y < en condiciones</li>
            <li>Define keyword "Validar Email Formato" con operadores in</li>
            <li>Combina múltiples condiciones con and</li>
            <li>Ejecuta test case probando todas las condiciones</li>
            <li>Modifica variables para probar diferentes paths</li>
            <li>Verifica que cada rama IF/ELSE funcione</li>
            <li>Confirma que logs muestren path ejecutado</li>
            <li>Prueba condiciones True y False</li>
            <li>Analiza flujo de ejecución condicional</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar condicionales IF/ELSE básicos</li>
                <li>Usar ELSE IF para múltiples condiciones</li>
                <li>Combinar condiciones con operadores lógicos</li>
                <li>Controlar flujo de ejecución dinámicamente</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los condicionales IF/ELSE permiten que tus tests se adapten a diferentes situaciones - úsalos para lógica dinámica.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 056 - Operadores de comparación</h3>
        <p>Exploraremos todos los operadores de comparación disponibles para crear condiciones más precisas.</p>
    `,
    topics: ["if", "else", "conditionals"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-054"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_055 = LESSON_055;
}