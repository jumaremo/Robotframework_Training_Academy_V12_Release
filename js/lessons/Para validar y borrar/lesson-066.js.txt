const LESSON_066 = {
    id: 66,
    title: "Ejercicio: Algoritmo de validación",
    duration: "10 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>🎓 Algoritmo Validation</h2>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar todas las estructuras de control de flujo en un algoritmo real</li>
                <li>Implementar validación robusta con manejo de errores y retry patterns</li>
                <li>Combinar FOR, WHILE, IF/ELSE, TRY/EXCEPT en sistema complejo</li>
                <li>Crear reportes estadísticos automatizados con métricas de validación</li>
            </ul>
        </div>

        <h3>💻 Código Completo:</h3>
        <pre><code class="robot">
*** Variables ***
@{USUARIOS_SISTEMA}      admin    user123    guest    moderator    user_test    invalid@user
@{PASSWORDS_SISTEMA}     Admin123!    pass123    12345    ModPass!    test123    weak
@{EMAILS_SISTEMA}        admin@test.com    user@example.com    guest@site.org    mod@system.net    test@invalid    notanemail
@{EDADES_SISTEMA}        30    25    17    35    22    -5
@{ROLES_SISTEMA}         admin    user    guest    moderator    user    invalid_role

&{VALIDATION_CONFIG}     min_password_length=8    require_special_chars=True    min_age=18    max_retry_attempts=3    
...                      valid_roles=admin,user,guest,moderator    email_domains=test.com,example.com,site.org,system.net

*** Keywords ***
Algoritmo Validacion Completa
    \\\${usuarios_validos}=    Set Variable    0
    \\\${usuarios_invalidos}=    Set Variable    0
    \\\${total_validaciones}=    Set Variable    0
    @{reporte_validacion}=    Create List
    &{estadisticas}=    Create Dictionary    passwords_weak=0    emails_invalid=0    ages_under=0    roles_invalid=0
    
    Log    [INICIO] Algoritmo de validación completa iniciado
    Log    [CONFIG] Configuración: &{VALIDATION_CONFIG}
    
    FOR    \\\${i}    IN RANGE    len(\\\${USUARIOS_SISTEMA})
        \\\${total_validaciones}=    Evaluate    \\\${total_validaciones} + 1
        
        \\\${usuario}=    Get From List    \\\${USUARIOS_SISTEMA}    \\\${i}
        \\\${password}=    Get From List    \\\${PASSWORDS_SISTEMA}    \\\${i}
        \\\${email}=    Get From List    \\\${EMAILS_SISTEMA}    \\\${i}
        \\\${edad}=    Get From List    \\\${EDADES_SISTEMA}    \\\${i}
        \\\${rol}=    Get From List    \\\${ROLES_SISTEMA}    \\\${i}
        
        Log    [VALIDACION \\\${i}] Usuario: \\\${usuario}, Email: \\\${email}, Edad: \\\${edad}, Rol: \\\${rol}
        
        \\\${validacion_exitosa}=    Set Variable    True
        @{errores_usuario}=    Create List
        \\\${intentos_validacion}=    Set Variable    0
        
        WHILE    \\\${intentos_validacion} < \\\${VALIDATION_CONFIG.max_retry_attempts} and \\\${validacion_exitosa}
            \\\${intentos_validacion}=    Evaluate    \\\${intentos_validacion} + 1
            Log    [RETRY] Intento de validación \\\${intentos_validacion} para usuario \\\${usuario}
            
            TRY
                \\\${username_valido}=    Validar Username Complejo    \\\${usuario}
                IF    not \\\${username_valido}
                    Append To List    \\\${errores_usuario}    username_invalid
                    \\\${validacion_exitosa}=    Set Variable    False
                END
                
                \\\${password_score}=    Validar Password Seguridad    \\\${password}
                IF    \\\${password_score} < 3
                    Append To List    \\\${errores_usuario}    password_weak
                    \\\${estadisticas.passwords_weak}=    Evaluate    \\\${estadisticas.passwords_weak} + 1
                    \\\${validacion_exitosa}=    Set Variable    False
                END
                
                \\\${email_resultado}=    Validar Email Formato    \\\${email}
                IF    not \\\${email_resultado}
                    Append To List    \\\${errores_usuario}    email_invalid
                    \\\${estadisticas.emails_invalid}=    Evaluate    \\\${estadisticas.emails_invalid} + 1
                    \\\${validacion_exitosa}=    Set Variable    False
                END
                
                IF    \\\${edad} < \\\${VALIDATION_CONFIG.min_age}
                    Append To List    \\\${errores_usuario}    age_under_minimum
                    \\\${estadisticas.ages_under}=    Evaluate    \\\${estadisticas.ages_under} + 1
                    \\\${validacion_exitosa}=    Set Variable    False
                ELSE IF    \\\${edad} < 0
                    Append To List    \\\${errores_usuario}    age_negative
                    \\\${validacion_exitosa}=    Set Variable    False
                END
                
                @{roles_validos}=    Split String    \\\${VALIDATION_CONFIG.valid_roles}    ,
                \\\${rol_encontrado}=    Set Variable    False
                FOR    \\\${rol_valido}    IN    @{roles_validos}
                    IF    '\\\${rol}' == '\\\${rol_valido}'
                        \\\${rol_encontrado}=    Set Variable    True
                        BREAK
                    END
                END
                
                IF    not \\\${rol_encontrado}
                    Append To List    \\\${errores_usuario}    role_invalid
                    \\\${estadisticas.roles_invalid}=    Evaluate    \\\${estadisticas.roles_invalid} + 1
                    \\\${validacion_exitosa}=    Set Variable    False
                END
                
                IF    \\\${validacion_exitosa}
                    Log    [SUCCESS] Usuario \\\${usuario} validado exitosamente en intento \\\${intentos_validacion}
                    BREAK
                ELSE
                    Log    [ERROR] Validación fallida para \\\${usuario} en intento \\\${intentos_validacion}: @{errores_usuario}
                    IF    \\\${intentos_validacion} < \\\${VALIDATION_CONFIG.max_retry_attempts}
                        Log    [RETRY] Reintentando validación para \\\${usuario}
                        \\\${validacion_exitosa}=    Set Variable    True
                        @{errores_usuario}=    Create List
                    END
                END
                
            EXCEPT    AS    \\\${error_validacion}
                Log    [EXCEPTION] Error durante validación de \\\${usuario}: \\\${error_validacion}
                Append To List    \\\${errores_usuario}    system_error
                \\\${validacion_exitosa}=    Set Variable    False
                BREAK
            END
        END
        
        IF    \\\${validacion_exitosa}
            \\\${usuarios_validos}=    Evaluate    \\\${usuarios_validos} + 1
            \\\${reporte_linea}=    Set Variable    ✅ \\\${usuario}: VÁLIDO (intentos: \\\${intentos_validacion})
        ELSE
            \\\${usuarios_invalidos}=    Evaluate    \\\${usuarios_invalidos} + 1
            \\\${errores_str}=    Evaluate    ', '.join(@{errores_usuario})
            \\\${reporte_linea}=    Set Variable    ❌ \\\${usuario}: INVÁLIDO - Errores: \\\${errores_str}
        END
        
        Append To List    \\\${reporte_validacion}    \\\${reporte_linea}
        Log    \\\${reporte_linea}
    END
    
    Generar Reporte Final Validacion    \\\${usuarios_validos}    \\\${usuarios_invalidos}    \\\${total_validaciones}    
    ...    \\\${reporte_validacion}    \\\${estadisticas}
    
    Should Be True    \\\${total_validaciones} > 0
    Should Be Equal As Numbers    \\\${usuarios_validos} + \\\${usuarios_invalidos}    \\\${total_validaciones}
    
Validar Username Complejo
    [Arguments]    \\\${username}
    
    Log    [DEBUG] Validando username: \\\${username}
    
    FOR    \\\${validacion}    IN    length    characters    reserved_words    format
        IF    '\\\${validacion}' == 'length'
            IF    len('\\\${username}') < 3 or len('\\\${username}') > 20
                Log    [ERROR] Username length inválido: \\\${username}
                [Return]    False
            END
            
        ELSE IF    '\\\${validacion}' == 'characters'
            IF    '@' in '\\\${username}' or '#' in '\\\${username}' or '\\\${username}'.startswith('_')
                Log    [ERROR] Username contiene caracteres inválidos: \\\${username}
                [Return]    False
            END
            
        ELSE IF    '\\\${validacion}' == 'reserved_words'
            @{reserved}=    Create List    admin    root    system    null    undefined
            FOR    \\\${reserved_word}    IN    @{reserved}
                IF    '\\\${reserved_word}' in '\\\${username}'.lower()
                    IF    '\\\${username}' == 'admin'
                        Log    [INFO] Admin username permitido: \\\${username}
                        CONTINUE
                    ELSE
                        Log    [ERROR] Username contiene palabra reservada: \\\${username}
                        [Return]    False
                    END
                END
            END
            
        ELSE IF    '\\\${validacion}' == 'format'
            \\\${first_char}=    Get Substring    \\\${username}    0    1
            IF    not '\\\${first_char}'.isalpha()
                Log    [ERROR] Username debe empezar con letra: \\\${username}
                [Return]    False
            END
        END
    END
    
    Log    [SUCCESS] Username válido: \\\${username}
    [Return]    True
    
Validar Password Seguridad
    [Arguments]    \\\${password}
    
    \\\${score}=    Set Variable    0
    Log    [DEBUG] Evaluando seguridad de password
    
    IF    len('\\\${password}') >= \\\${VALIDATION_CONFIG.min_password_length}
        \\\${score}=    Evaluate    \\\${score} + 1
        Log    [DEBUG] +1 punto por longitud adecuada
    END
    
    FOR    \\\${char}    IN    A    B    C    D    E    F    G    H    I    J    K    L    M    N    O    P    Q    R    S    T    U    V    W    X    Y    Z
        IF    '\\\${char}' in '\\\${password}'
            \\\${score}=    Evaluate    \\\${score} + 1
            Log    [DEBUG] +1 punto por mayúscula
            BREAK
        END
    END
    
    FOR    \\\${num}    IN RANGE    10
        IF    '\\\${num}' in '\\\${password}'
            \\\${score}=    Evaluate    \\\${score} + 1
            Log    [DEBUG] +1 punto por número
            BREAK
        END
    END
    
    FOR    \\\${special}    IN    !    @    #    $    %    ^    &    *
        IF    '\\\${special}' in '\\\${password}'
            \\\${score}=    Evaluate    \\\${score} + 1
            Log    [DEBUG] +1 punto por carácter especial
            BREAK
        END
    END
    
    IF    len('\\\${password}') > 12
        \\\${score}=    Evaluate    \\\${score} + 1
        Log    [DEBUG] +1 punto bonus por longitud > 12
    END
    
    Log    [RESULT] Password score: \\\${score}/5
    [Return]    \\\${score}
    
Validar Email Formato
    [Arguments]    \\\${email}
    
    Log    [DEBUG] Validando email: \\\${email}
    
    TRY
        IF    '@' not in '\\\${email}' or '.' not in '\\\${email}'
            Log    [ERROR] Email formato básico inválido: \\\${email}
            [Return]    False
        END
        
        @{email_parts}=    Split String    \\\${email}    @
        \\\${email_parts_count}=    Get Length    \\\${email_parts}
        IF    \\\${email_parts_count} != 2
            Log    [ERROR] Email debe tener exactamente un @: \\\${email}
            [Return]    False
        END
        
        \\\${local_part}=    Get From List    \\\${email_parts}    0
        \\\${domain_part}=    Get From List    \\\${email_parts}    1
        
        IF    len('\\\${local_part}') < 1
            Log    [ERROR] Parte local del email vacía: \\\${email}
            [Return]    False
        END
        
        @{dominios_validos}=    Split String    \\\${VALIDATION_CONFIG.email_domains}    ,
        \\\${dominio_valido}=    Set Variable    False
        
        FOR    \\\${dominio}    IN    @{dominios_validos}
            IF    '\\\${domain_part}' == '\\\${dominio}'
                \\\${dominio_valido}=    Set Variable    True
                Log    [DEBUG] Dominio válido encontrado: \\\${dominio}
                BREAK
            END
        END
        
        IF    not \\\${dominio_valido}
            Log    [ERROR] Dominio no permitido: \\\${domain_part}
            [Return]    False
        END
        
        Log    [SUCCESS] Email válido: \\\${email}
        [Return]    True
        
    EXCEPT    AS    \\\${error}
        Log    [ERROR] Error validando email \\\${email}: \\\${error}
        [Return]    False
    END
    
Generar Reporte Final Validacion
    [Arguments]    \\\${validos}    \\\${invalidos}    \\\${total}    \\\${reporte_detalle}    \\\${stats}
    
    Log    ==================== REPORTE FINAL DE VALIDACIÓN ====================
    Log    📊 ESTADÍSTICAS GENERALES:
    Log    ✅ Usuarios válidos: \\\${validos}
    Log    ❌ Usuarios inválidos: \\\${invalidos}
    Log    📈 Total procesados: \\\${total}
    \\\${porcentaje_exito}=    Evaluate    round((\\\${validos} / \\\${total}) * 100, 2)
    Log    🎯 Porcentaje de éxito: \\\${porcentaje_exito}%
    Log    
    Log    🔍 ESTADÍSTICAS DE ERRORES:
    Log    🔐 Passwords débiles: \\\${stats.passwords_weak}
    Log    📧 Emails inválidos: \\\${stats.emails_invalid}
    Log    👶 Edades menores: \\\${stats.ages_under}
    Log    👤 Roles inválidos: \\\${stats.roles_invalid}
    Log    
    Log    📝 DETALLE POR USUARIO:
    FOR    \\\${linea_reporte}    IN    @{reporte_detalle}
        Log    \\\${linea_reporte}
    END
    Log    =====================================================================
    
    Should Be True    \\\${validos} >= 0
    Should Be True    \\\${invalidos} >= 0
    Should Be Equal As Numbers    \\\${validos} + \\\${invalidos}    \\\${total}

*** Test Cases ***
Ejercicio Algoritmo Validacion Completo
    [Tags]    integration    final_exercise    control_flow
    
    Log    🚀 INICIANDO EJERCICIO FINAL - ALGORITMO DE VALIDACIÓN COMPLETO
    
    Algoritmo Validacion Completa
    
    Log    ✅ EJERCICIO COMPLETADO - Algoritmo de validación ejecutado exitosamente
    Log    🎓 SECCIÓN 5 COMPLETADA - Control de Flujo dominado completamente
        </code></pre>
        
        <h3>🎯 Práctica (8 min):</h3>
        <ol>
            <li>Analiza arrays con usuarios, passwords, emails, edades, roles</li>
            <li>Configura diccionario con parámetros de validación del sistema</li>
            <li>Implementa keyword 'Algoritmo Validacion Completa' integrador</li>
            <li>Usa FOR principal para iterar todos los usuarios</li>
            <li>Extrae datos sincronizados con Get From List</li>
            <li>Implementa WHILE con retry pattern para validaciones</li>
            <li>Combina TRY/EXCEPT para manejo robusto de errores</li>
            <li>Ejecuta múltiples validaciones con IF/ELSE IF complejos</li>
            <li>Usa BREAK y CONTINUE en loops anidados</li>
            <li>Implementa 'Validar Username Complejo' con múltiples checks</li>
            <li>Aplica validación de longitud, caracteres, palabras reservadas</li>
            <li>Usa CONTINUE para skip validaciones específicas</li>
            <li>Define 'Validar Password Seguridad' con scoring system</li>
            <li>Implementa loops para verificar mayúsculas, números, caracteres</li>
            <li>Usa BREAK cuando encuentre primer match</li>
            <li>Crea 'Validar Email Formato' con parsing y dominio check</li>
            <li>Aplica TRY/EXCEPT para capturar errores de parsing</li>
            <li>Valida dominios permitidos con loop y BREAK pattern</li>
            <li>Implementa 'Generar Reporte Final Validacion' completo</li>
            <li>Calcula estadísticas, porcentajes y métricas del sistema</li>
            <li>Usa FOR para mostrar detalle completo de cada usuario</li>
            <li>Mantiene diccionarios y listas para tracking de estados</li>
            <li>Ejecuta test case final integrando TODAS las estructuras</li>
            <li>Verifica que algoritmo procese casos válidos e inválidos</li>
            <li>Confirma que reporte final muestre estadísticas precisas</li>
        </ol>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Este algoritmo integra TODAS las estructuras de control: FOR, WHILE, IF/ELSE IF, TRY/EXCEPT, BREAK, CONTINUE. Patrón perfecto para validaciones enterprise con retry logic.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 067</h3>
        <p>Avanzamos a SeleniumLibrary aplicando estos patrones de validación en interfaces web.</p>
    `,
    topics: ["algorithm", "validation", "exercise"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-065"],
    type: "integration"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_066 = LESSON_066;
}