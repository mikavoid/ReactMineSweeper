import { Cell, Coords, Field } from "./Field";

export const incrementNeighboors = (coords: Coords, field: Field): Field => {
  const items = getNeighboorsItems(coords);

  console.log(Object.values(items));

  for (const item of Object.values(items)) {
    if (checkItemInField(item, field)) {
      const [y, x] = item;
      const cell = field[y][x];

      if (cell < 8) {
        field[y][x] = (cell + 1) as Cell;
      }
    }
  }
  return field;
};

export const getNeighboorsItems = (coords: Coords): Record<string, Coords> => {
  const [y, x] = coords;

  return {
    top: [y - 1, x],
    topRight: [y - 1, x + 1],
    right: [y, x + 1],
    rightBottom: [y + 1, x + 1],
    bottom: [y + 1, x],
    bottomLeft: [y + 1, x - 1],
    left: [y, x - 1],
    leftTop: [y - 1, x - 1],
  };
};

export const checkItemInField = ([y, x]: Coords, field: Field) => {
  return field?.[y]?.[x] !== undefined;
};
