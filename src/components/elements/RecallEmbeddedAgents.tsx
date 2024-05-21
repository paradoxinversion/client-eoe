import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { managers, actions } from "empire-of-evil";

const RecallEmbeddedAgents = ({ cb }) => {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);

  const preparePlot = () => {
    const plotParams = {
      agents: selectedPeople,
    };
    const plot = new managers.plots.Plot(
      "Recall Embedded Agents",
      "recall-embedded-agents",
      {
        participants: selectedPeople,
      },
      {}
    );
    managers.plots.PlotManager.getInstance().addPlot(plot);
    cb && cb();
  };

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    if (target.checked && !selectedPeople.includes(target.name)) {
      setSelectedPeople([...selectedPeople, target.name]);
    }

    if (!target.checked && selectedPeople.includes(target.name)) {
      setSelectedPeople(
        selectedPeople.filter((person) => person !== target.name)
      );
    }
  };
  return (
    <Box>
      <Typography>Recall Embedded Agents</Typography>
      <Typography>
        Return agents from their embedded locations. Upon successful egress,
        agents will return to their home zones.
      </Typography>
      <FormGroup>
        {actions.people
          .getPeople({
            personFilter: {
              organizationId:
                managers.game.GameManager.getInstance().gameData.player
                  .organizationId,
            },
            agentFilter: {
              embeddedOnly: true,
              agentsOnly: true,
              excludeParticipants: true,
            },
          })
          .map((person) => {
            return (
              <FormControlLabel
                control={<Checkbox name={person.id} onChange={onChange} />}
                label={person.name}
              />
            );
          })}
      </FormGroup>
      <Button
        disabled={!selectedPeople}
        onClick={() => {
          preparePlot();
        }}
      >
        Recall Agents
      </Button>
      <Button
        onClick={() => {
          cb && cb();
        }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default RecallEmbeddedAgents;
