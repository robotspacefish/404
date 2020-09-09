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
    this.currentFrame = 0;
    this.type = type;
    this.currentAnim = currentAnim;

    GameObject.all.push(this);
  }

  static remove(objToDelete) {
    GameObject.all = GameObject.all.filter(gameObj => {
      return JSON.stringify(gameObj) !== JSON.stringify(objToDelete);
    });
  }

  get centerX() {
    return this.x + this.w / 2;
  }

  get centerY() {
    return this.y + this.w / 2;
  }

  animate() {
    // if (!this.isAnimPlaying) {

    // }
    // if (this.type === 'enemy') debugger
    this.tick++;
    const numOfFrames = 2;

    if (this.tick === TICKCAP) {
      if (this.currentFrame === numOfFrames - 1) {
        this.currentFrame = 0; // reset
      } else {
        this.currentFrame++;
      }
      this.srcX = this.currentFrame * 16 + this.currentAnim.srcX;
      this.tick = 0;
    }
  }

  isCollidedAtCenter(obj) {
    return Math.abs(this.centerX - obj.centerX) < this.w / 2 + obj.w / 2 &&
      Math.abs(this.centerY - obj.centerY) < this.h / 2 + obj.h / 2;
  }

  handleRectangleCollision(obj) {
    let hit = false;
    let vx = this.centerX - obj.centerX,
      vy = this.centerY - obj.centerY,
      combinedHalfWidths = this.w / 2 + obj.w / 2,
      combinedHalfHeights = this.h / 2 + obj.h / 2,
      collision, overlapX, overlapY;

    // if squares overlap on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      // if squares overlap on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        // squares overlap on both axes, so there's a collision
        // the collision is occuring on the axis with the SMALLEST amount of overlap
        overlapX = combinedHalfWidths - Math.abs(vx);
        overlapY = combinedHalfHeights - Math.abs(vy);

        if (overlapX >= overlapY) {
          // collision on X axis

          if (vy > 0) {
            collision = "top";

            // move obj out of the collision
            this.y += overlapY;
          } else {
            collision = "bottom";
            this.y -= overlapY;
          }
        } else {
          if (vx > 0) {
            collision = "left";
            this.x += overlapX;
          } else {
            collision = "right";
            this.x -= overlapX;
          }
        }
      }
    }
  }

  draw(ctx, scale, tilesheet) {
    ctx.drawImage(
      tilesheet, this.srcX, this.srcY, this.srcW, this.srcH,
      this.x * scale,
      this.y * scale,
      this.w * scale,
      this.h * scale
    )
  }

}