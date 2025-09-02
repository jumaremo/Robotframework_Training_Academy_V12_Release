/**
 * Robot Framework Academy - Lesson 146
 * Database testing project
 */

const LESSON_146 = {
    id: 146,
    title: "Database testing project",
    duration: "15 min",
    level: "intermediate",
    section: "section-10",
    content: `
        <h2>🏗️ Proyecto E-commerce DB</h2>
        <p>Sistema completo de testing para base de datos e-commerce con validación, performance y monitoreo.</p>
        
        <h3>💻 Suite completa:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    🎯 PROYECTO INTEGRADOR DATABASE TESTING
Library          DatabaseLibrary
Library          DateTime
Library          Collections
Library          OperatingSystem

*** Variables ***
\${DB_HOST}           localhost
\${DB_NAME}           ecommerce_test
\${DB_USER}           testuser
\${DB_PASS}           testpass
\${CONNECTION}        psycopg2://\${DB_USER}:\${DB_PASS}@\${DB_HOST}/\${DB_NAME}
\${PERFORMANCE_LOG}   \${CURDIR}/performance_results.txt
\${MAX_QUERY_TIME}    3.0
\${MIN_CACHE_HIT}     90.0

*** Test Cases ***
Setup Database Environment
    [Documentation]    Preparar ambiente de testing completo
    Connect To Database    \${CONNECTION}
    Execute Sql String    CREATE TABLE IF NOT EXISTS test_users (id SERIAL PRIMARY KEY, email VARCHAR(100) UNIQUE, created_at TIMESTAMP DEFAULT NOW())
    Execute Sql String    CREATE TABLE IF NOT EXISTS test_products (id SERIAL PRIMARY KEY, name VARCHAR(100), price DECIMAL(10,2) CHECK (price > 0))
    Execute Sql String    CREATE TABLE IF NOT EXISTS test_orders (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES test_users(id), total DECIMAL(10,2))
    Execute Sql String    CREATE INDEX IF NOT EXISTS idx_users_email ON test_users(email)
    Execute Sql String    CREATE INDEX IF NOT EXISTS idx_orders_user ON test_orders(user_id)
    Disconnect From Database

Test Data Integrity Complete
    [Documentation]    Validación completa integridad referencial
    Connect To Database    \${CONNECTION}
    
    # Insertar datos de prueba
    Execute Sql String    INSERT INTO test_users (email) VALUES ('user1@test.com'), ('user2@test.com'), ('user3@test.com')
    Execute Sql String    INSERT INTO test_products (name, price) VALUES ('Laptop', 999.99), ('Mouse', 29.99), ('Keyboard', 79.99)
    Execute Sql String    INSERT INTO test_orders (user_id, total) VALUES (1, 1029.98), (2, 29.99), (1, 79.99)
    
    # Validar integridad
    \${user_count}=    Row Count    SELECT * FROM test_users
    Should Be Equal As Numbers    \${user_count}    3
    \${orphan_orders}=    Query    SELECT COUNT(*) FROM test_orders o LEFT JOIN test_users u ON o.user_id=u.id WHERE u.id IS NULL
    Should Be Equal As Numbers    \${orphan_orders}[0][0]    0
    
    # Validar constraints
    Run Keyword And Expect Error    *    Execute Sql String    INSERT INTO test_users (email) VALUES ('user1@test.com')
    Run Keyword And Expect Error    *    Execute Sql String    INSERT INTO test_products (name, price) VALUES ('Invalid', -10)
    
    Disconnect From Database

Test Performance Benchmark
    [Documentation]    Benchmark completo de performance
    Connect To Database    \${CONNECTION}
    Create File    \${PERFORMANCE_LOG}    Performance Test Results\n
    
    # Test query simple
    \${start}=    Get Current Date
    \${simple_result}=    Query    SELECT COUNT(*) FROM test_users
    \${end}=    Get Current Date
    \${simple_time}=    Subtract Date From Date    \${end}    \${start}
    Should Be True    \${simple_time} < \${MAX_QUERY_TIME}
    Append To File    \${PERFORMANCE_LOG}    Simple Query: \${simple_time}s\n
    
    # Test query compleja con JOIN
    \${start}=    Get Current Date
    \${join_result}=    Query    SELECT u.email, COUNT(o.id) as order_count, SUM(o.total) as total_spent FROM test_users u LEFT JOIN test_orders o ON u.id=o.user_id GROUP BY u.email
    \${end}=    Get Current Date
    \${join_time}=    Subtract Date From Date    \${end}    \${start}
    Should Be True    \${join_time} < \${MAX_QUERY_TIME}
    Append To File    \${PERFORMANCE_LOG}    Complex JOIN: \${join_time}s\n
    
    # Test carga masiva
    \${start}=    Get Current Date
    FOR    \${i}    IN RANGE    1    51
        Execute Sql String    INSERT INTO test_products (name, price) VALUES ('Product\${i}', \${i}.99)
    END
    \${end}=    Get Current Date
    \${bulk_time}=    Subtract Date From Date    \${end}    \${start}
    Should Be True    \${bulk_time} < 5.0
    Append To File    \${PERFORMANCE_LOG}    Bulk Insert 50 records: \${bulk_time}s\n
    
    Disconnect From Database

Test Database Health Monitor
    [Documentation]    Monitoreo completo de salud de BD
    Connect To Database    \${CONNECTION}
    
    # Verificar cache hit ratio
    \${cache_stats}=    Query    SELECT round(sum(blks_hit)*100/sum(blks_hit+blks_read), 2) as hit_ratio FROM pg_stat_database WHERE datname='\${DB_NAME}'
    Should Be True    \${cache_stats}[0][0] > \${MIN_CACHE_HIT}
    Log    Cache hit ratio: \${cache_stats}[0][0]%
    
    # Verificar conexiones activas
    \${connections}=    Query    SELECT COUNT(*) FROM pg_stat_activity WHERE datname='\${DB_NAME}'
    Should Be True    \${connections}[0][0] < 20
    Log    Active connections: \${connections}[0][0]
    
    # Verificar locks
    \${locks}=    Query    SELECT COUNT(*) FROM pg_locks WHERE granted=false
    Should Be Equal As Numbers    \${locks}[0][0]    0
    
    # Verificar tamaño de tablas
    \${table_sizes}=    Query    SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size FROM pg_tables WHERE schemaname='public'
    Log    Table sizes: \${table_sizes}
    
    Disconnect From Database

Test Data Quality Validation
    [Documentation]    Validación completa calidad de datos
    Connect To Database    \${CONNECTION}
    
    # Validar emails únicos y formato
    \${duplicate_emails}=    Query    SELECT email, COUNT(*) FROM test_users GROUP BY email HAVING COUNT(*) > 1
    Should Be Empty    \${duplicate_emails}
    \${invalid_emails}=    Query    SELECT COUNT(*) FROM test_users WHERE email NOT LIKE '%@%.%'
    Should Be Equal As Numbers    \${invalid_emails}[0][0]    0
    
    # Validar rangos de precios
    \${invalid_prices}=    Query    SELECT COUNT(*) FROM test_products WHERE price <= 0 OR price > 10000
    Should Be Equal As Numbers    \${invalid_prices}[0][0]    0
    
    # Validar fechas futuras
    \${future_dates}=    Query    SELECT COUNT(*) FROM test_users WHERE created_at > NOW()
    Should Be Equal As Numbers    \${future_dates}[0][0]    0
    
    # Validar consistencia ordenes
    \${negative_totals}=    Query    SELECT COUNT(*) FROM test_orders WHERE total < 0
    Should Be Equal As Numbers    \${negative_totals}[0][0]    0
    
    Disconnect From Database

Cleanup Test Environment
    [Documentation]    Limpieza completa del ambiente
    Connect To Database    \${CONNECTION}
    Execute Sql String    DROP TABLE IF EXISTS test_orders CASCADE
    Execute Sql String    DROP TABLE IF EXISTS test_products CASCADE  
    Execute Sql String    DROP TABLE IF EXISTS test_users CASCADE
    \${cleanup_check}=    Query    SELECT COUNT(*) FROM information_schema.tables WHERE table_name LIKE 'test_%'
    Should Be Equal As Numbers    \${cleanup_check}[0][0]    0
    Disconnect From Database
    Log    🎉 Database testing project completed successfully!</code></pre>
        
        <h3>🎯 Proyecto Database (12 min):</h3>
        <p>1. Configura base de datos e-commerce completa</p>
        <p>2. Crea tablas users, products, orders con relaciones</p>
        <p>3. Implementa constraints y índices optimizados</p>
        <p>4. Inserta datasets de prueba representativos</p>
        <p>5. Ejecuta suite completa de validación integridad</p>
        <p>6. Mide performance de queries críticas</p>
        <p>7. Monitorea cache hit ratio y conexiones</p>
        <p>8. Valida que constraints funcionan correctamente</p>
        <p>9. Detecta datos duplicados o inconsistentes</p>
        <p>10. Prueba carga masiva con 50+ registros</p>
        <p>11. Verifica tamaños de tablas y espacio usado</p>
        <p>12. Analiza estadísticas de uso de índices</p>
        <p>13. Confirma que backup/restore mantiene datos</p>
        <p>14. Genera reporte completo de performance</p>
        <p>15. Ejecuta cleanup automático del ambiente</p>
        <p>16. Valida que limpieza fue exitosa</p>
        <p>17. Documenta métricas obtenidas para futuro</p>
        <p>18. Implementa alertas para thresholds críticos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar todas las técnicas de database testing</li>
                <li>Crear suite automatizada para e-commerce DB</li>
                <li>Implementar monitoreo de performance continuo</li>
                <li>Establecer pipeline completo de validación</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Este proyecto integra TODO: integridad + performance + monitoreo. Úsalo como template para proyectos reales.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 147 - Data-Driven Testing concepts</h3>
        <p>Comenzarás la nueva sección de Data-Driven Testing para automatizar pruebas con múltiples datasets desde Excel y CSV.</p>
    `,
    topics: ["database", "project"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 15,
    difficulty: "easy",
    prerequisites: ["lesson-145"],
    type: "integration"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_146 = LESSON_146;
}