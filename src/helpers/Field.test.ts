import { emptyFieldGenerator, fieldGenerator, CellState } from "./Field";

const { empty, bomb, hidden } = CellState;

describe("FieldGenerator", () => {
  describe("Empty FieldGenerator", () => {
    it("2x2", () => {
      expect(emptyFieldGenerator(2)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ]);
    });
    it("3x3", () => {
      expect(emptyFieldGenerator(3)).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ]);
    });
    it("3x3 with hidden state", () => {
      expect(emptyFieldGenerator(3, hidden)).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
      ]);
    });
  });

  describe("Simple cases", () => {
    it("Wrong density", () => {
      const errorText = "Probability must be between 0 and 1";
      expect(() => fieldGenerator(1, -1)).toThrow(errorText);
      expect(() => fieldGenerator(1, 2)).toThrow(errorText);
    });

    it("Smallest possible field without mines", () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
    });

    it("Big field without mines", () => {
      expect(fieldGenerator(10, 0)).toStrictEqual([
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
      ]);
    });

    it("Smallest possible field with mines", () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
    });

    it("2x2 field with mines", () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ]);
    });

    it("2x2 field with 50% probability", () => {
      const size = 2;
      const probability = 0.5;
      const field = fieldGenerator(size, probability);
      const flatField = field.flat();

      const cellsWithBombs = flatField.filter((cell) => cell === bomb);

      expect(cellsWithBombs).toHaveLength(size * size * probability);
    });

    it("Real game field size = 10x10 with 25% mines ish", () => {
      const size = 10;
      const mines = 25;

      const probability = mines / (size * size);
      const field = fieldGenerator(size, probability);

      console.table(field);

      const flatField = field.flat();
      expect(flatField.filter((x) => x === bomb)).toHaveLength(25);
    });
  });
});
