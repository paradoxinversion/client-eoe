import { Meta, StoryObj } from "@storybook/react";
import MockStore from "../../../../stories/helpers/MockState";
import { Person } from "empire-of-evil/src/types/interfaces/entities";
import WorldPerson from "./WorldPerson";
const meta = {
  title: "Screens/Primary/World/Person",
  component: WorldPerson,
  tags: ["autodocs"],
} satisfies Meta<typeof WorldPerson>;

export default meta;
type Story = StoryObj<typeof meta>;
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
const person: Person = {
  id: "p_46c1a499-3c57-4a40-8d50-2f97ff2221dc",
  nationId: zone.nationId,
  homeZoneId: zone.id,
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
const nation = {
  id: "n_223c06ae-14e6-4b70-9926-53bf1e6b10c7",
  name: "EVIL Empire",
  size: 3,
  organizationId: "o_879d5c4a-d08b-43d2-af5b-b192babf7e71",
};

export const Default: Story = {
  args: {
    selectedPerson: person,
    homeZone: zone,
    nativeNation: nation,
    activities: [],
  },
  decorators: [(story: Story) => <MockStore>{story()}</MockStore>],
};
