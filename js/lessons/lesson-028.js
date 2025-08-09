const LESSON_028 = {
    id: 28,
    title: "Estructura de proyectos medianos",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    content: `
        <h2>🏗️ Proyectos Medianos</h2>
        <p>Organización escalable de tests, resources y configuraciones para proyectos de tamaño medio.</p>
        
        <h3>💻 Estructura Recomendada:</h3>
        <pre><code class="robot">
*** Variables ***
\${PROJECT_ROOT}      /automation-project
\${TESTS_DIR}         \${PROJECT_ROOT}/tests
\${RESOURCES_DIR}     \${PROJECT_ROOT}/resources
\${CONFIG_DIR}        \${PROJECT_ROOT}/config
\${REPORTS_DIR}       \${PROJECT_ROOT}/reports

*** Test Cases ***
Verify Project Structure Exists
    [Documentation]    Validates that project directory structure is correct
    [Tags]    setup    structure    validation
    Directory Should Exist    \${PROJECT_ROOT}
    Directory Should Exist    \${TESTS_DIR}
    Directory Should Exist    \${RESOURCES_DIR}
    Directory Should Exist    \${CONFIG_DIR}
    Log    Project structure validated successfully

Test Suite Organization Validation
    [Documentation]    Verifies test suites are properly organized by feature
    [Tags]    organization    suites
    File Should Exist    \${TESTS_DIR}/login/login_tests.robot
    File Should Exist    \${TESTS_DIR}/registration/registration_tests.robot
    File Should Exist    \${TESTS_DIR}/checkout/checkout_tests.robot
    Log    Test suites organization confirmed

Resource Files Structure Check
    [Documentation]    Confirms resource files are properly separated by responsibility
    [Tags]    resources    keywords
    File Should Exist    \${RESOURCES_DIR}/common_keywords.resource
    File Should Exist    \${RESOURCES_DIR}/login_keywords.resource
    File Should Exist    \${RESOURCES_DIR}/data_keywords.resource
    File Should Exist    \${RESOURCES_DIR}/locators.resource
    Log    Resource files structure verified

Configuration Files Validation
    [Documentation]    Validates configuration files are present and accessible
    [Tags]    config    environment
    File Should Exist    \${CONFIG_DIR}/dev_config.yaml
    File Should Exist    \${CONFIG_DIR}/staging_config.yaml
    File Should Exist    \${CONFIG_DIR}/prod_config.yaml
    File Should Exist    \${CONFIG_DIR}/requirements.txt
    Log    Configuration files validated

Test Data Organization Check
    [Documentation]    Verifies test data is properly organized by test type
    [Tags]    data    organization
    Directory Should Exist    \${PROJECT_ROOT}/test_data
    Directory Should Exist    \${PROJECT_ROOT}/test_data/users
    Directory Should Exist    \${PROJECT_ROOT}/test_data/products
    File Should Exist    \${PROJECT_ROOT}/test_data/users/valid_users.csv
    Log    Test data organization confirmed

*** Keywords ***
Create Project Directory Structure
    [Documentation]    Creates the recommended directory structure for medium projects
    Create Directory    \${TESTS_DIR}/login
    Create Directory    \${TESTS_DIR}/registration
    Create Directory    \${TESTS_DIR}/checkout
    Create Directory    \${RESOURCES_DIR}
    Create Directory    \${CONFIG_DIR}
    Create Directory    \${PROJECT_ROOT}/test_data/users
    Log    Project directory structure created

Validate Import Structure
    [Documentation]    Checks that imports are properly structured across files
    [Arguments]    \${suite_file}
    \${content}    Get File    \${suite_file}
    Should Contain    \${content}    Resource
    Should Contain    \${content}    Variables
    Log    Import structure validated for \${suite_file}
        </code></pre>
        
        <h3>📁 Estructura Recomendada:</h3>
        <pre><code class="text">
automation-project/
├── tests/
│   ├── login/
│   │   └── login_tests.robot
│   ├── registration/
│   │   └── registration_tests.robot
│   └── checkout/
│       └── checkout_tests.robot
├── resources/
│   ├── common_keywords.resource
│   ├── login_keywords.resource
│   ├── data_keywords.resource
│   └── locators.resource
├── config/
│   ├── dev_config.yaml
│   ├── staging_config.yaml
│   └── requirements.txt
├── test_data/
│   ├── users/
│   │   └── valid_users.csv
│   └── products/
│       └── sample_products.json
└── reports/
    └── (generated files)
        </code></pre>
        
        <h3>🎯 Práctica Proyectos Medianos (4 min):</h3>
        <ol>
            <li><strong>Crear estructura base:</strong> Establecer directorios tests/, resources/, config/, test_data/</li>
            <li><strong>Organizar por features:</strong> Separar tests en directorios por funcionalidad (login, checkout, etc.)</li>
            <li><strong>Resources modulares:</strong> Crear archivos .resource separados por responsabilidad</li>
            <li><strong>Configuraciones por ambiente:</strong> Archivos separados para dev, staging, production</li>
            <li><strong>Test data externo:</strong> CSV/JSON files organizados por tipo de datos</li>
            <li><strong>Imports centralizados:</strong> Usar resource files para evitar duplicación</li>
            <li><strong>Naming conventions:</strong> Aplicar convenciones consistentes en nombres de archivos</li>
            <li><strong>Requirements management:</strong> Mantener requirements.txt actualizado</li>
            <li><strong>Reports directory:</strong> Directorio separado para output de ejecuciones</li>
            <li><strong>Documentation structure:</strong> README.md con instrucciones de setup</li>
            <li><strong>Version control:</strong> .gitignore apropiado para archivos temporales</li>
            <li><strong>Execution scripts:</strong> Scripts para diferentes tipos de ejecución</li>
            <li><strong>Validate structure:</strong> Tests que validen que estructura está correcta</li>
            <li><strong>Scalability planning:</strong> Estructura preparada para crecimiento futuro</li>
            <li><strong>Team standards:</strong> Documentar convenciones para el equipo</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Diseñar estructura de directorios escalable para proyectos medianos</li>
                <li>Organizar tests, resources y configuraciones de manera modular</li>
                <li>Implementar separación clara de responsabilidades entre archivos</li>
                <li>Establecer convenciones de organización para equipos de QA</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Organiza tests por funcionalidad, no por tipo. Usa resources modulares y mantén configuraciones separadas por ambiente para máxima flexibilidad.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 029 - Patrones comunes de testing</h3>
        <p>Con la estructura de proyecto establecida, exploraremos patrones y templates reutilizables que acelerarán el desarrollo de tests y mejorarán la consistencia.</p>
    `,
    topics: ["project-structure", "scaling", "organization"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-027"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_028 = LESSON_028;
}