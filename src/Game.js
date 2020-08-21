import Enemy from './Enemy.js';
import { ctx } from './canvas.js';

export default class Game {
  constructor(width, height, player) {
    this.width = width;
    this.height = height;
    this.player = player;
    this.mode;
    this.enemies = [
      new Enemy(0, 0, 5, 5),
      new Enemy(10, 0, 5, 5),
      new Enemy(20, 0, 5, 5),
      new Enemy(50, 0, 5, 5)
    ]
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.player.draw();

    // this.enemies.forEach(e => e.draw());
  }

  update() {
    this.player.update();

    // this.enemies.forEach(e => e.update());
  }
}