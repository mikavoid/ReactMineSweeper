import React from "react";
import { Meta, Story } from "@storybook/react";

import { Level, LevelProps } from "./Level";

export default {
  title: "ScoreBoard/Level",
  component: Level,
} as Meta;

const Template: Story<LevelProps> = (args) => <Level {...args} />;
export const ScoreCounter = Template.bind({});
ScoreCounter.args = {
  children: ["beginner", "intermediate", "expert"],
};
