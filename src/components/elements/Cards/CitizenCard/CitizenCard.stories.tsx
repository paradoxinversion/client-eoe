import { Meta, StoryObj } from "@storybook/react";
import MockStore from "../../../../stories/helpers/MockState";
import { Grid } from "@mui/material";
import { Person } from "empire-of-evil/src/types/interfaces/entities";
import CitizenCard from "./CitizenCard";
const meta = {
  title: "Cards/Citizen",
  component: CitizenCard,
  tags: ["autodocs"],
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
} satisfies Meta<typeof CitizenCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const person: Person = {
  id: "p_46c1a499-3c57-4a40-8d50-2f97ff2221dc",
  nationId: "n_946af908-1a15-483c-b568-8d611b041ee0",
  homeZoneId: "z_5d271e47-c013-45fc-a975-213607ede786",
  name: "Andrew Bennett",
  dead: false,
  agent: {
    department: "troop",
    organizationId: "o_9d0a70d7-d82b-4278-8e60-2175f73214f4",
    salary: 1069,
    commanderId: "p_7a64e445-41c1-4277-9b55-16e1f312443f",
    codename: "",
    embeddedAt: null,
  },
  isPersonnel: false,
  isCaptive: false,
  personnelAt: "",
  hospitalizedAt: null,
  standardAttributes: {
    strength: 10,
    intelligence: 5,
    constitution: 1,
    agility: 6,
    empathy: 6,
  },
  derivedAttributes: {
    health: {
      currentHealth: 33,
      totalHealth: 33,
    },
    defense: 11,
    evasion: 20,
  },
  intelAttributes: {
    intelligenceLevel: 100,
    loyalty: 80,
    loyalties: {
      "z_5d271e47-c013-45fc-a975-213607ede786": 39,
    },
  },
  wealth: 240,
  statusEffects: {
    paranoid: -1,
  },
  skills: {
    espionage: 79,
    disguise: 16,
    science: 2,
    administration: 9,
    leadership: 55,
    combat: 6,
    security: 69,
    medicine: 11,
  },
  residentAt: "b_2c30487e-61b2-4908-872b-e12bb22bc4cc",
};

export const Default: Story = {
  args: {
    person,
  },
  decorators: [(story: Story) => <MockStore>{story()}</MockStore>],
};

export const Icons: Story = {
  args: {
    person: {
      ...person,
      personnelAt: "foo",
      hospitalizedAt: "bar",
      isCaptive: true,
    },
    showDescriptoryIcons: true,
  },
  decorators: [(story: Story) => <MockStore>{story()}</MockStore>],
};
