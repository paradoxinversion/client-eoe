import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  Tab,
  Typography,
} from "@mui/material";
import { actions } from "empire-of-evil";
import { useAppDispatch } from "../../../../app/hooks";
import PersonDataGrid from "../../../dataGrids/personDataGrid";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { selectEntity } from "../../../../features/selectionSlice";
import { Zone } from "empire-of-evil/src/types/interfaces/entities";
import BuildingCard from "../../../elements/Cards/BuildingCard/BuildingCard";
import CitizenCard from "../../../elements/Cards/CitizenCard/CitizenCard";

type WorldZoneProps = {
  selectedZone: Zone;
};
const WorldZone = ({ selectedZone }: WorldZoneProps) => {
  const dispatch = useAppDispatch();
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
              actions.people.getPeople({
                zone: {
                  zoneId: selectedZone.id,
                },
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
              actions.buildings.getBuildings({
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
          <Grid container columns={5} spacing={1}>
            {actions.people
              .getPeople({
                zone: {
                  zoneId: selectedZone.id,
                },
              })
              .map((person) => {
                return (
                  <Grid item xs={1}>
                    <CitizenCard person={person} showDescriptoryIcons />
                  </Grid>
                );
              })}
          </Grid>
        </TabPanel>
        <TabPanel value="buildings">
          <Grid container spacing={1} columns={5}>
            {actions.buildings
              .getBuildings({
                zoneId: selectedZone.id,
              })
              .map((building) => {
                return (
                  <Grid item xs={5} md={2} lg={1}>
                    <BuildingCard building={building} />
                  </Grid>
                );
              })}
          </Grid>
        </TabPanel>
        <TabPanel value="morgue">
          <PersonDataGrid
            title="morgue"
            people={actions.people.getPeople({
              zone: {
                zoneId: selectedZone.id,
              },
              personFilter: {
                deceasedOnly: true,
              },
            })}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default WorldZone;
