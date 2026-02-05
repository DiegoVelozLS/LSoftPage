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
    const navCicloComercial = document.querySelector('.nav-ciclo-comercial');
    const navGestionFinanciera = document.querySelector('.nav-gestion-financiera');
    const navContabilidadLegal = document.querySelector('.nav-contabilidad-legal');
    const navProduccionOperaciones = document.querySelector('.nav-produccion-operaciones');
    const navNominaActivos = document.querySelector('.nav-nomina-activos');
    const navInteligenciaNegocios = document.querySelector('.nav-inteligencia-negocios');

    if (navCicloComercial) navCicloComercial.href = `${basePath}pages/modulos.html#ciclo-comercial`;
    if (navGestionFinanciera) navGestionFinanciera.href = `${basePath}pages/modulos.html#gestion-financiera`;
    if (navContabilidadLegal) navContabilidadLegal.href = `${basePath}pages/modulos.html#contabilidad-legal`;
    if (navProduccionOperaciones) navProduccionOperaciones.href = `${basePath}pages/modulos.html#produccion-operaciones`;
    if (navNominaActivos) navNominaActivos.href = `${basePath}pages/modulos.html#nomina-activos`;
    if (navInteligenciaNegocios) navInteligenciaNegocios.href = `${basePath}pages/modulos.html#inteligencia-negocios`;

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
    const footerModulosLink = document.querySelector('.footer-modulos-link');
    const footerClientesLink = document.querySelector('.footer-clientes-link');
    const footerRecursosLink = document.querySelector('.footer-recursos-link');
    const footerSoporteLink = document.querySelector('.footer-soporte-link');
    const footerSobreNosotrosLink = document.querySelector('.footer-sobre-nosotros-link');
    const footerPoliticaLink = document.querySelector('.footer-politica-link');

    if (footerModulosLink) footerModulosLink.href = `${basePath}pages/modulos.html`;
    if (footerClientesLink) footerClientesLink.href = `${basePath}index.html#Clientes`;
    if (footerRecursosLink) footerRecursosLink.href = `${basePath}pages/recursos.html`;
    if (footerSoporteLink) footerSoporteLink.href = `${basePath}pages/soporte.html`;
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






