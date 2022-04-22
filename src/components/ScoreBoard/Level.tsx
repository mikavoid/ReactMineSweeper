import React, { FC } from "react";
import styled from "@emotion/styled";

const Select = styled.select`
  margin: 0;
  height: 2.5vw;
  border-radius: 0;
  border: 0.15vw solid;
  border-color: white #9e9e9e #9e9e9e white;
  background-color: #d1d1d1;
`;

const Option = styled.option`
  font-weight: normal;
  display: block;
  white-space: nowrap;
  min-height: 1.2em;
  padding: 0 0.2vw 0.2vw;
`;

export interface LevelProps {
  /**
   * All levels options
   */
  children: string[];
}

export const Level: FC<LevelProps> = ({ children }) => {
  return (
    <Select>
      {children.map((c, i) => (
        <Option key={i}>{c}</Option>
      ))}
    </Select>
  );
};
