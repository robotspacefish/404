import Enemy from './Enemy.js';
import GameObject from './GameObject.js';
import Collectible from './Collectible.js';
import { ctx, WIDTH, HEIGHT } from './canvas.js';
import { gameStates, mapCodes } from './helpers.js';

Collectible.createRandomFood();

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
    // ctx.shadowColor = "rgba(100, 100, 100, 1)";
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 5;
    // ctx.shadowBlur = 3;

    GameObject.all.forEach(obj => obj.draw())
  }
}