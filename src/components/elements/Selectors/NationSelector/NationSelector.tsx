import { Box, Typography, Grid, Card } from "@mui/material";
import { Nation } from "empire-of-evil/src/types/interfaces/entities";
import SelectorGrid from "../SelectorGrid/SelectorGrid";
import SelectorChip from "../SelectorChip/SelectorChip";

export type NationSelectorProps = {
  headerText: string;
  nations: Nation[];
  selectedNation: Nation | null;
  onSelectNation: (nation: Nation) => void;
};

const NationSelector = ({
  headerText,
  nations,
  selectedNation,
  onSelectNation,
}: NationSelectorProps) => {
  return (
    <Box>
      <Box component="header">
        <Typography>{headerText}</Typography>
      </Box>
      <Card variant="outlined">
        <SelectorGrid>
          {nations.map((nation) => {
            return (
              <Grid item>
                <SelectorChip
                  label={nation.name}
                  selected={selectedNation?.id === nation.id}
                  onClick={() => {
                    onSelectNation(
                      nations.find(
                        (nation) => nation.id === nation.id
                      ) as Nation
                    );
                  }}
                />
              </Grid>
            );
          })}
        </SelectorGrid>
      </Card>
    </Box>
  );
};

export default NationSelector;
