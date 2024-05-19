import { Check } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { GameManager } from "empire-of-evil";
import { getPeople } from "empire-of-evil/src/actions/people";
import { useState } from "react";

const InciteProtest = () => {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedAgents([...selectedAgents, event.target.name]);
    } else {
      setSelectedAgents(
        selectedAgents.filter((agent) => agent !== event.target.name)
      );
    }
  };
  return (
    <Box>
      <Typography>Incite a protest</Typography>
      <Typography>
        Incite a protest in a target zone. Protests can be used to distract
        authorities, sow chaos, and create opportunities for other operations.
      </Typography>
      <FormControl>
        {getPeople({
          personFilter: {
            organizationId:
              GameManager.getInstance().gameData.player.organizationId,
          },
          agentFilter: {
            agentsOnly: true,
            embeddedOnly: true,
          },
        }).map((person) => {
          return (
            <FormControlLabel
              control={<Checkbox name={person.id} onChange={handleChange} />}
              label={person.name}
            />
          );
        })}
      </FormControl>
    </Box>
  );
};

export default InciteProtest;
