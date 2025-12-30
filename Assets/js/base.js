(() => {
    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;
    let speedMultiplier = 1;
    let scrollTimeout;

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            const hues = [90, 110, 135, 155, 180];
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 0.5;
            const depthSpeed = this.size * 0.15;
            this.speedX = (Math.random() * 2 - 1) * depthSpeed;
            this.speedY = (Math.random() * 2 - 1) * depthSpeed;
            const hue = hues[Math.floor(Math.random() * hues.length)];
            const lightness = 45 + Math.random() * 35;
            const alpha = 0.18 + Math.random() * 0.32;
            this.color = `hsla(${hue}, 70%, ${lightness}%, ${alpha})`;
        }
        update() {
            this.x += this.speedX * speedMultiplier;
            this.y += this.speedY * speedMultiplier;
            if (this.x > canvas.width) this.x = 0; else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0; else if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
    }

    initParticles();
    animateParticles();

    const resetMultiplier = () => {
        speedMultiplier = 1;
    };

    window.addEventListener('wheel', () => {
        speedMultiplier = 3;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(resetMultiplier, 250);
    });

    // --- SCRIPT DE NAVEGACIÓN ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const navMenu = document.getElementById('nav-menu');

    if (!hamburger || !navLinks || !navbar || !navMenu) return;

    const closeMenu = () => {
        if (!navLinks.classList.contains('active')) return;
        navLinks.classList.remove('active');
        hamburger.style.transform = 'rotate(0)';
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    };

    const toggleMenu = () => {
        const isActive = navLinks.classList.toggle('active');
        hamburger.style.transform = isActive ? 'rotate(90deg)' : 'rotate(0)';
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        document.body.classList.toggle('menu-open', isActive);
    };

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    document.addEventListener('click', (event) => {
        if (!navLinks.classList.contains('active')) return;
        const isMenuClick = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isMenuClick) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    const handleNavbarScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();
