import Game from './Game.js';
import { playerAnims } from './animations.js';

const LOADING = 0,
  INIT = 1,
  TITLE = 2,
  PLAY = 3,
  GAMEOVER = 4,
  RESET = 5;

let isPaused = false;

// (function () {
// GLOBALS =======================================================
const tilesheet = new Image();
tilesheet.src = './assets/images/404_spritesheet_compressed.png';
const bgCtx = document.getElementById('bg').getContext('2d');
let RAF;
const game = new Game(document.getElementById('canvas'));
let gameDiv;
const body = document.querySelector('body');

function gameLoop() {
  if (game.state === TITLE) {
    cancelAnimationFrame(RAF);
    drawText('kill.exe not found', 'Press [SPACE] to Start', instructions());
  } else if (game.state === GAMEOVER) {
    cancelAnimationFrame(RAF);
    drawText('Oops! You\'ve Been Eaten!', 'Press[SPACE] to Try Again');
  } else {
    game.update();
    game.draw(tilesheet);
    RAF = requestAnimationFrame(gameLoop);
  }

}

function buildBackground() {
  for (let i = 0; i < window.innerWidth; i += 32) {
    for (let j = 0; j < window.innerHeight; j += 32) {
      const randX = Math.floor(Math.random() * window.innerWidth) + 1;
      const randY = Math.floor(Math.random() * window.innerHeight) + 1;
      bgCtx.fillStyle = 'white';
      bgCtx.fillRect(randX, randY, 1, 1);
    }
  }
}

function bgResize() {
  bgCtx.canvas.style.width = "100%";
  bgCtx.canvas.style.height = "100%";
  bgCtx.imageSmoothingEnabled = false; // remove blurring from resizing
}

function drawText(text1, text2, extraText) {
  game.canvas.style.display = 'none';
  const fragment = document.createDocumentFragment();
  gameDiv = document.createElement('div');
  fragment.appendChild(gameDiv);

  gameDiv.classList.add('text-screen');

  const mainText = document.createElement('h1');
  mainText.innerText = text1;

  const subText = document.createElement('h3');
  subText.innerText = text2;

  gameDiv.appendChild(mainText);

  if (extraText) {
    const extra = document.createElement('p');;
    extra.innerText = extraText;
    gameDiv.appendChild(extra);
  }

  gameDiv.appendChild(subText);
  body.appendChild(fragment)

}

function removeTextScreen() {
  body.removeChild(gameDiv)
}

function instructions() {
  return `
    You are a defense robot tasked with stopping an alien invasion, but your kill.exe file is missing. In order to get the aliens to leave you have to give them what they want: food!

    Make sure to bring the right food to each alien or the food will be you!

    Controls: WASD | ZQSD | Arrow Keys
  `;
}

// EVENT LISTENERS ===============================================



window.addEventListener('keydown', e => {
  if (game.state === PLAY) {
    const { UP, UP_CARRY, DOWN, DOWN_CARRY, LEFT_SIDE, LEFT_SIDE_CARRY, RIGHT_SIDE, RIGHT_SIDE_CARRY } = playerAnims;

    if (e.keyCode === 32) {
      isPaused = !isPaused;
      isPaused ? cancelAnimationFrame(RAF) : RAF = requestAnimationFrame(gameLoop);
      console.log(game.debug());

      game.canvas.style.display = 'block';
      removeTextScreen();
      RAF = requestAnimationFrame(gameLoop);
      if (game.state === TITLE) game.state = INIT;
      else if (game.state === GAMEOVER) game.state = RESET;
    }

    // Up upArrow / W / Z
    if (e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87) {
      game.player.movement.up = true;
      game.player.currentAnim = game.player.isHolding ? UP_CARRY : UP;
    }

    // Right (rightArrow / D)
    if (e.keyCode == 39 || e.keyCode == 68) {
      game.player.movement.right = true;
      game.player.currentAnim = game.player.isHolding ? RIGHT_SIDE_CARRY : RIGHT_SIDE;
    }

    // Down (downArrow / S)
    if (e.keyCode == 40 || e.keyCode == 83) {
      game.player.movement.down = true;
      game.player.currentAnim = game.player.isHolding ? DOWN_CARRY : DOWN;
    }

    // Left (leftArrow / A / Q)
    if (e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 81) {
      game.player.movement.left = true;
      game.player.currentAnim = game.player.isHolding ? LEFT_SIDE_CARRY : LEFT_SIDE;
    }
  } else {
    if (e.keyCode === 32) {
      game.canvas.style.display = 'block';
      removeTextScreen();
      RAF = requestAnimationFrame(gameLoop);
      if (game.state === TITLE) game.state = INIT;
      else if (game.state === GAMEOVER) game.state = RESET;
    }
  }
});

window.addEventListener('keyup', e => {
  // Up upArrow / W / Z
  if (e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87) {
    game.player.movement.up = false;
  }

  // Right (rightArrow / D)
  if (e.keyCode == 39 || e.keyCode == 68) {
    game.player.movement.right = false;
  }

  // Down (downArrow / S)
  if (e.keyCode == 40 || e.keyCode == 83) {
    game.player.movement.down = false;
  }

  // Left (leftArrow / A / Q)
  if (e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 81) {
    game.player.movement.left = false;
  }

});

window.addEventListener('load', () => {
  buildBackground();

  game.resize();
  bgResize();

  window.addEventListener('resize', () => {
    game.resize();
    bgResize();
  }, false);

}, false)

tilesheet.addEventListener('load', () => {
  // START =========================================================
  RAF = requestAnimationFrame(gameLoop);
}, false);

// })()