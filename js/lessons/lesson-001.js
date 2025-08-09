/**
 * Robot Framework Academy - Lesson 001 OPTIMIZED
 * Introducción a Robot Framework
 */

const LESSON_001 = {
    id: 1,
    title: "Introducción a Robot Framework",
    duration: "8 min",
    level: "beginner",
    section: "section-01",
    content: `
        <h2>🤖 Robot Framework</h2>
        <p>Herramienta para automatizar pruebas usando palabras simples.</p>
        
        <h3>💻 Tests básicos:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}          http://ejemplo.com
\${BROWSER}      chrome
\${TITULO}       Mi App Web
\${USUARIO}      testuser
\${PASSWORD}     test123
\${MENSAJE}      Bienvenido
\${BOTON}        Iniciar Sesión
\${CAMPO_USER}   id=username

*** Test Cases ***
Test Login Básico
    Open Browser         \${URL}    \${BROWSER}
    Title Should Be      \${TITULO}
    Page Should Contain  \${MENSAJE}
    Input Text          \${CAMPO_USER}    \${USUARIO}
    Input Password      id=password       \${PASSWORD}
    Click Button        \${BOTON}
    Page Should Contain  Dashboard
    Location Should Be   \${URL}/dashboard
    Close Browser

Test Validación Página
    Open Browser             \${URL}    \${BROWSER}
    Title Should Be          \${TITULO}
    Page Should Contain      \${MENSAJE}
    Element Should Be Visible    \${CAMPO_USER}
    Element Should Be Enabled    \${CAMPO_USER}
    Page Should Contain Element  id=password
    Page Should Contain Button   \${BOTON}
    Close Browser

Test Navegación Links
    Open Browser         \${URL}    \${BROWSER}
    Click Link          Contacto
    Title Should Be     Contacto - \${TITULO}
    Page Should Contain  Email
    Go Back
    Page Should Contain  \${MENSAJE}
    Click Link          Servicios
    Title Should Be     Servicios - \${TITULO}
    Close Browser</code></pre>
        
        <h3>🎯 Práctica RF (6 min):</h3>
        <p>1. Crea variable \${MI_URL} con tu sitio web favorito</p>
        <p>2. Escribe test que abra \${MI_URL} y verifique el título</p>
        <p>3. Agrega verificación de que la página contiene "inicio"</p>
        <p>4. Añade Click Link a "contacto" o "about"</p>
        <p>5. Verifica que cambió de página con Title Should Be</p>
        <p>6. Agrega Go Back y verifica que regresó</p>
        <p>7. Crea variable \${TEXTO} y úsala en Page Should Contain</p>
        <p>8. Ejecuta mentalmente cada línea paso por paso</p>
        <p>9. Identifica qué comandos verifican vs qué comandos actúan</p>
        <p>10. Crea segundo test con diferentes verificaciones</p>
        <p>11. Experimenta cambiando valores de variables</p>
        <p>12. Practica sintaxis *** Variables *** y *** Test Cases ***</p>
        <p>13. Cuenta cuántos comandos verificables usaste</p>
        <p>14. Agrega Element Should Be Visible a un elemento</p>
        <p>15. Termina todos los tests con Close Browser</p>
        <p>16. Revisa que cada test sea independiente</p>
        <p>17. Verifica formato correcto de variables \${VAR}</p>
        <p>18. Practica nombres descriptivos para tests</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Entender qué es Robot Framework</li>
                <li>Aprender sintaxis básica de variables y tests</li>
                <li>Practicar comandos esenciales de web testing</li>
                <li>Crear tests independientes y descriptivos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Robot Framework lee como español: "Open Browser" = "Abrir navegador". Empieza con estos 3 comandos básicos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 002 - Instalación Python y Robot Framework</h3>
        <p>Con conceptos básicos claros, aprenderás a instalar y configurar el entorno Robot Framework.</p>
    `,
    topics: ["introducción", "fundamentos"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 8,
    difficulty: "easy",
    type: "foundation"  // ✅ AGREGADO - 100% compliance v13.1
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_001 = LESSON_001;
}