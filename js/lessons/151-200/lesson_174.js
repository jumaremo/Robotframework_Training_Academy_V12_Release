/**
 * Robot Framework Academy - Lesson 174
 * Python Libraries 174
 */

const LESSON_174 = {
    id: 174,
    title: "Python Libraries 174",
    duration: "7 min",
    level: "intermediate",
    section: "section-13",
    content: `
        <h2>⚡ Threading y Concurrencia</h2>
        <p>Implementa threading, multiprocessing y async/await para operaciones concurrentes en librerías Robot Framework.</p>
        
        <h3>💻 Operaciones concurrentes avanzadas:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/ConcurrentLibrary.py

*** Variables ***
\${THREAD_COUNT}    5
\${TASK_COUNT}      10
\${ASYNC_TIMEOUT}   30
\${API_URLS}        ["https://httpbin.org/delay/1", "https://httpbin.org/delay/2"]
\${FILE_PATHS}      ["./data/file1.txt", "./data/file2.txt", "./data/file3.txt"]
\${PARALLEL_JOBS}   3
\${WORKER_POOL}     4

*** Test Cases ***
Test Threading Operations
    \${thread_result}=    Execute With Threading    process_multiple_files    \${FILE_PATHS}    max_threads=\${THREAD_COUNT}
    Should Be True    \${thread_result}[completed]
    Should Be Equal As Numbers    \${thread_result}[files_processed]    3
    Should Be True    \${thread_result}[execution_time] > 0
    Should Be True    \${thread_result}[threads_used] <= \${THREAD_COUNT}
    Log    Threading result: \${thread_result}

Test Multiprocessing Pool
    \${process_result}=    Execute With Multiprocessing    cpu_intensive_task    iterations=\${TASK_COUNT}    workers=\${WORKER_POOL}
    Should Be True    \${process_result}[completed]
    Should Be Equal As Numbers    \${process_result}[tasks_completed]    \${TASK_COUNT}
    Should Be True    \${process_result}[total_time] > 0
    Should Be Equal As Numbers    \${process_result}[workers_used]    \${WORKER_POOL}
    Log    Multiprocessing result: \${process_result}

Test Async Operations
    \${async_result}=    Execute Async Operations    fetch_multiple_urls    \${API_URLS}    timeout=\${ASYNC_TIMEOUT}
    Should Be True    \${async_result}[completed]
    Should Be Equal As Numbers    \${async_result}[urls_fetched]    2
    Should Be True    \${async_result}[avg_response_time] > 0
    Should Contain    \${async_result}[responses]    httpbin
    Log    Async operations result: \${async_result}

Test Concurrent File Processing
    \${concurrent_result}=    Process Files Concurrently    \${FILE_PATHS}    operation=validate    parallel_jobs=\${PARALLEL_JOBS}
    Should Be True    \${concurrent_result}[all_processed]
    Should Be Equal As Numbers    \${concurrent_result}[files_count]    3
    Should Be True    \${concurrent_result}[processing_time] > 0
    Should Contain    \${concurrent_result}[results]    file1.txt
    Log    Concurrent file processing: \${concurrent_result}

Test Thread Pool Management
    Create Thread Pool    pool_size=\${THREAD_COUNT}    name=test_pool
    \${pool_status}=    Get Thread Pool Status    test_pool
    Should Be Equal As Numbers    \${pool_status}[size]    \${THREAD_COUNT}
    Should Be Equal    \${pool_status}[status]    active
    Submit Thread Task    test_pool    background_operation    param1=value1
    \${task_result}=    Wait For Thread Tasks    test_pool    timeout=10
    Should Be True    \${task_result}[completed]
    Shutdown Thread Pool    test_pool
    Log    Thread pool management: \${pool_status}</code></pre>
        
        <h3>🎯 Práctica threading y concurrencia (5 min):</h3>
        <p>1. Crea ConcurrentLibrary.py con execute_with_threading() usando ThreadPoolExecutor</p>
        <p>2. Implementa execute_with_multiprocessing() con ProcessPoolExecutor</p>
        <p>3. Agrega execute_async_operations() usando asyncio y aiohttp</p>
        <p>4. Crea process_files_concurrently() para operaciones paralelas en archivos</p>
        <p>5. Implementa create_thread_pool() para manejo manual de pools</p>
        <p>6. Agrega get_thread_pool_status() para monitoreo de threads</p>
        <p>7. Crea submit_thread_task() para agregar tareas a pool</p>
        <p>8. Implementa wait_for_thread_tasks() con timeout configurable</p>
        <p>9. Agrega shutdown_thread_pool() para limpieza de recursos</p>
        <p>10. Usa concurrent.futures para thread y process pools</p>
        <p>11. Implementa async def keywords usando asyncio.run()</p>
        <p>12. Agrega manejo de timeouts en operaciones async</p>
        <p>13. Crea locks y semáforos para sincronización de threads</p>
        <p>14. Implementa progress tracking para operaciones concurrentes</p>
        <p>15. Prueba performance comparando serial vs concurrent execution</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar threading para operaciones I/O intensivas</li>
                <li>Usar multiprocessing para tareas CPU intensivas</li>
                <li>Aplicar async/await para operaciones de red concurrentes</li>
                <li>Gestionar pools de threads y procesos para escalabilidad</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa threading para I/O (archivos, red), multiprocessing para CPU intensivo, y async/await para muchas operaciones de red concurrentes.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 175 - Python Libraries 175</h3>
        <p>Explorarás integración con bases de datos, APIs REST y servicios web usando librerías Python especializadas para testing.</p>
    `,
    topics: ["python", "libraries", "custom"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-173"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_174 = LESSON_174;
}