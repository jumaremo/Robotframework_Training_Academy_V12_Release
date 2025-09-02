/**
 * Robot Framework Academy - Lesson 076
 * Formularios complejos
 */

const LESSON_076 = {
    id: 76,
    title: "Formularios complejos",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Formularios Avanzados</h2>
        <p>Automatiza formularios multi-step, validaciones dinámicas, uploads múltiples y workflows complejos de datos empresariales.</p>
        
        <h3>💻 Formularios enterprise:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://forms-complex.com
\${BROWSER}             chrome
\${NOMBRE_COMPLETO}     Ana García López
\${EMAIL_CORPORATIVO}   ana.garcia@empresa.com
\${TELEFONO_MOVIL}      +34-600-123-456
\${FECHA_NACIMIENTO}    15/03/1990
\${DOCUMENTO_CV}        C:/uploads/cv_ana_garcia.pdf
\${DOCUMENTO_DIPLOMA}   C:/uploads/diploma_universitario.pdf
\${SALARIO_ESPERADO}    45000
\${EXPERIENCIA_ANOS}    5

*** Test Cases ***
Test Multi Step Form Navigation
    Open Browser                        \${URL}                              \${BROWSER}
    Element Should Be Visible           css=.form-step-1
    Input Text                          id=nombre-completo                  \${NOMBRE_COMPLETO}
    Element Should Contain              css=.step-indicator                 Paso 1 de 4
    Select From List By Value           id=pais-residencia                  ES
    Element Should Be Visible           css=.country-selected-indicator
    Click Button                        css=.btn-siguiente-paso
    Wait Until Element Is Visible       css=.form-step-2                    10s
    Element Should Contain              css=.step-indicator                 Paso 2 de 4
    Input Text                          id=email-corporativo                \${EMAIL_CORPORATIVO}
    Element Should Be Visible           css=.email-validation-success
    Input Text                          id=telefono-movil                   \${TELEFONO_MOVIL}
    Element Should Be Visible           css=.phone-format-correct
    Close Browser

Test Dynamic Field Validation
    Open Browser                        \${URL}                              \${BROWSER}
    Input Text                          id=email-campo                      email-invalido
    Element Should Be Visible           css=.validation-error
    Element Should Contain              css=.error-message                  formato inválido
    Clear Element Text                  id=email-campo
    Input Text                          id=email-campo                      \${EMAIL_CORPORATIVO}
    Element Should Be Visible           css=.validation-success
    Element Should Contain              css=.success-message                email válido
    Input Text                          id=fecha-nacimiento                 fecha-invalida
    Element Should Be Visible           css=.date-error
    Clear Element Text                  id=fecha-nacimiento
    Input Text                          id=fecha-nacimiento                 \${FECHA_NACIMIENTO}
    Element Should Be Visible           css=.date-success
    Close Browser

Test File Upload Multiple
    Open Browser                        \${URL}                              \${BROWSER}
    Element Should Be Visible           css=.upload-section
    Choose File                         id=upload-cv                        \${DOCUMENTO_CV}
    Element Should Contain              css=.file-cv-name                   cv_ana_garcia.pdf
    Element Should Be Visible           css=.cv-upload-success
    Choose File                         id=upload-diploma                   \${DOCUMENTO_DIPLOMA}
    Element Should Contain              css=.file-diploma-name              diploma_universitario.pdf
    Element Should Be Visible           css=.diploma-upload-success
    Element Should Contain              css=.upload-counter                 2 archivos subidos
    Click Button                        css=.validate-uploads
    Element Should Be Visible           css=.uploads-validated
    Element Should Contain              css=.validation-status              documentos verificados
    Close Browser

Test Conditional Field Display
    Open Browser                        \${URL}                              \${BROWSER}
    Select Radio Button                 tipo-empleado                       empleado-actual
    Element Should Be Visible           css=.seccion-empleado-actual
    Element Should Not Be Visible       css=.seccion-nuevo-empleado
    Input Text                          id=empresa-actual                   Tech Solutions Corp
    Element Should Be Visible           css=.empresa-info-cargada
    Select Radio Button                 tipo-empleado                       nuevo-empleado
    Element Should Be Visible           css=.seccion-nuevo-empleado
    Element Should Not Be Visible       css=.seccion-empleado-actual
    Input Text                          id=experiencia-previa               \${EXPERIENCIA_ANOS} años
    Element Should Contain              css=.experiencia-display            \${EXPERIENCIA_ANOS}
    Close Browser

Test Form Data Persistence
    Open Browser                        \${URL}                              \${BROWSER}
    Input Text                          id=nombre-temporal                  \${NOMBRE_COMPLETO}
    Input Text                          id=email-temporal                   \${EMAIL_CORPORATIVO}
    Select From List By Label           id=departamento                     Tecnología
    Element Should Contain              css=.auto-save-status               guardado automáticamente
    Reload Page
    Element Should Contain              id=nombre-temporal                  \${NOMBRE_COMPLETO}
    Element Should Contain              id=email-temporal                   \${EMAIL_CORPORATIVO}
    Element Should Contain              css=.departamento-selected          Tecnología
    Element Should Be Visible           css=.data-restored-indicator
    Close Browser

Test Form Submission Complete
    Open Browser                        \${URL}                              \${BROWSER}
    Input Text                          id=nombre-completo-final            \${NOMBRE_COMPLETO}
    Input Text                          id=email-final                      \${EMAIL_CORPORATIVO}
    Input Text                          id=telefono-final                   \${TELEFONO_MOVIL}
    Select From List By Value           id=salario-esperado                 \${SALARIO_ESPERADO}
    Element Should Contain              css=.salary-display                 €\${SALARIO_ESPERADO}
    Select Checkbox                     id=acepta-terminos
    Checkbox Should Be Selected         id=acepta-terminos
    Select Checkbox                     id=acepta-politica-privacidad
    Checkbox Should Be Selected         id=acepta-politica-privacidad
    Element Should Be Enabled           css=.btn-enviar-solicitud
    Click Button                        css=.btn-enviar-solicitud
    Element Should Be Visible           css=.submission-success
    Element Should Contain              css=.confirmation-message           solicitud enviada exitosamente
    Close Browser

Test Form Error Recovery
    Open Browser                        \${URL}                              \${BROWSER}
    Click Button                        css=.submit-empty-form
    Element Should Be Visible           css=.form-errors-summary
    Element Should Contain              css=.error-count                    5 errores encontrados
    \${errors}=  Get WebElements        css=.field-error
    Length Should Be                    \${errors}                          5
    Input Text                          id=campo-requerido-1                valor-requerido-1
    Element Should Not Be Visible       css=.error-campo-1
    Input Text                          id=campo-requerido-2                valor-requerido-2
    Element Should Not Be Visible       css=.error-campo-2
    \${remaining_errors}=  Get WebElements  css=.field-error
    Length Should Be                    \${remaining_errors}                3
    Element Should Contain              css=.error-count                    3 errores restantes
    Close Browser</code></pre>
        
        <h3>🎯 Práctica formularios (5 min):</h3>
        <p>1. Practica formularios multi-step con navegación entre pasos</p>
        <p>2. Usa Element Should Contain para verificar validaciones dinámicas</p>
        <p>3. Combina Choose File con verificación de nombres de archivo</p>
        <p>4. Experimenta Select Radio Button con campos condicionales</p>
        <p>5. Practica Element Should Be Visible/Not Visible para secciones</p>
        <p>6. Usa Clear Element Text + Input Text para campos con validación</p>
        <p>7. Combina Select Checkbox + Checkbox Should Be Selected</p>
        <p>8. Practica Reload Page para verificar persistencia de datos</p>
        <p>9. Usa Get WebElements + Length Should Be para contar errores</p>
        <p>10. Combina Element Should Be Enabled/Disabled según validación</p>
        <p>11. Practica Wait Until Element Is Visible para pasos dinámicos</p>
        <p>12. Usa Select From List By Value/Label según contexto</p>
        <p>13. Combina múltiples uploads con verificaciones individuales</p>
        <p>14. Practica manejo de errores y recovery automático</p>
        <p>15. Crea flujos completos desde inicio hasta confirmación</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar formularios multi-step con navegación compleja</li>
                <li>Manejar validaciones dinámicas y campos condicionales</li>
                <li>Implementar uploads múltiples con verificaciones robustas</li>
                <li>Crear workflows completos con error recovery automático</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Verifica validaciones inmediatamente después de cada input. Usa Wait Until para pasos dinámicos. Select Checkbox antes de verificar con Checkbox Should Be Selected.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 077 - Tablas y grids dinámicos</h3>
        <p>Ahora aprenderás a automatizar tablas complejas, grids con paginación, sorting, filtros y manipulación de datos tabulares.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-075"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_076 = LESSON_076;
}