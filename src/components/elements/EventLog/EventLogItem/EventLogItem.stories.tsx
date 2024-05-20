import { Meta, StoryObj } from "@storybook/react";
import { Grid } from "@mui/material";
import EventLogItem from "../../EventLogItem";

const meta = {
  title: "Event Log/EventLogItem",
  component: EventLogItem,
  tags: ["autodocs"],
} satisfies Meta<typeof EventLogItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    text: "Info Event Log Item",
    color: "primary",
    icon: "info",
  },
};

export const Warning: Story = {
  args: {
    text: "Warning Event Log Item",
    color: "primary",
    icon: "warning",
  },
};

export const Payment: Story = {
  args: {
    text: "Payment Event Log Item",
    color: "primary",
    icon: "payment",
  },
};
