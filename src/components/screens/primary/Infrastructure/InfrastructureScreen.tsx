import { Box, Divider, Grid, Typography } from "@mui/material";
import { managers, actions } from "empire-of-evil";
import { useAppSelector } from "../../../../app/hooks";
import InfrastructureOverview from "./InfrastructureOverview";

import InfrastructureBuildingProfile from "./InfrastructureBuildingProfile";

const InfrastructureScreen = () => {
  const selectedBuilding = useAppSelector((state) => state.selections.building);
  return (
    <Box>
      <Box>
        <Box id="home-greeting" component="header" padding="1rem">
          <Typography variant="h3">Infrastructure</Typography>
        </Box>
        <Divider />
        <Grid container padding="1rem" spacing={"1rem"}>
          <Grid item>
            <Typography variant="body2" color="GrayText">
              Buildings
            </Typography>
            <Typography variant="body2">
              {
                actions.buildings.getBuildings({
                  organizationId:
                    managers.game.GameManager.getInstance().gameData.player
                      .organizationId,
                }).length
              }
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="GrayText">
              Infrastructure
            </Typography>
            <Typography variant="body2">{` ${
              actions.organization.getOrgResources(
                managers.game.GameManager.getInstance().gameData.player
                  .organizationId
              ).infrastructure
            }/${actions.buildings.getInfrastructureLoad(
              managers.game.GameManager.getInstance().gameData.player
                .organizationId
            )}`}</Typography>
          </Grid>
        </Grid>
        <Divider />
        {selectedBuilding ? (
          <InfrastructureBuildingProfile selectedBuilding={selectedBuilding} />
        ) : (
          <InfrastructureOverview />
        )}
      </Box>
    </Box>
  );
};

export default InfrastructureScreen;
