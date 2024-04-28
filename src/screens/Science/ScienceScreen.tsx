import { Box, Divider, Grid, Stack, Tab, Typography } from "@mui/material";

import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import { GameManager, buildings } from "empire-of-evil";
import ScienceProjects from "./ScienceProjects";
import ScienceProgress from "./ScienceProgress";

import ScienceOverview from "./ScienceOverview";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import HeaderGridItem from "../../elements/HeaderGridItem";
import { getPeople } from "empire-of-evil/src/actions/people";

const ScienceScreen = () => {
  const [currentTab, setCurrentTab] = useState("overview");
  const { gameData } = GameManager.getInstance();
  const labs = buildings.getOrgLabs(gameData.player.organizationId);
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
        <Grid container spacing={"1rem"}>
          <HeaderGridItem title="Labs" content={labs.length} />
          <HeaderGridItem
            title="Scientists"
            content={
              getPeople({
                organizationId: gameData.player.organizationId,
                agentFilter: { agentsOnly: true, department: "scientist" },
              }).length
            }
          />
        </Grid>
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
            <ScienceOverview />
          </TabPanel>
          <TabPanel value="projects">
            <ScienceProjects />
          </TabPanel>
          <TabPanel value="progress">
            <ScienceProgress />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default ScienceScreen;
