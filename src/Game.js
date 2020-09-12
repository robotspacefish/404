import Player from './Player.js';
import Food from './Food.js';
import FoodCourt from './FoodCourt.js';
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
  constructor(canvas, isMobile) {
    this.isMobile = isMobile;

    this.player;

    this.points;
    this.state = TITLE;
    this.gameMap = new GameMap(16);
    this.maxEnemies = 4;

    // logical
    this.width = mapWidth * 16;
    this.height = mapHeight * 16;
    this.maxWidth = this.width * 3;
    this.maxHeight = this.height * 3;


    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.height = this.height;
    this.canvas.width = this.width;

    this.tick = 0;
    this.intervalId = null;
  }

  debug() {
    // console.log(this);
    // // console.log(GameObject.all);
    // Food.all.forEach((f, i) => console.log(`${i} ${f.type} isCarried: ${f.isCarried}`))
    // console.log(FoodCourt.all)
    console.log(Enemy.all)
  }

  init() {
    Food.spawn();
    this.player = new Player(0, 0, 16, 16, 5 * 16, 11 * 16, 16, 16, 'player', playerAnims.DOWN);
    this.points = 0;
    this.intervalId = setInterval(() => {
      if (Enemy.all.length < this.maxEnemies) Enemy.spawn()
    }, 2000);

    if (this.isMobile) { // show arrow controls
      document.querySelector('.mobile-controls').classList.remove('hide');
    }

    this.state = PLAY;
  }

  reset() {
    GameObject.all = [];
    Food.all = [];
    Enemy.all = [];
    clearInterval(this.intervalId);
    this.state = INIT;
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

    Wall.all.forEach(w => {
      this.player.handleRectangleCollision(w);
      Enemy.all.forEach(e => e.handleRectangleCollision(w))

    });

    // keep player out of spawn
    if (this.player.y < 32) EnemySpawn.all.forEach(s => this.player.handleRectangleCollision(s));

    if (this.player.x >= 3 * 16 && this.player.x <= 8 * 16 && this.player.y >= 8 * 16 && this.player.y <= 9 * 16) {
      // check when player is within range - check from row above to keep player out of foodcourt
      FoodCourt.all.forEach(fc => {
        //
        if (this.player.isHolding && this.player.itemHeld.type === fc.type) {
          this.player.handleRectangleCollision(fc)
        }
      });


    }

    // handle player collision with food and carry if holding
    Food.all.forEach(f => {
      if (this.player.isCollidedWithFood(f)) {
        if (!this.player.isHolding) {
          f.isCarried = true;
          this.player.isHolding = true;
          this.player.itemHeld = f;
        } else if (this.player.itemHeld.type !== f.type) {
          foodDestroyed = Food.destroy(); // destroy first
          f.isCarried = true; // otherwise this get destroyed
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
      const otherEnemies = [...Enemy.all];
      otherEnemies.splice(i, 1);

      // otherEnemies.forEach(otherEnemy => {
      //   if (e.handleRectangleCollision(otherEnemy)) {
      //     // find direction there is a collision
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
    if (this.state === PLAY) this.drawPlay(tilesheet);
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

  displayScore() {
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillText(`Score:${this.points}`, 0, this.height - 2)
  }
}