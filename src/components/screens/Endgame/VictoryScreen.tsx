import { AppBar, Box, Divider, Toolbar, Typography } from "@mui/material";

const VictoryScreen = () => {
  return (
    <Box>
      <Box>
        <Box padding={"1rem"}>
          <Typography variant="h3">Victory</Typography>
        </Box>

        <Divider />
        <Box padding={"1rem"}>
          <Typography>
            After much work and <em>many</em> sacrifices, the EVIL Empire reigns
            supreme. There are no foreign organizations to oppose you. The
            maintainers of this application have been terminated.
          </Typography>
          <Typography>You may reload the page.</Typography>
        </Box>
        <Divider />
        <Box padding={"1rem"}>
          <Typography className="font-bold">Credits</Typography>
          <Typography>
            Brainstormed, designed, and programmed by Jedai Saboteur
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VictoryScreen;
