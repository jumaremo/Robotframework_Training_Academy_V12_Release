/**
 * Robot Framework Academy - Lesson 016 (VERSIÓN SIMPLE)
 * Sintaxis básica de Robot Framework
 */

const LESSON_016 = {
    id: 16,
    title: "Sintaxis básica de Robot Framework",
    duration: "8 min",
    level: "beginner",
    section: "section-02",
    searchTerms: "#016 robot framework syntax basics structure sections keywords variables test cases",
    content: `
        <h2>🧠 Sintaxis RF</h2>
        <p>Robot Framework syntax = lenguaje humano + estructura clara. Dominar syntax = escribir tests legibles.</p>
        
        <h3>💻 Tests sintaxis RF:</h3>
        <pre><code class="robot">*** Test Cases ***
Test Settings Section
    [Documentation]    Validar sección *** Settings ***
    Log    📋 Validando Settings
    \${settings_ok}=    Set Variable    True
    Should Be True    \${settings_ok}
    Should Contain    SeleniumLibrary    Selenium
    Should Contain    Collections    Collection
    Log    Library SeleniumLibrary OK
    Log    Library Collections OK
    Log    ✅ Settings section validada

Test Variables Section
    [Documentation]    Validar sección *** Variables ***
    Log    🔧 Validando Variables
    \${browser}=    Set Variable    chrome
    \${url}=    Set Variable    https://example.com
    Should Be Equal    \${browser}    chrome
    Should Contain    \${url}    https
    Should Contain    \${url}    example
    Log    Browser: \${browser}
    Log    URL: \${url}
    Should Be True    len('\${url}') > 10
    Log    ✅ Variables definidas

Test Case Structure
    [Documentation]    Validar estructura Test Cases
    Log    🧪 Validando Test Cases
    \${test_name}=    Set Variable    Test Case Structure
    Should Contain    \${test_name}    Test
    Should Contain    \${test_name}    Case
    Should Be True    len('\${test_name}') > 5
    Log    Test name: \${test_name}
    \${doc_present}=    Set Variable    True
    Should Be True    \${doc_present}
    Log    ✅ Test Case estructura OK

Test Keywords Basic
    [Documentation]    Validar keywords básicos
    Log    🔑 Validando keywords
    Should Be True    True
    Should Be Equal    chrome    chrome
    Should Contain    test    test
    \${keyword_count}=    Set Variable    3
    Should Be Equal As Numbers    \${keyword_count}    3
    \${result}=    Set Variable    PASS
    Should Be Equal    \${result}    PASS
    Log    Keywords básicos: \${keyword_count}
    Log    ✅ Keywords funcionando

Test Indentation Syntax
    [Documentation]    Validar indentación
    Log    📐 Validando indentación
    \${spaces}=    Set Variable    4
    \${tabs}=    Set Variable    0
    Should Be Equal As Numbers    \${spaces}    4
    Should Be Equal As Numbers    \${tabs}    0
    Should Be True    \${spaces} > \${tabs}
    Log    Espacios: \${spaces}
    Log    Tabs: \${tabs}
    Should Be True    True
    Log    ✅ Indentación correcta

Test Variables Types
    [Documentation]    Validar tipos de variables
    Log    🎯 Validando tipos variables
    \${scalar_var}=    Set Variable    test_value
    @{list_var}=    Create List    item1    item2
    &{dict_var}=    Create Dictionary    key1=value1
    Should Be Equal    \${scalar_var}    test_value
    \${list_length}=    Get Length    \${list_var}
    Should Be Equal As Numbers    \${list_length}    2
    \${dict_length}=    Get Length    \${dict_var}
    Should Be Equal As Numbers    \${dict_length}    1
    Log    Scalar: \${scalar_var}
    Log    List length: \${list_length}
    Log    Dict length: \${dict_length}
    Should Contain    \${scalar_var}    test
    Log    ✅ Variables types OK

Test Comments Documentation
    [Documentation]    Validar comentarios
    Log    📝 Validando comentarios
    # Este es un comentario
    \${comment_style}=    Set Variable    hash
    Should Contain    \${comment_style}    hash
    Should Be True    True
    \${doc_ok}=    Set Variable    True
    Should Be True    \${doc_ok}
    Log    Comment style: \${comment_style}
    Log    Documentation present
    Should Be Equal    \${doc_ok}    True
    Log    ✅ Comentarios OK

Test Syntax Complete
    [Documentation]    Test sintaxis completa
    Log    🚀 Test sintaxis completa
    \${test_result}=    Set Variable    PASS
    Should Be Equal    \${test_result}    PASS
    \${syntax_score}=    Set Variable    100
    Should Be True    \${syntax_score} >= 90
    Should Be Equal As Numbers    \${syntax_score}    100
    \${final_check}=    Set Variable    True
    Should Be True    \${final_check}
    Log    Test result: \${test_result}
    Log    Syntax score: \${syntax_score}%
    Should Contain    \${test_result}    PASS
    Log    ✅ Sintaxis RF dominada</code></pre>
        
        <h3>🎯 Práctica sintaxis (6 min):</h3>
        <p><strong>1. Crear test.robot:</strong> New File → Copiar estructura con 4 secciones</p>
        <p><strong>2. Settings:</strong> *** Settings *** → Library SeleniumLibrary</p>
        <p><strong>3. Variables:</strong> *** Variables *** → \${BROWSER} chrome</p>
        <p><strong>4. Test Cases:</strong> *** Test Cases *** → Mi Test → [Documentation]</p>
        <p><strong>5. Indentación:</strong> 4 espacios por nivel → Sin tabs</p>
        <p><strong>6. Keywords:</strong> Log → Should Be Equal → Should Contain</p>
        <p><strong>7. Variables:</strong> \${VAR} escalares → @{LIST} listas</p>
        <p><strong>8. Comentarios:</strong> # Comentario → Describir pasos</p>
        <p><strong>9. Ejecutar:</strong> robot test.robot → Ver resultados</p>
        <p><strong>10. Fix errores:</strong> Revisar indentación → Corregir espacios</p>
        <p><strong>11. Variables dinámicas:</strong> Set Test Variable → Get Time</p>
        <p><strong>12. Listas:</strong> Create List → Get Length</p>
        <p><strong>13. Diccionarios:</strong> Create Dictionary → Get Length</p>
        <p><strong>14. Validation:</strong> robot --dryrun test.robot</p>
        <p><strong>15. PyCharm:</strong> Ver syntax highlighting → Autocompletado</p>
        <p><strong>16. Best practices:</strong> Nombres descriptivos → Estructura clara</p>
        <p><strong>17. Multiple tests:</strong> Agregar más test cases</p>
        <p><strong>18. Complete test:</strong> robot test.robot → All PASS</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar 4 secciones fundamentales RF</li>
                <li>Usar sintaxis variables correcta</li>
                <li>Escribir keywords con indentación apropiada</li>
                <li>Aplicar best practices sintaxis</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>4 espacios indentación + nombres descriptivos = código mantenible.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 017 - Test Cases y Test Suites</h3>
        <p>Con sintaxis dominada, aprenderás organización tests profesionales.</p>
    `,
    topics: ["syntax", "basics", "structure"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-015"],
    estimatedTime: 8,
    difficulty: "easy",
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_016 = LESSON_016;
}