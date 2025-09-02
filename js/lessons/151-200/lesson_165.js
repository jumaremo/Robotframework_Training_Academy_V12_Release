/**
 * Robot Framework Academy - Lesson 165
 * Mobile Testing 165
 */

const LESSON_165 = {
    id: 165,
    title: "Mobile Testing 165",
    duration: "7 min",
    level: "intermediate",
    section: "section-12",
    content: `
        <h2>🔧 Debugging Avanzado</h2>
        <p>Troubleshooting experto, optimización de test suites y best practices móviles.</p>
        
        <h3>💻 Tests Debugging:</h3>
        <pre><code class="robot">*** Settings ***
Library    AppiumLibrary
Library    Collections
Library    DateTime
Library    OperatingSystem
Library    Process
Library    String

*** Variables ***
\${APPIUM_SERVER}     http://localhost:4723/wd/hub
\${DEBUG_APP}         com.example.debugapp
\${DEVICE_NAME}       Android Emulator
\${TIMEOUT}           15s
\${LOG_DIR}           \${CURDIR}/debug_logs
\${SCREENSHOTS_DIR}   \${CURDIR}/debug_screenshots
\${PERFORMANCE_DIR}   \${CURDIR}/performance_data
\${RETRY_COUNT}       3
\${WAIT_MULTIPLIER}   1.5
\${DEBUG_MODE}        true

*** Test Cases ***
Advanced Element Debugging
    [Documentation]    Debugging avanzado cuando elementos no se encuentran
    [Tags]             debugging    elements    troubleshooting    locators
    
    \${caps}=           Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${DEBUG_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    ...    newCommandTimeout=60
    ...    elementImplicitWait=5000
    
    Open Application    \${APPIUM_SERVER}    &{caps}
    
    # Debug: Capturar page source cuando elemento falta
    \${target_element}=  Set Variable    id=problematic_element
    
    TRY
        Wait Until Page Contains Element    \${target_element}    5s
        Log    ✓ Element found immediately
        
    EXCEPT
        Log    ⚠️ Element not found, starting debug process
        
        # Capturar page source para análisis
        \${page_source}=    Get Source
        Create File         \${LOG_DIR}/page_source_debug.xml    \${page_source}
        
        # Capturar screenshot para contexto visual
        \${timestamp}=      Get Current Date    result_format=%Y%m%d_%H%M%S
        Take Screenshot     \${SCREENSHOTS_DIR}/element_debug_\${timestamp}.png
        
        # Buscar elementos similares
        \${similar_elements}= Get Elements    xpath=//*[contains(@resource-id, 'problematic')]
        \${similar_count}=  Get Length    \${similar_elements}
        
        Run Keyword If      \${similar_count} > 0
        ...                Log    Found \${similar_count} similar elements
        ...    ELSE         Log    No similar elements found
        
        # Intentar localizadores alternativos
        \${alternative_locators}= Create List
        ...    xpath=//android.widget.Button[contains(@text, 'Problem')]
        ...    android=new UiSelector().textContains("Problem")
        ...    class=android.widget.Button
        
        FOR    \${locator}    IN    @{alternative_locators}
            TRY
                Element Should Be Visible    \${locator}
                Log    ✓ Alternative locator works: \${locator}
                Set Global Variable    \${WORKING_LOCATOR}    \${locator}
                BREAK
                
            EXCEPT
                Log    ✗ Alternative locator failed: \${locator}
            END
        END
    END
    
    # Debug: Verificar estado de la app
    \${current_activity}= Get Current Activity
    Should Not Be Empty \${current_activity}    Activity debe estar activa
    
    \${app_state}=      Get App State    \${DEBUG_APP}
    Should Be Equal As Numbers    \${app_state}    4    App debe estar en foreground
    
    # Debug: Análisis de timing issues
    \${elements_count}= Get Element Count    xpath=//*
    Should Be True      \${elements_count} > 10    UI debe estar cargada
    
    # Debug: Memory y performance
    TRY
        \${device_info}=    Execute Javascript    mobile: getDeviceInfo
        Log    Device info: \${device_info}
    EXCEPT
        Log    Device info no disponible
    END
    
    Close Application
    
    Log    ✓ Advanced element debugging completado

Dynamic Wait Strategies
    [Documentation]    Estrategias avanzadas de espera dinámicas
    [Tags]             waits    timing    performance    stability
    
    \${dynamic_caps}=   Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${DEBUG_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{dynamic_caps}
    
    # Smart wait con múltiples condiciones
    \${wait_conditions}= Create List
    ...    id=loading_indicator
    ...    id=content_loaded
    ...    xpath=//android.widget.ProgressBar[@visibility='gone']
    
    \${max_wait_time}=  Set Variable    30
    \${check_interval}= Set Variable    1
    \${conditions_met}= Set Variable    0
    
    FOR    \${i}    IN RANGE    \${max_wait_time}
        FOR    \${condition}    IN    @{wait_conditions}
            TRY
                Element Should Be Visible    \${condition}
                \${conditions_met}= Evaluate    \${conditions_met} + 1
                Log    ✓ Condition met: \${condition}
                
            EXCEPT
                Log    Condition pending: \${condition}
            END
        END
        
        Run Keyword If      \${conditions_met} >= 2
        ...                Exit For Loop
        
        Sleep               \${check_interval}s
        \${conditions_met}= Set Variable    0
    END
    
    Should Be True      \${conditions_met} >= 2    Al menos 2 condiciones deben cumplirse
    
    # Adaptive timeout basado en performance
    \${performance_start}= Get Time    epoch
    Click Element       id=heavy_operation_button
    
    \${adaptive_timeout}= Set Variable    10
    \${performance_factor}= Set Variable    1.0
    
    # Monitorear progreso de operación
    FOR    \${attempt}    IN RANGE    \${adaptive_timeout}
        TRY
            Element Should Be Visible    id=operation_complete
            BREAK
            
        EXCEPT
            # Verificar si operación progresa
            \${progress_elements}= Get Element Count    xpath=//android.widget.ProgressBar
            Run Keyword If      \${progress_elements} > 0
            ...                Set Variable    \${performance_factor}    1.5
            
            \${adjusted_wait}=  Evaluate    \${check_interval} * \${performance_factor}
            Sleep               \${adjusted_wait}s
        END
    END
    
    \${performance_end}= Get Time    epoch
    \${operation_duration}= Evaluate    \${performance_end} - \${performance_start}
    
    Should Be True      \${operation_duration} < 30    Operación debe completar en tiempo razonable
    
    # Wait con retry exponential backoff
    \${retry_wait}=     Set Variable    1
    \${max_retries}=    Set Variable    5
    
    FOR    \${retry}    IN RANGE    \${max_retries}
        TRY
            Click Element       id=flaky_element
            Element Should Be Visible    id=success_indicator    3s
            Log    ✓ Flaky element worked on retry \${retry + 1}
            BREAK
            
        EXCEPT
            \${retry_wait}=     Evaluate    \${retry_wait} * 2
            Log    Retry \${retry + 1} failed, waiting \${retry_wait}s
            Sleep               \${retry_wait}s
            
            Run Keyword If      \${retry} == \${max_retries} - 1
            ...                Fail    Element failed after \${max_retries} retries
        END
    END
    
    Close Application
    
    Log    ✓ Dynamic wait strategies completado: Operation=\${operation_duration}s

Test Suite Optimization
    [Documentation]    Optimización de performance de test suites
    [Tags]             optimization    performance    efficiency    speed
    
    \${optimization_start}= Get Time    epoch
    
    # Optimización: Reutilización de sesiones
    \${shared_caps}=    Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${DEBUG_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    ...    noReset=true
    ...    fullReset=false
    
    Open Application    \${APPIUM_SERVER}    &{shared_caps}
    
    # Test batch 1: Operaciones rápidas
    \${quick_tests}=    Create List
    ...    id=quick_test_1
    ...    id=quick_test_2
    ...    id=quick_test_3
    
    FOR    \${test_element}    IN    @{quick_tests}
        \${test_start}=     Get Time    epoch
        
        Click Element       \${test_element}
        Element Should Be Visible    id=test_result
        
        \${test_end}=       Get Time    epoch
        \${test_duration}=  Evaluate    \${test_end} - \${test_start}
        
        Should Be True      \${test_duration} < 3    Quick test debe ser < 3s
        Log    ✓ Quick test \${test_element}: \${test_duration}s
    END
    
    # Optimización: Batch operations
    \${batch_elements}=  Get Elements    xpath=//android.widget.CheckBox
    \${batch_start}=     Get Time    epoch
    
    FOR    \${checkbox}    IN    @{batch_elements}
        Click Element       \${checkbox}
    END
    
    Click Element       id=batch_submit_button
    Wait Until Page Contains Element    id=batch_complete
    
    \${batch_end}=       Get Time    epoch
    \${batch_duration}=  Evaluate    \${batch_end} - \${batch_start}
    
    Log    Batch operation: \${len(\${batch_elements})} elements in \${batch_duration}s
    
    # Optimización: Parallel-ready test design
    \${test_data}=      Create Dictionary
    ...    test_id=optimization_\${optimization_start}
    ...    thread_safe=true
    ...    cleanup_required=false
    
    # Verificar estado limpio para parallel execution
    \${persistent_elements}= Get Element Count    xpath=//android.widget.TextView[contains(@text, 'temp_')]
    Should Be Equal As Numbers    \${persistent_elements}    0    No datos temporales deben persistir
    
    # Optimización: Resource usage monitoring
    \${memory_before}=  Execute Javascript    return navigator.deviceMemory || 'unknown'
    
    # Simular operación intensiva
    Click Element       id=memory_intensive_operation
    Sleep               3s
    
    \${memory_after}=   Execute Javascript    return navigator.deviceMemory || 'unknown'
    
    # Verificar no memory leaks
    Run Keyword If      '\${memory_before}' != 'unknown' and '\${memory_after}' != 'unknown'
    ...                Should Be True    abs(\${memory_after} - \${memory_before}) < 0.1
    
    # Test cleanup optimization
    Reset Application
    
    \${cleanup_verification}= Get Element Count    xpath=//android.widget.EditText[@text!='']
    Should Be Equal As Numbers    \${cleanup_verification}    0    App debe estar limpia
    
    Close Application
    
    \${optimization_end}= Get Time    epoch
    \${total_optimization_time}= Evaluate    \${optimization_end} - \${optimization_start}
    
    Log    ✓ Test suite optimization completado: \${total_optimization_time}s

Error Recovery Patterns
    [Documentation]    Patrones avanzados de recuperación de errores
    [Tags]             error-recovery    resilience    stability    patterns
    
    \${recovery_caps}=  Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${DEBUG_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    
    Open Application    \${APPIUM_SERVER}    &{recovery_caps}
    
    # Pattern 1: Graceful degradation
    \${primary_feature}= Set Variable    id=primary_feature_button
    \${fallback_feature}= Set Variable    id=fallback_feature_button
    
    TRY
        Click Element       \${primary_feature}
        Wait Until Page Contains Element    id=primary_success    5s
        Log    ✓ Primary feature working
        
    EXCEPT
        Log    Primary feature failed, using fallback
        
        TRY
            Click Element       \${fallback_feature}
            Wait Until Page Contains Element    id=fallback_success    5s
            Log    ✓ Fallback feature working
            
        EXCEPT
            Fail    Both primary and fallback features failed
        END
    END
    
    # Pattern 2: State recovery after crash
    \${app_state_before}= Get App State    \${DEBUG_APP}
    
    # Simular crash scenario
    TRY
        Click Element       id=crash_trigger_button
        Sleep               2s
        
    EXCEPT
        Log    App crashed as expected, recovering...
    END
    
    # Verificar y recuperar estado
    \${app_state_after}= Get App State    \${DEBUG_APP}
    
    Run Keyword If      \${app_state_after} == 0
    ...                Activate Application    \${DEBUG_APP}
    
    Wait Until Page Contains Element    id=main_screen    10s
    Element Should Be Visible           id=recovery_indicator
    
    # Pattern 3: Network resilience
    \${network_operations}= Create List
    ...    id=api_call_1
    ...    id=api_call_2
    ...    id=api_call_3
    
    FOR    \${operation}    IN    @{network_operations}
        \${network_attempts}= Set Variable    0
        \${max_network_retries}= Set Variable    3
        
        FOR    \${attempt}    IN RANGE    \${max_network_retries}
            TRY
                Click Element       \${operation}
                Wait Until Page Contains Element    id=network_success    8s
                Log    ✓ Network operation \${operation} succeeded on attempt \${attempt + 1}
                BREAK
                
            EXCEPT
                \${network_attempts}= Evaluate    \${network_attempts} + 1
                Log    Network operation \${operation} failed, attempt \${attempt + 1}
                
                Run Keyword If      \${attempt} < \${max_network_retries} - 1
                ...                Sleep    2s
                ...    ELSE         Log    ⚠️ Network operation \${operation} failed after \${max_network_retries} attempts
            END
        END
    END
    
    # Pattern 4: UI state synchronization
    \${sync_elements}=  Create List
    ...    id=counter_display
    ...    id=status_indicator
    ...    id=progress_bar
    
    Click Element       id=start_sync_operation
    
    \${sync_timeout}=   Set Variable    15
    \${sync_start}=     Get Time    epoch
    
    FOR    \${i}    IN RANGE    \${sync_timeout}
        \${synced_count}=   Set Variable    0
        
        FOR    \${element}    IN    @{sync_elements}
            TRY
                \${element_state}=  Get Element Attribute    \${element}    displayed
                Run Keyword If      '\${element_state}' == 'true'
                ...                Evaluate    \${synced_count} + 1
            EXCEPT
                Log    Sync element \${element} not ready
            END
        END
        
        Run Keyword If      \${synced_count} == \${len(\${sync_elements})}
        ...                Exit For Loop
        
        Sleep               1s
    END
    
    \${sync_end}=       Get Time    epoch
    \${sync_duration}=  Evaluate    \${sync_end} - \${sync_start}
    
    Should Be True      \${synced_count} == \${len(\${sync_elements})}    Todos los elementos deben sincronizar
    Should Be True      \${sync_duration} < \${sync_timeout}    Sync debe completar en tiempo límite
    
    Close Application
    
    Log    ✓ Error recovery patterns completado: Sync=\${sync_duration}s

Performance Profiling Integration
    [Documentation]    Integración de profiling de performance en tests
    [Tags]             profiling    performance    metrics    monitoring
    
    \${profiling_caps}= Create Dictionary
    ...    platformName=Android
    ...    deviceName=\${DEVICE_NAME}
    ...    appPackage=\${DEBUG_APP}
    ...    appActivity=.MainActivity
    ...    automationName=UiAutomator2
    ...    enablePerformanceLogging=true
    
    \${profiling_start}= Get Time    epoch
    Open Application    \${APPIUM_SERVER}    &{profiling_caps}
    \${app_launch_end}= Get Time    epoch
    
    \${launch_time}=    Evaluate    \${app_launch_end} - \${profiling_start}
    Should Be True      \${launch_time} < 10    App launch < 10s
    
    # Performance baseline establishment
    \${baseline_operations}= Create List
    ...    id=baseline_operation_1
    ...    id=baseline_operation_2
    ...    id=baseline_operation_3
    
    \${baseline_times}= Create List
    
    FOR    \${operation}    IN    @{baseline_operations}
        \${op_start}=       Get Time    epoch
        Click Element       \${operation}
        Wait Until Page Contains Element    id=operation_complete
        \${op_end}=         Get Time    epoch
        
        \${op_duration}=    Evaluate    \${op_end} - \${op_start}
        Append To List      \${baseline_times}    \${op_duration}
        
        Log    Operation \${operation}: \${op_duration}s
    END
    
    # Performance regression detection
    \${average_baseline}= Evaluate    sum(\${baseline_times}) / len(\${baseline_times})
    \${performance_threshold}= Evaluate    \${average_baseline} * 1.2    # 20% tolerance
    
    # Test current performance vs baseline
    \${current_op_start}= Get Time    epoch
    Click Element       id=performance_test_operation
    Wait Until Page Contains Element    id=performance_result
    \${current_op_end}= Get Time    epoch
    
    \${current_duration}= Evaluate    \${current_op_end} - \${current_op_start}
    
    Run Keyword If      \${current_duration} > \${performance_threshold}
    ...                Log    ⚠️ PERFORMANCE REGRESSION: \${current_duration}s vs baseline \${average_baseline}s
    ...    ELSE         Log    ✓ Performance within acceptable range
    
    # Memory profiling
    TRY
        \${memory_stats}=   Execute Javascript    mobile: getDeviceInfo
        \${memory_usage}=   Get From Dictionary    \${memory_stats}    memoryUsage
        
        Should Be True      \${memory_usage} < 512    Memory usage < 512MB
        
    EXCEPT
        Log    Memory profiling no disponible en este device
    END
    
    # CPU profiling simulation
    \${cpu_intensive_start}= Get Time    epoch
    Click Element       id=cpu_intensive_button
    Wait Until Page Contains Element    id=cpu_operation_done    20s
    \${cpu_intensive_end}= Get Time    epoch
    
    \${cpu_duration}=   Evaluate    \${cpu_intensive_end} - \${cpu_intensive_start}
    Should Be True      \${cpu_duration} < 15    CPU intensive operation < 15s
    
    # Generate performance report
    \${performance_report}= Create Dictionary
    ...    app_launch_time=\${launch_time}
    ...    baseline_average=\${average_baseline}
    ...    current_operation_time=\${current_duration}
    ...    cpu_intensive_time=\${cpu_duration}
    ...    performance_regression=\${current_duration > performance_threshold}
    ...    timestamp=\${datetime.now().isoformat()}
    
    \${report_json}=    Convert To JSON    \${performance_report}
    Create File         \${PERFORMANCE_DIR}/performance_profile.json    \${report_json}
    
    Take Screenshot     \${SCREENSHOTS_DIR}/performance_profiling_final.png
    Close Application
    
    Log    ✓ Performance profiling completado: Launch=\${launch_time}s, CPU=\${cpu_duration}s</code></pre>
        
        <h3>🎯 Práctica Debugging (5 min):</h3>
        <p>1. Configura app problemática con elementos intermitentes para debugging</p>
        <p>2. Crea directorios debug_logs y debug_screenshots para captures</p>
        <p>3. Ejecuta "Advanced Element Debugging" con elementos que fallan</p>
        <p>4. Practica "Dynamic Wait Strategies" con operaciones de timing variable</p>
        <p>5. Optimiza "Test Suite Optimization" midiendo tiempos de ejecución</p>
        <p>6. Implementa "Error Recovery Patterns" con scenarios de fallo controlado</p>
        <p>7. Configura "Performance Profiling Integration" con baseline metrics</p>
        <p>8. Analiza logs de Appium para identificar bottlenecks</p>
        <p>9. Implementa retry logic inteligente para elementos flaky</p>
        <p>10. Crea dashboard de métricas de performance histórico</p>
        <p>11. Documenta patrones de debugging para tu organización</p>
        <p>12. Establece alertas automáticas para performance regressions</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar técnicas avanzadas de debugging para elementos problemáticos</li>
                <li>Implementar estrategias dinámicas de wait y retry con backoff</li>
                <li>Optimizar performance de test suites para ejecución eficiente</li>
                <li>Crear patrones robustos de recovery y performance profiling</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Siempre captura page source y screenshots cuando debugging. Usa performance baselines para detectar regressions automáticamente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 166 - Mobile Testing 166</h3>
        <p>Continuarás con técnicas especializadas de mobile testing para casos edge y scenarios complejos enterprise.</p>
    `,
    topics: ["mobile", "appium", "android", "ios"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-164"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_165 = LESSON_165;
}