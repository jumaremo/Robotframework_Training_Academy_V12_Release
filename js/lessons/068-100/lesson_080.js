/**
 * Robot Framework Academy - Lesson 080
 * Performance y optimización
 */

const LESSON_080 = {
    id: 80,
    title: "Performance y optimización",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Testing Optimizado</h2>
        <p>Optimiza tests para velocidad máxima, mide performance de aplicaciones y implementa técnicas de testing eficiente para suites escalables.</p>
        
        <h3>💻 Optimización avanzada:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://performance-app.com
\${BROWSER}             chrome
\${FAST_TIMEOUT}        2s
\${MEDIUM_TIMEOUT}      5s
\${SLOW_TIMEOUT}        10s
\${PERFORMANCE_THRESHOLD} 3000
\${LOAD_TIME_MAX}       2000
\${RESPONSE_TIME_MAX}   500
\${MEMORY_THRESHOLD}    100

*** Test Cases ***
Test Optimized Timeouts Strategy
    Open Browser                    \${URL}                              \${BROWSER}
    Set Selenium Timeout            \${FAST_TIMEOUT}
    Set Selenium Implicit Wait      \${FAST_TIMEOUT}
    Element Should Be Visible       css=.fast-loading-element
    Set Selenium Timeout            \${MEDIUM_TIMEOUT}
    Wait Until Element Is Visible   css=.medium-loading-element         \${MEDIUM_TIMEOUT}
    Element Should Be Visible       css=.medium-loading-element
    Set Selenium Timeout            \${SLOW_TIMEOUT}
    Wait Until Element Is Visible   css=.slow-loading-element           \${SLOW_TIMEOUT}
    Element Should Be Visible       css=.slow-loading-element
    Set Selenium Timeout            \${FAST_TIMEOUT}
    Element Should Be Visible       css=.always-visible
    Close Browser

Test Page Load Performance Measurement
    \${start_time}=  Get Current Date  epoch
    Open Browser                    \${URL}                              \${BROWSER}
    Wait Until Element Is Visible   css=.page-loaded-indicator          \${MEDIUM_TIMEOUT}
    \${end_time}=  Get Current Date    epoch
    \${load_time}=  Evaluate         \${end_time} - \${start_time}
    Should Be True                  \${load_time} < \${LOAD_TIME_MAX}
    Log                            Tiempo de carga: \${load_time}ms
    Execute JavaScript              console.time('page-interaction')
    Click Element                   css=.performance-test-btn
    Execute JavaScript              console.timeEnd('page-interaction')
    Element Should Be Visible       css=.interaction-complete
    Close Browser

Test Element Visibility Speed
    Open Browser                    \${URL}                              \${BROWSER}
    \${start}=  Get Current Date     epoch
    Element Should Be Visible       css=.instant-element
    \${instant_time}=  Evaluate     \${start} - \${start}
    \${start}=  Get Current Date     epoch
    Wait Until Element Is Visible   css=.delayed-element               \${FAST_TIMEOUT}
    \${end}=  Get Current Date       epoch
    \${delayed_time}=  Evaluate     \${end} - \${start}
    Should Be True                  \${delayed_time} > \${instant_time}
    Log                            Elemento instantáneo: \${instant_time}ms
    Log                            Elemento retrasado: \${delayed_time}ms
    Element Should Be Visible       css=.timing-results
    Close Browser

Test Efficient Element Location
    Open Browser                    \${URL}                              \${BROWSER}
    \${start}=  Get Current Date     epoch
    Element Should Be Visible       id=fast-id-selector
    \${id_time}=  Get Current Date   epoch
    \${start}=  Get Current Date     epoch
    Element Should Be Visible       css=.fast-class-selector
    \${class_time}=  Get Current Date epoch
    \${start}=  Get Current Date     epoch
    Element Should Be Visible       xpath=//div[@class='slow-xpath-selector']
    \${xpath_time}=  Get Current Date epoch
    Log                            ID selector speed: fastest
    Log                            Class selector speed: medium
    Log                            XPath selector speed: slowest
    Element Should Be Visible       css=.selector-comparison-results
    Close Browser

Test Resource Loading Optimization
    Open Browser                    \${URL}                              \${BROWSER}
    Execute JavaScript              performance.mark('resource-start')
    Wait Until Element Is Visible   css=.resource-heavy-section         \${SLOW_TIMEOUT}
    Execute JavaScript              performance.mark('resource-end')
    Execute JavaScript              performance.measure('resource-load', 'resource-start', 'resource-end')
    \${performance_data}=  Execute JavaScript  return JSON.stringify(performance.getEntriesByType('measure'))
    Log                            Performance data: \${performance_data}
    Element Should Be Visible       css=.resources-loaded
    \${image_count}=  Execute JavaScript  return document.images.length
    Should Be True                  \${image_count} > 0
    Log                            Imágenes cargadas: \${image_count}
    Close Browser

Test Memory Usage Monitoring
    Open Browser                    \${URL}                              \${BROWSER}
    \${initial_memory}=  Execute JavaScript  return window.performance.memory ? window.performance.memory.usedJSHeapSize : 0
    Click Element                   css=.memory-intensive-action
    Wait Until Element Is Visible   css=.memory-action-complete         \${MEDIUM_TIMEOUT}
    \${final_memory}=  Execute JavaScript  return window.performance.memory ? window.performance.memory.usedJSHeapSize : 0
    \${memory_diff}=  Evaluate      (\${final_memory} - \${initial_memory}) / 1024 / 1024
    Should Be True                  \${memory_diff} < \${MEMORY_THRESHOLD}
    Log                            Memoria inicial: \${initial_memory} bytes
    Log                            Memoria final: \${final_memory} bytes
    Log                            Diferencia: \${memory_diff} MB
    Element Should Be Visible       css=.memory-test-complete
    Close Browser

Test Batch Operations Speed
    Open Browser                    \${URL}                              \${BROWSER}
    \${start}=  Get Current Date     epoch
    \${elements}=  Get WebElements   css=.batch-element
    FOR  \${element}  IN  @{elements}
        \${text}=  Get Text          \${element}
        Should Not Be Empty          \${text}
    END
    \${individual_time}=  Get Current Date  epoch
    \${start}=  Get Current Date     epoch
    \${all_texts}=  Execute JavaScript  return Array.from(document.querySelectorAll('.batch-element')).map(el => el.textContent)
    \${batch_time}=  Get Current Date  epoch
    \${individual_duration}=  Evaluate  \${individual_time} - \${start}
    \${batch_duration}=  Evaluate      \${batch_time} - \${start}
    Should Be True                  \${batch_duration} < \${individual_duration}
    Log                            Operación individual: \${individual_duration}ms
    Log                            Operación batch: \${batch_duration}ms
    Close Browser

Test Smart Wait Strategies
    Open Browser                    \${URL}                              \${BROWSER}
    Element Should Be Visible       css=.smart-wait-container
    Run Keyword And Ignore Error    Wait Until Element Is Visible      css=.maybe-present    \${FAST_TIMEOUT}
    Element Should Be Visible       css=.definitely-present
    \${status}=  Run Keyword And Return Status  Element Should Be Visible  css=.conditional-element
    Run Keyword If  \${status}      Log  Elemento condicional encontrado
    Run Keyword If  not \${status}  Log  Elemento condicional no presente
    Wait Until Keyword Succeeds     \${MEDIUM_TIMEOUT}  1s  Element Should Be Visible  css=.retry-element
    Element Should Be Visible       css=.retry-element
    Element Should Be Visible       css=.smart-waits-complete
    Close Browser</code></pre>
        
        <h3>🎯 Práctica optimización (5 min):</h3>
        <p>1. Usa Set Selenium Timeout con valores variables según contexto</p>
        <p>2. Practica Get Current Date epoch para medir tiempos exactos</p>
        <p>3. Combina Evaluate para cálculos de performance matemáticos</p>
        <p>4. Experimenta performance.mark + performance.measure para timing</p>
        <p>5. Usa Should Be True con comparaciones de tiempo/memoria</p>
        <p>6. Practica Execute JavaScript para acceder performance API</p>
        <p>7. Combina Get WebElements vs JavaScript batch operations</p>
        <p>8. Usa Run Keyword And Return Status para decisiones rápidas</p>
        <p>9. Practica Wait Until Keyword Succeeds para reintentos</p>
        <p>10. Combina FOR loops con verificaciones de performance</p>
        <p>11. Usa Log para documentar métricas de performance</p>
        <p>12. Experimenta con diferentes selectores por velocidad</p>
        <p>13. Practica timeouts cortos para elementos rápidos</p>
        <p>14. Combina Run Keyword And Ignore Error para optimización</p>
        <p>15. Crea estrategias inteligentes de wait según comportamiento</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Optimizar timeouts y waits para máxima velocidad de ejecución</li>
                <li>Medir performance de aplicaciones con métricas precisas</li>
                <li>Implementar estrategias de testing eficiente y escalable</li>
                <li>Monitorear memoria y recursos durante la automatización</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>ID selectores son más rápidos que XPath. Usa timeouts cortos para elementos rápidos. Performance API da métricas precisas. Batch operations superan loops individuales.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 081 - Testing cross-browser</h3>
        <p>Ahora aprenderás a ejecutar tests en múltiples browsers, manejar diferencias entre navegadores y crear suites compatibles.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-079"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_080 = LESSON_080;
}