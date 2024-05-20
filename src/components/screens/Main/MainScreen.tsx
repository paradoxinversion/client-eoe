import { advanceDay } from "empire-of-evil/src/actions";
import {
  checkGameOverState,
  checkVictoryState,
} from "empire-of-evil/src/utilities";
import { useEffect } from "react";
import { Button, Box, Divider, List, Grid, Typography } from "@mui/material";
import {
  NotificationImportant as NotificationImportantIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import { PieArcLabel, PieChart } from "@mui/x-charts/PieChart";

import { setScreen } from "../../../features/screenSlice";
import * as eoe from "empire-of-evil";
import {
  getEvilEmpire,
  getOrgIncome,
  getOrgResources,
  getOrgScienceOutput,
} from "empire-of-evil/src/organization";
import { getInfrastructureLoad } from "empire-of-evil/src/buildings";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateSimActions } from "../../../features/gameLogSlice";
import EventLogItem from "../../elements/EventLogItem";
import { advanceDays } from "empire-of-evil/src/actions/advanceDay";
import HeaderGridItem from "../../elements/HeaderGridItem/HeaderGridItem";
import { setProjects } from "../../../features/scienceSlice";
import { getInfrastructurePercentage } from "empire-of-evil/src/actions/infrastructure";
import { Gauge } from "@mui/x-charts";
import EventLogContainer from "../../elements/EventLog/EventLogContainer/EventLogContainer";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const palette = ["blue", "black"];
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
        <Box id="overview-cards" component="section">
          <Grid container padding={"1rem"} spacing={"1rem"} columns={5}>
            <HeaderGridItem
              title="EVIL"
              content={eoe.organizations.getEvilEmpire().totalEvil}
              span={{ xs: 1 }}
            />
            <HeaderGridItem
              title="Wealth"
              content={`${currencyFormatter.format(
                eoe.GameManager.getInstance().gameData.governingOrganizations[
                  gameData.player.organizationId
                ].wealth
              )}
                  (+${currencyFormatter.format(Math.trunc(getOrgIncome()))})`}
              span={{ xs: 1 }}
            />
            <HeaderGridItem
              title="Expenses"
              content={currencyFormatter.format(payroll + buildingUpkeep)}
              span={{ xs: 1 }}
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
              span={{ xs: 1 }}
            />
            <HeaderGridItem
              title="Science"
              content={`${getEvilEmpire().science} (+${Math.trunc(
                getOrgScienceOutput()
              )})`}
              span={{ xs: 1 }}
            />
            <HeaderGridItem
              title="Zones"
              content={`${
                eoe.zones.getZones(gameData.player.empireId).length
              }/${Object.keys(gameData.zones).length}`}
              span={{ xs: 1 }}
            />

            <HeaderGridItem
              title="Agents"
              content={
                eoe.actions.people.getPeople({
                  personFilter: {
                    organizationId: gameData.player.organizationId,
                  },
                  agentFilter: { agentsOnly: true },
                }).length
              }
              span={{ xs: 1 }}
            />
          </Grid>
        </Box>
        <Divider />
      </Box>
      <EventLogContainer />
    </>
  );
};

export default MainScreen;
