import { Box, Typography, Grid, Card } from "@mui/material";
import { Zone } from "empire-of-evil/src/types/interfaces/entities";
import SelectorGrid from "../SelectorGrid/SelectorGrid";
import SelectorChip from "../SelectorChip/SelectorChip";

type ZoneSelectorProps = {
  headerText: string;
  zones: Zone[];
  selectedZone: Zone | null;
  onSelectZone: (zone: Zone) => void;
};
const ZoneSelector = ({
  headerText,
  zones,
  selectedZone,
  onSelectZone,
}: ZoneSelectorProps) => {
  return (
    <Box>
      <Box component={"header"}>
        <Typography>{headerText}</Typography>
      </Box>
      <Card variant="outlined">
        <SelectorGrid>
          {zones.map((zone) => (
            <Grid item>
              <SelectorChip
                name="zone-select"
                id={`zone-select-${zone.id}`}
                label={zone.name}
                selected={selectedZone?.id === zone.id}
                onClick={() => {
                  onSelectZone(zone);
                }}
              />
            </Grid>
          ))}
        </SelectorGrid>
      </Card>
    </Box>
  );
};

export default ZoneSelector;
