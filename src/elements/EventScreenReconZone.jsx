import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
/**
 * @param {object} props
 * @param {object} props.currentGameEvent
 * @param {Function} props.resolveEvent
 * @returns
 */
const EventScreenReconZone = ({ resolveEvent, currentGameEvent }) => {
  const zone = useSelector(
    (state) => state.zones[currentGameEvent?.params?.plot?.plotParams?.zoneId]
  );
  const { intelligenceModifier, success } =
    currentGameEvent.params.plot.resolution.data;
  console.log(currentGameEvent);
  return (
    <Box>
      <Typography>OPERATION DEBRIEF</Typography>
      <Typography>Mission {success ? "Success" : "Failure"}</Typography>
      <Typography>
        The recon mission in {zone.name} has {success ? "succeeded" : "failed"}
        . As a result, our knowledge of the Zone has increased by a factor of
        approximately <strong>{intelligenceModifier}.</strong>
      </Typography>
      <Box>
        <Button
          onClick={() => {
            resolveEvent();
          }}
        >
          {success ? 'Excellent' : '...Damnit'}
        </Button>
      </Box>
    </Box>
  );
};

export default EventScreenReconZone;
