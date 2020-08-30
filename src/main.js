import Game from './Game.js';
import Player from './Player.js';
import { canvas, bgCanvas, WIDTH, HEIGHT } from './canvas.js';
import { gameStates } from './helpers.js';
import { playerAnims, tilesheet } from './animations.js';
import { resize, config } from './config.js';

(function () {
  // GLOBALS =======================================================
  const player = new Player(0, 0, 16, 16, WIDTH() / 2 - 8, HEIGHT() / 2 - 8, 16, 16, 'player', playerAnims.DOWN);
  const game = new Game(player);

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
    canvas.width = config.width;
    canvas.height = config.height;
    bgCanvas.width = config.width;
    bgCanvas.height = config.height;
    // console.log(WIDTH(), HEIGHT())
    // resize();
    // window.addEventListener('resize', () => {
    //   resize();
    //   console.log(WIDTH(), HEIGHT())
    // }, false);
  }, false)

})()