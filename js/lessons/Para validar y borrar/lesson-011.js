/**
 * Robot Framework Academy - Lesson 011 (VERSIÓN SIMPLE)
 * Git y TortoiseGit para QA Engineers
 */

const LESSON_011 = {
    id: 11,
    title: "Git y TortoiseGit para QA Engineers",
    duration: "8 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#011 robot framework git tortoisegit qa automation version control diff commit push",
    content: `
        <h2>🧠 Git + TortoiseGit QA</h2>
        <p>Control visual de versiones para QA Engineers. **DIFF** (ver cambios), **COMMIT** (guardar), **PUSH** (compartir) = workflow diario esencial.</p>
        
        <h3>💻 Comandos TortoiseGit diarios:</h3>
        <pre><code class="robot">*** Test Cases ***
DIFF - Ver Cambios QA
    [Documentation]    Comando diario #1 para QA Engineers
    Log    🔍 DIFF: Comparando cambios en tests
    \${test_file}=    Set Variable    login_test.robot
    \${changes_found}=    Set Variable    True
    Should Be True    \${changes_found}
    Log    Archivos modificados detectados
    Log    Right-click → TortoiseGit → Diff
    Log    Rojo = eliminado, Verde = agregado
    Should Contain    \${test_file}    test
    Log    ✅ DIFF: Cambios visualizados correctamente

COMMIT - Guardar Versión QA
    [Documentation]    Comando diario #2 para QA Engineers  
    Log    💾 COMMIT: Guardando versión de tests
    \${commit_msg}=    Set Variable    QA: Added login automation
    \${files_staged}=    Set Variable    3
    Should Be True    \${files_staged} > 0
    Log    Right-click → TortoiseGit → Commit
    Log    Mensaje: \${commit_msg}
    Should Contain    \${commit_msg}    QA:
    Log    Files staged: \${files_staged}
    Should Be Equal As Numbers    \${files_staged}    3
    Log    ✅ COMMIT: Versión guardada con mensaje QA

PUSH - Compartir con Equipo QA
    [Documentation]    Comando diario #3 para QA Engineers
    Log    🚀 PUSH: Compartiendo tests con equipo
    \${push_success}=    Set Variable    True
    \${remote_repo}=    Set Variable    origin
    Should Be True    \${push_success}
    Log    Right-click → TortoiseGit → Push
    Log    Remote: \${remote_repo}
    Should Contain    \${remote_repo}    origin
    Log    Upload progress: 100%
    Log    Remote repository updated
    Should Be Equal    \${remote_repo}    origin
    Log    ✅ PUSH: Tests disponibles para todo el equipo

Workflow Completo DIFF-COMMIT-PUSH
    [Documentation]    Workflow diario completo QA Engineers
    Log    🔄 Ejecutando workflow diario QA
    \${workflow_step}=    Set Variable    1
    
    # Paso 1: DIFF
    Log    Paso \${workflow_step}: Revisar cambios
    \${diff_ok}=    Set Variable    True
    Should Be True    \${diff_ok}
    \${workflow_step}=    Evaluate    \${workflow_step} + 1
    
    # Paso 2: COMMIT  
    Log    Paso \${workflow_step}: Guardar versión
    \${commit_ok}=    Set Variable    True
    Should Be True    \${commit_ok}
    \${workflow_step}=    Evaluate    \${workflow_step} + 1
    
    # Paso 3: PUSH
    Log    Paso \${workflow_step}: Compartir con equipo
    \${push_ok}=    Set Variable    True
    Should Be True    \${push_ok}
    
    # Validar workflow completo
    Should Be Equal As Numbers    \${workflow_step}    3
    Log    ✅ Workflow QA completo: DIFF→COMMIT→PUSH</code></pre>
        
        <h3>🎯 Práctica TortoiseGit QA (6 min):</h3>
        <p><strong>1. Instalar TortoiseGit:</strong> tortoisegit.org → Download → Install → Restart PC</p>
        <p><strong>2. Configurar usuario QA:</strong> Right-click → TortoiseGit → Settings → Name: "QA Engineer" → Email: tu-email</p>
        <p><strong>3. Crear repo QA:</strong> New Folder "robot-qa-tests" → Right-click → Git Create Repository</p>
        <p><strong>4. Crear test inicial:</strong> New File "login_test.robot" → Código básico Robot Framework</p>
        <p><strong>5. **COMANDO DIFF:**</strong> Modificar test → Right-click → TortoiseGit → **Diff** → Ver cambios rojos/verdes</p>
        <p><strong>6. Interpretar DIFF:</strong> **Rojo = eliminado**, **Verde = agregado**, **Sin color = sin cambios**</p>
        <p><strong>7. **COMANDO COMMIT:**</strong> Right-click → TortoiseGit → **Commit** → Message: "QA: Added login test"</p>
        <p><strong>8. Escribir mensaje QA:</strong> **Formato: "QA: [Acción] [Descripción]"** → Commit</p>
        <p><strong>9. Ver historial:</strong> Right-click → TortoiseGit → Show Log → Ver commits con mensajes</p>
        <p><strong>10. Crear más tests:</strong> Agregar "logout_test.robot" → DIFF para ver diferencias</p>
        <p><strong>11. Commit multiple:</strong> Select files → COMMIT con mensaje descriptivo QA</p>
        <p><strong>12. **COMANDO PUSH:**</strong> Right-click → TortoiseGit → **Push** → Subir al repositorio remoto</p>
        <p><strong>13. Configurar remote:</strong> Push → Set URL repositorio → GitHub/GitLab/Bitbucket</p>
        <p><strong>14. Push exitoso:</strong> Verificar "Success" → Tests disponibles para todo el equipo QA</p>
        <p><strong>15. Pull para actualizar:</strong> Right-click → TortoiseGit → Pull → Bajar cambios del equipo</p>
        <p><strong>16. Workflow diario:**</strong> Modificar tests → **DIFF** → **COMMIT** → **PUSH** → Repetir</p>
        <p><strong>17. Resolver conflictos:</strong> Si hay conflicts → TortoiseGit → Resolve → Merge manual</p>
        <p><strong>18. Branching QA:</strong> Right-click → Switch/Checkout → Create branch "feature/new-tests"</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar **DIFF**, **COMMIT**, **PUSH** diarios</li>
                <li>Usar TortoiseGit visual para control versiones</li>
                <li>Crear workflow eficiente para tests Robot Framework</li>
                <li>Colaborar con equipo QA usando Git</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>**DIFF** antes commit = evitar código roto. **COMMIT** frecuente = backup. **PUSH** diario = equipo actualizado.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 012 - Configuración de requirements.txt</h3>
        <p>Gestionar dependencias Python para proyectos Robot Framework escalables.</p>
    `,
    topics: ["git", "tortoisegit", "version-control", "qa-automation", "diff-commit-push"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-010"],
    estimatedTime: 8,
    difficulty: "easy",
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_011 = LESSON_011;
}