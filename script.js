// Función para inicializar cuando los componentes estén cargados
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const carouselContainer = document.querySelector('.carousel-container');

    // Si no hay carrusel en la página, salir
    if (slides.length === 0 || indicators.length === 0 || !carouselContainer) {
        return;
    }

    let currentSlide = 0;
    let autoplayInterval;

    function showSlide(index) {
        // Validar índice
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Remover clase active de todas las diapositivas e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Agregar clase active a la diapositiva actual e indicador
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 4000); // Cambiar imagen cada 4 segundos
    }

    // Parar autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Click en indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoplay();
            showSlide(index);
            startAutoplay();
        });
    });

    // Parar autoplay cuando el usuario interactúa
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);

    // Inicializar
    showSlide(0);
    startAutoplay();
}

function initializeApp() {
    // 1. Manejo del Header Sticky
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('inicio');

    if (!navbar || !heroSection) {
        // Si los componentes aún no están cargados, esperar un poco más
        setTimeout(initializeApp, 100);
        return;
    }

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        // Si estamos dentro de la sección hero, hacer el navbar transparente
        if (scrollY < heroBottom - 100) {
            navbar.classList.add('over-hero');
            navbar.classList.remove('scrolled');
        } else {
            // Si salimos del hero, aplicar el estilo scrolled con color azul
            navbar.classList.remove('over-hero');
            navbar.classList.add('scrolled');
        }
    });

    // Verificar el estado inicial al cargar la página
    const initialScroll = window.scrollY;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    if (initialScroll < heroBottom - 100) {
        navbar.classList.add('over-hero');
    }

    // 2. Carrusel de Imágenes
    initializeCarousel();

    // 3. Menú Móvil (Hamburger)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navCta = document.querySelector('.nav-cta');

    if (hamburger && navMenu) {
        console.log('Menú hamburguesa inicializado correctamente');

        // Función para toggle del menú
        function toggleMenu(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggle menú activado');
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Prevenir scroll del body cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        // Soporte para clic
        hamburger.addEventListener('click', toggleMenu);
    } else {
        console.error('Hamburger o navMenu no encontrado');
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Si el enlace tiene un submenú
            const navItem = link.closest('.nav-item');
            if (navItem && navItem.classList.contains('dropdown')) {
                // En móvil, permitir navegación directa (ya no hay submenú)
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                    // No prevenimos el default, dejamos que navegue
                } else {
                    // En desktop, comportamiento normal (si fuera click) o prevención
                    // (aunque en desktop suele ser hover)
                    e.preventDefault();
                }
            } else {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Cerrar submenús al hacer clic en un enlace del dropdown
    const dropdownLinks = document.querySelectorAll('.dropdown-link, .mega-link'); // Added .mega-link
    dropdownLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            // Cerrar todos los submenús
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
        });
    });

    // Cerrar menú al hacer clic en el CTA también
    if (navCta) {
        navCta.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);

        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 3. Animaciones al hacer Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 3.5. Video de YouTube - Reproducción automática cuando aparece
    const videoContainer = document.getElementById('video-container');
    const youtubeVideo = document.getElementById('youtube-video');
    let videoLoaded = false;

    if (videoContainer && youtubeVideo) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !videoLoaded) {
                    // Cargar el video con autoplay cuando aparece en el viewport
                    const videoId = 'X3yP56Ep1ZU';
                    const startTime = 1; // Empieza en el segundo 1
                    youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}&rel=0&modestbranding=1`;
                    videoLoaded = true;
                    videoObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3 // Se activa cuando el 30% del contenedor es visible
        });

        videoObserver.observe(videoContainer);
    }

    // 4. Manejo del Formulario de Contacto con EmailJS
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtener valores del formulario
            const name = document.getElementById('name').value;
            const company = document.getElementById('company').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Validación básica
            if (!name || !company || !email) {
                alert('Por favor complete todos los campos obligatorios.');
                return;
            }

            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor ingrese un correo electrónico válido.');
                return;
            }

            // Cambiar estado del botón
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i data-lucide="loader-2" style="width: 20px; height: 20px; animation: spin 1s linear infinite;"></i> Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = '#94a3b8';

            // Parámetros para EmailJS
            const templateParams = {
                from_name: name,
                from_company: company,
                from_email: email,
                message: message || 'Sin mensaje adicional',
                to_email: 'contacto@listosoft.com' // Email donde recibirás los mensajes
            };

            // Enviar email usando EmailJS
            emailjs.send('service_vkr4srr', 'template_xp9l3d2', templateParams)
                .then((response) => {
                    console.log('Email enviado exitosamente!', response.status, response.text);

                    // Mensaje de éxito
                    alert('¡Gracias por su interés!\n\nSu mensaje ha sido enviado exitosamente. Un asesor de Listosoft se comunicará con usted en breve.');

                    // Limpiar formulario
                    contactForm.reset();

                    // Restaurar botón
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';

                    // Reinicializar iconos de Lucide
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, (error) => {
                    console.error('Error al enviar email:', error);

                    // Mensaje de error
                    alert('Lo sentimos, hubo un error al enviar su mensaje.\n\nPor favor intente nuevamente o contáctenos directamente por WhatsApp o teléfono.');

                    // Restaurar botón
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';

                    // Reinicializar iconos de Lucide
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                });
        });
    }

    // 5. Scroll Suave para anclas (compatibilidad extra)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// Variable de control para evitar inicialización múltiple
let appInitialized = false;

function safeInitializeApp() {
    if (appInitialized) return;

    // Verificar que los elementos necesarios existan
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (navbar && hamburger && navMenu) {
        appInitialized = true;
        initializeApp();
    } else {
        console.log('Esperando elementos del navbar...');
    }
}

// Esperar evento personalizado de componentes
document.addEventListener('componentsLoaded', () => {
    safeInitializeApp();
});

// Fallback: intentar inicializar después de un breve delay
setTimeout(() => {
    if (!appInitialized) {
        console.log('Intentando inicializar con fallback...');
        safeInitializeApp();
    }
}, 500);

// Fallback adicional para DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (!appInitialized) {
            console.log('Intentando inicializar con DOMContentLoaded...');
            safeInitializeApp();
        }
    }, 100);
});

// --- Configuración de Partículas (Network Effect) ---
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si existe el contenedor y la librería
    const particlesContainer = document.getElementById('tsparticles');
    if (particlesContainer && window.tsParticles) {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            fullScreen: { enable: false }, // Importante: no pantalla completa, solo contenedor
            particles: {
                number: {
                    value: 60, // Cantidad de puntos
                    density: {
                        enable: true,
                        area: 800
                    }
                },
                color: {
                    value: "#ffffff" // Puntos blancos
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.2, // Líneas sutiles
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5, // Movimiento lento y tech
                    direction: "none",
                    random: false,
                    straight: false,
                    outModes: {
                        default: "bounce"
                    },
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detectsOn: "canvas",
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab" // Las líneas se conectan al mouse
                    },
                    onClick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            detectRetina: true,
            background: {
                color: "transparent" // Fondo transparente (ya lo da el CSS de .hero)
            }
        });
    }
});