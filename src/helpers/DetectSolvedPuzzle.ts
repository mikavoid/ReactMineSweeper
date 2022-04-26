import { Field, CellState, Cell } from "@/helpers/Field";

const { empty: e, bomb: b, hidden: h, mark: m } = CellState;

export type FlagCounter = number;
export const detectSolvedPuzzle = (
  playerField: Field,
  gameField: Field
): [boolean, number] => {
  let flagCounter: FlagCounter = 0;
  const flattenPlayerField = playerField.flat();
  const flattenGameField = gameField.flat();

  const nbHidden = flattenPlayerField.filter(
    (cell: Cell) => cell === h
  )?.length;
  const nbBombs = flattenGameField.filter((cell: Cell) => cell === b)?.length;

  for (let i = 0; i < flattenGameField.length; i++) {
    if (flattenPlayerField[i] === m && flattenGameField[i] === b) {
      flagCounter++;
    }
  }
  return [flagCounter === nbBombs && nbHidden === 0, flagCounter];
};
