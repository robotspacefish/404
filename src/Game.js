import Player from './Player.js';
import Food from './Food.js';
import GameObject from './GameObject.js';
import GameMap from './GameMap.js';
import Enemy from './Enemy.js';
import { playerAnims } from './animations.js';

const gameDiv = document.getElementById('game');
Food.spawn();

export default class Game {
  constructor(canvas) {
    this.player = new Player(0, 0, 16, 16, 0, 0, 16, 16, 'player', playerAnims.DOWN);
    // this.mode;
    // this.bgSprites = [];
    this.gameMap = new GameMap(16);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.scale = 1;
  }

  resize() {
    this.ctx.imageSmoothingEnabled = false; // remove blurring from resizing
    const canvasWidth = this.canvasWidth, canvasHeight = this.canvasHeight;
    const windowWidth = window.innerWidth;
    // const windowHeight = window.innerHeight;

    this.scale = Math.min(Math.floor(windowWidth / canvasWidth), 3);

    this.canvas.width = canvasWidth * (this.scale || 1);
    this.canvas.height = canvasHeight * (this.scale || 1);

    gameDiv.style.width = `${canvas.width}px`;
    gameDiv.style.height = `${canvas.height}px`;
  }

  get canvasHeight() {
    return this.canvas.height;
  }

  get canvasWidth() {
    return this.canvas.width;
  }

  get tileSize() {
    return 16;
  }

  update() {
    this.player.update(this.canvasHeight, this.canvasWidth);
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

  draw(tilesheet) {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    // this.ctx.imageSmoothingEnabled = false; // remove blurring from resizing
    this.gameMap.draw(this.ctx, this.scale, tilesheet);
    // ctx.shadowColor = "rgba(100, 100, 100, 1)";
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 5;
    // ctx.shadowBlur = 3;
    GameObject.all.forEach(obj => obj.draw(this.ctx, this.scale, tilesheet))
  }
}