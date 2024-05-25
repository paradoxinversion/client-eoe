import { Box, Divider, Grid, Tab, Typography } from "@mui/material";

import { managers, actions } from "empire-of-evil";
import ScienceProjects from "./ScienceProjects";
import ScienceProgress from "./ScienceProgress";

import ScienceOverview from "./ScienceOverview";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import HeaderGridItem from "../../../elements/HeaderGridItem/HeaderGridItem";

const ScienceScreen = () => {
  const [currentTab, setCurrentTab] = useState("overview");
  const { gameData } = managers.game.GameManager.getInstance();
  const labs = actions.buildings.getOrgLabs(gameData.player.organizationId);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  const activeProjects =
    managers.science.ScienceManager.getInstance().activeProjects;
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
              actions.people.getPeople({
                personFilter: {
                  organizationId:
                    managers.game.GameManager.getInstance().gameData.player
                      .organizationId,
                },
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
            <ScienceOverview activeProjects={activeProjects} />
          </TabPanel>
          <TabPanel value="projects">
            <ScienceProjects activeProjects={activeProjects} />
          </TabPanel>
          <TabPanel value="progress">
            <ScienceProgress activeProjects={activeProjects} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default ScienceScreen;
