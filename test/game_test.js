import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { createGrid, placeSymbolsIntoGrid } from "../src/game.js";

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
      const actual = placeSymbolsIntoGrid(grid, '1', '0');
      const expected = [
        [" ", " ", " ", " "],
        [" ", "1", "0", " "],
        [" ", "0", "1", " "],
        [" ", " ", " ", " "],
      ];
      assertEquals(actual, expected);
    });
  });

});
