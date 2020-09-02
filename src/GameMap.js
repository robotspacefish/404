import { mapCodes, gameMap } from './map.js';
import GameObject from './GameObject.js';
import EnemySpawn from './EnemySpawn.js';
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
            cell = new EnemySpawn();
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

  init() {
    this.draw();
  }

  draw(ctx, scale, tilesheet) {
    let ts = this.tileSize;
    this.cells.forEach(cell => {
      ctx.drawImage(
        tilesheet, cell.srcX, cell.srcY, ts, ts,
        cell.x, cell.y, ts, ts
      );
    })


  }
}