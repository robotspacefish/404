import GameObject from './GameObject.js';

export default class EnemySpawn extends GameObject {
  static all = [];

  constructor(srcX, srcY, srcW = 16, srcH = 16, x, y, w = 16, h = 16, type = 'enemySpawn') {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type);
    this.isOccupied = false;
    EnemySpawn.all.push(this);
  }

}