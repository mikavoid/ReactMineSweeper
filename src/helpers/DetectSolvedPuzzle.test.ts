import { detectSolvedPuzzle } from "./DetectSolvedPuzzle";
import { Field, CellState } from "./Field";

const { empty: e, bomb: b, hidden: h, mark: m } = CellState;

describe("Detect Solved Puzzle", () => {
  it("Simplest 3x3 case", () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const playerField: Field = [
      [1, 1, e],
      [m, 1, e],
      [1, 1, e],
    ];

    const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);
    expect(flagCounter).toBe(1);
    expect(isSolved).toBe(true);
  });

  it("Wrong 3x3 hidden cells case", () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const playerField: Field = [
      [1, 1, h],
      [h, 1, h],
      [1, 1, h],
    ];

    const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);
    expect(flagCounter).toBe(0);
    expect(isSolved).toBe(false);
  });

  it("Wrong 3x3 hidden cells case", () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const playerField: Field = [
      [1, h, e],
      [m, 1, e],
      [1, 1, e],
    ];

    const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);
    expect(flagCounter).toBe(1);
    expect(isSolved).toBe(false);
  });
});
