/**
 * Robot Framework Academy - Lesson 145
 * Database Testing 145
 */

const LESSON_145 = {
    id: 145,
    title: "Database Testing 145",
    duration: "7 min",
    level: "intermediate",
    section: "section-10",
    content: `
        <h2>⚡ Performance DB</h2>
        <p>Optimizar queries lentas y medir tiempos de respuesta en bases de datos.</p>
        
        <h3>💻 Tests performance:</h3>
        <pre><code class="robot">*** Settings ***
Library    DatabaseLibrary
Library    DateTime
Library    Collections

*** Variables ***
\${DB_CONNECTION}     psycopg2://testuser:testpass@localhost/perfdb
\${SLOW_THRESHOLD}    2.0
\${MAX_RECORDS}       1000
\${INDEX_TABLE}       users_indexed
\${NO_INDEX_TABLE}    users_no_index

*** Test Cases ***
Medir Tiempo Query Simple
    Connect To Database    \${DB_CONNECTION}
    \${start_time}=    Get Current Date
    \${result}=    Query    SELECT COUNT(*) FROM users
    \${end_time}=    Get Current Date
    \${duration}=    Subtract Date From Date    \${end_time}    \${start_time}
    Should Be True    \${duration} < \${SLOW_THRESHOLD}
    Log    Query duration: \${duration} seconds
    Should Be True    \${result}[0][0] > 0
    Disconnect From Database

Test Query Con Index vs Sin Index
    Connect To Database    \${DB_CONNECTION}
    \${start_indexed}=    Get Current Date
    Query    SELECT * FROM \${INDEX_TABLE} WHERE email LIKE '%test%'
    \${end_indexed}=    Get Current Date
    \${indexed_time}=    Subtract Date From Date    \${end_indexed}    \${start_indexed}
    
    \${start_no_index}=    Get Current Date
    Query    SELECT * FROM \${NO_INDEX_TABLE} WHERE email LIKE '%test%'
    \${end_no_index}=    Get Current Date
    \${no_index_time}=    Subtract Date From Date    \${end_no_index}    \${start_no_index}
    
    Should Be True    \${indexed_time} < \${no_index_time}
    Log    Indexed: \${indexed_time}s, No Index: \${no_index_time}s
    Disconnect From Database

Validar Queries Complejas
    Connect To Database    \${DB_CONNECTION}
    \${start}=    Get Current Date
    \${orders}=    Query    SELECT u.name, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id=o.user_id GROUP BY u.name HAVING COUNT(o.id) > 5
    \${end}=    Get Current Date
    \${duration}=    Subtract Date From Date    \${end}    \${start}
    Should Be True    \${duration} < 5.0
    Should Be True    len(\${orders}) >= 0
    Disconnect From Database

Test Carga Masiva Datos
    Connect To Database    \${DB_CONNECTION}
    \${start}=    Get Current Date
    FOR    \${i}    IN RANGE    1    101
        Execute Sql String    INSERT INTO test_bulk (name, email) VALUES ('User\${i}', 'user\${i}@test.com')
    END
    \${end}=    Get Current Date
    \${bulk_time}=    Subtract Date From Date    \${end}    \${start}
    Should Be True    \${bulk_time} < 10.0
    \${count}=    Row Count    SELECT * FROM test_bulk
    Should Be True    \${count} >= 100
    Execute Sql String    DELETE FROM test_bulk
    Disconnect From Database

Monitorear Locks y Deadlocks
    Connect To Database    \${DB_CONNECTION}
    \${locks}=    Query    SELECT COUNT(*) FROM pg_locks WHERE granted=false
    Should Be Equal As Numbers    \${locks}[0][0]    0
    \${active_queries}=    Query    SELECT COUNT(*) FROM pg_stat_activity WHERE state='active' AND query NOT LIKE '%pg_stat_activity%'
    Log    Active queries: \${active_queries}[0][0]
    Should Be True    \${active_queries}[0][0] < 50
    Disconnect From Database

Test Memory Usage
    Connect To Database    \${DB_CONNECTION}
    \${cache_hit}=    Query    SELECT round(sum(blks_hit)*100/sum(blks_hit+blks_read), 2) FROM pg_stat_database WHERE datname='\${DB_NAME}'
    Should Be True    \${cache_hit}[0][0] > 90.0
    \${connections}=    Query    SELECT COUNT(*) FROM pg_stat_activity
    Should Be True    \${connections}[0][0] < 100
    Disconnect From Database</code></pre>
        
        <h3>🎯 Práctica Performance (5 min):</h3>
        <p>1. Ejecuta EXPLAIN ANALYZE en query principal</p>
        <p>2. Mide tiempo de SELECT con 10,000+ registros</p>
        <p>3. Compara performance con y sin índices</p>
        <p>4. Inserta 1000 registros y mide duración</p>
        <p>5. Identifica queries que tardan >2 segundos</p>
        <p>6. Verifica que cache hit ratio >90%</p>
        <p>7. Monitorea conexiones activas concurrentes</p>
        <p>8. Detecta locks bloqueantes en tablas</p>
        <p>9. Ejecuta JOIN complejo y valida tiempo</p>
        <p>10. Prueba UPDATE masivo con WHERE</p>
        <p>11. Mide DELETE de múltiples registros</p>
        <p>12. Verifica estadísticas de tabla actualizadas</p>
        <p>13. Analiza plan de ejecución costoso</p>
        <p>14. Confirma que índices están siendo usados</p>
        <p>15. Valida que memory usage está controlado</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Medir y optimizar performance de queries</li>
                <li>Comparar eficiencia con y sin índices</li>
                <li>Detectar cuellos de botella en base de datos</li>
                <li>Monitorear recursos y conexiones activas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa EXPLAIN ANALYZE para identificar queries lentas y SIEMPRE mide cache hit ratio >90% para performance óptima.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 146 - Database testing project</h3>
        <p>Crearás un proyecto integrador que combine validación de datos, performance testing y automatización completa de DB.</p>
    `,
    topics: ["database", "sql", "nosql"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-144"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_145 = LESSON_145;
}