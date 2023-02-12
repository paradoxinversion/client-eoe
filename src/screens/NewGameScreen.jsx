import { useState } from "react";
import { handleNewGame } from "../actions/gameSetup";
import Button from "../elements/Button";

const NewGameScreen = ({ setScreen, setGameData }) => {
  const [overlordName, setOverlordName] = useState("");
  const onNewGame = () => {
    console.log();
    setGameData(handleNewGame());
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
