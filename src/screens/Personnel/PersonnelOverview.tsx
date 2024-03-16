import { Box, Grid } from "@mui/material";
import AgentDataGrid from "../../dataGrids/agentDataGrid";
import { IntegratedManagerProps } from "../..";
import { organizations } from "empire-of-evil";

const PersonnelOverview = ({ gameManager }: IntegratedManagerProps) => {
  const organizationId = gameManager.gameData.player.organizationId;
  const currentAgents = organizations.getAgents(
    gameManager,
    organizationId
  ).length;

  const maxAgents = organizations.getMaxAgents(gameManager, organizationId);
  return (
    <>
      <Box padding="1rem">
        <Grid container columns={10}>
          <Grid item xs={10}>
            <AgentDataGrid
              title={`EVIL Employee Roster (${currentAgents}/${maxAgents})`}
              agents={organizations.getAgents(gameManager, organizationId)}
              gameManager={gameManager}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonnelOverview;
