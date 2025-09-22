// access-control.js - Sistema simplificado con una contraseña maestra

class SimpleAccessControl {
    constructor() {
        // 🔐 CONTRASEÑA MAESTRA (cámbiala por la que prefieras)
        this.masterPassword = 'UDEMY-ROBOT-2025-PRO';
        
        this.isAuthenticated = this.checkAuthentication();
        this.init();
    }

    init() {
        // Si no está autenticado, mostrar modal de login
        if (!this.isAuthenticated) {
            this.showAccessModal();
        }
        
        // Bloquear contenido hasta autenticarse
        this.protectContent();
        this.createAccessModal();
    }

    // Verificar si ya está autenticado
    checkAuthentication() {
        const authToken = localStorage.getItem('udemy_access_token');
        const authTime = localStorage.getItem('udemy_auth_time');
        
        if (!authToken || !authTime) return false;
        
        // Token válido por 30 días
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        const isExpired = (Date.now() - parseInt(authTime)) > thirtyDays;
        
        if (isExpired) {
            this.clearAuthentication();
            return false;
        }
        
        // Verificar que el token coincida con la contraseña actual
        const expectedToken = btoa(this.masterPassword + 'salt2025');
        return authToken === expectedToken;
    }

    // Autenticar usuario
    authenticate(password) {
        const cleanPassword = password.trim().toUpperCase();
        
        if (cleanPassword === this.masterPassword) {
            // Crear token de autenticación
            const token = btoa(this.masterPassword + 'salt2025');
            localStorage.setItem('udemy_access_token', token);
            localStorage.setItem('udemy_auth_time', Date.now().toString());
            
            this.isAuthenticated = true;
            this.unlockContent();
            this.hideAccessModal();
            this.showSuccessMessage();
            return true;
        }
        
        return false;
    }

    // Proteger todo el contenido
    protectContent() {
        if (!this.isAuthenticated) {
            // Bloquear todo el contenido principal
            const mainContent = document.querySelector('.main-content');
            const sidebar = document.querySelector('.sidebar');
            
            if (mainContent) {
                mainContent.style.filter = 'blur(5px)';
                mainContent.style.pointerEvents = 'none';
                mainContent.style.userSelect = 'none';
            }
            
            if (sidebar) {
                sidebar.style.filter = 'blur(3px)';
                sidebar.style.pointerEvents = 'none';
            }
        }
    }

    // Desbloquear contenido
    unlockContent() {
        const mainContent = document.querySelector('.main-content');
        const sidebar = document.querySelector('.sidebar');
        
        if (mainContent) {
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
            mainContent.style.userSelect = 'auto';
        }
        
        if (sidebar) {
            sidebar.style.filter = 'none';
            sidebar.style.pointerEvents = 'auto';
        }
    }

    // Crear modal de acceso
    createAccessModal() {
        const modalHTML = `
            <div id="accessControlModal" class="access-control-modal">
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
                        
                        <div class="password-input-container">
                            <input 
                                type="password" 
                                id="masterPasswordInput" 
                                placeholder="Ingresa la contraseña del curso"
                                class="access-input"
                                maxlength="30"
                            >
                            <button id="accessSubmitBtn" class="access-btn-primary">
                                🚀 Acceder a la Academia
                            </button>
                        </div>
                        
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
                                <a href="https://www.udemy.com/course/tu-curso/" target="_blank" style="color: #007cba;">
                                    Adquiérelo aquí
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Agregar estilos CSS
        const styles = `
            <style>
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

                /* Responsive */
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

        // Agregar al DOM
        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Mostrar modal de acceso
    showAccessModal() {
        const modal = document.getElementById('accessControlModal');
        if (modal) {
            modal.style.display = 'flex';
            
            // Focus en input
            setTimeout(() => {
                const input = document.getElementById('masterPasswordInput');
                if (input) input.focus();
            }, 300);
            
            // Bind events
            this.bindModalEvents();
        }
    }

    // Ocultar modal de acceso
    hideAccessModal() {
        const modal = document.getElementById('accessControlModal');
        if (modal) {
            modal.style.animation = 'modalSlideIn 0.3s ease-in reverse';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    // Vincular eventos del modal
    bindModalEvents() {
        const submitBtn = document.getElementById('accessSubmitBtn');
        const passwordInput = document.getElementById('masterPasswordInput');

        if (submitBtn) {
            submitBtn.onclick = () => this.handleSubmit();
        }

        if (passwordInput) {
            passwordInput.onkeypress = (e) => {
                if (e.key === 'Enter') this.handleSubmit();
            };
        }
    }

    // Manejar envío de contraseña
    handleSubmit() {
        const passwordInput = document.getElementById('masterPasswordInput');
        const password = passwordInput.value;

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
            
            // Efecto de shake en el modal
            const modal = document.querySelector('.access-modal-content');
            if (modal) {
                modal.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    modal.style.animation = '';
                }, 500);
            }
        }
    }

    // Mostrar mensaje en el modal
    showAccessMessage(message, type) {
        const messageEl = document.getElementById('accessMessage');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = `access-message ${type}`;
            messageEl.style.display = 'block';
        }
    }

    // Mostrar mensaje de éxito
    showSuccessMessage() {
        // Crear toast notification
        const toast = document.createElement('div');
        toast.className = 'access-success-toast';
        toast.innerHTML = `
            <div style="background: linear-gradient(90deg, #28a745, #20c997); color: white; padding: 20px; border-radius: 10px; margin: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); text-align: center; font-weight: bold;">
                🎉 ¡Bienvenido a Robot Framework Academy!<br>
                <small style="opacity: 0.9;">Disfruta de todas las 251 lecciones</small>
            </div>
        `;
        
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.zIndex = '10001';
        toast.style.animation = 'slideInRight 0.5s ease-out';
        
        document.body.appendChild(toast);
        
        // Remover toast después de 4 segundos
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.5s ease-in reverse';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    // Cerrar sesión (opcional, para testing)
    logout() {
        this.clearAuthentication();
        this.isAuthenticated = false;
        this.protectContent();
        this.showAccessModal();
        console.log('🔐 Sesión cerrada');
    }

    // Limpiar autenticación
    clearAuthentication() {
        localStorage.removeItem('udemy_access_token');
        localStorage.removeItem('udemy_auth_time');
    }

    // Cambiar contraseña (para administrador)
    changePassword(newPassword) {
        this.masterPassword = newPassword.toUpperCase();
        this.clearAuthentication();
        console.log('🔑 Contraseña actualizada. Los usuarios deberán re-autenticarse.');
    }

    // Obtener información de acceso
    getAccessInfo() {
        return {
            isAuthenticated: this.isAuthenticated,
            authTime: localStorage.getItem('udemy_auth_time'),
            remainingDays: this.getRemainingDays()
        };
    }

    // Obtener días restantes de acceso
    getRemainingDays() {
        const authTime = localStorage.getItem('udemy_auth_time');
        if (!authTime) return 0;
        
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        const elapsed = Date.now() - parseInt(authTime);
        const remaining = thirtyDays - elapsed;
        
        return Math.max(0, Math.ceil(remaining / (24 * 60 * 60 * 1000)));
    }
}

// Agregar animaciones CSS adicionales
const additionalStyles = `
    <style>
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Inicializar sistema de acceso cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔐 Iniciando sistema de acceso...');
    window.accessControl = new SimpleAccessControl();
    
    // Funciones globales para administración (solo para testing)
    window.adminLogout = () => window.accessControl.logout();
    window.adminChangePassword = (newPass) => window.accessControl.changePassword(newPass);
    window.adminAccessInfo = () => console.log(window.accessControl.getAccessInfo());
});

// Prevenir bypass por consola
(function() {
    const originalLog = console.log;
    console.log = function() {
        // Detectar intentos de bypass
        const args = Array.from(arguments).join(' ');
        if (args.includes('bypass') || args.includes('unlock') || args.includes('hack')) {
            return; // No mostrar información sensible
        }
        originalLog.apply(console, arguments);
    };
})();