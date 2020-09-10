import GameObject from './GameObject.js';

export default class Player extends GameObject {
  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim) {
    super(srcX, srcY = 0, srcW, srcH, x, y, w, h, type, currentAnim);
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



  isCollidedWithFood(food) {
    return food.x - 10 <= this.x && food.x + food.w + 10 >= this.x + this.w &&
      this.y > food.y &&
      this.y + this.h <= food.y + food.h + 17;
  }

  update(height, width) {
    if (this.movement.right && !this.movement.left) {
      this.vx = this.acceleration;
    }
    else if (this.movement.left && !this.movement.right) {
      this.vx = -this.acceleration;
    }
    else if (this.movement.down && !this.movement.up) {
      this.vy = this.acceleration;
    }
    else if (this.movement.up && !this.movement.down) {
      this.vy = -this.acceleration;
    }

    if (!this.movement.up && !this.movement.down) this.vy = 0;
    if (!this.movement.left && !this.movement.right) this.vx = 0;

    // move
    this.x = Math.max(0, Math.min(this.x + this.vx, width - this.w));
    this.y = Math.max(0, Math.min(this.y + this.vy, height - this.h));

    this.animate();
  }

}