const LESSON_037 = {
    id: 37,
    title: "Manipulación de strings",
    duration: "5 min",
    level: "beginner",
    section: "section-03",
    content: `
        <h2>🔤 String Manipulation</h2>
        <p>Técnicas avanzadas de manipulación y validación de strings para procesamiento de texto.</p>
        
        <h3>💻 String Operations:</h3>
        <pre><code class="robot">
*** Variables ***
\${SAMPLE_TEXT}        Hello World Robot Framework Testing
\${EMAIL_SAMPLE}       Test.User@Example.COM
\${URL_SAMPLE}         https://www.example.com/path/to/resource
\${PHONE_SAMPLE}       +1 (555) 123-4567
\${JSON_STRING}        {"name": "John", "age": 30, "city": "New York"}

*** Test Cases ***
Test Basic String Operations
    [Documentation]    Demonstrates basic string manipulation operations
    [Tags]    variables    strings    basic
    \${lower_text}      Convert To Lowercase    \${SAMPLE_TEXT}
    \${upper_text}      Convert To Uppercase    \${SAMPLE_TEXT}
    \${length}          Get Length    \${SAMPLE_TEXT}
    \${substring}       Get Substring    \${SAMPLE_TEXT}    6    11
    Log    Original: \${SAMPLE_TEXT}
    Log    Lowercase: \${lower_text}
    Log    Uppercase: \${upper_text}
    Log    Length: \${length}
    Log    Substring (6-11): \${substring}
    Should Be Equal    \${substring}    World

Test String Splitting And Joining
    [Documentation]    Shows string splitting and joining operations
    [Tags]    variables    strings    splitting
    @{words}            Split String    \${SAMPLE_TEXT}    \${SPACE}
    \${word_count}      Get Length    \${words}
    \${joined_text}     Set Variable    \${EMPTY}
    FOR    \${word}    IN    @{words}
        \${joined_text}    Set Variable    \${joined_text}\${word}_
    END
    \${rejoined}        Set Variable    \${EMPTY}
    \${separator}       Set Variable    \${SPACE}
    Log    Words: @{words}
    Log    Word count: \${word_count}
    Log    Modified: \${joined_text}
    Should Be True    \${word_count} == 4

Test String Replacement And Cleaning
    [Documentation]    Demonstrates string replacement and cleaning operations
    [Tags]    variables    strings    replacement
    \${clean_email}     Replace String    \${EMAIL_SAMPLE}    .    _
    \${no_spaces}       Replace String    \${SAMPLE_TEXT}    \${SPACE}    \${EMPTY}
    \${normalized}      Replace String Using Regexp    \${PHONE_SAMPLE}    [^\\\\d]    \${EMPTY}
    \${formatted_url}   Replace String    \${URL_SAMPLE}    https://    http://
    Log    Original email: \${EMAIL_SAMPLE}
    Log    Clean email: \${clean_email}
    Log    No spaces: \${no_spaces}
    Log    Phone digits only: \${normalized}
    Log    HTTP URL: \${formatted_url}
    Should Contain    \${clean_email}    _

Test Regular Expression Matching
    [Documentation]    Shows regular expression pattern matching and validation
    [Tags]    variables    strings    regex
    \${email_valid}     Should Match Regexp    \${EMAIL_SAMPLE}    ^[^@]+@[^@]+\\\\.[^@]+$
    \${phone_digits}    Get Regexp Matches    \${PHONE_SAMPLE}    \\\\d+
    \${url_protocol}    Get Regexp Matches    \${URL_SAMPLE}    ^(https?)://
    \${domain_name}     Get Regexp Matches    \${URL_SAMPLE}    ://([^/]+)
    Log    Email validation passed: \${email_valid}
    Log    Phone digits: @{phone_digits}
    Log    URL protocol: @{url_protocol}
    Log    Domain: @{domain_name}
    Should Not Be Empty    \${phone_digits}

Test String Formatting And Templates
    [Documentation]    Demonstrates string formatting and template usage
    [Tags]    variables    strings    formatting
    \${user_name}       Set Variable    John Doe
    \${user_id}         Set Variable    12345
    \${template}        Set Variable    User: \${user_name} (ID: \${user_id})
    \${formatted_msg}   Format String    Hello {0}, your ID is {1}    \${user_name}    \${user_id}
    \${current_time}    Get Current Date    result_format=%Y-%m-%d %H:%M:%S
    \${log_entry}       Set Variable    [\${current_time}] User \${user_name} logged in
    Log    Template: \${template}
    Log    Formatted: \${formatted_msg}
    Log    Log entry: \${log_entry}
    Should Contain    \${template}    John Doe

Test String Validation And Checks
    [Documentation]    Performs various string validation checks
    [Tags]    variables    strings    validation
    Should Start With       \${URL_SAMPLE}     https://
    Should End With         \${EMAIL_SAMPLE}   .COM
    Should Contain          \${SAMPLE_TEXT}    Robot
    Should Not Contain      \${SAMPLE_TEXT}    Python
    Should Be Equal As Strings Ignoring Case    \${EMAIL_SAMPLE}    test.user@example.com
    \${contains_digits}     Should Match Regexp    \${PHONE_SAMPLE}    .*\\\\d.*
    Log    URL validation passed
    Log    Email validation passed
    Log    Text content validation passed

Test String Encoding And Decoding
    [Documentation]    Shows string encoding and decoding operations
    [Tags]    variables    strings    encoding
    \${encoded_text}    Evaluate    base64.b64encode('\${SAMPLE_TEXT}'.encode()).decode()    modules=base64
    \${decoded_text}    Evaluate    base64.b64decode('\${encoded_text}'.encode()).decode()    modules=base64
    \${url_encoded}     Evaluate    urllib.parse.quote('\${SAMPLE_TEXT}')    modules=urllib.parse
    \${url_decoded}     Evaluate    urllib.parse.unquote('\${url_encoded}')    modules=urllib.parse
    Log    Original: \${SAMPLE_TEXT}
    Log    Base64 encoded: \${encoded_text}
    Log    Base64 decoded: \${decoded_text}
    Log    URL encoded: \${url_encoded}
    Log    URL decoded: \${url_decoded}
    Should Be Equal    \${decoded_text}    \${SAMPLE_TEXT}

*** Keywords ***
Extract Email Components
    [Documentation]    Extracts username and domain from email address
    [Arguments]    \${email}
    \${clean_email}    Convert To Lowercase    \${email}
    @{email_parts}     Split String    \${clean_email}    @
    \${username}       Set Variable    \${email_parts}[0]
    \${domain}         Set Variable    \${email_parts}[1]
    Log    Username: \${username}, Domain: \${domain}
    RETURN    \${username}    \${domain}

Validate And Clean Phone Number
    [Documentation]    Validates and cleans phone number format
    [Arguments]    \${phone}
    \${digits_only}    Replace String Using Regexp    \${phone}    [^\\\\d]    \${EMPTY}
    \${digit_count}    Get Length    \${digits_only}
    \${is_valid}       Run Keyword And Return Status    Should Be True    \${digit_count} >= 10
    \${formatted}      Run Keyword If    \${is_valid}    Format Phone Number    \${digits_only}
    ...    ELSE    Set Variable    Invalid Phone
    Log    Original: \${phone}, Cleaned: \${digits_only}, Valid: \${is_valid}
    RETURN    \${formatted}    \${is_valid}

Format Phone Number
    [Arguments]    \${digits}
    \${formatted}    Run Keyword If    len('\${digits}') == 10
    ...    Set Variable    (\${digits[:3]}) \${digits[3:6]}-\${digits[6:]}
    ...    ELSE IF    len('\${digits}') == 11
    ...    Set Variable    +\${digits[0]} (\${digits[1:4]}) \${digits[4:7]}-\${digits[7:]}
    ...    ELSE    Set Variable    \${digits}
    RETURN    \${formatted}

Generate Random String
    [Documentation]    Generates random string of specified length and type
    [Arguments]    \${length}=8    \${string_type}=alphanumeric
    \${random_string}    Run Keyword If    '\${string_type}' == 'letters'
    ...    Evaluate    ''.join(random.choices(string.ascii_letters, k=\${length}))    modules=random,string
    ...    ELSE IF    '\${string_type}' == 'digits'
    ...    Evaluate    ''.join(random.choices(string.digits, k=\${length}))    modules=random,string
    ...    ELSE    Evaluate    ''.join(random.choices(string.ascii_letters + string.digits, k=\${length}))    modules=random,string
    Log    Generated \${string_type} string: \${random_string}
    RETURN    \${random_string}

Parse JSON String
    [Documentation]    Parses JSON string and extracts values
    [Arguments]    \${json_str}
    \${parsed_data}    Evaluate    json.loads('\${json_str}')    modules=json
    \${name}           Set Variable    \${parsed_data}[name]
    \${age}            Set Variable    \${parsed_data}[age]
    \${city}           Set Variable    \${parsed_data}[city]
    Log    Parsed - Name: \${name}, Age: \${age}, City: \${city}
    RETURN    \${parsed_data}

Create Slug From Text
    [Documentation]    Creates URL-friendly slug from text
    [Arguments]    \${text}
    \${lowercase}      Convert To Lowercase    \${text}
    \${no_spaces}      Replace String    \${lowercase}    \${SPACE}    -
    \${clean_slug}     Replace String Using Regexp    \${no_spaces}    [^a-z0-9-]    \${EMPTY}
    \${final_slug}     Replace String Using Regexp    \${clean_slug}    -+    -
    Log    Text: \${text} → Slug: \${final_slug}
    RETURN    \${final_slug}
        </code></pre>
        
        <h3>🎯 Práctica String Manipulation (4 min):</h3>
        <ol>
            <li><strong>Basic operations:</strong> Usar Convert To Lowercase/Uppercase, Get Length, Get Substring</li>
            <li><strong>String splitting:</strong> Usar Split String para dividir texto en listas</li>
            <li><strong>String replacement:</strong> Usar Replace String para modificar contenido</li>
            <li><strong>Regex operations:</strong> Usar Should Match Regexp y Get Regexp Matches</li>
            <li><strong>String validation:</strong> Usar Should Start With, Should End With, Should Contain</li>
            <li><strong>Case insensitive:</strong> Usar Should Be Equal As Strings Ignoring Case</li>
            <li><strong>String formatting:</strong> Crear templates y mensajes formateados</li>
            <li><strong>Encoding/decoding:</strong> Usar base64 y URL encoding con Evaluate</li>
            <li><strong>Email processing:</strong> Extraer componentes de direcciones email</li>
            <li><strong>Phone validation:</strong> Limpiar y validar números de teléfono</li>
            <li><strong>Random generation:</strong> Generar strings aleatorios para test data</li>
            <li><strong>JSON parsing:</strong> Extraer datos de strings JSON</li>
            <li><strong>Slug creation:</strong> Crear URLs amigables desde texto</li>
            <li><strong>Complex patterns:</strong> Combinar múltiples operaciones de string</li>
            <li><strong>Performance optimization:</strong> Optimizar operaciones de string para eficiencia</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar operaciones básicas y avanzadas de manipulación de strings</li>
                <li>Implementar validación y limpieza efectiva de datos de texto</li>
                <li>Usar expresiones regulares para pattern matching y extracción</li>
                <li>Crear keywords reutilizables para procesamiento común de strings</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Combina Replace String Using Regexp con Should Match Regexp para validación robusta. Usa Evaluate con módulos Python para operaciones complejas de string.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 038 - Operaciones con números y fechas</h3>
        <p>Nos enfocaremos en manipulación avanzada de datos numéricos y temporales para cálculos y validaciones complejas.</p>
    `,
    topics: ["strings", "manipulation", "text"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-036"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_037 = LESSON_037;
}