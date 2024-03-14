import {
  Button,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { setScreen } from "../../features/screenSlice";
import {
  Activity,
  populateActivities,
  populatePlots,
} from "empire-of-evil/src/plots";
import { setInitialized } from "../../features/gameManagerSlice";
import { deleteSavedGame } from "../../actions/dataManagement";
import { useState } from "react";
import { setGoverningOrganizations } from "../../features/governingOrganizationSlice";
import { setNations } from "../../features/nationSlice";
import { setZones } from "../../features/zoneSlice";
import { setBuildings } from "../../features/buildingSlice";
import { setPeople } from "../../features/personSlice";
import { GameManager } from "empire-of-evil";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface TitleScreenOptionsProps {
  gameManager: GameManager;
}

const TitleScreenOptions = ({ gameManager }: TitleScreenOptionsProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const saveData = useAppSelector((state) => state.gameManager.saveData);
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
              const sd = { ...saveData };
              populateActivities(gameManager);
              populatePlots(gameManager);
              gameManager.plotManager.setPlotQueue(sd.plotData.plots);
              Object.values(sd.plotData.activities).forEach(
                (activity: Activity) => {
                  const currentActivity =
                    gameManager.activityManager.activities.find(
                      (a) => a.name === activity.name
                    );
                  currentActivity.setAgents(activity.agents);
                }
              );
              gameManager.setGameData(sd.gameData);
              gameManager.setInitialized(true);
              const {
                governingOrganizations,
                nations,
                zones,
                buildings,
                people,
              } = gameManager.gameData;

              // Update the redux store
              dispatch(setGoverningOrganizations(governingOrganizations));
              dispatch(setNations(nations));
              dispatch(setZones(zones));
              dispatch(setBuildings(buildings));
              dispatch(setPeople(people));
              dispatch(setInitialized(true));
              dispatch(setScreen("main"));
            }}
          >
            Load Session
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              setDeleteDialogOpen(true);
            }}
          >
            Delete Session
          </Button>
          <Dialog open={deleteDialogOpen}>
            <DialogTitle>Delete Your Data?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You are about to delete your saved data. You can start over, but
                you'll never forget what you've done.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  deleteSavedGame();
                  setDeleteDialogOpen(false);
                }}
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </List>
  );
};

export default TitleScreenOptions;
