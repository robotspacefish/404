export default class Enemy {
  constructor(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.want;

    const colors = ['red', 'green', 'purple', 'yellow'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(pX, pY) {
    // TODO move in the direction of the player
    // for now, do this
    this.y += 1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}