import { GameManager } from "empire-of-evil";
import { handleNewGame, hireStartingAgents } from "empire-of-evil/src/gameSetup";
import { populateActivities, populatePlots } from "empire-of-evil/src/plots";
import { useState } from "react";
import { TextField, Button, Typography, Box, Container, Toolbar } from '@mui/material';
import {useDispatch} from 'react-redux'
import { setInitialized } from "../features/gameManagerSlice";
import { setGoverningOrganizations } from "../features/governingOrganizationSlice";
import { setNations } from "../features/nationSlice";
import { setZones } from "../features/zoneSlice";
import { setBuildings } from "../features/buildingSlice";
import { setPeople } from "../features/personSlice";
import { setScreen } from "../features/screenSlice";

/**
 * 
 * @param {Object} props 
 * @param {GameManager} props.gameManager
 * @returns 
 */
const NewGameScreen = ({
  gameManager,
}) => {
  const dispatch = useDispatch();
  const [overlordName, setOverlordName] = useState("OVERLORD");
  const onNewGame = () => {
    handleNewGame(gameManager);
    hireStartingAgents(gameManager);
    populateActivities(gameManager);
    populatePlots(gameManager);
    gameManager.setInitialized(true);
    const {
      governingOrganizations,
      nations,
      zones,
      buildings,
      people
    } = gameManager.gameData
    
    // Update the redux store 
    dispatch(setGoverningOrganizations(governingOrganizations));
    dispatch(setNations(nations));
    dispatch(setZones(zones));
    dispatch(setBuildings(buildings));
    dispatch(setPeople(people));
    dispatch(setInitialized(true));

    // setScreen("main");
    dispatch(setScreen('main'))
  };
  return (
    <Container>
      <Toolbar />
      <Box >
        <Typography>Welcome to your EVIL Interface</Typography>
        <Typography>Welcome, Overlord! Before we can authorize your session and take you to the Dashboard, we'll need to handle some <em>minor</em> onboarding items.</Typography>
      </Box>
      <Box component="form">
        <TextField label='Overlord Name' onChange={(e) => setOverlordName(e.currentTarget.value)} />
      </Box>
      <Button onClick={onNewGame}>Start the Game</Button>
    </Container>
  );
};

export default NewGameScreen;
