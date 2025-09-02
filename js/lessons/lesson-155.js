/**
 * Robot Framework Academy - Lesson 155
 * Data-Driven 155
 */

const LESSON_155 = {
    id: 155,
    title: "Data-Driven 155",
    duration: "7 min",
    level: "intermediate",
    section: "section-11",
    content: `
        <h2>🔍 Validación Avanzada</h2>
        <p>Assertions complejas y estrategias de validación para testing enterprise crítico.</p>
        
        <h3>💻 Tests Validación:</h3>
        <pre><code class="robot">*** Settings ***
Library    Collections
Library    DateTime
Library    JSONLibrary
Library    RequestsLibrary
Library    SeleniumLibrary
Library    DatabaseLibrary
Library    OperatingSystem

*** Variables ***
\${VALIDATION_DATA}   \${CURDIR}/validation_dataset.json
\${API_BASE}          https://api.validation-test.com
\${DB_CONNECTION}     mysql://user:pass@localhost:3306/validation_db
\${BROWSER}           chrome
\${APP_URL}           https://validation-app.com
\${TOLERANCE}         0.01
\${MAX_VARIANCE}      5
\${EXPECTED_SCHEMA}   \${CURDIR}/expected_schema.json

*** Test Cases ***
Complex Data Validation
    [Documentation]    Validaciones complejas multi-nivel
    [Tags]             validation    complex    assertions
    
    \${test_data}=       Get File    \${VALIDATION_DATA}
    \${data_json}=       Convert String To JSON    \${test_data}
    
    \${users}=          Get From Dictionary    \${data_json}    users
    \${products}=       Get From Dictionary    \${data_json}    products
    \${orders}=         Get From Dictionary    \${data_json}    orders
    
    # Validación estructural
    Should Be True      len(\${users}) >= 10      Mínimo 10 usuarios
    Should Be True      len(\${products}) >= 5    Mínimo 5 productos
    Should Be True      len(\${orders}) >= 20     Mínimo 20 órdenes
    
    FOR    \${user}    IN    @{users}
        Should Contain        \${user}    user_id
        Should Contain        \${user}    email
        Should Contain        \${user}    registration_date
        
        # Validación formato email
        Should Match Regexp   \${user}[email]    ^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$
        
        # Validación fecha registro
        \${reg_date}=         Convert Date    \${user}[registration_date]    result_format=%Y-%m-%d
        \${today}=           Get Current Date    result_format=%Y-%m-%d
        Should Be True        '\${reg_date}' <= '\${today}'    Fecha registro válida
        
        Log    ✓ Usuario \${user}[user_id] validado
    END

Cross-Reference Data Integrity
    [Documentation]    Validación de integridad referencial
    [Tags]             integrity    cross-reference    relational
    
    \${data_json}=       Load JSON From File    \${VALIDATION_DATA}
    \${users}=          Get From Dictionary    \${data_json}    users
    \${orders}=         Get From Dictionary    \${data_json}    orders
    \${products}=       Get From Dictionary    \${data_json}    products
    
    # Crear índices para búsqueda eficiente
    \${user_ids}=        Create List
    \${product_ids}=     Create List
    
    FOR    \${user}    IN    @{users}
        Append To List      \${user_ids}    \${user}[user_id]
    END
    
    FOR    \${product}    IN    @{products}
        Append To List      \${product_ids}    \${product}[product_id]
    END
    
    # Validar referencias en órdenes
    FOR    \${order}    IN    @{orders}
        \${user_id}=        Get From Dictionary    \${order}    user_id
        \${product_id}=     Get From Dictionary    \${order}    product_id
        \${quantity}=       Get From Dictionary    \${order}    quantity
        \${total_amount}=   Get From Dictionary    \${order}    total_amount
        
        # Validar referencia usuario existe
        Should Contain      \${user_ids}    \${user_id}    Usuario \${user_id} debe existir
        
        # Validar referencia producto existe
        Should Contain      \${product_ids}    \${product_id}    Producto \${product_id} debe existir
        
        # Validar lógica de negocio
        Should Be True      \${quantity} > 0        Cantidad debe ser positiva
        Should Be True      \${total_amount} > 0    Total debe ser positivo
        
        # Validar cálculo precio (buscar precio producto)
        FOR    \${product}    IN    @{products}
            Run Keyword If    \${product}[product_id] == \${product_id}
            ...              Validate Order Calculation    \${order}    \${product}
        END
        
        Log    ✓ Orden \${order}[order_id]: integridad OK
    END

Statistical Data Validation
    [Documentation]    Validación estadística de datasets
    [Tags]             statistics    metrics    analysis
    
    \${orders}=         Get From Dictionary    \${data_json}    orders
    \${amounts}=        Create List
    \${quantities}=     Create List
    
    FOR    \${order}    IN    @{orders}
        Append To List      \${amounts}      \${order}[total_amount]
        Append To List      \${quantities}   \${order}[quantity]
    END
    
    # Cálculos estadísticos
    \${total_revenue}=   Evaluate    sum(\${amounts})
    \${avg_order}=      Evaluate    sum(\${amounts}) / len(\${amounts})
    \${max_order}=      Evaluate    max(\${amounts})
    \${min_order}=      Evaluate    min(\${amounts})
    \${total_items}=    Evaluate    sum(\${quantities})
    
    # Validaciones de rango de negocio
    Should Be True      \${avg_order} >= 10.0     Orden promedio mínima $10
    Should Be True      \${avg_order} <= 1000.0   Orden promedio máxima $1000
    Should Be True      \${max_order} <= 5000.0   Orden máxima $5000
    Should Be True      \${min_order} >= 1.0      Orden mínima $1
    
    # Validación distribución
    \${orders_count}=   Get Length    \${orders}
    \${avg_quantity}=   Evaluate    \${total_items} / \${orders_count}
    Should Be True      \${avg_quantity} >= 1.0   Cantidad promedio >= 1
    Should Be True      \${avg_quantity} <= 10.0  Cantidad promedio <= 10
    
    Log    ✓ Estadísticas: Revenue=\${total_revenue}, Avg=\${avg_order}, Items=\${total_items}

API Response Schema Validation
    [Documentation]    Validación de schemas API complejos
    [Tags]             api    schema    json-validation
    
    Create Session      validation_api    \${API_BASE}
    
    \${schema_content}=  Get File    \${EXPECTED_SCHEMA}
    \${expected_schema}= Convert String To JSON    \${schema_content}
    
    # Test múltiples endpoints con validación schema
    \${endpoints}=      Create List
    ...    /api/users
    ...    /api/products
    ...    /api/orders
    ...    /api/analytics
    
    FOR    \${endpoint}    IN    @{endpoints}
        \${response}=       GET On Session    validation_api    \${endpoint}
        Status Should Be    200    \${response}
        
        \${response_json}=  Set Variable    \${response.json()}
        
        # Validar estructura básica
        Should Contain      \${response_json}    data
        Should Contain      \${response_json}    meta
        Should Contain      \${response_json}    status
        
        \${data}=          Get From Dictionary    \${response_json}    data
        \${meta}=          Get From Dictionary    \${response_json}    meta
        
        # Validar metadata
        Should Contain      \${meta}    timestamp
        Should Contain      \${meta}    version
        Should Contain      \${meta}    total_count
        
        \${timestamp}=      Get From Dictionary    \${meta}    timestamp
        \${version}=       Get From Dictionary    \${meta}    version
        \${total_count}=   Get From Dictionary    \${meta}    total_count
        
        # Validar formatos
        Should Match Regexp \${timestamp}    ^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}
        Should Match Regexp \${version}      ^v\\d+\\.\\d+\\.\\d+$
        Should Be True      \${total_count} >= 0
        
        # Validar datos no vacíos
        Should Not Be Empty \${data}    Data no debe estar vacía
        
        # Validar primer elemento estructura
        \${first_item}=     Get From List    \${data}    0
        Should Contain Keys \${first_item}   \${expected_schema}[\${endpoint.split('/')[-1]}]
        
        Log    ✓ Endpoint \${endpoint}: schema válido, \${total_count} registros
    END

Database Consistency Validation
    [Documentation]    Validación consistencia datos database
    [Tags]             database    consistency    sql
    
    Connect To Database    pymysql    validation_db    testuser    testpass    localhost    3306
    
    # Validaciones de integridad referencial
    \${orphan_orders}=   Query
    ...    SELECT COUNT(*) FROM orders o LEFT JOIN users u ON o.user_id = u.user_id WHERE u.user_id IS NULL
    Should Be Equal As Numbers    \${orphan_orders[0][0]}    0    No deben existir órdenes huérfanas
    
    \${orphan_order_items}= Query
    ...    SELECT COUNT(*) FROM order_items oi LEFT JOIN products p ON oi.product_id = p.product_id WHERE p.product_id IS NULL
    Should Be Equal As Numbers    \${orphan_order_items[0][0]}    0    No deben existir items huérfanos
    
    # Validaciones de lógica de negocio
    \${negative_amounts}= Query    SELECT COUNT(*) FROM orders WHERE total_amount <= 0
    Should Be Equal As Numbers    \${negative_amounts[0][0]}    0    No amounts negativos
    
    \${invalid_quantities}= Query    SELECT COUNT(*) FROM order_items WHERE quantity <= 0
    Should Be Equal As Numbers    \${invalid_quantities[0][0]}    0    No cantidades inválidas
    
    # Validaciones agregadas
    \${total_orders}=    Query    SELECT COUNT(*) FROM orders
    \${total_users}=     Query    SELECT COUNT(*) FROM users
    \${total_products}=  Query    SELECT COUNT(*) FROM products
    
    Should Be True      \${total_orders[0][0]} > 0     Debe haber órdenes
    Should Be True      \${total_users[0][0]} > 0      Debe haber usuarios
    Should Be True      \${total_products[0][0]} > 0   Debe haber productos
    
    # Validación cálculos derivados
    \${calculated_totals}= Query
    ...    SELECT o.order_id, o.total_amount, SUM(oi.quantity * p.price) as calculated_total
    ...    FROM orders o 
    ...    JOIN order_items oi ON o.order_id = oi.order_id
    ...    JOIN products p ON oi.product_id = p.product_id
    ...    GROUP BY o.order_id, o.total_amount
    
    FOR    \${row}    IN    @{calculated_totals}
        \${order_id}=       Set Variable    \${row[0]}
        \${stored_total}=   Set Variable    \${row[1]}
        \${calculated}=     Set Variable    \${row[2]}
        \${difference}=     Evaluate    abs(\${stored_total} - \${calculated})
        
        Should Be True      \${difference} <= \${TOLERANCE}    Order \${order_id} calculation mismatch
        Log    ✓ Orden \${order_id}: cálculo consistente
    END
    
    Disconnect From Database
    Log    ✓ Validación database completada</code></pre>
        
        <h3>🎯 Práctica Validación (5 min):</h3>
        <p>1. Crea validation_dataset.json con datos de usuarios, productos y órdenes</p>
        <p>2. Incluye datos válidos y algunos edge cases para testing</p>
        <p>3. Ejecuta "Complex Data Validation" y verifica todas las assertions</p>
        <p>4. Crea expected_schema.json con estructura esperada de API responses</p>
        <p>5. Configura base de datos de prueba con relaciones referenciales</p>
        <p>6. Prueba "Cross-Reference Data Integrity" con datos inconsistentes</p>
        <p>7. Modifica "Statistical Data Validation" para tus métricas de negocio</p>
        <p>8. Implementa validación de campos obligatorios vs opcionales</p>
        <p>9. Agrega validación de rangos de fechas y timestamps</p>
        <p>10. Crea test que valide consistencia entre múltiples fuentes de datos</p>
        <p>11. Implementa tolerance configurable para validaciones numéricas</p>
        <p>12. Practica debugging de assertions que fallan en datasets grandes</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar validaciones complejas multi-nivel y cross-reference</li>
                <li>Aplicar análisis estadístico para detectar anomalías en datos</li>
                <li>Validar schemas JSON y consistencia API responses</li>
                <li>Verificar integridad referencial en bases de datos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa tolerance configurable en validaciones numéricas y implementa logging detallado para debugging de assertions fallidas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 156 - Data-driven project</h3>
        <p>Aplicarás todas las técnicas de data-driven testing en un proyecto integrador que combina Excel, APIs, validación y performance.</p>
    `,
    topics: ["data-driven", "excel", "csv"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-154"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_155 = LESSON_155;
}