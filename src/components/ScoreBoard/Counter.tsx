import React, { FC } from "react";
import styled from "@emotion/styled";

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

export interface CounterProps {
  /**
   * Number in the counter
   */
  children?: string | number;
}

export const Counter: FC<CounterProps> = ({ children }) => {
  return <Frame>{children}</Frame>;
};
