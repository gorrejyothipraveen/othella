import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import {
  createGrid,
  doesContainFlippingChance,
  doesOccupied,
  doesPlayerHasChance,
  flipSymbols,
  highestOccurredSymbol,
  isGameOver,
  isNextPositionSameSym,
  isPositionWithinBoundary,
  isValidPosition,
  modifySymbols,
  parse,
  placeSymbolsIntoGrid,
  validateAndPerformOperation,
} from "../src/game.js";

describe("othello game", () => {
  describe("testing the grid create functionality : ", () => {
    it("==> 2:2 grid is creating : ", () => {
      const actual = createGrid(2, 2);
      const expected = [[" ", " "], [" ", " "]];
      assertEquals(actual, expected);
    });
  });

  describe("placing the symbols in the middle : ", () => {
    it("==> placing the symbols in the middle of the grid : ", () => {
      const grid = createGrid(4, 4);
      const actual = placeSymbolsIntoGrid(grid, "1", "0");
      const expected = [
        [" ", " ", " ", " "],
        [" ", "1", "0", " "],
        [" ", "0", "1", " "],
        [" ", " ", " ", " "],
      ];
      assertEquals(actual, expected);
    });
  });

  describe("position is within boundary : ", () => {
    it("==> valid position : ", () => {
      const actual = isPositionWithinBoundary(1, 1, 4, 4);
      const expected = true;
      assertEquals(actual, expected);
    });

    it("==> position not within boundary : ", () => {
      const actual = isPositionWithinBoundary(-1, 0, 4, 4);
      const expected = false;
      assertEquals(actual, expected);
    });

    it("==> invalid position : y value is out of boundary", () => {
      const actual = isPositionWithinBoundary(1, 19, 4, 4);
      const expected = false;
      assertEquals(actual, expected);
    });
  });

  describe("testing the does flipping chance exist or not : ", () => {
    it("==> yes flipping chance exist : ", () => {
      const grid = [
        [" ", "0", "1", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];
      const posConfig = { x: 0, y: 0, x1: 0, y1: 1, grid, sym: "1" };
      const actual = doesContainFlippingChance(posConfig);
      const expected = true;
      assertEquals(actual, expected);
    });

    it("==> does not have the flipping chance : ", () => {
      const grid = [
        [" ", "0", "1", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];
      const posConfig = { x: 0, y: 3, x1: 0, y1: 1, grid, sym: "1" };
      const actual = doesContainFlippingChance(posConfig);
      const expected = false;
      assertEquals(actual, expected);
    });

    it("==> it has flipping chance : at 2 : 1", () => {
      const grid = [
        [" ", "0", "1", " "],
        [" ", " ", " ", " "],
        [" ", " ", "0", " "],
        [" ", " ", " ", " "],
      ];
      const posConfig = { x: 2, y: 1, x1: 0, y1: 1, grid, sym: "1" };
      const actual = doesContainFlippingChance(posConfig);
      const expected = false;
      assertEquals(actual, expected);
    });

    it("==> it has flipping chance at 3 : 3", () => {
      const grid = [
        [" ", "0", "1", " "],
        [" ", " ", " ", " "],
        [" ", " ", "0", "0"],
        [" ", " ", " ", "1"],
      ];
      const posConfig = { x: 1, y: 3, x1: 1, y1: 0, grid, sym: "1" };
      const actual = doesContainFlippingChance(posConfig);
      const expected = true;
      assertEquals(actual, expected);
    });
  });

  describe("does position contain space or same symbol : ", () => {
    it("==> 1 : 1 contain same position and symbol : ", () => {
      const grid = [
        [" ", "0", "1", " "],
        [" ", "1", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];
      const actual = isNextPositionSameSym(1, 1, grid, "1");
      const expected = true;
      assertEquals(actual, expected);
    });
  });

  describe("test isValidPosition functionality : ", () => {
    it("==> 0:0 is valid position : ", () => {
      const grid = [
        [" ", "0", "1", " "],
        [" ", "1", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];
      const actual = isValidPosition(0, 0, grid, "1");
      assertEquals(actual, true);
    });

    it("==> provide invalid position : ", () => {
      const grid = [
        [" ", "0", "1", " "],
        [" ", "1", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];
      const actual = isValidPosition(1, 0, grid, "1");
      assertEquals(actual, false);
    });

    it("==> this is valid move : ", () => {
      const grid = [
        [" ", " ", " ", " "],
        [" ", "1", "0", " "],
        [" ", "0", "1", " "],
        [" ", " ", " ", " "],
      ];
      const actual = isValidPosition(2, 0, grid, "1");
      assertEquals(actual, true);
    });
  });

  describe("flipping the symbols : ", () => {
    it("==> flipping the symbols from 0 : 1 to 0:3", () => {
      const grid = [
        [" ", "0", "0", "1"],
        ["0", "1", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];
      const posConfig = { x: 0, y: 0, x1: 0, y1: 1, sym: "1", grid };
      flipSymbols(posConfig);
      const expected = [
        [" ", "1", "1", "1"],
        ["0", "1", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];
      assertEquals(posConfig.grid, expected);
    });
  });

  describe("modify symbols : in possible position", () => {
    it("==> placing the 1 symbol in the position 0 : 0", () => {
      const grid = [
        [" ", "1", "0", "1"],
        ["0", "1", "0", "1"],
        ["0", "0", "0", "1"],
        ["1", " ", "1", "1"],
      ];
      const expected = [
        ["1", "1", "0", "1"],
        ["1", "1", "0", "1"],
        ["1", "0", "0", "1"],
        ["1", " ", "1", "1"],
      ];

      modifySymbols(0, 0, grid, "1");
      assertEquals(grid, expected);
    });

    it("==> placing the symbol 1 in 0 : 0 modifies the position in 1st row and 1st col and diagonal :", () => {
      const grid = [
        [" ", "0", "0", "1"],
        ["0", "0", "0", "1"],
        ["0", "0", "0", "1"],
        ["1", " ", "1", "1"],
      ];
      const expected = [
        ["1", "1", "1", "1"],
        ["1", "1", "0", "1"],
        ["1", "0", "1", "1"],
        ["1", " ", "1", "1"],
      ];

      modifySymbols(0, 0, grid, "1");
      assertEquals(grid, expected);
    });
  });
  describe("checking whether user has chance to play :", () => {
    it("==> user has  chance to play : ", () => {
      const grid = [
        [" ", "0", "0", "1"],
        ["0", "0", "0", "1"],
        ["0", "0", "0", "1"],
        ["1", " ", "1", "1"],
      ];
      const sym = "1";
      const actual = doesPlayerHasChance(sym, grid);
      const expected = true;
      assertEquals(actual, expected);
    });

    it("==> player does not have chance to play : ", () => {
      const grid = [
        ["0", "0", "0", "1"],
        ["0", "0", "0", "1"],
        ["0", "0", "0", "1"],
        ["1", " ", "1", "1"],
      ];
      const sym = "0";
      const actual = doesPlayerHasChance(sym, grid);
      const expected = false;
      assertEquals(actual, expected);
    });
  });

  describe("testing the parser : ", () => {
    it("==> passing the coordinates in the string format : ", () => {
      const coordinates = parse("1 2");
      assertEquals(coordinates, { x: 1, y: 2 });
    });

    it("==> passing the coordinates as 0 : 0", () => {
      const coordinates = parse("0 0");
      assertEquals(coordinates, { x: 0, y: 0 });
    });
  });

  describe("game over condition : ", () => {
    it("==> game is over , all cells are filled with symbols and there is no space :", () => {
      const grid = [
        ["0", "1", "0", "1"],
        ["0", "1", "0", "1"],
        ["0", "0", "0", "1"],
        ["1", "1", "1", "1"],
      ];
      const actual = isGameOver(grid);
      const expected = true;
      assertEquals(actual, expected);
    });

    it("==> game is not completed : ", () => {
      const grid = [
        [" ", "1", "0", "1"],
        ["0", "1", "0", "1"],
        ["0", "0", "0", "1"],
        ["1", "1", "1", "1"],
      ];
      const actual = isGameOver(grid);
      const expected = false;
      assertEquals(actual, expected);
    });
  });

  describe("validation on performing the action :", () => {
    it("==> providing an invalid positions : ", () => {
      const grid = [
        [" ", "0", "0", "1"],
        ["0", "1", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];

      const actual = validateAndPerformOperation(1, 2, grid, "1");
      assertEquals(actual.success, false);
    });

    it("==> positions are valid : modifications has to be done properly :", () => {
      const grid = [
        [" ", "0", "0", "1"],
        ["0", "1", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];
      const actual = validateAndPerformOperation(0, 0, grid, "1");
      assertEquals(actual.success, true);
    });
  });

  describe("checking already occupied or not :", () => {
    it("==> position 0 : 1 is already occupied : ", () => {
      const grid = [
        [" ", "0", "0", "1"],
        ["0", "1", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];

      const actual = doesOccupied(0, 1, grid);
      const expected = true;
      assertEquals(actual, expected);
    });
    it("==> position 0:0 does not occupied :", () => {
      const grid = [
        [" ", "0", "0", "1"],
        ["0", "1", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];
      const actual = doesOccupied(0, 0, grid);
      const expected = false;
      assertEquals(actual, expected);
    });
  });

  describe("highest occurred symbol : ", () => {
    it("==> 1 occurred more times compared to 0:", () => {
      const grid = [
        ["0", "0", "0", "1"],
        ["0", "1", "1", "1"],
        ["0", "1", "1", "1"],
        ["1", "1", "1", "1"],
      ];

      const actual = highestOccurredSymbol(grid, { 1: 0, 0: 0 });
      const expected = "1";
      assertEquals(actual, expected);
    });

    it("==> 0 occurred more times than the 1 :", () => {
      const grid = [
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["0", "1", "1", "1"],
        ["1", "1", "1", "1"],
      ];
      const actual = highestOccurredSymbol(grid, { 1: 0, 0: 0 });
      const expected = "0";
      assertEquals(actual, expected);
    });

    it('==> both occurrences are equal : ', () => {
       const grid = [
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["1", "1", "1", "1"],
        ["1", "1", "1", "1"],
      ];
      const actual = highestOccurredSymbol(grid, { 1: 0, 0: 0 });
      const expected = "equal";
      assertEquals(actual, expected);
    })
  });
});
