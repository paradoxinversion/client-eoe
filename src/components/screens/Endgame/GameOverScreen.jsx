import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  Toolbar,
} from "@mui/material";

const GameOverScreen = () => {
  return (
    <Box>
      <Box padding="1rem">
        <Typography variant="h4">Game Over</Typography>
      </Box>
      <Divider />
      <Box padding="1rem">
        <Typography>
          The EVIL Empire has fallen. You had one job: to take over the world.
          You failed. Your shame will be felt for generations in the zones you
          sullied with your failed attempt at glory. You should feel bad.
        </Typography>
        <Typography>You can try again by reloading the page.</Typography>
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Try Again
        </Button>
      </Box>
    </Box>
  );
};

export default GameOverScreen;
