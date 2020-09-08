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

  isCollidedAtCenter(obj) {
    return Math.abs(this.centerX - obj.centerX) < this.w / 2 + obj.w / 2 &&
      Math.abs(this.centerY - obj.centerY) < this.h / 2 + obj.h / 2;
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