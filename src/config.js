export const config = {
  width: 224,
  // width: 288,
  height: 288,
  scale: 1
};

const gameDiv = document.getElementById('game');

export function resize(canvas, ctx) {
  ctx.imageSmoothingEnabled = false; // remove blurring from resizing

  const windowWidth = window.innerWidth;
  // const windowHeight = window.innerHeight;

  config.scale = Math.min(Math.floor(windowWidth / config.width), 3);
  canvas.width = config.width * (config.scale || 1);
  canvas.height = config.height * (config.scale || 1);
  gameDiv.style.width = `${canvas.width}px`;
  gameDiv.style.height = `${canvas.height}px`;
}