import { Box, Typography } from "@mui/material";

const HelpScreen = () => {
  return (
    <Box padding="1rem">
      <Typography>Help</Typography>
      <Typography>
        Empire of EVIL is a 4x management game. Your goal is to control the
        world. You'll need to manage your resources, personnel, and territory to
        achieve this. You'll also need to research new technologies and execute
        EVIL plots to undermine your enemies.
      </Typography>
      <Typography>Playing the Game</Typography>
      <Box padding="1rem">
        <Typography>
          Use the buttons on the left to navigate between the different screens.
          The main screen shows an overview of your empire. The other screens
          allow you to manage your empire's resources, personnel, and
          infrastructure.{" "}
        </Typography>
      </Box>
      <Typography>First Steps</Typography>
      <Box padding="1rem">
        <Typography>
          First, you'll want to visit the <strong>Personnel</strong> screen and
          assign EVIL agents to different departments. Only agents with the
          correct department can work in certain buildings (like laboratories).
          Next, visit the <strong>Infrastructure</strong> screen to assign EVIL
          Agents to buildings. This will allow you to claim the resources. Note
          that better skilled personnel offer higher bonuses when working in a
          building (relevant bonuses are noted during agent selection).
        </Typography>
      </Box>
      <Typography>Science Projects</Typography>
      <Box padding="1rem">
        <Typography>
          When you have Scientists working in Laboratories, you should visit the{" "}
          <strong>Science</strong> screen and start a new science project.
        </Typography>
      </Box>

      <Typography>Plots</Typography>
      <Box padding="1rem">
        <Typography>
          The <strong>Plots</strong> screen is where you'll determine what EVIL
          plots to execute. You can also decide what activities you'd like your
          EVIL Agents to take part in on a daily basis. Agents who are assigned
          to buildings cannot join plots or activities. Agents who are assigned
          to plots or activities can only be assigned to either one plot or one
          activity at a time.
        </Typography>
      </Box>
    </Box>
  );
};

export default HelpScreen;
