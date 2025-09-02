/**
 * Robot Framework Academy - Lesson 213
 * Security 213
 */

const LESSON_213 = {
    id: 213,
    title: "Security 213",
    duration: "10 min",
    level: "advanced",
    section: "section-17",
    content: `
        <h2>🔍 Vulnerability Assessment</h2>
        <p>Automatiza vulnerability assessment con herramientas enterprise y genera reportes ejecutivos de riesgo.</p>
        
        <h3>💻 Assessment Automatizado:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    🔍 AUTOMATED VULNERABILITY ASSESSMENT SUITE
Library          RequestsLibrary
Library          Process
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          JSON
Library          String
Suite Setup      Initialize Vulnerability Assessment
Suite Teardown   Archive Assessment Results

*** Variables ***
\${TARGET_NETWORK}    10.0.0.0/24
\${TARGET_DOMAIN}     company.com
\${NMAP_RESULTS}      nmap_scan_results.xml
\${NIKTO_RESULTS}     nikto_scan_results.txt
\${OPENVAS_API}       http://openvas.company.com:9392
\${NUCLEI_TEMPLATES}  /opt/nuclei-templates
\${ASSESSMENT_REPORT} vulnerability_assessment.json
\${CRITICAL_THRESHOLD} 9.0
\${HIGH_THRESHOLD}    7.0
\${SCAN_TIMEOUT}      1800
&{VULNERABILITY_STATS} critical=0  high=0  medium=0  low=0  info=0

*** Test Cases ***
Execute Network Discovery Scan
    [Documentation]    Descubre servicios y puertos abiertos en la red objetivo
    [Tags]             network_discovery    reconnaissance    nmap
    
    # Ejecutar nmap discovery scan
    \${nmap_discovery}=  Run Process    nmap    
    ...                  -sn    -PE    -PP    -PS80,443,22    
    ...                  --min-rate    1000    
    ...                  --max-retries    2    
    ...                  \${TARGET_NETWORK}    
    ...                  timeout=\${SCAN_TIMEOUT}
    
    Should Be Equal      \${nmap_discovery.rc}    0
    Should Not Be Empty  \${nmap_discovery.stdout}
    
    # Parsear hosts activos
    @{active_hosts}=     Extract Active Hosts    \${nmap_discovery.stdout}
    Should Not Be Empty  \${active_hosts}
    \${host_count}=      Get Length    \${active_hosts}
    Should Be True       \${host_count} > 0
    
    Log                  Network discovery completed
    Log                  Active hosts found: \${host_count}
    
    # Port scanning de hosts activos
    FOR    \${host}    IN    @{active_hosts}
        \${port_scan}=   Run Process    nmap    
        ...              -sS    -sV    -O    
        ...              --script=default,vuln    
        ...              --min-rate    500    
        ...              -oX    \${NMAP_RESULTS}_\${host}.xml    
        ...              \${host}    
        ...              timeout=600
        
        Should Be Equal  \${port_scan.rc}    0
        File Should Exist    \${NMAP_RESULTS}_\${host}.xml
        
        # Analizar servicios detectados
        \${services}=    Parse Nmap Results    \${NMAP_RESULTS}_\${host}.xml
        \${service_count}= Get Length    \${services}
        
        Log              Host \${host}: \${service_count} services detected
        
        # Identificar servicios críticos
        FOR    \${service}    IN    @{services}
            \${port}=        Set Variable    \${service['port']}
            \${service_name}= Set Variable    \${service['name']}
            \${version}=     Set Variable    \${service['version']}
            
            # Flagear servicios de alto riesgo
            Run Keyword If   '\${service_name}' in ['ssh', 'telnet', 'ftp', 'mysql', 'postgresql']
            ...              Flag Critical Service    \${host}    \${port}    \${service_name}
            
            Log              Service: \${host}:\${port} (\${service_name} \${version})
        END
    END

Run Web Application Vulnerability Scan
    [Documentation]    Ejecuta scan comprehensivo de vulnerabilidades web
    [Tags]             web_vulnerabilities    nikto    application_scan
    
    # Usar Nikto para web application scanning
    @{web_targets}=      Create List    https://\${TARGET_DOMAIN}    http://\${TARGET_DOMAIN}
    
    FOR    \${target}    IN    @{web_targets}
        # Verificar que target responde
        Create Session   target_check    \${target}    timeout=10
        \${health_check}= Run Keyword And Return Status
        ...              GET On Session    target_check    /    timeout=5
        
        Continue For Loop If    not \${health_check}
        
        # Ejecutar Nikto scan
        \${nikto_result}=    Run Process    nikto    
        ...                  -h    \${target}    
        ...                  -Format    txt    
        ...                  -output    \${NIKTO_RESULTS}_\${target.replace('://', '_').replace('/', '')}.txt    
        ...                  -Tuning    x    
        ...                  timeout=900
        
        Should Be Equal      \${nikto_result.rc}    0
        
        # Parsear resultados Nikto
        \${nikto_file}=      Set Variable    \${NIKTO_RESULTS}_\${target.replace('://', '_').replace('/', '')}.txt
        File Should Exist    \${nikto_file}
        \${nikto_content}=   Get File    \${nikto_file}
        
        # Analizar vulnerabilidades encontradas
        @{nikto_findings}=   Parse Nikto Results    \${nikto_content}
        \${finding_count}=   Get Length    \${nikto_findings}
        
        FOR    \${finding}    IN    @{nikto_findings}
            \${osvdb_id}=    Set Variable    \${finding['osvdb']}
            \${description}= Set Variable    \${finding['description']}
            \${uri}=         Set Variable    \${finding['uri']}
            
            # Clasificar por severidad
            \${severity}=    Classify Vulnerability Severity    \${description}
            
            Run Keyword If   '\${severity}' == 'HIGH'
            ...              Increment Vulnerability Count    high
            ...              ELSE IF    '\${severity}' == 'MEDIUM'
            ...              Increment Vulnerability Count    medium
            ...              ELSE    Increment Vulnerability Count    low
            
            Log              Web vuln: \${target}\${uri} - \${description} [\${severity}]
        END
        
        Log                  Web scan \${target}: \${finding_count} vulnerabilities found
    END

Execute Nuclei Template Scanning
    [Documentation]    Usa Nuclei para detectar vulnerabilidades con templates
    [Tags]             nuclei    template_scanning    cve_detection
    
    # Verificar templates de Nuclei disponibles
    Directory Should Exist    \${NUCLEI_TEMPLATES}
    
    # Ejecutar Nuclei scan con templates críticos
    \${nuclei_result}=   Run Process    nuclei    
    ...                  -u    \${TARGET_DOMAIN}    
    ...                  -t    \${NUCLEI_TEMPLATES}/cves/    
    ...                  -t    \${NUCLEI_TEMPLATES}/vulnerabilities/    
    ...                  -t    \${NUCLEI_TEMPLATES}/exposures/    
    ...                  -severity    critical,high,medium    
    ...                  -json    -o    nuclei_results.json    
    ...                  -rate-limit    50    
    ...                  timeout=1200
    
    Should Be Equal      \${nuclei_result.rc}    0
    File Should Exist    nuclei_results.json
    
    # Parsear resultados Nuclei JSON
    \${nuclei_content}=  Get File    nuclei_results.json
    Should Not Be Empty  \${nuclei_content}
    
    @{nuclei_lines}=     Split To Lines    \${nuclei_content}
    
    FOR    \${line}    IN    @{nuclei_lines}
        Continue For Loop If    '\${line}' == ''
        
        \${nuclei_finding}=  Evaluate    json.loads(r'''\${line}''')
        \${template_id}=     Set Variable    \${nuclei_finding['template-id']}
        \${severity}=        Set Variable    \${nuclei_finding['info']['severity']}
        \${matched_at}=      Set Variable    \${nuclei_finding['matched-at']}
        
        # Incrementar contadores por severidad
        Run Keyword If       '\${severity}' == 'critical'
        ...                  Increment Vulnerability Count    critical
        ...                  ELSE IF    '\${severity}' == 'high'
        ...                  Increment Vulnerability Count    high
        ...                  ELSE IF    '\${severity}' == 'medium'
        ...                  Increment Vulnerability Count    medium
        ...                  ELSE    Increment Vulnerability Count    low
        
        # Logging detallado para vulnerabilidades críticas y altas
        Run Keyword If       '\${severity}' in ['critical', 'high']
        ...                  Log    CRITICAL/HIGH: \${template_id} at \${matched_at}
        
        Log                  Nuclei finding: \${template_id} [\${severity}] at \${matched_at}
    END
    
    Log                  Nuclei scanning completed
    Log                  Critical: \${VULNERABILITY_STATS.critical}
    Log                  High: \${VULNERABILITY_STATS.high}
    Log                  Medium: \${VULNERABILITY_STATS.medium}

Integrate OpenVAS Vulnerability Scanner
    [Documentation]    Integra con OpenVAS para assessment enterprise
    [Tags]             openvas    enterprise_scanning    comprehensive
    
    # Conectar con OpenVAS API
    Create Session       openvas    \${OPENVAS_API}    timeout=30
    
    # Autenticación (usando API key en headers)
    \${auth_headers}=    Create Dictionary    
    ...                  X-API-KEY=\${OPENVAS_API_KEY}    
    ...                  Content-Type=application/json
    
    # Crear target en OpenVAS
    \${target_data}=     Create Dictionary    
    ...                  name=Automated_Assessment_Target    
    ...                  hosts=\${TARGET_DOMAIN}    
    ...                  port_list_id=33d0cd82-57c6-11e1-8ed1-406186ea4fc5
    
    \${target_response}= POST On Session    openvas    /targets    
    ...                  json=\${target_data}    headers=\${auth_headers}    timeout=60
    Should Be Equal      \${target_response.status_code}    201
    
    \${target_id}=       Set Variable    \${target_response.json()['id']}
    Should Not Be Empty  \${target_id}
    
    # Crear task de scanning
    \${task_data}=       Create Dictionary    
    ...                  name=Automated_Vulnerability_Assessment    
    ...                  target_id=\${target_id}    
    ...                  scanner_id=08b69003-5fc2-4037-a479-93b440211c73    
    ...                  config_id=daba56c8-73ec-11df-a475-002264764cea
    
    \${task_response}=   POST On Session    openvas    /tasks    
    ...                  json=\${task_data}    headers=\${auth_headers}    timeout=60
    Should Be Equal      \${task_response.status_code}    201
    
    \${task_id}=         Set Variable    \${task_response.json()['id']}
    
    # Iniciar scan
    \${start_data}=      Create Dictionary    task_id=\${task_id}
    \${start_response}=  POST On Session    openvas    /tasks/\${task_id}/start    
    ...                  json=\${start_data}    headers=\${auth_headers}    timeout=30
    Should Be Equal      \${start_response.status_code}    200
    
    # Monitorear progreso del scan (máximo 30 minutos)
    FOR    \${attempt}    IN RANGE    60
        \${status_response}= GET On Session    openvas    /tasks/\${task_id}    
        ...                  headers=\${auth_headers}    timeout=15
        Should Be Equal      \${status_response.status_code}    200
        
        \${task_status}=     Set Variable    \${status_response.json()['status']}
        \${progress}=        Set Variable    \${status_response.json()['progress']}
        
        Exit For Loop If     '\${task_status}' == 'Done'
        
        Log                  OpenVAS scan progress: \${progress}% (\${task_status})
        Sleep                30s
    END
    
    # Obtener resultados del scan
    \${results_response}= GET On Session    openvas    /tasks/\${task_id}/results    
    ...                   headers=\${auth_headers}    timeout=60
    Should Be Equal       \${results_response.status_code}    200
    
    \${scan_results}=     Set Variable    \${results_response.json()}
    \${total_vulns}=      Get Length    \${scan_results['results']}
    Should Be True        \${total_vulns} >= 0
    
    # Procesar y clasificar resultados OpenVAS
    FOR    \${result}    IN    @{scan_results['results']}
        \${cvss_score}=   Set Variable    \${result['severity']}
        \${nvt_name}=     Set Variable    \${result['nvt']['name']}
        \${host}=         Set Variable    \${result['host']}
        
        # Clasificar por CVSS score
        \${severity_class}= Classify CVSS Score    \${cvss_score}
        
        Run Keyword If    '\${severity_class}' == 'critical'
        ...               Increment Vulnerability Count    critical
        ...               ELSE IF    '\${severity_class}' == 'high'
        ...               Increment Vulnerability Count    high
        ...               ELSE IF    '\${severity_class}' == 'medium'
        ...               Increment Vulnerability Count    medium
        ...               ELSE    Increment Vulnerability Count    low
        
        Log               OpenVAS result: \${nvt_name} on \${host} [CVSS: \${cvss_score}]
    END
    
    Log                 OpenVAS scan completed: \${total_vulns} vulnerabilities found

Calculate Risk Score and Prioritization
    [Documentation]    Calcula risk score enterprise y prioriza remediación
    [Tags]             risk_assessment    prioritization    business_impact
    
    # Calcular risk score basado en vulnerabilidades encontradas
    \${critical_weight}= Set Variable    10
    \${high_weight}=     Set Variable    7
    \${medium_weight}=   Set Variable    4
    \${low_weight}=      Set Variable    1
    
    \${total_risk_score}= Evaluate    
    ...    (\${VULNERABILITY_STATS.critical} * \${critical_weight}) + 
    ...    (\${VULNERABILITY_STATS.high} * \${high_weight}) + 
    ...    (\${VULNERABILITY_STATS.medium} * \${medium_weight}) + 
    ...    (\${VULNERABILITY_STATS.low} * \${low_weight})
    
    # Normalizar score a escala 0-100
    \${max_possible_score}= Set Variable    500
    \${normalized_score}=    Evaluate    min(100, (\${total_risk_score} / \${max_possible_score}) * 100)
    \${security_grade}=      Calculate Security Grade    \${normalized_score}
    
    # Determinar nivel de riesgo para la organización
    \${risk_level}=      Set Variable If    \${VULNERABILITY_STATS.critical} > 0    CRITICAL
    ...                  \${VULNERABILITY_STATS.high} > 5    HIGH
    ...                  \${VULNERABILITY_STATS.medium} > 10    MEDIUM    LOW
    
    # Crear matriz de priorización
    @{remediation_priorities}= Create List
    
    # Prioridad 1: Vulnerabilidades críticas
    Run Keyword If       \${VULNERABILITY_STATS.critical} > 0
    ...                  Append To List    \${remediation_priorities}    
    ...                  Critical vulnerabilities require immediate attention (\${VULNERABILITY_STATS.critical} found)
    
    # Prioridad 2: Alto volumen de vulnerabilidades altas
    Run Keyword If       \${VULNERABILITY_STATS.high} > 3
    ...                  Append To List    \${remediation_priorities}    
    ...                  High volume of high-severity vulnerabilities (\${VULNERABILITY_STATS.high} found)
    
    # Prioridad 3: Servicios críticos expuestos
    Run Keyword If       \${CRITICAL_SERVICES_EXPOSED} > 0
    ...                  Append To List    \${remediation_priorities}    
    ...                  Critical services exposed to network (\${CRITICAL_SERVICES_EXPOSED} services)
    
    # Generar recomendaciones de remediación
    @{remediation_actions}= Generate Remediation Actions    \${VULNERABILITY_STATS}
    
    Log                  Risk assessment completed
    Log                  Total risk score: \${total_risk_score} (normalized: \${normalized_score}/100)
    Log                  Security grade: \${security_grade}
    Log                  Organizational risk level: \${risk_level}
    Log                  Remediation priorities: \${remediation_priorities}
    
    Set Global Variable  \${RISK_SCORE}    \${normalized_score}
    Set Global Variable  \${SECURITY_GRADE}    \${security_grade}
    Set Global Variable  \${RISK_LEVEL}    \${risk_level}

Generate Executive Vulnerability Report
    [Documentation]    Genera reporte ejecutivo de vulnerability assessment
    [Tags]             reporting    executive    documentation
    
    # Compilar datos del assessment
    \${assessment_data}= Create Dictionary
    ...                  target_domain=\${TARGET_DOMAIN}
    ...                  assessment_date=\${CURRENT_DATE}
    ...                  total_vulnerabilities=\${VULNERABILITY_STATS}
    ...                  risk_score=\${RISK_SCORE}
    ...                  security_grade=\${SECURITY_GRADE}
    ...                  risk_level=\${RISK_LEVEL}
    
    # Calcular métricas ejecutivas
    \${total_vulns}=     Evaluate    \${VULNERABILITY_STATS.critical} + \${VULNERABILITY_STATS.high} + \${VULNERABILITY_STATS.medium} + \${VULNERABILITY_STATS.low}
    \${high_critical}=   Evaluate    \${VULNERABILITY_STATS.critical} + \${VULNERABILITY_STATS.high}
    \${remediation_cost}= Calculate Remediation Cost    \${VULNERABILITY_STATS}
    \${business_risk}=   Calculate Business Risk Impact    \${VULNERABILITY_STATS}
    
    Set To Dictionary    \${assessment_data}    total_vulnerabilities_count=\${total_vulns}
    Set To Dictionary    \${assessment_data}    high_critical_count=\${high_critical}
    Set To Dictionary    \${assessment_data}    estimated_remediation_cost=\${remediation_cost}
    Set To Dictionary    \${assessment_data}    business_risk_impact=\${business_risk}
    
    # Generar timeline de remediación recomendado
    \${remediation_timeline}= Create Dictionary
    ...                       immediate=Critical vulnerabilities (0-7 days)
    ...                       short_term=High severity vulnerabilities (1-30 days)
    ...                       medium_term=Medium severity vulnerabilities (30-90 days)
    ...                       long_term=Low severity and improvement recommendations (90+ days)
    
    Set To Dictionary     \${assessment_data}    remediation_timeline=\${remediation_timeline}
    
    # Generar reporte JSON para APIs
    \${report_json}=      Evaluate    json.dumps(\${assessment_data}, indent=2)
    Create File           \${ASSESSMENT_REPORT}    \${report_json}
    
    # Generar reporte HTML ejecutivo
    \${html_template}=    Get File    templates/vulnerability_report_template.html
    \${executive_html}=   Render Report Template    \${html_template}    \${assessment_data}
    Create File           vulnerability_assessment_executive.html    \${executive_html}
    
    # Generar reporte técnico detallado
    \${technical_template}= Get File    templates/technical_vulnerability_report.html
    \${technical_html}=     Render Report Template    \${technical_template}    \${assessment_data}
    Create File             vulnerability_assessment_technical.html    \${technical_html}
    
    # Generar CSV para tracking y metrics
    \${csv_data}=         Generate Vulnerability CSV    \${assessment_data}
    Create File           vulnerability_metrics.csv    \${csv_data}
    
    # Verificar archivos generados
    File Should Exist     \${ASSESSMENT_REPORT}
    File Should Exist     vulnerability_assessment_executive.html
    File Should Exist     vulnerability_assessment_technical.html
    File Should Exist     vulnerability_metrics.csv
    
    # Generar alertas automáticas para vulnerabilidades críticas
    Run Keyword If        \${VULNERABILITY_STATS.critical} > 0
    ...                   Send Critical Vulnerability Alert    \${VULNERABILITY_STATS.critical}
    
    Log                   Vulnerability assessment report generated
    Log                   Executive report: vulnerability_assessment_executive.html
    Log                   Technical report: vulnerability_assessment_technical.html
    Log                   Risk score: \${RISK_SCORE}/100 (Grade: \${SECURITY_GRADE})
    Log                   Business risk impact: \${business_risk}

*** Keywords ***
Initialize Vulnerability Assessment
    Log                   🔍 Initializing automated vulnerability assessment
    Set Global Variable   \${CURRENT_DATE}    2024-01-15
    Set Global Variable   \${OPENVAS_API_KEY}    your_openvas_api_key_here
    Set Global Variable   \${CRITICAL_SERVICES_EXPOSED}    0
    
    # Crear templates si no existen
    Create File           templates/vulnerability_report_template.html    
    ...                   <html><body><h1>Vulnerability Assessment Report</h1></body></html>
    Create File           templates/technical_vulnerability_report.html    
    ...                   <html><body><h1>Technical Vulnerability Details</h1></body></html>

Extract Active Hosts
    [Arguments]           \${nmap_output}
    @{hosts}=             Create List    10.0.0.1    10.0.0.5    10.0.0.10
    RETURN                \${hosts}

Parse Nmap Results
    [Arguments]           \${nmap_xml_file}
    @{services}=          Create List    
    ...                   @{[{'port': '22', 'name': 'ssh', 'version': 'OpenSSH 7.4'}]}
    ...                   @{[{'port': '80', 'name': 'http', 'version': 'Apache 2.4.6'}]}
    RETURN                \${services}

Flag Critical Service
    [Arguments]           \${host}    \${port}    \${service}
    \${current_count}=    Get Variable Value    \${CRITICAL_SERVICES_EXPOSED}    0
    \${new_count}=        Evaluate    \${current_count} + 1
    Set Global Variable   \${CRITICAL_SERVICES_EXPOSED}    \${new_count}
    Log                   Critical service flagged: \${service} on \${host}:\${port}

Parse Nikto Results
    [Arguments]           \${nikto_content}
    @{findings}=          Create List    
    ...                   @{[{'osvdb': '3092', 'description': 'Server banner disclosure', 'uri': '/'}]}
    RETURN                \${findings}

Classify Vulnerability Severity
    [Arguments]           \${description}
    \${severity}=         Set Variable If    'SQL' in '\${description}'    HIGH
    ...                   'XSS' in '\${description}'    HIGH    MEDIUM
    RETURN                \${severity}

Increment Vulnerability Count
    [Arguments]           \${severity_level}
    \${current_count}=    Get From Dictionary    \${VULNERABILITY_STATS}    \${severity_level}
    \${new_count}=        Evaluate    \${current_count} + 1
    Set To Dictionary     \${VULNERABILITY_STATS}    \${severity_level}=\${new_count}

Classify CVSS Score
    [Arguments]           \${cvss_score}
    \${score_float}=      Convert To Number    \${cvss_score}
    \${classification}=   Set Variable If    \${score_float} >= \${CRITICAL_THRESHOLD}    critical
    ...                   \${score_float} >= \${HIGH_THRESHOLD}    high
    ...                   \${score_float} >= 4.0    medium    low
    RETURN                \${classification}

Calculate Security Grade
    [Arguments]           \${score}
    \${grade}=            Set Variable If    \${score} >= 90    A
    ...                   \${score} >= 80    B
    ...                   \${score} >= 70    C
    ...                   \${score} >= 60    D    F
    RETURN                \${grade}

Generate Remediation Actions
    [Arguments]           \${vuln_stats}
    @{actions}=           Create List    
    ...                   Patch critical vulnerabilities immediately
    ...                   Implement network segmentation
    ...                   Update security policies
    RETURN                \${actions}

Calculate Remediation Cost
    [Arguments]           \${vuln_stats}
    \${cost}=             Evaluate    (\${vuln_stats.critical} * 5000) + (\${vuln_stats.high} * 2000) + (\${vuln_stats.medium} * 500)
    RETURN                \${cost}

Calculate Business Risk Impact
    [Arguments]           \${vuln_stats}
    \${impact}=           Set Variable If    \${vuln_stats.critical} > 0    Very High
    ...                   \${vuln_stats.high} > 5    High    Medium
    RETURN                \${impact}

Render Report Template
    [Arguments]           \${template}    \${data}
    \${rendered}=         Set Variable    <html><body><h1>Vulnerability Assessment Completed</h1></body></html>
    RETURN                \${rendered}

Generate Vulnerability CSV
    [Arguments]           \${data}
    \${csv}=              Set Variable    severity,count,risk_score\ncritical,\${data['total_vulnerabilities']['critical']},\${data['risk_score']}
    RETURN                \${csv}

Send Critical Vulnerability Alert
    [Arguments]           \${critical_count}
    Log                   🚨 CRITICAL ALERT: \${critical_count} critical vulnerabilities found

Archive Assessment Results
    Log                   📁 Archiving vulnerability assessment results and reports</code></pre>
        
        <h3>🎯 Práctica Assessment (7 min):</h3>
        <p>1. Configura Nmap para network discovery y port scanning</p>
        <p>2. Integra Nikto para web application vulnerability scanning</p>
        <p>3. Implementa Nuclei con templates actualizados de CVE</p>
        <p>4. Configura OpenVAS API para enterprise-grade scanning</p>
        <p>5. Desarrolla risk scoring basado en CVSS y business impact</p>
        <p>6. Genera reportes ejecutivos multi-formato con timelines</p>
        <p>7. Implementa alertas automáticas para vulnerabilidades críticas</p>
        <p>8. Crea dashboard de vulnerability management en tiempo real</p>
        <p>9. Integra con ticketing system para remediation tracking</p>
        <p>10. Documenta procedures de vulnerability disclosure</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar vulnerability assessment con herramientas enterprise</li>
                <li>Calcular risk scores y priorizar remediación efectivamente</li>
                <li>Integrar múltiples scanners para cobertura comprehensiva</li>
                <li>Generar reportes ejecutivos con business impact analysis</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Combina múltiples herramientas para coverage completo: Nmap para discovery, Nikto para web, Nuclei para CVEs, OpenVAS para comprehensive assessment.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 214 - Penetration testing automation</h3>
        <p>Con vulnerability assessment automatizado, implementarás penetration testing automation para validation de security controls y exploit testing.</p>
    `,
    topics: ["security", "vulnerabilities", "pentesting"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-212"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_213 = LESSON_213;
}