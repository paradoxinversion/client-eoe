import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { managers } from "empire-of-evil";
import GameEvent from "empire-of-evil/src/managers/events/GameEvent";
import { EmbedAgentsParams } from "empire-of-evil/src/managers/events/eventFunctions/embedAgents";
import { PlotParamsEmbedAgents } from "empire-of-evil/src/managers/plots/plotFunctions/embedAgents";
import { Person } from "empire-of-evil/src/types/interfaces/entities";

type EmbedAgentsProps = {
  currentGameEvent: GameEvent;
  resolveEvent: () => void;
};

const EmbedAgents = ({ currentGameEvent, resolveEvent }: EmbedAgentsProps) => {
  const params = currentGameEvent.params as EmbedAgentsParams;

  const participants: Person[] = params.plotParams.participants.map(
    (participantId) => {
      return managers.game.GameManager.getInstance().gameData.people[
        participantId
      ];
    }
  );
  const zone =
    managers.game.GameManager.getInstance().gameData.zones[
      params.plotParams.targetZone
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
