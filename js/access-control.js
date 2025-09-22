// access-control.js - Versión con form correcto

class SimpleAccessControl {
    constructor() {
        // 🔐 CONTRASEÑA MAESTRA (cámbiala por la que prefieras)
        this.masterPassword = 'UDEMY-ROBOT-2025-PRO';
        
        this.isAuthenticated = this.checkAuthentication();
        console.log('🔐 Sistema iniciado, autenticado:', this.isAuthenticated);
        
        // Esperar a que el DOM esté completamente listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('🚀 Inicializando sistema de acceso...');
        
        // Crear modal primero
        this.createAccessModal();
        
        // Luego configurar contenido y eventos
        setTimeout(() => {
            if (!this.isAuthenticated) {
                this.protectContent();
                this.showAccessModal();
            } else {
                console.log('✅ Usuario ya autenticado, desbloqueando contenido...');
                this.unlockContent();
            }
        }, 500);
    }

    checkAuthentication() {
        const authToken = localStorage.getItem('udemy_access_token');
        const authTime = localStorage.getItem('udemy_auth_time');
        
        if (!authToken || !authTime) return false;
        
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        const isExpired = (Date.now() - parseInt(authTime)) > thirtyDays;
        
        if (isExpired) {
            this.clearAuthentication();
            return false;
        }
        
        const expectedToken = btoa(this.masterPassword + 'salt2025');
        return authToken === expectedToken;
    }

    authenticate(password) {
        const cleanPassword = password.trim().toUpperCase();
        console.log('🔑 Intentando autenticar...');
        
        if (cleanPassword === this.masterPassword) {
            console.log('✅ Contraseña correcta!');
            
            const token = btoa(this.masterPassword + 'salt2025');
            localStorage.setItem('udemy_access_token', token);
            localStorage.setItem('udemy_auth_time', Date.now().toString());
            
            this.isAuthenticated = true;
            this.unlockContent();
            this.hideAccessModal();
            this.showSuccessMessage();
            return true;
        }
        
        console.log('❌ Contraseña incorrecta');
        return false;
    }

    protectContent() {
        console.log('🔒 Protegiendo contenido...');
        
        const mainContent = document.querySelector('.main-content');
        const sidebar = document.querySelector('.sidebar');
        const appHeader = document.querySelector('.app-header');
        
        if (mainContent) {
            mainContent.style.filter = 'blur(5px)';
            mainContent.style.pointerEvents = 'none';
            mainContent.style.userSelect = 'none';
        }
        
        if (sidebar) {
            sidebar.style.filter = 'blur(3px)';
            sidebar.style.pointerEvents = 'none';
        }

        if (appHeader) {
            appHeader.style.filter = 'blur(2px)';
            appHeader.style.pointerEvents = 'none';
        }
    }

    unlockContent() {
        console.log('🔓 Desbloqueando contenido...');
        
        const mainContent = document.querySelector('.main-content');
        const sidebar = document.querySelector('.sidebar');
        const appHeader = document.querySelector('.app-header');
        
        if (mainContent) {
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
            mainContent.style.userSelect = 'auto';
        }
        
        if (sidebar) {
            sidebar.style.filter = 'none';
            sidebar.style.pointerEvents = 'auto';
        }

        if (appHeader) {
            appHeader.style.filter = 'none';
            appHeader.style.pointerEvents = 'auto';
        }
    }

    createAccessModal() {
        console.log('🎨 Creando modal de acceso...');
        
        const existingModal = document.getElementById('accessControlModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modalHTML = `
            <div id="accessControlModal" class="access-control-modal" style="display: none;">
                <div class="access-modal-content">
                    <div class="access-header">
                        <div class="access-icon">🔐</div>
                        <h2>Robot Framework Academy</h2>
                        <p class="access-subtitle">Acceso Exclusivo para Estudiantes de Udemy</p>
                    </div>
                    
                    <div class="access-body">
                        <p class="access-description">
                            Esta academia es exclusiva para estudiantes que han adquirido el curso en Udemy.
                            Ingresa la contraseña que se proporciona en las lecciones del curso.
                        </p>
                        
                        <!-- FORM CORREGIDO -->
                        <form id="accessForm" class="password-input-container" autocomplete="off">
                            <input 
                                type="text" 
                                id="masterPasswordInput" 
                                name="access_code"
                                placeholder="Ingresa la contraseña del curso"
                                class="access-input"
                                maxlength="30"
                                autocomplete="off"
                                spellcheck="false"
                            >
                            <button type="submit" id="accessSubmitBtn" class="access-btn-primary">
                                🚀 Acceder a la Academia
                            </button>
                        </form>
                        
                        <div id="accessMessage" class="access-message"></div>
                        
                        <div class="access-help">
                            <h4>💡 ¿Dónde encuentro la contraseña?</h4>
                            <ul>
                                <li>📺 Se menciona en las primeras lecciones del curso</li>
                                <li>📄 Está en los recursos descargables</li>
                                <li>💬 Aparece en la descripción de las lecciones</li>
                            </ul>
                            <p class="help-note">
                                <strong>¿No tienes el curso?</strong> 
                                <a href="https://www.udemy.com/course/tu-curso/" target="_blank" style="color: #ffd700;">
                                    Adquiérelo aquí
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const styles = `
            <style id="access-control-styles">
                .access-control-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    backdrop-filter: blur(10px);
                }

                .access-modal-content {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    max-width: 500px;
                    width: 90%;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                    animation: modalSlideIn 0.5s ease-out;
                }

                @keyframes modalSlideIn {
                    from { transform: translateY(-50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .access-header {
                    padding: 40px 30px 20px;
                    text-align: center;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                }

                .access-icon {
                    font-size: 60px;
                    margin-bottom: 15px;
                }

                .access-header h2 {
                    margin: 0 0 10px 0;
                    font-size: 28px;
                    font-weight: bold;
                }

                .access-subtitle {
                    margin: 0;
                    opacity: 0.9;
                    font-size: 16px;
                }

                .access-body {
                    padding: 30px;
                }

                .access-description {
                    text-align: center;
                    margin-bottom: 25px;
                    opacity: 0.9;
                    line-height: 1.5;
                }

                .password-input-container {
                    margin-bottom: 25px;
                }

                .access-input {
                    width: 100%;
                    padding: 15px 20px;
                    border: none;
                    border-radius: 10px;
                    font-size: 16px;
                    margin-bottom: 15px;
                    box-sizing: border-box;
                    background: rgba(255,255,255,0.95);
                    color: #333;
                    font-family: monospace;
                    text-align: center;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .access-input:focus {
                    outline: none;
                    background: white;
                    box-shadow: 0 0 20px rgba(255,255,255,0.3);
                }

                .access-btn-primary {
                    width: 100%;
                    padding: 15px;
                    background: rgba(255,255,255,0.2);
                    color: white;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .access-btn-primary:hover {
                    background: rgba(255,255,255,0.3);
                    border-color: rgba(255,255,255,0.5);
                    transform: translateY(-2px);
                }

                .access-btn-primary:active {
                    transform: translateY(0);
                    background: rgba(255,255,255,0.4);
                }

                .access-message {
                    min-height: 20px;
                    text-align: center;
                    margin: 15px 0;
                    padding: 10px;
                    border-radius: 8px;
                    display: none;
                }

                .access-message.success {
                    background: rgba(40, 167, 69, 0.3);
                    border: 1px solid rgba(40, 167, 69, 0.5);
                    color: #d4edda;
                    display: block;
                }

                .access-message.error {
                    background: rgba(220, 53, 69, 0.3);
                    border: 1px solid rgba(220, 53, 69, 0.5);
                    color: #f8d7da;
                    display: block;
                }

                .access-help {
                    background: rgba(255,255,255,0.1);
                    padding: 20px;
                    border-radius: 10px;
                    margin-top: 20px;
                }

                .access-help h4 {
                    margin: 0 0 15px 0;
                    color: #ffd700;
                }

                .access-help ul {
                    margin: 10px 0;
                    padding-left: 20px;
                }

                .access-help li {
                    margin: 8px 0;
                    opacity: 0.9;
                }

                .help-note {
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid rgba(255,255,255,0.2);
                    text-align: center;
                    font-size: 14px;
                }

                .help-note a {
                    color: #ffd700 !important;
                    text-decoration: none;
                    font-weight: bold;
                }

                .help-note a:hover {
                    text-decoration: underline;
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                    20%, 40%, 60%, 80% { transform: translateX(10px); }
                }
                
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @media (max-width: 768px) {
                    .access-modal-content {
                        margin: 20px;
                        width: calc(100% - 40px);
                    }
                    
                    .access-header {
                        padding: 30px 20px 15px;
                    }
                    
                    .access-body {
                        padding: 20px;
                    }
                    
                    .access-icon {
                        font-size: 50px;
                    }
                    
                    .access-header h2 {
                        font-size: 24px;
                    }
                }
            </style>
        `;

        if (!document.getElementById('access-control-styles')) {
            document.head.insertAdjacentHTML('beforeend', styles);
        }
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        setTimeout(() => this.bindModalEvents(), 100);
        console.log('✅ Modal creado y eventos vinculados');
    }

    showAccessModal() {
        console.log('👀 Mostrando modal de acceso...');
        
        const modal = document.getElementById('accessControlModal');
        if (modal) {
            modal.style.display = 'flex';
            
            setTimeout(() => {
                const input = document.getElementById('masterPasswordInput');
                if (input) {
                    input.focus();
                    console.log('✅ Focus establecido');
                }
            }, 300);
        }
    }

    hideAccessModal() {
        console.log('👋 Ocultando modal...');
        
        const modal = document.getElementById('accessControlModal');
        if (modal) {
            modal.style.animation = 'modalSlideIn 0.3s ease-in reverse';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    bindModalEvents() {
        console.log('🔗 Vinculando eventos...');
        
        // EVENTO DE FORM (Principal)
        const form = document.getElementById('accessForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('📝 Form enviado');
                this.handleSubmit();
            });
            console.log('✅ Evento submit del form vinculado');
        }

        // EVENTO DE BOTÓN (Respaldo)
        const submitBtn = document.getElementById('accessSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🖱️ Botón clickeado');
                this.handleSubmit();
            });
            console.log('✅ Evento click del botón vinculado');
        }

        // EVENTO DE INPUT (Enter)
        const passwordInput = document.getElementById('masterPasswordInput');
        if (passwordInput) {
            passwordInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('⌨️ Enter presionado');
                    this.handleSubmit();
                }
            });
            console.log('✅ Evento keydown del input vinculado');
        }
    }

    handleSubmit() {
        console.log('📝 Procesando envío...');
        
        const passwordInput = document.getElementById('masterPasswordInput');
        if (!passwordInput) {
            console.error('❌ Input no encontrado');
            return;
        }
        
        const password = passwordInput.value;
        console.log('🔍 Password:', password ? '[PRESENTE]' : '[VACÍA]');

        if (!password.trim()) {
            this.showAccessMessage('Por favor ingresa la contraseña', 'error');
            return;
        }

        if (this.authenticate(password)) {
            this.showAccessMessage('¡Acceso concedido! Bienvenido a la academia', 'success');
        } else {
            this.showAccessMessage('Contraseña incorrecta. Verifica en tu curso de Udemy.', 'error');
            passwordInput.value = '';
            passwordInput.focus();
            
            const modal = document.querySelector('.access-modal-content');
            if (modal) {
                modal.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    modal.style.animation = 'modalSlideIn 0.5s ease-out';
                }, 500);
            }
        }
    }

    showAccessMessage(message, type) {
        console.log(`💬 Mensaje: ${message} (${type})`);
        
        const messageEl = document.getElementById('accessMessage');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = `access-message ${type}`;
            messageEl.style.display = 'block';
        }
    }

    showSuccessMessage() {
        console.log('🎉 Mensaje de éxito');
        
        const toast = document.createElement('div');
        toast.className = 'access-success-toast';
        toast.innerHTML = `
            <div style="background: linear-gradient(90deg, #28a745, #20c997); color: white; padding: 20px; border-radius: 10px; margin: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); text-align: center; font-weight: bold;">
                🎉 ¡Bienvenido a Robot Framework Academy!<br>
                <small style="opacity: 0.9;">Disfruta de todas las 251 lecciones</small>
            </div>
        `;
        
        toast.style.cssText = 'position:fixed;top:20px;right:20px;z-index:10001;animation:slideInRight 0.5s ease-out';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.5s ease-in reverse';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    clearAuthentication() {
        localStorage.removeItem('udemy_access_token');
        localStorage.removeItem('udemy_auth_time');
    }

    logout() {
        this.clearAuthentication();
        this.isAuthenticated = false;
        this.protectContent();
        this.showAccessModal();
        console.log('🔐 Sesión cerrada');
    }
}

// INICIALIZACIÓN MEJORADA
console.log('🔄 Cargando sistema...');

function initAccessControl() {
    console.log('🚀 Iniciando control de acceso...');
    window.accessControl = new SimpleAccessControl();
    
    // Funciones de administración
    window.adminLogout = () => window.accessControl.logout();
    window.adminTest = () => {
        console.log('🧪 Estado del sistema:');
        console.log('- Autenticado:', window.accessControl.isAuthenticated);
        console.log('- Modal:', !!document.getElementById('accessControlModal'));
        console.log('- Form:', !!document.getElementById('accessForm'));
        console.log('- Botón:', !!document.getElementById('accessSubmitBtn'));
        console.log('- Input:', !!document.getElementById('masterPasswordInput'));
    };
    
    // Función para testing rápido
    window.testPassword = (pass) => {
        const input = document.getElementById('masterPasswordInput');
        if (input) {
            input.value = pass || 'UDEMY-ROBOT-2025-PRO';
            window.accessControl.handleSubmit();
        }
    };
}

// Múltiples métodos de inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessControl);
} else {
    setTimeout(initAccessControl, 100);
}

window.addEventListener('load', () => {
    if (!window.accessControl) {
        console.log('🔄 Inicialización de respaldo...');
        initAccessControl();
    }
});

console.log('✅ Script cargado completamente');