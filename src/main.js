import Game from './Game.js';

import { canvas, bgCanvas, ctx, bgCtx, WIDTH, HEIGHT } from './canvas.js';
import { gameStates } from './helpers.js';
import { tilesheet } from './animations.js';
import { resize, config } from './config.js';
import { renderMousePos } from './mouse'


// (function () {
// GLOBALS =======================================================
const game = new Game();

function gameLoop() {
  game.update();
  game.draw();

  renderMousePos(); // debug

  requestAnimationFrame(gameLoop, canvas);
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
  game.resize();
  game.ctx.imageSmoothingEnabled = false; // remove blurring from resizing

  window.addEventListener('resize', () => {
    game.resize();
  }, false);
}, false)

tilesheet.addEventListener('load', () => {
  // game.mode == INIT;
  // START =========================================================
  requestAnimationFrame(gameLoop);
}, false);


// })()