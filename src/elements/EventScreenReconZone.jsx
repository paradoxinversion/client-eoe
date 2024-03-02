import { Box, Button, Card, CardContent, Typography } from "@mui/material";

/**
 * @param {object} props
 * @param {object} props.currentGameEvent
 * @param {Function} props.resolveEvent
 * @returns
 */
const EventScreenReconZone = ({ resolveEvent, currentGameEvent }) => {
  const { intelligenceModifier, success } =
    currentGameEvent.params.plot.resolution.data;
  return (
    <Box>
      <Typography>Mission {success ? "Success" : "Failure"}</Typography>
      <Typography>Your recon mission has failed.</Typography>
      <Typography>Intelligence modifier: {intelligenceModifier}</Typography>
      <Box>
        <Button
          onClick={() => {
            resolveEvent();
          }}
        >
          Okay
        </Button>
      </Box>
    </Box>
  );
};

export default EventScreenReconZone;
