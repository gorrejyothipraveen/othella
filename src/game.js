export const createGrid = (rows, cols) => {
  return Array.from(
    { length: rows },
    () => Array.from({ length: cols }, () => " "),
  );
};

export const placeSymbolsIntoGrid = (grid, sym1, sym2) => {
  const index1 = grid.length / 2;
  const index2 = grid[0].length / 2;
  grid[index1 - 1][index2 - 1] = sym1;
  grid[index1 - 1][index2] = sym2;
  grid[index1][index2 - 1] = sym2;
  grid[index1][index1] = sym1;
  return grid;
};

export const isPositionWithinBoundary = (x, y, rows, cols) => {
  return (x >= 0 && x < rows && y >= 0 && y < cols);
};

export const isSpaceOrSameSymbol = (x, y, grid, sym) => {
  return grid[x][y] === " " || grid[x][y] === sym;
};

export const isNextPositionSameSym = (x, y, grid, sym) => {
  return isPositionWithinBoundary(x, y, grid.length, grid[0].length) &&
    grid[x][y] === sym;
};

export const doesContainFlippingChance = (posConfig) => {
  // x, y, x1, y1, sym, rows, cols;
  let status = false;
  const { x, y, x1, y1, sym, grid } = posConfig;
  const [cols, rows] = [grid.length, grid[0].length];
  let xPos = x;
  let yPos = y;
  while (true) {
    xPos += x1;
    yPos += y1;
    if (!isPositionWithinBoundary(xPos, yPos, rows, cols)) break;
    if (isSpaceOrSameSymbol(xPos, yPos, grid, sym)) break;
    if (isNextPositionSameSym(xPos + x1, yPos + y1, grid, sym)) {
      status = true;
      break;
    }
  }
  return status;
};

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
  [-1, 1],
];

export const isValidPosition = (x, y, grid, sym) => {
  for (const direction of directions) {
    const [x1, y1] = direction;
    const posConfig = { x, y, x1, y1, grid, sym};
    if (doesContainFlippingChance(posConfig)) {
      return true;
    }
  }
  return false;
};

/*
  isPosition within boundary
  doesContainFlippingChance -
*/

// const grid  = [
//   [" ", " ", " ", " "],
//   [" ", "1", "0", " "],
//   [" ", "0", "1", " "],
//   [" ", " ", " ", " "],
// ];
