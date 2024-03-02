import { Box, Button, Card, CardContent, Typography } from "@mui/material";

const GameOverScreen = () => {
  return (
    <Box>
      <Box>
        <Typography>Game Over</Typography>
      </Box>
      <Typography>
        The EVIL Empire has fallen. You had one job: to take over the world. You
        failed. Your shame will be felt for generations in the zones you sullied
        with your failed attempt at glory. You should feel bad.
      </Typography>
      <Typography>You can try again by reloading the page.</Typography>
    </Box>
  );
};

export default GameOverScreen;
