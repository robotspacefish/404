import Enemy from './Enemy.js';
import GameObject from './GameObject.js';
import Food from './Food.js';
import { ctx, bgCtx, WIDTH, HEIGHT } from './canvas.js';
// import { gameStates } from './helpers.js';
import { gameMap, mapCodes } from './map.js';
import { SPRITE_SCALE, tilesheet } from './animations.js';
import GameMap from './GameMap.js';

Food.spawn()

export default class Game {
  constructor(player) {
    this.player = player;
    this.mode;
    this.bgSprites = [];
    this.gameMap = new GameMap(16);
  }

  get tileSize() {
    return 16;
  }

  update() {
    this.player.update();
    Food.all.forEach(c => {
      if (c.isCollided(this.player) && !this.player.isHolding) {
        console.log('collision')
        c.isCarried = true;
        this.player.isHolding = true;
      }

      if (c.isCarried) {
        c.x = this.player.x + this.player.w / 2 - c.w / 2;
        c.y = this.player.y - c.h + 2
      }
    })
  }

  draw() {
    this.gameMap.draw();
    ctx.clearRect(0, 0, WIDTH(), HEIGHT());
    // ctx.shadowColor = "rgba(100, 100, 100, 1)";
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 5;
    // ctx.shadowBlur = 3;
    GameObject.all.forEach(obj => obj.draw())
  }
}