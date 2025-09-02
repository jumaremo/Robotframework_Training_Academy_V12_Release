/**
 * Robot Framework Academy - Lesson 109
 * Performance monitoring
 */

const LESSON_109 = {
    id: 109,
    title: "Interacciones Avanzadas 109",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>⚡ Performance monitoring</h2>
        <p>Medir tiempos de carga, detectar elementos lentos y implementar testing de performance básico.</p>
        
        <h3>💻 Tests Performance:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com
\${BROWSER}            chrome
\${MAX_LOAD_TIME}      5
\${MAX_ELEMENT_TIME}   2
\${SLOW_URL}           https://ejemplo.com/slow
\${HEAVY_IMAGE}        css=img.heavy-image
\${AJAX_ENDPOINT}      /api/data
\${PERFORMANCE_LIMIT}  3000

*** Test Cases ***
Test Page Load Time
    \${start_time}=    Get Time    epoch
    Open Browser              \${URL}        \${BROWSER}
    Wait Until Page Contains  página cargada
    \${end_time}=      Get Time    epoch
    \${load_time}=     Evaluate    \${end_time} - \${start_time}
    Should Be True            \${load_time} < \${MAX_LOAD_TIME}
    Log                       Tiempo de carga: \${load_time}s
    \${performance}=    Execute JavaScript    return performance.timing.loadEventEnd - performance.timing.navigationStart
    Should Be True            \${performance} < \${PERFORMANCE_LIMIT}
    Close Browser

Test Element Load Times
    Open Browser              \${URL}        \${BROWSER}
    \${start}=        Get Time    epoch
    Wait Until Element Is Visible    \${HEAVY_IMAGE}    timeout=10s
    \${end}=          Get Time    epoch
    \${element_time}= Evaluate    \${end} - \${start}
    Should Be True            \${element_time} < \${MAX_ELEMENT_TIME}
    Log                       Imagen cargó en: \${element_time}s
    \${img_complete}=    Execute JavaScript    return document.querySelector('\${HEAVY_IMAGE}').complete
    Should Be True            \${img_complete}
    Element Should Be Visible \${HEAVY_IMAGE}
    Close Browser

Test Network Performance
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        
    ...    performance.mark('ajax-start');
    ...    fetch('\${AJAX_ENDPOINT}').then(() => performance.mark('ajax-end'));
    Click Button              id=load-data
    Wait Until Page Contains  datos cargados
    \${network_time}=    Execute JavaScript    
    ...    var entries = performance.getEntriesByType('navigation');
    ...    return entries[0].responseEnd - entries[0].requestStart;
    Should Be True            \${network_time} < 2000
    Log                       Red: \${network_time}ms
    \${resources}=    Execute JavaScript    return performance.getEntriesByType('resource').length
    Should Be True            \${resources} > 0
    Close Browser

Test Memory Usage
    Open Browser              \${URL}        \${BROWSER}
    \${initial_memory}=    Execute JavaScript    
    ...    return performance.memory ? performance.memory.usedJSHeapSize : 0
    Click Button              id=heavy-operation
    Wait Until Page Contains  operación completada
    \${final_memory}=      Execute JavaScript    
    ...    return performance.memory ? performance.memory.usedJSHeapSize : 0
    \${memory_increase}=   Evaluate    \${final_memory} - \${initial_memory}
    Should Be True            \${memory_increase} < 10000000
    Log                       Memoria utilizada: \${memory_increase} bytes
    Page Should Contain       proceso eficiente
    Close Browser

Test Render Performance
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        performance.mark('render-start')
    Click Button              id=render-content
    Wait Until Element Is Visible    css=.dynamic-content
    Execute JavaScript        performance.mark('render-end')
    \${render_time}=    Execute JavaScript    
    ...    performance.measure('render-time', 'render-start', 'render-end');
    ...    return performance.getEntriesByName('render-time')[0].duration;
    Should Be True            \${render_time} < 1000
    Log                       Render: \${render_time}ms
    Element Should Be Visible css=.dynamic-content
    Page Should Contain       renderizado rápido
    Close Browser

Test Slow Page Detection
    \${start}=        Get Time    epoch
    Open Browser              \${SLOW_URL}    \${BROWSER}
    Wait Until Page Contains  página lenta    timeout=15s
    \${end}=          Get Time    epoch
    \${total_time}=   Evaluate    \${end} - \${start}
    Run Keyword If            \${total_time} > \${MAX_LOAD_TIME}    Log    ADVERTENCIA: Página lenta detectada
    Should Be True            \${total_time} < 15
    \${dom_ready}=    Execute JavaScript    return performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
    Log                       DOM Ready: \${dom_ready}ms
    Page Should Contain       contenido disponible
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Performance (5 min):</h3>
        <p>1. Usa Get Time epoch para medir tiempo de inicio</p>
        <p>2. Abre página y mide tiempo hasta elemento visible</p>
        <p>3. Calcula diferencia de tiempo con Evaluate</p>
        <p>4. Valida que tiempo está bajo límite con Should Be True</p>
        <p>5. Usa Execute JavaScript para acceder performance.timing</p>
        <p>6. Mide tiempo de carga de imágenes específicas</p>
        <p>7. Verifica que imágenes están completas con .complete</p>
        <p>8. Implementa medición de requests AJAX</p>
        <p>9. Usa performance.mark para marcar puntos específicos</p>
        <p>10. Mide performance.memory si está disponible</p>
        <p>11. Calcula incremento de memoria durante operaciones</p>
        <p>12. Usa performance.measure para medir intervalos</p>
        <p>13. Implementa detección de páginas lentas</p>
        <p>14. Log tiempos para debugging y reportes</p>
        <p>15. Mide tiempo de renderizado de contenido dinámico</p>
        <p>16. Verifica que recursos de red cargan eficientemente</p>
        <p>17. Usa timeout en Wait Until para operaciones lentas</p>
        <p>18. Combina mediciones con validación de funcionalidad</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Medir tiempos de carga de páginas y elementos</li>
                <li>Implementar monitoring de performance de red</li>
                <li>Detectar operaciones lentas y memory leaks</li>
                <li>Usar Performance API para métricas detalladas</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa performance.timing para métricas precisas del navegador. Combina Get Time con Execute JavaScript para mediciones completas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 110 - Testing cross-browser</h3>
        <p>Aprenderás a ejecutar tests en múltiples navegadores, manejar diferencias entre browsers y automatizar testing multi-browser.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-108"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_109 = LESSON_109;
}