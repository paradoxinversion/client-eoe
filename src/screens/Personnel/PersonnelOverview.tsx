import { Box, Grid } from "@mui/material";
import AgentDataGrid from "../../dataGrids/agentDataGrid";

import { organizations, actions, GameManager } from "empire-of-evil";

const PersonnelOverview = () => {
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
              title={`EVIL Employee Roster (${currentAgents}/${maxAgents})`}
              agents={actions.people.getPeople({
                organizationId,
                agentFilter: { agentsOnly: true },
              })}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonnelOverview;
