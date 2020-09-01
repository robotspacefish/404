export default class GameObject {
  static all = [];
  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim = null) {
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this._x = x;
    this._y = y;
    this._w = w;
    this._h = h;
    this.tick = 0;
    this.currentFrame = 0;
    this.type = type;
    this.currentAnim = currentAnim;

    GameObject.all.push(this);
  }

  get w() {
    return this._w * config.scale;
  }

  get h() {
    return this._h * config.scale;
  }

  get x() {
    return this._x * config.scale;
  }

  get y() {
    return this._y * config.scale;
  }

  set x(pos) {
    this._x = pos;
  }

  set y(pos) {
    this._y = pos;
  }


  get centerX() {
    return this.x + this.w / 2;
  }

  get centerY() {
    return this.y + this.w / 2;
  }

  isCollided(obj) {
    return Math.abs(this.centerX - obj.centerX) < this.w / 2 + obj.w / 2 &&
      Math.abs(this.centerY - obj.centerY) < this.h / 2 + obj.h / 2;
  }

  /**
   * TODO
   * collisions
   * boundaries
   * removals
   * draw/render
   * update
   */

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