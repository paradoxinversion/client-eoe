import { getNationCitizens } from "empire-of-evil/src/nations";
import { getAgents } from "empire-of-evil/src/organization";
import { useState } from "react";
import ZonePanel from "../elements/ZonePanel";
import { toDataArray } from "../utilities/dataHelpers";
const eoe = require("empire-of-evil");
const WorldScreen = ({ gameData }) => {
  const [selectedNation] = useState(null);

  const peopleArray = toDataArray(gameData.people);
  const nationsArray = toDataArray(gameData.nations);
  const zonesArray = toDataArray(gameData.zones);
  const nationAgents =
    selectedNation && getAgents(peopleArray, selectedNation.organizationId);

  return (
    <section>
      <header>
        <p className="text-3xl font-bold">World</p>
      </header>
      <div className="flex">
        <section>
          <header className="text-2xl font-bold mb-2">
            <p>Nations</p>
          </header>
          <table className="table-auto border border-separate border-spacing-2">
          <tr>
            <th className="border">Nation</th>
            <th className="border">Population</th>
            <th className="border">Zones</th>
            <th className="border">Agents</th>
          </tr>
          {nationsArray
            .filter((nation) => nation.id !== gameData.player.empireId)
            .map((nation) => (
              <tr key={nation.id}>
                <td className="border">
                  {nation.name}
                </td>
                <td className="border">{getNationCitizens(peopleArray, nation.id).length}</td>
                <td className="border">{nation.size}</td>
                <td className="border">{getAgents(peopleArray, nation.organizationId).length}</td>
              </tr>
            ))}
          </table>
        </section>

        {selectedNation && (
          <section className="ml-4">
            <header className="text-2xl font-bold mb-2">
              <p>{selectedNation.name}</p>
            </header>
            <section className="mb-4">
              <p>Nation Size: {selectedNation.size}?</p>
              <p>
                Nation Citizens:{" "}
                {
                  eoe.citizens.getCitizens(peopleArray, selectedNation.id)
                    .length
                }
                ?
              </p>
              <p>Nation Agents: {nationAgents.length}</p>
            </section>
            <ZonePanel
              title={`${
                eoe.zones.getZones(zonesArray, selectedNation.id).length
              } Zones`}
              zones={eoe.zones.getZones(zonesArray, selectedNation.id)}
            />
          </section>
        )}
      </div>
    </section>
  );
};

export default WorldScreen;
