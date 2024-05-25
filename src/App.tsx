import "./App.css";

import ScreenNavigator from "./components/elements/ScreenNavigator/ScreenNavigator";
import { Box, CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useAppSelector } from "./app/hooks";
import ScreenLayout from "./components/elements/ScreenLayout/ScreenLayout";
import TopBar from "./components/elements/TopBar/TopBar";
import { managers } from "empire-of-evil";
import screens, { GameScreen } from "./screens";

function App() {
  const currentScreen = useAppSelector((state) => state.screen);
  const CurrentScreen = screens[currentScreen as GameScreen];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar
        gameSessionActive={managers.game.GameManager.getInstance().initialized}
      />

      <ScreenNavigator />
      <Box sx={{ flexGrow: 1 }}>
        <ScreenLayout>
          <CurrentScreen />
        </ScreenLayout>
      </Box>
    </Box>
  );
}

export default App;
