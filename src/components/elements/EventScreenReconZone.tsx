import {
  Box,
  Button,
  Card,
  CardContent,
  DialogActions,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { GameEventComponentProps } from "../screens/Events/EventScreen";
import { useAppSelector } from "../../app/hooks";
import { ReconZoneEventParams } from "empire-of-evil/src/managers/events/eventFunctions/recon";
import { PlotResult } from "empire-of-evil/src/managers/plots/Plot";
import { ReconPlotData } from "empire-of-evil/src/managers/plots/plotFunctions/recon";
import { MonitorHeart as MonitorHeartIcon } from "@mui/icons-material";
/**
 * @param {object} props
 * @param {object} props.currentGameEvent
 * @param {Function} props.resolveEvent
 * @returns
 */
const EventScreenReconZone = ({
  resolveEvent,
  currentGameEvent,
}: GameEventComponentProps) => {
  const params = currentGameEvent?.params as ReconZoneEventParams;
  const zone = useAppSelector(
    (state) => state.zones[params.plot?.standardParams?.targetZone]
  );
  const people = useAppSelector((state) => state.people);
  const resolution = params.plot.resolution as PlotResult;
  const resolutionData = resolution.resolutionData as ReconPlotData;
  const { intelligenceModifier, capturedAgentIds, combatResult } =
    resolutionData;
  return (
    <>
      <Box>
        <Typography variant="h4">OPERATION DEBRIEF</Typography>
        <Typography variant="h5">
          Mission {resolution.success ? "Success" : "Failure"}
        </Typography>
        <Typography>
          The recon mission in {zone.name} has{" "}
          {resolution.success ? "succeeded" : "failed"}. As a result, our
          knowledge of the Zone has increased by a factor of approximately{" "}
          <strong>{intelligenceModifier}.</strong>
        </Typography>
        {capturedAgentIds.length > 0 && (
          <>
            <Typography>
              Unfortunately, the following agents were captured by the enemy:
            </Typography>
            <Card>
              <CardContent>
                {capturedAgentIds.map((agentId, index) => {
                  const agent = people[agentId];
                  return <Typography key={index}>{agent.name}</Typography>;
                })}
              </CardContent>
            </Card>
          </>
        )}
        {combatResult && (
          <Box paddingTop="1rem">
            <Typography>
              The recon team was involved in combat. They{" "}
              {combatResult.victoryResult === 1 ? "succeed" : "failed"}. See
              engagement report below.
            </Typography>
            <Card sx={{ marginTop: "1rem" }}>
              <CardContent>
                {combatResult.combatLog.map((log, index) => {
                  return <Typography key={index}>{log}</Typography>;
                })}
              </CardContent>
              <CardContent>
                {combatResult.characters.attackers
                  .filter((agent) => agent.dead)
                  .map((agent, index) => (
                    <Stack direction={"row"}>
                      <MonitorHeartIcon sx={{ marginRight: 1, color: "red" }} />
                      <Typography key={index}>
                        {agent.name} was killed in the engagement
                      </Typography>
                    </Stack>
                  ))}
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
      <DialogActions>
        <Button
          onClick={() => {
            resolveEvent();
          }}
        >
          {resolution.success ? "Excellent" : "...Damnit"}
        </Button>
      </DialogActions>
    </>
  );
};

export default EventScreenReconZone;
