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
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearSelections, selectEntity } from "../features/selectionSlice";
import DataGrid from "react-data-grid";
import MetricNumber from "../elements/MetricNumber/MetricNumber";
import PersonDataGrid from "../dataGrids/personDataGrid";
import { useAppDispatch, useAppSelector } from "../app/hooks";

// import { fireAgent, terminateAgent } from "empire-of-evil/src/organization";
// const eoe = require("empire-of-evil");
import * as eoe from "empire-of-evil";
import {
  changeAgentDepartment,
  getAgentDepartment,
  getPeople,
} from "empire-of-evil/src/actions/people";
import { setPeople } from "../features/personSlice";
import { fireAgent, terminateAgent } from "empire-of-evil/src/organization";
import AgentDataGrid from "../dataGrids/agentDataGrid";

interface PersonnelScreenProps {
  gameManager: eoe.GameManager;
}

const PersonnelScreen = ({ gameManager }: PersonnelScreenProps) => {
  const dispatch = useAppDispatch();
  const selectedAgent = useAppSelector((state) => state.selections.person);
  const people = useAppSelector((state) => state.people);
  const { gameData } = gameManager;
  const [changeDepartmentOpen, setChangeDepartmentOpen] = useState(false);
  const [fireAgentDialogOpen, setFireAgentDialogOpen] = useState(false);
  const [department, setDepartment] = useState(0);
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
          <Stack direction="row" spacing="1rem" justifyContent={"center"}>
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
            <MetricNumber
              title="Henchmen"
              number={
                getPeople(gameManager, {
                  organizationId: gameData.player.organizationId,
                  agentFilter: {
                    department: 0,
                  },
                }).length
              }
            />
            <MetricNumber
              title="Admins"
              number={
                getPeople(gameManager, {
                  organizationId: gameData.player.organizationId,
                  agentFilter: {
                    department: 1,
                  },
                }).length
              }
            />
            <MetricNumber
              title="Scientists"
              number={
                getPeople(gameManager, {
                  organizationId: gameData.player.organizationId,
                  agentFilter: {
                    department: 2,
                  },
                }).length
              }
            />
            <MetricNumber
              title="Deceased"
              number={
                getPeople(gameManager, {
                  organizationId: gameData.player.organizationId,
                  deceasedOnly: true,
                  agentFilter: {
                    department: 2,
                  },
                }).length
              }
            />
          </Stack>
        </Box>
        {selectedAgent ? (
          <Box>
            <Dialog open={changeDepartmentOpen}>
              <DialogTitle>Change Agent Department</DialogTitle>
              <DialogContent>
                <FormControl>
                  <FormLabel>Select a new department</FormLabel>
                  <RadioGroup
                    value={department}
                    name="department-change-radio-group"
                    onChange={(e) => {
                      console.log(e);
                      setDepartment(parseInt(e.target.value));
                    }}
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="Henchman"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Administrator"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Scientist"
                    />
                  </RadioGroup>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setChangeDepartmentOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={(e) => {
                    console.log(e);
                    const update = changeAgentDepartment(
                      selectedAgent,
                      department
                    );
                    const { people } = gameManager.updateGameData(update);
                    dispatch(setPeople(people));
                    dispatch(
                      selectEntity({
                        type: "person",
                        selection: people[selectedAgent.id],
                      })
                    );
                    setChangeDepartmentOpen(false);
                  }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={fireAgentDialogOpen}>
              <DialogTitle>Fire Agent</DialogTitle>
              <DialogContent>
                <Typography>
                  Would you like to fire or TERMINATE this agent?
                </Typography>
                <Typography>
                  Firing this agent will remove them from the Empire roster.
                </Typography>
                <Typography>
                  TERMINATING this agent will remove them from their mortal
                  coil.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setFireAgentDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    const update = fireAgent(selectedAgent);
                    const ug = gameManager.updateGameData(update);
                    dispatch(clearSelections());
                    dispatch(setPeople(ug.people));
                    setFireAgentDialogOpen(false);
                  }}
                >
                  Fire
                </Button>
                <Button
                  onClick={() => {
                    const update = terminateAgent(selectedAgent);
                    const ug = gameManager.updateGameData(update);
                    dispatch(clearSelections());
                    dispatch(setPeople(ug.people));
                    setFireAgentDialogOpen(false);
                  }}
                >
                  Terminate
                </Button>
              </DialogActions>
            </Dialog>
            <Divider />
            <Box>
              <Button
                disabled={
                  selectedAgent.id === gameManager.gameData.player.overlordId ||
                  selectedAgent.isPersonnel
                }
                onClick={() => {
                  setChangeDepartmentOpen(true);
                }}
              >
                Change Department
              </Button>
              <Button
                disabled={
                  selectedAgent.id === gameManager.gameData.player.overlordId ||
                  selectedAgent.isPersonnel
                }
                onClick={() => {
                  setFireAgentDialogOpen(true);
                }}
              >
                Fire Agent
              </Button>
            </Box>
            <Divider />
            <Box padding={"1rem"}>
              <Box>
                <Typography>Agent Profile</Typography>
                <Typography>
                  {selectedAgent.name} (
                  {getAgentDepartment(selectedAgent.agent)})
                </Typography>
              </Box>
              {selectedAgent.agent && selectedAgent.agent.department !== 3 && (
                <Box>
                  <Typography>
                    Commander: {people[selectedAgent.agent.commanderId].name}
                  </Typography>
                  <Button
                    onClick={() => {
                      dispatch(
                        selectEntity({
                          type: "person",
                          selection: people[selectedAgent.agent.commanderId],
                        })
                      );
                    }}
                  >
                    Select Commander
                  </Button>
                </Box>
              )}
              <Typography>Salary: {selectedAgent.agent.salary}</Typography>
              <Typography>Attributes</Typography>
              <Box>
                <Typography>
                  Administration: {selectedAgent.basicAttributes.administration}
                </Typography>
                <Typography>
                  Combat: {selectedAgent.basicAttributes.combat}
                </Typography>
                <Typography>
                  Intelligence: {selectedAgent.basicAttributes.intelligence}
                </Typography>
                <Typography>
                  Leadership: {selectedAgent.basicAttributes.leadership}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box padding="1rem">
              <Box>
                <PersonDataGrid
                  people={getPeople(gameManager, {
                    agentFilter: {
                      commander: selectedAgent.id,
                      department: -1,
                    },
                  })}
                  gameManager={gameManager}
                  title="Subordinate Agents"
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box padding="1rem">
            <Grid container columns={10}>
              <Grid item xs={10}>
                <AgentDataGrid
                  title={`EVIL Employee Roster (${currentAgents}/${maxAgents})`}
                  agents={eoe.organizations.getAgents(
                    gameManager,
                    gameData.player.organizationId
                  )}
                  gameManager={gameManager}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PersonnelScreen;
