import GameObject from './GameObject.js';

export default class FoodCourt extends GameObject {
  static all = [];

  constructor(srcX, srcY, srcW = 16, srcH = 16, x, y, w, h, type) {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type);
    this.isBlocked = false;

    FoodCourt.all.push(this);
  }
}