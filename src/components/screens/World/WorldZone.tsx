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
import { actions, buildings } from "empire-of-evil";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import PersonDataGrid from "../../dataGrids/personDataGrid";
import BuildingDataGrid from "../../dataGrids/buildingDataGrid";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { selectEntity } from "../../../features/selectionSlice";

const WorldZone = () => {
  const dispatch = useAppDispatch();
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
              buildings.getBuildings({
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
          {/* <PersonDataGrid
            title="people"
            people={actions.people.getPeople({
              zoneId: selectedZone.id,
            })}
          /> */}
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
                    <Card sx={{ padding: 1 }}>
                      <CardHeader
                        title={person.name}
                        titleTypographyProps={{ variant: "body1" }}
                      />
                      <Divider />
                      <CardActions>
                        <Button
                          onClick={() => {
                            dispatch(
                              selectEntity({
                                type: "person",
                                selection: person,
                              })
                            );
                            dispatch(
                              selectEntity({
                                type: "zone",
                                selection: null,
                              })
                            );
                          }}
                        >
                          Surveillance
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </TabPanel>
        <TabPanel value="buildings">
          {/* <BuildingDataGrid
            title=""
            buildings={buildings.getBuildings({
              zoneId: selectedZone.id,
            })}
          /> */}
          <Grid container spacing={1} columns={5}>
            {buildings
              .getBuildings({
                zoneId: selectedZone.id,
              })
              .map((building) => {
                return (
                  <Grid item xs={1}>
                    <Card sx={{ padding: 1 }}>
                      <CardHeader
                        title={building.name}
                        titleTypographyProps={{ variant: "body1" }}
                      />
                      <Divider />
                      <CardActions>
                        <Button
                          onClick={() => {
                            dispatch(
                              selectEntity({
                                type: "building",
                                selection: building,
                              })
                            );
                            // dispatch(
                            //   selectEntity({
                            //     type: "zone",
                            //     selection: null,
                            //   })
                            // );
                          }}
                        >
                          Surveillance
                        </Button>
                      </CardActions>
                    </Card>
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
