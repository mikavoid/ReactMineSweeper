import React, { FC, useState } from "react";

import { Top } from "@/components/Top";
import { ScoreBoard } from "@/components/ScoreBoard";
import { Wrapper } from "@/components/Game/Wrapper";
import { GameArea } from "@/components/Game/GameArea";
import { Grid } from "@/components/Grid/Grid";
import { GameOver } from "@/components/Game/GameOver";
import { GameLevels } from "./GameSettings";
import { useGame } from "./useGame";

enum GameState {
  ONGOING,
  WON,
  LOST,
}

export const GameWithHooks: FC = () => {
  const {
    playerField,
    gameState,
    handleChangeLevel,
    handleContextMenu,
    handleReset,
    handleClick,
    settings,
    timer,
  } = useGame();

  return (
    <Wrapper>
      <Top>Super Démineur</Top>
      <GameArea>
        <ScoreBoard
          time={String(timer)}
          mines={String(settings[1])}
          levels={GameLevels as unknown as string[]}
          onLevelChange={handleChangeLevel}
          onReset={handleReset}
        />
        {gameState !== GameState.ONGOING && (
          <GameOver onClick={handleReset} isWin={gameState === GameState.WON} />
        )}
        <Grid onClick={handleClick} onContextMenu={handleContextMenu}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  );
};
