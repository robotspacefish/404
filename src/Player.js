export default class Player {
  constructor(x, y, width, height) {
    this.itemHeld;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  pickup(item) { }

  drop() {
    // if this.itemHeld, drop at player x,y
  }

  give(recipient) {

  }

  draw() { }

  update() { }

}