const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const car = {
  x: 20,
  y: HEIGHT / 2 - 5,
  w: 10,
  h: 10,
  color: '#0f0'
};

let level = 0;
const totalLevels = 10;
let obstacles = [];
let levelSpeed = 1;

const levels = [
  { speed: 1, count: 5 },
  { speed: 1.2, count: 6 },
  { speed: 1.4, count: 7 },
  { speed: 1.6, count: 8 },
  { speed: 1.8, count: 9 },
  { speed: 2, count: 10 },
  { speed: 2.2, count: 11 },
  { speed: 2.4, count: 12 },
  { speed: 2.6, count: 13 },
  { speed: 2.8, count: 14 }
];

function resetLevel() {
  const info = levels[level];
  levelSpeed = info.speed;
  obstacles = [];
  for (let i = 0; i < info.count; i++) {
    obstacles.push({
      x: WIDTH + Math.random() * WIDTH,
      y: Math.random() * (HEIGHT - 10),
      w: 10,
      h: 10,
      color: '#f00'
    });
  }
  car.x = 20;
  car.y = HEIGHT / 2 - car.h / 2;
}

function nextLevel() {
  level++;
  if (level >= totalLevels) {
    alert('You won!');
    level = 0;
  }
  resetLevel();
}

function drawCar() {
  ctx.fillStyle = car.color;
  ctx.fillRect(car.x, car.y, car.w, car.h);
}

function drawObstacles() {
  ctx.fillStyle = '#f00';
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
  });
}

function updateObstacles() {
  obstacles.forEach(obs => {
    obs.x -= levelSpeed;
    if (obs.x + obs.w < 0) {
      obs.x = WIDTH + Math.random() * WIDTH;
      obs.y = Math.random() * (HEIGHT - obs.h);
    }
    if (isColliding(car, obs)) {
      resetLevel();
    }
  });
}

function isColliding(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function update() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawCar();
  drawObstacles();
  updateObstacles();

  car.x += levelSpeed;
  if (car.x + car.w >= WIDTH) {
    nextLevel();
  }
  requestAnimationFrame(update);
}

function handleKey(e) {
  if (e.key === 'ArrowUp') car.y -= 5;
  if (e.key === 'ArrowDown') car.y += 5;
  car.y = Math.max(0, Math.min(HEIGHT - car.h, car.y));
}

document.addEventListener('keydown', handleKey);
resetLevel();
update();
