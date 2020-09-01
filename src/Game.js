import Player from './Player.js';
import Food from './Food.js';
import GameObject from './GameObject.js';
import GameMap from './GameMap.js';
import { ctx, bgCtx, WIDTH, HEIGHT } from './canvas.js';
import Enemy from './Enemy.js';
import { gameMap, mapCodes } from './map.js';
import { SPRITE_SCALE, tilesheet, playerAnims } from './animations.js';

Food.spawn()

export default class Game {
  constructor() {
    this.player = new Player(0, 0, 16, 16, 0, 0, 16, 16, 'player', playerAnims.DOWN);
    this.mode;
    this.bgSprites = [];
    this.gameMap = new GameMap(16);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.scale = 1;
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