const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reinitialize stars after resizing
    init();
}

window.addEventListener('resize', resizeCanvas);

class Star {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.flickerInterval = Math.floor(Math.random() * 50) + 50;
        this.flickerCounter = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.flickerCounter++;

        if (this.flickerCounter === this.flickerInterval) {
            this.radius = getRandom(0.5, 2);
            this.color = `rgba(255, 255, 255, ${getRandom(0.3, 1)})`;
            this.flickerCounter = 0;
            this.flickerInterval = Math.floor(Math.random() * 50) + 50;
        }

        this.draw();
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function spawnStars() {
    const x = getRandom(0, canvas.width);
    const y = getRandom(0, canvas.height);
    const radius = getRandom(0.5, 2);
    const color = `rgba(255, 255, 255, ${getRandom(0.3, 1)})`;
    return new Star(x, y, radius, color);
}

let stars;
function init() {
    stars = [];

    // Create stars based on new canvas size
    for (let i = 0; i < 200; i++) {
        stars.push(spawnStars());
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
    });
}

// Initialize and animate
resizeCanvas(); // Resize the canvas initially and generate stars
animate(); // Start the animation loop