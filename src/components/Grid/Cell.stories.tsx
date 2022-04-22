import React from "react";
import { Meta, Story } from "@storybook/react";

import { Cell, CellProps } from "./Cell";

export default {
  title: "Grid/Cell",
  component: Cell,
  argTypes: {
    coords: { defaultValue: [1, 1] },
  },
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const CellClosed = Template.bind({});
CellClosed.args = {
  children: 10,
};

export const CellEmpty = Template.bind({});
CellEmpty.args = {
  children: 0,
};

export const CellBomb = Template.bind({});
CellBomb.args = {
  children: 9,
};

export const CellFlag = Template.bind({});
CellFlag.args = {
  children: 11,
};

export const CellWeakFlag = Template.bind({});
CellWeakFlag.args = {
  children: 12,
};

export const CellWith1 = Template.bind({});
CellWith1.args = {
  children: 1,
};

export const CellWith2 = Template.bind({});
CellWith2.args = {
  children: 2,
};

export const CellWith3 = Template.bind({});
CellWith3.args = {
  children: 3,
};

export const CellWith4 = Template.bind({});
CellWith4.args = {
  children: 4,
};

export const CellWith5 = Template.bind({});
CellWith5.args = {
  children: 5,
};

export const CellWith6 = Template.bind({});
CellWith6.args = {
  children: 6,
};

export const CellWith7 = Template.bind({});
CellWith7.args = {
  children: 7,
};

export const CellWith8 = Template.bind({});
CellWith8.args = {
  children: 8,
};
