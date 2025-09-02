/**
 * Robot Framework Academy - Lesson 176
 * Python Libraries 176
 */

const LESSON_176 = {
    id: 176,
    title: "Python Libraries 176",
    duration: "7 min",
    level: "intermediate",
    section: "section-13",
    content: `
        <h2>📊 ML y Data Analytics</h2>
        <p>Crea librerías con machine learning, análisis de datos y reportes automáticos usando pandas, scikit-learn y matplotlib.</p>
        
        <h3>💻 Analytics y ML avanzados:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/DataAnalyticsLibrary.py

*** Variables ***
\${CSV_FILE}        ./data/test_data.csv
\${MODEL_PATH}      ./models/test_model.pkl
\${REPORT_PATH}     ./reports/analytics_report.html
\${DATASET_SIZE}    1000
\${TRAIN_RATIO}     0.8
\${TEST_ACCURACY}   0.85
\${CHART_WIDTH}     800
\${CHART_HEIGHT}    600

*** Test Cases ***
Test Data Loading and Processing
    \${dataset}=    Load Dataset From CSV    \${CSV_FILE}    encoding=utf-8
    Should Be True    \${dataset}[loaded]
    Should Be True    \${dataset}[rows] > 0
    Should Be True    \${dataset}[columns] > 0
    \${cleaned_data}=    Clean Dataset    \${dataset}    remove_nulls=true    normalize=true
    Should Be True    \${cleaned_data}[cleaned]
    Should Be True    \${cleaned_data}[rows] <= \${dataset}[rows]
    Log    Data processing result: \${cleaned_data}

Test Statistical Analysis
    \${stats}=    Calculate Statistics    \${CSV_FILE}    columns=["price", "quantity", "total"]
    Should Contain    \${stats}    mean
    Should Contain    \${stats}    median
    Should Contain    \${stats}    std_dev
    Should Be True    \${stats}[mean][price] > 0
    \${correlation}=    Calculate Correlation Matrix    \${CSV_FILE}
    Should Be True    \${correlation}[calculated]
    Should Contain    \${correlation}[matrix]    price
    Log    Statistical analysis: \${stats}

Test Machine Learning Model
    \${model_data}=    Prepare ML Dataset    \${CSV_FILE}    target_column=target    test_size=\${TRAIN_RATIO}
    Should Be True    \${model_data}[prepared]
    Should Be Equal As Numbers    \${model_data}[train_size]    800
    Should Be Equal As Numbers    \${model_data}[test_size]    200
    \${trained_model}=    Train Classification Model    \${model_data}    algorithm=random_forest
    Should Be True    \${trained_model}[trained]
    Should Be True    \${trained_model}[accuracy] >= \${TEST_ACCURACY}
    Save ML Model    \${trained_model}    \${MODEL_PATH}
    Log    ML model training: \${trained_model}

Test Data Visualization
    \${histogram}=    Create Histogram    \${CSV_FILE}    column=price    bins=20    width=\${CHART_WIDTH}
    Should Be True    \${histogram}[created]
    Should Contain    \${histogram}[file_path]    histogram
    \${scatter_plot}=    Create Scatter Plot    \${CSV_FILE}    x_column=price    y_column=quantity
    Should Be True    \${scatter_plot}[created]
    Should Contain    \${scatter_plot}[file_path]    scatter
    \${correlation_heatmap}=    Create Correlation Heatmap    \${CSV_FILE}
    Should Be True    \${correlation_heatmap}[created]
    Log    Data visualization: \${histogram}

Test Automated Reporting
    \${report}=    Generate Analytics Report    \${CSV_FILE}    output_path=\${REPORT_PATH}
    Should Be True    \${report}[generated]
    Should Contain    \${report}[sections]    summary
    Should Contain    \${report}[sections]    statistics
    Should Contain    \${report}[sections]    visualizations
    Should Be True    \${report}[charts_count] >= 3
    \${pdf_report}=    Export Report To PDF    \${report}    output_file=analytics.pdf
    Should Be True    \${pdf_report}[exported]
    Log    Automated reporting: \${report}</code></pre>
        
        <h3>🎯 Práctica ML y analytics (5 min):</h3>
        <p>1. Crea DataAnalyticsLibrary.py con load_dataset_from_csv() usando pandas</p>
        <p>2. Implementa clean_dataset() con manejo de nulls y normalización</p>
        <p>3. Agrega calculate_statistics() para mean, median, std_dev, percentiles</p>
        <p>4. Crea calculate_correlation_matrix() usando pandas.corr()</p>
        <p>5. Implementa prepare_ml_dataset() con train_test_split de sklearn</p>
        <p>6. Agrega train_classification_model() usando RandomForestClassifier</p>
        <p>7. Crea save_ml_model() y load_ml_model() usando pickle</p>
        <p>8. Implementa create_histogram() usando matplotlib.pyplot</p>
        <p>9. Agrega create_scatter_plot() con customización de colores</p>
        <p>10. Crea create_correlation_heatmap() usando seaborn</p>
        <p>11. Implementa generate_analytics_report() con template HTML</p>
        <p>12. Agrega export_report_to_pdf() usando weasyprint o reportlab</p>
        <p>13. Usa @keyword decorator en todos los métodos públicos</p>
        <p>14. Implementa validación de tipos de datos en DataFrames</p>
        <p>15. Agrega progress tracking para operaciones ML intensivas</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Procesar datasets con pandas para análisis estadístico</li>
                <li>Implementar modelos ML con scikit-learn para clasificación</li>
                <li>Crear visualizaciones automáticas con matplotlib y seaborn</li>
                <li>Generar reportes HTML/PDF con insights automáticos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa pandas para manipulación de datos, sklearn para ML rápido, y matplotlib/seaborn para visualizaciones profesionales. Siempre valida datos antes de entrenar modelos.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 177 - Python Libraries 177</h3>
        <p>Explorarás librerías Python para testing de carga, stress testing y monitoreo de performance en aplicaciones web y APIs.</p>
    `,
    topics: ["python", "libraries", "custom"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-175"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_176 = LESSON_176;
}