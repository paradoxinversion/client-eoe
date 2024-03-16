import { Box, Divider, Stack } from "@mui/material";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import { useAppSelector } from "../../app/hooks";
import * as eoe from "empire-of-evil";
import { organizations } from "empire-of-evil";
import { getPeople } from "empire-of-evil/src/actions/people";
import PersonnelOverview from "./PersonnelOverview";
import PersonnelProfile from "./PersonnelProfile";

interface PersonnelScreenProps {
  gameManager: eoe.GameManager;
}

const PersonnelScreen = ({ gameManager }: PersonnelScreenProps) => {
  const selectedAgent = useAppSelector((state) => state.selections.person);
  const { gameData } = gameManager;
  const currentAgents = organizations.getAgents(
    gameManager,
    gameData.player.organizationId
  ).length;

  const maxAgents = organizations.getMaxAgents(
    gameManager,
    gameData.player.organizationId
  );

  return (
    <>
      <Box padding="1rem">
        <Stack direction="row" spacing="1rem" justifyContent={"center"}>
          <MetricNumber
            title="Payroll"
            number={`\$${organizations.getPayroll(
              gameManager,
              gameData.player.organizationId
            )}`}
          />
          <MetricNumber
            title="Agents"
            number={`${currentAgents}/${maxAgents}`}
          />
          <MetricNumber
            title="Henchmen"
            number={
              getPeople(gameManager, {
                organizationId: gameData.player.organizationId,
                agentFilter: {
                  department: 0,
                },
              }).length
            }
          />
          <MetricNumber
            title="Admins"
            number={
              getPeople(gameManager, {
                organizationId: gameData.player.organizationId,
                agentFilter: {
                  department: 1,
                },
              }).length
            }
          />
          <MetricNumber
            title="Scientists"
            number={
              getPeople(gameManager, {
                organizationId: gameData.player.organizationId,
                agentFilter: {
                  department: 2,
                },
              }).length
            }
          />
          <MetricNumber
            title="Deceased"
            number={
              getPeople(gameManager, {
                organizationId: gameData.player.organizationId,
                deceasedOnly: true,
                agentFilter: {
                  department: 2,
                },
              }).length
            }
          />
        </Stack>
      </Box>
      <Divider />
      {selectedAgent ? (
        <PersonnelProfile gameManager={gameManager} />
      ) : (
        <PersonnelOverview gameManager={gameManager} />
      )}
    </>
  );
};

export default PersonnelScreen;
