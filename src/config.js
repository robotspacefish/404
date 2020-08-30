import { canvas } from './canvas.js';

export const config = {
  width: 224,
  height: 288,
  scale: 4
};

export function resize() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = config.width / config.height;

  if (windowRatio < gameRatio) {
    canvas.width = windowWidth < config.width ? windowWidth : config.width;
    canvas.height = windowHeight < config.height ? windowHeight : config.height;
  } else {
    canvas.width = (windowHeight * gameRatio);
    canvas.height = windowHeight;
  }
  console.log('canvas:', canvas.width, canvas.height)
}