import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { managers, actions } from "empire-of-evil";
// import DataGrid from "react-data-grid"

const InfirmaryOverview = () => {
  const [selectHospitalOpen, setSelectHospitalOpen] = useState(false);
  const injuredPeople = actions.people.getPeople({
    personFilter: {
      organizationId:
        managers.game.GameManager.getInstance().gameData.player.organizationId,
      injuredOnly: true,
      noHospitalized: true,
    },
    agentFilter: {
      agentsOnly: true,
    },
  });

  return (
    <>
      <Dialog open={selectHospitalOpen}>
        <DialogContent>
          <Typography>Select a hospital</Typography>
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
                  <Button
                    onClick={() => {
                      actions.buildings.admitHospitalPatient(
                        hospital.id,
                        injuredPeople[0].id
                      );
                      setSelectHospitalOpen(false);
                    }}
                  >
                    Admit Agent
                  </Button>
                </Box>
              );
            })}
          <Button
            onClick={() => {
              setSelectHospitalOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
      <Box>
        <Typography>Injured Agents</Typography>
        <Typography>
          The following agents have are currently injured.
        </Typography>
        <Grid container padding="1rem" spacing={"1rem"}>
          {injuredPeople.map((person) => {
            const healthPercentage =
              (person.derivedAttributes.health.currentHealth /
                person.derivedAttributes.health.totalHealth) *
              100;
            return (
              <Grid item>
                <Chip
                  onClick={() => {
                    setSelectHospitalOpen(true);
                  }}
                  label={`${person.name} (${
                    healthPercentage > 75
                      ? "Injured"
                      : healthPercentage > 50
                      ? "Seriously Injured"
                      : "Critical"
                  })`}
                />
              </Grid>
            );
          })}
        </Grid>
        <Box>
          {injuredPeople.length > 0 && <Button>Admit All ($999)</Button>}
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default InfirmaryOverview;
