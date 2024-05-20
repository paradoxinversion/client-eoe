import { Meta, StoryObj } from "@storybook/react";
import EventLogContainer from "./EventLogContainer";
import MockStore from "../../../../stories/helpers/MockState";
import { GameManager } from "empire-of-evil";

const meta = {
  title: "Event Log/EventLogContainer",
  component: EventLogContainer,
} satisfies Meta<typeof EventLogContainer>;

export default meta;
type Story = StoryObj<typeof meta>;
const mockState = {
  gameLog: {
    events: [
      {
        text: "Info Event Log Item",
        color: "primary",
        icon: "info",
      },
      {
        text: "Warning Event Log Item",
        color: "primary",
        icon: "warning",
      },
      {
        text: "Payment Event Log Item",
        color: "primary",
        icon: "payment",
      },
    ],
    simActions: {
      people: {},
    },
  },
};

export const StringContent = {
  args: {},
  decorators: [
    (story: Story) => (
      <MockStore preloadedState={mockState}>{story()}</MockStore>
    ),
  ],
};
