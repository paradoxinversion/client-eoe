import { Box, Divider, Grid, Typography } from "@mui/material";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import ZoneDataGrid from "../../dataGrids/zoneDataGrid";
import { useAppSelector } from "../../app/hooks";
import { actions } from "empire-of-evil";

const WorldNation = () => {
  const selectedNation = useAppSelector((state) => state.selections.nation);
  return (
    <Box>
      <Box padding="1rem">
        <Grid container>
          <Grid item>
            <Typography variant="body2" color="GrayText">
              Zones
            </Typography>
            <Typography variant="body2">
              {
                actions.zones.getZones({
                  organizationId: selectedNation.organizationId,
                }).length
              }
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box padding="1rem">
        <Typography>{selectedNation.name}</Typography>
      </Box>
      <Box padding="1rem">
        <ZoneDataGrid
          zones={actions.zones.getZones({
            organizationId: selectedNation.organizationId,
          })}
          title=""
        />
      </Box>
    </Box>
  );
};

export default WorldNation;
