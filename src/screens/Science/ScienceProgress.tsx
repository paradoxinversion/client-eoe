import { Box, Typography } from "@mui/material";
import ScienceProgressDataGrid from "../../dataGrids/scienceProgressDataGrid";
import { IntegratedManagerProps } from "../..";

const ScienceProgress = ({ gameManager }: IntegratedManagerProps) => {
  return (
    <>
      <Box component="header">
        <Typography>Science Progress</Typography>
        <ScienceProgressDataGrid
          title="Science Progress"
          gameManager={gameManager}
        />
      </Box>
    </>
  );
};

export default ScienceProgress;
