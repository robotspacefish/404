import { mapCodes, gameMap } from './map.js';
import GameObject from './GameObject.js';
import Wall from './Wall.js';

export default class GameMap {

  constructor(tileSize) {
    this.tileSize = tileSize;
    this.isDrawn = false;
    this.cells = [];
    this.build();
  }

  build() {
    const { FLOOR, WALL, TACO_COURT, DONUT_COURT, ENEMY_SPAWN } = mapCodes;
    let ts = this.tileSize, cell;
    for (let row = 0; row < gameMap[0].length; row++) {
      for (let col = 0; col < gameMap.length; col++) {
        switch (gameMap[col][row]) {
          case FLOOR:
            cell = new GameObject();
            cell.srcX = 304;
            cell.srcY = 16;
            break;
          case WALL:
            cell = new Wall();
            cell.srcX = 288;
            cell.srcY = 16;
            break;
          case TACO_COURT:
            cell = new GameObject();
            cell.srcX = 304;
            cell.srcY = 0;
            break
          case DONUT_COURT:
            cell = new GameObject();
            cell.srcX = 288;
            cell.srcY = 0;
            break;
          case ENEMY_SPAWN:
            cell = new GameObject();
            cell.srcX = 256;
            cell.srcY = 16;
            break;
        }

        cell.x = row * ts;
        cell.y = col * ts;
        this.cells.push(cell);
      }
    }
  }



  get floor() {
    return {
      srcX: 304,
      srcY: 16
    }
  }

  get wall() {
    return {
      srcX: 288,
      srcY: 16
    }
  }
  get enemySpawn() {
    return {
      srcX: 256,
      srcY: 16
    }
  }

  get tacoCourt() {
    return {
      srcX: 304,
      srcY: 0
    }
  }

  get donutCourt() {
    return {
      srcX: 288,
      srcY: 0
    }
  }

  init() {
    this.draw();
  }

  draw(ctx, scale, tilesheet) {
    // if (!this.isDrawn) {
    // console.log('drawing')
    const { FLOOR, WALL, TACO_COURT, DONUT_COURT, ENEMY_SPAWN } = mapCodes;
    let ts = this.tileSize, cell;
    for (let row = 0; row < gameMap[0].length; row++) {
      for (let col = 0; col < gameMap.length; col++) {
        switch (gameMap[col][row]) {
          case FLOOR:
            cell = this.floor;
            break;
          case WALL:
            cell = this.wall;
            break;
          case TACO_COURT:
            cell = this.tacoCourt;
            break
          case DONUT_COURT:
            cell = this.donutCourt;
            break;
          case ENEMY_SPAWN:
            cell = this.enemySpawn;
            break;
        }
        ctx.drawImage(
          tilesheet, cell.srcX, cell.srcY, ts, ts,
          row * ts * scale,
          col * ts * scale,
          ts * scale,
          ts * scale
        );
      }
    }

    // this.isDrawn = true;
    // }
  }
}