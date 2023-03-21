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
    <div className="grid justify-center justify-items-center">
      <p className="header-font mt-4 place-self-center">New Game</p>
      <form className="bg-stone-700 p-4 rounded m-4">
        <div className="grid">
          <label className="mr-4 text-sm mb-1">EVIL Overlord Name</label>
          <input
            className="rounded pl-1"
            type="text"
            name="overlord-name"
            id="overlord-name"
            placeholder="OVERLORD"
            onChange={(e) => setOverlordName(e.currentTarget.value)}
          />
        </div>
      </form>

      <button
        className="p-2 bg-stone-700 w-fit hover:bg-stone-800"
        disabled={overlordName.length === 0}
        onClick={onNewGame}
      >
        Start the Game
      </button>
    </div>
  );
};

export default NewGameScreen;
