import { advanceDay } from "empire-of-evil/src/actions";
import { getControlledZones } from "empire-of-evil/src/organization";
import { checkGameOverState, checkVictoryState } from "empire-of-evil/src/utilities";
import { useEffect } from "react";
import PersonPanel from "../elements/PersonPanel";
import ZonePanel from "../elements/ZonePanel";

const eoe = require("empire-of-evil");

/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const MainScreen = ({
  gameData,
  updateGameData,
  setScreen,
  eventQueue,
  activityManager,
  plotManager
}) => {

  const empireZones = eoe.zones.getZones(gameData, gameData.player.empireId);
  const empireWealth = eoe.zones.getZonesWealth(gameData, empireZones);
  const infraCost = eoe.buildings.getInfrastructureLoad(
    gameData,
    gameData.player.organizationId
  );
  const science = eoe.organizations.getScience(
    gameData,
    gameData.player.organizationId
  );
  const infrastructure = eoe.organizations.getInfrastructure(
    gameData,
    gameData.player.organizationId
  );
  const buildingUpkeep = eoe.buildings.getUpkeep(gameData, gameData.player.organizationId);
  const payroll = eoe.organizations.getPayroll(gameData, gameData.player.organizationId);
  const wealthBonuses = eoe.buildings.getWealthBonuses(gameData, gameData.player.organizationId);
  useEffect(()=>{
    const gameOver = checkGameOverState(gameData);
    if (gameOver){
      setScreen("game-over");
    }
    // const victory = checkVictoryState(gameData);
    // if (victory){
    //   setScreen("victory")
    // }
  },[gameData, setScreen])
  return (
    <div>
      <header className="h-16">
        <p className="text-3xl font-bold">EVIL Empire Overview</p>
      </header>
      <div className="mb-4">
        <p>{new Date(gameData.gameDate).toDateString()}</p>
        <button
          className="border rounded px-2 py-1 border-slate-400"
          onClick={() => {
            const result = advanceDay(gameData, eventQueue, activityManager, plotManager);
            const gameOver = checkGameOverState(result.updatedGameData);
            if (gameOver){
              setScreen("game-over");
            }
            // const victory = checkVictoryState(result.updatedGameData);
            // if (victory){
            //   setScreen("victory")
            // }
            updateGameData(result.updatedGameData);
            setScreen("events");
          }}
        >
          Next Day
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <header className="text-xl font-bold border-b">
            <p>Empire Resources</p>
          </header>
          <div className="p-2">
            <p>
              Money: $
              {
                gameData.governingOrganizations[gameData.player.organizationId]
                  .wealth
              }{" "}
              (+${empireWealth + wealthBonuses})
            </p>
            <p>
              Infrastructure: {infraCost}/{infrastructure}
            </p>
            <p>Science: {science}</p>
          </div>
        </div>
        <div className="mb-4">
          <header className="text-xl font-bold border-b">
            <p>Empire Expenses</p>
          </header>
          <div className="p-2">
            <p>
              Building Upkeep: ${buildingUpkeep}
            </p>
            <p>
              Payroll: ${payroll}
            </p>
            <p>Total Expenses: ${payroll + buildingUpkeep}</p>
          </div>
        </div>
        <ZonePanel
          title={"Evil Empire Zones"}
          zones={eoe.zones.getZones(
            gameData,
            gameData.player.empireId
          )}
          gameData={gameData}
        />
        <PersonPanel
          title={"EVIL Roster"}
          people={eoe.organizations.getAgents(
            gameData,
            gameData.player.organizationId
          )}
          gameData={gameData}
        />
      </div>

    </div>
  );
};

export default MainScreen;
