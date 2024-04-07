import { Box, Grid } from "@mui/material";
import AgentDataGrid from "../../dataGrids/agentDataGrid";
import { IntegratedManagerProps } from "../..";
import { organizations, actions } from "empire-of-evil";

const PersonnelOverview = ({ gameManager }: IntegratedManagerProps) => {
  const organizationId = gameManager.gameData.player.organizationId;
  const currentAgents = actions.people.getPeople(gameManager, {
    organizationId,
    agentFilter: { agentsOnly: true },
  }).length;

  const maxAgents = organizations.getMaxAgents(gameManager, organizationId);
  return (
    <>
      <Box padding="1rem">
        <Grid container columns={10}>
          <Grid item xs={10}>
            <AgentDataGrid
              title={`EVIL Employee Roster (${currentAgents}/${maxAgents})`}
              agents={actions.people.getPeople(gameManager, {
                organizationId,
                agentFilter: { agentsOnly: true },
              })}
              gameManager={gameManager}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonnelOverview;
