(() => {
    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    resizeCanvas();

    let particlesArray = [];
    let speedMultiplier = 1;
    let scrollTimeout;

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

            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;

            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
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
        const numberOfParticles = (canvas.height * canvas.width) / 9000;
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

    const resetMultiplier = () => {
        speedMultiplier = 1;
    };

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    window.addEventListener('wheel', () => {
        speedMultiplier = 3;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(resetMultiplier, 250);
    });

    initParticles();
    animateParticles();
})();
