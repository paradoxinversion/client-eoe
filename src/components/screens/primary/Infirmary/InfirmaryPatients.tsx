import { Box, Button, Typography } from "@mui/material";
import { managers, actions } from "empire-of-evil";

const InfirmaryPatients = () => {
  return (
    <Box>
      {actions.people
        .getPeople({
          personFilter: {
            organizationId:
              managers.game.GameManager.getInstance().gameData.player
                .organizationId,
            hospitalizedOnly: true,
          },
          agentFilter: {
            agentsOnly: true,
          },
        })
        .map((person) => {
          return (
            <Box>
              <Typography>{person.name}</Typography>
              <Typography>
                {person.derivedAttributes.health.currentHealth}/
                {person.derivedAttributes.health.totalHealth}
              </Typography>
              <Button
                onClick={() => {
                  actions.buildings.dischargeHospitalPatient(
                    person.hospitalizedAt!,
                    person.id
                  );
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
