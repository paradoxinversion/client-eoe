import { populateActivities, populatePlots } from "empire-of-evil/src/plots";
import React, { useState } from "react";
import { deleteSavedGame } from "../actions/dataManagement";
import {GameManager} from "empire-of-evil";
import Box from '@mui/material/Box';
import {AppBar, Button, ButtonGroup, Card, CardContent, CardHeader, Toolbar, Typography} from "@mui/material";

/**
 *
 * @param {Object} props
 * @param {GameManager} props.gameManager
 * @returns
 */
function TitleScreen(props) {
  const [saveData, setSaveData] = useState(localStorage.getItem("eoe-save"));
  const { setScreen, setGameData, gameManager } = props;
  return (
    <Box >
      <AppBar position="static">
        <Toolbar>

          <ButtonGroup>
            <Button 
              color='inherit'
              onClick={() => {
                setScreen("new-game");
              }}
              variant="outlined"
            >
              New Session Bon
            </Button>

            {saveData && (
              <>
                <Button
                  color='inherit'
                  onClick={() => {
                    /**
                     * @type {import("empire-of-evil/src/typedef").SaveData}
                     */
                    const sd = JSON.parse(saveData);
                    populateActivities(gameManager);
                    populatePlots(gameManager);
                    gameManager.plotManager.setPlotQueue(sd.plotData.plots)
                    Object.values(sd.plotData.activities).forEach((activity) => {
                      const currentActivity = gameManager.activityManager.activities.find(
                        (a) => a.name === activity.name
                      );
                      currentActivity.setAgents(activity.agents);
                    });
                    gameManager.setGameData(sd.gameData);
                    gameManager.setInitialized(true);
                    setScreen("main");
                  }}
                >
                  Continue Session
                </Button>
                <Button
                  color='inherit'
                  onClick={() => {
                    deleteSavedGame();
                    setSaveData(null);
                  }}
                >
                  Delete Session
                </Button>
              </>
            )}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Typography>
        Empire of EVIL
      </Typography>
      <Typography>An Evil Overlord Simulator by Jedai Saboteur.</Typography>
      <Box display="flex" alignItems={"center"}>
        <Card sx={{ maxWidth: 345, height: 150 }} >
          <CardContent>
            <Typography variant="h5" align="center" >Execute EVIL Plots</Typography>
            <Typography variant="body2">Create an Empire capable of generating the resources you need to unleash EVIL plots upon an unsuspecting world!</Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, height: 150 }}>
          <CardContent>
            <Typography variant="h5" align="center">Recruit EVIL Agents</Typography>
            <Typography variant="body2">Amass your own personal army of loyal EVIL Agents to carry out your dastardly schemes.</Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, height: 150 }} >
          <CardContent>
            <Typography variant="h5" align="center">Take Over the World</Typography>
            <Typography variant='body2'>Use your wit and careful planning to strategically take over the world!</Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Typography >{saveData ? "Continue your session today!" : "Start a New Session Today!"}</Typography>
      </Box>
    </Box>
  );
};

export default TitleScreen;
