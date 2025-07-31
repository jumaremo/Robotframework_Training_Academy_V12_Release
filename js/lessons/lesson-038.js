const LESSON_038 = {
    id: 38,
    title: "Operaciones con números y fechas",
    duration: "5 min",
    level: "beginner",
    section: "section-03",
    content: `
        <h2>🔢 Números y Fechas</h2>
        <p>Manipulación avanzada de datos numéricos y temporales para cálculos y validaciones.</p>
        
        <h3>💻 Numeric Date Operations:</h3>
        <pre><code class="robot">
*** Variables ***
\${BASE_PRICE}         99.99
\${TAX_RATE}           0.085
\${DISCOUNT_PERCENT}   15
\${QUANTITY}           3
\${CURRENT_YEAR}       \${EMPTY}

*** Test Cases ***
Test Basic Numeric Operations
    [Documentation]    Demonstrates basic mathematical operations with numbers
    [Tags]    variables    numbers    basic
    \${subtotal}        Evaluate    \${BASE_PRICE} * \${QUANTITY}
    \${discount_amount} Evaluate    \${subtotal} * (\${DISCOUNT_PERCENT} / 100)
    \${after_discount}  Evaluate    \${subtotal} - \${discount_amount}
    \${tax_amount}      Evaluate    \${after_discount} * \${TAX_RATE}
    \${final_total}     Evaluate    round(\${after_discount} + \${tax_amount}, 2)
    Log    Base price: $\${BASE_PRICE}
    Log    Quantity: \${QUANTITY}
    Log    Subtotal: $\${subtotal}
    Log    Discount: $\${discount_amount}
    Log    After discount: $\${after_discount}
    Log    Tax: $\${tax_amount}
    Log    Final total: $\${final_total}
    Should Be True    \${final_total} > 0

Test Advanced Math Operations
    [Documentation]    Shows advanced mathematical calculations
    [Tags]    variables    numbers    advanced
    \${square_root}     Evaluate    math.sqrt(64)    modules=math
    \${power_result}    Evaluate    math.pow(2, 10)    modules=math
    \${logarithm}       Evaluate    math.log10(1000)    modules=math
    \${sine_value}      Evaluate    round(math.sin(math.pi/2), 4)    modules=math
    \${random_float}    Evaluate    round(random.uniform(1.0, 10.0), 2)    modules=random
    \${factorial}       Evaluate    math.factorial(5)    modules=math
    Log    Square root of 64: \${square_root}
    Log    2^10: \${power_result}
    Log    Log10(1000): \${logarithm}
    Log    Sin(π/2): \${sine_value}
    Log    Random float: \${random_float}
    Log    5!: \${factorial}
    Should Be Equal As Numbers    \${square_root}    8

Test Date And Time Operations
    [Documentation]    Demonstrates date and time manipulation
    [Tags]    variables    dates    datetime
    \${current_datetime}    Get Current Date
    \${current_timestamp}   Get Current Date    result_format=epoch
    \${formatted_date}      Get Current Date    result_format=%Y-%m-%d %H:%M:%S
    \${date_only}           Get Current Date    result_format=%Y-%m-%d
    \${time_only}           Get Current Date    result_format=%H:%M:%S
    Log    Current datetime: \${current_datetime}
    Log    Timestamp: \${current_timestamp}
    Log    Formatted: \${formatted_date}
    Log    Date only: \${date_only}
    Log    Time only: \${time_only}
    Should Match Regexp    \${date_only}    \\d{4}-\\d{2}-\\d{2}

Test Date Arithmetic And Calculations
    [Documentation]    Shows date arithmetic and duration calculations
    [Tags]    variables    dates    arithmetic
    \${today}           Get Current Date    result_format=%Y-%m-%d
    \${future_date}     Add Time To Date    \${today}    30 days    result_format=%Y-%m-%d
    \${past_date}       Subtract Time From Date    \${today}    7 days    result_format=%Y-%m-%d
    \${date_diff}       Subtract Date From Date    \${future_date}    \${today}
    \${days_diff}       Convert Time    \${date_diff}    result_format=number
    Log    Today: \${today}
    Log    Future (30 days): \${future_date}
    Log    Past (7 days ago): \${past_date}
    Log    Difference: \${date_diff}
    Log    Days difference: \${days_diff}
    Should Be True    \${days_diff} == 30

Test Number Format And Conversion
    [Documentation]    Demonstrates number formatting and type conversion
    [Tags]    variables    numbers    formatting
    \${float_number}    Set Variable    ${123.456789}
    \${rounded_2}       Evaluate    round(\${float_number}, 2)
    \${rounded_0}       Evaluate    round(\${float_number})
    \${integer_part}    Evaluate    int(\${float_number})
    \${string_number}   Convert To String    \${float_number}
    \${back_to_number}  Convert To Number    \${string_number}
    \${formatted}       Evaluate    f"{float(\${float_number}):,.2f}"
    Log    Original: \${float_number}
    Log    Rounded to 2: \${rounded_2}
    Log    Rounded to 0: \${rounded_0}
    Log    Integer part: \${integer_part}
    Log    As string: \${string_number}
    Log    Back to number: \${back_to_number}
    Log    Formatted: \${formatted}

Test Age Calculation From Birthdate
    [Documentation]    Calculates age from birthdate
    [Tags]    variables    dates    age
    \${birthdate}       Set Variable    1990-05-15
    \${current_date}    Get Current Date    result_format=%Y-%m-%d
    \${age_timedelta}   Subtract Date From Date    \${current_date}    \${birthdate}
    \${age_days}        Convert Time    \${age_timedelta}    result_format=number
    \${age_years}       Evaluate    int(\${age_days} / 365.25)
    Log    Birthdate: \${birthdate}
    Log    Current date: \${current_date}
    Log    Age in days: \${age_days}
    Log    Age in years: \${age_years}
    Should Be True    \${age_years} >= 0

Test Business Date Calculations
    [Documentation]    Performs business-related date calculations
    [Tags]    variables    dates    business
    \${order_date}      Get Current Date    result_format=%Y-%m-%d
    \${delivery_date}   Add Time To Date    \${order_date}    5 days    result_format=%Y-%m-%d
    \${payment_due}     Add Time To Date    \${order_date}    30 days    result_format=%Y-%m-%d
    \${quarter_end}     Calculate Quarter End    \${order_date}
    \${days_to_due}     Subtract Date From Date    \${payment_due}    \${order_date}
    \${due_days_num}    Convert Time    \${days_to_due}    result_format=number
    Log    Order date: \${order_date}
    Log    Delivery date: \${delivery_date}
    Log    Payment due: \${payment_due}
    Log    Quarter end: \${quarter_end}
    Log    Days to payment: \${due_days_num}

*** Keywords ***
Calculate Compound Interest
    [Documentation]    Calculates compound interest
    [Arguments]    \${principal}    \${rate}    \${time}    \${compound_frequency}=12
    \${amount}    Evaluate    \${principal} * (1 + \${rate}/\${compound_frequency}) ** (\${compound_frequency} * \${time})
    \${interest}    Evaluate    \${amount} - \${principal}
    \${final_amount}    Evaluate    round(\${amount}, 2)
    \${interest_earned}    Evaluate    round(\${interest}, 2)
    Log    Principal: $\${principal}
    Log    Rate: \${rate * 100}%
    Log    Time: \${time} years
    Log    Final amount: $\${final_amount}
    Log    Interest earned: $\${interest_earned}
    RETURN    \${final_amount}    \${interest_earned}

Calculate Statistics
    [Documentation]    Calculates basic statistics for a list of numbers
    [Arguments]    @{numbers}
    \${count}       Get Length    \${numbers}
    \${sum_total}   Evaluate    sum([int(x) for x in [\@{numbers}]])
    \${average}     Evaluate    \${sum_total} / \${count}
    \${minimum}     Evaluate    min([int(x) for x in [\@{numbers}]])
    \${maximum}     Evaluate    max([int(x) for x in [\@{numbers}]])
    \${sorted_list} Evaluate    sorted([int(x) for x in [\@{numbers}]])
    \${median}      Calculate Median    @{sorted_list}
    Log    Numbers: @{numbers}
    Log    Count: \${count}
    Log    Sum: \${sum_total}
    Log    Average: \${average}
    Log    Min: \${minimum}
    Log    Max: \${maximum}
    Log    Median: \${median}
    RETURN    \${average}    \${median}

Calculate Median
    [Arguments]    @{sorted_numbers}
    \${count}    Get Length    \${sorted_numbers}
    \${is_even}  Evaluate    \${count} % 2 == 0
    \${median}   Run Keyword If    \${is_even}
    ...    Evaluate    (\${sorted_numbers}[\${count}//2-1] + \${sorted_numbers}[\${count}//2]) / 2
    ...    ELSE    Set Variable    \${sorted_numbers}[\${count}//2]
    RETURN    \${median}

Format Currency
    [Documentation]    Formats number as currency
    [Arguments]    \${amount}    \${currency}=$
    \${formatted}    Evaluate    f"\${currency}{float(\${amount}):,.2f}"
    RETURN    \${formatted}

Calculate Quarter End
    [Documentation]    Calculates the end date of quarter for given date
    [Arguments]    \${date}
    \${year}     Evaluate    datetime.datetime.strptime('\${date}', '%Y-%m-%d').year    modules=datetime
    \${month}    Evaluate    datetime.datetime.strptime('\${date}', '%Y-%m-%d').month    modules=datetime
    \${quarter}  Evaluate    ((int(\${month}) - 1) // 3) + 1
    \${end_month}    Evaluate    \${quarter} * 3
    \${quarter_end}  Evaluate    datetime.datetime(\${year}, \${end_month}, 1) + datetime.timedelta(days=32)    modules=datetime
    \${last_day}     Evaluate    \${quarter_end}.replace(day=1) - datetime.timedelta(days=1)    modules=datetime
    \${formatted}    Evaluate    \${last_day}.strftime('%Y-%m-%d')
    RETURN    \${formatted}

Generate Random Numbers
    [Documentation]    Generates random numbers for testing
    [Arguments]    \${count}=5    \${min_val}=1    \${max_val}=100
    @{random_numbers}    Create List
    FOR    \${i}    IN RANGE    \${count}
        \${random_num}    Evaluate    random.randint(\${min_val}, \${max_val})    modules=random
        Append To List    \${random_numbers}    \${random_num}
    END
    Log    Generated random numbers: @{random_numbers}
    RETURN    @{random_numbers}

Validate Date Range
    [Documentation]    Validates that date is within specified range
    [Arguments]    \${date_to_check}    \${start_date}    \${end_date}
    \${is_after_start}    Evaluate    '\${date_to_check}' >= '\${start_date}'
    \${is_before_end}     Evaluate    '\${date_to_check}' <= '\${end_date}'
    \${is_in_range}       Evaluate    \${is_after_start} and \${is_before_end}
    Log    Date \${date_to_check} in range [\${start_date}, \${end_date}]: \${is_in_range}
    RETURN    \${is_in_range}
        </code></pre>
        
        <h3>🎯 Práctica Números Fechas (4 min):</h3>
        <ol>
            <li><strong>Math básico:</strong> Usar Evaluate para operaciones aritméticas complejas</li>
            <li><strong>Math avanzado:</strong> Usar math module para sqrt, pow, log, trigonometría</li>
            <li><strong>Number formatting:</strong> Usar round(), int(), float() para conversiones</li>
            <li><strong>Currency formatting:</strong> Formatear números como moneda con f-strings</li>
            <li><strong>Date operations:</strong> Usar Get Current Date con diferentes formatos</li>
            <li><strong>Date arithmetic:</strong> Usar Add Time To Date, Subtract Time From Date</li>
            <li><strong>Date calculations:</strong> Calcular diferencias con Subtract Date From Date</li>
            <li><strong>Time conversion:</strong> Usar Convert Time para convertir duraciones</li>
            <li><strong>Age calculation:</strong> Calcular edad desde fecha de nacimiento</li>
            <li><strong>Business dates:</strong> Calcular fechas de entrega, vencimiento, fin de trimestre</li>
            <li><strong>Statistics:</strong> Calcular promedio, mediana, min/max de listas</li>
            <li><strong>Compound interest:</strong> Implementar cálculos financieros complejos</li>
            <li><strong>Random numbers:</strong> Generar números aleatorios para test data</li>
            <li><strong>Date validation:</strong> Validar que fechas estén en rangos específicos</li>
            <li><strong>Complex scenarios:</strong> Combinar operaciones numéricas y temporales</li>
        </ol>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Dominar operaciones matemáticas complejas usando Evaluate y módulos Python</li>
                <li>Implementar manipulación avanzada de fechas y cálculos temporales</li>
                <li>Crear keywords para cálculos financieros y estadísticos reutilizables</li>
                <li>Validar y formatear datos numéricos y temporales efectivamente</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa math module para cálculos avanzados y datetime module para manipulación de fechas. El formato epoch es útil para cálculos numéricos con fechas.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 039 - Variables globales y de suite</h3>
        <p>Profundizaremos en el manejo avanzado de variables compartidas entre tests y suites para arquitecturas escalables.</p>
    `,
    topics: ["numbers", "dates", "math"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 5,
    difficulty: "easy",
    prerequisites: ["lesson-037"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_038 = LESSON_038;
}