/**
 * Robot Framework Academy - Lesson 066
 * Ejercicio: Algoritmo de validación
 */

const LESSON_066 = {
    id: 66,
    title: "Ejercicio: Algoritmo de validación",
    duration: "10 min",
    level: "beginner",
    section: "section-05",
    content: `
        <h2>🧮 Algoritmo validación completo</h2>
        <p>Sistema de validación que combina todas las estructuras de control aprendidas.</p>
        
        <h3>💻 Sistema validación datos:</h3>
        <pre><code class="robot">*** Variables ***
\${MIN_AGE}          18
\${MAX_AGE}          100
\${MIN_PASSWORD}     8
\${MAX_ATTEMPTS}     3
\${VALID_DOMAINS}    gmail.com,yahoo.com,hotmail.com
\${ERROR_COUNT}      0
\${SUCCESS_COUNT}    0
\${CURRENT_USER}     usuario_test
@{USERS_LIST}        juan,maria,carlos,ana,luis
&{USER_DATA}         name=Juan  age=25  email=juan@gmail.com  password=test123456

*** Test Cases ***
Validar Edad Usuario
    \${age}=    Set Variable    25
    IF    \${age} < \${MIN_AGE}
        Log    Error: Usuario menor de edad
        Set Variable    \${ERROR_COUNT}    \${ERROR_COUNT + 1}
    ELSE IF    \${age} > \${MAX_AGE}
        Log    Error: Edad máxima excedida
        Set Variable    \${ERROR_COUNT}    \${ERROR_COUNT + 1}
    ELSE
        Log    Edad válida: \${age} años
        Set Variable    \${SUCCESS_COUNT}    \${SUCCESS_COUNT + 1}
    END
    Should Be True    \${age} >= \${MIN_AGE}

Validar Lista Usuarios
    FOR    \${user}    IN    @{USERS_LIST}
        Log    Procesando usuario: \${user}
        \${length}=    Get Length    \${user}
        IF    \${length} < 3
            Log    Error: Nombre muy corto para \${user}
            Set Variable    \${ERROR_COUNT}    \${ERROR_COUNT + 1}
        ELSE
            Log    Usuario válido: \${user}
            Set Variable    \${SUCCESS_COUNT}    \${SUCCESS_COUNT + 1}
        END
    END
    Should Be True    \${SUCCESS_COUNT} > 0

Validar Email Formato
    \${email}=    Set Variable    \${USER_DATA.email}
    \${contains_at}=    Run Keyword And Return Status    Should Contain    \${email}    @
    \${contains_dot}=    Run Keyword And Return Status    Should Contain    \${email}    .
    
    IF    not \${contains_at}
        Log    Error: Email sin @
        Fail    Email inválido
    END
    
    IF    not \${contains_dot}
        Log    Error: Email sin dominio
        Fail    Email inválido
    END
    
    Log    Email válido: \${email}
    Should Contain    \${email}    @
    Should Contain    \${email}    .

Validar Password Seguridad
    \${password}=    Set Variable    \${USER_DATA.password}
    \${length}=    Get Length    \${password}
    \${attempts}=    Set Variable    0
    
    WHILE    \${attempts} < \${MAX_ATTEMPTS}
        \${attempts}=    Evaluate    \${attempts} + 1
        
        IF    \${length} < \${MIN_PASSWORD}
            Log    Intento \${attempts}: Password muy corto
            IF    \${attempts} == \${MAX_ATTEMPTS}
                Fail    Password rechazado después de \${MAX_ATTEMPTS} intentos
            END
        ELSE
            Log    Password válido en intento \${attempts}
            BREAK
        END
    END
    
    Should Be True    \${length} >= \${MIN_PASSWORD}

Algoritmo Validación Completa
    TRY
        # Inicializar contadores
        Set Variable    \${ERROR_COUNT}    0
        Set Variable    \${SUCCESS_COUNT}    0
        
        # Validar cada campo
        FOR    \${field}    IN    name    age    email    password
            Log    Validando campo: \${field}
            
            IF    '\${field}' == 'age'
                \${value}=    Convert To Integer    \${USER_DATA.age}
                IF    \${value} < \${MIN_AGE} or \${value} > \${MAX_AGE}
                    Log    Error en edad: \${value}
                    Set Variable    \${ERROR_COUNT}    \${ERROR_COUNT + 1}
                ELSE
                    Log    Edad válida: \${value}
                    Set Variable    \${SUCCESS_COUNT}    \${SUCCESS_COUNT + 1}
                END
            ELSE IF    '\${field}' == 'email'
                \${email}=    Set Variable    \${USER_DATA.email}
                \${valid_email}=    Run Keyword And Return Status    Should Match Regexp    \${email}    .*@.*\\..*
                IF    \${valid_email}
                    Log    Email válido: \${email}
                    Set Variable    \${SUCCESS_COUNT}    \${SUCCESS_COUNT + 1}
                ELSE
                    Log    Error en email: \${email}
                    Set Variable    \${ERROR_COUNT}    \${ERROR_COUNT + 1}
                END
            ELSE IF    '\${field}' == 'password'
                \${password}=    Set Variable    \${USER_DATA.password}
                \${length}=    Get Length    \${password}
                IF    \${length} >= \${MIN_PASSWORD}
                    Log    Password válido: longitud \${length}
                    Set Variable    \${SUCCESS_COUNT}    \${SUCCESS_COUNT + 1}
                ELSE
                    Log    Error en password: muy corto
                    Set Variable    \${ERROR_COUNT}    \${ERROR_COUNT + 1}
                END
            ELSE
                Log    Campo \${field} procesado
                Set Variable    \${SUCCESS_COUNT}    \${SUCCESS_COUNT + 1}
            END
        END
        
        # Reporte final
        Log    Validación completa: \${SUCCESS_COUNT} éxitos, \${ERROR_COUNT} errores
        Should Be True    \${SUCCESS_COUNT} > \${ERROR_COUNT}
        
    EXCEPT    AS    \${error}
        Log    Error en validación: \${error}
        Fail    Algoritmo de validación falló
    END</code></pre>
        
        <h3>🎯 Práctica algoritmos (8 min):</h3>
        <p>1. Ejecuta cada test case individualmente para ver su funcionamiento</p>
        <p>2. Modifica \${MIN_AGE} a 21 y observa cómo cambia la validación</p>
        <p>3. Agrega un usuario con nombre de 2 caracteres a \${USERS_LIST}</p>
        <p>4. Cambia el email a formato inválido (sin @) y ejecuta</p>
        <p>5. Reduce \${MIN_PASSWORD} a 6 y prueba contraseñas cortas</p>
        <p>6. Agrega un campo nuevo al diccionario \${USER_DATA}</p>
        <p>7. Modifica el algoritmo para validar números de teléfono</p>
        <p>8. Crea loop que procese múltiples usuarios completos</p>
        <p>9. Implementa validación de fecha de nacimiento</p>
        <p>10. Agrega contador de intentos fallidos por tipo de error</p>
        <p>11. Crea función que genere reporte de errores detallado</p>
        <p>12. Implementa validación de código postal usando FOR loop</p>
        <p>13. Combina IF/ELSE con TRY/EXCEPT para manejo robusto</p>
        <p>14. Agrega validación de fortaleza de contraseña (mayús/núm)</p>
        <p>15. Crea algoritmo que procese archivo CSV de usuarios</p>
        <p>16. Implementa retry logic con WHILE para conexiones</p>
        <p>17. Valida que email pertenezca a dominios permitidos</p>
        <p>18. Crea test que simule fallo de red con EXCEPT</p>
        <p>19. Agrega métricas de tiempo de procesamiento</p>
        <p>20. Combina todas las estructuras en algoritmo maestro</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar combinación de todas las estructuras de control</li>
                <li>Implementar algoritmos complejos con lógica robusta</li>
                <li>Aplicar manejo de errores en escenarios reales</li>
                <li>Crear sistemas de validación escalables y mantenibles</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>En algoritmos complejos, siempre usa TRY/EXCEPT en el nivel más alto y validaciones específicas con IF/ELSE en cada paso.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 067 - Introducción a SeleniumLibrary</h3>
        <p>Con control de flujo dominado, comenzarás web automation con Selenium para controlar navegadores automáticamente.</p>
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