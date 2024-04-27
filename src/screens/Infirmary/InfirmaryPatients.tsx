import { Box, Button, Typography } from "@mui/material";
import { getPeople } from "empire-of-evil/src/actions/people";
import { dischargeHospitalPatient } from "empire-of-evil/src/buildings";
import { GameManager } from "empire-of-evil";

const InfirmaryPatients = () => {
  return (
    <Box>
      {getPeople({
        organizationId:
          GameManager.getInstance().gameData.player.organizationId,
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
                dischargeHospitalPatient(person.hospitalizedAt, person.id);
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
