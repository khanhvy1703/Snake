/////////////////////////////// OPTIONS /////////////////////////////////////////
const howEl = document.getElementById("how");
const howContent = document.getElementById("how-content");
const close = document.getElementById("close");
const reset = document.getElementById("reset");

// reset button
reset.addEventListener("click", () => {
  window.location.reload();
});

howEl.onclick = function () {
  howContent.style.display = "block";
};

close.onclick = function () {
  howContent.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == howContent) {
    howContent.style.display = "none";
  }
};

/////////////////////////////// GAME /////////////////////////////////////////
const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

let score = 0;
const box = 20;

// snake
let snake = [];

snake[0] = {
  x: Math.floor(Math.random() * 23 + 1) * box,
  y: Math.floor(Math.random() * 23 + 1) * box,
};

// food
function genFood() {
  food_x = Math.floor(Math.random() * 24) * box;
  food_y = Math.floor(Math.random() * 24) * box;

  snake.forEach(function foodCollisonSnake(part) {
    const collision = part.x == food_x && part.y == food_y;
    if (collision) genFood();
  });
}

// poison food
function genPoison() {
  poison_x = Math.floor(Math.random() * 24) * box;
  poison_y = Math.floor(Math.random() * 24) * box;

  snake.forEach(function foodCollisonSnake(part) {
    const collSnake = part.x == poison_x && part.y == poison_x;
    if (collSnake) genPosion();
  });

  const collFood = food_x == poison_x && food_y == poison_x;
  if (collFood) genPosion();
}

// draw backfround
function drawBackground() {
  ctx.fillStyle = "rgb(44, 63, 57)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// draw game over
function drawGameOver() {
  ctx.font = "bold 50px BioRhyme";
  ctx.fillStyle = "whitesmoke";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", 250, 250);
}

// draw snake
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "black";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "rgb(44, 63, 57)";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
}

// draw food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food_x, food_y, box, box);
  ctx.strokeStyle = "rgb(44, 63, 57)";
  ctx.strokeRect(food_x, food_y, box, box);
}

// draw poison
function drawPoison() {
  ctx.fillStyle = "purple";
  ctx.fillRect(poison_x, poison_y, box, box);
  ctx.strokeStyle = "rgb(44, 63, 57)";
  ctx.strokeRect(poison_x, poison_y, box, box);
}

// setting the direction of the snake
let m;
document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 37 && m != "right") {
    m = "left";
  } else if (event.keyCode == 38 && m != "down") {
    m = "up";
  } else if (event.keyCode == 39 && m != "left") {
    m = "right";
  } else if (event.keyCode == 40 && m != "up") {
    m = "down";
  }
}

// checks if the snake eats itself
function isEaten(head, list) {
  for (let i = 0; i < snake.length; i++) {
    if (head.x == list[i].x && head.y == list[i].y) {
      return true;
    }
  }
  return false;
}

genFood();
genPoison();

// draw everything into the gameboard
function draw() {
  drawBackground();
  drawSnake();
  drawFood();
  drawPoison();

  // move the snake
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (m == "left") headX -= box;
  if (m == "right") headX += box;
  if (m == "up") headY -= box;
  if (m == "down") headY += box;

  // check if the snake eats poison food
  if (poison_x == snake[0].x && poison_y == snake[0].y) {
    score--;
    genPoison();
    scoreEl.innerHTML = score;

    if (snake.length > 1) {
      snake.pop();
    }
  }

  // check if snake eats food
  if (food_x == snake[0].x && food_y == snake[0].y) {
    score++;
    genFood();
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
    isEaten(newHead, snake)
  ) {
    drawGameOver();
    clearInterval(game);
  }

  snake.unshift(newHead);
}

let game = setInterval(draw, 100);
