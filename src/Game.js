import Player from './Player.js';
import Food from './Food.js';
import Wall from './Wall.js';
import GameObject from './GameObject.js';
import GameMap from './GameMap.js';
import Enemy from './Enemy.js';
import { playerAnims } from './animations.js';
import EnemySpawn from './EnemySpawn.js';
import { mapHeight, mapWidth } from './map.js';

const LOADING = 0,
  INIT = 1,
  TITLE = 2,
  PLAY = 3,
  GAMEOVER = 4, RESET = 5;

export default class Game {
  constructor(canvas) {
    this.player;

    this.points;
    this.state = TITLE;
    this.gameMap = new GameMap(16);
    this.maxEnemies = 4;

    // logical
    this.width = mapWidth * 16;
    this.height = mapHeight * 16 + 16; // +16 leaves space for UI at the bottom
    this.maxWidth = this.width * 3;
    this.maxHeight = this.height * 3;


    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.height = this.height;
    this.canvas.width = this.width;

    this.tick = 0;
    this.intervalId = null;
  }

  init() {
    Food.spawn();
    this.player = new Player(0, 0, 16, 16, 5 * 16, 11 * 16, 16, 16, 'player', playerAnims.DOWN);
    this.points = 0;
    this.intervalId = setInterval(() => {
      if (Enemy.all.length < this.maxEnemies) Enemy.spawn()
    }, 1000);

    this.state = PLAY;
  }

  reset() {
    GameObject.all = [];
    Food.all = [];
    Enemy.all = [];
    clearInterval(this.intervalId);
    this.state = INIT;
  }

  spawnEnemy() {
    if (Enemy.all.length < this.maxEnemies) Enemy.spawn()
  }

  resize() {
    let cWidth = window.innerWidth,
      cHeight = window.innerHeight;

    const nativeRatio = this.width / this.height,
      browserWindowRatio = cWidth / cHeight,
      SIZE = 16;

    if (browserWindowRatio > nativeRatio) {
      cHeight = Math.floor(cHeight * 0.9 * SIZE) * SIZE;
      if (cHeight > this.maxWidth) cHeight = this.maxHeight;
      cWidth = Math.floor(cHeight * nativeRatio);
    } else {
      cWidth = Math.floor(cWidth * 0.9 / SIZE) * SIZE;
      if (cWidth > this.maxWidth) cWidth = this.maxWidth;
      cHeight = Math.floor(cWidth / nativeRatio);
    }

    this.canvas.style.width = `${cWidth}px`;
    this.canvas.style.height = `${cHeight}px`;

    this.ctx.imageSmoothingEnabled = false; // remove blurring from resizing
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
    if (this.state === PLAY) this.handleCollisions();
    else if (this.state === INIT) this.init();
    else if (this.state === RESET) this.reset();

  }

  handleCollisions() {
    let foodDestroyed;

    this.player.update(this.canvasHeight, this.canvasWidth);
    let foodCarriedIndex;

    Wall.all.forEach(w => this.player.handleRectangleCollision(w));

    EnemySpawn.all.forEach(s => this.player.handleRectangleCollision(s));

    Food.all.forEach((f, i) => {
      if (this.player.isCollidedWithFood(f)) {
        console.log('collided with', f.type)
        if (!this.player.isHolding) {
          f.isCarried = true;
          this.player.isHolding = true;
          this.player.itemHeld = f;
        } else if (this.player.itemHeld.type !== f.type) {
          console.log('already holding', this.player.itemHeld.type)
          f.isCarried = true;
          foodDestroyed = Food.destroy();
          this.player.itemHeld = f; // swap
        }
      }

      if (f.isCarried) {
        // hold food above player's head
        f.x = this.player.x + this.player.w / 2 - f.w / 2;
        f.y = this.player.y - f.h + 2
      }
    })

    Enemy.all.forEach((e, i) => {
      e.update(this.player);

      // temporary enemy collision with another enemy
      // const otherEnemies = [...Enemy.all];
      // otherEnemies.splice(i, 1);

      // otherEnemies.forEach(otherEnemy => {
      //   // TODO find direction they bumped and remove it from valid directions

      //   if (otherEnemy.isCollidedAtCenter(e)) {
      //     e.changeDirection();

      //     otherEnemy.changeDirection();
      //   }
      // })
      // check for collision with player
      if (e.isCollidedAtCenter(this.player)) {
        if (this.player.isHolding && this.player.itemHeld.type === e.want) {
          // if player has correct food item, kill enemy
          e.kill(i);
          // destroy food
          foodDestroyed = Food.destroy();

          this.player.isHolding = false;
          this.player.itemHeld = null;
          // increase points;
          this.points++;
        } else {
          // kill player
          this.state = GAMEOVER;
        }
      }

    })

    if (Food.all.length < 2 && foodDestroyed) {
      // create the food that was just fed/eaten
      foodDestroyed.type === 'donut' ? Food.createDonut() : Food.createTaco();
    }
  }

  draw(tilesheet) {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = 'white';
    this.drawUI(tilesheet);

    if (this.state === TITLE) this.drawTextScreen('kill.exe not found', 'Press [SPACE] to Start');
    else if (this.state === PLAY) this.drawPlay(tilesheet);
    else if (this.state === GAMEOVER) this.drawTextScreen('GAME OVER', 'Press [SPACE] to Play Again');
  }

  drawUI(tilesheet) {
    // green alien loves tacos
    this.ctx.strokeStyle = 'white'
    this.ctx.drawImage(tilesheet, 0, 16, 16, 16, this.width / 2 + 4, this.height - 16, 16, 16)
    this.ctx.drawImage(tilesheet, 275, 19, 9, 9, this.width / 2 + 20, this.height - 11, 9, 9)
    this.ctx.drawImage(tilesheet, 275, 8, 10, 7, this.width / 2 + 32, this.height - 10, 10, 7)

    // yellow alien loves donuts
    this.ctx.drawImage(tilesheet, 128, 16, 16, 16, this.width - 44, this.height - 16, 16, 16)
    this.ctx.drawImage(tilesheet, 275, 19, 9, 9, this.width - 28, this.height - 11, 9, 9)
    this.ctx.drawImage(tilesheet, 259, 6, 10, 10, this.width - 16, this.height - 12, 10, 10)

    this.displayScore();
  }

  drawPlay(tilesheet) {
    this.gameMap.draw(this.ctx, tilesheet);

    GameObject.all.forEach(obj => obj.draw(this.ctx, tilesheet));

    this.ctx.font = '12px Monospace';

  }

  drawTextScreen(text1, text2) {
    this.ctx.font = '14px Monospace';
    this.ctx.fillText(text1, this.width / 2 - 68, 100, this.width);

    this.ctx.font = '10px Monospace';
    this.ctx.fillText(text2, this.width / 2 - 58, this.height - 100, this.width)
  }

  displayScore() {
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillText(`Score:${this.points}`, 0, this.height - 2)
  }
}