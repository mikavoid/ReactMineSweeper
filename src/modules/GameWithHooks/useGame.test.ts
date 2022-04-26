import { CellState } from "./../../helpers/Field";
import { renderHook, act } from "@testing-library/react-hooks";
import { Field, Cell } from "@/helpers/Field";
import { GameState, useGame } from "./useGame";

jest.mock("@/helpers/Field");

const { empty: e, hidden: h } = CellState;
const flatWithFilter = (field: Field, cond: number) => {
  return field.flat().filter((v: Cell) => v === cond);
};
describe("useGame hook", () => {
  describe("Render behaviour", () => {
    it("Render game field by default", () => {
      const { result } = renderHook(useGame);

      const { playerField, level, gameState, settings } = result.current;

      expect({ level, gameState, settings }).toStrictEqual({
        level: "beginner",
        gameState: GameState.ONGOING,
        settings: [9, 10],
      });

      expect(playerField).toHaveLength(9);
      expect(playerField.flat()).toHaveLength(81);
    });

    it("onChange game level handler", () => {
      const { result } = renderHook(useGame);

      const { playerField, handleChangeLevel } = result.current;

      expect(playerField).toHaveLength(9);

      // intermediate
      act(() => handleChangeLevel({ target: { value: "intermediate" } }));
      const { playerField: intermediatePlayerField } = result.current;
      expect(intermediatePlayerField).toHaveLength(16);

      // expert
      act(() => handleChangeLevel({ target: { value: "expert" } }));
      const { playerField: expertPlayerField } = result.current;
      expect(expertPlayerField).toHaveLength(22);
    });
  });

  describe("Open cell test cases", () => {
    it("Open empty cell on the beginner level", () => {
      const { result } = renderHook(useGame);

      const { playerField, handleClick } = result.current;

      expect(flatWithFilter(playerField, h)).toHaveLength(81);
      expect(flatWithFilter(playerField, e)).toHaveLength(0);
      act(() => {
        handleClick([0, 0]);
      });
      const { playerField: openedPlayerField } = result.current;
      expect(flatWithFilter(openedPlayerField, h)).toHaveLength(81 - 6);
      expect(flatWithFilter(openedPlayerField, e)).toHaveLength(2);
      expect(flatWithFilter(openedPlayerField, 1)).toHaveLength(4);
    });
  });

  it("Check click to the cell when level is changed", () => {
    const { result } = renderHook(useGame);

    const { playerField, handleChangeLevel } = result.current;

    expect(flatWithFilter(playerField, h)).toHaveLength(81);
    expect(flatWithFilter(playerField, e)).toHaveLength(0);

    act(() => handleChangeLevel({ target: { value: "intermediate" } }));

    const { playerField: intermediateField, handleClick } = result.current;
    expect(flatWithFilter(intermediateField, h)).toHaveLength(256);

    act(() => {
      handleClick([0, 0]);
    });

    const { playerField: openedIntermediateField } = result.current;
    expect(flatWithFilter(openedIntermediateField, h)).toHaveLength(250);
    expect(flatWithFilter(openedIntermediateField, e)).toHaveLength(2);
    expect(flatWithFilter(openedIntermediateField, 1)).toHaveLength(4);
  });

  it("onReset game handler", () => {
    const { result } = renderHook(useGame);

    const { playerField, handleClick } = result.current;

    expect(flatWithFilter(playerField, h)).toHaveLength(81);
    expect(flatWithFilter(playerField, e)).toHaveLength(0);

    act(() => {
      handleClick([0, 0]);
    });

    expect(flatWithFilter(result.current.playerField, h)).toHaveLength(81 - 6);

    act(() => {
      result.current.handleReset();
    });

    expect(flatWithFilter(result.current.playerField, h)).toHaveLength(81);
  });

  describe("Game over behavior", () => {
    it("Player loose the game", () => {
      const { result } = renderHook(useGame);

      const { playerField, handleClick } = result.current;

      expect(flatWithFilter(playerField, h)).toHaveLength(81);
      expect(flatWithFilter(playerField, e)).toHaveLength(0);

      act(() => {
        handleClick([0, 2]);
      });

      expect(result.current.gameState).toStrictEqual(GameState.LOST);
    });
  });
});
