import { Grid } from "@mui/material";
import nations from "empire-of-evil/src/actions/nations";

export type SelectorGridProps = {
  children: React.ReactNode;
};
const SelectorGrid = ({ children }: SelectorGridProps) => {
  return (
    <Grid
      container
      spacing={1}
      rowSpacing={1}
      padding={"1rem"}
      maxHeight={"150px"}
      sx={{
        overflowY: "scroll",
      }}
    >
      {children}
    </Grid>
  );
};

export default SelectorGrid;
