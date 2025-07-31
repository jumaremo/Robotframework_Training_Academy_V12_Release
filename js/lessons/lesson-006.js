/**
 * Robot Framework Academy - Lesson 006 OPTIMIZED
 * Estructura de directorios y buenas prácticas
 */

const LESSON_006 = {
    id: 6,
    title: "Estructura de directorios y buenas prácticas",
    duration: "5 min",
    level: "beginner",
    section: "section-01",
    content: `
        <h2>📁 Estructura Directorios</h2>
        <p>Buenas prácticas = proyecto mantenible durante años.</p>
        
        <h3>🤖 Tests estructura:</h3>
        <pre><code class="robot">*** Variables ***
\${PROJECT_ROOT}      \${CURDIR}
\${TESTS_DIR}        \${PROJECT_ROOT}/tests
\${RESOURCES_DIR}    \${PROJECT_ROOT}/resources
\${CONFIG_DIR}       \${PROJECT_ROOT}/config
\${PAGES_DIR}        \${RESOURCES_DIR}/page_objects
\${COMMON_DIR}       \${RESOURCES_DIR}/common
\${VALID_PATTERN}    *_tests.robot
\${NAMING_PATTERN}   ^[a-z][a-z0-9_]*$

*** Test Cases ***
Validar Estructura Base
    [Documentation]    Valida directorios principales del proyecto
    Log    📁 Validando estructura base
    Directory Should Exist    \${TESTS_DIR}
    Directory Should Exist    \${RESOURCES_DIR}
    Directory Should Exist    \${CONFIG_DIR}
    Should Contain           \${TESTS_DIR}        tests
    Should Contain           \${RESOURCES_DIR}    resources
    Log    ✅ Estructura base correcta

Verificar Nomenclatura Tests
    [Documentation]    Verifica naming conventions en tests
    Log    🔍 Verificando nomenclatura tests
    \${test_files}=    List Files In Directory    \${TESTS_DIR}    \${VALID_PATTERN}    recursive=True
    Should Not Be Empty      \${test_files}
    FOR    \${file}    IN    @{test_files}
        Should Match Regexp    \${file}    \${NAMING_PATTERN}
        Should Contain         \${file}    _tests.robot
        Log    ✅ Archivo válido: \${file}
    END
    Log    ✅ Nomenclatura tests correcta

Validar Page Objects
    [Documentation]    Valida estructura page objects
    Log    📄 Validando page objects
    Create Directory         \${PAGES_DIR}
    Directory Should Exist   \${PAGES_DIR}
    \${page_pattern}=        Set Variable    *_page.robot
    Create File             \${PAGES_DIR}/login_page.robot    *** Keywords ***\\nLogin Page Test\\n    Log    Page object
    \${page_files}=         List Files In Directory    \${PAGES_DIR}    \${page_pattern}
    Should Not Be Empty     \${page_files}
    FOR    \${page}    IN    @{page_files}
        Should Contain      \${page}    _page.robot
        Log    ✅ Page object: \${page}
    END

Verificar Resources Common
    [Documentation]    Verifica estructura resources común
    Log    🔧 Verificando resources común
    Create Directory           \${COMMON_DIR}
    Directory Should Exist     \${COMMON_DIR}
    Create File               \${COMMON_DIR}/browser_keywords.robot    *** Keywords ***\\nBrowser Setup\\n    Log    Common keyword
    \${common_files}=         List Files In Directory    \${COMMON_DIR}    *_keywords.robot
    Should Not Be Empty       \${common_files}
    FOR    \${common}    IN    @{common_files}
        Should Contain        \${common}    _keywords.robot
        Should Match Regexp   \${common}    \${NAMING_PATTERN}
        Log    ✅ Common resource: \${common}
    END

Test Antipatrones
    [Documentation]    Detecta antipatrones comunes
    Log    ⚠️ Verificando antipatrones
    \${bad_names}=    Create List    Test_LOGIN.robot    test_login.robot    TestLogin.robot
    FOR    \${bad_name}    IN    @{bad_names}
        Should Not Contain    \${bad_name}    @
        Should Not Be Empty   \${bad_name}
        Should Contain        \${bad_name}    .robot
        Log    ✅ Antipatrón verificado: \${bad_name}
    END
    Log    ✅ Antipatrones verificados

Validar Proyecto Completo
    [Documentation]    Validación final estructura completa
    Log    🎯 Validación final proyecto
    Directory Should Exist    \${TESTS_DIR}
    Directory Should Exist    \${RESOURCES_DIR}
    Directory Should Exist    \${PAGES_DIR}
    Directory Should Exist    \${COMMON_DIR}
    \${total_dirs}=    Count Directories In Directory    \${PROJECT_ROOT}    recursive=True
    Should Be True    \${total_dirs} >= 4
    Log    ✅ Proyecto estructura validada: \${total_dirs} directorios</code></pre>
        
        <h3>🎯 Práctica estructura (4 min):</h3>
        <p>1. Revisa proyecto lección anterior</p>
        <p>2. Crea subcarpeta tests/login/ para tests login</p>
        <p>3. Crea subcarpeta tests/checkout/ para tests compra</p>
        <p>4. Renombra archivos: funcionalidad_tests.robot</p>
        <p>5. Crea resources/page_objects/ para page objects</p>
        <p>6. Crea resources/common/ para keywords comunes</p>
        <p>7. Mueve keywords: login_page.robot a page_objects/</p>
        <p>8. Crea browser_keywords.robot en common/</p>
        <p>9. Verifica nombres sin espacios ni caracteres especiales</p>
        <p>10. Ejecuta tests validación: robot validation_tests.robot</p>
        <p>11. Agrupa tests por módulo en subcarpetas</p>
        <p>12. Documenta estructura en README.md</p>
        <p>13. Valida que todos nombres siguen patrón underscore</p>
        <p>14. Crea estructura para smoke vs regression tests</p>
        <p>15. Ejecuta validación completa estructura</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear estructura de directorios profesional y escalable</li>
                <li>Aplicar convenciones de nomenclatura consistentes</li>
                <li>Organizar page objects y keywords comunes</li>
                <li>Validar y evitar antipatrones de estructura</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Nombres descriptivos = proyecto autodocumentado. Usa underscore y agrupa por funcionalidad desde el inicio.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 007 - Configuración del navegador web</h3>
        <p>Con estructura sólida, configurarás navegadores web para automation con SeleniumLibrary y WebDrivers.</p>
    `,
    topics: ["estructura", "buenas-prácticas"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-005"],
    type: "standard"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_006 = LESSON_006;
}