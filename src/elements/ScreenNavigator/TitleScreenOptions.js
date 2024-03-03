import {
  AppBar,
  Button,
  List,
  Card,
  CardContent,
  CardHeader,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setScreen } from "../../features/screenSlice";
import { populateActivities, populatePlots } from "empire-of-evil/src/plots";
import { setInitialized } from "../../features/gameManagerSlice";
import { deleteSavedGame } from "../../actions/dataManagement";

export default TitleScreenOptions = ({ gameManager }) => {
  const dispatch = useDispatch();
  const saveData = useSelector(state => state.gameManager.saveData)
  return (
    <List>
      <Button
        color="inherit"
        onClick={() => {
          dispatch(setScreen("new-game"));
        }}
      >
        New Session
      </Button>

      {saveData && (
        <>
          <Button
            color="inherit"
            onClick={() => {
              /**
               * @type {import("empire-of-evil/src/typedef").SaveData}
               */
              const sd = JSON.parse(saveData);
              populateActivities(gameManager);
              populatePlots(gameManager);
              gameManager.plotManager.setPlotQueue(sd.plotData.plots);
              Object.values(sd.plotData.activities).forEach((activity) => {
                const currentActivity =
                  gameManager.activityManager.activities.find(
                    (a) => a.name === activity.name
                  );
                currentActivity.setAgents(activity.agents);
              });
              gameManager.setGameData(sd.gameData);
              gameManager.setInitialized(true);
              useDispatch(setInitialized(true));
              useDispatch(setScreen('main'));
            }}
          >
            Continue Session
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              deleteSavedGame();
            }}
          >
            Delete Session
          </Button>
        </>
      )}
    </List>
  );
};
