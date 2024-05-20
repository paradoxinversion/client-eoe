import { Meta, StoryObj } from "@storybook/react";
import BuildingCard from "./BuildingCard";
import MockStore from "../../../stories/helpers/MockState";
import { Grid } from "@mui/material";
const meta = {
  title: "BuildingCard",
  component: BuildingCard,
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
} satisfies Meta<typeof BuildingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const building = {
  id: "b_2d2461ce-c75c-405d-b8ed-8643ed466b12",
  name: "Conquest Holdings",
  zoneId: "z_e3ef7645-f4ff-4e5e-922f-acf7b628f8b6",
  organizationId: "o_ee174571-83f7-4fc9-84c7-7273b41f00f3",
  type: "apartment",
  personnel: [
    "p_622f27d4-52c4-478d-bc49-13a6942818c5",
    "p_d5e7601b-4415-4a89-9240-8ac57a4fa451",
    "p_591c45e1-f4cf-4fae-8415-11eb0a8c7251",
    "p_1ce9201d-512b-4ef0-9055-9ec9808cd85c",
  ],
  basicAttributes: {
    upkeepCost: 600,
    infrastructureCost: 6,
    maxPersonnel: 4,
  },
  resourceAttributes: {
    wealthBonus: 0,
    housingCapacity: 47,
    scienceBonus: 1,
    infrastructure: 0,
    hospitalBeds: 0,
  },
  intelAttributes: {
    intelligenceLevel: 25,
  },
  statusEffects: [],
  inhabitants: [],
  structure: {
    currentHealth: 50,
    totalHealth: 50,
  },
};

export const Default = {
  args: {
    building,
  },
  decorators: [(story: Story) => <MockStore>{story()}</MockStore>],
};

export const ActiveSession: Story = {
  args: {
    building,
  },
};
