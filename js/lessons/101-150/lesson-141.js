/**
 * Robot Framework Academy - Lesson 141
 * Database Testing 141
 */

const LESSON_141 = {
    id: 141,
    title: "Database Testing 141",
    duration: "7 min",
    level: "intermediate",
    section: "section-10",
    content: `
        <h2>🔄 Migration Testing</h2>
        <p>Automatización testing schema migrations, data migrations y version upgrades en databases enterprise.</p>
        
        <h3>💻 Migration Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    DatabaseLibrary
Library    Collections
Library    String
Library    DateTime
Library    Process
Library    OperatingSystem

*** Variables ***
\${DB_HOST}         localhost
\${DB_NAME}         testdb
\${DB_USER}         testuser
\${DB_PASSWORD}     testpass
\${DB_PORT}         3306
\${MIGRATION_DIR}   \${CURDIR}/migrations
\${VERSION_TABLE}   schema_migrations
\${CURRENT_VERSION} \${EMPTY}
\${TARGET_VERSION}  v2_0_1
\${ROLLBACK_VERSION}    v1_9_8

*** Test Cases ***
Migration Environment Setup
    Create Directory       \${MIGRATION_DIR}
    Directory Should Exist  \${MIGRATION_DIR}
    Connect To Database     pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    Execute SQL String      CREATE TABLE IF NOT EXISTS \${VERSION_TABLE} (version VARCHAR(50) PRIMARY KEY, applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, description TEXT)
    \${version_check}=      Query    SELECT COUNT(*) FROM \${VERSION_TABLE}
    Should Not Be Empty     \${version_check}
    \${version_count}=      Get From List    \${version_check}    0
    Should Be True          \${version_count[0]} >= 0
    \${current_version}=    Query    SELECT version FROM \${VERSION_TABLE} ORDER BY applied_at DESC LIMIT 1
    IF    \${len(\${current_version})} > 0
        \${version_value}=  Get From List    \${current_version}    0
        Set Suite Variable  \${CURRENT_VERSION}    \${version_value[0]}
    ELSE
        Set Suite Variable  \${CURRENT_VERSION}    v1_0_0
    END
    Log    Migration setup: current version \${CURRENT_VERSION}
    Disconnect From Database

Schema Migration Testing
    Connect To Database     pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${pre_migration_tables}=    Query    SHOW TABLES
    Should Not Be Empty     \${pre_migration_tables}
    \${initial_table_count}=    Get Length    \${pre_migration_tables}
    Execute SQL String      ALTER TABLE users ADD COLUMN phone VARCHAR(20)
    Execute SQL String      ALTER TABLE users ADD COLUMN address TEXT
    Execute SQL String      CREATE TABLE user_preferences (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, preference_key VARCHAR(100), preference_value TEXT, FOREIGN KEY (user_id) REFERENCES users(id))
    \${post_migration_tables}=   Query    SHOW TABLES
    Should Not Be Empty     \${post_migration_tables}
    \${final_table_count}=      Get Length    \${post_migration_tables}
    Should Be True          \${final_table_count} > \${initial_table_count}
    \${user_columns}=       Query    DESCRIBE users
    Should Not Be Empty     \${user_columns}
    \${column_names}=       Create List
    FOR    \${column}    IN    @{user_columns}
        Append To List      \${column_names}    \${column[0]}
    END
    Should Contain          \${column_names}    phone
    Should Contain          \${column_names}    address
    Execute SQL String      INSERT INTO \${VERSION_TABLE} (version, description) VALUES ('\${TARGET_VERSION}', 'Added phone, address columns and user_preferences table')
    Log    Schema migration completed: \${TARGET_VERSION}
    Disconnect From Database

Data Migration Validation
    Connect To Database     pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${pre_migration_count}=    Query    SELECT COUNT(*) FROM users WHERE phone IS NOT NULL
    Should Not Be Empty     \${pre_migration_count}
    \${initial_phone_count}=    Get From List    \${pre_migration_count}    0
    Execute SQL String      UPDATE users SET phone = CONCAT('+1-555-', LPAD(id, 4, '0')) WHERE phone IS NULL
    Execute SQL String      UPDATE users SET address = CONCAT('123 Main St, City ', id) WHERE address IS NULL OR address = ''
    \${post_migration_count}=   Query    SELECT COUNT(*) FROM users WHERE phone IS NOT NULL
    Should Not Be Empty     \${post_migration_count}
    \${final_phone_count}=      Get From List    \${post_migration_count}    0
    Should Be True          \${final_phone_count[0]} > \${initial_phone_count[0]}
    \${address_count}=      Query    SELECT COUNT(*) FROM users WHERE address IS NOT NULL AND address != ''
    Should Not Be Empty     \${address_count}
    \${address_populated}=  Get From List    \${address_count}    0
    Should Be True          \${address_populated[0]} > 0
    \${data_validation}=    Query    SELECT COUNT(*) FROM users WHERE phone LIKE '+1-555-%' AND address LIKE '%Main St%'
    Should Not Be Empty     \${data_validation}
    \${validated_count}=    Get From List    \${data_validation}    0
    Should Be True          \${validated_count[0]} > 0
    Log    Data migration validated: \${validated_count[0]} records updated
    Disconnect From Database

Migration Rollback Testing
    Connect To Database     pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${rollback_tables}=    Query    SHOW TABLES
    Should Not Be Empty     \${rollback_tables}
    \${rollback_table_count}=   Get Length    \${rollback_tables}
    Execute SQL String      DROP TABLE IF EXISTS user_preferences
    Execute SQL String      ALTER TABLE users DROP COLUMN IF EXISTS phone
    Execute SQL String      ALTER TABLE users DROP COLUMN IF EXISTS address
    \${post_rollback_tables}=   Query    SHOW TABLES
    Should Not Be Empty     \${post_rollback_tables}
    \${final_rollback_count}=   Get Length    \${post_rollback_tables}
    Should Be True          \${final_rollback_count} < \${rollback_table_count}
    \${rolled_back_columns}=    Query    DESCRIBE users
    Should Not Be Empty     \${rolled_back_columns}
    \${rollback_column_names}=  Create List
    FOR    \${column}    IN    @{rolled_back_columns}
        Append To List      \${rollback_column_names}    \${column[0]}
    END
    Should Not Contain      \${rollback_column_names}    phone
    Should Not Contain      \${rollback_column_names}    address
    Execute SQL String      INSERT INTO \${VERSION_TABLE} (version, description) VALUES ('\${ROLLBACK_VERSION}', 'Rolled back to previous schema version')
    Log    Migration rollback completed: \${ROLLBACK_VERSION}
    Disconnect From Database

Version Compatibility Testing
    Connect To Database     pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${version_history}=    Query    SELECT version, applied_at, description FROM \${VERSION_TABLE} ORDER BY applied_at
    Should Not Be Empty     \${version_history}
    \${migration_count}=    Get Length    \${version_history}
    Should Be True          \${migration_count} >= 2
    \${latest_version}=     Query    SELECT version FROM \${VERSION_TABLE} ORDER BY applied_at DESC LIMIT 1
    Should Not Be Empty     \${latest_version}
    \${current_ver}=        Get From List    \${latest_version}    0
    Should Be Equal         \${current_ver[0]}    \${ROLLBACK_VERSION}
    \${schema_check}=       Query    SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = '\${DB_NAME}' AND table_name = 'users'
    Should Not Be Empty     \${schema_check}
    \${required_columns}=   Create List    id    name    email    created_at
    FOR    \${req_column}    IN    @{required_columns}
        \${column_exists}=  Set Variable    False
        FOR    \${schema_col}    IN    @{schema_check}
            IF    '\${schema_col[1]}' == '\${req_column}'
                \${column_exists}=    Set Variable    True
                BREAK
            END
        END
        Should Be True      \${column_exists}
    END
    Log    Version compatibility validated: core schema intact
    Disconnect From Database

Migration Performance Testing
    Connect To Database     pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${perf_start}=         Get Current Date    result_format=epoch
    Execute SQL String      CREATE TABLE migration_performance_test (id INT AUTO_INCREMENT PRIMARY KEY, test_data VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    \${table_creation_time}=    Get Current Date    result_format=epoch
    \${creation_duration}=  Evaluate    \${table_creation_time} - \${perf_start}
    Should Be True          \${creation_duration} < 2
    \${index_start}=        Get Current Date    result_format=epoch
    Execute SQL String      CREATE INDEX idx_test_data ON migration_performance_test(test_data)
    \${index_end}=          Get Current Date    result_format=epoch
    \${index_duration}=     Evaluate    \${index_end} - \${index_start}
    Should Be True          \${index_duration} < 1
    \${bulk_insert_start}=  Get Current Date    result_format=epoch
    FOR    \${i}    IN RANGE    1    1001
        Execute SQL String  INSERT INTO migration_performance_test (test_data) VALUES ('Performance test data \${i}')
    END
    \${bulk_insert_end}=    Get Current Date    result_format=epoch
    \${insert_duration}=    Evaluate    \${bulk_insert_end} - \${bulk_insert_start}
    Should Be True          \${insert_duration} < 10
    \${record_count}=       Query    SELECT COUNT(*) FROM migration_performance_test
    Should Not Be Empty     \${record_count}
    \${final_count}=        Get From List    \${record_count}    0
    Should Be Equal         \${final_count[0]}    1000
    Execute SQL String      DROP TABLE migration_performance_test
    Log    Migration performance: creation=\${creation_duration}s, index=\${index_duration}s, insert=\${insert_duration}s
    Disconnect From Database

Data Integrity Validation
    Connect To Database     pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${integrity_checks}=   Create Dictionary
    \${null_checks}=        Query    SELECT COUNT(*) FROM users WHERE name IS NULL OR name = ''
    Should Not Be Empty     \${null_checks}
    \${null_count}=         Get From List    \${null_checks}    0
    Set To Dictionary       \${integrity_checks}    null_names    \${null_count[0]}
    \${email_format}=       Query    SELECT COUNT(*) FROM users WHERE email NOT REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
    Should Not Be Empty     \${email_format}
    \${invalid_emails}=     Get From List    \${email_format}    0
    Set To Dictionary       \${integrity_checks}    invalid_emails    \${invalid_emails[0]}
    \${duplicate_emails}=   Query    SELECT COUNT(*) FROM (SELECT email FROM users GROUP BY email HAVING COUNT(*) > 1) as duplicates
    Should Not Be Empty     \${duplicate_emails}
    \${dup_count}=          Get From List    \${duplicate_emails}    0
    Set To Dictionary       \${integrity_checks}    duplicate_emails    \${dup_count[0]}
    Should Be Equal         \${integrity_checks['null_names']}        0
    Should Be Equal         \${integrity_checks['invalid_emails']}    0
    Should Be Equal         \${integrity_checks['duplicate_emails']}  0
    \${foreign_key_check}=  Query    SELECT COUNT(*) FROM information_schema.table_constraints WHERE table_schema = '\${DB_NAME}' AND constraint_type = 'FOREIGN KEY'
    Should Not Be Empty     \${foreign_key_check}
    \${fk_count}=           Get From List    \${foreign_key_check}    0
    Set To Dictionary       \${integrity_checks}    foreign_keys    \${fk_count[0]}
    Log    Data integrity validation: \${integrity_checks}
    Disconnect From Database

Migration Cleanup Testing
    Connect To Database     pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${cleanup_summary}=    Create Dictionary
    \${migration_history}=  Query    SELECT COUNT(*) FROM \${VERSION_TABLE}
    Should Not Be Empty     \${migration_history}
    \${history_count}=      Get From List    \${migration_history}    0
    Set To Dictionary       \${cleanup_summary}    migration_records    \${history_count[0]}
    \${current_tables}=     Query    SHOW TABLES
    Should Not Be Empty     \${current_tables}
    \${table_count}=        Get Length    \${current_tables}
    Set To Dictionary       \${cleanup_summary}    final_tables    \${table_count}
    \${final_version}=      Query    SELECT version FROM \${VERSION_TABLE} ORDER BY applied_at DESC LIMIT 1
    Should Not Be Empty     \${final_version}
    \${last_version}=       Get From List    \${final_version}    0
    Set To Dictionary       \${cleanup_summary}    final_version    \${last_version[0]}
    Should Be True          \${cleanup_summary['migration_records']} >= 2
    Should Be True          \${cleanup_summary['final_tables']} > 0
    Should Not Be Empty     \${cleanup_summary['final_version']}
    Log    Migration cleanup summary: \${cleanup_summary}
    Disconnect From Database</code></pre>
        
        <h3>🎯 Práctica Migration (5 min):</h3>
        <p>1. Ejecuta migration environment setup completo</p>
        <p>2. Implementa schema migration con ALTER TABLE</p>
        <p>3. Valida data migration con UPDATE statements</p>
        <p>4. Testa migration rollback procedures</p>
        <p>5. Verifica version compatibility después rollback</p>
        <p>6. Mide migration performance con timing</p>
        <p>7. Valida data integrity post-migration</p>
        <p>8. Ejecuta migration cleanup y summary</p>
        <p>9. Agrega Should Be True para performance limits</p>
        <p>10. Testa foreign key constraints preservation</p>
        <p>11. Implementa bulk data transformation</p>
        <p>12. Valida schema_migrations tracking table</p>
        <p>13. Agrega Should Contain para column validation</p>
        <p>14. Testa different migration strategies</p>
        <p>15. Log detailed migration metrics comprehensivos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar schema migrations y data transformations</li>
                <li>Implementar rollback procedures y version tracking</li>
                <li>Validar data integrity y performance durante migrations</li>
                <li>Ejecutar compatibility testing y cleanup processes</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Migration testing previene data loss en production. Siempre testa rollback procedures antes de aplicar migrations.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 142 - Database Security Testing</h3>
        <p>Aprenderás a automatizar testing de seguridad database incluyendo SQL injection, access controls y data encryption validation.</p>
    `,
    topics: ["database", "sql", "nosql"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-140"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_141 = LESSON_141;
}