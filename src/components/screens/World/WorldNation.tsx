import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { actions } from "empire-of-evil";
import { selectEntity } from "../../../features/selectionSlice";

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
        <Grid container spacing={1}>
          {actions.zones
            .getZones({
              organizationId: selectedNation.organizationId,
            })
            .map((zone) => {
              return (
                <Grid item>
                  <Card>
                    <CardHeader
                      title={zone.name}
                      titleTypographyProps={{ variant: "body2" }}
                    />
                    <Divider />
                    <CardContent>
                      <Typography variant="body2">Size: {zone.size}</Typography>
                      <Typography variant="body2">
                        Intel Level: {zone.intelligenceLevel}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
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
                    </CardActions>
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
