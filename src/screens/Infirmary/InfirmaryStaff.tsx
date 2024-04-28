import { Box, Typography } from "@mui/material";
import { GameManager } from "empire-of-evil";
import { getBuildings } from "empire-of-evil/src/buildings";

const InfirmaryStaff = () => {
  return (
    <Box>
      <Typography>Doctors</Typography>
      <Box>
        {getBuildings({
          organizationId:
            GameManager.getInstance().gameData.player.organizationId,
          type: "hospital",
        }).map((hospital) => {
          return (
            <Box>
              <Typography>{hospital.name}</Typography>
              <Box>
                {hospital.personnel.map((staff) => {
                  const person =
                    GameManager.getInstance().gameData.people[staff];
                  return (
                    <Box>
                      <Typography>{person.name}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default InfirmaryStaff;
