import React from "react";
import { Meta, Story } from "@storybook/react";

import { Counter, CounterProps } from "./Counter";

export default {
  title: "ScoreBoard/Counter",
  component: Counter,
} as Meta;

const Template: Story<CounterProps> = (args) => <Counter {...args} />;
export const ScoreCounter = Template.bind({});
ScoreCounter.args = {
  children: "010",
};
