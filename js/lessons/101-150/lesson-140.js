/**
 * Robot Framework Academy - Lesson 140
 * Database Testing 140
 */

const LESSON_140 = {
    id: 140,
    title: "Database Testing 140",
    duration: "7 min",
    level: "intermediate",
    section: "section-10",
    content: `
        <h2>💾 Backup Testing</h2>
        <p>Automatización testing backups, recovery procedures y disaster recovery scenarios para databases críticas.</p>
        
        <h3>💻 Backup Tests:</h3>
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
\${BACKUP_DIR}      \${CURDIR}/backups
\${BACKUP_FILE}     \${EMPTY}
\${RESTORE_DB}      testdb_restore
\${TIMESTAMP}       \${EMPTY}
\${BACKUP_SIZE}     0

*** Test Cases ***
Backup Directory Setup
    Create Directory       \${BACKUP_DIR}
    Directory Should Exist  \${BACKUP_DIR}
    \${current_time}=       Get Current Date    result_format=%Y%m%d_%H%M%S
    Set Suite Variable      \${TIMESTAMP}    \${current_time}
    \${backup_filename}=    Set Variable    \${DB_NAME}_backup_\${TIMESTAMP}.sql
    \${backup_path}=        Set Variable    \${BACKUP_DIR}/\${backup_filename}
    Set Suite Variable      \${BACKUP_FILE}    \${backup_path}
    Should Not Exist        \${BACKUP_FILE}
    Log    Backup setup: \${backup_filename}

Database Backup Creation
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${pre_backup_count}=  Query    SELECT COUNT(*) FROM users
    Should Not Be Empty    \${pre_backup_count}
    \${record_count}=      Get From List    \${pre_backup_count}    0
    Should Be True         \${record_count[0]} > 0
    Disconnect From Database
    \${backup_cmd}=        Set Variable    mysqldump -h \${DB_HOST} -P \${DB_PORT} -u \${DB_USER} -p\${DB_PASSWORD} \${DB_NAME} > \${BACKUP_FILE}
    \${backup_result}=     Run Process    \${backup_cmd}    shell=True
    Should Be Equal        \${backup_result.rc}    0
    File Should Exist      \${BACKUP_FILE}
    \${backup_size}=       Get File Size    \${BACKUP_FILE}
    Should Be True         \${backup_size} > 1000
    Set Suite Variable     \${BACKUP_SIZE}    \${backup_size}
    Log    Backup created: \${backup_size} bytes

Backup Content Validation
    File Should Exist      \${BACKUP_FILE}
    \${backup_content}=    Get File    \${BACKUP_FILE}
    Should Not Be Empty    \${backup_content}
    Should Contain         \${backup_content}    CREATE TABLE
    Should Contain         \${backup_content}    INSERT INTO
    Should Contain         \${backup_content}    \${DB_NAME}
    Should Contain         \${backup_content}    users
    Should Not Contain     \${backup_content}    ERROR
    Should Not Contain     \${backup_content}    mysqldump: Got error
    \${line_count}=        Get Line Count    \${backup_content}
    Should Be True         \${line_count} > 50
    \${table_creates}=     Get Lines Containing String    \${backup_content}    CREATE TABLE
    Should Not Be Empty    \${table_creates}
    Log    Backup validation: \${line_count} lines, valid SQL structure

Database Restore Testing
    \${restore_cmd}=       Set Variable    mysql -h \${DB_HOST} -P \${DB_PORT} -u \${DB_USER} -p\${DB_PASSWORD} -e "CREATE DATABASE IF NOT EXISTS \${RESTORE_DB}"
    \${create_result}=     Run Process    \${restore_cmd}    shell=True
    Should Be Equal        \${create_result.rc}    0
    \${restore_data_cmd}=  Set Variable    mysql -h \${DB_HOST} -P \${DB_PORT} -u \${DB_USER} -p\${DB_PASSWORD} \${RESTORE_DB} < \${BACKUP_FILE}
    \${restore_result}=    Run Process    \${restore_data_cmd}    shell=True
    Should Be Equal        \${restore_result.rc}    0
    Connect To Database    pymysql    \${RESTORE_DB}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${restored_count}=    Query    SELECT COUNT(*) FROM users
    Should Not Be Empty    \${restored_count}
    \${restored_records}=  Get From List    \${restored_count}    0
    Should Be True         \${restored_records[0]} > 0
    \${table_check}=       Query    SHOW TABLES
    Should Not Be Empty    \${table_check}
    Log    Restore completed: \${restored_records[0]} records restored
    Disconnect From Database

Data Integrity Verification
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${original_users}=    Query    SELECT id, name, email FROM users ORDER BY id LIMIT 10
    Should Not Be Empty    \${original_users}
    Disconnect From Database
    Connect To Database    pymysql    \${RESTORE_DB}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${restored_users}=    Query    SELECT id, name, email FROM users ORDER BY id LIMIT 10
    Should Not Be Empty    \${restored_users}
    Length Should Be       \${restored_users}    \${len(\${original_users})}
    FOR    \${i}    IN RANGE    0    \${len(\${original_users})}
        Should Be Equal    \${original_users[\${i}][0]}    \${restored_users[\${i}][0]}
        Should Be Equal    \${original_users[\${i}][1]}    \${restored_users[\${i}][1]}
        Should Be Equal    \${original_users[\${i}][2]}    \${restored_users[\${i}][2]}
    END
    \${checksum_original}=     Query    SELECT MD5(GROUP_CONCAT(CONCAT(id, name, email) ORDER BY id)) FROM users
    \${checksum_restored}=     Query    SELECT MD5(GROUP_CONCAT(CONCAT(id, name, email) ORDER BY id)) FROM users
    Should Be Equal        \${checksum_original[0][0]}    \${checksum_restored[0][0]}
    Log    Data integrity verified: checksums match
    Disconnect From Database

Incremental Backup Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    Execute SQL String     INSERT INTO users (name, email, created_at) VALUES ('Backup Test User', 'backup\${TIMESTAMP}@test.com', NOW())
    \${new_user_id}=       Query    SELECT id FROM users WHERE email = 'backup\${TIMESTAMP}@test.com'
    Should Not Be Empty    \${new_user_id}
    \${user_id}=           Get From List    \${new_user_id}    0
    Disconnect From Database
    \${incremental_file}=  Set Variable    \${BACKUP_DIR}/incremental_\${TIMESTAMP}.sql
    \${incremental_cmd}=   Set Variable    mysqldump -h \${DB_HOST} -P \${DB_PORT} -u \${DB_USER} -p\${DB_PASSWORD} --where="id >= \${user_id[0]}" \${DB_NAME} users > \${incremental_file}
    \${inc_result}=        Run Process    \${incremental_cmd}    shell=True
    Should Be Equal        \${inc_result.rc}    0
    File Should Exist      \${incremental_file}
    \${inc_content}=       Get File    \${incremental_file}
    Should Contain         \${inc_content}    Backup Test User
    Should Contain         \${inc_content}    backup\${TIMESTAMP}@test.com
    Log    Incremental backup created successfully

Point-in-Time Recovery
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${before_time}=       Get Current Date    result_format=%Y-%m-%d %H:%M:%S
    Execute SQL String     INSERT INTO users (name, email, created_at) VALUES ('PITR Test User', 'pitr\${TIMESTAMP}@test.com', NOW())
    \${after_time}=        Get Current Date    result_format=%Y-%m-%d %H:%M:%S
    \${pitr_user}=         Query    SELECT COUNT(*) FROM users WHERE email = 'pitr\${TIMESTAMP}@test.com'
    Should Not Be Empty    \${pitr_user}
    \${pitr_count}=        Get From List    \${pitr_user}    0
    Should Be Equal        \${pitr_count[0]}    1
    Disconnect From Database
    \${pitr_backup}=       Set Variable    \${BACKUP_DIR}/pitr_\${TIMESTAMP}.sql
    \${pitr_cmd}=          Set Variable    mysqldump -h \${DB_HOST} -P \${DB_PORT} -u \${DB_USER} -p\${DB_PASSWORD} --where="created_at <= '\${before_time}'" \${DB_NAME} users > \${pitr_backup}
    \${pitr_result}=       Run Process    \${pitr_cmd}    shell=True
    Should Be Equal        \${pitr_result.rc}    0
    File Should Exist      \${pitr_backup}
    \${pitr_content}=      Get File    \${pitr_backup}
    Should Not Contain     \${pitr_content}    PITR Test User
    Log    Point-in-time recovery backup created

Backup Cleanup Testing
    Directory Should Exist \${BACKUP_DIR}
    \${backup_files}=      List Files In Directory    \${BACKUP_DIR}    *.sql
    Should Not Be Empty    \${backup_files}
    \${file_count}=        Get Length    \${backup_files}
    Should Be True         \${file_count} >= 3
    FOR    \${backup_file}    IN    @{backup_files}
        \${full_path}=     Set Variable    \${BACKUP_DIR}/\${backup_file}
        File Should Exist  \${full_path}
        \${file_size}=     Get File Size    \${full_path}
        Should Be True     \${file_size} > 0
    END
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${drop_restore_cmd}=  Set Variable    mysql -h \${DB_HOST} -P \${DB_PORT} -u \${DB_USER} -p\${DB_PASSWORD} -e "DROP DATABASE IF EXISTS \${RESTORE_DB}"
    \${drop_result}=       Run Process    \${drop_restore_cmd}    shell=True
    Should Be Equal        \${drop_result.rc}    0
    Log    Backup testing cleanup completed
    Disconnect From Database</code></pre>
        
        <h3>🎯 Práctica Backup (5 min):</h3>
        <p>1. Instala mysqldump utility para backup creation</p>
        <p>2. Ejecuta backup directory setup y validation</p>
        <p>3. Implementa database backup creation completa</p>
        <p>4. Valida backup content con SQL structure</p>
        <p>5. Testa database restore a nueva database</p>
        <p>6. Verifica data integrity con checksums</p>
        <p>7. Implementa incremental backup testing</p>
        <p>8. Ejecuta point-in-time recovery scenarios</p>
        <p>9. Agrega backup cleanup automático</p>
        <p>10. Valida file sizes y content validation</p>
        <p>11. Testa different backup strategies</p>
        <p>12. Implementa Should Contain para SQL validation</p>
        <p>13. Agrega Run Process error handling</p>
        <p>14. Verifica que restored data matches original</p>
        <p>15. Log detailed backup metrics para monitoring</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar database backup creation y validation</li>
                <li>Implementar restore procedures y data integrity</li>
                <li>Ejecutar incremental y point-in-time recovery</li>
                <li>Validar backup content y cleanup processes</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Backup testing es crítico para disaster recovery. Siempre valida que puedes restaurar antes de confiar en backups.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 141 - Database Migration Testing</h3>
        <p>Aprenderás a automatizar testing de schema migrations, data migrations y version upgrades en databases enterprise.</p>
    `,
    topics: ["database", "sql", "nosql"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-139"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_140 = LESSON_140;
}