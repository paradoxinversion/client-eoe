import { useSelector, useDispatch } from "react-redux";
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
} from "@mui/material";

import {
  Save as SaveIcon,
  Groups as GroupsIcon,
  Functions as FunctionsIcon,
  TravelExplore as TravelExploreIcon,
  TipsAndUpdates as TipsAndUpdatesIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import TitleScreenOptions from "./ScreenNavigator/TitleScreenOptions";
import { useState } from "react";

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
  // {
  //   screen: "intel",
  //   title: "Intel",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth={1.5}
  //       stroke="currentColor"
  //       className="w-5 h-5 mr-2"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
  //       />
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  //       />
  //     </svg>
  //   ),
  // },
  {
    screen: "personnel",
    title: "Personnel",
    icon: <GroupsIcon />,
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
];

export const screenNavigatorWidth = 150;

function ScreenNavigator({ gameManager }) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const f = useSelector((state) => state.gameManager);

  const { activityManager, plotManager } = gameManager;

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
      {f.initialized && Object.keys(gameManager.gameData).length > 0 ? (
        <>
          <List sx={{ width: "inherit" }}>
            {screens.map((screen) => (
              <Button
                key={screen.screen}
                startIcon={screen.icon && screen.icon}
                className="flex items-center tracking-wider text-sm p-2"
                onClick={() => {
                  dispatch(setScreen(screen.screen));
                }}
              >
               {screen.title}
              </Button>
            ))}
          </List>
          <Button
            startIcon={<SaveIcon />}
            onClick={() => {
              // saveGame(gameManager, activityManager, plotManager);
              setSaveDialogOpen(true);
            }}
          >
            Save
          </Button>
          <Dialog open={saveDialogOpen}>
            <DialogTitle>Save Your Data?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Save your data? It will be saved to your hard drive.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  saveGame(gameManager, activityManager, plotManager);
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
