const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const reset = document.getElementById("reset");

let score = 0;
const box = 20;

// draw backfround
function drawBackground() {
  ctx.fillStyle = "rgb(1, 20, 31)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// draw game over
function drawGameOver() {
  ctx.font = "bold 50px BioRhyme";
  ctx.fillStyle = "whitesmoke";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", 250, 250);
}

// snake
let snake = [];

snake[0] = {
  x: Math.floor(Math.random() * 23 + 1) * box,
  y: Math.floor(Math.random() * 23 + 1) * box,
};

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// food
let food = {
  x: Math.floor(Math.random() * 24) * box,
  y: Math.floor(Math.random() * 24) * box,
};

// draw food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}

// setting the direction of the snake
let m;
document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 37 && m != "right") {
    m = "left";
    console.log(snake.length);
  } else if (event.keyCode == 38 && m != "down") {
    m = "up";
  } else if (event.keyCode == 39 && m != "left") {
    m = "right";
  } else if (event.keyCode == 40 && m != "up") {
    m = "down";
  }
}

// checks if the snake eats itself
function checkCollision(head, list) {
  for (let i = 0; i < snake.length; i++) {
    if (head.x == list[i].x && head.y == list[i].y) {
      return true;
    }
  }
  return false;
}

// draw everything into the gameboard
function draw() {
  drawBackground();
  drawSnake();
  drawFood();

  // move the snake
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (m == "left") headX -= box;
  if (m == "right") headX += box;
  if (m == "up") headY -= box;
  if (m == "down") headY += box;

  // check if snake eats food
  if (food.x == snake[0].x && food.y == snake[0].y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 24) * box,
      y: Math.floor(Math.random() * 24) * box,
    };
    scoreEl.innerHTML = score;
  } else {
    snake.pop();
  }

  let newHead = {
    x: headX,
    y: headY,
  };

  // checks gameover
  if (
    headX < 0 ||
    headX > 24 * box ||
    headY < 0 ||
    headY > 24 * box ||
    checkCollision(newHead, snake)
  ) {
    drawGameOver();
    clearInterval(game);
  }

  snake.unshift(newHead);
}

let game = setInterval(draw, 120);

reset.addEventListener("click", () => {
  window.location.reload();
});
