import { getNeighboorsItems, checkItemInField } from "./CellsManipulator";

import { Coords, CellState, Field } from "@/helpers/Field";
import { detectSolvedPuzzle } from "./DetectSolvedPuzzle";

export const setFlag = (
  [y, x]: Coords,
  playerField: Field,
  gameField: Field,
  prevFlagCounter: number,
  bombs: number
): [Field, boolean, number] => {
  const cell = playerField[y][x];
  const { hidden, mark, weakMark } = CellState;

  switch (cell) {
    case mark:
      playerField[y][x] = weakMark;
      break;
    case weakMark:
      playerField[y][x] = hidden;
      break;
    case hidden:
      if (prevFlagCounter < bombs) {
        playerField[y][x] = mark;
      }
      break;
  }

  const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);

  return [playerField, isSolved, flagCounter];
};
