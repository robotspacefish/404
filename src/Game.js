import Player from './Player.js';
import Food from './Food.js';
import Wall from './Wall.js';
import GameObject from './GameObject.js';
import GameMap from './GameMap.js';
import Enemy from './Enemy.js';
import { playerAnims } from './animations.js';
import { mapCodes, objectMap } from './map.js';

const gameDiv = document.getElementById('game');

export default class Game {
  constructor(canvas) {
    this.player = new Player(0, 0, 16, 16, null, null, 16, 16, 'player', playerAnims.DOWN);
    this.spawnPlayer();

    // this.mode;
    // this.bgSprites = [];
    this.gameMap = new GameMap(16);

    this.maxEnemies = 4;

    this.intervalId = setInterval(() => {
      if (Enemy.all.length < this.maxEnemies) Enemy.spawn()
    }, 1000);

    Food.spawn();

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.scale = 1;

    // logical
    this.width = 224;
    this.height = 288;
    this.maxWidth = 224 * 3;
    this.maxHeight = 228 * 3;
  }

  spawnPlayer() {
    for (let row = 0; row < objectMap[0].length; row++) {
      for (let col = 0; col < objectMap.length; col++) {
        if (objectMap[col][row] === mapCodes.PLAYER) {
          this.player.x = row * 16;
          this.player.y = col * 16;
        }
      }
    }
  }

  resize() {
    // debugger
    let windowWidth = window.innerHeight,
      windowHeight = window.innerWidth,
      canvasWidth, canvasHeight;

    // how many times the native resolution can be scaled up evenly, or max 3 times
    const scale = Math.min(Math.floor(windowWidth / this.width), 3),
      scaledWidth = this.width * (scale || 1),
      scaledHeight = this.height * (scale || 1);

    // const windowRatio = windowWidth / windowHeight;
    // const gameWindowRatio = this.height / this.width;

    // if (gameWindowRatio < windowRatio) {
    //   const width = Math.floor(windowHeight * gameWindowRatio);
    //   canvasWidth = `${width > scaledWidth ? scaledWidth : width}px`;
    //   canvasHeight = `${width > scaledWidth ? scaledHeight : windowHeight}px`;
    // } else {
    //   const height = Math.floor(windowWidth / gameWindowRatio);
    //   canvasWidth = `${height > scaledHeight ? scaledHeight : windowWidth}px`;
    //   canvasHeight = `${height > scaledHeight ? scaledHeight : height}px`;
    // }

    this.canvas.style.width = `${scaledWidth}px`;
    this.canvas.style.height = `${scaledHeight}px`;
    gameDiv.style.width = `${scaledWidth}px`;
    gameDiv.style.height = `${scaledHeight}px`;

    // const ratio = Math.floor(this.height / this.width);


    // canvasHeight < canvasWidth / ratio ?
    //   canvasWidth = Math.floor(canvasHeight * ratio) :
    //   canvasHeight = Math.floor(canvasWidth / ratio)

    // debugger
    // this.canvas.style.width = `${canvasWidth}px`;
    // this.canvas.style.height = `${canvasHeight}px`;
    // gameDiv.style.width = `${canvasWidth}px`;
    // gameDiv.style.height = `${canvasHeight}px`;

    this.ctx.imageSmoothingEnabled = false; // remove blurring from resizing

    console.log(`render: ${this.canvas.style.width} x ${this.canvas.style.height}`)

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

    Wall.all.forEach(w => {
      if (w.isCollided(this.player)) {
        // TODO move player out of wall
        console.log('collision!')
      }
    })

    Food.all.forEach(c => {
      if (c.isCollided(this.player) && !this.player.isHolding) {
        console.log('collision')
        c.isCarried = true;
        this.player.isHolding = true;
        this.player.itemHeld = c.type;
      }

      if (c.isCarried) {
        c.x = this.player.x + this.player.w / 2 - c.w / 2;
        c.y = this.player.y - c.h + 2
      }
    })

    Enemy.all.forEach((e, i) => {
      e.update(this.width, this.height);

      // temporary enemy collision with another enemy
      const otherEnemies = [...Enemy.all];
      otherEnemies.splice(i, 1);

      otherEnemies.forEach(otherEnemy => {
        if (otherEnemy.isCollided(e)) {
          e.changeDirection();
          otherEnemy.changeDirection();
        }
      })

      // check for collision with player
      if (e.isCollided(this.player)) {
        console.log(this.player.itemHeld, e.want)
        if (this.player.isHolding && this.player.itemHeld === e.want) {
          // if player has correct food item, kill enemy
          e.kill(i);
          // destroy food
        } else {
          // kill player
        }
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