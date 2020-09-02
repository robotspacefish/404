import GameObject from './GameObject.js';

export default class Wall extends GameObject {
  static all = [];

  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type = 'wall', currentAnim = null) {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim);

    Wall.all.push(this);
  }
}