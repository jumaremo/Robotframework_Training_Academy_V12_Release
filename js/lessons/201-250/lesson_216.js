/**
 * Robot Framework Academy - Lesson 216
 * Security 216
 */

const LESSON_216 = {
    id: 216,
    title: "Security 216",
    duration: "10 min",
    level: "advanced",
    section: "section-17",
    content: `
        <h2>🛡️ Security Monitoring</h2>
        <p>Automatiza security monitoring continuo con SIEM integration y threat detection en tiempo real.</p>
        
        <h3>💻 SIEM Integration:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    🛡️ SECURITY MONITORING & SIEM INTEGRATION SUITE
Library          RequestsLibrary
Library          Process
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          JSON
Library          String
Suite Setup      Initialize Security Monitoring
Suite Teardown   Archive Security Monitoring Results

*** Variables ***
\${SPLUNK_API}         http://splunk.company.com:8089
\${ELK_ENDPOINT}       http://elasticsearch.company.com:9200
\${SIEM_CONFIG}        siem_monitoring_config.json
\${LOG_SOURCES}        log_sources_config.csv
\${THREAT_RULES}       threat_detection_rules.json
\${ALERTS_WEBHOOK}     https://hooks.slack.com/services/webhook
\${MONITORING_WINDOW}  3600
\${THREAT_THRESHOLD}   7.5
\${INCIDENT_LOG}       security_incidents.json
&{THREAT_COUNTS}       critical=0  high=0  medium=0  low=0  false_positives=0

*** Test Cases ***
Configure SIEM Data Sources
    [Documentation]    Configura fuentes de datos para monitoreo de seguridad
    [Tags]             siem_config    data_sources    log_ingestion
    
    # Conectar con Splunk Universal Forwarder API
    Create Session       splunk        \${SPLUNK_API}
    \${splunk_auth}=     Create List    admin    \${SPLUNK_PASSWORD}
    
    # Cargar configuración de fuentes de datos
    \${sources_content}= Get File    \${LOG_SOURCES}
    @{log_sources}=      Parse Log Sources Config    \${sources_content}
    Should Not Be Empty  \${log_sources}
    
    FOR    \${source}    IN    @{log_sources}
        \${source_name}=  Set Variable    \${source['name']}
        \${source_path}=  Set Variable    \${source['path']}
        \${source_type}=  Set Variable    \${source['type']}
        \${index_name}=   Set Variable    \${source['index']}
        
        # Configurar input en Splunk
        \${input_config}= Create Dictionary
        ...               name=\${source_name}
        ...               path=\${source_path}
        ...               sourcetype=\${source_type}
        ...               index=\${index_name}
        ...               disabled=false
        
        \${input_response}= POST On Session    splunk    /servicesNS/admin/search/data/inputs/monitor    
        ...                 data=\${input_config}    auth=\${splunk_auth}    timeout=30
        Should Be Equal     \${input_response.status_code}    201
        
        # Verificar que el input está activo
        \${verify_response}= GET On Session    splunk    /servicesNS/admin/search/data/inputs/monitor/\${source_name}    
        ...                  auth=\${splunk_auth}    timeout=10
        Should Be Equal      \${verify_response.status_code}    200
        Should Contain       \${verify_response.text}    \${source_path}
        
        Log                  Configured log source: \${source_name} -> \${index_name}
    END
    
    # Configurar índices de seguridad específicos
    @{security_indexes}= Create List    security_events    firewall_logs    auth_logs    malware_alerts
    
    FOR    \${index}    IN    @{security_indexes}
        \${index_config}=    Create Dictionary    name=\${index}    maxDataSize=auto    maxHotBuckets=10
        \${index_response}=  POST On Session    splunk    /servicesNS/admin/search/data/indexes    
        ...                  data=\${index_config}    auth=\${splunk_auth}    timeout=20
        Should Be Equal      \${index_response.status_code}    201
        
        Log                  Created security index: \${index}
    END

Deploy Threat Detection Rules
    [Documentation]    Despliega reglas de detección de amenazas en SIEM
    [Tags]             threat_detection    correlation_rules    security_alerts
    
    # Cargar reglas de detección desde archivo JSON
    \${rules_content}=   Get File    \${THREAT_RULES}
    \${detection_rules}= Evaluate    json.loads(r'''\${rules_content}''')
    Should Contain       \${detection_rules}    rules
    
    @{threat_rules}=     Set Variable    \${detection_rules['rules']}
    \${rules_count}=     Get Length    \${threat_rules}
    Should Be True       \${rules_count} > 0
    
    FOR    \${rule}    IN    @{threat_rules}
        \${rule_name}=    Set Variable    \${rule['name']}
        \${rule_query}=   Set Variable    \${rule['search_query']}
        \${severity}=     Set Variable    \${rule['severity']}
        \${description}=  Set Variable    \${rule['description']}
        
        # Crear saved search como alerta en Splunk
        \${alert_config}= Create Dictionary
        ...               name=\${rule_name}
        ...               search=\${rule_query}
        ...               dispatch.earliest_time=-15m
        ...               dispatch.latest_time=now
        ...               cron_schedule=*/5 * * * *
        ...               alert_type=always
        ...               alert_severity=\${severity}
        ...               description=\${description}
        
        \${alert_response}= POST On Session    splunk    /servicesNS/admin/search/saved/searches    
        ...                 data=\${alert_config}    auth=\${splunk_auth}    timeout=30
        Should Be Equal     \${alert_response.status_code}    201
        
        # Configurar acciones de alerta
        \${action_config}=  Create Dictionary
        ...                 action.webhook.param.url=\${ALERTS_WEBHOOK}
        ...                 action.webhook.param.json=true
        ...                 action.email.to=security@company.com
        ...                 action.email.subject=Security Alert: \${rule_name}
        
        \${action_response}= POST On Session    splunk    /servicesNS/admin/search/saved/searches/\${rule_name}/alert_actions    
        ...                  data=\${action_config}    auth=\${splunk_auth}    timeout=20
        Should Be Equal      \${action_response.status_code}    200
        
        Log                  Deployed threat rule: \${rule_name} (severity: \${severity})
    END
    
    Log                  Total threat detection rules deployed: \${rules_count}

Execute Real-time Security Monitoring
    [Documentation]    Ejecuta monitoreo de seguridad en tiempo real
    [Tags]             realtime_monitoring    threat_hunting    incident_detection
    
    # Monitoreo continuo por período definido
    \${monitoring_start}= Get Current Date    result_format=epoch
    \${end_time}=         Evaluate    \${monitoring_start} + \${MONITORING_WINDOW}
    
    WHILE    \${True}
        \${current_time}= Get Current Date    result_format=epoch
        Exit For Loop If  \${current_time} >= \${end_time}
        
        # Query para eventos de seguridad recientes
        \${security_query}=  Set Variable    
        ...                  index=security_events earliest=-5m | stats count by sourcetype, severity
        
        \${search_response}= POST On Session    splunk    /services/search/jobs    
        ...                  data=search=\${security_query}    auth=\${splunk_auth}    timeout=15
        Should Be Equal      \${search_response.status_code}    201
        
        \${job_id}=          Extract Job ID    \${search_response.text}
        Should Not Be Empty  \${job_id}
        
        # Esperar completación del search job
        Sleep                5s
        \${results_response}= GET On Session    splunk    /services/search/jobs/\${job_id}/results    
        ...                   auth=\${splunk_auth}    timeout=10
        Should Be Equal       \${results_response.status_code}    200
        
        # Procesar eventos de seguridad detectados
        \${security_events}=  Parse Security Events    \${results_response.text}
        \${events_count}=     Get Length    \${security_events}
        
        Run Keyword If        \${events_count} > 0
        ...                   Process Security Events    \${security_events}
        
        # Query para alertas activas
        \${alerts_query}=     Set Variable    
        ...                   | rest /services/alerts/fired_alerts | search severity!="info"
        
        \${alerts_response}=  POST On Session    splunk    /services/search/jobs    
        ...                   data=search=\${alerts_query}    auth=\${splunk_auth}    timeout=10
        Should Be Equal       \${alerts_response.status_code}    201
        
        \${alerts_job_id}=    Extract Job ID    \${alerts_response.text}
        Sleep                 3s
        
        \${alerts_results}=   GET On Session    splunk    /services/search/jobs/\${alerts_job_id}/results    
        ...                   auth=\${splunk_auth}    timeout=10
        
        \${active_alerts}=    Parse Active Alerts    \${alerts_results.text}
        \${alerts_count}=     Get Length    \${active_alerts}
        
        Run Keyword If        \${alerts_count} > 0
        ...                   Handle Security Alerts    \${active_alerts}
        
        Log                   Security monitoring cycle: \${events_count} events, \${alerts_count} alerts
        Sleep                 60s
    END
    
    \${monitoring_end}=   Get Current Date    result_format=epoch
    \${monitoring_duration}= Evaluate    \${monitoring_end} - \${monitoring_start}
    Log                   Real-time monitoring completed: \${monitoring_duration} seconds

Implement Threat Intelligence Integration
    [Documentation]    Integra feeds de threat intelligence para enriquecer detección
    [Tags]             threat_intelligence    ioc_enrichment    attribution
    
    # Conectar con feeds de threat intelligence
    @{threat_feeds}=      Create List    
    ...                   https://api.threatintel.com/iocs
    ...                   https://feeds.malwaredomains.com/api/v1
    ...                   https://api.virustotal.com/vtapi/v2/domain/report
    
    @{collected_iocs}=    Create List
    
    FOR    \${feed_url}    IN    @{threat_feeds}
        Create Session    threat_feed    \${feed_url}    timeout=30
        
        # Obtener IOCs del feed
        \${feed_response}=    GET On Session    threat_feed    /    timeout=20    expected_status=any
        
        Continue For Loop If  \${feed_response.status_code} != 200
        
        \${iocs}=            Parse Threat Feed    \${feed_response.text}
        \${iocs_count}=      Get Length    \${iocs}
        
        FOR    \${ioc}    IN    @{iocs}
            Append To List    \${collected_iocs}    \${ioc}
        END
        
        Log                  Collected \${iocs_count} IOCs from \${feed_url}
    END
    
    \${total_iocs}=       Get Length    \${collected_iocs}
    Should Be True        \${total_iocs} > 0
    
    # Crear lookup table en Splunk para IOCs
    \${ioc_csv_content}=  Generate IOC CSV    \${collected_iocs}
    Create File           threat_iocs.csv    \${ioc_csv_content}
    
    # Subir lookup table a Splunk
    \${lookup_upload}=    Run Process    curl    
    ...                   -k    -u    admin:\${SPLUNK_PASSWORD}    
    ...                   -X    POST    
    ...                   \${SPLUNK_API}/servicesNS/admin/search/data/lookup-table-files/threat_iocs.csv    
    ...                   -F    file=@threat_iocs.csv
    Should Be Equal       \${lookup_upload.rc}    0
    
    # Crear correlation search para matching IOCs
    \${correlation_search}= Set Variable    
    ...                     index=security_events | lookup threat_iocs.csv ip OUTPUT threat_type, confidence | where isnotnull(threat_type)
    
    \${correlation_config}= Create Dictionary
    ...                     name=Threat_Intelligence_Correlation
    ...                     search=\${correlation_search}
    ...                     dispatch.earliest_time=-10m
    ...                     cron_schedule=*/2 * * * *
    ...                     alert_type=always
    ...                     alert_severity=high
    
    \${correlation_response}= POST On Session    splunk    /servicesNS/admin/search/saved/searches    
    ...                        data=\${correlation_config}    auth=\${splunk_auth}    timeout=20
    Should Be Equal            \${correlation_response.status_code}    201
    
    Log                        Threat intelligence integration completed: \${total_iocs} IOCs loaded

Execute Automated Incident Response
    [Documentation]    Automatiza respuesta inicial a incidentes de seguridad
    [Tags]             incident_response    automation    containment
    
    # Simular detección de incidente crítico
    \${incident_detected}= Set Variable    True
    \${incident_type}=     Set Variable    malware_infection
    \${affected_host}=     Set Variable    workstation-001.company.com
    \${incident_severity}= Set Variable    HIGH
    
    Run Keyword If        \${incident_detected}
    ...                   Execute Incident Response Workflow    \${incident_type}    \${affected_host}    \${incident_severity}
    
    # Crear ticket de incidente automáticamente
    \${incident_id}=      Generate Incident ID
    \${incident_data}=    Create Dictionary
    ...                   id=\${incident_id}
    ...                   type=\${incident_type}
    ...                   affected_system=\${affected_host}
    ...                   severity=\${incident_severity}
    ...                   detected_at=\${CURRENT_DATE}
    ...                   status=INVESTIGATING
    
    # Containment automático para malware
    Run Keyword If        '\${incident_type}' == 'malware_infection'
    ...                   Execute Malware Containment    \${affected_host}    \${incident_id}
    
    # Forensics data collection
    \${forensics_data}=   Collect Forensics Evidence    \${affected_host}    \${incident_id}
    Set To Dictionary     \${incident_data}    forensics_evidence=\${forensics_data}
    
    # Notificaciones automáticas
    Send Incident Notifications    \${incident_data}
    
    # Logging del incidente
    \${incident_json}=    Evaluate    json.dumps(\${incident_data}, indent=2)
    Append To File        \${INCIDENT_LOG}    \${incident_json}\\n
    
    Log                   Automated incident response executed for \${incident_id}

Generate Security Metrics Dashboard
    [Documentation]    Genera dashboard de métricas de seguridad enterprise
    [Tags]             security_metrics    dashboard    kpi_reporting
    
    # Recopilar métricas de seguridad de múltiples fuentes
    \${metrics_query}=    Set Variable    
    ...                   | multisearch 
    ...                   [search index=security_events | stats count as total_events] 
    ...                   [search index=security_events severity=critical | stats count as critical_events] 
    ...                   [search index=firewall_logs action=blocked | stats count as blocked_connections]
    
    \${metrics_response}= POST On Session    splunk    /services/search/jobs    
    ...                   data=search=\${metrics_query}    auth=\${splunk_auth}    timeout=30
    Should Be Equal       \${metrics_response.status_code}    201
    
    \${metrics_job_id}=   Extract Job ID    \${metrics_response.text}
    Sleep                 10s
    
    \${metrics_results}=  GET On Session    splunk    /services/search/jobs/\${metrics_job_id}/results    
    ...                   auth=\${splunk_auth}    timeout=15
    Should Be Equal       \${metrics_results.status_code}    200
    
    \${security_metrics}= Parse Security Metrics    \${metrics_results.text}
    
    # Calcular KPIs de seguridad
    \${total_events}=     Set Variable    \${security_metrics['total_events']}
    \${critical_events}=  Set Variable    \${security_metrics['critical_events']}
    \${blocked_conns}=    Set Variable    \${security_metrics['blocked_connections']}
    
    \${critical_ratio}=   Evaluate    (\${critical_events} / max(1, \${total_events})) * 100
    \${security_posture}= Calculate Security Posture Score    \${security_metrics}
    
    # Generar dashboard data
    \${dashboard_data}=   Create Dictionary
    ...                   generated_at=\${CURRENT_DATE}
    ...                   monitoring_window_hours=\${MONITORING_WINDOW}/3600
    ...                   total_security_events=\${total_events}
    ...                   critical_events_count=\${critical_events}
    ...                   critical_events_ratio=\${critical_ratio}
    ...                   blocked_connections=\${blocked_conns}
    ...                   security_posture_score=\${security_posture}
    ...                   threat_counts=\${THREAT_COUNTS}
    
    # Crear dashboard HTML
    \${dashboard_template}= Get File    templates/security_dashboard.html
    \${dashboard_html}=     Render Security Dashboard    \${dashboard_template}    \${dashboard_data}
    Create File             security_monitoring_dashboard.html    \${dashboard_html}
    
    # Generar métricas JSON para APIs
    \${dashboard_json}=     Evaluate    json.dumps(\${dashboard_data}, indent=2)
    Create File             security_metrics.json    \${dashboard_json}
    
    # Crear alerta si security posture es bajo
    Run Keyword If          \${security_posture} < 70.0
    ...                     Send Security Posture Alert    \${security_posture}
    
    File Should Exist       security_monitoring_dashboard.html
    File Should Exist       security_metrics.json
    
    Log                     Security metrics dashboard generated
    Log                     Total events: \${total_events}
    Log                     Critical events: \${critical_events} (\${critical_ratio}%)
    Log                     Security posture score: \${security_posture}/100

*** Keywords ***
Initialize Security Monitoring
    Log                     🛡️ Initializing security monitoring and SIEM integration
    Set Global Variable     \${CURRENT_DATE}    2024-01-15
    Set Global Variable     \${SPLUNK_PASSWORD}    your_splunk_password
    
    # Crear archivos de configuración si no existen
    Create File             \${LOG_SOURCES}    name,path,type,index\nwindows_security,/var/log/windows/security.log,wineventlog,security_events
    Create File             \${THREAT_RULES}    {"rules": [{"name": "Suspicious Login", "search_query": "index=auth_logs failed_login", "severity": "medium", "description": "Multiple failed login attempts detected"}]}
    Create File             templates/security_dashboard.html    <html><body><h1>Security Monitoring Dashboard</h1></body></html>

Parse Log Sources Config
    [Arguments]             \${csv_content}
    @{sources}=             Create List    
    ...                     @{[{'name': 'windows_security', 'path': '/var/log/windows/security.log', 'type': 'wineventlog', 'index': 'security_events'}]}
    RETURN                  \${sources}

Extract Job ID
    [Arguments]             \${response_text}
    \${job_id}=             Set Variable    search_12345
    RETURN                  \${job_id}

Parse Security Events
    [Arguments]             \${results_text}
    @{events}=              Create List    
    ...                     @{[{'sourcetype': 'wineventlog', 'severity': 'medium', 'count': 5}]}
    RETURN                  \${events}

Process Security Events
    [Arguments]             \${events}
    FOR    \${event}    IN    @{events}
        \${severity}=       Set Variable    \${event['severity']}
        \${count}=          Set Variable    \${event['count']}
        
        Run Keyword If      '\${severity}' == 'critical'
        ...                 Increment Threat Count    critical    \${count}
        ...                 ELSE IF    '\${severity}' == 'high'
        ...                 Increment Threat Count    high    \${count}
        ...                 ELSE    Increment Threat Count    medium    \${count}
    END

Parse Active Alerts
    [Arguments]             \${alerts_text}
    @{alerts}=              Create List    
    ...                     @{[{'name': 'Suspicious Login', 'severity': 'high', 'count': 3}]}
    RETURN                  \${alerts}

Handle Security Alerts
    [Arguments]             \${alerts}
    FOR    \${alert}    IN    @{alerts}
        \${alert_name}=     Set Variable    \${alert['name']}
        \${severity}=       Set Variable    \${alert['severity']}
        
        Log                 Handling security alert: \${alert_name} (\${severity})
        
        Run Keyword If      '\${severity}' in ['critical', 'high']
        ...                 Escalate Security Alert    \${alert}
    END

Parse Threat Feed
    [Arguments]             \${feed_text}
    @{iocs}=                Create List    
    ...                     @{[{'type': 'ip', 'value': '192.168.1.100', 'threat_type': 'malware'}]}
    RETURN                  \${iocs}

Generate IOC CSV
    [Arguments]             \${iocs}
    \${csv_content}=        Set Variable    ip,threat_type,confidence\n192.168.1.100,malware,high
    RETURN                  \${csv_content}

Execute Incident Response Workflow
    [Arguments]             \${incident_type}    \${affected_host}    \${severity}
    Log                     Executing incident response for \${incident_type} on \${affected_host}

Generate Incident ID
    \${incident_id}=        Set Variable    INC-20240115-001
    RETURN                  \${incident_id}

Execute Malware Containment
    [Arguments]             \${host}    \${incident_id}
    Log                     Executing malware containment for \${host} (incident: \${incident_id})

Collect Forensics Evidence
    [Arguments]             \${host}    \${incident_id}
    \${evidence}=           Create Dictionary    memory_dump=collected    disk_image=collected    network_logs=collected
    RETURN                  \${evidence}

Send Incident Notifications
    [Arguments]             \${incident_data}
    Log                     Sending incident notifications for \${incident_data['id']}

Parse Security Metrics
    [Arguments]             \${results_text}
    \${metrics}=            Create Dictionary    total_events=150    critical_events=5    blocked_connections=25
    RETURN                  \${metrics}

Calculate Security Posture Score
    [Arguments]             \${metrics}
    \${score}=              Set Variable    75.5
    RETURN                  \${score}

Render Security Dashboard
    [Arguments]             \${template}    \${data}
    \${rendered}=           Set Variable    <html><body><h1>Security Dashboard Generated</h1></body></html>
    RETURN                  \${rendered}

Send Security Posture Alert
    [Arguments]             \${score}
    Log                     🚨 SECURITY POSTURE ALERT: Score below threshold: \${score}

Increment Threat Count
    [Arguments]             \${severity}    \${count}
    \${current_count}=      Get From Dictionary    \${THREAT_COUNTS}    \${severity}
    \${new_count}=          Evaluate    \${current_count} + \${count}
    Set To Dictionary       \${THREAT_COUNTS}    \${severity}=\${new_count}

Escalate Security Alert
    [Arguments]             \${alert}
    Log                     Escalating security alert: \${alert['name']}

Archive Security Monitoring Results
    Log                     📁 Archiving security monitoring results and incident data</code></pre>
        
        <h3>🎯 Práctica Monitoring (7 min):</h3>
        <p>1. Configura Splunk Universal Forwarder con fuentes de log críticas</p>
        <p>2. Despliega reglas de correlación para threat detection automático</p>
        <p>3. Implementa real-time monitoring con alertas proactivas</p>
        <p>4. Integra threat intelligence feeds para IOC enrichment</p>
        <p>5. Automatiza incident response workflows con containment</p>
        <p>6. Genera security metrics dashboard para executives</p>
        <p>7. Configura forensics data collection automático</p>
        <p>8. Implementa security posture scoring continuo</p>
        <p>9. Crea escalation procedures para alertas críticas</p>
        <p>10. Integra con ticketing systems para incident tracking</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Configurar SIEM monitoring continuo con Splunk integration</li>
                <li>Implementar threat detection automático con correlation rules</li>
                <li>Automatizar incident response con containment procedures</li>
                <li>Generar security metrics y dashboards ejecutivos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Splunk REST API para automation: POST /services/search/jobs ejecuta búsquedas, GET /services/search/jobs/ID/results obtiene resultados.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 217 - Security automation y orchestration</h3>
        <p>Con security monitoring operando, implementarás security automation completa con SOAR platforms y orchestrated response workflows.</p>
    `,
    topics: ["security", "vulnerabilities", "pentesting"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-215"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_216 = LESSON_216;
}