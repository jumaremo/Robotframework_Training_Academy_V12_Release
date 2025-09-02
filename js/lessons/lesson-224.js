/**
 * Robot Framework Academy - Lesson 224
 * Data Pipeline Testing
 */

const LESSON_224 = {
    id: 224,
    title: "Data Pipeline Testing",
    duration: "10 min",
    level: "advanced",
    section: "section-18",
    content: `
        <h2>🔄 Pipelines Datos</h2>
        <p>Testing automatizado de pipelines ETL, big data processing y streaming data con validación distribuida.</p>
        
        <h3>💻 Testing ETL:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    Data Pipeline Testing - ETL & Streaming Validation
Library          SeleniumLibrary
Library          RequestsLibrary
Library          DatabaseLibrary
Library          Collections
Library          DateTime
Library          OperatingSystem
Resource         ../resources/data/etl_validators.robot
Resource         ../resources/streaming/kafka_keywords.robot
Variables        ../config/data_pipelines.yaml
Suite Setup      Initialize Data Pipeline Testing
Suite Teardown   Cleanup Data Pipeline Resources

*** Variables ***
\${SOURCE_DB}             postgresql://user:pass@source-db:5432/source_db
\${TARGET_DB}             postgresql://user:pass@target-db:5432/warehouse
\${STAGING_DB}            postgresql://user:pass@staging-db:5432/staging
\${KAFKA_BROKER}          kafka:9092
\${SPARK_MASTER}          spark://spark-master:7077
\${AIRFLOW_API}           http://airflow:8080/api/v1
\${ELASTICSEARCH_URL}     http://elasticsearch:9200
\${S3_BUCKET}             test-data-pipeline
\${PIPELINE_NAME}         customer_etl_pipeline
\${STREAM_TOPIC}          customer_events
\${BATCH_SIZE}            1000
\${PROCESSING_TIMEOUT}    300
\${DATA_QUALITY_THRESHOLD} 95
\${PIPELINE_CONFIG}       /config/pipeline.yaml

*** Test Cases ***
Test ETL Data Extraction
    [Documentation]    Data extraction validation from source systems
    [Tags]             etl    extraction    data-validation
    
    # Source Data Validation
    Connect To Database       \${SOURCE_DB}
    \${source_count}=         Execute SQL Query    SELECT COUNT(*) FROM customers WHERE updated_date >= CURRENT_DATE
    Should Be True           \${source_count} > 0
    
    # Data Quality Checks
    \${duplicate_check}=      Execute SQL Query    SELECT COUNT(*) FROM customers GROUP BY customer_id HAVING COUNT(*) > 1
    Should Be Equal As Numbers    \${duplicate_check}    0
    
    \${null_check}=           Execute SQL Query    SELECT COUNT(*) FROM customers WHERE customer_id IS NULL OR email IS NULL
    Should Be Equal As Numbers    \${null_check}    0
    
    # Extract Data to Staging
    Trigger ETL Pipeline      extract_phase    \${PIPELINE_NAME}
    Wait For Pipeline Phase   extract_phase    timeout=\${PROCESSING_TIMEOUT}s
    Validate Pipeline Status  extract_phase    status=SUCCESS
    
    # Staging Data Validation
    Connect To Database       \${STAGING_DB}
    \${staging_count}=        Execute SQL Query    SELECT COUNT(*) FROM staging_customers
    Should Be Equal As Numbers    \${staging_count}    \${source_count}

Test Data Transformation
    [Documentation]    Data transformation and enrichment testing
    [Tags]             etl    transformation    business-rules
    
    # Pre-Transformation State
    Connect To Database       \${STAGING_DB}
    \${raw_records}=          Execute SQL Query    SELECT COUNT(*) FROM staging_customers
    
    # Business Rules Validation
    Trigger ETL Pipeline      transform_phase    \${PIPELINE_NAME}
    Wait For Pipeline Phase   transform_phase    timeout=\${PROCESSING_TIMEOUT}s
    Validate Pipeline Status  transform_phase    status=SUCCESS
    
    # Transformation Quality Checks
    \${address_standardized}= Execute SQL Query    SELECT COUNT(*) FROM staging_customers WHERE address_standardized IS NOT NULL
    \${standardization_rate}= Evaluate    \${address_standardized} / \${raw_records} * 100
    Should Be True           \${standardization_rate} >= \${DATA_QUALITY_THRESHOLD}
    
    # Data Enrichment Validation  
    \${enriched_records}=     Execute SQL Query    SELECT COUNT(*) FROM staging_customers WHERE customer_segment IS NOT NULL
    \${enrichment_rate}=      Evaluate    \${enriched_records} / \${raw_records} * 100
    Should Be True           \${enrichment_rate} >= 90
    
    # Business Logic Testing
    \${revenue_calculation}=  Execute SQL Query    SELECT customer_id FROM staging_customers WHERE total_revenue != (SELECT SUM(order_amount) FROM orders WHERE customer_id = staging_customers.customer_id)
    Should Be Equal As Numbers    \${revenue_calculation}    0

Test Data Loading
    [Documentation]    Data warehouse loading and indexing validation
    [Tags]             etl    loading    data-warehouse
    
    # Pre-Load Validation
    Connect To Database       \${TARGET_DB}
    \${initial_count}=        Execute SQL Query    SELECT COUNT(*) FROM customers
    
    # Load Process Testing
    Trigger ETL Pipeline      load_phase    \${PIPELINE_NAME}
    Wait For Pipeline Phase   load_phase    timeout=\${PROCESSING_TIMEOUT}s
    Validate Pipeline Status  load_phase    status=SUCCESS
    
    # Post-Load Validation
    \${final_count}=          Execute SQL Query    SELECT COUNT(*) FROM customers
    \${loaded_records}=       Evaluate    \${final_count} - \${initial_count}
    Should Be True           \${loaded_records} > 0
    
    # Data Integrity Checks
    \${referential_integrity}= Execute SQL Query    SELECT COUNT(*) FROM customers c WHERE NOT EXISTS (SELECT 1 FROM customer_segments cs WHERE cs.segment_id = c.segment_id)
    Should Be Equal As Numbers    \${referential_integrity}    0
    
    # Index Performance Validation
    \${query_time}=           Time SQL Query    SELECT * FROM customers WHERE customer_id = 'TEST001'
    Should Be True           \${query_time} < 100

Test Streaming Data Pipeline
    [Documentation]    Real-time streaming data pipeline testing
    [Tags]             streaming    kafka    real-time
    
    # Kafka Producer Testing
    Create Kafka Producer     \${KAFKA_BROKER}    \${STREAM_TOPIC}
    Send Test Messages        \${STREAM_TOPIC}    count=100    format=json
    Validate Messages Sent    \${STREAM_TOPIC}    expected=100
    
    # Stream Processing Validation
    Create Kafka Consumer     \${KAFKA_BROKER}    \${STREAM_TOPIC}
    Wait For Message Processing    timeout=60s
    \${processed_messages}=   Get Processed Message Count    \${STREAM_TOPIC}
    Should Be Equal As Numbers    \${processed_messages}    100
    
    # Real-time Analytics Testing
    Wait For Analytics Update  customer_analytics    timeout=120s
    \${real_time_count}=      Execute SQL Query    SELECT COUNT(*) FROM customer_analytics WHERE updated_timestamp >= NOW() - INTERVAL '2 minutes'
    Should Be True           \${real_time_count} > 0
    
    # Stream Lag Monitoring
    \${consumer_lag}=         Get Consumer Lag    \${STREAM_TOPIC}    consumer_group=analytics
    Should Be True           \${consumer_lag} < 1000

Test Data Quality Monitoring
    [Documentation]    Automated data quality and monitoring validation
    [Tags]             data-quality    monitoring    alerts
    
    # Data Profiling
    Execute Data Profiling    customers_table    \${TARGET_DB}
    \${profile_results}=      Get Profiling Results    customers_table
    Validate Data Distribution    \${profile_results}    expected_patterns
    
    # Anomaly Detection
    Check Data Anomalies      customers_table    statistical_threshold=2.5
    \${anomaly_count}=        Get Anomaly Count    customers_table
    Should Be True           \${anomaly_count} < 10
    
    # Data Freshness Testing
    \${last_update}=          Execute SQL Query    SELECT MAX(updated_timestamp) FROM customers
    \${freshness_minutes}=    Calculate Time Difference    \${last_update}    NOW()
    Should Be True           \${freshness_minutes} < 60
    
    # Alert System Testing
    Trigger Data Quality Alert    customers_table    threshold_breach
    Validate Alert Triggered     data_quality_alerts    customers_table
    Check Alert Notification     slack_channel=data-alerts    message_contains=customers_table</code></pre>
        
        <h3>🎯 Práctica Pipelines (7 min):</h3>
        <p>1. Configura Apache Airflow para ETL pipeline orchestration</p>
        <p>2. Implementa data validation en cada stage del pipeline</p>
        <p>3. Configura Apache Kafka para streaming data testing</p>
        <p>4. Crea data quality checks con Great Expectations</p>
        <p>5. Implementa schema validation para incoming data</p>
        <p>6. Configura monitoring con Prometheus metrics</p>
        <p>7. Testa data lineage tracking end-to-end</p>
        <p>8. Implementa automated data profiling con pandas</p>
        <p>9. Configura anomaly detection con statistical thresholds</p>
        <p>10. Crea data freshness monitoring automatizado</p>
        <p>11. Implementa backup y recovery testing para pipelines</p>
        <p>12. Configura cross-environment data consistency testing</p>
        <p>13. Testa pipeline performance con large datasets</p>
        <p>14. Implementa data privacy compliance validation</p>
        <p>15. Configura pipeline failure recovery mechanisms</p>
        <p>16. Crea integration testing con external data sources</p>
        <p>17. Implementa streaming lag monitoring automatizado</p>
        <p>18. Configura data retention policy testing</p>
        <p>19. Testa incremental vs full pipeline processing</p>
        <p>20. Implementa data catalog integration testing</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar testing completo de pipelines ETL enterprise</li>
                <li>Configurar streaming data validation con Kafka integration</li>
                <li>Dominar data quality testing y anomaly detection</li>
                <li>Establecer monitoring automatizado de data freshness</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Implementa data lineage tracking desde origen hasta destino - crítico para debugging pipeline issues y compliance auditing.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 225 - Event-Driven Architecture Testing</h3>
        <p>Profundizarás en testing de arquitecturas event-driven con message queues, event sourcing y CQRS patterns.</p>
    `,
    topics: ["enterprise", "architecture", "scalability"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-223"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_224 = LESSON_224;
}