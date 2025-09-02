/**
 * Robot Framework Academy - Lesson 136
 * Database Testing 136
 */

const LESSON_136 = {
    id: 136,
    title: "Database Testing 136",
    duration: "7 min",
    level: "intermediate",
    section: "section-10",
    content: `
        <h2>🔗 SQL Queries Avanzadas</h2>
        <p>Queries SQL complejas, JOINs, subqueries y stored procedures para testing enterprise database scenarios.</p>
        
        <h3>💻 Advanced SQL:</h3>
        <pre><code class="robot">*** Settings ***
Library    DatabaseLibrary
Library    Collections
Library    String
Library    DateTime

*** Variables ***
\${DB_HOST}         localhost
\${DB_NAME}         testdb
\${DB_USER}         testuser
\${DB_PASSWORD}     testpass
\${DB_PORT}         3306
\${USERS_TABLE}     users
\${ORDERS_TABLE}    orders
\${PRODUCTS_TABLE}  products
\${JOIN_RESULTS}    \${EMPTY}
\${SUBQUERY_COUNT}  0
\${PROCEDURE_NAME}  GetUserOrderStats

*** Test Cases ***
INNER JOIN Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${inner_join_query}=    Set Variable    SELECT u.name, u.email, o.order_date, o.total FROM \${USERS_TABLE} u INNER JOIN \${ORDERS_TABLE} o ON u.id = o.user_id WHERE o.total > 100
    \${join_results}=        Query    \${inner_join_query}
    Should Not Be Empty      \${join_results}
    \${result_count}=        Get Length    \${join_results}
    Should Be True           \${result_count} > 0
    Set Suite Variable       \${JOIN_RESULTS}    \${join_results}
    \${first_result}=        Get From List    \${join_results}    0
    Should Not Be Empty      \${first_result[0]}
    Should Not Be Empty      \${first_result[1]}
    Should Contain           \${first_result[1]}    @
    Log    INNER JOIN executed: \${result_count} records
    Disconnect From Database

LEFT JOIN Validation
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${left_join_query}=     Set Variable    SELECT u.name, COUNT(o.id) as order_count FROM \${USERS_TABLE} u LEFT JOIN \${ORDERS_TABLE} o ON u.id = o.user_id GROUP BY u.id, u.name
    \${left_results}=        Query    \${left_join_query}
    Should Not Be Empty      \${left_results}
    \${users_with_orders}=   Set Variable    0
    \${users_without_orders}=    Set Variable    0
    FOR    \${record}    IN    @{left_results}
        IF    \${record[1]} > 0
            \${users_with_orders}=    Evaluate    \${users_with_orders} + 1
        ELSE
            \${users_without_orders}=    Evaluate    \${users_without_orders} + 1
        END
    END
    Should Be True           \${users_with_orders} >= 0
    Should Be True           \${users_without_orders} >= 0
    \${total_users}=         Evaluate    \${users_with_orders} + \${users_without_orders}
    Should Be True           \${total_users} > 0
    Log    LEFT JOIN: \${users_with_orders} with orders, \${users_without_orders} without
    Disconnect From Database

Complex Subquery Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${subquery}=            Set Variable    SELECT name, email FROM \${USERS_TABLE} WHERE id IN (SELECT user_id FROM \${ORDERS_TABLE} WHERE total > (SELECT AVG(total) FROM \${ORDERS_TABLE}))
    \${subquery_results}=    Query    \${subquery}
    Should Not Be Empty      \${subquery_results}
    \${subquery_count}=      Get Length    \${subquery_results}
    Set Suite Variable       \${SUBQUERY_COUNT}    \${subquery_count}
    Should Be True           \${subquery_count} > 0
    \${avg_total_query}=     Query    SELECT AVG(total) as avg_total FROM \${ORDERS_TABLE}
    Should Not Be Empty      \${avg_total_query}
    \${avg_total}=           Get From List    \${avg_total_query}    0
    Should Be True           \${avg_total[0]} > 0
    Log    Subquery found \${subquery_count} users above average (\${avg_total[0]})
    Disconnect From Database

Aggregate Functions Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${aggregate_query}=     Set Variable    SELECT COUNT(*) as total_orders, SUM(total) as revenue, AVG(total) as avg_order, MAX(total) as max_order, MIN(total) as min_order FROM \${ORDERS_TABLE}
    \${aggregate_results}=   Query    \${aggregate_query}
    Should Not Be Empty      \${aggregate_results}
    \${stats}=               Get From List    \${aggregate_results}    0
    Should Be True           \${stats[0]} > 0
    Should Be True           \${stats[1]} > 0
    Should Be True           \${stats[2]} > 0
    Should Be True           \${stats[3]} >= \${stats[4]}
    \${monthly_stats}=       Query    SELECT YEAR(order_date) as year, MONTH(order_date) as month, COUNT(*) as orders, SUM(total) as revenue FROM \${ORDERS_TABLE} GROUP BY YEAR(order_date), MONTH(order_date) ORDER BY year DESC, month DESC
    Should Not Be Empty      \${monthly_stats}
    Log    Aggregates: \${stats[0]} orders, \${stats[1]} revenue, \${stats[2]} avg
    Disconnect From Database

Window Functions Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${window_query}=        Set Variable    SELECT user_id, total, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY total DESC) as rank_in_user, RANK() OVER (ORDER BY total DESC) as overall_rank FROM \${ORDERS_TABLE}
    \${window_results}=      Query    \${window_query}
    Should Not Be Empty      \${window_results}
    \${ranked_orders}=       Get Length    \${window_results}
    Should Be True           \${ranked_orders} > 0
    \${first_ranked}=        Get From List    \${window_results}    0
    Should Be True           \${first_ranked[2]} >= 1
    Should Be True           \${first_ranked[3]} >= 1
    \${cumulative_query}=    Query    SELECT user_id, total, SUM(total) OVER (PARTITION BY user_id ORDER BY order_date) as running_total FROM \${ORDERS_TABLE} ORDER BY user_id, order_date
    Should Not Be Empty      \${cumulative_query}
    Log    Window functions: \${ranked_orders} ranked orders
    Disconnect From Database

Common Table Expressions
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${cte_query}=           Set Variable    WITH UserOrderStats AS (SELECT user_id, COUNT(*) as order_count, AVG(total) as avg_total FROM \${ORDERS_TABLE} GROUP BY user_id), HighValueUsers AS (SELECT user_id FROM UserOrderStats WHERE avg_total > 150) SELECT u.name, u.email, uos.order_count, uos.avg_total FROM \${USERS_TABLE} u JOIN UserOrderStats uos ON u.id = uos.user_id JOIN HighValueUsers hvu ON u.id = hvu.user_id
    \${cte_results}=         Query    \${cte_query}
    Should Not Be Empty      \${cte_results}
    \${high_value_count}=    Get Length    \${cte_results}
    Should Be True           \${high_value_count} >= 0
    FOR    \${user}    IN    @{cte_results}
        Should Not Be Empty  \${user[0]}
        Should Be True       \${user[2]} > 0
        Should Be True       \${user[3]} > 150
    END
    Log    CTE identified \${high_value_count} high-value users
    Disconnect From Database

Stored Procedure Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${procedure_exists}=    Query    SELECT COUNT(*) FROM information_schema.ROUTINES WHERE ROUTINE_SCHEMA = '\${DB_NAME}' AND ROUTINE_NAME = '\${PROCEDURE_NAME}'
    Should Not Be Empty      \${procedure_exists}
    \${proc_count}=          Get From List    \${procedure_exists}    0
    IF    \${proc_count[0]} == 0
        Execute SQL String   CREATE PROCEDURE \${PROCEDURE_NAME}(IN userId INT) BEGIN SELECT COUNT(*) as order_count, AVG(total) as avg_total, SUM(total) as total_spent FROM \${ORDERS_TABLE} WHERE user_id = userId; END
    END
    \${call_procedure}=      Query    CALL \${PROCEDURE_NAME}(1)
    Should Not Be Empty      \${call_procedure}
    \${proc_result}=         Get From List    \${call_procedure}    0
    Should Be True           \${proc_result[0]} >= 0
    Should Be True           \${proc_result[1]} >= 0
    Should Be True           \${proc_result[2]} >= 0
    Log    Stored procedure executed: \${proc_result}
    Disconnect From Database

Advanced Indexing Analysis
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${index_analysis}=      Query    SHOW INDEX FROM \${ORDERS_TABLE}
    Should Not Be Empty      \${index_analysis}
    \${index_count}=         Get Length    \${index_analysis}
    Should Be True           \${index_count} > 0
    \${explain_query}=       Query    EXPLAIN SELECT * FROM \${ORDERS_TABLE} WHERE user_id = 1 AND total > 100
    Should Not Be Empty      \${explain_query}
    \${query_plan}=          Get From List    \${explain_query}    0
    Should Not Be Empty      \${query_plan[0]}
    \${performance_query}=   Query    SELECT table_name, index_name, cardinality FROM information_schema.STATISTICS WHERE table_schema = '\${DB_NAME}' AND table_name = '\${ORDERS_TABLE}'
    Should Not Be Empty      \${performance_query}
    Log    Index analysis: \${index_count} indexes, plan type: \${query_plan[0]}
    Disconnect From Database</code></pre>
        
        <h3>🎯 Práctica SQL (5 min):</h3>
        <p>1. Ejecuta INNER JOIN entre users y orders tables</p>
        <p>2. Implementa LEFT JOIN para incluir users sin orders</p>
        <p>3. Testa complex subqueries con AVG() calculations</p>
        <p>4. Valida aggregate functions (COUNT, SUM, AVG, MAX, MIN)</p>
        <p>5. Experimenta con window functions y ROW_NUMBER()</p>
        <p>6. Implementa Common Table Expressions (CTE)</p>
        <p>7. Crea y ejecuta stored procedures dinámicamente</p>
        <p>8. Analiza query performance con EXPLAIN</p>
        <p>9. Agrega GROUP BY y HAVING clauses</p>
        <p>10. Valida index usage y cardinality</p>
        <p>11. Testa PARTITION BY en window functions</p>
        <p>12. Implementa ranking y cumulative calculations</p>
        <p>13. Agrega Should Be True para numeric validations</p>
        <p>14. Experimenta con different JOIN types</p>
        <p>15. Log detailed SQL execution metrics</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar JOINs complejos y subqueries anidadas</li>
                <li>Implementar aggregate functions y window functions</li>
                <li>Ejecutar stored procedures y CTEs avanzadas</li>
                <li>Analizar query performance y index optimization</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>SQL avanzado revela data quality issues que queries simples no detectan. Usa EXPLAIN para optimizar performance.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 137 - NoSQL Database Testing</h3>
        <p>Aprenderás a automatizar testing de MongoDB, Redis y otras bases NoSQL con document validation y aggregation pipelines.</p>
    `,
    topics: ["database", "sql", "nosql"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-135"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_136 = LESSON_136;
}