// Navigation Menu Toggle
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Active navigation highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing animation for hero subtitle
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation when page loads
    setTimeout(typeWriter, 1000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skills')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width');
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulate form submission
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé !';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 2000);
        }, 1500);
        
        console.log('Form submitted:', { name, email, message });
    });
}

// Particle effects enhancement
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: ${Math.random() > 0.5 ? '#00ffff' : '#8a2be2'};
            border-radius: 50%;
            animation: float ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.3 + Math.random() * 0.7};
        `;
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Add glitch effect to random elements periodically
setInterval(() => {
    const glitchElements = document.querySelectorAll('.project-card h3, .stat-number');
    const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
    if (randomElement) {
        randomElement.style.animation = 'glitch-skew 0.3s ease-in-out';
        setTimeout(() => {
            randomElement.style.animation = '';
        }, 300);
    }
}, 3000);

// Mouse trail effect
let mouseTrail = [];
const maxTrailLength = 15;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY });
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }
    
    updateMouseTrail();
});

function updateMouseTrail() {
    // Remove existing trail elements
    document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
    
    mouseTrail.forEach((point, index) => {
        const trailElement = document.createElement('div');
        trailElement.className = 'mouse-trail';
        trailElement.style.cssText = `
            position: fixed;
            pointer-events: none;
            width: ${6 - (index * 0.3)}px;
            height: ${6 - (index * 0.3)}px;
            background: rgba(138, 43, 226, ${(index / maxTrailLength) * 0.7});
            border-radius: 50%;
            left: ${point.x}px;
            top: ${point.y}px;
            transform: translate(-50%, -50%);
            z-index: 9999;
            box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
        `;
        document.body.appendChild(trailElement);
        
        setTimeout(() => {
            trailElement.remove();
        }, 800);
    });
}

// Preloader (if needed)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .loaded * {
        animation-play-state: running;
    }
    
    /* Terminal cursor blink */
    .terminal-cursor {
        animation: terminal-blink 1s infinite;
    }
    
    @keyframes terminal-blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    /* Matrix rain effect */
    .matrix-rain {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    }
`;
document.head.appendChild(style);

// Add some underground console messages
console.log('%c[SYSTEM] Underground portfolio loaded successfully...', 'color: #8a2be2; font-family: monospace;');
console.log('%c[INFO] Welcome to the matrix, fellow hacker.', 'color: #00ffff; font-family: monospace;');
console.log('%c[DEBUG] If you\'re reading this, you know what you\'re doing ;)', 'color: #ff00ff; font-family: monospace;');

// Easter egg for curious developers
window.hack = function() {
    console.log('%c', 'font-size: 1px; padding: 100px 200px; background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSIyMDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzAwZmY0MSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SGFja2VyIERldGVjdGVkITwvdGV4dD48L3N2Zz4=") no-repeat;');
}