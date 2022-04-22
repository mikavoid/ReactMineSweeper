import React from "react";
import { Meta, Story } from "@storybook/react";

import { Grid, GridProps } from "./Grid";

export default {
  title: "Grid/Grid",
  component: Grid,
} as Meta;

const Template: Story<GridProps> = (args) => <Grid {...args} />;
export const GridMain = Template.bind({});
GridMain.args = {
  children: [
    [9, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 9, 1],
    [0, 0, 1, 9, 1, 0, 2, 2, 2],
    [0, 0, 1, 1, 2, 1, 2, 9, 1],
    [0, 1, 1, 1, 2, 9, 2, 1, 1],
    [0, 1, 9, 2, 2, 2, 1, 0, 0],
    [0, 1, 1, 2, 9, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 10, 10, 0, 0, 0, 0, 0],
  ],
};
