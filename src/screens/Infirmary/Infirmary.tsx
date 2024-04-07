import { Box, Divider, Grid, Tab, Typography } from "@mui/material";
import { IntegratedManagerProps } from "../..";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import HeaderGridItem from "../../elements/HeaderGridItem";
import DataGrid from "react-data-grid";
import { getPeople } from "empire-of-evil/src/actions/people";
import InfirmaryOverview from "./InfirmaryOverview";
const InfirmaryScreen = ({ gameManager }: IntegratedManagerProps) => {
  const [currentTab, setCurrentTab] = useState("overview");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  return (
    <Box>
      <Box padding="1rem">
        <Typography variant="h4">Infirmary</Typography>
      </Box>
      <Divider />
      <TabContext value={currentTab}>
        <Box>
          <TabList onChange={handleChange}>
            <Tab label="Overview" value="overview" />
            <Tab label="Staff" value="staff" />
          </TabList>
        </Box>
        <TabPanel value="overview">
          <Typography>Overview</Typography>
          <InfirmaryOverview gameManager={gameManager} />
        </TabPanel>
        <TabPanel value="staff">
          <Typography>Staff</Typography>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default InfirmaryScreen;
