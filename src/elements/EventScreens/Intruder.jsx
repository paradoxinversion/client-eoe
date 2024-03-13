import { Box, Button, Divider, CardContent, Typography } from "@mui/material";

/**
 * @param {object} props
 * @param {object} props.currentGameEvent
 * @param {Function} props.resolveEvent
 * @returns
 */
const EventScreenIntruder = ({
  resolveEvent,
  gameManager,
  currentGameEvent,
}) => {
  const intruder =
    gameManager.gameData.people[currentGameEvent.params.intruderId];
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
        buttonText="Okay"
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
