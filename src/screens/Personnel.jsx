import { useState } from "react";
import PersonPanel from "../elements/PersonPanel";
import { toDataArray } from "../utilities/dataHelpers";
import MetricCard from "../elements/MetricCard/MetricCard";
import Modal from "../elements/Modal";
import {Button, Box, Typography} from '@mui/material';
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
    <Box className="">
      {selectedAgent && (
        <Modal>
          <Box>
            {selectedAgent && (
              <Box>
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
                  <Box>
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
                  </Box>
                )}

                <Button
                  onClick={() => {
                    setSelectedAgent(null);
                  }}
                >
                  Close
                </Button>
              </Box>
            )}
          </Box>
        </Modal>
      )}

      <Box id="top-bar" />
      <Box>
        <Box component="header">
          <Typography>Empire Personnel</Typography>
        </Box>
        <Box>
          <MetricCard title="Payroll">
            <Typography>
              $
              {eoe.organizations.getPayroll(
                gameManager,
                gameData.player.organizationId
              )}
            </Typography>
          </MetricCard>
          <MetricCard title="EVIL Agents">
            <Typography>
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
            </Typography>
          </MetricCard>
        </Box>

        <Button
          variant='outline'
          onClick={() => {
            setSelectedAgent(gameData.people[gameData.player.overlordId]);
          }}
        >
          View EVIL Overlord
        </Button>
        <Box>
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
        </Box>
      </Box>
      
    </Box>
  );
};

export default PersonnelScreen;
