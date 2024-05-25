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
import { useAppDispatch } from "../../../../app/hooks";
import { actions } from "empire-of-evil";
import {
  clearSelections,
  selectEntity,
} from "../../../../features/selectionSlice";
import { Nation, Zone } from "empire-of-evil/src/types/interfaces/entities";
import ZoneCard from "../../../elements/Cards/ZoneCard/ZoneCard";

type WorldNationProps = {
  selectedNation: Nation;
};

const WorldNation = ({ selectedNation }: WorldNationProps) => {
  const dispatch = useAppDispatch();
  const selectZone = (zone: Zone) => {
    dispatch(
      selectEntity({
        type: "nation",
        selection: null,
      })
    );
    dispatch(
      selectEntity({
        type: "zone",
        selection: zone,
      })
    );
  };
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
        <Grid container spacing={1}>
          {actions.zones
            .getZones({
              organizationId: selectedNation.organizationId,
            })
            .map((zone) => {
              return (
                <Grid item>
                  <ZoneCard zone={zone} selectCallback={selectZone} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default WorldNation;
