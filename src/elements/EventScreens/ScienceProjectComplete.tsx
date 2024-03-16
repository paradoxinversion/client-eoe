import { Box, Button, Typography } from "@mui/material";
import { IntegratedManagerProps } from "../..";
import { GameEventComponentProps } from "../../screens/Events/EventScreen";

const ScienceProjectComplete = ({
  gameManager,
  currentGameEvent,
  resolveEvent,
}: IntegratedManagerProps & GameEventComponentProps) => {
  console.log(currentGameEvent, gameManager, resolveEvent);
  return (
    <Box>
      <Typography>We are able to start a new project.</Typography>
      <Button onClick={() => resolveEvent()}>OK</Button>
    </Box>
  );
};

export default ScienceProjectComplete;
