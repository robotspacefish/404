export const config = {
  width: 224,
  // width: 288,
  height: 288,
  scale: 4
};

export function resize(canvas) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const scale = Math.min(Math.floor(windowWidth / config.width), 3);
  canvas.width = config.width * (scale || 1);
  canvas.height = config.height * (scale || 1);
  console.log(canvas.width, canvas.height)
}