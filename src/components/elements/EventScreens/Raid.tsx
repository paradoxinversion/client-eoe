import { Box, Button, Divider, Typography } from "@mui/material";
import { managers } from "empire-of-evil";

const Raid = ({ currentGameEvent, resolveEvent }) => {
  const { attackers, defenders } =
    currentGameEvent.params.combatResult.characters;
  const agentCasualties = defenders.filter((agent) => !agent.alive);
  const civilianCasualities = attackers.filter((civilian) => !civilian.alive);

  return (
    <Box>
      <Box id="title-header" component="section">
        <Typography id="title" variant="h4">
          Domestic Combat Encounter Report
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography>
          {attackers.length}{" "}
          {attackers.length > 1 ? "citizens have" : "citizen has"} engaged{" "}
          {defenders.length} agents in combat in{" "}
          {
            managers.game.GameManager.getInstance().gameData.zones[
              currentGameEvent.params.zoneId
            ].name
          }
          .
        </Typography>
        {}
        <Typography variant="h6">Casualties</Typography>
        <Typography>Agents</Typography>
        {agentCasualties.map((agent) => (
          <Typography key={agent.id} variant="body2">
            {agent.name} was killed in action.{" "}
          </Typography>
        ))}
        <Typography>Civilians</Typography>
        {civilianCasualities.map((agent) => (
          <Typography key={agent.id} variant="body2">
            {agent.name} was killed in action.{" "}
          </Typography>
        ))}
      </Box>
      <Button onClick={resolveEvent}>Continue</Button>
    </Box>
  );
};

export default Raid;
