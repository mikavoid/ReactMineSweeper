import { getNeighboorsItems, checkItemInField } from "./CellsManipulator";

import { Coords, CellState, Field } from "@/helpers/Field";

export const setFlag = (
  [y, x]: Coords,
  playerField: Field,
  gameField: Field
) => {
  const cell = playerField[y][x];
  const { hidden, mark, weakMark } = CellState;
  console.log("cell", cell);
  switch (cell) {
    case mark:
      playerField[y][x] = weakMark;
      break;
    case weakMark:
      playerField[y][x] = hidden;
      break;
    case hidden:
      playerField[y][x] = mark;
      break;
    default:
      return playerField;
  }

  return playerField;
};
