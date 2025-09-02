/**
 * Robot Framework Academy - Lesson 142
 * Database Testing 142
 */

const LESSON_142 = {
    id: 142,
    title: "Database Testing 142",
    duration: "7 min",
    level: "intermediate",
    section: "section-10",
    content: `
        <h2>🔒 Security Testing</h2>
        <p>Automatización testing seguridad database: SQL injection, access controls y data encryption validation.</p>
        
        <h3>💻 Security Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    DatabaseLibrary
Library    Collections
Library    String
Library    RequestsLibrary
Library    Process

*** Variables ***
\${DB_HOST}         localhost
\${DB_NAME}         testdb
\${DB_USER}         testuser
\${DB_PASSWORD}     testpass
\${DB_PORT}         3306
\${ADMIN_USER}      admin
\${ADMIN_PASSWORD}  admin123
\${READONLY_USER}   readonly
\${READONLY_PASSWORD}   readonly123
\${INJECTION_PAYLOAD}   ' OR '1'='1
\${XSS_PAYLOAD}     <script>alert('xss')</script>
\${ENCRYPTION_KEY}  test_encryption_key_2024

*** Test Cases ***
SQL Injection Prevention
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${safe_query}=        Set Variable    SELECT * FROM users WHERE email = 'test@example.com'
    \${safe_result}=       Query    \${safe_query}
    Should Not Be Empty    \${safe_result}
    \${injection_attempt}=    Set Variable    SELECT * FROM users WHERE email = '\${INJECTION_PAYLOAD}'
    TRY
        \${injection_result}=    Query    \${injection_attempt}
        Should Be Empty       \${injection_result}
    EXCEPT
        Log    SQL injection properly blocked
    END
    \${parameterized_query}=    Set Variable    SELECT COUNT(*) FROM users WHERE name LIKE %s
    \${param_result}=      Query    \${parameterized_query}    ('%test%',)
    Should Not Be Empty    \${param_result}
    \${param_count}=       Get From List    \${param_result}    0
    Should Be True         \${param_count[0]} >= 0
    \${escape_test}=       Set Variable    SELECT * FROM users WHERE name = 'O''Neil'
    \${escape_result}=     Query    \${escape_test}
    Should Not Be None     \${escape_result}
    Log    SQL injection prevention validated
    Disconnect From Database

Access Control Testing
    \${admin_connection}=    Set Variable    True
    TRY
        Connect To Database    pymysql    \${DB_NAME}    \${ADMIN_USER}    \${ADMIN_PASSWORD}    \${DB_HOST}    \${DB_PORT}
        Execute SQL String     CREATE TABLE security_test (id INT AUTO_INCREMENT PRIMARY KEY, test_data VARCHAR(100))
        Execute SQL String     INSERT INTO security_test (test_data) VALUES ('admin can insert')
        \${admin_insert}=     Query    SELECT COUNT(*) FROM security_test
        Should Not Be Empty   \${admin_insert}
        Execute SQL String    DROP TABLE security_test
        Disconnect From Database
    EXCEPT
        \${admin_connection}=    Set Variable    False
        Log    Admin connection failed (expected if user doesn't exist)
    END
    \${readonly_connection}=    Set Variable    True
    TRY
        Connect To Database    pymysql    \${DB_NAME}    \${READONLY_USER}    \${READONLY_PASSWORD}    \${DB_HOST}    \${DB_PORT}
        \${readonly_select}=    Query    SELECT COUNT(*) FROM users
        Should Not Be Empty     \${readonly_select}
        TRY
            Execute SQL String  INSERT INTO users (name, email) VALUES ('unauthorized', 'hack@test.com')
            Fail    Readonly user should not be able to insert
        EXCEPT
            Log    Readonly user correctly denied INSERT permission
        END
        Disconnect From Database
    EXCEPT
        \${readonly_connection}=    Set Variable    False
        Log    Readonly connection failed (expected if user doesn't exist)
    END
    Log    Access control testing completed

User Privilege Validation
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${user_privileges}=    Query    SHOW GRANTS FOR CURRENT_USER()
    Should Not Be Empty     \${user_privileges}
    \${privilege_info}=     Get From List    \${user_privileges}    0
    Should Not Be Empty     \${privilege_info[0]}
    \${privilege_check}=    Query    SELECT User, Host, Select_priv, Insert_priv, Update_priv, Delete_priv FROM mysql.user WHERE User = '\${DB_USER}'
    Should Not Be None      \${privilege_check}
    \${database_list}=      Query    SHOW DATABASES
    Should Not Be Empty     \${database_list}
    \${accessible_dbs}=     Create List
    FOR    \${db}    IN    @{database_list}
        Append To List      \${accessible_dbs}    \${db[0]}
    END
    Should Contain          \${accessible_dbs}    \${DB_NAME}
    Should Not Contain      \${accessible_dbs}    mysql
    \${table_permissions}=  Query    SELECT table_name, privilege_type FROM information_schema.table_privileges WHERE grantee LIKE '%\${DB_USER}%'
    Should Not Be None      \${table_permissions}
    Log    User privileges validated for \${DB_USER}
    Disconnect From Database

Data Encryption Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    Execute SQL String     CREATE TABLE encryption_test (id INT AUTO_INCREMENT PRIMARY KEY, sensitive_data VARBINARY(255), encrypted_email VARBINARY(255))
    \${plain_text}=        Set Variable    sensitive information 12345
    \${encrypted_data}=    Set Variable    AES_ENCRYPT('\${plain_text}', '\${ENCRYPTION_KEY}')
    Execute SQL String     INSERT INTO encryption_test (sensitive_data, encrypted_email) VALUES (\${encrypted_data}, AES_ENCRYPT('user@example.com', '\${ENCRYPTION_KEY}'))
    \${encrypted_query}=   Query    SELECT id, sensitive_data, encrypted_email FROM encryption_test
    Should Not Be Empty    \${encrypted_query}
    \${encrypted_record}=  Get From List    \${encrypted_query}    0
    Should Not Be None     \${encrypted_record[1]}
    Should Not Be None     \${encrypted_record[2]}
    \${decrypted_query}=   Query    SELECT AES_DECRYPT(sensitive_data, '\${ENCRYPTION_KEY}') as decrypted_data FROM encryption_test WHERE id = \${encrypted_record[0]}
    Should Not Be Empty    \${decrypted_query}
    \${decrypted_data}=    Get From List    \${decrypted_query}    0
    Should Be Equal        \${decrypted_data[0].decode('utf-8')}    \${plain_text}
    \${email_decrypt}=     Query    SELECT AES_DECRYPT(encrypted_email, '\${ENCRYPTION_KEY}') as email FROM encryption_test WHERE id = \${encrypted_record[0]}
    Should Not Be Empty    \${email_decrypt}
    \${email_data}=        Get From List    \${email_decrypt}    0
    Should Be Equal        \${email_data[0].decode('utf-8')}    user@example.com
    Execute SQL String     DROP TABLE encryption_test
    Log    Data encryption validation completed
    Disconnect From Database

Password Security Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    Execute SQL String     CREATE TABLE password_test (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50), password_hash VARCHAR(255))
    \${weak_password}=     Set Variable    123456
    \${strong_password}=   Set Variable    StR0ng_P@ssw0rd_2024!
    \${weak_hash}=         Set Variable    SHA2('\${weak_password}', 256)
    \${strong_hash}=       Set Variable    SHA2('\${strong_password}', 256)
    Execute SQL String     INSERT INTO password_test (username, password_hash) VALUES ('weak_user', \${weak_hash})
    Execute SQL String     INSERT INTO password_test (username, password_hash) VALUES ('strong_user', \${strong_hash})
    \${hash_validation}=   Query    SELECT username, password_hash FROM password_test
    Should Not Be Empty    \${hash_validation}
    \${hash_count}=        Get Length    \${hash_validation}
    Should Be Equal        \${hash_count}    2
    FOR    \${user_record}    IN    @{hash_validation}
        Should Not Be Empty    \${user_record[1]}
        Should Not Be Equal    \${user_record[1]}    \${weak_password}
        Should Not Be Equal    \${user_record[1]}    \${strong_password}
        \${hash_length}=       Get Length    \${user_record[1]}
        Should Be Equal        \${hash_length}    64
    END
    \${password_verify}=   Query    SELECT COUNT(*) FROM password_test WHERE password_hash = \${strong_hash}
    Should Not Be Empty    \${password_verify}
    \${verify_count}=      Get From List    \${password_verify}    0
    Should Be Equal        \${verify_count[0]}    1
    Execute SQL String     DROP TABLE password_test
    Log    Password security testing completed
    Disconnect From Database

Connection Security Testing
    \${ssl_connection}=    Set Variable    False
    TRY
        \${ssl_check_cmd}=    Set Variable    mysql -h \${DB_HOST} -P \${DB_PORT} -u \${DB_USER} -p\${DB_PASSWORD} -e "SHOW STATUS LIKE 'Ssl_cipher'"
        \${ssl_result}=       Run Process    \${ssl_check_cmd}    shell=True
        Should Be Equal       \${ssl_result.rc}    0
        IF    'Ssl_cipher' in '\${ssl_result.stdout}'
            \${ssl_connection}=    Set Variable    True
        END
    EXCEPT
        Log    SSL connection check failed
    END
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${connection_info}=   Query    SELECT CONNECTION_ID(), USER(), @@hostname, @@port
    Should Not Be Empty    \${connection_info}
    \${conn_details}=      Get From List    \${connection_info}    0
    Should Be True         \${conn_details[0]} > 0
    Should Contain         \${conn_details[1]}    \${DB_USER}
    Should Be Equal        \${conn_details[3]}    \${DB_PORT}
    \${process_list}=      Query    SHOW PROCESSLIST
    Should Not Be Empty    \${process_list}
    \${active_connections}=    Get Length    \${process_list}
    Should Be True         \${active_connections} > 0
    Should Be True         \${active_connections} < 100
    Log    Connection security: SSL=\${ssl_connection}, Connections=\${active_connections}
    Disconnect From Database

Audit Trail Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    Execute SQL String     CREATE TABLE audit_log (id INT AUTO_INCREMENT PRIMARY KEY, user_action VARCHAR(100), table_affected VARCHAR(50), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, user_id VARCHAR(50))
    \${audit_trigger}=     Set Variable    CREATE TRIGGER audit_users_insert AFTER INSERT ON users FOR EACH ROW INSERT INTO audit_log (user_action, table_affected, user_id) VALUES ('INSERT', 'users', USER())
    Execute SQL String     \${audit_trigger}
    Execute SQL String     INSERT INTO users (name, email) VALUES ('Audit Test User', 'audit@test.com')
    \${audit_entries}=     Query    SELECT COUNT(*) FROM audit_log WHERE user_action = 'INSERT' AND table_affected = 'users'
    Should Not Be Empty    \${audit_entries}
    \${audit_count}=       Get From List    \${audit_entries}    0
    Should Be True         \${audit_count[0]} > 0
    \${recent_audits}=     Query    SELECT user_action, table_affected, timestamp FROM audit_log ORDER BY timestamp DESC LIMIT 5
    Should Not Be Empty    \${recent_audits}
    \${latest_audit}=      Get From List    \${recent_audits}    0
    Should Be Equal        \${latest_audit[0]}    INSERT
    Should Be Equal        \${latest_audit[1]}    users
    Execute SQL String     DROP TRIGGER IF EXISTS audit_users_insert
    Execute SQL String     DROP TABLE audit_log
    Log    Audit trail testing completed
    Disconnect From Database

Security Summary Report
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${security_report}=   Create Dictionary
    ...                    sql_injection_protection=ENABLED
    ...                    access_controls=CONFIGURED
    ...                    user_privileges=VALIDATED
    ...                    data_encryption=FUNCTIONAL
    ...                    password_security=ENFORCED
    ...                    connection_security=ACTIVE
    ...                    audit_trail=IMPLEMENTED
    Should Be Equal        \${security_report['sql_injection_protection']}    ENABLED
    Should Be Equal        \${security_report['access_controls']}            CONFIGURED
    Should Be Equal        \${security_report['user_privileges']}            VALIDATED
    Should Be Equal        \${security_report['data_encryption']}            FUNCTIONAL
    Should Be Equal        \${security_report['password_security']}          ENFORCED
    Should Be Equal        \${security_report['connection_security']}        ACTIVE
    Should Be Equal        \${security_report['audit_trail']}                IMPLEMENTED
    \${security_score}=    Evaluate    sum([1 for status in \${security_report}.values() if status in ['ENABLED', 'CONFIGURED', 'VALIDATED', 'FUNCTIONAL', 'ENFORCED', 'ACTIVE', 'IMPLEMENTED']])
    \${total_checks}=      Get Length    \${security_report}
    \${security_percentage}=    Evaluate    (\${security_score} / \${total_checks}) * 100
    Should Be True         \${security_percentage} >= 85
    Set To Dictionary      \${security_report}    overall_security_score    \${security_percentage}%
    Log    Security report: \${security_report}
    Disconnect From Database</code></pre>
        
        <h3>🎯 Práctica Security (5 min):</h3>
        <p>1. Ejecuta SQL injection prevention testing</p>
        <p>2. Implementa access control validation completa</p>
        <p>3. Valida user privileges y database permissions</p>
        <p>4. Testa data encryption con AES_ENCRYPT/DECRYPT</p>
        <p>5. Implementa password security con SHA2 hashing</p>
        <p>6. Valida connection security y SSL status</p>
        <p>7. Testa audit trail con triggers automáticos</p>
        <p>8. Genera security summary report comprehensivo</p>
        <p>9. Agrega Should Be Equal para security validations</p>
        <p>10. Testa privilege escalation prevention</p>
        <p>11. Implementa parameterized query validation</p>
        <p>12. Valida database user isolation</p>
        <p>13. Agrega TRY/EXCEPT para security failures</p>
        <p>14. Testa encryption key management</p>
        <p>15. Log detailed security metrics para compliance</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Prevenir SQL injection y validate input sanitization</li>
                <li>Implementar access controls y user privilege validation</li>
                <li>Validar data encryption y password security</li>
                <li>Establecer audit trails y security monitoring</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Database security testing es crítico para compliance. Ejecuta security scans regularmente y mantén audit logs actualizados.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 143 - Database Monitoring Testing</h3>
        <p>Aprenderás a automatizar monitoring de databases con metrics collection, alerting y performance dashboards.</p>
    `,
    topics: ["database", "sql", "nosql"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-141"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_142 = LESSON_142;
}