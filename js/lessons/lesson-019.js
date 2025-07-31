/**
 * Robot Framework Academy - Lesson 019 (VERSIÓN OPTIMIZADA)
 * Documentación de tests
 */

const LESSON_019 = {
    id: 19,
    title: "Documentación de tests",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    searchTerms: "#019 robot framework documentation comments metadata test cases description",
    content: `
        <h2>🧠 Documentación = Código Mantenible</h2>
        <p>Documentación RF = tests autodescriptivos + mantenimiento fácil + colaboración eficiente. [Documentation] + comentarios = código profesional.</p>
        
        <h3>💻 Tests documentación RF:</h3>
        <pre><code class="robot">*** Test Cases ***
Test Documentation Basic
    [Documentation]    Test para validar documentación básica
    Log    📝 Testing basic documentation
    \${doc_present}=    Set Variable    True
    Should Be True    \${doc_present}
    \${doc_text}=    Set Variable    Test para validar documentación básica
    Should Contain    \${doc_text}    validar
    Should Contain    \${doc_text}    documentación
    Should Be True    len('\${doc_text}') > 10
    Log    Documentation: \${doc_text}
    Log    ✅ Basic documentation OK

Test Documentation Detailed
    [Documentation]    Test detallado para validar documentación completa
    ...                con múltiples líneas y descripción extensa
    ...                incluyendo propósito y contexto del test
    Log    📋 Testing detailed documentation
    \${doc_lines}=    Set Variable    3
    \${doc_complete}=    Set Variable    True
    Should Be Equal As Numbers    \${doc_lines}    3
    Should Be True    \${doc_complete}
    \${purpose}=    Set Variable    validar documentación completa
    Should Contain    \${purpose}    validar
    Should Contain    \${purpose}    completa
    Log    Purpose: \${purpose}
    Log    Lines: \${doc_lines}
    Log    ✅ Detailed documentation OK

Test Comments Inline
    [Documentation]    Test para validar comentarios inline
    Log    💬 Testing inline comments
    # Este es un comentario inline
    \${comment_style}=    Set Variable    hash_symbol
    Should Contain    \${comment_style}    hash
    Should Be Equal    \${comment_style}    hash_symbol
    # Comentario describiendo el siguiente paso
    \${step_described}=    Set Variable    True
    Should Be True    \${step_described}
    # Validación final del test
    \${validation_ok}=    Set Variable    True
    Should Be True    \${validation_ok}
    Log    Comment style: \${comment_style}
    Log    ✅ Inline comments OK

Test Comments Block
    [Documentation]    Test para validar comentarios en bloque
    Log    📄 Testing block comments
    # ======================
    # BLOQUE DE COMENTARIOS
    # Descripción completa del test
    # Incluyendo contexto y objetivos
    # ======================
    \${block_comments}=    Set Variable    True
    \${formatted_well}=    Set Variable    True
    Should Be True    \${block_comments}
    Should Be True    \${formatted_well}
    \${comment_chars}=    Set Variable    ===
    Should Contain    \${comment_chars}    =
    Should Be Equal    \${comment_chars}    ===
    Log    Block comments: \${block_comments}
    Log    Formatting: \${formatted_well}
    Log    ✅ Block comments OK

Test Metadata Tags
    [Documentation]    Test para validar metadata con tags
    [Tags]    documentation    metadata    example    smoke
    Log    🏷️ Testing metadata tags
    \${tag1}=    Set Variable    documentation
    \${tag2}=    Set Variable    metadata
    \${tag3}=    Set Variable    example
    \${tag4}=    Set Variable    smoke
    Should Be Equal    \${tag1}    documentation
    Should Be Equal    \${tag2}    metadata
    Should Be Equal    \${tag3}    example
    Should Be Equal    \${tag4}    smoke
    \${total_tags}=    Set Variable    4
    Should Be Equal As Numbers    \${total_tags}    4
    Log    Tags: \${tag1}, \${tag2}, \${tag3}, \${tag4}
    Log    ✅ Metadata tags OK

Test Setup Teardown Documentation
    [Documentation]    Test con setup y teardown documentados
    [Setup]    Log    Ejecutando setup documentado
    [Teardown]    Log    Ejecutando teardown documentado
    Log    🔧 Testing setup teardown documentation
    \${setup_doc}=    Set Variable    Ejecutando setup documentado
    \${teardown_doc}=    Set Variable    Ejecutando teardown documentado
    Should Contain    \${setup_doc}    setup
    Should Contain    \${setup_doc}    documentado
    Should Contain    \${teardown_doc}    teardown
    Should Contain    \${teardown_doc}    documentado
    \${lifecycle_documented}=    Set Variable    True
    Should Be True    \${lifecycle_documented}
    Log    Setup: \${setup_doc}
    Log    Teardown: \${teardown_doc}
    Log    ✅ Lifecycle documentation OK

Test Documentation Best Practices
    [Documentation]    Test aplicando mejores prácticas de documentación
    ...                - Propósito claro y específico
    ...                - Contexto del test explicado
    ...                - Resultados esperados definidos
    [Tags]    best-practices    documentation    example
    Log    ⭐ Testing documentation best practices
    \${clear_purpose}=    Set Variable    True
    \${context_explained}=    Set Variable    True
    \${results_defined}=    Set Variable    True
    Should Be True    \${clear_purpose}
    Should Be True    \${context_explained}
    Should Be True    \${results_defined}
    # Aplicando mejores prácticas en comentarios
    \${best_practices}=    Set Variable    applied
    Should Be Equal    \${best_practices}    applied
    \${documentation_score}=    Set Variable    95
    Should Be True    \${documentation_score} >= 90
    Log    Best practices applied: \${best_practices}
    Log    Documentation score: \${documentation_score}%
    Log    ✅ Best practices OK

Test Documentation Complete
    [Documentation]    Test completo validando toda la documentación RF
    ...                incluyendo [Documentation], comentarios, tags
    ...                y mejores prácticas de mantenibilidad
    [Tags]    complete    documentation    validation    final
    [Setup]    Log    Setup completo con documentación
    [Teardown]    Log    Teardown completo con documentación
    Log    🎯 Testing complete documentation
    # Validación completa de documentación
    \${doc_sections}=    Set Variable    4
    \${comments_present}=    Set Variable    True
    \${tags_configured}=    Set Variable    True
    \${lifecycle_documented}=    Set Variable    True
    Should Be Equal As Numbers    \${doc_sections}    4
    Should Be True    \${comments_present}
    Should Be True    \${tags_configured}
    Should Be True    \${lifecycle_documented}
    # Score final de documentación
    \${final_score}=    Set Variable    100
    Should Be Equal As Numbers    \${final_score}    100
    \${maintainable}=    Set Variable    True
    Should Be True    \${maintainable}
    Log    Documentation sections: \${doc_sections}
    Log    Final score: \${final_score}%
    Log    ✅ Complete documentation validated</code></pre>
        
        <h3>🎯 Práctica documentación (4 min):</h3>
        <p><strong>1. Crear doc_test.robot:</strong> New File → Test documentación</p>
        <p><strong>2. [Documentation] básico:</strong> Test Case → [Documentation] Descripción clara</p>
        <p><strong>3. [Documentation] múltiple:</strong> ... para líneas adicionales</p>
        <p><strong>4. Comentarios #:</strong> # Comentario descriptivo paso</p>
        <p><strong>5. Comentarios bloque:</strong> # ===== SECCIÓN ===== separadores</p>
        <p><strong>6. [Tags] metadata:</strong> [Tags] smoke regression critical</p>
        <p><strong>7. [Setup] documentado:</strong> [Setup] Log "Setup description"</p>
        <p><strong>8. [Teardown] documentado:</strong> [Teardown] Log "Cleanup description"</p>
        <p><strong>9. Comentarios contexto:</strong> # Explicar lógica compleja</p>
        <p><strong>10. Nombres descriptivos:</strong> Login With Valid User Credentials</p>
        <p><strong>11. Propósito claro:</strong> [Documentation] describe QUÉ y POR QUÉ</p>
        <p><strong>12. Ejecutar test:</strong> robot doc_test.robot → Ver documentación</p>
        <p><strong>13. Ver en reporte:</strong> report.html → Documentación visible</p>
        <p><strong>14. Tags execution:</strong> robot --include smoke doc_test.robot</p>
        <p><strong>15. Best practices:</strong> Consistente, claro, mantenible</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Usar [Documentation] en todos los tests</li>
                <li>Escribir comentarios # descriptivos</li>
                <li>Configurar [Tags] para organización</li>
                <li>Aplicar best practices documentación</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>[Documentation] = propósito del test. Comentarios # = explicar pasos complejos. Tags = organización y ejecución.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 020 - Tags y organización de pruebas</h3>
        <p>Con documentación dominada, aprenderás organización avanzada con tags.</p>
    `,
    topics: ["documentation", "comments", "metadata"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-018"],
    estimatedTime: 5,
    difficulty: "easy",
    type: "standard"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_019 = LESSON_019;
}