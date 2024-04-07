import { Box, Divider, Grid, Stack } from "@mui/material";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import { useAppSelector } from "../../app/hooks";
import * as eoe from "empire-of-evil";
import { organizations } from "empire-of-evil";
import { getPeople } from "empire-of-evil/src/actions/people";
import PersonnelOverview from "./PersonnelOverview";
import PersonnelProfile from "./PersonnelProfile";
import PersonnelCaptives from "./PersonnelCaptives";
import HeaderGridItem from "../../elements/HeaderGridItem";

interface PersonnelScreenProps {
  gameManager: eoe.GameManager;
}

const PersonnelScreen = ({ gameManager }: PersonnelScreenProps) => {
  const selectedAgent = useAppSelector((state) => state.selections.person);
  const { gameData } = gameManager;
  const currentAgents = getPeople(gameManager, {
    organizationId: gameData.player.organizationId,
    agentFilter: { agentsOnly: true },
  }).length;

  const maxAgents = organizations.getMaxAgents(
    gameManager,
    gameData.player.organizationId
  );

  return (
    <>
      <Box padding="1rem">
        <Grid container spacing="1rem">
          <HeaderGridItem
            title="Payroll"
            content={`\$${organizations.getPayroll(
              gameManager,
              gameData.player.organizationId
            )}`}
          />
          <HeaderGridItem
            title="Agents"
            content={`${currentAgents}/${maxAgents}`}
          />

          <HeaderGridItem
            title="Henchmen"
            content={
              getPeople(gameManager, {
                organizationId: gameData.player.organizationId,
                agentFilter: {
                  department: 0,
                },
              }).length
            }
          />

          <HeaderGridItem
            title="Admins"
            content={
              getPeople(gameManager, {
                organizationId: gameData.player.organizationId,
                agentFilter: {
                  department: 1,
                },
              }).length
            }
          />

          <HeaderGridItem
            title="Scientists"
            content={
              getPeople(gameManager, {
                organizationId: gameData.player.organizationId,
                agentFilter: {
                  department: 2,
                },
              }).length
            }
          />

          <HeaderGridItem
            title="Deceased"
            content={
              getPeople(gameManager, {
                organizationId: gameData.player.organizationId,
                deceasedOnly: true,
                agentFilter: {
                  department: 2,
                },
              }).length
            }
          />
        </Grid>
      </Box>
      <Divider />
      {selectedAgent ? (
        <PersonnelProfile gameManager={gameManager} />
      ) : (
        <PersonnelOverview gameManager={gameManager} />
      )}
      <PersonnelCaptives gameManager={gameManager} />
    </>
  );
};

export default PersonnelScreen;
