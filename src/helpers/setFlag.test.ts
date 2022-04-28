import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setFlag } from "./setFlag";
import { Field, CellState } from "./Field";

const { empty: e, bomb: b, hidden: h, mark: m, weakMark: w } = CellState;

describe("setFlag action", () => {
  describe("Set flag to the cell check", () => {
    it("Set flag to the non hidden cell should be ignored", () => {
      const gameField: Field = [
        [1, 1, e],
        [b, 1, e],
        [1, 1, e],
      ];

      const playerField: Field = [
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ];

      expect(setFlag([0, 0], playerField, gameField, 0, 1)[0]).toStrictEqual([
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ]);
    });
    it("Set flag simple 3x3 case", () => {
      const gameField: Field = [
        [1, 1, e],
        [b, 1, e],
        [1, 1, e],
      ];

      const playerField: Field = [
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ];

      expect(setFlag([0, 0], playerField, gameField, 0, 1)[0]).toStrictEqual([
        [m, h, h],
        [h, h, h],
        [h, h, h],
      ]);

      expect(setFlag([0, 0], playerField, gameField, 0, 1)[0]).toStrictEqual([
        [w, h, h],
        [h, h, h],
        [h, h, h],
      ]);
      expect(setFlag([0, 0], playerField, gameField, 0, 1)[0]).toStrictEqual([
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ]);
    });
  });
  describe("Detect win state", () => {
    it("5x5 solved case", () => {
      const [playerField, isSolved, flagCounter] = setFlag(
        [1, 0],
        [
          [m, m, 1, 1, 2],
          [h, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [1, 0, 0, 1, m],
          [2, 1, 0, 1, 0],
        ],
        [
          [9, 9, 1, 1, 2],
          [9, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [1, 0, 0, 1, 9],
          [2, 1, 0, 1, 0],
        ],
        3,
        5
      );

      expect(flagCounter).toBe(4);
      expect(isSolved).toBe(true);
      expect(playerField).toStrictEqual([
        [m, m, 1, 1, 2],
        [m, 3, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 0, 0, 1, m],
        [2, 1, 0, 1, 0],
      ]);
    });
  });

  describe("Restrict flagCounter by the number of bombs on the field", () => {
    it("Restriction on 3x3 field", () => {
      const gameField: Field = [
        [1, 1, e],
        [b, b, b],
        [1, 1, e],
      ];

      const playerField: Field = [
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ];

      expect(setFlag([0, 0], playerField, gameField, 0, 3)[0]).toStrictEqual([
        [m, h, h],
        [h, h, h],
        [h, h, h],
      ]);
      expect(setFlag([0, 1], playerField, gameField, 1, 3)[0]).toStrictEqual([
        [m, m, h],
        [h, h, h],
        [h, h, h],
      ]);

      expect(setFlag([0, 2], playerField, gameField, 2, 3)[0]).toStrictEqual([
        [m, m, m],
        [h, h, h],
        [h, h, h],
      ]);

      expect(setFlag([1, 0], playerField, gameField, 3, 3)[0]).toStrictEqual([
        [m, m, m],
        [h, h, h],
        [h, h, h],
      ]);
    });
    it("Still can switch to weak mark", () => {
      const gameField: Field = [
        [1, 1, e],
        [b, b, b],
        [1, 1, e],
      ];

      const playerField: Field = [
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ];

      expect(setFlag([0, 0], playerField, gameField, 0, 3)[0]).toStrictEqual([
        [m, h, h],
        [h, h, h],
        [h, h, h],
      ]);
      expect(setFlag([0, 1], playerField, gameField, 1, 3)[0]).toStrictEqual([
        [m, m, h],
        [h, h, h],
        [h, h, h],
      ]);

      expect(setFlag([0, 2], playerField, gameField, 2, 3)[0]).toStrictEqual([
        [m, m, m],
        [h, h, h],
        [h, h, h],
      ]);

      expect(setFlag([1, 0], playerField, gameField, 3, 3)[0]).toStrictEqual([
        [m, m, m],
        [h, h, h],
        [h, h, h],
      ]);

      expect(setFlag([0, 0], playerField, gameField, 3, 3)[0]).toStrictEqual([
        [w, m, m],
        [h, h, h],
        [h, h, h],
      ]);

      expect(setFlag([0, 1], playerField, gameField, 3, 3)[0]).toStrictEqual([
        [w, w, m],
        [h, h, h],
        [h, h, h],
      ]);

      expect(setFlag([0, 2], playerField, gameField, 3, 3)[0]).toStrictEqual([
        [w, w, w],
        [h, h, h],
        [h, h, h],
      ]);
    });
  });
});
