import { Box, Button, Typography } from "@mui/material";
import { getPeople } from "empire-of-evil/src/actions/people";
import { IntegratedManagerProps } from "../..";
import { dischargeHospitalPatient } from "empire-of-evil/src/buildings";

const InfirmaryPatients = ({ gameManager }: IntegratedManagerProps) => {
  return (
    <Box>
      {getPeople(gameManager, {
        organizationId: gameManager.gameData.player.organizationId,
        hospitalizedOnly: true,
        agentFilter: {
          agentsOnly: true,
        },
      }).map((person) => {
        return (
          <Box>
            <Typography>{person.name}</Typography>
            <Typography>
              {person.derivedAttributes.health.currentHealth}/
              {person.derivedAttributes.health.totalHealth}
            </Typography>
            <Button
              onClick={() => {
                dischargeHospitalPatient(
                  gameManager,
                  person.hospitalizedAt,
                  person.id
                );
                gameManager.updateGameData(gameManager.gameData);
              }}
            >
              Discharge
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};

export default InfirmaryPatients;
