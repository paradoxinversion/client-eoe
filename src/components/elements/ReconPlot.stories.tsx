import { Meta, StoryObj } from "@storybook/react";
import ReconPlot from "./ReconPlot";

const meta = {
  title: "Plot Setup/Recon",
  component: ReconPlot,
} satisfies Meta<typeof ReconPlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cb: () => console.log("clicked"),
  },
};
