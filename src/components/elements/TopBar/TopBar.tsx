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
import { managers, actions } from "empire-of-evil";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addEventLog, updateSimActions } from "../../../features/gameLogSlice";
import { setProjects } from "../../../features/scienceSlice";
import { setScreen } from "../../../features/screenSlice";
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
              {new Date(
                managers.game.GameManager.getInstance().gameData.gameDate
              ).toDateString()}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" alignSelf="center">
                Wait
              </Typography>
              <Button
                size="small"
                onClick={() => {
                  actions.advanceDay.advanceDay();
                  dispatch(
                    updateSimActions(
                      managers.game.GameManager.getInstance().gameData.gameLog
                    )
                  );

                  dispatch(
                    setProjects(
                      managers.science.ScienceManager.getInstance()
                        .activeProjects
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
                  actions.advanceDay.advanceDays(5);
                  dispatch(
                    updateSimActions(
                      managers.game.GameManager.getInstance().gameData.gameLog
                    )
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
