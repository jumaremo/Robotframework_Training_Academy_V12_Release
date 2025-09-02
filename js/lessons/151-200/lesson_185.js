/**
 * Robot Framework Academy - Lesson 185
 * Reporting 185
 */

const LESSON_185 = {
    id: 185,
    title: "Reporting 185",
    duration: "7 min",
    level: "intermediate",
    section: "section-14",
    content: `
        <h2>👥 Reportes Audiencia Específica</h2>
        <p>Crea reportes optimizados para diferentes audiencias: técnica, ejecutiva y operacional con formatos y contenido específicos.</p>
        
        <h3>💻 Reportes multi-audiencia:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/AudienceReportingLibrary.py

*** Variables ***
\${EXECUTIVE_AUDIENCE}  C-level
\${TECHNICAL_AUDIENCE}  engineering_team
\${OPERATIONAL_AUDIENCE} qa_managers
\${REPORT_FREQUENCY}    weekly
\${DATA_PERIOD}         last_30_days
\${DISTRIBUTION_LIST}   ["ceo@company.com", "cto@company.com", "qa-team@company.com"]
\${TEMPLATE_VERSION}    2.1

*** Test Cases ***
Test Executive Report Generation
    \${executive_config}=    Create Executive Report Config    audience=\${EXECUTIVE_AUDIENCE}    focus=business_impact
    Should Be True    \${executive_config}[configured]
    Should Be Equal    \${executive_config}[audience]    \${EXECUTIVE_AUDIENCE}
    Should Contain    \${executive_config}[sections]    executive_summary
    Should Contain    \${executive_config}[sections]    roi_analysis
    Should Contain    \${executive_config}[sections]    risk_assessment
    \${executive_data}=    Aggregate Executive Metrics    \${executive_config}    period=\${DATA_PERIOD}
    Should Be True    \${executive_data}[aggregated]
    Should Contain    \${executive_data}[kpis]    cost_savings
    Should Contain    \${executive_data}[kpis]    quality_improvement
    \${executive_report}=    Generate Executive Report    \${executive_config}    \${executive_data}    format=pdf
    Should Be True    \${executive_report}[generated]
    Should Be True    \${executive_report}[pages_count] <= 3
    Should Contain    \${executive_report}[content]    high_level_insights
    Log    Executive report generation: \${executive_report}

Test Technical Report Generation
    \${technical_config}=    Create Technical Report Config    audience=\${TECHNICAL_AUDIENCE}    depth=detailed
    Should Be True    \${technical_config}[configured]
    Should Be Equal    \${technical_config}[audience]    \${TECHNICAL_AUDIENCE}
    Should Contain    \${technical_config}[sections]    test_coverage
    Should Contain    \${technical_config}[sections]    performance_metrics
    Should Contain    \${technical_config}[sections]    defect_analysis
    Should Contain    \${technical_config}[sections]    code_quality
    \${technical_data}=    Collect Technical Metrics    \${technical_config}    include_raw_data=true
    Should Be True    \${technical_data}[collected]
    Should Be True    \${technical_data}[test_cases_count] > 0
    Should Be True    \${technical_data}[coverage_percentage] >= 0
    \${technical_report}=    Generate Technical Report    \${technical_config}    \${technical_data}    format=html
    Should Be True    \${technical_report}[generated]
    Should Be True    \${technical_report}[sections_count] >= 4
    Should Contain    \${technical_report}[attachments]    detailed_logs
    Log    Technical report generation: \${technical_report}

Test Operational Report Generation
    \${operational_config}=    Create Operational Report Config    audience=\${OPERATIONAL_AUDIENCE}    focus=actionable_insights
    Should Be True    \${operational_config}[configured]
    Should Be Equal    \${operational_config}[audience]    \${OPERATIONAL_AUDIENCE}
    Should Contain    \${operational_config}[sections]    daily_metrics
    Should Contain    \${operational_config}[sections]    trend_analysis
    Should Contain    \${operational_config}[sections]    action_items
    \${operational_data}=    Gather Operational Metrics    \${operational_config}    real_time=true
    Should Be True    \${operational_data}[gathered]
    Should Be True    \${operational_data}[tests_executed] > 0
    Should Be True    \${operational_data}[automation_rate] >= 0
    \${operational_report}=    Generate Operational Report    \${operational_config}    \${operational_data}    format=dashboard
    Should Be True    \${operational_report}[generated]
    Should Be True    \${operational_report}[interactive]
    Should Contain    \${operational_report}[widgets]    real_time_metrics
    Log    Operational report generation: \${operational_report}

Test Automated Distribution System
    \${distribution_config}=    Setup Report Distribution    frequency=\${REPORT_FREQUENCY}    recipients=\${DISTRIBUTION_LIST}
    Should Be True    \${distribution_config}[configured]
    Should Be Equal    \${distribution_config}[frequency]    \${REPORT_FREQUENCY}
    Should Be Equal As Numbers    \${distribution_config}[recipients_count]    3
    \${audience_mapping}=    Map Audiences To Reports    \${distribution_config}    reports=["executive", "technical", "operational"]
    Should Be True    \${audience_mapping}[mapped]
    Should Be Equal As Numbers    \${audience_mapping}[mappings_count]    3
    \${scheduled_delivery}=    Schedule Report Delivery    \${distribution_config}    day=monday    time=09:00
    Should Be True    \${scheduled_delivery}[scheduled]
    Should Contain    \${scheduled_delivery}[schedule]    monday
    \${delivery_test}=    Test Report Delivery    \${distribution_config}    dry_run=true
    Should Be True    \${delivery_test}[tested]
    Should Be True    \${delivery_test}[all_recipients_reachable]
    Log    Automated distribution system: \${distribution_config}

Test Report Customization Engine
    \${customization_engine}=    Initialize Report Customization    templates=\${TEMPLATE_VERSION}
    Should Be True    \${customization_engine}[initialized]
    Should Be Equal    \${customization_engine}[template_version]    \${TEMPLATE_VERSION}
    \${branding_config}=    Apply Company Branding    \${customization_engine}    logo=company_logo.png    colors=["#1f77b4", "#ff7f0e"]
    Should Be True    \${branding_config}[applied]
    Should Contain    \${branding_config}[assets]    company_logo.png
    \${content_personalization}=    Personalize Report Content    \${customization_engine}    recipient=ceo@company.com    preferences=high_level
    Should Be True    \${content_personalization}[personalized]
    Should Contain    \${content_personalization}[adjustments]    content_level
    \${template_validation}=    Validate Report Templates    \${customization_engine}    audiences=["executive", "technical", "operational"]
    Should Be True    \${template_validation}[validated]
    Should Be Equal As Numbers    \${template_validation}[templates_validated]    3
    Log    Report customization engine: \${customization_engine}</code></pre>
        
        <h3>🎯 Práctica reportes audiencia (5 min):</h3>
        <p>1. Crea AudienceReportingLibrary.py con create_executive_report_config()</p>
        <p>2. Implementa aggregate_executive_metrics() con KPIs business-focused</p>
        <p>3. Agrega generate_executive_report() con máximo 3 páginas y high-level insights</p>
        <p>4. Crea create_technical_report_config() con secciones técnicas detalladas</p>
        <p>5. Implementa collect_technical_metrics() con datos granulares y logs</p>
        <p>6. Agrega generate_technical_report() con formato HTML interactivo</p>
        <p>7. Crea create_operational_report_config() con focus en acción</p>
        <p>8. Implementa gather_operational_metrics() con métricas en tiempo real</p>
        <p>9. Agrega generate_operational_report() con dashboard interactivo</p>
        <p>10. Crea setup_report_distribution() con scheduling automático</p>
        <p>11. Implementa map_audiences_to_reports() con routing inteligente</p>
        <p>12. Agrega schedule_report_delivery() con configuración temporal</p>
        <p>13. Crea initialize_report_customization() con templates modulares</p>
        <p>14. Implementa apply_company_branding() con assets corporativos</p>
        <p>15. Agrega personalize_report_content() según preferencias recipient</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear reportes optimizados para audiencias ejecutiva, técnica y operacional</li>
                <li>Implementar distribución automática con mapping inteligente</li>
                <li>Personalizar contenido y formato según preferencias de recipient</li>
                <li>Configurar branding corporativo y templates modulares</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Ejecutivos quieren insights de negocio en ≤3 páginas, técnicos necesitan datos granulares con logs, operacionales requieren métricas actionables en tiempo real.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 186 - Reporting 186</h3>
        <p>Aprenderás técnicas avanzadas de data visualization, storytelling con datos y creación de reportes interactivos que faciliten la toma de decisiones.</p>
    `,
    topics: ["reporting", "analytics", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-184"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_185 = LESSON_185;
}