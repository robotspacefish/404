export const INIT = 1,
  TITLE = 2,
  PLAY = 3,
  GAMEOVER = 4,
  RESET = 5
  ;

/**
 * @param {Integer} pixelValue - the player's x or y pixel location
 * @param {Integer} gridSize - the size of grid space to align to
 * @return {Integer} new pixel value that is aligned within the grid space
 */
export function alignToGrid(pixelValue, gridSize) {
  return Math.floor(pixelValue / gridSize + 0.5) * gridSize - pixelValue;
}