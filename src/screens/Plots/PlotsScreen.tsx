import { useState } from "react";
import AttackZonePlot from "../../elements/AttackZonePlot";
import ReconPlot from "../../elements/ReconPlot";
import { Box, Divider, Typography, Tab } from "@mui/material";
import PlotsOverview from "./PlotsOverview";
import ActivitiesOverview from "./ActivitiesOverview";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export const plotSetupRenderers = {
  "attack-zone": AttackZonePlot,
  "recon-zone": ReconPlot,
};

const PlotsScreen = ({ gameManager }) => {
  const [currentTab, setCurrentTab] = useState("plots");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  return (
    <Box component="section">
      <Box>
        <Box component="header" padding="1rem">
          <Typography variant="h3">EVIL Plots & Activities</Typography>
        </Box>
        <Divider />
        <Box sx={{ typography: "body1" }}>
          <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Plots" value="plots" />
                <Tab label="Activities" value="activities" />
              </TabList>
            </Box>
            <TabPanel value="plots">
              <PlotsOverview gameManager={gameManager} />
            </TabPanel>
            <TabPanel value="activities">
              <ActivitiesOverview gameManager={gameManager} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default PlotsScreen;
