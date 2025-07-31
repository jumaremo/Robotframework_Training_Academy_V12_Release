/**
 * Robot Framework Academy - Lesson 002 (VERSIÓN SIMPLE)
 * Instalación de Python y Robot Framework
 */

const LESSON_002 = {
    id: 2,
    title: "Instalación de Python y Robot Framework",
    duration: "8 min",
    level: "beginner",
    section: "section-01",
    searchTerms: "#002 robot framework instalación python setup configuración",
    content: `
        <h2>🧠 Concepto: ¿Por qué Python + Robot Framework?</h2>
        <p>Robot Framework está construido sobre Python, así que necesitamos instalar Python primero. Es como instalar el motor antes de usar el carro.</p>
        <p>Python es gratuito, funciona en Windows/Mac/Linux, y la instalación es muy sencilla si sigues los pasos correctos.</p>
        
        <h3>💻 Comandos de instalación:</h3>
        <pre><code class="bash"># 1. Verificar si Python ya está instalado
python --version

# 2. Instalar Robot Framework
pip install robotframework

# 3. Verificar instalación exitosa
robot --version</code></pre>
        
        <h3>🎯 Práctica (5 min):</h3>
        <p>1. Abre la terminal/símbolo del sistema</p>
        <p>2. Ejecuta <code>python --version</code> (si no tienes Python, descarga de python.org)</p>
        <p>3. Ejecuta <code>pip install robotframework</code></p>
        <p>4. Verifica con <code>robot --version</code></p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Al final de esta lección sabrás:</h4>
            <ul>
                <li>Cómo instalar Python en tu sistema</li>
                <li>Cómo instalar Robot Framework con pip</li>
                <li>Cómo verificar que todo funciona correctamente</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip importante:</h4>
            <p>Si <code>pip install robotframework</code> falla, prueba con: <code>python -m pip install robotframework</code></p>
        </div>
        
        <h3>🚀 Siguiente: Lección 003 - Configuración de Visual Studio Code</h3>
        <p>Ahora que tenemos Python y Robot Framework, configuraremos un editor para escribir nuestros tests cómodamente.</p>
    `,
    topics: ["instalación", "python", "setup"],
    hasCode: true,
    hasExercise: true,
    prerequisites: [],
    estimatedTime: 8,
    difficulty: "easy",
    type: "foundation"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_002 = LESSON_002;
}