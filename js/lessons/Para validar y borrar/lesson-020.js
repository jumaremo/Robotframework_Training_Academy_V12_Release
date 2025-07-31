/**
 * Robot Framework Academy - Lesson 020 (VERSIÓN OPTIMIZADA)
 * Tags y organización de pruebas
 */

const LESSON_020 = {
    id: 20,
    title: "Tags y organización de pruebas",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    searchTerms: "#020 robot framework tags organization filtering include exclude execution",
    content: `
        <h2>🧠 Tags = Organización Inteligente</h2>
        <p>Tags RF = ejecución selectiva + organización automática + filtros poderosos. [Tags] smoke critical = ejecutar solo tests importantes.</p>
        
        <h3>💻 Tests tags organización:</h3>
        <pre><code class="robot">*** Test Cases ***
Test Smoke Tag
    [Documentation]    Test con tag smoke para ejecución rápida
    [Tags]    smoke
    Log    🚀 Testing smoke tag
    \${tag_smoke}=    Set Variable    smoke
    Should Be Equal    \${tag_smoke}    smoke
    Should Contain    \${tag_smoke}    smoke
    \${is_smoke}=    Set Variable    True
    Should Be True    \${is_smoke}
    \${execution_fast}=    Set Variable    True
    Should Be True    \${execution_fast}
    Log    Tag: \${tag_smoke}
    Log    ✅ Smoke tag validated

Test Regression Tag
    [Documentation]    Test con tag regression para suite completa
    [Tags]    regression
    Log    🔄 Testing regression tag
    \${tag_regression}=    Set Variable    regression
    Should Be Equal    \${tag_regression}    regression
    Should Contain    \${tag_regression}    regression
    \${is_regression}=    Set Variable    True
    Should Be True    \${is_regression}
    \${comprehensive}=    Set Variable    True
    Should Be True    \${comprehensive}
    Log    Tag: \${tag_regression}
    Log    ✅ Regression tag validated

Test Critical Tag
    [Documentation]    Test con tag critical para funcionalidad esencial
    [Tags]    critical
    Log    ⚠️ Testing critical tag
    \${tag_critical}=    Set Variable    critical
    Should Be Equal    \${tag_critical}    critical
    Should Contain    \${tag_critical}    critical
    \${is_critical}=    Set Variable    True
    Should Be True    \${is_critical}
    \${priority_high}=    Set Variable    True
    Should Be True    \${priority_high}
    Log    Tag: \${tag_critical}
    Log    ✅ Critical tag validated

Test Multiple Tags
    [Documentation]    Test con múltiples tags para organización compleja
    [Tags]    smoke    critical    login    authentication
    Log    🏷️ Testing multiple tags
    \${tag1}=    Set Variable    smoke
    \${tag2}=    Set Variable    critical
    \${tag3}=    Set Variable    login
    \${tag4}=    Set Variable    authentication
    Should Be Equal    \${tag1}    smoke
    Should Be Equal    \${tag2}    critical
    Should Be Equal    \${tag3}    login
    Should Be Equal    \${tag4}    authentication
    \${total_tags}=    Set Variable    4
    Should Be Equal As Numbers    \${total_tags}    4
    Log    Tags: \${tag1}, \${tag2}, \${tag3}, \${tag4}
    Log    ✅ Multiple tags validated

Test Functional Tags
    [Documentation]    Test con tags funcionales por módulo
    [Tags]    shopping    cart    ecommerce    functional
    Log    🛒 Testing functional tags
    \${module}=    Set Variable    shopping
    \${feature}=    Set Variable    cart
    \${category}=    Set Variable    ecommerce
    \${type}=    Set Variable    functional
    Should Contain    \${module}    shopping
    Should Contain    \${feature}    cart
    Should Contain    \${category}    ecommerce
    Should Contain    \${type}    functional
    \${functional_test}=    Set Variable    True
    Should Be True    \${functional_test}
    Log    Module: \${module}, Feature: \${feature}
    Log    ✅ Functional tags validated

Test Environment Tags
    [Documentation]    Test con tags de ambiente para ejecución específica
    [Tags]    dev    qa    staging    environment
    Log    🌍 Testing environment tags
    \${env_dev}=    Set Variable    dev
    \${env_qa}=    Set Variable    qa
    \${env_staging}=    Set Variable    staging
    \${env_category}=    Set Variable    environment
    Should Be Equal    \${env_dev}    dev
    Should Be Equal    \${env_qa}    qa
    Should Be Equal    \${env_staging}    staging
    Should Be Equal    \${env_category}    environment
    \${env_specific}=    Set Variable    True
    Should Be True    \${env_specific}
    Log    Environments: \${env_dev}, \${env_qa}, \${env_staging}
    Log    ✅ Environment tags validated

Test Execution Filtering
    [Documentation]    Test para validar filtros de ejecución con tags
    [Tags]    filtering    execution    include    exclude
    Log    🔍 Testing execution filtering
    \${include_cmd}=    Set Variable    robot --include smoke
    \${exclude_cmd}=    Set Variable    robot --exclude slow
    \${filter_smoke}=    Set Variable    smoke
    \${filter_slow}=    Set Variable    slow
    Should Contain    \${include_cmd}    --include
    Should Contain    \${include_cmd}    smoke
    Should Contain    \${exclude_cmd}    --exclude
    Should Contain    \${exclude_cmd}    slow
    \${filtering_works}=    Set Variable    True
    Should Be True    \${filtering_works}
    Log    Include: \${include_cmd}
    Log    Exclude: \${exclude_cmd}
    Log    ✅ Execution filtering validated

Test Organization Complete
    [Documentation]    Test completo de organización con tags
    [Tags]    complete    organization    best-practices    final
    Log    🎯 Testing complete organization
    \${organization_levels}=    Set Variable    4
    \${tag_categories}=    Create List    type    module    environment    priority
    \${categories_count}=    Get Length    \${tag_categories}
    Should Be Equal As Numbers    \${organization_levels}    4
    Should Be Equal As Numbers    \${categories_count}    4
    Should Contain    \${tag_categories}    type
    Should Contain    \${tag_categories}    module
    Should Contain    \${tag_categories}    environment
    Should Contain    \${tag_categories}    priority
    \${well_organized}=    Set Variable    True
    Should Be True    \${well_organized}
    \${organization_score}=    Set Variable    95
    Should Be True    \${organization_score} >= 90
    Log    Categories: \${tag_categories}
    Log    Score: \${organization_score}%
    Log    ✅ Complete organization validated</code></pre>
        
        <h3>🎯 Práctica tags (4 min):</h3>
        <p><strong>1. Crear tags_test.robot:</strong> New File → Test con tags</p>
        <p><strong>2. Tag smoke:</strong> [Tags] smoke → Test rápido</p>
        <p><strong>3. Tag regression:</strong> [Tags] regression → Test completo</p>
        <p><strong>4. Tag critical:</strong> [Tags] critical → Test esencial</p>
        <p><strong>5. Multiple tags:</strong> [Tags] smoke critical login → Múltiples categorías</p>
        <p><strong>6. Tags funcionales:</strong> [Tags] shopping cart → Por módulo</p>
        <p><strong>7. Tags ambiente:</strong> [Tags] dev qa staging → Por environment</p>
        <p><strong>8. Ejecutar smoke:</strong> robot --include smoke tags_test.robot</p>
        <p><strong>9. Ejecutar critical:</strong> robot --include critical tags_test.robot</p>
        <p><strong>10. Excluir lentos:</strong> robot --exclude slow tags_test.robot</p>
        <p><strong>11. Combinar filtros:</strong> robot --include smoke --exclude dev</p>
        <p><strong>12. Tags por AND:</strong> robot --include "smoke AND critical"</p>
        <p><strong>13. Tags por OR:</strong> robot --include "smoke OR regression"</p>
        <p><strong>14. Ver en reporte:</strong> report.html → Tags visibles por test</p>
        <p><strong>15. Organización completa:</strong> Categorizar todos los tests</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Usar [Tags] para categorizar tests</li>
                <li>Ejecutar tests selectivamente con --include/--exclude</li>
                <li>Organizar por tipo, módulo, ambiente</li>
                <li>Aplicar filtros complejos AND/OR</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>smoke = tests rápidos. regression = suite completa. critical = funcionalidad esencial. Tags = ejecución inteligente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 021 - Setup y Teardown</h3>
        <p>Con tags dominados, aprenderás lifecycle management con setup y teardown.</p>
    `,
    topics: ["tags", "organization", "filtering"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-019"],
    estimatedTime: 5,
    difficulty: "easy"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_020 = LESSON_020;
}