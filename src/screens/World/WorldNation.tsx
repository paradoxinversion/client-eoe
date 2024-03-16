import { Box, Divider, Typography } from "@mui/material";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import ZoneDataGrid from "../../dataGrids/zoneDataGrid";
import { useAppSelector } from "../../app/hooks";
import { actions } from "empire-of-evil";
import { IntegratedManagerProps } from "../..";

const WorldNation = ({ gameManager }: IntegratedManagerProps) => {
  const selectedNation = useAppSelector((state) => state.selections.nation);
  return (
    <Box>
      <Box padding="1rem">
        <MetricNumber
          number={
            actions.zones.getZones(gameManager, {
              organizationId: selectedNation.organizationId,
            }).length
          }
          title="Zones"
        />
      </Box>
      <Divider />
      <Box padding="1rem">
        <Typography>{selectedNation.name}</Typography>
      </Box>
      <Box padding="1rem">
        <ZoneDataGrid
          gameManager={gameManager}
          zones={actions.zones.getZones(gameManager, {
            organizationId: selectedNation.organizationId,
          })}
          title=""
        />
      </Box>
    </Box>
  );
};

export default WorldNation;
