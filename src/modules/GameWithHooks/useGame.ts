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
  timer: number;
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
  const [timer, setTimer] = useState(0);
  const [gameIsStarted, setGameIsStarted] = useState(false);

  let initialPlayerField: Field = emptyFieldGenerator(size, CellState.hidden);
  const [playerField, setPlayerField] = useState<Field>(initialPlayerField);
  let gameField: Field = useMemo(
    () => fieldGenerator(size, bombs / (size * size)),
    [size, bombs, reset]
  );

  useEffect(() => {
    let it: any = null;
    if (gameIsStarted) {
      it = setInterval(() => {
        setTimer(timer + 1);
      }, 1000);

      if (gameState === GameState.LOST || gameState === GameState.WON)
        clearInterval(it);
    }

    return () => {
      clearInterval(it);
    };
  }, [gameIsStarted, gameState, timer]);

  const handleClick = (coords: Coords) => {
    if (!gameIsStarted) setGameIsStarted(true);
    if (gameState !== GameState.ONGOING) return;
    try {
      const newPlayerField = openCell(coords, playerField, gameField);
      setPlayerField([...newPlayerField]);
      setGameIsStarted(true);
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
    if (!gameIsStarted) setGameIsStarted(true);
    if (gameState !== GameState.ONGOING) return;
    const newPlayerField = setFlag(coords, playerField, gameField);
    setPlayerField([...newPlayerField]);
  };

  useEffect(() => {
    const [isSolved] = detectSolvedPuzzle(playerField, gameField);
    if (isSolved) {
      setPlayerField([...gameField]);
      setGameState(GameState.WON);
      setGameIsStarted(false);
    }
  }, [playerField]);

  return {
    level,
    gameState,
    settings: GameSettings[level],
    playerField,
    timer,
    handleClick,
    handleChangeLevel,
    handleContextMenu,
    handleReset,
  };
};
