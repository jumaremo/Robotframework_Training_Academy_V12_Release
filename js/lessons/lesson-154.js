/**
 * Robot Framework Academy - Lesson 154
 * Data-Driven 154
 */

const LESSON_154 = {
    id: 154,
    title: "Data-Driven 154",
    duration: "7 min",
    level: "intermediate",
    section: "section-11",
    content: `
        <h2>⚡ Performance Masivo</h2>
        <p>Optimiza tests con datasets de 10,000+ registros y ejecución paralela.</p>
        
        <h3>💻 Tests Performance:</h3>
        <pre><code class="robot">*** Settings ***
Library    Collections
Library    Process
Library    Threading
Library    SeleniumLibrary
Library    RequestsLibrary
Library    pabot.PabotLib

*** Variables ***
\${MASSIVE_DATA}     \${CURDIR}/massive_dataset.csv
\${BATCH_SIZE}       100
\${PARALLEL_PROCESSES}    4
\${BROWSER}          headlesschrome
\${API_BASE}         https://load-test.com/api
\${RESULTS_DIR}      \${CURDIR}/performance_results
\${TIMEOUT}          30s
\${MAX_RETRIES}      3

*** Test Cases ***
Load Massive Dataset Optimized
    [Documentation]    Carga eficiente de datasets masivos
    [Tags]             performance    massive-data    optimization
    
    \${start_time}=      Get Time    epoch
    
    # Lectura chunked para memoria eficiente
    \${file_handle}=     Open File    \${MASSIVE_DATA}    r
    \${header_line}=     Read Line    \${file_handle}
    \${headers}=         Split String    \${header_line}    ,
    
    \${batch_count}=     Set Variable    0
    \${total_records}=   Set Variable    0
    \${current_batch}=   Create List
    
    FOR    \${line}    IN    File Iterator    \${file_handle}
        \${record}=         Split String    \${line}    ,
        Append To List      \${current_batch}    \${record}
        \${total_records}=  Evaluate    \${total_records} + 1
        
        # Procesa batch cuando alcanza el tamaño
        \${batch_length}=   Get Length    \${current_batch}
        Run Keyword If      \${batch_length} >= \${BATCH_SIZE}
        ...                Process Data Batch    \${current_batch}    \${batch_count}
        
        Run Keyword If      \${batch_length} >= \${BATCH_SIZE}
        ...                Set Variable    \${current_batch}    \${EMPTY_LIST}
        
        Run Keyword If      \${batch_length} >= \${BATCH_SIZE}
        ...                Evaluate    \${batch_count} + 1
    END
    
    # Procesa último batch parcial
    \${remaining}=       Get Length    \${current_batch}
    Run Keyword If      \${remaining} > 0
    ...                Process Data Batch    \${current_batch}    \${batch_count}
    
    Close File          \${file_handle}
    
    \${end_time}=        Get Time    epoch
    \${duration}=        Evaluate    \${end_time} - \${start_time}
    
    Log    ✓ Procesados \${total_records} registros en \${duration}s
    Should Be True      \${duration} < 60    Debe procesar en menos de 1 min

Parallel API Testing
    [Documentation]    Tests API masivos en paralelo
    [Tags]             parallel    api    load-testing
    
    # Prepara datasets para procesos paralelos
    \${process_data}=    Distribute Data For Processes    \${PARALLEL_PROCESSES}
    
    \${process_handles}= Create List
    
    FOR    \${process_id}    IN RANGE    \${PARALLEL_PROCESSES}
        \${process_data_chunk}=  Get From List    \${process_data}    \${process_id}
        
        \${process_handle}=  Start Process    robot
        ...    --variable    PROCESS_ID:\${process_id}
        ...    --variable    DATA_CHUNK:\${process_data_chunk}
        ...    --test        Execute API Tests Chunk
        ...    --outputdir   \${RESULTS_DIR}/process_\${process_id}
        ...    \${CURDIR}/parallel_api_tests.robot
        
        Append To List      \${process_handles}    \${process_handle}
        Log    ✓ Proceso \${process_id} iniciado
    END
    
    # Espera todos los procesos
    FOR    \${handle}    IN    @{process_handles}
        \${result}=         Wait For Process    \${handle}    timeout=\${TIMEOUT}
        Should Be Equal As Numbers    \${result.rc}    0
        Log    ✓ Proceso completado: RC=\${result.rc}
    END
    
    Log    ✓ Testing paralelo completado con \${PARALLEL_PROCESSES} procesos

Batch Web Testing Optimized
    [Documentation]    Testing web con múltiples browsers simultáneos
    [Tags]             batch    web    browsers    parallel
    
    \${browser_configs}= Create List
    ...    headlesschrome
    ...    headlessfirefox
    ...    chrome
    ...    firefox
    
    \${test_urls}=       Create List
    ...    \${API_BASE}/page1
    ...    \${API_BASE}/page2
    ...    \${API_BASE}/page3
    ...    \${API_BASE}/page4
    ...    \${API_BASE}/page5
    
    FOR    \${browser}    IN    @{browser_configs}
        FOR    \${url}    IN    @{test_urls}
            Open Browser        \${url}    \${browser}
            Set Browser Implicit Wait    \${TIMEOUT}
            
            Wait Until Page Contains Element    css=body
            \${title}=          Get Title
            Should Not Be Empty    \${title}
            
            \${load_time}=      Execute Javascript
            ...    return performance.timing.loadEventEnd - performance.timing.navigationStart
            
            Should Be True      \${load_time} < 5000    Page should load in <5s
            
            Take Screenshot     \${RESULTS_DIR}/\${browser}_\${url.split('/')[-1]}.png
            Close Browser
            
            Log    ✓ URL \${url} en \${browser}: \${load_time}ms
        END
    END
    
    Log    ✓ Batch testing completado en \${len(\${browser_configs})} browsers

Memory Efficient Data Processing
    [Documentation]    Procesamiento eficiente de memoria para big data
    [Tags]             memory    efficiency    big-data
    
    \${memory_start}=    Get Memory Usage
    
    # Procesa en chunks para evitar overflow de memoria
    \${chunk_size}=      Set Variable    500
    \${processed_count}= Set Variable    0
    
    Create Session      testapi    \${API_BASE}
    
    FOR    \${chunk_start}    IN RANGE    0    10000    \${chunk_size}
        \${chunk_end}=       Evaluate    \${chunk_start} + \${chunk_size}
        
        # Genera chunk de datos dinámicamente
        \${chunk_data}=      Generate Test Data Chunk    \${chunk_start}    \${chunk_end}
        
        FOR    \${record}    IN    @{chunk_data}
            \${payload}=        Create Dictionary
            ...    id=\${record.id}
            ...    name=\${record.name}
            ...    email=\${record.email}
            ...    timestamp=\${record.timestamp}
            
            \${response}=       POST On Session    testapi    /bulk-create
            ...    json=\${payload}    expected_status=201
            
            \${processed_count}= Evaluate    \${processed_count} + 1
            
            # Log progreso cada 100 registros
            Run Keyword If      \${processed_count} % 100 == 0
            ...                Log    ✓ Procesados \${processed_count} registros
        END
        
        # Limpia memoria después de cada chunk
        \${chunk_data}=      Set Variable    \${EMPTY}
        
        \${memory_current}=  Get Memory Usage
        Log    ✓ Chunk \${chunk_start}-\${chunk_end}: Memoria \${memory_current}MB
    END
    
    \${memory_end}=      Get Memory Usage
    \${memory_diff}=     Evaluate    \${memory_end} - \${memory_start}
    
    Should Be True      \${memory_diff} < 500    Memory usage should be <500MB
    Log    ✓ Procesamiento eficiente: \${processed_count} registros, +\${memory_diff}MB

Stress Test Data Validation
    [Documentation]    Validación bajo carga de datos masivos
    [Tags]             stress    validation    load
    
    \${concurrent_users}= Set Variable    10
    \${requests_per_user}= Set Variable    100
    
    \${start_time}=      Get Time    epoch
    \${success_count}=   Set Variable    0
    \${error_count}=     Set Variable    0
    
    Create Session      loadtest    \${API_BASE}
    
    FOR    \${user_id}    IN RANGE    \${concurrent_users}
        FOR    \${request_id}    IN RANGE    \${requests_per_user}
            \${unique_id}=      Evaluate    f"user_{\${user_id}}_req_{\${request_id}}"
            
            TRY
                \${test_data}=      Create Dictionary
                ...    user_id=\${user_id}
                ...    request_id=\${request_id}
                ...    unique_id=\${unique_id}
                ...    data=large_payload_data_here
                
                \${response}=       POST On Session    loadtest    /stress-endpoint
                ...    json=\${test_data}    timeout=5
                
                Status Should Be    200    \${response}
                \${response_data}=  Set Variable    \${response.json()}
                Should Be Equal     \${response_data}[unique_id]    \${unique_id}
                
                \${success_count}=  Evaluate    \${success_count} + 1
                
            EXCEPT
                \${error_count}=    Evaluate    \${error_count} + 1
                Log    ⚠️ Error en request \${unique_id}
            END
        END
        
        Log    ✓ Usuario \${user_id}: \${success_count} éxitos, \${error_count} errores
    END
    
    \${end_time}=        Get Time    epoch
    \${total_duration}=  Evaluate    \${end_time} - \${start_time}
    \${total_requests}=  Evaluate    \${concurrent_users} * \${requests_per_user}
    \${rps}=            Evaluate    \${total_requests} / \${total_duration}
    
    \${success_rate}=    Evaluate    (\${success_count} / \${total_requests}) * 100
    
    Should Be True      \${success_rate} > 95    Success rate should be >95%
    Should Be True      \${rps} > 50            Should handle >50 requests/second
    
    Log    ✓ Stress test: \${total_requests} requests, \${success_rate}% success, \${rps} RPS</code></pre>
        
        <h3>🎯 Práctica Performance (5 min):</h3>
        <p>1. Crea massive_dataset.csv con 10,000+ registros usando script Python</p>
        <p>2. Instala pabot: <code>pip install robotframework-pabot</code></p>
        <p>3. Ejecuta "Load Massive Dataset Optimized" y mide tiempo de procesamiento</p>
        <p>4. Configura múltiples procesos con pabot: <code>pabot --processes 4 tests.robot</code></p>
        <p>5. Prueba "Parallel API Testing" con endpoint mock de alta latencia</p>
        <p>6. Monitorea uso de memoria durante "Memory Efficient Data Processing"</p>
        <p>7. Ejecuta "Batch Web Testing Optimized" con 4 browsers simultáneos</p>
        <p>8. Optimiza chunk_size según memoria disponible en tu sistema</p>
        <p>9. Implementa retry logic para requests que fallan por timeout</p>
        <p>10. Agrega métricas de performance (RPS, latencia, throughput)</p>
        <p>11. Crea dashboard simple para visualizar resultados de carga</p>
        <p>12. Practica cleanup eficiente de recursos después de stress tests</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Procesar datasets masivos (10K+ registros) eficientemente</li>
                <li>Implementar ejecución paralela para optimizar tiempos</li>
                <li>Gestionar memoria eficientemente en big data testing</li>
                <li>Medir y validar métricas de performance bajo carga</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa chunking y procesamiento paralelo para datasets masivos. Monitorea memoria y establece límites de timeout apropiados.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 155 - Data-Driven 155</h3>
        <p>Dominarás técnicas avanzadas de data validation y assertion strategies para casos enterprise críticos.</p>
    `,
    topics: ["data-driven", "excel", "csv"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-153"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_154 = LESSON_154;
}