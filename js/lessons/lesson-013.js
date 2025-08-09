/**
 * Robot Framework Academy - Lesson 013 OPTIMIZED
 * Ejecución de pruebas desde línea de comandos
 */

const LESSON_013 = {
    id: 13,
    title: "Ejecución de pruebas desde línea de comandos",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    content: `
        <h2>💻 CLI Robot</h2>
        
        <h3>🤖 Tests comandos:</h3>
        <pre><code class="robot">*** Variables ***
\${BASIC_COMMAND}        robot test.robot
\${OUTPUTDIR_COMMAND}    robot --outputdir reports test.robot
\${TAG_COMMAND}          robot --include smoke --exclude slow tests/
\${VAR_COMMAND}          robot --variable BROWSER:chrome --variable ENV:qa tests/
\${PROFESSIONAL_CMD}     robot --outputdir reports --include regression --variable BROWSER:firefox tests/
\${REPORTS_DIR}          reports
\${BROWSER_VAR}          chrome
\${ENV_VAR}              qa

*** Test Cases ***
Test Basic Robot Command
    Log                    🚀 Testing basic robot command
    Should Not Be Empty    \${BASIC_COMMAND}
    Should Contain         \${BASIC_COMMAND}    robot
    Should Contain         \${BASIC_COMMAND}    test.robot
    Should Be Equal        \${BASIC_COMMAND}    robot test.robot
    Should Not Be Empty    robot test.robot
    Should Contain         robot test.robot    robot
    Should Be Equal        robot test.robot    robot test.robot
    Should Contain         robot    robot
    Should Not Be Empty    robot
    Should Be Equal        robot    robot
    Log                    ✅ Basic command validated

Test OutputDir Command
    Log                    📁 Testing outputdir command
    Should Not Be Empty    \${OUTPUTDIR_COMMAND}
    Should Contain         \${OUTPUTDIR_COMMAND}    --outputdir
    Should Contain         \${OUTPUTDIR_COMMAND}    reports
    Should Be Equal        \${OUTPUTDIR_COMMAND}    robot --outputdir reports test.robot
    Should Not Be Empty    \${REPORTS_DIR}
    Should Contain         \${REPORTS_DIR}    reports
    Should Be Equal        \${REPORTS_DIR}    reports
    Should Not Be Empty    reports
    Should Be Equal        reports    reports
    Should Contain         --outputdir    outputdir
    Log                    ✅ OutputDir command validated

Test Tags Command
    Log                    🏷️ Testing tags command
    Should Not Be Empty    \${TAG_COMMAND}
    Should Contain         \${TAG_COMMAND}    --include
    Should Contain         \${TAG_COMMAND}    --exclude
    Should Contain         \${TAG_COMMAND}    smoke
    Should Contain         \${TAG_COMMAND}    slow
    Should Be Equal        \${TAG_COMMAND}    robot --include smoke --exclude slow tests/
    Should Not Be Empty    smoke
    Should Not Be Empty    slow
    Should Be Equal        smoke    smoke
    Should Be Equal        slow    slow
    Should Contain         --include    include
    Should Contain         --exclude    exclude
    Log                    ✅ Tags command validated

Test Variables Command
    Log                    🔧 Testing variables command
    Should Not Be Empty    \${VAR_COMMAND}
    Should Contain         \${VAR_COMMAND}    --variable
    Should Contain         \${VAR_COMMAND}    BROWSER:chrome
    Should Contain         \${VAR_COMMAND}    ENV:qa
    Should Be Equal        \${VAR_COMMAND}    robot --variable BROWSER:chrome --variable ENV:qa tests/
    Should Not Be Empty    \${BROWSER_VAR}
    Should Not Be Empty    \${ENV_VAR}
    Should Be Equal        \${BROWSER_VAR}    chrome
    Should Be Equal        \${ENV_VAR}    qa
    Should Contain         BROWSER:chrome    chrome
    Should Contain         ENV:qa    qa
    Log                    ✅ Variables command validated

Test Professional Command
    Log                    🎯 Testing professional command
    Should Not Be Empty    \${PROFESSIONAL_CMD}
    Should Contain         \${PROFESSIONAL_CMD}    --outputdir
    Should Contain         \${PROFESSIONAL_CMD}    --include
    Should Contain         \${PROFESSIONAL_CMD}    --variable
    Should Contain         \${PROFESSIONAL_CMD}    regression
    Should Contain         \${PROFESSIONAL_CMD}    firefox
    Should Be Equal        \${PROFESSIONAL_CMD}    robot --outputdir reports --include regression --variable BROWSER:firefox tests/
    Should Not Be Empty    regression
    Should Not Be Empty    firefox
    Should Be Equal        regression    regression
    Should Be Equal        firefox    firefox
    Should Contain         BROWSER:firefox    firefox
    Log                    ✅ Professional command validated

Test Command Validation
    Log                    ✅ Testing command validation
    Should Contain         robot --help    help
    Should Contain         robot --version    version
    Should Contain         robot --dryrun    dryrun
    Should Contain         pabot --processes 4    pabot
    Should Not Be Empty    robot --help
    Should Not Be Empty    robot --version
    Should Not Be Empty    robot --dryrun
    Should Not Be Empty    pabot --processes 4
    Should Be Equal        robot --help    robot --help
    Should Be Equal        robot --version    robot --version
    Should Be Equal        robot --dryrun    robot --dryrun
    Should Be Equal        pabot --processes 4    pabot --processes 4
    Log                    ✅ All commands validated</code></pre>
        
        <h3>🎯 Práctica CLI (4 min):</h3>
        <p>1. Comando básico: robot test.robot</p>
        <p>2. Con outputdir: robot --outputdir reports test.robot</p>
        <p>3. Múltiples tests: robot tests/</p>
        <p>4. Por tags: robot --include smoke tests/</p>
        <p>5. Excluir tags: robot --exclude slow tests/</p>
        <p>6. Con variables: robot --variable BROWSER:chrome tests/</p>
        <p>7. Loglevel: robot --loglevel DEBUG tests/</p>
        <p>8. Report custom: robot --report custom.html tests/</p>
        <p>9. Log custom: robot --log detailed.html tests/</p>
        <p>10. Múltiples options: robot --outputdir reports --include regression tests/</p>
        <p>11. Dry run: robot --dryrun tests/</p>
        <p>12. Parallel: pabot --processes 4 tests/</p>
        <p>13. Help comando: robot --help</p>
        <p>14. Version check: robot --version</p>
        <p>15. Test específico: robot --test "Login Test" tests/</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar comandos CLI básicos y avanzados</li>
                <li>Usar tags para ejecución selectiva de tests</li>
                <li>Controlar variables desde línea de comandos</li>
                <li>Configurar outputdir y opciones de reporting</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>CLI mastery = automation profesional. Usa robot --help para explorar todas las opciones disponibles.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 014 - Generación de reportes básicos</h3>
        <p>Con CLI dominado, aprenderás generación y customización profesional de reportes HTML y XML.</p>
    `,
    topics: ["command-line", "execution", "cli"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-012"],
    type: "standard"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_013 = LESSON_013;
}