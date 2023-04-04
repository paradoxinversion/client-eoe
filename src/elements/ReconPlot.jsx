import { getAgents, getControlledZones } from "empire-of-evil/src/organization";
import { Plot } from "empire-of-evil/src/plots";
import { useState } from "react";
import { toDataArray } from "../utilities/dataHelpers";

/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 */
const ReconPlot = ({ gameData, plotManager, cb }) => {
  const [nation, setNation] = useState(null);
  const [zone, setZone] = useState(null);
  const [participants, setParticipants] = useState([]);
  const nations = toDataArray(gameData.nations).filter(
    (nation) => nation.organizationId !== gameData.player.organizationId
  );
  const preparePlot = () => {
    const plotParams = {
      zone,
      participants,
    };
    const plot = new Plot("Recon Zone", participants, "recon-zone", plotParams);
    plotManager.addPlot(plot);
  };
  const onUpdateParticipants = (e, agent) => {
    if (e.currentTarget.checked) {
      if (!participants.includes(agent)) {
        const updatedParticipants = JSON.parse(JSON.stringify(participants));
        updatedParticipants.push(agent);
        setParticipants(updatedParticipants);
      }
    } else {
      if (participants.includes(agent)) {
        const updatedParticipants = JSON.parse(JSON.stringify(participants));
        setParticipants(
          updatedParticipants.filter((person) => person.id !== agent.id)
        );
      }
    }
  };
  return (
    <div>
      <p className="text-xl font-bold">Execute Reconnaisance Operation</p>
      <p>Send agents for covert intelligence-gathering in a foreign zone.</p>
      <form>
        <div>
          <header>
            <p className="text-lg border-b mb-4">Select a Nation</p>
          </header>
          <div className="flex flex-wrap">
            {nations.map((n) => {
              return (
                <div key={`ns-${n.id}`} className="shadow-md rounded p-2">
                  <input
                    type={"radio"}
                    name="nation-select"
                    id={`nation-select-${n.id}`}
                    onClick={() => {
                      setNation(n);
                    }}
                  />
                  <label htmlFor={`nation-select-${n.id}`}>{n.name}</label>
                </div>
              );
            })}
          </div>
          {nation && (
            <div>
            <header>
              <p className="text-lg border-b mb-4">
                Select the zone for this mission
              </p>
            </header>
            <div className="flex flex-wrap">
              {getControlledZones(
                gameData,
                nation.organizationId
              ).map((zone) => (
                <div key={`zs-${zone.id}`} className="shadow-md rounded p-2 w-fit">
                  <input
                    type={"radio"}
                    name="zone-select"
                    id={`zone-select-${zone.id}`}
                    onClick={(e) => {
                      setZone(zone);
                    }}
                  />
                  <label htmlFor={`zone-select-${zone.id}`}>{zone.name}</label>
                </div>
              ))}
            </div>
          </div>
          )}
          {zone && (
          <div className="mb-4">
            <header>
              <p className="text-lg border-b mb-4">
                Select the Agents attending this mission. 
              </p>
            </header>
            <div className="flex flex-wrap">
              {getAgents(
                gameData,
                gameData.player.organizationId
              )
                .filter(
                  (agent) =>
                    agent.agent.department === 0 || agent.agent.department === 3
                )
                .map((agent) => (
                  <div key={`as-${agent.id}`} className="shadow-md rounded p-2">
                    <input
                      className="mr-2"
                      type={"checkbox"}
                      id={`agent-select-${agent.id}`}
                      onChange={(e) => {
                        onUpdateParticipants(e, agent);
                      }}
                    />
                    <label htmlFor={`agent-select-${agent.id}`}>
                      {agent.name}
                    </label>
                  </div>
                ))}
            </div>
            <div>
              <p className="text-lg border-b mb-4">Selected Agents</p>
              <div className="flex flex-wrap">
                {participants.map((agent) => (
                  <div key={`attackers-${agent.id}`} className="shadow-md rounded p-2">
                    <p>{agent.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <footer>
              <p className="text-xs">
                *Agents attending this mission may suffer loss of life.
              </p>
            </footer>
          </div>
        )}
        </div>
        <button
          className="p-2 shadow-md rounded"
          disable={!nation || !zone}
          onClick={(e) => {
            e.preventDefault();
            preparePlot();
            cb();
          }}
        >
          Done
        </button>
      </form>
    </div>
  );
};

export default ReconPlot;
