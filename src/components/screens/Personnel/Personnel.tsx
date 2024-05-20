import { Box, Divider, Grid, Stack, Tab } from "@mui/material";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import { useAppSelector } from "../../../app/hooks";
import * as eoe from "empire-of-evil";
import { organizations } from "empire-of-evil";
import { getPeople } from "empire-of-evil/src/actions/people";
import PersonnelOverview from "./PersonnelOverview";
import PersonnelProfile from "./PersonnelProfile";
import PersonnelCaptives from "./PersonnelCaptives";
import HeaderGridItem from "../../elements/HeaderGridItem/HeaderGridItem";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";

const PersonnelScreen = () => {
  const [currentTab, setCurrentTab] = useState("overview");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  const selectedAgent = useAppSelector((state) => state.selections.person);
  const { gameData } = eoe.GameManager.getInstance();
  const currentAgents = getPeople({
    personFilter: {
      organizationId: gameData.player.organizationId,
    },
    agentFilter: { agentsOnly: true },
  }).length;

  const maxAgents = organizations.getMaxAgents(gameData.player.organizationId);

  return (
    <>
      <Box padding="1rem">
        <Grid container spacing="1rem">
          <HeaderGridItem
            title="Payroll"
            content={`\$${organizations.getPayroll(
              gameData.player.organizationId
            )}`}
          />
          <HeaderGridItem
            title="Agents"
            content={`${currentAgents}/${maxAgents}`}
          />

          <HeaderGridItem
            title="Henchmen"
            content={
              getPeople({
                personFilter: {
                  organizationId: gameData.player.organizationId,
                },
                agentFilter: {
                  department: "troop",
                },
              }).length
            }
          />

          <HeaderGridItem
            title="Admins"
            content={
              getPeople({
                personFilter: {
                  organizationId: gameData.player.organizationId,
                },
                agentFilter: {
                  department: "administrator",
                },
              }).length
            }
          />

          <HeaderGridItem
            title="Scientists"
            content={
              getPeople({
                personFilter: {
                  organizationId: gameData.player.organizationId,
                },
                agentFilter: {
                  department: "scientist",
                },
              }).length
            }
          />

          <HeaderGridItem
            title="Deceased"
            content={
              getPeople({
                personFilter: {
                  organizationId: gameData.player.organizationId,
                  deceasedOnly: true,
                },
                agentFilter: {
                  agentsOnly: true,
                },
              }).length
            }
          />
        </Grid>
      </Box>
      <Divider />
      <TabContext value={currentTab}>
        <Box>
          <TabList onChange={handleChange}>
            <Tab label="Overview" value="overview" />
            <Tab label="Captives" value="captives" />
          </TabList>
        </Box>
        <TabPanel value="overview">
          {selectedAgent ? <PersonnelProfile /> : <PersonnelOverview />}
        </TabPanel>
        <TabPanel value="captives">
          <PersonnelCaptives />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default PersonnelScreen;
