const LESSON_056 = {
    id: 56,
    title: "Operadores de comparación",
    duration: "5 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>⚖️ Comparison Operators</h2>
        <p>Domina todos los operadores de comparación para condiciones precisas.</p>
        
        <h3>💻 Operadores Comparación:</h3>
        <pre><code class="robot">
*** Variables ***
\${NUMERO_A}         10
\${NUMERO_B}         20
\${TEXTO_USUARIO}    admin
\${LISTA_VALORES}    1    2    3    4    5
\${VERSION_SISTEMA}  2.5.1

*** Keywords ***
Comparaciones Numericas
    # Igualdad y desigualdad
    IF    \${NUMERO_A} == 10
        Log    Número A es igual a 10
        Should Be Equal As Numbers    \${NUMERO_A}    10
    END
    IF    \${NUMERO_A} != \${NUMERO_B}
        Log    Números A y B son diferentes
        Should Not Be Equal As Numbers    \${NUMERO_A}    \${NUMERO_B}
    END
    # Mayor y menor
    IF    \${NUMERO_B} > \${NUMERO_A}
        Log    Número B es mayor que A
        Should Be True    \${NUMERO_B} > \${NUMERO_A}
    END
    IF    \${NUMERO_A} < \${NUMERO_B}
        Log    Número A es menor que B
        Should Be True    \${NUMERO_A} < \${NUMERO_B}
    END
    Should Be True    \${True}
    
Comparaciones Texto
    # Igualdad texto
    IF    '\${TEXTO_USUARIO}' == 'admin'
        Log    Usuario es administrador
        Should Be Equal    \${TEXTO_USUARIO}    admin
    END
    # Contiene texto
    IF    'min' in '\${TEXTO_USUARIO}'
        Log    Texto contiene 'min'
        Should Contain    \${TEXTO_USUARIO}    min
    END
    # No contiene
    IF    'guest' not in '\${TEXTO_USUARIO}'
        Log    Usuario no es guest
        Should Not Contain    \${TEXTO_USUARIO}    guest
    END
    Should Not Be Empty    \${TEXTO_USUARIO}
    
Comparaciones Avanzadas
    # Mayor o igual
    IF    \${NUMERO_B} >= 20
        Log    Número B es mayor o igual a 20
        Should Be True    \${NUMERO_B} >= 20
    END
    # Menor o igual  
    IF    \${NUMERO_A} <= 15
        Log    Número A es menor o igual a 15
        Should Be True    \${NUMERO_A} <= 15
    END
    # Longitud de listas
    \${longitud}=    Get Length    \${LISTA_VALORES}
    IF    \${longitud} == 5
        Log    Lista tiene 5 elementos
        Should Be Equal As Numbers    \${longitud}    5
    END
    Should Be True    \${longitud} > 0
    
Operadores Logicos Combinados
    # AND lógico
    IF    \${NUMERO_A} > 5 and \${NUMERO_B} < 30
        Log    Ambas condiciones son verdaderas
        Should Be True    \${NUMERO_A} > 5
        Should Be True    \${NUMERO_B} < 30
    END
    # OR lógico
    IF    '\${TEXTO_USUARIO}' == 'admin' or '\${TEXTO_USUARIO}' == 'root'
        Log    Usuario tiene permisos administrativos
        Should Be True    '\${TEXTO_USUARIO}' in ['admin', 'root']
    END
    # NOT lógico
    IF    not (\${NUMERO_A} > \${NUMERO_B})
        Log    A no es mayor que B
        Should Be True    \${NUMERO_A} <= \${NUMERO_B}
    END
    Should Be True    \${True}

*** Test Cases ***
Test Operadores Comparacion
    Comparaciones Numericas
    Comparaciones Texto  
    Comparaciones Avanzadas
    Operadores Logicos Combinados
    Log    Todos los operadores de comparación probados
        </code></pre>
        
        <h3>🎯 Práctica Operadores (4 min):</h3>
        <ol>
            <li>Define variables numéricas para comparaciones</li>
            <li>Implementa comparaciones == y != con números</li>
            <li>Usa operadores > y < para mayor/menor</li>
            <li>Crea comparaciones >= y <= para rangos</li>
            <li>Define variable texto para comparaciones string</li>
            <li>Implementa comparación de igualdad con texto</li>
            <li>Usa operador 'in' para contener substring</li>
            <li>Implementa 'not in' para no contener</li>
            <li>Crea lista para comparaciones de longitud</li>
            <li>Usa Get Length y compara resultado</li>
            <li>Combina condiciones con operador 'and'</li>
            <li>Implementa condiciones con operador 'or'</li>
            <li>Usa operador 'not' para negar condiciones</li>
            <li>Ejecuta test probando todos los operadores</li>
            <li>Verifica que cada comparación funcione correctamente</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar operadores numéricos (==, !=, >, <, >=, <=)</li>
                <li>Usar operadores de texto (in, not in)</li>
                <li>Combinar condiciones con operadores lógicos</li>
                <li>Crear condiciones complejas y precisas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los operadores de comparación son la base de la lógica condicional - domínalos para crear condiciones precisas y robustas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 057 - Loops FOR básicos</h3>
        <p>Comenzaremos con loops FOR para automatizar tareas repetitivas y procesar colecciones de datos.</p>
    `,
    topics: ["operators", "comparison", "logic"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-055"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_056 = LESSON_056;
}