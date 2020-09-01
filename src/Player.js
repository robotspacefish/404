import GameObject from './GameObject.js';

export default class Player extends GameObject {
  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim) {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim);
    this.vx = 0;
    this.vy = 0;

    this.acceleration = 2;

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

  update(height, width) {
    // if (debug) {
    //   debug = false;
    //   console.log('static:', this)
    // }
    // if (this.movement.right && !this.movement.left) this.vx += this.acceleration;
    // if (this.movement.left && !this.movement.right) this.vx -= this.acceleration;
    // if (this.movement.down && !this.movement.up) {
    //   debugger
    //   this.vy += this.acceleration;
    // }
    // if (this.movement.up && !this.movement.down) this.vy -= this.acceleration;
    if (this.movement.right && !this.movement.left) {
      console.log('right:', this)
      this.vx = this.acceleration;
    }
    else if (this.movement.left && !this.movement.right) {
      console.log('left:', this)
      this.vx = -this.acceleration;
    }
    else if (this.movement.down && !this.movement.up) {
      console.log('down:', this)
      this.vy = this.acceleration;
    }
    else if (this.movement.up && !this.movement.down) {
      console.log('up:', this)
      this.vy = -this.acceleration;
    }

    if (!this.movement.up && !this.movement.down) this.vy = 0;
    if (!this.movement.left && !this.movement.right) this.vx = 0;

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.x = 0;
      this.movement.left = false;
      this.movement.right = false;
    };
    if (this.y < 0) {
      this.y = 0;
      this.movement.up = false;
    };

    if (this.x + this.w > width) {
      console.log('go back left', 'width:', width, "player x:", this.x)
      // debugger
      this._x = width - this.w;
      this.movement.right = false;
    };
    if (this.y + this.h > height) {
      // debugger
      this.y = height - this.h;
      this.movement.down = false;
    };

    // move
    // this.x = Math.max(0, Math.min(this.x + this.vx, WIDTH() - this.w));
    // this.y = Math.max(0, Math.min(this.y + this.vy, HEIGHT() - this.h));

    this.animate();
  }

}