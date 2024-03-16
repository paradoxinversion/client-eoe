import { Box, Button, Divider, Typography } from "@mui/material";
import { IntegratedManagerProps } from "../..";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions } from "empire-of-evil";
import { selectEntity } from "../../features/selectionSlice";
import PersonDataGrid from "../../dataGrids/personDataGrid";

const AgentProfile = ({ gameManager }: IntegratedManagerProps) => {
  const dispatch = useAppDispatch();
  const selectedAgent = useAppSelector((state) => state.selections.person);
  const people = useAppSelector((state) => state.people);
  return (
    <Box padding="1rem">
      <Box>
        <Typography>Agent Profile</Typography>
        <Typography>
          {selectedAgent.name} (
          {actions.people.getAgentDepartment(selectedAgent.agent)})
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
        <Typography>Combat: {selectedAgent.basicAttributes.combat}</Typography>
        <Typography>
          Intelligence: {selectedAgent.basicAttributes.intelligence}
        </Typography>
        <Typography>
          Leadership: {selectedAgent.basicAttributes.leadership}
        </Typography>
      </Box>
      <Divider />
      <Box>
        <PersonDataGrid
          people={actions.people.getPeople(gameManager, {
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
  );
};

export default AgentProfile;
