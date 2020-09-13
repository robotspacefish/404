import Game from './Game.js';
import { playerAnims } from './animations.js';
import { INIT, TITLE, PLAY, GAMEOVER, RESET } from './helpers';
import t from './assets/images/404_spritesheet_compressed.png';

import d from './assets/sounds/die.wav';
import p from './assets/sounds/pickup.wav';
import s from './assets/sounds/success.wav';
export const success = new Audio(s);
export const pickup = new Audio(p)
export const die = new Audio(d);

let isMobile = !!(navigator.userAgent.toLowerCase().match(/mobile/i) || navigator.userAgent.toLowerCase().match(/tablet/i) || navigator.userAgent.toLowerCase().match(/android/i) || navigator.userAgent.toLowerCase().match(/iphone/i) || navigator.userAgent.toLowerCase().match(/ipad/i));
;

let RAF; // requestAnimationFrame

let gameDiv; // container for text screens
const game = new Game(document.getElementById('canvas'), isMobile);
const body = document.querySelector('body');
const bgCtx = document.getElementById('bg').getContext('2d'); // background

const { UP, UP_CARRY, DOWN, DOWN_CARRY, LEFT_SIDE, LEFT_SIDE_CARRY, RIGHT_SIDE, RIGHT_SIDE_CARRY } = playerAnims;

// mobile controls
const btns = document.querySelectorAll('button');

const tilesheet = new Image();
tilesheet.src = t;


// MAIN GAME LOOP ===============================================
function gameLoop() {
  if (game.state === TITLE || game.state === GAMEOVER) {
    cancelAnimationFrame(RAF);
    window.addEventListener('touchstart', touchstartHandler, { passive: false });
    window.addEventListener('touchend', touchendHandler, { passive: false });
    document.querySelector('.mobile-controls').classList.add('hide');

    game.state === TITLE ?
      drawText('kill.exe not found', `${isMobile ? 'Tap' : 'Press [SPACEBAR]'} to Start`, instructions(isMobile)) :
      drawText('Oops! You\'ve Been Eaten!', `${isMobile ? 'Tap' : 'Press [SPACEBAR]'} to Try Again`, `Final Score: ${game.points}`);
  } else {
    window.removeEventListener('touchstart', touchstartHandler, { passive: false });
    window.removeEventListener('touchend', touchendHandler, { passive: false });
    game.update();
    game.draw(tilesheet);
    RAF = requestAnimationFrame(gameLoop);
  }
}

// BACKGROUND SETUP ===============================================
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


// TITLE/GAME OVER SCREENS ===============================================
function removeTextScreen(container, child) {
  container.removeChild(child)
}

function instructions(isMobile) {
  return `
    You are a defense robot tasked with stopping an alien invasion, but your kill.exe file is missing. In order to get the aliens to leave you have to give them what they want: food!

    Make sure to bring the right food to each alien or the food will be you!

    Controls: ${isMobile ? 'Arrow Buttons' : 'WASD | ZQSD | Arrow Keys'}
  `;
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

function handleTextScreen() {
  removeTextScreen(body, gameDiv);
  game.canvas.style.display = 'block';
  RAF = requestAnimationFrame(gameLoop);
  if (game.state === TITLE) game.state = INIT;
  else if (game.state === GAMEOVER) game.state = RESET;
}


// EVENT HANDLERS ===============================================
function handleRelease(e, dir) {
  if (game.state === PLAY) game.player.movement[dir] = false;
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

function touchendHandler(e, dir) {
  if (e.cancelable) e.preventDefault();
  if (dir) handleRelease(e, dir);
}

function touchstartHandler(e, dir) {
  if (e.cancelable) e.preventDefault();
  const pressed = getTouchPressed(dir);
  if (game.state === PLAY) {
    handlePlay(pressed)

  } else {
    if (pressed === 'spacebar') {
      handleTextScreen();
    }
  }
}

// EVENT LISTENERS ===============================================
// Touch controls
btns.forEach(btn => {
  const dir = btn.id.split('-')[0];
  btn.addEventListener('touchstart', e => touchstartHandler(e, dir), { passive: false });
  btn.addEventListener('touchend', e => touchendHandler(e, dir), { passive: false })
})

// Keyboard controls
window.addEventListener('keydown', e => {
  let pressed = getKeyPressed(e.keyCode);
  if (game.state === PLAY) handlePlay(pressed);
  else if (pressed === 'spacebar') handleTextScreen();
});

window.addEventListener('keyup', e => {
  // Up upArrow / W / Z
  if (e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87) handleRelease(e, 'up');

  // Right (rightArrow / D)
  if (e.keyCode == 39 || e.keyCode == 68) handleRelease(e, 'right');

  // Down (downArrow / S)
  if (e.keyCode == 40 || e.keyCode == 83) handleRelease(e, 'down');

  // Left (leftArrow / A / Q)
  if (e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 81) handleRelease(e, 'left');

});

// START ===============================================
window.addEventListener('load', () => {
  buildBackground();

  game.resize();
  bgResize();

  // load sounds?
  success.load();
  pickup.load();
  die.load();

  window.addEventListener('resize', () => {
    game.resize();
    bgResize();
  }, false);

}, false)

tilesheet.addEventListener('load', () => {
  RAF = requestAnimationFrame(gameLoop);
}, false);
