import GameObject from './GameObject.js';

export default class Food extends GameObject {
  static all = [];

  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim = null) {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim);
    this.isCarried = false;

    Food.all.push(this);
  }

  static spawn() {
    Food.createTaco();
    Food.createDonut();
  }

  static types = [
    Food.createDonut, Food.createTaco
  ]

  static createDonut() {
    return new Food(259, 6, 10, 10, 115, 134, 10, 10, 'donut');
  }

  static createTaco() {
    return new Food(275, 8, 10, 7, 67, 136, 10, 7, 'taco');
  }

  static destroy() {
    const index = Food.all.findIndex(f => f.isCarried === true);
    const food = Food.all[index];
    Food.all.splice(index, 1);
    GameObject.remove(food);

    return food;
  }
}