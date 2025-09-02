/**
 * Robot Framework Academy - Lesson 077
 * Tablas y grids dinámicos
 */

const LESSON_077 = {
    id: 77,
    title: "Tablas y grids dinámicos",
    duration: "7 min",
    level: "intermediate",
    section: "section-06",
    content: `
        <h2>🎯 Tablas Dinámicas</h2>
        <p>Automatiza tablas complejas con paginación, sorting, filtros, edición inline y manipulación de datos tabulares empresariales.</p>
        
        <h3>💻 Grids enterprise:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://grids-demo.com
\${BROWSER}            chrome
\${SEARCH_PRODUCT}     Laptop Dell
\${FILTER_CATEGORY}    Electrónicos
\${SORT_COLUMN}        Precio
\${EDIT_PRICE}         1299.99
\${NEW_STOCK}          25
\${USER_NAME}          Ana García
\${ITEMS_PER_PAGE}     10

*** Test Cases ***
Test Table Row Navigation
    Open Browser                     \${URL}                              \${BROWSER}
    Element Should Be Visible        css=table.data-grid
    \${rows}=  Get WebElements       css=table.data-grid tbody tr
    Length Should Be Greater Than    \${rows}                             5
    Element Should Contain           xpath=//table//th[1]                 Producto
    Element Should Contain           xpath=//table//th[2]                 Categoría
    Click Element                    xpath=//table//tr[2]//td[1]
    Element Should Be Visible        css=.row-selected
    Element Should Contain           css=.selected-product-info           información
    \${product_name}=  Get Text      xpath=//table//tr[2]//td[1]
    Element Should Contain           css=.product-detail-name             \${product_name}
    Close Browser

Test Table Sorting Functionality
    Open Browser                     \${URL}                              \${BROWSER}
    Element Should Be Visible        css=.sortable-table
    Click Element                    xpath=//th[contains(text(),'\${SORT_COLUMN}')]
    Element Should Be Visible        css=.sort-ascending
    \${first_price}=  Get Text       xpath=//table//tr[2]//td[contains(@class,'price')]
    Click Element                    xpath=//th[contains(text(),'\${SORT_COLUMN}')]
    Element Should Be Visible        css=.sort-descending
    \${last_price}=  Get Text        xpath=//table//tr[2]//td[contains(@class,'price')]
    Should Not Be Equal              \${first_price}                      \${last_price}
    Element Should Contain           css=.sort-status                     ordenado por precio
    Close Browser

Test Table Filtering System
    Open Browser                     \${URL}                              \${BROWSER}
    Input Text                       id=search-products                   \${SEARCH_PRODUCT}
    Click Button                     css=.search-apply
    Element Should Be Visible        css=.filtered-results
    \${filtered_rows}=  Get WebElements  css=table tbody tr:not(.hidden)
    Length Should Be Greater Than    \${filtered_rows}                    0
    Element Should Contain           xpath=//table//tr[2]//td[1]          \${SEARCH_PRODUCT}
    Select From List By Label        id=category-filter                   \${FILTER_CATEGORY}
    Element Should Be Visible        css=.filter-applied
    \${category_rows}=  Get WebElements  css=table tbody tr.category-match
    Length Should Be Greater Than    \${category_rows}                    0
    Close Browser

Test Table Pagination Controls
    Open Browser                     \${URL}                              \${BROWSER}
    Element Should Be Visible        css=.pagination-container
    Element Should Contain           css=.page-info                       Página 1
    \${total_items}=  Get Text       css=.total-items-count
    Select From List By Value        id=items-per-page                    \${ITEMS_PER_PAGE}
    Element Should Be Visible        css=.page-size-updated
    Click Element                    css=.next-page-btn
    Element Should Be Visible        css=.page-2-active
    Element Should Contain           css=.page-info                       Página 2
    \${page2_rows}=  Get WebElements css=table tbody tr
    Length Should Be                 \${page2_rows}                       \${ITEMS_PER_PAGE}
    Click Element                    css=.previous-page-btn
    Element Should Contain           css=.page-info                       Página 1
    Close Browser

Test Inline Table Editing
    Open Browser                     \${URL}                              \${BROWSER}
    Element Should Be Visible        css=.editable-grid
    Double Click Element             xpath=//table//tr[2]//td[@class='price-cell']
    Element Should Be Visible        css=.inline-editor
    Clear Element Text               css=.price-input
    Input Text                       css=.price-input                     \${EDIT_PRICE}
    Press Keys                       css=.price-input                     RETURN
    Element Should Be Visible        css=.edit-success
    Element Should Contain           xpath=//table//tr[2]//td[@class='price-cell'] \${EDIT_PRICE}
    Double Click Element             xpath=//table//tr[3]//td[@class='stock-cell']
    Input Text                       css=.stock-input                     \${NEW_STOCK}
    Click Button                     css=.save-edit-btn
    Element Should Contain           xpath=//table//tr[3]//td[@class='stock-cell'] \${NEW_STOCK}
    Close Browser

Test Table Selection Actions
    Open Browser                     \${URL}                              \${BROWSER}
    Element Should Be Visible        css=.selection-grid
    Select Checkbox                  xpath=//table//tr[2]//input[@type='checkbox']
    Element Should Be Visible        css=.row-selected
    Select Checkbox                  xpath=//table//tr[3]//input[@type='checkbox']
    Select Checkbox                  xpath=//table//tr[4]//input[@type='checkbox']
    \${selected}=  Get WebElements   css=table tbody tr.selected
    Length Should Be                 \${selected}                         3
    Element Should Contain           css=.selection-count                 3 elementos seleccionados
    Click Button                     css=.bulk-action-delete
    Element Should Be Visible        css=.confirm-bulk-action
    Click Button                     css=.confirm-delete
    Element Should Be Visible        css=.bulk-delete-success
    \${remaining}=  Get WebElements  css=table tbody tr
    Length Should Be Less Than       \${remaining}                        \${selected}
    Close Browser

Test Dynamic Table Updates
    Open Browser                     \${URL}                              \${BROWSER}
    Element Should Be Visible        css=.live-data-grid
    \${initial_count}=  Get Element Count  css=table tbody tr
    Click Button                     css=.add-new-row
    Element Should Be Visible        css=.new-row-form
    Input Text                       id=new-product-name                  \${USER_NAME} Product
    Input Text                       id=new-product-price                 999.99
    Select From List By Label        id=new-product-category              \${FILTER_CATEGORY}
    Click Button                     css=.save-new-row
    Element Should Be Visible        css=.row-added-success
    \${updated_count}=  Get Element Count  css=table tbody tr
    Should Be Equal As Integers      \${updated_count}                    \${initial_count + 1}
    Element Should Contain           xpath=//table//tr[last()]//td[1]     \${USER_NAME} Product
    Click Element                    xpath=//table//tr[last()]//button[@class='delete-row']
    Element Should Be Visible        css=.row-deleted-success
    Close Browser</code></pre>
        
        <h3>🎯 Práctica tablas (5 min):</h3>
        <p>1. Usa Get WebElements + Length Should Be para contar filas</p>
        <p>2. Practica xpath=//table//tr[2]//td[1] para navegación celda</p>
        <p>3. Combina Click Element en headers para sorting</p>
        <p>4. Experimenta Input Text + filtros con verificación resultados</p>
        <p>5. Usa Double Click Element para activar edición inline</p>
        <p>6. Practica Select Checkbox + Get WebElements para selecciones</p>
        <p>7. Combina Clear Element Text + Input Text para edición</p>
        <p>8. Usa Get Element Count para verificar cambios dinámicos</p>
        <p>9. Practica Press Keys RETURN para confirmar ediciones</p>
        <p>10. Combina Select From List con filtros de categoría</p>
        <p>11. Usa Should Not Be Equal para verificar cambios sorting</p>
        <p>12. Practica Length Should Be Greater/Less Than para comparaciones</p>
        <p>13. Combina Get Text + variables para comparar valores</p>
        <p>14. Usa css=table tbody tr:not(.hidden) para filtrados</p>
        <p>15. Crea flujos completos de CRUD en tablas</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar tablas complejas con sorting y filtros dinámicos</li>
                <li>Manejar paginación y cambios de página en grids grandes</li>
                <li>Implementar edición inline y operaciones CRUD en tablas</li>
                <li>Controlar selecciones múltiples y acciones bulk en grids</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa xpath=//table//tr[posición] para navegar filas específicas. Get WebElements + Length para contar elementos dinámicamente. Double Click para edición inline.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 078 - Drag & Drop avanzado</h3>
        <p>Ahora aprenderás interacciones de arrastrar y soltar complejas, reordenamiento de elementos y manipulación avanzada de UI.</p>
    `,
    topics: ["selenium", "web", "automation"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-076"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_077 = LESSON_077;
}