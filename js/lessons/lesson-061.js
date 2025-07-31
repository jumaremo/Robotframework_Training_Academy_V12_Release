const LESSON_061 = {
    id: 61,
    title: "Control de loops: BREAK y CONTINUE",
    duration: "5 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>⏯️ BREAK CONTINUE</h2>
        
        <h3>💻 Control Loops:</h3>
        <pre><code class="robot">
*** Variables ***
@{NUMEROS_LISTA}     1    2    3    4    5    6    7    8    9    10
@{PRODUCTOS}         laptop    mouse    tablet    teclado    monitor
@{PRECIOS}           800    25    500    45    300

*** Keywords ***
Loop Con BREAK
    FOR    \${numero}    IN    @{NUMEROS_LISTA}
        Log    Procesando número: \${numero}
        Should Be True    \${numero} > 0
        IF    \${numero} == 5
            Log    Número 5 encontrado - saliendo del loop
            Should Be Equal As Numbers    \${numero}    5
            BREAK
        END
        Log    Número \${numero} procesado normalmente
        Should Be True    \${numero} < 5
    END
    Should Be True    \${True}
    
Loop Con CONTINUE
    FOR    \${numero}    IN    @{NUMEROS_LISTA}
        Log    Evaluando número: \${numero}
        Should Be True    \${numero} > 0
        IF    \${numero} % 2 == 0
            Log    Número \${numero} es par - saltando procesamiento
            Should Be True    \${numero} % 2 == 0
            CONTINUE
        END
        Log    Procesando número impar: \${numero}
        Should Be True    \${numero} % 2 == 1
        \${cuadrado}=    Evaluate    \${numero} ** 2
        Should Be True    \${cuadrado} > 0
        Log    \${numero} al cuadrado: \${cuadrado}
    END
    Should Be True    \${True}
    
Busqueda Con BREAK
    \${encontrado}=    Set Variable    False
    FOR    \${producto}    IN    @{PRODUCTOS}
        Log    Buscando producto: \${producto}
        Should Not Be Empty    \${producto}
        IF    '\${producto}' == 'tablet'
            Log    Producto tablet encontrado
            Should Be Equal    \${producto}    tablet
            \${encontrado}=    Set Variable    True
            BREAK
        END
        Log    Producto \${producto} no es el buscado
        Should Not Be Equal    \${producto}    tablet
    END
    Should Be True    \${encontrado}
    
Filtrado Con CONTINUE
    FOR    \${i}    IN RANGE    len(\${PRODUCTOS})
        \${producto}=    Get From List    \${PRODUCTOS}    \${i}
        \${precio}=    Get From List    \${PRECIOS}    \${i}
        Log    Evaluando \${producto} con precio $\${precio}
        Should Not Be Empty    \${producto}
        Should Be True    \${precio} > 0
        IF    \${precio} < 100
            Log    Producto \${producto} muy barato - saltando
            Should Be True    \${precio} < 100
            CONTINUE
        END
        Log    Producto premium: \${producto} por $\${precio}
        Should Be True    \${precio} >= 100
        Set Variable    \${procesado}    True
    END
    Should Be True    \${True}
    
WHILE Con BREAK CONTINUE
    \${contador}=    Set Variable    0
    \${procesados}=    Set Variable    0
    WHILE    \${contador} < 20
        \${contador}=    Evaluate    \${contador} + 1
        Log    Iteración WHILE: \${contador}
        Should Be True    \${contador} <= 20
        IF    \${contador} > 15
            Log    Contador > 15, saliendo con BREAK
            Should Be True    \${contador} > 15
            BREAK
        END
        IF    \${contador} % 3 == 0
            Log    Múltiplo de 3: \${contador} - saltando con CONTINUE
            Should Be True    \${contador} % 3 == 0
            CONTINUE
        END
        \${procesados}=    Evaluate    \${procesados} + 1
        Log    Procesando elemento \${contador}, total procesados: \${procesados}
        Should Be True    \${procesados} > 0
    END
    Should Be True    \${procesados} > 0

*** Test Cases ***
Test Control Loops
    Loop Con BREAK
    Loop Con CONTINUE
    Busqueda Con BREAK
    Filtrado Con CONTINUE
    WHILE Con BREAK CONTINUE
    Log    Control de loops BREAK y CONTINUE completado
        </code></pre>
        
        <h3>🎯 Práctica Control Loops (4 min):</h3>
        <ol>
            <li>Define listas de números y productos para testing</li>
            <li>Crea keyword "Loop Con BREAK" que salga al encontrar 5</li>
            <li>Usa IF para detectar condición de BREAK</li>
            <li>Implementa Log antes y después del BREAK</li>
            <li>Crea keyword "Loop Con CONTINUE" para números pares</li>
            <li>Usa operador % para detectar números pares</li>
            <li>Aplica CONTINUE saltando procesamiento de pares</li>
            <li>Procesa solo números impares con cálculos</li>
            <li>Define keyword "Busqueda Con BREAK" para producto específico</li>
            <li>Usa variable found flag para controlar búsqueda</li>
            <li>Implementa BREAK cuando encuentre producto buscado</li>
            <li>Crea keyword "Filtrado Con CONTINUE" por precio</li>
            <li>Combina Get From List con índices para dos listas</li>
            <li>Aplica CONTINUE para productos baratos (< $100)</li>
            <li>Procesa solo productos premium con CONTINUE</li>
            <li>Define keyword "WHILE Con BREAK CONTINUE" combinado</li>
            <li>Usa BREAK para salir cuando contador > 15</li>
            <li>Aplica CONTINUE para múltiplos de 3</li>
            <li>Cuenta elementos procesados vs saltados</li>
            <li>Ejecuta test case con todos los tipos de control</li>
            <li>Verifica que BREAK termine loops correctamente</li>
            <li>Confirma que CONTINUE salte iteraciones específicas</li>
            <li>Valida que lógica de control funcione en FOR y WHILE</li>
            <li>Analiza diferencias entre BREAK (salir) y CONTINUE (saltar)</li>
        </ol>
        
        <h3>🚀 Siguiente: Lección 062 - TRY/EXCEPT para manejo de errores</h3>
    `,
    topics: ["break", "continue", "control"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-060"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_061 = LESSON_061;
}