import GameObject from './GameObject.js';

export default class Wall extends GameObject {
  static all = [];

  constructor(x, y, w, h, type = 'wall') {
    super(x, y, w, h, type);

    Wall.all.push(this);
  }
}