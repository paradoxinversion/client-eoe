import logo from './logo.svg';
import './App.css';
import TitleScreen from './screens/TitleScreen';
import { useState } from 'react';
import NewGameScreen from './screens/NewGameScreen';
import MainScreen from './screens/MainScreen';
import ScreenNavigator from './elements/ScreeNavigator';
import IntelScreen from './screens/IntelScreen';
import PersonnelScreen from './screens/Personnel';
import PlotsScreen from './screens/PlotsScreen';
import ScienceScreen from './screens/ScienceScreen';

const screens = {
  "title": TitleScreen,
  "new-game": NewGameScreen,
  "main": MainScreen,
  "intel": IntelScreen,
  "personnel": PersonnelScreen,
  "science": ScienceScreen,
  "plots": PlotsScreen
}
function App() {
  const [gameData, _setGameData] = useState({});
  const [gameScreen, setGameScreen] = useState("title");
  const CurrentScreen = screens[gameScreen];
  return (
    <div className="bg-black text-white h-screen">
      {Object.keys(gameData).length > 0 && <ScreenNavigator setScreen={setGameScreen} />}
      <CurrentScreen setScreen={setGameScreen} gameData={gameData} setGameData={_setGameData} />
    </div>
  );
}

export default App;
