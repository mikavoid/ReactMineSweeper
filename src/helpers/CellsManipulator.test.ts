import { CellState, Field } from "./Field";
import {
  incrementNeighboors,
  getNeighboorsItems,
  checkItemInField,
} from "./CellsManipulator";

const { empty, bomb } = CellState;

describe("Check increment neighboors", () => {
  describe("Simple Cases", () => {
    it("Field with only one item", () => {
      expect(incrementNeighboors([0, 0], [[bomb]])).toStrictEqual([[bomb]]);
    });
    it("Field 2x2 with one mine", () => {
      expect(
        incrementNeighboors(
          [0, 0],
          [
            [bomb, empty],
            [empty, empty],
          ]
        )
      ).toStrictEqual([
        [bomb, 1],
        [1, 1],
      ]);
    });
    it("Field 2x2 with 2 mine", () => {
      expect(
        incrementNeighboors(
          [0, 0],
          [
            [bomb, empty],
            [empty, bomb],
          ]
        )
      ).toStrictEqual([
        [bomb, 1],
        [1, bomb],
      ]);
    });
  });

  describe("3x3 cases", () => {
    it("Field 3x3 with one centered mine", () => {
      expect(
        incrementNeighboors(
          [1, 1],
          [
            [empty, empty, empty],
            [empty, bomb, empty],
            [empty, empty, empty],
          ]
        )
      ).toStrictEqual([
        [1, 1, 1],
        [1, bomb, 1],
        [1, 1, 1],
      ]);
    });
    it("Field 3x3 with 2 mine", () => {
      expect(
        incrementNeighboors(
          [1, 1],
          [
            [empty, 1, bomb],
            [empty, bomb, 1],
            [empty, empty, empty],
          ]
        )
      ).toStrictEqual([
        [1, 2, bomb],
        [1, bomb, 2],
        [1, 1, 1],
      ]);
    });
    it("Field 3x3 as synthetic case with neighboors cells is reached max possible bomb", () => {
      expect(
        incrementNeighboors(
          [1, 1],
          [
            [0, 1, bomb],
            [8, bomb, 1],
            [8, 8, 8],
          ]
        )
      ).toStrictEqual([
        [1, 2, bomb],
        [8, bomb, 2],
        [8, 8, 8],
      ]);
    });
  });

  describe("9x9 cases", () => {
    it("Field 9x9 with 7 mines", () => {
      expect(
        incrementNeighboors(
          [4, 5],
          [
            [9, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 9, 1],
            [0, 0, 1, 9, 1, 0, 2, 2, 2],
            [0, 0, 1, 1, 1, 0, 1, 9, 1],
            [0, 1, 1, 1, 1, 9, 1, 1, 1],
            [0, 1, 9, 2, 1, 1, 0, 0, 0],
            [0, 1, 1, 2, 9, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
          ]
        )
      ).toStrictEqual([
        [9, 1, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 9, 1],
        [0, 0, 1, 9, 1, 0, 2, 2, 2],
        [0, 0, 1, 1, 2, 1, 2, 9, 1],
        [0, 1, 1, 1, 2, 9, 2, 1, 1],
        [0, 1, 9, 2, 2, 2, 1, 0, 0],
        [0, 1, 1, 2, 9, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]);
    });
  });
});

describe("Check neighboors selectors", () => {
  it("With [0, 0] coords", () => {
    expect(getNeighboorsItems([0, 0])).toStrictEqual({
      top: [-1, 0],
      topRight: [-1, 1],
      right: [0, 1],
      rightBottom: [1, 1],
      bottom: [1, 0],
      bottomLeft: [1, -1],
      left: [0, -1],
      leftTop: [-1, -1],
    });
  });
});

describe("CheckItemInField", () => {
  describe("Simple cases", () => {
    const field: Field = [[empty]];
    it("Out of y range", () => {
      expect(checkItemInField([1, 0], field)).toBe(false);
    });
    it("Out of x range", () => {
      expect(checkItemInField([0, 1], field)).toBe(false);
    });
    it("In range", () => {
      expect(checkItemInField([0, 0], field)).toBe(true);
    });
  });

  describe("big field", () => {
    const field: Field = [
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
    ];

    it("Out of x range", () => {
      expect(checkItemInField([5, 0], field)).toBe(false);
    });

    it("Out of x range with negative index", () => {
      expect(checkItemInField([-1, 0], field)).toBe(false);
    });

    it("Out of y range", () => {
      expect(checkItemInField([0, 5], field)).toBe(false);
    });
    it("In range", () => {
      expect(checkItemInField([3, 4], field)).toBe(true);
    });
  });
});
