import { Box, Card, Chip, Grid, Typography } from "@mui/material";
import actions from "empire-of-evil/src/actions";
import { Person } from "empire-of-evil/src/types/interfaces/entities";
import SelectorGrid from "../SelectorGrid/SelectorGrid";

export type AgentSelectorProps = {
  headerText: string;
  agents: Person[];
  selectedAgents: Person | string[] | null;
  onSelectAgent: (agent: Person) => void;
};

const AgentSelector = ({
  headerText,
  agents,
  selectedAgents,
  onSelectAgent,
}: AgentSelectorProps) => {
  const agentSelection = Array.isArray(selectedAgents)
    ? selectedAgents
    : [selectedAgents?.id];
  return (
    <Box>
      <Box paddingBottom={"1rem"}>
        <Typography>{headerText}</Typography>
      </Box>
      <Card variant="outlined">
        <SelectorGrid>
          {agents
            .filter(
              (agent) =>
                agent.agent?.department === "troop" ||
                agent.agent?.department === "overlord"
            )
            .map((agent) => (
              <Grid item>
                <Chip
                  label={agent.name}
                  id={`agent-select-${agent.id}`}
                  variant={
                    agentSelection.includes(agent.id) ? "outlined" : "filled"
                  }
                  onClick={(e) => {
                    onSelectAgent(agent);
                  }}
                />
              </Grid>
            ))}
        </SelectorGrid>
      </Card>
    </Box>
  );
};

export default AgentSelector;
