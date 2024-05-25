import { Meta, StoryObj } from "@storybook/react";
import MockStore from "../../../../stories/helpers/MockState";
import { Grid } from "@mui/material";
import { Nation, Zone } from "empire-of-evil/src/types/interfaces/entities";
import ZoneCard from "./ZoneCard";
const meta = {
  title: "Cards/Zone",
  component: ZoneCard,
  decorators: [
    (Story) => (
      <Grid container spacing={1} columns={12}>
        <Grid item>
          <Story />
        </Grid>
        <Grid item>
          <Story />
        </Grid>
        <Grid item>
          <Story />
        </Grid>
      </Grid>
    ),
  ],
} satisfies Meta<typeof ZoneCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const nation = {
  id: "n_223c06ae-14e6-4b70-9926-53bf1e6b10c7",
  name: "EVIL Empire",
  size: 3,
  organizationId: "o_879d5c4a-d08b-43d2-af5b-b192babf7e71",
};

const zone = {
  id: "z_0d8a504a-670e-4445-9f3e-3712be93bad5",
  nationId: "n_c752ccbb-b0fa-49e6-8c05-7e35e029fb53",
  name: "Blue Acres",
  size: 83,
  wealth: 1,
  organizationId: "o_ee174571-83f7-4fc9-84c7-7273b41f00f3",
  intelligenceLevel: 25,
  intelAttributes: {
    intelligenceLevel: 25,
  },
};

export const Default: Story = {
  args: {
    zone,
  },
  decorators: [(story: Story) => <MockStore>{story()}</MockStore>],
};

export const WithSelectCallback: Story = {
  args: {
    zone,
    selectCallback: (zone: Zone) => console.log(zone.name),
  },
  decorators: [(story: Story) => <MockStore>{story()}</MockStore>],
};
