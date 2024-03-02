import { Box, Button, Card, CardContent, Typography } from "@mui/material";


const EventScreenCombatResults = ({currentGameEvent, resolveEvent}) => {
  return (
    <Box>
      <Box component="section">
        <Typography>Combat Log</Typography>
      </Box>
      <Box>
        {currentGameEvent?.params?.plot?.resolution?.data?.combatLog?.map((logString, index) => (
          <Typography key={`log-${index}`}>{logString}</Typography>
        ))}
      </Box>
      <Button onClick={()=>{resolveEvent()}}>Okay</Button>
    </Box>
  )
}

export default EventScreenCombatResults;