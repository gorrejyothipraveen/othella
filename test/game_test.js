import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import {
  createGrid,
  isPositionWithinBoundary,
  placeSymbolsIntoGrid,
} from "../src/game.js";

describe("othella game", () => {
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
});
