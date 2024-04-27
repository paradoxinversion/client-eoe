import {
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  List,
} from "@mui/material";
import { Person } from "empire-of-evil/src/types/interfaces/entities";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSelectedAgents } from "../../features/ActivityParticipantSelector/ActivityParticipantSelectorSlice";
import { isPersonParticipant } from "empire-of-evil/src/activities/activityUtilities";
import { GameManager } from "empire-of-evil";
interface AgentSelectorProps {
  agentsArray: Person[];
  cb: Function;
}
const AgentSelector = ({ agentsArray, cb }: AgentSelectorProps) => {
  const dispatch = useAppDispatch();
  const { selectedAgents, activity } = useAppSelector(
    (state) => state.activityParticipantSelector
  );

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const agentId = event.target.name;
    if (checked) {
      dispatch(setSelectedAgents([...selectedAgents, agentId]));
    } else {
      dispatch(
        setSelectedAgents(selectedAgents.filter((id) => id !== agentId))
      );
    }

    cb && cb(agentId, checked);
  };
  useEffect(() => {
    console.log(activity.agents);
    dispatch(setSelectedAgents(activity.agents.map((agent) => agent)));
  }, []);
  return (
    <Box padding="1rem">
      <FormGroup sx={{ height: "150px", overflowY: "scroll" }}>
        {agentsArray
          .filter(
            (agent) =>
              selectedAgents.includes(agent.id) || !isPersonParticipant(agent)
          )
          .map((agent) => (
            <FormControlLabel
              key={agent.id}
              name={agent.id}
              control={<Checkbox checked={selectedAgents.includes[agent.id]} />}
              label={agent.name}
              onChange={handleCheckbox}
              checked={selectedAgents.includes(agent.id)}
            />
          ))}
      </FormGroup>
    </Box>
  );
};

export default AgentSelector;
