import { Box, Typography } from "@mui/material";
import { IntegratedManagerProps } from "../..";

const ScienceOverview = ({ gameManager }: IntegratedManagerProps) => {
  return (
    <>
      <Box component="header">
        <Typography>Science</Typography>
      </Box>
    </>
  );
};

export default ScienceOverview;
