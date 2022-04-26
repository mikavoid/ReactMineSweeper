import { detectSolvedPuzzle } from "./../../helpers/DetectSolvedPuzzle";
import {
  Field,
  Coords,
  emptyFieldGenerator,
  fieldGenerator,
  CellState,
  Cell,
} from "@/helpers/Field";
import { LevelNames, GameLevels, GameSettings } from "./GameSettings";
import { useState, useMemo, useEffect } from "react";
import { openCell } from "@/helpers/openCell";
import { setFlag } from "@/helpers/setFlag";

export enum GameState {
  ONGOING,
  WON,
  LOST,
}
interface ReturnType {
  level: LevelNames;
  gameState: GameState;
  settings: [number, number];
  playerField: Field;
  handleClick: (coords: Coords) => void;
  handleContextMenu: (coords: Coords) => void;
  handleChangeLevel: (e: any) => void;
  handleReset: () => void;
}

export const useGame = (): ReturnType => {
  const [level, setLevel] = useState<LevelNames>(GameLevels[0]);
  const [size, bombs] = GameSettings[level];
  const [reset, setReset] = useState(0);
  const [gameState, setGameState] = useState(GameState.ONGOING);

  let initialPlayerField: Field = emptyFieldGenerator(size, CellState.hidden);
  const [playerField, setPlayerField] = useState<Field>(initialPlayerField);
  let gameField: Field = useMemo(
    () => fieldGenerator(size, bombs / (size * size)),
    [size, bombs, reset]
  );

  const handleClick = (coords: Coords) => {
    if (gameState !== GameState.ONGOING) return;
    try {
      const newPlayerField = openCell(coords, playerField, gameField);
      setPlayerField([...newPlayerField]);
    } catch (e) {
      setPlayerField([...gameField]);
      setGameState(GameState.LOST);
    }
  };

  const createNewPlayerField = (level: LevelNames) => {
    const [size] = GameSettings[level];
    const newPlayerField = emptyFieldGenerator(size, CellState.hidden);
    setPlayerField([...newPlayerField]);
  };

  const handleChangeLevel = ({ target: { value: level = GameLevels[0] } }) => {
    setLevel(level);
    createNewPlayerField(level);
  };

  const handleReset = () => {
    setReset(reset + 1);
    setGameState(GameState.ONGOING);
    createNewPlayerField(level);
  };

  const handleContextMenu = (coords: Coords) => {
    if (gameState !== GameState.ONGOING) return;

    const newPlayerField = setFlag(coords, playerField, gameField);
    setPlayerField([...newPlayerField]);
  };

  useEffect(() => {
    const [isSolved] = detectSolvedPuzzle(playerField, gameField);
    if (isSolved) {
      setPlayerField([...gameField]);
      setGameState(GameState.WON);
    }
  }, [playerField]);

  return {
    level,
    gameState,
    settings: GameSettings[level],
    playerField,
    handleClick,
    handleChangeLevel,
    handleContextMenu,
    handleReset,
  };
};
