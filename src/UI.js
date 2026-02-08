import {
  anyOneHasChance,
  askNames,
  createGrid,
  display,
  doesPlayerHasChance,
  highestOccurredSymbol,
  isGameOver,
  parse,
  placeSymbolsIntoGrid,
  takeInputFromUser,
  validateAndPerformOperation,
} from "./game.js";

const players = {};

const setUp = () => {
  const grid = createGrid(8, 8);
  const [p1, p2] = askNames();
  players["🟠"] = p1;
  players["🟣"] = p2;
  placeSymbolsIntoGrid(grid, "🟠", "🟣");
  return grid;
};

const performOperation = (CurrentSym, grid) => {
  const inputInfo = parse(takeInputFromUser(players[CurrentSym], CurrentSym));
  if (!inputInfo.success) {
    console.log(inputInfo.error);
    return performOperation(CurrentSym, grid);
  }
  const result = validateAndPerformOperation(
    inputInfo.coordinates.x,
    inputInfo.coordinates.y,
    grid,
    CurrentSym,
  );
  if (result.success) {
    return display(grid);
  } else {
    console.log(result.errorMsg);
    return performOperation(CurrentSym, grid);
  }
};

const playersSymbols = ["🟠", "🟣"];
let i = 0;

const displayWhoWon = (grid) => {
  const result = highestOccurredSymbol(grid, { "🟠": 0, "🟣": 0 });
  if (result === both) {
    console.log("both won the game!");
    return;
  }
  console.log(players[result] + "won the game");
};

const actionHandler = (grid, chanceToPlay) => {
  if (isGameOver(grid) || !anyOneHasChance(chanceToPlay)) {
    displayWhoWon(grid);
    return;
  }
  const CurrentSym = playersSymbols[i++ % playersSymbols.length];
  if (doesPlayerHasChance(CurrentSym, grid)) {
    performOperation(CurrentSym, grid);
  } else {
    chanceToPlay[CurrentSym] = false;
    return actionHandler(grid, { ...chanceToPlay });
  }
  return actionHandler(grid, { "🟠": true, "🟣": true });
};

const startGame = () => {
  const grid = setUp();

  display(grid);
  actionHandler(grid, { "🟠": true, "🟣": true });
};

startGame();

/*
you will creates the grid
after creating the grid you will place the symbols

and then game starts :
player1 :
 -> after that i will check whether possible move is there or not
 -> if yes, user will enter coordinates
 -> i will check , is this valid move or not if not , i will ask user to enter the coordinates again - it repeats
 after that

 player2 will take over
 same thing repeats for him also

 both values are true :
 1 : true, 0 : true

 if 1 does not have chance then 1 is false, 0 also does not have chance then it also false then i will show the result


*/
