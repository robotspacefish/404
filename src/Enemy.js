import GameObject from './GameObject.js';
import { mapCodes } from './map.js';

const { ENEMY_TYPE_1, ENEMY_TYPE_2, WALL } = mapCodes;

export default class Enemy extends GameObject {
  static all = [];

  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim) {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim);
    this.speed = 2;
    this.vx = 0;
    this.vy = this.speed;

    this.want;

    Enemy.all.push(this);
  }

  static type1() {
    const anims = {
      DOWN: {
        srcX: 0,
        srcY: 16,
      },
      UP: {
        srcX: 32,
        srcY: 16,
      },
      RIGHT_SIDE: {
        srcX: 64,
        srcY: 16,
      },
      LEFT_SIDE: {
        srcX: 96,
        srcY: 16,
      }
    };
    return {
      srcX: 0,
      srcY: 16,
      want: 'taco',
      anims
    }
  }

  static type2() {
    const anims = {
      DOWN: {
        srcX: 128,
        srcY: null,
      },
      UP: {
        srcX: 160,
        srcY: null,
      },
      RIGHT_SIDE: {
        srcX: 192,
        srcY: null,
      },
      LEFT_SIDE: {
        srcX: 224,
        srcY: null,
      }
    };

    return {
      srcX: 128,
      srcY: 16,
      want: 'donut',
      anims
    }
  }

  static spawn(x = 0, y = 0) {
    const t = Math.random() > 0.5 ? Enemy.type1() : Enemy.type2();

    const enemy = new Enemy(t.srcX, t.srcY, 16, 16, x, y, 16, 16, 'enemy', t.anims.DOWN);
    enemy.want = t.want;
  }

  changeDirection() {
    const UP = 1, DOWN = 2, LEFT = 3, RIGHT = 4;
    const direction = Math.ceil(Math.random() * 7);

    if (direction < 5) {
      switch (direction) {
        case RIGHT:
          this.vx = this.speed;
          this.vy = 0;
          break;
        case LEFT:
          this.vx = -this.speed;
          this.vy = 0;
          break;
        case UP:
          this.vx = 0;
          this.vy = -this.speed;
          break;
        case DOWN:
          this.vx = 0;
          this.vy = this.speed;
      }
    }
  }

  update(width, height) {
    this.x += this.vx;
    this.y += this.vy;

    if (Math.floor(this.x) % 16 === 0 && Math.floor(this.y) % 16 === 0) {
      // if it's at a corner, change it's direction
      console.log('corner')
      this.changeDirection();
    }

    if (this.x < 0) {
      this.x = 0;
      this.changeDirection();
    }

    if (this.y < 0) {
      this.y = 0;
      this.changeDirection();
    }

    if (this.x + this.w > width) {
      this.x = width - this.w;
      this.changeDirection();
    }

    if (this.y + this.h > height) {
      this.y = height - this.h;
      this.changeDirection();
    }
  }

}