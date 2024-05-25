import type { Preview } from "@storybook/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  withThemeByDataAttribute,
  withThemeFromJSXProvider,
} from "@storybook/addon-themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "../src/themes/themes";
import { themes, ensure } from "@storybook/theming";
import { utils } from "empire-of-evil";
import React from "react";
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        dark: darkTheme,
      },
      defaultTheme: "dark",
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, { parameters }) => {
      // 👇 Make it configurable by reading from parameters
      return <Story />;
    },
  ],
};

utils.gameSetup.newGame();

export default preview;
