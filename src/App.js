import "./App.css";
import TitleScreen from "./screens/TitleScreen";
import { useState } from "react";
import NewGameScreen from "./screens/NewGameScreen";
import MainScreen from "./screens/MainScreen";
import ScreenNavigator from "./elements/ScreeNavigator";
import IntelScreen from "./screens/IntelScreen";
import PersonnelScreen from "./screens/Personnel";
import PlotsScreen from "./screens/PlotsScreen";
import ScienceScreen from "./screens/ScienceScreen";
import WorldScreen from "./screens/WorldScreen";
import EventsScreen from "./screens/EventScreen";
import GameOverScreen from "./screens/GameOverScreen";
import VictoryScreen from "./screens/VictoryScreen";
import {
  checkGameOverState,
  checkVictoryState,
} from "empire-of-evil/src/utilities";
import {Box, CssBaseline, AppBar, Toolbar, Typography} from "@mui/material"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useSelector, useDispatch } from 'react-redux';
import { setGameManager } from "./features/gameManagerSlice";
import InfrastructureScreen from "./screens/InfrastructureScreen";
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
  infrastructure: InfrastructureScreen
};

function App({gameManager}) {
  const currentScreen = useSelector(state => state.screen);
  const [gameData, _setGameData] = useState({});
  const [gameScreen, setGameScreen] = useState("title");
  const CurrentScreen = screens[currentScreen];

  /**
   *
   * @param {import("empire-of-evil/src/typedef").GameData} updatedGameData
   */
  const updateGameData = (updatedGameData) => {
    const update = {
      ...gameData,
      people: { ...gameData.people, ...updatedGameData.people },
      zones: { ...gameData.zones, ...updatedGameData.zones },
      nations: { ...gameData.nations, ...updatedGameData.nations },
      governingOrganizations: {
        ...gameData.governingOrganizations,
        ...updatedGameData.governingOrganizations,
      },
      buildings: { ...gameData.buildings, ...updatedGameData.buildings },
      player: { ...gameData.player, ...updatedGameData.player },
      gameDate: updatedGameData.gameDate || gameData.gameDate,
    };
    gameManager.gameData = update;
    _setGameData(update);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography>Empire of Evil</Typography>
        </Toolbar>
      </AppBar>
      <ScreenNavigator
        gameManager={gameManager}
      />
      <Box sx={{flexGrow: 1}}>
        <CurrentScreen
          gameManager={gameManager}
          setScreen={setGameScreen}
        />
      </Box>
    </Box>
  );
}

export default App;
