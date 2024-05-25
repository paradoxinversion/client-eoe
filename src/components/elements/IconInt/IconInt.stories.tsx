import { Meta, StoryObj } from "@storybook/react";
import IconContent from "./IconInt";

import { Warning } from "@mui/icons-material";
import managers from "empire-of-evil/src/managers";
const meta = {
  title: "Display Elements/Icon Content",
  component: IconContent,
  tags: ["autodocs"],
} satisfies Meta<typeof IconContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Icon: Warning,
    content: "1234",
  },
};

export const WithLabel: Story = {
  args: {
    Icon: Warning,
    content: "1234",
    label: "A Label",
  },
};

console.log(managers.game.GameManager.getInstance().gameData);
