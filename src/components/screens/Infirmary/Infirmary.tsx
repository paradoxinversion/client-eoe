import { Box, Divider, Grid, Tab, Typography } from "@mui/material";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import HeaderGridItem from "../../elements/HeaderGridItem/HeaderGridItem";
import DataGrid from "react-data-grid";
import { getPeople } from "empire-of-evil/src/actions/people";
import InfirmaryOverview from "./InfirmaryOverview";
import InfirmaryPatients from "./InfirmaryPatients";
import InfirmaryStaff from "./InfirmaryStaff";
const InfirmaryScreen = () => {
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
            <Tab label="Patients" value={"patients"} />
          </TabList>
        </Box>
        <TabPanel value="overview">
          <Typography>Overview</Typography>
          <InfirmaryOverview />
        </TabPanel>
        <TabPanel value="staff">
          <Typography>Staff</Typography>
          <InfirmaryStaff />
        </TabPanel>
        <TabPanel value="patients">
          <Typography>Patients</Typography>
          <InfirmaryPatients />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default InfirmaryScreen;
