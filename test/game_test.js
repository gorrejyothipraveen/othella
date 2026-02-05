import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { createGrid } from "../src/game.js";

describe("othella game", () => {
  describe("testing the grid create functionality : ", () => {
    it("2:2 grid is creating : ", () => {
      const actual = createGrid(2, 2);
      const expected = [["", ""], ["", ""]];
      assertEquals(actual, expected);
    });
  });
});
