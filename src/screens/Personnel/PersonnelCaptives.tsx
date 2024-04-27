import { Box, Grid } from "@mui/material";
import AgentDataGrid from "../../dataGrids/agentDataGrid";

import { organizations, actions, GameManager } from "empire-of-evil";

const PersonnelCaptives = () => {
  const organizationId =
    GameManager.getInstance().gameData.player.organizationId;
  const currentAgents = actions.people.getPeople({
    organizationId,
    agentFilter: { agentsOnly: true },
  }).length;

  const maxAgents = organizations.getMaxAgents(organizationId);
  return (
    <>
      <Box padding="1rem">
        <Grid container columns={10}>
          <Grid item xs={10}>
            <AgentDataGrid
              title="Captive Agents"
              agents={actions.people.getPeople({
                organizationId: organizationId,
                capturedOnly: true,
                agentFilter: { agentsOnly: true, department: -1 },
              })}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonnelCaptives;
