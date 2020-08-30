import GameObject from './GameObject.js';
// import { WIDTH, HEIGHT } from './canvas.js';

export default class Player extends GameObject {
  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim) {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim);
    this.vx = 0;
    this.vy = 0;

    this.acceleration = 0.2;

    this.itemHeld;

    this.movement = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    this.isHolding = false;
  }

  animate() {
    this.tick++;

    if (this.tick === this.currentAnim.tickCap) {
      if (this.currentFrame === this.currentAnim.numOfFrames - 1) {
        this.currentFrame = 0; // reset
      } else {
        this.currentFrame++;
      }
      this.srcX = this.currentFrame * 16 + this.currentAnim.srcX;
      this.tick = 0;
    }
  }

  pickup(item) { }

  drop() {
    // if this.itemHeld, drop at player x,y
  }

  give(recipient) {

  }

  update() {
    if (this.movement.right && !this.movement.left) this.vx += this.acceleration;
    if (this.movement.left && !this.movement.right) this.vx -= this.acceleration;

    if (this.movement.down && !this.movement.up) this.vy += this.acceleration;
    if (this.movement.up && !this.movement.down) this.vy -= this.acceleration;

    if (!this.movement.left && !this.movement.right) this.vx = 0;
    if (!this.movement.up && !this.movement.down) this.vy = 0;

    // move
    // this.x = Math.max(0, Math.min(this.x + this.vx, WIDTH - this.w));
    // this.y = Math.max(0, Math.min(this.y + this.vy, HEIGHT - this.h));
    this.x += this.vx;
    this.y += this.vy;

    this.animate();
  }

}