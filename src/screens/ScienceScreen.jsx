import { addPersonnel, getOrgLabs } from "empire-of-evil/src/buildings";
import { getAgentsInZone, _getAgents } from "empire-of-evil/src/organization";
import { useState } from "react";
import { toDataArray } from "../utilities/dataHelpers";
import MetricCard from "../elements/MetricCard/MetricCard";

/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const ScienceScreen = ({ gameManager, updateGameData }) => {
  const {gameData} = gameManager;
  const [selectedLab, setSelectedLab] = useState(null);
  const [addingPersonnel, setAddingPersonnel] = useState(false);
  const labs = getOrgLabs(gameManager, gameData.player.organizationId);
  return (
    <section>
      <div
        id="top-bar"
        className="bg-stone-900 w-full text-stone-300 flex justify-end items-center h-10"
      />
      <section className="p-2">

        <header className="text-3xl font-bold mb-2">
          <p>Science</p>
        </header>
        <div>
          <section>
            <header className="text-2xl">
              <p>Labs</p>
            </header>
            <div className="grid grid-cols-1 w-fit">
              <MetricCard title="Total Labs">
                {labs.length}
              </MetricCard>
            </div>
            <table >
              <thead >
                <tr>
                  <th>Lab</th>
                  <th>Max Scientists</th>
                </tr>
              </thead>
              <tbody>
                {labs.map((lab) => {
                  return (
                    <tr key={lab.id} className="border-b border-stone-400">
                      <td>{lab.name}</td>
                      <td>{lab.maxPersonnel}</td>
                      <td>
                        <button
                          onClick={() => {
                            setSelectedLab(lab);
                          }}
                        >
                          Select Lab
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          {selectedLab && (
            <section>
              <header>
                <p>{selectedLab.name}</p>
              </header>
              <p>Personnel</p>
              {selectedLab.personnel.map((labPersonnel) => {
                return (
                  <div>
                    <p>{gameData.people[labPersonnel].name}</p>
                  </div>
                );
              })}
              <button
                onClick={() => {
                  setAddingPersonnel(true);
                }}
              >
                Add Personnel
              </button>
            </section>
          )}
        </div>
      </section>
      {addingPersonnel && (
        <div>
          {_getAgents(
            gameManager,
            {
              organizationId: gameData.player.organizationId,
              filter: {
                zoneId: selectedLab.zoneId,
                department: 2
              },
              exclude: {
                personnel: true
              }
            }
          )
            .map((agent) => {
              return (
                <button
                  onClick={() => {
                    const updatedGameData = addPersonnel(agent, selectedLab);

                    updateGameData(updatedGameData);
                    setAddingPersonnel(false);
                  }}
                >
                  {agent.name}
                </button>
              );
            })}
        </div>
      )}
    </section>
  );
};

export default ScienceScreen;
