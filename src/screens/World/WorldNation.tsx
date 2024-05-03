import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import ZoneDataGrid from "../../dataGrids/zoneDataGrid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions } from "empire-of-evil";
import { selectEntity } from "../../features/selectionSlice";

const WorldNation = () => {
  const dispatch = useAppDispatch();
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
        {/* <ZoneDataGrid
          zones={actions.zones.getZones({
            organizationId: selectedNation.organizationId,
          })}
          title=""
        /> */}
        <Grid container>
          {actions.zones
            .getZones({
              organizationId: selectedNation.organizationId,
            })
            .map((zone) => {
              return (
                <Grid item>
                  <Card>
                    <Typography>{zone.name}</Typography>
                    <Typography>Size: {zone.size}</Typography>
                    <Typography>
                      Intel Level: {zone.intelligenceLevel}
                    </Typography>
                    <Button
                      onClick={() => {
                        dispatch(
                          selectEntity({
                            type: "zone",
                            selection: zone,
                          })
                        );
                        dispatch(
                          selectEntity({
                            type: "nation",
                            selection: null,
                          })
                        );
                      }}
                    >
                      View Zone
                    </Button>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default WorldNation;
