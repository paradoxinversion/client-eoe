import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { GameManager } from "empire-of-evil";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { advanceDay } from "empire-of-evil/src/actions";
import { addEventLog, updateSimActions } from "../../../features/gameLogSlice";
import { setProjects } from "../../../features/scienceSlice";
import { setScreen } from "../../../features/screenSlice";
import { advanceDays } from "empire-of-evil/src/actions/advanceDay";
import { setSidebarOpen } from "../../../features/sidebarSlice";

const TopBar = ({ gameSessionActive }: { gameSessionActive: boolean }) => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.sidebar.sidebarOpen);
  const toggleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        {gameSessionActive && (
          <>
            <Typography variant="body2" flexGrow={1}>
              {GameManager.getInstance().gameData.gameDate.toDateString()}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" alignSelf="center">
                Wait
              </Typography>
              <Button
                size="small"
                onClick={() => {
                  advanceDay();
                  dispatch(
                    updateSimActions(GameManager.getInstance().gameData.gameLog)
                  );

                  dispatch(
                    setProjects(
                      GameManager.getInstance().scienceManager.activeProjects
                    )
                  );
                  dispatch(setScreen("events"));
                }}
              >
                1 Day
              </Button>
              <Button
                size="small"
                onClick={() => {
                  advanceDays(5);
                  dispatch(
                    updateSimActions(GameManager.getInstance().gameData.gameLog)
                  );
                  dispatch(setScreen("events"));
                }}
              >
                5 Days
              </Button>
            </Stack>
          </>
        )}
        <Box flexGrow={1}></Box>
        <Typography variant="h6">Empire of Evil</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
