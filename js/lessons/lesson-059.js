const LESSON_059 = {
    id: 59,
    title: "FOR con diccionarios",
    duration: "5 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>🗃️ FOR Dictionaries</h2>
        <p>Itera diccionarios y estructuras key-value para procesar datos complejos.</p>
        
        <h3>💻 FOR Diccionarios:</h3>
        <pre><code class="robot">
*** Variables ***
&{USUARIO_INFO}      nombre=Juan    edad=30    email=juan@test.com    activo=True
&{CONFIGURACION}     timeout=10    browser=chrome    headless=False    maximize=True
&{PRODUCTOS_STOCK}   laptop=15    mouse=50    teclado=25    monitor=8

*** Keywords ***
FOR Claves Diccionario
    FOR    \${clave}    IN    @{USUARIO_INFO.keys()}
        \${valor}=    Get From Dictionary    \${USUARIO_INFO}    \${clave}
        Log    Clave: \${clave} - Valor: \${valor}
        Should Not Be Empty    \${clave}
        Should Not Be Empty    \${valor}
        IF    '\${clave}' == 'nombre'
            Should Be Equal    \${valor}    Juan
            Log    Nombre usuario validado: \${valor}
        ELSE IF    '\${clave}' == 'edad'
            Should Be True    \${valor} > 0
            Log    Edad usuario: \${valor} años
        ELSE IF    '\${clave}' == 'email'
            Should Contain    \${valor}    @
            Log    Email válido: \${valor}
        END
    END
    Should Be True    \${True}
    
FOR Valores Diccionario
    FOR    \${valor}    IN    @{CONFIGURACION.values()}
        Log    Procesando valor de configuración: \${valor}
        Should Not Be Empty    \${valor}
        IF    '\${valor}' == '10'
            Log    Timeout configurado: \${valor} segundos
            Should Be Equal    \${valor}    10
        ELSE IF    '\${valor}' == 'chrome'
            Log    Navegador: \${valor}
            Should Be Equal    \${valor}    chrome
        ELSE IF    '\${valor}' == 'False'
            Log    Modo headless: \${valor}
            Should Be Equal    \${valor}    False
        END
    END
    Should Be True    \${True}
    
FOR Items Diccionario Completo
    FOR    \${clave}    \${valor}    IN    @{PRODUCTOS_STOCK.items()}
        Log    Producto: \${clave} - Stock: \${valor} unidades
        Should Not Be Empty    \${clave}
        Should Be True    \${valor} >= 0
        IF    \${valor} < 10
            Log    ALERTA: Stock bajo para \${clave}
            Should Be True    \${valor} < 10
        ELSE IF    \${valor} >= 10 and \${valor} < 30
            Log    Stock normal para \${clave}
            Should Be True    \${valor} >= 10
        ELSE
            Log    Stock alto para \${clave}
            Should Be True    \${valor} >= 30
        END
    END
    Should Be True    \${True}
    
FOR Diccionarios Anidados
    &{servidor_config}=    Create Dictionary    host=localhost    port=8080    ssl=True
    &{database_config}=    Create Dictionary    host=dbserver    port=5432    name=testdb
    &{configs}=    Create Dictionary    servidor=\${servidor_config}    database=\${database_config}
    
    FOR    \${sistema}    \${config}    IN    @{configs.items()}
        Log    Configurando sistema: \${sistema}
        Should Not Be Empty    \${sistema}
        FOR    \${param}    \${valor}    IN    @{config.items()}
            Log    \${sistema}.\${param} = \${valor}
            Should Not Be Empty    \${param}
            Should Not Be Empty    \${valor}
        END
    END
    Should Be True    \${True}
    
FOR Filtrado Diccionarios
    FOR    \${producto}    \${stock}    IN    @{PRODUCTOS_STOCK.items()}
        IF    \${stock} > 20
            Log    Producto con stock suficiente: \${producto} (\${stock})
            Should Be True    \${stock} > 20
            # Simular acción para productos con stock alto
            Set Variable    \${disponible}    True
            Should Be Equal    \${disponible}    True
        ELSE
            Log    Producto con stock limitado: \${producto} (\${stock})
            Should Be True    \${stock} <= 20
            Set Variable    \${disponible}    False
        END
    END
    Should Be True    \${True}

*** Test Cases ***
Test FOR Diccionarios
    FOR Claves Diccionario
    FOR Valores Diccionario
    FOR Items Diccionario Completo
    FOR Diccionarios Anidados
    FOR Filtrado Diccionarios
    Log    FOR con diccionarios ejecutados correctamente
        </code></pre>
        
        <h3>🎯 Práctica Diccionarios (4 min):</h3>
        <ol>
            <li>Define diccionarios con datos de usuario</li>
            <li>Crea FOR iterando solo claves con .keys()</li>
            <li>Usa Get From Dictionary para obtener valores</li>
            <li>Implementa lógica condicional según clave</li>
            <li>Crea FOR iterando solo valores con .values()</li>
            <li>Valida cada valor según tipo esperado</li>
            <li>Implementa FOR con .items() para clave-valor</li>
            <li>Usa dos variables en FOR para capturar ambos</li>
            <li>Crea diccionarios anidados con Create Dictionary</li>
            <li>Implementa FOR anidados para estructura multinivel</li>
            <li>Agrega filtrado condicional dentro del FOR</li>
            <li>Usa IF para procesar solo ciertos elementos</li>
            <li>Ejecuta test verificando todos los tipos</li>
            <li>Confirma que iteración de diccionarios funcione</li>
            <li>Analiza ventajas de estructuras key-value</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Iterar claves, valores e items de diccionarios</li>
                <li>Procesar diccionarios anidados con FOR múltiples</li>
                <li>Implementar filtrado condicional en iteración</li>
                <li>Manejar estructuras de datos complejas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los diccionarios son perfectos para datos estructurados - usa .keys(), .values() o .items() según lo que necesites procesar.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 060 - WHILE loops</h3>
        <p>Aprenderemos loops WHILE para iteración basada en condiciones dinámicas.</p>
    `,
    topics: ["dictionaries", "key-value", "iteration"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-058"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_059 = LESSON_059;
}