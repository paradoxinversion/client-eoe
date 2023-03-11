import { useState } from "react";
import PersonPanel from "../elements/PersonPanel";
import { toDataArray } from "../utilities/dataHelpers";
import Button from "../elements/Button";
const eoe = require('empire-of-evil')
/**
 * 
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns 
 */
const PersonnelScreen = ({gameData}) => {
  /**
   * @type {Person} selectedAgent
   */
  const [selectedAgent, setSelectedAgent] = useState(null);

  /**
   * 
   * @param {import("empire-of-evil/src/typedef").Person} agent 
   */
  const onAgentSelected = (agent) => {
    setSelectedAgent(agent);
  }
  return (
    <section className="flex">
      <div className="mr-4">
        <header className="text-3xl font-bold">
          <p>Empire Personnel</p>
        </header>
        <p>Payroll: ${eoe.organizations.getPayroll(toDataArray(gameData.people), gameData.player.organizationId)}</p>
        <p>Empire Roster Total: {eoe.organizations.getAgents(
            toDataArray(gameData.people),
            gameData.player.organizationId
          ).length}/{eoe.organizations.getMaxAgents(toDataArray(gameData.people), gameData.player.organizationId)}</p>
        <Button buttonText={"EVIL Overlord"} style={"my-4"} onClick={()=>{
          setSelectedAgent(gameData.people[gameData.player.overlordId])
        }} />
        <PersonPanel 
          title={"Troopers"}
          people={eoe.organizations.getAgents(
            toDataArray(gameData.people),
            gameData.player.organizationId
          ).filter(person => person.agent.department === 0)} 
          cb={onAgentSelected}
        />
        <PersonPanel 
          title={"Administrators"}
          people={eoe.organizations.getAgents(
            toDataArray(gameData.people),
            gameData.player.organizationId
          ).filter(person => person.agent.department === 1)} 
        />
        <PersonPanel 
          title={"Scientists"}
          people={eoe.organizations.getAgents(
            toDataArray(gameData.people),
            gameData.player.organizationId
          ).filter(person => person.agent.department === 2)} 
        />
      </div>
      <div>
        {selectedAgent && (
          <div>
            <p>{selectedAgent.name}</p>
            <p>Salary: ${selectedAgent.agent.salary}</p>
            <p>Combat: {selectedAgent.combat}</p>
            <p>Administration: {selectedAgent.administration}</p>
            <p>Intelligence: {selectedAgent.intelligence}</p>
            <p>Leadership: {selectedAgent.leadership}</p>
            {selectedAgent.id !== gameData.player.overlordId &&
              <div className="">
                <Button buttonText={"Fire Agent"} onClick={()=>{setSelectedAgent(null)}} />
                <Button buttonText={"Terminate Agent"} onClick={()=>{setSelectedAgent(null)}} />
              </div>
            }
            <Button buttonText={"close"} onClick={()=>{setSelectedAgent(null)}} />
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonnelScreen;
