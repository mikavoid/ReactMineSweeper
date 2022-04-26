import React, { FC, SyntheticEvent, useState } from "react";
import styled from "@emotion/styled";
import { Counter } from "./Counter";
import { Level } from "./Level";
import { Reset } from "./Reset";

const Wrapper = styled.div`
  display: flex;
  width: max-content;
  padding-bottom: 2vw;
  justify-content: space-between;
`;

export interface ScoreBoardProps {
  /**
   * Timer
   */
  time: string;

  /**
   * Possible game scenarios
   */
  levels: string[];

  /**
   * Action handler when the GameReset button is clicked
   */
  onReset: () => void;

  /**
   * Number of bombs in the field
   */
  mines: string;
  /**
   * Called when a new level is selected
   */
  onLevelChange: (e: any) => void;
}

export const ScoreBoard: FC<ScoreBoardProps> = ({
  time = "010",
  mines = "010",
  levels = [],
  onReset,
  onLevelChange,
}) => {
  return (
    <Wrapper>
      <Counter>{time}</Counter>
      <Level onChange={onLevelChange}>{levels}</Level>
      <Reset onReset={onReset} />
      <Counter>{mines}</Counter>
    </Wrapper>
  );
};
