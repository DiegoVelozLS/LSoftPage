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
        // Disparar evento personalizado cuando TODO esté listo
        const event = new Event('componentsLoaded');
        document.dispatchEvent(event);
        console.log('Todos los componentes han sido cargados.');
    });
});






