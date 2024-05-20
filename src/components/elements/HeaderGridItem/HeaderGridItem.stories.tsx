import { Meta, StoryObj } from "@storybook/react";
import HeaderGridItem from "./HeaderGridItem";
import { Grid } from "@mui/material";

const columns = 12;

const span = {
  xs: columns,
  sm: 6,
  md: 4,
  lg: 3,
  xl: 2,
};

const meta = {
  title: "HeaderGridItem",
  component: HeaderGridItem,
  decorators: [
    (Story) => (
      <Grid container spacing={1} columns={columns}>
        <Story />
        <Story />
        <Story />
      </Grid>
    ),
  ],
} satisfies Meta<typeof HeaderGridItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StringContent: Story = {
  args: {
    title: "String Content",
    content: "Content",
    span,
  },
};

export const NumberContent: Story = {
  args: {
    title: "Number Content",
    content: 12345,
    span,
  },
};
