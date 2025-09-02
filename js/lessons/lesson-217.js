/**
 * Robot Framework Academy - Lesson 217
 * Security 217
 */

const LESSON_217 = {
    id: 217,
    title: "Security 217",
    duration: "10 min",
    level: "advanced",
    section: "section-17",
    content: `
        <h2>🤖 Security Automation</h2>
        <p>Automatiza security orchestration con SOAR platforms y response workflows enterprise.</p>
        
        <h3>💻 SOAR Integration:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    🤖 SECURITY ORCHESTRATION & AUTOMATED RESPONSE SUITE
Library          RequestsLibrary
Library          Process
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          JSON
Library          String
Suite Setup      Initialize Security Orchestration
Suite Teardown   Archive Orchestration Results

*** Variables ***
\${PHANTOM_API}        http://phantom.company.com:8443
\${DEMISTO_API}        http://demisto.company.com:8080
\${PLAYBOOK_DIR}       ./security_playbooks
\${WORKFLOWS_CONFIG}   security_workflows.json
\${AUTOMATION_RULES}   automation_rules.json
\${CASE_MANAGEMENT}    security_cases.db
\${ENRICHMENT_APIs}    threat_enrichment_apis.json
\${ORCHESTRATION_LOG}  security_orchestration.log
&{RESPONSE_METRICS}    automated_responses=0  manual_escalations=0  false_positives=0  mean_time_to_response=0

*** Test Cases ***
Deploy Security Playbooks
    [Documentation]    Despliega playbooks automatizados para respuesta a incidentes
    [Tags]             playbooks    automation    incident_response
    
    # Conectar con Phantom SOAR platform
    Create Session       phantom       \${PHANTOM_API}    verify=False
    \${phantom_auth}=    Create Dictionary    username=admin    password=\${PHANTOM_PASSWORD}
    \${auth_response}=   POST On Session    phantom    /rest/login    json=\${phantom_auth}    timeout=30
    Should Be Equal      \${auth_response.status_code}    200
    
    \${auth_token}=      Set Variable    \${auth_response.json()['auth_token']}
    \${phantom_headers}= Create Dictionary    ph-auth-token=\${auth_token}    Content-Type=application/json
    
    # Cargar configuración de playbooks
    \${playbooks_content}= Get File    \${WORKFLOWS_CONFIG}
    \${playbooks_config}=  Evaluate    json.loads(r'''\${playbooks_content}''')
    @{playbooks}=          Set Variable    \${playbooks_config['playbooks']}
    
    Should Not Be Empty    \${playbooks}
    \${playbooks_count}=   Get Length    \${playbooks}
    
    FOR    \${playbook}    IN    @{playbooks}
        \${playbook_name}= Set Variable    \${playbook['name']}
        \${trigger_type}=  Set Variable    \${playbook['trigger']}
        \${actions}=       Set Variable    \${playbook['actions']}
        \${priority}=      Set Variable    \${playbook['priority']}
        
        # Crear playbook en Phantom
        \${playbook_data}= Create Dictionary
        ...                name=\${playbook_name}
        ...                description=Automated security response playbook
        ...                active=true
        ...                trigger_type=\${trigger_type}
        ...                actions=\${actions}
        ...                priority=\${priority}
        
        \${create_response}= POST On Session    phantom    /rest/playbook    
        ...                   json=\${playbook_data}    headers=\${phantom_headers}    timeout=30
        Should Be Equal      \${create_response.status_code}    200
        
        \${playbook_id}=     Set Variable    \${create_response.json()['id']}
        Should Not Be Empty  \${playbook_id}
        
        # Activar playbook
        \${activate_data}=   Create Dictionary    active=true
        \${activate_response}= POST On Session    phantom    /rest/playbook/\${playbook_id}/activate    
        ...                    json=\${activate_data}    headers=\${phantom_headers}    timeout=20
        Should Be Equal        \${activate_response.status_code}    200
        
        # Configurar triggers automáticos
        Configure Playbook Triggers    \${playbook_id}    \${trigger_type}    \${phantom_headers}
        
        Log                    Deployed playbook: \${playbook_name} (ID: \${playbook_id})
        Append To File         \${ORCHESTRATION_LOG}    PLAYBOOK_DEPLOYED,\${playbook_name},\${playbook_id}\\n
    END
    
    Log                    Total playbooks deployed: \${playbooks_count}

Execute Automated Threat Enrichment
    [Documentation]    Automatiza enrichment de threat intelligence en tiempo real
    [Tags]             threat_enrichment    automation    intelligence
    
    # Cargar configuración de APIs de enrichment
    \${enrichment_content}= Get File    \${ENRICHMENT_APIs}
    \${enrichment_config}=  Evaluate    json.loads(r'''\${enrichment_content}''')
    @{enrichment_apis}=     Set Variable    \${enrichment_config['apis']}
    
    # Simular IOCs para enrichment
    @{test_iocs}=          Create List    
    ...                    @{[{'type': 'ip', 'value': '192.168.1.100'}]}
    ...                    @{[{'type': 'domain', 'value': 'malicious-domain.com'}]}
    ...                    @{[{'type': 'hash', 'value': 'a1b2c3d4e5f6'}]}
    
    FOR    \${ioc}    IN    @{test_iocs}
        \${ioc_type}=      Set Variable    \${ioc['type']}
        \${ioc_value}=     Set Variable    \${ioc['value']}
        
        \${enrichment_data}= Create Dictionary    ioc_collected=@{[]}
        
        # Enrichment con múltiples fuentes
        FOR    \${api_config}    IN    @{enrichment_apis}
            \${api_name}=      Set Variable    \${api_config['name']}
            \${api_url}=       Set Variable    \${api_config['url']}
            \${api_key}=       Set Variable    \${api_config['api_key']}
            
            # Crear sesión con API de threat intelligence
            Create Session     \${api_name}    \${api_url}    timeout=30
            \${headers}=       Create Dictionary    Authorization=Bearer \${api_key}    Content-Type=application/json
            
            # Query específico por tipo de IOC
            \${query_endpoint}= Set Variable If    '\${ioc_type}' == 'ip'    /ip/\${ioc_value}
            ...                 '\${ioc_type}' == 'domain'    /domain/\${ioc_value}
            ...                 '\${ioc_type}' == 'hash'    /file/\${ioc_value}    /generic/\${ioc_value}
            
            \${enrichment_response}= GET On Session    \${api_name}    \${query_endpoint}    
            ...                       headers=\${headers}    timeout=15    expected_status=any
            
            Run Keyword If     \${enrichment_response.status_code} == 200
            ...                Process Enrichment Response    \${api_name}    \${enrichment_response.json()}    \${enrichment_data}
            
            Log                Enrichment \${api_name} for \${ioc_value}: \${enrichment_response.status_code}
        END
        
        # Consolidar y almacenar enrichment data
        \${consolidated_intel}= Consolidate Threat Intelligence    \${enrichment_data}
        Store IOC Intelligence    \${ioc}    \${consolidated_intel}
        
        Log                    IOC \${ioc_value} enriched with \${len(\${enrichment_data['ioc_collected']})} sources
    END

Implement Automated Case Management
    [Documentation]    Automatiza gestión de casos de seguridad con workflows
    [Tags]             case_management    automation    workflow
    
    # Conectar con sistema de case management
    Create Session         demisto       \${DEMISTO_API}
    \${demisto_auth}=      Create Dictionary    user=admin    password=\${DEMISTO_PASSWORD}
    \${demisto_login}=     POST On Session    demisto    /login    json=\${demisto_auth}    timeout=30
    Should Be Equal        \${demisto_login.status_code}    200
    
    \${demisto_token}=     Set Variable    \${demisto_login.json()['token']}
    \${demisto_headers}=   Create Dictionary    Authorization=Bearer \${demisto_token}
    
    # Simular nuevo incident de seguridad
    \${new_incident}=      Create Dictionary
    ...                    name=Automated Security Incident
    ...                    type=Malware Infection
    ...                    severity=High
    ...                    source=SIEM Alert
    ...                    details=Suspicious activity detected on workstation-001
    ...                    status=Investigating
    
    # Crear caso automáticamente
    \${case_response}=     POST On Session    demisto    /incident    
    ...                    json=\${new_incident}    headers=\${demisto_headers}    timeout=20
    Should Be Equal        \${case_response.status_code}    201
    
    \${incident_id}=       Set Variable    \${case_response.json()['id']}
    Should Not Be Empty    \${incident_id}
    
    # Ejecutar workflow automático de investigación
    \${investigation_tasks}= Create List
    ...                      collect_system_information
    ...                      analyze_network_connections
    ...                      check_process_list
    ...                      scan_for_malware
    ...                      collect_forensic_evidence
    
    FOR    \${task}    IN    @{investigation_tasks}
        # Crear task automático
        \${task_data}=     Create Dictionary
        ...                incident_id=\${incident_id}
        ...                task_type=\${task}
        ...                assignee=automation
        ...                priority=high
        ...                due_date=\${CURRENT_DATE}
        
        \${task_response}= POST On Session    demisto    /task    
        ...                json=\${task_data}    headers=\${demisto_headers}    timeout=15
        Should Be Equal    \${task_response.status_code}    201
        
        \${task_id}=       Set Variable    \${task_response.json()['id']}
        
        # Ejecutar task automáticamente
        \${execution_result}= Execute Investigation Task    \${task}    \${incident_id}    \${task_id}
        
        # Actualizar task con resultado
        \${update_data}=   Create Dictionary    
        ...                status=completed
        ...                result=\${execution_result}
        ...                completed_by=automation
        
        \${update_response}= PUT On Session    demisto    /task/\${task_id}    
        ...                   json=\${update_data}    headers=\${demisto_headers}    timeout=15
        Should Be Equal      \${update_response.status_code}    200
        
        Log                  Investigation task completed: \${task}
    END
    
    # Generar recomendaciones automáticas
    \${recommendations}=   Generate Incident Recommendations    \${incident_id}    \${investigation_tasks}
    
    # Actualizar incident con recomendaciones
    \${incident_update}=   Create Dictionary    
    ...                    status=Analysis Complete
    ...                    recommendations=\${recommendations}
    ...                    updated_by=automation
    
    \${incident_update_response}= PUT On Session    demisto    /incident/\${incident_id}    
    ...                            json=\${incident_update}    headers=\${demisto_headers}    timeout=20
    Should Be Equal                \${incident_update_response.status_code}    200
    
    Log                            Incident \${incident_id} processed automatically
    Set Global Variable            \${CURRENT_INCIDENT_ID}    \${incident_id}

Execute Automated Response Actions
    [Documentation]    Ejecuta acciones de respuesta automáticas basadas en playbooks
    [Tags]             automated_response    containment    remediation
    
    # Cargar reglas de automatización
    \${rules_content}=     Get File    \${AUTOMATION_RULES}
    \${automation_rules}=  Evaluate    json.loads(r'''\${rules_content}''')
    @{response_rules}=     Set Variable    \${automation_rules['rules']}
    
    FOR    \${rule}    IN    @{response_rules}
        \${rule_name}=     Set Variable    \${rule['name']}
        \${trigger_conditions}= Set Variable    \${rule['conditions']}
        \${response_actions}=   Set Variable    \${rule['actions']}
        \${auto_execute}=      Set Variable    \${rule['auto_execute']}
        
        # Evaluar condiciones del trigger
        \${conditions_met}= Evaluate Rule Conditions    \${trigger_conditions}
        
        Run Keyword If     \${conditions_met} and \${auto_execute}
        ...                Execute Automated Actions    \${response_actions}    \${rule_name}
        ...                ELSE IF    \${conditions_met} and not \${auto_execute}
        ...                Queue Manual Review    \${rule_name}    \${response_actions}
        
        Log                Rule \${rule_name}: conditions_met=\${conditions_met}, auto_execute=\${auto_execute}
    END
    
    # Acciones específicas para contención de malware
    \${malware_detected}=  Set Variable    True  # Simular detección
    
    Run Keyword If         \${malware_detected}
    ...                    Execute Malware Containment Workflow
    
    # Acciones para anomalías de red
    \${network_anomaly}=   Detect Network Anomalies
    
    Run Keyword If         \${network_anomaly}
    ...                    Execute Network Isolation Procedures    \${network_anomaly}
    
    # Actualizar métricas de respuesta
    \${current_responses}= Get From Dictionary    \${RESPONSE_METRICS}    automated_responses
    \${new_responses}=     Evaluate    \${current_responses} + 3
    Set To Dictionary      \${RESPONSE_METRICS}    automated_responses=\${new_responses}

Deploy Security Automation Pipeline
    [Documentation]    Despliega pipeline completo de security automation
    [Tags]             pipeline    automation    integration
    
    # Crear pipeline de automation con múltiples stages
    @{pipeline_stages}=    Create List
    ...                    alert_ingestion
    ...                    threat_enrichment
    ...                    risk_assessment
    ...                    automated_triage
    ...                    response_execution
    ...                    case_documentation
    
    \${pipeline_id}=       Generate Pipeline ID
    
    FOR    \${stage}    IN    @{pipeline_stages}
        # Configurar stage del pipeline
        \${stage_config}=  Create Dictionary
        ...                pipeline_id=\${pipeline_id}
        ...                stage_name=\${stage}
        ...                enabled=true
        ...                timeout=300
        ...                retry_count=3
        
        # Desplegar stage configuration
        Deploy Pipeline Stage    \${stage}    \${stage_config}
        
        # Configurar health checks
        \${health_check}=  Create Dictionary
        ...                stage=\${stage}
        ...                check_interval=60
        ...                failure_threshold=3
        
        Configure Stage Health Check    \${stage}    \${health_check}
        
        Log                Stage deployed: \${stage}
    END
    
    # Configurar integration points
    @{integration_points}= Create List    siem_connector    threat_intel_feeds    ticketing_system    notification_channels
    
    FOR    \${integration}    IN    @{integration_points}
        \${integration_config}= Get Integration Config    \${integration}
        Configure Pipeline Integration    \${pipeline_id}    \${integration}    \${integration_config}
        
        # Test integration connectivity
        \${connectivity_test}= Test Integration Connectivity    \${integration}
        Should Be True         \${connectivity_test}
        
        Log                    Integration configured: \${integration}
    END
    
    # Activar pipeline completo
    \${activation_data}=   Create Dictionary    pipeline_id=\${pipeline_id}    active=true
    \${activation_result}= Activate Security Pipeline    \${activation_data}
    Should Be True         \${activation_result}
    
    Set Global Variable    \${ACTIVE_PIPELINE_ID}    \${pipeline_id}
    Log                    Security automation pipeline activated: \${pipeline_id}

Generate Security Orchestration Metrics
    [Documentation]    Genera métricas de orchestration y automation effectiveness
    [Tags]             metrics    orchestration    reporting
    
    # Recopilar métricas de automation
    \${automation_metrics}= Create Dictionary
    ...                     pipeline_id=\${ACTIVE_PIPELINE_ID}
    ...                     incident_id=\${CURRENT_INCIDENT_ID}
    ...                     response_metrics=\${RESPONSE_METRICS}
    ...                     assessment_period=24h
    
    # Calcular effectiveness metrics
    \${total_responses}=   Evaluate    \${RESPONSE_METRICS.automated_responses} + \${RESPONSE_METRICS.manual_escalations}
    \${automation_rate}=   Evaluate    (\${RESPONSE_METRICS.automated_responses} / max(1, \${total_responses})) * 100
    \${false_positive_rate}= Evaluate  (\${RESPONSE_METRICS.false_positives} / max(1, \${total_responses})) * 100
    
    Set To Dictionary      \${automation_metrics}    automation_rate=\${automation_rate}
    Set To Dictionary      \${automation_metrics}    false_positive_rate=\${false_positive_rate}
    
    # Calcular time-based metrics
    \${mean_response_time}= Calculate Mean Response Time    \${RESPONSE_METRICS}
    \${sla_compliance}=     Calculate SLA Compliance    \${mean_response_time}
    
    Set To Dictionary      \${automation_metrics}    mean_response_time=\${mean_response_time}
    Set To Dictionary      \${automation_metrics}    sla_compliance=\${sla_compliance}
    
    # Generar dashboard de orchestration
    \${dashboard_data}=    Create Dictionary
    ...                    generated_at=\${CURRENT_DATE}
    ...                    orchestration_metrics=\${automation_metrics}
    ...                    pipeline_health=healthy
    ...                    active_playbooks=5
    
    # Crear dashboard HTML
    \${dashboard_template}= Get File    templates/orchestration_dashboard.html
    \${dashboard_html}=     Render Orchestration Dashboard    \${dashboard_template}    \${dashboard_data}
    Create File             security_orchestration_dashboard.html    \${dashboard_html}
    
    # Generar métricas JSON
    \${metrics_json}=      Evaluate    json.dumps(\${dashboard_data}, indent=2)
    Create File            orchestration_metrics.json    \${metrics_json}
    
    # Generar alertas si automation rate es bajo
    Run Keyword If         \${automation_rate} < 70.0
    ...                    Send Low Automation Alert    \${automation_rate}
    
    File Should Exist      security_orchestration_dashboard.html
    File Should Exist      orchestration_metrics.json
    
    Log                    Security orchestration metrics generated
    Log                    Automation rate: \${automation_rate}%
    Log                    Mean response time: \${mean_response_time} minutes
    Log                    SLA compliance: \${sla_compliance}%
    Log                    False positive rate: \${false_positive_rate}%

*** Keywords ***
Initialize Security Orchestration
    Log                    🤖 Initializing security orchestration and automation
    Set Global Variable    \${CURRENT_DATE}    2024-01-15
    Set Global Variable    \${PHANTOM_PASSWORD}    your_phantom_password
    Set Global Variable    \${DEMISTO_PASSWORD}    your_demisto_password
    
    # Crear archivos de configuración si no existen
    Create File            \${WORKFLOWS_CONFIG}    {"playbooks": [{"name": "Malware Response", "trigger": "malware_alert", "actions": ["isolate_host", "collect_evidence"], "priority": "high"}]}
    Create File            \${ENRICHMENT_APIs}     {"apis": [{"name": "virustotal", "url": "https://www.virustotal.com/vtapi/v2", "api_key": "your_vt_key"}]}
    Create File            \${AUTOMATION_RULES}    {"rules": [{"name": "Auto Malware Containment", "conditions": {"threat_type": "malware", "severity": "high"}, "actions": ["isolate", "scan"], "auto_execute": true}]}
    Create File            templates/orchestration_dashboard.html    <html><body><h1>Security Orchestration Dashboard</h1></body></html>

Configure Playbook Triggers
    [Arguments]            \${playbook_id}    \${trigger_type}    \${headers}
    Log                    Configuring triggers for playbook \${playbook_id}: \${trigger_type}

Process Enrichment Response
    [Arguments]            \${api_name}    \${response_data}    \${enrichment_data}
    Append To List         \${enrichment_data['ioc_collected']}    \${api_name}
    Log                    Processed enrichment from \${api_name}

Consolidate Threat Intelligence
    [Arguments]            \${enrichment_data}
    \${consolidated}=      Create Dictionary    sources=\${len(\${enrichment_data['ioc_collected']})}    confidence=high
    RETURN                 \${consolidated}

Store IOC Intelligence
    [Arguments]            \${ioc}    \${intelligence}
    Log                    Stored intelligence for IOC: \${ioc['value']}

Execute Investigation Task
    [Arguments]            \${task_type}    \${incident_id}    \${task_id}
    \${result}=            Set Variable    Task \${task_type} completed successfully
    RETURN                 \${result}

Generate Incident Recommendations
    [Arguments]            \${incident_id}    \${tasks}
    @{recommendations}=    Create List    Isolate affected systems    Update security policies    Conduct security awareness training
    RETURN                 \${recommendations}

Evaluate Rule Conditions
    [Arguments]            \${conditions}
    \${conditions_met}=    Set Variable    True
    RETURN                 \${conditions_met}

Execute Automated Actions
    [Arguments]            \${actions}    \${rule_name}
    FOR    \${action}    IN    @{actions}
        Log                Executing automated action: \${action} (rule: \${rule_name})
    END
    \${current_responses}= Get From Dictionary    \${RESPONSE_METRICS}    automated_responses
    \${new_responses}=     Evaluate    \${current_responses} + 1
    Set To Dictionary      \${RESPONSE_METRICS}    automated_responses=\${new_responses}

Queue Manual Review
    [Arguments]            \${rule_name}    \${actions}
    Log                    Queued for manual review: \${rule_name}
    \${current_escalations}= Get From Dictionary    \${RESPONSE_METRICS}    manual_escalations
    \${new_escalations}=     Evaluate    \${current_escalations} + 1
    Set To Dictionary        \${RESPONSE_METRICS}    manual_escalations=\${new_escalations}

Execute Malware Containment Workflow
    Log                    Executing automated malware containment workflow
    # Simular acciones de containment

Detect Network Anomalies
    \${anomaly_detected}=  Set Variable    False
    RETURN                 \${anomaly_detected}

Execute Network Isolation Procedures
    [Arguments]            \${anomaly}
    Log                    Executing network isolation for anomaly: \${anomaly}

Generate Pipeline ID
    \${pipeline_id}=       Set Variable    SEC-PIPELINE-001
    RETURN                 \${pipeline_id}

Deploy Pipeline Stage
    [Arguments]            \${stage}    \${config}
    Log                    Deploying pipeline stage: \${stage}

Configure Stage Health Check
    [Arguments]            \${stage}    \${health_config}
    Log                    Configured health check for stage: \${stage}

Get Integration Config
    [Arguments]            \${integration}
    \${config}=            Create Dictionary    endpoint=https://api.example.com    timeout=30
    RETURN                 \${config}

Configure Pipeline Integration
    [Arguments]            \${pipeline_id}    \${integration}    \${config}
    Log                    Configured integration: \${integration} for pipeline \${pipeline_id}

Test Integration Connectivity
    [Arguments]            \${integration}
    \${connectivity}=      Set Variable    True
    RETURN                 \${connectivity}

Activate Security Pipeline
    [Arguments]            \${activation_data}
    \${result}=            Set Variable    True
    RETURN                 \${result}

Calculate Mean Response Time
    [Arguments]            \${metrics}
    \${mean_time}=         Set Variable    15
    RETURN                 \${mean_time}

Calculate SLA Compliance
    [Arguments]            \${response_time}
    \${compliance}=        Set Variable If    \${response_time} <= 30    95.5    85.2
    RETURN                 \${compliance}

Render Orchestration Dashboard
    [Arguments]            \${template}    \${data}
    \${rendered}=          Set Variable    <html><body><h1>Orchestration Dashboard Generated</h1></body></html>
    RETURN                 \${rendered}

Send Low Automation Alert
    [Arguments]            \${rate}
    Log                    🚨 LOW AUTOMATION ALERT: Automation rate below threshold: \${rate}%

Archive Orchestration Results
    Log                    📁 Archiving security orchestration results and automation metrics</code></pre>
        
        <h3>🎯 Práctica Orchestration (7 min):</h3>
        <p>1. Configura Phantom SOAR platform con playbooks automatizados</p>
        <p>2. Integra Demisto para case management automatizado</p>
        <p>3. Implementa threat enrichment automático con múltiples APIs</p>
        <p>4. Desarrolla automated response actions con containment</p>
        <p>5. Despliega security automation pipeline completo</p>
        <p>6. Configura integration points con SIEM y ticketing</p>
        <p>7. Implementa health checks y monitoring de pipeline</p>
        <p>8. Genera métricas de orchestration effectiveness</p>
        <p>9. Crea dashboards ejecutivos de automation ROI</p>
        <p>10. Configura alertas para automation rate bajo</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar security orchestration con SOAR platforms</li>
                <li>Implementar automated response workflows enterprise</li>
                <li>Integrar threat enrichment y case management</li>
                <li>Generar métricas de automation effectiveness</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Configura automation rules con auto_execute: false para human approval en acciones críticas como network isolation.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 218 - Security DevSecOps integration</h3>
        <p>Con security automation operando, integrarás security testing en DevSecOps pipelines con shift-left security practices.</p>
    `,
    topics: ["security", "vulnerabilities", "pentesting"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-216"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_217 = LESSON_217;
}