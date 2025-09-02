/**
 * Robot Framework Academy - Lesson 090
 * Selectores CSS responsivos
 */

const LESSON_090 = {
    id: 90,
    title: "Selectores CSS responsivos",
    duration: "7 min",
    level: "intermediate",
    section: "section-07",
    content: `
        <h2>🎯 CSS Responsivo</h2>
        <p>Domina selectores específicos para responsive design, elementos que cambian según breakpoints y automation que funciona en desktop, tablet y mobile.</p>
        
        <h3>💻 Responsive automation:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                 https://responsive-demo.com
\${BROWSER}             chrome
\${DESKTOP_WIDTH}       1920
\${TABLET_WIDTH}        768
\${MOBILE_WIDTH}        375
\${SEARCH_TERM}         responsive testing
\${USER_EMAIL}          responsive@test.com
\${MENU_ITEM}           Products
\${BREAKPOINT_LARGE}    1200

*** Test Cases ***
Test Desktop Layout Elements
    Open Browser                    \${URL}                              \${BROWSER}
    Set Window Size                 \${DESKTOP_WIDTH}                    1080
    Element Should Be Visible       css=.desktop-nav
    Element Should Be Visible       css=.sidebar-desktop
    Element Should Be Visible       css=.main-content-desktop
    Element Should Be Visible       css=.header-desktop .logo-full
    Element Should Not Be Visible   css=.mobile-menu-toggle
    Element Should Not Be Visible   css=.hamburger-icon
    Click Element                   css=.desktop-nav .menu-item:first-child
    Element Should Be Visible       css=.desktop-dropdown
    Input Text                      css=.desktop-search-bar             \${SEARCH_TERM}
    Element Should Contain          css=.desktop-search-bar             \${SEARCH_TERM}
    Click Element                   css=.desktop-nav .login-button
    Element Should Be Visible       css=.desktop-login-modal
    Close Browser

Test Tablet Layout Elements
    Open Browser                    \${URL}                              \${BROWSER}
    Set Window Size                 \${TABLET_WIDTH}                     1024
    Element Should Be Visible       css=.tablet-nav
    Element Should Be Visible       css=.tablet-header
    Element Should Not Be Visible   css=.desktop-nav
    Element Should Not Be Visible   css=.sidebar-desktop
    Element Should Be Visible       css=.content-tablet-grid
    Element Should Be Visible       css=.tablet-menu .collapsed-menu
    Click Element                   css=.tablet-menu-toggle
    Element Should Be Visible       css=.tablet-menu.expanded
    Element Should Be Visible       css=.tablet-search-compact
    Input Text                      css=.tablet-search-input            \${SEARCH_TERM}
    Element Should Contain          css=.tablet-search-input            \${SEARCH_TERM}
    Click Element                   css=.tablet-nav .user-profile
    Element Should Be Visible       css=.tablet-user-dropdown
    Close Browser

Test Mobile Layout Elements
    Open Browser                    \${URL}                              \${BROWSER}
    Set Window Size                 \${MOBILE_WIDTH}                     667
    Element Should Be Visible       css=.mobile-header
    Element Should Be Visible       css=.hamburger-menu
    Element Should Be Visible       css=.mobile-logo
    Element Should Not Be Visible   css=.desktop-nav
    Element Should Not Be Visible   css=.tablet-nav
    Element Should Be Visible       css=.mobile-content-stack
    Click Element                   css=.hamburger-menu
    Element Should Be Visible       css=.mobile-nav-drawer
    Element Should Be Visible       css=.mobile-nav-overlay
    Click Element                   css=.mobile-nav-drawer .menu-item
    Element Should Be Visible       css=.mobile-submenu
    Click Element                   css=.mobile-search-icon
    Element Should Be Visible       css=.mobile-search-overlay
    Close Browser

Test Responsive Navigation Patterns
    Open Browser                    \${URL}                              \${BROWSER}
    Set Window Size                 \${DESKTOP_WIDTH}                    1080
    Element Should Be Visible       css=.horizontal-nav
    Element Should Not Be Visible   css=.vertical-nav
    Set Window Size                 \${TABLET_WIDTH}                     1024
    Element Should Be Visible       css=.compact-nav
    Element Should Be Visible       css=.nav-toggle-button
    Set Window Size                 \${MOBILE_WIDTH}                     667
    Element Should Be Visible       css=.drawer-nav
    Element Should Be Visible       css=.bottom-nav
    Click Element                   css=.nav-menu-button
    Element Should Be Visible       css=.mobile-nav-fullscreen
    Click Element                   css=.nav-close-button
    Element Should Not Be Visible   css=.mobile-nav-fullscreen
    Set Window Size                 \${DESKTOP_WIDTH}                    1080
    Element Should Be Visible       css=.horizontal-nav
    Close Browser

Test Responsive Form Layouts
    Open Browser                    \${URL}                              \${BROWSER}
    Set Window Size                 \${DESKTOP_WIDTH}                    1080
    Element Should Be Visible       css=.form-desktop .two-column
    Element Should Be Visible       css=.form-desktop .side-by-side
    Input Text                      css=.form-desktop .email-field      \${USER_EMAIL}
    Element Should Contain          css=.form-desktop .email-field      \${USER_EMAIL}
    Set Window Size                 \${TABLET_WIDTH}                     1024
    Element Should Be Visible       css=.form-tablet .single-column
    Element Should Not Be Visible   css=.form-desktop .two-column
    Set Window Size                 \${MOBILE_WIDTH}                     667
    Element Should Be Visible       css=.form-mobile .stacked-layout
    Element Should Be Visible       css=.form-mobile .full-width-inputs
    Input Text                      css=.form-mobile .mobile-email      \${USER_EMAIL}
    Element Should Contain          css=.form-mobile .mobile-email      \${USER_EMAIL}
    Close Browser

Test Responsive Grid Systems
    Open Browser                    \${URL}                              \${BROWSER}
    Set Window Size                 \${DESKTOP_WIDTH}                    1080
    Element Should Be Visible       css=.grid-desktop .col-4
    Element Should Be Visible       css=.grid-desktop .four-columns
    \${desktop_cols}=  Get Element Count  css=.grid-desktop .grid-item:nth-child(-n+4)
    Should Be Equal As Numbers      \${desktop_cols}                     4
    Set Window Size                 \${TABLET_WIDTH}                     1024
    Element Should Be Visible       css=.grid-tablet .col-2
    Element Should Be Visible       css=.grid-tablet .two-columns
    \${tablet_cols}=  Get Element Count  css=.grid-tablet .grid-item:nth-child(-n+2)
    Should Be Equal As Numbers      \${tablet_cols}                      2
    Set Window Size                 \${MOBILE_WIDTH}                     667
    Element Should Be Visible       css=.grid-mobile .col-1
    Element Should Be Visible       css=.grid-mobile .single-column
    \${mobile_cols}=  Get Element Count  css=.grid-mobile .grid-item:nth-child(1)
    Should Be Equal As Numbers      \${mobile_cols}                      1
    Close Browser

Test Media Query Triggered Elements
    Open Browser                    \${URL}                              \${BROWSER}
    Set Window Size                 \${DESKTOP_WIDTH}                    1080
    Element Should Be Visible       css=.large-screen-only
    Element Should Be Visible       css=.desktop-banner
    Element Should Not Be Visible   css=.small-screen-only
    Set Window Size                 \${BREAKPOINT_LARGE}                 800
    Element Should Be Visible       css=.medium-screen-elements
    Element Should Be Visible       css=.tablet-optimized
    Set Window Size                 \${MOBILE_WIDTH}                     667
    Element Should Be Visible       css=.small-screen-only
    Element Should Be Visible       css=.mobile-optimized
    Element Should Not Be Visible   css=.large-screen-only
    Element Should Be Visible       css=.touch-friendly-buttons
    Click Element                   css=.mobile-cta-button
    Element Should Be Visible       css=.mobile-action-sheet
    Close Browser

Test Responsive Image Handling
    Open Browser                    \${URL}                              \${BROWSER}
    Set Window Size                 \${DESKTOP_WIDTH}                    1080
    Element Should Be Visible       css=.hero-image-desktop
    Element Should Be Visible       css=img[src*='desktop']
    Element Should Be Visible       css=.image-gallery-grid
    Set Window Size                 \${TABLET_WIDTH}                     1024
    Element Should Be Visible       css=.hero-image-tablet
    Element Should Be Visible       css=img[src*='tablet']
    Element Should Be Visible       css=.image-gallery-carousel
    Set Window Size                 \${MOBILE_WIDTH}                     667
    Element Should Be Visible       css=.hero-image-mobile
    Element Should Be Visible       css=img[src*='mobile']
    Element Should Be Visible       css=.image-stack-mobile
    \${mobile_images}=  Get Element Count  css=.mobile-optimized-images img
    Should Be Greater Than          \${mobile_images}                    0
    Click Element                   css=.mobile-image-viewer
    Element Should Be Visible       css=.fullscreen-image-modal
    Close Browser</code></pre>
        
        <h3>🎯 Práctica responsive (5 min):</h3>
        <p>1. Usa Set Window Size para cambiar resoluciones dinámicamente</p>
        <p>2. Practica css=.desktop-element para elementos específicos desktop</p>
        <p>3. Combina css=.mobile-element para elementos específicos mobile</p>
        <p>4. Experimenta Element Should Not Be Visible para elementos ocultos</p>
        <p>5. Usa css=.large-screen-only para media query triggered elements</p>
        <p>6. Practica Get Element Count para verificar grid columns</p>
        <p>7. Combina Should Be Equal As Numbers para validar layouts</p>
        <p>8. Usa css=img[src*='mobile'] para imágenes responsive</p>
        <p>9. Practica css=.hamburger-menu para navegación mobile</p>
        <p>10. Combina css=.nav-drawer con interactions mobile</p>
        <p>11. Usa css=.touch-friendly-buttons para elementos touch</p>
        <p>12. Practica css=.grid-desktop .col-4 para sistemas grid</p>
        <p>13. Combina css=.form-mobile .full-width para formularios responsive</p>
        <p>14. Usa Should Be Greater Than para validar conteos dinámicos</p>
        <p>15. Crea tests que validen UX en todos los breakpoints</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Automatizar testing responsive en múltiples breakpoints</li>
                <li>Localizar elementos específicos por tamaño de pantalla</li>
                <li>Validar comportamientos de navegación responsive</li>
                <li>Verificar layouts grid y formularios adaptativos</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>Set Window Size cambia viewport dinámicamente. Usa .desktop-, .tablet-, .mobile- prefixes para elementos específicos. Element Should Not Be Visible valida elementos ocultos en breakpoints.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 091 - XPath para elementos dinámicos</h3>
        <p>Ahora aprenderás XPath especializado para elementos que cambian dinámicamente: IDs generados, contenido AJAX y elementos que aparecen/desaparecen.</p>
    `,
    topics: ["locators", "css", "xpath"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "easy",
    prerequisites: ["lesson-089"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_090 = LESSON_090;
}