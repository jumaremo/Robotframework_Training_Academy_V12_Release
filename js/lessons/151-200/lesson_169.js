/**
 * Robot Framework Academy - Lesson 169
 * Python Libraries development
 */

const LESSON_169 = {
    id: 169,
    title: "Python Libraries development",
    duration: "10 min",
    level: "intermediate",
    section: "section-13",
    content: `
        <h2>🐍 Librerías Python Custom</h2>
        <p>Crea tus propias librerías Python para extender Robot Framework con funcionalidades específicas de tu proyecto.</p>
        
        <h3>💻 Librería Python básica:</h3>
        <pre><code class="robot">*** Settings ***
Library    ./libraries/CustomLibrary.py
Library    Collections

*** Variables ***
\${CUSTOM_PATH}     ./libraries/CustomLibrary.py
\${TEST_STRING}     Robot Framework Testing
\${NUMBER_1}        42
\${NUMBER_2}        58
\${RESULT_VAR}      100
\${FILE_PATH}       ./data/test_file.txt
\${API_URL}         https://api.example.com
\${USER_DATA}       {"name": "test", "age": 30}

*** Test Cases ***
Test Custom String Functions
    \${result}=    Reverse String    \${TEST_STRING}
    Should Be Equal    \${result}    gnitseT krowemarF toboR
    \${count}=     Count Characters    \${TEST_STRING}
    Should Be Equal As Numbers    \${count}    23
    \${upper}=     Make Uppercase    robot framework
    Should Be Equal    \${upper}    ROBOT FRAMEWORK
    Log    Custom string functions working: \${result}

Test Custom Math Operations
    \${sum}=       Add Numbers    \${NUMBER_1}    \${NUMBER_2}
    Should Be Equal As Numbers    \${sum}    \${RESULT_VAR}
    \${product}=   Multiply Numbers    \${NUMBER_1}    2
    Should Be Equal As Numbers    \${product}    84
    \${is_even}=   Is Even Number    \${NUMBER_1}
    Should Be True    \${is_even}
    Log    Math operations result: \${sum}

Test Custom File Operations
    Create Test File    \${FILE_PATH}    Sample content for testing
    File Should Exist    \${FILE_PATH}
    \${content}=    Read File Content    \${FILE_PATH}
    Should Contain    \${content}    Sample content
    Delete Test File    \${FILE_PATH}
    File Should Not Exist    \${FILE_PATH}
    Log    File operations completed successfully

Test Custom API Helpers
    \${headers}=    Create API Headers    application/json    Bearer token123
    Dictionary Should Contain Key    \${headers}    Content-Type
    Dictionary Should Contain Key    \${headers}    Authorization
    \${response}=   Parse JSON Response    \${USER_DATA}
    Should Be Equal    \${response}[name]    test
    Should Be Equal As Numbers    \${response}[age]    30
    Log    API helpers working: \${headers}

Test Custom Validation Functions
    Validate Email Format    test@example.com
    Validate Phone Number    +1-555-123-4567
    Validate URL Format    \${API_URL}
    \${is_valid}=    Check Password Strength    StrongPass123!
    Should Be True    \${is_valid}
    Log    All validations passed successfully</code></pre>

        <h3>🔧 CustomLibrary.py:</h3>
        <pre><code class="python"># ./libraries/CustomLibrary.py
import json
import re
import os
from robot.api.deco import keyword

class CustomLibrary:
    """Custom Robot Framework library with utility functions"""
    
    @keyword
    def reverse_string(self, text):
        """Reverses the given string"""
        return text[::-1]
    
    @keyword
    def count_characters(self, text):
        """Counts characters in string"""
        return len(text)
    
    @keyword
    def make_uppercase(self, text):
        """Converts text to uppercase"""
        return text.upper()
    
    @keyword
    def add_numbers(self, num1, num2):
        """Adds two numbers"""
        return int(num1) + int(num2)
    
    @keyword
    def multiply_numbers(self, num1, num2):
        """Multiplies two numbers"""
        return int(num1) * int(num2)
    
    @keyword
    def is_even_number(self, number):
        """Checks if number is even"""
        return int(number) % 2 == 0
    
    @keyword
    def create_test_file(self, filepath, content):
        """Creates a test file with content"""
        with open(filepath, 'w') as f:
            f.write(content)
    
    @keyword
    def read_file_content(self, filepath):
        """Reads file content"""
        with open(filepath, 'r') as f:
            return f.read()
    
    @keyword
    def delete_test_file(self, filepath):
        """Deletes test file"""
        if os.path.exists(filepath):
            os.remove(filepath)</code></pre>
        
        <h3>🎯 Práctica Python Libraries (8 min):</h3>
        <p>1. Crea carpeta ./libraries/ en tu proyecto Robot Framework</p>
        <p>2. Crea archivo CustomLibrary.py con el código Python de arriba</p>
        <p>3. Agrega método validate_email_format() que use regex</p>
        <p>4. Implementa validate_phone_number() con formato validation</p>
        <p>5. Crea validate_url_format() usando urllib.parse</p>
        <p>6. Agrega check_password_strength() con reglas complejas</p>
        <p>7. Implementa create_api_headers() que retorne diccionario</p>
        <p>8. Crea parse_json_response() para parsear JSON strings</p>
        <p>9. Agrega @keyword decorator a todos los métodos nuevos</p>
        <p>10. Importa la librería en test: Library ./libraries/CustomLibrary.py</p>
        <p>11. Ejecuta robot test_custom.robot y verifica funcionamiento</p>
        <p>12. Agrega docstrings descriptivas a cada método Python</p>
        <p>13. Prueba combinaciones de múltiples keywords custom</p>
        <p>14. Implementa manejo de errores con try/except en Python</p>
        <p>15. Crea test que valide comportamiento en casos edge</p>
        <p>16. Exporta librería para reutilización en otros proyectos</p>
        <p>17. Documenta uso de cada keyword con ejemplos</p>
        <p>18. Verifica que todos los tests pasen consistentemente</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Crear librerías Python personalizadas para Robot Framework</li>
                <li>Usar @keyword decorator para exponer funciones a RF</li>
                <li>Implementar validaciones y utilidades específicas del proyecto</li>
                <li>Integrar código Python avanzado con tests Robot Framework</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Usa @keyword decorator antes de cada función que quieras usar en Robot Framework. El nombre del método se convierte automáticamente en keyword con espacios.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 170 - Librerías Python con parámetros avanzados</h3>
        <p>Aprenderás a crear librerías más complejas con argumentos opcionales, *args, **kwargs y manejo avanzado de tipos de datos.</p>
    `,
    topics: ["python", "libraries", "custom"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 10,
    difficulty: "intermediate",
    prerequisites: ["lesson-168"],
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_169 = LESSON_169;
}