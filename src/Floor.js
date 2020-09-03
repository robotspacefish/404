import GameObject from './GameObject.js';

export default class Floor extends GameObject {
  static all = [];

  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type = 'floor') {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type);

    Floor.all.push(this);
  }
}