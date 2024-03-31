import { Box, Grid } from "@mui/material";
import AgentDataGrid from "../../dataGrids/agentDataGrid";
import { IntegratedManagerProps } from "../..";
import { organizations, actions } from "empire-of-evil";

const PersonnelCaptives = ({ gameManager }: IntegratedManagerProps) => {
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
              title="Captive Agents"
              agents={actions.people.getPeople(gameManager, {
                organizationId: organizationId,
                capturedOnly: true,
                agentFilter: { agentsOnly: true, department: -1 },
              })}
              gameManager={gameManager}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonnelCaptives;
