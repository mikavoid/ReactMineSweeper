import React, { FC } from "react";
import styled from "@emotion/styled";

export interface LegendProps {
  /**
   * feature that should be activated after first + second actions
   */
  feature?: string;
  /**
   * First action
   */
  firstAction?: string;
  /**
   * Second action
   */
  secondAction?: string;
}

const Parent = styled.div`
  font-size: 1em;
  margin: 0 auto 2vw;
  line-height: 1.25em;
`;

const FlagComboParent = styled.code`
  background-color: #e3e3e3;
`;

const FirstAction = styled.span`
  color: #ec433c;
`;

const SecondAction = styled.span`
  color: #2a48ec;
`;

export const Legend: FC<LegendProps> = ({
  feature = "Flag",
  firstAction = "Ctrl",
  secondAction = "Click",
}: LegendProps) => {
  return (
    <Parent>
      <strong>{feature}: </strong>
      <FlagComboParent>
        <FirstAction>{firstAction}</FirstAction> +{" "}
        <SecondAction>{secondAction}</SecondAction>
      </FlagComboParent>
    </Parent>
  );
};
