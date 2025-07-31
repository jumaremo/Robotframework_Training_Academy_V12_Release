const LESSON_051 = {
    id: 51,
    title: "Importación y namespace",
    duration: "5 min",
    level: "beginner",
    section: "section-04",
    content: `
        <h2>🏷️ Import Namespace</h2>
        <p>Maneja namespaces y resuelve conflictos entre keywords de diferentes fuentes.</p>
        
        <h3>💻 Namespaces Importación:</h3>
        <pre><code class="robot">
*** Settings ***
Resource    common_keywords.resource
Resource    login_keywords.resource    WITH NAME    Login
Library     SeleniumLibrary    WITH NAME    Web
Library     Collections    WITH NAME    Col

*** Keywords ***
Keyword Con Namespace
    # Usando namespace para evitar conflictos
    Web.Open Browser    https://example.com    chrome
    Login.Realizar Login Completo    usuario    password
    \${lista}=    Col.Create List    item1    item2    item3
    Should Not Be Empty    \${lista}
    Log    Usando keywords con namespace
    
Keyword Sin Conflicto
    # Keywords sin conflicto no necesitan namespace
    Inicializar Navegador
    \${texto}=    Set Variable    Sin conflicto
    Should Contain    \${texto}    conflicto
    Log    Keyword ejecutado sin namespace
    
Resolver Conflictos Nombres
    # Cuando hay keywords con mismo nombre
    common_keywords.Inicializar Navegador
    login_keywords.Verificar Login Exitoso
    Log    Conflictos resueltos usando nombres archivo
    Should Be True    \${True}
    
Ejemplo Namespace Completo
    [Arguments]    \${datos}
    \${longitud}=    Col.Get Length    \${datos}
    Should Be True    \${longitud} >= 0
    Web.Input Text    id=campo    valor_test
    \${elemento_visible}=    Web.Get WebElement    id=campo
    Should Not Be Empty    \${elemento_visible}
    Log    Namespace usado correctamente en \${longitud} elementos
    
Combinar Multiples Sources
    Web.Maximize Browser Window
    \${diccionario}=    Col.Create Dictionary    key1=value1    key2=value2
    Should Not Be Empty    \${diccionario}
    Login.Verificar Login Exitoso
    Col.Should Contain    \${diccionario}    key1
    Log    Múltiples sources combinados exitosamente

*** Test Cases ***
Test Namespaces Importacion
    Keyword Con Namespace
    Keyword Sin Conflicto
    Resolver Conflictos Nombres
    \${lista_test}=    Col.Create List    a    b    c
    Ejemplo Namespace Completo    \${lista_test}
    Combinar Multiples Sources
    Web.Close Browser
    Log    Test namespaces completado correctamente
        </code></pre>
        
        <h3>🎯 Práctica Namespaces (4 min):</h3>
        <ol>
            <li>Importa SeleniumLibrary con namespace "Web"</li>
            <li>Importa Collections con namespace "Col"</li>
            <li>Importa resource con "WITH NAME Login"</li>
            <li>Crea keyword usando "Web.Open Browser"</li>
            <li>Usa "Login.Realizar Login Completo" con namespace</li>
            <li>Define keyword "Col.Create List" para listas</li>
            <li>Implementa resolución conflictos con nombres archivo</li>
            <li>Usa "archivo.keyword" para keywords específicos</li>
            <li>Crea keyword combinando múltiples namespaces</li>
            <li>Ejecuta test verificando que namespaces funcionen</li>
            <li>Prueba keywords con y sin namespace</li>
            <li>Verifica que no hay conflictos de nombres</li>
            <li>Confirma que importaciones estén correctas</li>
            <li>Observa claridad mejorada en origen keywords</li>
            <li>Analiza cuándo usar namespaces vs nombres directos</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Usar namespaces para organizar imports</li>
                <li>Resolver conflictos entre keywords</li>
                <li>Importar libraries y resources con nombres</li>
                <li>Combinar múltiples sources eficientemente</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los namespaces clarifican el origen de keywords y evitan conflictos - úsalos cuando tengas keywords similares de diferentes fuentes.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 052 - Keywords de alto nivel vs bajo nivel</h3>
        <p>Aprenderemos a diseñar arquitecturas de keywords con diferentes niveles de abstracción.</p>
    `,
    topics: ["import", "namespace", "modules"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-050"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_051 = LESSON_051;
}