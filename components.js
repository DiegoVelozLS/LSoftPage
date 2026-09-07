// Función auxiliar para cargar un solo componente
function fetchComponent(path, containerId) {
    return new Promise((resolve, reject) => {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`No se encontró el contenedor con id: ${containerId}`);
            // Resolvemos aunque falle para no detener la carga de otros componentes
            resolve();
            return;
        }

        fetch(path, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error(`Error al cargar ${path}: ${response.statusText}`);
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                // Reinicializar iconos de Lucide si existen
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                resolve();
            })
            .catch(error => {
                console.error('Error al cargar componente:', error);
                // Resolvemos para permitir continuar
                resolve();
            });
    });
}

function setHref(selector, href) {
    document.querySelectorAll(selector).forEach((el) => {
        el.href = href;
    });
}

// Función para configurar las rutas de los enlaces después de cargar los componentes
function setupDynamicLinks() {
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const basePath = isInPagesFolder ? '../' : '';

    const navLogoLink = document.querySelector('.nav-logo-link');
    const navLogoDark = document.querySelector('.nav-logo-dark');
    const navLogoWhite = document.querySelector('.nav-logo-white');

    if (navLogoLink) navLogoLink.href = `${basePath}index.html`;
    if (navLogoDark) navLogoDark.src = `${basePath}assets/Logo-Listosoft.png`;
    if (navLogoWhite) navLogoWhite.src = `${basePath}assets/Logo-ListosoftBlanco.png`;

    setHref('.nav-erp-link', `${basePath}index.html`);
    setHref('.nav-modulos-link', `${basePath}pages/modulos.html`);
    setHref('.nav-modulos-ver-todos', `${basePath}pages/modulos.html`);
    setHref('.nav-recursos-link', `${basePath}pages/recursos.html`);
    setHref('.nav-descargas-link', `${basePath}pages/descargas.html`);
    setHref('.nav-soporte-link', `${basePath}pages/soporte.html`);
    setHref('.nav-empresa-link', `${basePath}pages/Sobre-nosotros.html`);
    setHref('.nav-contacto-link', `${basePath}index.html#contacto`);

    const footerLogoLink = document.querySelector('.footer-logo-link');
    const footerLogoImg = document.querySelector('.footer-logo-img');

    if (footerLogoLink) footerLogoLink.href = `${basePath}index.html`;
    if (footerLogoImg) footerLogoImg.src = `${basePath}assets/Logo-Listosoft.png`;

    setHref('.footer-erp-link', `${basePath}index.html`);
    setHref('.footer-modulos-link', `${basePath}pages/modulos.html`);
    setHref('.footer-descargas-link', `${basePath}pages/descargas.html`);
    setHref('.footer-recursos-link', `${basePath}pages/recursos.html`);
    setHref('.footer-soporte-link', `${basePath}pages/soporte.html`);
    setHref('.footer-sobre-nosotros-link', `${basePath}pages/Sobre-nosotros.html`);
    setHref('.footer-clientes-link', `${basePath}index.html#Clientes`);
    setHref('.footer-politica-link', `${basePath}pages/Politica-privacidad.html`);
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const basePath = isInPagesFolder ? '../' : '';

    const navbarPath = `${basePath}components/navbar.html?v=20260907`;
    const footerPath = `${basePath}components/footer.html?v=20260907`;

    Promise.all([
        fetchComponent(navbarPath, 'navbar-container'),
        fetchComponent(footerPath, 'footer-container')
    ]).then(() => {
        setupDynamicLinks();

        const event = new Event('componentsLoaded');
        document.dispatchEvent(event);
        console.log('Todos los componentes han sido cargados.');
    });
});
