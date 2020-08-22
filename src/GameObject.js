import { tilesheet, SPRITE_SCALE } from './animations.js';
import { ctx } from "./canvas.js";

export default class GameObject {
  static all = [];
  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim = null) {
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tick = 0;
    this.currentFrame = 0;
    this.type = type;
    this.currentAnim = currentAnim;

    GameObject.all.push(this);
  }

  /**
   * TODO
   * collisions
   * boundaries
   * removals
   * draw/render
   * update
   */

  draw() {
    ctx.drawImage(
      tilesheet, this.srcX, this.srcY, this.srcW,
      this.srcH, this.x, this.y, this.w * SPRITE_SCALE, this.h * SPRITE_SCALE
    )


  }

}