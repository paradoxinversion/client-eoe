import { getZoneCitizens } from "empire-of-evil/src/zones";
import { toDataArray } from "../utilities/dataHelpers";
const ZonePanel = ({ title, zones, gameData }) => {
  return (
    <section className="mb-4">
      <header className="text-xl font-bold border-b">
        <p>{title}</p>
      </header>
      <table className="p-2">
        <thead>
          <tr>
            <th className="pr-4">Zone</th>
            <th className="pr-4">Citizens</th>
            <th className="pr-4">Civillians</th>
          </tr>
        </thead>
        <tbody>

          {zones.map((zone) => (
            <tr key={zone.id}>
              <td className="pr-4">{zone.name}</td>
              <td className="text-right pr-4">{getZoneCitizens(gameData, zone.id, false, true).length}</td>
              <td className="text-right pr-4">{getZoneCitizens(gameData, zone.id, true, true).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ZonePanel;
