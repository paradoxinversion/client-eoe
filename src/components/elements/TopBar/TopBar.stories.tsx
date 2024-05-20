import { Meta, StoryObj } from "@storybook/react";
import TopBar from "./TopBar";

const meta = {
  title: "TopBar",
  component: TopBar,
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gameSessionActive: false,
  },
};

export const ActiveSession: Story = {
  args: {
    gameSessionActive: true,
  },
};
