import { Meta, StoryObj } from "@storybook/react";
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import ScreenLayout from "./ScreenLayout";

const meta = {
  title: "ScreenLayout",
  component: ScreenLayout,
  decorators: [
    (story) => (
      <Box>
        {" "}
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography>Empire of Evil</Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1 }}>{story()}</Box>
      </Box>
    ),
  ],
} satisfies Meta<typeof ScreenLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  args: {
    title: "String Content",
    children: <Typography>Content</Typography>,
  },
};

export const NoTitle: Story = {
  args: {
    children: <Typography>Content</Typography>,
  },
};
