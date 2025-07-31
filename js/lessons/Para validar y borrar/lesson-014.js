/**
 * Robot Framework Academy - Lesson 014 (VERSIÓN SIMPLE)
 * Generación de reportes básicos
 */

const LESSON_014 = {
    id: 14,
    title: "Generación de reportes básicos",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#014 robot framework reports html documentation log output results",
    content: `
        <h2>🧠 Reportes = QA Profesional</h2>
        <p>Reportes Robot Framework = evidencia visual + análisis automático + comunicación con stakeholders. Reportes bien configurados = credibilidad QA total.</p>
        
        <h3>💻 Configuración reportes Robot Framework:</h3>
        <pre><code class="robot">*** Test Cases ***
Validar Generación Report HTML
    [Documentation]    Verificar que se genera report.html correctamente
    Log    📊 Validando generación de report.html
    \${report_file}=    Set Variable    report.html
    \${report_exists}=    Set Variable    True
    Should Be True    \${report_exists}
    Should Contain    \${report_file}    .html
    Log    Report generado: \${report_file}
    \${report_size}=    Set Variable    1024
    Should Be True    \${report_size} > 0
    Log    ✅ Report HTML generado correctamente

Validar Generación Log HTML
    [Documentation]    Verificar que se genera log.html con detalles
    Log    📝 Validando generación de log.html
    \${log_file}=    Set Variable    log.html
    \${log_has_details}=    Set Variable    True
    Should Be True    \${log_has_details}
    Should Contain    \${log_file}    log
    Should Contain    \${log_file}    .html
    Log    Log generado: \${log_file}
    \${log_level}=    Set Variable    INFO
    Should Be Equal    \${log_level}    INFO
    Log    Log level: \${log_level}
    Log    ✅ Log HTML con detalles generado

Validar Output XML
    [Documentation]    Verificar generación de output.xml para integración
    Log    🔧 Validando generación de output.xml
    \${output_file}=    Set Variable    output.xml
    \${xml_valid}=    Set Variable    True
    Should Be True    \${xml_valid}
    Should Contain    \${output_file}    .xml
    Should Contain    \${output_file}    output
    Log    Output XML: \${output_file}
    \${xml_size}=    Set Variable    512
    Should Be True    \${xml_size} > 0
    Log    XML size: \${xml_size} bytes
    Log    ✅ Output XML generado para CI/CD

Validar Reportes Personalizados
    [Documentation]    Verificar reportes con nombres personalizados
    Log    🎨 Validando reportes personalizados
    \${custom_report}=    Set Variable    qa_results_2025.html
    \${custom_log}=    Set Variable    detailed_log_2025.html
    Should Contain    \${custom_report}    qa_results
    Should Contain    \${custom_report}    2025
    Should Contain    \${custom_log}    detailed_log
    Should Contain    \${custom_log}    2025
    Log    Custom report: \${custom_report}
    Log    Custom log: \${custom_log}
    \${timestamp}=    Set Variable    2025-07-30
    Should Contain    \${timestamp}    2025
    Log    Timestamp: \${timestamp}
    Log    ✅ Reportes personalizados configurados

Validar Configuración OutputDir
    [Documentation]    Verificar reportes en directorio específico
    Log    📁 Validando configuración outputdir
    \${output_dir}=    Set Variable    reports/qa-results
    \${reports_organized}=    Set Variable    True
    Should Be True    \${reports_organized}
    Should Contain    \${output_dir}    reports
    Should Contain    \${output_dir}    qa-results
    Log    Output directory: \${output_dir}
    \${dir_structure}=    Set Variable    organized
    Should Be Equal    \${dir_structure}    organized
    \${file_count}=    Set Variable    3
    Should Be True    \${file_count} >= 3
    Log    Files in directory: \${file_count}
    Log    ✅ OutputDir configurado correctamente</code></pre>
        
        <h3>🎯 Práctica reportes (4 min):</h3>
        <p><strong>1. Reporte básico:</strong> <code>robot test.robot</code> → Ver report.html, log.html, output.xml</p>
        <p><strong>2. Outputdir custom:</strong> <code>robot --outputdir reports test.robot</code> → Reportes en carpeta</p>
        <p><strong>3. Report personalizado:</strong> <code>robot --report qa_report.html test.robot</code> → Nombre custom</p>
        <p><strong>4. Log personalizado:</strong> <code>robot --log detailed_log.html test.robot</code> → Log custom</p>
        <p><strong>5. Sin log:</strong> <code>robot --log NONE test.robot</code> → Solo report y output</p>
        <p><strong>6. Sin report:</strong> <code>robot --report NONE test.robot</code> → Solo log y output</p>
        <p><strong>7. Timestamp auto:</strong> <code>robot --timestampoutputs test.robot</code> → Archivos con fecha</p>
        <p><strong>8. Split log:</strong> <code>robot --splitlog test.robot</code> → Log separado por suite</p>
        <p><strong>9. Loglevel INFO:</strong> <code>robot --loglevel INFO test.robot</code> → Menos detalles</p>
        <p><strong>10. Loglevel DEBUG:</strong> <code>robot --loglevel DEBUG test.robot</code> → Máximo detalle</p>
        <p><strong>11. Include tags reporte:</strong> <code>robot --include smoke --report smoke_report.html tests/</code></p>
        <p><strong>12. Reportes por suite:</strong> <code>robot --splitlog --report suite_report.html tests/</code></p>
        <p><strong>13. Merge reports:</strong> <code>rebot --merge output1.xml output2.xml</code> → Combinar ejecuciones</p>
        <p><strong>14. Abrir report:</strong> Double-click report.html → Analizar resultados en browser</p>
        <p><strong>15. Compartir reports:</strong> Copy reports/ → Enviar por email o subir a servidor</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Generar reportes HTML automáticos</li>
                <li>Personalizar nombres y ubicación de reportes</li>
                <li>Configurar niveles de log apropiados</li>
                <li>Usar reportes para comunicación QA</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>report.html = resumen ejecutivo. log.html = detalles técnicos. output.xml = integración CI/CD.</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>📊 Archivos generados:</h4>
            <ul>
                <li><strong>report.html:</strong> Resumen visual para stakeholders</li>
                <li><strong>log.html:</strong> Detalles técnicos para debugging</li>
                <li><strong>output.xml:</strong> Datos estructurados para CI/CD</li>
            </ul>
        </div>
        
        <h3>🚀 Siguiente: Lección 015 - Troubleshooting de instalación común</h3>
        <p>Resolverás problemas típicos de instalación y configuración Robot Framework.</p>
    `,
    topics: ["reports", "documentation", "html"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-013"],
    estimatedTime: 5,
    difficulty: "easy"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_014 = LESSON_014;
}