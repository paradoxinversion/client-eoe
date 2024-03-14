import { Box, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { Person } from "empire-of-evil/src/types/interfaces/entities";
interface AgentSelectorProps {
  agentsArray: Person[];
  cb: Function;
}
const AgentSelector = ({ agentsArray, cb }: AgentSelectorProps) => {
  const handleCheckbox = (event) => {
    const value = event.target.checked;
    const agentId = event.target.name;
    cb && cb(agentId, value);
  };
  return (
    <Box>
      <FormGroup>
        {agentsArray.map((agent) => (
          <FormControlLabel
            name={agent.id}
            control={<Checkbox />}
            label={agent.name}
            onChange={handleCheckbox}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default AgentSelector;
