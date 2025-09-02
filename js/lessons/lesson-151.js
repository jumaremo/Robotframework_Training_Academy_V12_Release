/**
 * Robot Framework Academy - Lesson 151
 * Data-Driven 151
 */

const LESSON_151 = {
    id: 151,
    title: "Data-Driven 151", 
    duration: "7 min",
    level: "intermediate",
    section: "section-11",
    content: `
        <h2>📊 Parametrización Excel</h2>
        <p>Ejecuta un test con 50 datasets diferentes usando un solo archivo Excel.</p>
        
        <h3>💻 Tests Excel:</h3>
        <pre><code class="robot">*** Settings ***
Library    ExcelLibrary
Library    SeleniumLibrary
Library    Collections

*** Variables ***
\${EXCEL_FILE}     \${CURDIR}/test_data.xlsx
\${WORKSHEET}      usuarios_test
\${BROWSER}        chrome
\${BASE_URL}       https://demo-app.com
\${RESULTS_FILE}   resultados.xlsx

*** Test Cases ***
Login Data-Driven Excel
    [Documentation]    Test login con datos desde Excel
    [Tags]             data-driven    excel    login
    
    Open Excel Document    \${EXCEL_FILE}    doc_id=test_data
    \${row_count}=         Get Row Count    \${WORKSHEET}
    
    FOR    \${row}    IN RANGE    2    \${row_count + 1}
        \${username}=      Read Excel Cell    \${row}    1    \${WORKSHEET}
        \${password}=      Read Excel Cell    \${row}    2    \${WORKSHEET}
        \${expected}=      Read Excel Cell    \${row}    3    \${WORKSHEET}
        \${test_case}=     Read Excel Cell    \${row}    4    \${WORKSHEET}
        
        Log    Ejecutando: \${test_case}
        Open Browser       \${BASE_URL}    \${BROWSER}
        
        Input Text         id=username    \${username}
        Input Password     id=password    \${password}
        Click Button       id=login-btn
        
        Run Keyword If     '\${expected}' == 'success'    
        ...                Validate Successful Login    \${username}
        ...    ELSE        Validate Login Error          \${username}
        
        Write Excel Cell   \${row}    5    PASS    \${WORKSHEET}
        Close Browser
    END
    
    Save Excel Document    \${EXCEL_FILE}
    Close Excel Document   doc_id=test_data

Product Search Data-Driven
    [Documentation]    Búsquedas masivas desde CSV
    [Tags]             data-driven    csv    search
    
    \${search_data}=      Get File    \${CURDIR}/search_terms.csv
    \${lines}=           Split To Lines    \${search_data}
    Remove From List     \${lines}    0    # Remove header
    
    Open Browser         \${BASE_URL}    \${BROWSER}
    
    FOR    \${line}    IN    @{lines}
        \${columns}=      Split String    \${line}    ,
        \${term}=         Get From List   \${columns}    0
        \${expected_count}=  Get From List   \${columns}    1
        \${category}=     Get From List   \${columns}    2
        
        Clear Element Text     id=search-box
        Input Text            id=search-box    \${term}
        Click Button          id=search-btn
        
        Wait Until Page Contains Element    css=.results
        \${results}=          Get Element Count    css=.product-item
        
        Should Be Equal As Numbers    \${results}    \${expected_count}
        Page Should Contain           \${category}
        
        Log    ✓ Búsqueda '\${term}': \${results} resultados
    END
    
    Close Browser

User Registration Batch
    [Documentation]    Registro masivo de usuarios
    [Tags]             data-driven    registration    batch
    
    \${users_data}=     Create List
    ...    admin,admin123,Admin,User,admin@test.com
    ...    john,john456,John,Doe,john@example.com  
    ...    jane,jane789,Jane,Smith,jane@example.com
    ...    test,test111,Test,Case,test@demo.com
    
    Open Browser        \${BASE_URL}/register    \${BROWSER}
    
    FOR    \${user_data}    IN    @{users_data}
        \${fields}=      Split String    \${user_data}    ,
        \${username}=    Get From List   \${fields}    0
        \${password}=    Get From List   \${fields}    1
        \${firstname}=   Get From List   \${fields}    2
        \${lastname}=    Get From List   \${fields}    3
        \${email}=       Get From List   \${fields}    4
        
        Clear Element Text    id=reg-username
        Clear Element Text    id=reg-password
        Clear Element Text    id=reg-firstname
        Clear Element Text    id=reg-lastname
        Clear Element Text    id=reg-email
        
        Input Text        id=reg-username     \${username}
        Input Password    id=reg-password     \${password}
        Input Text        id=reg-firstname    \${firstname}
        Input Text        id=reg-lastname     \${lastname}
        Input Text        id=reg-email        \${email}
        
        Click Button      id=register-btn
        Wait Until Page Contains    Usuario creado exitosamente
        
        Page Should Contain    \${username}
        Log    ✓ Usuario \${username} registrado
        
        Click Link        Registrar otro usuario
    END
    
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Excel (5 min):</h3>
        <p>1. Instala ExcelLibrary: <code>pip install robotframework-excellibrary</code></p>
        <p>2. Crea test_data.xlsx con columnas: usuario, password, resultado_esperado, caso_test</p>
        <p>3. Agrega 10 filas con diferentes combinaciones de login válidas e inválidas</p>
        <p>4. Copia el test "Login Data-Driven Excel" y ejecuta con <code>robot tests.robot</code></p>
        <p>5. Verifica que Excel se actualiza con resultados en columna 5</p>
        <p>6. Crea search_terms.csv con: término, cantidad_esperada, categoría</p>
        <p>7. Agrega 5 términos de búsqueda diferentes para probar</p>
        <p>8. Ejecuta el test "Product Search Data-Driven" y analiza resultados</p>
        <p>9. Modifica el test "User Registration Batch" para usar tu archivo CSV</p>
        <p>10. Experimenta agregando más campos al dataset de usuarios</p>
        <p>11. Crea un test que lea de múltiples worksheets del mismo Excel</p>
        <p>12. Practica manejo de errores cuando datos están incompletos</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Leer datos masivos desde archivos Excel externos</li>
                <li>Implementar loops FOR con datasets variables</li>
                <li>Validar resultados contra datos esperados en CSV</li>
                <li>Escribir resultados de vuelta a archivos Excel</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Get Row Count para calcular automáticamente cuántos tests ejecutar, sin hardcodear números de filas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 152 - Data-Driven 152</h3>
        <p>Aprenderás técnicas avanzadas de parametrización con YAML y JSON para casos más complejos de data-driven testing.</p>
    `,
    topics: ["data-driven", "excel", "csv"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-150"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_151 = LESSON_151;
}