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

const WorldPerson = ({ gameManager }: OverviewProps) => {
  const selectedPerson = useAppSelector((state) => state.selections.person);
  return (
    <Box>
      {/* <Box padding="1rem">
        <MetricNumber
          number={
            getZones(gameManager, {
              organizationId: selectedNation.organizationId,
            }).length
          }
          title="Zones"
        />
      </Box>
      <Divider /> */}
      <Box padding="1rem">
        <Typography>{selectedPerson.name}</Typography>
      </Box>
      <Box padding="1rem">
        {/* <ZoneDataGrid
          gameManager={gameManager}
          zones={getZones(gameManager, {
            organizationId: selectedNation.organizationId,
          })}
          title=""
        /> */}
      </Box>
    </Box>
  );
};

export default WorldPerson;
