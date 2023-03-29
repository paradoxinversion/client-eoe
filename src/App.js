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
import { checkGameOverState, checkVictoryState } from "empire-of-evil/src/utilities";

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
  victory: VictoryScreen
};

function App() {
  const [gameData, _setGameData] = useState({});
  const [eventQueue] = useState(new GameEventQueue());
  const [activityManager] = useState(new ActivityManager());
  const [plotManager] = useState(new PlotManager());
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
      zones: { ...gameData.zones,...updatedGameData.zones},
      nations: { ...gameData.nations,...updatedGameData.nations},
      governingOrganizations: { ...gameData.governingOrganizations,...updatedGameData.governingOrganizations},
      buildings: { ...gameData.buildings,...updatedGameData.buildings},
      player: { ...gameData.player, ...updatedGameData.player},
      gameDate: updatedGameData.gameDate || gameData.gameDate
    }
    _setGameData(update);
   

  };
  return (
    <div className="bg-stone-900 text-stone-200 h-screen grid grid-cols-12 gap-4">
      {Object.keys(gameData).length > 0 && (
        <ScreenNavigator gameData={gameData} setScreen={setGameScreen} activityManager={activityManager} />
      )}
      <div
        className={`overflow-y-auto w-full ${
          Object.keys(gameData).length > 0 ? "col-span-11" : "col-span-12"
        }`}
      >
        <CurrentScreen
          updateGameData={updateGameData}
          setScreen={setGameScreen}
          gameData={gameData}
          setGameData={_setGameData}
          eventQueue={eventQueue}
          activityManager={activityManager}
          plotManager={plotManager}
        />
      </div>
    </div>
  );
}

export default App;
