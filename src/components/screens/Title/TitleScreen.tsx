import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import TitleScreenInfoCard from "./TitleScreenInfoCard";

function TitleScreen() {
  // const [saveData, setSaveData] = useState(localStorage.getItem("eoe-save"));
  const saveData = useAppSelector((state) => state.gameManager.saveData);
  return (
    <Box>
      <Box padding="1rem">
        <Typography variant="h1">Empire of EVIL</Typography>
        <Typography>An Evil Overlord Simulator by Jedai Saboteur.</Typography>
      </Box>
      <Grid container spacing={1} columns={3} sx={{ padding: "1rem" }}>
        <TitleScreenInfoCard
          title="Execute EVIL Plots"
          content="Create an Empire capable of generating the resources you need to unleash EVIL plots upon an unsuspecting world!"
        />
        <TitleScreenInfoCard
          title="Recruit EVIL Agents"
          content="Amass your own personal army of loyal EVIL Agents to carry out your dastardly schemes!"
        />
        <TitleScreenInfoCard
          title="Subjugate Exotic Locales"
          content="Use your wit and careful planning to strategically take over the world!"
        />
      </Grid>
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
