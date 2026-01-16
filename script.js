// Función para inicializar cuando los componentes estén cargados
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
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
    document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoplay);
    document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoplay);

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

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        // Prevenir scroll del body cuando el menú está abierto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Si el enlace tiene un submenú, no cerrar el menú principal
            const navItem = link.closest('.nav-item');
            if (navItem && navItem.classList.contains('dropdown')) {
                e.preventDefault();
                // Toggle del submenú en móvil
                if (window.innerWidth <= 768) {
                    navItem.classList.toggle('active');
                }
            } else {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Cerrar submenús al hacer clic en un enlace del dropdown
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
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

    // 4. Manejo del Formulario de Contacto (Simulado)
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulación de envío
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = '#94a3b8'; // Gris visual

        setTimeout(() => {
            alert('¡Gracias por su interés!\n\nSus datos han sido recibidos. Un asesor de Listosoft se comunicará con usted en breve.');
            contactForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = ''; // Volver al color original
        }, 1500);
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

// Esperar a que los componentes se carguen antes de inicializar
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un momento para que los componentes se carguen
    setTimeout(initializeApp, 200);
});