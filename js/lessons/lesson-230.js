/**
 * Robot Framework Academy - Lesson 230
 * Listeners and Extensions
 */

const LESSON_230 = {
    id: 230,
    title: "Listeners and Extensions",
    duration: "15 min",
    level: "advanced",
    section: "section-19",
    content: `
        <h2>🔧 Listeners Extensions</h2>
        <p>Extensión avanzada de Robot Framework con listeners personalizados, hooks de eventos y extensions para funcionalidad customizada.</p>
        
        <h3>💻 Custom Listeners:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    Robot Framework Listeners and Extensions - Custom Hooks
Library          SeleniumLibrary
Library          RequestsLibrary
Library          Collections
Library          DateTime
Library          ./listeners/CustomTestListener.py
Library          ./listeners/PerformanceListener.py
Library          ./listeners/SecurityAuditListener.py
Variables        ../config/listener_config.yaml
Suite Setup      Initialize Listener Testing
Suite Teardown   Generate Listener Report

*** Variables ***
\${LISTENER_CONFIG}       /config/listeners.json
\${AUDIT_LOG_PATH}        /logs/security_audit.log
\${PERFORMANCE_LOG}       /logs/performance_metrics.log
\${CUSTOM_REPORT_PATH}    /reports/custom_execution.html
\${WEBHOOK_URL}           https://hooks.slack.com/services/webhook
\${NOTIFICATION_EMAIL}    qa-team@company.com
\${TEST_ENVIRONMENT}      staging
\${EXECUTION_ID}          exec_12345
\${LISTENER_VERSION}      v2.1.0
\${DEBUG_MODE}            true

*** Test Cases ***
Test Listener Event Hooks
    [Documentation]    Testing custom listener event hooks and callbacks
    [Tags]             listeners    hooks    events    custom
    
    # Test Start Event Hooks
    Start Test Event Trigger      test_start_event    metadata=\${TEST_METADATA}
    Validate Listener Response    test_start_event    callback_executed=true
    Check Event Timestamp         test_start_event    timestamp_recorded=true
    Verify Custom Attributes      test_start_event    custom_data_captured=true
    
    # Suite Level Event Testing
    Trigger Suite Start Event     suite_event         suite_name=ListenerTestSuite
    Validate Suite Setup Hook     suite_event         setup_completed=true
    Check Suite Variables Set     suite_event         variables_initialized=true
    
    # Keyword Event Hooks
    Execute Keyword With Hook     Log Message         message="Test Hook Execution"
    Validate Keyword Start Hook   Log Message         hook_triggered=true
    Check Keyword Arguments       Log Message         args_captured=["Test Hook Execution"]
    Validate Keyword End Hook     Log Message         execution_time_recorded=true
    
    # Test End Event Hooks
    Trigger Test End Event        test_end_event      status=PASS    message="Test completed"
    Validate End Event Handler    test_end_event      cleanup_executed=true
    Check Final Statistics        test_end_event      metrics_collected=true

Test Performance Monitoring Listener
    [Documentation]    Performance monitoring with custom listener integration
    [Tags]             performance    monitoring    metrics    automation
    
    # Performance Baseline Setup
    Initialize Performance Monitor    \${PERFORMANCE_LOG}    baseline_mode=true
    Set Performance Thresholds       response_time=500ms    memory=512MB    cpu=70%
    
    # Test Execution with Monitoring
    Execute Performance Test Case     slow_keyword_test    duration=2s
    Monitor Keyword Performance       slow_keyword_test    track_memory=true
    Check Performance Thresholds     slow_keyword_test    threshold_exceeded=false
    
    # Resource Usage Tracking
    Track CPU Usage During Test       cpu_intensive_test   cpu_monitoring=enabled
    Monitor Memory Consumption        memory_test          memory_tracking=enabled
    Check Database Connection Pool    db_test              connection_monitoring=enabled
    
    # Performance Alert Testing
    Simulate Performance Degradation performance_alert_test    response_time=2000ms
    Validate Performance Alert        performance_alert_test    alert_triggered=true
    Check Alert Notification         \${WEBHOOK_URL}          alert_delivered=true
    
    # Performance Report Generation
    Generate Performance Summary      \${PERFORMANCE_LOG}     format=json
    Validate Performance Metrics     \${PERFORMANCE_LOG}     all_tests_tracked=true
    Export Performance Dashboard      \${PERFORMANCE_LOG}     dashboard_updated=true

Test Security Audit Listener
    [Documentation]    Security audit listener for compliance and monitoring
    [Tags]             security    audit    compliance    logging
    
    # Security Event Initialization
    Initialize Security Audit        \${AUDIT_LOG_PATH}      audit_level=STRICT
    Configure Security Rules         \${AUDIT_LOG_PATH}      rules_loaded=true
    Set Compliance Standards         \${AUDIT_LOG_PATH}      standard=SOX_COMPLIANCE
    
    # Sensitive Data Access Monitoring
    Access Sensitive Endpoint        /api/users/sensitive    credentials=\${API_KEY}
    Validate Security Log Entry      sensitive_access        logged=true    user_tracked=true
    Check Data Access Authorization  sensitive_access        authorized=true
    
    # Security Violation Detection
    Attempt Unauthorized Access     /api/admin/restricted   credentials=invalid
    Validate Security Violation     unauthorized_attempt    violation_detected=true
    Check Security Alert Triggered  unauthorized_attempt    alert_sent=true
    
    # Audit Trail Validation
    Execute Privileged Operation     delete_user_data        user_id=test123
    Validate Audit Trail Entry      privileged_operation    audit_recorded=true
    Check Digital Signature         privileged_operation    signature_valid=true
    
    # Compliance Report Generation
    Generate Security Audit Report  \${AUDIT_LOG_PATH}       format=pdf
    Validate Compliance Status      \${AUDIT_LOG_PATH}       compliant=true
    Export Audit Evidence           \${AUDIT_LOG_PATH}       evidence_archived=true

Test Custom Extension Integration
    [Documentation]    Custom extension development and integration testing
    [Tags]             extensions    custom    integration    development
    
    # Extension Loading and Validation
    Load Custom Extension           CustomReportExtension   version=\${LISTENER_VERSION}
    Validate Extension Interface    CustomReportExtension   methods_available=true
    Check Extension Configuration   CustomReportExtension   config_loaded=true
    
    # Custom Keyword Extension
    Register Custom Keywords        CustomReportExtension   keywords_registered=5
    Test Custom Keyword             Generate Custom Report  params=\${REPORT_PARAMS}
    Validate Keyword Execution      Generate Custom Report  success=true
    
    # Extension Event Handling
    Trigger Extension Event         custom_event            event_data=\${EVENT_DATA}
    Process Extension Callback      custom_event            callback_handled=true
    Validate Extension Response     custom_event            response_valid=true
    
    # Extension Data Processing
    Process Extension Data          test_data_processing    input=\${TEST_DATA}
    Validate Data Transformation    test_data_processing    output_format=json
    Check Extension Output          test_data_processing    output_valid=true
    
    # Extension Cleanup Testing
    Cleanup Extension Resources     CustomReportExtension   cleanup_successful=true
    Validate Extension Unloading    CustomReportExtension   unloaded=true

Test Notification Integration
    [Documentation]    Notification system integration with listener hooks
    [Tags]             notifications    integration    webhooks    alerts
    
    # Notification System Setup
    Configure Notification Channels    slack=\${WEBHOOK_URL}    email=\${NOTIFICATION_EMAIL}
    Test Notification Connectivity     slack_channel           connection_ok=true
    Validate Email Configuration       email_channel           smtp_configured=true
    
    # Test Success Notifications
    Execute Successful Test Case       notification_test_pass  status=PASS
    Validate Success Notification     notification_test_pass  notification_sent=true
    Check Notification Content        notification_test_pass  contains_test_details=true
    
    # Test Failure Notifications
    Execute Failing Test Case         notification_test_fail  status=FAIL
    Validate Failure Alert           notification_test_fail  alert_triggered=true
    Check Failure Details            notification_test_fail  error_details_included=true
    
    # Critical Failure Escalation
    Simulate Critical Test Failure    critical_system_test    severity=CRITICAL
    Validate Escalation Triggered    critical_system_test    escalated=true
    Check Emergency Contacts         critical_system_test    emergency_notified=true
    
    # Notification Throttling Testing
    Generate Multiple Notifications  spam_test               count=100
    Validate Throttling Applied      spam_test               throttled=true
    Check Rate Limiting              spam_test               rate_limit_respected=true</code></pre>
        
        <h3>🎯 Práctica Listeners (12 min):</h3>
        <p>1. Crea custom listener class heredando de robot.api.TestListener</p>
        <p>2. Implementa hooks para start_test, end_test, start_keyword eventos</p>
        <p>3. Configura listener para capturar performance metrics automáticamente</p>
        <p>4. Desarrolla security audit listener para compliance tracking</p>
        <p>5. Implementa real-time notification system con Slack webhooks</p>
        <p>6. Configura custom reporting con HTML/JSON output formats</p>
        <p>7. Crea database integration listener para test results storage</p>
        <p>8. Implementa screenshot automation en test failures</p>
        <p>9. Desarrolla custom keyword extension con Python decorators</p>
        <p>10. Configura listener para CI/CD pipeline integration</p>
        <p>11. Implementa dynamic test data injection via listeners</p>
        <p>12. Crea custom test execution flow control con hooks</p>
        <p>13. Desarrolla automated bug reporting integration</p>
        <p>14. Implementa test environment cleanup automation</p>
        <p>15. Configura parallel execution coordination con listeners</p>
        <p>16. Crea custom analytics dashboard data collection</p>
        <p>17. Implementa test flakiness detection automation</p>
        <p>18. Desarrolla resource usage monitoring integration</p>
        <p>19. Configura automated test maintenance suggestions</p>
        <p>20. Implementa compliance reporting automation</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar desarrollo de listeners personalizados para Robot Framework</li>
                <li>Implementar hooks de eventos para automation avanzada</li>
                <li>Configurar extensions customizadas con funcionalidad específica</li>
                <li>Establecer integration patterns para enterprise workflows</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa listener interfaces con dependency injection pattern - permite testing unitario de listeners y facilita maintenance en proyectos grandes.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 231 - Custom Library Development</h3>
        <p>Profundizarás en desarrollo de librerías personalizadas con Python, incluyendo keyword decorators y advanced integration patterns.</p>
    `,
    topics: ["listeners", "extensions", "hooks"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 15,
    difficulty: "easy",
    prerequisites: ["lesson-229"],
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_230 = LESSON_230;
}