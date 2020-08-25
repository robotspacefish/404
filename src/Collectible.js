import GameObject from './GameObject.js';

export default class Collectible extends GameObject {
  static all = [];

  static createRandomFood(srcX, srcY) {
    // TODO set random x, y that's not somewhere another object currently is located
    const donut = Collectible.createDonut(150, 150);
    const pizza = Collectible.createPizza(300, 300);
    const cookie = Collectible.createCookie(600, 350);
    const taco = Collectible.createTaco(100, 400);
  }

  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim = null) {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim);


    Collectible.all.push(this);
    console.log(Collectible.all)
  }

  static createDonut(x, y) {
    return new Collectible(131, 19, 10, 10, x, y, 10, 10, 'donut');
  }

  static createPizza(x, y) {
    return new Collectible(147, 19, 10, 10, x, y, 10, 10, 'pizza');
  }

  static createCookie(x, y) {
    return new Collectible(163, 19, 10, 10, x, y, 10, 10, 'cookie');
  }

  static createTaco(x, y) {
    return new Collectible(179, 19, 10, 7, x, y, 10, 7, 'taco');
  }


}