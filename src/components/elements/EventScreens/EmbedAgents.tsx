import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { managers } from "empire-of-evil";

const EmbedAgents = ({ currentGameEvent, resolveEvent }) => {
  const participants =
    currentGameEvent.params.plot.standardParams.participants.map(
      (participantId) => {
        return managers.game.GameManager.getInstance().gameData.people[
          participantId
        ];
      }
    );
  const zone =
    managers.game.GameManager.getInstance().gameData.zones[
      currentGameEvent.params.plot.standardParams.targetZone
    ];
  return (
    <Box>
      <Typography>
        The following agents have been embedded in {zone.name}:
      </Typography>
      <List>
        {participants.map((participant) => {
          return (
            <ListItem>
              <Typography>- {participant.name}</Typography>
            </ListItem>
          );
        })}
      </List>
      <Typography>
        They will be able to launch further operations from there, but they
        remain at risk of detection.
      </Typography>
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

export default EmbedAgents;
