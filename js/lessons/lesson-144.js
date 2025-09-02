/**
 * Robot Framework Academy - Lesson 144
 * Database Testing 144
 */

const LESSON_144 = {
    id: 144,
    title: "Database Testing 144",
    duration: "7 min",
    level: "intermediate",
    section: "section-10",
    content: `
        <h2>🗄️ Validación Integridad</h2>
        <p>Verificar que los datos en la base de datos mantienen consistencia y relaciones correctas.</p>
        
        <h3>💻 Tests validación:</h3>
        <pre><code class="robot">*** Settings ***
Library    DatabaseLibrary
Library    Collections

*** Variables ***
\${DB_HOST}        localhost
\${DB_NAME}        testdb
\${DB_USER}        testuser
\${DB_PASS}        testpass
\${CONNECTION}     psycopg2://\${DB_USER}:\${DB_PASS}@\${DB_HOST}/\${DB_NAME}

*** Test Cases ***
Validar Integridad Usuarios
    Connect To Database    \${CONNECTION}
    \${count}=    Row Count    SELECT * FROM users WHERE active=true
    Should Be True    \${count} > 0
    \${emails}=    Query    SELECT email FROM users
    List Should Not Contain Duplicates    \${emails}
    Execute Sql String    SELECT COUNT(*) FROM users WHERE email IS NULL
    Check If Not Exists In Database    SELECT * FROM users WHERE email IS NULL
    Disconnect From Database

Validar Relaciones FK
    Connect To Database    \${CONNECTION}
    \${orders}=    Query    SELECT user_id FROM orders
    FOR    \${user_id}    IN    @{orders}
        Check If Exists In Database    SELECT * FROM users WHERE id=\${user_id}[0]
    END
    \${orphans}=    Query    SELECT COUNT(*) FROM orders o LEFT JOIN users u ON o.user_id=u.id WHERE u.id IS NULL
    Should Be Equal As Numbers    \${orphans}[0][0]    0
    Disconnect From Database

Validar Constraints
    Connect To Database    \${CONNECTION}
    Execute Sql String    INSERT INTO products (name, price) VALUES ('Test', -10)
    Run Keyword And Expect Error    *constraint*    Execute Sql String    INSERT INTO users (email) VALUES (NULL)
    Check If Not Exists In Database    SELECT * FROM products WHERE price < 0
    \${result}=    Query    SELECT COUNT(*) FROM users WHERE LENGTH(email) < 5
    Should Be Equal As Numbers    \${result}[0][0]    0
    Disconnect From Database

Test Transacciones ACID
    Connect To Database    \${CONNECTION}
    Execute Sql String    BEGIN TRANSACTION
    \${balance_before}=    Query    SELECT balance FROM accounts WHERE id=1
    Execute Sql String    UPDATE accounts SET balance=balance-100 WHERE id=1
    Execute Sql String    UPDATE accounts SET balance=balance+100 WHERE id=2
    \${balance_after}=    Query    SELECT balance FROM accounts WHERE id=1
    Should Be Equal As Numbers    \${balance_after}[0][0]    \${balance_before}[0][0]-100
    Execute Sql String    COMMIT
    Disconnect From Database

Validar Datos Temporal
    Connect To Database    \${CONNECTION}
    \${recent}=    Query    SELECT COUNT(*) FROM logs WHERE created_at >= NOW() - INTERVAL '1 hour'
    Should Be True    \${recent}[0][0] >= 0
    Check If Not Exists In Database    SELECT * FROM users WHERE created_at > NOW()
    \${valid_dates}=    Query    SELECT COUNT(*) FROM orders WHERE order_date <= delivery_date
    \${total_orders}=    Query    SELECT COUNT(*) FROM orders
    Should Be Equal    \${valid_dates}[0][0]    \${total_orders}[0][0]
    Disconnect From Database</code></pre>
        
        <h3>🎯 Práctica DB (5 min):</h3>
        <p>1. Conecta a tu base de datos de pruebas</p>
        <p>2. Ejecuta SELECT COUNT(*) en tabla principal</p>
        <p>3. Verifica que no hay emails duplicados</p>
        <p>4. Valida que todas las FK apuntan a registros existentes</p>
        <p>5. Prueba insertar dato que viole constraint</p>
        <p>6. Verifica que transacción mantiene consistencia</p>
        <p>7. Checa que fechas created_at son válidas</p>
        <p>8. Valida rangos numéricos (precios > 0)</p>
        <p>9. Confirma que campos requeridos no son NULL</p>
        <p>10. Ejecuta query para detectar datos huérfanos</p>
        <p>11. Verifica índices únicos funcionan correctamente</p>
        <p>12. Prueba cascada en DELETE con FK</p>
        <p>13. Valida triggers de auditoría funcionan</p>
        <p>14. Checa performance de queries principales</p>
        <p>15. Confirma backup/restore mantiene integridad</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Validar integridad referencial en bases de datos</li>
                <li>Detectar violaciones de constraints automáticamente</li>
                <li>Verificar consistencia de transacciones ACID</li>
                <li>Implementar tests de calidad de datos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa LEFT JOIN para detectar datos huérfanos y ALWAYS valida constraints en datos críticos del negocio.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 145 - Database Testing 145</h3>
        <p>Aprenderás testing de performance en bases de datos y optimización de queries lentas.</p>
    `,
    topics: ["database", "sql", "nosql"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-143"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_144 = LESSON_144;
}