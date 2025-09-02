/**
 * Robot Framework Academy - Lesson 181
 * Python Libraries 181
 */

const LESSON_181 = {
    id: 181,
    title: "Python Libraries 181",
    duration: "7 min",
    level: "intermediate",
    section: "section-13",
    content: `
        <h2>🌐 IoT y Edge Testing</h2>
        <p>Implementa testing de dispositivos IoT, edge computing y protocolos especializados usando MQTT, CoAP, WebSocket.</p>
        
        <h3>💻 IoT testing especializado:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/IoTTestingLibrary.py

*** Variables ***
\${MQTT_BROKER}     mqtt.eclipse.org
\${MQTT_PORT}       1883
\${COAP_SERVER}     coap://coap.me
\${WEBSOCKET_URL}   ws://echo.websocket.org
\${DEVICE_ID}       sensor-device-001
\${TOPIC_SENSORS}   /sensors/temperature
\${EDGE_NODE_IP}    192.168.1.100
\${PROTOCOL_TIMEOUT} 10

*** Test Cases ***
Test MQTT Communication
    \${mqtt_client}=    Create MQTT Client    broker=\${MQTT_BROKER}    port=\${MQTT_PORT}    client_id=\${DEVICE_ID}
    Should Be True    \${mqtt_client}[connected]
    Should Be Equal    \${mqtt_client}[broker]    \${MQTT_BROKER}
    \${publish_result}=    Publish MQTT Message    \${mqtt_client}    topic=\${TOPIC_SENSORS}    payload={"temp": 25.5, "humidity": 60}
    Should Be True    \${publish_result}[published]
    Should Be Equal As Numbers    \${publish_result}[message_id]    1
    \${subscribe_result}=    Subscribe MQTT Topic    \${mqtt_client}    topic=\${TOPIC_SENSORS}    timeout=\${PROTOCOL_TIMEOUT}
    Should Be True    \${subscribe_result}[subscribed]
    Should Contain    \${subscribe_result}[messages]    temp
    Disconnect MQTT Client    \${mqtt_client}
    Log    MQTT communication: \${publish_result}

Test CoAP Protocol
    \${coap_client}=    Create CoAP Client    server=\${COAP_SERVER}    timeout=\${PROTOCOL_TIMEOUT}
    Should Be True    \${coap_client}[connected]
    Should Contain    \${coap_client}[server]    coap.me
    \${get_response}=    CoAP GET Request    \${coap_client}    resource=/hello    observe=false
    Should Be True    \${get_response}[success]
    Should Be Equal As Numbers    \${get_response}[code]    205
    Should Contain    \${get_response}[payload]    world
    \${post_response}=    CoAP POST Request    \${coap_client}    resource=/validate    payload=test-data
    Should Be True    \${post_response}[success]
    Should Be True    \${post_response}[code] < 300
    Log    CoAP protocol test: \${get_response}

Test WebSocket Communication
    \${ws_client}=    Create WebSocket Client    url=\${WEBSOCKET_URL}    timeout=\${PROTOCOL_TIMEOUT}
    Should Be True    \${ws_client}[connected]
    Should Contain    \${ws_client}[url]    websocket.org
    \${send_result}=    Send WebSocket Message    \${ws_client}    message=Hello IoT Device    message_type=text
    Should Be True    \${send_result}[sent]
    Should Be Equal    \${send_result}[message]    Hello IoT Device
    \${receive_result}=    Receive WebSocket Message    \${ws_client}    timeout=5
    Should Be True    \${receive_result}[received]
    Should Be Equal    \${receive_result}[message]    Hello IoT Device
    Close WebSocket Connection    \${ws_client}
    Log    WebSocket communication: \${send_result}

Test Edge Device Simulation
    \${edge_device}=    Create Edge Device Simulator    device_id=\${DEVICE_ID}    node_ip=\${EDGE_NODE_IP}
    Should Be True    \${edge_device}[initialized]
    Should Be Equal    \${edge_device}[device_id]    \${DEVICE_ID}
    \${sensor_data}=    Generate Sensor Data    \${edge_device}    sensors=["temperature", "pressure", "humidity"]
    Should Be True    \${sensor_data}[generated]
    Should Be Equal As Numbers    \${sensor_data}[sensors_count]    3
    Should Contain    \${sensor_data}[data]    temperature
    \${transmission_test}=    Test Data Transmission    \${edge_device}    protocol=mqtt    interval=1
    Should Be True    \${transmission_test}[transmitted]
    Should Be True    \${transmission_test}[transmission_rate] > 0
    Log    Edge device simulation: \${sensor_data}

Test Protocol Performance
    \${performance_test}=    Compare Protocol Performance    protocols=["mqtt", "coap", "websocket"]    iterations=50
    Should Be True    \${performance_test}[completed]
    Should Be Equal As Numbers    \${performance_test}[protocols_tested]    3
    Should Contain    \${performance_test}[results]    mqtt
    Should Contain    \${performance_test}[results]    coap
    Should Contain    \${performance_test}[results]    websocket
    Should Be True    \${performance_test}[mqtt_latency] > 0
    Should Be True    \${performance_test}[coap_latency] > 0
    \${reliability_test}=    Test Protocol Reliability    protocol=mqtt    failure_rate=10    duration=30
    Should Be True    \${reliability_test}[tested]
    Should Be True    \${reliability_test}[recovery_time] < 5
    \${iot_report}=    Generate IoT Test Report    \${performance_test}    \${reliability_test}
    Should Contain    \${iot_report}    protocol_comparison
    Log    Protocol performance: \${performance_test}</code></pre>
        
        <h3>🎯 Práctica IoT testing (5 min):</h3>
        <p>1. Crea IoTTestingLibrary.py con create_mqtt_client() usando paho-mqtt</p>
        <p>2. Implementa publish_mqtt_message() con QoS levels y retain flags</p>
        <p>3. Agrega subscribe_mqtt_topic() con message callback handling</p>
        <p>4. Crea create_coap_client() usando aiocoap para CoAP protocol</p>
        <p>5. Implementa coap_get_request() y coap_post_request() con observe</p>
        <p>6. Agrega create_websocket_client() usando websockets library</p>
        <p>7. Crea send_websocket_message() con text y binary message types</p>
        <p>8. Implementa create_edge_device_simulator() con sensor modeling</p>
        <p>9. Agrega generate_sensor_data() con realistic value ranges</p>
        <p>10. Crea test_data_transmission() con protocol switching</p>
        <p>11. Implementa compare_protocol_performance() con latency metrics</p>
        <p>12. Agrega test_protocol_reliability() con failure injection</p>
        <p>13. Crea device discovery usando mDNS/Bonjour protocols</p>
        <p>14. Implementa security testing para IoT authentication</p>
        <p>15. Agrega energy consumption simulation y battery life testing</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar testing de protocolos IoT (MQTT, CoAP, WebSocket)</li>
                <li>Implementar simulación de edge devices y sensor data</li>
                <li>Comparar performance de protocolos para casos específicos</li>
                <li>Validar reliability y recovery en comunicaciones IoT</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>IoT testing requiere considerar latencia, reliability y consumo energético. Usa simuladores para testing masivo y always test bajo condiciones de red inestable.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 182 - Python Libraries 182</h3>
        <p>Aprenderás a crear librerías Python para blockchain testing, smart contracts validation y testing de aplicaciones descentralizadas (DApps).</p>
    `,
    topics: ["python", "libraries", "custom"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-180"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_181 = LESSON_181;
}