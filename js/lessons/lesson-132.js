/**
 * Robot Framework Academy - Lesson 132
 * API Testing 132
 */

const LESSON_132 = {
    id: 132,
    title: "API Testing 132",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>📄 SOAP API Testing</h2>
        <p>Automatización testing SOAP APIs con XML parsing, WSDL validation y envelope structure verification.</p>
        
        <h3>💻 SOAP Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String
Library    XML

*** Variables ***
\${SOAP_URL}        http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso
\${WSDL_URL}        \${SOAP_URL}?WSDL
\${SOAP_ACTION}     http://www.oorsprong.org/websamples.countryinfo/CapitalCity
\${CONTENT_TYPE}    text/xml; charset=utf-8
\${SOAP_ENVELOPE}   \${EMPTY}
\${COUNTRY_CODE}    US
\${RESPONSE_XML}    \${EMPTY}

*** Test Cases ***
WSDL Validation Test
    Create Session    soap    \${SOAP_URL}
    \${wsdl_response}=    GET On Session    soap    /?WSDL
    Status Should Be      200    \${wsdl_response}
    Should Contain        \${wsdl_response.headers['content-type']}    xml
    Should Contain        \${wsdl_response.text}    <definitions
    Should Contain        \${wsdl_response.text}    <service
    Should Contain        \${wsdl_response.text}    <operation
    Should Contain        \${wsdl_response.text}    CountryInfoService
    Should Not Be Empty   \${wsdl_response.text}
    \${wsdl_length}=      Get Length    \${wsdl_response.text}
    Should Be True        \${wsdl_length} > 1000
    Log    WSDL validation passed: \${wsdl_length} characters
    Delete All Sessions

SOAP Envelope Creation
    \${soap_body}=        Set Variable    <web:CapitalCity><web:sCountryISOCode>\${COUNTRY_CODE}</web:sCountryISOCode></web:CapitalCity>
    \${soap_envelope}=    Set Variable    <?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.oorsprong.org/websamples.countryinfo"><soap:Header/><soap:Body>\${soap_body}</soap:Body></soap:Envelope>
    Set Suite Variable    \${SOAP_ENVELOPE}    \${soap_envelope}
    Should Contain        \${SOAP_ENVELOPE}    soap:Envelope
    Should Contain        \${SOAP_ENVELOPE}    soap:Header
    Should Contain        \${SOAP_ENVELOPE}    soap:Body
    Should Contain        \${SOAP_ENVELOPE}    CapitalCity
    Should Contain        \${SOAP_ENVELOPE}    \${COUNTRY_CODE}
    \${envelope_length}=  Get Length    \${SOAP_ENVELOPE}
    Should Be True        \${envelope_length} > 200
    Log    SOAP envelope created: \${envelope_length} characters

SOAP Request Execution
    Create Session    soap    \${SOAP_URL}
    \${headers}=      Create Dictionary    Content-Type=\${CONTENT_TYPE}    SOAPAction=\${SOAP_ACTION}
    \${response}=     POST On Session    soap    /    data=\${SOAP_ENVELOPE}    headers=\${headers}
    Status Should Be    200    \${response}
    Should Contain      \${response.headers['content-type']}    xml
    Should Contain      \${response.text}    soap:Envelope
    Should Contain      \${response.text}    soap:Body
    Should Not Contain  \${response.text}    soap:Fault
    Set Suite Variable  \${RESPONSE_XML}    \${response.text}
    \${response_length}=    Get Length    \${RESPONSE_XML}
    Should Be True      \${response_length} > 100
    Log    SOAP request executed successfully: \${response_length} chars
    Delete All Sessions

XML Response Parsing
    Should Not Be Empty    \${RESPONSE_XML}
    \${xml_root}=         Parse XML    \${RESPONSE_XML}
    Should Not Be None    \${xml_root}
    \${body_element}=     Get Element    \${xml_root}    soap:Body
    Should Not Be None    \${body_element}
    \${capital_response}=    Get Element Text    \${body_element}    .//m:CapitalCityResult    
    Should Not Be Empty   \${capital_response}
    Should Be True        len('\${capital_response}') > 0
    Should Not Contain    \${capital_response}    Error
    Should Not Contain    \${capital_response}    Exception
    Log    Capital city parsed: \${capital_response}

SOAP Fault Handling
    Create Session    soap    \${SOAP_URL}
    \${invalid_envelope}=    Set Variable    <?xml version="1.0"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><web:InvalidOperation/></soap:Body></soap:Envelope>
    \${headers}=            Create Dictionary    Content-Type=\${CONTENT_TYPE}    SOAPAction=invalid
    \${response}=           POST On Session    soap    /    data=\${invalid_envelope}    headers=\${headers}    expected_status=500
    Status Should Be        500    \${response}
    Should Contain          \${response.text}    soap:Fault
    Should Contain          \${response.text}    faultcode
    Should Contain          \${response.text}    faultstring
    \${fault_xml}=          Parse XML    \${response.text}
    \${fault_element}=      Get Element    \${fault_xml}    .//soap:Fault
    Should Not Be None      \${fault_element}
    Log    SOAP fault handled correctly
    Delete All Sessions

Multiple SOAP Operations
    Create Session    soap    \${SOAP_URL}
    \${operations}=       Create List    CapitalCity    CountryName    CountryCurrency
    \${results}=          Create Dictionary
    FOR    \${operation}    IN    @{operations}
        \${op_envelope}=    Set Variable    <?xml version="1.0"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.oorsprong.org/websamples.countryinfo"><soap:Body><web:\${operation}><web:sCountryISOCode>\${COUNTRY_CODE}</web:sCountryISOCode></web:\${operation}></soap:Body></soap:Envelope>
        \${op_headers}=     Create Dictionary    Content-Type=\${CONTENT_TYPE}    SOAPAction=http://www.oorsprong.org/websamples.countryinfo/\${operation}
        \${op_response}=    POST On Session    soap    /    data=\${op_envelope}    headers=\${op_headers}
        Status Should Be    200    \${op_response}
        Should Contain      \${op_response.text}    soap:Envelope
        Set To Dictionary   \${results}    \${operation}    SUCCESS
    END
    Length Should Be        \${results}    3
    Dictionary Should Contain Value    \${results}    SUCCESS
    Log    Multiple operations completed: \${results}
    Delete All Sessions

SOAP Headers Testing
    Create Session    soap    \${SOAP_URL}
    \${custom_header}=    Set Variable    <web:AuthToken>test-token-123</web:AuthToken>
    \${header_envelope}=    Set Variable    <?xml version="1.0"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.oorsprong.org/websamples.countryinfo"><soap:Header>\${custom_header}</soap:Header><soap:Body><web:CapitalCity><web:sCountryISOCode>\${COUNTRY_CODE}</web:sCountryISOCode></web:CapitalCity></soap:Body></soap:Envelope>
    \${headers}=          Create Dictionary    Content-Type=\${CONTENT_TYPE}    SOAPAction=\${SOAP_ACTION}
    \${response}=         POST On Session    soap    /    data=\${header_envelope}    headers=\${headers}
    Status Should Be      200    \${response}
    Should Contain        \${response.text}    soap:Envelope
    Should Contain        \${header_envelope}    AuthToken
    Should Contain        \${header_envelope}    test-token-123
    Log    SOAP headers tested successfully
    Delete All Sessions

SOAP Performance Testing
    Create Session    soap    \${SOAP_URL}
    \${performance_results}=    Create List
    FOR    \${i}    IN RANGE    1    6
        \${start_time}=    Get Current Date    result_format=epoch
        \${headers}=       Create Dictionary    Content-Type=\${CONTENT_TYPE}    SOAPAction=\${SOAP_ACTION}
        \${response}=      POST On Session    soap    /    data=\${SOAP_ENVELOPE}    headers=\${headers}
        \${end_time}=      Get Current Date    result_format=epoch
        \${duration}=      Evaluate    \${end_time} - \${start_time}
        Status Should Be   200    \${response}
        Append To List     \${performance_results}    \${duration}
        Should Be True     \${duration} < 5
    END
    \${avg_time}=         Evaluate    sum(\${performance_results}) / len(\${performance_results})
    Should Be True        \${avg_time} < 3
    Log    SOAP performance: \${avg_time}s average
    Delete All Sessions</code></pre>
        
        <h3>🎯 Práctica SOAP (5 min):</h3>
        <p>1. Ejecuta WSDL validation para explorar service</p>
        <p>2. Modifica \${COUNTRY_CODE} y observa responses</p>
        <p>3. Implementa SOAP envelope creation correcta</p>
        <p>4. Testa SOAP request execution con headers</p>
        <p>5. Valida XML response parsing con Parse XML</p>
        <p>6. Maneja SOAP faults y error responses</p>
        <p>7. Ejecuta múltiples operations en loop</p>
        <p>8. Agrega custom headers en SOAP envelope</p>
        <p>9. Mide SOAP performance con multiple requests</p>
        <p>10. Valida XML structure con Get Element</p>
        <p>11. Testa diferentes SOAPAction values</p>
        <p>12. Implementa XML namespace handling</p>
        <p>13. Valida que responses no contienen faults</p>
        <p>14. Agrega Should Contain para XML validation</p>
        <p>15. Log detailed SOAP metrics para monitoring</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar SOAP envelope creation y structure</li>
                <li>Implementar WSDL validation y parsing</li>
                <li>Manejar XML responses y SOAP faults</li>
                <li>Ejecutar múltiples operations y headers testing</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>SOAP usa XML estricto. Valida siempre namespaces y estructura envelope antes de ejecutar requests.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 133 - gRPC API Testing</h3>
        <p>Aprenderás a automatizar testing de gRPC APIs con Protocol Buffers, streaming y microservices communication.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-131"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_132 = LESSON_132;
}