import { Field, CellState, Cell } from "@/helpers/Field";

const { empty: e, bomb: b, hidden: h, mark: m, weakMark: w } = CellState;

export const detectSolvedPuzzle = (
  playerField: Field,
  gameField: Field
): [boolean, number] => {
  let matching: number = 0;
  const flattenPlayerField = playerField.flat();
  const flattenGameField = gameField.flat();

  const nbHidden = flattenPlayerField.filter((cell: Cell) => cell === h).length;
  const nbBombs = flattenGameField.filter((cell: Cell) => cell === b).length;
  const nbFlags = flattenPlayerField.filter(
    (cell: Cell) => cell === m || cell === w
  ).length;

  for (let i = 0; i < flattenGameField.length; i++) {
    if (flattenPlayerField[i] === m && flattenGameField[i] === b) {
      matching++;
    }
  }
  return [matching === nbBombs && nbHidden === 0, nbFlags];
};
