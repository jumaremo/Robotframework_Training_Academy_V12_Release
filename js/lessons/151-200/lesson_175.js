/**
 * Robot Framework Academy - Lesson 175
 * Python Libraries 175
 */

const LESSON_175 = {
    id: 175,
    title: "Python Libraries 175",
    duration: "7 min",
    level: "intermediate",
    section: "section-13",
    content: `
        <h2>🌐 Integración DB y APIs</h2>
        <p>Integra bases de datos, APIs REST y servicios web usando librerías Python especializadas para testing robusto.</p>
        
        <h3>💻 Integración servicios externos:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/IntegrationLibrary.py

*** Variables ***
\${DB_HOST}         localhost
\${DB_PORT}         5432
\${DB_NAME}         testdb
\${DB_USER}         testuser
\${API_BASE_URL}    https://jsonplaceholder.typicode.com
\${AUTH_TOKEN}      Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
\${REDIS_HOST}      localhost
\${ELASTICSEARCH_URL}  http://localhost:9200

*** Test Cases ***
Test Database Integration
    \${db_connection}=    Connect To Database    postgresql    host=\${DB_HOST}    port=\${DB_PORT}    database=\${DB_NAME}
    Should Be True    \${db_connection}[connected]
    Should Be Equal    \${db_connection}[database]    \${DB_NAME}
    \${query_result}=    Execute Database Query    \${db_connection}    SELECT COUNT(*) FROM users
    Should Be True    \${query_result}[success]
    Should Be True    \${query_result}[count] >= 0
    Close Database Connection    \${db_connection}
    Log    Database integration: \${query_result}

Test REST API Integration
    \${api_client}=    Create API Client    \${API_BASE_URL}    auth_token=\${AUTH_TOKEN}
    Should Be Equal    \${api_client}[base_url]    \${API_BASE_URL}
    Should Contain     \${api_client}[headers]    Authorization
    \${get_response}=    API GET Request    \${api_client}    /posts/1
    Should Be Equal As Numbers    \${get_response}[status_code]    200
    Should Contain    \${get_response}[data]    userId
    Log    REST API integration: \${get_response}

Test Redis Cache Integration
    \${redis_client}=    Connect To Redis    host=\${REDIS_HOST}    port=6379    db=0
    Should Be True    \${redis_client}[connected]
    Set Redis Key    \${redis_client}    test_key    test_value    ttl=300
    \${cached_value}=    Get Redis Key    \${redis_client}    test_key
    Should Be Equal    \${cached_value}    test_value
    Delete Redis Key    \${redis_client}    test_key
    Disconnect From Redis    \${redis_client}
    Log    Redis integration: \${cached_value}

Test Elasticsearch Integration
    \${es_client}=    Connect To Elasticsearch    \${ELASTICSEARCH_URL}
    Should Be True    \${es_client}[connected]
    \${index_result}=    Create ES Document    \${es_client}    test_index    {"title": "Test Doc", "content": "Test Content"}
    Should Be True    \${index_result}[created]
    Should Contain    \${index_result}[id]    -
    \${search_result}=    Search ES Documents    \${es_client}    test_index    query=Test Doc
    Should Be True    \${search_result}[found]
    Should Be True    \${search_result}[total] > 0
    Log    Elasticsearch integration: \${search_result}

Test Service Mesh Integration
    \${consul_client}=    Connect To Consul    host=localhost    port=8500
    Register Service    \${consul_client}    test-service    host=localhost    port=8080
    \${service_info}=    Get Service Info    \${consul_client}    test-service
    Should Be Equal    \${service_info}[name]    test-service
    Should Be Equal As Numbers    \${service_info}[port]    8080
    Deregister Service    \${consul_client}    test-service
    Disconnect From Consul    \${consul_client}
    Log    Service mesh integration: \${service_info}</code></pre>
        
        <h3>🎯 Práctica integración servicios (5 min):</h3>
        <p>1. Crea IntegrationLibrary.py con connect_to_database() usando psycopg2</p>
        <p>2. Implementa execute_database_query() con prepared statements</p>
        <p>3. Agrega create_api_client() usando requests session con auth</p>
        <p>4. Crea api_get_request(), api_post_request() con retry logic</p>
        <p>5. Implementa connect_to_redis() usando redis-py client</p>
        <p>6. Agrega set_redis_key(), get_redis_key() con TTL support</p>
        <p>7. Crea connect_to_elasticsearch() usando elasticsearch-py</p>
        <p>8. Implementa create_es_document(), search_es_documents() con mappings</p>
        <p>9. Agrega connect_to_consul() para service discovery</p>
        <p>10. Crea register_service(), get_service_info() para health checks</p>
        <p>11. Usa connection pooling para performance en DB</p>
        <p>12. Implementa circuit breaker pattern para API calls</p>
        <p>13. Agrega timeout y retry logic para servicios externos</p>
        <p>14. Crea health check methods para validar conectividad</p>
        <p>15. Implementa graceful cleanup de conexiones en teardown</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar bases de datos PostgreSQL/MySQL con connection pooling</li>
                <li>Crear clientes REST API robustos con autenticación y retry</li>
                <li>Conectar servicios Redis y Elasticsearch para testing completo</li>
                <li>Implementar service discovery y health checks para microservicios</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa connection pooling para bases de datos y session objects para APIs. Siempre implementa timeout y cleanup para evitar conexiones colgadas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 176 - Python Libraries 176</h3>
        <p>Aprenderás a crear librerías Python con machine learning, análisis de datos y reportes avanzados usando pandas, scikit-learn y matplotlib.</p>
    `,
    topics: ["python", "libraries", "custom"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-174"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_175 = LESSON_175;
}