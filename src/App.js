import logo from './logo.svg';
import './App.css';
import TitleScreen from './TitleScreen';
import { useState } from 'react';

function App() {

  const setCurrentScreen = (NextScreen) => {
    _setCurrentScreen(<NextScreen setScreen={setCurrentScreen} gameData={gameData} setGameData={_setGameData}/>);
  }
  const [gameData, _setGameData] = useState({});
  const [currentScreen, _setCurrentScreen] = useState(<TitleScreen setScreen={setCurrentScreen} gameData={gameData} />);

  return (
    <div className="App">
      {currentScreen}
    </div>
  );
}

export default App;
