const LESSON_057 = {
    id: 57,
    title: "Loops FOR básicos",
    duration: "5 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>🔄 FOR Loops</h2>
        <p>Automatiza tareas repetitivas usando loops FOR para iterar colecciones.</p>
        
        <h3>💻 Loops FOR:</h3>
        <pre><code class="robot">
*** Variables ***
\${CONTADOR}         0
@{USUARIOS}          admin    user1    user2    guest
@{NUMEROS}           1    2    3    4    5
@{ELEMENTOS_WEB}     id=btn1    id=btn2    id=btn3

*** Keywords ***
Loop FOR Simple
    FOR    \${numero}    IN    1    2    3    4    5
        Log    Procesando número: \${numero}
        Should Be True    \${numero} > 0
        \${resultado}=    Evaluate    \${numero} * 2
        Should Be Equal As Numbers    \${resultado}    \${numero} * 2
        Log    Número \${numero} multiplicado por 2 es \${resultado}
    END
    Should Be True    \${True}
    
Loop FOR Con Lista
    FOR    \${usuario}    IN    @{USUARIOS}
        Log    Procesando usuario: \${usuario}
        Should Not Be Empty    \${usuario}
        IF    '\${usuario}' == 'admin'
            Log    Usuario administrador encontrado
            Should Be Equal    \${usuario}    admin
        ELSE
            Log    Usuario regular: \${usuario}
            Should Not Be Equal    \${usuario}    admin
        END
    END
    \${total_usuarios}=    Get Length    \${USUARIOS}
    Should Be Equal As Numbers    \${total_usuarios}    4
    
Loop FOR Con Contador
    \${contador_local}=    Set Variable    0
    FOR    \${item}    IN    @{NUMEROS}
        \${contador_local}=    Evaluate    \${contador_local} + 1
        Log    Iteración \${contador_local}: procesando \${item}
        Should Be True    \${contador_local} <= 5
        Should Be Equal As Numbers    \${item}    \${contador_local}
    END
    Should Be Equal As Numbers    \${contador_local}    5
    Log    Loop completado con \${contador_local} iteraciones
    
Loop FOR Elementos Web
    FOR    \${elemento}    IN    @{ELEMENTOS_WEB}
        Log    Verificando elemento: \${elemento}
        Should Contain    \${elemento}    id=btn
        # Simular acción en elemento web
        IF    'btn1' in '\${elemento}'
            Log    Procesando botón principal
            Should Contain    \${elemento}    btn1
        ELSE IF    'btn2' in '\${elemento}'
            Log    Procesando botón secundario
            Should Contain    \${elemento}    btn2
        ELSE
            Log    Procesando otro botón
            Should Contain    \${elemento}    btn
        END
    END
    Should Be True    \${True}
    
Loop FOR Con Indices
    FOR    \${index}    IN RANGE    3
        \${usuario_actual}=    Get From List    \${USUARIOS}    \${index}
        Log    Usuario en posición \${index}: \${usuario_actual}
        Should Not Be Empty    \${usuario_actual}
        Should Be True    \${index} >= 0
        Should Be True    \${index} < 3
    END
    Log    Procesados 3 usuarios usando índices

*** Test Cases ***
Test Loops FOR Basicos
    Loop FOR Simple
    Loop FOR Con Lista
    Loop FOR Con Contador
    Loop FOR Elementos Web  
    Loop FOR Con Indices
    Log    Todos los loops FOR básicos ejecutados correctamente
        </code></pre>
        
        <h3>🎯 Práctica FOR (4 min):</h3>
        <ol>
            <li>Define listas y variables para loops</li>
            <li>Crea loop FOR simple con números hardcodeados</li>
            <li>Usa Log y Should Be True dentro del loop</li>
            <li>Implementa loop FOR iterando lista de usuarios</li>
            <li>Agrega condicional IF dentro del loop FOR</li>
            <li>Crea loop FOR con contador manual</li>
            <li>Usa Evaluate para incrementar contador</li>
            <li>Implementa loop FOR para elementos web simulados</li>
            <li>Combina loop FOR con múltiples IF/ELSE IF</li>
            <li>Crea loop FOR usando IN RANGE con índices</li>
            <li>Usa Get From List para acceder por posición</li>
            <li>Ejecuta test case con todos los tipos de loops</li>
            <li>Verifica que cada loop procese elementos correctamente</li>
            <li>Confirma que contadores y validaciones funcionen</li>
            <li>Observa cómo loops automatizan tareas repetitivas</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear loops FOR básicos para iteración</li>
                <li>Iterar listas y colecciones de datos</li>
                <li>Combinar loops con lógica condicional</li>
                <li>Usar contadores e índices en loops</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los loops FOR son perfectos para automatizar acciones repetitivas - úsalos cuando necesites procesar múltiples elementos similares.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 058 - FOR con listas y rangos</h3>
        <p>Profundizaremos en loops FOR avanzados trabajando con listas complejas y rangos numéricos.</p>
    `,
    topics: ["for", "loops", "iteration"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-056"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_057 = LESSON_057;
}