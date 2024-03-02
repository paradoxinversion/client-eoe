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
import {Box} from "@mui/material"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
};

function App({gameManager}) {

  const [gameData, _setGameData] = useState({});
  const [gameScreen, setGameScreen] = useState("title");
  const CurrentScreen = screens[gameScreen];

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
    <Box>
      <ScreenNavigator
        setScreen={setGameScreen}
        gameManager={gameManager}
      />
      <Box>
        <CurrentScreen
          gameManager={gameManager}
          setScreen={setGameScreen}
        />
      </Box>
    </Box>
  );
}

export default App;
