import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { managers } from "empire-of-evil";
import GameEvent from "empire-of-evil/src/managers/events/GameEvent";
import { RecallEmbeddedAgentsParams } from "empire-of-evil/src/managers/events/eventFunctions/recallEmbeddedAgents";
type RecallEmbeddedAgentsProps = {
  currentGameEvent: GameEvent;
  resolveEvent: () => void;
};
const RecallEmbeddedAgents = ({
  currentGameEvent,
  resolveEvent,
}: RecallEmbeddedAgentsProps) => {
  const params = currentGameEvent.params as RecallEmbeddedAgentsParams;
  const participants = params.plot.plotParams.participants.map(
    (participantId) => {
      return managers.game.GameManager.getInstance().gameData.people[
        participantId
      ];
    }
  );
  return (
    <Box>
      <Typography>
        The following agents have returned to their home zones safely:
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
        They are available for assignment, plots, and activities, effective
        immediately.
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

export default RecallEmbeddedAgents;
