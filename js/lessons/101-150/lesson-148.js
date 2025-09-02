/**
 * Robot Framework Academy - Lesson 148
 * Data-Driven 148
 */

const LESSON_148 = {
    id: 148,
    title: "Data-Driven 148",
    duration: "7 min",
    level: "intermediate",
    section: "section-11",
    content: `
        <h2>📊 Excel Avanzado</h2>
        <p>Leer y procesar archivos Excel complejos con múltiples hojas y datos estructurados.</p>
        
        <h3>💻 Tests Excel:</h3>
        <pre><code class="robot">*** Settings ***
Library    Collections
Library    ExcelLibrary
Library    SeleniumLibrary
Library    OperatingSystem

*** Variables ***
\${EXCEL_FILE}        \${CURDIR}/test_data.xlsx
\${USERS_SHEET}       Users
\${PRODUCTS_SHEET}    Products
\${ORDERS_SHEET}      Orders
\${BASE_URL}          http://test-app.com

*** Test Cases ***
Read Excel Multi Sheet
    Open Excel Document    \${EXCEL_FILE}    doc_id=main
    \${sheets}=    Get List Sheet Names    doc_id=main
    Should Contain    \${sheets}    \${USERS_SHEET}
    Should Contain    \${sheets}    \${PRODUCTS_SHEET}
    Should Contain    \${sheets}    \${ORDERS_SHEET}
    Log    Available sheets: \${sheets}
    Close Current Excel Document

Test Users From Excel
    Open Excel Document    \${EXCEL_FILE}    doc_id=users
    \${user_data}=    Read Excel Worksheet    name=\${USERS_SHEET}    header=True
    
    FOR    \${user}    IN    @{user_data}
        \${username}=    Get From Dictionary    \${user}    username
        \${password}=    Get From Dictionary    \${user}    password
        \${role}=       Get From Dictionary    \${user}    role
        \${expected}=   Get From Dictionary    \${user}    expected_result
        
        Open Browser    \${BASE_URL}/login    chrome
        Input Text     id=username    \${username}
        Input Text     id=password    \${password}
        Click Button   Login
        
        Run Keyword If    '\${expected}' == 'success'    Validate Successful Login    \${role}
        Run Keyword If    '\${expected}' == 'fail'       Page Should Contain    Invalid credentials
        Close Browser
    END
    Close Current Excel Document

Validate Successful Login
    [Arguments]    \${role}
    Page Should Contain    Dashboard
    Element Should Be Visible    id=user-menu
    Run Keyword If    '\${role}' == 'admin'    Element Should Be Visible    id=admin-panel
    Run Keyword If    '\${role}' == 'user'     Element Should Not Be Visible    id=admin-panel

Test Products From Excel
    Open Excel Document    \${EXCEL_FILE}    doc_id=products
    \${product_data}=    Read Excel Worksheet    name=\${PRODUCTS_SHEET}    header=True
    
    Open Browser    \${BASE_URL}/products    chrome
    FOR    \${product}    IN    @{product_data}
        \${name}=        Get From Dictionary    \${product}    name
        \${price}=       Get From Dictionary    \${product}    price
        \${category}=    Get From Dictionary    \${product}    category
        \${status}=      Get From Dictionary    \${product}    status
        
        Input Text     id=search    \${name}
        Click Button   Search
        
        Run Keyword If    '\${status}' == 'active'    Validate Product Available    \${name}    \${price}    \${category}
        Run Keyword If    '\${status}' == 'inactive'  Page Should Contain    Product not found
        Clear Element Text    id=search
    END
    Close Browser
    Close Current Excel Document

Validate Product Available
    [Arguments]    \${name}    \${price}    \${category}
    Page Should Contain    \${name}
    Page Should Contain    \$\${price}
    Page Should Contain    \${category}
    Element Should Be Visible    xpath=//button[contains(text(),'Add to Cart')]

Test Complex Excel Data
    Open Excel Document    \${EXCEL_FILE}    doc_id=complex
    \${cell_value}=    Read Excel Cell    row_num=2    col_num=1    sheet_name=\${USERS_SHEET}
    Should Not Be Empty    \${cell_value}
    
    \${range_data}=    Read Excel Cell    row_num=2    col_num=1    row_num=5    col_num=3    sheet_name=\${PRODUCTS_SHEET}
    Length Should Be    \${range_data}    4
    
    Write Excel Cell    row_num=10    col_num=1    value=Test Result    sheet_name=\${USERS_SHEET}
    Save Excel Document    filename=\${CURDIR}/updated_test_data.xlsx
    Close Current Excel Document

Data Validation Excel
    Open Excel Document    \${EXCEL_FILE}    doc_id=validation
    \${all_users}=    Read Excel Worksheet    name=\${USERS_SHEET}    header=True
    
    FOR    \${user}    IN    @{all_users}
        \${username}=    Get From Dictionary    \${user}    username
        \${email}=       Get From Dictionary    \${user}    email
        
        Should Not Be Empty    \${username}
        Should Contain    \${email}    @
        Should Contain    \${email}    .
        Length Should Be At Least    \${username}    3
    END
    
    \${unique_usernames}=    Create List
    FOR    \${user}    IN    @{all_users}
        \${username}=    Get From Dictionary    \${user}    username
        List Should Not Contain Value    \${unique_usernames}    \${username}
        Append To List    \${unique_usernames}    \${username}
    END
    Close Current Excel Document</code></pre>
        
        <h3>🎯 Práctica Excel (5 min):</h3>
        <p>1. Instala ExcelLibrary: pip install robotframework-excellibrary</p>
        <p>2. Crea test_data.xlsx con 3 hojas: Users, Products, Orders</p>
        <p>3. Llena hoja Users con: username, password, role, expected_result</p>
        <p>4. Agrega 5+ usuarios con datos válidos e inválidos</p>
        <p>5. Crea hoja Products con: name, price, category, status</p>
        <p>6. Implementa test que lee todas las hojas disponibles</p>
        <p>7. Ejecuta login para cada usuario desde Excel</p>
        <p>8. Valida que roles admin vs user tienen permisos diferentes</p>
        <p>9. Procesa búsqueda de productos desde hoja Products</p>
        <p>10. Verifica que productos activos aparecen correctamente</p>
        <p>11. Lee celdas específicas usando row_num y col_num</p>
        <p>12. Escribe resultados de vuelta al Excel</p>
        <p>13. Valida que usernames son únicos en dataset</p>
        <p>14. Confirma que emails tienen formato válido</p>
        <p>15. Guarda Excel modificado con nuevos datos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Manejar archivos Excel con múltiples hojas</li>
                <li>Procesar datos estructurados desde Excel</li>
                <li>Implementar validación de datos complejos</li>
                <li>Escribir resultados de vuelta a Excel</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa header=True para acceder datos por nombre de columna. SIEMPRE valida que datos requeridos no estén vacíos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 149 - Data-Driven 149</h3>
        <p>Aprenderás técnicas avanzadas de parametrización y manejo de datasets grandes con optimización de performance.</p>
    `,
    topics: ["data-driven", "excel", "csv"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-147"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_148 = LESSON_148;
}