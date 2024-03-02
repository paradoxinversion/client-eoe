import { GameManager } from "empire-of-evil";
import { handleNewGame, hireStartingAgents } from "empire-of-evil/src/gameSetup";
import { populateActivities, populatePlots } from "empire-of-evil/src/plots";
import { useState } from "react";
import { TextField, Button, Typography, Box, Container } from '@mui/material';

/**
 * 
 * @param {Object} props 
 * @param {GameManager} props.gameManager
 * @returns 
 */
const NewGameScreen = ({
  gameManager,
  setScreen,
}) => {
  const [overlordName, setOverlordName] = useState("OVERLORD");
  const onNewGame = () => {
    handleNewGame(gameManager);
    hireStartingAgents(gameManager);
    populateActivities(gameManager);
    populatePlots(gameManager);
    gameManager.setInitialized(true)

    setScreen("main");
  };
  return (
    <Container>
      <header >
        <Typography>Welcome to your EVIL Interface</Typography>
        <Typography>Welcome, Overlord! Before we can authorize your session and take you to the Dashboard, we'll need to handle some <em>minor</em> onboarding items.</Typography>
      </header>
      <form className="w-64 mb-4 ">
        <Box className="flex flex-col">
          <label className="text-sm text-stone-700">What is your name?</label>
          <TextField label='Overlord Name' onChange={(e) => setOverlordName(e.currentTarget.value)} />
        </Box>
      </form>
      <Button onClick={onNewGame}>Start the Game</Button>
    </Container>
  );
};

export default NewGameScreen;
