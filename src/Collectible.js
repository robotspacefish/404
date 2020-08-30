import GameObject from './GameObject.js';

export default class Collectible extends GameObject {
  static all = [];

  static createRandomFood(x, y) {
    // TODO set random x, y that's not somewhere another object currently is located
    const randIndex = Math.floor(Math.random() * Collectible.types.length);
    Collectible.types[randIndex](x, y);
  }

  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type = 'collectible', currentAnim = null) {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim);
    this.isCarried = false;

    Collectible.all.push(this);
    console.log(Collectible.all)
  }

  static types = [
    Collectible.createDonut, Collectible.createTaco
  ]

  static createDonut(x, y) {
    return new Collectible(259, 0, 10, 10, x, y, 10, 10);
  }

  static createTaco(x, y) {
    return new Collectible(275, 0, 10, 7, x, y, 10, 7);
  }
}