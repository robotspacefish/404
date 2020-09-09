export const gameMap = [
  [2, 9, 2, 2, 9, 2, 2, 9, 2, 2, 9, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 1],
  [1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1],
  [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
  [1, 2, 2, 1, 2, 7, 8, 2, 1, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
  [2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

export const mapHeight = gameMap.length, mapWidth = gameMap[0].length;

export const mapCodes = {
  EMPTY: 0,
  FLOOR: 1,
  WALL: 2,
  PLAYER: 3,
  ENEMY_TYPE_1: 4,
  ENEMY_TYPE_2: 10,
  TACO: 5,
  DONUT: 6,
  TACO_COURT: 7,
  DONUT_COURT: 8,
  ENEMY_SPAWN: 9
};