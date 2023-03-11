import { getAgents, getControlledZones } from "empire-of-evil/src/organization";
import { Plot, plotConfig } from "empire-of-evil/src/plots";
import { useState } from "react";
import { toDataArray } from "../utilities/dataHelpers";

const AttackZonePlot = ({ gameData, plotManager }) => {
  const [nation, setNation] = useState(null);
  const [zone, setZone] = useState(null);
  const nations = toDataArray(gameData.nations).filter(
    (nation) => nation.organizationId !== gameData.player.organizationId
  );
  const [attackers, setAttackers ] = useState([]);
    
  const preparePlot = () => {
    const plotParams = {
        zone,
        participants: attackers
    }
    const plot = new Plot("Attack Zone", attackers, "attack-zone", plotParams)
    console.log(plot)
    plotManager.addPlot(plot);
  }

  const onUpdateAttackers = (e, agent)=>{
    if (e.currentTarget.checked){
        console.log(attackers.includes(agent), agent)
        if (!attackers.includes(agent)){
            const updatedAttackers = JSON.parse(JSON.stringify(attackers))
            updatedAttackers.push(agent)
            setAttackers(updatedAttackers)
        }
    }else{
        if (attackers.includes(agent)){
            const updatedAttackers = JSON.parse(JSON.stringify(attackers))
            setAttackers(updatedAttackers.filter(person => person.id !== agent.id))
        }
    }
  }
  return (
    <div>
      <p className="text-xl font-bold">Attack Zone</p>
      <form>
        <p>Select a Nation</p>
        <div className="grid grid-cols-3">
          {nations.map((n) => {
            return (
              <div>
                <input
                  type={"radio"}
                  name="nation-select"
                  onClick={() => {
                    setNation(n);
                  }}
                />
                <label>{n.name}</label>
              </div>
            );
          })}
        </div>

        {nation && (
          <div>
            <p>Select the zone for this mission</p>
            {getControlledZones(
              toDataArray(gameData.zones),
              nation.organizationId
            ).map((zone) => (
              <div>
                <input
                  type={"radio"}
                  name="zone-select"
                  onClick={(e) => {
                   
                    setZone(zone);
                  }}
                />
                <label>{zone.name}</label>
              </div>
            ))}
          </div>
        )}

        {zone && (
          <div >
            <p>Select the Agents attending this mission</p>
            {getAgents(
              toDataArray(gameData.people),
              gameData.player.organizationId
            )
              .filter(
                (agent) =>
                  agent.agent.department === 0 || agent.agent.department === 3
              )
              .map((agent) => (
                <div>
                  <input type={"checkbox"} onChange={(e)=> {onUpdateAttackers(e, agent)}} />
                  <label htmlFor="">{agent.name}</label>
                </div>
              ))}
              {attackers.map(agent=>(
                <div>{agent.name}</div>
              ))}
          </div>
        )}
        <button onClick={(e)=>{
            e.preventDefault()
            preparePlot();
        }}>Done</button>
      </form>
    </div>
  );
};

export default AttackZonePlot;
