/**
 * Robot Framework Academy - Lesson 225
 * Event-Driven Architecture Testing
 */

const LESSON_225 = {
    id: 225,
    title: "Event-Driven Architecture Testing",
    duration: "10 min",
    level: "advanced",
    section: "section-18",
    content: `
        <h2>⚡ Event-Driven Testing</h2>
        <p>Testing especializado de arquitecturas event-driven con message queues, event sourcing y CQRS patterns.</p>
        
        <h3>💻 Testing Events:</h3>
        <pre><code class="robot">*** Settings ***
Documentation    Event-Driven Architecture Testing - CQRS & Event Sourcing
Library          SeleniumLibrary
Library          RequestsLibrary
Library          Collections
Library          DateTime
Library          Process
Resource         ../resources/messaging/rabbitmq_keywords.robot
Resource         ../resources/events/event_store_keywords.robot
Resource         ../resources/cqrs/command_query_keywords.robot
Variables        ../config/event_driven.yaml
Suite Setup      Initialize Event Driven Testing
Suite Teardown   Cleanup Event Resources

*** Variables ***
\${RABBITMQ_URL}          amqp://guest:guest@rabbitmq:5672
\${EVENT_STORE_URL}       http://event-store:2113
\${COMMAND_SERVICE_URL}   http://command-service:8080
\${QUERY_SERVICE_URL}     http://query-service:8081
\${PROJECTION_SERVICE}    http://projection-service:8082
\${SAGA_COORDINATOR}      http://saga-service:8083
\${REDIS_URL}             redis://redis:6379
\${KAFKA_BOOTSTRAP}       kafka:9092
\${EVENT_TOPIC}           domain_events
\${COMMAND_TOPIC}         commands
\${SAGA_TOPIC}           saga_events
\${AGGREGATE_ID}          test_aggregate_123
\${CORRELATION_ID}        test_correlation_456
\${EVENT_VERSION}         1
\${TIMEOUT_SECONDS}       60

*** Test Cases ***
Test Command Handler Processing
    [Documentation]    Command processing and event generation testing
    [Tags]             cqrs    commands    event-sourcing
    
    # Command Validation
    Create Command Message       CreateUserCommand    \${COMMAND_DATA}
    Set Command Headers         correlation_id=\${CORRELATION_ID}    version=\${EVENT_VERSION}
    Validate Command Schema     CreateUserCommand    \${COMMAND_DATA}
    
    # Command Processing
    Send Command To Handler     \${COMMAND_SERVICE_URL}/commands    CreateUserCommand
    Wait For Command Processing timeout=\${TIMEOUT_SECONDS}s
    Validate Command Accepted   CreateUserCommand    \${CORRELATION_ID}
    
    # Event Generation Validation
    Wait For Event Publication  UserCreatedEvent    \${CORRELATION_ID}    timeout=30s
    \${generated_event}=        Get Event By Correlation    \${CORRELATION_ID}
    Validate Event Schema       UserCreatedEvent    \${generated_event}
    Validate Event Data         \${generated_event}    matches_command=\${COMMAND_DATA}
    
    # Event Store Persistence
    Check Event Persisted       \${EVENT_STORE_URL}    \${AGGREGATE_ID}    UserCreatedEvent
    Validate Event Ordering     \${AGGREGATE_ID}       chronological=true

Test Event Sourcing Replay
    [Documentation]    Event sourcing and aggregate reconstruction testing
    [Tags]             event-sourcing    replay    aggregates
    
    # Generate Event History
    Publish Test Events         \${AGGREGATE_ID}    UserCreatedEvent,UserUpdatedEvent,UserDeactivatedEvent
    Wait For Events Persisted   \${AGGREGATE_ID}    count=3    timeout=30s
    
    # Aggregate Reconstruction
    Replay Events For Aggregate  \${AGGREGATE_ID}    from_version=0
    \${reconstructed_state}=     Get Aggregate State    \${AGGREGATE_ID}
    Validate Aggregate State     \${reconstructed_state}    expected_state=\${FINAL_STATE}
    
    # Snapshot Testing
    Create Aggregate Snapshot   \${AGGREGATE_ID}    version=3
    Replay From Snapshot        \${AGGREGATE_ID}    snapshot_version=3
    \${snapshot_state}=         Get Aggregate State    \${AGGREGATE_ID}
    States Should Be Equal      \${reconstructed_state}    \${snapshot_state}
    
    # Version Conflict Testing
    Attempt Concurrent Update   \${AGGREGATE_ID}    expected_version=2    actual_version=3
    Validate Conflict Handled   optimistic_concurrency_exception

Test CQRS Query Projections
    [Documentation]    Query-side projections and read model testing
    [Tags]             cqrs    projections    read-models
    
    # Command Side Events
    Send Command                CreateOrderCommand    \${ORDER_DATA}
    Wait For Event             OrderCreatedEvent     \${CORRELATION_ID}    timeout=30s
    Send Command                UpdateOrderCommand    \${UPDATE_DATA}
    Wait For Event             OrderUpdatedEvent     \${CORRELATION_ID}    timeout=30s
    
    # Projection Processing
    Wait For Projection Update  order_projection     \${CORRELATION_ID}    timeout=60s
    \${projection_data}=        Query Read Model      \${QUERY_SERVICE_URL}/orders/\${ORDER_ID}
    Validate Projection Data    \${projection_data}   matches_events=true
    
    # Eventual Consistency Testing
    Check Projection Consistency order_projection    write_model    max_delay=10s
    Validate Query Performance   order_projection    response_time<100ms
    
    # Projection Rebuild Testing
    Clear Projection Store      order_projection
    Rebuild Projection          order_projection    from_beginning=true
    Wait For Rebuild Complete   order_projection    timeout=300s
    Validate Rebuilt Data       order_projection    matches_original=true

Test Message Queue Patterns
    [Documentation]    Message queue routing and delivery testing
    [Tags]             messaging    queues    routing
    
    # Queue Configuration
    Create Message Queue        user_events_queue    durable=true
    Create Message Queue        order_events_queue   durable=true
    Configure Queue Routing     user_events    routing_key=user.*
    Configure Queue Routing     order_events   routing_key=order.*
    
    # Message Publishing
    Publish Message             user.created    \${USER_EVENT_DATA}    routing_key=user.created
    Publish Message             order.placed    \${ORDER_EVENT_DATA}   routing_key=order.placed
    
    # Message Routing Validation
    Consume From Queue          user_events_queue    expected=1    timeout=30s
    Consume From Queue          order_events_queue   expected=1    timeout=30s
    Validate Message Content    user_events_queue    contains=\${USER_EVENT_DATA}
    Validate Message Content    order_events_queue   contains=\${ORDER_EVENT_DATA}
    
    # Dead Letter Queue Testing
    Publish Invalid Message     invalid_routing_key    \${INVALID_DATA}
    Wait For Dead Letter        dead_letter_queue     timeout=60s
    Validate DLQ Message        dead_letter_queue     reason=routing_failed

Test Saga Pattern Orchestration
    [Documentation]    Saga pattern and distributed transaction testing
    [Tags]             saga    orchestration    distributed-transactions
    
    # Saga Initiation
    Start Saga Process          order_fulfillment_saga    \${SAGA_DATA}
    Wait For Saga Started       order_fulfillment_saga    \${SAGA_ID}    timeout=30s
    Validate Saga State         \${SAGA_ID}    state=STARTED
    
    # Saga Steps Execution
    Execute Saga Step           reserve_inventory     \${SAGA_ID}
    Wait For Step Completion    reserve_inventory     \${SAGA_ID}    timeout=60s
    Execute Saga Step           process_payment       \${SAGA_ID}
    Wait For Step Completion    process_payment       \${SAGA_ID}    timeout=60s
    
    # Saga Completion Testing
    Complete Saga Process       \${SAGA_ID}
    Wait For Saga Completion    \${SAGA_ID}    timeout=90s
    Validate Saga State         \${SAGA_ID}    state=COMPLETED
    Check All Steps Completed   \${SAGA_ID}    expected_steps=3
    
    # Compensation Testing
    Start Compensation Saga     failed_payment_saga    \${FAILED_SAGA_DATA}
    Simulate Step Failure       process_payment        \${SAGA_ID}
    Wait For Compensation       \${SAGA_ID}    timeout=120s
    Validate Compensating Actions    reserve_inventory    action=UNRESERVE</code></pre>
        
        <h3>🎯 Práctica Event-Driven (7 min):</h3>
        <p>1. Configura RabbitMQ cluster para message queue testing</p>
        <p>2. Implementa event store con EventStore DB o Apache Kafka</p>
        <p>3. Crea command handlers con validation y business rules</p>
        <p>4. Implementa event sourcing con aggregate reconstruction</p>
        <p>5. Configura CQRS read models con projection engines</p>
        <p>6. Testa eventual consistency entre write/read models</p>
        <p>7. Implementa saga pattern para distributed transactions</p>
        <p>8. Configura dead letter queues para error handling</p>
        <p>9. Testa message routing con topic exchanges</p>
        <p>10. Implementa snapshot testing para large aggregates</p>
        <p>11. Configura event replay testing para projections</p>
        <p>12. Testa optimistic concurrency control</p>
        <p>13. Implementa compensation testing en saga failures</p>
        <p>14. Configura message deduplication mechanisms</p>
        <p>15. Testa event schema evolution compatibility</p>
        <p>16. Implementa distributed tracing para event flows</p>
        <p>17. Configura monitoring para event processing latency</p>
        <p>18. Testa backpressure handling en high volume scenarios</p>
        <p>19. Implementa event-driven integration testing end-to-end</p>
        <p>20. Configura chaos engineering para message infrastructure</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Implementar testing completo de arquitecturas event-driven</li>
                <li>Configurar CQRS testing con command/query separation</li>
                <li>Dominar event sourcing testing y aggregate reconstruction</li>
                <li>Establecer saga pattern testing para distributed transactions</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa correlation IDs consistentes en todos los eventos - esencial para tracing distributed workflows y debugging saga failures.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 226 - Service Mesh Testing</h3>
        <p>Aprenderás testing avanzado de service mesh con Istio, traffic management y observability patterns.</p>
    `,
    topics: ["enterprise", "architecture", "scalability"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "easy",
    prerequisites: ["lesson-224"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_225 = LESSON_225;
}