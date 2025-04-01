// Media query to check if window width is at least 650px
const mediasize = window.matchMedia('(min-width: 650px)');

// Create background for HERO section
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const particles = [];
let particleCount = 100;  // Default particle count
let maxParticles = 200;   // Default max particle count
let connectionDistance = 150; // Default connection distance
let particlesCreated = false; // Flag to track if particles have been created already

const networkBg = document.querySelector('.networkBackground');

function createParticles() {
    // Only create particles if the canvas is in the DOM
    if (!networkBg) return;

    canvas.width = networkBg.offsetWidth;
    canvas.height = networkBg.offsetHeight;

    // Position canvas fixed within the hero section, so it won't move during scrolling
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1'; // Make sure it's behind content

    networkBg.appendChild(canvas);

    const fixedColor = 'rgba(84, 194, 255, 0.5)';

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = fixedColor;
    }

    Particle.prototype.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Prevent particle size from becoming too small
        if (this.size > 0.2) this.size -= 0.1;
    };

    Particle.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.5;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    };

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    function createParticlesOnce() {
        if (particlesCreated) return; // Don't create particles again if already created

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        setInterval(() => {
            if (particles.length < maxParticles) {
                particles.push(new Particle());
            }
        }, 1000);
        animateParticles();

        particlesCreated = true; // Set the flag to true after particles are created
    }

    // Initialize particles (only create once)
    createParticlesOnce();
}

// Only adjust particles on significant resize, not during every window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Only reset and recreate particles if the width is significantly changed
        if (canvas.width !== networkBg.offsetWidth || canvas.height !== networkBg.offsetHeight) {
            canvas.width = networkBg.offsetWidth;
            canvas.height = networkBg.offsetHeight;
            animateParticles(); // Reanimate particles on resize
        }
    }, 200); // Delay the resize action to prevent constant calls
});

// Function to handle media query matches
function handleMediaQueryChange(e) {
    if (e.matches) {
        // If the media query matches (width >= 650px), create particles
        createParticles();
    } else {
        // If the media query does not match (width < 650px), remove particles or hide canvas
        canvas.style.display = 'none'; // Hides the canvas when screen size is smaller than 650px
    }
}

// Check initial match
handleMediaQueryChange(mediasize);

// Listen for changes in the media query state (e.g., window resize)
mediasize.addEventListener('change', handleMediaQueryChange);
