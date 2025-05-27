const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gridSize = 20;
let tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let dx = 1, dy = 0;
let food = { x: 15, y: 15 };

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

let gameInterval;
let isGameRunning = false;

document.getElementById('highScore').innerText = highScore;

const gameOverScreen = document.getElementById('gameOverScreen');
const finalScore = document.getElementById('finalScore');

function startGame() {
  isGameRunning = true;
  gameOverScreen.classList.add('hidden');
  snake = [{ x: 10, y: 10 }];
  dx = 1; dy = 0;
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
  score = 0;
  document.getElementById('score').innerText = score;
  clearInterval(gameInterval);
  gameInterval = setInterval(update, 100);
}

function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.some(p => p.x === head.x && p.y === head.y)
  ) {
    isGameRunning = false;
    clearInterval(gameInterval);

    finalScore.innerText = score;
    gameOverScreen.classList.remove('hidden');
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').innerText = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
      document.getElementById('highScore').innerText = highScore;
    }

    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0ff';
  snake.forEach(p => {
    ctx.fillRect(p.x * gridSize, p.y * gridSize, gridSize - 2, gridSize - 2);
  });

  ctx.fillStyle = '#f0f';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// Prevent window scroll only when game is running and arrow keys pressed
window.addEventListener('keydown', e => {
  if (!isGameRunning) return;

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault(); // Prevent page scroll during gameplay
  }

  if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
  else if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
  else if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
  else if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
});

document.getElementById('scoreForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('playerName').value;

  // Change API URL to your backend endpoint
  fetch('http://127.0.0.1:8000/api/submit/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, score })
  }).then(() => {
    fetchLeaderboard();
    document.getElementById('playerName').value = '';
  });
});

function fetchLeaderboard() {
  // Change API URL to your backend endpoint
  fetch('http://127.0.0.1:8000/api/leaderboard/')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('leaderboardList');
      list.innerHTML = '';
      data.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.name} - ${entry.score}`;
        list.appendChild(li);
      });
    });
}

fetchLeaderboard();
startGame();
