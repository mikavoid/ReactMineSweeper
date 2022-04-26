import React, { ReactNode, FC } from "react";
import styled from "@emotion/styled";

export interface GameOverProps {
  /**
   * Onclick handler
   */
  onClick: () => void;

  isWin: boolean;
}

export const GameOver: FC<GameOverProps> = ({ onClick, isWin = false }) => {
  return <Frame onClick={onClick}>{isWin ? "😍" : "😭"}</Frame>;
};

const Frame = styled.div`
  top: 50%;
  cursor: pointer;
  left: calc(50% - 4vw);
  z-index: 11;
  width: 8vw;
  height: 8vw;
  font-size: 4vw;
  text-align: center;
  position: absolute;
  display: flex;
  background: #ddd;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
