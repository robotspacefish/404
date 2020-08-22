import Enemy from './Enemy.js';
import { ctx, WIDTH, HEIGHT } from './canvas.js';
import { gameStates, mapCodes } from './helpers.js';

export default class Game {
  constructor(h, w, player) {
    this.w = w;
    this.h = h;
    this.player = player;
    this.mode;
  }

  update() {
    this.player.update();
  }

  draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.imageSmoothingEnabled = false; // remove blurring from resizing
    this.player.draw();
  }
}