import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import { actions, buildings } from "empire-of-evil";
import { useAppSelector } from "../../app/hooks";
import PersonDataGrid from "../../dataGrids/personDataGrid";
import BuildingDataGrid from "../../dataGrids/buildingDataGrid";
import { IntegratedManagerProps } from "../..";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";

const WorldZone = ({ gameManager }: IntegratedManagerProps) => {
  const selectedZone = useAppSelector((state) => state.selections.zone);
  const [currentTab, setCurrentTab] = useState("people");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  return (
    <Box>
      <Grid padding="1rem" spacing="1rem" container>
        <Grid item>
          <Typography variant="body2" color="GrayText">
            People
          </Typography>
          <Typography variant="body2">
            {
              actions.people.getPeople(gameManager, {
                zoneId: selectedZone.id,
              }).length
            }
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="GrayText">
            Buildings
          </Typography>
          <Typography variant="body2">
            {
              buildings.getBuildings(gameManager, {
                zoneId: selectedZone.id,
              }).length
            }
          </Typography>
        </Grid>
      </Grid>

      <Divider />
      <Box padding="1rem">
        <Typography variant="h4">{selectedZone.name}</Typography>
      </Box>
      <TabContext value={currentTab}>
        <TabList onChange={handleChange}>
          <Tab label="People" value="people" />
          <Tab label="Buildings" value="buildings" />
          <Tab label="Morgue" value="morgue" />
        </TabList>
        <TabPanel value="people">
          <PersonDataGrid
            title="people"
            people={actions.people.getPeople(gameManager, {
              zoneId: selectedZone.id,
            })}
            gameManager={gameManager}
          />
        </TabPanel>
        <TabPanel value="buildings">
          <BuildingDataGrid
            title=""
            buildings={buildings.getBuildings(gameManager, {
              zoneId: selectedZone.id,
            })}
            gameManager={gameManager}
          />
        </TabPanel>
        <TabPanel value="morgue">
          <PersonDataGrid
            title="morgue"
            people={actions.people.getPeople(gameManager, {
              zoneId: selectedZone.id,
              deceasedOnly: true,
            })}
            gameManager={gameManager}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default WorldZone;
