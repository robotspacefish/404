import Game from './Game.js';
import Player from './Player.js';
import { canvas, WIDTH, HEIGHT } from './canvas.js';
import { gameStates } from './helpers.js';
import { playerAnims, tilesheet } from './animations.js';

(function () {
  // GLOBALS =======================================================
  const player = new Player(0, 0, 16, 16, WIDTH / 2 - 8, HEIGHT / 2 - 8, 16, 16, 'player', playerAnims.DOWN);
  const game = new Game(800, 640, player);

  tilesheet.addEventListener('load', () => {
    // game.mode == INIT;
    // START =========================================================
    requestAnimationFrame(gameLoop);
  }, false);


  function gameLoop() {
    game.update();
    game.draw();
    requestAnimationFrame(gameLoop, canvas);
  }

  // EVENT LISTENERS ===============================================
  window.addEventListener('keydown', e => {
    const { UP, DOWN, LEFT_SIDE, RIGHT_SIDE } = playerAnims;

    switch (e.key) {
      case 'ArrowUp':
        game.player.movement.up = true;
        game.player.currentAnim = UP;
        break;
      case 'ArrowDown':
        game.player.movement.down = true;
        game.player.currentAnim = DOWN;
        break;
      case 'ArrowLeft':
        game.player.movement.left = true;
        game.player.currentAnim = LEFT_SIDE;
        break;
      case 'ArrowRight':
        game.player.movement.right = true;
        game.player.currentAnim = RIGHT_SIDE;
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

})()