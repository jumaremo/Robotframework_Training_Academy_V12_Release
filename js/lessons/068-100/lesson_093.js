/**
 * Robot Framework Academy - Lesson 093
 * Localizadores Avanzados 093
 */

const LESSON_093 = {
    id: 93,
    title: "Localizadores Avanzados 093",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🎯 Performance Optimization</h2>
        <p>Optimiza localizadores para máxima velocidad, implementa técnicas de caching y desarrolla estrategias de performance para suites grandes.</p>
        
        <h3>💻 Localizadores optimizados:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://performance-locators.com
\${BROWSER}             chrome
\${FAST_TIMEOUT}        2s
\${MEDIUM_TIMEOUT}      5s
\${SLOW_TIMEOUT}        10s
\${BATCH_SIZE}          50
\${PERFORMANCE_THRESHOLD} 1000
\${CACHE_DURATION}      300

*** Test Cases ***
Test Fast Selector Strategies
    Open Browser                    \${URL}                              \${BROWSER}
    Set Selenium Timeout            \${FAST_TIMEOUT}
    Set Selenium Implicit Wait      1s
    \${start_time}=  Get Current Date  epoch
    Element Should Be Visible       id=fastest-selector
    \${id_time}=  Get Current Date   epoch
    \${start_time}=  Get Current Date  epoch
    Element Should Be Visible       css=.fast-class
    \${class_time}=  Get Current Date  epoch
    \${start_time}=  Get Current Date  epoch
    Element Should Be Visible       xpath=//div[@id='slow-xpath']
    \${xpath_time}=  Get Current Date  epoch
    \${id_duration}=  Evaluate      \${id_time} - \${start_time}
    \${class_duration}=  Evaluate   \${class_time} - \${start_time}
    \${xpath_duration}=  Evaluate   \${xpath_time} - \${start_time}
    Should Be True                  \${id_duration} < \${class_duration}
    Should Be True                  \${class_duration} < \${xpath_duration}
    Close Browser

Test Cached Element References
    Open Browser                    \${URL}                              \${BROWSER}
    \${cached_element}=  Get WebElement  css=.frequently-used-element
    \${start_time}=  Get Current Date  epoch
    FOR  \${i}  IN RANGE  10
        \${text}=  Get Text          \${cached_element}
        Should Not Be Empty          \${text}
    END
    \${cached_time}=  Get Current Date  epoch
    \${start_time}=  Get Current Date  epoch
    FOR  \${i}  IN RANGE  10
        \${text}=  Get Text          css=.frequently-used-element
        Should Not Be Empty          \${text}
    END
    \${direct_time}=  Get Current Date  epoch
    \${cached_duration}=  Evaluate   \${cached_time} - \${start_time}
    \${direct_duration}=  Evaluate   \${direct_time} - \${start_time}
    Should Be True                  \${cached_duration} < \${direct_duration}
    Close Browser

Test Batch Element Operations
    Open Browser                    \${URL}                              \${BROWSER}
    \${start_time}=  Get Current Date  epoch
    \${elements}=  Get WebElements   css=.batch-item
    FOR  \${element}  IN  @{elements}
        \${visible}=  Run Keyword And Return Status  Element Should Be Visible  \${element}
        Run Keyword If  \${visible}  Set Focus To Element  \${element}
    END
    \${batch_time}=  Get Current Date  epoch
    \${start_time}=  Get Current Date  epoch
    \${element_count}=  Get Element Count  css=.batch-item
    FOR  \${i}  IN RANGE  \${element_count}
        \${element}=  Get WebElement  css=.batch-item:nth-child(\${i + 1})
        \${visible}=  Run Keyword And Return Status  Element Should Be Visible  \${element}
        Run Keyword If  \${visible}  Set Focus To Element  \${element}
    END
    \${individual_time}=  Get Current Date  epoch
    \${batch_duration}=  Evaluate    \${batch_time} - \${start_time}
    \${individual_duration}=  Evaluate  \${individual_time} - \${start_time}
    Should Be True                  \${batch_duration} < \${individual_duration}
    Close Browser

Test Efficient Wait Strategies
    Open Browser                    \${URL}                              \${BROWSER}
    \${start_time}=  Get Current Date  epoch
    Wait Until Element Is Visible   css=.instant-element               \${FAST_TIMEOUT}
    Element Should Be Visible       css=.instant-element
    \${fast_wait_time}=  Get Current Date  epoch
    \${start_time}=  Get Current Date  epoch
    Wait Until Element Is Visible   css=.medium-load-element           \${MEDIUM_TIMEOUT}
    Element Should Be Visible       css=.medium-load-element
    \${medium_wait_time}=  Get Current Date  epoch
    \${start_time}=  Get Current Date  epoch
    Wait Until Element Is Visible   css=.slow-load-element             \${SLOW_TIMEOUT}
    Element Should Be Visible       css=.slow-load-element
    \${slow_wait_time}=  Get Current Date  epoch
    \${fast_duration}=  Evaluate    \${fast_wait_time} - \${start_time}
    \${medium_duration}=  Evaluate  \${medium_wait_time} - \${start_time}
    \${slow_duration}=  Evaluate    \${slow_wait_time} - \${start_time}
    Should Be True                  \${fast_duration} < \${PERFORMANCE_THRESHOLD}
    Close Browser

Test Selector Performance Comparison
    Open Browser                    \${URL}                              \${BROWSER}
    \${selectors}=  Create List     
    ...  id=performance-test
    ...  css=.performance-test
    ...  css=[data-testid='performance']
    ...  xpath=//div[@class='performance-test']
    ...  xpath=//div[contains(@class,'performance')]
    FOR  \${selector}  IN  @{selectors}
        \${start}=  Get Current Date  epoch
        \${found}=  Run Keyword And Return Status  Element Should Be Visible  \${selector}  \${FAST_TIMEOUT}
        \${end}=  Get Current Date    epoch
        \${duration}=  Evaluate      \${end} - \${start}
        Log  Selector \${selector} took \${duration}ms
        Run Keyword If  \${found}    Should Be True  \${duration} < \${PERFORMANCE_THRESHOLD}
    END
    \${fastest_selector}=  Set Variable  id=performance-test
    Element Should Be Visible       \${fastest_selector}
    Close Browser

Test JavaScript Locator Performance
    Open Browser                    \${URL}                              \${BROWSER}
    \${start_time}=  Get Current Date  epoch
    \${js_elements}=  Execute JavaScript  return document.querySelectorAll('.js-target')
    \${js_count}=  Get Length        \${js_elements}
    \${js_time}=  Get Current Date   epoch
    \${start_time}=  Get Current Date  epoch
    \${rf_elements}=  Get WebElements  css=.js-target
    \${rf_count}=  Get Length        \${rf_elements}
    \${rf_time}=  Get Current Date   epoch
    \${js_duration}=  Evaluate      \${js_time} - \${start_time}
    \${rf_duration}=  Evaluate      \${rf_time} - \${start_time}
    Should Be Equal As Numbers      \${js_count}                        \${rf_count}
    Log  JavaScript took \${js_duration}ms, Robot Framework took \${rf_duration}ms
    Execute JavaScript              
    ...  var elements = document.querySelectorAll('.batch-js-target');
    ...  elements.forEach(el => el.style.backgroundColor = 'yellow')
    \${js_batch_styled}=  Get Element Count  css=.batch-js-target[style*='yellow']
    Should Be Greater Than          \${js_batch_styled}                 0
    Close Browser

Test Memory Efficient Locators
    Open Browser                    \${URL}                              \${BROWSER}
    \${initial_memory}=  Execute JavaScript  return window.performance.memory ? window.performance.memory.usedJSHeapSize : 0
    \${large_elements}=  Get WebElements  css=.memory-test-item
    \${after_collection}=  Execute JavaScript  return window.performance.memory ? window.performance.memory.usedJSHeapSize : 0
    Release WebElements             \${large_elements}
    \${after_release}=  Execute JavaScript  return window.performance.memory ? window.performance.memory.usedJSHeapSize : 0
    \${memory_used}=  Evaluate      \${after_collection} - \${initial_memory}
    \${memory_freed}=  Evaluate     \${after_collection} - \${after_release}
    Log  Memory used: \${memory_used} bytes, freed: \${memory_freed} bytes
    Should Be True                  \${memory_freed} > 0
    \${efficient_count}=  Get Element Count  css=.memory-test-item
    Should Be Greater Than          \${efficient_count}                 0
    Close Browser

Test Parallel Locator Execution
    Open Browser                    \${URL}                              \${BROWSER}
    \${start_time}=  Get Current Date  epoch
    \${status_1}=  Run Keyword And Return Status  Element Should Be Visible  css=.parallel-1  \${FAST_TIMEOUT}
    \${status_2}=  Run Keyword And Return Status  Element Should Be Visible  css=.parallel-2  \${FAST_TIMEOUT}
    \${status_3}=  Run Keyword And Return Status  Element Should Be Visible  css=.parallel-3  \${FAST_TIMEOUT}
    \${status_4}=  Run Keyword And Return Status  Element Should Be Visible  css=.parallel-4  \${FAST_TIMEOUT}
    \${parallel_time}=  Get Current Date  epoch
    \${start_time}=  Get Current Date  epoch
    Element Should Be Visible       css=.parallel-1
    Element Should Be Visible       css=.parallel-2
    Element Should Be Visible       css=.parallel-3
    Element Should Be Visible       css=.parallel-4
    \${sequential_time}=  Get Current Date  epoch
    \${parallel_duration}=  Evaluate  \${parallel_time} - \${start_time}
    \${sequential_duration}=  Evaluate  \${sequential_time} - \${start_time}
    Log  Parallel: \${parallel_duration}ms, Sequential: \${sequential_duration}ms
    Should Be True                  \${status_1} or \${status_2} or \${status_3} or \${status_4}
    Close Browser</code></pre>
        
        <h3>🎯 Práctica performance (5 min):</h3>
        <p>1. Usa Get Current Date epoch para medir tiempos precisos</p>
        <p>2. Practica Set Selenium Timeout con valores optimizados</p>
        <p>3. Combina Get WebElement para caching de elementos frecuentes</p>
        <p>4. Experimenta Get WebElements vs múltiples Get WebElement</p>
        <p>5. Usa Should Be True para comparaciones de performance</p>
        <p>6. Practica Execute JavaScript para operaciones batch</p>
        <p>7. Combina Get Element Count vs Get WebElements según caso</p>
        <p>8. Usa Create List para comparar múltiples selectores</p>
        <p>9. Practica Run Keyword And Return Status para verificaciones rápidas</p>
        <p>10. Combina FOR loops con logging de performance</p>
        <p>11. Usa Evaluate para cálculos de timing matemáticos</p>
        <p>12. Practica Release WebElements para gestión memoria</p>
        <p>13. Combina window.performance.memory para monitoring</p>
        <p>14. Usa Log para documentar métricas de performance</p>
        <p>15. Crea strategies optimizadas para suites grandes</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Optimizar velocidad de localización con estrategias eficientes</li>
                <li>Implementar caching de elementos para operaciones repetitivas</li>
                <li>Comparar performance entre diferentes tipos de selectores</li>
                <li>Gestionar memoria y resources en suites de automation grandes</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>ID > CSS > XPath en velocidad. Get WebElement para caching. Execute JavaScript para batch operations. Set Selenium Timeout según velocidad esperada. Memory management es crítico en suites grandes.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 094 - Debugging de localizadores</h3>
        <p>Ahora aprenderás técnicas de debugging cuando localizadores fallan: inspección de DOM, análisis de cambios y troubleshooting sistemático.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-092"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_093 = LESSON_093;
}