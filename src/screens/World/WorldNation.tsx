import { Box, Divider, Typography } from "@mui/material";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import ZoneDataGrid from "../../dataGrids/zoneDataGrid";
import { GameManager } from "empire-of-evil";
import { Nation } from "empire-of-evil/src/types/interfaces/entities";
import { getZones } from "empire-of-evil/src/actions/zones";
import { useAppSelector } from "../../app/hooks";

interface OverviewProps {
  gameManager: GameManager;
}

const WorldNation = ({ gameManager }: OverviewProps) => {
  const selectedNation = useAppSelector((state) => state.selections.nation);
  return (
    <Box>
      <Box padding="1rem">
        <MetricNumber
          number={
            getZones(gameManager, {
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
          zones={getZones(gameManager, {
            organizationId: selectedNation.organizationId,
          })}
          title=""
        />
      </Box>
    </Box>
  );
};

export default WorldNation;
