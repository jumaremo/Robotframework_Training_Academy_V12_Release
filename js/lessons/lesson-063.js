const LESSON_063 = {
    id: 63,
    title: "Combinando estructuras de control",
    duration: "5 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>🔗 Combined Structures</h2>
        
        <h3>💻 Estructuras Combinadas:</h3>
        <pre><code class="robot">
*** Variables ***
@{USUARIOS_DATA}     admin    user1    guest    user2    moderator
@{EDADES_DATA}       30    25    18    35    28
@{PERMISOS_DATA}     high    medium    low    medium    high
@{PRODUCTOS_INV}     laptop    mouse    tablet    teclado    monitor    webcam

*** Keywords ***
Procesamiento Complejo Usuarios
    FOR    \${i}    IN RANGE    len(\${USUARIOS_DATA})
        \${usuario}=    Get From List    \${USUARIOS_DATA}    \${i}
        \${edad}=    Get From List    \${EDADES_DATA}    \${i}
        \${permiso}=    Get From List    \${PERMISOS_DATA}    \${i}
        
        Log    Procesando usuario: \${usuario}
        Should Not Be Empty    \${usuario}
        
        # Combinación IF + TRY/EXCEPT
        IF    '\${usuario}' == 'admin'
            Log    Usuario administrador detectado
            Should Be Equal    \${usuario}    admin
            TRY
                \${nivel_acceso}=    Set Variable    100
                Should Be Equal As Numbers    \${nivel_acceso}    100
            EXCEPT
                Log    Error asignando nivel admin
                \${nivel_acceso}=    Set Variable    50
            END
        ELSE IF    '\${permiso}' == 'high'
            Log    Usuario con permisos altos: \${usuario}
            Should Be Equal    \${permiso}    high
            \${nivel_acceso}=    Set Variable    80
        ELSE
            Log    Usuario estándar: \${usuario}
            \${nivel_acceso}=    Set Variable    30
        END
        
        # Combinación WHILE + IF dentro del FOR
        \${validaciones}=    Set Variable    0
        WHILE    \${validaciones} < 3
            \${validaciones}=    Evaluate    \${validaciones} + 1
            IF    \${edad} >= 18
                Log    Validación \${validaciones}: Edad válida (\${edad})
                Should Be True    \${edad} >= 18
            ELSE
                Log    Validación \${validaciones}: Edad inválida (\${edad})
                Should Be True    \${edad} < 18
                BREAK
            END
        END
        
        Should Be True    \${nivel_acceso} > 0
    END
    Should Be True    \${True}
    
Inventario Con Control Avanzado
    \${productos_procesados}=    Set Variable    0
    \${errores_encontrados}=    Set Variable    0
    
    FOR    \${producto}    IN    @{PRODUCTOS_INV}
        Log    Evaluando producto: \${producto}
        Should Not Be Empty    \${producto}
        
        # TRY/EXCEPT con lógica compleja
        TRY
            # Simular verificación de stock
            IF    '\${producto}' in ['laptop', 'tablet', 'monitor']
                \${stock}=    Evaluate    random.randint(5, 20)    modules=random
                Should Be True    \${stock} > 0
                Log    Producto \${producto} con stock: \${stock}
                
                # FOR anidado para verificar características
                FOR    \${caracteristica}    IN    calidad    precio    disponibilidad
                    IF    '\${caracteristica}' == 'precio' and '\${producto}' == 'laptop'
                        Log    Verificando precio premium para \${producto}
                        Should Contain    \${producto}    laptop
                        CONTINUE
                    END
                    Log    Verificando \${caracteristica} de \${producto}
                    Should Not Be Empty    \${caracteristica}
                END
                
                \${productos_procesados}=    Evaluate    \${productos_procesados} + 1
            ELSE
                Log    Producto \${producto} categoría básica
                Should Not Contain    \${producto}    laptop
                \${productos_procesados}=    Evaluate    \${productos_procesados} + 1
            END
            
        EXCEPT
            Log    Error procesando producto: \${producto}
            \${errores_encontrados}=    Evaluate    \${errores_encontrados} + 1
            Should Be True    \${errores_encontrados} > 0
            CONTINUE
            
        FINALLY
            Log    Finalizando procesamiento de \${producto}
            Should Not Be Empty    \${producto}
        END
        
        # Control de flujo basado en resultados
        IF    \${productos_procesados} >= 5
            Log    Límite de procesamiento alcanzado
            Should Be True    \${productos_procesados} >= 5
            BREAK
        END
    END
    
    Log    Productos procesados: \${productos_procesados}, Errores: \${errores_encontrados}
    Should Be True    \${productos_procesados} > 0
    
Sistema Validacion Multinivel
    &{config}=    Create Dictionary    max_intentos=3    timeout=10    debug=True
    
    FOR    \${sistema}    IN    web    api    database
        Log    Validando sistema: \${sistema}
        Should Not Be Empty    \${sistema}
        
        \${intentos}=    Set Variable    0
        \${sistema_ok}=    Set Variable    False
        
        # WHILE con TRY/EXCEPT y múltiples IF
        WHILE    \${intentos} < \${config.max_intentos} and not \${sistema_ok}
            \${intentos}=    Evaluate    \${intentos} + 1
            Log    Intento \${intentos} para sistema \${sistema}
            
            TRY
                IF    '\${sistema}' == 'web'
                    # Simular validación web
                    FOR    \${check}    IN    conexion    elementos    funcionalidad
                        Log    Verificando \${check} en sistema web
                        Should Not Be Empty    \${check}
                        IF    '\${check}' == 'elementos' and \${intentos} == 1
                            Fail    Simulando fallo en elementos
                        END
                    END
                    \${sistema_ok}=    Set Variable    True
                    
                ELSE IF    '\${sistema}' == 'api'
                    Log    Validando endpoints de API
                    Should Be Equal    \${sistema}    api
                    \${sistema_ok}=    Set Variable    True
                    
                ELSE
                    Log    Validando conexión database
                    Should Be Equal    \${sistema}    database
                    \${sistema_ok}=    Set Variable    True
                END
                
            EXCEPT
                Log    Error en intento \${intentos} para \${sistema}
                Should Be True    \${intentos} <= \${config.max_intentos}
                IF    \${intentos} >= \${config.max_intentos}
                    Log    Máximo intentos alcanzado para \${sistema}
                    BREAK
                END
                Sleep    1s
            END
        END
        
        Should Be True    \${sistema_ok} or \${intentos} >= \${config.max_intentos}
    END
    Should Be True    \${True}

*** Test Cases ***
Test Estructuras Combinadas
    Procesamiento Complejo Usuarios
    Inventario Con Control Avanzado
    Sistema Validacion Multinivel
    Log    Estructuras de control combinadas completadas
        </code></pre>
        
        <h3>🎯 Práctica Combinada (4 min):</h3>
        <ol>
            <li>Define múltiples listas sincronizadas para datos complejos</li>
            <li>Crea keyword "Procesamiento Complejo Usuarios" con FOR principal</li>
            <li>Combina Get From List para sincronizar múltiples arrays</li>
            <li>Usa IF/ELSE IF anidado con TRY/EXCEPT dentro</li>
            <li>Implementa WHILE dentro del FOR para validaciones múltiples</li>
            <li>Aplica BREAK en WHILE basado en condiciones específicas</li>
            <li>Define keyword "Inventario Con Control Avanzado" complejo</li>
            <li>Combina TRY/EXCEPT con FOR anidado para características</li>
            <li>Usa CONTINUE para saltar productos con errores</li>
            <li>Implementa FINALLY para limpieza garantizada</li>
            <li>Aplica BREAK cuando límite de procesamiento se alcance</li>
            <li>Crea keyword "Sistema Validacion Multinivel" avanzado</li>
            <li>Usa diccionario para configuración del sistema</li>
            <li>Combina WHILE con TRY/EXCEPT y múltiples IF</li>
            <li>Implementa FOR anidado dentro de TRY para verificaciones</li>
            <li>Simula fallos con Fail en condiciones específicas</li>
            <li>Maneja reintentos con Sleep entre intentos</li>
            <li>Controla flujo con variables booleanas y contadores</li>
            <li>Ejecuta test case con todas las estructuras combinadas</li>
            <li>Verifica que FOR, WHILE, IF, TRY trabajen juntos</li>
            <li>Confirma que BREAK y CONTINUE funcionen en contextos anidados</li>
            <li>Valida que manejo de errores no interrumpa flujo principal</li>
            <li>Observa cómo estructuras complejas procesan datos reales</li>
            <li>Analiza ventajas de combinar múltiples estructuras de control</li>
        </ol>
        
        <h3>🚀 Siguiente: Lección 064 - Patrones comunes de control de flujo</h3>
    `,
    topics: ["combination", "nesting", "complex"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-062"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_063 = LESSON_063;
}