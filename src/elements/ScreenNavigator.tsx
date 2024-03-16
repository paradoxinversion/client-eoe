import { saveGame } from "../actions/dataManagement";
import { setScreen } from "../features/screenSlice";
import {
  Button,
  Drawer,
  List,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import {
  Save as SaveIcon,
  Groups as GroupsIcon,
  Functions as FunctionsIcon,
  TravelExplore as TravelExploreIcon,
  TipsAndUpdates as TipsAndUpdatesIcon,
  Home as HomeIcon,
  LocationCity as LocationCityIcon,
  QuestionAnswer as QuestionAnswerIcon,
  QuestionMark as QuestionMarkIcon,
} from "@mui/icons-material";
import TitleScreenOptions from "./ScreenNavigator/TitleScreenOptions";
import { useState } from "react";
import { clearSelections } from "../features/selectionSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const screens = [
  {
    screen: "main",
    title: "Home",
    icon: <HomeIcon />,
  },
  {
    screen: "world",
    title: "World",
    icon: <TravelExploreIcon />,
  },
  {
    screen: "personnel",
    title: "Personnel",
    icon: <GroupsIcon />,
  },
  {
    screen: "infrastructure",
    title: "Infrastructure",
    icon: <LocationCityIcon />,
  },
  {
    screen: "science",
    title: "Science",
    icon: <FunctionsIcon />,
  },
  {
    screen: "plots",
    title: "Plots",
    icon: <TipsAndUpdatesIcon />,
  },
  {
    screen: "help",
    title: "Help",
    icon: <QuestionMarkIcon />,
  },
];

export const screenNavigatorWidth = 250;

function ScreenNavigator({ gameManager }) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const gameInitialized = useAppSelector(
    (state) => state.gameManager
  ).initialized;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: screenNavigatorWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: screenNavigatorWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      {gameInitialized && Object.keys(gameManager.gameData).length > 0 ? (
        <>
          <List sx={{ width: "inherit" }}>
            {screens.map((gameScreen) => (
              <ListItem key={gameScreen.screen}>
                <ListItemButton
                  onClick={() => {
                    dispatch(clearSelections());
                    dispatch(setScreen(gameScreen.screen));
                  }}
                >
                  <ListItemIcon>{gameScreen.icon}</ListItemIcon>
                  <ListItemText primary={gameScreen.title} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem>
              <ListItemButton
                onClick={() => {
                  setSaveDialogOpen(true);
                }}
              >
                <ListItemIcon>{<SaveIcon />}</ListItemIcon>
                <ListItemText primary={"Save"} />
              </ListItemButton>
            </ListItem>
          </List>

          <Dialog open={saveDialogOpen}>
            <DialogTitle>Save Your Data?</DialogTitle>
            <DialogContent sx={{ width: "300px" }}>
              <DialogContentText>
                Save your data? It will be saved to your hard drive.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  saveGame(gameManager);
                  setSaveDialogOpen(false);
                }}
                autoFocus
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <TitleScreenOptions gameManager={gameManager} />
      )}
    </Drawer>
  );
}

export default ScreenNavigator;
