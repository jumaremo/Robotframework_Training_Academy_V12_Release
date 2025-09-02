/**
 * Robot Framework Academy - Lesson 186
 * Reporting 186
 */

const LESSON_186 = {
    id: 186,
    title: "Reporting 186",
    duration: "7 min",
    level: "intermediate",
    section: "section-14",
    content: `
        <h2>📈 Data Visualization Interactiva</h2>
        <p>Implementa storytelling con datos, visualizaciones interactivas y reportes que faciliten toma de decisiones ejecutivas.</p>
        
        <h3>💻 Visualización avanzada interactiva:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/InteractiveVisualizationLibrary.py

*** Variables ***
\${CHART_TYPES}     ["interactive_line", "drill_down_bar", "real_time_gauge", "animated_scatter"]
\${DATA_SOURCES}    ["test_metrics", "performance_data", "user_behavior", "system_health"]
\${STORY_TEMPLATE}  executive_narrative
\${INTERACTION_LEVEL} high
\${UPDATE_FREQUENCY} 30
\${EXPORT_FORMATS}  ["svg", "png", "pdf", "interactive_html"]
\${COLOR_PALETTE}   ["#2E86AB", "#A23B72", "#F18F01", "#C73E1D"]

*** Test Cases ***
Test Interactive Chart Creation
    \${chart_engine}=    Initialize Interactive Chart Engine    types=\${CHART_TYPES}    responsiveness=true
    Should Be True    \${chart_engine}[initialized]
    Should Be Equal As Numbers    \${chart_engine}[chart_types_count]    4
    Should Be True    \${chart_engine}[responsive_design]
    \${line_chart}=    Create Interactive Line Chart    \${chart_engine}    data_source=test_metrics    zoom=true    filter=true
    Should Be True    \${line_chart}[created]
    Should Be True    \${line_chart}[zoom_enabled]
    Should Be True    \${line_chart}[filter_enabled]
    Should Contain    \${line_chart}[interactions]    hover_details
    \${drill_down_chart}=    Create Drill Down Bar Chart    \${chart_engine}    levels=["summary", "detailed", "granular"]
    Should Be True    \${drill_down_chart}[created]
    Should Be Equal As Numbers    \${drill_down_chart}[drill_levels]    3
    Should Contain    \${drill_down_chart}[navigation]    breadcrumbs
    Log    Interactive chart creation: \${line_chart}

Test Real Time Dashboard
    \${dashboard_engine}=    Create Real Time Dashboard    update_interval=\${UPDATE_FREQUENCY}    auto_refresh=true
    Should Be True    \${dashboard_engine}[created]
    Should Be Equal As Numbers    \${dashboard_engine}[update_interval]    \${UPDATE_FREQUENCY}
    Should Be True    \${dashboard_engine}[auto_refresh]
    \${gauge_widget}=    Add Real Time Gauge    \${dashboard_engine}    metric=cpu_usage    threshold_alerts=true
    Should Be True    \${gauge_widget}[added]
    Should Be True    \${gauge_widget}[threshold_alerts]
    Should Contain    \${gauge_widget}[alert_zones]    red_zone
    \${heatmap_widget}=    Add Performance Heatmap    \${dashboard_engine}    data=performance_data    interactive_tooltips=true
    Should Be True    \${heatmap_widget}[added]
    Should Be True    \${heatmap_widget}[interactive_tooltips]
    \${trend_widget}=    Add Animated Trend Chart    \${dashboard_engine}    animation_speed=smooth
    Should Be True    \${trend_widget}[added]
    Should Be Equal    \${trend_widget}[animation_speed]    smooth
    Log    Real time dashboard: \${dashboard_engine}

Test Data Storytelling Engine
    \${storytelling_engine}=    Initialize Data Storytelling    template=\${STORY_TEMPLATE}    narrative_flow=sequential
    Should Be True    \${storytelling_engine}[initialized]
    Should Be Equal    \${storytelling_engine}[template]    \${STORY_TEMPLATE}
    Should Be Equal    \${storytelling_engine}[narrative_flow]    sequential
    \${story_structure}=    Build Story Structure    \${storytelling_engine}    chapters=["situation", "insights", "recommendations"]
    Should Be True    \${story_structure}[built]
    Should Be Equal As Numbers    \${story_structure}[chapters_count]    3
    \${data_narrative}=    Generate Data Narrative    \${storytelling_engine}    data_sources=\${DATA_SOURCES}    tone=executive
    Should Be True    \${data_narrative}[generated]
    Should Contain    \${data_narrative}[content]    key_insights
    Should Contain    \${data_narrative}[content]    actionable_recommendations
    \${visual_story}=    Create Visual Story    \${storytelling_engine}    \${data_narrative}    interactive_elements=true
    Should Be True    \${visual_story}[created]
    Should Be True    \${visual_story}[interactive_elements]
    Should Contain    \${visual_story}[components]    annotated_charts
    Log    Data storytelling engine: \${data_narrative}

Test Decision Support Visualizations
    \${decision_engine}=    Create Decision Support Engine    analysis_depth=comprehensive    scenario_modeling=true
    Should Be True    \${decision_engine}[created]
    Should Be Equal    \${decision_engine}[analysis_depth]    comprehensive
    Should Be True    \${decision_engine}[scenario_modeling]
    \${comparison_matrix}=    Generate Comparison Matrix    \${decision_engine}    options=["option_a", "option_b", "option_c"]    criteria=["cost", "risk", "impact"]
    Should Be True    \${comparison_matrix}[generated]
    Should Be Equal As Numbers    \${comparison_matrix}[options_count]    3
    Should Be Equal As Numbers    \${comparison_matrix}[criteria_count]    3
    \${risk_visualization}=    Create Risk Assessment Chart    \${decision_engine}    probability_vs_impact=true    mitigation_overlay=true
    Should Be True    \${risk_visualization}[created]
    Should Be True    \${risk_visualization}[probability_vs_impact]
    Should Be True    \${risk_visualization}[mitigation_overlay]
    \${scenario_analysis}=    Build Scenario Analysis    \${decision_engine}    scenarios=["best_case", "worst_case", "most_likely"]
    Should Be True    \${scenario_analysis}[built]
    Should Be Equal As Numbers    \${scenario_analysis}[scenarios_count]    3
    Log    Decision support visualizations: \${comparison_matrix}

Test Interactive Export System
    \${export_engine}=    Initialize Interactive Export    formats=\${EXPORT_FORMATS}    quality=high
    Should Be True    \${export_engine}[initialized]
    Should Be Equal As Numbers    \${export_engine}[formats_count]    4
    Should Be Equal    \${export_engine}[quality]    high
    \${static_exports}=    Export Static Formats    \${export_engine}    charts=[\${line_chart}, \${drill_down_chart}]    formats=["svg", "png", "pdf"]
    Should Be True    \${static_exports}[exported]
    Should Be Equal As Numbers    \${static_exports}[files_generated]    6
    Should Contain    \${static_exports}[files]    chart_001.svg
    \${interactive_export}=    Export Interactive HTML    \${export_engine}    dashboard=\${dashboard_engine}    standalone=true
    Should Be True    \${interactive_export}[exported]
    Should Be True    \${interactive_export}[standalone]
    Should Contain    \${interactive_export}[features]    offline_functionality
    \${presentation_export}=    Create Presentation Package    \${export_engine}    story=\${visual_story}    format=powerpoint
    Should Be True    \${presentation_export}[created]
    Should Contain    \${presentation_export}[slides]    executive_summary
    Should Contain    \${presentation_export}[slides]    detailed_findings
    Log    Interactive export system: \${export_engine}</code></pre>
        
        <h3>🎯 Práctica visualización interactiva (5 min):</h3>
        <p>1. Crea InteractiveVisualizationLibrary.py con initialize_interactive_chart_engine()</p>
        <p>2. Implementa create_interactive_line_chart() con zoom, pan y filter capabilities</p>
        <p>3. Agrega create_drill_down_bar_chart() con múltiples niveles de detalle</p>
        <p>4. Crea create_real_time_dashboard() con WebSocket updates automáticos</p>
        <p>5. Implementa add_real_time_gauge() con threshold alerts visuales</p>
        <p>6. Agrega add_performance_heatmap() con tooltips interactivos</p>
        <p>7. Crea initialize_data_storytelling() con narrative flow templates</p>
        <p>8. Implementa build_story_structure() con chapters secuenciales</p>
        <p>9. Agrega generate_data_narrative() con tone adaptation automática</p>
        <p>10. Crea create_visual_story() con annotated charts y progression</p>
        <p>11. Implementa create_decision_support_engine() con scenario modeling</p>
        <p>12. Agrega generate_comparison_matrix() con weighted scoring</p>
        <p>13. Crea create_risk_assessment_chart() con probability vs impact</p>
        <p>14. Implementa initialize_interactive_export() con multiple formats</p>
        <p>15. Agrega export_interactive_html() con offline functionality</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear visualizaciones interactivas con drill-down y real-time updates</li>
                <li>Implementar data storytelling con narrative flow estructurado</li>
                <li>Desarrollar decision support tools con scenario analysis</li>
                <li>Exportar contenido interactivo en múltiples formatos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Las visualizaciones interactivas deben contar una historia progresiva. Usa drill-down para ir de overview a details, y siempre incluye context y call-to-action claros.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 187 - Reporting 187</h3>
        <p>Aprenderás integración con herramientas BI enterprise, conectores a sistemas corporativos y automatización de pipelines de datos para reporting.</p>
    `,
    topics: ["reporting", "analytics", "metrics"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-185"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_186 = LESSON_186;
}