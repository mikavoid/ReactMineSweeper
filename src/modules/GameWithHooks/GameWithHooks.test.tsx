import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GameWithHooks } from "./GameWithHooks";
import { CellState } from "@/helpers/Field";

const mockHandleClick = jest.fn();
const mockHandleChangeLevel = jest.fn();
const mockHandleReset = jest.fn();
const mockHandleContextMenu = jest.fn();

jest.mock("./useGame", () => ({
  _esModule: true,
  useGame: () => ({
    level: "beginner",
    gameState: 2, // LOST
    settings: [9, 10],
    playerField: [
      [h, h],
      [h, h],
    ],
    handleClick: mockHandleClick,
    handleChangeLevel: mockHandleChangeLevel,
    handleReset: mockHandleReset,
    handleContextMenu: mockHandleContextMenu,
  }),
}));

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

jest.mock("@/helpers/Field");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GameWithHooks test cases", () => {
  it("Render game field by default", () => {
    render(<GameWithHooks />);

    expect(screen.getAllByRole("cell")).toHaveLength(4);
  });

  it("Cell click works fine", () => {
    render(<GameWithHooks />);

    userEvent.click(screen.getByTestId("0,0"));
    expect(mockHandleClick).toHaveBeenCalled();
  });

  it("Context menu handler on a cell works fine", () => {
    render(<GameWithHooks />);

    userEvent.click(screen.getByTestId("0,0"), { button: 2 });
    expect(mockHandleContextMenu).toHaveBeenCalled();
  });
  it("Reset handler works fine", () => {
    render(<GameWithHooks />);

    userEvent.click(screen.getByRole("button"));
    expect(mockHandleReset).toHaveBeenCalled();
  });
  it("Change level works fine", () => {
    render(<GameWithHooks />);

    userEvent.selectOptions(screen.getByRole("combobox"), "intermediate");
    expect(mockHandleChangeLevel).toHaveBeenCalled();
  });
  it("Game over reset the game state", () => {
    render(<GameWithHooks />);

    userEvent.click(screen.getByText("😭"));
    expect(mockHandleReset).toHaveBeenCalled();
  });
});
