import { useState } from "react";
import PersonPanel from "../elements/PersonPanel";
import { toDataArray } from "../utilities/dataHelpers";
import Button from "../elements/Button";
import MetricCard from "../elements/MetricCard/MetricCard";
import Modal from "../elements/Modal";
// import { fireAgent, terminateAgent } from "empire-of-evil/src/organization";
const eoe = require("empire-of-evil");
/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const PersonnelScreen = ({ gameManager, updateGameData }) => {
  const {gameData} = gameManager;
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
    <section className="">
      {selectedAgent && (
        <Modal>
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
                      <td>
                        {" "}
                        {selectedAgent.currentHealth}/{selectedAgent.health}
                      </td>
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
                      <td>
                        {" "}
                        {selectedAgent.currentHealth}/{selectedAgent.health}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {selectedAgent.id !== gameData.player.overlordId && (
                  <div className="">
                    <Button
                      buttonText={"Fire Agent"}
                      onClick={() => {
                        updateGameData(
                          eoe.organizations.fireAgent(selectedAgent)
                        );
                        setSelectedAgent(null);
                      }}
                    />
                    <Button
                      buttonText={"Terminate Agent"}
                      onClick={() => {
                        updateGameData(
                          eoe.organizations.terminateAgent(selectedAgent)
                        );
                        setSelectedAgent(null);
                      }}
                    />
                  </div>
                )}

                <button
                  className="p-2 border rounded hover:bg-stone-700"
                  onClick={() => {
                    setSelectedAgent(null);
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      <div
        id="top-bar"
        className="bg-stone-900 w-full text-stone-300 flex justify-end items-center h-10"
      />
      <div className="p-2">
        <header className="h-16">
          <p className="text-3xl font-bold">Empire Personnel</p>
        </header>
        <div className="grid grid-cols-4 w-fit gap-4">
          <MetricCard title="Payroll">
            <p>
              $
              {eoe.organizations.getPayroll(
                gameManager,
                gameData.player.organizationId
              )}
            </p>
          </MetricCard>
          <MetricCard title="EVIL Agents">
            <p>
              {
                eoe.organizations.getAgents(
                  gameManager,
                  gameData.player.organizationId
                ).length
              }
              /
              {eoe.organizations.getMaxAgents(
                gameManager,
                gameData.player.organizationId
              )}
            </p>
          </MetricCard>
        </div>

        <button
          className="btn btn-primary border rounded border-stone-300 shadow my-4"
          onClick={() => {
            setSelectedAgent(gameData.people[gameData.player.overlordId]);
          }}
        >
          View EVIL Overlord
        </button>
        <div className="grid grid-cols-3 grid-gap-4">
          <PersonPanel
            gameData={gameData}
            title={"Troopers"}
            people={eoe.organizations
              .getAgents(gameManager, gameData.player.organizationId)
              .filter((person) => person.agent.department === 0)}
            cb={onAgentSelected}
            gameManager={gameManager}
          />
          <PersonPanel
            gameData={gameData}
            title={"Administrators"}
            people={eoe.organizations
              .getAgents(gameManager, gameData.player.organizationId)
              .filter((person) => person.agent.department === 1)}
            cb={onAgentSelected}
            gameManager={gameManager}
          />
          <PersonPanel
            gameData={gameData}
            title={"Scientists"}
            people={eoe.organizations
              .getAgents(gameManager, gameData.player.organizationId)
              .filter((person) => person.agent.department === 2)}
            cb={onAgentSelected}
            gameManager={gameManager}
          />
        </div>
      </div>
      
    </section>
  );
};

export default PersonnelScreen;
