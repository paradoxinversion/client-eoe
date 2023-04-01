import { handleNewGame, hireStartingAgents } from "empire-of-evil/src/gameSetup";
import { populateActivities, populatePlots } from "empire-of-evil/src/plots";
import { useState } from "react";

const NewGameScreen = ({
  setScreen,
  setGameData,
  activityManager,
  plotManager,
}) => {
  const [overlordName, setOverlordName] = useState("OVERLORD");
  const onNewGame = () => {
    const startingGameData = handleNewGame();
    setGameData(startingGameData);
    hireStartingAgents(startingGameData);
    populateActivities(activityManager);
    populatePlots(plotManager);
    setScreen("main");
  };
  return (
    <div className="p-4">
      <header className="mb-4">
        <p className="header-font">Welcome to your EVIL Interface</p>
        <p>Welcome, Overlord! Before we can authorize your session and take you to the Dashboard, we'll need to handle some <em>minor</em> onboarding items.</p>
      </header>
      <form className="w-64 mb-4 ">
        <div className="flex flex-col">
          <label className="text-sm text-stone-700">What is your name?</label>
          <input
            type="text"
            name="overlord-name"
            id="overlord-name"
            placeholder="OVERLORD"
            onChange={(e) => setOverlordName(e.currentTarget.value)}
          />
        </div>
      </form>

      <button
        className="btn-confirm"
        disabled={overlordName.length === 0}
        onClick={onNewGame}
      >
        Start the Game
      </button>
    </div>
  );
};

export default NewGameScreen;
