import { Meta, StoryObj } from "@storybook/react";
import { Grid } from "@mui/material";
import ActivityParticipantSelector from "./ActivityParticipantSelector";
import MockStore from "../../../stories/helpers/MockState";
import { GameManager } from "empire-of-evil";
import activityConfig from "empire-of-evil/src/activities/activityConfig";

const meta = {
  title: "ActivityParticipantSelector",
  component: ActivityParticipantSelector,
  decorators: [
    (Story) => (
      <Grid container spacing={1}>
        <Story />
        <Story />
        <Story />
      </Grid>
    ),
  ],
} satisfies Meta<typeof ActivityParticipantSelector>;

export default meta;
type Story = StoryObj<typeof meta>;
console.log(GameManager.getInstance().gameData);

export const StringContent = {
  args: {
    currentActivity: activityConfig[0],
  },
  decorators: [
    (story: Story) => (
      <MockStore
        preloadedState={{
          gameManager: {
            initialized: true,
            saveData: null,
          },
        }}
      >
        {story()}
      </MockStore>
    ),
  ],
};
