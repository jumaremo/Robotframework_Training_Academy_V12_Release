/**
 * Robot Framework Academy - Lesson 189
 * Reporting dashboard project
 */

const LESSON_189 = {
    id: 189,
    title: "Reporting dashboard project",
    duration: "15 min",
    level: "intermediate",
    section: "section-14",
    content: `
        <h2>📊 Dashboard Completo</h2>
        <p>Proyecto integrador: dashboard ejecutivo con métricas real-time, reportes automáticos y notificaciones.</p>
        
        <h3>💻 Proyecto dashboard:</h3>
        <pre><code class="robot">*** Settings ***
Library    Collections
Library    OperatingSystem
Library    DateTime
Library    RequestsLibrary
Library    JSONLibrary
Library    Process

*** Variables ***
\${PROJECT_ROOT}       \${CURDIR}/qa_dashboard
\${ASSETS_DIR}         \${PROJECT_ROOT}/assets
\${REPORTS_DIR}        \${PROJECT_ROOT}/reports
\${TEMPLATES_DIR}      \${PROJECT_ROOT}/templates
\${CONFIG_FILE}        \${PROJECT_ROOT}/config.json
\${DASHBOARD_HTML}     \${REPORTS_DIR}/executive_dashboard.html
\${METRICS_JSON}       \${REPORTS_DIR}/live_metrics.json
\${EMAIL_TEMPLATE}     \${TEMPLATES_DIR}/email_report.html
\${CSS_MAIN}           \${ASSETS_DIR}/dashboard.css
\${JS_CHARTS}          \${ASSETS_DIR}/charts.js
\${LOGO_PATH}          \${ASSETS_DIR}/company_logo.png
\${TIMESTAMP}          Get Current Date    result_format=%Y%m%d_%H%M%S

*** Test Cases ***
Setup Dashboard Project Structure
    Log                    Starting QA Dashboard Project Setup
    Create Directory       \${PROJECT_ROOT}
    Create Directory       \${ASSETS_DIR}
    Create Directory       \${REPORTS_DIR}
    Create Directory       \${TEMPLATES_DIR}
    Should Exist           \${PROJECT_ROOT}
    Should Exist           \${ASSETS_DIR}
    Should Exist           \${REPORTS_DIR}
    Should Exist           \${TEMPLATES_DIR}
    Set Global Variable    \${PROJECT_INITIALIZED}    True
    Log                    Project structure created successfully

Generate Configuration Files
    \${config}=            Create Dictionary
    Set To Dictionary      \${config}    project_name=QA Dashboard Enterprise
    Set To Dictionary      \${config}    version=1.0.0
    Set To Dictionary      \${config}    environment=Production
    Set To Dictionary      \${config}    refresh_interval=300
    Set To Dictionary      \${config}    email_notifications=true
    Set To Dictionary      \${config}    slack_integration=true
    \${config_json}=        Convert JSON To String    \${config}
    Create File            \${CONFIG_FILE}    \${config_json}
    File Should Exist      \${CONFIG_FILE}
    \${file_content}=       Get File    \${CONFIG_FILE}
    Should Contain         \${file_content}    QA Dashboard Enterprise
    Should Contain         \${file_content}    email_notifications
    Log                    Configuration file generated: \${CONFIG_FILE}

Build Advanced CSS Styling
    \${css_rules}=         Create List
    Append To List         \${css_rules}    * { margin: 0; padding: 0; box-sizing: border-box; }
    Append To List         \${css_rules}    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f7fa; }
    Append To List         \${css_rules}    .dashboard-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; }
    Append To List         \${css_rules}    .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 20px; }
    Append To List         \${css_rules}    .metric-card { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    Append To List         \${css_rules}    .pass-rate { color: #4CAF50; font-size: 2em; font-weight: bold; }
    Append To List         \${css_rules}    .fail-rate { color: #f44336; font-size: 2em; font-weight: bold; }
    Append To List         \${css_rules}    .chart-container { background: white; border-radius: 8px; padding: 20px; margin: 20px; }
    \${css_content}=        Evaluate    '\\n'.join($css_rules)
    Create File            \${CSS_MAIN}    \${css_content}
    File Should Exist      \${CSS_MAIN}
    File Should Not Be Empty    \${CSS_MAIN}
    Log                    Advanced CSS styling created

Create Live Metrics JSON
    \${current_time}=       Get Current Date    result_format=%Y-%m-%d %H:%M:%S
    \${metrics}=           Create Dictionary
    Set To Dictionary      \${metrics}    timestamp=\${current_time}
    Set To Dictionary      \${metrics}    total_tests=1247
    Set To Dictionary      \${metrics}    passed_tests=1189
    Set To Dictionary      \${metrics}    failed_tests=58
    Set To Dictionary      \${metrics}    pass_rate=95.35
    Set To Dictionary      \${metrics}    execution_time=1823
    Set To Dictionary      \${metrics}    environment=Production
    Set To Dictionary      \${metrics}    last_build=build_\${TIMESTAMP}
    Set To Dictionary      \${metrics}    coverage_percentage=94.7
    \${environments}=       Create List    DEV    QA    STAGING    PROD
    Set To Dictionary      \${metrics}    environments=\${environments}
    \${browsers}=          Create List    Chrome    Firefox    Safari    Edge
    Set To Dictionary      \${metrics}    browsers_tested=\${browsers}
    \${metrics_json}=       Convert JSON To String    \${metrics}
    Create File            \${METRICS_JSON}    \${metrics_json}
    File Should Exist      \${METRICS_JSON}
    \${json_content}=       Get File    \${METRICS_JSON}
    Should Contain         \${json_content}    total_tests
    Should Contain         \${json_content}    pass_rate
    Should Contain         \${json_content}    timestamp
    Log                    Live metrics JSON generated with \${metrics.total_tests} tests

Build Executive Dashboard HTML
    \${html_start}=        Set Variable    <!DOCTYPE html><html><head><meta charset="UTF-8">
    \${html_title}=        Set Variable    <title>QA Executive Dashboard</title>
    \${css_link}=          Set Variable    <link rel="stylesheet" href="assets/dashboard.css">
    \${html_head_end}=     Set Variable    </head><body>
    \${header_section}=    Set Variable    <div class="dashboard-header"><h1>🎯 QA Executive Dashboard</h1><p>Real-time Test Metrics & Analytics</p></div>
    \${metrics_start}=     Set Variable    <div class="metrics-grid">
    \${card_pass}=         Set Variable    <div class="metric-card"><h3>Pass Rate</h3><div class="pass-rate">95.35%</div></div>
    \${card_total}=        Set Variable    <div class="metric-card"><h3>Total Tests</h3><div>1,247</div></div>
    \${card_time}=         Set Variable    <div class="metric-card"><h3>Execution Time</h3><div>30m 23s</div></div>
    \${card_coverage}=     Set Variable    <div class="metric-card"><h3>Coverage</h3><div>94.7%</div></div>
    \${metrics_end}=       Set Variable    </div>
    \${chart_section}=     Set Variable    <div class="chart-container"><h2>📊 Trend Analysis</h2><canvas id="trendsChart"></canvas></div>
    \${html_end}=          Set Variable    <script src="assets/charts.js"></script></body></html>
    \${complete_html}=     Catenate    SEPARATOR=\\n    \${html_start}    \${html_title}    \${css_link}    \${html_head_end}    \${header_section}    \${metrics_start}    \${card_pass}    \${card_total}    \${card_time}    \${card_coverage}    \${metrics_end}    \${chart_section}    \${html_end}
    Create File            \${DASHBOARD_HTML}    \${complete_html}
    File Should Exist      \${DASHBOARD_HTML}
    \${html_content}=       Get File    \${DASHBOARD_HTML}
    Should Contain         \${html_content}    QA Executive Dashboard
    Should Contain         \${html_content}    metrics-grid
    Should Contain         \${html_content}    95.35%
    Should Contain         \${html_content}    charts.js
    Log                    Executive dashboard HTML built successfully

Create Email Report Template
    \${email_html}=        Set Variable    <html><body style="font-family: Arial, sans-serif;">
    \${email_header}=      Set Variable    <h1 style="color: #2196F3;">📧 QA Daily Report</h1>
    \${email_summary}=     Set Variable    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
    \${summary_content}=   Set Variable    <h3>Executive Summary</h3><p>✅ Pass Rate: 95.35%</p><p>📊 Total Tests: 1,247</p><p>⏱️ Execution: 30m 23s</p>
    \${email_footer}=      Set Variable    </div><p>Generated: \${TIMESTAMP}</p></body></html>
    \${complete_email}=    Catenate    \${email_html}    \${email_header}    \${email_summary}    \${summary_content}    \${email_footer}
    Create File            \${EMAIL_TEMPLATE}    \${complete_email}
    File Should Exist      \${EMAIL_TEMPLATE}
    \${email_content}=      Get File    \${EMAIL_TEMPLATE}
    Should Contain         \${email_content}    QA Daily Report
    Should Contain         \${email_content}    Executive Summary
    Should Contain         \${email_content}    Pass Rate
    Log                    Email report template created

Generate JavaScript Charts
    \${js_content}=        Set Variable    // QA Dashboard Charts
    \${chart_init}=        Set Variable    \\nfunction initDashboard() {
    \${chart_config}=      Set Variable    \\n  const ctx = document.getElementById('trendsChart').getContext('2d');
    \${chart_data}=        Set Variable    \\n  const chartData = { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], datasets: [{ label: 'Pass Rate', data: [94, 96, 95, 97, 95] }] };
    \${chart_end}=         Set Variable    \\n}\\nif (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initDashboard); } else { initDashboard(); }
    \${complete_js}=       Catenate    \${js_content}    \${chart_init}    \${chart_config}    \${chart_data}    \${chart_end}
    Create File            \${JS_CHARTS}    \${complete_js}
    File Should Exist      \${JS_CHARTS}
    \${js_file_content}=    Get File    \${JS_CHARTS}
    Should Contain         \${js_file_content}    initDashboard
    Should Contain         \${js_file_content}    trendsChart
    Should Contain         \${js_file_content}    Pass Rate
    Log                    JavaScript charts module generated

Validate Complete Dashboard
    File Should Exist      \${DASHBOARD_HTML}
    File Should Exist      \${CSS_MAIN}
    File Should Exist      \${JS_CHARTS}
    File Should Exist      \${METRICS_JSON}
    File Should Exist      \${EMAIL_TEMPLATE}
    File Should Exist      \${CONFIG_FILE}
    Directory Should Exist \${PROJECT_ROOT}
    Directory Should Exist \${ASSETS_DIR}
    Directory Should Exist \${REPORTS_DIR}
    Directory Should Exist \${TEMPLATES_DIR}
    \${html_size}=         Get File Size    \${DASHBOARD_HTML}
    \${css_size}=          Get File Size    \${CSS_MAIN}
    \${js_size}=           Get File Size    \${JS_CHARTS}
    Should Be True         \${html_size} > 1000
    Should Be True         \${css_size} > 500
    Should Be True         \${js_size} > 200
    Log                    ✅ Complete dashboard validated successfully
    Log                    📁 Project files: HTML(\${html_size}), CSS(\${css_size}), JS(\${js_size})
    Set Global Variable    \${DASHBOARD_READY}    True</code></pre>
        
        <h3>🎯 Práctica proyecto (12 min):</h3>
        <p>1. Ejecuta Setup Dashboard Project Structure</p>
        <p>2. Valida que se crean todas las carpetas correctamente</p>
        <p>3. Genera archivo config.json con configuración empresarial</p>
        <p>4. Construye CSS avanzado con grid layout responsive</p>
        <p>5. Crea métricas JSON con datos real-time actuales</p>
        <p>6. Implementa dashboard HTML con 4 metric cards</p>
        <p>7. Agrega template de email para reportes automáticos</p>
        <p>8. Desarrolla JavaScript para charts interactivos</p>
        <p>9. Valida que todos los archivos existen y tienen contenido</p>
        <p>10. Verifica tamaño de archivos para detectar errores</p>
        <p>11. Abre dashboard.html en browser para test visual</p>
        <p>12. Configura refresh automático cada 5 minutos</p>
        <p>13. Implementa notificaciones por email cuando fail rate > 5%</p>
        <p>14. Agrega integración con Slack para alerts críticos</p>
        <p>15. Documenta setup instructions para el equipo</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Construir dashboard ejecutivo completamente funcional</li>
                <li>Integrar HTML, CSS, JavaScript y JSON en proyecto cohesivo</li>
                <li>Implementar métricas real-time con auto-refresh</li>
                <li>Crear sistema de reportes automáticos por email</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Estructura tu proyecto como enterprise: assets/, reports/, templates/. Esto facilita mantenimiento y escalabilidad del dashboard.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 190 - CI/CD Concepts</h3>
        <p>Con reporting dominado, aprenderás CI/CD para automatizar la ejecución de tests y generación de reportes en pipelines empresariales.</p>
    `,
    topics: ["reporting", "project"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 15,
    difficulty: "easy",
    prerequisites: ["lesson-188"],
    type: "integration"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_189 = LESSON_189;
}