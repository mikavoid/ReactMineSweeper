import React from "react";
import { Meta, Story } from "@storybook/react";

import { ScoreBoard, ScoreBoardProps } from "./ScoreBoard";

export default {
  title: "ScoreBoard/ScoreBoard",
  component: ScoreBoard,
} as Meta;

const Template: Story<ScoreBoardProps> = (args) => <ScoreBoard {...args} />;
export const ScoreBoardMain = Template.bind({});
ScoreBoardMain.args = {
  time: "000",
  mines: "042",
  levels: ["beginner", "intermediate", "expert"],
};
