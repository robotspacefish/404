import Game from './Game.js';
import { playerAnims } from './animations.js';

// (function () {
// GLOBALS =======================================================
const tilesheet = new Image();
tilesheet.src = './assets/images/404_spritesheet_compressed.png';
const bgCtx = document.getElementById('bg').getContext('2d');
const game = new Game(document.getElementById('canvas'));
// const config = {
//   width: 224,
//   // width: 288,
//   height: 288,
//   scale: 1
// };

// document.querySelector('body').addEventListener('mousemove', e => { mousemoveHandler(e, game.canvas) }, false);

function gameLoop() {
  game.update();
  game.draw(tilesheet);

  // renderMousePos(game.ctx); // debug

  requestAnimationFrame(gameLoop, canvas);
}

function buildBackground() {
  for (let i = 0; i < window.innerWidth; i += 20) {
    for (let j = 0; j < window.innerHeight; j += 20) {
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
  // bgCtx.canvas.width = window.innerWidth;
  // bgCtx.canvas.height = window.innerHeight;
  bgCtx.imageSmoothingEnabled = false; // remove blurring from resizing
}

// EVENT LISTENERS ===============================================
window.addEventListener('keydown', e => {
  const { UP, UP_CARRY, DOWN, DOWN_CARRY, LEFT_SIDE, LEFT_SIDE_CARRY, RIGHT_SIDE, RIGHT_SIDE_CARRY } = playerAnims;

  switch (e.key) {
    case 'ArrowUp':
      game.player.movement.up = true;
      game.player.currentAnim = game.player.isHolding ? UP_CARRY : UP
      break;
    case 'ArrowDown':
      game.player.movement.down = true;
      game.player.currentAnim = game.player.isHolding ? DOWN_CARRY : DOWN
      break;
      break;
    case 'ArrowLeft':
      game.player.movement.left = true;
      game.player.currentAnim = game.player.isHolding ? LEFT_SIDE_CARRY : LEFT_SIDE
      break;
      break;
    case 'ArrowRight':
      game.player.movement.right = true;
      game.player.currentAnim = game.player.isHolding ? RIGHT_SIDE_CARRY : RIGHT_SIDE
      break;
      break;
  }
});

window.addEventListener('keyup', e => {
  switch (e.key) {
    case 'ArrowUp':
      game.player.movement.up = false;
      break;
    case 'ArrowDown':
      game.player.movement.down = false;
      break;
    case 'ArrowLeft':
      game.player.movement.left = false;
      break;
    case 'ArrowRight':
      game.player.movement.right = false;
      break;
  }
});

window.addEventListener('load', function () {
  buildBackground();

  game.resize();
  bgResize();
  game.ctx.imageSmoothingEnabled = false; // remove blurring from resizing

  window.addEventListener('resize', () => {
    game.resize();
    bgResize();
  }, false);
}, false)

tilesheet.addEventListener('load', () => {
  // game.mode == INIT;
  // START =========================================================
  requestAnimationFrame(gameLoop);
}, false);




// })()