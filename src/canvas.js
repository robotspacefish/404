const canvas = document.getElementById('canvas'),
  bgCanvas = document.getElementById('bg-canvas'),
  ctx = canvas.getContext('2d'),
  bgCtx = bgCanvas.getContext('2d');

const HEIGHT = () => canvas.height;
const WIDTH = () => canvas.width;
export { canvas, ctx, bgCanvas, bgCtx, HEIGHT, WIDTH };