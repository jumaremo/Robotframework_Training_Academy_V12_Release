/**
 * Robot Framework Academy - Lesson 018 (VERSIÓN OPTIMIZADA)
 * Keywords built-in más importantes
 */

const LESSON_018 = {
    id: 18,
    title: "Keywords built-in más importantes",
    duration: "5 min",
    level: "beginner",
    section: "section-02",
    searchTerms: "#018 robot framework keywords built-in library basic essential commands",
    content: `
        <h2>🧠 Keywords Built-in Esenciales</h2>
        <p>Keywords built-in = comandos básicos Robot Framework. Dominar estos 15 keywords = 80% del testing diario.</p>
        
        <h3>💻 Tests keywords esenciales:</h3>
        <pre><code class="robot">*** Test Cases ***
Test Log Keywords
    [Documentation]    Validar keywords de logging
    Log    🔍 Testing Log keywords
    Log    Mensaje básico de log
    Log    Mensaje con nivel INFO    INFO
    Log    Mensaje con nivel DEBUG    DEBUG
    \${mensaje}=    Set Variable    Test logging
    Log    \${mensaje}
    Should Contain    \${mensaje}    logging
    Should Be Equal    \${mensaje}    Test logging
    Log    ✅ Log keywords funcionando

Test Should Keywords
    [Documentation]    Validar keywords Should básicos
    Log    ✅ Testing Should keywords
    Should Be Equal    5    5
    Should Be Equal    test    test
    Should Not Be Equal    5    10
    Should Contain    testing    test
    Should Not Contain    robot    human
    Should Be True    True
    Should Not Be True    False
    \${valor}=    Set Variable    robot
    Should Be Equal    \${valor}    robot
    Should Contain    \${valor}    bot
    Log    ✅ Should keywords OK

Test Variable Keywords
    [Documentation]    Validar keywords de variables
    Log    🔧 Testing Variable keywords
    \${var1}=    Set Variable    test_value
    \${var2}=    Set Variable    123
    \${var3}=    Set Variable    True
    Should Be Equal    \${var1}    test_value
    Should Be Equal    \${var2}    123
    Should Be Equal    \${var3}    True
    Set Test Variable    \${TEST_VAR}    dynamic_value
    Should Be Equal    \${TEST_VAR}    dynamic_value
    Set Suite Variable    \${SUITE_VAR}    suite_value
    Should Be Equal    \${SUITE_VAR}    suite_value
    Log    Variables: \${var1}, \${var2}, \${var3}
    Log    ✅ Variable keywords OK

Test Collections Keywords
    [Documentation]    Validar keywords de colecciones
    Log    📋 Testing Collections keywords
    @{lista}=    Create List    item1    item2    item3
    \${length}=    Get Length    \${lista}
    Should Be Equal As Numbers    \${length}    3
    Should Contain    \${lista}    item1
    Should Contain    \${lista}    item2
    Append To List    \${lista}    item4
    \${new_length}=    Get Length    \${lista}
    Should Be Equal As Numbers    \${new_length}    4
    &{dict}=    Create Dictionary    key1=value1    key2=value2
    \${dict_size}=    Get Length    \${dict}
    Should Be Equal As Numbers    \${dict_size}    2
    Should Be Equal    \${dict}[key1]    value1
    Log    ✅ Collections keywords OK

Test String Keywords
    [Documentation]    Validar keywords de strings
    Log    📝 Testing String keywords
    \${texto}=    Set Variable    Robot Framework Testing
    \${upper}=    Convert To Upper Case    \${texto}
    \${lower}=    Convert To Lower Case    \${texto}
    Should Be Equal    \${upper}    ROBOT FRAMEWORK TESTING
    Should Be Equal    \${lower}    robot framework testing
    Should Contain    \${texto}    Robot
    Should Contain    \${texto}    Framework
    Should Start With    \${texto}    Robot
    Should End With    \${texto}    Testing
    \${length}=    Get Length    \${texto}
    Should Be True    \${length} > 10
    Log    String: \${texto}
    Log    Upper: \${upper}
    Log    Lower: \${lower}
    Log    ✅ String keywords OK

Test Numeric Keywords
    [Documentation]    Validar keywords numéricos
    Log    🔢 Testing Numeric keywords
    \${num1}=    Set Variable    10
    \${num2}=    Set Variable    5
    \${num3}=    Set Variable    15
    Should Be Equal As Numbers    \${num1}    10
    Should Be Equal As Numbers    \${num2}    5
    Should Be True    \${num1} > \${num2}
    Should Be True    \${num3} > \${num1}
    Should Be True    \${num1} >= 10
    Should Be True    \${num2} <= 5
    \${suma}=    Evaluate    \${num1} + \${num2}
    Should Be Equal As Numbers    \${suma}    15
    Should Be Equal As Numbers    \${suma}    \${num3}
    Log    Numbers: \${num1}, \${num2}, \${num3}
    Log    Suma: \${suma}
    Log    ✅ Numeric keywords OK

Test Boolean Keywords
    [Documentation]    Validar keywords booleanos
    Log    ✓ Testing Boolean keywords
    \${true_var}=    Set Variable    True
    \${false_var}=    Set Variable    False
    Should Be True    \${true_var}
    Should Not Be True    \${false_var}
    Should Be Equal    \${true_var}    True
    Should Be Equal    \${false_var}    False
    Should Not Be Equal    \${true_var}    \${false_var}
    \${condition}=    Evaluate    5 > 3
    Should Be True    \${condition}
    \${condition2}=    Evaluate    2 > 10
    Should Not Be True    \${condition2}
    Log    True var: \${true_var}
    Log    False var: \${false_var}
    Log    ✅ Boolean keywords OK

Test Time Keywords
    [Documentation]    Validar keywords de tiempo
    Log    ⏰ Testing Time keywords
    \${timestamp}=    Get Time
    \${epoch}=    Get Time    epoch
    \${formatted}=    Get Time    %Y-%m-%d %H:%M:%S
    Should Contain    \${timestamp}    202
    Should Be True    len('\${timestamp}') > 10
    Should Be True    \${epoch} > 1000000000
    Should Contain    \${formatted}    202
    Should Contain    \${formatted}    -
    Should Contain    \${formatted}    :
    Log    Timestamp: \${timestamp}
    Log    Epoch: \${epoch}
    Log    Formatted: \${formatted}
    Sleep    1s
    Log    ✅ Time keywords OK</code></pre>
        
        <h3>🎯 Práctica keywords (4 min):</h3>
        <p><strong>1. Crear keywords_test.robot:</strong> New File → Test keywords básicos</p>
        <p><strong>2. Log básico:</strong> Log "Mensaje test" → Ejecutar robot keywords_test.robot</p>
        <p><strong>3. Should Be Equal:</strong> Should Be Equal 5 5 → Validar igualdad</p>
        <p><strong>4. Should Contain:</strong> Should Contain "testing" "test" → Validar contenido</p>
        <p><strong>5. Set Variable:</strong> \${var}= Set Variable test → Crear variables</p>
        <p><strong>6. Create List:</strong> @{lista}= Create List item1 item2 → Listas</p>
        <p><strong>7. Get Length:</strong> \${len}= Get Length \${lista} → Tamaño colecciones</p>
        <p><strong>8. Convert To Upper:</strong> \${upper}= Convert To Upper Case texto</p>
        <p><strong>9. Should Be True:</strong> Should Be True True → Validar booleanos</p>
        <p><strong>10. Get Time:</strong> \${time}= Get Time → Timestamp actual</p>
        <p><strong>11. Evaluate:</strong> \${result}= Evaluate 5 + 3 → Operaciones</p>
        <p><strong>12. Sleep:</strong> Sleep 2s → Pausas en ejecución</p>
        <p><strong>13. Should Start With:</strong> Should Start With "robot" "rob"</p>
        <p><strong>14. Should End With:</strong> Should End With "test" "st"</p>
        <p><strong>15. Combinar keywords:</strong> Crear test con 5+ keywords diferentes</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar 15 keywords built-in esenciales</li>
                <li>Usar keywords Log, Should, Set Variable</li>
                <li>Manipular strings, números, colecciones</li>
                <li>Combinar keywords para tests completos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Log + Should Be Equal + Set Variable = 80% del testing diario. Domina estos 3 primero.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 019 - Documentación de tests</h3>
        <p>Con keywords dominados, aprenderás documentación profesional de tests.</p>
    `,
    topics: ["keywords", "built-in", "library"],
    hasCode: true,
    hasExercise: true,
    prerequisites: ["lesson-017"],
    estimatedTime: 5,
    difficulty: "easy",
    type: "standard"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_018 = LESSON_018;
}