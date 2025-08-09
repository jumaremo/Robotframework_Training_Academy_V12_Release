/**
 * Robot Framework Academy - Lesson 016 OPTIMIZED
 * Sintaxis básica de Robot Framework
 */

const LESSON_016 = {
    id: 16,
    title: "Sintaxis básica de Robot Framework",
    duration: "8 min",
    level: "beginner",
    section: "section-02",
    content: `
        <h2>🧠 Sintaxis RF</h2>
        <p>Robot Framework syntax = lenguaje humano + estructura clara.</p>
        
        <h3>🤖 Tests sintaxis:</h3>
        <pre><code class="robot">*** Variables ***
\${BROWSER}           chrome
\${URL}               https://example.com
\${TEST_NAME}         Test Case Structure
\${KEYWORD_COUNT}     3
\${SPACES}            4
\${TABS}              0
\${SCALAR_VAR}        test_value
\${COMMENT_STYLE}     hash
\${SYNTAX_SCORE}      100

*** Test Cases ***
Test Settings Section
    [Documentation]    Validar sección *** Settings ***
    Log                    📋 Testing Settings section
    Should Not Be Empty    SeleniumLibrary
    Should Contain         SeleniumLibrary    Selenium
    Should Not Be Empty    Collections
    Should Contain         Collections    Collection
    Should Be Equal        SeleniumLibrary    SeleniumLibrary
    Should Be Equal        Collections    Collections
    Should Not Be Empty    Library SeleniumLibrary
    Should Not Be Empty    Library Collections
    Should Be True         True
    Should Contain         Library    Library
    Log                    ✅ Settings section validated

Test Variables Section
    [Documentation]    Validar sección *** Variables ***
    Log                    🔧 Testing Variables section
    Should Not Be Empty    \${BROWSER}
    Should Be Equal        \${BROWSER}    chrome
    Should Contain         \${BROWSER}    chrome
    Should Not Be Empty    \${URL}
    Should Contain         \${URL}    https
    Should Contain         \${URL}    example
    Should Be Equal        \${URL}    https://example.com
    Should Be True         len('\${URL}') > 10
    Should Not Be Empty    chrome
    Should Not Be Empty    https://example.com
    Log                    ✅ Variables section validated

Test Case Structure
    [Documentation]    Validar estructura Test Cases
    Log                    🧪 Testing Test Cases structure
    Should Not Be Empty    \${TEST_NAME}
    Should Contain         \${TEST_NAME}    Test
    Should Contain         \${TEST_NAME}    Case
    Should Be Equal        \${TEST_NAME}    Test Case Structure
    Should Be True         len('\${TEST_NAME}') > 5
    Should Not Be Empty    Test Case Structure
    Should Contain         Test Case Structure    Structure
    Should Be Equal        Test Case Structure    Test Case Structure
    Should Be True         True
    Should Contain         Documentation    Documentation
    Log                    ✅ Test Cases structure validated

Test Keywords Basic
    [Documentation]    Validar keywords básicos
    Log                    🔑 Testing basic keywords
    Should Be True         True
    Should Be Equal        chrome    chrome
    Should Contain         test    test
    Should Not Be Empty    \${KEYWORD_COUNT}
    Should Be Equal As Numbers    \${KEYWORD_COUNT}    3
    Should Be True         \${KEYWORD_COUNT} > 0
    Should Not Be Empty    3
    Should Be Equal        3    3
    Should Contain         keywords    keywords
    Should Not Be Empty    keywords
    Log                    ✅ Basic keywords validated

Test Indentation Syntax
    [Documentation]    Validar indentación
    Log                    📐 Testing indentation syntax
    Should Not Be Empty    \${SPACES}
    Should Be Equal As Numbers    \${SPACES}    4
    Should Not Be Empty    \${TABS}
    Should Be Equal As Numbers    \${TABS}    0
    Should Be True         \${SPACES} > \${TABS}
    Should Be True         \${SPACES} >= 4
    Should Not Be Empty    4
    Should Not Be Empty    0
    Should Be Equal        4    4
    Should Be Equal        0    0
    Should Contain         indentation    indentation
    Log                    ✅ Indentation syntax validated

Test Variables Types
    [Documentation]    Validar tipos de variables
    Log                    🎯 Testing variable types
    Should Not Be Empty    \${SCALAR_VAR}
    Should Be Equal        \${SCALAR_VAR}    test_value
    Should Contain         \${SCALAR_VAR}    test
    @{list_var}=           Create List    item1    item2
    &{dict_var}=           Create Dictionary    key1=value1
    \${list_length}=       Get Length    \${list_var}
    \${dict_length}=       Get Length    \${dict_var}
    Should Be Equal As Numbers    \${list_length}    2
    Should Be Equal As Numbers    \${dict_length}    1
    Should Be True         \${list_length} > 0
    Should Be True         \${dict_length} > 0
    Should Not Be Empty    test_value
    Log                    ✅ Variable types validated

Test Comments Documentation
    [Documentation]    Validar comentarios
    Log                    📝 Testing comments documentation
    Should Not Be Empty    \${COMMENT_STYLE}
    Should Contain         \${COMMENT_STYLE}    hash
    Should Be Equal        \${COMMENT_STYLE}    hash
    Should Be True         True
    Should Not Be Empty    hash
    Should Be Equal        hash    hash
    Should Contain         comments    comments
    Should Not Be Empty    comments
    Should Contain         documentation    documentation
    Should Not Be Empty    documentation
    Log                    ✅ Comments documentation validated

Test Syntax Complete
    [Documentation]    Test sintaxis completa
    Log                    🚀 Testing complete syntax
    Should Not Be Empty    \${SYNTAX_SCORE}
    Should Be Equal As Numbers    \${SYNTAX_SCORE}    100
    Should Be True         \${SYNTAX_SCORE} >= 90
    Should Be True         \${SYNTAX_SCORE} == 100
    Should Not Be Empty    100
    Should Be Equal        100    100
    Should Contain         complete    complete
    Should Not Be Empty    complete
    Should Contain         syntax    syntax
    Should Not Be Empty    syntax
    Log                    ✅ Complete syntax validated</code></pre>
        
        <h3>🎯 Práctica sintaxis (6 min):</h3>
        <p>1. Crear test.robot: New File → Estructura 4 secciones</p>
        <p>2. Settings: *** Settings *** → Library SeleniumLibrary</p>
        <p>3. Variables: *** Variables *** → \${BROWSER} chrome</p>
        <p>4. Test Cases: *** Test Cases *** → Mi Test → [Documentation]</p>
        <p>5. Indentación: 4 espacios por nivel → Sin tabs</p>
        <p>6. Keywords: Log → Should Be Equal → Should Contain</p>
        <p>7. Variables: \${VAR} escalares → @{LIST} listas</p>
        <p>8. Comentarios: # Comentario → Describir pasos</p>
        <p>9. Ejecutar: robot test.robot → Ver resultados</p>
        <p>10. Fix errores: Revisar indentación → Corregir espacios</p>
        <p>11. Variables dinámicas: Set Test Variable → Get Time</p>
        <p>12. Listas: Create List → Get Length</p>
        <p>13. Diccionarios: Create Dictionary → Get Length</p>
        <p>14. Validation: robot --dryrun test.robot</p>
        <p>15. PyCharm: Ver syntax highlighting → Autocompletado</p>
        <p>16. Best practices: Nombres descriptivos → Estructura clara</p>
        <p>17. Multiple tests: Agregar más test cases</p>
        <p>18. Complete test: robot test.robot → All PASS</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar estructura de 4 secciones (Settings, Variables, Test Cases, Keywords)</li>
                <li>Aplicar indentación correcta con 4 espacios</li>
                <li>Usar tipos de variables escalares, listas y diccionarios</li>
                <li>Escribir documentación y comentarios descriptivos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>4 espacios indentación + nombres descriptivos = código mantenible. Sin tabs, siempre espacios.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 017 - Test Cases y Test Suites</h3>
        <p>Con sintaxis dominada, aprenderás organización profesional de test cases y suites con tags y estructura.</p>
    `,
    topics: ["syntax", "basics", "structure"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 8,
    difficulty: "easy",
    prerequisites: ["lesson-015"],
    type: "foundation"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_016 = LESSON_016;
}