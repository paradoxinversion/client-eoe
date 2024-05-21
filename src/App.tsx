import "./App.css";

import ScreenNavigator from "./components/elements/ScreenNavigator/ScreenNavigator";
import { Box, CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useAppSelector } from "./app/hooks";
import ScreenLayout from "./components/elements/ScreenLayout/ScreenLayout";
import TitleScreen from "./components/screens/Title/TitleScreen";
import NewGameScreen from "./components/screens/NewGame/NewGameScreen";
import MainScreen from "./components/screens/Main/MainScreen";
import IntelScreen from "./components/screens/Intelligence/IntelScreen";
import PersonnelScreen from "./components/screens/Personnel/Personnel";
import ScienceScreen from "./components/screens/Science/ScienceScreen";
import PlotsScreen from "./components/screens/Plots/PlotsScreen";
import WorldScreen from "./components/screens/World/WorldScreen";
import EventsScreen from "./components/screens/Events/EventScreen";
import GameOverScreen from "./components/screens/Endgame/GameOverScreen";
import VictoryScreen from "./components/screens/Endgame/VictoryScreen";
import InfrastructureScreen from "./components/screens/Infrastructure/InfrastructureScreen";
import HelpScreen from "./components/screens/Help/HelpScreen";
import CaptivesScreen from "./components/screens/Captives/CaptivesScreen";
import InfirmaryScreen from "./components/screens/Infirmary/Infirmary";
import TopBar from "./components/elements/TopBar/TopBar";
import { managers } from "empire-of-evil";

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
