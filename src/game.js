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
  const space = " ";
  return grid[x][y] === space || grid[x][y] === sym;
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
  if (doesOccupied(x, y, grid)) return false;

  for (const direction of directions) {
    const [x1, y1] = direction;
    const posConfig = { x, y, x1, y1, grid, sym };
    if (doesContainFlippingChance(posConfig)) {
      return true;
    }
  }
  return false;
};

export const flipSymbols = (posConfig) => {
  const [x1, y1] = [posConfig.x1, posConfig.y1];
  let [x, y] = [posConfig.x, posConfig.y];

  while (posConfig.grid[x + x1][y + y1] !== posConfig.sym) {
    posConfig.grid[x + x1][y + y1] = posConfig.sym;
    x += x1;
    y += y1;
  }
};

export const modifySymbols = (x, y, grid, sym) => {
  for (const direction of directions) {
    const [x1, y1] = direction;
    const posConfig = { x, y, x1, y1, grid, sym };
    if (doesContainFlippingChance(posConfig)) {
      grid[x][y] = sym;
      flipSymbols(posConfig);
    }
  }
};

export const doesOccupied = (x, y, grid) => {
  const space = " ";
  return grid[x][y] !== space;
};

export const validateAndPerformOperation = (x, y, grid, sym) => {
  if (!isValidPosition(x, y, grid, sym)) {
    return { success: false, errorMsg: "Invalid Move!" };
  }

  if (doesOccupied(x, y, grid)) {
    return { success: false, errorMsg: "Already Occupied" };
  }
  modifySymbols(x, y, grid, sym);
  return { success: true, message: "Modified Successfully" };
};

export const doesPlayerHasChance = (sym, grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (isValidPosition(i, j, grid, sym)) {
        return true;
      }
    }
  }

  return false;
};

export const askNames = () => {
  const player1 = prompt("enter player1 name : ");
  const player2 = prompt("enter player2 name : ");
  return [player1, player2];
};

export const display = (grid) => {
  console.clear();
  let string = `   0  1  2  3  4  5  6  7  \n   -- -- -- -- -- -- -- -- \n`;
  for (let i = 0; i < grid.length; i++) {
    string += `${i} `;
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === " ") {
        string += `|  `;
      } else {
        string += "|" + grid[i][j];
      }
    }
    string += `|\n   -- -- -- -- -- -- -- -- \n`;
  }

  console.log(string);
};

export const takeInputFromUser = (player, CurrentSym) => {
  return prompt(`${player} enter coordinates [${CurrentSym}]: `);
};

export const isNumber = (number) => {
  return !isNaN(Number(number));
};

export const parse = (coordinates) => {
  const [x, y] = coordinates.split(" ").map((x) => parseInt(x));
  if (!isNumber(x) || !isNumber(y)) {
    return { success: false, error: "Invalid Input!" };
  }
  return { success: true, coordinates: { x, y } };
};

export const isGameOver = (grid) => {
  return !grid.some((row) => row.some((ele) => ele === " "));
};

export const highestOccurredSymbol = (grid, symbolsCount) => {
  const symbols = Object.keys(symbolsCount);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (symbols[0] === grid[i][j]) {
        symbolsCount[symbols[0]] += 1;
      }
      if (symbols[1] === grid[i][j]) {
        symbolsCount[symbols[1]] += 1;
      }
    }
  }
  if (symbolsCount[symbols[0]] === symbolsCount[symbols[1]]) return "both";

  return symbolsCount[symbols[0]] > symbolsCount[symbols[1]]
    ? symbols[0]
    : symbols[1];
};

export const anyOneHasChance = (chanceToPlay) => {
  return !(!chanceToPlay["🟠"] && !chanceToPlay["🟣"]);
};

/*
  isPosition within boundary
  doesContainFlippingChance -

  take the input from the user
  validate and perform operation :

  two players are there :
  first player with 1 sym
  and second player with 0 sym

  playerSymbols = [ '1', '0' ]

*/

// const grid = [
//   [" ", "1", "0", "1"],
//   ["0", "1", "0", "1"],
//   ["0", "0", "0", "1"],
//   ["1", " ", "1", "1"],
// ];
