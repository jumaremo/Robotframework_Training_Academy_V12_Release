/**
 * Robot Framework Academy - Lesson 215
 * Security 215
 */

const LESSON_215 = {
    id: 215,
    title: "Security 215",
    duration: "10 min",
    level: "advanced",
    section: "section-17",
    content: `
        <h2>📋 Compliance Frameworks</h2>
        <p>Automatiza compliance testing para ISO 27001, NIST, PCI DSS y otros frameworks de seguridad enterprise.</p>
        
        <h3>💻 Compliance Automation:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    📋 SECURITY COMPLIANCE AUTOMATION SUITE
Library          RequestsLibrary
Library          Process
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          JSON
Library          String
Suite Setup      Initialize Compliance Testing
Suite Teardown   Archive Compliance Results

*** Variables ***
\${COMPLIANCE_CONFIG}  compliance_frameworks.json
\${ISO27001_CONTROLS}  iso27001_controls.csv
\${NIST_CONTROLS}      nist_csf_controls.csv
\${PCI_DSS_REQS}       pci_dss_requirements.csv
\${TARGET_SYSTEMS}     systems_inventory.json
\${COMPLIANCE_REPORT}  compliance_assessment.json
\${EVIDENCE_DIR}       ./compliance_evidence
\${AUDIT_THRESHOLD}    85.0
&{COMPLIANCE_SCORES}   iso27001=0  nist_csf=0  pci_dss=0  sox=0  gdpr=0

*** Test Cases ***
Execute ISO 27001 Controls Assessment
    [Documentation]    Automatiza assessment de controles ISO 27001
    [Tags]             iso27001    information_security    isms
    
    # Cargar controles ISO 27001 desde archivo CSV
    \${iso_content}=     Get File    \${ISO27001_CONTROLS}
    @{iso_controls}=     Parse CSV Controls    \${iso_content}
    Should Not Be Empty  \${iso_controls}
    
    \${total_controls}=  Get Length    \${iso_controls}
    \${passed_controls}= Set Variable    0
    
    FOR    \${control}    IN    @{iso_controls}
        \${control_id}=   Set Variable    \${control['id']}
        \${control_desc}= Set Variable    \${control['description']}
        \${test_method}=  Set Variable    \${control['test_method']}
        
        # Ejecutar test específico según el control
        \${test_result}=  Run Keyword    Test ISO Control    \${control_id}    \${test_method}
        
        Run Keyword If    \${test_result}
        ...               Record Control Evidence    ISO27001    \${control_id}    PASS    \${control_desc}
        ...               ELSE    Record Control Evidence    ISO27001    \${control_id}    FAIL    \${control_desc}
        
        \${passed_controls}= Set Variable If    \${test_result}    \${passed_controls + 1}    \${passed_controls}
        
        Log               ISO 27001 Control \${control_id}: \${"PASS" if \${test_result} else "FAIL"}
    END
    
    # Calcular score de compliance ISO 27001
    \${iso_score}=       Evaluate    (\${passed_controls} / \${total_controls}) * 100
    Set To Dictionary    \${COMPLIANCE_SCORES}    iso27001=\${iso_score}
    
    Should Be True       \${iso_score} >= \${AUDIT_THRESHOLD}
    Log                  ISO 27001 Compliance Score: \${iso_score}% (\${passed_controls}/\${total_controls})

Test NIST Cybersecurity Framework
    [Documentation]    Evalúa compliance con NIST CSF functions y categories
    [Tags]             nist_csf    cybersecurity_framework    risk_management
    
    # Cargar NIST CSF controls
    \${nist_content}=    Get File    \${NIST_CONTROLS}
    @{nist_functions}=   Parse NIST Functions    \${nist_content}
    
    \${total_functions}= Get Length    \${nist_functions}
    \${compliant_functions}= Set Variable    0
    
    FOR    \${function}    IN    @{nist_functions}
        \${function_id}=  Set Variable    \${function['id']}
        \${function_name}= Set Variable    \${function['name']}
        @{categories}=    Set Variable    \${function['categories']}
        
        \${function_score}= Evaluate NIST Function    \${function_id}    \${categories}
        
        Run Keyword If    \${function_score} >= 80.0
        ...               Increment Compliant Functions    nist_csf
        
        # Test específicos por función NIST
        Run Keyword If    '\${function_id}' == 'ID'    Test NIST Identify Function    \${categories}
        ...               ELSE IF    '\${function_id}' == 'PR'    Test NIST Protect Function    \${categories}
        ...               ELSE IF    '\${function_id}' == 'DE'    Test NIST Detect Function    \${categories}
        ...               ELSE IF    '\${function_id}' == 'RS'    Test NIST Respond Function    \${categories}
        ...               ELSE IF    '\${function_id}' == 'RC'    Test NIST Recover Function    \${categories}
        
        Log               NIST \${function_name} (\${function_id}): \${function_score}%
    END
    
    # Calcular score total NIST
    \${nist_total_score}= Calculate NIST Total Score    \${nist_functions}
    Set To Dictionary     \${COMPLIANCE_SCORES}    nist_csf=\${nist_total_score}
    
    Should Be True        \${nist_total_score} >= 75.0
    Log                   NIST CSF Total Score: \${nist_total_score}%

Execute PCI DSS Requirements Testing
    [Documentation]    Automatiza testing de requerimientos PCI DSS
    [Tags]             pci_dss    payment_card    data_security
    
    # Cargar requirements PCI DSS
    \${pci_content}=     Get File    \${PCI_DSS_REQS}
    @{pci_requirements}= Parse PCI Requirements    \${pci_content}
    
    \${total_reqs}=      Get Length    \${pci_requirements}
    \${compliant_reqs}=  Set Variable    0
    
    FOR    \${requirement}    IN    @{pci_requirements}
        \${req_id}=       Set Variable    \${requirement['id']}
        \${req_desc}=     Set Variable    \${requirement['description']}
        \${criticality}=  Set Variable    \${requirement['criticality']}
        
        # Ejecutar tests específicos PCI DSS
        \${pci_test_result}= Run Keyword    Test PCI Requirement    \${req_id}    \${req_desc}
        
        Run Keyword If       \${pci_test_result}
        ...                  Increment Compliant Requirements    pci_dss
        
        # Logging diferenciado por criticality
        Run Keyword If       '\${criticality}' == 'CRITICAL' and not \${pci_test_result}
        ...                  Log    CRITICAL PCI FAILURE: \${req_id} - \${req_desc}
        
        Create PCI Evidence  \${req_id}    \${pci_test_result}    \${req_desc}
        
        Log                  PCI DSS \${req_id}: \${"COMPLIANT" if \${pci_test_result} else "NON-COMPLIANT"}
    END
    
    # Calcular PCI DSS compliance percentage
    \${pci_score}=       Evaluate    (\${compliant_reqs} / \${total_reqs}) * 100
    Set To Dictionary    \${COMPLIANCE_SCORES}    pci_dss=\${pci_score}
    
    # PCI DSS requiere 100% compliance
    Should Be True       \${pci_score} >= 95.0
    Log                  PCI DSS Compliance: \${pci_score}% (\${compliant_reqs}/\${total_reqs})

Test GDPR Data Protection Controls
    [Documentation]    Evalúa controles de protección de datos GDPR
    [Tags]             gdpr    data_protection    privacy
    
    # Test principios fundamentales GDPR
    @{gdpr_principles}=  Create List    
    ...                  lawfulness_fairness_transparency
    ...                  purpose_limitation
    ...                  data_minimization
    ...                  accuracy
    ...                  storage_limitation
    ...                  integrity_confidentiality
    ...                  accountability
    
    \${gdpr_compliant}=  Set Variable    0
    
    FOR    \${principle}    IN    @{gdpr_principles}
        \${principle_test}= Test GDPR Principle    \${principle}
        
        Run Keyword If     \${principle_test}
        ...                Evaluate    \${gdpr_compliant} + 1
        ...                ELSE    Log    GDPR NON-COMPLIANCE: \${principle}
        
        # Generar evidencia específica por principio
        Document GDPR Evidence    \${principle}    \${principle_test}
        
        Log                GDPR \${principle}: \${"COMPLIANT" if \${principle_test} else "NON-COMPLIANT"}
    END
    
    # Test derechos de los individuos
    @{individual_rights}= Create List    
    ...                   right_to_information
    ...                   right_of_access
    ...                   right_to_rectification
    ...                   right_to_erasure
    ...                   right_to_restrict_processing
    ...                   right_to_data_portability
    ...                   right_to_object
    
    FOR    \${right}    IN    @{individual_rights}
        \${right_implementation}= Test Individual Right Implementation    \${right}
        
        Run Keyword If            \${right_implementation}
        ...                       Evaluate    \${gdpr_compliant} + 1
        
        Log                       Individual right \${right}: \${"IMPLEMENTED" if \${right_implementation} else "NOT_IMPLEMENTED"}
    END
    
    # Calcular score GDPR total
    \${total_gdpr_tests}= Evaluate    len(\${gdpr_principles}) + len(\${individual_rights})
    \${gdpr_score}=       Evaluate    (\${gdpr_compliant} / \${total_gdpr_tests}) * 100
    Set To Dictionary     \${COMPLIANCE_SCORES}    gdpr=\${gdpr_score}
    
    Should Be True        \${gdpr_score} >= 90.0
    Log                   GDPR Compliance Score: \${gdpr_score}%

Execute SOX IT Controls Assessment
    [Documentation]    Automatiza assessment de controles IT SOX
    [Tags]             sox    sarbanes_oxley    financial_controls
    
    # SOX IT General Controls (ITGC)
    @{sox_itgc_areas}=   Create List    
    ...                  access_controls
    ...                  change_management
    ...                  backup_recovery
    ...                  operations_monitoring
    
    \${sox_compliant_controls}= Set Variable    0
    \${total_sox_controls}=     Set Variable    0
    
    FOR    \${control_area}    IN    @{sox_itgc_areas}
        @{area_controls}=  Get SOX Controls For Area    \${control_area}
        \${area_controls_count}= Get Length    \${area_controls}
        \${total_sox_controls}= Evaluate    \${total_sox_controls} + \${area_controls_count}
        
        FOR    \${control}    IN    @{area_controls}
            \${control_id}=    Set Variable    \${control['id']}
            \${control_desc}=  Set Variable    \${control['description']}
            
            \${sox_test_result}= Test SOX IT Control    \${control_id}    \${control_area}
            
            Run Keyword If       \${sox_test_result}
            ...                  Evaluate    \${sox_compliant_controls} + 1
            
            # Documentar evidencia SOX
            Create SOX Audit Trail    \${control_id}    \${sox_test_result}    \${control_desc}
            
            Log                  SOX ITGC \${control_id}: \${"EFFECTIVE" if \${sox_test_result} else "DEFICIENT"}
        END
    END
    
    # Calcular SOX compliance score
    \${sox_score}=       Evaluate    (\${sox_compliant_controls} / \${total_sox_controls}) * 100
    Set To Dictionary    \${COMPLIANCE_SCORES}    sox=\${sox_score}
    
    # SOX requiere controles efectivos (>90%)
    Should Be True       \${sox_score} >= 90.0
    Log                  SOX IT Controls Score: \${sox_score}% (\${sox_compliant_controls}/\${total_sox_controls})

Generate Compliance Dashboard
    [Documentation]    Genera dashboard executivo de compliance multi-framework
    [Tags]             dashboard    compliance_reporting    executive
    
    # Compilar métricas de todos los frameworks
    \${dashboard_data}=  Create Dictionary
    ...                  assessment_date=\${CURRENT_DATE}
    ...                  frameworks_assessed=5
    ...                  overall_scores=\${COMPLIANCE_SCORES}
    
    # Calcular score promedio ponderado
    \${weighted_score}=  Evaluate    
    ...                  (\${COMPLIANCE_SCORES.iso27001} * 0.25) + 
    ...                  (\${COMPLIANCE_SCORES.nist_csf} * 0.25) + 
    ...                  (\${COMPLIANCE_SCORES.pci_dss} * 0.20) + 
    ...                  (\${COMPLIANCE_SCORES.gdpr} * 0.20) + 
    ...                  (\${COMPLIANCE_SCORES.sox} * 0.10)
    
    Set To Dictionary    \${dashboard_data}    weighted_average_score=\${weighted_score}
    
    # Determinar compliance maturity level
    \${maturity_level}=  Calculate Compliance Maturity    \${COMPLIANCE_SCORES}
    Set To Dictionary    \${dashboard_data}    maturity_level=\${maturity_level}
    
    # Identificar gaps críticos
    @{critical_gaps}=    Identify Critical Compliance Gaps    \${COMPLIANCE_SCORES}
    Set To Dictionary    \${dashboard_data}    critical_gaps=\${critical_gaps}
    
    # Generar recomendaciones de remediation
    @{remediation_plan}= Generate Compliance Remediation Plan    \${COMPLIANCE_SCORES}
    Set To Dictionary     \${dashboard_data}    remediation_plan=\${remediation_plan}
    
    # Crear dashboard HTML
    \${dashboard_template}= Get File    templates/compliance_dashboard.html
    \${dashboard_html}=     Render Compliance Dashboard    \${dashboard_template}    \${dashboard_data}
    Create File             compliance_dashboard.html    \${dashboard_html}
    
    # Generar reporte JSON para APIs
    \${dashboard_json}=     Evaluate    json.dumps(\${dashboard_data}, indent=2)
    Create File             compliance_dashboard.json    \${dashboard_json}
    
    # Crear métricas CSV para tracking
    \${metrics_csv}=        Generate Compliance Metrics CSV    \${dashboard_data}
    Create File             compliance_metrics.csv    \${metrics_csv}
    
    File Should Exist       compliance_dashboard.html
    File Should Exist       compliance_dashboard.json
    File Should Exist       compliance_metrics.csv
    
    # Generar alertas para gaps críticos
    Run Keyword If          len(\${critical_gaps}) > 0
    ...                     Send Compliance Alert    \${critical_gaps}
    
    Log                     Compliance dashboard generated
    Log                     Overall compliance score: \${weighted_score}%
    Log                     Maturity level: \${maturity_level}
    Log                     Critical gaps: \${critical_gaps}

Create Audit Evidence Repository
    [Documentation]    Crea repositorio centralizado de evidencia para auditorías
    [Tags]             audit_evidence    documentation    repository
    
    Create Directory        \${EVIDENCE_DIR}/iso27001
    Create Directory        \${EVIDENCE_DIR}/nist_csf
    Create Directory        \${EVIDENCE_DIR}/pci_dss
    Create Directory        \${EVIDENCE_DIR}/gdpr
    Create Directory        \${EVIDENCE_DIR}/sox
    
    # Consolidar evidencia por framework
    @{frameworks}=          Create List    iso27001    nist_csf    pci_dss    gdpr    sox
    
    FOR    \${framework}    IN    @{frameworks}
        # Recopilar archivos de evidencia
        @{evidence_files}=   Get Framework Evidence Files    \${framework}
        \${evidence_count}=  Get Length    \${evidence_files}
        
        # Crear índice de evidencia
        \${evidence_index}=  Create Dictionary
        ...                  framework=\${framework}
        ...                  total_evidence_items=\${evidence_count}
        ...                  last_updated=\${CURRENT_DATE}
        ...                  files=\${evidence_files}
        
        \${index_json}=      Evaluate    json.dumps(\${evidence_index}, indent=2)
        Create File          \${EVIDENCE_DIR}/\${framework}/evidence_index.json    \${index_json}
        
        # Generar hash de integridad para evidencia
        \${integrity_hash}=  Calculate Evidence Hash    \${evidence_files}
        Create File          \${EVIDENCE_DIR}/\${framework}/integrity.sha256    \${integrity_hash}
        
        Log                  Evidence repository \${framework}: \${evidence_count} items archived
    END
    
    # Crear master evidence catalog
    \${master_catalog}=     Create Master Evidence Catalog    \${frameworks}
    \${catalog_json}=       Evaluate    json.dumps(\${master_catalog}, indent=2)
    Create File             \${EVIDENCE_DIR}/master_evidence_catalog.json    \${catalog_json}
    
    File Should Exist       \${EVIDENCE_DIR}/master_evidence_catalog.json
    Log                     Audit evidence repository created successfully

*** Keywords ***
Initialize Compliance Testing
    Log                     📋 Initializing compliance framework testing
    Set Global Variable     \${CURRENT_DATE}    2024-01-15
    
    # Crear archivos de control si no existen
    Create File             \${ISO27001_CONTROLS}    id,description,test_method\nA.8.1.1,Information security policy,policy_review
    Create File             \${NIST_CONTROLS}       function,category,subcategory\nID,Asset Management,ID.AM-1
    Create File             \${PCI_DSS_REQS}        id,description,criticality\n1.1,Firewall configuration,CRITICAL
    
    # Crear templates
    Create File             templates/compliance_dashboard.html    
    ...                     <html><body><h1>Compliance Dashboard</h1></body></html>

Parse CSV Controls
    [Arguments]             \${csv_content}
    @{controls}=            Create List    
    ...                     @{[{'id': 'A.8.1.1', 'description': 'Information security policy', 'test_method': 'policy_review'}]}
    RETURN                  \${controls}

Test ISO Control
    [Arguments]             \${control_id}    \${test_method}
    \${result}=             Set Variable If    '\${control_id}' == 'A.8.1.1'    True    False
    RETURN                  \${result}

Record Control Evidence
    [Arguments]             \${framework}    \${control_id}    \${status}    \${description}
    \${evidence_file}=      Set Variable    \${EVIDENCE_DIR}/\${framework}/\${control_id}_evidence.txt
    \${evidence_content}=   Set Variable    Control: \${control_id}\nStatus: \${status}\nDescription: \${description}\nTested: \${CURRENT_DATE}
    Create File             \${evidence_file}    \${evidence_content}

Parse NIST Functions
    [Arguments]             \${nist_content}
    @{functions}=           Create List    
    ...                     @{[{'id': 'ID', 'name': 'Identify', 'categories': ['Asset Management', 'Risk Assessment']}]}
    RETURN                  \${functions}

Evaluate NIST Function
    [Arguments]             \${function_id}    \${categories}
    \${score}=              Set Variable    85.0
    RETURN                  \${score}

Increment Compliant Functions
    [Arguments]             \${framework}
    Log                     Incremented compliant functions for \${framework}

Test NIST Identify Function
    [Arguments]             \${categories}
    Log                     Testing NIST Identify function categories

Test NIST Protect Function
    [Arguments]             \${categories}
    Log                     Testing NIST Protect function categories

Test NIST Detect Function
    [Arguments]             \${categories}
    Log                     Testing NIST Detect function categories

Test NIST Respond Function
    [Arguments]             \${categories}
    Log                     Testing NIST Respond function categories

Test NIST Recover Function
    [Arguments]             \${categories}
    Log                     Testing NIST Recover function categories

Calculate NIST Total Score
    [Arguments]             \${functions}
    \${total_score}=        Set Variable    82.5
    RETURN                  \${total_score}

Parse PCI Requirements
    [Arguments]             \${pci_content}
    @{requirements}=        Create List    
    ...                     @{[{'id': '1.1', 'description': 'Firewall configuration', 'criticality': 'CRITICAL'}]}
    RETURN                  \${requirements}

Test PCI Requirement
    [Arguments]             \${req_id}    \${req_desc}
    \${result}=             Set Variable    True
    RETURN                  \${result}

Increment Compliant Requirements
    [Arguments]             \${framework}
    Log                     Incremented compliant requirements for \${framework}

Create PCI Evidence
    [Arguments]             \${req_id}    \${result}    \${description}
    \${evidence_file}=      Set Variable    \${EVIDENCE_DIR}/pci_dss/\${req_id}_evidence.txt
    \${status}=             Set Variable If    \${result}    COMPLIANT    NON-COMPLIANT
    Create File             \${evidence_file}    PCI DSS \${req_id}: \${status}

Test GDPR Principle
    [Arguments]             \${principle}
    \${result}=             Set Variable    True
    RETURN                  \${result}

Document GDPR Evidence
    [Arguments]             \${principle}    \${result}
    \${evidence_file}=      Set Variable    \${EVIDENCE_DIR}/gdpr/\${principle}_evidence.txt
    \${status}=             Set Variable If    \${result}    COMPLIANT    NON-COMPLIANT
    Create File             \${evidence_file}    GDPR \${principle}: \${status}

Test Individual Right Implementation
    [Arguments]             \${right}
    \${result}=             Set Variable    True
    RETURN                  \${result}

Get SOX Controls For Area
    [Arguments]             \${area}
    @{controls}=            Create List    
    ...                     @{[{'id': 'SOX-AC-01', 'description': 'Access control management'}]}
    RETURN                  \${controls}

Test SOX IT Control
    [Arguments]             \${control_id}    \${area}
    \${result}=             Set Variable    True
    RETURN                  \${result}

Create SOX Audit Trail
    [Arguments]             \${control_id}    \${result}    \${description}
    \${audit_file}=         Set Variable    \${EVIDENCE_DIR}/sox/\${control_id}_audit.txt
    \${status}=             Set Variable If    \${result}    EFFECTIVE    DEFICIENT
    Create File             \${audit_file}    SOX \${control_id}: \${status}

Calculate Compliance Maturity
    [Arguments]             \${scores}
    \${maturity}=           Set Variable If    \${scores.iso27001} > 90    OPTIMIZED
    ...                     \${scores.iso27001} > 75    MANAGED    DEVELOPING
    RETURN                  \${maturity}

Identify Critical Compliance Gaps
    [Arguments]             \${scores}
    @{gaps}=                Create List
    Run Keyword If          \${scores.pci_dss} < 95.0    Append To List    \${gaps}    PCI DSS non-compliance
    Run Keyword If          \${scores.sox} < 90.0        Append To List    \${gaps}    SOX control deficiencies
    RETURN                  \${gaps}

Generate Compliance Remediation Plan
    [Arguments]             \${scores}
    @{plan}=                Create List    
    ...                     Implement missing ISO 27001 controls
    ...                     Enhance GDPR data protection measures
    ...                     Strengthen SOX IT general controls
    RETURN                  \${plan}

Render Compliance Dashboard
    [Arguments]             \${template}    \${data}
    \${rendered}=           Set Variable    <html><body><h1>Compliance Dashboard Generated</h1></body></html>
    RETURN                  \${rendered}

Generate Compliance Metrics CSV
    [Arguments]             \${data}
    \${csv}=                Set Variable    framework,score,status\nISO27001,\${data['overall_scores']['iso27001']},COMPLIANT
    RETURN                  \${csv}

Send Compliance Alert
    [Arguments]             \${gaps}
    Log                     🚨 COMPLIANCE ALERT: Critical gaps identified: \${gaps}

Get Framework Evidence Files
    [Arguments]             \${framework}
    @{files}=               Create List    evidence1.txt    evidence2.pdf    evidence3.json
    RETURN                  \${files}

Calculate Evidence Hash
    [Arguments]             \${files}
    \${hash}=               Set Variable    abc123def456
    RETURN                  \${hash}

Create Master Evidence Catalog
    [Arguments]             \${frameworks}
    \${catalog}=            Create Dictionary    frameworks=\${frameworks}    total_items=50
    RETURN                  \${catalog}

Archive Compliance Results
    Log                     📁 Archiving compliance assessment results and evidence</code></pre>
        
        <h3>🎯 Práctica Compliance (7 min):</h3>
        <p>1. Configura assessment automatizado de controles ISO 27001</p>
        <p>2. Implementa testing de funciones NIST Cybersecurity Framework</p>
        <p>3. Automatiza validation de requirements PCI DSS</p>
        <p>4. Desarrolla tests de principios y derechos GDPR</p>
        <p>5. Crea assessment de controles IT SOX (Sarbanes-Oxley)</p>
        <p>6. Genera dashboard ejecutivo multi-framework</p>
        <p>7. Implementa repositorio centralizado de audit evidence</p>
        <p>8. Configura alertas automáticas para gaps críticos</p>
        <p>9. Crea remediation plans basados en findings</p>
        <p>10. Integra compliance testing en CI/CD pipelines</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar compliance testing para múltiples frameworks</li>
                <li>Generar evidencia auditable y trazable</li>
                <li>Crear dashboards ejecutivos de compliance maturity</li>
                <li>Implementar alertas proactivas para gaps críticos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Documenta evidencia automáticamente: cada test debe generar audit trail con timestamps, resultados y referencias a controles específicos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 216 - Security monitoring y SIEM integration</h3>
        <p>Con compliance frameworks automatizados, implementarás security monitoring continuo con SIEM integration y threat detection.</p>
    `,
    topics: ["security", "vulnerabilities", "pentesting"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-214"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_215 = LESSON_215;
}