import { useState } from "react";
import PersonPanel from "../elements/PersonPanel";
import { toDataArray } from "../utilities/dataHelpers";
import MetricCard from "../elements/MetricCard/MetricCard";
import Modal from "../elements/Modal";
import {
  Button,
  Box,
  Typography,
  Toolbar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectEntity } from "../features/selectionSlice";
import DataGrid from "react-data-grid";

// import { fireAgent, terminateAgent } from "empire-of-evil/src/organization";
const eoe = require("empire-of-evil");

/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const PersonnelScreen = ({ gameManager, updateGameData }) => {
  const dispatch = useDispatch();
  const selectedAgent = useSelector((state) => state.selections.person);
  const people = useSelector((state) => state.people);
  const { gameData } = gameManager;
  /**
   * @type {Person} selectedAgent
   */
  // const [open, setOpen] = useState(agent);

  /**
   *
   * @param {import("empire-of-evil/src/typedef").Person} agent
   */
  const onAgentSelected = (agent) => {
    dispatch(
      selectEntity({
        type: "person",
        selection: people[agent.id],
      })
    );
    // setSelectedAgent(agent);
  };

  const currentAgents = eoe.organizations.getAgents(
    gameManager,
    gameData.player.organizationId
  ).length;

  const maxAgents = eoe.organizations.getMaxAgents(
    gameManager,
    gameData.player.organizationId
  );

  return (
    <Box>
      <Toolbar />
      {selectedAgent && (
        <Dialog open={!!selectedAgent}>
          <DialogContent>
            {selectedAgent && (
              <Box>
                <DataGrid 
                  columns={[ 
                    { key: "attribute", name: "" },
                    { key: "value", name: "" }
                  ]} 

                  rows={[
                    { attribute: "Name", value: selectedAgent.name },
                    { attribute: "Salary", value: selectedAgent.agent?.salary},
                    { attribute: "Health", value: `${selectedAgent.currentHealth}/${selectedAgent.health}`},
                    { attribute: "Combat", value: selectedAgent.combat},
                    { attribute: "Administration", value: selectedAgent.administration},
                    { attribute: "Intelligence", value: selectedAgent.intelligence},
                    { attribute: "Leadership", value: selectedAgent.leadership},
                    
                  ]}
                />
                {selectedAgent.id !== gameData.player.overlordId && (
                  <Box>
                    <Button
                      buttonText={"Fire Agent"}
                      onClick={() => {
                        updateGameData(
                          eoe.organizations.fireAgent(selectedAgent)
                        );
                        dispatch(selectEntity({
                          type: 'person',
                          selection: null
                        }))
                      }}
                    />
                    <Button
                      buttonText={"Terminate Agent"}
                      onClick={() => {
                        updateGameData(
                          eoe.organizations.terminateAgent(selectedAgent)
                        );
                        dispatch(selectEntity({
                          type: 'person',
                          selection: null
                        }))
                      }}
                    />
                  </Box>
                )}

                <Button
                  onClick={() => {
                    dispatch(selectEntity({
                      type: 'person',
                      selection: null
                    }))
                    // setSelectedAgent(null);
                  }}
                >
                  Close
                </Button>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      )}

      <Box id="top-bar" />
      <Box>
        <Box component="header">
          <Typography variant="h3">Empire Personnel</Typography>
        </Box>
        <Divider />
        <Button
          variant="outline"
          onClick={() => {
            setSelectedAgent(gameData.people[gameData.player.overlordId]);
          }}
        >
          View EVIL Overlord
        </Button>
        <Divider />
        <Box>
          <Typography>Payroll</Typography>
          <Typography>
            $
            {eoe.organizations.getPayroll(
              gameManager,
              gameData.player.organizationId
            )}
          </Typography>
        </Box>
        <Divider />
        <Box>
          <PersonPanel
            gameData={gameData}
            title={`Roster (${currentAgents}/${maxAgents})`}
            people={eoe.organizations.getAgents(
              gameManager,
              gameData.player.organizationId
            )}
            cb={onAgentSelected}
            gameManager={gameManager}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PersonnelScreen;
