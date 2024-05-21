import { Box, Typography } from "@mui/material";
import { managers, actions } from "empire-of-evil";

const InfirmaryStaff = () => {
  return (
    <Box>
      <Typography>Doctors</Typography>
      <Box>
        {actions.buildings
          .getBuildings({
            organizationId:
              managers.game.GameManager.getInstance().gameData.player
                .organizationId,
            type: "hospital",
          })
          .map((hospital) => {
            return (
              <Box>
                <Typography>{hospital.name}</Typography>
                <Box>
                  {hospital.personnel.map((staff) => {
                    const person =
                      managers.game.GameManager.getInstance().gameData.people[
                        staff
                      ];
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
