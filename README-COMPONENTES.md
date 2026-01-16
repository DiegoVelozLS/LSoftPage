# Componentes Reutilizables - Listosoft

Este proyecto utiliza un sistema de componentes reutilizables para el navbar y footer.

## Estructura

```
LSoftPage/
├── components/
│   ├── navbar.html      # Componente del navbar
│   └── footer.html      # Componente del footer
├── pages/
│   └── ejemplo.html     # Ejemplo de página usando componentes
├── components.js         # Script para cargar componentes
├── script.js             # Funcionalidad del sitio
├── styles.css            # Estilos globales
└── index.html            # Página principal
```

## Cómo usar los componentes en una nueva página

### 1. Estructura básica de una página

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Página - Listosoft</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Contenedor para el navbar -->
    <div id="navbar-container"></div>

    <!-- Tu contenido aquí -->
    <section class="section">
        <div class="container">
            <h1>Tu contenido</h1>
        </div>
    </section>

    <!-- Contenedor para el footer -->
    <div id="footer-container"></div>

    <!-- Scripts (importante: este orden) -->
    <script src="components.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

### 2. Si la página está en una subcarpeta

Si creas páginas en la carpeta `pages/`, ajusta las rutas:

```html
<link rel="stylesheet" href="../styles.css">
<script src="../components.js"></script>
<script src="../script.js"></script>
```

## Ventajas

- ✅ **Un solo lugar para editar**: Cambios en navbar/footer se reflejan en todas las páginas
- ✅ **Código más limpio**: Cada página solo contiene su contenido específico
- ✅ **Fácil mantenimiento**: No hay duplicación de código
- ✅ **Escalable**: Fácil agregar nuevas páginas

## Notas importantes

1. **Servidor local requerido**: Los componentes se cargan con `fetch()`, por lo que necesitas un servidor local (no funciona abriendo el HTML directamente)
   - Usa Live Server en VS Code
   - O cualquier servidor local (Python, Node.js, etc.)

2. **Orden de scripts**: Importante cargar `components.js` antes de `script.js`

3. **Rutas de assets**: Los componentes usan rutas relativas desde la raíz del proyecto

## Editar componentes

- **Navbar**: Edita `components/navbar.html`
- **Footer**: Edita `components/footer.html`

Los cambios se aplicarán automáticamente a todas las páginas que usen estos componentes.


