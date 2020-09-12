import Game from './Game.js';
import { playerAnims } from './animations.js';

let isMobile = !!(navigator.userAgent.toLowerCase().match(/mobile/i) || navigator.userAgent.toLowerCase().match(/tablet/i) || navigator.userAgent.toLowerCase().match(/android/i) || navigator.userAgent.toLowerCase().match(/iphone/i) || navigator.userAgent.toLowerCase().match(/ipad/i));
;

const { UP, UP_CARRY, DOWN, DOWN_CARRY, LEFT_SIDE, LEFT_SIDE_CARRY, RIGHT_SIDE, RIGHT_SIDE_CARRY } = playerAnims;

const upBtn = document.getElementById('up-btn');
const downBtn = document.getElementById('down-btn');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');

const btns = document.querySelectorAll('button');
btns.forEach(btn => {
  const dir = btn.id.split('-')[0];
  btn.addEventListener('touchstart', e => touchstartHandler(e, dir), false);
  btn.addEventListener('touchend', e => touchendHandler(e, dir), false)
  btn.addEventListener("touchcancel", e => console.log('touch cancel'), false);
  btn.addEventListener("touchmove", e => console.log('touch move'), false);
})

function touchstartHandler(e, dir) {
  e.preventDefault();
  const pressed = getTouchPressed(dir);
  if (game.state === PLAY) {
    handlePlay(pressed)

  } else {
    if (pressed === 'spacebar') {
      game.canvas.style.display = 'block';
      removeTextScreen();
      RAF = requestAnimationFrame(gameLoop);
      if (game.state === TITLE) game.state = INIT;
      else if (game.state === GAMEOVER) game.state = RESET;
    }
  }
}

function touchendHandler(e, dir) {
  if (dir) handleRelease(e, dir);
}

const LOADING = 0,
  INIT = 1,
  TITLE = 2,
  PLAY = 3,
  GAMEOVER = 4,
  RESET = 5;

let isPaused = false;

// (function () {
// GLOBALS =======================================================
const tilesheet = new Image();
tilesheet.src = './assets/images/404_spritesheet_compressed.png';
const bgCtx = document.getElementById('bg').getContext('2d');
let RAF;
const game = new Game(document.getElementById('canvas'));
let gameDiv;
const body = document.querySelector('body');

function gameLoop() {
  if (game.state === TITLE) {
    cancelAnimationFrame(RAF);
    drawText('kill.exe not found', `${isMobile ? 'Tap' : 'Press [SPACE]'} to Start`, instructions());
  } else if (game.state === GAMEOVER) {
    cancelAnimationFrame(RAF);
    drawText('Oops! You\'ve Been Eaten!', `${isMobile ? 'Tap' : 'Press [SPACE]'} to Try Again`);
  } else {
    game.update();
    game.draw(tilesheet);
    RAF = requestAnimationFrame(gameLoop);
  }

}

function buildBackground() {
  for (let i = 0; i < window.innerWidth; i += 32) {
    for (let j = 0; j < window.innerHeight; j += 32) {
      const randX = Math.floor(Math.random() * window.innerWidth) + 1;
      const randY = Math.floor(Math.random() * window.innerHeight) + 1;
      bgCtx.fillStyle = 'white';
      bgCtx.fillRect(randX, randY, 1, 1);
    }
  }
}

function bgResize() {
  bgCtx.canvas.style.width = "100%";
  bgCtx.canvas.style.height = "100%";
  bgCtx.imageSmoothingEnabled = false; // remove blurring from resizing
}

function drawText(text1, text2, extraText) {
  game.canvas.style.display = 'none';
  const fragment = document.createDocumentFragment();
  gameDiv = document.createElement('div');
  fragment.appendChild(gameDiv);

  gameDiv.classList.add('text-screen');

  const mainText = document.createElement('h1');
  mainText.innerText = text1;

  const subText = document.createElement('h3');
  subText.innerText = text2;

  gameDiv.appendChild(mainText);

  if (extraText) {
    const extra = document.createElement('p');;
    extra.innerText = extraText;
    gameDiv.appendChild(extra);
  }

  gameDiv.appendChild(subText);
  body.appendChild(fragment)

}

function removeTextScreen() {
  body.removeChild(gameDiv)
}

function instructions() {
  return `
    You are a defense robot tasked with stopping an alien invasion, but your kill.exe file is missing. In order to get the aliens to leave you have to give them what they want: food!

    Make sure to bring the right food to each alien or the food will be you!

    Controls: WASD | ZQSD | Arrow Keys
  `;
}

function handleRelease(e, dir) {
  game.player.movement[dir] = false;
}

function getKeyPressed(k) {
  if (k === 32) return 'spacebar';
  else if (k === 38 || k === 90 || k === 87) return 'up';
  else if (k === 39 || k === 68) return 'right';
  else if (k === 40 || k === 83) return 'down';
  else if (k === 37 || k === 65 || k === 81) return 'left';
}

function getTouchPressed(dir) {
  return !dir ? 'spacebar' : dir;

}

function handlePlay(pressed) {
  if (pressed === 'spacebar') {
    isPaused = !isPaused;
    isPaused ? cancelAnimationFrame(RAF) : RAF = requestAnimationFrame(gameLoop);
    console.log(game.debug());

    game.canvas.style.display = 'block';
    removeTextScreen();
    RAF = requestAnimationFrame(gameLoop);
    if (game.state === TITLE) game.state = INIT;
    else if (game.state === GAMEOVER) game.state = RESET;
  }

  // Up upArrow / W / Z
  if (pressed === 'up') {
    game.player.movement.up = true;
    game.player.currentAnim = game.player.isHolding ? UP_CARRY : UP;
  }

  // Right (rightArrow / D)
  if (pressed === 'right') {
    game.player.movement.right = true;
    game.player.currentAnim = game.player.isHolding ? RIGHT_SIDE_CARRY : RIGHT_SIDE;
  }

  // Down (downArrow / S)
  if (pressed === 'down') {
    game.player.movement.down = true;
    game.player.currentAnim = game.player.isHolding ? DOWN_CARRY : DOWN;
  }

  // Left (leftArrow / A / Q)
  if (pressed === 'left') {
    game.player.movement.left = true;
    game.player.currentAnim = game.player.isHolding ? LEFT_SIDE_CARRY : LEFT_SIDE;
  }
}

// EVENT LISTENERS ===============================================
window.addEventListener('keydown', e => {
  let pressed = getKeyPressed(e.keyCode);

  if (game.state === PLAY) {
    handlePlay(pressed);

  } else {
    if (pressed === 'spacebar') {
      game.canvas.style.display = 'block';
      removeTextScreen();
      RAF = requestAnimationFrame(gameLoop);
      if (game.state === TITLE) game.state = INIT;
      else if (game.state === GAMEOVER) game.state = RESET;
    }
  }
});

window.addEventListener('keyup', e => {
  // Up upArrow / W / Z
  if (e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87) {
    handleRelease(e, 'up');
  }

  // Right (rightArrow / D)
  if (e.keyCode == 39 || e.keyCode == 68) {
    handleRelease(e, 'right');
  }

  // Down (downArrow / S)
  if (e.keyCode == 40 || e.keyCode == 83) {
    handleRelease(e, 'down');

  }

  // Left (leftArrow / A / Q)
  if (e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 81) {
    handleRelease(e, 'left');
  }

});

window.addEventListener('load', () => {
  buildBackground();

  game.resize();
  bgResize();

  window.addEventListener('resize', () => {
    game.resize();
    bgResize();
  }, false);

}, false)

tilesheet.addEventListener('load', () => {

  RAF = requestAnimationFrame(gameLoop);
}, false);
