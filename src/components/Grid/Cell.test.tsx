import React from "react";
import { render, screen, fireEvent, createEvent } from "@testing-library/react";

import { CellState, Coords } from "@/helpers/Field";

import { Cell, checkCellIsActive } from "./Cell";

describe("Cell component check", () => {
  const coords: Coords = [1, 1];

  for (let cell = CellState.empty; cell <= CellState.weakMark; cell++) {
    it(`Check preventDefault contextMenu for cell of type ${cell}`, () => {
      const props = {
        coords,
        onClick: jest.fn(),
        onContextMenu: jest.fn(),
      };

      render(<Cell {...props}>{cell}</Cell>);

      const cellComp = screen.getByTestId(`${cell}_${coords}`);

      const contextMenuEvent = createEvent.contextMenu(cellComp);
      fireEvent(cellComp, contextMenuEvent);

      expect(contextMenuEvent.defaultPrevented).toBe(true);
    });

    it("onClick and onContextMenu handler should be called for active cells", () => {
      const props = {
        coords,
        onClick: jest.fn(),
        onContextMenu: jest.fn(),
      };

      render(<Cell {...props}>{cell}</Cell>);

      const cellComp = screen.getByTestId(`${cell}_${coords}`);

      fireEvent.click(cellComp);
      if (checkCellIsActive(cell)) {
        expect(props.onClick).toHaveBeenCalled();
      } else {
        expect(props.onClick).not.toHaveBeenCalled();
      }

      fireEvent.contextMenu(cellComp);
      if (checkCellIsActive(cell)) {
        expect(props.onContextMenu).toHaveBeenCalled();
      } else {
        expect(props.onContextMenu).not.toHaveBeenCalled();
      }
    });
  }
});
