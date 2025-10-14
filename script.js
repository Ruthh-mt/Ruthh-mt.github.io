// Console messages d'accueil
console.log('%c[PORTFOLIO] Chargement du portfolio étudiant...', 'color: #8a2be2; font-weight: bold;');
console.log('%c[INFO] Bienvenue sur mon portfolio BTS SIO !', 'color: #00ffff;');
console.log('%c[DEBUG] Tapez discover() dans la console pour une surprise', 'color: #8a2be2;');

// Easter egg function
window.discover = function() {
    console.log('%c[DÉCOUVERTE] Merci de votre curiosité !', 'color: #8a2be2; font-weight: bold;');
    console.log('%c[CITATION] "Le code est de la poésie que seuls les ordinateurs peuvent lire." 💻', 'color: #00ffff;');
    
    // Effet visuel temporaire
    document.body.style.filter = 'hue-rotate(90deg) brightness(1.2)';
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 2000);
    
    return 'Portfolio exploré avec succès ! ✨';
};

// Particles animation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: ${Math.random() > 0.5 ? '#8a2be2' : '#00ffff'};
            border-radius: 50%;
            animation: float ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.3 + Math.random() * 0.7};
            box-shadow: 0 0 6px currentColor;
        `;
        particlesContainer.appendChild(particle);
    }
}

// CSS pour l'animation des particules
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(120deg); }
        66% { transform: translateY(10px) rotate(240deg); }
    }
`;
document.head.appendChild(particleStyles);

// Cursor trail effect
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateTrail() {
    const trail = document.querySelector('.cursor-trail');
    
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    
    trail.style.left = trailX - 10 + 'px';
    trail.style.top = trailY - 10 + 'px';
    trail.style.opacity = '0.8';
    
    requestAnimationFrame(updateTrail);
}

// Glitch effect plus fréquent
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch-text, .section-title');
    const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
    
    if (randomElement) {
        randomElement.style.animation = 'none';
        setTimeout(() => {
            randomElement.style.animation = 'glitch 0.3s ease-out';
        }, 10);
    }
}

// Navigation mobile
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fermer le menu au clic sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling pour les liens d'ancrage
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.skill-category, .project-card, .tool-category, .veille-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Typing effect pour les messages terminal
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialisation des effets de typing
function initTypingEffects() {
    const terminalOutputs = document.querySelectorAll('.terminal-output .output-line');
    
    terminalOutputs.forEach((line, index) => {
        const originalText = line.textContent;
        setTimeout(() => {
            typeWriter(line, originalText, 40);
        }, index * 500);
    });
}

// Gestion du formulaire de contact
function initContactForm() {
    const form = document.querySelector('.terminal-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi
            const button = form.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Message envoyé ! ✓';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Effet de matrix rain (optionnel)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#8a2be2';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c[INIT] Loading underground systems...', 'color: #8a2be2;');
    
    // Initialiser tous les effets
    createParticles();
    updateTrail();
    initMobileNav();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    
    // Effets avec délai
    setTimeout(initTypingEffects, 1000);
    setTimeout(() => createMatrixRain(), 2000);
    
    // Glitch aléatoire
    setInterval(randomGlitch, 8000);
    
    console.log('%c[SUCCESS] Portfolio chargé avec succès. Bonne visite ! ✨', 'color: #8a2be2;');
});

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    // Recalculer les particules si nécessaire
    const particles = document.querySelector('.particles');
    if (particles && particles.children.length === 0) {
        createParticles();
    }
});

// Messages de debug pour les développeurs curieux
console.log('%c[EASTER EGG] Essayez de taper : discover()', 'color: #8a2be2; font-size: 16px;');
console.log('%c[TIP] Merci de visiter mon portfolio ! 😊', 'color: #00ffff;');