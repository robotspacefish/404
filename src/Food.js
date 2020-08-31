import GameObject from './GameObject.js';

export default class Food extends GameObject {
  static all = [];

  static createRandomFood(x, y) {
    // TODO set random x, y that's not somewhere another object currently is located
    const randIndex = Math.floor(Math.random() * Food.types.length);
    Food.types[randIndex](x, y);
  }

  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type = 'Food', currentAnim = null) {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim);
    this.isCarried = false;

    Food.all.push(this);
    // console.log(Food.all)
  }

  static types = [
    Food.createDonut, Food.createTaco
  ]

  static createDonut(x, y) {
    return new Food(259, 3, 10, 10, x, y, 10, 10);
  }

  static createTaco(x, y) {
    return new Food(275, 4, 10, 7, x, y, 10, 7);
  }
}