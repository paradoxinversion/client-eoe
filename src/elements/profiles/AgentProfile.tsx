import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { IntegratedManagerProps } from "../..";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions } from "empire-of-evil";
import { selectEntity } from "../../features/selectionSlice";
import PersonDataGrid from "../../dataGrids/personDataGrid";
import { useState } from "react";
import { setCodename } from "empire-of-evil/src/actions/people";
import { setPeople } from "../../features/personSlice";
import { getCodeName } from "empire-of-evil/src/generators/names";
import HeaderGridItem from "../HeaderGridItem";

const AgentProfile = ({ gameManager }: IntegratedManagerProps) => {
  const selectedAgent = useAppSelector((state) => state.selections.person);
  const people = useAppSelector((state) => state.people);
  const dispatch = useAppDispatch();
  const [editCodename, setEditCodename] = useState(false);
  const [codenameValue, setCodenameValue] = useState(
    selectedAgent.agent.codename || ""
  );
  return (
    <Box padding="1rem">
      <Box>
        <Typography variant="h4">Agent Profile</Typography>

        {editCodename ? (
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              const update = setCodename(
                gameManager,
                selectedAgent.id,
                codenameValue
              ).people;
              dispatch(setPeople(update));
              dispatch(
                selectEntity({
                  type: "person",
                  selection: update[selectedAgent.id],
                })
              );
              setEditCodename(false);
            }}
          >
            <TextField
              name="codename"
              size="small"
              value={codenameValue}
              onChange={(e) => {
                setCodenameValue(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                setCodenameValue(getCodeName());
              }}
            >
              Random
            </Button>
            <Button type="submit">Save</Button>
            <Button
              onClick={() => {
                setEditCodename(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Typography
            variant="h5"
            color={"GrayText"}
            onClick={() => {
              setEditCodename(true);
            }}
          >
            {selectedAgent.agent.codename || "Set Codename"}
          </Typography>
        )}
        <Typography variant="h5">
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
      <Typography variant="overline">Compensation</Typography>
      <Grid container spacing="1rem">
        <HeaderGridItem title="Salary" content={selectedAgent.agent.salary} />
      </Grid>
      <Typography variant="overline">Aptitude</Typography>
      <Grid container spacing="1rem">
        <HeaderGridItem
          title="Agility"
          content={selectedAgent.standardAttributes.agility}
        />
        <HeaderGridItem
          title="Constitution"
          content={selectedAgent.standardAttributes.constitution}
        />
        <HeaderGridItem
          title="Intelligence"
          content={selectedAgent.standardAttributes.intelligence}
        />
        <HeaderGridItem
          title="Strength"
          content={selectedAgent.standardAttributes.strength}
        />
      </Grid>
      <Typography variant="overline">Skills</Typography>
      <Grid container spacing="1rem" marginBottom={1}>
        <HeaderGridItem
          title="Administration"
          content={selectedAgent.skills.administration}
        />
        <HeaderGridItem title="Combat" content={selectedAgent.skills.combat} />
        <HeaderGridItem
          title="Disguise"
          content={selectedAgent.skills.disguise}
        />
        <HeaderGridItem
          title="Espionage"
          content={selectedAgent.skills.espionage}
        />
        <HeaderGridItem
          title="Leadership"
          content={selectedAgent.skills.leadership}
        />
        <HeaderGridItem
          title="Science"
          content={selectedAgent.skills.science}
        />
        <HeaderGridItem
          title="Security"
          content={selectedAgent.skills.security}
        />
      </Grid>
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
