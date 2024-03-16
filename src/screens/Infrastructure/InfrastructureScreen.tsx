import {
  Box,
  Button,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { buildings, organizations } from "empire-of-evil";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import { useAppSelector } from "../../app/hooks";
import InfrastructureOverview from "./InfrastructureOverview";
import { IntegratedManagerProps } from "../..";
import InfrastructureBuildingProfile from "./InfrastructureBuildingProfile";

const InfrastructureScreen = ({ gameManager }: IntegratedManagerProps) => {
  const selectedBuilding = useAppSelector((state) => state.selections.building);
  return (
    <Box>
      <Box>
        <Box id="home-greeting" component="header" padding="1rem">
          <Typography variant="h3">Infrastructure</Typography>
        </Box>
        <Divider />
        <Stack
          padding="1rem"
          direction={"row"}
          spacing={"1rem"}
          justifyContent={"center"}
        >
          <MetricNumber
            title="Buildings"
            number={
              buildings.getBuildings(gameManager, {
                organizationId: gameManager.gameData.player.organizationId,
              }).length
            }
          />
          <MetricNumber
            title="Infrastructure"
            number={` ${
              organizations.getOrgResources(
                gameManager,
                gameManager.gameData.player.organizationId
              ).infrastructure
            }/${buildings.getInfrastructureLoad(
              gameManager,
              gameManager.gameData.player.organizationId
            )}`}
          />
        </Stack>
        <Divider />
        {selectedBuilding ? (
          <InfrastructureBuildingProfile gameManager={gameManager} />
        ) : (
          <InfrastructureOverview gameManager={gameManager} />
        )}
      </Box>
    </Box>
  );
};

export default InfrastructureScreen;
