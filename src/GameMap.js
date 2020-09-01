import { tilesheet, SPRITE_SCALE } from './animations.js';
import { mapCodes, gameMap } from './map.js';
import { bgCtx } from "./canvas.js";
import { config } from '/config.js';

export default class GameMap {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.isDrawn = false;
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

  draw() {
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
        bgCtx.drawImage(
          tilesheet, cell.srcX, cell.srcY, ts, ts,
          row * ts * config.scale,
          col * ts * config.scale,
          ts * config.scale,
          ts * config.scale
        );
      }
    }

    // this.isDrawn = true;
    // }
  }
}