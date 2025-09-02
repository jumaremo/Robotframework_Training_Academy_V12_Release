/**
 * Robot Framework Academy - Lesson 244
 * Maintenance and Refactoring Patterns
 */

const LESSON_244 = {
    id: 244,
    title: "Maintenance and Refactoring Patterns",
    duration: "10 min",
    level: "advanced",
    section: "section-20",
    content: `
        <h2>🔧 Refactoring Patterns</h2>
        <p>Patterns de mantenimiento y refactoring para mantener sistemas complejos limpios y evolucionables.</p>
        
        <h3>💻 Refactoring framework:</h3>
        <pre><code class="robot">*** Settings ***
Library    MaintenanceFramework.py
Documentation    Maintenance and Refactoring Patterns Implementation

*** Variables ***
\${REFACTOR_STRATEGY}    incremental
\${CODE_COVERAGE}        95
\${TECHNICAL_DEBT}       low
\${COMPLEXITY_SCORE}     8
\${DUPLICATION_RATE}     2_percent
\${MAINTAINABILITY}      high
\${DOCUMENTATION_RATIO}  90
\${REGRESSION_RISK}      minimal

*** Test Cases ***
Test Extract Method Pattern
    Set Global Variable    \${METHOD_EXTRACTED}    True
    Should Be Equal    \${METHOD_EXTRACTED}    True
    Log    Extract method pattern applied    INFO
    Should Be Equal    \${REFACTOR_STRATEGY}    incremental
    Set Suite Variable    \${COMPLEXITY_REDUCED}    True
    Should Be Equal    \${COMPLEXITY_REDUCED}    True
    Log    Method complexity reduced    INFO
    Should Be Equal As Numbers    \${COMPLEXITY_SCORE}    8
    Set Test Variable    \${EXTRACT_READY}    True
    Should Be Equal    \${EXTRACT_READY}    True

Test Eliminate Duplication Pattern
    Set Suite Variable    \${DUPLICATION_FOUND}    3
    Should Be Equal As Numbers    \${DUPLICATION_FOUND}    3
    Log    Code duplication pattern analysis    INFO
    Should Be Equal    \${DUPLICATION_RATE}    2_percent
    Set Test Variable    \${CONSOLIDATION_DONE}    True
    Should Be Equal    \${CONSOLIDATION_DONE}    True
    Set Global Variable    \${REUSABILITY_IMPROVED}    True
    Should Be Equal    \${REUSABILITY_IMPROVED}    True
    Log    Code reusability improved    INFO
    Should Be Equal    \${MAINTAINABILITY}    high
    Set Suite Variable    \${DUPLICATION_READY}    True
    Should Be Equal    \${DUPLICATION_READY}    True

Test Rename Variable Pattern
    Set Global Variable    \${NAMING_IMPROVED}    True
    Should Be Equal    \${NAMING_IMPROVED}    True
    Log    Variable naming pattern applied    INFO
    Set Suite Variable    \${READABILITY_SCORE}    9
    Should Be Equal As Numbers    \${READABILITY_SCORE}    9
    Set Test Variable    \${SEMANTIC_CLARITY}    high
    Should Be Equal    \${SEMANTIC_CLARITY}    high
    Log    Semantic clarity achieved    INFO
    Should Be Equal As Numbers    \${DOCUMENTATION_RATIO}    90
    Set Global Variable    \${NAMING_READY}    True
    Should Be Equal    \${NAMING_READY}    True

Test Modularization Pattern
    Set Suite Variable    \${MODULES_CREATED}    12
    Should Be Equal As Numbers    \${MODULES_CREATED}    12
    Log    Modularization pattern implemented    INFO
    Set Test Variable    \${COUPLING_REDUCED}    True
    Should Be Equal    \${COUPLING_REDUCED}    True
    Set Global Variable    \${COHESION_INCREASED}    True
    Should Be Equal    \${COHESION_INCREASED}    True
    Log    Module cohesion increased    INFO
    Should Be Equal    \${TECHNICAL_DEBT}    low
    Set Suite Variable    \${MODULE_READY}    True
    Should Be Equal    \${MODULE_READY}    True

Test Dead Code Elimination
    Set Global Variable    \${DEAD_CODE_REMOVED}    50_lines
    Should Be Equal    \${DEAD_CODE_REMOVED}    50_lines
    Log    Dead code elimination completed    INFO
    Set Suite Variable    \${CODEBASE_CLEANED}    True
    Should Be Equal    \${CODEBASE_CLEANED}    True
    Set Test Variable    \${MAINTENANCE_REDUCED}    True
    Should Be Equal    \${MAINTENANCE_REDUCED}    True
    Log    Maintenance overhead reduced    INFO
    Should Be Equal As Numbers    \${CODE_COVERAGE}    95
    Set Global Variable    \${CLEANUP_READY}    True
    Should Be Equal    \${CLEANUP_READY}    True

Test Configuration Externalization
    Set Suite Variable    \${CONFIG_EXTERNALIZED}    True
    Should Be Equal    \${CONFIG_EXTERNALIZED}    True
    Log    Configuration externalization pattern    INFO
    Set Test Variable    \${ENVIRONMENT_AGNOSTIC}    True
    Should Be Equal    \${ENVIRONMENT_AGNOSTIC}    True
    Set Global Variable    \${FLEXIBILITY_IMPROVED}    True
    Should Be Equal    \${FLEXIBILITY_IMPROVED}    True
    Log    System flexibility improved    INFO
    Should Not Be Empty    \${REFACTOR_STRATEGY}
    Set Suite Variable    \${CONFIG_READY}    True
    Should Be Equal    \${CONFIG_READY}    True

Test Error Handling Consolidation
    Set Global Variable    \${ERROR_PATTERNS}    unified
    Should Be Equal    \${ERROR_PATTERNS}    unified
    Log    Error handling consolidation pattern    INFO
    Set Suite Variable    \${EXCEPTION_HIERARCHY}    clean
    Should Be Equal    \${EXCEPTION_HIERARCHY}    clean
    Set Test Variable    \${RECOVERY_IMPROVED}    True
    Should Be Equal    \${RECOVERY_IMPROVED}    True
    Log    Error recovery mechanisms improved    INFO
    Should Be Equal    \${REGRESSION_RISK}    minimal
    Set Global Variable    \${ERROR_READY}    True
    Should Be Equal    \${ERROR_READY}    True

Test Documentation Refactoring
    Set Suite Variable    \${DOCS_UPDATED}    True
    Should Be Equal    \${DOCS_UPDATED}    True
    Log    Documentation refactoring completed    INFO
    Should Be Equal As Numbers    \${DOCUMENTATION_RATIO}    90
    Set Test Variable    \${INLINE_COMMENTS}    optimized
    Should Be Equal    \${INLINE_COMMENTS}    optimized
    Set Global Variable    \${KNOWLEDGE_TRANSFER}    improved
    Should Be Equal    \${KNOWLEDGE_TRANSFER}    improved
    Log    Knowledge transfer improved    INFO
    Should Be Equal    \${MAINTAINABILITY}    high
    Set Suite Variable    \${DOCS_READY}    True
    Should Be Equal    \${DOCS_READY}    True</code></pre>
        
        <h3>🎯 Práctica Refactoring (7 min):</h3>
        <p>1. Implementa extract method para funciones largas</p>
        <p>2. Elimina duplicación de código con consolidation</p>
        <p>3. Renombra variables para clarity semántica</p>
        <p>4. Modulariza código en componentes cohesivos</p>
        <p>5. Elimina dead code y dependencias unused</p>
        <p>6. Externaliza configuración hardcoded</p>
        <p>7. Consolida error handling patterns</p>
        <p>8. Refactoriza documentación inline</p>
        <p>9. Optimiza imports y dependencies</p>
        <p>10. Simplifica conditional complexity</p>
        <p>11. Extrae constantes mágicas numbers</p>
        <p>12. Normaliza naming conventions</p>
        <p>13. Refactoriza test data management</p>
        <p>14. Consolida logging patterns</p>
        <p>15. Optimiza resource management</p>
        <p>16. Testa refactoring con regression suite</p>
        <p>17. Valida performance post-refactoring</p>
        <p>18. Verifica maintainability metrics improvement</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar patterns de refactoring sistemático</li>
                <li>Reducir technical debt y complexity</li>
                <li>Mejorar maintainability y readability</li>
                <li>Establecer culture de continuous improvement</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Refactoring exitoso: Extract Method + Eliminate Duplication + Clear Naming + Modularization = código que se mantiene solo y evoluciona naturalmente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 245 - Best practices implementation project</h3>
        <p>Con patterns de refactoring dominados, desarrollarás un proyecto final que implemente todos los best practices aprendidos en un sistema enterprise completo.</p>
    `,
    topics: ["best-practices", "patterns", "quality"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-243"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_244 = LESSON_244;
}