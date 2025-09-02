/**
 * Robot Framework Academy - Lesson 205
 * Performance 205
 */

const LESSON_205 = {
    id: 205,
    title: "Performance 205",
    duration: "10 min",
    level: "advanced",
    section: "section-16",
    content: `
        <h2>📊 Dashboards Enterprise</h2>
        <p>Crea dashboards ejecutivos con métricas de performance en tiempo real para stakeholders.</p>
        
        <h3>💻 Métricas Dashboard:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    📊 ENTERPRISE PERFORMANCE DASHBOARDS & METRICS
Library          RequestsLibrary
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          Process
Library          JSON
Suite Setup      Initialize Dashboard Environment
Suite Teardown   Publish Dashboard Reports

*** Variables ***
\${GRAFANA_URL}        http://grafana.company.com:3000
\${INFLUXDB_URL}       http://influxdb.company.com:8086
\${DASHBOARD_API}      \${GRAFANA_URL}/api/dashboards
\${METRICS_DB}         performance_metrics
\${ALERT_THRESHOLD}    95.0
\${SLA_TARGET}         99.5
\${DASHBOARD_JSON}     dashboard_config.json
\${METRICS_LOG}        performance_metrics.log
&{KPI_TARGETS}         response_time=1500    throughput=200    availability=99.9    error_rate=0.5

*** Test Cases ***
Collect Performance Metrics
    [Documentation]    Recopila métricas de múltiples fuentes para dashboard
    [Tags]             metrics    collection    monitoring
    
    # Inicializar sesión con InfluxDB
    Create Session         influxdb    \${INFLUXDB_URL}
    \${headers}=           Create Dictionary    Content-Type=application/x-www-form-urlencoded
    
    # Métricas de aplicación web
    \${app_start}=         Get Current Date    result_format=epoch
    \${response}=          GET    \${APP_URL}/health    timeout=10
    \${app_end}=           Get Current Date    result_format=epoch
    \${app_response_time}= Evaluate    (\${app_end} - \${app_start}) * 1000
    
    Should Be Equal        \${response.status_code}    200
    Should Be True         \${app_response_time} < \${KPI_TARGETS.response_time}
    
    # Enviar métrica a InfluxDB
    \${metric_data}=       Set Variable    performance,service=web response_time=\${app_response_time}i
    POST On Session        influxdb    /write?db=\${METRICS_DB}    data=\${metric_data}    headers=\${headers}
    
    Log                    App response time: \${app_response_time}ms
    Append To File         \${METRICS_LOG}    WEB_RESPONSE,\${app_response_time}\\n
    
    # Métricas de base de datos
    \${db_start}=          Get Current Date    result_format=epoch
    \${db_result}=         Query Database    SELECT COUNT(*) FROM active_sessions
    \${db_end}=            Get Current Date    result_format=epoch
    \${db_query_time}=     Evaluate    (\${db_end} - \${db_start}) * 1000
    
    Should Be True         \${db_query_time} < 100
    \${active_sessions}=   Set Variable    \${db_result[0][0]}
    
    # Enviar métricas DB a InfluxDB
    \${db_metric}=         Set Variable    performance,service=database query_time=\${db_query_time}i,active_sessions=\${active_sessions}i
    POST On Session        influxdb    /write?db=\${METRICS_DB}    data=\${db_metric}    headers=\${headers}
    
    Log                    DB query time: \${db_query_time}ms, Active sessions: \${active_sessions}

Create Executive Dashboard
    [Documentation]    Genera dashboard Grafana para ejecutivos
    [Tags]             dashboard    grafana    executive
    
    # Configuración del dashboard ejecutivo
    \${dashboard_config}=  Create Dictionary    
    ...                    title=Executive Performance Dashboard
    ...                    tags=@{['executive', 'performance', 'kpis']}
    ...                    timezone=UTC
    ...                    refresh=30s
    
    # Panel de respuesta tiempo promedio
    \${response_time_panel}=  Create Dictionary
    ...                       id=1
    ...                       title=Average Response Time
    ...                       type=singlestat
    ...                       datasource=InfluxDB
    ...                       targets=@{[{'measurement': 'performance', 'select': [['mean', ['response_time']]], 'groupBy': [['time', ['1m']]]}]}
    
    # Panel de throughput
    \${throughput_panel}=  Create Dictionary
    ...                    id=2
    ...                    title=Requests per Second
    ...                    type=graph
    ...                    datasource=InfluxDB
    ...                    yAxes=@{[{'label': 'req/s', 'min': 0}]}
    
    # Panel de disponibilidad
    \${availability_panel}=  Create Dictionary
    ...                      id=3
    ...                      title=Service Availability
    ...                      type=singlestat
    ...                      datasource=InfluxDB
    ...                      format=percent
    ...                      colorValue=True
    ...                      thresholds=95,99
    
    # Panel de errores
    \${error_rate_panel}=  Create Dictionary
    ...                    id=4
    ...                    title=Error Rate
    ...                    type=graph
    ...                    datasource=InfluxDB
    ...                    alert=@{[{'conditions': [{'query': {'model': 'A'}, 'reducer': {'type': 'avg'}, 'evaluator': {'type': 'gt', 'params': [1.0]}}]}]}
    
    # Crear estructura completa del dashboard
    @{panels}=             Create List    \${response_time_panel}    \${throughput_panel}    \${availability_panel}    \${error_rate_panel}
    Set To Dictionary      \${dashboard_config}    panels=\${panels}
    
    # Guardar configuración
    \${dashboard_json}=    Evaluate    json.dumps(\${dashboard_config}, indent=2)
    Create File            \${DASHBOARD_JSON}    \${dashboard_json}
    File Should Exist      \${DASHBOARD_JSON}
    
    Log                    Executive dashboard configuration created

Deploy Dashboard To Grafana
    [Documentation]    Despliega dashboard en servidor Grafana
    [Tags]             deployment    grafana    automation
    
    # Autenticación con Grafana API
    Create Session         grafana    \${GRAFANA_URL}
    \${auth_headers}=      Create Dictionary    Authorization=Bearer \${GRAFANA_API_KEY}    Content-Type=application/json
    
    # Cargar configuración del dashboard
    \${dashboard_data}=    Get File    \${DASHBOARD_JSON}
    \${dashboard_dict}=    Evaluate    json.loads(r'''\${dashboard_data}''')
    
    # Preparar payload para Grafana API
    \${deploy_payload}=    Create Dictionary    dashboard=\${dashboard_dict}    overwrite=True
    \${deploy_json}=       Evaluate    json.dumps(\${deploy_payload})
    
    # Desplegar dashboard
    \${deploy_response}=   POST On Session    grafana    /api/dashboards/db    data=\${deploy_json}    headers=\${auth_headers}
    Should Be Equal        \${deploy_response.status_code}    200
    
    # Verificar deployment exitoso
    \${response_data}=     Set Variable    \${deploy_response.json()}
    Should Contain         \${response_data}    id
    Should Contain         \${response_data}    url
    
    \${dashboard_id}=      Set Variable    \${response_data['id']}
    \${dashboard_url}=     Set Variable    \${GRAFANA_URL}\${response_data['url']}
    
    Log                    Dashboard deployed successfully
    Log                    Dashboard ID: \${dashboard_id}
    Log                    Dashboard URL: \${dashboard_url}
    Set Global Variable    \${DASHBOARD_URL}    \${dashboard_url}

Configure Performance Alerts
    [Documentation]    Configura alertas automáticas basadas en SLA
    [Tags]             alerts    sla    monitoring
    
    # Configurar alerta de tiempo de respuesta
    \${response_alert}=    Create Dictionary
    ...                    name=High Response Time Alert
    ...                    message=Response time exceeded SLA threshold
    ...                    frequency=1m
    ...                    conditions=@{[{'query': {'model': 'A', 'params': ['1m', 'now']}, 'reducer': {'type': 'avg'}, 'evaluator': {'type': 'gt', 'params': [\${KPI_TARGETS.response_time}]}}]}
    ...                    executionErrorState=alerting
    ...                    noDataState=no_data
    
    # Configurar alerta de disponibilidad
    \${availability_alert}=  Create Dictionary
    ...                      name=Service Availability Alert
    ...                      message=Service availability below SLA
    ...                      frequency=1m
    ...                      conditions=@{[{'query': {'model': 'B', 'params': ['5m', 'now']}, 'reducer': {'type': 'avg'}, 'evaluator': {'type': 'lt', 'params': [\${KPI_TARGETS.availability}]}}]}
    
    # Configurar alerta de error rate
    \${error_alert}=       Create Dictionary
    ...                    name=High Error Rate Alert
    ...                    message=Error rate exceeded acceptable threshold
    ...                    frequency=30s
    ...                    conditions=@{[{'query': {'model': 'C', 'params': ['2m', 'now']}, 'reducer': {'type': 'avg'}, 'evaluator': {'type': 'gt', 'params': [\${KPI_TARGETS.error_rate}]}}]}
    
    @{alerts}=             Create List    \${response_alert}    \${availability_alert}    \${error_alert}
    
    # Desplegar alertas en Grafana
    FOR    \${alert}    IN    @{alerts}
        \${alert_json}=    Evaluate    json.dumps(\${alert})
        \${alert_response}=  POST On Session    grafana    /api/alerts    data=\${alert_json}    headers=\${auth_headers}
        Should Be Equal    \${alert_response.status_code}    200
        
        Log                Alert configured: \${alert['name']}
        Append To File     \${METRICS_LOG}    ALERT_CONFIGURED,\${alert['name']}\\n
    END

Generate SLA Report
    [Documentation]    Genera reporte automático de cumplimiento SLA
    [Tags]             sla    reporting    compliance
    
    # Recopilar métricas de los últimos 30 días
    \${end_date}=          Get Current Date
    \${start_date}=        Subtract Time From Date    \${end_date}    30 days
    
    # Query métricas históricas desde InfluxDB
    \${query_params}=      Create Dictionary    
    ...                    db=\${METRICS_DB}
    ...                    q=SELECT mean(response_time), mean(throughput), mean(availability) FROM performance WHERE time > '\${start_date}' AND time < '\${end_date}' GROUP BY time(1d)
    
    \${metrics_response}=  GET On Session    influxdb    /query    params=\${query_params}
    Should Be Equal        \${metrics_response.status_code}    200
    
    \${metrics_data}=      Set Variable    \${metrics_response.json()}
    Should Contain         \${metrics_data}    series
    
    # Calcular compliance SLA
    \${sla_compliance}=    Calculate SLA Compliance    \${metrics_data}
    Should Be True         \${sla_compliance['availability']} >= \${SLA_TARGET}
    
    # Generar reporte HTML
    \${report_html}=       Generate HTML SLA Report    \${sla_compliance}
    Create File            sla_report.html    \${report_html}
    File Should Exist      sla_report.html
    
    Log                    SLA Report Generated:
    Log                    Availability: \${sla_compliance['availability']}%
    Log                    Response Time SLA: \${sla_compliance['response_time']}%
    Log                    Throughput SLA: \${sla_compliance['throughput']}%

Setup Real-time Monitoring
    [Documentation]    Configura monitoreo en tiempo real para operaciones
    [Tags]             monitoring    realtime    operations
    
    # Configurar webhook para alertas Slack
    \${slack_webhook}=     Set Variable    https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
    \${slack_channel}=     Set Variable    #operations-alerts
    
    # Configurar notificación Grafana a Slack
    \${notification_config}=  Create Dictionary
    ...                       name=Slack Operations Channel
    ...                       type=slack
    ...                       settings=@{[{'url': '\${slack_webhook}', 'channel': '\${slack_channel}', 'title': 'Performance Alert'}]}
    
    \${notif_json}=        Evaluate    json.dumps(\${notification_config})
    \${notif_response}=    POST On Session    grafana    /api/alert-notifications    data=\${notif_json}    headers=\${auth_headers}
    Should Be Equal        \${notif_response.status_code}    200
    
    # Configurar dashboard TV para operations center
    \${tv_dashboard}=      Create Operations TV Dashboard
    \${tv_response}=       Deploy TV Dashboard    \${tv_dashboard}
    Should Be Equal        \${tv_response.status_code}    200
    
    \${tv_dashboard_url}=  Set Variable    \${GRAFANA_URL}/d/\${tv_response.json()['slug']}/operations-tv?refresh=10s&kiosk=tv
    Set Global Variable    \${TV_DASHBOARD_URL}    \${tv_dashboard_url}
    
    Log                    Real-time monitoring configured
    Log                    TV Dashboard: \${tv_dashboard_url}
    Log                    Slack notifications: \${slack_channel}

*** Keywords ***
Initialize Dashboard Environment
    Log                    📊 Initializing dashboard environment
    Create File            \${METRICS_LOG}    METRIC_TYPE,VALUE\\n
    Set Global Variable    \${GRAFANA_API_KEY}    your_grafana_api_key_here
    Set Global Variable    \${APP_URL}    https://app.company.com

Calculate SLA Compliance
    [Arguments]            \${metrics_data}
    \${compliance}=        Create Dictionary    availability=99.8    response_time=98.5    throughput=99.2
    RETURN                 \${compliance}

Generate HTML SLA Report
    [Arguments]            \${compliance_data}
    \${html}=              Set Variable    <html><body><h1>SLA Compliance Report</h1><p>Generated: \${CURRENT_DATE}</p></body></html>
    RETURN                 \${html}

Create Operations TV Dashboard
    \${tv_config}=         Create Dictionary    title=Operations Center TV    refresh=10s    kiosk=true
    RETURN                 \${tv_config}

Deploy TV Dashboard
    [Arguments]            \${dashboard_config}
    \${response}=          Create Dictionary    slug=ops-tv    status=success
    RETURN                 \${response}

Query Database
    [Arguments]            \${query}
    \${result}=            Create List    @{[[42]]}
    RETURN                 \${result}

Publish Dashboard Reports
    Log                    📈 Publishing dashboard reports and metrics
    Log                    Dashboard deployment completed successfully</code></pre>
        
        <h3>🎯 Práctica Dashboards (7 min):</h3>
        <p>1. Instala Grafana localmente: docker run -d -p 3000:3000 grafana/grafana</p>
        <p>2. Configura InfluxDB para almacenamiento de métricas</p>
        <p>3. Crea dashboard ejecutivo con KPIs críticos</p>
        <p>4. Configura alertas automáticas basadas en SLA</p>
        <p>5. Implementa webhooks de Slack para notificaciones</p>
        <p>6. Genera reportes HTML de compliance automáticamente</p>
        <p>7. Configura dashboard TV para operations center</p>
        <p>8. Crea métricas personalizadas para tu aplicación</p>
        <p>9. Implementa rotating dashboards para diferentes audiencias</p>
        <p>10. Documenta procedimientos de escalamiento de alertas</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear dashboards enterprise con métricas en tiempo real</li>
                <li>Configurar alertas automáticas basadas en SLA</li>
                <li>Generar reportes de compliance automáticamente</li>
                <li>Implementar monitoreo 24/7 para operaciones</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Grafana API para automatizar deployment de dashboards: POST /api/dashboards/db con configuración JSON completa.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 206 - Automation de performance testing</h3>
        <p>Con dashboards operando, automatizarás completamente el ciclo de performance testing integrado con CI/CD pipelines.</p>
    `,
    topics: ["performance", "load", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-204"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_205 = LESSON_205;
}