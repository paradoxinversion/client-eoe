import { Box, Button, Divider, CardContent, Typography } from "@mui/material";

const EventScreenPetEvent = ({ currentGameEvent, resolveEvent }) => {
  console.log(currentGameEvent);
  return (
    <Box>
      <Typography>{currentGameEvent.getEventText()}</Typography>
      <Button
        onClick={() => {
          resolveEvent();
        }}
      >
        Okay
      </Button>
    </Box>
  );
};

export default EventScreenPetEvent;
