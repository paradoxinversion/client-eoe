import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { GameManager, buildings, organizations } from "empire-of-evil";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import { useAppSelector } from "../../app/hooks";
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
                buildings.getBuildings({
                  organizationId:
                    GameManager.getInstance().gameData.player.organizationId,
                }).length
              }
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="GrayText">
              Infrastructure
            </Typography>
            <Typography variant="body2">{` ${
              organizations.getOrgResources(
                GameManager.getInstance().gameData.player.organizationId
              ).infrastructure
            }/${buildings.getInfrastructureLoad(
              GameManager.getInstance().gameData.player.organizationId
            )}`}</Typography>
          </Grid>
        </Grid>
        <Divider />
        {selectedBuilding ? (
          <InfrastructureBuildingProfile />
        ) : (
          <InfrastructureOverview />
        )}
      </Box>
    </Box>
  );
};

export default InfrastructureScreen;
