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
      <Grid container spacing="1rem" height={"100%"}>
        <Grid item height={"100%"}>
          <Card>
            <CardContent sx={{ width: "max-content" }}>
              <Typography variant="overline">FOo</Typography>
              <Typography>Salary: {selectedAgent.agent.salary}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent sx={{ width: "max-content" }}>
              <Typography variant="overline">FOo</Typography>
              <Typography>
                Agility: {selectedAgent.standardAttributes.agility}
              </Typography>
              <Typography>
                Constitution: {selectedAgent.standardAttributes.constitution}
              </Typography>
              <Typography>
                Intelligence: {selectedAgent.standardAttributes.intelligence}
              </Typography>
              <Typography>
                Strength: {selectedAgent.standardAttributes.strength}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent sx={{ width: "max-content" }}>
              <Typography variant="overline">Skills</Typography>
              <Typography>
                Administration: {selectedAgent.skills.administration}
              </Typography>
              <Typography>Combat: {selectedAgent.skills.combat}</Typography>
              <Typography>Disguise: {selectedAgent.skills.disguise}</Typography>
              <Typography>
                Espionage: {selectedAgent.skills.espionage}
              </Typography>
              <Typography>
                Leadership: {selectedAgent.skills.leadership}
              </Typography>
              <Typography>Science: {selectedAgent.skills.science}</Typography>
              <Typography>Security: {selectedAgent.skills.security}</Typography>
            </CardContent>
          </Card>
        </Grid>
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
