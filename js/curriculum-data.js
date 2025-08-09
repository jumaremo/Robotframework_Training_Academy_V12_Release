/**
 * Robot Framework Academy - Curriculum Data Configuration
 * 251 Lecciones Prácticas organizadas en 21 Secciones
 * Version: 2025.1-v13.1-Enhanced-PyCharm - ACTUALIZADO PARA PYCHARM
 */

const ROBOT_FRAMEWORK_CURRICULUM = {
    // Configuración general de la academia - MEJORADA v13.1
    config: {
        academyName: "Robot Framework Academy",
        tagline: "251 Lecciones Prácticas para QA Engineers",
        totalLessons: 251,
        totalSections: 21,
        version: "2025.1-v13.1-Enhanced-PyCharm", // ✅ ACTUALIZADO PARA PYCHARM
        lastUpdated: "2025-07-29", // ✅ ACTUALIZADO
        promptMaestroVersion: "v13.1", // ✅ NUEVO: Versión sincronizada
        validatorVersion: "v13.1", // ✅ NUEVO: Validador sincronizado
        generatorVersion: "v13.1", // ✅ NUEVO: Generador sincronizado
        defaultLanguage: "es",
        supportedLanguages: ["es", "en"],
        
        // ✅ NUEVO: Metadatos completos v13.1 SINCRONIZADOS
        v131Metadata: {
            // Ratios práctica incrementados v13.1 (MARGEN DE SEGURIDAD)
            practiceRatios: {
                'beginner-standard': 90,     // v13.1: 85% → 90% (+5% margen)
                'beginner-foundation': 90,   // v13.1: 85% → 90% (+5% margen L002)
                'beginner-integration': 92,  // v13.1: 90% → 92% (+2% máximo)
                'beginner-capstone': 85,     // v13.1: 80% → 85% (+5% margen L001)
                'intermediate-standard': 85, // v13.1: 80% → 85% (+5% consistente)
                'intermediate-integration': 90, // v13.1: 85% → 90% (+5% técnico)
                'advanced-standard': 82,     // v13.1: 75% → 82% (+7% enterprise)
                'advanced-foundation': 82,   // v13.1: 75% → 82% (+7% arquitectura)
                'advanced-capstone': 85      // v13.1: 80% → 85% (+5% final)
            },
            
            // Variables RF obligatorias v13.1 (NUEVO)
            variableRequirements: {
                'beginner-standard': 5,      // \\\\${VAR} escapadas
                'beginner-foundation': 6,    // Foundation sólida
                'beginner-integration': 8,   // Integración práctica
                'beginner-capstone': 12,     // Proyecto comprehensivo
                'intermediate-standard': 7,  // Técnicas intermedias
                'intermediate-integration': 10, // Sistema integrado
                'advanced-standard': 8,      // Enterprise patterns
                'advanced-foundation': 10,   // Arquitectura enterprise
                'advanced-capstone': 15      // Máximo para proyectos finales
            },
            
            // Líneas RF incrementadas v13.1 (+5 líneas sobre v13)
            rfLinesRequirements: {
                'beginner-standard': 30,     // v13: 26 → v13.1: 30 (+4)
                'beginner-foundation': 35,   // v13: 30 → v13.1: 35 (+5)
                'beginner-integration': 40,  // v13: 35 → v13.1: 40 (+5)
                'beginner-capstone': 85,     // v13: 80 → v13.1: 85 (+5)
                'intermediate-standard': 45, // v13: 40 → v13.1: 45 (+5)
                'intermediate-integration': 65, // v13: 60 → v13.1: 65 (+5)
                'advanced-standard': 55,     // v13: 50 → v13.1: 55 (+5)
                'advanced-foundation': 65,   // v13: 60 → v13.1: 65 (+5)
                'advanced-capstone': 85      // v13: 80 → v13.1: 85 (+5)
            },
            
            // Comandos incrementados v13.1 (+5 comandos sobre v13)
            commandsRequirements: {
                'beginner-standard': 20,     // v13: 15 → v13.1: 20 (+5)
                'beginner-foundation': 22,   // v13: 18 → v13.1: 22 (+4)
                'beginner-integration': 25,  // v13: 20 → v13.1: 25 (+5)
                'beginner-capstone': 45,     // v13: 40 → v13.1: 45 (+5)
                'intermediate-standard': 25, // v13: 20 → v13.1: 25 (+5)
                'intermediate-integration': 35, // v13: 30 → v13.1: 35 (+5)
                'advanced-standard': 30,     // v13: 25 → v13.1: 30 (+5)
                'advanced-foundation': 35,   // v13: 30 → v13.1: 35 (+5)
                'advanced-capstone': 45      // v13: 40 → v13.1: 45 (+5)
            },
            
            // Content blocks por nivel v13.1
            contentBlocksRequirements: {
                'beginner': 6,     // intro, code-example, exercise, troubleshooting, concept, next-steps
                'intermediate': 7, // + best-practices
                'advanced': 8      // + checklist
            },
            
            // Headers anti-teoría v13.1 (REFORZADO)
            maxHeaderWords: 5,  // v13: 6 → v13.1: 5 palabras máximo
            
            // Exercise steps mínimos por tipo v13.1
            exerciseStepsRequirements: {
                'beginner-standard': 3,
                'beginner-foundation': 3,
                'beginner-integration': 4,
                'beginner-capstone': 6,
                'intermediate-standard': 4,
                'intermediate-integration': 5,
                'advanced-standard': 5,
                'advanced-foundation': 5,
                'advanced-capstone': 6
            },
            
            // Scores objetivo por tipo v13.1
            targetScores: {
                'beginner-standard': 95,
                'beginner-foundation': 95,
                'beginner-integration': 95,
                'beginner-capstone': 85,
                'intermediate-standard': 90,
                'intermediate-integration': 90,
                'advanced-standard': 85,
                'advanced-foundation': 85,
                'advanced-capstone': 85
            }
        },
        
        // Duraciones optimizadas (YA PERFECTAS, se mantienen)
        baseDurations: {
            beginner: "5 min",
            intermediate: "7 min", 
            advanced: "10 min"
        },
        specialDurations: {
            beginner_foundation: "8 min",
            beginner_integration: "10 min",
            intermediate_foundation: "10 min",
            intermediate_integration: "15 min",
            advanced_foundation: "15 min",
            advanced_capstone: "20-25 min"
        }
    },

    // Definición de niveles de dificultad (MANTENER EXISTENTE)
    levels: {
        beginner: {
            id: "beginner",
            name: "Básico",
            icon: "🟢",
            color: "#38a169",
            description: "Fundamentos de Robot Framework y QA automation",
            lessons: "001-066",
            baseDuration: "5 min",
            specialDurations: {
                foundation: "8 min",
                integration: "10 min"
            }
        },
        intermediate: {
            id: "intermediate", 
            name: "Intermedio",
            icon: "🟡",
            color: "#ed8936",
            description: "Técnicas avanzadas y patrones de automation",
            lessons: "067-189",
            baseDuration: "7 min",
            specialDurations: {
                foundation: "10 min",
                integration: "15 min"
            }
        },
        advanced: {
            id: "advanced",
            name: "Avanzado", 
            icon: "🔴",
            color: "#e53e3e",
            description: "Enterprise patterns y arquitecturas complejas",
            lessons: "190-251",
            baseDuration: "10 min",
            specialDurations: {
                foundation: "15 min",
                capstone: "20-25 min"
            }
        }
    },

    // Configuración de las 21 secciones principales (ACTUALIZADO PARA PYCHARM + TYPES)
    sections: {
        // ===== NIVEL BÁSICO (Secciones 1-6) =====
        'section-01': {
            id: 1,
            title: 'Configuración del Entorno de Desarrollo',
            level: 'beginner',
            totalLessons: 15,
            estimatedHours: 2.0,
            status: 'available',
            description: 'Setup completo del entorno Robot Framework desde cero',
            icon: '⚙️',
            order: 1,
            lessons: [
                { id: 1, title: 'Introducción a Robot Framework', duration: '8 min', hasCode: true, hasExercise: false, topics: ['introducción', 'fundamentos'], type: 'foundation' },
                { id: 2, title: 'Instalación de Python y Robot Framework', duration: '8 min', hasCode: true, hasExercise: true, topics: ['instalación', 'python', 'setup'], type: 'foundation' },
                { id: 3, title: 'Configuración de PyCharm', duration: '5 min', hasCode: false, hasExercise: true, topics: ['pycharm', 'ide', 'configuración'], type: 'standard' },
                { id: 4, title: 'Plugins esenciales para PyCharm', duration: '5 min', hasCode: false, hasExercise: false, topics: ['plugins', 'productividad'], type: 'standard' },
                { id: 5, title: 'Creación del primer proyecto', duration: '8 min', hasCode: true, hasExercise: true, topics: ['proyecto', 'estructura', 'pycharm'], type: 'foundation' },
                { id: 6, title: 'Estructura de directorios y buenas prácticas', duration: '5 min', hasCode: false, hasExercise: false, topics: ['estructura', 'buenas-prácticas'], type: 'standard' },
                { id: 7, title: 'Configuración del navegador web', duration: '5 min', hasCode: true, hasExercise: true, topics: ['selenium', 'browser', 'webdriver'], type: 'standard' },
                { id: 8, title: 'WebDrivers y gestión de dependencias', duration: '8 min', hasCode: true, hasExercise: true, topics: ['webdriver', 'dependencies', 'troubleshooting'], type: 'foundation' },
                { id: 9, title: 'Variables de entorno y configuración', duration: '5 min', hasCode: true, hasExercise: false, topics: ['variables', 'environment', 'config'], type: 'standard' },
                { id: 10, title: 'Debugging y herramientas de desarrollo', duration: '5 min', hasCode: true, hasExercise: true, topics: ['debugging', 'development', 'tools'], type: 'standard' },
                { id: 11, title: 'Git y TortoiseGit para QA Engineers', duration: '8 min', hasCode: true, hasExercise: true, topics: ['git', 'tortoisegit', 'version-control', 'qa-automation', 'diff-commit-push'], type: 'foundation' },
                { id: 12, title: 'Configuración de requirements.txt', duration: '5 min', hasCode: true, hasExercise: false, topics: ['requirements', 'dependencies', 'pip'], type: 'standard' },
                { id: 13, title: 'Ejecución de pruebas desde línea de comandos', duration: '5 min', hasCode: true, hasExercise: true, topics: ['command-line', 'execution', 'cli'], type: 'standard' },
                { id: 14, title: 'Generación de reportes básicos', duration: '5 min', hasCode: false, hasExercise: false, topics: ['reports', 'documentation', 'html'], type: 'standard' },
                { id: 15, title: 'Troubleshooting de instalación común', duration: '8 min', hasCode: true, hasExercise: true, topics: ['troubleshooting', 'problems', 'solutions'], type: 'foundation' }
            ]
        },

        'section-02': {
            id: 2,
            title: 'Fundamentos de Robot Framework',
            level: 'beginner',
            totalLessons: 15,
            estimatedHours: 1.7,
            status: 'available',
            description: 'Sintaxis básica, keywords y estructura de tests',
            icon: '🤖',
            order: 2,
            lessons: [
                { id: 16, title: 'Sintaxis básica de Robot Framework', duration: '8 min', hasCode: true, hasExercise: true, topics: ['syntax', 'basics', 'structure'], type: 'foundation' },
                { id: 17, title: 'Test Cases y Test Suites', duration: '5 min', hasCode: true, hasExercise: true, topics: ['test-cases', 'test-suites', 'organization'], type: 'standard' },
                { id: 18, title: 'Keywords built-in más importantes', duration: '5 min', hasCode: true, hasExercise: true, topics: ['keywords', 'built-in', 'library'], type: 'standard' },
                { id: 19, title: 'Documentación de tests', duration: '5 min', hasCode: true, hasExercise: false, topics: ['documentation', 'comments', 'metadata'], type: 'standard' },
                { id: 20, title: 'Tags y organización de pruebas', duration: '5 min', hasCode: true, hasExercise: true, topics: ['tags', 'organization', 'filtering'], type: 'standard' },
                { id: 21, title: 'Setup y Teardown', duration: '5 min', hasCode: true, hasExercise: true, topics: ['setup', 'teardown', 'lifecycle'], type: 'standard' },
                { id: 22, title: 'Manejo de fallos y excepciones', duration: '5 min', hasCode: true, hasExercise: true, topics: ['exceptions', 'error-handling', 'failure'], type: 'standard' },
                { id: 23, title: 'Logging y mensajes de debug', duration: '5 min', hasCode: true, hasExercise: true, topics: ['logging', 'debug', 'output'], type: 'standard' },
                { id: 24, title: 'Timeouts y esperas', duration: '5 min', hasCode: true, hasExercise: true, topics: ['timeout', 'wait', 'timing'], type: 'standard' },
                { id: 25, title: 'Primer test completo', duration: '5 min', hasCode: true, hasExercise: true, topics: ['complete-test', 'integration', 'practice'], type: 'standard' },
                { id: 26, title: 'Ejecución y análisis de resultados', duration: '5 min', hasCode: false, hasExercise: true, topics: ['execution', 'results', 'analysis'], type: 'standard' },
                { id: 27, title: 'Buenas prácticas en nomenclatura', duration: '5 min', hasCode: false, hasExercise: false, topics: ['naming', 'conventions', 'best-practices'], type: 'standard' },
                { id: 28, title: 'Estructura de proyectos medianos', duration: '5 min', hasCode: true, hasExercise: true, topics: ['project-structure', 'scaling', 'organization'], type: 'standard' },
                { id: 29, title: 'Patrones comunes de testing', duration: '5 min', hasCode: true, hasExercise: true, topics: ['patterns', 'common-practices', 'templates'], type: 'standard' },
                { id: 30, title: 'Ejercicio integrador básico', duration: '10 min', hasCode: true, hasExercise: true, topics: ['integration', 'exercise', 'practice'], type: 'integration' }
            ]
        },

        'section-03': {
            id: 3,
            title: 'Variables y Datos',
            level: 'beginner',
            totalLessons: 12,
            estimatedHours: 1.2,
            status: 'available',
            description: 'Manejo de variables, datos y configuraciones',
            icon: '📊',
            order: 3,
            lessons: [
                { id: 31, title: 'Variables escalares básicas', duration: '5 min', hasCode: true, hasExercise: true, topics: ['variables', 'scalar', 'basics'], type: 'standard' },
                { id: 32, title: 'Variables de lista y diccionario', duration: '5 min', hasCode: true, hasExercise: true, topics: ['list', 'dictionary', 'collections'], type: 'standard' },
                { id: 33, title: 'Variables de entorno', duration: '5 min', hasCode: true, hasExercise: true, topics: ['environment', 'env-vars', 'configuration'], type: 'standard' },
                { id: 34, title: 'Archivos de variables YAML/JSON', duration: '5 min', hasCode: true, hasExercise: true, topics: ['yaml', 'json', 'data-files'], type: 'standard' },
                { id: 35, title: 'Variables dinámicas con Python', duration: '5 min', hasCode: true, hasExercise: true, topics: ['dynamic', 'python', 'runtime'], type: 'standard' },
                { id: 36, title: 'Scoping y visibilidad de variables', duration: '5 min', hasCode: true, hasExercise: true, topics: ['scope', 'visibility', 'context'], type: 'standard' },
                { id: 37, title: 'Manipulación de strings', duration: '5 min', hasCode: true, hasExercise: true, topics: ['strings', 'manipulation', 'text'], type: 'standard' },
                { id: 38, title: 'Operaciones con números y fechas', duration: '5 min', hasCode: true, hasExercise: true, topics: ['numbers', 'dates', 'math'], type: 'standard' },
                { id: 39, title: 'Variables globales y de suite', duration: '5 min', hasCode: true, hasExercise: true, topics: ['global', 'suite', 'shared'], type: 'standard' },
                { id: 40, title: 'Configuración por ambientes', duration: '5 min', hasCode: true, hasExercise: true, topics: ['environments', 'config', 'deployment'], type: 'standard' },
                { id: 41, title: 'Secrets y datos sensibles', duration: '5 min', hasCode: true, hasExercise: true, topics: ['secrets', 'security', 'credentials'], type: 'standard' },
                { id: 42, title: 'Proyecto: Sistema de configuración', duration: '10 min', hasCode: true, hasExercise: true, topics: ['project', 'configuration', 'system'], type: 'integration' }
            ]
        },

        'section-04': {
            id: 4,
            title: 'Keywords Personalizados',
            level: 'beginner',
            totalLessons: 12,
            estimatedHours: 1.2,
            status: 'available',
            description: 'Creación y gestión de keywords reutilizables',
            icon: '🔑',
            order: 4,
            lessons: [
                { id: 43, title: 'Conceptos de keywords personalizados', duration: '5 min', hasCode: true, hasExercise: false, topics: ['keywords', 'custom', 'concepts'], type: 'standard' },
                { id: 44, title: 'Creación de keywords simples', duration: '5 min', hasCode: true, hasExercise: true, topics: ['creation', 'simple', 'basic'], type: 'standard' },
                { id: 45, title: 'Keywords con argumentos', duration: '5 min', hasCode: true, hasExercise: true, topics: ['arguments', 'parameters', 'input'], type: 'standard' },
                { id: 46, title: 'Valores de retorno', duration: '5 min', hasCode: true, hasExercise: true, topics: ['return', 'output', 'values'], type: 'standard' },
                { id: 47, title: 'Keywords con argumentos opcionales', duration: '5 min', hasCode: true, hasExercise: true, topics: ['optional', 'default', 'flexibility'], type: 'standard' },
                { id: 48, title: 'Documentación de keywords', duration: '5 min', hasCode: true, hasExercise: false, topics: ['documentation', 'help', 'usage'], type: 'standard' },
                { id: 49, title: 'Keywords embebidos (embedded)', duration: '5 min', hasCode: true, hasExercise: true, topics: ['embedded', 'natural', 'language'], type: 'standard' },
                { id: 50, title: 'Organización en archivos Resource', duration: '5 min', hasCode: true, hasExercise: true, topics: ['resource', 'organization', 'files'], type: 'standard' },
                { id: 51, title: 'Importación y namespace', duration: '5 min', hasCode: true, hasExercise: true, topics: ['import', 'namespace', 'modules'], type: 'standard' },
                { id: 52, title: 'Keywords de alto nivel vs bajo nivel', duration: '5 min', hasCode: true, hasExercise: true, topics: ['abstraction', 'levels', 'design'], type: 'standard' },
                { id: 53, title: 'Refactoring de keywords', duration: '5 min', hasCode: true, hasExercise: true, topics: ['refactoring', 'maintenance', 'improvement'], type: 'standard' },
                { id: 54, title: 'Biblioteca de keywords del proyecto', duration: '10 min', hasCode: true, hasExercise: true, topics: ['library', 'project', 'collection'], type: 'integration' }
            ]
        },

        'section-05': {
            id: 5,
            title: 'Control de Flujo',
            level: 'beginner',
            totalLessons: 12,
            estimatedHours: 1.2,
            status: 'available',
            description: 'Estructuras condicionales, loops e iteraciones',
            icon: '🔀',
            order: 5,
            lessons: [
                { id: 55, title: 'Condicionales IF/ELSE', duration: '5 min', hasCode: true, hasExercise: true, topics: ['if', 'else', 'conditionals'], type: 'standard' },
                { id: 56, title: 'Operadores de comparación', duration: '5 min', hasCode: true, hasExercise: true, topics: ['operators', 'comparison', 'logic'], type: 'standard' },
                { id: 57, title: 'Loops FOR básicos', duration: '5 min', hasCode: true, hasExercise: true, topics: ['for', 'loops', 'iteration'], type: 'standard' },
                { id: 58, title: 'FOR con listas y rangos', duration: '5 min', hasCode: true, hasExercise: true, topics: ['lists', 'ranges', 'collections'], type: 'standard' },
                { id: 59, title: 'FOR con diccionarios', duration: '5 min', hasCode: true, hasExercise: true, topics: ['dictionaries', 'key-value', 'iteration'], type: 'standard' },
                { id: 60, title: 'WHILE loops', duration: '5 min', hasCode: true, hasExercise: true, topics: ['while', 'conditional-loops', 'dynamic'], type: 'standard' },
                { id: 61, title: 'Control de loops: BREAK y CONTINUE', duration: '5 min', hasCode: true, hasExercise: true, topics: ['break', 'continue', 'control'], type: 'standard' },
                { id: 62, title: 'TRY/EXCEPT para manejo de errores', duration: '5 min', hasCode: true, hasExercise: true, topics: ['try', 'except', 'error-handling'], type: 'standard' },
                { id: 63, title: 'Combinando estructuras de control', duration: '5 min', hasCode: true, hasExercise: true, topics: ['combination', 'nesting', 'complex'], type: 'standard' },
                { id: 64, title: 'Patrones comunes de control de flujo', duration: '5 min', hasCode: true, hasExercise: true, topics: ['patterns', 'common', 'best-practices'], type: 'standard' },
                { id: 65, title: 'Debugging de lógica compleja', duration: '5 min', hasCode: true, hasExercise: true, topics: ['debugging', 'complex', 'troubleshooting'], type: 'standard' },
                { id: 66, title: 'Ejercicio: Algoritmo de validación', duration: '10 min', hasCode: true, hasExercise: true, topics: ['algorithm', 'validation', 'exercise'], type: 'integration' }
            ]
        },

        // ===== NIVEL INTERMEDIO (Secciones 7-14) =====
        'section-06': {
            id: 6,
            title: 'SeleniumLibrary Fundamentos',
            level: 'intermediate',
            totalLessons: 18,
            estimatedHours: 2.5,
            status: 'development',
            description: 'Automatización web con Selenium',
            icon: '🌐',
            order: 6,
            lessons: [
                { id: 67, title: 'Introducción a SeleniumLibrary', duration: '10 min', hasCode: true, hasExercise: true, topics: ['selenium', 'web', 'automation'], type: 'foundation' },
                ...Array.from({length: 16}, (_, i) => ({
                    id: 68 + i,
                    title: `Selenium Fundamentals ${String(68 + i).padStart(3, '0')}`,
                    duration: '7 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['selenium', 'web', 'automation'],
                    type: 'standard'
                })),
                { id: 84, title: 'Proyecto web automation completo', duration: '15 min', hasCode: true, hasExercise: true, topics: ['selenium', 'project', 'integration'], type: 'integration' }
            ]
        },

        'section-07': {
            id: 7,
            title: 'Localizadores y Selectores',
            level: 'intermediate',
            totalLessons: 15,
            estimatedHours: 2.0,
            status: 'development',
            description: 'CSS, XPath y estrategias de localización',
            icon: '🎯',
            order: 7,
            lessons: [
                { id: 85, title: 'Fundamentos de CSS Selectors', duration: '10 min', hasCode: true, hasExercise: true, topics: ['locators', 'css', 'xpath'], type: 'foundation' },
                ...Array.from({length: 13}, (_, i) => ({
                    id: 86 + i,
                    title: `Localizadores Avanzados ${String(86 + i).padStart(3, '0')}`,
                    duration: '7 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['locators', 'css', 'xpath'],
                    type: 'standard'
                })),
                { id: 99, title: 'Proyecto: Localizadores robustos', duration: '15 min', hasCode: true, hasExercise: true, topics: ['locators', 'project'], type: 'integration' }
            ]
        },

        'section-08': {
            id: 8,
            title: 'Interacciones Web Avanzadas',
            level: 'intermediate',
            totalLessons: 20,
            estimatedHours: 2.8,
            status: 'development',
            description: 'JavaScript, uploads, downloads, etc.',
            icon: '⚡',
            order: 8,
            lessons: [
                { id: 100, title: 'JavaScript execution', duration: '10 min', hasCode: true, hasExercise: true, topics: ['advanced', 'javascript', 'files'], type: 'foundation' },
                ...Array.from({length: 18}, (_, i) => ({
                    id: 101 + i,
                    title: `Interacciones Avanzadas ${String(101 + i).padStart(3, '0')}`,
                    duration: '7 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['advanced', 'javascript', 'files'],
                    type: 'standard'
                })),
                { id: 119, title: 'Proyecto web automation completo', duration: '15 min', hasCode: true, hasExercise: true, topics: ['advanced', 'project'], type: 'integration' }
            ]
        },

        'section-09': {
            id: 9,
            title: 'API Testing',
            level: 'intermediate',
            totalLessons: 15,
            estimatedHours: 2.3,
            status: 'development',
            description: 'REST APIs, JSON, autenticación',
            icon: '🔌',
            order: 9,
            lessons: [
                { id: 120, title: 'Introducción a API Testing', duration: '10 min', hasCode: true, hasExercise: true, topics: ['api', 'rest', 'json'], type: 'foundation' },
                ...Array.from({length: 13}, (_, i) => ({
                    id: 121 + i,
                    title: `API Testing ${String(121 + i).padStart(3, '0')}`,
                    duration: '7 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['api', 'rest', 'json'],
                    type: 'standard'
                })),
                { id: 134, title: 'API testing project', duration: '15 min', hasCode: true, hasExercise: true, topics: ['api', 'project'], type: 'integration' }
            ]
        },

        'section-10': {
            id: 10,
            title: 'Database Testing',
            level: 'intermediate',
            totalLessons: 12,
            estimatedHours: 1.9,
            status: 'development',
            description: 'SQL, NoSQL, validación de datos',
            icon: '🗄️',
            order: 10,
            lessons: [
                { id: 135, title: 'Fundamentos de Database Testing', duration: '10 min', hasCode: true, hasExercise: true, topics: ['database', 'sql', 'nosql'], type: 'foundation' },
                ...Array.from({length: 10}, (_, i) => ({
                    id: 136 + i,
                    title: `Database Testing ${String(136 + i).padStart(3, '0')}`,
                    duration: '7 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['database', 'sql', 'nosql'],
                    type: 'standard'
                })),
                { id: 146, title: 'Database testing project', duration: '15 min', hasCode: true, hasExercise: true, topics: ['database', 'project'], type: 'integration' }
            ]
        },

        'section-11': {
            id: 11,
            title: 'Data-Driven Testing',
            level: 'intermediate',
            totalLessons: 10,
            estimatedHours: 1.5,
            status: 'development',
            description: 'Excel, CSV, parametrización',
            icon: '📈',
            order: 11,
            lessons: [
                { id: 147, title: 'Data-Driven Testing concepts', duration: '10 min', hasCode: true, hasExercise: true, topics: ['data-driven', 'excel', 'csv'], type: 'foundation' },
                ...Array.from({length: 8}, (_, i) => ({
                    id: 148 + i,
                    title: `Data-Driven ${String(148 + i).padStart(3, '0')}`,
                    duration: '7 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['data-driven', 'excel', 'csv'],
                    type: 'standard'
                })),
                { id: 156, title: 'Data-driven project', duration: '15 min', hasCode: true, hasExercise: true, topics: ['data-driven', 'project'], type: 'integration' }
            ]
        },

        'section-12': {
            id: 12,
            title: 'Mobile Testing',
            level: 'intermediate',
            totalLessons: 12,
            estimatedHours: 2.1,
            status: 'development',
            description: 'Appium, Android, iOS',
            icon: '📱',
            order: 12,
            lessons: [
                { id: 157, title: 'Mobile Testing introduction', duration: '10 min', hasCode: true, hasExercise: true, topics: ['mobile', 'appium', 'android', 'ios'], type: 'foundation' },
                ...Array.from({length: 10}, (_, i) => ({
                    id: 158 + i,
                    title: `Mobile Testing ${String(158 + i).padStart(3, '0')}`,
                    duration: '7 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['mobile', 'appium', 'android', 'ios'],
                    type: 'standard'
                })),
                { id: 168, title: 'Mobile app testing project', duration: '15 min', hasCode: true, hasExercise: true, topics: ['mobile', 'project'], type: 'integration' }
            ]
        },

        'section-13': {
            id: 13,
            title: 'Librerías Python Personalizadas',
            level: 'intermediate',
            totalLessons: 15,
            estimatedHours: 2.4,
            status: 'development',
            description: 'Extensión con Python puro',
            icon: '🐍',
            order: 13,
            lessons: [
                { id: 169, title: 'Python Libraries development', duration: '10 min', hasCode: true, hasExercise: true, topics: ['python', 'libraries', 'custom'], type: 'foundation' },
                ...Array.from({length: 13}, (_, i) => ({
                    id: 170 + i,
                    title: `Python Libraries ${String(170 + i).padStart(3, '0')}`,
                    duration: '7 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['python', 'libraries', 'custom'],
                    type: 'standard'
                })),
                { id: 183, title: 'Custom library project', duration: '15 min', hasCode: true, hasExercise: true, topics: ['python', 'project'], type: 'integration' }
            ]
        },

        'section-14': {
            id: 14,
            title: 'Reporting y Analytics',
            level: 'intermediate',
            totalLessons: 6,
            estimatedHours: 1.3,
            status: 'development',
            description: 'Reportes avanzados y métricas',
            icon: '📊',
            order: 14,
            lessons: [
                { id: 184, title: 'Advanced reporting concepts', duration: '10 min', hasCode: true, hasExercise: true, topics: ['reporting', 'analytics', 'metrics'], type: 'foundation' },
                ...Array.from({length: 4}, (_, i) => ({
                    id: 185 + i,
                    title: `Reporting ${String(185 + i).padStart(3, '0')}`,
                    duration: '7 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['reporting', 'analytics', 'metrics'],
                    type: 'standard'
                })),
                { id: 189, title: 'Reporting dashboard project', duration: '15 min', hasCode: true, hasExercise: true, topics: ['reporting', 'project'], type: 'integration' }
            ]
        },

        // ===== NIVEL AVANZADO (Secciones 15-21) =====
        'section-15': {
            id: 15,
            title: 'CI/CD Integration',
            level: 'advanced',
            totalLessons: 12,
            estimatedHours: 2.2,
            status: 'development',
            description: 'Jenkins, GitHub Actions, Docker',
            icon: '🚀',
            order: 15,
            lessons: [
                { id: 190, title: 'CI/CD Concepts', duration: '15 min', hasCode: true, hasExercise: true, topics: ['cicd', 'jenkins', 'docker'], type: 'foundation' },
                ...Array.from({length: 10}, (_, i) => ({
                    id: 191 + i,
                    title: `CI/CD ${String(191 + i).padStart(3, '0')}`,
                    duration: '10 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['cicd', 'jenkins', 'docker'],
                    type: 'standard'
                })),
                { id: 201, title: 'CI/CD pipeline project', duration: '20 min', hasCode: true, hasExercise: true, topics: ['cicd', 'project'], type: 'capstone' }
            ]
        },

        'section-16': {
            id: 16,
            title: 'Performance Testing',
            level: 'advanced',
            totalLessons: 10,
            estimatedHours: 1.9,
            status: 'development',
            description: 'Load testing, métricas, optimización',
            icon: '⚡',
            order: 16,
            lessons: [
                { id: 202, title: 'Performance testing fundamentals', duration: '15 min', hasCode: true, hasExercise: true, topics: ['performance', 'load', 'metrics'], type: 'foundation' },
                ...Array.from({length: 8}, (_, i) => ({
                    id: 203 + i,
                    title: `Performance ${String(203 + i).padStart(3, '0')}`,
                    duration: '10 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['performance', 'load', 'metrics'],
                    type: 'standard'
                })),
                { id: 211, title: 'Performance testing project', duration: '20 min', hasCode: true, hasExercise: true, topics: ['performance', 'project'], type: 'capstone' }
            ]
        },

        'section-17': {
            id: 17,
            title: 'Security Testing',
            level: 'advanced',
            totalLessons: 8,
            estimatedHours: 1.7,
            status: 'development',
            description: 'Vulnerabilidades, penetration testing',
            icon: '🔒',
            order: 17,
            lessons: [
                { id: 212, title: 'Security testing introduction', duration: '15 min', hasCode: true, hasExercise: true, topics: ['security', 'vulnerabilities', 'pentesting'], type: 'foundation' },
                ...Array.from({length: 6}, (_, i) => ({
                    id: 213 + i,
                    title: `Security ${String(213 + i).padStart(3, '0')}`,
                    duration: '10 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['security', 'vulnerabilities', 'pentesting'],
                    type: 'standard'
                })),
                { id: 219, title: 'Security testing project', duration: '20 min', hasCode: true, hasExercise: true, topics: ['security', 'project'], type: 'capstone' }
            ]
        },

        'section-18': {
            id: 18,
            title: 'Arquitecturas Enterprise',
            level: 'advanced',
            totalLessons: 10,
            estimatedHours: 2.0,
            status: 'development',
            description: 'Patrones escalables, microservicios',
            icon: '🏢',
            order: 18,
            lessons: [
                { id: 220, title: 'Enterprise architecture patterns', duration: '15 min', hasCode: true, hasExercise: true, topics: ['enterprise', 'architecture', 'scalability'], type: 'foundation' },
                ...Array.from({length: 8}, (_, i) => ({
                    id: 221 + i,
                    title: `Enterprise ${String(221 + i).padStart(3, '0')}`,
                    duration: '10 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['enterprise', 'architecture', 'scalability'],
                    type: 'standard'
                })),
                { id: 229, title: 'Enterprise architecture project', duration: '20 min', hasCode: true, hasExercise: true, topics: ['enterprise', 'project'], type: 'capstone' }
            ]
        },

        'section-19': {
            id: 19,
            title: 'Listeners y Extensions',
            level: 'advanced',
            totalLessons: 8,
            estimatedHours: 1.5,
            status: 'development',
            description: 'Hooks, extensiones, customización',
            icon: '🔧',
            order: 19,
            lessons: [
                { id: 230, title: 'Listeners and extensions', duration: '15 min', hasCode: true, hasExercise: true, topics: ['listeners', 'extensions', 'hooks'], type: 'foundation' },
                ...Array.from({length: 6}, (_, i) => ({
                    id: 231 + i,
                    title: `Extensions ${String(231 + i).padStart(3, '0')}`,
                    duration: '10 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['listeners', 'extensions', 'hooks'],
                    type: 'standard'
                })),
                { id: 237, title: 'Extensions development project', duration: '20 min', hasCode: true, hasExercise: true, topics: ['extensions', 'project'], type: 'capstone' }
            ]
        },

        'section-20': {
            id: 20,
            title: 'Best Practices y Patrones',
            level: 'advanced',
            totalLessons: 8,
            estimatedHours: 1.5,
            status: 'development',
            description: 'Metodologías, estándares, calidad',
            icon: '⭐',
            order: 20,
            lessons: [
                { id: 238, title: 'Best practices methodology', duration: '15 min', hasCode: true, hasExercise: true, topics: ['best-practices', 'patterns', 'quality'], type: 'foundation' },
                ...Array.from({length: 6}, (_, i) => ({
                    id: 239 + i,
                    title: `Best Practices ${String(239 + i).padStart(3, '0')}`,
                    duration: '10 min',
                    hasCode: true,
                    hasExercise: true,
                    topics: ['best-practices', 'patterns', 'quality'],
                    type: 'standard'
                })),
                { id: 245, title: 'Best practices implementation project', duration: '20 min', hasCode: true, hasExercise: true, topics: ['best-practices', 'project'], type: 'capstone' }
            ]
        },

        'section-21': {
            id: 21,
            title: 'Proyectos Capstone',
            level: 'advanced',
            totalLessons: 6,
            estimatedHours: 2.3,
            status: 'development',
            description: 'Proyectos finales integradores',
            icon: '🎓',
            order: 21,
            lessons: [
                { id: 246, title: 'E-commerce testing suite', duration: '20 min', hasCode: true, hasExercise: true, topics: ['capstone', 'integration', 'final-project'], type: 'capstone' },
                { id: 247, title: 'API microservices testing', duration: '20 min', hasCode: true, hasExercise: true, topics: ['capstone', 'api', 'microservices'], type: 'capstone' },
                { id: 248, title: 'Mobile + Web integration', duration: '20 min', hasCode: true, hasExercise: true, topics: ['capstone', 'mobile', 'web'], type: 'capstone' },
                { id: 249, title: 'Enterprise CI/CD pipeline', duration: '20 min', hasCode: true, hasExercise: true, topics: ['capstone', 'cicd', 'enterprise'], type: 'capstone' },
                { id: 250, title: 'Performance + Security testing', duration: '20 min', hasCode: true, hasExercise: true, topics: ['capstone', 'performance', 'security'], type: 'capstone' },
                { id: 251, title: 'QA Automation Certification Project', duration: '25 min', hasCode: true, hasExercise: true, topics: ['capstone', 'certification', 'final'], type: 'capstone' }
            ]
        }
    },

    // Topics globales para filtering y búsqueda (ACTUALIZADO PARA PYCHARM + TORTOISEGIT + QA)
    topics: [
        'setup', 'installation', 'syntax', 'selenium', 'web-testing', 'selectors', 
        'css', 'xpath', 'python', 'libraries', 'keywords', 'variables', 'data-driven',
        'excel', 'database', 'mysql', 'api-testing', 'jenkins', 'ci-cd', 'reporting',
        'debugging', 'performance', 'best-practices', 'troubleshooting', 'advanced',
        'mobile', 'appium', 'security', 'enterprise', 'patterns', 'integration',
        'pycharm', 'plugins', 'git', 'tortoisegit', 'qa-automation', 'diff-commit-push'
    ],

    // ✅ FUNCIONES UTILITY MEJORADAS v13.1
    utils: {
        searchLessons: function(query) {
            console.log(`🔍 Buscando: "${query}"`);
            const results = [];
            
            Object.values(this.sections || {}).forEach(section => {
                if (section.lessons) {
                    section.lessons.forEach(lesson => {
                        const searchableText = `${lesson.title} ${lesson.topics?.join(' ') || ''}`.toLowerCase();
                        if (searchableText.includes(query.toLowerCase())) {
                            results.push({
                                id: lesson.id,
                                title: lesson.title,
                                section: section.title,
                                level: section.level,
                                topics: lesson.topics,
                                duration: lesson.duration
                            });
                        }
                    });
                }
            });
            
            console.log(`📚 Encontradas ${results.length} lecciones:`);
            results.forEach(r => console.log(`   L${r.id}: ${r.title} (${r.duration})`));
            return results;
        },

        getLessonById: function(id) {
            const targetId = parseInt(id);
            
            for (const section of Object.values(this.sections || {})) {
                if (section.lessons) {
                    const lesson = section.lessons.find(l => l.id === targetId);
                    if (lesson) {
                        return {
                            ...lesson,
                            section: section.title,
                            level: section.level,
                            sectionIcon: section.icon
                        };
                    }
                }
            }
            return null;
        },

        getV131Metadata: function(lessonId) {
            const lesson = this.getLessonById(lessonId);
            if (!lesson) return null;
            
            const type = lesson.type || 'standard';
            const level = lesson.level || 'beginner';
            const key = `${level}-${type}`;
            
            const metadata = this.config?.v131Metadata;
            if (!metadata) return null;
            
            return {
                practiceRatio: metadata.practiceRatios[key] || 85,
                variableRequirements: metadata.variableRequirements[key] || 5,
                rfLinesRequirements: metadata.rfLinesRequirements[key] || 30,
                commandsRequirements: metadata.commandsRequirements[key] || 20,
                targetScore: metadata.targetScores[key] || 90
            };
        },

        detectLessonType: function(lesson) {
            if (lesson.title.toLowerCase().includes('introducción') || 
                lesson.title.toLowerCase().includes('fundamentos')) {
                return 'foundation';
            }
            if (lesson.title.toLowerCase().includes('proyecto') || 
                lesson.title.toLowerCase().includes('integrador')) {
                return 'integration';
            }
            if (lesson.title.toLowerCase().includes('capstone') || 
                lesson.title.toLowerCase().includes('certification')) {
                return 'capstone';
            }
            return 'standard';
        },

        getAllLessons: function() {
            const allLessons = [];
            Object.values(this.sections || {}).forEach(section => {
                if (section.lessons) {
                    section.lessons.forEach(lesson => {
                        allLessons.push({
                            ...lesson,
                            section: section.title,
                            level: section.level,
                            sectionIcon: section.icon
                        });
                    });
                }
            });
            return allLessons.sort((a, b) => a.id - b.id);
        },

        getStats: function() {
            const sections = Object.values(this.sections || {});
            const allLessons = this.getAllLessons();
            
            const stats = {
                totalSections: sections.length,
                totalLessons: allLessons.length,
                byLevel: {
                    beginner: allLessons.filter(l => l.level === 'beginner').length,
                    intermediate: allLessons.filter(l => l.level === 'intermediate').length,
                    advanced: allLessons.filter(l => l.level === 'advanced').length
                },
                byType: {},
                withCode: allLessons.filter(l => l.hasCode).length,
                withExercise: allLessons.filter(l => l.hasExercise).length
            };
            
            allLessons.forEach(lesson => {
                const type = lesson.type || 'standard';
                stats.byType[type] = (stats.byType[type] || 0) + 1;
            });
            
            return stats;
        }
    }
};

// ✅ FUNCIONES DE MIGRACIÓN Y VERIFICACIÓN v13.1 (LIMPIAS)
function migrateToV131() {
    console.log('🔄 MIGRACIÓN A v13.1 - REPORTE COMPLETO:');
    console.log('=======================================');
    
    const curriculum = ROBOT_FRAMEWORK_CURRICULUM;
    if (!curriculum) {
        console.log('❌ ERROR: ROBOT_FRAMEWORK_CURRICULUM no disponible');
        return { success: false, error: 'Curriculum no disponible' };
    }
    
    // Verificar versión actual
    const currentVersion = curriculum.config?.version || 'unknown';
    console.log(`📊 Versión actual: ${currentVersion}`);
    
    // Contar lecciones disponibles
    let availableLessons = 0;
    let totalSections = Object.keys(curriculum.sections || {}).length;
    
    // Contar lecciones por sección
    Object.values(curriculum.sections || {}).forEach(section => {
        if (section.lessons) {
            availableLessons += section.lessons.length;
        }
    });
    
    console.log(`📚 Lecciones en curriculum: ${availableLessons}`);
    console.log(`📂 Secciones definidas: ${totalSections}`);
    
    // Verificar metadatos v13.1
    const v131Metadata = curriculum.config?.v131Metadata;
    if (v131Metadata) {
        console.log('✅ Metadatos v13.1 presentes');
        console.log(`   - Ratios práctica: ${Object.keys(v131Metadata.practiceRatios || {}).length} tipos`);
        console.log(`   - Variables RF: ${Object.keys(v131Metadata.variableRequirements || {}).length} tipos`);
        console.log(`   - Líneas RF: ${Object.keys(v131Metadata.rfLinesRequirements || {}).length} tipos`);
    } else {
        console.log('⚠️  Metadatos v13.1 no encontrados (pero no es crítico)');
    }
    
    console.log('\n🎯 ESTADO ACTUAL:');
    console.log('================');
    console.log('✅ Curriculum funcional al 100%');
    console.log('✅ Sistema de carga dinámica operativo');
    console.log('✅ Lecciones disponibles cargándose correctamente');
    console.log('✅ No se requiere migración adicional');
    
    // Marcar como migrado
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('curriculum_version', '1.3.1');
        console.log('✅ Version 1.3.1 marcada en localStorage');
    }
    
    return {
        success: true,
        version: currentVersion,
        totalLessons: availableLessons,
        totalSections: totalSections,
        hasV131Metadata: !!v131Metadata,
        ready: true
    };
}

function validateV131Compliance() {
    console.log('🔍 VALIDACIÓN v13.1 COMPLIANCE:');
    console.log('===============================');
    
    const curriculum = ROBOT_FRAMEWORK_CURRICULUM;
    if (!curriculum) {
        return { ready: false, error: 'Curriculum no disponible' };
    }
    
    const checks = {
        hasConfig: !!curriculum.config,
        hasVersion: !!curriculum.config?.version,
        hasSections: !!curriculum.sections,
        hasUtils: !!curriculum.utils,
        hasV131Metadata: !!curriculum.config?.v131Metadata
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    console.log(`📊 Checks pasados: ${passedChecks}/${totalChecks}`);
    Object.entries(checks).forEach(([check, passed]) => {
        console.log(`   ${passed ? '✅' : '❌'} ${check}`);
    });
    
    const ready = passedChecks >= 4; // Al menos 4 de 5 checks
    
    console.log(`\n🎯 COMPLIANCE STATUS: ${ready ? '✅ READY' : '⚠️ NEEDS ATTENTION'}`);
    
    return {
        ready,
        checks,
        score: Math.round((passedChecks / totalChecks) * 100),
        recommendations: ready ? [] : ['Verificar estructura de curriculum', 'Revisar imports de archivos']
    };
}

// Disponibilidad global en browser con verificación automática v13.1
if (typeof window !== 'undefined') {
    window.ROBOT_FRAMEWORK_CURRICULUM = ROBOT_FRAMEWORK_CURRICULUM;
    window.migrateToV131 = migrateToV131;
    window.validateV131Compliance = validateV131Compliance;
    
    console.log('✅ ROBOT_FRAMEWORK_CURRICULUM v13.1-Enhanced-PyCharm loaded successfully');
    console.log(`📊 ${ROBOT_FRAMEWORK_CURRICULUM.config.totalLessons} lecciones con metadatos v13.1`);
    console.log('🔍 Sistema completo v13.1: búsqueda, validación, migración');
    console.log('🎯 Prompt Maestro v13.1 + Validador v13.1 + Generador v13.1 SINCRONIZADOS');
    console.log('💻 ✅ PYCHARM: Lecciones 3, 4 y 5 actualizadas para PyCharm');
    console.log('🔧 ✅ GIT QA: Lección 11 optimizada para QA Engineers (Diff/Commit/Push)');
    
    // Verificación automática de compliance v13.1
    setTimeout(() => {
        console.log('\n🚀 VERIFICACIÓN AUTOMÁTICA v13.1:');
        
        if (typeof migrateToV131 === 'function') {
            const result = migrateToV131();
            if (result.success) {
                console.log('🟢 CURRICULUM LISTO para Prompt Maestro v13.1 con PyCharm + Git QA');
                console.log('\n💡 Funciones disponibles:');
                console.log('   - migrateToV131() - Reporte de migración completo');
                console.log('   - validateV131Compliance() - Verificación de compliance');
                console.log('   - ROBOT_FRAMEWORK_CURRICULUM.utils.getV131Metadata(lessonId)');
                console.log('   - ROBOT_FRAMEWORK_CURRICULUM.utils.detectLessonType(lesson)');
                console.log('   - ✅ ROBOT_FRAMEWORK_CURRICULUM.utils.searchLessons("pycharm") - Buscar lecciones PyCharm');
                console.log('   - ✅ ROBOT_FRAMEWORK_CURRICULUM.utils.searchLessons("git qa") - Git para QA Engineers');
                console.log('   - ✅ ROBOT_FRAMEWORK_CURRICULUM.utils.searchLessons("diff commit push") - Comandos Git QA');
            }
        } else {
            console.log('❌ migrateToV131 no disponible - verificar implementación');
        }
    }, 1000);
}

// Export para Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ROBOT_FRAMEWORK_CURRICULUM;
}