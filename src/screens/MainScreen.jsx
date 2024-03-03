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
  CardContent,
  CardHeader,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AttachMoney,
  LocationCity,
  Science,
  Payment as PaymentIcon,
  Wallet as WalletIcon,
  Domain as DomainIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setScreen } from "../features/screenSlice";
import ZonePanel from "../elements/ZonePanel";
import DataGrid from 'react-data-grid';
import BuildingDataGrid from "../dataGrids/buildingDataGrid";
const eoe = require("empire-of-evil");

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
  const empireZones = eoe.zones.getZones(
    gameManager,
    gameManager.gameData.player.empireId
  );
  const buildings = eoe.buildings.getBuildings(
    gameData,
    {organizationId: gameData.player.organizationId}
  )
  const empireWealth = eoe.zones.getZonesWealth(gameManager, empireZones);
  const infraCost = eoe.buildings.getInfrastructureLoad(
    gameManager,
    gameData.player.organizationId
  );
  const science = eoe.organizations.getScience(
    gameManager,
    gameManager.gameData.player.organizationId
  );
  const infrastructure = eoe.organizations.getInfrastructure(
    gameManager,
    gameManager.gameData.player.organizationId
  );
  const buildingUpkeep = eoe.buildings.getUpkeep(
    gameManager,
    gameManager.gameData.player.organizationId
  );
  const payroll = eoe.organizations.getPayroll(
    gameManager,
    gameManager.gameData.player.organizationId
  );
  const wealthBonuses = eoe.buildings.getWealthBonuses(
    gameManager,
    gameManager.gameData.player.organizationId
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
      <AppBar position="static">
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
      </AppBar>
      <Box>
        <Typography variant="h3">Welcome, OVERLORD.</Typography>
        <Grid container spacing={2}>
          <Grid item sx>
            <Card id="empire-resources">
              <CardContent>
                <Typography>Empire Resources</Typography>

                <Typography>
                  <AttachMoney />
                  Wealth $
                  {
                    gameData.governingOrganizations[
                      gameData.player.organizationId
                    ].wealth
                  }{" "}
                  (+${empireWealth + wealthBonuses})
                </Typography>
                <Typography>
                  <LocationCity />
                  Infrastructure {infraCost}/{infrastructure}
                </Typography>
                <Typography>
                  <Science />
                  Science {science}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className="shadow border rounded border-stone-300 w-48 flex flex-col p-2">
              <CardContent className="text-xs uppercase text-red-500 font-bold tracking-wide">
                <Typography>Empire Expenses</Typography>
                <Typography>
                  <DomainIcon />
                  Building Upkeep ${buildingUpkeep}
                </Typography>
                <Typography>
                  <WalletIcon />
                  Payroll ${payroll}
                </Typography>
                <Typography>
                  <PaymentIcon />
                  Total Expenses ${payroll + buildingUpkeep}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sx>
            <MetricCard title="Empire Zones">
              <MetricNumber
                number={`${
                  eoe.zones.getZones(gameManager, gameData.player.empireId)
                    .length
                }/${Object.keys(gameData.zones).length}`}
              />
            </MetricCard>
          </Grid>
          <Grid item sx>
            <MetricCard title="Empire Agents">
              <MetricNumber
                number={
                  eoe.organizations.getAgents(
                    gameManager,
                    gameData.player.organizationId
                  ).length
                }
              />
            </MetricCard>
          </Grid>
          <Grid item sx>
            <Card
              id="empire-agents"
              className="shadow border rounded border-stone-300 w-48 flex flex-col p-2"
            >
              <CardContent className="font-semibold text-center">
                <Typography>Empire Agents</Typography>
                <Typography>
                  {
                    eoe.organizations.getAgents(
                      gameManager,
                      gameData.player.organizationId
                    ).length
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <ZonePanel gameManager={gameManager} zones={empireZones} title="Empire Zones" />
      {/* <BuildingDataGrid title={"Empire Buildings"} buildings={buildings} gameManager={gameManager} /> */}
    </Box>
  );
};

export default MainScreen;
