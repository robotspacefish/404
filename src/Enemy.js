import GameObject from './GameObject.js';
import EnemySpawn from './EnemySpawn.js';
import { mapCodes, gameMap } from './map.js';
import { enemy1Anims, enemy2Anims } from './animations.js';

const { ENEMY_TYPE_1, ENEMY_TYPE_2, ENEMY_SPAWN, WALL, FLOOR } = mapCodes;
const UP = 1, DOWN = 2, LEFT = 3, RIGHT = 4, NONE = 0;
const DIRECTIONS = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0]
];

export default class Enemy extends GameObject {
  static all = [];

  constructor(srcX, srcY, srcW, srcH, x, y, w, h, type = 'enemy', currentAnim) {
    super(srcX, srcY, srcW, srcH, x, y, w, h, type, currentAnim);
    this.speed = 1;
    this.vx = 0;
    this.vy = this.speed;

    this.validDirections = [];
    this.direction = NONE;
    this.hunt = Math.random() >= 0.45 ? true : false;

    this.want;

    Enemy.all.push(this);

  }

  static spawn(x = 0, y = 0) {
    let v;
    if (Math.random() >= 0.5) {
      v = {
        want: 'taco',
        anims: enemy1Anims
      }
    } else {
      v = {
        want: 'donut',
        anims: enemy2Anims
      }
    }
    const spawnPointIndex = Math.floor(Math.random() * EnemySpawn.all.length);
    const spawnPoint = EnemySpawn.all[spawnPointIndex];

    const enemy = new Enemy(v.anims.DOWN.srcX, v.anims.DOWN.srcY, 16, 16, spawnPoint.x, spawnPoint.y, 16, 16, 'enemy');
    enemy.want = v.want;
    enemy.anims = v.anims;
    enemy.currentAnim = v.anims.DOWN;
  }

  findClosestDirection(player) {
    let closestDirection;

    const vx = player.centerX - this.centerX;
    const vy = player.centerY - this.centerY;

    // if distance is greater on X axis
    if (Math.abs(vx) >= Math.abs(vy)) closestDirection = vx <= 0 ? LEFT : RIGHT;
    else closestDirection = vy <= 0 ? UP : DOWN;

    // find out if closestDirection is one of the validDirections
    if (this.validDirections.includes(closestDirection)) this.direction = closestDirection;
  }

  changeDirection(player) {
    // clear previous direction
    this.validDirections = [];
    this.direction = NONE;

    const enemyColumn = Math.floor(this.x / 16);
    const enemyRow = Math.floor(this.y / 16);

    // find contents of surrounding cells
    if (enemyRow > 0) {
      const thingAbove = gameMap[enemyRow - 1][enemyColumn];

      if (thingAbove === FLOOR) this.validDirections.push(UP);
    }

    if (enemyRow < mapHeight - 1) {
      const thingBelow = gameMap[enemyRow + 1][enemyColumn];

      if (thingBelow === FLOOR) this.validDirections.push(DOWN)
    }

    if (enemyColumn > 0) {
      const thingToTheLeft = gameMap[enemyRow][enemyColumn - 1];
      if (thingToTheLeft === FLOOR) this.validDirections.push(LEFT);
    }

    if (enemyColumn < mapWidth - 1) {
      const thingToTheRight = gameMap[enemyRow][enemyColumn + 1];
      if (thingToTheRight === FLOOR) this.validDirections.push(RIGHT);
    }

    if (this.validDirections.length !== 0) {
      // find out if enemy is at intersection
      const upOrDownPassage = this.validDirections.includes(UP) ||
        this.validDirections.includes(DOWN);

      const leftOrRightPassage = this.validDirections.includes(LEFT) || this.validDirections.includes(RIGHT);

      // change direction if it's at intersection or dead-end
      if (upOrDownPassage && leftOrRightPassage || this.validDirections.length === 1) {

        // find closest distance to player
        if (player && this.hunt) this.findClosestDirection(player);


        // assign random direction
        if (this.direction === NONE) {
          const randNum = Math.floor(Math.random() * this.validDirections.length);
          this.direction = this.validDirections[randNum];
        }

        this.vx = this.speed * DIRECTIONS[this.direction - 1][0];
        this.vy = this.speed * DIRECTIONS[this.direction - 1][1];
      }
    }
  }

  kill(index) {
    Enemy.all.splice(index, 1);
    GameObject.remove(this);
  }

  isAtTileCorner() {
    return Math.floor(this.x) % 16 === 0 && Math.floor(this.y) % 16 === 0;
  }

  update(player) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.isAtTileCorner()) this.changeDirection(player);
    this.animate();
  }

}