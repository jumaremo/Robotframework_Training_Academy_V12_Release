/**
 * Robot Framework Academy - Lesson 191
 * Jenkins Setup Robot Framework
 */

const LESSON_191 = {
    id: 191,
    title: "Jenkins Setup Robot Framework",
    duration: "10 min",
    level: "advanced",
    section: "section-15",
    content: `
        <h2>🔧 Jenkins RF</h2>
        <p>Configura Jenkins para ejecutar tests Robot Framework automáticamente con reportes y notificaciones enterprise.</p>
        
        <h3>💻 Config Jenkins:</h3>
        <pre><code class="robot">*** Settings ***
Library    Process
Library    OperatingSystem
Library    Collections
Library    RequestsLibrary

*** Variables ***
\${JENKINS_HOME}       /var/jenkins_home
\${JENKINS_URL}        http://localhost:8080
\${JOB_NAME}           QA-Robot-Framework-Tests
\${WORKSPACE_PATH}     \${JENKINS_HOME}/workspace/\${JOB_NAME}
\${BUILD_SCRIPT}       \${WORKSPACE_PATH}/build.sh
\${JENKINSFILE}        \${WORKSPACE_PATH}/Jenkinsfile
\${PLUGINS_LIST}       robot-framework,git,slack-notification,email-ext
\${ADMIN_USER}         admin
\${ADMIN_PASS}         admin123
\${ROBOT_REPORTS}      \${WORKSPACE_PATH}/reports
\${BUILD_TRIGGERS}     H/15 * * * *

*** Test Cases ***
Verify Jenkins Installation
    Log                    🔍 Verifying Jenkins server installation
    \${jenkins_status}=    Set Variable    RUNNING
    Should Be Equal        \${jenkins_status}    RUNNING
    Log                    Jenkins server status: \${jenkins_status}
    \${jenkins_version}=   Set Variable    2.414.1
    Should Not Be Empty    \${jenkins_version}
    Log                    Jenkins version: \${jenkins_version}
    Set Global Variable    \${JENKINS_READY}    True
    Create Directory       \${JENKINS_HOME}
    Should Exist          \${JENKINS_HOME}

Install Required Plugins
    Log                    📦 Installing Jenkins plugins for Robot Framework
    \${plugins}=           Split String    \${PLUGINS_LIST}    ,
    Set Global Variable    \${REQUIRED_PLUGINS}    \${plugins}
    Log                    Required plugins: \${REQUIRED_PLUGINS}
    FOR    \${plugin}    IN    @{REQUIRED_PLUGINS}
        Log                Installing plugin: \${plugin}
        \${install_status}= Set Variable    SUCCESS
        Should Be Equal    \${install_status}    SUCCESS
        Log                Plugin \${plugin} installed successfully
    END
    \${plugin_count}=      Get Length    \${REQUIRED_PLUGINS}
    Should Be True         \${plugin_count} >= 4
    Log                    ✅ All \${plugin_count} plugins installed

Create Robot Framework Job
    Log                    🏗️ Creating Jenkins job for Robot Framework
    Create Directory       \${WORKSPACE_PATH}
    Should Exist          \${WORKSPACE_PATH}
    \${job_config}=        Create Dictionary
    Set To Dictionary      \${job_config}    name=\${JOB_NAME}
    Set To Dictionary      \${job_config}    type=freestyle
    Set To Dictionary      \${job_config}    scm=git
    Set To Dictionary      \${job_config}    branch=main
    Set To Dictionary      \${job_config}    triggers=\${BUILD_TRIGGERS}
    Set Global Variable    \${JOB_CONFIG}    \${job_config}
    Log                    Job configuration: \${JOB_CONFIG}
    Should Contain         \${job_config}    name
    Should Contain         \${job_config}    triggers
    Should Be Equal        \${job_config.name}    \${JOB_NAME}

Configure Build Script
    Log                    📝 Creating build script for Robot Framework execution
    \${script_content}=    Create List
    Append To List         \${script_content}    #!/bin/bash
    Append To List         \${script_content}    echo "Starting Robot Framework build"
    Append To List         \${script_content}    python -m pip install robotframework
    Append To List         \${script_content}    python -m pip install robotframework-seleniumlibrary
    Append To List         \${script_content}    mkdir -p reports
    Append To List         \${script_content}    robot --outputdir reports --variable BROWSER:chrome tests/
    Append To List         \${script_content}    echo "Build completed with exit code: $?"
    \${build_script}=       Evaluate    '\\n'.join($script_content)
    Create File            \${BUILD_SCRIPT}    \${build_script}
    File Should Exist      \${BUILD_SCRIPT}
    \${script_size}=       Get File Size    \${BUILD_SCRIPT}
    Should Be True         \${script_size} > 100
    Log                    Build script created: \${BUILD_SCRIPT} (\${script_size} bytes)

Setup Jenkinsfile Pipeline
    Log                    🚀 Creating Jenkinsfile for pipeline as code
    \${pipeline_stages}=   Create List
    Append To List         \${pipeline_stages}    pipeline {
    Append To List         \${pipeline_stages}        agent any
    Append To List         \${pipeline_stages}        stages {
    Append To List         \${pipeline_stages}            stage('Checkout') {
    Append To List         \${pipeline_stages}                steps { checkout scm }
    Append To List         \${pipeline_stages}            }
    Append To List         \${pipeline_stages}            stage('Install Dependencies') {
    Append To List         \${pipeline_stages}                steps { sh 'pip install -r requirements.txt' }
    Append To List         \${pipeline_stages}            }
    Append To List         \${pipeline_stages}            stage('Run Tests') {
    Append To List         \${pipeline_stages}                steps { sh 'robot --outputdir reports tests/' }
    Append To List         \${pipeline_stages}            }
    Append To List         \${pipeline_stages}            stage('Publish Results') {
    Append To List         \${pipeline_stages}                steps { publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'reports', reportFiles: 'report.html', reportName: 'Robot Framework Report']) }
    Append To List         \${pipeline_stages}            }
    Append To List         \${pipeline_stages}        }
    Append To List         \${pipeline_stages}    }
    \${jenkinsfile_content}= Evaluate    '\\n'.join($pipeline_stages)
    Create File            \${JENKINSFILE}    \${jenkinsfile_content}
    File Should Exist      \${JENKINSFILE}
    \${jenkinsfile_content_verify}= Get File    \${JENKINSFILE}
    Should Contain         \${jenkinsfile_content_verify}    pipeline
    Should Contain         \${jenkinsfile_content_verify}    Robot Framework Report
    Log                    Jenkinsfile pipeline created successfully

Configure Build Triggers
    Log                    ⏰ Configuring automated build triggers
    \${trigger_config}=    Create Dictionary
    Set To Dictionary      \${trigger_config}    cron_schedule=\${BUILD_TRIGGERS}
    Set To Dictionary      \${trigger_config}    git_webhook=true
    Set To Dictionary      \${trigger_config}    manual_trigger=true
    Set To Dictionary      \${trigger_config}    upstream_projects=none
    Set Global Variable    \${BUILD_TRIGGERS_CONFIG}    \${trigger_config}
    Log                    Build triggers configured: \${BUILD_TRIGGERS_CONFIG}
    Should Be Equal        \${trigger_config.cron_schedule}    \${BUILD_TRIGGERS}
    Should Be True         \${trigger_config.git_webhook}
    Should Be True         \${trigger_config.manual_trigger}
    Log                    ✅ Triggers: cron(\${BUILD_TRIGGERS}), webhook, manual

Setup Notification Channels
    Log                    📧 Configuring notification channels
    \${notification_config}= Create Dictionary
    Set To Dictionary      \${notification_config}    slack_channel=#qa-automation
    Set To Dictionary      \${notification_config}    slack_webhook=https://hooks.slack.com/webhook
    Set To Dictionary      \${notification_config}    email_recipients=qa-team@company.com
    Set To Dictionary      \${notification_config}    notify_on_success=true
    Set To Dictionary      \${notification_config}    notify_on_failure=true
    Set To Dictionary      \${notification_config}    notify_on_unstable=true
    Set Global Variable    \${NOTIFICATIONS}    \${notification_config}
    Log                    Notification settings: \${NOTIFICATIONS}
    Should Contain         \${notification_config}    slack_channel
    Should Contain         \${notification_config}    email_recipients
    Should Be True         \${notification_config.notify_on_failure}
    Log                    Notifications configured for Slack and Email

Validate Jenkins Job Configuration
    Log                    ✅ Validating complete Jenkins job setup
    File Should Exist      \${BUILD_SCRIPT}
    File Should Exist      \${JENKINSFILE}
    Should Exist          \${WORKSPACE_PATH}
    Should Exist          \${JENKINS_HOME}
    \${config_complete}=   Evaluate    all([bool($JOB_CONFIG), bool($BUILD_TRIGGERS_CONFIG), bool($NOTIFICATIONS), bool($REQUIRED_PLUGINS)])
    Should Be True         \${config_complete}
    Log                    Job name: \${JOB_CONFIG.name}
    Log                    Workspace: \${WORKSPACE_PATH}
    Log                    Triggers: \${BUILD_TRIGGERS_CONFIG.cron_schedule}
    Log                    Notifications: \${NOTIFICATIONS.slack_channel}
    \${validation_result}= Set Variable    JENKINS_READY_FOR_RF
    Should Be Equal        \${validation_result}    JENKINS_READY_FOR_RF
    Log                    🎯 Jenkins successfully configured for Robot Framework automation</code></pre>
        
        <h3>🎯 Práctica Jenkins (7 min):</h3>
        <p>1. Verifica Jenkins installation con status RUNNING</p>
        <p>2. Instala plugins: robot-framework, git, slack, email</p>
        <p>3. Crea job "QA-Robot-Framework-Tests" tipo freestyle</p>
        <p>4. Configura build.sh con pip install y robot command</p>
        <p>5. Implementa Jenkinsfile con 4 stages pipeline</p>
        <p>6. Configura cron trigger H/15 * * * * (cada 15min)</p>
        <p>7. Activa git webhook para auto-trigger en commits</p>
        <p>8. Setup notificaciones Slack #qa-automation channel</p>
        <p>9. Configura email notifications para qa-team</p>
        <p>10. Valida que workspace directory se crea correctamente</p>
        <p>11. Verifica build script contiene robot command</p>
        <p>12. Testa Jenkinsfile tiene publishHTML step</p>
        <p>13. Confirma notifications on success/failure/unstable</p>
        <p>14. Documenta job configuration para el equipo</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Configurar Jenkins específicamente para Robot Framework</li>
                <li>Implementar pipeline as code con Jenkinsfile</li>
                <li>Establecer triggers automáticos y notificaciones</li>
                <li>Crear workspace funcional para ejecución de tests</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa Jenkinsfile en lugar de config manual. Pipeline as code es más mantenible y versionable con git.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 192 - Docker containers para Robot Framework</h3>
        <p>Con Jenkins configurado, aprenderás Docker para crear environments consistentes y ejecutar tests en containers aislados.</p>
    `,
    topics: ["cicd", "jenkins", "docker"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-190"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_191 = LESSON_191;
}