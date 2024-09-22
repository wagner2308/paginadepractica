// Seleccionamos el canvas y el contexto
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ajustamos el tamaño del canvas
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

// Array para almacenar las flores
let flowers = [];

// Función para crear flores con posiciones iniciales y tamaños
function createFlower(x, y, size) {
    return {
        x: x,
        y: y,
        size: size, // Tamaño de la flor más grande
        speed: Math.random() * 0.8 + 0.6 // Velocidad lenta para cada flor
    };
}

// Verifica si dos flores se superponen
function isOverlapping(newFlower) {
    for (let flower of flowers) {
        let distance = Math.sqrt(Math.pow(newFlower.x - flower.x, 2) + Math.pow(newFlower.y - flower.y, 2));
        if (distance < newFlower.size + flower.size) {
            return true; // Se están sobreponiendo
        }
    }
    return false;
}

// Crear un número inicial de flores sin que se superpongan
function initializeFlowers() {
    let attempts = 0; // Controla los intentos de evitar sobreposición

    for (let i = 0; i < 15; i++) { // Menos flores por tamaño más grande
        let size = Math.random() * 30 + 40; // Tamaño más grande
        let x, y;

        // Intentamos colocar la flor sin que se superponga
        do {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height * 0.8;
            attempts++;
        } while (isOverlapping({ x, y, size }) && attempts < 100); // Limita los intentos

        flowers.push(createFlower(x, y, size));
    }
}

// Función para dibujar flores amarillas
function drawFlower(x, y, size) {
    ctx.save();
    ctx.translate(x, y);

    // Dibujar pétalos
    const petalCount = 8;
    const petalRadius = size / 2;
    const petalColor = '#FFD700'; // Color amarillo

    for (let i = 0; i < petalCount; i++) {
        ctx.beginPath();
        ctx.rotate((Math.PI * 2) / petalCount);
        ctx.arc(0, -petalRadius, petalRadius, 0, Math.PI * 2);
        ctx.fillStyle = petalColor;
        ctx.fill();
    }

    // Dibujar centro de la flor
    ctx.beginPath();
    ctx.arc(0, 0, size / 4, 0, Math.PI * 2);
    ctx.fillStyle = '#FFA500'; // Color naranja
    ctx.fill();

    ctx.restore();
}

// Animar las flores lentamente y con un movimiento más controlado
function animateFlowers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    flowers.forEach(flower => {
        drawFlower(flower.x, flower.y, flower.size);
        // Movimiento suave hacia abajo
        flower.y += flower.speed;

        // Si la flor se sale del canvas, la volvemos a colocar arriba
        if (flower.y > canvas.height) {
            flower.y = -flower.size; // Reposicionamos la flor en la parte superior
            flower.x = Math.random() * canvas.width; // La colocamos en una nueva posición horizontal
        }
    });

    requestAnimationFrame(animateFlowers);
}

// Inicializar y empezar la animación
initializeFlowers();
animateFlowers();
