// ===== LECCIÓN 058 - FOR con listas y rangos =====
const LESSON_058 = {
    id: 58,
    title: "FOR con listas y rangos",
    duration: "5 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>📋 FOR Lists Ranges</h2>
        
        <h3>💻 FOR Listas Rangos:</h3>
        <pre><code class="robot">
*** Variables ***
@{NOMBRES}           Ana    Carlos    Maria    Pedro    Sofia
@{EDADES}            25    30    28    35    22
@{PRODUCTOS}         laptop    mouse    teclado    monitor
@{PRECIOS}           800    25    45    300

*** Keywords ***
FOR Con Rangos Numericos
    FOR    \${i}    IN RANGE    10
        Log    Iteración número: \${i}
        Should Be True    \${i} >= 0
        Should Be True    \${i} < 10
        \${cuadrado}=    Evaluate    \${i} * \${i}
        Should Be Equal As Numbers    \${cuadrado}    \${i} * \${i}
        Log    \${i} al cuadrado es \${cuadrado}
    END
    Log    Rango 0-9 procesado completamente
    
FOR Con Rangos Personalizados
    FOR    \${numero}    IN RANGE    5    15    2
        Log    Número en rango personalizado: \${numero}
        Should Be True    \${numero} >= 5
        Should Be True    \${numero} < 15
        Should Be True    \${numero} % 2 == 1
        \${doble}=    Evaluate    \${numero} * 2
        Log    \${numero} multiplicado por 2: \${doble}
    END
    Should Be True    \${True}
    
FOR Listas Con Indices
    FOR    \${index}    IN RANGE    len(\${NOMBRES})
        \${nombre}=    Get From List    \${NOMBRES}    \${index}
        \${edad}=    Get From List    \${EDADES}    \${index}
        Log    Persona \${index}: \${nombre} tiene \${edad} años
        Should Not Be Empty    \${nombre}
        Should Be True    \${edad} > 0
        IF    \${edad} >= 30
            Log    \${nombre} es mayor de 30 años
            Should Be True    \${edad} >= 30
        ELSE
            Log    \${nombre} es menor de 30 años
            Should Be True    \${edad} < 30
        END
    END
    Should Be True    \${True}
    
FOR Listas Multiples Sincronizadas
    \${total_productos}=    Get Length    \${PRODUCTOS}
    FOR    \${i}    IN RANGE    \${total_productos}
        \${producto}=    Get From List    \${PRODUCTOS}    \${i}
        \${precio}=    Get From List    \${PRECIOS}    \${i}
        Log    Producto: \${producto} - Precio: $\${precio}
        Should Not Be Empty    \${producto}
        Should Be True    \${precio} > 0
        IF    \${precio} > 100
            Log    \${producto} es producto premium
            Should Be True    \${precio} > 100
        ELSE
            Log    \${producto} es producto económico
            Should Be True    \${precio} <= 100
        END
    END
    Should Be Equal As Numbers    \${total_productos}    4
    
FOR Anidados Con Rangos
    FOR    \${fila}    IN RANGE    3
        FOR    \${columna}    IN RANGE    3
            \${posicion}=    Set Variable    [\${fila}][\${columna}]
            Log    Procesando posición: \${posicion}
            Should Be True    \${fila} >= 0 and \${fila} < 3
            Should Be True    \${columna} >= 0 and \${columna} < 3
            \${valor}=    Evaluate    \${fila} * 3 + \${columna} + 1
            Log    Valor en \${posicion}: \${valor}
            Should Be True    \${valor} >= 1 and \${valor} <= 9
        END
    END
    Log    Matriz 3x3 procesada completamente

*** Keywords ***
Procesar Rangos Avanzados
    FOR    \${num}    IN RANGE    20    50    5
        Log    Procesando número en rango: \${num}
        Should Be True    \${num} >= 20
        Should Be True    \${num} < 50
        Should Be True    \${num} % 5 == 0
        \${cubo}=    Evaluate    \${num} ** 3
        Should Be True    \${cubo} > 0
        Log    \${num} al cubo: \${cubo}
    END
    Should Be True    \${True}
    
Validar Listas Sincronizadas
    FOR    \${i}    IN RANGE    len(\${NOMBRES})
        \${nombre}=    Get From List    \${NOMBRES}    \${i}
        \${edad}=    Get From List    \${EDADES}    \${i}
        Should Not Be Empty    \${nombre}
        Should Be True    \${edad} > 0
        IF    \${edad} >= 25
            Log    \${nombre} es adulto joven
            Should Be True    \${edad} >= 25
        END
        \${producto}=    Get From List    \${PRODUCTOS}    \${i}
        Should Not Be Empty    \${producto}
        Log    \${nombre} compra \${producto}
    END
    Should Be True    \${True}

*** Test Cases ***
Test FOR Listas Rangos
    FOR Con Rangos Numericos
    FOR Con Rangos Personalizados
    FOR Listas Con Indices
    FOR Listas Multiples Sincronizadas
    FOR Anidados Con Rangos
    Procesar Rangos Avanzados
    Validar Listas Sincronizadas
    Log    Todos los FOR con listas y rangos ejecutados
        </code></pre>
        
        <h3>🎯 Práctica Listas Rangos (8 min):</h3>
        <ol>
            <li>Define listas de datos relacionados (nombres, edades)</li>
            <li>Crea FOR con IN RANGE simple (0 a 9)</li>
            <li>Usa Should Be True para validar rangos</li>
            <li>Implementa FOR con rango personalizado (inicio, fin, step)</li>
            <li>Verifica números impares con módulo %</li>
            <li>Crea FOR iterando índices de listas</li>
            <li>Usa Get From List para acceder por posición</li>
            <li>Combina datos de múltiples listas sincronizadas</li>
            <li>Implementa lógica condicional dentro del FOR</li>
            <li>Crea FOR anidados para matriz 3x3</li>
            <li>Calcula valores usando fórmulas en loops</li>
            <li>Ejecuta test verificando todos los tipos FOR</li>
            <li>Confirma que rangos y límites funcionen</li>
            <li>Verifica sincronización entre listas múltiples</li>
            <li>Analiza eficiencia de FOR anidados vs simples</li>
            <li>Crea FOR con rango 20-50 step 5 personalizado</li>
            <li>Implementa validación de números pares en rango</li>
            <li>Agrega FOR procesando 3 listas simultáneamente</li>
            <li>Usa Get Length en múltiples estructuras</li>
            <li>Crea matriz 4x4 con valores calculados</li>
            <li>Implementa búsqueda de elemento en FOR anidado</li>
            <li>Valida todos los elementos procesados correctamente</li>
            <li>Ejecuta keyword "Procesar Rangos Avanzados" con rango 20-50</li>
            <li>Verifica números múltiplos de 5 en el rango</li>
            <li>Calcula cubos de números y valida resultados</li>
            <li>Ejecuta keyword "Validar Listas Sincronizadas" completo</li>
            <li>Procesa nombres, edades y productos simultáneamente</li>
            <li>Aplica lógica condicional según edad en cada iteración</li>
            <li>Confirma que todos los FOR y keywords funcionen correctamente</li>
            <li>Valida que rangos personalizados procesen elementos correctos</li>
            <li>Verifica sincronización perfecta entre múltiples listas</li>
            <li>Crea FOR adicional con rango 100-200 step 10</li>
            <li>Implementa validación de números pares en rango nuevo</li>
            <li>Agrega FOR procesando 4 listas simultáneamente</li>
            <li>Usa Get Length en múltiples estructuras complejas</li>
            <li>Crea matriz 5x5 con valores usando fórmula específica</li>
            <li>Implementa búsqueda de valor máximo en FOR anidado</li>
            <li>Valida que todos los elementos sean procesados sin errores</li>
            <li>Confirma que cada iteración procese datos correctamente</li>
            <li>Verifica que índices y valores coincidan perfectamente</li>
            <li>Ejecuta validación final de todos los rangos y listas procesados</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Usar rangos numéricos personalizados en FOR</li>
                <li>Sincronizar múltiples listas en iteración</li>
                <li>Implementar FOR anidados para estructuras complejas</li>
                <li>Combinar índices con acceso a elementos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los rangos personalizados y listas sincronizadas te permiten procesar datos complejos de manera eficiente y organizada.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 059 - FOR con diccionarios</h3>
        <p>Exploraremos cómo iterar diccionarios y estructuras key-value para datos más complejos.</p>
    `,
    topics: ["lists", "ranges", "collections"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-057"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_058 = LESSON_058;
}