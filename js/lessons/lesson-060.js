const LESSON_060 = {
    id: 60,
    title: "WHILE loops",
    duration: "5 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>⏳ WHILE Loops</h2>
        
        <h3>💻 WHILE Loops:</h3>
        <pre><code class="robot">
*** Variables ***
\${CONTADOR_WHILE}    0
\${MAX_INTENTOS}      5
\${SUMA_TOTAL}        0

*** Keywords ***
WHILE Loop Basico
    \${contador}=    Set Variable    0
    WHILE    \${contador} < 5
        Log    Iteración WHILE: \${contador}
        Should Be True    \${contador} < 5
        \${contador}=    Evaluate    \${contador} + 1
        Should Be True    \${contador} <= 5
        Log    Contador incrementado a: \${contador}
    END
    Should Be Equal As Numbers    \${contador}    5
    Log    WHILE loop completado con \${contador} iteraciones
    
WHILE Con Condicion Compleja
    \${intentos}=    Set Variable    0
    \${exito}=    Set Variable    False
    WHILE    \${intentos} < \${MAX_INTENTOS} and not \${exito}
        \${intentos}=    Evaluate    \${intentos} + 1
        Log    Intento número: \${intentos}
        Should Be True    \${intentos} <= \${MAX_INTENTOS}
        # Simular condición de éxito aleatoria
        IF    \${intentos} == 3
            \${exito}=    Set Variable    True
            Log    Éxito alcanzado en intento \${intentos}
            Should Be Equal    \${exito}    True
        ELSE
            Log    Intento \${intentos} fallido, continuando...
            Should Be Equal    \${exito}    False
        END
    END
    Should Be True    \${exito} or \${intentos} >= \${MAX_INTENTOS}
    Log    WHILE terminado: éxito=\${exito}, intentos=\${intentos}
    
WHILE Acumulador
    \${numero}=    Set Variable    1
    \${suma}=    Set Variable    0
    WHILE    \${numero} <= 10
        \${suma}=    Evaluate    \${suma} + \${numero}
        Log    Sumando \${numero}, total actual: \${suma}
        Should Be True    \${suma} >= \${numero}
        \${numero}=    Evaluate    \${numero} + 1
        Should Be True    \${numero} <= 11
    END
    Should Be Equal As Numbers    \${suma}    55
    Log    Suma de 1 a 10: \${suma}
    
WHILE Con Validacion Web
    \${intentos_carga}=    Set Variable    0
    \${pagina_cargada}=    Set Variable    False
    WHILE    \${intentos_carga} < 3 and not \${pagina_cargada}
        \${intentos_carga}=    Evaluate    \${intentos_carga} + 1
        Log    Intento de carga \${intentos_carga}
        Should Be True    \${intentos_carga} <= 3
        # Simular verificación de carga de página
        Sleep    1s
        IF    \${intentos_carga} >= 2
            \${pagina_cargada}=    Set Variable    True
            Log    Página cargada exitosamente
            Should Be Equal    \${pagina_cargada}    True
        ELSE
            Log    Página aún no cargada, reintentando...
            Should Be Equal    \${pagina_cargada}    False
        END
    END
    Should Be True    \${pagina_cargada}
    
WHILE Con Break Simulado
    \${contador_break}=    Set Variable    0
    \${encontrado}=    Set Variable    False
    WHILE    \${contador_break} < 10
        \${contador_break}=    Evaluate    \${contador_break} + 1
        Log    Buscando elemento, iteración: \${contador_break}
        Should Be True    \${contador_break} <= 10
        # Simular encontrar elemento en iteración 4
        IF    \${contador_break} == 4
            \${encontrado}=    Set Variable    True
            Log    Elemento encontrado en iteración \${contador_break}
            Should Be Equal    \${encontrado}    True
            # Salir del loop cambiando la condición
            \${contador_break}=    Set Variable    10
        END
    END
    Should Be Equal    \${encontrado}    True
    Log    WHILE con break simulado completado

*** Keywords ***
WHILE Contador Descendente
    \${counter}=    Set Variable    10
    WHILE    \${counter} > 0
        Log    Contador descendente: \${counter}
        Should Be True    \${counter} > 0
        \${counter}=    Evaluate    \${counter} - 1
        Should Be True    \${counter} >= 0
        IF    \${counter} == 5
            Log    Punto medio alcanzado
            Should Be Equal As Numbers    \${counter}    5
        END
    END
    Should Be Equal As Numbers    \${counter}    0
    
WHILE Busqueda Elemento
    @{elementos}=    Create List    item1    item2    target    item4
    \${found}=    Set Variable    False
    \${index}=    Set Variable    0
    WHILE    \${index} < len(@{elementos}) and not \${found}
        \${elemento}=    Get From List    \${elementos}    \${index}
        Log    Buscando en posición \${index}: \${elemento}
        Should Not Be Empty    \${elemento}
        IF    '\${elemento}' == 'target'
            \${found}=    Set Variable    True
            Log    Elemento encontrado en posición \${index}
            Should Be Equal    \${found}    True
        END
        \${index}=    Evaluate    \${index} + 1
        Should Be True    \${index} <= len(@{elementos})
    END
    Should Be True    \${found}

*** Test Cases ***
Test WHILE Loops
    WHILE Loop Basico
    WHILE Con Condicion Compleja
    WHILE Acumulador
    WHILE Con Validacion Web
    WHILE Con Break Simulado
    WHILE Contador Descendente
    WHILE Busqueda Elemento
    Log    Todos los WHILE loops ejecutados correctamente
        </code></pre>
        
        <h3>🎯 Práctica WHILE (8 min):</h3>
        <ol>
            <li>Define variables contador para control WHILE</li>
            <li>Crea WHILE loop básico con condición numérica</li>
            <li>Usa Evaluate para incrementar contador</li>
            <li>Implementa WHILE con condición compleja (and, or)</li>
            <li>Agrega variable booleana para control adicional</li>
            <li>Crea WHILE acumulador sumando números 1-10</li>
            <li>Verifica suma total al final del loop</li>
            <li>Implementa WHILE simulando carga de página web</li>
            <li>Usa Sleep para simular tiempo de espera</li>
            <li>Crea WHILE con "break" simulado modificando condición</li>
            <li>Cambia variable de control para salir prematuramente</li>
            <li>Ejecuta test verificando todos los tipos WHILE</li>
            <li>Confirma que condiciones dinámicas funcionen</li>
            <li>Verifica que loops terminen correctamente</li>
            <li>Analiza diferencias entre FOR y WHILE</li>
            <li>Crea WHILE contador descendente desde 10 a 0</li>
            <li>Implementa WHILE buscando elemento específico</li>
            <li>Agrega WHILE con timeout de 30 segundos máximo</li>
            <li>Usa WHILE para procesar cola de elementos</li>
            <li>Crea WHILE validando estado de sistema</li>
            <li>Implementa WHILE con múltiples condiciones de salida</li>
            <li>Combina WHILE con estructuras IF complejas</li>
            <li>Valida que todas las condiciones WHILE funcionen</li>
            <li>Ejecuta keyword "WHILE Contador Descendente" desde 10 a 0</li>
            <li>Verifica que contador decremente correctamente en cada iteración</li>
            <li>Implementa punto medio check en contador descendente</li>
            <li>Ejecuta keyword "WHILE Busqueda Elemento" en lista</li>
            <li>Busca elemento "target" en lista de 4 elementos</li>
            <li>Valida que búsqueda termine cuando encuentra elemento</li>
            <li>Confirma que índice se incremente correctamente</li>
            <li>Verifica que found flag cambie a True al encontrar</li>
            <li>Ejecuta test completo con todos los WHILE keywords</li>
            <li>Valida que cada tipo de WHILE procese elementos correctamente</li>
            <li>Crea WHILE adicional con timeout de 60 segundos</li>
            <li>Implementa WHILE procesando cola con elementos dinámicos</li>
            <li>Agrega WHILE con múltiples condiciones de salida complejas</li>
            <li>Usa WHILE para validar estado de sistema en tiempo real</li>
            <li>Combina WHILE con estructuras IF/ELSE IF anidadas</li>
            <li>Implementa WHILE que procese hasta encontrar 3 elementos</li>
            <li>Crea WHILE con acumulador que sume hasta 1000</li>
            <li>Valida que todas las condiciones dinámicas funcionen correctamente</li>
            <li>Confirma que cada WHILE termine en condición esperada</li>
            <li>Verifica que contadores y flags cambien estados correctamente</li>
            <li>Ejecuta test final validando todos los WHILE implementados</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear WHILE loops con condiciones dinámicas</li>
                <li>Usar condiciones complejas con múltiples variables</li>
                <li>Implementar acumuladores y contadores</li>
                <li>Simular escenarios web con WHILE</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>WHILE es perfecto cuando no sabes cuántas iteraciones necesitas - la condición determina cuándo parar dinámicamente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 061 - Control de loops: BREAK y CONTINUE</h3>
    `,
    topics: ["while", "conditional-loops", "dynamic"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-059"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_060 = LESSON_060;
}