const eoe = require("empire-of-evil");

const ZonePanel = () => {
  return (
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
  );
};

export default ZonePanel;
