import { Meta, StoryObj } from "@storybook/react";
import ScreenNavigator from "./ScreenNavigator";
import { Provider } from "react-redux";
import { setupStore } from "../../../app/store";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ScreenLayout from "../ScreenLayout/ScreenLayout";
import MockStore from "../../../stories/helpers/MockState";

const meta = {
  title: "ScreenNavigator",
  component: ScreenNavigator,
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
        <Box sx={{ flexGrow: 1 }}>
          <ScreenLayout>{story()}</ScreenLayout>
        </Box>
      </Box>
    ),
  ],
} satisfies Meta<typeof ScreenNavigator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GameUninitialized = {
  decorators: [(story: Story) => <MockStore>{story()}</MockStore>],
};

export const GameInitialized = {
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
