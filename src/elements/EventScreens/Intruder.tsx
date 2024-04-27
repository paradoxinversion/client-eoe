import { Box, Button, Typography } from "@mui/material";

import { GameEventComponentProps } from "../../screens/Events/EventScreen";
import { IntruderAlertEventParams } from "empire-of-evil/src/events/eventFunctions/intruderAlert";
import { GameManager } from "empire-of-evil";

const EventScreenIntruder = ({
  resolveEvent,
  currentGameEvent,
}: GameEventComponentProps) => {
  const params = currentGameEvent.params as IntruderAlertEventParams;
  const intruder = GameManager.getInstance().gameData.people[params.intruderId];
  return (
    <Box>
      <Typography>
        {intruder.name} from{" "}
        {
          GameManager.getInstance().gameData.governingOrganizations[
            intruder.agent.organizationId
          ].name
        }{" "}
        has been caught causing trouble within our borders. They have been taken
        captive and will no longer be an issue for the forseeable future.
      </Typography>
      <Typography>Their fate is in your hands.</Typography>
      <Typography></Typography>
      <Button
        onClick={() => {
          resolveEvent();
        }}
      >
        Excellent
      </Button>
    </Box>
  );
};

export default EventScreenIntruder;
