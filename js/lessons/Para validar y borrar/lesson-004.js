/**
 * Robot Framework Academy - Lesson 004 (VERSIÓN SIMPLE v13.1)
 * Plugins esenciales para PyCharm
 */

const LESSON_004 = {
    id: 4,
    title: "Plugins esenciales para PyCharm",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#004 robot framework pycharm plugins productividad automation extensions",
    content: `
        <h2>🧠 Concepto: PyCharm Superpoderes</h2>
        <p>Los plugins correctos transforman PyCharm en una máquina de productividad para Robot Framework: syntax highlighting, autocompletado inteligente, ejecución directa.</p>
        
        <h3>💻 Plugins críticos a instalar:</h3>
        <pre><code class="robot">*** Test Cases ***
Verificar Plugin Robot Framework
    Log    🔍 Verificando plugin RF instalado
    \${plugin_status}=    Set Variable    installed
    Should Be Equal    \${plugin_status}    installed
    Log    ✅ Plugin Robot Framework OK
    
Verificar Plugin Python
    Log    🐍 Verificando Python Community Edition
    \${python_plugin}=    Set Variable    enabled
    Should Be Equal    \${python_plugin}    enabled
    Log    ✅ Python plugin habilitado
    
Verificar Plugin YAML
    Log    📄 Verificando YAML/Ansible support
    \${yaml_support}=    Set Variable    active
    Should Be Equal    \${yaml_support}    active
    Log    ✅ YAML plugin funcionando

Verificar Plugin Git
    Log    🔧 Verificando Git integration
    \${git_plugin}=    Set Variable    ready
    Should Be Equal    \${git_plugin}    ready
    Log    ✅ Git integrado correctamente

Verificar Plugin Terminal
    Log    💻 Verificando Terminal integrado
    \${terminal_ready}=    Set Variable    available
    Should Be Equal    \${terminal_ready}    available
    Log    ✅ Terminal listo para usar</code></pre>
        
        <h3>🎯 Práctica directa (4 min):</h3>
        <p><strong>1. Instalar Robot Framework plugin:</strong> File → Settings → Plugins → Marketplace → "Robot Framework" → Install → Restart PyCharm</p>
        <p><strong>2. Activar Python Community:</strong> Plugins → Installed → "Python Community Edition" → Enable</p>
        <p><strong>3. Instalar YAML support:</strong> Marketplace → "YAML/Ansible" → Install para archivos config</p>
        <p><strong>4. Verificar Git plugin:</strong> Plugins → "Git" → Debe estar enabled por defecto</p>
        <p><strong>5. Habilitar Terminal:</strong> Plugins → "Terminal" → Enable para comandos directos</p>
        <p><strong>6. Reiniciar PyCharm:</strong> File → Restart IDE → Esperar reinicio completo</p>
        <p><strong>7. Crear test.robot:</strong> New File → test.robot → Verificar syntax coloring automático</p>
        <p><strong>8. Probar autocompletado:</strong> Escribir "Open Bro" → Ver sugerencias "Open Browser"</p>
        <p><strong>9. Test right-click:</strong> Click derecho en test.robot → Verificar opción "Run"</p>
        <p><strong>10. Abrir Terminal integrado:</strong> View → Tool Windows → Terminal</p>
        <p><strong>11. Ejecutar comando:</strong> Terminal → robot --version → Verificar output</p>
        <p><strong>12. Configurar shortcuts:</strong> Settings → Keymap → Buscar "Robot" → Asignar F5 a "Run"</p>
        <p><strong>13. Test Git menu:</strong> VCS → Git → Verificar opciones disponibles</p>
        <p><strong>14. Crear config.yaml:</strong> New File → config.yaml → Ver syntax highlighting</p>
        <p><strong>15. Ejecutar test final:</strong> Terminal → robot verification_test.robot → ¡Success!</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Al final sabrás:</h4>
            <ul>
                <li>Instalar plugins esenciales para Robot Framework</li>
                <li>Configurar syntax highlighting y autocompletado</li>
                <li>Habilitar ejecución directa desde PyCharm</li>
                <li>Usar terminal integrado para workflow completo</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>El plugin "Robot Framework" es esencial - sin él PyCharm no reconoce archivos .robot.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 005 - Creación del primer proyecto</h3>
        <p>Con plugins instalados, crearemos tu primer proyecto Robot Framework con estructura profesional.</p>
    `,
    topics: ["plugins", "productividad"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-003"],
    estimatedTime: 5,
    difficulty: "easy"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_004 = LESSON_004;
}