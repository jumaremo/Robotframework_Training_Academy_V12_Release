/**
 * Robot Framework Academy - Lesson 101
 * JavaScript Execution
 */

const LESSON_101 = {
    id: 101,
    title: "Interacciones Avanzadas 101",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>⚡ JavaScript execution</h2>
        <p>Ejecutar código JavaScript directamente desde Robot Framework para interacciones complejas.</p>
        
        <h3>💻 Tests JavaScript:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}               https://ejemplo.com
\${BROWSER}           chrome
\${SCROLL_SCRIPT}     window.scrollTo(0, document.body.scrollHeight)
\${CLICK_SCRIPT}      document.querySelector('#button').click()
\${VALUE_SCRIPT}      return document.getElementById('total').textContent
\${ALERT_SCRIPT}      alert('Test completado')
\${STORAGE_KEY}       testData
\${STORAGE_VALUE}     usuario123

*** Test Cases ***
Test Execute JavaScript Simple
    Open Browser                 \${URL}        \${BROWSER}
    Execute JavaScript           \${SCROLL_SCRIPT}
    Execute JavaScript           \${CLICK_SCRIPT}
    Execute JavaScript           \${ALERT_SCRIPT}
    Handle Alert                 ACCEPT
    Location Should Contain      ejemplo
    Page Should Contain Element  body
    Close Browser

Test JavaScript Con Retorno
    Open Browser                     \${URL}        \${BROWSER}
    \${result}=    Execute JavaScript    \${VALUE_SCRIPT}
    Should Not Be Empty              \${result}
    Log                              Valor obtenido: \${result}
    \${precio}=    Execute JavaScript    return document.querySelector('.precio').textContent
    Should Contain                   \${precio}    $
    \${items}=     Execute JavaScript    return document.querySelectorAll('.item').length
    Should Be True                   \${items} > 0
    Close Browser

Test JavaScript Storage
    Open Browser                 \${URL}        \${BROWSER}
    Execute JavaScript           localStorage.setItem('\${STORAGE_KEY}', '\${STORAGE_VALUE}')
    \${stored}=    Execute JavaScript    return localStorage.getItem('\${STORAGE_KEY}')
    Should Be Equal              \${stored}    \${STORAGE_VALUE}
    Execute JavaScript           sessionStorage.setItem('session', 'activa')
    \${session}=   Execute JavaScript    return sessionStorage.getItem('session')
    Should Be Equal              \${session}   activa
    Execute JavaScript           localStorage.clear()
    Close Browser

Test JavaScript Formularios
    Open Browser                 \${URL}        \${BROWSER}
    Execute JavaScript           document.getElementById('nombre').value = 'TestUser'
    Execute JavaScript           document.getElementById('email').value = 'test@test.com'
    Execute JavaScript           document.querySelector('form').submit()
    Wait Until Page Contains     enviado
    \${form_data}=   Execute JavaScript    return new FormData(document.querySelector('form'))
    Should Not Be Empty          \${form_data}
    Page Should Contain          confirmación
    Close Browser

Test JavaScript Eventos
    Open Browser                 \${URL}        \${BROWSER}
    Execute JavaScript           document.querySelector('#btn').dispatchEvent(new Event('click'))
    Execute JavaScript           document.querySelector('#input').dispatchEvent(new Event('focus'))
    Execute JavaScript           document.querySelector('#select').dispatchEvent(new Event('change'))
    \${event_result}=    Execute JavaScript    return document.querySelector('#result').textContent
    Should Not Be Empty          \${event_result}
    Execute JavaScript           window.dispatchEvent(new Event('resize'))
    Page Should Be Open
    Close Browser</code></pre>
        
        <h3>🎯 Práctica JavaScript (5 min):</h3>
        <p>1. Crea variable \${HIDE_SCRIPT} que oculte un elemento</p>
        <p>2. Ejecuta JavaScript para cambiar color de fondo</p>
        <p>3. Usa Execute JavaScript para obtener título de página</p>
        <p>4. Agrega texto a un div usando JavaScript</p>
        <p>5. Simula click en botón invisible con JavaScript</p>
        <p>6. Obtén valor de input con Execute JavaScript</p>
        <p>7. Cambia src de imagen usando JavaScript</p>
        <p>8. Ejecuta scroll horizontal con JavaScript</p>
        <p>9. Verifica que JavaScript retornó valor esperado</p>
        <p>10. Usa JavaScript para abrir nueva ventana</p>
        <p>11. Ejecuta JavaScript para cerrar modal</p>
        <p>12. Obtén lista de elementos con querySelectorAll</p>
        <p>13. Modifica CSS de elemento usando JavaScript</p>
        <p>14. Ejecuta función JavaScript personalizada</p>
        <p>15. Valida que localStorage funciona correctamente</p>
        <p>16. Usa JavaScript para disparar evento custom</p>
        <p>17. Ejecuta código asíncrono con JavaScript</p>
        <p>18. Combina Execute JavaScript con Wait Until</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Ejecutar código JavaScript desde Robot Framework</li>
                <li>Obtener valores de retorno de JavaScript</li>
                <li>Manipular DOM con JavaScript execution</li>
                <li>Manejar storage y eventos con JavaScript</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Execute JavaScript es poderoso para elementos difíciles de localizar o interacciones complejas que SeleniumLibrary no maneja nativamente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 102 - File uploads avanzados</h3>
        <p>Aprenderás a manejar uploads de archivos complejos, múltiples archivos y validación de uploads con JavaScript.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-100"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_101 = LESSON_101;
}