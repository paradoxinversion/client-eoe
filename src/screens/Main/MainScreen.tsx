import { advanceDay } from "empire-of-evil/src/actions";
import {
  checkGameOverState,
  checkVictoryState,
} from "empire-of-evil/src/utilities";
import { useEffect } from "react";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import { Button, Box, Typography, Divider, Stack, Paper } from "@mui/material";
import { NotificationImportant as NotificationImportantIcon } from "@mui/icons-material";
import { setScreen } from "../../features/screenSlice";
import * as eoe from "empire-of-evil";
import {
  getEvilEmpire,
  getOrgResources,
} from "empire-of-evil/src/organization";
import { getInfrastructureLoad } from "empire-of-evil/src/buildings";
import { useAppDispatch } from "../../app/hooks";
import { updateGameData } from "../../actions/dataManagement";
import { updateSimActions } from "../../features/gameLogSlice";

const MainScreen = ({ gameManager }: { gameManager: eoe.GameManager }) => {
  const dispatch = useAppDispatch();
  const { gameData } = gameManager;

  const empireResources = eoe.organizations.getOrgResources(
    gameManager,
    gameData.player.organizationId
  );

  const science = eoe.organizations.getScience(
    gameManager,
    gameData.player.organizationId
  );

  const buildingUpkeep = eoe.buildings.getUpkeep(
    gameManager,
    gameData.player.organizationId
  );
  const payroll = eoe.organizations.getPayroll(
    gameManager,
    gameData.player.organizationId
  );

  useEffect(() => {
    const gameOver = checkGameOverState(gameManager);
    if (gameOver) {
      dispatch(setScreen("game-over"));
    }
    const victory = checkVictoryState(gameManager);
    if (victory) {
      dispatch(setScreen("victory"));
    }
  }, [gameManager, setScreen]);
  return (
    <>
      <Box>
        <Box>
          <Button
            color="inherit"
            onClick={() => {
              advanceDay(gameManager);
              dispatch(updateSimActions(gameManager.gameData.gameLog));
              dispatch(setScreen("events"));
            }}
          >
            {new Date(gameData.gameDate).toDateString()}
          </Button>
        </Box>
        <Divider />
        <Box id="overview-cards" component="section">
          <Stack
            padding="1rem"
            direction={"row"}
            spacing={"1rem"}
            justifyContent={"center"}
          >
            <MetricNumber
              title="Wealth"
              number={`${
                gameManager.gameData.governingOrganizations[
                  gameData.player.organizationId
                ].wealth
              }
                  (+${empireResources.wealth})`}
            />
            <MetricNumber title="Expenses" number={payroll + buildingUpkeep} />
            <MetricNumber
              title="Infrastructure"
              number={`${
                getOrgResources(
                  gameManager,
                  gameManager.gameData.player.organizationId
                ).infrastructure
              }/${getInfrastructureLoad(
                gameManager,
                gameManager.gameData.player.organizationId
              )}`}
            />
            <MetricNumber
              title="Science"
              number={`${getEvilEmpire(gameManager).science} (+${science})`}
            />
            <MetricNumber
              title="Zones"
              number={`${
                eoe.zones.getZones(gameManager, gameData.player.empireId).length
              }/${Object.keys(gameData.zones).length}`}
            />
            <MetricNumber
              title="Agents"
              number={
                eoe.organizations.getAgents(
                  gameManager,
                  gameData.player.organizationId
                ).length
              }
            />
            <MetricNumber
              title="Evil"
              number={eoe.organizations.getEvilEmpire(gameManager).totalEvil}
            />
          </Stack>
        </Box>
        <Divider />
      </Box>
      <Box padding="1rem">
        <Paper sx={{ width: "100%", padding: "0.5rem" }}>
          <Stack spacing={2} direction="row" alignItems="center">
            <NotificationImportantIcon />
            <Typography>Click the date to end your turn.</Typography>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default MainScreen;
