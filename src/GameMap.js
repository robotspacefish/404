import { mapCodes, gameMap } from './map.js';
import EnemySpawn from './EnemySpawn.js';
import Wall from './Wall.js';
import Floor from './Floor.js';
import FoodCourt from './FoodCourt.js';

export default class GameMap {

  constructor(tileSize) {
    this.tileSize = tileSize;
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
            cell = new Floor();
            cell.srcX = 304;
            cell.srcY = 16;
            break;
          case WALL:
            cell = new Wall();
            break;
          case TACO_COURT:
            cell = new FoodCourt();
            cell.srcX = 304;
            cell.srcY = 0;
            cell.type = "taco"
            break
          case DONUT_COURT:
            cell = new FoodCourt();
            cell.srcX = 288;
            cell.srcY = 0;
            cell.type = "donut";
            break;
          case ENEMY_SPAWN:
            cell = new EnemySpawn();
            cell.srcX = 256;
            cell.srcY = 16;
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

  draw(ctx, tilesheet) {
    let ts = this.tileSize;
    this.cells.forEach(cell => {
      if (cell.type !== 'wall') {
        ctx.drawImage(
          tilesheet, cell.srcX, cell.srcY, ts, ts,
          cell.x, cell.y, ts, ts
        );
      }
    })
  }
}