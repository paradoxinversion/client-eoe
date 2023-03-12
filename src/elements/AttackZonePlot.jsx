import { getAgents, getControlledZones } from "empire-of-evil/src/organization";
import { Plot, plotConfig } from "empire-of-evil/src/plots";
import { useState } from "react";
import { toDataArray } from "../utilities/dataHelpers";

const AttackZonePlot = ({ gameData, plotManager, cb }) => {
  const [nation, setNation] = useState(null);
  const [zone, setZone] = useState(null);
  const nations = toDataArray(gameData.nations).filter(
    (nation) => nation.organizationId !== gameData.player.organizationId
  );
  const [attackers, setAttackers] = useState([]);

  const preparePlot = () => {
    const plotParams = {
      zone,
      participants: attackers,
    };
    const plot = new Plot("Attack Zone", attackers, "attack-zone", plotParams);
    plotManager.addPlot(plot);
  };

  const onUpdateAttackers = (e, agent) => {
    if (e.currentTarget.checked) {
      console.log(attackers.includes(agent), agent);
      if (!attackers.includes(agent)) {
        const updatedAttackers = JSON.parse(JSON.stringify(attackers));
        updatedAttackers.push(agent);
        setAttackers(updatedAttackers);
      }
    } else {
      if (attackers.includes(agent)) {
        const updatedAttackers = JSON.parse(JSON.stringify(attackers));
        setAttackers(
          updatedAttackers.filter((person) => person.id !== agent.id)
        );
      }
    }
  };
  return (
    <div className="p-4 h-64 overflow-y-auto">
      <p className="text-xl font-bold">Attack Zone</p>
      <form className="bg-stone-700 rounded p-2">
        <div>
          <header>
            <p className="text-lg border-b mb-4">Select a Nation</p>
          </header>
          <div className="grid grid-cols-3 gap-4">
            {nations.map((n) => {
              return (
                <div key={`ns-${n.id}`} className="bg-stone-800 rounded p-2">
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
        </div>

        {nation && (
          <div>
            <header>
              <p className="text-lg border-b mb-4">
                Select the zone for this mission
              </p>
            </header>
            <div className="grid grid-cols-3 gap-4">
              {getControlledZones(
                toDataArray(gameData.zones),
                nation.organizationId
              ).map((zone) => (
                <div key={`zs-${zone.id}`} className="bg-stone-800 rounded p-2">
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
                Select the Agents attending this mission
              </p>
            </header>
            <div className="grid grid-cols-3 gap-2">
              {getAgents(
                toDataArray(gameData.people),
                gameData.player.organizationId
              )
                .filter(
                  (agent) =>
                    agent.agent.department === 0 || agent.agent.department === 3
                )
                .map((agent) => (
                  <div key={`as-${agent.id}`} className="bg-stone-800 rounded p-2">
                    <input
                      className="mr-2"
                      type={"checkbox"}
                      id={`agent-select-${agent.id}`}
                      onChange={(e) => {
                        onUpdateAttackers(e, agent);
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
              <div className="grid grid-cols-3 gap-2">
                {attackers.map((agent) => (
                  <div key={`attackers-${agent.id}`} className="bg-stone-800 rounded p-2">
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
        <button
          className="p-2 bg-stone-800 rounded"
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

export default AttackZonePlot;
