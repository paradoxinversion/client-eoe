import { Box, Button, Divider, CardContent, Typography } from "@mui/material";

/**
 * @param {object} props
 * @param {object} props.currentGameEvent
 * @param {Function} props.resolveEvent
 * @returns
 */
const EventScreenProceed = ({ resolveEvent }) => {
  return (
    <Box>
      <Button
        buttonText="Okay"
        onClick={() => {
          resolveEvent();
        }}
      >
        Okay
      </Button>
    </Box>
  );
};

export default EventScreenProceed;
