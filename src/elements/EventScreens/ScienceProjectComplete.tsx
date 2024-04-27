import { Box, Button, Typography } from "@mui/material";

import { GameEventComponentProps } from "../../screens/Events/EventScreen";

const ScienceProjectComplete = ({
  currentGameEvent,
  resolveEvent,
}: GameEventComponentProps) => {
  console.log(currentGameEvent, resolveEvent);
  return (
    <Box>
      <Typography>We are able to start a new project.</Typography>
      <Button onClick={() => resolveEvent()}>OK</Button>
    </Box>
  );
};

export default ScienceProjectComplete;
