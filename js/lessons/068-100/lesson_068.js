/**
 * Robot Framework Academy - Lesson 068
 * Localizadores web básicos
 */

const LESSON_068 = {
    id: 68,
    title: "Localizadores web básicos",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Localizadores</h2>
        <p>Los localizadores son formas de encontrar elementos específicos en páginas web. Es como dar direcciones exactas a Robot Framework.</p>
        
        <h3>💻 Localizadores esenciales:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}           https://ejemplo.com
\${BROWSER}       chrome
\${USERNAME}      testuser@email.com
\${PASSWORD}      securepass123
\${SEARCH_TERM}   Robot Framework
\${EXPECTED_TEXT} Resultados encontrados
\${LOGIN_BTN}     Iniciar Sesión

*** Test Cases ***
Test ID Locators
    Open Browser              \${URL}                \${BROWSER}
    Click Element            id=login-button
    Input Text               id=username            \${USERNAME}
    Input Password           id=password            \${PASSWORD}
    Click Button             id=submit-btn
    Element Should Be Visible id=dashboard
    Page Should Contain      Bienvenido
    Close Browser

Test Name Locators
    Open Browser              \${URL}                \${BROWSER}
    Input Text               name=email             \${USERNAME}
    Input Text               name=search            \${SEARCH_TERM}
    Click Button             name=search-btn
    Element Should Contain   name=results           \${EXPECTED_TEXT}
    Element Should Be Visible name=filter-options
    Close Browser

Test Class Locators
    Open Browser              \${URL}                \${BROWSER}
    Click Element            class=menu-toggle
    Element Should Be Visible class=navigation-menu
    Click Link               class=home-link
    Page Should Contain      Inicio
    Element Should Be Visible class=hero-section
    Click Element            class=contact-btn
    Close Browser

Test CSS Selector Basics
    Open Browser              \${URL}                \${BROWSER}
    Click Element            css=.login-form button
    Input Text               css=#email-field       \${USERNAME}
    Input Text               css=input[type="password"] \${PASSWORD}
    Click Button             css=.submit-button
    Element Should Be Visible css=.user-dashboard
    Page Should Contain      Dashboard
    Close Browser

Test XPath Simple
    Open Browser              \${URL}                \${BROWSER}
    Click Element            xpath=//button[@id='login']
    Input Text               xpath=//input[@name='user']    \${USERNAME}
    Input Text               xpath=//input[@type='password'] \${PASSWORD}
    Click Button             xpath=//button[text()='Login']
    Element Should Be Visible xpath=//div[@class='welcome']
    Page Should Contain      \${USERNAME}
    Close Browser

Test Link Text
    Open Browser              \${URL}                \${BROWSER}
    Click Link               \${LOGIN_BTN}
    Page Should Contain      Formulario de acceso
    Click Link               Registrarse
    Page Should Contain      Crear cuenta
    Click Link               Volver al inicio
    Page Should Contain      Página principal
    Close Browser

Test Partial Link Text
    Open Browser              \${URL}                \${BROWSER}
    Click Link               partial link=Iniciar
    Page Should Contain      Login
    Click Link               partial link=Registr
    Page Should Contain      Registro
    Click Link               partial link=Contac
    Page Should Contain      Contacto
    Close Browser</code></pre>
        
        <h3>🎯 Práctica localizadores (5 min):</h3>
        <p>1. Crea test con localizador id=search-box</p>
        <p>2. Usa name=username para campo de usuario</p>
        <p>3. Prueba class=main-button en botón principal</p>
        <p>4. Combina css=.form input[type="email"]</p>
        <p>5. Experimenta xpath=//div[@class='content']</p>
        <p>6. Usa link text="Inicio" para navegación</p>
        <p>7. Prueba partial link="Contac" para contacto</p>
        <p>8. Verifica elementos con Should Be Visible</p>
        <p>9. Combina Input Text + localizadores</p>
        <p>10. Practica Click Element con diferentes tipos</p>
        <p>11. Usa Page Should Contain Element</p>
        <p>12. Experimenta Element Should Contain</p>
        <p>13. Valida texto con Element Text Should Be</p>
        <p>14. Combina múltiples localizadores en un test</p>
        <p>15. Crea variables para localizadores reutilizables</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar los 7 tipos principales de localizadores web</li>
                <li>Saber cuándo usar ID, name, class vs CSS/XPath</li>
                <li>Crear localizadores robustos y mantenibles</li>
                <li>Combinar localizadores con keywords de verificación</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Prioriza ID > Name > Class > CSS > XPath. Los ID son únicos y más rápidos, XPath es el más potente pero más lento.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 069 - CSS Selectors avanzados</h3>
        <p>Ahora profundizarás en CSS Selectors complejos para localizar elementos específicos en páginas web dinámicas.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-067"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_068 = LESSON_068;
}