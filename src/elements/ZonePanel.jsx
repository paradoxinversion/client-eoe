import { numberWithErrorMargin } from "empire-of-evil/src/utilities";
import { getZoneCitizens } from "empire-of-evil/src/zones";
import { toDataArray } from "../utilities/dataHelpers";
import { GameManager } from "empire-of-evil";
const ZonePanel = ({ title, zones, gameManager }) => {
  const {gameData} = gameManager;
  return (
    <section className="mb-4">
      <header className="text-xl font-bold border-b">
        <p>{title}</p>
      </header>
      <table className="p-2">
        <thead>
          <tr>
            <th>Zone</th>
            <th>Citizens</th>
            <th>Civillians</th>
            <th>Intel Confidence</th>
          </tr>
        </thead>
        <tbody>

          {zones.map((zone) => (
            <tr key={zone.id}>
              <td>{zone.name}</td>
              {/* <td>{getZoneCitizens(gameData, zone.id, false, true).length}</td> */}
              <td>{parseInt(numberWithErrorMargin(getZoneCitizens(gameManager, zone.id, false, true).length, zone.intelligenceLevel))}{zone.intelligenceLevel !== 100 && "?"}</td>
              <td>{parseInt(numberWithErrorMargin(getZoneCitizens(gameManager, zone.id, true, true).length, zone.intelligenceLevel))}{zone.intelligenceLevel !== 100 && "?"}</td>
              <td>{zone.intelligenceLevel}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ZonePanel;
