/**
 * Robot Framework Academy - Lesson 135
 * Fundamentos de Database Testing
 */

const LESSON_135 = {
    id: 135,
    title: "Fundamentos de Database Testing",
    duration: "10 min",
    level: "intermediate",
    section: "section-10",
    content: `
        <h2>🗄️ Database Testing</h2>
        <p>Automatización testing bases datos SQL y NoSQL para validación end-to-end completa.</p>
        
        <h3>💻 Database Tests:</h3>
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
\${CONNECTION_STRING}    mysql://\${DB_USER}:\${DB_PASSWORD}@\${DB_HOST}:\${DB_PORT}/\${DB_NAME}
\${TEST_TABLE}      users
\${TEST_USER_ID}    \${EMPTY}
\${RECORD_COUNT}    0

*** Test Cases ***
Database Connection Test
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${connection_status}=    Execute SQL String    SELECT 1 as test_connection
    Should Be Equal        \${connection_status}    None
    \${db_version}=        Query    SELECT VERSION() as version
    Should Not Be Empty    \${db_version}
    \${version_info}=      Get From List    \${db_version}    0
    Should Contain         \${version_info[0]}    mysql
    Log    Database connected: \${version_info[0]}
    Disconnect From Database

Table Structure Validation
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${table_exists}=      Query    SHOW TABLES LIKE '\${TEST_TABLE}'
    Should Not Be Empty    \${table_exists}
    \${columns}=           Query    DESCRIBE \${TEST_TABLE}
    Should Not Be Empty    \${columns}
    \${column_count}=      Get Length    \${columns}
    Should Be True         \${column_count} >= 3
    \${first_column}=      Get From List    \${columns}    0
    Should Contain         \${first_column[0]}    id
    Should Contain         \${first_column[1]}    int
    Log    Table structure validated: \${column_count} columns
    Disconnect From Database

Data Insertion Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${timestamp}=         Get Current Date    result_format=%Y%m%d_%H%M%S
    \${test_email}=        Set Variable    test_\${timestamp}@example.com
    Execute SQL String     INSERT INTO \${TEST_TABLE} (name, email, created_at) VALUES ('Test User \${timestamp}', '\${test_email}', NOW())
    \${inserted_user}=     Query    SELECT * FROM \${TEST_TABLE} WHERE email = '\${test_email}'
    Should Not Be Empty    \${inserted_user}
    \${user_data}=         Get From List    \${inserted_user}    0
    Should Be Equal        \${user_data[2]}    \${test_email}
    Set Suite Variable     \${TEST_USER_ID}    \${user_data[0]}
    Log    Data inserted successfully: ID \${TEST_USER_ID}
    Disconnect From Database

Data Query Validation
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${all_users}=         Query    SELECT * FROM \${TEST_TABLE}
    Should Not Be Empty    \${all_users}
    \${user_count}=        Get Length    \${all_users}
    Should Be True         \${user_count} > 0
    Set Suite Variable     \${RECORD_COUNT}    \${user_count}
    \${active_users}=      Query    SELECT COUNT(*) FROM \${TEST_TABLE} WHERE status = 'active'
    Should Not Be Empty    \${active_users}
    \${active_count}=      Get From List    \${active_users}    0
    Should Be True         \${active_count[0]} >= 0
    \${recent_users}=      Query    SELECT * FROM \${TEST_TABLE} WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 DAY)
    Should Not Be Empty    \${recent_users}
    Log    Query validation: \${user_count} total, \${active_count[0]} active
    Disconnect From Database

Data Update Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    Should Not Be Empty    \${TEST_USER_ID}
    \${new_name}=          Set Variable    Updated User Name
    Execute SQL String     UPDATE \${TEST_TABLE} SET name = '\${new_name}', updated_at = NOW() WHERE id = \${TEST_USER_ID}
    \${updated_user}=      Query    SELECT * FROM \${TEST_TABLE} WHERE id = \${TEST_USER_ID}
    Should Not Be Empty    \${updated_user}
    \${user_record}=       Get From List    \${updated_user}    0
    Should Be Equal        \${user_record[1]}    \${new_name}
    Should Not Be None     \${user_record[4]}
    Log    Data updated successfully: \${new_name}
    Disconnect From Database

Transaction Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    Execute SQL String     START TRANSACTION
    Execute SQL String     INSERT INTO \${TEST_TABLE} (name, email) VALUES ('Transaction Test 1', 'trans1@test.com')
    Execute SQL String     INSERT INTO \${TEST_TABLE} (name, email) VALUES ('Transaction Test 2', 'trans2@test.com')
    \${before_commit}=     Query    SELECT COUNT(*) FROM \${TEST_TABLE} WHERE email LIKE 'trans%@test.com'
    Should Not Be Empty    \${before_commit}
    Execute SQL String     COMMIT
    \${after_commit}=      Query    SELECT COUNT(*) FROM \${TEST_TABLE} WHERE email LIKE 'trans%@test.com'
    Should Not Be Empty    \${after_commit}
    \${trans_count}=       Get From List    \${after_commit}    0
    Should Be True         \${trans_count[0]} >= 2
    Log    Transaction completed: \${trans_count[0]} records
    Disconnect From Database

Data Integrity Validation
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${duplicate_emails}=  Query    SELECT email, COUNT(*) as count FROM \${TEST_TABLE} GROUP BY email HAVING COUNT(*) > 1
    Should Be Empty        \${duplicate_emails}
    \${null_names}=        Query    SELECT COUNT(*) FROM \${TEST_TABLE} WHERE name IS NULL OR name = ''
    Should Not Be Empty    \${null_names}
    \${null_count}=        Get From List    \${null_names}    0
    Should Be Equal        \${null_count[0]}    0
    \${invalid_emails}=    Query    SELECT COUNT(*) FROM \${TEST_TABLE} WHERE email NOT LIKE '%@%.%'
    Should Not Be Empty    \${invalid_emails}
    \${invalid_count}=     Get From List    \${invalid_emails}    0
    Should Be Equal        \${invalid_count[0]}    0
    Log    Data integrity validated: no duplicates or nulls
    Disconnect From Database

Performance Query Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${start_time}=        Get Current Date    result_format=epoch
    \${large_query}=       Query    SELECT * FROM \${TEST_TABLE} ORDER BY created_at DESC LIMIT 1000
    \${end_time}=          Get Current Date    result_format=epoch
    \${query_duration}=    Evaluate    \${end_time} - \${start_time}
    Should Be True         \${query_duration} < 5
    Should Not Be Empty    \${large_query}
    \${result_count}=      Get Length    \${large_query}
    Should Be True         \${result_count} <= 1000
    \${index_query}=       Query    SHOW INDEX FROM \${TEST_TABLE}
    Should Not Be Empty    \${index_query}
    Log    Performance test: \${result_count} records in \${query_duration}s
    Disconnect From Database

Data Cleanup Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    Should Not Be Empty    \${TEST_USER_ID}
    \${before_delete}=     Query    SELECT COUNT(*) FROM \${TEST_TABLE}
    Should Not Be Empty    \${before_delete}
    Execute SQL String     DELETE FROM \${TEST_TABLE} WHERE id = \${TEST_USER_ID}
    \${after_delete}=      Query    SELECT COUNT(*) FROM \${TEST_TABLE}
    Should Not Be Empty    \${after_delete}
    \${before_count}=      Get From List    \${before_delete}    0
    \${after_count}=       Get From List    \${after_delete}    0
    Should Be True         \${after_count[0]} == \${before_count[0]} - 1
    Execute SQL String     DELETE FROM \${TEST_TABLE} WHERE email LIKE 'trans%@test.com'
    \${final_count}=       Query    SELECT COUNT(*) FROM \${TEST_TABLE}
    Should Not Be Empty    \${final_count}
    Log    Cleanup completed: test data removed
    Disconnect From Database</code></pre>
        
        <h3>🎯 Práctica Database (8 min):</h3>
        <p>1. Instala DatabaseLibrary: pip install robotframework-databaselibrary</p>
        <p>2. Configura connection string para tu database</p>
        <p>3. Ejecuta connection test y valida db version</p>
        <p>4. Implementa table structure validation completa</p>
        <p>5. Testa data insertion con timestamps únicos</p>
        <p>6. Valida query results con Get From List</p>
        <p>7. Ejecuta data updates y confirma cambios</p>
        <p>8. Implementa transaction testing con COMMIT</p>
        <p>9. Valida data integrity (no duplicates, nulls)</p>
        <p>10. Mide performance con query timing</p>
        <p>11. Ejecuta cleanup automático de test data</p>
        <p>12. Agrega Should Be True para numeric validations</p>
        <p>13. Testa different SQL query types (SELECT, INSERT, UPDATE, DELETE)</p>
        <p>14. Valida que connections se cierran correctamente</p>
        <p>15. Implementa error handling para SQL failures</p>
        <p>16. Practica Query keyword para result sets</p>
        <p>17. Experimenta con Execute SQL String para modifications</p>
        <p>18. Log detailed database metrics para monitoring</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar DatabaseLibrary para SQL automation</li>
                <li>Implementar CRUD operations testing completo</li>
                <li>Validar data integrity y performance queries</li>
                <li>Manejar transactions y cleanup automático</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Database testing valida que APIs realmente persisten datos correctamente. Siempre incluye cleanup para no contaminar DB.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 136 - SQL Queries Avanzadas</h3>
        <p>Aprenderás queries SQL complejas, JOINs, subqueries y stored procedures para testing enterprise database scenarios.</p>
    `,
    topics: ["database", "sql", "nosql"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "intermediate",
    prerequisites: ["lesson-134"],
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_135 = LESSON_135;
}