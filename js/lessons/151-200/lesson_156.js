/**
 * Robot Framework Academy - Lesson 156
 * Data-driven project
 */

const LESSON_156 = {
    id: 156,
    title: "Data-driven project",
    duration: "15 min",
    level: "intermediate",
    section: "section-11",
    content: `
        <h2>🏪 E-commerce Completo</h2>
        <p>Proyecto integrador que combina Excel, APIs, YAML, generación dinámica y validación masiva.</p>
        
        <h3>💻 Proyecto Integrador:</h3>
        <pre><code class="robot">*** Settings ***
Library    SeleniumLibrary
Library    RequestsLibrary
Library    DatabaseLibrary
Library    ExcelLibrary
Library    Collections
Library    DateTime
Library    OperatingSystem
Library    JSONLibrary
Library    yaml

*** Variables ***
\${PROJECT_CONFIG}    \${CURDIR}/ecommerce_config.yaml
\${USERS_EXCEL}       \${CURDIR}/test_users.xlsx
\${PRODUCTS_CSV}      \${CURDIR}/products_catalog.csv
\${API_BASE}          https://api.ecommerce-test.com
\${WEB_BASE}          https://shop.ecommerce-test.com
\${DB_CONNECTION}     mysql://user:pass@localhost:3306/ecommerce_test
\${RESULTS_DIR}       \${CURDIR}/results
\${TEST_SESSION}      \${EMPTY}
\${BROWSER}           chrome

*** Test Cases ***
Initialize Project Environment
    [Documentation]    Configura entorno completo del proyecto
    [Tags]             setup    configuration    project-init
    
    # Carga configuración YAML
    \${config_content}=   Get File    \${PROJECT_CONFIG}
    \${config}=          yaml.Safe Load    \${config_content}
    Set Global Variable   \${PROJECT_CONFIG_DATA}    \${config}
    
    # Genera session ID único
    \${timestamp}=        Get Current Date    result_format=%Y%m%d_%H%M%S
    \${session_id}=       Set Variable    ecommerce_test_\${timestamp}
    Set Global Variable   \${TEST_SESSION}    \${session_id}
    
    # Crea directorio resultados
    Create Directory      \${RESULTS_DIR}/\${session_id}
    Set Global Variable   \${SESSION_RESULTS}    \${RESULTS_DIR}/\${session_id}
    
    # Valida archivos de datos
    File Should Exist     \${USERS_EXCEL}
    File Should Exist     \${PRODUCTS_CSV}
    File Should Exist     \${PROJECT_CONFIG}
    
    # Inicializa conexiones
    Create Session        ecommerce_api    \${API_BASE}
    Connect To Database   pymysql    ecommerce_test    testuser    testpass    localhost    3306
    
    Log    ✓ Proyecto inicializado: \${session_id}

Load Test Data From Multiple Sources
    [Documentation]    Carga datos desde Excel, CSV y genera dinámicos
    [Tags]             data-loading    excel    csv    dynamic
    
    # Carga usuarios desde Excel
    Open Excel Document   \${USERS_EXCEL}    doc_id=users
    \${user_rows}=        Get Row Count    Sheet1
    \${test_users}=       Create List
    
    FOR    \${row}    IN RANGE    2    \${user_rows + 1}
        \${username}=     Read Excel Cell    \${row}    1    Sheet1
        \${email}=        Read Excel Cell    \${row}    2    Sheet1
        \${password}=     Read Excel Cell    \${row}    3    Sheet1
        \${role}=         Read Excel Cell    \${row}    4    Sheet1
        
        \${user_data}=     Create Dictionary
        ...    username=\${username}
        ...    email=\${email}
        ...    password=\${password}
        ...    role=\${role}
        ...    source=excel
        
        Append To List     \${test_users}    \${user_data}
    END
    
    Close Excel Document  doc_id=users
    
    # Carga productos desde CSV
    \${csv_content}=      Get File    \${PRODUCTS_CSV}
    \${csv_lines}=        Split To Lines    \${csv_content}
    Remove From List      \${csv_lines}    0    # Remove header
    \${test_products}=    Create List
    
    FOR    \${line}    IN    @{csv_lines}
        \${fields}=        Split String    \${line}    ,
        \${product_data}=  Create Dictionary
        ...    product_id=\${fields[0]}
        ...    name=\${fields[1]}
        ...    price=\${fields[2]}
        ...    category=\${fields[3]}
        ...    stock=\${fields[4]}
        ...    source=csv
        
        Append To List     \${test_products}    \${product_data}
    END
    
    # Genera órdenes dinámicas
    \${generated_orders}= Create List
    FOR    \${order_num}    IN RANGE    1    21
        \${user}=          Evaluate    random.choice(\${test_users})    modules=random
        \${product}=       Evaluate    random.choice(\${test_products})    modules=random
        \${quantity}=      Evaluate    random.randint(1, 5)    modules=random
        \${total}=         Evaluate    float(\${product}[price]) * \${quantity}
        
        \${order_data}=    Create Dictionary
        ...    order_id=ORD_\${TEST_SESSION}_\${order_num}
        ...    user_id=\${user}[username]
        ...    product_id=\${product}[product_id]
        ...    quantity=\${quantity}
        ...    total_amount=\${total}
        ...    source=dynamic
        
        Append To List     \${generated_orders}    \${order_data}
    END
    
    Set Global Variable   \${PROJECT_USERS}      \${test_users}
    Set Global Variable   \${PROJECT_PRODUCTS}   \${test_products}
    Set Global Variable   \${PROJECT_ORDERS}     \${generated_orders}
    
    Log    ✓ Datos cargados: \${len(\${test_users})} usuarios, \${len(\${test_products})} productos, \${len(\${generated_orders})} órdenes

API Data Creation and Validation
    [Documentation]    Crea datos via API y valida responses
    [Tags]             api    creation    validation    rest
    
    # Crea usuarios via API
    FOR    \${user}    IN    @{PROJECT_USERS}
        \${payload}=       Create Dictionary
        ...    username=\${user}[username]
        ...    email=\${user}[email]
        ...    password=\${user}[password]
        ...    role=\${user}[role]
        ...    session_id=\${TEST_SESSION}
        
        \${response}=      POST On Session    ecommerce_api    /users
        ...    json=\${payload}    expected_status=201
        
        \${user_id}=       Get From Dictionary    \${response.json()}    user_id
        Set To Dictionary  \${user}    api_user_id    \${user_id}
        
        # Validación response structure
        Should Contain     \${response.json()}    user_id
        Should Contain     \${response.json()}    username
        Should Contain     \${response.json()}    created_at
        
        Log    ✓ Usuario API creado: \${user}[username] (ID: \${user_id})
    END
    
    # Crea productos via API
    FOR    \${product}    IN    @{PROJECT_PRODUCTS}
        \${payload}=       Create Dictionary
        ...    name=\${product}[name]
        ...    price=\${product}[price]
        ...    category=\${product}[category]
        ...    stock=\${product}[stock]
        ...    session_id=\${TEST_SESSION}
        
        \${response}=      POST On Session    ecommerce_api    /products
        ...    json=\${payload}    expected_status=201
        
        \${api_product_id}= Get From Dictionary    \${response.json()}    product_id
        Set To Dictionary  \${product}    api_product_id    \${api_product_id}
        
        # Validación pricing
        \${api_price}=     Get From Dictionary    \${response.json()}    price
        Should Be Equal As Numbers    \${api_price}    \${product}[price]
        
        Log    ✓ Producto API creado: \${product}[name] (ID: \${api_product_id})
    END
    
    Log    ✓ Creación API completada

Database Consistency Validation
    [Documentation]    Valida consistencia de datos en database
    [Tags]             database    consistency    sql    validation
    
    # Valida usuarios creados
    \${db_users}=        Query    SELECT COUNT(*) FROM users WHERE session_id = '\${TEST_SESSION}'
    \${expected_users}=  Get Length    \${PROJECT_USERS}
    Should Be Equal As Numbers    \${db_users[0][0]}    \${expected_users}
    
    # Valida productos creados
    \${db_products}=     Query    SELECT COUNT(*) FROM products WHERE session_id = '\${TEST_SESSION}'
    \${expected_products}= Get Length    \${PROJECT_PRODUCTS}
    Should Be Equal As Numbers    \${db_products[0][0]}    \${expected_products}
    
    # Valida integridad datos usuarios
    FOR    \${user}    IN    @{PROJECT_USERS}
        \${user_query}=   Set Variable
        ...    SELECT username, email, role FROM users WHERE username = '\${user}[username]' AND session_id = '\${TEST_SESSION}'
        
        \${db_user}=      Query    \${user_query}
        Should Be Equal   \${db_user[0][0]}    \${user}[username]
        Should Be Equal   \${db_user[0][1]}    \${user}[email]
        Should Be Equal   \${db_user[0][2]}    \${user}[role]
        
        Log    ✓ Usuario DB validado: \${user}[username]
    END
    
    # Valida cálculos agregados
    \${total_stock}=     Query    SELECT SUM(stock) FROM products WHERE session_id = '\${TEST_SESSION}'
    Should Be True       \${total_stock[0][0]} > 0    Total stock debe ser positivo
    
    \${avg_price}=       Query    SELECT AVG(price) FROM products WHERE session_id = '\${TEST_SESSION}'
    Should Be True       \${avg_price[0][0]} > 0     Precio promedio debe ser positivo
    
    Log    ✓ Validación database completada

End-to-End Web Testing
    [Documentation]    Testing web completo con datos del proyecto
    [Tags]             web    e2e    selenium    integration
    
    Open Browser         \${WEB_BASE}    \${BROWSER}
    Set Window Size      1920    1080
    
    FOR    \${user}    IN    @{PROJECT_USERS[:3]}    # Test primeros 3 usuarios
        # Login process
        Go To               \${WEB_BASE}/login
        Input Text          id=username    \${user}[username]
        Input Password      id=password    \${user}[password]
        Click Button        id=login-btn
        
        Wait Until Page Contains    Welcome \${user}[username]
        Location Should Contain     /dashboard
        
        # Product browsing
        Click Link          Products
        Wait Until Page Contains Element    css=.product-grid
        
        FOR    \${product}    IN    @{PROJECT_PRODUCTS[:2]}    # Test 2 productos
            \${product_link}=  Set Variable    link=\${product}[name]
            Click Link         \${product_link}
            
            Wait Until Page Contains    \${product}[name]
            Page Should Contain        $\${product}[price]
            Page Should Contain        \${product}[category]
            
            # Add to cart
            Click Button       id=add-to-cart
            Wait Until Page Contains    Added to cart
            
            # Verify cart counter
            \${cart_count}=    Get Text    id=cart-counter
            Should Be True     int('\${cart_count}') > 0
            
            Go Back
            Wait Until Page Contains Element    css=.product-grid
            
            Log    ✓ Producto agregado: \${product}[name]
        END
        
        # Checkout process
        Click Link          Cart
        Wait Until Page Contains Element    css=.cart-items
        Click Button        id=checkout-btn
        
        Wait Until Page Contains    Order Summary
        Click Button        id=confirm-order
        
        Wait Until Page Contains    Order confirmed
        \${order_number}=   Get Text    css=.order-number
        Should Match Regexp \${order_number}    ^ORD-\\d+$
        
        # Logout
        Click Link          Logout
        Wait Until Page Contains Element    id=username
        
        Take Screenshot     \${SESSION_RESULTS}/user_\${user}[username]_complete.png
        
        Log    ✓ E2E completo: \${user}[username] - Order: \${order_number}
    END
    
    Close Browser
    Log    ✓ Testing web E2E completado

Performance and Load Testing
    [Documentation]    Tests de performance con datos masivos
    [Tags]             performance    load    stress    metrics
    
    \${start_time}=      Get Time    epoch
    
    # Test API performance con múltiples requests
    FOR    \${batch}    IN RANGE    5
        FOR    \${user}    IN    @{PROJECT_USERS}
            \${response}=   GET On Session    ecommerce_api    /users/\${user}[api_user_id]
            ...    expected_status=200
            
            Status Should Be    200    \${response}
            \${response_time}= Evaluate    \${response.elapsed.total_seconds()}
            Should Be True     \${response_time} < 2.0    Response time < 2s
        END
        
        Log    ✓ Batch \${batch + 1}: API performance OK
    END
    
    # Test database performance
    FOR    \${query_batch}    IN RANGE    3
        \${complex_query}=  Set Variable
        ...    SELECT u.username, COUNT(o.order_id) as order_count, SUM(o.total_amount) as total_spent
        ...    FROM users u LEFT JOIN orders o ON u.user_id = o.user_id 
        ...    WHERE u.session_id = '\${TEST_SESSION}' GROUP BY u.username
        
        \${query_start}=   Get Time    epoch
        \${results}=       Query    \${complex_query}
        \${query_end}=     Get Time    epoch
        \${query_time}=    Evaluate    \${query_end} - \${query_start}
        
        Should Be True     \${query_time} < 5.0    Query time < 5s
        Should Not Be Empty \${results}    Query debe retornar resultados
        
        Log    ✓ Query batch \${query_batch + 1}: \${query_time}s
    END
    
    \${end_time}=        Get Time    epoch
    \${total_duration}=  Evaluate    \${end_time} - \${start_time}
    
    Log    ✓ Performance testing: \${total_duration}s total

Project Cleanup and Reporting
    [Documentation]    Limpieza y reporte final del proyecto
    [Tags]             cleanup    reporting    teardown
    
    # Genera reporte final
    \${report_data}=     Create Dictionary
    ...    session_id=\${TEST_SESSION}
    ...    users_count=\${len(\${PROJECT_USERS})}
    ...    products_count=\${len(\${PROJECT_PRODUCTS})}
    ...    orders_count=\${len(\${PROJECT_ORDERS})}
    ...    test_completed=\${TRUE}
    ...    timestamp=\${datetime.now().isoformat()}
    
    \${report_json}=     Convert To JSON    \${report_data}
    Create File          \${SESSION_RESULTS}/project_report.json    \${report_json}
    
    # Cleanup database
    Execute Sql String   DELETE FROM orders WHERE session_id = '\${TEST_SESSION}'
    Execute Sql String   DELETE FROM products WHERE session_id = '\${TEST_SESSION}'
    Execute Sql String   DELETE FROM users WHERE session_id = '\${TEST_SESSION}'
    
    # Cleanup API (si soporta)
    FOR    \${user}    IN    @{PROJECT_USERS}
        TRY
            DELETE On Session    ecommerce_api    /users/\${user}[api_user_id]
        EXCEPT
            Log    Usuario API ya eliminado: \${user}[username]
        END
    END
    
    Disconnect From Database
    
    Log    ✓ Proyecto completado: \${TEST_SESSION}
    Log    ✓ Reporte guardado en: \${SESSION_RESULTS}/project_report.json</code></pre>
        
        <h3>🎯 Proyecto Completo (12 min):</h3>
        <p>1. Crea ecommerce_config.yaml con configuración de ambientes y parámetros</p>
        <p>2. Prepara test_users.xlsx con 10 usuarios (username, email, password, role)</p>
        <p>3. Crea products_catalog.csv con 15 productos (id, name, price, category, stock)</p>
        <p>4. Configura base de datos MySQL con tablas users, products, orders</p>
        <p>5. Ejecuta "Initialize Project Environment" y verifica configuración</p>
        <p>6. Corre "Load Test Data From Multiple Sources" y valida carga correcta</p>
        <p>7. Prueba "API Data Creation and Validation" con endpoint mock</p>
        <p>8. Ejecuta "Database Consistency Validation" y revisa integridad</p>
        <p>9. Configura aplicación web demo para "End-to-End Web Testing"</p>
        <p>10. Monitorea performance durante "Performance and Load Testing"</p>
        <p>11. Revisa reporte final generado en "Project Cleanup and Reporting"</p>
        <p>12. Documenta lecciones aprendidas y optimizaciones identificadas</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar todas las técnicas de data-driven testing en proyecto real</li>
                <li>Combinar Excel, CSV, YAML, generación dinámica y validación</li>
                <li>Implementar testing completo: API + Database + Web + Performance</li>
                <li>Gestionar lifecycle completo de datos de prueba enterprise</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Este proyecto integra todo lo aprendido en data-driven testing. Úsalo como template para proyectos reales enterprise.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 157 - Mobile Testing introduction</h3>
        <p>Con data-driven testing dominado, comenzarás Mobile Testing con Appium para automatizar aplicaciones Android e iOS.</p>
    `,
    topics: ["data-driven", "project"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 15,
    difficulty: "easy",
    prerequisites: ["lesson-155"],
    type: "integration"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_156 = LESSON_156;
}