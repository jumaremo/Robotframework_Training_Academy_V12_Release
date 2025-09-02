/**
 * Robot Framework Academy - Lesson 172
 * Python Libraries 172
 */

const LESSON_172 = {
    id: 172,
    title: "Python Libraries 172",
    duration: "7 min",
    level: "intermediate",
    section: "section-13",
    content: `
        <h2>🎨 Patrones Diseño Python</h2>
        <p>Implementa Singleton, Factory y Observer patterns para crear librerías Python escalables y mantenibles.</p>
        
        <h3>💻 Patrones diseño implementados:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/DesignPatternsLibrary.py

*** Variables ***
\${CONFIG_FILE}     ./config/app_config.json
\${DB_TYPE}         postgresql
\${API_TYPE}        rest
\${LOG_TYPE}        file
\${EVENT_NAME}      user_login
\${USER_DATA}       {"user_id": 123, "email": "test@example.com"}
\${NOTIFICATION}    {"type": "email", "message": "Welcome!"}

*** Test Cases ***
Test Singleton Pattern
    \${config1}=    Get Configuration Manager
    \${config2}=    Get Configuration Manager
    Should Be Equal    \${config1}[instance_id]    \${config2}[instance_id]
    Set Config Value    \${config1}    database_url    postgresql://localhost
    \${db_url}=    Get Config Value    \${config2}    database_url
    Should Be Equal    \${db_url}    postgresql://localhost
    Log    Singleton pattern working: \${config1}

Test Factory Pattern
    \${db_conn}=    Create Connection    \${DB_TYPE}    host=localhost    port=5432
    Should Be Equal    \${db_conn}[type]    postgresql
    Should Be Equal    \${db_conn}[host]    localhost
    \${api_client}=  Create Connection    \${API_TYPE}    base_url=https://api.example.com
    Should Be Equal    \${api_client}[type]    rest
    Should Contain     \${api_client}[base_url]    api.example.com
    Log    Factory pattern working: \${db_conn}

Test Observer Pattern
    \${publisher}=    Create Event Publisher
    \${subscriber1}=  Create Event Subscriber    email_notifier
    \${subscriber2}=  Create Event Subscriber    log_notifier
    Subscribe To Event    \${publisher}    \${EVENT_NAME}    \${subscriber1}
    Subscribe To Event    \${publisher}    \${EVENT_NAME}    \${subscriber2}
    Publish Event    \${publisher}    \${EVENT_NAME}    \${USER_DATA}
    \${notifications}=    Get Notifications    \${subscriber1}
    Should Contain    \${notifications}    user_login
    Log    Observer pattern working: \${notifications}

Test Strategy Pattern
    \${validator}=    Create Data Validator    strategy=strict
    \${result1}=    Validate Data    \${validator}    \${USER_DATA}
    Should Be True    \${result1}[valid]
    Should Be Equal   \${result1}[strategy]    strict
    \${validator2}=   Create Data Validator    strategy=lenient
    \${result2}=    Validate Data    \${validator2}    {"incomplete": "data"}
    Should Be True    \${result2}[valid]
    Should Be Equal   \${result2}[strategy]    lenient
    Log    Strategy pattern working: \${result1}

Test Builder Pattern
    \${builder}=    Create Report Builder
    Set Report Title    \${builder}    Test Execution Report
    Set Report Format   \${builder}    html
    Add Report Section  \${builder}    summary    Test Summary Data
    Add Report Section  \${builder}    details    Detailed Results
    \${report}=    Build Report    \${builder}
    Should Be Equal    \${report}[title]    Test Execution Report
    Should Be Equal    \${report}[format]    html
    Should Contain     \${report}[sections]    summary
    Log    Builder pattern working: \${report}</code></pre>
        
        <h3>🎯 Práctica patrones diseño (5 min):</h3>
        <p>1. Crea DesignPatternsLibrary.py con clase ConfigurationManager singleton</p>
        <p>2. Implementa get_configuration_manager() que retorne misma instancia</p>
        <p>3. Agrega ConnectionFactory con create_connection() para DB/API</p>
        <p>4. Crea EventPublisher/EventSubscriber para patrón Observer</p>
        <p>5. Implementa subscribe_to_event() y publish_event() con callbacks</p>
        <p>6. Agrega DataValidator con estrategias strict/lenient intercambiables</p>
        <p>7. Crea ReportBuilder con métodos set_title(), add_section(), build()</p>
        <p>8. Implementa __new__() en singleton para controlar instancias</p>
        <p>9. Usa factory methods que retornen objetos específicos por tipo</p>
        <p>10. Implementa lista de observers con notify_all() automático</p>
        <p>11. Agrega validation strategies como clases separadas</p>
        <p>12. Crea builder con validación de campos requeridos</p>
        <p>13. Prueba múltiples llamadas a singleton y valida misma instancia</p>
        <p>14. Verifica factory produzca objetos correctos según parámetros</p>
        <p>15. Confirma observers reciban notificaciones automáticamente</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar Singleton pattern para configuración global</li>
                <li>Usar Factory pattern para crear objetos dinámicamente</li>
                <li>Aplicar Observer pattern para notificaciones automáticas</li>
                <li>Combinar patrones para arquitecturas escalables</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Los patrones de diseño resuelven problemas específicos: Singleton para instancia única, Factory para creación dinámica, Observer para comunicación desacoplada.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 173 - Python Libraries 173</h3>
        <p>Explorarás decorators avanzados y metaclasses para crear librerías Python con funcionalidades automáticas y comportamientos dinámicos.</p>
    `,
    topics: ["python", "libraries", "custom"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-171"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_172 = LESSON_172;
}