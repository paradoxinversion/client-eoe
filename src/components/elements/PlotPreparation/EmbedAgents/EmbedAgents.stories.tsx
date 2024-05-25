import { Meta, StoryObj } from "@storybook/react";
import EmbedAgents from "./EmbedAgents";

const meta = {
  title: "Plot Setup/Embed Agents",
  component: EmbedAgents,
} satisfies Meta<typeof EmbedAgents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cb: () => console.log("clicked"),
  },
};
