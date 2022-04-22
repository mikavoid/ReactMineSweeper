import React from "react";
import { Story, Meta } from "@storybook/react";
import { Top } from "./Top";
import { LegendProps } from "./Legend/Legend";
import { GameNameProps } from "./GameName/GameName";

type TopComponentType = LegendProps & GameNameProps;

export default {
  title: "Top/Top",
  component: Top,
} as Meta;

const Template: Story<TopComponentType> = (args) => <Top {...args} />;
export const TopPanel = Template.bind({});
TopPanel.args = {
  children: "The Démineur",
  feature: "Flag",
  firstAction: "Ctrl",
  secondAction: "Click",
};
