import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { managers } from "empire-of-evil";

const RecallEmbeddedAgents = ({ currentGameEvent, resolveEvent }) => {
  const participants =
    currentGameEvent.params.plot.standardParams.participants.map(
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
