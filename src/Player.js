import { ctx } from './canvas.js';

export default class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.acceleration = 0.2;
    this.itemHeld;
    this.width = width;
    this.height = height;
    this.movement = {
      up: false,
      down: false,
      left: false,
      right: false
    }
  }

  pickup(item) { }

  drop() {
    // if this.itemHeld, drop at player x,y
  }

  give(recipient) {

  }

  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  update() {
    if (this.movement.right && !this.movement.left) this.vx += this.acceleration;
    if (this.movement.left && !this.movement.right) this.vx -= this.acceleration;
    if (!this.movement.left && !this.movement.right) this.vx = 0;

    if (this.movement.down && !this.movement.up) this.vy += this.acceleration;
    if (this.movement.up && !this.movement.down) this.vy -= this.acceleration;

    if (!this.movement.up && !this.movement.down) this.vy = 0;

    // move
    this.x += this.vx;
    this.y += this.vy
  }

}