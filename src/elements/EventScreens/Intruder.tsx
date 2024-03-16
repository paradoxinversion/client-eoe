import { Box, Button, Typography } from "@mui/material";
import { IntegratedManagerProps } from "../..";
import { GameEventComponentProps } from "../../screens/Events/EventScreen";

const EventScreenIntruder = ({
  resolveEvent,
  gameManager,
  currentGameEvent,
}: IntegratedManagerProps & GameEventComponentProps) => {
  const intruder =
    gameManager.gameData.people[
      currentGameEvent.params.intruderAlert.intruderId
    ];
  return (
    <Box>
      <Typography>
        {intruder.name} from{" "}
        {
          gameManager.gameData.governingOrganizations[
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
