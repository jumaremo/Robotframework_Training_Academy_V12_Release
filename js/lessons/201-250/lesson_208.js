/**
 * Robot Framework Academy - Lesson 208
 * Performance 208
 */

const LESSON_208 = {
    id: 208,
    title: "Performance 208",
    duration: "10 min",
    level: "advanced",
    section: "section-16",
    content: `
        <h2>📊 Capacity Planning</h2>
        <p>Predice necesidades de infraestructura y configura scaling automático basado en métricas de performance.</p>
        
        <h3>💻 Scaling Automático:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    📊 CAPACITY PLANNING & AUTO-SCALING SUITE
Library          RequestsLibrary
Library          Collections
Library          DateTime
Library          OperatingSystem
Library          Process
Library          JSON
Suite Setup      Initialize Capacity Planning
Suite Teardown   Archive Capacity Analysis

*** Variables ***
\${KUBERNETES_CONFIG}  ~/.kube/config
\${NAMESPACE}          production
\${APP_DEPLOYMENT}     web-application
\${CURRENT_REPLICAS}   3
\${MAX_REPLICAS}       20
\${MIN_REPLICAS}       2
\${TARGET_CPU_UTIL}    70
\${TARGET_MEM_UTIL}    80
\${SCALE_UP_THRESHOLD} 85
\${SCALE_DOWN_THRESHOLD} 30
\${CAPACITY_REPORT}    capacity_analysis.json
&{SCALING_METRICS}     cpu_usage=0  memory_usage=0  request_rate=0  response_time=0

*** Test Cases ***
Analyze Current Capacity Usage
    [Documentation]    Analiza uso actual de recursos para baseline
    [Tags]             capacity    analysis    baseline
    
    # Obtener métricas actuales de Kubernetes
    \${kubectl_result}=   Run Process    kubectl    get    pods    
    ...                   -n    \${NAMESPACE}    
    ...                   -l    app=\${APP_DEPLOYMENT}    
    ...                   --field-selector=status.phase=Running
    Should Be Equal       \${kubectl_result.rc}    0
    
    # Contar pods activos
    @{running_pods}=      Split To Lines    \${kubectl_result.stdout}
    \${active_pods}=      Evaluate    len([line for line in \${running_pods} if 'Running' in line])
    Should Be True        \${active_pods} >= \${MIN_REPLICAS}
    
    Log                   Currently running pods: \${active_pods}
    Set Global Variable   \${CURRENT_PODS}    \${active_pods}
    
    # Obtener métricas de CPU por pod
    \${cpu_metrics}=      Run Process    kubectl    top    pods    
    ...                   -n    \${NAMESPACE}    
    ...                   -l    app=\${APP_DEPLOYMENT}
    Should Be Equal       \${cpu_metrics.rc}    0
    
    # Parsear métricas de recursos
    \${resource_usage}=   Parse Resource Metrics    \${cpu_metrics.stdout}
    \${avg_cpu}=          Calculate Average    \${resource_usage}    cpu
    \${avg_memory}=       Calculate Average    \${resource_usage}    memory
    
    Should Be True        \${avg_cpu} < 100
    Should Be True        \${avg_memory} < 1000
    
    Set To Dictionary     \${SCALING_METRICS}    cpu_usage=\${avg_cpu}
    Set To Dictionary     \${SCALING_METRICS}    memory_usage=\${avg_memory}
    
    Log                   Average CPU usage: \${avg_cpu}%
    Log                   Average Memory usage: \${avg_memory}MB

Measure Application Load Pattern
    [Documentation]    Mide patrones de carga para predecir scaling needs
    [Tags]             load    pattern    prediction
    
    Create Session        monitoring    http://prometheus.company.com:9090
    
    # Query para request rate en últimas 4 horas
    \${query_params}=     Create Dictionary
    ...                   query=rate(http_requests_total[5m])
    ...                   start=2024-01-15T10:00:00Z
    ...                   end=2024-01-15T14:00:00Z
    ...                   step=1m
    
    \${metrics_response}= GET On Session    monitoring    /api/v1/query_range    params=\${query_params}
    Should Be Equal       \${metrics_response.status_code}    200
    
    \${metrics_data}=     Set Variable    \${metrics_response.json()}
    Should Contain        \${metrics_data}    data
    Should Contain        \${metrics_data['data']}    result
    
    # Analizar patrones de request rate
    \${request_pattern}=  Analyze Request Pattern    \${metrics_data}
    \${peak_rps}=         Set Variable    \${request_pattern['peak_rps']}
    \${avg_rps}=          Set Variable    \${request_pattern['avg_rps']}
    \${growth_rate}=      Set Variable    \${request_pattern['growth_rate']}
    
    Should Be True        \${peak_rps} > 0
    Should Be True        \${avg_rps} > 0
    
    Set To Dictionary     \${SCALING_METRICS}    request_rate=\${avg_rps}
    
    # Predecir carga futura
    \${predicted_load}=   Evaluate    \${peak_rps} * (1 + \${growth_rate} / 100)
    \${required_pods}=    Calculate Required Pods    \${predicted_load}
    
    Log                   Current peak RPS: \${peak_rps}
    Log                   Predicted future load: \${predicted_load} RPS
    Log                   Estimated pods needed: \${required_pods}
    Set Global Variable   \${PREDICTED_PODS}    \${required_pods}

Configure Horizontal Pod Autoscaler
    [Documentation]    Configura HPA para scaling automático
    [Tags]             hpa    kubernetes    automation
    
    # Crear configuración HPA
    \${hpa_config}=       Create Dictionary
    ...                   apiVersion=autoscaling/v2
    ...                   kind=HorizontalPodAutoscaler
    ...                   metadata=@{[{'name': '\${APP_DEPLOYMENT}-hpa', 'namespace': '\${NAMESPACE}'}]}
    
    # Configurar target de scaling
    \${scale_target}=     Create Dictionary
    ...                   apiVersion=apps/v1
    ...                   kind=Deployment
    ...                   name=\${APP_DEPLOYMENT}
    
    \${hpa_spec}=         Create Dictionary
    ...                   scaleTargetRef=\${scale_target}
    ...                   minReplicas=\${MIN_REPLICAS}
    ...                   maxReplicas=\${MAX_REPLICAS}
    
    # Métricas para scaling decisions
    \${cpu_metric}=       Create Dictionary
    ...                   type=Resource
    ...                   resource=@{[{'name': 'cpu', 'target': {'type': 'Utilization', 'averageUtilization': \${TARGET_CPU_UTIL}}}]}
    
    \${memory_metric}=    Create Dictionary
    ...                   type=Resource
    ...                   resource=@{[{'name': 'memory', 'target': {'type': 'Utilization', 'averageUtilization': \${TARGET_MEM_UTIL}}}]}
    
    @{metrics}=           Create List    \${cpu_metric}    \${memory_metric}
    Set To Dictionary     \${hpa_spec}    metrics=\${metrics}
    Set To Dictionary     \${hpa_config}    spec=\${hpa_spec}
    
    # Aplicar configuración HPA
    \${hpa_yaml}=         Evaluate    yaml.dump(\${hpa_config})
    Create File           hpa_config.yaml    \${hpa_yaml}
    
    \${apply_result}=     Run Process    kubectl    apply    -f    hpa_config.yaml
    Should Be Equal       \${apply_result.rc}    0
    
    # Verificar HPA creado
    \${hpa_status}=       Run Process    kubectl    get    hpa    
    ...                   \${APP_DEPLOYMENT}-hpa    -n    \${NAMESPACE}
    Should Be Equal       \${hpa_status.rc}    0
    Should Contain        \${hpa_status.stdout}    \${APP_DEPLOYMENT}-hpa
    
    Log                   HPA configured successfully
    Log                   Min replicas: \${MIN_REPLICAS}
    Log                   Max replicas: \${MAX_REPLICAS}
    Log                   CPU target: \${TARGET_CPU_UTIL}%

Test Scaling Triggers
    [Documentation]    Simula carga para probar triggers de scaling
    [Tags]             scaling    testing    triggers
    
    # Obtener baseline de pods actual
    \${baseline_pods}=    Get Current Pod Count
    Log                   Baseline pods: \${baseline_pods}
    
    # Generar carga artificial para trigger scale-up
    Create Session        loadgen    http://app.company.com
    
    # Ejecutar load test intensivo por 5 minutos
    FOR    \${minute}    IN RANGE    5
        FOR    \${request}    IN RANGE    100
            \${response}=  GET On Session    loadgen    /api/heavy-computation    timeout=1    expected_status=any
            # Continuar aunque algunas requests fallen
        END
        
        # Verificar scaling cada minuto
        \${current_pods}=  Get Current Pod Count
        Log                Minute \${minute}: \${current_pods} pods active
        
        # Verificar métricas de scaling
        \${hpa_status}=    Run Process    kubectl    get    hpa    
        ...                \${APP_DEPLOYMENT}-hpa    -n    \${NAMESPACE}    -o    json
        Should Be Equal    \${hpa_status.rc}    0
        
        \${hpa_data}=      Evaluate    json.loads(r'''\${hpa_status.stdout}''')
        \${current_cpu}=   Set Variable    \${hpa_data['status']['currentCPUUtilizationPercentage']}
        
        Log                Current CPU utilization: \${current_cpu}%
        
        # Si CPU > threshold, debería estar escalando
        Run Keyword If     \${current_cpu} > \${SCALE_UP_THRESHOLD}
        ...                Verify Scaling In Progress    \${current_pods}    \${baseline_pods}
        
        Sleep              60s
    END
    
    # Verificar que scaling ocurrió
    \${final_pods}=       Get Current Pod Count
    Should Be True        \${final_pods} > \${baseline_pods}
    Log                   Scaling test completed: \${baseline_pods} -> \${final_pods} pods

Validate Scaling Performance
    [Documentation]    Valida que scaling mejora performance efectivamente
    [Tags]             validation    performance    effectiveness
    
    # Medir performance antes de scaling down
    \${pre_scale_metrics}= Measure Application Performance    30
    
    # Forzar scale down temporal para comparación
    \${scale_down_result}= Run Process    kubectl    scale    deployment    
    ...                    \${APP_DEPLOYMENT}    --replicas=\${MIN_REPLICAS}    -n    \${NAMESPACE}
    Should Be Equal        \${scale_down_result.rc}    0
    
    Sleep                  60s    # Esperar que pods terminen
    
    # Medir performance con menos recursos
    \${post_scale_metrics}= Measure Application Performance    30
    
    # Restaurar HPA automático
    \${restore_result}=    Run Process    kubectl    patch    hpa    
    ...                    \${APP_DEPLOYMENT}-hpa    -n    \${NAMESPACE}    
    ...                    -p    {"spec":{"minReplicas":\${MIN_REPLICAS}}}
    Should Be Equal        \${restore_result.rc}    0
    
    # Comparar métricas de performance
    \${response_time_diff}= Evaluate    
    ...    \${post_scale_metrics['avg_response']} - \${pre_scale_metrics['avg_response']}
    \${throughput_diff}=   Evaluate    
    ...    \${pre_scale_metrics['throughput']} - \${post_scale_metrics['throughput']}
    
    # Validar que scaling mejora performance
    Should Be True         \${response_time_diff} > 0
    Should Be True         \${throughput_diff} > 0
    
    Log                    Performance validation completed
    Log                    Response time impact: +\${response_time_diff}ms when under-scaled
    Log                    Throughput impact: -\${throughput_diff} RPS when under-scaled

Generate Capacity Planning Report
    [Documentation]    Genera reporte de capacity planning para stakeholders
    [Tags]             reporting    planning    documentation
    
    # Compilar datos de análisis
    \${capacity_data}=    Create Dictionary
    ...                   current_pods=\${CURRENT_PODS}
    ...                   predicted_need=\${PREDICTED_PODS}
    ...                   scaling_metrics=\${SCALING_METRICS}
    ...                   analysis_date=\${CURRENT_DATE}
    
    # Calcular recomendaciones de capacity
    \${recommendations}=  Generate Capacity Recommendations    \${capacity_data}
    Set To Dictionary     \${capacity_data}    recommendations=\${recommendations}
    
    # Estimar costos de infraestructura
    \${cost_analysis}=    Calculate Infrastructure Costs    \${capacity_data}
    Set To Dictionary     \${capacity_data}    cost_analysis=\${cost_analysis}
    
    # Generar proyecciones futuras
    \${projections}=      Generate Growth Projections    \${capacity_data}
    Set To Dictionary     \${capacity_data}    projections=\${projections}
    
    # Crear reporte ejecutivo
    \${executive_report}= Create Executive Summary    \${capacity_data}
    \${technical_report}= Create Technical Analysis   \${capacity_data}
    
    # Guardar reportes
    \${exec_html}=        Render Executive Report    \${executive_report}
    \${tech_html}=        Render Technical Report    \${technical_report}
    \${data_json}=        Evaluate    json.dumps(\${capacity_data}, indent=2)
    
    Create File           capacity_executive_report.html    \${exec_html}
    Create File           capacity_technical_report.html    \${tech_html}
    Create File           \${CAPACITY_REPORT}    \${data_json}
    
    File Should Exist     capacity_executive_report.html
    File Should Exist     capacity_technical_report.html
    File Should Exist     \${CAPACITY_REPORT}
    
    Log                   Capacity planning reports generated
    Log                   Current utilization: CPU \${SCALING_METRICS.cpu_usage}%, Memory \${SCALING_METRICS.memory_usage}MB
    Log                   Recommended min pods: \${recommendations['min_pods']}
    Log                   Recommended max pods: \${recommendations['max_pods']}

*** Keywords ***
Initialize Capacity Planning
    Log                   📊 Initializing capacity planning analysis
    Set Global Variable   \${CURRENT_DATE}    2024-01-15

Parse Resource Metrics
    [Arguments]           \${kubectl_output}
    \${metrics}=          Create List    @{[{'cpu': 45, 'memory': 256}, {'cpu': 52, 'memory': 289}]}
    RETURN                \${metrics}

Calculate Average
    [Arguments]           \${metrics_list}    \${metric_type}
    \${average}=          Set Variable    48.5
    RETURN                \${average}

Analyze Request Pattern
    [Arguments]           \${metrics_data}
    \${pattern}=          Create Dictionary    peak_rps=850    avg_rps=420    growth_rate=15.5
    RETURN                \${pattern}

Calculate Required Pods
    [Arguments]           \${predicted_load}
    \${pods}=             Evaluate    max(2, int(\${predicted_load} / 200))
    RETURN                \${pods}

Get Current Pod Count
    \${count_result}=     Run Process    kubectl    get    pods    
    ...                   -n    \${NAMESPACE}    -l    app=\${APP_DEPLOYMENT}    
    ...                   --field-selector=status.phase=Running    --no-headers
    @{pod_lines}=         Split To Lines    \${count_result.stdout}
    \${count}=            Get Length    \${pod_lines}
    RETURN                \${count}

Verify Scaling In Progress
    [Arguments]           \${current}    \${baseline}
    \${scaling_up}=       Evaluate    \${current} > \${baseline}
    Should Be True        \${scaling_up}
    Log                   Scaling verified: \${current} > \${baseline} pods

Measure Application Performance
    [Arguments]           \${duration_seconds}
    \${metrics}=          Create Dictionary    avg_response=450    throughput=285
    RETURN                \${metrics}

Generate Capacity Recommendations
    [Arguments]           \${data}
    \${recommendations}=  Create Dictionary    min_pods=3    max_pods=15    target_cpu=75
    RETURN                \${recommendations}

Calculate Infrastructure Costs
    [Arguments]           \${data}
    \${costs}=            Create Dictionary    monthly_min=450    monthly_max=2250    savings_hpa=35
    RETURN                \${costs}

Generate Growth Projections
    [Arguments]           \${data}
    \${projections}=      Create Dictionary    six_months=12    one_year=18    two_years=28
    RETURN                \${projections}

Create Executive Summary
    [Arguments]           \${data}
    \${summary}=          Set Variable    Executive capacity planning summary
    RETURN                \${summary}

Create Technical Analysis
    [Arguments]           \${data}
    \${analysis}=         Set Variable    Technical capacity analysis details
    RETURN                \${analysis}

Render Executive Report
    [Arguments]           \${summary}
    \${html}=             Set Variable    <html><body><h1>Capacity Planning - Executive Summary</h1></body></html>
    RETURN                \${html}

Render Technical Report
    [Arguments]           \${analysis}
    \${html}=             Set Variable    <html><body><h1>Technical Capacity Analysis</h1></body></html>
    RETURN                \${html}

Archive Capacity Analysis
    Log                   📁 Archiving capacity planning analysis and configurations</code></pre>
        
        <h3>🎯 Práctica Capacity (7 min):</h3>
        <p>1. Configura Horizontal Pod Autoscaler en Kubernetes</p>
        <p>2. Analiza patrones históricos de carga de tu aplicación</p>
        <p>3. Implementa métricas personalizadas para scaling decisions</p>
        <p>4. Crea load tests para probar triggers de scaling</p>
        <p>5. Configura alertas de capacity planning en Grafana</p>
        <p>6. Calcula costos de infraestructura por diferentes niveles</p>
        <p>7. Genera proyecciones de crecimiento automáticamente</p>
        <p>8. Implementa scaling preventivo basado en predicciones</p>
        <p>9. Documenta runbook de capacity emergency procedures</p>
        <p>10. Crea dashboard ejecutivo con métricas de capacity</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar capacity planning automático con HPA</li>
                <li>Predecir necesidades futuras de infraestructura</li>
                <li>Validar efectividad del scaling automático</li>
                <li>Generar reportes ejecutivos de capacity y costos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa métricas custom en HPA: kubectl autoscale deployment app --cpu-percent=70 --min=2 --max=20 para scaling inteligente.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 209 - Performance monitoring en producción</h3>
        <p>Con capacity planning automatizado, implementarás monitoreo avanzado de performance en producción con alertas proactivas.</p>
    `,
    topics: ["performance", "load", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "advanced",
    prerequisites: ["lesson-207"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_208 = LESSON_208;
}