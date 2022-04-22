import React from "react";
import { Meta, Story } from "@storybook/react";

import { Reset, ResetProps } from "./Reset";

export default {
  title: "ScoreBoard/Reset",
  component: Reset,
} as Meta;

const Template: Story<ResetProps> = (args) => <Reset {...args} />;
export const ResetButton = Template.bind({});
ResetButton.args = {};
