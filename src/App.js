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
};
function App() {
  const [gameData, _setGameData] = useState({});
  const [eventQueue, setEventQueue] = useState(new GameEventQueue());
  const [gameScreen, setGameScreen] = useState("title");
  const CurrentScreen = screens[gameScreen];
  return (
    <div className="bg-black text-white h-screen flex p-4">
      {Object.keys(gameData).length > 0 && (
        <ScreenNavigator setScreen={setGameScreen} />
      )}
      <div className="pl-4 pr-4 overflow-y-auto">
        <CurrentScreen
          setScreen={setGameScreen}
          gameData={gameData}
          setGameData={_setGameData}
          eventQueue={eventQueue}
        />
      </div>
    </div>
  );
}

export default App;
