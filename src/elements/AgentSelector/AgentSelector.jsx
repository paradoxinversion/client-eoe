import { Box, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
/**
 * A component to select Agents.
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").Person[]} props.agentsArray
 */
const AgentSelector = ({ agentsArray, cb, participantsArray }) => {
  /**
   *
   * @param {Event} event
   */
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
