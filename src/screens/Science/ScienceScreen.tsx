import { Box, Divider, Stack, Tab, Typography } from "@mui/material";

import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import { buildings } from "empire-of-evil";
import ScienceProjects from "./ScienceProjects";
import ScienceProgress from "./ScienceProgress";
import { IntegratedManagerProps } from "../..";
import ScienceOverview from "./ScienceOverview";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const ScienceScreen = ({ gameManager }: IntegratedManagerProps) => {
  const [currentTab, setCurrentTab] = useState("overview");
  const { gameData } = gameManager;
  const labs = buildings.getOrgLabs(
    gameManager,
    gameData.player.organizationId
  );
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  return (
    <>
      <Box component="header" padding="1rem">
        <Typography variant="h3">Science</Typography>
      </Box>

      <Divider />

      <Box padding="1rem" component={"section"}>
        <Stack direction="row" spacing={"1rem"} justifyContent={"center"}>
          <MetricNumber title="Total Labs" number={labs.length} />
          <MetricNumber title="Scientists" number={9999} />
        </Stack>
      </Box>
      <Divider />

      <Box sx={{ typography: "body1" }}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Overview" value="overview" />
              <Tab label="Projects" value="projects" />
              <Tab label="Progress" value="progress" />
            </TabList>
          </Box>
          <TabPanel value="overview">
            <ScienceOverview gameManager={gameManager} />
          </TabPanel>
          <TabPanel value="projects">
            <ScienceProjects gameManager={gameManager} />
          </TabPanel>
          <TabPanel value="progress">
            <ScienceProgress gameManager={gameManager} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default ScienceScreen;
