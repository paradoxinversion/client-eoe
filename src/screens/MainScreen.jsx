import { advanceDay } from "empire-of-evil/src/actions";
import {
  checkGameOverState,
  checkVictoryState,
} from "empire-of-evil/src/utilities";
import { useEffect } from "react";
import MetricCard from "../elements/MetricCard/MetricCard";
import MetricNumber from "../elements/MetricNumber/MetricNumber";
import {
  AppBar,
  Button,
  Box,
  Grid,
  Card,
  Toolbar,
  Typography,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import {
  OpenWith as OpenWithIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../features/screenSlice";
import ZonePanel from "../elements/ZonePanel";
import BuildingDataGrid from "../dataGrids/buildingDataGrid";
import * as eoe from "empire-of-evil";
import PersonDataGrid from "../dataGrids/personDataGrid";

/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const MainScreen = ({
  // setScreen,
  gameManager,
}) => {
  const dispatch = useDispatch();
  const { gameData } = gameManager;

  const empireZones = eoe.zones.getZones(gameManager, gameData.player.empireId);
  const buildings = eoe.buildings.getBuildings(gameManager, {
    organizationId: gameData.player.organizationId,
  });
  const people = eoe.actions.people.getPeople(gameManager, {
    zoneId: empireZones[0].id,
    // nationId: gameManager.
  });
  const empireWealth = eoe.zones.getZonesWealth(gameManager, empireZones);
  const infraCost = eoe.buildings.getInfrastructureLoad(
    gameManager,
    gameData.player.organizationId
  );
  const science = eoe.organizations.getScience(
    gameManager,
    gameData.player.organizationId
  );
  const infrastructure = eoe.organizations.getInfrastructure(
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
  const wealthBonuses = eoe.buildings.getWealthBonuses(
    gameManager,
    gameData.player.organizationId
  );

  useEffect(() => {
    const gameOver = checkGameOverState(gameManager);
    if (gameOver) {
      dispatch(setScreen("game-over"));
    }
    // const victory = checkVictoryState(gameData);
    // if (victory){
    //   setScreen("victory")
    // }
  }, [gameManager, setScreen]);
  return (
    <Box>
      <Toolbar />

      <Box>
        <Box id="home-greeting" component="header" padding="1rem">
          <Typography variant="h3">Welcome, OVERLORD.</Typography>
        </Box>
        <Divider />
        <Box>
          <Button
            color="inherit"
            onClick={() => {
              const result = advanceDay(gameManager);
              // const gameOver = checkGameOverState(result.updatedGameData);
              // if (gameOver) {
              //   setScreen("game-over");
              // }
              // const victory = checkVictoryState(result.updatedGameData);
              // if (victory){
              //   setScreen("victory")
              // }

              dispatch(setScreen("events"));
            }}
          >
            {new Date(gameData.gameDate).toDateString()}
          </Button>
        </Box>
        <Divider />
        <Box id="overview-cards" component="section">
          <Stack
            id
            padding="1rem"
            direction={"row"}
            spacing={"1rem"}
            justifyContent={"center"}
          >
            <MetricNumber
              title="Wealth"
              number={`${
                gameData.governingOrganizations[gameData.player.organizationId]
                  .wealth
              }
                  (+${parseInt(empireWealth + wealthBonuses)})`}
            />
            <MetricNumber title="Expenses" number={payroll + buildingUpkeep} />
            <MetricNumber
              title="Infrastructure"
              number={payroll + buildingUpkeep}
            />
            <MetricNumber title="Science" number={science} />
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
              number={
                eoe.organizations.getEvilEmpire(
                  gameManager,
                  gameData.player.organizationId
                ).totalEvil
              }
            />
            {/* <Card sx={{ width: 200 }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Empire Resources
                </Typography>
                <Typography variant="body2">
                  Wealth: $
                  {
                    gameData.governingOrganizations[
                      gameData.player.organizationId
                    ].wealth
                  }
                  (+${empireWealth + wealthBonuses})
                </Typography>
                <Typography variant="body2">
                  Expenses: ${payroll + buildingUpkeep}
                </Typography>
                <Typography variant="body2">
                  Infrastructure: {infraCost}/{infrastructure}
                </Typography>
                <Typography variant="body2">Science: {science}</Typography>
                <Typography variant="body2">
                  Zones:{" "}
                  {`${
                    eoe.zones.getZones(gameManager, gameData.player.empireId)
                      .length
                  }/${Object.keys(gameData.zones).length}`}
                </Typography>
                <Typography variant="body2">
                  Agents:{" "}
                  {
                    eoe.organizations.getAgents(
                      gameManager,
                      gameData.player.organizationId
                    ).length
                  }
                </Typography>
              </CardContent>
            </Card> */}
          </Stack>
        </Box>
        <Divider />
      </Box>
      <Box padding="1rem">
        <Paper sx={{ width: "100%", padding: "0.5rem" }}>
          <Stack spacing={2} direction="row" alignItems="center">
            <OpenWithIcon />
            <Typography>Foo</Typography>
            <Typography>Bar</Typography>
          </Stack>
        </Paper>
      </Box>
      <Grid
        spacing="1rem"
        container
        id="overview-holdings"
        padding="1rem"
        component="section"
        columns={10}
      >
        <Grid item xs={5}>
          <Card sx={{ padding: "1rem" }}>
            <ZonePanel
              gameManager={gameManager}
              zones={empireZones}
              title="Empire Zones"
            />
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card sx={{ padding: "1rem" }}>
            <BuildingDataGrid
              title={"Empire Buildings"}
              buildings={buildings}
              gameManager={gameManager}
            />
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card sx={{ padding: "1rem" }}>
            <PersonDataGrid
              title={"People"}
              people={people}
              gameManager={gameManager}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainScreen;
