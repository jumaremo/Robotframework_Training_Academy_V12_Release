const LESSON_062 = {
    id: 62,
    title: "TRY/EXCEPT para manejo de errores",
    duration: "5 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>🛡️ TRY EXCEPT</h2>
        
        <h3>💻 Manejo Errores:</h3>
        <pre><code class="robot">
*** Variables ***
@{URLS_TESTING}      https://example.com    https://invalid-url-test.com    https://google.com
@{ELEMENTOS_ID}      valid-element    invalid-element    another-element
@{NUMEROS_TEST}      10    0    5    abc    15

*** Keywords ***
TRY EXCEPT Básico
    TRY
        \${resultado}=    Evaluate    10 / 2
        Should Be Equal As Numbers    \${resultado}    5
        Log    División exitosa: \${resultado}
    EXCEPT
        Log    Error en división básica
        Should Be True    \${False}
    END
    Should Be True    \${True}
    
Manejo Division Por Cero
    FOR    \${numero}    IN    @{NUMEROS_TEST}
        TRY
            \${division}=    Evaluate    10 / \${numero}
            Log    10 / \${numero} = \${division}
            Should Be True    \${division} > 0 or \${division} < 0
        EXCEPT
            Log    Error: División por cero o valor inválido (\${numero})
            Should Be True    str('\${numero}') in ['0', 'abc']
            Set Variable    \${error_handled}    True
        END
    END
    Should Be True    \${True}
    
TRY EXCEPT Con Elementos Web
    FOR    \${elemento_id}    IN    @{ELEMENTOS_ID}
        TRY
            # Simular búsqueda de elemento web
            IF    '\${elemento_id}' == 'valid-element'
                Log    Elemento encontrado: \${elemento_id}
                Should Be Equal    \${elemento_id}    valid-element
                Set Variable    \${elemento_status}    encontrado
            ELSE
                Fail    Elemento no encontrado: \${elemento_id}
            END
        EXCEPT
            Log    Elemento \${elemento_id} no disponible - continuando
            Should Not Be Equal    \${elemento_id}    valid-element
            Set Variable    \${elemento_status}    no_encontrado
        END
        Should Not Be Empty    \${elemento_status}
    END
    Should Be True    \${True}
    
Validacion Con Multiple EXCEPT
    \${numero_test}=    Set Variable    abc
    TRY
        \${convertido}=    Convert To Number    \${numero_test}
        Should Be True    \${convertido} > 0
        Log    Conversión exitosa: \${convertido}
    EXCEPT    ValueError
        Log    Error de valor: \${numero_test} no es número
        Should Be Equal    \${numero_test}    abc
        Set Variable    \${error_tipo}    valor
    EXCEPT    TypeError
        Log    Error de tipo en conversión
        Set Variable    \${error_tipo}    tipo
    EXCEPT
        Log    Error genérico en conversión
        Set Variable    \${error_tipo}    generico
    END
    Should Not Be Empty    \${error_tipo}
    
TRY EXCEPT FINALLY
    \${archivo_abierto}=    Set Variable    False
    TRY
        Log    Intentando abrir archivo de prueba
        # Simular operación de archivo
        \${contenido}=    Set Variable    datos_de_prueba
        Should Not Be Empty    \${contenido}
        \${archivo_abierto}=    Set Variable    True
        # Simular error ocasional
        IF    'prueba' in '\${contenido}'
            Log    Archivo procesado correctamente
            Should Contain    \${contenido}    prueba
        END
    EXCEPT
        Log    Error al procesar archivo
        Set Variable    \${error_archivo}    True
    FINALLY
        IF    \${archivo_abierto}
            Log    Cerrando archivo (simulado)
            \${archivo_abierto}=    Set Variable    False
        END
        Log    Limpieza de recursos completada
        Should Be Equal    \${archivo_abierto}    False
    END
    Should Be True    \${True}

*** Test Cases ***
Test TRY EXCEPT
    TRY EXCEPT Básico
    Manejo Division Por Cero
    TRY EXCEPT Con Elementos Web
    Validacion Con Multiple EXCEPT
    TRY EXCEPT FINALLY
    Log    Manejo de errores TRY/EXCEPT completado
        </code></pre>
        
        <h3>🎯 Práctica TRY EXCEPT (4 min):</h3>
        <ol>
            <li>Define listas con valores válidos e inválidos para testing</li>
            <li>Crea keyword "TRY EXCEPT Básico" con división simple</li>
            <li>Usa TRY para operación que puede fallar</li>
            <li>Implementa EXCEPT para capturar errores</li>
            <li>Define keyword "Manejo Division Por Cero" con FOR</li>
            <li>Itera lista incluyendo cero y valores inválidos</li>
            <li>Captura errores de división por cero con EXCEPT</li>
            <li>Registra errores y continúa procesamiento</li>
            <li>Crea keyword "TRY EXCEPT Con Elementos Web" simulado</li>
            <li>Simula búsqueda de elementos que pueden no existir</li>
            <li>Usa Fail para simular elemento no encontrado</li>
            <li>Maneja errores de elementos faltantes con EXCEPT</li>
            <li>Implementa keyword "Validacion Con Multiple EXCEPT"</li>
            <li>Usa Convert To Number con valor inválido</li>
            <li>Captura ValueError específicamente</li>
            <li>Agrega EXCEPT genérico para otros errores</li>
            <li>Define keyword "TRY EXCEPT FINALLY" completo</li>
            <li>Simula operación de archivo con apertura/cierre</li>
            <li>Usa FINALLY para limpieza garantizada</li>
            <li>Verifica que FINALLY siempre se ejecute</li>
            <li>Ejecuta test case con todos los tipos TRY/EXCEPT</li>
            <li>Confirma que errores sean capturados correctamente</li>
            <li>Valida que procesamiento continúe después de errores</li>
            <li>Verifica que recursos se liberen en FINALLY</li>
        </ol>
        
        <h3>🚀 Siguiente: Lección 063 - Combinando estructuras de control</h3>
    `,
    topics: ["try", "except", "error-handling"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-061"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_062 = LESSON_062;
}