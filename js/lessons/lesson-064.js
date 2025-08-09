const LESSON_064 = {
    id: 64,
    title: "Patrones comunes de control de flujo",
    duration: "5 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>🎯 Common Patterns</h2>
        
        <h3>💻 Patrones Control:</h3>
        <pre><code class="robot">
*** Variables ***
@{DATOS_ENTRADA}     valid    invalid    empty    valid    error    valid
@{NUMEROS_PROC}      1    2    3    0    5    -1    7    8    9    10
&{CONFIG_SISTEMA}    retry_max=3    timeout=5    debug=True    batch_size=4

*** Keywords ***
Patron Validador Chain
    \${resultados_validos}=    Set Variable    0
    \${resultados_invalidos}=    Set Variable    0
    
    FOR    \${dato}    IN    @{DATOS_ENTRADA}
        Log    Validando dato: \${dato}
        Should Not Be Empty    \${dato}
        
        # Patrón: Cadena de validaciones
        \${valido}=    Set Variable    True
        
        IF    '\${dato}' == 'empty'
            Log    Dato vacío detectado
            Should Be Equal    \${dato}    empty
            \${valido}=    Set Variable    False
        ELSE IF    '\${dato}' == 'invalid'
            Log    Dato inválido detectado
            Should Be Equal    \${dato}    invalid
            \${valido}=    Set Variable    False
        ELSE IF    '\${dato}' == 'error'
            Log    Dato con error detectado
            Should Be Equal    \${dato}    error
            \${valido}=    Set Variable    False
        ELSE
            Log    Dato válido: \${dato}
            Should Be Equal    \${dato}    valid
        END
        
        IF    \${valido}
            \${resultados_validos}=    Evaluate    \${resultados_validos} + 1
            Log    Total válidos: \${resultados_validos}
        ELSE
            \${resultados_invalidos}=    Evaluate    \${resultados_invalidos} + 1
            Log    Total inválidos: \${resultados_invalidos}
        END
        
        Should Be True    \${resultados_validos} >= 0
        Should Be True    \${resultados_invalidos} >= 0
    END
    
    Log    Resultados finales - Válidos: \${resultados_validos}, Inválidos: \${resultados_invalidos}
    Should Be True    \${resultados_validos} + \${resultados_invalidos} == len(@{DATOS_ENTRADA})
    
Patron Procesamiento Lotes
    \${lote_actual}=    Set Variable    0
    \${elementos_procesados}=    Set Variable    0
    @{lote_temp}=    Create List
    
    FOR    \${numero}    IN    @{NUMEROS_PROC}
        Log    Agregando \${numero} al lote actual
        Should Be True    \${numero} >= -1
        Append To List    \${lote_temp}    \${numero}
        \${elementos_procesados}=    Evaluate    \${elementos_procesados} + 1
        
        # Patrón: Procesamiento por lotes
        \${tamaño_lote}=    Get Length    \${lote_temp}
        IF    \${tamaño_lote} >= \${CONFIG_SISTEMA.batch_size}
            \${lote_actual}=    Evaluate    \${lote_actual} + 1
            Log    Procesando lote \${lote_actual} con \${tamaño_lote} elementos
            
            # Procesar el lote
            FOR    \${item}    IN    @{lote_temp}
                IF    \${item} > 0
                    Log    Procesando item positivo: \${item}
                    Should Be True    \${item} > 0
                ELSE IF    \${item} == 0
                    Log    Item cero omitido: \${item}
                    Should Be Equal As Numbers    \${item}    0
                    CONTINUE
                ELSE
                    Log    Item negativo procesado especialmente: \${item}
                    Should Be True    \${item} < 0
                END
            END
            
            # Limpiar lote
            @{lote_temp}=    Create List
            Should Be Equal As Numbers    len(@{lote_temp})    0
        END
    END
    
    # Procesar lote final si tiene elementos
    \${tamaño_final}=    Get Length    \${lote_temp}
    IF    \${tamaño_final} > 0
        \${lote_actual}=    Evaluate    \${lote_actual} + 1
        Log    Procesando lote final \${lote_actual} con \${tamaño_final} elementos
        Should Be True    \${tamaño_final} > 0
    END
    
    Log    Total lotes procesados: \${lote_actual}, Elementos: \${elementos_procesados}
    Should Be True    \${lote_actual} > 0
    
Patron Retry Con Backoff
    FOR    \${servicio}    IN    web_api    database    file_system
        Log    Conectando a servicio: \${servicio}
        Should Not Be Empty    \${servicio}
        
        \${intentos}=    Set Variable    0
        \${conectado}=    Set Variable    False
        \${backoff_time}=    Set Variable    1
        
        # Patrón: Retry con backoff exponencial
        WHILE    \${intentos} < \${CONFIG_SISTEMA.retry_max} and not \${conectado}
            \${intentos}=    Evaluate    \${intentos} + 1
            Log    Intento \${intentos} para \${servicio}
            
            TRY
                # Simular conexión (falla en primeros intentos)
                IF    '\${servicio}' == 'web_api' and \${intentos} < 2
                    Fail    Servicio web_api no disponible
                ELSE IF    '\${servicio}' == 'database' and \${intentos} < 3
                    Fail    Database connection timeout
                ELSE
                    Log    Conexión exitosa a \${servicio}
                    Should Not Be Empty    \${servicio}
                    \${conectado}=    Set Variable    True
                END
                
            EXCEPT
                Log    Fallo en intento \${intentos} para \${servicio}
                Should Be True    \${intentos} <= \${CONFIG_SISTEMA.retry_max}
                
                IF    \${intentos} < \${CONFIG_SISTEMA.retry_max}
                    Log    Esperando \${backoff_time}s antes del siguiente intento
                    Sleep    \${backoff_time}s
                    # Backoff exponencial
                    \${backoff_time}=    Evaluate    \${backoff_time} * 2
                    Should Be True    \${backoff_time} <= 8
                END
            END
        END
        
        IF    \${conectado}
            Log    Servicio \${servicio} conectado en intento \${intentos}
            Should Be True    \${conectado}
        ELSE
            Log    Falló conexión a \${servicio} después de \${intentos} intentos
            Should Be True    \${intentos} >= \${CONFIG_SISTEMA.retry_max}
        END
    END
    
Patron Estado Machine
    \${estado_actual}=    Set Variable    inicio
    \${transiciones}=    Set Variable    0
    \${max_transiciones}=    Set Variable    10
    
    # Patrón: Máquina de estados simple
    WHILE    \${transiciones} < \${max_transiciones}
        \${transiciones}=    Evaluate    \${transiciones} + 1
        Log    Transición \${transiciones} - Estado actual: \${estado_actual}
        
        IF    '\${estado_actual}' == 'inicio'
            Log    Estado inicio - transicionando a validacion
            Should Be Equal    \${estado_actual}    inicio
            \${estado_actual}=    Set Variable    validacion
            
        ELSE IF    '\${estado_actual}' == 'validacion'
            Log    Estado validacion - verificando datos
            Should Be Equal    \${estado_actual}    validacion
            # Simular validación exitosa después de varias transiciones
            IF    \${transiciones} >= 3
                \${estado_actual}=    Set Variable    procesamiento
            ELSE
                Log    Validación pendiente, mantener estado
            END
            
        ELSE IF    '\${estado_actual}' == 'procesamiento'
            Log    Estado procesamiento - ejecutando lógica
            Should Be Equal    \${estado_actual}    procesamiento
            \${estado_actual}=    Set Variable    finalizacion
            
        ELSE IF    '\${estado_actual}' == 'finalizacion'
            Log    Estado finalizacion - completando proceso
            Should Be Equal    \${estado_actual}    finalizacion
            \${estado_actual}=    Set Variable    completado
            
        ELSE IF    '\${estado_actual}' == 'completado'
            Log    Proceso completado exitosamente
            Should Be Equal    \${estado_actual}    completado
            BREAK
            
        ELSE
            Log    Estado desconocido: \${estado_actual}
            Should Be True    \${False}
            BREAK
        END
        
        Should Be True    \${transiciones} <= \${max_transiciones}
    END
    
    Log    Máquina de estados finalizada en estado: \${estado_actual}
    Should Be Equal    \${estado_actual}    completado
    
Patron Pipeline Procesamiento
    @{pipeline_steps}=    Create List    input    validate    transform    filter    output
    &{datos_pipeline}=    Create Dictionary    items=0    errors=0    processed=0
    
    FOR    \${step}    IN    @{pipeline_steps}
        Log    Ejecutando paso del pipeline: \${step}
        Should Not Be Empty    \${step}
        
        TRY
            IF    '\${step}' == 'input'
                Log    Pipeline: Cargando datos de entrada
                \${datos_pipeline.items}=    Set Variable    10
                Should Be Equal As Numbers    \${datos_pipeline.items}    10
                
            ELSE IF    '\${step}' == 'validate'
                Log    Pipeline: Validando \${datos_pipeline.items} items
                # Simular algunos errores en validación
                \${datos_pipeline.errors}=    Set Variable    2
                \${datos_pipeline.items}=    Evaluate    \${datos_pipeline.items} - \${datos_pipeline.errors}
                Should Be True    \${datos_pipeline.items} > 0
                
            ELSE IF    '\${step}' == 'transform'
                Log    Pipeline: Transformando \${datos_pipeline.items} items
                Should Be True    \${datos_pipeline.items} > 0
                
            ELSE IF    '\${step}' == 'filter'
                Log    Pipeline: Filtrando items por criterios
                # Simular filtrado que reduce items
                \${datos_pipeline.items}=    Evaluate    \${datos_pipeline.items} - 1  
                Should Be True    \${datos_pipeline.items} >= 0
                
            ELSE IF    '\${step}' == 'output'
                Log    Pipeline: Generando salida final
                \${datos_pipeline.processed}=    Set Variable    \${datos_pipeline.items}
                Should Be Equal As Numbers    \${datos_pipeline.processed}    \${datos_pipeline.items}
            END
            
            Log    Paso \${step} completado - Items: \${datos_pipeline.items}, Errores: \${datos_pipeline.errors}
            
        EXCEPT
            Log    Error en paso del pipeline: \${step}
            \${datos_pipeline.errors}=    Evaluate    \${datos_pipeline.errors} + 1
            Should Be True    \${datos_pipeline.errors} > 0
        END
    END
    
    Log    Pipeline completado - Procesados: \${datos_pipeline.processed}, Total errores: \${datos_pipeline.errors}
    Should Be True    \${datos_pipeline.processed} > 0

*** Test Cases ***
Test Patrones Control Flujo
    Patron Validador Chain
    Patron Procesamiento Lotes
    Patron Retry Con Backoff
    Patron Estado Machine
    Patron Pipeline Procesamiento
    Log    Patrones comunes de control de flujo completados
        </code></pre>
        
        <h3>🎯 Práctica Patrones (4 min):</h3>
        <ol>
            <li>Define arrays y diccionarios con datos de prueba complejos</li>
            <li>Crea keyword "Patron Validador Chain" con validaciones en cadena</li>
            <li>Usa IF/ELSE IF encadenado para diferentes tipos de datos</li>
            <li>Implementa contadores para resultados válidos/inválidos</li>
            <li>Define keyword "Patron Procesamiento Lotes" con batch_size</li>
            <li>Agrupa elementos en lotes usando Get Length</li>
            <li>Procesa lotes completos y maneja lote final parcial</li>
            <li>Limpia lotes después de procesamiento</li>
            <li>Crea keyword "Patron Retry Con Backoff" para conexiones</li>
            <li>Implementa reintentos con Sleep y backoff exponencial</li>
            <li>Simula fallos de servicios con Fail en condiciones específicas</li>
            <li>Usa TRY/EXCEPT para manejar fallos de conexión</li>
            <li>Define keyword "Patron Estado Machine" con transiciones</li>
            <li>Implementa estados: inicio → validacion → procesamiento → completado</li>
            <li>Controla transiciones con IF/ELSE IF y contadores</li>
            <li>Usa BREAK cuando alcance estado final</li>
            <li>Crea keyword "Patron Pipeline Procesamiento" por etapas</li>
            <li>Implementa pipeline: input → validate → transform → filter → output</li>
            <li>Maneja errores en cada etapa con TRY/EXCEPT</li>
            <li>Usa diccionario para mantener estado entre etapas</li>
            <li>Ejecuta test case con todos los patrones implementados</li>
            <li>Verifica que cada patrón maneje casos exitosos y de error</li>
            <li>Confirma que contadores y estados se mantengan correctos</li>
            <li>Analiza reutilización de estos patrones en proyectos reales</li>
        </ol>
        
        <h3>🚀 Siguiente: Lección 065 - Debugging de lógica compleja</h3>
    `,
    topics: ["patterns", "common-practices", "templates"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-063"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_064 = LESSON_064;
}