/**
 * Robot Framework Academy - Lesson 013 (VERSIÓN SIMPLE)
 * Ejecución de pruebas desde línea de comandos
 */

const LESSON_013 = {
    id: 13,
    title: "Ejecución de pruebas desde línea de comandos",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#013 robot framework command line execution cli terminal commands automation",
    content: `
        <h2>🧠 CLI = Robot Framework Profesional</h2>
        <p>Línea de comandos = ejecución automatizada + reportes personalizados + integración CI/CD. Dominar CLI = ser QA Engineer profesional vs amateur.</p>
        
        <h3>💻 Comandos CLI esenciales:</h3>
        <pre><code class="robot">*** Test Cases ***
Validar Comando Robot Básico
    [Documentation]    Verificar ejecución básica robot command
    Log    🚀 Ejecutando comando robot básico
    \${basic_command}=    Set Variable    robot test.robot
    Should Contain    \${basic_command}    robot
    Should Contain    \${basic_command}    test.robot
    Log    Comando: \${basic_command}
    \${result_expected}=    Set Variable    PASS
    Should Be Equal    \${result_expected}    PASS
    Log    ✅ Comando robot básico validado

Validar Comando con Output Directory
    [Documentation]    Verificar comando robot con directorio de salida
    Log    📁 Ejecutando robot con outputdir
    \${outputdir_command}=    Set Variable    robot --outputdir reports test.robot
    Should Contain    \${outputdir_command}    --outputdir
    Should Contain    \${outputdir_command}    reports
    Log    Comando: \${outputdir_command}
    \${reports_dir}=    Set Variable    reports
    Should Be Equal    \${reports_dir}    reports
    Log    Reports en: \${reports_dir}
    Log    ✅ OutputDir configurado correctamente

Validar Comando con Tags
    [Documentation]    Verificar ejecución selectiva por tags
    Log    🏷️ Ejecutando robot con tags
    \${tag_command}=    Set Variable    robot --include smoke --exclude slow tests/
    Should Contain    \${tag_command}    --include
    Should Contain    \${tag_command}    --exclude
    Should Contain    \${tag_command}    smoke
    Should Contain    \${tag_command}    slow
    Log    Comando: \${tag_command}
    \${smoke_tests}=    Set Variable    True
    \${slow_tests}=    Set Variable    False
    Should Be True    \${smoke_tests}
    Should Not Be True    \${slow_tests}
    Log    ✅ Ejecución por tags configurada

Validar Comando con Variables
    [Documentation]    Verificar comando robot con variables
    Log    🔧 Ejecutando robot con variables
    \${var_command}=    Set Variable    robot --variable BROWSER:chrome --variable ENV:qa tests/
    Should Contain    \${var_command}    --variable
    Should Contain    \${var_command}    BROWSER:chrome
    Should Contain    \${var_command}    ENV:qa
    Log    Comando: \${var_command}
    \${browser_var}=    Set Variable    chrome
    \${env_var}=    Set Variable    qa
    Should Be Equal    \${browser_var}    chrome
    Should Be Equal    \${env_var}    qa
    Log    Browser: \${browser_var}
    Log    Environment: \${env_var}
    Log    ✅ Variables CLI configuradas

Validar Comando Completo Profesional
    [Documentation]    Verificar comando robot profesional completo
    Log    🎯 Ejecutando comando robot profesional
    \${professional_command}=    Set Variable    robot --outputdir reports --include regression --variable BROWSER:firefox --loglevel INFO --report custom_report.html tests/regression/
    Should Contain    \${professional_command}    --outputdir reports
    Should Contain    \${professional_command}    --include regression
    Should Contain    \${professional_command}    --variable BROWSER:firefox
    Should Contain    \${professional_command}    --loglevel INFO
    Should Contain    \${professional_command}    --report custom_report.html
    Log    Comando completo: \${professional_command}
    \${command_parts}=    Evaluate    len('\${professional_command}'.split())
    Should Be True    \${command_parts} >= 8
    Log    Partes del comando: \${command_parts}
    Log    ✅ Comando profesional validado correctamente</code></pre>
        
        <h3>🎯 Práctica CLI (4 min):</h3>
        <p><strong>1. Comando básico:</strong> Terminal → <code>robot test.robot</code> → Ejecutar test simple</p>
        <p><strong>2. Con outputdir:</strong> <code>robot --outputdir reports test.robot</code> → Reportes en carpeta</p>
        <p><strong>3. Múltiples tests:</strong> <code>robot tests/</code> → Ejecutar toda la carpeta</p>
        <p><strong>4. Por tags:</strong> <code>robot --include smoke tests/</code> → Solo tests smoke</p>
        <p><strong>5. Excluir tags:</strong> <code>robot --exclude slow tests/</code> → Sin tests lentos</p>
        <p><strong>6. Con variables:</strong> <code>robot --variable BROWSER:chrome tests/</code> → Browser dinámico</p>
        <p><strong>7. Loglevel:</strong> <code>robot --loglevel DEBUG tests/</code> → Más detalles</p>
        <p><strong>8. Report custom:</strong> <code>robot --report custom.html tests/</code> → Reporte personalizado</p>
        <p><strong>9. Log custom:</strong> <code>robot --log detailed.html tests/</code> → Log personalizado</p>
        <p><strong>10. Múltiples options:</strong> <code>robot --outputdir reports --include regression --variable ENV:qa tests/</code></p>
        <p><strong>11. Dry run:</strong> <code>robot --dryrun tests/</code> → Validar sintaxis sin ejecutar</p>
        <p><strong>12. Parallel:</strong> <code>pabot --processes 4 tests/</code> → Ejecución paralela (instalar pabot)</p>
        <p><strong>13. Help comando:</strong> <code>robot --help</code> → Ver todas las opciones disponibles</p>
        <p><strong>14. Version check:</strong> <code>robot --version</code> → Verificar versión instalada</p>
        <p><strong>15. Test specific:</strong> <code>robot --test "Login Test" tests/</code> → Ejecutar test específico</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar comandos CLI básicos y avanzados</li>
                <li>Ejecutar tests con outputdir personalizado</li>
                <li>Usar tags para ejecución selectiva</li>
                <li>Pasar variables desde línea de comandos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>CLI mastery = automation profesional. Usa <code>robot --help</code> para explorar todas las opciones.</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>🔧 Comandos esenciales diarios:</h4>
            <ul>
                <li><strong>Básico:</strong> <code>robot tests/</code></li>
                <li><strong>Reportes:</strong> <code>robot --outputdir reports tests/</code></li>
                <li><strong>Tags:</strong> <code>robot --include smoke tests/</code></li>
                <li><strong>Variables:</strong> <code>robot --variable BROWSER:chrome tests/</code></li>
                <li><strong>Debug:</strong> <code>robot --loglevel DEBUG tests/</code></li>
            </ul>
        </div>
        
        <h3>🚀 Siguiente: Lección 014 - Generación de reportes básicos</h3>
        <p>Aprenderás a personalizar reportes HTML y analizar resultados de ejecución.</p>
    `,
    topics: ["command-line", "execution", "cli"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-012"],
    estimatedTime: 5,
    difficulty: "easy"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_013 = LESSON_013;
}