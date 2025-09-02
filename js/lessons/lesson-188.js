/**
 * Robot Framework Academy - Lesson 188
 * Custom HTML Reports
 */

const LESSON_188 = {
    id: 188,
    title: "Custom HTML Reports",
    duration: "7 min",
    level: "intermediate",
    section: "section-14",
    content: `
        <h2>📊 Reportes HTML</h2>
        <p>Personaliza reportes Robot Framework con CSS, logos, métricas custom y dashboards ejecutivos.</p>
        
        <h3>💻 Customización reportes:</h3>
        <pre><code class="robot">*** Settings ***
Library    Collections
Library    OperatingSystem
Library    DateTime

*** Variables ***
\${REPORT_DIR}         \${CURDIR}/custom_reports
\${COMPANY_LOGO}       \${CURDIR}/assets/company_logo.png
\${CSS_FILE}           \${CURDIR}/assets/custom_style.css
\${TEMPLATE_DIR}       \${CURDIR}/templates
\${METRICS_FILE}       \${REPORT_DIR}/metrics.json
\${DASHBOARD_HTML}     \${REPORT_DIR}/dashboard.html
\${CURRENT_TIME}       Get Current Date    result_format=%Y-%m-%d %H:%M:%S

*** Test Cases ***
Generate Custom Report Structure
    Create Directory        \${REPORT_DIR}
    Should Exist           \${REPORT_DIR}
    Set Global Variable    \${REPORT_PATH}    \${REPORT_DIR}/output.xml
    Log                    Report directory created: \${REPORT_DIR}
    File Should Exist      \${COMPANY_LOGO}
    File Should Exist      \${CSS_FILE}
    Directory Should Exist \${TEMPLATE_DIR}

Build Executive Dashboard
    \${suite_stats}=        Get Suite Stats From XML
    \${test_metrics}=       Calculate Test Metrics    \${suite_stats}
    Set Global Variable    \${EXEC_METRICS}    \${test_metrics}
    Log                    Executive metrics: \${EXEC_METRICS}
    Should Contain         \${test_metrics}    pass_rate
    Should Contain         \${test_metrics}    total_tests
    Should Contain         \${test_metrics}    execution_time
    Should Be True         \${test_metrics.pass_rate} >= 90
    Should Be True         \${test_metrics.total_tests} > 0

Create Custom CSS Styling
    \${css_content}=        Create List
    Append To List         \${css_content}    body { font-family: 'Segoe UI'; }
    Append To List         \${css_content}    .header { background: #2196F3; color: white; }
    Append To List         \${css_content}    .pass { color: #4CAF50; font-weight: bold; }
    Append To List         \${css_content}    .fail { color: #f44336; font-weight: bold; }
    Append To List         \${css_content}    .metrics { border: 1px solid #ddd; padding: 10px; }
    \${final_css}=          Evaluate    '\\n'.join($css_content)
    Create File            \${REPORT_DIR}/custom.css    \${final_css}
    File Should Exist      \${REPORT_DIR}/custom.css
    File Should Not Be Empty    \${REPORT_DIR}/custom.css

Generate Metrics JSON
    \${json_metrics}=       Create Dictionary
    Set To Dictionary      \${json_metrics}    timestamp=\${CURRENT_TIME}
    Set To Dictionary      \${json_metrics}    environment=QA
    Set To Dictionary      \${json_metrics}    browser=Chrome
    Set To Dictionary      \${json_metrics}    pass_rate=95.5
    Set To Dictionary      \${json_metrics}    total_duration=120
    \${json_string}=        Evaluate    json.dumps($json_metrics, indent=2)    json
    Create File            \${METRICS_FILE}    \${json_string}
    File Should Exist      \${METRICS_FILE}
    \${file_content}=       Get File    \${METRICS_FILE}
    Should Contain         \${file_content}    timestamp
    Should Contain         \${file_content}    pass_rate

Build HTML Dashboard
    \${html_header}=        Set Variable    <html><head><title>QA Dashboard</title></head><body>
    \${metrics_section}=    Set Variable    <div class="metrics"><h2>Test Metrics</h2>
    \${footer_section}=     Set Variable    <footer>Generated: \${CURRENT_TIME}</footer></body></html>
    \${complete_html}=      Catenate    \${html_header}    \${metrics_section}    \${footer_section}
    Create File            \${DASHBOARD_HTML}    \${complete_html}
    File Should Exist      \${DASHBOARD_HTML}
    \${html_content}=       Get File    \${DASHBOARD_HTML}
    Should Contain         \${html_content}    QA Dashboard
    Should Contain         \${html_content}    Test Metrics
    Should Contain         \${html_content}    Generated:</code></pre>
        
        <h3>🎯 Práctica reportes (5 min):</h3>
        <p>1. Crea directorio /custom_reports con assets/</p>
        <p>2. Diseña CSS con colores de tu empresa</p>
        <p>3. Agrega logo corporativo al header del reporte</p>
        <p>4. Implementa métricas JSON con timestamp actual</p>
        <p>5. Construye dashboard HTML combinando datos</p>
        <p>6. Valida estructura HTML con Should Contain</p>
        <p>7. Genera reporte ejecutivo con KPIs principales</p>
        <p>8. Configura colores pass/fail personalizados</p>
        <p>9. Agrega gráficos básicos con CSS y divs</p>
        <p>10. Implementa footer con información de build</p>
        <p>11. Valida que archivos CSS y HTML se crean correctamente</p>
        <p>12. Verifica métricas JSON tienen formato válido</p>
        <p>13. Testa dashboard abre correctamente en browser</p>
        <p>14. Optimiza CSS para responsive design</p>
        <p>15. Configura automated email con reporte adjunto</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Customizar reportes HTML con branding corporativo</li>
                <li>Generar métricas ejecutivas automáticamente</li>
                <li>Crear dashboards visuales con CSS avanzado</li>
                <li>Implementar templates reutilizables para equipos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa variables globales para paths y configuración. Esto facilita cambios de branding sin tocar el código de tests.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 189 - Reporting dashboard project</h3>
        <p>Integrarás todos los conocimientos de reporting en un proyecto completo con dashboards en tiempo real y notificaciones automáticas.</p>
    `,
    topics: ["reporting", "analytics", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-187"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_188 = LESSON_188;
}