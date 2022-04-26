import { getNeighboorsItems, checkItemInField } from "./CellsManipulator";

import { Coords, CellState, Field } from "@/helpers/Field";

export const openCell = (
  [y, x]: Coords,
  playerField: Field,
  gameField: Field
) => {
  const gameCell = gameField[y][x];

  if (gameCell === CellState.bomb) {
    throw new Error("Game Over");
  }

  if (gameCell === CellState.empty) {
    playerField[y][x] = gameCell;

    const items = getNeighboorsItems([y, x]);

    for (const coords of Object.values(items)) {
      if (checkItemInField(coords, gameField)) {
        const [y, x] = coords;
        const gameCell = gameField[y][x];
        const playerCell = playerField[y][x];

        if (gameCell === CellState.empty && playerCell === CellState.hidden) {
          // result[y][x] = gameField[y][x];
          // emptyCells.push(coords);
          playerField = openCell(coords, playerField, gameField);
        }

        if (gameCell < CellState.bomb) {
          playerField[y][x] = gameCell;
        }
      }
    }
  }

  playerField[y][x] = gameCell;

  return playerField;
};
