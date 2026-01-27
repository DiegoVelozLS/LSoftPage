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

        fetch(path)
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

// Función para configurar las rutas de los enlaces después de cargar los componentes
function setupDynamicLinks() {
    // Determinar la ruta base según la ubicación actual
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const basePath = isInPagesFolder ? '../' : '';

    // Configurar logo del navbar
    const navLogoLink = document.querySelector('.nav-logo-link');
    const navLogoDark = document.querySelector('.nav-logo-dark');
    const navLogoWhite = document.querySelector('.nav-logo-white');

    if (navLogoLink) navLogoLink.href = `${basePath}index.html`;
    if (navLogoDark) navLogoDark.src = `${basePath}assets/Logo-Listosoft.png`;
    if (navLogoWhite) navLogoWhite.src = `${basePath}assets/Logo-ListosoftBlanco.png`;

    // Configurar enlaces del menú de navegación
    const navModulosLink = document.querySelector('.nav-modulos-link');
    const navModulosVerTodos = document.querySelector('.nav-modulos-ver-todos');
    if (navModulosLink) navModulosLink.href = `${basePath}pages/modulos.html`;
    if (navModulosVerTodos) navModulosVerTodos.href = `${basePath}pages/modulos.html`;

    // Enlaces del mega menú
    const navGestionComercial = document.querySelector('.nav-gestion-comercial');
    const navCompras = document.querySelector('.nav-compras');
    const navInventarios = document.querySelector('.nav-inventarios');
    const navFinanzas = document.querySelector('.nav-finanzas');
    const navNomina = document.querySelector('.nav-nomina');
    const navAnalisis = document.querySelector('.nav-analisis');

    if (navGestionComercial) navGestionComercial.href = `${basePath}pages/modulos.html#gestion-comercial`;
    if (navCompras) navCompras.href = `${basePath}pages/modulos.html#compras`;
    if (navInventarios) navInventarios.href = `${basePath}pages/modulos.html#inventarios`;
    if (navFinanzas) navFinanzas.href = `${basePath}pages/modulos.html#finanzas`;
    if (navNomina) navNomina.href = `${basePath}pages/modulos.html#nomina`;
    if (navAnalisis) navAnalisis.href = `${basePath}pages/modulos.html#analisis`;

    // Enlaces del menú principal
    const navClientesLink = document.querySelector('.nav-clientes-link');
    const navRecursosLink = document.querySelector('.nav-recursos-link');
    const navEmpresaLink = document.querySelector('.nav-empresa-link');
    const navSoporteLink = document.querySelector('.nav-soporte-link');
    const navContactoLink = document.querySelector('.nav-contacto-link');

    if (navClientesLink) navClientesLink.href = `${basePath}index.html#Clientes`;
    if (navRecursosLink) navRecursosLink.href = `${basePath}pages/recursos.html`;
    if (navEmpresaLink) navEmpresaLink.href = `${basePath}pages/Sobre-nosotros.html`;
    if (navSoporteLink) navSoporteLink.href = `${basePath}pages/soporte.html`;
    if (navContactoLink) navContactoLink.href = `${basePath}index.html#contacto`;

    // Configurar logo del footer
    const footerLogoLink = document.querySelector('.footer-logo-link');
    const footerLogoImg = document.querySelector('.footer-logo-img');

    if (footerLogoLink) footerLogoLink.href = `${basePath}index.html`;
    if (footerLogoImg) footerLogoImg.src = `${basePath}assets/Logo-Listosoft.png`;

    // Enlaces del footer
    const footerFinanzasLink = document.querySelector('.footer-finanzas-link');
    const footerGestionComercialLink = document.querySelector('.footer-gestion-comercial-link');
    const footerInventariosLink = document.querySelector('.footer-inventarios-link');
    const footerNominaLink = document.querySelector('.footer-nomina-link');
    const footerSobreNosotrosLink = document.querySelector('.footer-sobre-nosotros-link');
    const footerPoliticaLink = document.querySelector('.footer-politica-link');

    if (footerFinanzasLink) footerFinanzasLink.href = `${basePath}pages/modulos.html#finanzas`;
    if (footerGestionComercialLink) footerGestionComercialLink.href = `${basePath}pages/modulos.html#gestion-comercial`;
    if (footerInventariosLink) footerInventariosLink.href = `${basePath}pages/modulos.html#inventarios`;
    if (footerNominaLink) footerNominaLink.href = `${basePath}pages/modulos.html#nomina`;
    if (footerSobreNosotrosLink) footerSobreNosotrosLink.href = `${basePath}pages/Sobre-nosotros.html`;
    if (footerPoliticaLink) footerPoliticaLink.href = `${basePath}pages/Politica-privacidad.html`;
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Determinar la ruta base
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const basePath = isInPagesFolder ? '../' : '';

    // Rutas de componentes
    const navbarPath = `${basePath}components/navbar.html`;
    const footerPath = `${basePath}components/footer.html`;

    // Cargar todos los componentes en paralelo
    Promise.all([
        fetchComponent(navbarPath, 'navbar-container'),
        fetchComponent(footerPath, 'footer-container')
    ]).then(() => {
        // Configurar las rutas dinámicamente después de cargar los componentes
        setupDynamicLinks();

        // Disparar evento personalizado cuando TODO esté listo
        const event = new Event('componentsLoaded');
        document.dispatchEvent(event);
        console.log('Todos los componentes han sido cargados.');
    });
});






