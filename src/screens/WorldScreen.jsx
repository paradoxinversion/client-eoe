import { getNationCitizens } from "empire-of-evil/src/nations";
import { getAgents } from "empire-of-evil/src/organization";
import { useState } from "react";
import ZonePanel from "../elements/ZonePanel";
import { toDataArray } from "../utilities/dataHelpers";
const eoe = require("empire-of-evil");
const WorldScreen = ({ gameData }) => {
  const [selectedNation, setSelectedNation] = useState(null);

  const peopleArray = toDataArray(gameData.people);
  const nationsArray = toDataArray(gameData.nations);
  const nationAgents =
    selectedNation && getAgents(gameData, selectedNation.organizationId);

  return (
    <section>
      <header className="h-16">
        <p className="text-3xl font-bold">World</p>
      </header>
      <div className="grid grid-cols-2">
        <section>
          <header className="text-2xl font-bold mb-2">
            <p className="border-b">Nations</p>
          </header>
          <table className="table-auto border-spacing-2">
            <thead>
              <tr className="text-left">
                <th className="pr-4">Nation</th>
                <th className="pr-4">Population</th>
                <th className="pr-4">Zones</th>
                <th className="pr-4">Agents</th>
              </tr>
            </thead>
            <tbody>

              {nationsArray
                .filter((nation) => nation.id !== gameData.player.empireId)
                .map((nation) => (
                  <tr key={nation.id} onClick={()=>{
                    setSelectedNation(nation)
                  }}>
                    <td className="text-right pr-4">
                      {nation.name}
                    </td>
                    <td className="text-right pr-4">{getNationCitizens(gameData, nation.id).length}</td>
                    <td className="text-right pr-4">{nation.size}</td>
                    <td className="text-right pr-4">{getAgents(gameData, nation.organizationId).length}</td>
                  </tr>
                ))}
            </tbody>
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
                eoe.zones.getZones(gameData, selectedNation.id).length
              } Zones`}
              zones={eoe.zones.getZones(gameData, selectedNation.id)}
              gameData={gameData}
            />
          </section>
        )}
      </div>
    </section>
  );
};

export default WorldScreen;
