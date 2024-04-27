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
  getOrgIncome,
  getOrgResources,
  getOrgScienceOutput,
} from "empire-of-evil/src/organization";
import { getInfrastructureLoad } from "empire-of-evil/src/buildings";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateGameData } from "../../actions/dataManagement";
import { updateSimActions } from "../../features/gameLogSlice";
import EventLogItem from "../../elements/EventLogItem";
import { advanceDays } from "empire-of-evil/src/actions/advanceDay";
import HeaderGridItem from "../../elements/HeaderGridItem";
import { setProjects } from "../../features/scienceSlice";
import { getInfrastructurePercentage } from "empire-of-evil/src/actions/infrastructure";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const MainScreen = () => {
  const dispatch = useAppDispatch();
  const { gameData } = eoe.GameManager.getInstance();
  const eventLog = useAppSelector((state) => state.gameLog.events);
  const reverseLog = [...eventLog].reverse();
  const empireResources = eoe.organizations.getOrgResources(
    gameData.player.organizationId
  );
  const infrastructurePercentage = getInfrastructurePercentage(
    gameData.player.organizationId
  );

  const science = eoe.organizations.getScience(gameData.player.organizationId);

  const buildingUpkeep = eoe.buildings.getUpkeep(
    gameData.player.organizationId
  );
  const payroll = eoe.organizations.getPayroll(gameData.player.organizationId);

  useEffect(() => {
    const gameOver = checkGameOverState();
    if (gameOver) {
      dispatch(setScreen("game-over"));
    }
    const victory = checkVictoryState();
    if (victory) {
      dispatch(setScreen("victory"));
    }
  }, [setScreen]);
  return (
    <>
      <Box>
        <Box>
          <Button
            color="inherit"
            onClick={() => {
              advanceDay();
              dispatch(
                updateSimActions(eoe.GameManager.getInstance().gameData.gameLog)
              );
              dispatch(
                setProjects(
                  eoe.GameManager.getInstance().scienceManager.activeProjects
                )
              );
              dispatch(setScreen("events"));
            }}
          >
            {new Date(gameData.gameDate).toDateString()}
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              advanceDays(5);
              dispatch(
                updateSimActions(eoe.GameManager.getInstance().gameData.gameLog)
              );
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
              content={`${currencyFormatter.format(
                eoe.GameManager.getInstance().gameData.governingOrganizations[
                  gameData.player.organizationId
                ].wealth
              )}
                  (+${currencyFormatter.format(Math.trunc(getOrgIncome()))})`}
            />
            <HeaderGridItem
              title="Expenses"
              content={currencyFormatter.format(payroll + buildingUpkeep)}
            />
            <HeaderGridItem
              title="Infrastructure"
              content={`${
                getOrgResources(
                  eoe.GameManager.getInstance().gameData.player.organizationId
                ).infrastructure
              }/${getInfrastructureLoad(
                eoe.GameManager.getInstance().gameData.player.organizationId
              )}`}
            />
            <HeaderGridItem
              title="Science"
              content={`${getEvilEmpire().science} (+${Math.trunc(
                getOrgScienceOutput()
              )})`}
            />
            <HeaderGridItem
              title="Zones"
              content={`${
                eoe.zones.getZones(gameData.player.empireId).length
              }/${Object.keys(gameData.zones).length}`}
            />

            <HeaderGridItem
              title="Agents"
              content={
                eoe.actions.people.getPeople({
                  organizationId: gameData.player.organizationId,
                  agentFilter: { agentsOnly: true },
                }).length
              }
            />

            <HeaderGridItem
              title="EVIL"
              content={eoe.organizations.getEvilEmpire().totalEvil}
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
