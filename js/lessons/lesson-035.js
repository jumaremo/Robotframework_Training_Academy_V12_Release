const LESSON_035 = {
    id: 35,
    title: "Variables dinámicas con Python",
    duration: "5 min",
    level: "beginner",
    section: "section-03",
    content: `
        <h2>🐍 Variables Python</h2>
        <p>Generación dinámica de variables usando código Python embebido y bibliotecas externas.</p>
        
        <h3>💻 Dynamic Python Variables:</h3>
        <pre><code class="robot">
*** Variables ***
\${PYTHON_VERSION}    \${EMPTY}
\${RANDOM_SEED}       12345
\${BASE_TIMESTAMP}    \${EMPTY}

*** Test Cases ***
Test Basic Python Variable Generation
    [Documentation]    Demonstrates basic Python code execution for variables
    [Tags]    variables    python    basic
    \${current_time}    Evaluate    time.time()    modules=time
    \${random_number}   Evaluate    random.randint(1, 1000)    modules=random
    \${uuid_string}     Evaluate    str(uuid.uuid4())    modules=uuid
    Log    Current timestamp: \${current_time}
    Log    Random number: \${random_number}
    Log    UUID: \${uuid_string}
    Should Be True    \${random_number} >= 1 and \${random_number} <= 1000

Test DateTime Operations With Python
    [Documentation]    Shows datetime manipulation using Python
    [Tags]    variables    python    datetime
    \${now}             Evaluate    datetime.datetime.now()    modules=datetime
    \${future_date}     Evaluate    datetime.datetime.now() + datetime.timedelta(days=30)    modules=datetime
    \${formatted_date}  Evaluate    datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')    modules=datetime
    \${timestamp}       Evaluate    int(datetime.datetime.now().timestamp())    modules=datetime
    Log    Current datetime: \${now}
    Log    Future date: \${future_date}
    Log    Formatted: \${formatted_date}
    Log    Timestamp: \${timestamp}

Test String Manipulation With Python
    [Documentation]    Demonstrates advanced string operations using Python
    [Tags]    variables    python    strings
    \${email}           Set Variable    Test.User@Example.COM
    \${clean_email}     Evaluate    '\${email}'.lower().strip()
    \${email_parts}     Evaluate    '\${email}'.lower().split('@')
    \${username}        Evaluate    '\${email}'.split('@')[0].lower()
    \${domain}          Evaluate    '\${email}'.split('@')[1].lower()
    \${encoded_email}   Evaluate    base64.b64encode('\${clean_email}'.encode()).decode()    modules=base64
    Log    Original: \${email}
    Log    Clean: \${clean_email}
    Log    Username: \${username}
    Log    Domain: \${domain}
    Log    Encoded: \${encoded_email}

Test Mathematical Calculations
    [Documentation]    Performs complex calculations using Python math module
    [Tags]    variables    python    math
    \${price}           Set Variable    ${99.99}
    \${tax_rate}        Set Variable    ${0.085}
    \${discount}        Set Variable    ${0.15}
    \${discounted_price}    Evaluate    \${price} * (1 - \${discount})
    \${tax_amount}      Evaluate    \${discounted_price} * \${tax_rate}
    \${final_price}     Evaluate    round(\${discounted_price} + \${tax_amount}, 2)
    \${square_root}     Evaluate    math.sqrt(16)    modules=math
    \${power_result}    Evaluate    math.pow(2, 8)    modules=math
    Log    Original price: $\${price}
    Log    After discount: $\${discounted_price}
    Log    Tax amount: $\${tax_amount}
    Log    Final price: $\${final_price}
    Log    Square root of 16: \${square_root}
    Log    2^8 = \${power_result}

Test Data Structure Generation
    [Documentation]    Creates complex data structures using Python
    [Tags]    variables    python    structures
    \${user_list}       Evaluate    [{'name': f'User{i}', 'id': i, 'email': f'user{i}@test.com'} for i in range(1, 4)]
    \${config_dict}     Evaluate    {'environments': ['dev', 'staging', 'prod'], 'features': {'auth': True, 'logging': True}}
    \${range_list}      Evaluate    list(range(10, 21, 2))
    Log    Generated users: \${user_list}
    Log    Config dictionary: \${config_dict}
    Log    Number range: \${range_list}
    Should Be Equal As Numbers    \${user_list}[0][id]    1

Test File Path Operations
    [Documentation]    Demonstrates file path manipulation using Python
    [Tags]    variables    python    filepath
    \${current_dir}     Evaluate    os.getcwd()    modules=os
    \${home_dir}        Evaluate    os.path.expanduser('~')    modules=os.path
    \${test_file_path}  Evaluate    os.path.join('\${current_dir}', 'test_data', 'sample.txt')    modules=os.path
    \${file_extension}  Evaluate    os.path.splitext('report.pdf')[1]    modules=os.path
    \${filename_only}   Evaluate    os.path.basename('/path/to/file.txt')    modules=os.path
    Log    Current directory: \${current_dir}
    Log    Home directory: \${home_dir}
    Log    Test file path: \${test_file_path}
    Log    File extension: \${file_extension}
    Log    Filename only: \${filename_only}

Test API Data Preparation
    [Documentation]    Prepares data for API testing using Python
    [Tags]    variables    python    api
    \${api_payload}     Evaluate    json.dumps({'username': 'testuser', 'timestamp': int(time.time()), 'data': [1,2,3]})    modules=json,time
    \${headers_dict}    Evaluate    {'Content-Type': 'application/json', 'Authorization': f'Bearer token_{random.randint(1000,9999)}'}    modules=random
    \${query_params}    Evaluate    '&'.join([f'{k}={v}' for k, v in {'page': 1, 'limit': 10, 'sort': 'name'}.items()])
    Log    API Payload: \${api_payload}
    Log    Headers: \${headers_dict}
    Log    Query params: \${query_params}
    Should Contain    \${api_payload}    username

*** Keywords ***
Generate Test User Data
    [Documentation]    Generates dynamic test user data using Python
    [Arguments]    \${count}=3
    \${users}    Evaluate    [{'id': i, 'name': f'TestUser{i}', 'email': f'user{i}@test.com', 'created': time.time()} for i in range(1, \${count}+1)]    modules=time
    Log    Generated \${count} test users
    RETURN    \${users}

Calculate Business Metrics
    [Documentation]    Calculates business metrics using Python
    [Arguments]    \${revenue}    \${costs}    \${months}=12
    \${profit}          Evaluate    \${revenue} - \${costs}
    \${margin}          Evaluate    round((\${profit} / \${revenue}) * 100, 2) if \${revenue} > 0 else 0
    \${monthly_avg}     Evaluate    round(\${revenue} / \${months}, 2)
    \${growth_rate}     Evaluate    round((\${profit} / \${costs}) * 100, 2) if \${costs} > 0 else 0
    &{metrics}    Create Dictionary    
    ...    profit=\${profit}    
    ...    margin=\${margin}    
    ...    monthly_avg=\${monthly_avg}    
    ...    growth_rate=\${growth_rate}
    Log Dictionary    \${metrics}
    RETURN    \${metrics}

Generate Random Test Data
    [Documentation]    Generates random test data for different scenarios
    [Arguments]    \${data_type}
    \${random_data}    Run Keyword If    '\${data_type}' == 'email'
    ...    Evaluate    f'test{random.randint(1000,9999)}@example.com'    modules=random
    ...    ELSE IF    '\${data_type}' == 'phone'
    ...    Evaluate    f'+1{random.randint(1000000000,9999999999)}'    modules=random
    ...    ELSE IF    '\${data_type}' == 'uuid'
    ...    Evaluate    str(uuid.uuid4())    modules=uuid
    ...    ELSE    Evaluate    f'random_{random.randint(1,1000)}'    modules=random
    Log    Generated \${data_type}: \${random_data}
    RETURN    \${random_data}

Process JSON Response
    [Documentation]    Processes JSON response using Python
    [Arguments]    \${json_string}
    \${parsed_data}    Evaluate    json.loads('\${json_string}')    modules=json
    \${status_code}    Evaluate    \${parsed_data}.get('status', 'unknown')
    \${message}        Evaluate    \${parsed_data}.get('message', '')
    \${data_count}     Evaluate    len(\${parsed_data}.get('data', []))
    Log    Status: \${status_code}, Message: \${message}, Data count: \${data_count}
    RETURN    \${parsed_data}
        </code></pre>
        
        <h3>🎯 Práctica Variables Python (4 min):</h3>
        <ol>
            <li><strong>Evaluate básico:</strong> Usar Evaluate con módulos time, random, uuid</li>
            <li><strong>DateTime operations:</strong> Manipular fechas con datetime.datetime y timedelta</li>
            <li><strong>String processing:</strong> Usar métodos Python .lower(), .split(), .strip()</li>
            <li><strong>Math calculations:</strong> Realizar cálculos complejos con math.sqrt, math.pow</li>
            <li><strong>List comprehensions:</strong> Generar listas dinámicas con comprensión de Python</li>
            <li><strong>Dictionary creation:</strong> Crear diccionarios complejos con Python literal syntax</li>
            <li><strong>File path operations:</strong> Usar os.path para manipulación de rutas</li>
            <li><strong>JSON manipulation:</strong> Usar json.dumps y json.loads para APIs</li>
            <li><strong>Random data generation:</strong> Generar datos de prueba aleatorios</li>
            <li><strong>Base64 encoding:</strong> Codificar/decodificar datos con base64</li>
            <li><strong>Custom functions:</strong> Crear keywords que encapsulen lógica Python</li>
            <li><strong>Error handling:</strong> Manejar errores en código Python embebido</li>
            <li><strong>Performance considerations:</strong> Optimizar uso de Evaluate para eficiencia</li>
            <li><strong>Module imports:</strong> Usar modules parameter para importar bibliotecas</li>
            <li><strong>Complex scenarios:</strong> Combinar múltiples técnicas Python en tests reales</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar Evaluate keyword para ejecutar código Python dinámico</li>
                <li>Generar variables complejas usando bibliotecas Python estándar</li>
                <li>Implementar cálculos avanzados y manipulación de datos</li>
                <li>Crear data de prueba dinámica y flexible usando Python</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa modules parameter en Evaluate para importar bibliotecas. Las list comprehensions y f-strings de Python son muy útiles para generar test data dinámica.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 036 - Scoping y visibilidad de variables</h3>
        <p>Profundizaremos en el control de scope y visibilidad de variables entre tests, keywords y suites para organización efectiva.</p>
    `,
    topics: ["dynamic", "python", "runtime"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-034"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_035 = LESSON_035;
}