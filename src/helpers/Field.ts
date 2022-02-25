export type Cell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Field = Cell[][];
export type Coord = [number, number];

export const CellState: Record<string, Cell> = {
  empty: 1,
  bomb: 9,
  hidden: 10,
  mark: 11,
  weakMark: 12,
};
