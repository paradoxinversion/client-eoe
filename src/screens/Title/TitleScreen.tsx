import { useState } from "react";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../app/hooks";

function TitleScreen() {
  // const [saveData, setSaveData] = useState(localStorage.getItem("eoe-save"));
  const saveData = useAppSelector(state => state.gameManager.saveData)
  return (
    <Box>
      <Box padding="1rem">
        <Typography variant="h1">Empire of EVIL</Typography>
        <Typography>An Evil Overlord Simulator by Jedai Saboteur.</Typography>
      </Box>
      <Stack
        direction="row"
        spacing="1rem"
        padding="1rem"
        alignItems={"center"}
      >
        <Card sx={{ maxWidth: 345, height: 300 }}>
          <CardHeader title="Execute EVIL Plots" />
          <CardContent>
            Create an Empire capable of generating the resources you need to
            unleash EVIL plots upon an unsuspecting world!
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, height: 300 }}>
          <CardHeader title="Recruit EVIL Agents" />
          <CardContent>
            Amass your own personal army of loyal EVIL Agents to carry out your
            dastardly schemes!
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, height: 300 }}>
          <CardHeader title="Subjegate Exotic Locales" />
          <CardContent>
            Use your wit and careful planning to strategically take over the
            world!
          </CardContent>
        </Card>
      </Stack>
      <Box padding="1rem">
        <Typography align="center">
          {saveData
            ? "Continue your session today!"
            : "Start a New Session Today!"}
        </Typography>
        <Typography align="center" variant="caption">
          Empire of EVIL is in active development. Some features may not work.
          Some crashes may occur. Some data may be lost. Some EVIL deeds will be
          committed.
        </Typography>
      </Box>
    </Box>
  );
}

export default TitleScreen;
export const title = "";
