import { Meta, StoryObj } from "@storybook/react";
import TitleScreenInfoCard from "./TitleScreenInfoCard";
import { Grid } from "@mui/material";

const meta = {
  title: "Cars/Title Screen Info",
  component: TitleScreenInfoCard,
  decorators: [
    (Story) => (
      <Grid container spacing={1} columns={3}>
        <Story />
        <Story />
        <Story />
      </Grid>
    ),
  ],
} satisfies Meta<typeof TitleScreenInfoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StringContent: Story = {
  args: {
    title: "String Content",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida faucibus euismod. Aliquam quis scelerisque turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem orci, sagittis ut metus quis, fermentum feugiat enim. Donec posuere est lectus, quis vestibulum mi placerat et. Donec diam turpis, dictum et luctus a, commodo quis velit. Pellentesque mollis molestie sem, in viverra lorem venenatis non. Ut eget nibh suscipit, lobortis mauris nec, molestie nibh. Aliquam placerat, leo in dapibus imperdiet, lectus nibh ultricies neque, ut tincidunt ligula ligula maximus lorem.",
  },
};
