import { advanceDay } from "empire-of-evil/src/actions";
import {
  checkGameOverState,
  checkVictoryState,
} from "empire-of-evil/src/utilities";
import { useEffect } from "react";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import {
  Button,
  Box,
  Typography,
  Divider,
  Stack,
  Paper,
  List,
  Grid,
} from "@mui/material";
import {
  NotificationImportant as NotificationImportantIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import { setScreen } from "../../features/screenSlice";
import * as eoe from "empire-of-evil";
import {
  getEvilEmpire,
  getOrgResources,
} from "empire-of-evil/src/organization";
import { getInfrastructureLoad } from "empire-of-evil/src/buildings";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateGameData } from "../../actions/dataManagement";
import { updateSimActions } from "../../features/gameLogSlice";
import EventLogItem from "../../elements/EventLogItem";
import { advanceDays } from "empire-of-evil/src/actions/advanceDay";
import HeaderGridItem from "../../elements/HeaderGridItem";
import { setProjects } from "../../features/scienceSlice";

const MainScreen = ({ gameManager }: { gameManager: eoe.GameManager }) => {
  const dispatch = useAppDispatch();
  const { gameData } = gameManager;
  const eventLog = useAppSelector((state) => state.gameLog.events);
  const reverseLog = [...eventLog].reverse();
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
              dispatch(setProjects(gameManager.scienceManager.activeProjects));
              dispatch(setScreen("events"));
            }}
          >
            {new Date(gameData.gameDate).toDateString()}
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              advanceDays(gameManager, 5);
              dispatch(updateSimActions(gameManager.gameData.gameLog));
              dispatch(setScreen("events"));
            }}
          >
            5 Days
          </Button>
        </Box>
        <Divider />
        <Box id="overview-cards" component="section">
          <Grid container padding={"1rem"} spacing={"1rem"}>
            <HeaderGridItem
              title="Wealth"
              content={`${
                gameManager.gameData.governingOrganizations[
                  gameData.player.organizationId
                ].wealth
              }
                  (+${empireResources.wealth})`}
            />
            <HeaderGridItem
              title="Expenses"
              content={payroll + buildingUpkeep}
            />
            <HeaderGridItem
              title="Infrastructure"
              content={`${
                getOrgResources(
                  gameManager,
                  gameManager.gameData.player.organizationId
                ).infrastructure
              }/${getInfrastructureLoad(
                gameManager,
                gameManager.gameData.player.organizationId
              )}`}
            />
            <HeaderGridItem
              title="Science"
              content={`${getEvilEmpire(gameManager).science} (+${science})`}
            />
            <HeaderGridItem
              title="Zones"
              content={`${
                eoe.zones.getZones(gameManager, gameData.player.empireId).length
              }/${Object.keys(gameData.zones).length}`}
            />

            <HeaderGridItem
              title="Agents"
              content={
                eoe.actions.people.getPeople(gameManager, {
                  organizationId: gameData.player.organizationId,
                  agentFilter: { agentsOnly: true },
                }).length
              }
            />

            <HeaderGridItem
              title="EVIL"
              content={eoe.organizations.getEvilEmpire(gameManager).totalEvil}
            />
          </Grid>
        </Box>
        <Divider />
      </Box>
      <List>
        {reverseLog.map((event, index) => (
          <EventLogItem
            key={index}
            text={event.text}
            color={event.color}
            icon={event.icon}
          />
        ))}
      </List>
    </>
  );
};

export default MainScreen;
