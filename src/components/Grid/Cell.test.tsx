import React from "react";
import { render, screen, fireEvent, createEvent } from "@testing-library/react";

import { CellState, Coords } from "@/helpers/Field";

import { Cell, checkCellIsActive, ClosedFrame } from "./Cell";

describe("Cell component check", () => {
  const coords: Coords = [1, 1];

  for (let cell = CellState.empty; cell <= CellState.weakMark; cell++) {
    it("Cell renders correctly", () => {
      const props = {
        coords,
        onClick: jest.fn(),
        onContextMenu: jest.fn(),
      };

      const { asFragment } = render(<Cell {...props}>{cell}</Cell>);
      expect(asFragment()).toMatchSnapshot();
    });

    it("Closed Frame renders correctly", () => {
      const { asFragment } = render(<ClosedFrame mouseDown={true} />);
      expect(asFragment()).toMatchSnapshot();
    });
    it(`Check preventDefault contextMenu for cell of type ${cell}`, () => {
      const props = {
        coords,
        onClick: jest.fn(),
        onContextMenu: jest.fn(),
      };

      render(<Cell {...props}>{cell}</Cell>);

      const cellComp = screen.getByTestId(`${coords}`);

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

      const cellComp = screen.getByTestId(`${coords}`);

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
