import { Box, Button, Card, CardContent, Typography } from "@mui/material";

/**
 * @param {object} props
 * @param {object} props.currentGameEvent
 * @param {Function} props.resolveEvent
 * @returns
 */
const EventScreenProceed = ({ resolveEvent }) => {
  return (
    <Box>
      <Box>
        <Button
          buttonText="Okay"
          onClick={() => {
            resolveEvent();
          }}
        >Okay</Button>
      </Box>
    </Box>
  );
};

export default EventScreenProceed;
