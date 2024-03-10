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
  Card,
  Grid,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectEntity } from "../features/selectionSlice";
import DataGrid from "react-data-grid";
import MetricNumber from "../elements/MetricNumber/MetricNumber";
import PersonDataGrid from "../dataGrids/personDataGrid";

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
      {/* {selectedAgent && (
        <Dialog open={!!selectedAgent}>
          <DialogContent>
            
            {selectedAgent && (
              <Box>
                <Typography variant="overline">Agent Profile</Typography>
                <DataGrid
                  columns={[
                    { key: "attribute", name: "" },
                    { key: "value", name: "" },
                  ]}
                  rows={[
                    { attribute: "Name", value: selectedAgent.name },
                    { attribute: "Salary", value: selectedAgent.agent?.salary },
                    {
                      attribute: "Health",
                      value: `${selectedAgent.currentHealth}/${selectedAgent.health}`,
                    },
                    { attribute: "Combat", value: selectedAgent.combat },
                    {
                      attribute: "Administration",
                      value: selectedAgent.administration,
                    },
                    {
                      attribute: "Intelligence",
                      value: selectedAgent.intelligence,
                    },
                    {
                      attribute: "Leadership",
                      value: selectedAgent.leadership,
                    },
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
                        dispatch(
                          selectEntity({
                            type: "person",
                            selection: null,
                          })
                        );
                      }}
                    />
                    <Button
                      buttonText={"Terminate Agent"}
                      onClick={() => {
                        updateGameData(
                          eoe.organizations.terminateAgent(selectedAgent)
                        );
                        dispatch(
                          selectEntity({
                            type: "person",
                            selection: null,
                          })
                        );
                      }}
                    />
                  </Box>
                )}

                <Button
                  onClick={() => {
                    dispatch(
                      selectEntity({
                        type: "person",
                        selection: null,
                      })
                    );
                    // setSelectedAgent(null);
                  }}
                >
                  Close
                </Button>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      )} */}
   
      <Box id="top-bar" />
      <Box>
        <Box component="header" padding="1rem">
          <Typography variant="h3">Empire Personnel</Typography>
        </Box>

        <Divider />
        <Box>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedAgent(gameData.people[gameData.player.overlordId]);
            }}
          >
            View EVIL Overlord
          </Button>
        </Box>
        <Divider />
        <Box padding="1rem">
          <Stack direction="row" spacing="1rem" justifyContent={'center'}>
            <MetricNumber
              title="Payroll"
              number={`\$${eoe.organizations.getPayroll(
                gameManager,
                gameData.player.organizationId
              )}`}
            />
            <MetricNumber
              title="Agents"
              number={`${currentAgents}/${maxAgents}`}
            />
            <MetricNumber title="Henchmen" number={9999} />
            <MetricNumber title="Admins" number={9999} />
            <MetricNumber title="Scientists" number={9999} />
            <MetricNumber title="Deceased" number={9999} />
          </Stack>
        </Box>
        <Divider />
        <Box padding="1rem">
          <Grid container columns={10}>
            <Grid item xs={10}>
              <PersonDataGrid
                gameData={gameData}
                title={`EVIL Employee Roster (${currentAgents}/${maxAgents})`}
                people={eoe.organizations.getAgents(
                  gameManager,
                  gameData.player.organizationId
                )}
                // cb={()=>{console.log("x")}}
                gameManager={gameManager}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonnelScreen;
