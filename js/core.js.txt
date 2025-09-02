/**
 * Robot Framework Academy - Enhanced Core System v3.1 - OPTIMIZED
 * Motor principal del sistema de entrenamiento con fixes críticos
 */

// ===== VARIABLES GLOBALES =====
window.RFAcademy = {
    currentLessonId: null,
    completedLessons: [],
    sidebarVisible: true,
    currentTheme: 'light',
    searchTimeout: null,
    fabMenuOpen: false,
    curriculum: null,
    loadedLessons: {}
};

// ===== INICIALIZACIÓN PRINCIPAL =====
function initializeApp() {
    console.log('🚀 Inicializando Robot Framework Academy v3.1 - OPTIMIZED...');
    
    try {
        // Cargar configuraciones guardadas
        loadSavedSettings();
        
        // Inicializar curriculum
        initializeCurriculum();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Cargar lecciones disponibles
        loadAvailableLessons();
        
        // Generar estructura del sidebar
        generateSidebar();
        
        // Actualizar estadísticas
        updateProgressStats();
        
        // Aplicar tema
        applyTheme(window.RFAcademy.currentTheme);
        
        // Restaurar estado del sidebar
        restoreSidebarState();
        
        console.log('✅ Robot Framework Academy inicializada correctamente');
        
    } catch (error) {
        console.error('❌ Error inicializando la academy:', error);
        showToast('Error inicializando la aplicación', 'error');
    }
}

// ===== CONFIGURACIONES GUARDADAS =====
function loadSavedSettings() {
    try {
        // Cargar progreso
        const savedProgress = localStorage.getItem('rf-academy-progress');
        if (savedProgress) {
            try {
                window.RFAcademy.completedLessons = JSON.parse(savedProgress);
            } catch (e) {
                console.warn('Error cargando progreso guardado:', e);
                window.RFAcademy.completedLessons = [];
            }
        }
        
        // Cargar tema
        const savedTheme = localStorage.getItem('rf-academy-theme');
        if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
            window.RFAcademy.currentTheme = savedTheme;
        }
        
        // Cargar visibilidad sidebar
        const sidebarVisible = localStorage.getItem('rf-academy-sidebar-visible');
        if (sidebarVisible !== null) {
            window.RFAcademy.sidebarVisible = sidebarVisible === 'true';
        }
        
        console.log('✅ Configuraciones cargadas correctamente');
    } catch (error) {
        console.warn('⚠️ Error cargando configuraciones:', error);
    }
}

function saveSettings() {
    try {
        localStorage.setItem('rf-academy-progress', JSON.stringify(window.RFAcademy.completedLessons));
        localStorage.setItem('rf-academy-theme', window.RFAcademy.currentTheme);
        localStorage.setItem('rf-academy-sidebar-visible', window.RFAcademy.sidebarVisible.toString());
        console.log('💾 Configuraciones guardadas');
    } catch (error) {
        console.error('❌ Error guardando configuraciones:', error);
    }
}

function restoreSidebarState() {
    // Aplicar estado guardado del sidebar sin animación
    if (!window.RFAcademy.sidebarVisible) {
        const sidebar = document.getElementById('sidebar');
        const mainLayout = document.querySelector('.main-layout');
        const toggleIcon = document.querySelector('.toggle-icon');
        
        if (sidebar && mainLayout) {
            sidebar.classList.add('collapsed');
            mainLayout.classList.add('sidebar-collapsed');
            if (toggleIcon) {
                toggleIcon.textContent = '››';
                toggleIcon.parentElement.title = 'Mostrar menú';
            }
            console.log('📐 Estado del sidebar restaurado: colapsado');
        }
    }
}

// ===== CURRICULUM Y LECCIONES =====
function initializeCurriculum() {
    if (typeof window.ROBOT_FRAMEWORK_CURRICULUM !== 'undefined') {
        window.RFAcademy.curriculum = window.ROBOT_FRAMEWORK_CURRICULUM;
        console.log('📚 Curriculum cargado:', window.RFAcademy.curriculum.config.totalLessons, 'lecciones');
    } else {
        console.error('❌ Curriculum no encontrado');
        throw new Error('ROBOT_FRAMEWORK_CURRICULUM no está disponible');
    }
}

function loadAvailableLessons() {
    const lessons = {};
    
    // Intentar cargar lecciones disponibles (001-251) - EXPANDIDO
    for (let i = 1; i <= 251; i++) {
        const lessonKey = `LESSON_${String(i).padStart(3, '0')}`;
        if (typeof window[lessonKey] !== 'undefined') {
            lessons[i] = window[lessonKey];
            console.log(`✅ Cargada ${lessonKey}: ${lessons[i].title}`);
        } else {
            // Solo mostrar log para lecciones que esperamos que existan pronto
            if (i <= 20) {
                console.log(`⏳ ${lessonKey} no disponible`);
            }
        }
    }
    
    window.RFAcademy.loadedLessons = lessons;
    console.log(`📖 Total lecciones cargadas: ${Object.keys(lessons).length}`);
}

// ===== GENERACIÓN DEL SIDEBAR =====
function generateSidebar() {
    const sectionsMenu = document.getElementById('sectionsMenu');
    if (!sectionsMenu || !window.RFAcademy.curriculum) {
        console.warn('⚠️ No se puede generar sidebar: elementos no encontrados');
        return;
    }
    
    sectionsMenu.innerHTML = '';
    
    // Obtener secciones ordenadas
    const sections = Object.values(window.RFAcademy.curriculum.sections)
        .sort((a, b) => a.order - b.order);
    
    sections.forEach(section => {
        const sectionElement = createSectionElement(section);
        sectionsMenu.appendChild(sectionElement);
    });
    
    console.log('🔧 Sidebar generado correctamente');
}

function createSectionElement(section) {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'curriculum-section';
    sectionDiv.dataset.sectionId = `section-${String(section.id).padStart(2, '0')}`;
    
    // Determinar si está disponible
    const isAvailable = section.status === 'available';
    const availableLessons = isAvailable ? section.lessons.filter(lesson => 
        window.RFAcademy.loadedLessons[lesson.id]
    ).length : 0;
    
    sectionDiv.innerHTML = `
        <div class="section-header" onclick="toggleSection('${sectionDiv.dataset.sectionId}')">
            <div class="section-info">
                <span class="section-icon">${section.icon}</span>
                <div class="section-details">
                    <h3>${section.title}</h3>
                    <div class="section-meta">
                        <span>${section.level === 'beginner' ? '🟢 Básico' : section.level === 'intermediate' ? '🟡 Intermedio' : '🔴 Avanzado'}</span>
                        <span>${section.totalLessons} lecciones</span>
                        <span>${availableLessons > 0 ? `${availableLessons} disponibles` : 'En desarrollo'}</span>
                    </div>
                </div>
            </div>
            <button class="section-toggle">▼</button>
        </div>
        <div class="section-lessons" id="${sectionDiv.dataset.sectionId}-lessons">
            ${createLessonsHTML(section)}
        </div>
    `;
    
    return sectionDiv;
}

function createLessonsHTML(section) {
    return section.lessons.map(lesson => {
        const isCompleted = window.RFAcademy.completedLessons.includes(lesson.id);
        const isAvailable = !!window.RFAcademy.loadedLessons[lesson.id];
        const lessonNumber = String(lesson.id).padStart(3, '0');
        
        return `
            <div class="lesson-item ${isCompleted ? 'completed' : ''} ${window.RFAcademy.currentLessonId === lesson.id ? 'current' : ''}"
                 data-lesson-id="${lesson.id}"
                 onclick="${isAvailable ? `loadLessonDirect(${lesson.id})` : 'showComingSoon()'}">
                <div class="lesson-content-info">
                    <span class="lesson-number">${lessonNumber}</span>
                    <span class="lesson-title">${lesson.title}</span>
                </div>
                <div class="lesson-meta-info">
                    <span class="lesson-duration">⏱️ ${lesson.duration}</span>
                    <div class="lesson-indicators">
                        ${lesson.hasCode ? '<span class="lesson-indicator has-code" title="Incluye código">💻</span>' : ''}
                        ${lesson.hasExercise ? '<span class="lesson-indicator has-exercise" title="Incluye ejercicios">🎯</span>' : ''}
                    </div>
                </div>
                <span class="lesson-status">${isCompleted ? '✅' : isAvailable ? '📝' : '⏳'}</span>
            </div>
        `;
    }).join('');
}

// ===== NAVEGACIÓN DE LECCIONES =====
function loadLessonDirect(lessonId) {
    console.log(`📖 Cargando lección ${String(lessonId).padStart(3, '0')}`);
    
    try {
        // Mostrar loading state
        showLoadingState();
        
        // Verificar si la lección existe
        const lessonData = window.RFAcademy.loadedLessons[lessonId];
        if (!lessonData) {
            console.warn(`⚠️ Lección ${lessonId} no disponible`);
            hideLoadingState();
            showComingSoon();
            return;
        }
        
        // Ocultar welcome screen
        hideWelcomeScreen();
        
        // Mostrar contenido de la lección
        showLessonContent(lessonData);
        
        // Actualizar estado actual
        window.RFAcademy.currentLessonId = lessonId;
        
        // Actualizar UI
        updateCurrentLessonUI(lessonId);
        
        // Mostrar breadcrumb
        showBreadcrumb(lessonData);
        
        // Scroll al contenido
        scrollToContent();
        
        // Ocultar loading state
        hideLoadingState();
        
        console.log(`✅ Lección ${lessonId} cargada: ${lessonData.title}`);
        
    } catch (error) {
        hideLoadingState();
        console.error('❌ Error cargando lección:', error);
        showToast('Error cargando la lección', 'error');
    }
}

function showLoadingState() {
    const lessonContent = document.getElementById('lessonContent');
    if (lessonContent) {
        lessonContent.innerHTML = `
            <div class="lesson-loading">
                <div class="loading-spinner"></div>
                <h3>Cargando lección...</h3>
                <p>Preparando contenido...</p>
            </div>
        `;
        lessonContent.classList.remove('hidden');
        lessonContent.classList.add('active');
    }
}

function hideLoadingState() {
    // Se oculta automáticamente cuando se carga el contenido
}

function showLessonContent(lessonData) {
    const lessonContent = document.getElementById('lessonContent');
    const lessonActions = document.getElementById('lessonActions');
    
    if (!lessonContent) {
        console.error('❌ lessonContent element not found');
        return;
    }
    
    // Mostrar contenido
    lessonContent.innerHTML = lessonData.content;
    lessonContent.classList.remove('hidden');
    lessonContent.classList.add('active');
    
    // Mostrar acciones
    if (lessonActions) {
        lessonActions.classList.remove('hidden');
        updateLessonActions(lessonData.id);
    }
}

function updateLessonActions(lessonId) {
    const prevBtn = document.getElementById('prevLessonBtn');
    const nextBtn = document.getElementById('nextLessonBtn');
    const completeBtn = document.getElementById('completeBtn');
    
    // Botón anterior
    if (prevBtn) {
        const prevLesson = getPreviousAvailableLesson(lessonId);
        if (prevLesson) {
            prevBtn.style.display = 'flex';
            prevBtn.onclick = () => loadLessonDirect(prevLesson.id);
        } else {
            prevBtn.style.display = 'none';
        }
    }
    
    // Botón siguiente
    if (nextBtn) {
        const nextLesson = getNextAvailableLesson(lessonId);
        if (nextLesson) {
            nextBtn.style.display = 'flex';
            nextBtn.onclick = () => loadLessonDirect(nextLesson.id);
        } else {
            nextBtn.style.display = 'none';
        }
    }
    
    // Botón completar
    if (completeBtn) {
        const isCompleted = window.RFAcademy.completedLessons.includes(lessonId);
        completeBtn.textContent = isCompleted ? '✅ Completada' : '✅ Marcar Completada';
        completeBtn.classList.toggle('completed', isCompleted);
    }
}

function getPreviousAvailableLesson(currentId) {
    const availableIds = Object.keys(window.RFAcademy.loadedLessons).map(Number).sort((a, b) => a - b);
    const currentIndex = availableIds.indexOf(currentId);
    return currentIndex > 0 ? { id: availableIds[currentIndex - 1] } : null;
}

function getNextAvailableLesson(currentId) {
    const availableIds = Object.keys(window.RFAcademy.loadedLessons).map(Number).sort((a, b) => a - b);
    const currentIndex = availableIds.indexOf(currentId);
    return currentIndex < availableIds.length - 1 ? { id: availableIds[currentIndex + 1] } : null;
}

function navigateLesson(direction) {
    const currentId = window.RFAcademy.currentLessonId;
    if (!currentId) return;
    
    if (direction === 'prev') {
        const prevLesson = getPreviousAvailableLesson(currentId);
        if (prevLesson) loadLessonDirect(prevLesson.id);
    } else if (direction === 'next') {
        const nextLesson = getNextAvailableLesson(currentId);
        if (nextLesson) loadLessonDirect(nextLesson.id);
    }
}

// ===== UI UPDATES =====
function updateCurrentLessonUI(lessonId) {
    // Actualizar items activos en sidebar
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.classList.remove('current');
        if (lessonId && parseInt(item.dataset.lessonId) === lessonId) {
            item.classList.add('current');
        }
    });
}

function showBreadcrumb(lessonData) {
    const breadcrumb = document.getElementById('breadcrumb');
    const currentLesson = document.getElementById('currentLesson');
    
    if (breadcrumb && currentLesson) {
        const lessonNumber = String(lessonData.id).padStart(3, '0');
        currentLesson.textContent = `Lección ${lessonNumber}: ${lessonData.title}`;
        breadcrumb.style.display = 'flex';
    }
}

function hideWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
        welcomeScreen.classList.add('hidden');
    }
}

function showWelcome() {
    console.log('🏠 Ejecutando showWelcome...');
    try {
        const welcomeScreen = document.getElementById('welcomeScreen');
        const lessonContent = document.getElementById('lessonContent');
        const lessonActions = document.getElementById('lessonActions');
        const breadcrumb = document.getElementById('breadcrumb');
        
        if (welcomeScreen) {
            welcomeScreen.style.display = 'block';
            welcomeScreen.classList.remove('hidden');
            console.log('✅ Welcome screen mostrado');
        } else {
            console.warn('⚠️ welcomeScreen no encontrado');
        }
        
        if (lessonContent) {
            lessonContent.classList.add('hidden');
            lessonContent.classList.remove('active');
        }
        
        if (lessonActions) lessonActions.classList.add('hidden');
        if (breadcrumb) breadcrumb.style.display = 'none';
        
        window.RFAcademy.currentLessonId = null;
        updateCurrentLessonUI(null);
        
        console.log('✅ showWelcome completado');
    } catch (error) {
        console.error('❌ Error en showWelcome:', error);
        showToast('Error volviendo al inicio', 'error');
    }
}

function scrollToContent() {
    setTimeout(() => {
        const lessonContent = document.getElementById('lessonContent');
        if (lessonContent) {
            lessonContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }, 100);
}

// ===== PROGRESO Y COMPLETACIÓN =====
function toggleLessonComplete() {
    const currentId = window.RFAcademy.currentLessonId;
    if (!currentId) return;
    
    const isCompleted = window.RFAcademy.completedLessons.includes(currentId);
    
    if (isCompleted) {
        // Desmarcar como completada
        window.RFAcademy.completedLessons = window.RFAcademy.completedLessons.filter(id => id !== currentId);
        showToast('Lección desmarcada como completada', 'info');
    } else {
        // Marcar como completada
        window.RFAcademy.completedLessons.push(currentId);
        showToast('¡Lección completada! 🎉', 'success');
    }
    
    // Actualizar UI
    updateLessonItemCompletedState(currentId);
    updateLessonActions(currentId);
    updateProgressStats();
    
    // Guardar cambios
    saveSettings();
}

function updateLessonItemCompletedState(lessonId) {
    const lessonItem = document.querySelector(`[data-lesson-id="${lessonId}"]`);
    if (lessonItem) {
        const isCompleted = window.RFAcademy.completedLessons.includes(lessonId);
        lessonItem.classList.toggle('completed', isCompleted);
        
        const statusSpan = lessonItem.querySelector('.lesson-status');
        if (statusSpan) {
            statusSpan.textContent = isCompleted ? '✅' : '📝';
        }
    }
}

function updateProgressStats() {
    if (!window.RFAcademy.curriculum) return;
    
    // Calcular estadísticas manualmente si getProgressStats no existe
    let stats;
    if (window.RFAcademy.curriculum.utils && typeof window.RFAcademy.curriculum.utils.getProgressStats === 'function') {
        stats = window.RFAcademy.curriculum.utils.getProgressStats(window.RFAcademy.completedLessons);
    } else {
        // Calcular estadísticas manualmente
        const totalLessons = window.RFAcademy.curriculum.config.totalLessons;
        const completedLessons = window.RFAcademy.completedLessons.length;
        const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        
        stats = {
            completed: completedLessons,
            total: totalLessons,
            percentage: percentage
        };
    }
    
    // Actualizar contadores
    const completedCount = document.getElementById('completedCount');
    const progressPercent = document.getElementById('progressPercent');
    const globalProgressText = document.getElementById('globalProgressText');
    const globalProgressFill = document.getElementById('globalProgressFill');
    const progressCircle = document.getElementById('progressCircle');
    
    if (completedCount) completedCount.textContent = stats.completed;
    if (progressPercent) progressPercent.textContent = `${stats.percentage}%`;
    if (globalProgressText) globalProgressText.textContent = `${stats.completed}/${stats.total}`;
    if (globalProgressFill) globalProgressFill.style.width = `${stats.percentage}%`;
    if (progressCircle) {
        const angle = (stats.percentage / 100) * 360;
        progressCircle.style.background = `conic-gradient(var(--color-primary) ${angle}deg, var(--bg-tertiary) ${angle}deg)`;
    }
}

// ===== SECCIONES Y FILTROS =====
function toggleSection(sectionId) {
    const section = document.querySelector(`[data-section-id="${sectionId}"]`);
    if (!section) return;
    
    const lessonsDiv = document.getElementById(`${sectionId}-lessons`);
    const toggle = section.querySelector('.section-toggle');
    
    if (!lessonsDiv || !toggle) return;
    
    const isExpanded = lessonsDiv.classList.contains('expanded');
    
    if (isExpanded) {
        lessonsDiv.classList.remove('expanded');
        toggle.classList.remove('expanded');
        lessonsDiv.style.display = 'none';
    } else {
        lessonsDiv.classList.add('expanded');
        toggle.classList.add('expanded');
        lessonsDiv.style.display = 'block';
    }
}

function applyFilter(filterType) {
    console.log(`🎯 Aplicando filtro: ${filterType}`);
    
    const sections = document.querySelectorAll('.curriculum-section');
    let visibleCount = 0;
    
    // Actualizar botones de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filterType);
    });
    
    sections.forEach(section => {
        const lessons = section.querySelectorAll('.lesson-item');
        let sectionHasVisibleLessons = false;
        
        lessons.forEach(lesson => {
            const lessonId = parseInt(lesson.dataset.lessonId);
            const isCompleted = window.RFAcademy.completedLessons.includes(lessonId);
            const isAvailable = !!window.RFAcademy.loadedLessons[lessonId];
            
            let shouldShow = false;
            
            switch (filterType) {
                case 'all':
                    shouldShow = true;
                    break;
                case 'beginner':
                    shouldShow = lessonId >= 1 && lessonId <= 66;
                    break;
                case 'intermediate':
                    shouldShow = lessonId >= 67 && lessonId <= 189;
                    break;
                case 'advanced':
                    shouldShow = lessonId >= 190 && lessonId <= 251;
                    break;
                case 'completed':
                    shouldShow = isCompleted;
                    break;
                case 'pending':
                    shouldShow = !isCompleted && isAvailable;
                    break;
            }
            
            if (shouldShow) {
                lesson.style.display = 'flex';
                sectionHasVisibleLessons = true;
                visibleCount++;
            } else {
                lesson.style.display = 'none';
            }
        });
        
        // Mostrar/ocultar sección según si tiene lecciones visibles
        if (sectionHasVisibleLessons) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Mostrar mensaje si no hay resultados
    if (visibleCount === 0) {
        showNoResultsMessage(filterType);
    }
}

function showNoResultsMessage(filterType) {
    const sectionsMenu = document.getElementById('sectionsMenu');
    if (!sectionsMenu) return;
    
    const filterNames = {
        'beginner': '🟢 Básico',
        'intermediate': '🟡 Intermedio', 
        'advanced': '🔴 Avanzado',
        'completed': '✅ Completadas',
        'pending': '⏳ Pendientes'
    };
    
    const message = filterType === 'intermediate' || filterType === 'advanced' 
        ? `Las lecciones de nivel ${filterNames[filterType]} estarán disponibles próximamente.`
        : `No hay lecciones ${filterNames[filterType]} para mostrar.`;
    
    sectionsMenu.innerHTML = `
        <div class="no-results-message">
            <div class="no-results-icon">🔍</div>
            <h3>Sin resultados</h3>
            <p>${message}</p>
            <button onclick="applyFilter('all')" class="cta-secondary">
                🔄 Mostrar todas las lecciones
            </button>
        </div>
    `;
}

// ===== BÚSQUEDA MEJORADA =====
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    // Debounce mejorado
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            hideSearchResults();
            return;
        }
        
        // Debounce de 300ms
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    searchInput.addEventListener('blur', () => {
        setTimeout(hideSearchResults, 200);
    });
    
    searchInput.addEventListener('focus', () => {
        const query = searchInput.value.trim();
        if (query.length >= 2) {
            performSearch(query);
        }
    });
}

function performSearch(query) {
    if (!window.RFAcademy.curriculum) return;
    
    // Si existe la función de búsqueda del curriculum, usarla
    if (window.RFAcademy.curriculum.utils && typeof window.RFAcademy.curriculum.utils.searchLessons === 'function') {
        const results = window.RFAcademy.curriculum.utils.searchLessons(query);
        displaySearchResults(results, query);
        return;
    }
    
    // Fallback: búsqueda manual simple
    const results = [];
    const queryLower = query.toLowerCase();
    
    Object.values(window.RFAcademy.curriculum.sections).forEach(section => {
        section.lessons.forEach(lesson => {
            let score = 0;
            let matchReason = '';
            
            // Buscar en título
            if (lesson.title.toLowerCase().includes(queryLower)) {
                score += 10;
                matchReason = 'título';
            }
            
            // Buscar en topics
            if (lesson.topics?.some(topic => topic.toLowerCase().includes(queryLower))) {
                score += 5;
                matchReason = matchReason ? `${matchReason}, topics` : 'topics';
            }
            
            // Buscar por ID
            const lessonNumber = String(lesson.id).padStart(3, '0');
            if (lessonNumber === queryLower || lesson.id.toString() === queryLower) {
                score += 15;
                matchReason = 'número de lección';
            }
            
            // Buscar en sección
            if (section.title.toLowerCase().includes(queryLower) ||
                section.description.toLowerCase().includes(queryLower)) {
                score += 3;
                matchReason = matchReason ? `${matchReason}, sección` : 'sección';
            }
            
            if (score > 0) {
                results.push({
                    id: lesson.id,
                    title: lesson.title,
                    sectionTitle: section.title,
                    sectionIcon: section.icon,
                    score,
                    matchReason
                });
            }
        });
    });
    
    // Ordenar por score y mostrar
    const sortedResults = results
        .sort((a, b) => b.score - a.score || a.id - b.id)
        .slice(0, 8);
        
    displaySearchResults(sortedResults, query);
}

function displaySearchResults(results, query = '') {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result-item">
                <div class="search-result-title">Sin resultados</div>
                <div class="search-result-meta">Prueba con otros términos</div>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.slice(0, 8).map(result => {
            const isAvailable = !!window.RFAcademy.loadedLessons[result.id];
            const lessonNumber = String(result.id).padStart(3, '0');
            
            // Destacar términos de búsqueda
            const highlightedTitle = highlightSearchTerms(result.title, query);
            
            return `
                <div class="search-result-item" onclick="${isAvailable ? `loadLessonDirect(${result.id}); hideSearchResults();` : 'showComingSoon();'}">
                    <div class="search-result-title">
                        ${result.sectionIcon} Lección ${lessonNumber}: ${highlightedTitle}
                    </div>
                    <div class="search-result-meta">
                        ${result.sectionTitle} • ${isAvailable ? 'Disponible' : 'En desarrollo'}
                        ${result.matchReason ? ` • ${result.matchReason}` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    searchResults.style.display = 'block';
}

function highlightSearchTerms(text, query) {
    if (!query || query.length < 2) return text;
    
    try {
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    } catch (e) {
        return text;
    }
}

function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// ===== TEMA Y PERSONALIZACIÓN =====
function toggleTheme() {
    const newTheme = window.RFAcademy.currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    window.RFAcademy.currentTheme = newTheme;
    saveSettings();
    
    showToast(
        newTheme === 'dark' ? '🌙 Tema oscuro activado' : '☀️ Tema claro activado', 
        'info'
    );
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    
    // Actualizar icono del FAB
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ===== SIDEBAR TOGGLE SYSTEM - FIXED =====
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainLayout = document.querySelector('.main-layout');
    const toggleIcon = document.querySelector('.toggle-icon');
    
    if (!sidebar || !mainLayout) return;
    
    window.RFAcademy.sidebarVisible = !window.RFAcademy.sidebarVisible;
    
    if (window.RFAcademy.sidebarVisible) {
        // Expandir sidebar
        sidebar.classList.remove('collapsed');
        mainLayout.classList.remove('sidebar-collapsed');
        if (toggleIcon) {
            toggleIcon.textContent = '‹‹';
            toggleIcon.parentElement.title = 'Ocultar menú';
        }
        console.log('📐 Sidebar expandido');
    } else {
        // Colapsar sidebar
        sidebar.classList.add('collapsed');
        mainLayout.classList.add('sidebar-collapsed');
        if (toggleIcon) {
            toggleIcon.textContent = '››';
            toggleIcon.parentElement.title = 'Mostrar menú';
        }
        console.log('📐 Sidebar colapsado');
    }
    
    saveSettings();
    
    // Mostrar toast informativo
    const message = window.RFAcademy.sidebarVisible ? 'Sidebar expandido' : 'Sidebar contraído';
    showToast(message, 'info', 2000);
}

// ===== FLOATING ACTION BUTTONS =====
function setupFAB() {
    const fabToggle = document.getElementById('fabToggle');
    const fabOptions = document.getElementById('fabOptions');
    const themeToggle = document.getElementById('themeToggle');
    const exportProgress = document.getElementById('exportProgress');
    const resetProgress = document.getElementById('resetProgress');
    const helpBtn = document.getElementById('helpBtn');
    
    if (fabToggle && fabOptions) {
        fabToggle.addEventListener('click', () => {
            window.RFAcademy.fabMenuOpen = !window.RFAcademy.fabMenuOpen;
            fabToggle.classList.toggle('open', window.RFAcademy.fabMenuOpen);
            fabOptions.classList.toggle('open', window.RFAcademy.fabMenuOpen);
        });
        
        // Cerrar FAB al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.fab-container') && window.RFAcademy.fabMenuOpen) {
                window.RFAcademy.fabMenuOpen = false;
                fabToggle.classList.remove('open');
                fabOptions.classList.remove('open');
            }
        });
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (exportProgress) {
        exportProgress.addEventListener('click', exportProgressData);
    }
    
    if (resetProgress) {
        resetProgress.addEventListener('click', resetProgressData);
    }
    
    if (helpBtn) {
        helpBtn.addEventListener('click', showHelpModal);
    }
}

function exportProgressData() {
    try {
        // Calcular estadísticas de forma segura
        let stats;
        if (window.RFAcademy.curriculum.utils && typeof window.RFAcademy.curriculum.utils.getProgressStats === 'function') {
            stats = window.RFAcademy.curriculum.utils.getProgressStats(window.RFAcademy.completedLessons);
        } else {
            // Calcular estadísticas manualmente
            const totalLessons = window.RFAcademy.curriculum.config.totalLessons;
            const completedLessons = window.RFAcademy.completedLessons.length;
            const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            
            stats = {
                completed: completedLessons,
                total: totalLessons,
                percentage: percentage,
                levels: {
                    beginner: window.RFAcademy.completedLessons.filter(id => id >= 1 && id <= 66).length,
                    intermediate: window.RFAcademy.completedLessons.filter(id => id >= 67 && id <= 189).length,
                    advanced: window.RFAcademy.completedLessons.filter(id => id >= 190 && id <= 251).length
                }
            };
        }
        
        const exportData = {
            timestamp: new Date().toISOString(),
            academy: 'Robot Framework Academy',
            version: window.RFAcademy.curriculum.config.version,
            progress: {
                completed: stats.completed,
                total: stats.total,
                percentage: stats.percentage,
                completedLessons: window.RFAcademy.completedLessons,
                levels: stats.levels
            },
            settings: {
                theme: window.RFAcademy.currentTheme,
                sidebarVisible: window.RFAcademy.sidebarVisible
            }
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `rf-academy-progress-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        showToast('📖 Progreso exportado exitosamente', 'success');
        
    } catch (error) {
        console.error('Error exportando progreso:', error);
        showToast('❌ Error al exportar progreso', 'error');
    }
}

function resetProgressData() {
    showModal(`
        <div class="modal-header">
            <h2>🔄 Reiniciar Progreso</h2>
        </div>
        <div class="modal-body">
            <p>¿Estás seguro de que quieres reiniciar todo tu progreso?</p>
            <p><strong>Esta acción eliminará:</strong></p>
            <ul>
                <li>Todas las lecciones marcadas como completadas</li>
                <li>Estadísticas de progreso</li>
                <li>Configuraciones guardadas</li>
            </ul>
            <p><strong>⚠️ Esta acción no se puede deshacer.</strong></p>
        </div>
        <div class="modal-footer">
            <button class="action-btn secondary" onclick="closeModal()">Cancelar</button>
            <button class="action-btn primary" onclick="confirmResetProgress()">Sí, reiniciar</button>
        </div>
    `);
}

function confirmResetProgress() {
    // Limpiar datos
    window.RFAcademy.completedLessons = [];
    localStorage.removeItem('rf-academy-progress');
    
    // Actualizar UI
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.classList.remove('completed');
        const status = item.querySelector('.lesson-status');
        if (status && window.RFAcademy.loadedLessons[parseInt(item.dataset.lessonId)]) {
            status.textContent = '📝';
        }
    });
    
    updateProgressStats();
    updateLessonActions(window.RFAcademy.currentLessonId);
    
    closeModal();
    showToast('🔄 Progreso reiniciado exitosamente', 'info');
}

// ===== MODALES Y NOTIFICACIONES =====
function showToast(message, type = 'info', duration = 3000) {
    const container = getOrCreateToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">${icons[type] || icons.info}</div>
        <div class="toast-content">
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;
    
    container.appendChild(toast);
    
    // Auto-remove
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, duration);
}

function getOrCreateToastContainer() {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

function showModal(content) {
    const overlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    
    if (overlay && modalContent) {
        modalContent.innerHTML = content;
        overlay.classList.remove('hidden');
        
        // Cerrar con click en overlay
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        };
    }
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

// ===== FUNCIÓN HELP MODAL CORREGIDA =====
function showHelpModal() {
    showModal(`
        <div class="modal-header">
            <h2>❓ Ayuda - Robot Framework Academy</h2>
        </div>
        <div class="modal-body">
            <h3>🚀 Navegación</h3>
            <ul>
                <li><strong>Lecciones:</strong> Haz clic en cualquier lección disponible para comenzar</li>
                <li><strong>Filtros:</strong> Usa los filtros para encontrar lecciones por nivel o estado</li>
                <li><strong>Búsqueda:</strong> Busca lecciones por palabras clave en tiempo real</li>
                <li><strong>Secciones:</strong> Haz clic en las cabeceras para expandir/colapsar secciones</li>
            </ul>
            
            <h3>📊 Progreso</h3>
            <ul>
                <li><strong>Marcar completadas:</strong> Usa el botón "Marcar Completada" al final de cada lección</li>
                <li><strong>Exportar:</strong> Descarga tu progreso en formato JSON</li>
                <li><strong>Reiniciar:</strong> Borra todo el progreso para empezar desde cero</li>
            </ul>
            
            <h3>🎨 Personalización</h3>
            <ul>
                <li><strong>Tema:</strong> Cambia entre modo claro y oscuro</li>
                <li><strong>Sidebar:</strong> Oculta/muestra el menú lateral</li>
                <li><strong>Configuraciones:</strong> Se guardan automáticamente</li>
            </ul>
            
            <h3>📖 Estructura del Curso</h3>
            <ul>
                <li><strong>🟢 Básico:</strong> Lecciones 001-066 (Fundamentos)</li>
                <li><strong>🟡 Intermedio:</strong> Lecciones 067-189 (Técnicas avanzadas)</li>
                <li><strong>🔴 Avanzado:</strong> Lecciones 190-251 (Patrones enterprise)</li>
            </ul>
            
            <h3>⌨️ Atajos de teclado</h3>
            <ul>
                <li><strong>Ctrl + K:</strong> Enfocar búsqueda</li>
                <li><strong>Ctrl + H:</strong> Mostrar ayuda</li>
                <li><strong>Ctrl + D:</strong> Cambiar tema</li>
                <li><strong>← →:</strong> Navegar entre lecciones</li>
            </ul>
            
            <h3>🔍 Búsqueda Avanzada</h3>
            <ul>
                <li><strong>Por título:</strong> Escribe parte del nombre de la lección</li>
                <li><strong>Por número:</strong> Escribe "001", "1", "042", etc.</li>
                <li><strong>Por tema:</strong> "selenium", "api", "variables", etc.</li>
                <li><strong>Por sección:</strong> "fundamentos", "control", etc.</li>
            </ul>
        </div>
        <div class="modal-footer">
            <button class="action-btn primary" onclick="closeModal()">Entendido</button>
        </div>
    `);
}

// ===== FUNCIONES DE UTILIDAD =====
function showComingSoon() {
    showToast('Esta lección estará disponible próximamente 🚧', 'info');
}

function startLearning() {
    console.log('🚀 Ejecutando startLearning...');
    // Ir a la primera lección disponible
    const availableIds = Object.keys(window.RFAcademy.loadedLessons).map(Number).sort((a, b) => a - b);
    if (availableIds.length > 0) {
        loadLessonDirect(availableIds[0]);
    } else {
        showToast('No hay lecciones disponibles actualmente', 'warning');
    }
}

function goToLessonsDetailed() {
    console.log('📋 Ejecutando goToLessonsDetailed...');
    try {
        // Primero volver al welcome
        showWelcome();
        
        // Luego aplicar filtro y hacer scroll
        setTimeout(() => {
            applyFilter('all');
            setTimeout(() => {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) {
                    sidebar.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    console.log('✅ Scroll al sidebar completado');
                } else {
                    console.warn('⚠️ Sidebar no encontrado');
                }
            }, 500);
        }, 300);
    } catch (error) {
        console.error('❌ Error en goToLessonsDetailed:', error);
        showToast('Error navegando a lecciones detalladas', 'error');
    }
}

// ===== FUNCIONES ACTUALIZADAS DEL CURRICULUM - FIXED =====
function showCurriculum() {
    console.log('📚 Ejecutando showCurriculum...');
    
    try {
        const welcomeScreen = document.getElementById('welcomeScreen');
        const lessonContent = document.getElementById('lessonContent');
        const lessonActions = document.getElementById('lessonActions');
        const breadcrumb = document.getElementById('breadcrumb');
        
        // VALIDACIÓN CRÍTICA AGREGADA
        if (!lessonContent) {
            console.error('❌ Element lessonContent not found');
            showToast('Error mostrando curriculum - elemento no encontrado', 'error');
            return;
        }
        
        // Ocultar otras vistas
        if (welcomeScreen) {
            welcomeScreen.classList.add('hidden');
            welcomeScreen.style.display = 'none';
        }
        if (lessonActions) lessonActions.classList.add('hidden');
        
        // Mostrar breadcrumb
        if (breadcrumb) {
            breadcrumb.style.display = 'flex';
            const currentLesson = document.getElementById('currentLesson');
            if (currentLesson) currentLesson.textContent = 'Curriculum Completo';
        }
        
        // Generar contenido del curriculum
        const curriculumHTML = generateCurriculumHTML();
        
        // VALIDACIÓN DEL HTML GENERADO
        if (!curriculumHTML || curriculumHTML.trim() === '') {
            console.error('❌ Generated curriculum HTML is empty');
            showToast('Error generando contenido del curriculum', 'error');
            return;
        }
        
        // Mostrar en el contenido principal
        lessonContent.innerHTML = curriculumHTML;
        lessonContent.classList.remove('hidden');
        lessonContent.classList.add('active');
        lessonContent.style.display = 'block';
        
        // Limpiar lección actual
        window.RFAcademy.currentLessonId = null;
        updateCurrentLessonUI(null);
        
        console.log('✅ Curriculum mostrado correctamente');
        
        // Scroll suave al contenido
        setTimeout(() => {
            lessonContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
        
    } catch (error) {
        console.error('❌ Error en showCurriculum:', error);
        showToast('Error crítico mostrando curriculum', 'error');
        
        // Fallback: volver al welcome
        showWelcome();
    }
}

function generateCurriculumHTML() {
    if (!window.RFAcademy.curriculum) {
        return '<div class="error-message">❌ Error: Curriculum data no cargado</div>';
    }
    
    const curriculum = window.RFAcademy.curriculum;
    
    // Calcular estadísticas de duración de forma segura
    let stats, totalHours;
    if (curriculum.utils && typeof curriculum.utils.getDurationStats === 'function') {
        stats = curriculum.utils.getDurationStats();
        totalHours = Math.round((stats.beginner.total + stats.intermediate.total + stats.advanced.total) / 60);
    } else {
        // Valores por defecto si no existe getDurationStats
        stats = {
            beginner: { lessons: 66, total: 330, avgDuration: 5 },
            intermediate: { lessons: 123, total: 861, avgDuration: 7 },
            advanced: { lessons: 62, total: 620, avgDuration: 10 }
        };
        totalHours = Math.round((stats.beginner.total + stats.intermediate.total + stats.advanced.total) / 60);
    }
    
    return `
        <div class="curriculum-view">
            <!-- Header del Curriculum -->
            <div class="curriculum-header">
                <div class="curriculum-hero">
                    <h1>📚 ${curriculum.config.academyName}</h1>
                    <p class="curriculum-subtitle">${curriculum.config.tagline}</p>
                    <div class="curriculum-version">
                        Versión ${curriculum.config.version} | Actualizado: ${curriculum.config.lastUpdated}
                    </div>
                </div>
                
                <!-- Estadísticas Globales -->
                <div class="curriculum-stats">
                    <div class="stat-grid">
                        <div class="stat-card global">
                            <div class="stat-icon">🎯</div>
                            <div class="stat-info">
                                <h3>${curriculum.config.totalLessons}</h3>
                                <p>Lecciones Totales</p>
                            </div>
                        </div>
                        <div class="stat-card global">
                            <div class="stat-icon">📖</div>
                            <div class="stat-info">
                                <h3>${curriculum.config.totalSections}</h3>
                                <p>Secciones</p>
                            </div>
                        </div>
                        <div class="stat-card global">
                            <div class="stat-icon">⏱️</div>
                            <div class="stat-info">
                                <h3>${totalHours}h</h3>
                                <p>Duración Total</p>
                            </div>
                        </div>
                        <div class="stat-card global">
                            <div class="stat-icon">🏆</div>
                            <div class="stat-info">
                                <h3>Certificación</h3>
                                <p>QA Professional</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Estadísticas por Nivel -->
            <div class="level-stats">
                <h2>📊 Distribución por Nivel</h2>
                <div class="level-stats-grid">
                    <div class="level-stat beginner">
                        <div class="level-icon">🟢</div>
                        <div class="level-info">
                            <h3>Básico</h3>
                            <p>${stats.beginner.lessons} lecciones</p>
                            <p>${Math.round(stats.beginner.total / 60)}h total</p>
                            <p>Promedio: ${stats.beginner.avgDuration} min</p>
                            <div class="level-description">
                                Setup, sintaxis, fundamentos de Robot Framework
                            </div>
                        </div>
                    </div>
                    <div class="level-stat intermediate">
                        <div class="level-icon">🟡</div>
                        <div class="level-info">
                            <h3>Intermedio</h3>
                            <p>${stats.intermediate.lessons} lecciones</p>
                            <p>${Math.round(stats.intermediate.total / 60)}h total</p>
                            <p>Promedio: ${stats.intermediate.avgDuration} min</p>
                            <div class="level-description">
                                APIs, mobile, data-driven testing
                            </div>
                        </div>
                    </div>
                    <div class="level-stat advanced">
                        <div class="level-icon">🔴</div>
                        <div class="level-info">
                            <h3>Avanzado</h3>
                            <p>${stats.advanced.lessons} lecciones</p>
                            <p>${Math.round(stats.advanced.total / 60)}h total</p>
                            <p>Promedio: ${stats.advanced.avgDuration} min</p>
                            <div class="level-description">
                                CI/CD, performance, arquitecturas enterprise
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Tiempos Optimizados -->
            <div class="duration-info">
                <h2>⏱️ Tiempos Optimizados</h2>
                <div class="duration-grid">
                    <div class="duration-card">
                        <h3>🟢 Básico</h3>
                        <ul>
                            <li><strong>Estándar:</strong> 5 min</li>
                            <li><strong>Foundation:</strong> 8 min</li>
                            <li><strong>Integration:</strong> 10 min</li>
                        </ul>
                    </div>
                    <div class="duration-card">
                        <h3>🟡 Intermedio</h3>
                        <ul>
                            <li><strong>Estándar:</strong> 7 min</li>
                            <li><strong>Foundation:</strong> 10 min</li>
                            <li><strong>Integration:</strong> 15 min</li>
                        </ul>
                    </div>
                    <div class="duration-card">
                        <h3>🔴 Avanzado</h3>
                        <ul>
                            <li><strong>Estándar:</strong> 10 min</li>
                            <li><strong>Foundation:</strong> 15 min</li>
                            <li><strong>Capstone:</strong> 20-25 min</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Secciones del Curriculum -->
            <div class="curriculum-sections">
                <h2>🗂️ Secciones del Curriculum</h2>
                ${generateSectionsOverviewHTML()}
            </div>
            
            <!-- Acciones del Curriculum -->
            <div class="curriculum-actions">
                <button class="cta-primary" onclick="window.startLearning ? startLearning() : console.log('startLearning no disponible')">
                    🚀 Comenzar Aprendizaje
                </button>
                <button class="cta-secondary" onclick="window.showWelcome ? showWelcome() : console.log('showWelcome no disponible')">
                    🏠 Volver al Inicio
                </button>
                <button class="cta-secondary" onclick="window.goToLessonsDetailed ? goToLessonsDetailed() : console.log('goToLessonsDetailed no disponible')">
                    📋 Ver Lecciones Detalladas
                </button>
            </div>
        </div>
    `;
}

function generateSectionsOverviewHTML() {
    const curriculum = window.RFAcademy.curriculum;
    const sections = Object.values(curriculum.sections).sort((a, b) => a.order - b.order);
    
    let html = '';
    let currentLevel = '';
    
    sections.forEach(section => {
        // Crear separador de nivel si cambia
        if (section.level !== currentLevel) {
            currentLevel = section.level;
            const levelInfo = curriculum.levels[section.level];
            html += `
                <div class="level-separator">
                    <div class="level-header ${section.level}">
                        <span class="level-icon">${levelInfo.icon}</span>
                        <h3>${levelInfo.name}</h3>
                        <span class="level-description">${levelInfo.description}</span>
                    </div>
                </div>
            `;
        }
        
        // Calcular lecciones disponibles
        const availableLessons = section.lessons.filter(lesson => 
            window.RFAcademy.loadedLessons[lesson.id]
        ).length;
        
        const completedLessons = section.lessons.filter(lesson => 
            window.RFAcademy.completedLessons.includes(lesson.id)
        ).length;
        
        const progressPercentage = section.totalLessons > 0 
            ? Math.round((completedLessons / section.totalLessons) * 100) 
            : 0;
        
        html += `
            <div class="section-overview-card ${section.level}" data-section="${section.id}">
                <div class="section-overview-header">
                    <div class="section-overview-icon">${section.icon}</div>
                    <div class="section-overview-info">
                        <h3>${section.title}</h3>
                        <p class="section-overview-description">${section.description}</p>
                        <div class="section-overview-meta">
                            <span class="section-overview-lessons">${section.totalLessons} lecciones</span>
                            <span class="section-overview-duration">${section.estimatedHours}h estimadas</span>
                            <span class="section-overview-status ${section.status}">
                                ${section.status === 'available' ? '✅ Disponible' : '🚧 En desarrollo'}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="section-overview-progress">
                    <div class="progress-info">
                        <span>Progreso: ${completedLessons}/${section.totalLessons} (${progressPercentage}%)</span>
                        <span>Disponibles: ${availableLessons}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                    </div>
                </div>
                
                <div class="section-overview-actions">
                    ${availableLessons > 0 ? `
                        <button class="action-btn primary" onclick="navigateToSection('section-${String(section.id).padStart(2, '0')}')">
                            📖 Ver Lecciones
                        </button>
                    ` : `
                        <button class="action-btn secondary disabled">
                            ⏳ Próximamente
                        </button>
                    `}
                </div>
            </div>
        `;
    });
    
    return html;
}

function navigateToSection(sectionId) {
    // Mostrar vista principal con sidebar
    showWelcome();
    
    // Expandir la sección específica
    setTimeout(() => {
        toggleSection(sectionId);
        
        // Scroll al sidebar y la sección
        const sectionElement = document.querySelector(`[data-section-id="${sectionId}"]`);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
    
    console.log(`📖 Navegando a sección: ${sectionId}`);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            applyFilter(e.target.dataset.filter);
        });
    });
    
    // Búsqueda
    setupSearch();
    
    // FAB
    setupFAB();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                case 'K':
                    e.preventDefault();
                    document.getElementById('searchInput')?.focus();
                    break;
                case 'h':
                case 'H':
                    e.preventDefault();
                    showHelpModal();
                    break;
                case 'd':
                case 'D':
                    e.preventDefault();
                    toggleTheme();
                    break;
                case 'b':
                case 'B':
                    e.preventDefault();
                    toggleSidebar();
                    break;
            }
        }
        
        // Navegación con flechas
        if (window.RFAcademy.currentLessonId) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                navigateLesson('prev');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                navigateLesson('next');
            }
        }
    });
}

// ===== INICIALIZACIÓN FINAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Pequeño delay para asegurar que todo esté cargado
    setTimeout(() => {
        try {
            initializeApp();
            
            // Expandir primera sección por defecto
            setTimeout(() => {
                const firstSection = document.querySelector('.curriculum-section');
                if (firstSection) {
                    const sectionId = firstSection.dataset.sectionId;
                    toggleSection(sectionId);
                }
            }, 500);
            
        } catch (error) {
            console.error('❌ Error en inicialización:', error);
            showToast('Error inicializando la aplicación', 'error');
        }
    }, 100);
});

// ===== EXPOSICIÓN GLOBAL PARA DEBUG =====
window.RFAcademyDebug = {
    loadLesson: loadLessonDirect,
    toggleComplete: toggleLessonComplete,
    showStats: () => console.log(window.RFAcademy),
    resetAll: confirmResetProgress,
    curriculum: () => window.RFAcademy.curriculum,
    toggleSidebar: toggleSidebar,
    searchLessons: (query) => window.RFAcademy.curriculum?.utils?.searchLessons(query)
};

// Exponer funciones principales globalmente para onclick
window.startLearning = startLearning;
window.showWelcome = showWelcome;
window.goToLessonsDetailed = goToLessonsDetailed;
window.showCurriculum = showCurriculum;
window.navigateToSection = navigateToSection;
window.loadLessonDirect = loadLessonDirect;
window.toggleLessonComplete = toggleLessonComplete;
window.applyFilter = applyFilter;
window.toggleSection = toggleSection;
window.showComingSoon = showComingSoon;

console.log('🎓 Robot Framework Academy Core v3.1 - OPTIMIZED cargado correctamente');
console.log('🔧 Debug disponible en: window.RFAcademyDebug');
console.log('🌐 Funciones globales expuestas para botones onclick');
console.log('🔍 Sistema de búsqueda optimizado integrado');
console.log('✅ Fixes críticos aplicados - showCurriculum() funcional');