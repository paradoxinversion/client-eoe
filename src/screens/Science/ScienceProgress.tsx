import { Box, Typography } from "@mui/material";
import ScienceProgressDataGrid from "../../dataGrids/scienceProgressDataGrid";

const ScienceProgress = () => {
  return (
    <>
      <Box component="header">
        <Typography>
          Progress on science projects can be viewed in the table below.
        </Typography>
        <ScienceProgressDataGrid title="Science Progress" />
      </Box>
    </>
  );
};

export default ScienceProgress;
