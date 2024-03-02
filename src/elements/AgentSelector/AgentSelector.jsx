import {Box, Checkbox, FormGroup, FormControlLabel} from "@mui/material";
/**
 * A component to select Agents.
 * @param {Object} props 
 * @param {import("empire-of-evil/src/typedef").Person[]} props.agentsArray
 */
const AgentSelector = ({agentsArray, cb, participantsArray}) => {
  /**
   * 
   * @param {Event} event 
   */
  const handleCheckbox = (event) => {
    const value = event.target.checked;
    const agentId = event.target.name;
    cb && cb(agentId, value);
  }
  return (
    <Box>
      <FormGroup>
        {agentsArray.map(agent => (
          // <Box key={agent.id}>
          //   <input className="mr-2" type={"checkbox"} name={agent.id} onChange={handleCheckbox} defaultChecked={participantsArray.includes(agent.id)} />
          //   <label htmlFor={agent.id}>{agent.name}</label>
          // </Box>
            <FormControlLabel control={<Checkbox />} label={agent.name} onChange={handleCheckbox} checked={participantsArray.includes(agent.id)}/>
        ))}
      </FormGroup>
    </Box>
  )
}

export default AgentSelector;