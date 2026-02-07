import { it } from "jsr:@std/testing/bdd";
import {
  createGrid,
  display,
  doesPlayerHasChance,
  isGameOver,
  parse,
  placeSymbolsIntoGrid,
  takeInputFromUser,
  validateAndPerformOperation,
} from "./game.js";

const setUp = () => {
  const grid = createGrid(4, 4);
  placeSymbolsIntoGrid(grid, "1", "0");
  return grid;
};

const performOperation = (CurrentSym, grid) => {
  console.log(CurrentSym, grid)
  const { x, y } = parse(takeInputFromUser());
  const result = validateAndPerformOperation(x, y, grid, CurrentSym);
  if (result.success) {
    display(grid);
  } else {
    console.log(result.errorMsg);
    performOperation(CurrentSym, grid);
  }
};

const playersSymbols = ["1", "0"];
let i = 0;

const actionHandler = (grid) => {
  if(isGameOver(grid)) return;
  const CurrentSym = playersSymbols[i++ % playersSymbols.length];
  if (doesPlayerHasChance(CurrentSym, grid)) {
    performOperation(CurrentSym, grid);
  }
  actionHandler(grid);
};

const startGame = () => {
  const grid = setUp();
  actionHandler(grid);
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
*/
