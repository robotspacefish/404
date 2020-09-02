import GameObject from './GameObject.js';

export default class Food extends GameObject {
  static all = [];

  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type = 'food', currentAnim = null) {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim);
    this.isCarried = false;

    Food.all.push(this);
  }

  static spawn() {
    // TODO handle conditions for spawning
    // const randIndex = Math.floor(Math.random() * Food.types.length);
    // Food.types[randIndex](x, y);
    Food.createTaco();
    Food.createDonut();
  }

  static types = [
    Food.createDonut, Food.createTaco
  ]

  static createDonut() {
    return new Food(259, 6, 10, 10, 115, 134, 10, 10);
  }

  static createTaco() {
    return new Food(275, 8, 10, 7, 99, 136, 10, 7);
  }


}