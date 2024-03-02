import { advanceDay } from "empire-of-evil/src/actions";
import {
  checkGameOverState,
  checkVictoryState,
} from "empire-of-evil/src/utilities";
import { useEffect } from "react";
import MetricCard from "../elements/MetricCard/MetricCard";
import MetricNumber from "../elements/MetricNumber/MetricNumber";
import {AppBar, Button, Box, ButtonGroup, Card, CardContent, CardHeader, Toolbar, Typography} from "@mui/material";
import {AttachMoney, LocationCity, Science, Payment as PaymentIcon, Wallet as WalletIcon, Domain as DomainIcon} from '@mui/icons-material'
const eoe = require("empire-of-evil");

/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const MainScreen = ({
  setScreen,
  gameManager
}) => {
  const {gameData} = gameManager;
  const empireZones = eoe.zones.getZones(gameManager, gameManager.gameData.player.empireId);
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
      setScreen("game-over");
    }
    // const victory = checkVictoryState(gameData);
    // if (victory){
    //   setScreen("victory")
    // }
  }, [gameManager, setScreen]);
  return (
    <Box>
      <AppBar position="static">
        <Button color='inherit' onClick={() => {
            const result = advanceDay(
              gameManager,
            );
            // const gameOver = checkGameOverState(result.updatedGameData);
            // if (gameOver) {
            //   setScreen("game-over");
            // }
            // const victory = checkVictoryState(result.updatedGameData);
            // if (victory){
            //   setScreen("victory")
            // }
            setScreen("events");
          }}>{new Date(gameData.gameDate).toDateString()}</Button>
      </AppBar>
      <Box>
        <Typography variant='h3'>Welcome, OVERLORD.</Typography>
        <Box className="grid grid-cols-6 gap-4 w-fit">
          <Card
            id="empire-resources"
          >
            <CardContent>
              <Typography>Empire Resources</Typography>

              <Typography className="flex items-center">
                <AttachMoney/>
                Wealth $
                {
                  gameData.governingOrganizations[
                    gameData.player.organizationId
                  ].wealth
                }{" "}
                (+${empireWealth + wealthBonuses})
              </Typography>
              <Typography className="flex items-center">
                <LocationCity />
                Infrastructure {infraCost}/{infrastructure}
              </Typography>
              <Typography className="flex items-center">
                <Science />
                Science {science}
              </Typography>
            </CardContent>
          </Card>
          <Card className="shadow border rounded border-stone-300 w-48 flex flex-col p-2">
            <CardContent className="text-xs uppercase text-red-500 font-bold tracking-wide">
              <Typography>Empire Expenses</Typography>
              <Typography className="flex items-center">
                <DomainIcon/>
                Building Upkeep ${buildingUpkeep}
              </Typography>
              <Typography className="flex items-center">
                <WalletIcon/>
                Payroll ${payroll}
              </Typography>
              <Typography className="flex items-center">
                <PaymentIcon />
                Total Expenses ${payroll + buildingUpkeep}
              </Typography>
            </CardContent>
          </Card>
          {/* <MetricCard title="Empire Zones">
            <MetricNumber number={`${eoe.zones.getZones(gameManager, gameData.player.empireId).length}/${Object.keys(gameData.zones).length}`} />
          </MetricCard>
          <MetricCard title="Empire Agents">
            <MetricNumber number={ eoe.organizations.getAgents(
                    gameManager,
                    gameData.player.organizationId
                  ).length} />
          </MetricCard> */}
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
        </Box>
      </Box>
    </Box>
  );
};

export default MainScreen;
