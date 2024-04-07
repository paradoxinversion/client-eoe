import { Box, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import { getPeople } from "empire-of-evil/src/actions/people";
import { IntegratedManagerProps } from "../..";
import HeaderGridItem from "../../elements/HeaderGridItem";
// import DataGrid from "react-data-grid"

const InfirmaryOverview = ({ gameManager }: IntegratedManagerProps) => {
  return (
    <>
      <Box>
        <Typography>Injured Agents</Typography>
        <Typography>
          The following agents have are currently injured.
        </Typography>
        <Grid container padding="1rem" spacing={"1rem"}>
          {getPeople(gameManager, {
            organizationId: gameManager.gameData.player.organizationId,
            injuredOnly: true,
            agentFilter: {
              agentsOnly: true,
            },
          }).map((person) => {
            const healthPercentage =
              (person.derivedAttributes.health.currentHealth /
                person.derivedAttributes.health.totalHealth) *
              100;
            return (
              <Grid item>
                {/* <HeaderGridItem
                  title={person.name}
                  content={`${
                    healthPercentage > 75
                      ? "Injured"
                      : healthPercentage > 50
                      ? "Seriously Injured"
                      : "Critical"
                  }`}
                  
                /> */}
                <Chip
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
          <Button>Admit All ($999)</Button>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default InfirmaryOverview;
