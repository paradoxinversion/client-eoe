import { useEffect } from "react";
import { Button, Box, Divider, List, Grid, Typography } from "@mui/material";
import { setScreen } from "../../../../features/screenSlice";
import { actions, managers, utils } from "empire-of-evil";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import HeaderGridItem from "../../../elements/HeaderGridItem/HeaderGridItem";
import EventLogContainer from "../../../elements/EventLog/EventLogContainer/EventLogContainer";
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const palette = ["blue", "black"];
const MainScreen = () => {
  const dispatch = useAppDispatch();
  const { gameData } = managers.game.GameManager.getInstance();
  const eventLog =
    managers.game.GameManager.getInstance().gameData.gameLog.events;
  const reverseLog = [...eventLog].reverse();
  const empireResources = actions.organization.getOrgResources(
    gameData.player.organizationId
  );
  const infrastructurePercentage =
    actions.infrastructure.getInfrastructurePercentage(
      gameData.player.organizationId
    );

  const science = actions.organization.getScience(
    gameData.player.organizationId
  );

  const buildingUpkeep = actions.buildings.getUpkeep(
    gameData.player.organizationId
  );
  const payroll = actions.organization.getPayroll(
    gameData.player.organizationId
  );

  useEffect(() => {
    const gameOver = utils.utilities.checkGameOverState();
    if (gameOver) {
      dispatch(setScreen("game-over"));
    }
    const victory = utils.utilities.checkVictoryState();
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
              content={actions.organization.getEvilEmpire()?.totalEvil}
              span={{ xs: 1 }}
            />
            <HeaderGridItem
              title="Wealth"
              content={`${currencyFormatter.format(
                managers.game.GameManager.getInstance().gameData
                  .governingOrganizations[gameData.player.organizationId]
                  ?.wealth
              )}
                  (+${currencyFormatter.format(
                    Math.trunc(actions.organization.getOrgIncome())
                  )})`}
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
                actions.organization.getOrgResources(
                  managers.game.GameManager.getInstance().gameData.player
                    .organizationId
                ).infrastructure
              }/${actions.buildings.getInfrastructureLoad(
                managers.game.GameManager.getInstance().gameData.player
                  .organizationId
              )}`}
              span={{ xs: 1 }}
            />
            <HeaderGridItem
              title="Science"
              content={`${
                actions.organization.getEvilEmpire()?.science
              } (+${Math.trunc(actions.organization.getOrgScienceOutput())})`}
              span={{ xs: 1 }}
            />
            <HeaderGridItem
              title="Zones"
              content={`${
                actions.zones.getZones({
                  nationId: actions.organization.getEvilEmpire()?.nationId,
                  organizationId: actions.organization.getEvilEmpire()?.id,
                }).length
              }/${Object.keys(gameData.zones).length}`}
              span={{ xs: 1 }}
            />

            <HeaderGridItem
              title="Agents"
              content={
                actions.people.getPeople({
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
      <EventLogContainer
        events={managers.game.GameManager.getInstance().gameData.gameLog.events}
      />
    </>
  );
};

export default MainScreen;
