import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import {
  createGrid,
  doesContainFlippingChance,
  flipSymbols,
  isNextPositionSameSym,
  isPositionWithinBoundary,
  isValidPosition,
  modifySymbols,
  placeSymbolsIntoGrid,
} from "../src/game.js";

describe("othello game", () => {
  describe("testing the grid create functionality : ", () => {
    it("2:2 grid is creating : ", () => {
      const actual = createGrid(2, 2);
      const expected = [[" ", " "], [" ", " "]];
      assertEquals(actual, expected);
    });
  });

  describe("placing the symbols in the middle : ", () => {
    it("placing the symbols in the middle of the grid : ", () => {
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
    it("valid position : ", () => {
      const actual = isPositionWithinBoundary(1, 1, 4, 4);
      const expected = true;
      assertEquals(actual, expected);
    });

    it("position not within boundary : ", () => {
      const actual = isPositionWithinBoundary(-1, 0, 4, 4);
      const expected = false;
      assertEquals(actual, expected);
    });

    it("invalid position : y value is out of boundary", () => {
      const actual = isPositionWithinBoundary(1, 19, 4, 4);
      const expected = false;
      assertEquals(actual, expected);
    });
  });

  describe("testing the does flipping chance exist or not : ", () => {
    it("yes flipping chance exist : ", () => {
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

    it("does not have the flipping chance : ", () => {
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

    it("it has flipping chance : at 2 : 1", () => {
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

    it("it has flipping chance at 3 : 3", () => {
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
    it("1 : 1 contain same position and symbol : ", () => {
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
    it("0:0 is valid position : ", () => {
      const grid = [
        [" ", "0", "1", " "],
        [" ", "1", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];
      const actual = isValidPosition(0, 0, grid, "1");
      assertEquals(actual, true);
    });

    it("provide invalid position : ", () => {
      const grid = [
        [" ", "0", "1", " "],
        [" ", "1", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", " "],
      ];
      const actual = isValidPosition(1, 0, grid, "1");
      assertEquals(actual, false);
    });
  });

  describe("flipping the symbols : ", () => {
    it("flipping the symbols from 0 : 1 to 0:3", () => {
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
    it("placing the 1 symbol in the position 0 : 0", () => {
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
      assertEquals(grid, expected)
    });
  });
});
