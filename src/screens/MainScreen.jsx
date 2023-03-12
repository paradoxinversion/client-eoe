import advanceDay from "../actions/advanceDay";
import PersonPanel from "../elements/PersonPanel";
import ZonePanel from "../elements/ZonePanel";
import { toDataArray } from "../utilities/dataHelpers";

const eoe = require("empire-of-evil");

/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const MainScreen = ({
  gameData,
  setGameData,
  setScreen,
  eventQueue,
  activityManager,
  plotManager
}) => {
  const zonesArray = toDataArray(gameData.zones);
  const peopleArray = toDataArray(gameData.people);
  const buildingArray = toDataArray(gameData.buildings);

  const empireZones = eoe.zones.getZones(zonesArray, gameData.player.empireId);
  const empireWealth = eoe.zones.getZonesWealth(peopleArray, empireZones);
  const infraCost = eoe.buildings.getInfrastructureLoad(
    buildingArray,
    gameData.player.organizationId
  );
  const science = eoe.organizations.getScience(
    peopleArray,
    gameData.player.organizationId
  );
  const infrastructure = eoe.organizations.getInfrastructure(
    peopleArray,
    gameData.player.organizationId
  );
  const buildingUpkeep = eoe.buildings.getUpkeep(buildingArray, gameData.player.organizationId);
  const payroll = eoe.organizations.getPayroll(peopleArray, gameData.player.organizationId);
  const wealthBonuses = eoe.buildings.getWealthBonuses(buildingArray, gameData.player.organizationId);
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

            if (result.updatedGameData.people[gameData.player.overlordId].currentHealth <= 0){
              setScreen("game-over");
            }

            setGameData(result.updatedGameData);
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
            Object.values(gameData.zones),
            gameData.player.empireId
          )}
        />
        <PersonPanel
          title={"EVIL Roster"}
          people={eoe.organizations.getAgents(
            toDataArray(gameData.people),
            gameData.player.organizationId
          )}
          gameData={gameData}
        />
      </div>

    </div>
  );
};

export default MainScreen;
