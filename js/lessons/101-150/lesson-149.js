/**
 * Robot Framework Academy - Lesson 149
 * Data-Driven 149
 */

const LESSON_149 = {
    id: 149,
    title: "Data-Driven 149",
    duration: "7 min",
    level: "intermediate",
    section: "section-11",
    content: `
        <h2>⚡ Parametrización Avanzada</h2>
        <p>Optimizar tests data-driven con templates avanzados y manejo eficiente de grandes datasets.</p>
        
        <h3>💻 Templates optimizados:</h3>
        <pre><code class="robot">*** Settings ***
Library    Collections
Library    OperatingSystem
Library    SeleniumLibrary
Test Template    Login Test Template

*** Variables ***
\${DATASET_LARGE}     \${CURDIR}/large_dataset.csv
\${PERFORMANCE_LOG}   \${CURDIR}/performance.txt
\${BASE_URL}          http://test-app.com
\${TIMEOUT}           10s

*** Test Cases ***                  USERNAME        PASSWORD      EXPECTED    ROLE
Valid Admin Login                   admin           admin123      success     admin
Valid User Login                    user1           pass123       success     user
Valid Manager Login                 manager         mgr456        success     manager
Invalid Username                    wronguser       admin123      fail        none
Invalid Password                    admin           wrongpass     fail        none
Empty Username                      ""              admin123      fail        none
Empty Password                      admin           ""            fail        none
SQL Injection Attempt               admin'; DROP    pass123       fail        none
XSS Attempt                         <script>alert   pass123       fail        none
Long Username                       ${'a'*100}      pass123       fail        none

*** Keywords ***
Login Test Template
    [Arguments]    \${username}    \${password}    \${expected}    \${role}
    [Documentation]    Template optimizado para tests de login parametrizados
    
    \${start_time}=    Get Current Date
    Open Browser    \${BASE_URL}/login    chrome    timeout=\${TIMEOUT}
    Input Text     id=username    \${username}
    Input Text     id=password    \${password}
    Click Button   Login
    
    Run Keyword If    '\${expected}' == 'success'    Validate Successful Login    \${role}
    Run Keyword If    '\${expected}' == 'fail'       Validate Failed Login
    
    \${end_time}=    Get Current Date
    \${duration}=    Subtract Date From Date    \${end_time}    \${start_time}
    Append To File    \${PERFORMANCE_LOG}    \${username},\${duration}\n
    Close Browser

Validate Successful Login
    [Arguments]    \${expected_role}
    Page Should Contain    Dashboard
    Element Should Be Visible    id=user-menu
    
    Run Keyword If    '\${expected_role}' == 'admin'     Element Should Be Visible        id=admin-panel
    Run Keyword If    '\${expected_role}' == 'manager'   Element Should Be Visible        id=reports-section
    Run Keyword If    '\${expected_role}' == 'user'      Element Should Not Be Visible    id=admin-panel

Validate Failed Login
    Page Should Contain Any    Invalid credentials    Login failed    Access denied
    Element Should Be Visible    id=username
    Element Should Be Visible    id=password

*** Test Cases ***
Bulk Data Processing Test
    [Documentation]    Procesar datasets grandes eficientemente
    \${large_data}=    Get File    \${DATASET_LARGE}
    \${lines}=         Split To Lines    \${large_data}
    \${total_lines}=   Get Length    \${lines}
    
    Should Be True    \${total_lines} > 100
    Log    Processing \${total_lines} records
    
    \${processed}=    Set Variable    0
    FOR    \${line}    IN    @{lines}[1:]  # Skip header
        \${data}=    Split String    \${line}    ,
        Continue For Loop If    len(\${data}) < 3
        
        \${username}=    Set Variable    \${data}[0]
        \${action}=      Set Variable    \${data}[1]
        \${expected}=    Set Variable    \${data}[2]
        
        Process User Action    \${username}    \${action}    \${expected}
        \${processed}=    Evaluate    \${processed} + 1
        
        # Optimización: Break si procesamos suficientes
        Exit For Loop If    \${processed} >= 50
    END
    
    Log    Successfully processed \${processed} records

Process User Action
    [Arguments]    \${username}    \${action}    \${expected}
    Open Browser    \${BASE_URL}    chrome    timeout=\${TIMEOUT}
    
    # Login rápido con usuario de prueba
    Input Text     id=username    testuser
    Input Text     id=password    testpass
    Click Button   Login
    
    # Ejecutar acción específica
    Run Keyword If    '\${action}' == 'create'    Test Create Action    \${username}    \${expected}
    Run Keyword If    '\${action}' == 'update'    Test Update Action    \${username}    \${expected}
    Run Keyword If    '\${action}' == 'delete'    Test Delete Action    \${username}    \${expected}
    
    Close Browser

Test Create Action
    [Arguments]    \${username}    \${expected}
    Click Link     Create User
    Input Text     id=new_username    \${username}
    Input Text     id=new_email       \${username}@test.com
    Click Button   Save
    
    Run Keyword If    '\${expected}' == 'success'    Page Should Contain    User created
    Run Keyword If    '\${expected}' == 'fail'       Page Should Contain    Error

Test Update Action
    [Arguments]    \${username}    \${expected}
    Input Text     id=search_user    \${username}
    Click Button   Search
    Click Link     Edit
    Input Text     id=email    updated_\${username}@test.com
    Click Button   Update
    
    Run Keyword If    '\${expected}' == 'success'    Page Should Contain    Updated successfully
    Run Keyword If    '\${expected}' == 'fail'       Page Should Contain    Update failed

Test Delete Action
    [Arguments]    \${username}    \${expected}
    Input Text     id=search_user    \${username}
    Click Button   Search
    Click Button   Delete
    Click Button   Confirm
    
    Run Keyword If    '\${expected}' == 'success'    Page Should Contain    Deleted successfully
    Run Keyword If    '\${expected}' == 'fail'       Page Should Contain    Delete failed

Data Validation Advanced
    [Documentation]    Validación avanzada de datasets
    @{test_emails}=    Create List    valid@test.com    invalid-email    user@domain.co    @missing.com    user@.com
    @{test_phones}=    Create List    123-456-7890    555.123.4567    +1-800-555-0199    invalid-phone    12345
    
    FOR    \${email}    \${phone}    IN ZIP    \${test_emails}    \${test_phones}
        \${email_valid}=    Run Keyword And Return Status    Should Match Regexp    \${email}    ^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$
        \${phone_valid}=    Run Keyword And Return Status    Should Match Regexp    \${phone}    ^[\\+]?[1-9]?[0-9]{7,15}$
        
        Log    Email: \${email} (Valid: \${email_valid}), Phone: \${phone} (Valid: \${phone_valid})
        
        Open Browser    \${BASE_URL}/register    chrome
        Input Text     id=email    \${email}
        Input Text     id=phone    \${phone}
        Click Button   Register
        
        Run Keyword If    \${email_valid} and \${phone_valid}    Page Should Contain    Registration successful
        Run Keyword If    not \${email_valid} or not \${phone_valid}    Page Should Contain    Invalid
        Close Browser
    END</code></pre>
        
        <h3>🎯 Práctica Parametrización (5 min):</h3>
        <p>1. Crea Test Template con 4 argumentos: user, pass, expected, role</p>
        <p>2. Define 10 casos de test usando solo 1 línea cada uno</p>
        <p>3. Incluye casos edge: empty, SQL injection, XSS, long strings</p>
        <p>4. Implementa keyword que mide tiempo de ejecución</p>
        <p>5. Crea large_dataset.csv con 100+ registros</p>
        <p>6. Procesa dataset grande con FOR loop optimizado</p>
        <p>7. Agrega Break condition para limitar procesamiento</p>
        <p>8. Implementa Continue For Loop If para saltear inválidos</p>
        <p>9. Valida emails usando expresiones regulares</p>
        <p>10. Combina múltiples listas con ZIP para validación</p>
        <p>11. Mide performance y guarda resultados en archivo</p>
        <p>12. Implementa diferentes acciones: create, update, delete</p>
        <p>13. Usa Run Keyword And Return Status para validación</p>
        <p>14. Optimiza timeouts para tests rápidos</p>
        <p>15. Ejecuta suite completa y analiza performance log</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar Test Templates para parametrización masiva</li>
                <li>Optimizar performance en datasets grandes</li>
                <li>Implementar validación avanzada con regex</li>
                <li>Manejar casos edge y datos inválidos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Test Template para casos repetitivos y SIEMPRE optimiza loops grandes con Break/Continue conditions.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 150 - Data-Driven 150</h3>
        <p>Aprenderás integración con APIs para generar datos dinámicos y validación en tiempo real de datasets.</p>
    `,
    topics: ["data-driven", "excel", "csv"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-148"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_149 = LESSON_149;
}