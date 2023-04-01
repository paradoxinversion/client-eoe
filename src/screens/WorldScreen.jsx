import { getNationCitizens } from "empire-of-evil/src/nations";
import { getAgents } from "empire-of-evil/src/organization";
import { useState } from "react";
import ZonePanel from "../elements/ZonePanel";
import { toDataArray } from "../utilities/dataHelpers";
import { MetricCard } from "../elements/MetricCard";
import Modal from "../elements/Modal";
const eoe = require("empire-of-evil");
const WorldScreen = ({ gameData }) => {
  const [selectedNation, setSelectedNation] = useState(null);

  const peopleArray = toDataArray(gameData.people);
  const nationsArray = toDataArray(gameData.nations);
  const nationAgents =
    selectedNation && getAgents(gameData, selectedNation.organizationId);

  return (
    <section>
      {selectedNation && (
        <Modal>
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
          <button className="btn btn-primary" onClick={()=>{setSelectedNation(null)}}>Close</button>
        </Modal>
      )}
      <div
        id="top-bar"
        className="bg-stone-900 w-full text-stone-300 flex justify-end items-center h-10"
      />
      <section className="p-2">
        <header className="h-16">
          <p className="text-3xl font-bold">World</p>
        </header>
        <div className="grid grid-cols-3 gap-4 w-fit mb-4">
          <MetricCard title="Foreign Nations">
            {nationsArray.length - 1}
          </MetricCard>
        </div>
        <div className="">
          <section>
            <header className="text-2xl font-bold mb-2">
              <p className="border-b">Nations</p>
            </header>
            <table>
              <thead>
                <tr>
                  <th>Nation</th>
                  <th>Population</th>
                  <th>Zones</th>
                  <th>Agents</th>
                </tr>
              </thead>
              <tbody>
                {nationsArray
                  .filter((nation) => nation.id !== gameData.player.empireId)
                  .map((nation) => (
                    <tr
                      key={nation.id}
                      className="border-b border-stone-400"
                      onClick={() => {
                        setSelectedNation(nation);
                      }}
                    >
                      <td className=" pr-8">{nation.name}</td>
                      <td className=" pr-8">
                        {getNationCitizens(gameData, nation.id).length}
                      </td>
                      <td className=" pr-8">{nation.size}</td>
                      <td className=" pr-8">
                        {getAgents(gameData, nation.organizationId).length}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>

          
        </div>
      </section>
    </section>
  );
};

export default WorldScreen;
