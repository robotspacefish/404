export const playerAnims = {
  DOWN: {
    srcX: 0,
    srcY: 0,
    numOfFrames: 2,
    tickCap: 28
  },
  DOWN_CARRY: {
    srcX: 32,
    srcY: 0,
    numOfFrames: 2,
    tickCap: 28
  },
  UP: {
    srcX: 64,
    srcY: 0,
    numOfFrames: 2,
    tickCap: 28
  },
  UP_CARRY: {
    srcX: 96,
    srcY: 0,
    numOfFrames: 2,
    tickCap: 28
  },
  RIGHT_SIDE: {
    srcX: 128,
    srcY: 0,
    numOfFrames: 2,
    tickCap: 28
  },
  RIGHT_SIDE_CARRY: {
    srcX: 160,
    srcY: 0,
    numOfFrames: 2,
    tickCap: 28
  },
  LEFT_SIDE: {
    srcX: 192,
    srcY: 0,
    numOfFrames: 2,
    tickCap: 28
  },
  LEFT_SIDE_CARRY: {
    srcX: 224,
    srcY: 0,
    numOfFrames: 2,
    tickCap: 28
  }
};

export const tilesheet = new Image();
tilesheet.src = './assets/images/404_spritesheet_compressed.png';

export const SPRITE_SCALE = 5;