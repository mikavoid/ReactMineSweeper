import { openCell } from "./openCell";
import { Field, CellState } from "./Field";

const { empty: e, bomb: b, hidden: h } = CellState;
describe("Open cell action", () => {
  describe("Simple cases with loose", () => {
    it("Open cell with the bomb", () => {
      const playerField: Field = [
        [h, h],
        [h, h],
      ];
      const gameField: Field = [
        [1, 1],
        [1, b],
      ];

      expect(() => openCell([1, 1], playerField, gameField)).toThrow(
        "Game Over"
      );
    });
  });
  describe("Open cell with number", () => {
    it("Open cell with state = 1", () => {
      const playerField: Field = [
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ];
      const gameField: Field = [
        [1, 1, 0],
        [b, 1, 0],
        [1, 1, 0],
      ];

      const newPlayerField = openCell([1, 1], playerField, gameField);

      expect(newPlayerField).toStrictEqual([
        [h, h, h],
        [h, 1, h],
        [h, h, h],
      ]);
    });
    it("Open cell with state = 3", () => {
      const playerField: Field = [
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ];
      const gameField: Field = [
        [b, 2, 0],
        [b, 3, 0],
        [b, 2, 0],
      ];

      const newPlayerField = openCell([1, 1], playerField, gameField);

      expect(newPlayerField).toStrictEqual([
        [h, h, h],
        [h, 3, h],
        [h, h, h],
      ]);
    });
  });

  describe("Open empty cell", () => {
    it("Open empty cell simple 3x3 case cell", () => {
      const playerField: Field = [
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ];
      const gameField: Field = [
        [1, 1, 0],
        [b, 1, 0],
        [1, 1, 0],
      ];

      const newPlayerField = openCell([1, 2], playerField, gameField);

      expect(newPlayerField).toStrictEqual([
        [h, 1, 0],
        [h, 1, 0],
        [h, 1, 0],
      ]);
    });
    it("Open empty cell simple 3x3 case cell", () => {
      const playerField: Field = [
        [h, h, h, h, h],
        [h, h, h, h, h],
        [h, h, h, h, h],
        [h, h, h, h, h],
        [h, h, h, h, h],
      ];
      const gameField: Field = [
        [b, b, 2, 1, 2],
        [b, b, 2, 0, 0],
        [2, 2, 0, 1, 1],
        [1, 0, 0, 1, 9],
        [2, 1, 0, 1, 0],
      ];

      const newPlayerField = openCell([2, 2], playerField, gameField);

      expect(newPlayerField).toStrictEqual([
        [h, h, 2, 1, 2],
        [h, h, 2, 0, 0],
        [2, 2, 0, 1, 1],
        [1, 0, 0, 1, h],
        [2, 1, 0, 1, h],
      ]);
    });
  });
});
