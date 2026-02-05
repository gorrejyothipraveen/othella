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


/*
  isPosition within boundary
  doesContainFlippingChance - 

*/

[
  [" ", " ", " ", " "],
  [" ", "1", "0", " "],
  [" ", "0", "1", " "],
  [" ", " ", " ", " "],
];