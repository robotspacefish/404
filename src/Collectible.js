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
    Collectible.createDonut, Collectible.createPizza, Collectible.createCookie, Collectible.createTaco
  ]

  static createDonut(x, y) {
    return new Collectible(131, 19, 10, 10, x, y, 10, 10);
  }

  // static createPizza(x, y) {
  //   return new Collectible(147, 19, 10, 10, x, y, 10, 10);
  // }

  // static createCookie(x, y) {
  //   return new Collectible(163, 19, 10, 10, x, y, 10, 10);
  // }

  static createTaco(x, y) {
    return new Collectible(179, 19, 10, 7, x, y, 10, 7);
  }
}