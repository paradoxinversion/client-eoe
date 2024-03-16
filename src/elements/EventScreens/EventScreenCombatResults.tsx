import { Box, Button, Typography } from "@mui/material";
import { GameEventComponentProps } from "../../screens/Events/EventScreen";

const EventScreenCombatResults = ({
  currentGameEvent,
  resolveEvent,
}: GameEventComponentProps) => {
  return (
    <Box>
      <Box component="section">
        <Typography>Combat Log</Typography>
      </Box>
      <Box>
        {currentGameEvent?.params?.attackZone.plot?.resolution?.data?.combatLog?.map(
          (logString, index) => (
            <Typography key={`log-${index}`}>{logString}</Typography>
          )
        )}
      </Box>
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

export default EventScreenCombatResults;
