import {
  Button,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { setScreen } from "../../features/screenSlice";
import { deleteSavedGame, loadGame } from "../../actions/dataManagement";
import { useState } from "react";
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
    <List sx={{ width: "inherit" }}>
      <ListItem>
        <ListItemButton
          onClick={() => {
            dispatch(setScreen("new-game"));
          }}
        >
          <ListItemText primary={"New Session"} />
        </ListItemButton>
      </ListItem>

      {saveData && (
        <>
          <ListItem>
            <ListItemButton
              onClick={() => {
                loadGame(gameManager);
              }}
            >
              <ListItemText primary={"Load Session"} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              onClick={() => {
                setDeleteDialogOpen(true);
              }}
            >
              <ListItemText primary={"Delete Session"} />
            </ListItemButton>
          </ListItem>

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
