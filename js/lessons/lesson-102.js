/**
 * Robot Framework Academy - Lesson 102
 * File uploads avanzados
 */

const LESSON_102 = {
    id: 102,
    title: "Interacciones Avanzadas 102",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>📁 File uploads avanzados</h2>
        <p>Manejar uploads de archivos complejos, múltiples archivos y validación de uploads.</p>
        
        <h3>💻 Tests Upload Archivos:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com/upload
\${BROWSER}            chrome
\${FILE_PATH}          \${CURDIR}/test_files/documento.pdf
\${IMAGE_PATH}         \${CURDIR}/test_files/imagen.jpg
\${CSV_PATH}           \${CURDIR}/test_files/datos.csv
\${LARGE_FILE}         \${CURDIR}/test_files/archivo_grande.zip
\${UPLOAD_SELECTOR}    input[type="file"]
\${SUBMIT_BTN}         id=upload-submit

*** Test Cases ***
Test Upload Archivo Simple
    Open Browser              \${URL}        \${BROWSER}
    Choose File               \${UPLOAD_SELECTOR}    \${FILE_PATH}
    Click Button              \${SUBMIT_BTN}
    Wait Until Page Contains  upload successful
    Page Should Contain       documento.pdf
    Element Should Be Visible xpath=//div[@class='file-list']
    Page Should Contain       100% completado
    Element Text Should Be    id=file-name    documento.pdf
    Close Browser

Test Upload Múltiples Archivos
    Open Browser              \${URL}        \${BROWSER}
    Choose File               id=file1       \${FILE_PATH}
    Choose File               id=file2       \${IMAGE_PATH}
    Choose File               id=file3       \${CSV_PATH}
    Click Button              \${SUBMIT_BTN}
    Wait Until Page Contains  3 archivos
    Page Should Contain       documento.pdf
    Page Should Contain       imagen.jpg
    Page Should Contain       datos.csv
    \${count}=    Get Element Count    xpath=//div[@class='uploaded-file']
    Should Be Equal As Numbers    \${count}    3
    Close Browser

Test Upload Con Validación
    Open Browser              \${URL}        \${BROWSER}
    Choose File               \${UPLOAD_SELECTOR}    \${IMAGE_PATH}
    \${file_name}=    Get Element Attribute    \${UPLOAD_SELECTOR}    value
    Should Contain            \${file_name}   imagen.jpg
    Click Button              \${SUBMIT_BTN}
    Wait Until Page Contains  validando archivo
    Wait Until Page Contains  archivo válido    timeout=10s
    Page Should Contain       imagen procesada
    Element Should Be Visible id=preview-image
    Page Should Not Contain   error
    Close Browser

Test Upload JavaScript
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        document.querySelector('\${UPLOAD_SELECTOR}').files = ''; 
    Choose File               \${UPLOAD_SELECTOR}    \${FILE_PATH}
    \${files}=    Execute JavaScript    return document.querySelector('\${UPLOAD_SELECTOR}').files.length
    Should Be Equal As Numbers    \${files}    1
    \${name}=     Execute JavaScript    return document.querySelector('\${UPLOAD_SELECTOR}').files[0].name
    Should Be Equal           \${name}     documento.pdf
    Click Button              \${SUBMIT_BTN}
    Wait Until Page Contains  procesando
    Close Browser

Test Upload Drag Drop
    Open Browser              \${URL}        \${BROWSER}
    \${script}=    Set Variable    
    ...    var input = document.querySelector('\${UPLOAD_SELECTOR}');
    ...    var file = new File(['test'], 'test.txt', {type: 'text/plain'});
    ...    var dt = new DataTransfer(); dt.items.add(file); input.files = dt.files;
    Execute JavaScript        \${script}
    \${uploaded}=    Execute JavaScript    return document.querySelector('\${UPLOAD_SELECTOR}').files[0].name
    Should Be Equal           \${uploaded}    test.txt
    Click Button              \${SUBMIT_BTN}
    Wait Until Page Contains  upload completado
    Page Should Contain       test.txt
    Close Browser

Test Upload Progress
    Open Browser              \${URL}        \${BROWSER}
    Choose File               \${UPLOAD_SELECTOR}    \${LARGE_FILE}
    Click Button              \${SUBMIT_BTN}
    Wait Until Element Is Visible    id=progress-bar
    \${progress}=    Get Element Attribute    id=progress-bar    value
    Should Be True            \${progress} >= 0
    Wait Until Page Contains  100%    timeout=30s
    Page Should Contain       upload finalizado
    Element Should Not Be Visible    id=progress-bar
    Page Should Contain       archivo_grande.zip
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Upload (5 min):</h3>
        <p>1. Crea archivo test.txt en carpeta test_files</p>
        <p>2. Usa Choose File para seleccionar test.txt</p>
        <p>3. Verifica que input file contiene el nombre correcto</p>
        <p>4. Ejecuta upload y valida mensaje de éxito</p>
        <p>5. Crea test con múltiples archivos diferentes</p>
        <p>6. Usa Get Element Attribute para validar archivos</p>
        <p>7. Implementa verificación de tipos de archivo</p>
        <p>8. Valida que aparece lista de archivos subidos</p>
        <p>9. Usa Execute JavaScript para manipular FileList</p>
        <p>10. Verifica progress bar durante upload</p>
        <p>11. Valida que archivos se procesan correctamente</p>
        <p>12. Implementa timeout para uploads largos</p>
        <p>13. Usa Wait Until para esperar confirmaciones</p>
        <p>14. Verifica que no hay mensajes de error</p>
        <p>15. Valida preview de imágenes subidas</p>
        <p>16. Usa Get Element Count para contar archivos</p>
        <p>17. Implementa validación de tamaño de archivo</p>
        <p>18. Combina upload con otros elementos del formulario</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Manejar uploads de archivos simples y múltiples</li>
                <li>Validar archivos subidos con JavaScript</li>
                <li>Implementar verificación de progress upload</li>
                <li>Usar drag & drop para upload de archivos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Para uploads complejos, combina Choose File con JavaScript para validar tipos, tamaños y manipular FileList antes del submit.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 103 - Downloads y manejo de archivos</h3>
        <p>Aprenderás a automatizar downloads de archivos, validar archivos descargados y manejar diferentes tipos de downloads.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-101"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_102 = LESSON_102;
}