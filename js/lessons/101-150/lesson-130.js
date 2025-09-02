/**
 * Robot Framework Academy - Lesson 130
 * API Testing 130
 */

const LESSON_130 = {
    id: 130,
    title: "API Testing 130",
    duration: "7 min",
    level: "intermediate",
    section: "section-09",
    content: `
        <h2>🔗 GraphQL Testing</h2>
        <p>Automatización testing GraphQL APIs con queries, mutations y schema introspection validation.</p>
        
        <h3>💻 GraphQL Tests:</h3>
        <pre><code class="robot">*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String
Library    JSONLibrary

*** Variables ***
\${GRAPHQL_URL}     https://api.github.com/graphql
\${LOCAL_GRAPHQL}   http://localhost:4000/graphql
\${AUTH_TOKEN}      ghp_example_token_12345
\${QUERY_USER}      query { viewer { login name email } }
\${QUERY_REPOS}     query { viewer { repositories(first: 5) { nodes { name description } } } }
\${MUTATION_STAR}   mutation { addStar(input: {starrableId: "repo_id"}) { starrable { id } } }

*** Test Cases ***
GraphQL Schema Introspection
    Create Session    graphql    \${LOCAL_GRAPHQL}
    \${introspection_query}=    Set Variable    {"query": "{ __schema { types { name } } }"}
    \${response}=              POST On Session    graphql    /    json=\${introspection_query}
    Status Should Be           200    \${response}
    \${data}=                  Set Variable    \${response.json()}
    Should Have Key            \${data}    data
    Should Have Key            \${data['data']}    __schema
    Should Have Key            \${data['data']['__schema']}    types
    Should Not Be Empty        \${data['data']['__schema']['types']}
    Log    Schema introspection successful
    Delete All Sessions

Simple GraphQL Query
    Create Session    graphql    \${LOCAL_GRAPHQL}
    \${simple_query}=    Create Dictionary    query=query { users { id name email } }
    \${response}=        POST On Session    graphql    /    json=\${simple_query}
    Status Should Be     200    \${response}
    \${result}=          Set Variable    \${response.json()}
    Should Have Key      \${result}    data
    Should Have Key      \${result['data']}    users
    Should Be True       isinstance(\${result['data']['users']}, list)
    Should Not Be Empty  \${result['data']['users']}
    \${first_user}=      Set Variable    \${result['data']['users'][0]}
    Should Have Key      \${first_user}    id
    Should Have Key      \${first_user}    name
    Should Have Key      \${first_user}    email
    Log    Simple query executed successfully
    Delete All Sessions

GraphQL Query Variables
    Create Session    graphql    \${LOCAL_GRAPHQL}
    \${query_with_vars}=    Create Dictionary    
    ...                     query=query(\$userId: ID!) { user(id: \$userId) { id name posts { title } } }
    ...                     variables={"userId": "1"}
    \${response}=           POST On Session    graphql    /    json=\${query_with_vars}
    Status Should Be        200    \${response}
    \${data}=               Set Variable    \${response.json()}
    Should Have Key         \${data}    data
    Should Have Key         \${data['data']}    user
    \${user}=               Set Variable    \${data['data']['user']}
    Should Be Equal         \${user['id']}    1
    Should Not Be Empty     \${user['name']}
    Should Have Key         \${user}    posts
    Should Be True          isinstance(\${user['posts']}, list)
    Log    Query with variables successful
    Delete All Sessions

GraphQL Mutation Testing
    Create Session    graphql    \${LOCAL_GRAPHQL}
    \${mutation_data}=    Create Dictionary    
    ...                   query=mutation(\$input: CreateUserInput!) { createUser(input: \$input) { id name email } }
    ...                   variables={"input": {"name": "Test User", "email": "test@example.com"}}
    \${response}=         POST On Session    graphql    /    json=\${mutation_data}
    Status Should Be      200    \${response}
    \${result}=           Set Variable    \${response.json()}
    Should Have Key       \${result}    data
    Should Have Key       \${result['data']}    createUser
    \${created_user}=     Set Variable    \${result['data']['createUser']}
    Should Have Key       \${created_user}    id
    Should Be Equal       \${created_user['name']}     Test User
    Should Be Equal       \${created_user['email']}    test@example.com
    Should Be True        isinstance(\${created_user['id']}, int)
    Log    Mutation executed successfully
    Delete All Sessions

Nested Query Validation
    Create Session    graphql    \${LOCAL_GRAPHQL}
    \${nested_query}=    Create Dictionary    
    ...                  query=query { users { id name posts { id title comments { id body author { name } } } } }
    \${response}=        POST On Session    graphql    /    json=\${nested_query}
    Status Should Be     200    \${response}
    \${data}=            Set Variable    \${response.json()}
    Should Have Key      \${data}    data
    Should Have Key      \${data['data']}    users
    \${users}=           Set Variable    \${data['data']['users']}
    Should Not Be Empty  \${users}
    \${user}=            Set Variable    \${users[0]}
    Should Have Key      \${user}    posts
    Should Not Be Empty  \${user['posts']}
    \${post}=            Set Variable    \${user['posts'][0]}
    Should Have Key      \${post}    comments
    Should Have Key      \${post}    title
    Log    Nested query validation passed
    Delete All Sessions

GraphQL Error Handling
    Create Session    graphql    \${LOCAL_GRAPHQL}
    \${invalid_query}=    Create Dictionary    query=query { invalidField { nonExistentField } }
    \${response}=         POST On Session    graphql    /    json=\${invalid_query}
    Status Should Be      200    \${response}
    \${result}=           Set Variable    \${response.json()}
    Should Have Key       \${result}    errors
    Should Not Be Empty   \${result['errors']}
    \${error}=            Set Variable    \${result['errors'][0]}
    Should Have Key       \${error}    message
    Should Contain        \${error['message']}    Cannot query field
    Should Not Have Key   \${result}    data
    Log    GraphQL error handled correctly
    Delete All Sessions

Query Fragments Testing
    Create Session    graphql    \${LOCAL_GRAPHQL}
    \${fragment_query}=    Create Dictionary    
    ...                    query=fragment UserInfo on User { id name email } query { users { ...UserInfo posts { title } } }
    \${response}=          POST On Session    graphql    /    json=\${fragment_query}
    Status Should Be       200    \${response}
    \${data}=              Set Variable    \${response.json()}
    Should Have Key        \${data}    data
    Should Have Key        \${data['data']}    users
    \${users}=             Set Variable    \${data['data']['users']}
    Should Not Be Empty    \${users}
    \${user}=              Set Variable    \${users[0]}
    Should Have Key        \${user}    id
    Should Have Key        \${user}    name
    Should Have Key        \${user}    email
    Should Have Key        \${user}    posts
    Log    Fragment query executed successfully
    Delete All Sessions

GraphQL Pagination Testing
    Create Session    graphql    \${LOCAL_GRAPHQL}
    \${pagination_query}=    Create Dictionary    
    ...                      query=query(\$first: Int, \$after: String) { users(first: \$first, after: \$after) { edges { node { id name } cursor } pageInfo { hasNextPage endCursor } } }
    ...                      variables={"first": 3, "after": null}
    \${response}=            POST On Session    graphql    /    json=\${pagination_query}
    Status Should Be         200    \${response}
    \${data}=                Set Variable    \${response.json()}
    Should Have Key          \${data}    data
    Should Have Key          \${data['data']}    users
    \${users}=               Set Variable    \${data['data']['users']}
    Should Have Key          \${users}    edges
    Should Have Key          \${users}    pageInfo
    Length Should Be         \${users['edges']}    3
    Should Have Key          \${users['pageInfo']}    hasNextPage
    Should Have Key          \${users['pageInfo']}    endCursor
    Log    Pagination query successful
    Delete All Sessions</code></pre>
        
        <h3>🎯 Práctica GraphQL (5 min):</h3>
        <p>1. Ejecuta schema introspection para explorar API</p>
        <p>2. Modifica queries simples y observa responses</p>
        <p>3. Implementa queries con variables dinámicas</p>
        <p>4. Testa mutations para crear/actualizar data</p>
        <p>5. Valida nested queries con múltiples niveles</p>
        <p>6. Maneja errores GraphQL específicos</p>
        <p>7. Experimenta con query fragments</p>
        <p>8. Implementa pagination con cursor-based</p>
        <p>9. Agrega Should Have Key para structure validation</p>
        <p>10. Valida que errors array contiene messages</p>
        <p>11. Testa query performance con nested data</p>
        <p>12. Implementa alias en queries complejas</p>
        <p>13. Valida data types en GraphQL responses</p>
        <p>14. Crea reusable query templates</p>
        <p>15. Log GraphQL execution metrics detallados</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar GraphQL queries y mutations</li>
                <li>Implementar schema introspection validation</li>
                <li>Manejar variables, fragments y pagination</li>
                <li>Validar nested data y error handling</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>GraphQL siempre retorna 200 OK. Los errores reales están en el campo "errors" del JSON response.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 131 - WebSocket API Testing</h3>
        <p>Aprenderás a automatizar testing de WebSocket APIs para real-time communication y event-driven systems.</p>
    `,
    topics: ["api", "rest", "json"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-129"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_130 = LESSON_130;
}