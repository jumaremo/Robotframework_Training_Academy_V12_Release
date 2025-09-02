/**
 * Robot Framework Academy - Lesson 209
 * Performance 209
 */

const LESSON_209 = {
    id: 209,
    title: "Performance 209",
    duration: "10 min",
    level: "advanced",
    section: "section-16",
    content: `
        <h2>🔍 Monitoring Producción</h2>
        <p>Implementa monitoreo avanzado de performance en producción con alertas proactivas y respuesta automática.</p>
        
        <h3>💻 Monitoring Avanzado:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    🔍 PRODUCTION PERFORMANCE MONITORING SUITE
Library          RequestsLibrary
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          Process
Library          JSON
Suite Setup      Initialize Production Monitoring
Suite Teardown   Archive Monitoring Data

*** Variables ***
\${PROMETHEUS_URL}     http://prometheus.company.com:9090
\${GRAFANA_URL}        http://grafana.company.com:3000
\${ALERTMANAGER_URL}   http://alertmanager.company.com:9093
\${PRODUCTION_URL}     https://app.company.com
\${MONITORING_INTERVAL} 60
\${SLA_RESPONSE_TIME}  1500
\${SLA_AVAILABILITY}   99.9
\${SLA_ERROR_RATE}     0.5
\${ALERT_COOLDOWN}     300
\${INCIDENT_LOG}       production_incidents.log
&{MONITORING_METRICS}  response_time=0  error_rate=0  availability=0  throughput=0

*** Test Cases ***
Setup Production Monitoring Infrastructure
    [Documentation]    Configura infraestructura de monitoreo en producción
    [Tags]             setup    infrastructure    monitoring
    
    # Verificar conectividad con stack de monitoreo
    Create Session        prometheus    \${PROMETHEUS_URL}
    \${prom_health}=      GET On Session    prometheus    /-/healthy    timeout=10
    Should Be Equal       \${prom_health.status_code}    200
    
    Create Session        grafana       \${GRAFANA_URL}
    \${grafana_health}=   GET On Session    grafana    /api/health    timeout=10
    Should Be Equal       \${grafana_health.status_code}    200
    
    Create Session        alertmanager  \${ALERTMANAGER_URL}
    \${alert_health}=     GET On Session    alertmanager    /-/healthy    timeout=10
    Should Be Equal       \${alert_health.status_code}    200
    
    Log                   Monitoring infrastructure verified
    
    # Configurar métricas personalizadas de aplicación
    \${custom_metrics}=   Create List    
    ...                   app_response_time_seconds
    ...                   app_requests_total
    ...                   app_errors_total
    ...                   app_active_connections
    ...                   app_database_query_duration
    
    FOR    \${metric}    IN    @{custom_metrics}
        \${query_result}=  GET On Session    prometheus    /api/v1/query    
        ...                params=query=\${metric}    timeout=5
        Should Be Equal    \${query_result.status_code}    200
        
        \${metric_data}=   Set Variable    \${query_result.json()}
        Should Contain     \${metric_data}    data
        Log                Metric \${metric} is available
    END

Deploy Real-time Alerting Rules
    [Documentation]    Despliega reglas de alerta para monitoreo proactivo
    [Tags]             alerting    rules    proactive
    
    # Regla: Response Time SLA Violation
    \${response_alert}=   Create Dictionary
    ...                   alert=HighResponseTime
    ...                   expr=histogram_quantile(0.95, rate(app_response_time_seconds_bucket[5m])) > \${SLA_RESPONSE_TIME}/1000
    ...                   for=2m
    ...                   labels=@{[{'severity': 'critical', 'service': 'web-app'}]}
    ...                   annotations=@{[{'summary': 'Response time SLA violation', 'description': '95th percentile response time is {{ $value }}s'}]}
    
    # Regla: High Error Rate
    \${error_alert}=      Create Dictionary
    ...                   alert=HighErrorRate
    ...                   expr=rate(app_errors_total[5m]) / rate(app_requests_total[5m]) * 100 > \${SLA_ERROR_RATE}
    ...                   for=1m
    ...                   labels=@{[{'severity': 'critical', 'service': 'web-app'}]}
    ...                   annotations=@{[{'summary': 'High error rate detected', 'description': 'Error rate is {{ $value }}%'}]}
    
    # Regla: Service Availability
    \${availability_alert}= Create Dictionary
    ...                     alert=ServiceDown
    ...                     expr=up{job="web-app"} == 0
    ...                     for=30s
    ...                     labels=@{[{'severity': 'critical', 'service': 'web-app'}]}
    ...                     annotations=@{[{'summary': 'Service is down', 'description': 'Application instance {{ $labels.instance }} is unreachable'}]}
    
    # Regla: Database Performance
    \${db_alert}=         Create Dictionary
    ...                   alert=SlowDatabaseQueries
    ...                   expr=histogram_quantile(0.95, rate(app_database_query_duration_bucket[5m])) > 0.1
    ...                   for=3m
    ...                   labels=@{[{'severity': 'warning', 'service': 'database'}]}
    ...                   annotations=@{[{'summary': 'Database queries are slow', 'description': '95th percentile query time is {{ $value }}s'}]}
    
    @{alert_rules}=       Create List    \${response_alert}    \${error_alert}    \${availability_alert}    \${db_alert}
    
    # Crear archivo de configuración de alertas
    \${alerts_config}=    Create Dictionary    groups=@{[{'name': 'production_alerts', 'rules': \${alert_rules}}]}
    \${alerts_yaml}=      Evaluate    yaml.dump(\${alerts_config})
    Create File           production_alerts.yml    \${alerts_yaml}
    
    # Recargar configuración en Prometheus
    \${reload_result}=    POST On Session    prometheus    /-/reload    timeout=30
    Should Be Equal       \${reload_result.status_code}    200
    
    Log                   Production alerting rules deployed successfully

Execute Continuous Health Monitoring
    [Documentation]    Ejecuta monitoreo continuo de salud de aplicación
    [Tags]             continuous    health    monitoring
    
    Create Session        prod_app      \${PRODUCTION_URL}
    
    # Monitoreo por 10 minutos (600 segundos)
    FOR    \${iteration}    IN RANGE    10
        \${monitor_start}=  Get Current Date    result_format=epoch
        
        # Health check endpoint crítico
        \${health_response}= GET On Session    prod_app    /health    timeout=10
        \${health_time}=    Evaluate    time.time() - \${monitor_start}
        Should Be Equal     \${health_response.status_code}    200
        Should Be True      \${health_time} < 5.0
        
        # API endpoint crítico
        \${api_start}=      Get Current Date    result_format=epoch  
        \${api_response}=   GET On Session    prod_app    /api/status    timeout=10
        \${api_time}=       Evaluate    time.time() - \${api_start}
        Should Be Equal     \${api_response.status_code}    200
        Should Be True      \${api_time} < 3.0
        
        # Verificar contenido crítico
        Should Contain      \${api_response.text}    status
        Should Contain      \${api_response.text}    healthy
        
        # Registrar métricas
        Append To File      \${INCIDENT_LOG}    HEALTH_CHECK,\${iteration},\${health_time},\${api_time}\\n
        
        # Query métricas actuales desde Prometheus
        \${current_metrics}= Query Production Metrics
        Set To Dictionary   \${MONITORING_METRICS}    response_time=\${current_metrics.response_time}
        Set To Dictionary   \${MONITORING_METRICS}    error_rate=\${current_metrics.error_rate}
        Set To Dictionary   \${MONITORING_METRICS}    availability=\${current_metrics.availability}
        
        # Validar SLAs en tiempo real
        Should Be True      \${current_metrics.response_time} < \${SLA_RESPONSE_TIME}
        Should Be True      \${current_metrics.error_rate} < \${SLA_ERROR_RATE}
        Should Be True      \${current_metrics.availability} > \${SLA_AVAILABILITY}
        
        Log                 Iteration \${iteration}: Response \${current_metrics.response_time}ms, Error Rate \${current_metrics.error_rate}%
        
        Sleep               \${MONITORING_INTERVAL}s
    END

Monitor Performance Under Load
    [Documentation]    Monitorea performance durante picos de carga reales
    [Tags]             load    performance    realtime
    
    # Detectar patrones de carga actual
    \${load_query}=       Set Variable    rate(app_requests_total[1m])
    \${load_response}=    GET On Session    prometheus    /api/v1/query    
    ...                   params=query=\${load_query}    timeout=10
    Should Be Equal       \${load_response.status_code}    200
    
    \${load_data}=        Set Variable    \${load_response.json()}
    \${current_rps}=      Extract Current RPS    \${load_data}
    Should Be True        \${current_rps} >= 0
    
    Log                   Current load: \${current_rps} RPS
    
    # Monitoreo adaptativo basado en carga
    \${monitoring_frequency}= Set Variable If    \${current_rps} > 100    30    60
    \${intensive_monitoring}= Set Variable If    \${current_rps} > 200    True    False
    
    FOR    \${load_check}    IN RANGE    5
        # Métricas detalladas durante alta carga
        Run Keyword If      \${intensive_monitoring}
        ...                 Execute Intensive Performance Monitoring
        ...                 ELSE    Execute Standard Performance Monitoring
        
        # Verificar alertas activas
        \${active_alerts}=  GET On Session    alertmanager    /api/v1/alerts    timeout=5
        Should Be Equal     \${active_alerts.status_code}    200
        
        \${alerts_data}=    Set Variable    \${active_alerts.json()}
        \${firing_alerts}=  Count Firing Alerts    \${alerts_data}
        
        # Si hay alertas críticas, ejecutar respuesta automática
        Run Keyword If      \${firing_alerts} > 0
        ...                 Handle Critical Alerts    \${firing_alerts}
        
        Log                 Load monitoring cycle \${load_check}: \${firing_alerts} active alerts
        Sleep               \${monitoring_frequency}s
    END

Implement Automated Incident Response
    [Documentation]    Implementa respuesta automática a incidentes de performance
    [Tags]             incident    response    automation
    
    # Simular detección de incidente crítico
    \${incident_detected}= Set Variable    True
    \${incident_severity}= Set Variable    critical
    \${incident_type}=     Set Variable    high_response_time
    
    Run Keyword If        \${incident_detected}
    ...                   Execute Incident Response Protocol    \${incident_severity}    \${incident_type}
    
    # Protocolo de respuesta automática
    Log                   INCIDENT DETECTED: \${incident_type} (\${incident_severity})
    
    # Paso 1: Captura de diagnósticos automática
    \${diagnostic_data}=  Capture Diagnostic Information
    Should Not Be Empty   \${diagnostic_data}
    
    # Paso 2: Intento de auto-remediation
    \${remediation_result}= Attempt Automatic Remediation    \${incident_type}
    Log                     Auto-remediation result: \${remediation_result}
    
    # Paso 3: Escalamiento si no se resolvió
    Run Keyword If          '\${remediation_result}' != 'resolved'
    ...                     Escalate To Operations Team    \${incident_severity}
    
    # Paso 4: Documentación automática del incidente
    \${incident_id}=        Generate Incident ID
    Document Incident       \${incident_id}    \${incident_type}    \${incident_severity}    \${remediation_result}
    
    # Paso 5: Notificación a stakeholders
    Send Incident Notification    \${incident_id}    \${incident_type}    \${incident_severity}
    
    Log                     Incident response protocol completed: \${incident_id}

Generate Production Monitoring Report
    [Documentation]    Genera reporte de monitoreo de producción
    [Tags]             reporting    production    analytics
    
    # Recopilar métricas de las últimas 24 horas
    \${metrics_query}=     Set Variable    
    ...                    avg_over_time(app_response_time_seconds[24h])*1000,
    ...                    rate(app_errors_total[24h])/rate(app_requests_total[24h])*100,
    ...                    avg_over_time(up{job="web-app"}[24h])*100
    
    \${daily_metrics}=     GET On Session    prometheus    /api/v1/query    
    ...                    params=query=\${metrics_query}    timeout=15
    Should Be Equal        \${daily_metrics.status_code}    200
    
    # Procesar datos para reporte
    \${report_data}=       Create Dictionary
    ...                    period=24h
    ...                    avg_response_time=\${MONITORING_METRICS.response_time}
    ...                    avg_error_rate=\${MONITORING_METRICS.error_rate}
    ...                    availability=\${MONITORING_METRICS.availability}
    ...                    sla_compliance=@{[]}
    
    # Calcular compliance SLA
    \${response_sla}=      Evaluate    100 if \${MONITORING_METRICS.response_time} < \${SLA_RESPONSE_TIME} else 95.5
    \${error_sla}=         Evaluate    100 if \${MONITORING_METRICS.error_rate} < \${SLA_ERROR_RATE} else 98.2
    \${availability_sla}=  Evaluate    100 if \${MONITORING_METRICS.availability} > \${SLA_AVAILABILITY} else 99.1
    
    @{sla_compliance}=     Create List    
    ...                    @{[{'metric': 'response_time', 'target': \${SLA_RESPONSE_TIME}, 'actual': \${MONITORING_METRICS.response_time}, 'compliance': \${response_sla}}]}
    ...                    @{[{'metric': 'error_rate', 'target': \${SLA_ERROR_RATE}, 'actual': \${MONITORING_METRICS.error_rate}, 'compliance': \${error_sla}}]}
    ...                    @{[{'metric': 'availability', 'target': \${SLA_AVAILABILITY}, 'actual': \${MONITORING_METRICS.availability}, 'compliance': \${availability_sla}}]}
    
    Set To Dictionary      \${report_data}    sla_compliance=\${sla_compliance}
    
    # Generar reporte multi-formato
    \${html_report}=       Generate HTML Monitoring Report    \${report_data}
    \${json_report}=       Evaluate    json.dumps(\${report_data}, indent=2)
    \${csv_report}=        Generate CSV Monitoring Report     \${report_data}
    
    Create File            production_monitoring_report.html    \${html_report}
    Create File            production_monitoring_report.json    \${json_report}
    Create File            production_monitoring_metrics.csv    \${csv_report}
    
    File Should Exist      production_monitoring_report.html
    File Should Exist      production_monitoring_report.json
    File Should Exist      production_monitoring_metrics.csv
    
    Log                    Production monitoring report generated
    Log                    SLA Compliance: Response Time \${response_sla}%, Error Rate \${error_sla}%, Availability \${availability_sla}%

*** Keywords ***
Initialize Production Monitoring
    Log                    🔍 Initializing production monitoring systems
    Create File            \${INCIDENT_LOG}    METRIC_TYPE,ITERATION,HEALTH_TIME,API_TIME\\n
    Set Global Variable    \${CURRENT_DATE}    2024-01-15

Query Production Metrics
    \${metrics}=           Create Dictionary    response_time=850    error_rate=0.3    availability=99.95    throughput=245
    RETURN                 \${metrics}

Extract Current RPS
    [Arguments]            \${load_data}
    \${rps}=               Set Variable    125
    RETURN                 \${rps}

Execute Intensive Performance Monitoring
    Log                    Running intensive performance monitoring
    
Execute Standard Performance Monitoring
    Log                    Running standard performance monitoring

Count Firing Alerts
    [Arguments]            \${alerts_data}
    \${count}=             Set Variable    0
    RETURN                 \${count}

Handle Critical Alerts
    [Arguments]            \${alert_count}
    Log                    Handling \${alert_count} critical alerts

Execute Incident Response Protocol
    [Arguments]            \${severity}    \${type}
    Log                    Executing incident response for \${type} (\${severity})

Capture Diagnostic Information
    \${diagnostics}=       Create Dictionary    cpu=65    memory=78    network=normal
    RETURN                 \${diagnostics}

Attempt Automatic Remediation
    [Arguments]            \${incident_type}
    \${result}=            Set Variable    attempted
    RETURN                 \${result}

Escalate To Operations Team
    [Arguments]            \${severity}
    Log                    Escalating \${severity} incident to operations team

Generate Incident ID
    \${id}=                Set Variable    INC-20240115-001
    RETURN                 \${id}

Document Incident
    [Arguments]            \${id}    \${type}    \${severity}    \${result}
    Log                    Documented incident \${id}: \${type} (\${severity}) - \${result}

Send Incident Notification
    [Arguments]            \${id}    \${type}    \${severity}
    Log                    Notification sent for incident \${id}: \${type} (\${severity})

Generate HTML Monitoring Report
    [Arguments]            \${data}
    \${html}=              Set Variable    <html><body><h1>Production Monitoring Report</h1></body></html>
    RETURN                 \${html}

Generate CSV Monitoring Report
    [Arguments]            \${data}
    \${csv}=               Set Variable    metric,target,actual,compliance\\nresponse_time,1500,850,100
    RETURN                 \${csv}

Archive Monitoring Data
    Log                    📁 Archiving production monitoring data and incident logs</code></pre>
        
        <h3>🎯 Práctica Monitoring (7 min):</h3>
        <p>1. Configura Prometheus con métricas personalizadas de aplicación</p>
        <p>2. Implementa alertas proactivas basadas en SLA en Alertmanager</p>
        <p>3. Crea dashboard de monitoreo en tiempo real en Grafana</p>
        <p>4. Configura health checks automáticos cada minuto</p>
        <p>5. Implementa respuesta automática a incidentes críticos</p>
        <p>6. Configura escalamiento automático a equipo de operaciones</p>
        <p>7. Genera reportes de compliance SLA automáticamente</p>
        <p>8. Implementa captura automática de diagnósticos</p>
        <p>9. Configura notificaciones diferenciadas por severidad</p>
        <p>10. Documenta runbook de incident response procedures</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar monitoreo proactivo de performance en producción</li>
                <li>Configurar alertas automáticas basadas en SLA</li>
                <li>Automatizar respuesta a incidentes críticos</li>
                <li>Generar reportes de compliance y métricas ejecutivas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa histogram_quantile en Prometheus para percentiles: histogram_quantile(0.95, rate(response_time_bucket[5m])) da P95 preciso.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 210 - Performance optimization strategies</h3>
        <p>Con monitoreo avanzado operando, aprenderás estrategias de optimización sistemática basadas en datos reales de producción.</p>
    `,
    topics: ["performance", "load", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-208"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_209 = LESSON_209;
}