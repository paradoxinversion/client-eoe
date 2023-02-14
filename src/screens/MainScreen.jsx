import advanceDay from "../actions/advanceDay";
import PersonPanel from "../elements/PersonPanel";
import ZonePanel from "../elements/ZonePanel";
import { toDataArray } from "../utilities/dataHelpers";

const eoe = require("empire-of-evil");
const MainScreen = ({ gameData, setGameData, setScreen }) => {
  const empireZones = eoe.zones.getZones(
    toDataArray(gameData.zones),
    gameData.player.empireId
  );
  const empireWealth = eoe.zones.getZonesWealth(
    toDataArray(gameData.people),
    empireZones
  );
  const infraCost = eoe.zones.getZonesInfrastructureCost(empireZones);
  return (
    <div>
      <header>
        <p className="text-3xl font-bold">EVIL Empire Overview</p>
      </header>
      <div className="mb-4 flex items-center justify-between">
        <p>{new Date("2000-1-1").toDateString()}</p>
        <button
          className="border rounded px-2 py-1"
          onClick={() => {
            const result = advanceDay(gameData);
            const updatedGameData = JSON.parse(JSON.stringify(gameData));
            updatedGameData.events = result;
            setGameData(updatedGameData);
            setScreen("events");
          }}
        >
          Next Day
        </button>
      </div>
      <div className="border rounded mb-4">
        <header className="text-xl font-bold border-b p-4">
          <p>Empire Resources</p>
        </header>
        <div className="p-2">
          <p>
            Money: $
            {
              gameData.governingOrganizations[gameData.player.organizationId]
                .wealth
            }{" "}
            (+${empireWealth})
          </p>
          <p>Infrastructure: {infraCost}/1</p>
          <p>Science: 9999</p>
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
      />
    </div>
  );
};

export default MainScreen;
