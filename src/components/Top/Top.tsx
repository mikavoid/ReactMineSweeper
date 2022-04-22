import React, { FC } from "react";
import styled from "@emotion/styled";

import { Legend, LegendProps } from "./Legend/Legend";
import { GameName, GameNameProps } from "./GameName/GameName";

const Header = styled.header`
  text-align: center;
  position: relative;
  display: inline-block;
`;

export const Top: FC<LegendProps & GameNameProps> = ({
  children,
  ...otherProps
}) => {
  return (
    <Header>
      <GameName>{children}</GameName>
      <Legend {...otherProps} />
    </Header>
  );
};
