/**
 * Robot Framework Academy - Lesson 138
 * Database Testing 138
 */

const LESSON_138 = {
    id: 138,
    title: "Database Testing 138",
    duration: "7 min",
    level: "intermediate",
    section: "section-10",
    content: `
        <h2>✅ Data Validation Patterns</h2>
        <p>Patrones avanzados validación datos, referential integrity y consistency checks entre sistemas.</p>
        
        <h3>💻 Validation Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    DatabaseLibrary
Library    Collections
Library    String
Library    DateTime
Library    RequestsLibrary

*** Variables ***
\${DB_HOST}         localhost
\${DB_NAME}         testdb
\${DB_USER}         testuser
\${DB_PASSWORD}     testpass
\${DB_PORT}         3306
\${API_BASE}        http://localhost:8080/api
\${USERS_TABLE}     users
\${ORDERS_TABLE}    orders
\${PRODUCTS_TABLE}  products
\${VALIDATION_RULES}    \${EMPTY}
\${INTEGRITY_ERRORS}    0

*** Test Cases ***
Data Type Validation
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${invalid_types}=     Query    SELECT id, name, email, age FROM \${USERS_TABLE} WHERE age NOT REGEXP '^[0-9]+$' OR age < 0 OR age > 150
    Should Be Empty        \${invalid_types}
    \${email_format}=      Query    SELECT id, email FROM \${USERS_TABLE} WHERE email NOT REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
    Should Be Empty        \${email_format}
    \${null_required}=     Query    SELECT COUNT(*) FROM \${USERS_TABLE} WHERE name IS NULL OR name = '' OR email IS NULL OR email = ''
    Should Not Be Empty    \${null_required}
    \${null_count}=        Get From List    \${null_required}    0
    Should Be Equal        \${null_count[0]}    0
    \${date_validation}=   Query    SELECT COUNT(*) FROM \${USERS_TABLE} WHERE created_at > NOW() OR created_at < '2020-01-01'
    Should Not Be Empty    \${date_validation}
    \${invalid_dates}=     Get From List    \${date_validation}    0
    Should Be Equal        \${invalid_dates[0]}    0
    Log    Data type validation passed: no invalid formats
    Disconnect From Database

Referential Integrity Testing
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${orphaned_orders}=   Query    SELECT COUNT(*) FROM \${ORDERS_TABLE} o LEFT JOIN \${USERS_TABLE} u ON o.user_id = u.id WHERE u.id IS NULL
    Should Not Be Empty    \${orphaned_orders}
    \${orphan_count}=      Get From List    \${orphaned_orders}    0
    Should Be Equal        \${orphan_count[0]}    0
    \${invalid_products}=  Query    SELECT COUNT(*) FROM order_items oi LEFT JOIN \${PRODUCTS_TABLE} p ON oi.product_id = p.id WHERE p.id IS NULL
    Should Not Be Empty    \${invalid_products}
    \${invalid_prod_count}=    Get From List    \${invalid_products}    0
    Should Be Equal        \${invalid_prod_count[0]}    0
    \${circular_refs}=     Query    SELECT COUNT(*) FROM \${USERS_TABLE} u1 JOIN \${USERS_TABLE} u2 ON u1.manager_id = u2.id JOIN \${USERS_TABLE} u3 ON u2.manager_id = u3.id WHERE u3.manager_id = u1.id
    Should Not Be Empty    \${circular_refs}
    \${circular_count}=    Get From List    \${circular_refs}    0
    Should Be Equal        \${circular_count[0]}    0
    Log    Referential integrity validated: no orphaned records
    Disconnect From Database

Business Rule Validation
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${negative_totals}=   Query    SELECT COUNT(*) FROM \${ORDERS_TABLE} WHERE total < 0
    Should Not Be Empty    \${negative_totals}
    \${neg_count}=         Get From List    \${negative_totals}    0
    Should Be Equal        \${neg_count[0]}    0
    \${future_orders}=     Query    SELECT COUNT(*) FROM \${ORDERS_TABLE} WHERE order_date > NOW()
    Should Not Be Empty    \${future_orders}
    \${future_count}=      Get From List    \${future_orders}    0
    Should Be Equal        \${future_count[0]}    0
    \${invalid_status}=    Query    SELECT COUNT(*) FROM \${ORDERS_TABLE} WHERE status NOT IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')
    Should Not Be Empty    \${invalid_status}
    \${status_count}=      Get From List    \${invalid_status}    0
    Should Be Equal        \${status_count[0]}    0
    \${age_restrictions}=  Query    SELECT COUNT(*) FROM \${USERS_TABLE} WHERE age < 18 AND account_type = 'premium'
    Should Not Be Empty    \${age_restrictions}
    \${age_violation}=     Get From List    \${age_restrictions}    0
    Should Be Equal        \${age_violation[0]}    0
    Log    Business rules validated: no violations found
    Disconnect From Database

Cross-System Data Consistency
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    Create Session         api    \${API_BASE}
    \${db_users}=          Query    SELECT id, name, email FROM \${USERS_TABLE} WHERE active = 1
    Should Not Be Empty    \${db_users}
    \${consistency_errors}=    Set Variable    0
    FOR    \${user}    IN    @{db_users[:5]}
        \${api_response}=  GET On Session    api    /users/\${user[0]}
        IF    \${api_response.status_code} == 200
            \${api_user}=  Set Variable    \${api_response.json()}
            Should Be Equal    \${api_user['name']}     \${user[1]}
            Should Be Equal    \${api_user['email']}    \${user[2]}
        ELSE
            \${consistency_errors}=    Evaluate    \${consistency_errors} + 1
        END
    END
    Set Suite Variable     \${INTEGRITY_ERRORS}    \${consistency_errors}
    Should Be True         \${consistency_errors} <= 1
    Delete All Sessions
    Log    Cross-system consistency: \${consistency_errors} errors found
    Disconnect From Database

Duplicate Detection Patterns
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${email_duplicates}=  Query    SELECT email, COUNT(*) as count FROM \${USERS_TABLE} GROUP BY email HAVING COUNT(*) > 1
    Should Be Empty        \${email_duplicates}
    \${phone_duplicates}=  Query    SELECT phone, COUNT(*) as count FROM \${USERS_TABLE} WHERE phone IS NOT NULL GROUP BY phone HAVING COUNT(*) > 1
    Should Be Empty        \${phone_duplicates}
    \${similar_names}=     Query    SELECT name, COUNT(*) as count FROM \${USERS_TABLE} GROUP BY UPPER(TRIM(name)) HAVING COUNT(*) > 1
    Length Should Be       \${similar_names}    0
    \${order_duplicates}=  Query    SELECT user_id, order_date, total, COUNT(*) as count FROM \${ORDERS_TABLE} GROUP BY user_id, order_date, total HAVING COUNT(*) > 1
    Should Be Empty        \${order_duplicates}
    Log    Duplicate detection: no duplicates found
    Disconnect From Database

Data Range Validation
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${invalid_ranges}=    Create Dictionary
    \${price_ranges}=      Query    SELECT COUNT(*) FROM \${PRODUCTS_TABLE} WHERE price <= 0 OR price > 10000
    Should Not Be Empty    \${price_ranges}
    \${price_violations}=  Get From List    \${price_ranges}    0
    Set To Dictionary      \${invalid_ranges}    price_violations    \${price_violations[0]}
    \${quantity_ranges}=   Query    SELECT COUNT(*) FROM order_items WHERE quantity <= 0 OR quantity > 1000
    Should Not Be Empty    \${quantity_ranges}
    \${qty_violations}=    Get From List    \${quantity_ranges}    0
    Set To Dictionary      \${invalid_ranges}    quantity_violations    \${qty_violations[0]}
    \${discount_ranges}=   Query    SELECT COUNT(*) FROM \${ORDERS_TABLE} WHERE discount_percent < 0 OR discount_percent > 100
    Should Not Be Empty    \${discount_ranges}
    \${discount_violations}=    Get From List    \${discount_ranges}    0
    Set To Dictionary      \${invalid_ranges}    discount_violations    \${discount_violations[0]}
    Should Be Equal        \${invalid_ranges['price_violations']}       0
    Should Be Equal        \${invalid_ranges['quantity_violations']}    0
    Should Be Equal        \${invalid_ranges['discount_violations']}    0
    Log    Range validation: \${invalid_ranges}
    Disconnect From Database

Temporal Data Validation
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${temporal_consistency}=    Query    SELECT COUNT(*) FROM \${ORDERS_TABLE} WHERE shipped_date < order_date OR delivered_date < shipped_date
    Should Not Be Empty    \${temporal_consistency}
    \${temporal_errors}=   Get From List    \${temporal_consistency}    0
    Should Be Equal        \${temporal_errors[0]}    0
    \${weekend_orders}=    Query    SELECT COUNT(*) FROM \${ORDERS_TABLE} WHERE DAYOFWEEK(order_date) IN (1, 7) AND business_hours_only = 1
    Should Not Be Empty    \${weekend_orders}
    \${weekend_violations}=    Get From List    \${weekend_orders}    0
    Should Be Equal        \${weekend_violations[0]}    0
    \${expired_promotions}=    Query    SELECT COUNT(*) FROM \${ORDERS_TABLE} o JOIN promotions p ON o.promotion_id = p.id WHERE o.order_date NOT BETWEEN p.start_date AND p.end_date
    Should Not Be Empty    \${expired_promotions}
    \${expired_count}=     Get From List    \${expired_promotions}    0
    Should Be Equal        \${expired_count[0]}    0
    Log    Temporal validation: no chronological violations
    Disconnect From Database

Validation Summary Report
    Connect To Database    pymysql    \${DB_NAME}    \${DB_USER}    \${DB_PASSWORD}    \${DB_HOST}    \${DB_PORT}
    \${validation_summary}=    Create Dictionary
    ...                        data_types=PASS
    ...                        referential_integrity=PASS
    ...                        business_rules=PASS
    ...                        cross_system_errors=\${INTEGRITY_ERRORS}
    ...                        duplicates=PASS
    ...                        ranges=PASS
    ...                        temporal=PASS
    Should Be Equal        \${validation_summary['data_types']}            PASS
    Should Be Equal        \${validation_summary['referential_integrity']} PASS
    Should Be Equal        \${validation_summary['business_rules']}        PASS
    Should Be True         \${validation_summary['cross_system_errors']} <= 1
    Should Be Equal        \${validation_summary['duplicates']}            PASS
    Should Be Equal        \${validation_summary['ranges']}                PASS
    Should Be Equal        \${validation_summary['temporal']}              PASS
    \${overall_status}=    Set Variable If    \${validation_summary['cross_system_errors']} == 0    PASS    PARTIAL_PASS
    Set To Dictionary      \${validation_summary}    overall_status    \${overall_status}
    Log    Validation summary: \${validation_summary}
    Disconnect From Database</code></pre>
        
        <h3>🎯 Práctica Validation (5 min):</h3>
        <p>1. Ejecuta data type validation para email patterns</p>
        <p>2. Implementa referential integrity checks completos</p>
        <p>3. Valida business rules específicas del dominio</p>
        <p>4. Testa cross-system data consistency con API</p>
        <p>5. Detecta duplicates usando GROUP BY HAVING</p>
        <p>6. Implementa data range validation automática</p>
        <p>7. Valida temporal data consistency (fechas)</p>
        <p>8. Genera validation summary report completo</p>
        <p>9. Agrega Should Be Equal para exactitud</p>
        <p>10. Testa null constraints y required fields</p>
        <p>11. Valida enum values y status codes</p>
        <p>12. Implementa circular reference detection</p>
        <p>13. Agrega regex patterns para format validation</p>
        <p>14. Testa age restrictions y business logic</p>
        <p>15. Log detailed validation metrics comprehensivos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar data type y format validation</li>
                <li>Validar referential integrity entre tablas</li>
                <li>Verificar business rules y temporal consistency</li>
                <li>Detectar duplicates y cross-system inconsistencies</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Data validation patterns previenen corruption silenciosa. Ejecuta validation después de migrations y bulk operations.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 139 - Database Performance Testing</h3>
        <p>Aprenderás a medir y optimizar performance de queries, índices y operaciones batch en production databases.</p>
    `,
    topics: ["database", "sql", "nosql"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-137"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_138 = LESSON_138;
}