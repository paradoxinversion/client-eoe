import { useState } from "react";
import PersonPanel from "../elements/PersonPanel";
import { toDataArray } from "../utilities/dataHelpers";
import Button from "../elements/Button";
const eoe = require("empire-of-evil");
/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const PersonnelScreen = ({ gameData }) => {
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
  };

  return (
    <section className="flex">
      <div className="mr-4">
        <header className="h-16">
          <p className="text-3xl font-bold">Empire Personnel</p>
        </header>
        <p>
          Payroll: $
          {eoe.organizations.getPayroll(
            gameData,
            gameData.player.organizationId
          )}
        </p>
        <p>
          Empire Roster Total:{" "}
          {
            eoe.organizations.getAgents(
              gameData,
              gameData.player.organizationId
            ).length
          }
          /
          {eoe.organizations.getMaxAgents(
            gameData,
            gameData.player.organizationId
          )}
        </p>

        <button 
          className="p-2 border rounded hover:bg-stone-700"
          onClick={() => {
            setSelectedAgent(gameData.people[gameData.player.overlordId]);
          }}
        >EVIL Overlord</button>
        <PersonPanel
          gameData={gameData}
          title={"Troopers"}
          people={eoe.organizations
            .getAgents(
              gameData,
              gameData.player.organizationId
            )
            .filter((person) => person.agent.department === 0)}
          cb={onAgentSelected}
        />
        <PersonPanel
          gameData={gameData}
          title={"Administrators"}
          people={eoe.organizations
            .getAgents(
              gameData,
              gameData.player.organizationId
            )
            .filter((person) => person.agent.department === 1)}
        />
        <PersonPanel
          gameData={gameData}
          title={"Scientists"}
          people={eoe.organizations
            .getAgents(
              gameData,
              gameData.player.organizationId
            )
            .filter((person) => person.agent.department === 2)}
        />
      </div>
      <div>
        {selectedAgent && (
          <div>
            <p>{selectedAgent.name}</p>
            <table>
             <tbody>
              <tr>
                <td className="pr-4">Salary</td>
                <td>${selectedAgent.agent.salary}</td>
              </tr>
              <tr>
                <td className="pr-4">Health</td>
                <td> {selectedAgent.currentHealth}/{selectedAgent.health}</td>
              </tr>
              <tr>
                <td className="pr-4">Combat</td>
                <td> {selectedAgent.combat}</td>
              </tr>
              <tr>
                <td className="pr-4">Administration</td>
                <td>{selectedAgent.administration}</td>
              </tr>
              <tr>
                <td className="pr-4">Intelligence</td>
                <td> {selectedAgent.intelligence}</td>
              </tr>
              <tr>
                <td className="pr-4">Leadership</td>
                <td> {selectedAgent.currentHealth}/{selectedAgent.health}</td>
              </tr>
             </tbody>
            </table>
            {selectedAgent.id !== gameData.player.overlordId && (
              <div className="">
                <Button
                  buttonText={"Fire Agent"}
                  onClick={() => {
                    setSelectedAgent(null);
                  }}
                />
                <Button
                  buttonText={"Terminate Agent"}
                  onClick={() => {
                    setSelectedAgent(null);
                  }}
                />
              </div>
            )}

            <button className="p-2 border rounded hover:bg-stone-700" onClick={() => {
                setSelectedAgent(null);
              }}>Close</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonnelScreen;
