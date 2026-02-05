const isPositionWithinBoundary = (x, y, rows, cols) => {
  return !(x < 0 && x >= rows && y >= cols && y < 0);
};

const doesContainFlippingChance = (positionConfig) => {
  let x = positionConfig.x;
  let y = positionConfig.y;
  while (
    isPositionWithinBoundary(
      x + positionConfig.x1,
      y + positionConfig.y1,
      positionConfig.rows,
      positionConfig.cols,
    )
  ) {
    // something
  }

  return false;
};



export const isValidPosition = (x, y, symbol, grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  for (const direction of directions) {
    const [x1, y1] = direction;
    const positionConfig = { x1, y1, x, y, symbol, rows, cols };
    doesContainFlippingChance(positionConfig);
  }
};

[
  [" ", " ", " ", " "],
  [" ", "1", "0", " "],
  [" ", "0", "1", " "],
  [" ", " ", " ", " "],
];


const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

