import { populateActivities, populatePlots } from "empire-of-evil/src/plots";
import { useState } from "react";
import { handleNewGame, hireStartingAgents } from "../actions/gameSetup";
import Button from "../elements/Button";

const NewGameScreen = ({ setScreen, setGameData, activityManager, plotManager }) => {
  const [overlordName, setOverlordName] = useState("OVERLORD");
  const onNewGame = () => {
    const startingGameData = handleNewGame();
    setGameData(startingGameData);
    hireStartingAgents(startingGameData)
    populateActivities(activityManager);
    populatePlots(plotManager);
    setScreen("main");
  };
  return (
    <div>
      <p>New Game</p>
      <form>
        <label>EVIL Overlord Name</label>
        <input
          type="text"
          name="overlord-name"
          id="overlord-name"
          placeholder="OVERLORD"
          onChange={(e) => setOverlordName(e.currentTarget.value)}
        />
      </form>
      <Button
        onClick={onNewGame}
        disabled={overlordName.length === 0}
        buttonText="Start the Game"
      />
    </div>
  );
};

export default NewGameScreen;
