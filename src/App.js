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
import { GameEventQueue } from "empire-of-evil/src/gameEvents";
import { ActivityManager, PlotManager } from "empire-of-evil/src/plots";
import GameOverScreen from "./screens/GameOverScreen";
import VictoryScreen from "./screens/VictoryScreen";
import {
  checkGameOverState,
  checkVictoryState,
} from "empire-of-evil/src/utilities";

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
    <div className="bg-stone-200 text-stone-900 h-screen grid grid-cols-12">
      {gameManager?.initialized && Object.keys(gameManager.gameData).length > 0 && (
        <ScreenNavigator
          setScreen={setGameScreen}
          gameManager={gameManager}
        />
      )}
      <div
        className={`overflow-y-auto w-full ${gameManager?.initialized ? 'col-span-11' : 'col-span-12'}`}
      >
        <CurrentScreen
          gameManager={gameManager}
          setScreen={setGameScreen}
        />
      </div>
    </div>
  );
}

export default App;
