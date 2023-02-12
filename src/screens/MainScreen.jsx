import ZonePanel from "../elements/ZonePanel";

const eoe = require("empire-of-evil");
const MainScreen = ({ gameData }) => {
  return (
    <div>
      <section>
        <header>
          <p>EVIL Empire Citizens</p>
        </header>
        {eoe.citizens
          .getCitizens(Object.values(gameData.people), gameData.player.empireId)
          .map((person) => (
            <div>
              <p>{person.name}</p>
            </div>
          ))}
      </section>
      <ZonePanel zones={eoe.zones.getZones(Object.values(gameData.zones))} />
      <section>
        <header>
          <p>EVIL Empire Zones</p>
        </header>
        {eoe.zones
          .getZones(Object.values(gameData.zones), gameData.player.empireId)
          .map((zone) => (
            <div>
              <p>{zone.name}</p>
            </div>
          ))}
      </section>
    </div>
  );
};

export default MainScreen;
