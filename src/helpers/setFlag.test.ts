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

      expect(setFlag([0, 0], playerField, gameField)).toStrictEqual([
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

      expect(setFlag([0, 0], playerField, gameField)).toStrictEqual([
        [m, h, h],
        [h, h, h],
        [h, h, h],
      ]);

      expect(setFlag([0, 0], playerField, gameField)).toStrictEqual([
        [w, h, h],
        [h, h, h],
        [h, h, h],
      ]);
      expect(setFlag([0, 0], playerField, gameField)).toStrictEqual([
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ]);
    });
  });
});
