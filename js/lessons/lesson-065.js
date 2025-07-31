const LESSON_065 = {
    id: 65,
    title: "Debugging de lógica compleja",
    duration: "5 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>🐛 Debug Complex</h2>
        
        <h3>💻 Debugging Técnicas:</h3>
        <pre><code class="robot">
*** Variables ***
@{DEBUG_DATA}        item1    item2    error_item    item4    item5
&{DEBUG_CONFIG}      verbose=True    log_level=DEBUG    trace_enabled=True
\${DEBUG_COUNTER}    0

*** Keywords ***
Debug Con Logging Detallado
    Log    Iniciando debugging con logging detallado    level=DEBUG
    
    FOR    \${i}    IN RANGE    len(\${DEBUG_DATA})
        \${item}=    Get From List    \${DEBUG_DATA}    \${i}
        Log    [DEBUG] Procesando item \${i}: \${item}    level=DEBUG
        Should Not Be Empty    \${item}
        
        # Técnica: Logging detallado en cada paso
        IF    '\${item}' == 'error_item'
            Log    [WARNING] Item problemático detectado: \${item}    level=WARN
            Should Be Equal    \${item}    error_item
            
            # Debug del estado interno
            Log    [DEBUG] Estado antes del error - Índice: \${i}, Item: \${item}    level=DEBUG
            Log    [DEBUG] Lista completa: @{DEBUG_DATA}    level=DEBUG
            Log    [DEBUG] Configuración: &{DEBUG_CONFIG}    level=DEBUG
            
            TRY
                # Simular operación que puede fallar
                IF    \${DEBUG_CONFIG.verbose}
                    Log    [DEBUG] Modo verbose activado para debugging    level=DEBUG
                    \${processed}=    Set Variable    \${item}_processed
                ELSE
                    Fail    Simulando error sin verbose
                END
                
            EXCEPT
                Log    [ERROR] Falló procesamiento de \${item}    level=ERROR
                Should Be Equal    \${item}    error_item
                
                # Debug información del error
                Log    [DEBUG] Variables en momento del error:    level=DEBUG
                Log    [DEBUG] - i: \${i}    level=DEBUG
                Log    [DEBUG] - item: \${item}    level=DEBUG
                Log    [DEBUG] - verbose: \${DEBUG_CONFIG.verbose}    level=DEBUG
                
                CONTINUE
            END
        ELSE
            Log    [INFO] Item normal procesado: \${item}    level=INFO
            Should Not Be Equal    \${item}    error_item
        END
        
        Log    [DEBUG] Completado procesamiento de item \${i}    level=DEBUG
    END
    
    Log    [INFO] Debugging con logging completado    level=INFO
    Should Be True    \${True}
    
Debug Con Breakpoints Simulados
    \${debug_step}=    Set Variable    1
    \${variables_estado}=    Create Dictionary
    
    Log    [BREAKPOINT] Iniciando debugging paso a paso
    
    FOR    \${numero}    IN RANGE    1    6
        Log    [BREAKPOINT \${debug_step}] Evaluando número: \${numero}
        
        # Técnica: Capturar estado en cada "breakpoint"
        Set To Dictionary    \${variables_estado}    numero_actual=\${numero}
        Set To Dictionary    \${variables_estado}    debug_step=\${debug_step}
        Set To Dictionary    \${variables_estado}    timestamp=\${numero * 10}
        
        Log    [DEBUG] Estado en breakpoint \${debug_step}:
        FOR    \${key}    \${value}    IN    &{variables_estado}
            Log    [DEBUG] - \${key}: \${value}
            Should Not Be Empty    \${key}
        END
        
        # Lógica compleja para debugging
        IF    \${numero} % 2 == 0
            Log    [BREAKPOINT \${debug_step}] Número par detectado: \${numero}
            Should Be True    \${numero} % 2 == 0
            
            # Simular cálculo complejo
            \${resultado}=    Evaluate    \${numero} * \${numero} + \${debug_step}
            Set To Dictionary    \${variables_estado}    resultado=\${resultado}
            Log    [DEBUG] Resultado calculado: \${resultado}
            
        ELSE
            Log    [BREAKPOINT \${debug_step}] Número impar: \${numero}
            Should Be True    \${numero} % 2 == 1
            Set To Dictionary    \${variables_estado}    resultado=skip
        END
        
        \${debug_step}=    Evaluate    \${debug_step} + 1
        Should Be True    \${debug_step} <= 10
        
        # Simular pausa de debugging
        Sleep    0.1s
    END
    
    Log    [BREAKPOINT FINAL] Estado final de variables:
    FOR    \${key}    \${value}    IN    &{variables_estado}
        Log    [DEBUG] Final - \${key}: \${value}
        Should Not Be Empty    \${key}
    END
    
Debug Condicional Complejo
    \${condiciones_evaluadas}=    Set Variable    0
    \${condiciones_verdaderas}=    Set Variable    0
    
    FOR    \${test_case}    IN RANGE    1    8
        \${condiciones_evaluadas}=    Evaluate    \${condiciones_evaluadas} + 1
        Log    [DEBUG] Evaluando caso de prueba: \${test_case}
        
        # Técnica: Debug de condiciones complejas
        \${condicion_a}=    Evaluate    \${test_case} > 3
        \${condicion_b}=    Evaluate    \${test_case} % 2 == 0
        \${condicion_c}=    Evaluate    \${test_case} < 7
        
        Log    [DEBUG] Condiciones individuales para caso \${test_case}:
        Log    [DEBUG] - condicion_a (\${test_case} > 3): \${condicion_a}
        Log    [DEBUG] - condicion_b (\${test_case} % 2 == 0): \${condicion_b}
        Log    [DEBUG] - condicion_c (\${test_case} < 7): \${condicion_c}
        
        # Lógica compleja de debugging
        \${resultado_complejo}=    Evaluate    \${condicion_a} and (\${condicion_b} or \${condicion_c})
        Log    [DEBUG] Resultado complejo (\${condicion_a} AND (\${condicion_b} OR \${condicion_c})): \${resultado_complejo}
        
        IF    \${resultado_complejo}
            \${condiciones_verdaderas}=    Evaluate    \${condiciones_verdaderas} + 1
            Log    [SUCCESS] Caso \${test_case} cumple condiciones complejas
            Should Be True    \${resultado_complejo}
            
            # Debug del flujo exitoso
            Log    [DEBUG] Flujo exitoso - Incrementando contador a \${condiciones_verdaderas}
            
        ELSE
            Log    [INFO] Caso \${test_case} no cumple condiciones
            Should Be False    \${resultado_complejo}
            
            # Debug del por qué falló
            IF    not \${condicion_a}
                Log    [DEBUG] Falló porque condicion_a es False (\${test_case} <= 3)
            ELSE IF    not \${condicion_b} and not \${condicion_c}
                Log    [DEBUG] Falló porque condicion_b Y condicion_c son False
            END
        END
        
        Log    [DEBUG] Resumen caso \${test_case}: \${condiciones_verdaderas}/\${condiciones_evaluadas} exitosos
    END
    
    Log    [SUMMARY] Total casos exitosos: \${condiciones_verdaderas} de \${condiciones_evaluadas}
    Should Be True    \${condiciones_verdaderas} > 0
    Should Be Equal As Numbers    \${condiciones_evaluadas}    7
    
Debug Error Recovery
    \${errores_capturados}=    Set Variable    0
    \${recovery_intentos}=    Set Variable    0
    @{errores_log}=    Create List
    
    FOR    \${operacion}    IN    divide_10_2    divide_10_0    divide_abc_5    divide_20_4
        Log    [DEBUG] Iniciando operación: \${operacion}
        \${recovery_intentos}=    Evaluate    \${recovery_intentos} + 1
        
        TRY
            # Parsear la operación para debugging
            @{partes}=    Split String    \${operacion}    _
            \${num1}=    Get From List    \${partes}    1
            \${num2}=    Get From List    \${partes}    2
            
            Log    [DEBUG] Parseado - num1: \${num1}, num2: \${num2}
            
            # Intentar conversión y operación
            \${numero1}=    Convert To Number    \${num1}
            \${numero2}=    Convert To Number    \${num2}
            \${resultado}=    Evaluate    \${numero1} / \${numero2}
            
            Log    [SUCCESS] \${num1} / \${num2} = \${resultado}
            Should Be True    \${resultado} >= 0 or \${resultado} < 0
            
        EXCEPT    ValueError    AS    \${error_msg}
            \${errores_capturados}=    Evaluate    \${errores_capturados} + 1
            Log    [ERROR] ValueError en \${operacion}: \${error_msg}
            Append To List    \${errores_log}    ValueError_\${operacion}
            
            # Debug recovery para ValueError
            Log    [DEBUG] Recovery ValueError - intentando valores por defecto
            \${resultado}=    Set Variable    0
            
        EXCEPT    ZeroDivisionError    AS    \${error_msg}
            \${errores_capturados}=    Evaluate    \${errores_capturados} + 1
            Log    [ERROR] ZeroDivisionError en \${operacion}: \${error_msg}
            Append To List    \${errores_log}    ZeroDivisionError_\${operacion}
            
            # Debug recovery para ZeroDivisionError
            Log    [DEBUG] Recovery ZeroDivisionError - usando infinito
            \${resultado}=    Set Variable    inf
            
        EXCEPT    AS    \${error_msg}
            \${errores_capturados}=    Evaluate    \${errores_capturados} + 1
            Log    [ERROR] Error genérico en \${operacion}: \${error_msg}
            Append To List    \${errores_log}    Generic_\${operacion}
            \${resultado}=    Set Variable    error
            
        FINALLY
            Log    [DEBUG] Finalizando operación \${operacion} con resultado: \${resultado}
            Should Not Be Empty    \${operacion}
        END
    END
    
    Log    [SUMMARY] Debug Error Recovery completado:
    Log    [SUMMARY] - Total operaciones: 4
    Log    [SUMMARY] - Errores capturados: \${errores_capturados}
    Log    [SUMMARY] - Recovery intentos: \${recovery_intentos}
    Log    [SUMMARY] - Log de errores: @{errores_log}
    
    Should Be True    \${errores_capturados} > 0
    Should Be Equal As Numbers    \${recovery_intentos}    4

*** Test Cases ***
Test Debugging Complejo
    Debug Con Logging Detallado
    Debug Con Breakpoints Simulados
    Debug Condicional Complejo
    Debug Error Recovery
    Log    Debugging de lógica compleja completado
        </code></pre>
        
        <h3>🎯 Práctica Debugging (4 min):</h3>
        <ol>
            <li>Define variables y configuración para debugging detallado</li>
            <li>Crea keyword "Debug Con Logging Detallado" con niveles</li>
            <li>Usa Log con level=DEBUG, INFO, WARN, ERROR</li>
            <li>Implementa logging del estado interno en cada paso</li>
            <li>Captura información completa en momentos de error</li>
            <li>Define keyword "Debug Con Breakpoints Simulados"</li>
            <li>Simula breakpoints con Log específicos en cada paso</li>
            <li>Captura estado de variables en diccionario</li>
            <li>Usa Sleep para simular pausa de debugging</li>
            <li>Muestra estado completo en cada "breakpoint"</li>
            <li>Crea keyword "Debug Condicional Complejo" avanzado</li>
            <li>Evalúa condiciones individuales y las registra</li>
            <li>Debug lógica compleja con AND, OR, NOT</li>
            <li>Explica por qué condiciones fallan en logs</li>
            <li>Implementa keyword "Debug Error Recovery" robusto</li>
            <li>Parsea operaciones complejas para debugging</li>
            <li>Usa múltiples EXCEPT específicos por tipo de error</li>
            <li>Implementa recovery strategies para cada error</li>
            <li>Mantiene log completo de errores encontrados</li>
            <li>Usa FINALLY para limpieza garantizada</li>
            <li>Ejecuta test case con todas las técnicas de debugging</li>
            <li>Verifica que logs proporcionen información útil</li>
            <li>Confirma que recovery permita continuar ejecución</li>
            <li>Analiza técnicas aplicables a debugging real</li>
        </ol>
        
        <h3>🚀 Siguiente: Lección 066 - Ejercicio: Algoritmo de validación</h3>
    `,
    topics: ["debugging", "complex", "troubleshooting"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-064"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_065 = LESSON_065;
}