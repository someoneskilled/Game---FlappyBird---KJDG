const canvas = document.getElementById('birdCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');

// Game variables
let birdY = 150;
let birdX = 50;
let birdGravity = 0.3;  // Slower gravity
let birdLift = -4;     // Less lift for better playability
let birdVelocity = 0;

let pipes = [];
let pipeWidth = 50;
let pipeGap = 120;      // Wider gap between pipes
let pipeVelocity = 1.5; // Slower pipe speed
let frameCount = 0;

let isGameOver = false;
let isGameStarted = false;

const wordList = ['fun', 'learning', 'innovation', 'projects', 'development', 'networking', 'collaboration', 'growth', 'creativity', 'exposure', 'skills', 'hackathons', 'teamwork', 'mentorship', 'technology', 'real-world experience', 'leadership', 'exploration', 'empowerment', 'knowledge-sharing']; // Customize this list

// Bird object
const bird = {
  width: 20,
  height: 20,
  color: '#ff0',
};

// Handle key press for bird jump and to start the game
window.addEventListener('keydown', () => {
  if (!isGameStarted) {
    isGameStarted = true;
    message.style.display = 'none';
    gameLoop();
  } else {
    birdVelocity = birdLift;
  }
});

window.addEventListener('click', () => {
  if (!isGameStarted) {
    isGameStarted = true;
    message.style.display = 'none';
    gameLoop();
  } else {
    birdVelocity = birdLift;
  }
});

// Game loop
function gameLoop() {
  if (isGameOver) return;

  frameCount++;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bird
  birdVelocity += birdGravity;
  birdY += birdVelocity;

  ctx.fillStyle = bird.color;
  ctx.fillRect(birdX, birdY, bird.width, bird.height);

  // Pipe logic
  if (frameCount % 150 === 0) {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    pipes.push({
      x: canvas.width,
      height: Math.random() * (canvas.height - pipeGap),
      text: randomWord,
    });
  }

  pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);

  pipes.forEach(pipe => {
    pipe.x -= pipeVelocity;

    // Draw top pipe
    ctx.fillStyle = '#228b22';
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.height);

    // Draw bottom pipe
    ctx.fillRect(pipe.x, pipe.height + pipeGap, pipeWidth, canvas.height - pipe.height - pipeGap);

    // Add text on pipes
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText(pipe.text, pipe.x + 5, pipe.height + pipeGap / 2);

    // Collision detection
    if (
      birdX < pipe.x + pipeWidth &&
      birdX + bird.width > pipe.x &&
      (birdY < pipe.height || birdY + bird.height > pipe.height + pipeGap)
    ) {
      isGameOver = true;
      alert('Game Over');
      return;
    }
  });

  // Prevent bird from falling off the screen
  if (birdY + bird.height >= canvas.height || birdY <= 0) {
    isGameOver = true;
    alert('Game Over');
    return;
  }

  // Request the next frame
  requestAnimationFrame(gameLoop);
}

// Initial display of the welcome message
message.textContent = "Have a KJDG tour, TAP to start";
