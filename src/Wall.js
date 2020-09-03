import GameObject from './GameObject.js';

export default class Wall extends GameObject {
  static all = [];

  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type = 'wall') {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type);

    Wall.all.push(this);
  }
}