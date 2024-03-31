import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { GameEventComponentProps } from "../screens/Events/EventScreen";
import { useAppSelector } from "../app/hooks";
import { ReconZoneEventParams } from "empire-of-evil/src/events/eventFunctions/recon";
import { PlotResult } from "empire-of-evil/src/plots/Plot";
import { ReconPlotData } from "empire-of-evil/src/plots/plotFunctions/recon";
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
  const { intelligenceModifier, capturedAgentIds } =
    resolution.resolutionData as ReconPlotData;
  return (
    <Box>
      <Typography>OPERATION DEBRIEF</Typography>
      <Typography>
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
      <Box>
        <Button
          onClick={() => {
            resolveEvent();
          }}
        >
          {resolution.success ? "Excellent" : "...Damnit"}
        </Button>
      </Box>
    </Box>
  );
};

export default EventScreenReconZone;
