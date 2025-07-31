/**
 * Robot Framework Academy - Lesson 015 (VERSIÓN SIMPLE)
 * Troubleshooting de instalación común
 */

const LESSON_015 = {
    id: 15,
    title: "Troubleshooting de instalación común",
    duration: "8 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#015 robot framework troubleshooting problems solutions installation errors debug fix",
    content: `
        <h2>🧠 Troubleshooting = QA Ninja</h2>
        <p>Resolver problemas Robot Framework = skill #1 QA Engineer. Diagnosticar + solucionar rápido = productividad máxima.</p>
        
        <h3>💻 Tests diagnóstico Robot Framework:</h3>
        <pre><code class="robot">*** Test Cases ***
Diagnóstico Python Installation
    [Documentation]    Verificar que Python está instalado correctamente
    Log    🐍 Diagnosticando instalación Python
    \${python_version}=    Set Variable    3.9.0
    Should Contain    \${python_version}    3.
    Should Be True    len('\${python_version}') >= 5
    Log    Python version: \${python_version}
    \${python_path}=    Set Variable    C:\\Python39\\python.exe
    Should Contain    \${python_path}    python.exe
    Should Contain    \${python_path}    Python
    Log    Python path: \${python_path}
    \${python_working}=    Set Variable    True
    Should Be True    \${python_working}
    Log    ✅ Python instalación OK

Diagnóstico Robot Framework Installation
    [Documentation]    Verificar instalación Robot Framework
    Log    🤖 Diagnosticando Robot Framework
    \${rf_version}=    Set Variable    6.1.1
    Should Contain    \${rf_version}    6.
    Should Be True    len('\${rf_version}') >= 5
    Log    Robot Framework version: \${rf_version}
    \${rf_command}=    Set Variable    robot --version
    Should Contain    \${rf_command}    robot
    Should Contain    \${rf_command}    --version
    Log    RF command: \${rf_command}
    \${rf_installed}=    Set Variable    True
    Should Be True    \${rf_installed}
    Log    ✅ Robot Framework instalación OK

Diagnóstico SeleniumLibrary Installation
    [Documentation]    Verificar SeleniumLibrary y WebDrivers
    Log    🌐 Diagnosticando SeleniumLibrary
    \${selenium_version}=    Set Variable    6.2.0
    Should Contain    \${selenium_version}    6.
    Should Be True    len('\${selenium_version}') >= 5
    Log    SeleniumLibrary version: \${selenium_version}
    \${webdriver_path}=    Set Variable    C:\\webdrivers\\chromedriver.exe
    Should Contain    \${webdriver_path}    chromedriver.exe
    Should Contain    \${webdriver_path}    webdrivers
    Log    WebDriver path: \${webdriver_path}
    \${selenium_working}=    Set Variable    True
    Should Be True    \${selenium_working}
    Log    ✅ SeleniumLibrary instalación OK

Diagnóstico PATH Environment
    [Documentation]    Verificar configuración PATH
    Log    🔧 Diagnosticando PATH environment
    \${path_python}=    Set Variable    C:\\Python39\\Scripts
    \${path_webdriver}=    Set Variable    C:\\webdrivers
    Should Contain    \${path_python}    Python39
    Should Contain    \${path_python}    Scripts
    Should Contain    \${path_webdriver}    webdrivers
    Log    Python PATH: \${path_python}
    Log    WebDriver PATH: \${path_webdriver}
    \${path_configured}=    Set Variable    True
    Should Be True    \${path_configured}
    \${environment_vars}=    Set Variable    2
    Should Be Equal As Numbers    \${environment_vars}    2
    Log    ✅ PATH environment configurado

Diagnóstico PyCharm Integration
    [Documentation]    Verificar integración PyCharm
    Log    💻 Diagnosticando PyCharm integration
    \${pycharm_interpreter}=    Set Variable    C:\\Python39\\python.exe
    \${rf_plugin}=    Set Variable    Robot Framework Support
    Should Contain    \${pycharm_interpreter}    python.exe
    Should Contain    \${rf_plugin}    Robot Framework
    Should Contain    \${rf_plugin}    Support
    Log    PyCharm interpreter: \${pycharm_interpreter}
    Log    RF plugin: \${rf_plugin}
    \${syntax_highlighting}=    Set Variable    True
    \${autocompletion}=    Set Variable    True
    Should Be True    \${syntax_highlighting}
    Should Be True    \${autocompletion}
    Log    ✅ PyCharm integration OK

Fix Common Error Permission Denied
    [Documentation]    Solución para error Permission Denied
    Log    🔒 Solucionando Permission Denied
    \${error_type}=    Set Variable    Permission Denied
    \${solution_admin}=    Set Variable    Run as Administrator
    \${solution_path}=    Set Variable    Check file permissions
    Should Contain    \${error_type}    Permission
    Should Contain    \${solution_admin}    Administrator
    Should Contain    \${solution_path}    permissions
    Log    Error: \${error_type}
    Log    Solution 1: \${solution_admin}
    Log    Solution 2: \${solution_path}
    \${fixed}=    Set Variable    True
    Should Be True    \${fixed}
    Log    ✅ Permission Denied resuelto

Fix Common Error Module Not Found
    [Documentation]    Solución para ModuleNotFoundError
    Log    📦 Solucionando Module Not Found
    \${error_module}=    Set Variable    ModuleNotFoundError
    \${solution_pip}=    Set Variable    pip install robotframework
    \${solution_venv}=    Set Variable    Check virtual environment
    Should Contain    \${error_module}    Module
    Should Contain    \${solution_pip}    pip install
    Should Contain    \${solution_venv}    virtual environment
    Log    Error: \${error_module}
    Log    Solution 1: \${solution_pip}
    Log    Solution 2: \${solution_venv}
    \${module_fixed}=    Set Variable    True
    Should Be True    \${module_fixed}
    Log    ✅ Module Not Found resuelto

Fix WebDriver Error
    [Documentation]    Solución para WebDriver errors
    Log    🚗 Solucionando WebDriver errors
    \${webdriver_error}=    Set Variable    WebDriverException
    \${solution_download}=    Set Variable    Download latest ChromeDriver
    \${solution_path_env}=    Set Variable    Add to PATH environment
    Should Contain    \${webdriver_error}    WebDriver
    Should Contain    \${solution_download}    ChromeDriver
    Should Contain    \${solution_path_env}    PATH
    Log    Error: \${webdriver_error}
    Log    Solution 1: \${solution_download}
    Log    Solution 2: \${solution_path_env}
    \${webdriver_fixed}=    Set Variable    True
    Should Be True    \${webdriver_fixed}
    Log    ✅ WebDriver error resuelto</code></pre>
        
        <h3>🎯 Troubleshooting práctico (6 min):</h3>
        <p><strong>1. Check Python:</strong> <code>python --version</code> → Debe mostrar Python 3.x</p>
        <p><strong>2. Check Robot Framework:</strong> <code>robot --version</code> → Verificar versión instalada</p>
        <p><strong>3. Check pip packages:</strong> <code>pip list | grep robot</code> → Ver paquetes RF</p>
        <p><strong>4. Fix Permission Denied:</strong> Run CMD as Administrator → Retry installation</p>
        <p><strong>5. Fix Module Not Found:</strong> <code>pip install robotframework</code> → Reinstalar</p>
        <p><strong>6. Fix PATH issues:</strong> System Properties → Environment Variables → Add Python paths</p>
        <p><strong>7. Download ChromeDriver:</strong> chromedriver.chromium.org → Download latest version</p>
        <p><strong>8. Fix WebDriver PATH:</strong> Copy chromedriver.exe to C:\\webdrivers\\ → Add to PATH</p>
        <p><strong>9. Virtual environment:</strong> <code>python -m venv venv</code> → <code>venv\\Scripts\\activate</code></p>
        <p><strong>10. Reinstall clean:</strong> <code>pip uninstall robotframework</code> → <code>pip install robotframework</code></p>
        <p><strong>11. Check PyCharm interpreter:</strong> Settings → Python Interpreter → Select correct Python</p>
        <p><strong>12. Install RF plugin:</strong> Settings → Plugins → Install "Robot Framework Support"</p>
        <p><strong>13. Test basic robot:</strong> Create test.robot → <code>robot test.robot</code> → Verify works</p>
        <p><strong>14. Test SeleniumLibrary:</strong> <code>python -c "import SeleniumLibrary"</code> → No errors</p>
        <p><strong>15. Test browser automation:</strong> Simple Open Browser test → Verify Chrome opens</p>
        <p><strong>16. Clear cache:</strong> <code>pip cache purge</code> → Clean pip cache if issues</p>
        <p><strong>17. Update packages:</strong> <code>pip install --upgrade robotframework</code> → Latest version</p>
        <p><strong>18. Check firewall:</strong> Windows Defender → Allow Python and chromedriver</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Diagnosticar problemas instalación Python/Robot Framework</li>
                <li>Resolver errores comunes PATH y permissions</li>
                <li>Solucionar problemas WebDriver y browser automation</li>
                <li>Configurar environment variables correctamente</li>
                <li>Verificar integración PyCharm funcional</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>90% problemas = PATH mal configurado o permisos. Usa "Run as Administrator" y verifica environment variables.</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>🔧 Errores más comunes:</h4>
            <ul>
                <li><strong>Permission Denied:</strong> Run as Administrator</li>
                <li><strong>Module Not Found:</strong> pip install robotframework</li>
                <li><strong>WebDriver Error:</strong> Download ChromeDriver + Add to PATH</li>
                <li><strong>Command not found:</strong> Fix Python PATH environment</li>
                <li><strong>Import Error:</strong> Virtual environment or reinstall packages</li>
            </ul>
        </div>
        
        <h3>🚀 Siguiente: Lección 016 - Sintaxis básica de Robot Framework</h3>
        <p>Con instalación funcionando perfectamente, aprenderás la sintaxis fundamental de Robot Framework.</p>
    `,
    topics: ["troubleshooting", "problems", "solutions"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-014"],
    estimatedTime: 8,
    difficulty: "easy",
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_015 = LESSON_015;
}