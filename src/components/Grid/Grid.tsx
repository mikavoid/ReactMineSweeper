import React, { FC } from "react";
import styled from "@emotion/styled";

import { Coords, Field } from "@/helpers/Field";
import { Cell } from "./Cell";

const Frame = styled.div`
  display: inline-block;
  padding: 0 0.3vw;
  color: #ec433c;
  border: 0.15vw inset #ec433c;
  line-height: 2vw;
  letter-spacing: 0.08em;
  background: #333;
  text-shadow: 0 0 0.1vw #ec433c;
`;

export interface GridProps {
  /**
   * Field data
   */
  children: Field;

  /**
   * onClick handler
   */
  onClick: (coords: Coords) => void;

  /**
   * onContextMenu handler
   */
  onContextMenu: (coords: Coords) => void;
}

interface WrapperProps {
  size: number;
}

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  width: max-content;
  padding: 1vw;
  grid-template-columns: repeat(${({ size }) => size}, auto);
`;

export const Grid: FC<GridProps> = ({ children, onClick, onContextMenu }) => {
  return (
    <Wrapper size={children.length}>
      {children.map((row, y) => {
        return row.map((cell, x) => {
          return (
            <Cell
              key={`${y}_${x}_${cell}`}
              coords={[y, x]}
              onClick={onClick}
              onContextMenu={onContextMenu}
            >
              {cell}
            </Cell>
          );
        });
      })}
    </Wrapper>
  );
};
