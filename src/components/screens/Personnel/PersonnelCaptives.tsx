import { Box, Grid } from "@mui/material";
import AgentDataGrid from "../../dataGrids/agentDataGrid";

import { managers, actions } from "empire-of-evil";

const PersonnelCaptives = () => {
  const organizationId =
    managers.game.GameManager.getInstance().gameData.player.organizationId;
  const currentAgents = actions.people.getPeople({
    personFilter: {
      organizationId,
    },
    agentFilter: { agentsOnly: true },
  }).length;

  const maxAgents = actions.organization.getMaxAgents(organizationId);
  return (
    <>
      <Box padding="1rem">
        <Grid container columns={10}>
          <Grid item xs={10}>
            <AgentDataGrid
              title="Captive Agents"
              agents={actions.people.getPeople({
                personFilter: {
                  organizationId: organizationId,
                  capturedOnly: true,
                },
                agentFilter: { agentsOnly: true },
              })}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonnelCaptives;
