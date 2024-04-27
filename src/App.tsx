import "./App.css";

import ScreenNavigator from "./elements/ScreenNavigator";
import { Box, CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useAppSelector } from "./app/hooks";
import ScreenLayout from "./elements/ScreenLayout";
import TitleScreen from "./screens/Title/TitleScreen";
import NewGameScreen from "./screens/NewGame/NewGameScreen";
import MainScreen from "./screens/Main/MainScreen";
import IntelScreen from "./screens/Intelligence/IntelScreen";
import PersonnelScreen from "./screens/Personnel/Personnel";
import ScienceScreen from "./screens/Science/ScienceScreen";
import PlotsScreen from "./screens/Plots/PlotsScreen";
import WorldScreen from "./screens/World/WorldScreen";
import EventsScreen from "./screens/Events/EventScreen";
import GameOverScreen from "./screens/Endgame/GameOverScreen";
import VictoryScreen from "./screens/Endgame/VictoryScreen";
import InfrastructureScreen from "./screens/Infrastructure/InfrastructureScreen";
import HelpScreen from "./screens/Help/HelpScreen";
import CaptivesScreen from "./screens/Captives/CaptivesScreen";
import InfirmaryScreen from "./screens/Infirmary/Infirmary";

const screens = {
  title: TitleScreen,
  "new-game": NewGameScreen,
  main: MainScreen,
  intel: IntelScreen,
  personnel: PersonnelScreen,
  science: ScienceScreen,
  plots: PlotsScreen,
  world: WorldScreen,
  events: EventsScreen,
  "game-over": GameOverScreen,
  victory: VictoryScreen,
  infrastructure: InfrastructureScreen,
  help: HelpScreen,
  captives: CaptivesScreen,
  infirmary: InfirmaryScreen,
};

function App() {
  const currentScreen = useAppSelector((state) => state.screen);
  const CurrentScreen = screens[currentScreen];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography>Empire of Evil</Typography>
        </Toolbar>
      </AppBar>
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
