/**
 * Robot Framework Academy - Lesson 137
 * Database Testing 137
 */

const LESSON_137 = {
    id: 137,
    title: "Database Testing 137",
    duration: "7 min",
    level: "intermediate",
    section: "section-10",
    content: `
        <h2>📄 NoSQL Testing</h2>
        <p>Automatización testing MongoDB, Redis y bases NoSQL con document validation y aggregation pipelines.</p>
        
        <h3>💻 NoSQL Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    Collections
Library    String
Library    DateTime
Library    Process
Library    OperatingSystem

*** Variables ***
\${MONGO_HOST}      localhost
\${MONGO_PORT}      27017
\${MONGO_DB}        testdb
\${MONGO_COLLECTION}    users
\${REDIS_HOST}      localhost
\${REDIS_PORT}      6379
\${REDIS_DB}        0
\${DOCUMENT_ID}     \${EMPTY}
\${REDIS_KEY}       test_key
\${PIPELINE_RESULTS}    \${EMPTY}

*** Test Cases ***
MongoDB Connection Test
    \${mongo_cmd}=       Set Variable    mongo --host \${MONGO_HOST}:\${MONGO_PORT} --eval "db.serverStatus().ok"
    \${result}=          Run Process    \${mongo_cmd}    shell=True
    Should Be Equal      \${result.rc}    0
    Should Contain       \${result.stdout}    1
    \${version_cmd}=     Set Variable    mongo --host \${MONGO_HOST}:\${MONGO_PORT} --eval "db.version()"
    \${version_result}=  Run Process    \${version_cmd}    shell=True
    Should Be Equal      \${version_result.rc}    0
    Should Not Be Empty  \${version_result.stdout}
    Should Contain       \${version_result.stdout}    .
    Log    MongoDB connected: \${version_result.stdout}

Document Insertion Testing
    \${timestamp}=       Get Current Date    result_format=%Y%m%d_%H%M%S
    \${user_doc}=        Set Variable    {"name": "Test User \${timestamp}", "email": "test\${timestamp}@example.com", "age": 25, "active": true, "created_at": new Date()}
    \${insert_cmd}=      Set Variable    mongo \${MONGO_DB} --eval "db.\${MONGO_COLLECTION}.insertOne(\${user_doc})"
    \${insert_result}=   Run Process    \${insert_cmd}    shell=True
    Should Be Equal      \${insert_result.rc}    0
    Should Contain       \${insert_result.stdout}    acknowledged
    Should Contain       \${insert_result.stdout}    insertedId
    \${find_cmd}=        Set Variable    mongo \${MONGO_DB} --eval "db.\${MONGO_COLLECTION}.findOne({email: 'test\${timestamp}@example.com'})"
    \${find_result}=     Run Process    \${find_cmd}    shell=True
    Should Be Equal      \${find_result.rc}    0
    Should Contain       \${find_result.stdout}    test\${timestamp}@example.com
    Should Contain       \${find_result.stdout}    ObjectId
    Log    Document inserted successfully: \${timestamp}

Document Query Validation
    \${query_cmd}=       Set Variable    mongo \${MONGO_DB} --eval "db.\${MONGO_COLLECTION}.find({active: true}).count()"
    \${query_result}=    Run Process    \${query_cmd}    shell=True
    Should Be Equal      \${query_result.rc}    0
    Should Not Be Empty  \${query_result.stdout}
    \${count_line}=      Get Lines Containing String    \${query_result.stdout}    ^[0-9]+$
    Should Not Be Empty  \${count_line}
    \${active_users}=    Get Line    \${query_result.stdout}    -1
    Should Be True       \${active_users} >= 0
    \${range_cmd}=       Set Variable    mongo \${MONGO_DB} --eval "db.\${MONGO_COLLECTION}.find({age: {\$gte: 18, \$lte: 65}}).count()"
    \${range_result}=    Run Process    \${range_cmd}    shell=True
    Should Be Equal      \${range_result.rc}    0
    Log    Query validation: \${active_users} active users

Document Update Testing
    \${update_cmd}=      Set Variable    mongo \${MONGO_DB} --eval "db.\${MONGO_COLLECTION}.updateMany({active: true}, {\$set: {last_updated: new Date(), status: 'verified'}})"
    \${update_result}=   Run Process    \${update_cmd}    shell=True
    Should Be Equal      \${update_result.rc}    0
    Should Contain       \${update_result.stdout}    acknowledged
    Should Contain       \${update_result.stdout}    modifiedCount
    \${verify_cmd}=      Set Variable    mongo \${MONGO_DB} --eval "db.\${MONGO_COLLECTION}.find({status: 'verified'}).count()"
    \${verify_result}=   Run Process    \${verify_cmd}    shell=True
    Should Be Equal      \${verify_result.rc}    0
    \${verified_count}=  Get Line    \${verify_result.stdout}    -1
    Should Be True       \${verified_count} > 0
    Log    Update completed: \${verified_count} documents verified

Aggregation Pipeline Testing
    \${pipeline}=        Set Variable    [{\$match: {active: true}}, {\$group: {_id: null, avgAge: {\$avg: "\$age"}, totalUsers: {\$sum: 1}}}, {\$project: {_id: 0, avgAge: 1, totalUsers: 1}}]
    \${agg_cmd}=         Set Variable    mongo \${MONGO_DB} --eval "db.\${MONGO_COLLECTION}.aggregate(\${pipeline}).toArray()"
    \${agg_result}=      Run Process    \${agg_cmd}    shell=True
    Should Be Equal      \${agg_result.rc}    0
    Should Contain       \${agg_result.stdout}    avgAge
    Should Contain       \${agg_result.stdout}    totalUsers
    Set Suite Variable   \${PIPELINE_RESULTS}    \${agg_result.stdout}
    \${group_pipeline}=  Set Variable    [{\$group: {_id: "\$status", count: {\$sum: 1}}}, {\$sort: {count: -1}}]
    \${group_cmd}=       Set Variable    mongo \${MONGO_DB} --eval "db.\${MONGO_COLLECTION}.aggregate(\${group_pipeline}).toArray()"
    \${group_result}=    Run Process    \${group_cmd}    shell=True
    Should Be Equal      \${group_result.rc}    0
    Should Contain       \${group_result.stdout}    _id
    Should Contain       \${group_result.stdout}    count
    Log    Aggregation pipeline executed successfully

Index Performance Testing
    \${index_cmd}=       Set Variable    mongo \${MONGO_DB} --eval "db.\${MONGO_COLLECTION}.createIndex({email: 1, active: 1})"
    \${index_result}=    Run Process    \${index_cmd}    shell=True
    Should Be Equal      \${index_result.rc}    0
    Should Contain       \${index_result.stdout}    ok
    \${explain_cmd}=     Set Variable    mongo \${MONGO_DB} --eval "db.\${MONGO_COLLECTION}.find({email: /test.*@example.com/}).explain('executionStats')"
    \${explain_result}=  Run Process    \${explain_cmd}    shell=True
    Should Be Equal      \${explain_result.rc}    0
    Should Contain       \${explain_result.stdout}    executionStats
    Should Contain       \${explain_result.stdout}    totalDocsExamined
    \${indexes_cmd}=     Set Variable    mongo \${MONGO_DB} --eval "db.\${MONGO_COLLECTION}.getIndexes()"
    \${indexes_result}=  Run Process    \${indexes_cmd}    shell=True
    Should Be Equal      \${indexes_result.rc}    0
    Should Contain       \${indexes_result.stdout}    email_1_active_1
    Log    Index performance validated

Redis Connection Testing
    \${redis_ping}=      Set Variable    redis-cli -h \${REDIS_HOST} -p \${REDIS_PORT} ping
    \${ping_result}=     Run Process    \${redis_ping}    shell=True
    Should Be Equal      \${ping_result.rc}    0
    Should Contain       \${ping_result.stdout}    PONG
    \${redis_info}=      Set Variable    redis-cli -h \${REDIS_HOST} -p \${REDIS_PORT} info server
    \${info_result}=     Run Process    \${redis_info}    shell=True
    Should Be Equal      \${info_result.rc}    0
    Should Contain       \${info_result.stdout}    redis_version
    Should Contain       \${info_result.stdout}    tcp_port
    Log    Redis connected successfully

Redis Data Operations
    \${set_cmd}=         Set Variable    redis-cli -h \${REDIS_HOST} -p \${REDIS_PORT} set \${REDIS_KEY} "test_value_123"
    \${set_result}=      Run Process    \${set_cmd}    shell=True
    Should Be Equal      \${set_result.rc}    0
    Should Contain       \${set_result.stdout}    OK
    \${get_cmd}=         Set Variable    redis-cli -h \${REDIS_HOST} -p \${REDIS_PORT} get \${REDIS_KEY}
    \${get_result}=      Run Process    \${get_cmd}    shell=True
    Should Be Equal      \${get_result.rc}    0
    Should Contain       \${get_result.stdout}    test_value_123
    \${expire_cmd}=      Set Variable    redis-cli -h \${REDIS_HOST} -p \${REDIS_PORT} expire \${REDIS_KEY} 300
    \${expire_result}=   Run Process    \${expire_cmd}    shell=True
    Should Be Equal      \${expire_result.rc}    0
    Should Contain       \${expire_result.stdout}    1
    \${ttl_cmd}=         Set Variable    redis-cli -h \${REDIS_HOST} -p \${REDIS_PORT} ttl \${REDIS_KEY}
    \${ttl_result}=      Run Process    \${ttl_cmd}    shell=True
    Should Be Equal      \${ttl_result.rc}    0
    Should Be True       \${ttl_result.stdout} <= 300
    Log    Redis operations: set, get, expire, ttl validated

NoSQL Performance Comparison
    \${mongo_perf_cmd}=  Set Variable    mongo \${MONGO_DB} --eval "var start = new Date(); db.\${MONGO_COLLECTION}.find({active: true}); var end = new Date(); print('MongoDB query time: ' + (end - start) + 'ms')"
    \${mongo_perf}=      Run Process    \${mongo_perf_cmd}    shell=True
    Should Be Equal      \${mongo_perf.rc}    0
    Should Contain       \${mongo_perf.stdout}    MongoDB query time
    \${redis_perf_cmd}=  Set Variable    redis-cli -h \${REDIS_HOST} -p \${REDIS_PORT} --latency-history -i 1
    \${redis_perf}=      Run Process    \${redis_perf_cmd}    shell=True    timeout=3s
    Should Contain       \${redis_perf.stdout}    latency
    \${cleanup_cmd}=     Set Variable    redis-cli -h \${REDIS_HOST} -p \${REDIS_PORT} del \${REDIS_KEY}
    \${cleanup_result}=  Run Process    \${cleanup_cmd}    shell=True
    Should Be Equal      \${cleanup_result.rc}    0
    Log    Performance comparison completed</code></pre>
        
        <h3>🎯 Práctica NoSQL (5 min):</h3>
        <p>1. Instala MongoDB y Redis en tu sistema local</p>
        <p>2. Ejecuta MongoDB connection test y valida version</p>
        <p>3. Implementa document insertion con timestamps únicos</p>
        <p>4. Testa document queries con filtros complejos</p>
        <p>5. Valida document updates usando $set operator</p>
        <p>6. Ejecuta aggregation pipelines con $match y $group</p>
        <p>7. Crea indexes y analiza performance con explain()</p>
        <p>8. Conecta a Redis y ejecuta PING command</p>
        <p>9. Testa Redis SET/GET operations básicas</p>
        <p>10. Implementa key expiration con TTL</p>
        <p>11. Compara performance MongoDB vs Redis</p>
        <p>12. Agrega Should Contain para output validation</p>
        <p>13. Experimenta con different aggregation stages</p>
        <p>14. Valida que Run Process retorna rc=0</p>
        <p>15. Log detailed NoSQL metrics para monitoring</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar MongoDB document operations y queries</li>
                <li>Implementar aggregation pipelines complejas</li>
                <li>Automatizar Redis key-value operations</li>
                <li>Comparar performance entre NoSQL technologies</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>NoSQL databases escalan horizontalmente mejor que SQL. Usa aggregation pipelines para analytics complejas en MongoDB.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 138 - Data Validation Patterns</h3>
        <p>Aprenderás patrones avanzados de validación de datos, referential integrity y consistency checks entre sistemas.</p>
    `,
    topics: ["database", "sql", "nosql"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-136"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_137 = LESSON_137;
}