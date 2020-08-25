const canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');
// HEIGHT = canvas.height,
// WIDTH = canvas.width;
const HEIGHT = () => canvas.height;
const WIDTH = () => canvas.width;
export { canvas, ctx, HEIGHT, WIDTH };