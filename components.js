// Función para cargar componentes HTML
async function loadComponent(componentPath, containerId) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Error al cargar ${componentPath}: ${response.statusText}`);
        }
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        } else {
            console.error(`No se encontró el contenedor con id: ${containerId}`);
        }
    } catch (error) {
        console.error('Error al cargar componente:', error);
    }
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Determinar la ruta base según la ubicación del archivo
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const basePath = isInPagesFolder ? '../' : '';
    
    // Cargar navbar y footer
    loadComponent(`${basePath}components/navbar.html`, 'navbar-container');
    loadComponent(`${basePath}components/footer.html`, 'footer-container');
});




