const NUM_OF_FRAMES = 2;

const TICK_CAP = 12;

export default class GameObject {
  static all = [];
  constructor(srcX, srcY, srcW, srcH, x, y, w = 16, h = 16, type, currentAnim = null) {
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tick = 0;
    this.type = type;
    this.currentAnim = currentAnim;
    this.currentFrame = 0;
    this.fps = 12;
    GameObject.all.push(this);
  }

  get frameRate() {
    return 1000 / this.fps;
  }

  advanceFrame() {
    if (this.currentFrame < NUM_OF_FRAMES - 1) {
      this.currentFrame++;
    } else {
      this.currentFrame = 0;
    }

    this.srcX = this.currentFrame * 16 + this.currentAnim.srcX;
  }

  animate() {
    this.tick++;
    if (this.tick === TICK_CAP) {
      this.advanceFrame();
      this.tick = 0;
    }
  }

  static remove(objToDelete) {
    GameObject.all = GameObject.all.filter(gameObj => {
      return JSON.stringify(gameObj) !== JSON.stringify(objToDelete);
    });
  }

  static clearAllExceptPlayer() {
    GameObject.all = [GameObject.all.find(o => o.type === 'player')]
    console.log(GameObject.all)
  }

  get centerX() {
    return this.x + this.w / 2;
  }

  get centerY() {
    return this.y + this.w / 2;
  }

  isCollidedAtCenter(obj) {
    return Math.abs(this.centerX - obj.centerX) < this.w / 2 + obj.w / 2 &&
      Math.abs(this.centerY - obj.centerY) < this.h / 2 + obj.h / 2;
  }

  handleRectangleCollision(obj) {
    let hit = false;
    let vx = this.centerX - obj.centerX,
      vy = this.centerY - obj.centerY,
      overlapX, overlapY;

    // subtract 1 from each to give a little leeway with collision
    let combinedHalfWidths = (this.w / 2) - 1 + obj.w / 2,
      combinedHalfHeights = (this.h / 2) - 1 + obj.h / 2;

    // if squares overlap on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      // if squares overlap on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        hit = true;
        // squares overlap on both axes, so there's a collision
        // the collision is occuring on the axis with the SMALLEST amount of overlap
        overlapX = combinedHalfWidths - Math.abs(vx);
        overlapY = combinedHalfHeights - Math.abs(vy);

        if (overlapX >= overlapY) {
          // collision on X axis
          if (vy > 0) this.y += overlapY;
          else this.y -= overlapY;
        } else {
          // collision on Y axis
          if (vx > 0) this.x += overlapX;
          else this.x -= overlapX;
        }
      }
    }

    return hit;
  }

  draw(ctx, tilesheet) {
    ctx.drawImage(
      tilesheet, this.srcX, this.srcY, this.srcW, this.srcH,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

}