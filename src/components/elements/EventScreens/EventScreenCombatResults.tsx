import { Box, Button, Divider, Typography } from "@mui/material";
import { GameEventComponentProps } from "../../screens/Events/EventScreen";
import { PlotResult } from "empire-of-evil/src/plots/Plot";
import { CombatResult } from "empire-of-evil/src/combat";
import { AttackZoneParams } from "empire-of-evil/src/events/eventFunctions/attackZone";

const combatRoundSeconds = 3;

const EventScreenCombatResults = ({
  currentGameEvent,
  resolveEvent,
}: GameEventComponentProps) => {
  const params = currentGameEvent?.params as AttackZoneParams;
  const resolution = params.plot.resolution as PlotResult;
  resolution.resolutionData as CombatResult;
  const wasVictorious = (resolution.resolutionData as CombatResult)
    .victoryResult;
  const rounds = (resolution.resolutionData as CombatResult).rounds;

  const getCombatTime = () => {
    const combatSeconds = rounds * combatRoundSeconds;
    if (combatSeconds < 60) {
      return { value: combatSeconds, unit: "seconds" };
    } else if (combatSeconds < 3600) {
      return { value: combatSeconds / 60, unit: "minutes" };
    } else {
      return { value: combatSeconds / 3600, unit: "hours" };
    }
  };

  const combatTime = getCombatTime();
  return (
    <Box>
      <Box id="title-header" component="section">
        <Typography id="title" variant="h4">
          After Action Report
        </Typography>
      </Box>
      <Divider />
      <Box
        id="combat-log-container"
        sx={{ height: "15rem", overflowY: "scroll" }}
      >
        {(resolution.resolutionData as CombatResult).combatLog?.map(
          (logString, index) => (
            <Typography key={`log-${index}`} variant="body2">
              {logString}
            </Typography>
          )
        )}
      </Box>
      <Divider />
      {wasVictorious ? (
        <Typography>
          You were victorious in {`${combatTime.value}`} {`${combatTime.unit}`}!
        </Typography>
      ) : (
        <Typography>
          You were defeated in {`${combatTime.value}`} {`${combatTime.unit}`}!
        </Typography>
      )}
      <Box id="commands">
        <Button
          onClick={() => {
            resolveEvent();
          }}
        >
          Okay
        </Button>
      </Box>
    </Box>
  );
};

export default EventScreenCombatResults;
