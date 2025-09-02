/**
 * Robot Framework Academy - Lesson 187
 * Reporting 187
 */

const LESSON_187 = {
    id: 187,
    title: "Reporting 187",
    duration: "7 min",
    level: "intermediate",
    section: "section-14",
    content: `
        <h2>🔗 Integración BI Enterprise</h2>
        <p>Conecta con herramientas BI corporativas, automatiza pipelines de datos y integra sistemas enterprise para reporting unificado.</p>
        
        <h3>💻 Integración BI corporativa:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/BIIntegrationLibrary.py

*** Variables ***
\${BI_PLATFORMS}    ["tableau", "power_bi", "qlik_sense", "looker"]
\${DATA_WAREHOUSES} ["snowflake", "redshift", "bigquery", "azure_synapse"]
\${ETL_TOOLS}       ["informatica", "talend", "azure_data_factory", "airflow"]
\${TABLEAU_SERVER}  https://tableau.company.com
\${POWERBI_WORKSPACE} qa-automation-workspace
\${DATA_REFRESH_INTERVAL} 3600
\${PIPELINE_CONFIG} ./config/data_pipeline.yaml

*** Test Cases ***
Test Tableau Integration
    \${tableau_client}=    Connect To Tableau Server    server=\${TABLEAU_SERVER}    auth_token=Bearer_token_123
    Should Be True    \${tableau_client}[connected]
    Should Contain    \${tableau_client}[server_url]    tableau.company.com
    \${data_source}=    Create Tableau Data Source    \${tableau_client}    name=QA_Metrics    connection_type=live
    Should Be True    \${data_source}[created]
    Should Be Equal    \${data_source}[connection_type]    live
    \${workbook}=    Publish Tableau Workbook    \${tableau_client}    file=qa_dashboard.twbx    project=QA_Analytics
    Should Be True    \${workbook}[published]
    Should Contain    \${workbook}[project]    QA_Analytics
    \${refresh_status}=    Trigger Data Refresh    \${tableau_client}    data_source=\${data_source}[id]
    Should Be True    \${refresh_status}[triggered]
    Should Be Equal    \${refresh_status}[status]    processing
    \${extract_update}=    Schedule Extract Update    \${tableau_client}    schedule=daily    time=06:00
    Should Be True    \${extract_update}[scheduled]
    Log    Tableau integration: \${workbook}

Test Power BI Integration
    \${powerbi_client}=    Connect To Power BI    workspace=\${POWERBI_WORKSPACE}    service_principal=true
    Should Be True    \${powerbi_client}[connected]
    Should Be Equal    \${powerbi_client}[workspace]    \${POWERBI_WORKSPACE}
    Should Be True    \${powerbi_client}[service_principal_auth]
    \${dataset}=    Create Power BI Dataset    \${powerbi_client}    name=QA_Test_Results    schema=qa_metrics_schema.json
    Should Be True    \${dataset}[created]
    Should Contain    \${dataset}[schema]    test_execution_date
    \${data_push}=    Push Data To Dataset    \${powerbi_client}    dataset_id=\${dataset}[id]    data=test_results.json
    Should Be True    \${data_push}[pushed]
    Should Be True    \${data_push}[rows_affected] > 0
    \${report}=    Create Power BI Report    \${powerbi_client}    dataset=\${dataset}[id]    template=qa_template.pbix
    Should Be True    \${report}[created]
    Should Contain    \${report}[pages]    executive_summary
    \${app_deployment}=    Deploy To Power BI App    \${powerbi_client}    report=\${report}[id]    app_name=QA_Automation_Dashboard
    Should Be True    \${app_deployment}[deployed]
    Log    Power BI integration: \${report}

Test Data Warehouse Connection
    \${warehouse_client}=    Connect To Data Warehouse    type=snowflake    host=company.snowflakecomputing.com    warehouse=QA_WH
    Should Be True    \${warehouse_client}[connected]
    Should Contain    \${warehouse_client}[host]    snowflakecomputing.com
    Should Be Equal    \${warehouse_client}[warehouse]    QA_WH
    \${table_creation}=    Create Analytics Table    \${warehouse_client}    table=qa_test_metrics    schema=analytics_schema.sql
    Should Be True    \${table_creation}[created]
    Should Contain    \${table_creation}[columns]    execution_timestamp
    \${data_load}=    Load Test Data    \${warehouse_client}    table=qa_test_metrics    source=robot_framework_logs
    Should Be True    \${data_load}[loaded]
    Should Be True    \${data_load}[records_inserted] > 0
    \${view_creation}=    Create Analytics View    \${warehouse_client}    view=qa_dashboard_metrics    aggregation=daily
    Should Be True    \${view_creation}[created]
    Should Be Equal    \${view_creation}[aggregation_level]    daily
    Log    Data warehouse connection: \${table_creation}

Test ETL Pipeline Automation
    \${etl_engine}=    Initialize ETL Pipeline    tool=airflow    config_file=\${PIPELINE_CONFIG}
    Should Be True    \${etl_engine}[initialized]
    Should Contain    \${etl_engine}[config_file]    data_pipeline.yaml
    \${extraction_task}=    Create Extraction Task    \${etl_engine}    source=robot_framework_logs    schedule=hourly
    Should Be True    \${extraction_task}[created]
    Should Be Equal    \${extraction_task}[schedule]    hourly
    \${transformation_task}=    Create Transformation Task    \${etl_engine}    logic=test_metrics_transformation.py
    Should Be True    \${transformation_task}[created]
    Should Contain    \${transformation_task}[logic_file]    test_metrics_transformation.py
    \${loading_task}=    Create Loading Task    \${etl_engine}    target=data_warehouse    table=qa_metrics
    Should Be True    \${loading_task}[created]
    Should Be Equal    \${loading_task}[target_table]    qa_metrics
    \${pipeline_execution}=    Execute ETL Pipeline    \${etl_engine}    tasks=[\${extraction_task}, \${transformation_task}, \${loading_task}]
    Should Be True    \${pipeline_execution}[executed]
    Should Be Equal As Numbers    \${pipeline_execution}[tasks_completed]    3
    Log    ETL pipeline automation: \${pipeline_execution}

Test Real Time Data Streaming
    \${streaming_client}=    Setup Real Time Streaming    platform=kafka    topic=qa_test_results
    Should Be True    \${streaming_client}[setup]
    Should Be Equal    \${streaming_client}[topic]    qa_test_results
    \${producer_config}=    Configure Stream Producer    \${streaming_client}    batch_size=100    compression=gzip
    Should Be True    \${producer_config}[configured]
    Should Be Equal As Numbers    \${producer_config}[batch_size]    100
    \${consumer_config}=    Configure Stream Consumer    \${streaming_client}    consumer_group=bi_analytics    auto_commit=true
    Should Be True    \${consumer_config}[configured]
    Should Be Equal    \${consumer_config}[consumer_group]    bi_analytics
    \${stream_test}=    Test Stream Flow    \${streaming_client}    test_messages=50
    Should Be True    \${stream_test}[tested]
    Should Be Equal As Numbers    \${stream_test}[messages_processed]    50
    \${bi_connector}=    Connect Stream To BI    \${streaming_client}    target_platform=tableau    real_time_dashboard=true
    Should Be True    \${bi_connector}[connected]
    Should Be True    \${bi_connector}[real_time_dashboard]
    Log    Real time data streaming: \${stream_test}</code></pre>
        
        <h3>🎯 Práctica integración BI (5 min):</h3>
        <p>1. Crea BIIntegrationLibrary.py con connect_to_tableau_server() usando tableauserverclient</p>
        <p>2. Implementa create_tableau_data_source() con live/extract connections</p>
        <p>3. Agrega publish_tableau_workbook() con project management</p>
        <p>4. Crea connect_to_power_bi() usando service principal authentication</p>
        <p>5. Implementa create_power_bi_dataset() con schema validation</p>
        <p>6. Agrega push_data_to_dataset() con batch processing</p>
        <p>7. Crea connect_to_data_warehouse() con multi-platform support</p>
        <p>8. Implementa create_analytics_table() con optimized schemas</p>
        <p>9. Agrega load_test_data() con incremental loading</p>
        <p>10. Crea initialize_etl_pipeline() con workflow orchestration</p>
        <p>11. Implementa create_extraction_task() con scheduling</p>
        <p>12. Agrega create_transformation_task() con data quality checks</p>
        <p>13. Crea setup_real_time_streaming() con Kafka/EventHub</p>
        <p>14. Implementa configure_stream_producer() con reliability</p>
        <p>15. Agrega connect_stream_to_bi() con real-time dashboards</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar datos de testing con plataformas BI enterprise</li>
                <li>Automatizar pipelines ETL para data warehouses corporativos</li>
                <li>Implementar streaming en tiempo real a dashboards ejecutivos</li>
                <li>Crear conectores robustos con sistemas BI multi-vendor</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa service principals para autenticación robusta en BI. Siempre implementa retry logic y error handling para pipelines de datos críticos en producción.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 188 - Reporting 188</h3>
        <p>Aprenderás técnicas avanzadas de alerting automático, monitoring de KPIs críticos y escalación inteligente para stakeholders ejecutivos.</p>
    `,
    topics: ["reporting", "analytics", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-186"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_187 = LESSON_187;
}