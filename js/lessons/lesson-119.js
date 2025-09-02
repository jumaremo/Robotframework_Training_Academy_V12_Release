/**
 * Robot Framework Academy - Lesson 119
 * Proyecto web automation completo
 */

const LESSON_119 = {
    id: 119,
    title: "Proyecto web automation completo",
    duration: "15 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>🎯 Proyecto Integrador</h2>
        <p>Proyecto completo que integra JavaScript execution, uploads, downloads y todas las interacciones web avanzadas.</p>
        
        <h3>💻 Suite Completa:</h3>
        <pre><code class="robot">*** Settings ***
Library    SeleniumLibrary
Library    OperatingSystem
Library    Collections
Library    String

*** Variables ***
\${UPLOAD_FILE}      \${CURDIR}/test_data/document.pdf
\${DOWNLOAD_DIR}     \${CURDIR}/downloads
\${BASE_URL}         https://testsite.com
\${FORM_URL}         \${BASE_URL}/upload-form
\${MODAL_SELECTOR}   css:.modal-dialog
\${SUBMIT_BTN}       id=submit-form
\${FILE_INPUT}       css:input[type="file"]
\${SUCCESS_MSG}      File uploaded successfully
\${ALERT_TEXT}       Processing complete
\${TABLE_ROW}        xpath://table//tr[1]

*** Test Cases ***
JavaScript Alert Handling
    Open Browser               \${BASE_URL}    chrome
    Click Button              id=trigger-alert
    Alert Should Be Present   \${ALERT_TEXT}
    Handle Alert              accept
    Page Should Contain       Alert accepted
    Execute JavaScript        window.scrollTo(0, 500)
    Element Should Be Visible id=scroll-target
    Close Browser

Modal Window Interaction
    Open Browser              \${FORM_URL}    chrome
    Click Element            id=open-modal
    Wait Until Element Is Visible    \${MODAL_SELECTOR}
    Input Text               css:#modal-email    test@example.com
    Select From List By Value    css:#modal-country    US
    Execute JavaScript       document.querySelector('.modal-save').click()
    Wait Until Element Is Not Visible    \${MODAL_SELECTOR}
    Page Should Contain      Modal data saved
    Close Browser

File Upload Integration
    Open Browser             \${FORM_URL}    chrome
    Choose File             \${FILE_INPUT}    \${UPLOAD_FILE}
    Input Text              id=file-description    Test document upload
    Select Checkbox         id=terms-agreement
    Click Button           \${SUBMIT_BTN}
    Wait Until Page Contains    \${SUCCESS_MSG}    timeout=30s
    Element Should Contain  css:.upload-status    Upload complete
    Close Browser

File Download Automation
    Create Directory        \${DOWNLOAD_DIR}
    Open Browser           \${BASE_URL}/downloads    chrome
    Click Link             Download Report
    Sleep                  3s
    File Should Exist      \${DOWNLOAD_DIR}/report.xlsx
    \${file_size}=         Get File Size    \${DOWNLOAD_DIR}/report.xlsx
    Should Be True         \${file_size} > 0
    Remove File           \${DOWNLOAD_DIR}/report.xlsx
    Close Browser

Dynamic Content Testing
    Open Browser          \${BASE_URL}/dynamic    chrome
    Click Button         id=load-content
    Wait Until Element Is Visible    css:.dynamic-content
    \${elements}=         Get WebElements    css:.content-item
    Length Should Be     \${elements}    5
    Execute JavaScript   window.loadMoreContent()
    Wait Until Element Contains    css:.content-count    10 items
    Scroll Element Into View    css:.load-more-btn
    Close Browser

Advanced Form Validation
    Open Browser         \${BASE_URL}/contact    chrome
    Input Text          id=name    Test User
    Input Text          id=email    invalid-email
    Click Button        \${SUBMIT_BTN}
    Element Should Contain    css:.email-error    Invalid email format
    Clear Element Text  id=email
    Input Text          id=email    valid@test.com
    Execute JavaScript  document.getElementById('phone').value = '+1234567890'
    Select From List    id=subject    Technical Support
    Input Text          css:textarea[name="message"]    Test message content
    Click Button        \${SUBMIT_BTN}
    Wait Until Page Contains    Thank you for your message
    Close Browser

Cross-Browser Compatibility Test
    FOR    \${browser}    IN    chrome    firefox
        Open Browser         \${BASE_URL}    \${browser}
        Title Should Be      Test Site Home
        Click Link          About
        Page Should Contain  About Us
        Execute JavaScript   window.history.back()
        Wait Until Page Contains    Welcome
        Close Browser
    END</code></pre>
        
        <h3>🎯 Proyecto Completo (12 min):</h3>
        <p>1. Crea directorio proyecto-automation-completo/</p>
        <p>2. Organiza archivos: tests/, resources/, data/, downloads/</p>
        <p>3. Implementa los 6 test cases del código anterior</p>
        <p>4. Crea archivo test_data/document.pdf para uploads</p>
        <p>5. Configura downloads/ directory para descargas</p>
        <p>6. Ejecuta suite completa: robot tests/</p>
        <p>7. Verifica que todos los tests pasan correctamente</p>
        <p>8. Agrega manejo de errores con TRY/EXCEPT</p>
        <p>9. Implementa screenshots automáticos en fallos</p>
        <p>10. Crea keywords reutilizables para operaciones comunes</p>
        <p>11. Documenta cada test case con [Documentation]</p>
        <p>12. Optimiza waits usando Wait Until keywords</p>
        <p>13. Valida que archivos se crean/eliminan correctamente</p>
        <p>14. Prueba cross-browser en Chrome y Firefox</p>
        <p>15. Genera reporte final con estadísticas</p>
        <p>16. Revisa que JavaScript execution funciona perfectamente</p>
        <p>17. Confirma que modals se manejan sin timeouts</p>
        <p>18. Valida que uploads/downloads son robustos</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Integrar JavaScript execution en tests complejos</li>
                <li>Automatizar uploads y downloads de archivos</li>
                <li>Manejar modals y alerts dinámicamente</li>
                <li>Crear suite de tests cross-browser robusta</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Execute JavaScript para casos complejos que SeleniumLibrary no puede manejar nativamente. Es tu herramienta más poderosa.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 120 - Introducción a API Testing</h3>
        <p>Con web automation dominada, aprenderás a automatizar APIs REST usando RequestsLibrary para testing backend completo.</p>
    `,
    topics: ["advanced", "project"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 15,
    difficulty: "intermediate",
    prerequisites: ["lesson-118"],
    type: "integration"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_119 = LESSON_119;
}