/**
 * Robot Framework Academy - Lesson 103
 * Downloads y manejo de archivos
 */

const LESSON_103 = {
    id: 103,
    title: "Interacciones Avanzadas 103",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>⬇️ Downloads archivos</h2>
        <p>Automatizar downloads, validar archivos descargados y manejar diferentes tipos de descargas.</p>
        
        <h3>💻 Tests Download:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://ejemplo.com/downloads
\${BROWSER}            chrome
\${DOWNLOAD_DIR}       \${CURDIR}/downloads
\${PDF_FILE}           reporte.pdf
\${CSV_FILE}           datos.csv
\${ZIP_FILE}           archivo.zip
\${IMAGE_FILE}         imagen.png
\${TIMEOUT}            30s
\${FILE_SIZE_MIN}      1024

*** Test Cases ***
Test Download PDF
    Create Directory          \${DOWNLOAD_DIR}
    Open Browser              \${URL}        \${BROWSER}
    Click Link                Descargar PDF
    Sleep                     3s
    File Should Exist         \${DOWNLOAD_DIR}/\${PDF_FILE}
    \${size}=    Get File Size    \${DOWNLOAD_DIR}/\${PDF_FILE}
    Should Be True            \${size} > \${FILE_SIZE_MIN}
    Remove File               \${DOWNLOAD_DIR}/\${PDF_FILE}
    Close Browser

Test Download CSV Datos
    Create Directory          \${DOWNLOAD_DIR}
    Open Browser              \${URL}        \${BROWSER}
    Click Button              id=export-csv
    Wait Until Created        \${DOWNLOAD_DIR}/\${CSV_FILE}    \${TIMEOUT}
    File Should Exist         \${DOWNLOAD_DIR}/\${CSV_FILE}
    \${content}=    Get File    \${DOWNLOAD_DIR}/\${CSV_FILE}
    Should Contain            \${content}    nombre,email,fecha
    Should Contain            \${content}    usuario1@test.com
    Line Count Should Be      \${DOWNLOAD_DIR}/\${CSV_FILE}    10
    Remove File               \${DOWNLOAD_DIR}/\${CSV_FILE}
    Close Browser

Test Download ZIP
    Create Directory          \${DOWNLOAD_DIR}
    Open Browser              \${URL}        \${BROWSER}
    Right Click               xpath=//a[@href='archivo.zip']
    Click Element             xpath=//span[text()='Guardar enlace como...']
    Sleep                     5s
    File Should Exist         \${DOWNLOAD_DIR}/\${ZIP_FILE}
    \${size}=    Get File Size    \${DOWNLOAD_DIR}/\${ZIP_FILE}
    Should Be True            \${size} > 0
    File Should Not Be Empty  \${DOWNLOAD_DIR}/\${ZIP_FILE}
    Remove File               \${DOWNLOAD_DIR}/\${ZIP_FILE}
    Close Browser

Test Download JavaScript
    Create Directory          \${DOWNLOAD_DIR}
    Open Browser              \${URL}        \${BROWSER}
    Execute JavaScript        
    ...    var link = document.createElement('a');
    ...    link.href = 'data:text/plain;charset=utf-8,Test Content';
    ...    link.download = 'test.txt';
    ...    link.click();
    Sleep                     2s
    File Should Exist         \${DOWNLOAD_DIR}/test.txt
    \${content}=    Get File    \${DOWNLOAD_DIR}/test.txt
    Should Be Equal           \${content}    Test Content
    Remove File               \${DOWNLOAD_DIR}/test.txt
    Close Browser

Test Download Múltiples
    Create Directory          \${DOWNLOAD_DIR}
    Open Browser              \${URL}        \${BROWSER}
    Click Link                Descargar PDF
    Click Link                Descargar CSV
    Click Link                Descargar Imagen
    Sleep                     10s
    File Should Exist         \${DOWNLOAD_DIR}/\${PDF_FILE}
    File Should Exist         \${DOWNLOAD_DIR}/\${CSV_FILE}
    File Should Exist         \${DOWNLOAD_DIR}/\${IMAGE_FILE}
    \${files}=    List Files In Directory    \${DOWNLOAD_DIR}
    Length Should Be          \${files}    3
    Remove Files              \${DOWNLOAD_DIR}/*
    Close Browser

Test Download Progress
    Create Directory          \${DOWNLOAD_DIR}
    Open Browser              \${URL}        \${BROWSER}
    Click Button              id=download-large
    Wait Until Element Is Visible    id=download-progress
    \${progress}=    Get Text    id=download-percentage
    Should Match Regexp       \${progress}    \\d+%
    Wait Until Page Contains  Descarga completada    \${TIMEOUT}
    File Should Exist         \${DOWNLOAD_DIR}/archivo_grande.zip
    \${final_size}=    Get File Size    \${DOWNLOAD_DIR}/archivo_grande.zip
    Should Be True            \${final_size} > 1000000
    Remove File               \${DOWNLOAD_DIR}/archivo_grande.zip
    Close Browser</code></pre>
        
        <h3>🎯 Práctica Downloads (5 min):</h3>
        <p>1. Crea directorio downloads en tu proyecto</p>
        <p>2. Configura browser para download automático</p>
        <p>3. Usa Click Link para iniciar download</p>
        <p>4. Verifica que archivo se descargó con File Should Exist</p>
        <p>5. Valida tamaño de archivo con Get File Size</p>
        <p>6. Lee contenido de archivo con Get File</p>
        <p>7. Verifica que archivo no está vacío</p>
        <p>8. Usa Wait Until Created para downloads lentos</p>
        <p>9. Implementa download con Right Click</p>
        <p>10. Usa Execute JavaScript para download programático</p>
        <p>11. Valida múltiples archivos descargados</p>
        <p>12. Usa List Files In Directory para verificar</p>
        <p>13. Implementa limpieza con Remove File</p>
        <p>14. Verifica progress de downloads grandes</p>
        <p>15. Usa Get Text para leer porcentajes</p>
        <p>16. Valida tipos de archivo descargados</p>
        <p>17. Implementa timeout para downloads</p>
        <p>18. Combina download con validación de contenido</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar downloads de diferentes tipos de archivos</li>
                <li>Validar archivos descargados con Robot Framework</li>
                <li>Manejar downloads múltiples y progress tracking</li>
                <li>Implementar limpieza de archivos de test</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Configura el browser para downloads automáticos y usa Wait Until Created para downloads que tardan más de 3 segundos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 104 - Frames e iframes</h3>
        <p>Aprenderás a navegar entre frames, manejar iframes anidados y automatizar contenido dentro de frames.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-102"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_103 = LESSON_103;
}